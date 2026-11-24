---
name: verificar-grafica-interactiva
description: Verifica con entradas generadas el deslizador y la cruz del lienzo de la gráfica (src/graficas/deslizador.tsx, sesion.tsx, lienzo.tsx y la pantalla src/screens/grafica). Usala antes de commitear cualquier cambio a valorDe, posicionDe, textoDeslizador, leerCargados, al reinicio de la cruz del Lienzo, a los marcos de PantallaGrafica, a rangoInicial/marcoInicial o a parsearEntrada, y cuando alguien reporte que el punto actual desaparece, que la pista salta o que la lectura muestra un valor que no corresponde.
---

# Verificar la gráfica interactiva: deslizador y cruz del lienzo

No hay un verificador formal que corra sobre TypeScript + React Native, así que esta
verificación prueba **el código real** con entradas generadas: Fórmulas reales de
`FORMULAS`, números tipeados como los tipea una persona, múltiplos y escalas al azar,
con un generador determinista (mulberry32). No hay modelo a mano: si el código cambia,
lo que se prueba cambia con él.

## Las propiedades

| | Propiedad (una frase) | Daño si se rompe |
|---|---|---|
| P1 | `valorDe(t, min, max, escala)` devuelve siempre un valor dentro del marco, aunque la pista mande `t` fuera de [0, 1]. | El deslizador carga en el campo un valor que el marco no contiene y la curva se calcula fuera del rango dibujado. |
| P2 | `posicionDe(valorDe(t))` vuelve a `t` (±1e-9) para `t` en [0, 1]. | La pista controlada salta bajo el dedo: se arrastra a un lugar y queda en otro. |
| P3 | Lo que el deslizador escribe en el campo (`mover` de `PantallaGrafica`: `textoDeslizador(desdeCanonico(valorDe(t), múltiplo))`), releído por `leerCargados`, queda dentro del marco. | Fuera del marco, `Lienzo` deja de dibujar el punto actual (`dentro(puntoActual.x)` es falso): llevar la pista al tope borra el punto. |
| P4 | Ese texto releído pone la pista a menos del 1 % del recorrido de donde la dejó el dedo. | El redondeo a tres cifras haría saltar la pista a otro lugar al soltarla. |
| P5 | Después de tocar el lienzo y cambiar la Variable del eje X con su chip, la lectura es la misma que la de una pantalla recién abierta a la que sólo se le cambió el chip: el punto actual de la Variable nueva. | La lectura muestra «SNR = 31,62 → …», un valor de SNR que nadie eligió, heredado de la cruz que se puso sobre B. |

Además hay dos ejemplos fijos que muestran P3 y P5 en la pantalla real
(`P3, ejemplo: …` y `P5, ejemplo: …`).

## Cobertura

Sincronizado con el commit **`7a106cb922531f0cfdcb750700cd3bef24e16fd9`** (desde el anterior,
`f1616df`, cambiaron `src/dominio/multiplos.ts`, `src/graficas/deslizador.tsx`,
`src/graficas/escala.ts`, `src/graficas/lienzo.tsx` y `src/screens/grafica/index.tsx`,
éste por los ejes sin prefijos indebidos de S7; el resultado esperado no se movió).

| Archivo | Qué cubre | Propiedades |
|---|---|---|
| `src/graficas/deslizador.tsx` | `valorDe`, `posicionDe`, `recortar`, `esLog`, y la pista (`onValueChange`) en el ejemplo | P1–P4 |
| `src/graficas/sesion.tsx` | `textoDeslizador`, `leerCargados`, `ProveedorSesion` | P3, P4, P5 |
| `src/graficas/lienzo.tsx` | el estado `cursor`, su reinicio `useEffect(() => setCursor(null), [rangos.x.min, rangos.x.max])`, `alTocar`, la lectura `lienzo-lectura` | P5 |
| `src/screens/grafica/index.tsx` | `PantallaGrafica`: `mover`, los chips `eje-*`, los marcos | P3 (la fórmula de `mover` está replicada en `vueltaCompleta`), P5 |
| `src/graficas/vista-previa.tsx`, `src/graficas/escala.ts` | `marcoInicial`, `rangoInicial`: de ahí salen los marcos generados | P1–P5 |
| `src/screens/formula/numeros.ts`, `src/dominio/multiplos.ts` | `parsearEntrada`, `aCanonico`, `desdeCanonico` | P3, P4 |

