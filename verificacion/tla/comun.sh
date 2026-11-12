#!/usr/bin/env bash
# Lo que comparten las verificaciones con modelo TLA+ de verificacion/*/verificar.sh.
# No se ejecuta solo: cada verificar.sh hace `source` y llama a `verificar_carpeta`.
#
# Una carpeta de verificación tiene:
#   *.tla                 los modelos
#   *.cfg                 el código tal como está, con sus supuestos: TLC tiene que pasar
#   hallazgos/*.cfg       reglas que el código rompe hoy: TLC tiene que romper la regla anotada
#   variantes/*.cfg       roturas a propósito: TLC tiene que romper la regla anotada
#   anclas.txt            archivo | texto literal | qué parte del modelo lo representa
#   cubiertos.txt         los archivos de producto que el modelo describe, uno por línea
#   *.verif.ts(x)         los contraejemplos repetidos sobre el código real (Jest)
#
# Cada .cfg empieza con dos comentarios que este script lee:
#   \* MODULO: NombreDelModulo
#   \* ROMPE: NombreDeLaRegla        (sólo en hallazgos/ y variantes/)
#
# Salida: 0 todo está como quedó registrado; 1 una regla se rompe donde no debía o una
# rotura no se detecta; 2 el modelo ya no describe el código, o la herramienta no corre;
# 3 un hallazgo registrado ya no ocurre (hay que mover su regla al .cfg principal).
#
# TLC: tla2tools.jar 1.7.4, fijado por checksum. Se toma de $TLA2TOOLS si está definido;
# si no, de ${XDG_CACHE_HOME:-$HOME/.cache}/tla2tools/1.7.4/, y se descarga ahí la primera
# vez. Java 11 o posterior: $JAVA, o `java` del PATH.

TLC_VERSION=1.7.4
TLC_SHA256=936a262061c914694dfd669a543be24573c45d5aa0ff20a8b96b23d01e050e88
TLC_URL="https://github.com/tlaplus/tlaplus/releases/download/v${TLC_VERSION}/tla2tools.jar"

# En Windows (Git Bash) java necesita rutas de Windows.
ruta() { if command -v cygpath >/dev/null 2>&1; then cygpath -w "$1"; else printf '%s\n' "$1"; fi; }
recortar() { sed 's/^ *//; s/ *$//'; }

# verificar_anclas DIR -> 0 si cada texto sigue en su archivo, en orden.
verificar_anclas() {
  local dir=$1 ok=0 archivo texto parte previo="" desde=0 n
  while IFS='|' read -r archivo texto parte; do
    archivo=$(printf '%s' "$archivo" | recortar)
    texto=$(printf '%s' "$texto" | recortar)
    parte=$(printf '%s' "$parte" | recortar)
    case "$archivo" in ''|'#'*) continue ;; esac
    [ "$archivo" != "$previo" ] && desde=0
    previo=$archivo
    n=$(awk -v t="$texto" -v desde="$desde" 'NR > desde && index($0, t) { print NR; exit }' "$archivo" 2>/dev/null || true)
    if [ -z "$n" ]; then
      echo "ANCLA ROTA: $archivo ya no tiene «$texto» después de la línea $desde (modelo: $parte)." >&2
      ok=1
    else
      desde=$n
    fi
  done < "$dir/anclas.txt"
  return $ok
}

# avisar_cambios DIR SKILL -> avisa si los archivos cubiertos cambiaron desde el commit de sincronización.
avisar_cambios() {
  local dir=$1 skill=$2 sync cubiertos=()
  while IFS= read -r linea; do
    case "$linea" in ''|'#'*) ;; *) cubiertos+=("$linea") ;; esac
  done < "$dir/cubiertos.txt"
  sync=$(sed -n 's/^Commit de sincronización: `\([0-9a-f]\{40\}\)`.*/\1/p' "$skill" | head -1)
  if [ -z "$sync" ]; then
    echo "AVISO: no encontré «Commit de sincronización» en $skill." >&2
  elif ! git diff --quiet "$sync" -- "${cubiertos[@]}" 2>/dev/null; then
    echo "AVISO: el código cubierto cambió desde $sync. Revisá que el modelo lo siga describiendo y recién entonces adelantá el commit de sincronización:" >&2
    git diff --stat "$sync" -- "${cubiertos[@]}" >&2 || true
  fi
}

preparar_tlc() {
  JAVA=${JAVA:-java}
  command -v "$JAVA" >/dev/null 2>&1 || { echo "No encuentro java (definí JAVA o ponelo en el PATH; hace falta Java 11+)." >&2; return 2; }
  if [ -z "${TLA2TOOLS:-}" ]; then
    TLA2TOOLS="${XDG_CACHE_HOME:-$HOME/.cache}/tla2tools/$TLC_VERSION/tla2tools.jar"
    if [ ! -f "$TLA2TOOLS" ]; then
      mkdir -p "$(dirname "$TLA2TOOLS")"
      echo "Descargando tla2tools.jar $TLC_VERSION en $TLA2TOOLS" >&2
      curl -fsSL -o "$TLA2TOOLS.part" "$TLC_URL" && mv "$TLA2TOOLS.part" "$TLA2TOOLS" || return 2
    fi
  fi
  local suma
  # Con una ruta de Windows, sha256sum antepone una barra invertida a la suma: se quita (\134).
  suma=$(sha256sum "$TLA2TOOLS" | cut -d' ' -f1 | tr -d '\134')
  [ "$suma" = "$TLC_SHA256" ] || { echo "$TLA2TOOLS no es tla2tools $TLC_VERSION (sha256 $suma)." >&2; return 2; }
  export TLA2TOOLS JAVA
}

