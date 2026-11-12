#!/usr/bin/env bash
# Verifica la sesión de la Fórmula: el modelo TLA+ con TLC y los contraejemplos
# repetidos sobre el código real con Jest.
#
#   verificacion/sesion-formula/verificar.sh                todo
#   verificacion/sesion-formula/verificar.sh --sin-jest     sólo TLC
#   verificacion/sesion-formula/verificar.sh --traza NOMBRE la salida de TLC de un .cfg
#
# Los códigos de salida y el formato de la carpeta están en verificacion/tla/comun.sh.
set -uo pipefail
DIR=$(cd "$(dirname "$0")" && pwd)
source "$DIR/../tla/comun.sh"
verificar_carpeta "$DIR" ".agents/skills/verificar-sesion-formula/SKILL.md" "$@"
