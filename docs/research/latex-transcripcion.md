# Transcripción de las expresiones LaTeX

La app va a renderizar cada Fórmula como notación matemática de verdad —fracciones con barra
horizontal, subíndices, integrales— en vez del texto plano que muestra hoy. El LaTeX no se escribe
de cero: [`formulas-comunicaciones.md`](formulas-comunicaciones.md) ya trae una expresión LaTeX
para las 140 Fórmulas, verificada y citada a su página de origen.

Este archivo es la regla para transcribirlas. **Leelo antes de cargar un solo `expresionLatex`.**

## La regla

> **El LaTeX tiene que coincidir con los símbolos que la Fórmula declara en el código, no con los
> que escribe la diapositiva.**

No es una preferencia de estilo. La expresión se dibuja justo encima de los campos de entrada: si
arriba dice `σ` y el campo de abajo se rotula `T_s`, la app le está mostrando a quien la usa dos
nombres para la misma magnitud, en la única pantalla donde no puede permitírselo. Las reglas duras
5 y 6 de [`AGENTS.md`](../../AGENTS.md) existen para evitar exactamente esa confusión.

Copiar el LaTeX del catálogo tal cual **rompe esa regla en al menos nueve Fórmulas**, verificadas
una por una y listadas abajo. No son erratas sueltas: son la consecuencia esperable de que el
catálogo registre lo que dice la fuente, mientras que
[`observaciones-resueltas.md`](observaciones-resueltas.md) ya decidió, para varias de ellas, llamar
a las cosas de otra manera. Las dos cosas están bien; lo que no puede pasar es transcribir sin
aplicar la segunda.

## Los nueve casos verificados

En todos, la columna «código» es lo que ya está cargado en `src/formulas/` y **no se toca**: es el
LaTeX el que se adapta.

| ID | LaTeX del catálogo | Símbolos en el código | Qué hacer |
|---|---|---|---|
| `U02-F19` | `C_n = \frac{1}{2}(a_n + j b_n)` | expresión ya corregida a `−` | **Invertir el signo.** El catálogo reproduce la errata de la diapositiva 46; la decisión de implementar `C_n = ½(a_n − j·b_n)` ya está tomada y el desempate es el Ejemplo resuelto de la cátedra. La errata se sigue mostrando como observación en la ficha, no en la expresión. |
| `U04-F11` | `r = \frac{1}{\sigma} = \frac{1}{T_S}` | entrada `T_s`, salida `r` | Dejar `r = \frac{1}{T_s}`. `\sigma` no es un campo de la app y `T_S` no es `T_s`. |
| `U05-F04` | `r = \frac{1}{\sigma} = \frac{1}{T_S}` | entrada `T_s`, salida `r` | Igual que `U04-F11`: son la misma fórmula. |
| `U05-F13` | `T_s = \frac{1}{f_s}` | entrada `f_s`, salida `T_muestreo` | `T_{muestreo} = \frac{1}{f_s}`. El renombre es deliberado: evita que se confunda con la duración del símbolo. |
| `U08-F13` | `T_S = \frac{1}{f_S}` | entrada `f_s`, salida `T_muestreo` | Igual que `U05-F13`, y además `f_S` → `f_s`. |
| `U08-F02` | `n = \log_2 M \qquad ; \qquad M = 2^{n}` | entrada `M`, salida `n` | Dejar sólo `n = \log_2 M`. Entró una sola Fórmula; la segunda ecuación no tiene Ejemplo resuelto. |
| `U08-F08` | `f_1 = f_P + \Delta f \qquad ; \qquad f_2 = f_P - \Delta f` | `U08-F08a` y `U08-F08b`, entradas `f_p` y `delta_f` | **Una fila del catálogo, dos Fórmulas.** `f_1 = f_p + \Delta f` para la primera, `f_2 = f_p - \Delta f` para la segunda. Ojo con `f_P` → `f_p`. |
| `U08-F10` | `M \le N^{\circ}\ Fases \times N^{\circ}\ Amplitudes` | entradas `N_fases`, `N_amplitudes`, salida `M` | `M \le N_{fases} \times N_{amplitudes}`. **El `\le` se conserva**: la Fórmula calcula una cota superior y la expresión tiene que decirlo. |
| `U04-F16` | `\eta = \frac{H(x)}{\bar{L}}` | entradas `H`, `L̄`, salida `η` | `\eta = \frac{H}{\bar{L}}`. Sólo `H(x)` → `H`: la trampa de `\bar{L}` se disolvió al unificar el símbolo (ver abajo). |

