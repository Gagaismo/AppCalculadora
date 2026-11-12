#!/usr/bin/env bash
# Verifica la orientación de la pantalla de gráfica: el modelo TLA+ con TLC y los
# recorridos repetidos sobre el código real con Jest.
#
#   verificacion/orientacion-grafica/verificar.sh                todo
#   verificacion/orientacion-grafica/verificar.sh --sin-jest     sólo TLC
#   verificacion/orientacion-grafica/verificar.sh --traza NOMBRE la salida de TLC de un .cfg
#
# Los códigos de salida y el formato de la carpeta están en verificacion/tla/comun.sh.
set -uo pipefail
DIR=$(cd "$(dirname "$0")" && pwd)
source "$DIR/../tla/comun.sh"

# El modelo supone un único dueño de la orientación.
cd "$DIR/../.."
otros=$(grep -rlE 'lockAsync|unlockAsync|lockPlatformAsync' src --include='*.ts' --include='*.tsx' \
  | grep -vE '\.test\.tsx?$|^src/pruebas/|^src/graficas/orientacion\.ts$' || true)
usos=$(grep -rl 'useOrientacionHorizontal()' src --include='*.ts' --include='*.tsx' \
  | grep -vE '\.test\.tsx?$|^src/screens/grafica/index\.tsx$|^src/graficas/orientacion\.ts$' || true)
if [ -n "$otros$usos" ]; then
  echo "ANCLA ROTA: otro código pide orientación o usa useOrientacionHorizontal, y el modelo no lo tiene:" >&2
  printf '  %s\n' $otros $usos >&2
  exit 2
fi
# Las citas nativas del modelo valen para estas versiones.
for par in expo-screen-orientation:57.0.3 expo-modules-core:57.0.14 expo-router:57.0.17 react-native:0.86.3; do
  paquete=${par%%:*}; esperada=${par#*:}
  instalada=$(sed -n 's/^  "version": "\(.*\)",$/\1/p' "node_modules/$paquete/package.json" 2>/dev/null || true)
  [ "$instalada" = "$esperada" ] || echo "AVISO: $paquete instalado es «$instalada» y el modelo citó $esperada. Releé las citas nativas de OrientacionGrafica.tla." >&2
done

verificar_carpeta "$DIR" ".agents/skills/verificar-orientacion-grafica/SKILL.md" "$@"
