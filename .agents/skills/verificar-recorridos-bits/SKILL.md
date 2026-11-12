---
name: verificar-recorridos-bits
description: Verifica con modelos TLA+ los recorridos «paso a paso» de CRC, Hamming y VRC/LRC — que el paso en pantalla siempre exista, que no se avance con una entrada inválida y que «Corregir el bit» sólo se ofrezca sobre el bit que de verdad llegó cambiado. Usala antes de commitear cualquier cambio a paso, total, ir, el cambio de modo o de vista, corregido o corregida en src/screens/bits/crc.tsx, hamming.tsx, vrc-lrc.tsx o pasos.tsx, o a decodificarHamming y verificarTabla en src/bits/, y cuando alguien reporte «Paso 9 de 8», una pantalla en blanco a mitad del recorrido o una corrección que deja mal el resultado.
---

# Verificar los recorridos paso a paso de las herramientas de bits

Las tres pantallas de `src/screens/bits/` guardan un `paso` y calculan `total` a partir
de la entrada y del modo. Nada ata uno al otro: lo único que mantiene `paso < total` es
que cada manejador que cambia el total también vuelva el paso a 0. En el receptor, además,
`corregido`/`corregida` es un interruptor aparte de lo que se está mostrando.

Son máquinas de estados, así que la herramienta es un modelo TLA+ por pantalla,
verificado con TLC. Esta es la parte de **estados**; que las cuentas den bien (la
división, las paridades) lo prueban los tests de `src/bits/` contra los ejemplos de la
cátedra.

## Las reglas

| Regla | Modelos | En una frase | Daño si se rompe |
|---|---|---|---|
| `PasoDentroDelRecorrido` | los tres | El paso en pantalla siempre existe: `paso < total`. | «Paso 9 de 8», o `grupos[paso - 1]` indefinido y la pantalla se cae. |
| `FueraDeLaEntradaHay…` | los tres | Fuera de la entrada siempre hay un cálculo que mostrar. | Pantalla en blanco: con la entrada inválida no hay nada que dibujar. |
| `AvisoSoloEnLaEntrada` | Crc | El aviso de entrada inválida sólo se ve en la entrada. | Un aviso viejo queda pegado en otro paso. |
| `Corregid?SoloDondeSePuede` | Hamming, VrcLrc | «Corregido» sólo se muestra en el resultado del receptor y con un bit señalado. | Se anuncia una corrección que no se hizo. |
| `CorregirSoloConUnError` | Hamming, VrcLrc | «Corregir el bit» sólo se ofrece cuando llegó cambiado un único bit, y es el señalado. | Lo «corregido» no es lo que se emitió. |
| `CorregirNoRompeUnBitSano` | Hamming, VrcLrc | «Corregir el bit» nunca invierte un bit que llegó bien. | La corrección agrega un error. |
| `UnErrorSeUbica`, `UnErrorNoPasaPorBueno` | Hamming | Con un solo bit cambiado, el resultado lo señala a ese. | Se culpa a un bit que no es. |
| `UnBitCambiadoSeDetecta` | VrcLrc | Un solo bit cambiado, sea cual sea, nunca termina en «Sin error detectado». | Un error de un bit pasa por bueno. |

Las reglas de corrección necesitan saber qué bits llegaron cambiados, y la pantalla no lo
sabe: sólo ve lo recibido. Por eso los modelos tienen una variable `cambiados` que **no
está en el código**: los bits que llegaron distintos de como se emitieron. Vale bajo un
supuesto escrito en la cabecera de cada modelo: lo emitido era correcto. Entonces qué
grupo, fila o columna falla depende sólo de `cambiados`, porque la paridad es lineal.

## Hallazgos abiertos

**`vrcLrc-esquinaSinVerificar`** rompe `UnBitCambiadoSeDetecta`, con **un** bit cambiado.

1. En VRC/LRC, «Receptor». Lo recibido es igual a lo emitido.
2. Tocás la esquina de la tabla: llega cambiada.
3. «Siguiente» hasta el resultado: **«Sin error detectado»**.

`verificarTabla` (`src/bits/paridad.ts`) recibe los datos, el LRC y el VRC, pero no la
esquina que llegó: la pantalla la dibuja y la deja tocar, y nadie la compara.

**`vrcLrc-dosErroresDeControl`** rompe `CorregirNoRompeUnBitSano`, con dos bits cambiados.

