#!/usr/bin/env bash
# Verifica los recorridos «paso a paso» de CRC, Hamming y VRC/LRC: los modelos TLA+ con
# TLC y los contraejemplos repetidos sobre el código real con Jest.
#
#   verificacion/recorridos-bits/verificar.sh                todo
#   verificacion/recorridos-bits/verificar.sh --sin-jest     sólo TLC
#   verificacion/recorridos-bits/verificar.sh --traza NOMBRE la salida de TLC de un .cfg
#
# Los códigos de salida y el formato de la carpeta están en verificacion/tla/comun.sh.
set -uo pipefail
DIR=$(cd "$(dirname "$0")" && pwd)
source "$DIR/../tla/comun.sh"
verificar_carpeta "$DIR" ".agents/skills/verificar-recorridos-bits/SKILL.md" "$@"
