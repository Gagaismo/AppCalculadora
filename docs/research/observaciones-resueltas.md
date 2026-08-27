# Observaciones de verificación: resolución

Las 16 Fórmulas que [`formulas-comunicaciones.md`](formulas-comunicaciones.md) marca con ⚠️ tienen
una observación de verificación. El catálogo las **anota pero no las aplica**: la fórmula figura
como la extrajo el primer lector, con la observación debajo.

La regla dura 3 de [`AGENTS.md`](../../AGENTS.md) dice que se resuelven explícitamente antes de
implementarlas y nunca en silencio. Este archivo es ese registro. Al cargar una Fórmula marcada ⚠️,
**aplicar lo que dice acá; no volver a decidirlo**.

## El hallazgo principal

**Ocho de las dieciséis observaciones no describen un problema de la fórmula, sino del esquema JSON
con el que trabajó el extractor.** Hablan de que `variables[].simbolo` no liga con
`despejable_para`, de un campo `significado_extra` espurio, de una `expresion_latex` que un parser
no puede evaluar.

Nuestro modelo no tiene ninguno de esos campos. No hay `despejable_para`: la Variable de salida es
fija y el resto son entradas. No hay `expresion_latex` que se interprete en tiempo de ejecución:
`calcular()` es una función TypeScript y el símbolo de cada Variable es la clave con la que se la
recibe, así que **si un símbolo no liga, el proyecto no compila**. Y un campo de más tampoco
compila, porque el tipo `Formula` los enumera.

Es decir: la decisión arquitectónica de tratar las Fórmulas como datos tipados en vez de como
cadenas interpretadas **disuelve la mitad de las observaciones sin que haya que hacer nada**. Vale
anotarlo para la defensa oral: no se arreglaron ocho errores uno por uno, se eligió un modelo en el
que esos ocho no pueden ocurrir.

Las ocho restantes sí son decisiones, y están tomadas abajo.

## Resumen

| ID | Gravedad | Resolución |
|---|---|---|
| `U02-F19` | rompe-el-cálculo | **Decisión.** Corregir el signo y clasificarla como no calculable. |
| `U04-F09` | menor | Disuelta por el modelo. |
| `U04-F10` | menor | Disuelta por el modelo. |
| `U04-F11` | menor | **Decisión.** Unidad de medida `s/símbolo`, símbolo único. |
| `U04-F14` | menor | Disuelta por el modelo. |
| `U04-F15` | menor | Disuelta por el modelo. |
| `U04-F16` | menor | Disuelta por el modelo. |
| `U05-F04` | menor | **Decisión.** Misma unidad de medida que `U04-F11`. |
| `U05-F13` | menor | **Decisión.** Renombrar el símbolo a `T_muestreo`. |
| `U08-F02` | menor | **Decisión.** Una sola Fórmula, salida `n`. |
| `U08-F08` | menor | **Decisión.** Partir en `U08-F08a` y `U08-F08b`. |
| `U08-F09` | menor | Disuelta por el modelo. |
| `U08-F10` | menor | **Decisión.** Salida `M` rotulada como cota superior. |
| `U08-F13` | menor | **Decisión.** Renombrar el símbolo a `T_muestreo`. |
| `U09-F09` | menor | Disuelta por el modelo. |
| `U10-F05` | rompe-el-cálculo | Disuelta por el modelo. |

## Las ocho disueltas

**`U04-F09`, `U04-F10`, `U04-F14`, `U04-F15`, `U04-F16`, `U08-F09`.** Todas son la misma
observación: el símbolo declarado en `variables` no coincide literalmente con el token que pide
`despejable_para` — `σ̄ (sigma barra)` contra `\bar{\sigma}`, `L̄ (L barra)` contra `\bar{L}`,
`v_p(t)` contra `v_p`. El catálogo advierte que «un resolvedor que haga lookup por nombre no puede
ligar la variable».

No tenemos resolvedor que haga lookup por nombre. Al cargar la Fórmula se elige **un** símbolo por
Variable y `calcular()` lo recibe con esa misma clave; TypeScript verifica la correspondencia al
compilar. Elegir el símbolo es parte normal de la transcripción, no una corrección.

El catálogo confirma además que el contenido matemático de las seis es correcto y verifica contra
sus Ejemplos resueltos.