1. «Receptor», con lo recibido igual a lo emitido.
2. Tocás el VRC de una columna y el LRC de una fila: llegan cambiados dos bits de control.
3. En el resultado falla exactamente esa fila y esa columna, así que la pantalla dice
   «Error en B… · D…» y ofrece «Corregir el bit».
4. «Corregir» invierte el dato del cruce, que había llegado bien.

Los dos hallazgos tienen la misma causa. `VrcLrc-propuestaVerificarEsquina.cfg` es el
mismo modelo con `VerificaEsquina = TRUE` —la esquina que llegó también se compara, y si
no cierra no hay cruce único— y ahí las dos reglas valen con hasta dos bits cambiados.
Es una propuesta modelada, no código: decidir si se aplica le toca a quien mantiene la
pantalla.

**`hamming-dosErrores`** rompe `CorregirNoRompeUnBitSano`, con dos bits cambiados.

1. En Hamming, «Verificar (receptor)». Llegan cambiadas las posiciones 1 y 2.
2. El síndrome da 3. La pantalla dice «error en la posición 3» y ofrece «Corregir el bit».
3. «Corregir» invierte la posición 3, que había llegado bien: quedan tres bits mal.

Es el límite del código de Hamming, no un error de cuentas: con distancia 3 corrige un
error y no distingue dos de uno. Lo que el hallazgo marca es que la pantalla lo presenta
como una corrección segura. Si el texto pasa a avisarlo, la regla sigue rota en el modelo
y el hallazgo se queda, con esa nota.

Los tres están repetidos sobre las pantallas reales en `repeticion.verif.tsx`, pruebas
«HALLAZGO …». Afirman lo que el código hace hoy; el día que uno se arregle su prueba va a
fallar, y ahí: invertí la afirmación, pasá la regla al `.cfg` principal con la cota que
corresponda, borrá su `.cfg` de `hallazgos/` y llevá el cambio al modelo.

## Cobertura

Commit de sincronización: `d8942313af22e499fd8e351863ee17924a10e577`

| Código | Parte del modelo |
|---|---|
| `src/screens/bits/pasos.tsx`, `NavegacionPasos` | `Siguiente`, `Anterior` de los tres modelos |
| `src/screens/bits/crc.tsx`: `total`, `ir`, el selector de modo, el teclado y los generadores | `Crc.tla`: `Total`, `Ir`, `CambiarDeModo`, `EditarLaEntrada` |
| `src/screens/bits/hamming.tsx`: `total`, `ir`, el selector de modo, el teclado, `corregido`, `PasoReceptor` | `Hamming.tla`: `Total`, `Ir`, `CambiarDeModo`, `EditarLosDatos`, `EditarElLargoDeLaRecibida`, `UnBitLlegaCambiado`, `Corregir`, `DiceSinError`, `SenialaUnaPosicion` |
| `src/bits/hamming.ts`, `decodificarHamming`: `p`, `cumple`, `posicion > total` | `Hamming.tla`: `PDe`, `GrupoFalla`, `Posicion`, `DiceQueNoSePuedeCorregir` |
| `src/screens/bits/vrc-lrc.tsx`: `total`, `ir`, `reiniciar`, los selectores de vista, modo y paridad, `onCelda`, `onControl`, `corregida`, `ResultadoReceptor` | `VrcLrc.tla`: `Total`, `Ir`, `Reiniciar`, `CambiarDeVista`, `CambiarDeModo`, `CambiarLaParidad`, `UnBitLlegaCambiado`, `Corregir`, `DiceSinError`, `SenialaUnBit` |
| `src/bits/paridad.ts`, `verificarTabla` | `VrcLrc.tla`: `FilasConError`, `ColumnasConError`, `HayCruceUnico` |

Los archivos cubiertos están en `verificacion/recorridos-bits/cubiertos.txt` y los textos
exactos que los modelos representan, en `anclas.txt`.

**¿Tu cambio la toca?** Sí, si toca un archivo de `cubiertos.txt`; en particular si
agrega un manejador que cambie la entrada, el modo o la vista, si cambia de qué depende
`total`, o si deja editar fuera del paso 0.

## El comando

```
verificacion/recorridos-bits/verificar.sh
```

Tarda cerca de un minuto (TLC unos 30 segundos, casi todos en la propuesta de la
esquina; el resto es Jest). Necesita Java 11 o posterior. La primera vez descarga
`tla2tools.jar` 1.7.4 a `~/.cache/tla2tools/1.7.4/` y verifica su sha256; con `TLA2TOOLS`
se le pasa uno ya descargado. `--sin-jest` corre sólo TLC.