La verificación vive en `verificacion/grafica-interactiva/grafica-interactiva.verif.tsx`
y su configuración en `verificacion/grafica-interactiva/jest.config.js`. Los archivos son
`*.verif.tsx` a propósito: `npm test` no los corre, así los hallazgos abiertos no rompen la
suite del proyecto.

**¿Tu cambio la toca?** Corré:

```
git diff --stat 7a106cb922531f0cfdcb750700cd3bef24e16fd9 -- src/graficas/deslizador.tsx src/graficas/sesion.tsx src/graficas/lienzo.tsx src/screens/grafica/index.tsx src/graficas/vista-previa.tsx src/graficas/escala.ts src/screens/formula/numeros.ts src/dominio/multiplos.ts
```

Si lista algo, corré la verificación y revisá si la tabla de cobertura sigue siendo cierta.

## El comando

```
npx jest --config verificacion/grafica-interactiva/jest.config.js
```

Tarda unos 6 a 15 segundos. Usa el Jest del repo (`jest` ~29.7, preset `jest-expo` ~57)
con la misma configuración de `package.json`; no instala nada.

- `VERIF_SEMILLA` — semilla (por defecto `20261112`).
- `VERIF_ITERACIONES` — casos de P1–P4 (por defecto `20000` cada una).
- `VERIF_RENDERS` — casos de P5, que renderiza la pantalla dos veces por caso (por defecto `60`).

Ejemplo, una búsqueda más larga con otra semilla:
`VERIF_SEMILLA=7 VERIF_ITERACIONES=200000 VERIF_RENDERS=300 npx jest --config verificacion/grafica-interactiva/jest.config.js`.

Cada propiedad que falla imprime cuántos casos fallaron, la semilla y el contraejemplo con
el texto más corto, contado como lo ve quien usa la app.

## El resultado esperado en el commit de sincronización

Con la semilla por defecto: **3 pasan y 4 fallan**. Los 4 fallos son hallazgos abiertos,
no errores de la verificación. No los ablandes para que pase.

- ✓ P1, ✓ P2, ✓ P4.
- ✗ **P3** — `redondeo: 562 casos` y `punto flotante: 85 casos` de 20000.
  - Redondeo (el grave): `textoDeslizador` redondea a tres cifras significativas y puede
    redondear **hacia afuera** del marco. Contado en la app (ejemplo fijo `P3, ejemplo`):
    U05-F17 (Shannon) con B = 4998 Hz y SNR = 1023; el marco de B en log va de 49,98 Hz a
    499,8 kHz. Se lleva la pista de B al tope, el campo queda «500000» → B = 500 kHz, fuera
    del marco, y el punto actual desaparece del lienzo. Pasa igual en lineal: cualquier
    valor cuyo doble termine en …5 o más en la cuarta cifra (U10-F08, N_FFT = 774 nano:
    el marco llega a 1,548 µ y el tope escribe «1550»).
  - Punto flotante (menor): la ida y vuelta por el múltiplo pierde un ulp en el borde. U05-F01,
    P_i = 3 nW en log: el marco empieza en 3.0000000000000006e-11 W, el piso escribe «0,03»
    nW, que se relee 3e-11 W, un ulp por debajo; `dentro` es estricto y el punto se oculta.
- ✗ **P3, ejemplo** — falla en `expect(screen.queryByTestId('lienzo-punto-actual')).toBeTruthy()`.
- ✗ **P5** — `3 de 60 casos`. El reinicio de la cruz mira sólo los números del rango X
  (`[rangos.x.min, rangos.x.max]`), no qué Variable es. Si dos Variables tienen el mismo marco,
  la cruz sobrevive al cambio de chip. Contraejemplo de la corrida: U08-F06 con delta_f = 100 y
  B = 100: con B en X se toca el lienzo («B = 3,24 kHz → BW_FSK = 206,5 kHz»); al pasar a delta_f
  la lectura dice «delta_f = 3,24 kHz → …» en vez de «delta_f = 100 kHz → BW_FSK = 400 kHz».
- ✗ **P5, ejemplo** — U05-F17 con B = 1000 Hz y SNR = 1000 (ambos en log de 10 a 100000): se toca
  el lienzo con B en X y se pasa a SNR. Se espera «SNR = 1000 → C = 9,967 kbit/s» y se lee
  «SNR = 31,62 → C = 5,028 kbit/s».

