---
name: verificar-diagnostico-guia
description: Verifica que el profe guía y la pantalla de Fórmula digan lo mismo — el guía reta sólo si la pantalla marca un campo, nombra justo esos campos o los que faltan, festeja sólo con resultado y repite ese resultado, los mensajes de la pantalla no cambian y nada muestra NaN ni se cae. Usala cuando un cambio toque src/guia/diagnostico.ts, src/guia/frases.ts, src/screens/formula/index.tsx, src/screens/formula/numeros.ts, src/dominio/motor.ts o src/dominio/multiplos.ts, o cuando se cargue o cambie una Fórmula en src/formulas/.
---

# Verificar el diagnóstico de la Fórmula y la reacción del profe guía

La pantalla de Fórmula y el guía leen el **mismo** diagnóstico (`diagnosticar` en
`src/guia/diagnostico.ts`): la pantalla dibuja su mensaje y sus campos marcados, y el
guía elige animación y frase con `fraseDelGuia` (`src/guia/frases.ts`). Esta
verificación genera textos de campo al azar —con comas, signos, vacíos, unicode, `NaN`,
desbordes— sobre **todas** las Fórmulas con entradas del registro (`src/formulas/index.ts`)
y comprueba cinco promesas contra un oráculo escrito aparte.

No hay verificador formal para TypeScript/React Native que corra sobre este código,
así que la herramienta es **prueba con entradas generadas sobre el código real**, con
Jest del repo y un generador propio con semilla (sin dependencias nuevas).

## Las cinco propiedades

| | Propiedad | Daño si se rompe |
|---|---|---|
| P1 | El guía reta (`retando`) si y sólo si la pantalla marca algún campo con «Debe ser un número válido», y la pantalla marca un campo si y sólo si tiene un texto que no es un número. | El guía reta a alguien que no se equivocó, o calla ante un error que la pantalla sí muestra. |
| P2 | Cuando reta, el globo nombra exactamente los campos marcados, en el orden de la Fórmula; cuando falta cargar algo (estado `faltantes`), nombra exactamente los que faltan, los mismos que lista «Falta(n): …». | El guía manda a mirar un campo que está bien, u omite el que está mal. |
| P3 | El guía festeja (`festejando`) si y sólo si la Fórmula da un resultado finito, y su globo contiene el texto de `resultado` tal cual. | El guía felicita sin resultado, o dice un número distinto del de la pantalla: en una defensa oral, dos números para la misma cuenta. |
| P4 | El texto de `resultado` es, byte a byte, el mensaje del diagnóstico (`Entrada no numérica en …`, `Falta: …`/`Faltan: …`, `La fórmula no está definida para los valores cargados.`), y en éxito leído de vuelta (`«número» «múltiplo»«unidad»`) vale lo que da la `calcular()` de la Fórmula. | El guía o un cambio de copia altera lo que la pantalla ya decía, o el número visible no es la cuenta. |
| P5 | Para cualquier texto, `diagnosticar` y `fraseDelGuia` no lanzan, y ni `resultado` ni el globo contienen `NaN`, `Infinity`, `undefined`, `null` ni `[object`. | La pantalla se cae o muestra basura en lugar de un mensaje. |

## Cómo se corre

Un solo comando, desde la raíz del repo:

```
npx jest --config verificacion/diagnostico-guia/jest.config.js
```

Tarda unos 15 s. Son dos archivos:

- `verificacion/diagnostico-guia/diagnostico-guia.verif.ts` — capa pura: **1000 casos
  por Fórmula × 124 Fórmulas con entradas** (124 000 casos), semilla `20261112`. Lo que
  «ve» la pantalla se toma del diagnóstico, porque es lo que la pantalla dibuja. Falla
  una prueba por propiedad (`P1 se cumple…` … `P5 se cumple…`) con el conteo y los cinco
  contraejemplos más cortos.
- `verificacion/diagnostico-guia/pantalla-guia.verif.tsx` — capa de pantalla, con RNTL
  (`await render`, `await fireEvent`): 10 Fórmulas (siempre `U04-F06`, de lista, y
  `U10-F07`; el resto al azar con la semilla) × 6 casos. Tipea los textos en los campos,
  agrega campos de lista con `agregar-*`, y lee `error-campo-*`, `resultado`,
  `guia-globo` y la hoja de `guia-sprite-hoja` (la animación se reconoce por su hoja en
  `ANIMACIONES`). Cada caso es un test con nombre legible, por ejemplo
  `U10-F07: f_sup = "6,42" [GHz]; f_inf = "1,5.3" [GHz]`.

Variables de entorno (opcionales, sólo para explorar; la corrida de registro usa los
valores por defecto):

- `VERIFICAR_SEMILLA=<entero>` — otra semilla. Un contraejemplo se reproduce con la
  misma semilla.
