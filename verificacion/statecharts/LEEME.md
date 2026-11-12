# Statecharts

Cuatro cartas dibujadas con la skill `/statechart` a partir de modelos TLA+. Cada una
tiene su configuración (`.cfg`), su vista (`.vista.ts`, que pone las palabras), la carta
(`.mmd`, Mermaid) y el informe de TLC en palabras (`.informe.md`).

| Carta | Qué muestra | Modelo |
|---|---|---|
| `flujo-grafica` | (a) Fórmula → «Ver gráfica» → deslizadores → volver | `FlujoGrafica.tla`, de esta carpeta |
| `receptor-hamming` | (b) el receptor de Hamming hasta «Corregir el bit» | `../recorridos-bits/Hamming.tla`, con `SpecReceptor` |
| `receptor-vrc-lrc` | (b) el receptor de la tabla VRC/LRC hasta «Corregir el bit» | `../recorridos-bits/VrcLrc.tla`, con `SpecReceptor` |
| `crc` | (c) CRC, emisor y receptor | `../recorridos-bits/Crc.tla` |

Las cartas (b) y (c) salen de los mismos modelos que verifica
`verificacion/recorridos-bits/verificar.sh`, con constantes más chicas para que la carta
se pueda leer. `FlujoGrafica.tla` es una composición simplificada, con una sola pantalla
de cada clase, de los modelos de la sesión y de la orientación: sirve para leer el
recorrido, y lo que se verifica es lo de `verificacion/sesion-formula/` y
`verificacion/orientacion-grafica/`.

Un estado marcado `breaks` rompe una regla en todos los casos que agrupa; `mayBreak`, en
algunos. La leyenda de cada carta dice qué regla.

## Volver a generarlas

```
verificacion/statecharts/dibujar.sh RUTA_AL_COMANDO_STATECHART [CARPETA_DE_SALIDA]
```

El comando es el de la skill `/statechart`; la ruta cambia entre máquinas y versiones.
Sin `mise`, definí `TLA2TOOLS` con la ruta a `tla2tools.jar` 1.7.4.

**En Windows** el comando de `/statechart` no corre tal cual: lanza `/bin/sh`, que no
existe, y corta la salida de TLC sólo por LF, con lo que no reconoce ninguna regla rota.
Estas cartas se generaron con una copia del comando con esas dos cosas corregidas
(`"/bin/sh"` → el `sh.exe` de Git, y `split("\n")` → `split(/\r?\n/)` en `outputLines` de
`run.ts`). La skill instalada no se tocó.