**`U09-F09`.** El objeto de `B_canal` arrastra un `"significado_extra": ""` que el catálogo llama
«basura de extracción». Nuestro tipo `Variable` no tiene ese campo, así que no se puede escribir.
La fórmula `B_canal = B_total / N_canales` está verificada contra la página 26 (1,104 MHz / 256 =
4312,5 Hz exacto).

**`U10-F05`** — marcada rompe-el-cálculo, y es la más interesante de las disueltas. La observación
es que `R_s,total` se declara en GBaudios y `R_s,par` en MBaudios, así que «una app que respete los
campos `unidad` literalmente calcularía 4 × 833,33 = 3333,32 y lo rotularía GBaudios», con un error
de factor 1000.

La corrección que propone el catálogo es «declarar la MISMA unidad base en ambas variables, dejando
el prefijo (M/G) como conversión de presentación, no como parte del modelo». Eso es exactamente
nuestro modelo: `unidadDeMedida` es siempre la unidad base —acá `Bd`— y el múltiplo es un campo
aparte que el motor convierte antes de calcular. La observación describe el error que la regla dura
5 existe para evitar, y describe nuestra arquitectura como su solución.

Al cargarla: ambas Variables con `unidadDeMedida: 'Bd'`, `R_s,par` con `multiploCanonico: 'M'` y la
salida con `'G'`. Sin ningún tratamiento especial.

## Las ocho decisiones

### `U02-F19` — Relación entre coeficientes complejos y trigonométricos

**Qué pasa.** La diapositiva 46 se contradice a sí misma. Su línea de definición escribe
`C_n = ½(a_n + j·b_n)`, pero el desarrollo algebraico de esa **misma página** llega a que el
coeficiente de `e^{+jnω₀t}` —que es `C_n` por definición— es `½(a_n − j·b_n)`. Los signos están
invertidos entre una línea y la otra.

**Qué decide el desempate.** El Ejemplo resuelto de la propia cátedra. Para la onda cuadrada, la
página 32 da `a_n = 0` y `b_n = 4/(nπ)` con n impar, y las páginas 50–51 obtienen `C_1 = −j·2/π`.
Eso sólo se cumple con `C_n = ½(a_n − j·b_n)`. Con la línea de definición de la página 46 saldría
`C_1 = +j·2/π`, el conjugado.

**Decisión.** Se implementa `C_n = ½(a_n − j·b_n)` y `C_-n = ½(a_n + j·b_n)`. `C_0 = a_0/2` queda
como está, que es correcto. La ficha muestra la errata de la diapositiva como observación, para que
quien use la app y compare contra el PDF entienda la diferencia en vez de creer que la app está mal.

**Y además: se clasifica como no calculable.** El resultado es un número complejo, y el motor
devuelve un `number`. Entra como ficha de consulta, con su expresión y sus símbolos, sin campos de
entrada. Esto se coordina con la clasificación del ticket #5.

### `U04-F11` y `U05-F04` — la duración del símbolo

**Qué pasa.** Son la misma fórmula, `r = 1/σ = 1/T_S`, y las dos arrastran una inconsistencia
dimensional. `U04-F11` declara una única variable con el símbolo compuesto `σ = T_S` y unidad
«segundo», pero la fórmula exige leerla como segundos **por símbolo** para que `r` salga en
símbolos por segundo. `U05-F04` declara `σ` en `seg/símbolo` y `T_S` en `seg`, afirmando en la
misma expresión que son iguales.

**Decisión.** Las dos se cargan con **una sola Variable de entrada**, símbolo `T_s`, significado
«duración del símbolo», `unidadDeMedida: 's/símbolo'`. En `condiciones` se deja constancia de que
la cátedra la escribe indistintamente `σ` o `T_S`. La salida es `r` en `símbolo/s`.

La unidad de medida se elige por lo que hace la fórmula, no por lo que dice la etiqueta de la
diapositiva: si `r = 1/T_s` tiene que dar símbolos por segundo, `T_s` está en segundos por símbolo.

### `U05-F13` y `U08-F13` — colisión de `T_s` con la duración del símbolo