- `VERIFICAR_ITERACIONES=<n>` — casos por Fórmula en la capa pura (1000).
- `VERIFICAR_FORMULAS_PANTALLA=<n>`, `VERIFICAR_CASOS_PANTALLA=<n>` — tamaño de la
  muestra de pantalla (10 y 6).
- `VERIFICAR_DETALLE=1` — imprime cuántos casos cayeron en cada estado. Con la semilla
  por defecto: `no-numerica` 40 243, `exito` 52 926, `faltantes` 16 790, `vacia` 10 332,
  `no-definido` 3 709. La prueba `visita todos los estados` falla si alguno queda en cero.

Ojo: la configuración de Jest del repo (`package.json`) no restringe `roots`, así que
`npm test` también corre estos archivos.

## Qué cubre y contra qué commit

**Sync commit: `f1616df1ff35fdd1fbc8e28e5810e7b91992c0ff`** — en ese commit se confirmó
que la verificación describe este código y que pasa entera.

| Archivo | Qué se usa | Desde dónde |
|---|---|---|
| `src/guia/diagnostico.ts` | `diagnosticar`, los seis estados y los textos de `mensaje` | ambas capas |
| `src/guia/frases.ts` | `fraseDelGuia`, `enumerar` | ambas capas |
| `src/screens/formula/index.tsx` | `PantallaFormula`: `entrada-*`, `agregar-*`, `error-campo-*`, `resultado`, y el `<Guia>` con la frase | capa de pantalla |
| `src/guia/guia.tsx`, `src/guia/animaciones.ts` | `guia-globo`, `guia-sprite-hoja`, `ANIMACIONES` | capa de pantalla |
| `src/screens/formula/numeros.ts` | `parsearEntrada`, `formatearNumero` (indirecto, a través de `diagnosticar`) | ambas |
| `src/dominio/motor.ts`, `src/dominio/multiplos.ts` | `calcular`, `aCanonico`, `elegirMultiplo` (indirecto) | ambas |
| `src/formulas/*.ts` | el registro `FORMULAS` y la `calcular()` de cada Fórmula | ambas |

Para saber si un cambio toca lo verificado:

```
git diff --stat f1616df1ff35fdd1fbc8e28e5810e7b91992c0ff -- src/guia src/screens/formula/index.tsx src/screens/formula/numeros.ts src/dominio/motor.ts src/dominio/multiplos.ts src/formulas
```

Si lista algo, corré la verificación. Mové el sync commit (en esta skill) **sólo**
después de confirmar que pasa y que la tabla de arriba, las propiedades y el oráculo
siguen describiendo el código del commit nuevo.

## Archivos de la verificación

- `verificacion/diagnostico-guia/generador.ts` — `generadorAleatorio` (mulberry32),
  `generarCaso`, `TEXTOS_BORDE`. Cada Fórmula usa la semilla `SEMILLA + orden * 7919`,
  así sumar una Fórmula al registro no cambia los casos de las otras. Un 5 % de las
  Variables va **sin clave** en `textos` (la sesión de `ProveedorSesion` no garantiza
  traerlas todas); uno de cada cinco casos carga sólo números para visitar `exito`.
- `verificacion/diagnostico-guia/oraculo.ts` — el oráculo, escrito sin pasar por
  `diagnosticar` ni `fraseDelGuia`: `leerTexto` (reescritura de la regla de
  `parsearEntrada`), `esperar` (estado, inválidos y faltantes, y el resultado canónico
  llamando directo a `formula.calcular`), `mensajeEsperado` (los mensajes copiados de
  `diagnostico.ts`), `camposNombrados` (lee los campos del globo con dos expresiones
  regulares sobre las frases de `frases.ts`) y `comprobar` (P1–P5).

## Cómo leer una falla: bug real o error de la verificación

Cada contraejemplo viene contado en palabras de la app:

```
- U02-F03: v = "x" [Tm/s]; f = "-" [Hz]
  → el guía dice «¡Eso no es un número! Mirá los campos v.» pero la pantalla marca v, f y no son números: v, f
```

Se lee: en `U02-F03` se tipeó `x` en `v` (múltiplo T, m/s) y `-` en `f`; la pantalla
marcó los dos campos, pero el guía mandó a mirar sólo `v`. `(sin clave)` quiere decir que
`textos` no traía esa Variable.

Antes de tocar nada, reproducilo a mano en `diagnosticar(formula, textos, multiplos)` y
`fraseDelGuia(...)` (o en la pantalla con Expo Go) y decidí:

- **Bug real** — el diagnóstico, la frase o la pantalla hacen algo que la propiedad
  prohíbe y nadie lo pidió. Es un hallazgo: se informa con el contraejemplo, no se
  debilita la propiedad ni el oráculo para que pase.