## Lo que cambió al cargar las nueve Unidades

Cargar las 138 expresiones destapó algo que la auditoría de gabinete no podía ver: **el
catálogo declaraba la misma magnitud con dos nombres distintos**, en Fórmulas que se
encadenan entre sí.

| Estaba | Quedó | Por qué |
|---|---|---|
| `σ̄` (salida de `U04-F09`) y `sigma_prom` (entrada de `U04-F10`) | `σ̄` en las dos | `U04-F10` consume lo que `U04-F09` produce. Con dos nombres, quien encadena las dos pantallas no reconoce el número que acaba de calcular. |
| `L̄` (salida de `U04-F14` y `U04-F15`) y `L_prom` (entrada de `U04-F16`) | `L̄` en las tres | Lo mismo. |
| `alpha`, `sigma`, `lambda` en ASCII | `α`, `σ`, `λ` | La `expresion` en texto plano de esas mismas Fórmulas ya usaba la letra griega: el símbolo se contradecía con su propia Fórmula. |
| `I_{TOTAL}`, `I_{j,L}`, `H_{MAX}` | `I_TOTAL`, `I_j,L`, `H_MAX` | Las llaves eran un resto de la transcripción y se dibujaban **literalmente** en el rótulo del campo. `H_{MAX}` y `H_MAX` convivían en Fórmulas contiguas. |

Las claves que `calcular` desestructura siguen funcionando: el código ya usaba claves
computadas (`{ ['L̄']: L_prom }`) para los símbolos que no son identificadores.

Tres símbolos **no** se tocaron, y el extractor los acepta por alias declarado:
`E_b/N_0` (la barra es parte del nombre de la relación), `Σ P_i` y `e^(±jθ)` y
`|F(f)|²` (son el rótulo de una notación, no una magnitud con un campo debajo).

Los otros cinco casos que `observaciones-resueltas.md` marca como «disueltos por el modelo»
(`U04-F09`, `U04-F10`, `U04-F14`, `U04-F15`, `U09-F09`) son de la misma familia: el catálogo usa
`\bar{\sigma}`, `\bar{L}` o `v_p(t)` donde el código eligió un símbolo simple. **Revisalos con el
mismo criterio** aunque no estén en la tabla: la regla es una sola y aplica a las 140.

## El invariante que lo vigila

La regla anterior no depende de que nadie se distraiga: hay un test que la verifica
mecánicamente para las 140 Fórmulas. Extrae los identificadores de `expresionLatex`, los normaliza
(`\eta` → `η`, `T_{muestreo}` → `T_muestreo`, `\Delta f` → `Δf`) y comprueba que **todo símbolo
declarado en `entradas[].simbolo` y en `salida.simbolo` aparezca en la expresión**.

Es el mismo criterio que la regla dura 3 aplica al cálculo: una Fórmula sin su test no está
terminada. Acá la transcripción sin su comprobación tampoco.

Lo que el invariante **no** puede verificar —y por eso la tabla de arriba existe— es si el LaTeX
dice lo que la fuente quiso decir. Que los símbolos liguen no prueba que el signo sea el correcto:
`U02-F19` habría pasado el invariante con la errata puesta.

## Qué se conserva

`Formula.expresion`, el texto plano de hoy, **no se borra**. Sigue siendo:

- el respaldo si el pre-renderizado de una expresión falla en el build;
- la etiqueta que lee el lector de pantalla, porque un SVG no tiene texto accesible;
- lo que indexa la búsqueda.

`expresionLatex` es un campo nuevo que se suma, no un reemplazo.