Si un hallazgo se corrige, su propiedad pasa a ✓: actualizá esta lista en el mismo cambio.
Un ✗ nuevo en P1, P2 o P4, o conteos de P3/P5 distintos con la semilla por defecto sin haber
tocado el generador, quieren decir que el cambio movió algo: investigalo antes de commitear.

## Un bug real o un error de la verificación

Antes de culpar al código, reproducí el contraejemplo a mano con las funciones reales:

1. Copiá los números del contraejemplo (marco, `t`, múltiplo, texto) y llamá
   `valorDe`, `textoDeslizador`, `desdeCanonico` y `leerCargados` con ellos en un
   `node`/Jest de una línea. Si el resultado coincide con el informe, el código hace eso.
2. Preguntate si la app puede llegar a ese estado. El generador sólo produce lo que la app
   produce: marcos de `marcoInicial` (lo que arma `PantallaGrafica` al abrir, al tocar
   Lineal/Log o «Encuadrar»), cualquier múltiplo de `MULTIPLOS` y números de 1 a 5 cifras.
   Un `t` fuera de [0, 1] sólo se genera en P1, que es la única que promete aguantarlo.
   Si el contraejemplo necesita un estado imposible en la app, el error está en el
   generador: corregilo ahí.
3. Para P5, el oráculo es la propia app (la lectura de una pantalla recién abierta con el
   chip cambiado), no un texto escrito a mano. Si P5 falla, abrí los dos textos: si el
   esperado es raro (por ejemplo, la Variable no tiene valor y no hay lienzo), el caso
   debería haberse saltado; si el obtenido conserva un X de la Variable anterior, es el bug.
4. Si la falla aparece sólo con muchas iteraciones y el exceso es de un ulp, es la clase
   «punto flotante» de P3, ya conocida.

Nunca relajes una tolerancia (1e-9 en P2, 1 % en P4, bordes exactos en P1/P3) para que pase:
los bordes exactos son los mismos que usa `Lienzo` en `dentro` y en `posicionDe`.

## Cuando el cambio es intencional

- Si cambia una promesa (por ejemplo, el deslizador pasa a escribir cuatro cifras, o
  `textoDeslizador` recorta al marco), cambiá la propiedad en
  `grafica-interactiva.verif.tsx` y su fila en la tabla de arriba, en el mismo commit.
- Si cambia cómo `PantallaGrafica` escribe el campo, actualizá `vueltaCompleta` para que
  replique exactamente la nueva línea de `mover`: P3 y P4 dependen de esa copia.
- Si cambian los testID (`eje-*`, `lienzo`, `lienzo-lectura`, `deslizador-*-pista`,
  `lienzo-punto-actual`), actualizalos en la verificación.
- Antes de mover el commit de sincronización, demostrá que la verificación sigue pudiendo
  fallar: rompé a propósito una línea cubierta (por ejemplo `const p = recortar(t);` →
  `const p = t;` en `valorDe`, que hace fallar P1), corré el comando, confirmá el ✗ y
  devolvé el archivo como estaba (guardá una copia antes y restaurala; confirmá con
  `git diff --stat -- src/graficas` vacío). Recién entonces poné el commit nuevo en
  «Cobertura» y actualizá «El resultado esperado».

## Qué no cubre

- Sólo lo listado arriba, con 20000 casos por propiedad pura y 60 pantallas para P5 en la
  semilla por defecto: es una búsqueda acotada, no una prueba para todo número.
- No prueba el `Slider` nativo de `@expo/ui`: en Jest corre el doble
  `src/pruebas/expo-ui-doble.tsx`. Que la pista nativa mande `t` en [0, 1] y no `NaN` es un
  supuesto: `valorDe(NaN)` devuelve `NaN` y no está verificado.
- No prueba gestos reales ni la geometría del dibujo (`px`, `py`, marcas, huecos); la cruz
  se pone con `responderGrant` en un X dentro del área.
- La orientación (`useOrientacionHorizontal`) se reemplaza por una función vacía: necesita
  un navegador de expo-router y no es parte de lo verificado.
- P5 cambia de chip una sola vez y no combina el cambio de chip con «Encuadrar», Lineal/Log
  o un deslizador movido entre medio.
- Las Fórmulas con Variables de lista quedan fuera de P5; en P1–P4 se usan sólo sus
  Variables escalares.
- Las acciones de accesibilidad `increment`/`decrement` del deslizador y del lienzo no se
  generan: pasan por `valorDe` y `ponerCursor`, que P1 y P5 cubren por otro camino.
