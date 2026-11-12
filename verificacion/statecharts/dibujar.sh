#!/usr/bin/env bash
# Vuelve a generar los statecharts de esta carpeta con la skill /statechart.
#
#   verificacion/statecharts/dibujar.sh RUTA_AL_COMANDO_STATECHART [CARPETA_DE_SALIDA]
#
# El comando es el `scripts/statechart` de la skill /statechart (la ruta cambia entre
# máquinas y versiones: por eso se pasa y no se escribe acá). Sin mise, definí TLA2TOOLS
# con la ruta a tla2tools.jar 1.7.4 y, si hace falta, JAVA.
# Deja un chart.mmd y un report.md por carta en la carpeta de salida y copia cada
# chart.mmd acá, como <carta>.mmd.
set -euo pipefail
[ $# -ge 1 ] || { sed -n '2,10p' "$0" >&2; exit 2; }
STATECHART=$1
DIR=$(cd "$(dirname "$0")" && pwd)
SALIDA=${2:-$(mktemp -d)}
TRABAJO=$(mktemp -d)
# TLC busca los módulos junto al que verifica: se juntan todos en una carpeta de trabajo.
cp "$DIR"/*.tla "$DIR"/*.cfg "$DIR"/*.vista.ts "$DIR"/../recorridos-bits/*.tla "$TRABAJO"/
cd "$TRABAJO"
for par in flujo-grafica:FlujoGrafica crc:Crc receptor-hamming:Hamming receptor-vrc-lrc:VrcLrc; do
  carta=${par%%:*}; modulo=${par#*:}
  rm -rf "${SALIDA:?}/$carta"
  "$STATECHART" "$modulo.tla" --config "$carta.cfg" --view "$carta.vista.ts" --out "$SALIDA/$carta" > "$SALIDA/$carta.log" 2>&1 || true
  if [ -f "$SALIDA/$carta/chart.mmd" ]; then
    cp "$SALIDA/$carta/chart.mmd" "$DIR/$carta.mmd"
    cp "$SALIDA/$carta/report.md" "$DIR/$carta.informe.md"
    echo "$carta: $(sed -n '3p' "$SALIDA/$carta/report.md")"
  else
    echo "$carta: no se generó; mirá $SALIDA/$carta.log" >&2
  fi
done
echo "Salida completa en $SALIDA"