- **Error del oráculo o del generador** — la app hace lo que se quiso a propósito y el
  oráculo quedó viejo. Síntomas típicos:
  - P4 falla en *todos* los casos de un estado con un texto apenas distinto: cambió un
    mensaje en `diagnostico.ts` a propósito → actualizá `mensajeEsperado`.
  - P2 falla con «el guía dice «…»» y el texto nombra bien los campos: cambió la redacción
    de una frase en `frases.ts` → actualizá las dos expresiones de `camposNombrados`.
  - P1 o P4 fallan en textos como `0x1F` o `1.000,5`: cambió la regla de lectura de
    `parsearEntrada` → actualizá `leerTexto` igual.
  - Falla `el oráculo se puede leer`: un símbolo nuevo lleva «, » o « y », y
    `camposNombrados` ya no puede separar la lista → cambiá la forma de leerla.
  - Falla `visita todos los estados`: el generador dejó de llegar a uno → ajustá
    `generarCaso`, no la propiedad.
  - La capa de pantalla tira `hoja ambigua`: dos animaciones comparten hoja en las
    pruebas, y la animación visible ya no se puede reconocer.

## Cuando el cambio es intencional

1. Leé el diff del código cubierto y decidí qué promesa cambia, si alguna. Si cambia una
   de P1–P5, eso es una decisión de producto: dejala escrita en esta skill antes de
   tocar el oráculo.
2. Actualizá sólo la parte del oráculo que describe lo que cambió (ver la lista de arriba).
3. Comprobá que todavía puede fallar: rompé a propósito, en una copia de trabajo, la
   regla que tocaste (por ejemplo, en `frases.ts` cambiá `animacion: 'retando'` por
   `'hablando'`; o en `diagnostico.ts` cambiá `` `Faltan: ` `` por `` `Faltan cargar: ` ``),
   corré el comando, mirá que falla la propiedad correspondiente, y deshacé el cambio
   hasta que `git diff --stat src` no muestre nada tuyo.
4. Corré el comando en verde y recién ahí mové el sync commit.

## Evidencia de que puede fallar (confirmada en el sync commit)

Cada rotura se hizo en el código real y se deshizo; con el código intacto, todo pasa.

| Rotura temporal | Falla |
|---|---|
| `frases.ts`: `no-numerica` con `animacion: 'hablando'` | P1 (40 243 contraejemplos en 124 Fórmulas) y 24 casos de pantalla: «el guía no reta (hablando), la pantalla marca f_inf…» |
| `frases.ts`: `enumerar(simbolos.slice(0, 1))` al retar | P2 (6 028 en 81 Fórmulas) y 7 casos de pantalla: «el guía dice «… Mirá los campos v.» pero la pantalla marca v, f» |
| `frases.ts`: `Eso da ${diagnostico.valorCanonico}` | P3 (52 926): «la pantalla muestra «25,13274123 rad/s» y el guía dice «¡Muy bien! Eso da 25.132741228718345.»» |
| `diagnostico.ts`: `` `Faltan cargar: ` `` | P4 (3 677): «la pantalla muestra «Faltan cargar: v, f» donde va «Faltan: v, f»» |
| `diagnostico.ts`: sin `?? ['']` | P5 (11 048): «la pantalla se cae: TypeError: Cannot read properties of undefined (reading 'map')» |
| `diagnostico.ts`: formatear `String(valor).replace('.', ',')` antes de `Number` | P4 y P5 (46 201 y 92 402): «la pantalla muestra «NaN rad/s»», «se lee «¡Muy bien! Eso da NaN rad/s.»» |

## Alcance y huecos

Verificado: las cinco propiedades, para los casos generados con la semilla `20261112`
— 124 000 en la capa pura sobre las 124 Fórmulas con entradas (incluye todas las
graficables) y 60 en la de pantalla sobre 10 Fórmulas. Es una muestra grande, **no**
una prueba para todo texto posible.

Fuera de alcance o no cubierto:

- La capa de pantalla deja el múltiplo canónico: los múltiplos al azar sólo los cubre la
  capa pura. No se prueba el `Picker` de `SelectorMultiplo`.
- No se prueban `quitar-*` ni `boton-limpiar`, ni secuencias de ediciones (cada caso
  tipea una vez desde la pantalla vacía), ni el guía minimizado (`guia-orbe`).
- Las 12 fichas de consulta del registro (136 Fórmulas, 124 con entradas) no muestran
  guía y no entran.
- No se verifica que la `calcular()` de cada Fórmula sea correcta: eso lo prueban sus
  Ejemplos resueltos. Acá se usa como dato.
- El estado `desconocida` sólo se prueba con una Fórmula fuera del registro (`U99-F99`):
  desde el registro no se alcanza.
- La legibilidad del número (por ejemplo `1e+21` en un resultado enorme) no es parte de
  P1–P5.
- Observación, no hallazgo: la lectura de campos acepta lo que acepta `Number`, así que
  `0x1F` vale 31 y `0b11` vale 3, y `1e400` es «no numérico». La pantalla y el guía
  coinciden en esos casos; si eso se quiere cambiar, es una decisión sobre
  `parsearEntrada`, no sobre esta verificación.