campo() { sed -n "s/^\\\\\\* $2: *\\([A-Za-z0-9_]*\\).*/\\1/p" "$1" | head -1; }

# tlc DIR CFG SALIDA -> código de salida de TLC
tlc() {
  local dir=$1 cfg=$2 salida=$3 modulo
  modulo=$(campo "$cfg" MODULO)
  [ -n "$modulo" ] || { echo "$cfg no dice «\\* MODULO: …»." >&2; return 2; }
  # TLC busca los módulos en el directorio de trabajo: se corre desde la carpeta del modelo.
  ( cd "$dir" && "$JAVA" -XX:+UseParallelGC "-Djava.io.tmpdir=$(ruta "$TMP_TLC")" -cp "$(ruta "$TLA2TOOLS")" tlc2.TLC \
      -workers 1 -fp 0 -metadir "$(ruta "$TMP_TLC/meta-$RANDOM$RANDOM")" -config "$(ruta "$cfg")" "$modulo.tla" ) > "$salida" 2>&1
}

regla_rota() { sed -n 's/^Error: Invariant \([A-Za-z0-9_]*\) is violated.*/\1/p' "$1" | head -1; }

# verificar_carpeta DIR SKILL [--sin-jest] [--traza NOMBRE]
verificar_carpeta() {
  local dir=$1 skill=$2; shift 2
  local con_jest=1 traza="" raiz cfg nombre salida esperada rota estado=0 codigo
  while [ $# -gt 0 ]; do
    case "$1" in
      --sin-jest) con_jest=0 ;;
      --traza) traza=${2:-}; shift ;;
      *) echo "Opción desconocida: $1 (valen --sin-jest y --traza NOMBRE)." >&2; return 2 ;;
    esac
    shift
  done
  raiz=$(cd "$dir/../.." && pwd)
  cd "$raiz"

  # 1. ¿El modelo sigue describiendo el código?
  if ! verificar_anclas "$dir"; then
    echo "El modelo ya no describe el código: no corro TLC. Llevá el cambio al modelo (ver $skill)." >&2
    return 2
  fi
  avisar_cambios "$dir" "$skill"

  # 2. TLC
  preparar_tlc || return 2
  TMP_TLC=$(mktemp -d)
  trap 'rm -rf "$TMP_TLC"' EXIT

  if [ -n "$traza" ]; then
    cfg=$(ls "$dir/$traza.cfg" "$dir/hallazgos/$traza.cfg" "$dir/variantes/$traza.cfg" 2>/dev/null | head -1)
    [ -n "$cfg" ] || { echo "No hay ningún .cfg que se llame $traza." >&2; return 2; }
    tlc "$dir" "$cfg" "$TMP_TLC/traza.out" || true
    cat "$TMP_TLC/traza.out"
    return 0
  fi

  for cfg in "$dir"/*.cfg; do
    nombre=$(basename "$cfg" .cfg); salida="$TMP_TLC/$nombre.out"
    if tlc "$dir" "$cfg" "$salida"; then
      echo "OK        $nombre: $(grep -oE '[0-9]+ distinct states found' "$salida" | tail -1), todas las reglas valen."
    else
      codigo=$?
      rota=$(regla_rota "$salida")
      if [ -n "$rota" ]; then
        echo "ROTA      $nombre: el código rompe $rota. Traza: $0 --traza $nombre" >&2; estado=1
      else
        echo "ERROR     $nombre: TLC no pudo correr (código $codigo):" >&2; tail -15 "$salida" >&2; return 2
      fi
    fi
  done

  for clase in hallazgos variantes; do
    for cfg in "$dir"/$clase/*.cfg; do
      [ -f "$cfg" ] || continue
      nombre=$(basename "$cfg" .cfg); salida="$TMP_TLC/$clase-$nombre.out"
      esperada=$(campo "$cfg" ROMPE)
      if tlc "$dir" "$cfg" "$salida"; then
        if [ "$clase" = hallazgos ]; then
          echo "CERRADO   $nombre: el hallazgo ya no ocurre. Pasá $esperada al .cfg principal y borrá hallazgos/$nombre.cfg." >&2
          [ "$estado" -eq 0 ] && estado=3
        else
          echo "NO FALLA  $nombre: la rotura tendría que romper $esperada y TLC no encontró nada." >&2; estado=1
        fi
        continue
      fi
      rota=$(regla_rota "$salida")
      if [ -z "$rota" ]; then
        echo "ERROR     $clase/$nombre: TLC no pudo correr:" >&2; tail -15 "$salida" >&2; return 2
      elif [ "$rota" != "$esperada" ]; then
        echo "DISTINTA  $clase/$nombre: rompe $rota y el .cfg anota $esperada." >&2; estado=1
      elif [ "$clase" = hallazgos ]; then
        echo "HALLAZGO  $nombre: sigue abierto, el código rompe $rota. Traza: $0 --traza $nombre"
      else
        echo "DETECTA   $nombre: la rotura rompe $rota."
      fi
    done
  done

  # 3. Los contraejemplos, repetidos sobre el código real.
  if [ "$con_jest" -eq 1 ] && ls "$dir"/*.verif.ts* >/dev/null 2>&1; then
    if npx jest --config "$dir/jest.config.js" > "$TMP_TLC/jest.out" 2>&1; then
      echo "OK        repetición sobre el código real: $(grep -E '^Tests:' "$TMP_TLC/jest.out" | sed 's/^Tests: *//')"
    else
      echo "ROTA      la repetición sobre el código real falló:" >&2
      grep -vE '^\s+at ' "$TMP_TLC/jest.out" | tail -60 >&2
      [ "$estado" -eq 0 ] && estado=1
    fi
  fi
  return $estado
}