Corre, en orden: las anclas; TLC sobre los `.cfg` de la carpeta (tienen que pasar), sobre
`hallazgos/*.cfg` (cada uno tiene que seguir rompiendo su regla) y sobre `variantes/*.cfg`
(once roturas a propósito); y `repeticion.verif.tsx` sobre las pantallas reales.

| Salida | Qué pasó |
|---|---|
| 0 | Todo está como quedó registrado: las reglas valen dentro de las cotas de los `.cfg` principales, los tres hallazgos siguen abiertos (`HALLAZGO`), las roturas se detectan. |
| 1 | Una regla se rompe donde no debía (`ROTA`), una rotura no se detecta (`NO FALLA`) o la repetición falla. |
| 2 | Una ancla se rompió o TLC no pudo correr: el modelo ya no describe el código. |
| 3 | Un hallazgo registrado ya no ocurre (`CERRADO`). |

**Salida 0 no significa «sin errores».** Significa que no hay errores nuevos.

## Las cotas

| `.cfg` | Cotas |
|---|---|
| `Crc.cfg` | divisiones de 0 a 4 XOR, o entrada inválida |
| `Hamming.cfg` | emisor con p de 2 a 4; palabra recibida de 3 o 6 bits; **a lo sumo un bit cambiado** |
| `VrcLrc.cfg` | la tabla real de 7 × 8; BCC de 1 a 3 bits de ancho; **a lo sumo un bit cambiado**; sin `UnBitCambiadoSeDetecta` |
| `VrcLrc-propuestaVerificarEsquina.cfg` | lo mismo con `VerificaEsquina = TRUE`, hasta dos bits cambiados, y las seis reglas |

`PasoDentroDelRecorrido` no depende de cuántos bits llegan cambiados. Las reglas de
corrección valen **sólo** hasta la cota de errores de cada `.cfg`.

## Cómo leer un resultado

Pedí la traza con `verificar.sh --traza NOMBRE` (el nombre de cualquier `.cfg`) y leela
con la skill **`/statechart`**: muestra el camino más corto a la regla rota en palabras y,
cuando todo pasa, dibuja cómo se mueve el sistema. No copies acá sus comandos ni sus
rutas, cambian entre versiones. Los receptores de Hamming y de VRC/LRC y el CRC ya están
dibujados en `verificacion/statecharts/`.

Una regla rota es **un error real** si cada paso de la traza es un toque que la pantalla
permite en ese paso: buscá la acción en la tabla de cobertura y abrí el manejador. Es
**un error del modelo** si algún paso no se puede dar, por ejemplo editar un bit fuera
del paso 0. Antes de dar por real un error, repetilo en `repeticion.verif.tsx`, un toque
por acción. Si ahí no ocurre, el modelo está mal.

## Cuando el cambio es intencional

1. Llevá el cambio al modelo de esa pantalla. Un manejador nuevo es una acción nueva en
   `Next`, y también en `NextReceptor` si vale en el receptor.
2. Actualizá `anclas.txt`.
3. Si agregaste un comportamiento, agregale una variante que lo rompa en `variantes/`.
4. Si cambiaste un modelo que `verificacion/statecharts/` dibuja, volvé a generar las
   cartas (ver su `LEEME.md`).
5. Corré el comando. Recién cuando salga 0 y hayas confirmado que los modelos describen el
   código en el commit nuevo, adelantá el «Commit de sincronización» de esta skill.

## Lo que no cubre

- **Las cuentas**: la división módulo 2, las paridades, las posiciones de Hamming. Los
  modelos reemplazan la entrada por lo que decide el recorrido. Eso es de los tests de
  `src/bits/`.
- **Que una división de CRC pueda no tener ningún XOR.** El modelo lo admite por las
  dudas; si no puede pasar, sobra y no cambia ninguna regla.
- **El selector Par/Impar.** El modelo supone que el receptor usa la misma paridad con la
  que se emitió. Con la otra fallan todas las filas y columnas a la vez.
- **Más bits cambiados que la cota.** Con tres o más, la paridad bidimensional y Hamming
  corrigen mal por diseño.
- **El emisor de la tabla VRC/LRC**, que sólo invierte datos y no cambia cuántos pasos hay.
- **Qué se dibuja** en cada paso: textos, marcas y colores.