**Qué pasa.** En las dos, `T_s` es el **período de muestreo**, mientras que en otras fórmulas de la
misma Unidad el mismo token es la **duración del símbolo**. `U05-F13` colisiona con `U05-F04`,
`U05-F06`, `U05-F10` y `U05-F11`; `U08-F13` colisiona con `U08-F01` y `U08-F04`. Son magnitudes
distintas escritas igual, y la ambigüedad viene de la fuente: la cátedra usa `T_S` para las dos cosas.

El catálogo advierte que si la app compartiera una tabla de símbolos entre las Fórmulas de una
Unidad, cargar una frecuencia de muestreo alimentaría en silencio las fórmulas que esperan duración
de símbolo, «produciendo un número plausible y equivocado».

**Decisión, en dos partes.**

La primera ya está tomada en la arquitectura: **los símbolos pertenecen a la Fórmula, no a la
Unidad.** No hay tabla compartida, así que el escenario que describe el catálogo no puede ocurrir.

La segunda es para quien usa la app, no para el código: en estas dos Fórmulas el símbolo se declara
**`T_muestreo`**, con `condiciones` aclarando que la diapositiva lo escribe `T_s`. Que el código no
pueda confundirlas no significa que la persona que las lee tampoco: ver `T_muestreo` y `T_s` en dos
fichas distintas es lo que evita que confunda las magnitudes al resolver un ejercicio a mano.

`T_muestreo = 1/f_s` es correcta y no cambia.

### `U08-F02` — `n = log₂ M` y `M = 2ⁿ`

**Qué pasa.** El catálogo empaqueta dos ecuaciones en un solo identificador, separadas por un
delimitador tipográfico. Ambas están en la fuente: la página 29 las escribe juntas.

**Decisión.** Entra **una sola Fórmula**, con expresión `n = log₂ M` y salida `n`. Los dos Ejemplos
resueltos de la cátedra van en ese sentido: M = 2 → n = 1 (pág. 29) y M = 4 → n = 2 (pág. 31).
`M = 2ⁿ` no aparece resuelto en ningún ejercicio propio; en la página 29 figura como reformulación
del mismo caso.

Es la aplicación directa del criterio de despejes: **entra el despeje que la cátedra resuelve**. Si
más adelante aparece un TP que pida `M` a partir de `n`, se agrega como Fórmula propia con su caso.

### `U08-F08` — frecuencias de marca y espacio en FSK

**Qué pasa.** `f_1 = f_P + Δf` y `f_2 = f_P − Δf` comparten un identificador. El catálogo señala la
consecuencia funcional: si se cargan `f_P` y `Δf`, la app no sabe cuál de las dos devolver.

**Decisión.** Se parten en dos Fórmulas, siguiendo la propia recomendación del catálogo:

- `U08-F08a` — frecuencia de marca, `f_1 = f_P + Δf`, salida `f_1`.
- `U08-F08b` — frecuencia de espacio, `f_2 = f_P − Δf`, salida `f_2`.

No es un despeje agregado: son dos fórmulas distintas que la fuente escribe en una línea. La
transcripción está verificada contra la página 19.

Consecuencia para el invariante de cobertura del catálogo (#4): el identificador `U08-F08` del
índice se corresponde con dos entradas en los datos. El invariante tiene que aceptar ese caso en
vez de reportarlo como faltante.

### `U08-F10` — cota del número de estados en QAM

**Qué pasa.** No es una igualdad, es una desigualdad: `M ≤ N°Fases × N°Amplitudes`, marcada con (*)
en la página 38. Despejando `N°Fases` se obtiene una cota inferior, no un valor, y la app estaría
devolviendo «N° Fases = 4» cuando la verdad es «N° Fases ≥ 4».

**Decisión.** Entra con **una sola salida, `M`**, que es el único sentido en que la cota conserva su
significado: `M_max = N°Fases × N°Amplitudes`. El significado de la Variable de salida dice
explícitamente **«cota superior del número de estados»**, para que el número que aparece en pantalla
se lea como lo que es. Los otros dos despejes no entran.

No tiene Ejemplo resuelto en el catálogo. Es una de las Fórmulas que queda sin test contra la
cátedra, y hay que anotarlo al cargar la Unidad 8: la regla dura 2 pide un test contra el Ejemplo
resuelto, y acá no hay ninguno que pedir.
