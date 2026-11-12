# Guía del profesor (Navi / will-o'-the-wisp)

Personaje animado del profesor, en pixel art chibi, que flota en la app, guía, ayuda y reta a quien la usa.
Assets generados en ChatGPT (Work, GPT-6 Astra Alto, generador de imágenes integrado). Rama: `feature/guia-profesor`.

## Specs

- **S1** Guía animado inspirado en Navi y el will-o'-the-wisp. Pedido textual: «La idea es creemos un personaje animado del profesor que cumpla ese rol.» Inspiración: https://petdex.dev/es/docs , https://petdex.dev/es/pets/einstein.
- **S2** Comportamiento. Pedido textual: «que este aparezca en la aplicacion y le "tire las orejas" (retarlos) a los chicos, guiarlos, o ayudarlos, quejarse cuando ponen algo mal y te dice donde fijarse.»
  En la pantalla de Fórmula reacciona al estado que la pantalla ya calcula:
  - entrada no numérica: retando y nombra el campo;
  - variables faltantes: señalando y nombra el campo;
  - `calculo-no-definido`: confundido y remite a las condiciones de la Fórmula;
  - éxito: festejando.
  Los mensajes de error que la pantalla ya muestra («Debe ser un número válido», «Entrada no numérica en …», «Falta: …» / «Faltan: …», «La fórmula no está definida para los valores cargados.») no cambian.
- **S3** Animaciones como 5x5 pixel art sprite sheets (25 cuadros cada una), en `assets/guia/`: `reposo` 10 fps, `hablando` 12 fps, `retando` 12 fps, `senalando` 12 fps, `festejando` 15 fps, `confundido` 10 fps, `pensando` 10 fps. Cada hoja mide 1000x1000 px: celdas de 200 px y fondo transparente.
- **S4** También en otras pantallas. Respuesta del humano: «Sí, pero también en otras pantallas» — «Además de Fórmula, que el profe aparezca en Unidades y Búsqueda dando la bienvenida o tips».
- **S5** No se toca `src/dominio/`. Las pistas de múltiplo equivocado o de valor fuera de rango quedan fuera de esta versión, porque requieren datos nuevos en `Variable` (escalación según AGENTS.md).
- **S6** Fondos: se guardan en `assets/fondos/` para la próxima sesión y no se integran ahora. Pedido textual: «voy a iterar sobre el frontend porque el de ahora esta muy basico pero eso lo hare en la proxima sesion».
- **S7** Reglas del repo: el tema (`src/tema/index.ts`) es la única fuente de colores; los tests van al lado del archivo; en RNTL 14, `render` y `fireEvent` llevan `await`; el código, los comentarios, la interfaz y los commits van en español.

## Tasks

- [x] T1 — S3, S6 — assets optimizados y versionados (`assets/guia`, `assets/fondos`) — worker — commit: 706a645
- [x] T2 — S2 — `diagnosticar()` pura, extraída de `PantallaFormula`, más sus tests; la pantalla la consume — worker — commit: 9ebc851
- [x] T3 — S3 — componente `Sprite` (hoja 5x5, fps, loop) más sus tests — worker — commit: ecb6e69
- [x] T4 — S1, S2 — componente `Guia` flotante con globo de texto en la pantalla de Fórmula; se minimiza al tocarlo — worker — commit: 8d55674
- [x] T5 — S4 — guía en Unidades y Búsqueda (bienvenida o tips) — worker — commit: 321c037
- [x] T6 — todas — `npm test` y `npm run typecheck` en verde; revisión del parent — parent — commit: 8d55674 (doble de movimiento reducido)

## Log

- **L1** (pedido original, textual): «Quiero agregar un par de cosas a la interfaz y funcionalidad de la calculadora. En la interfaz quiero primero agregar, un guia. Buscar sobre el concepto de Will O the Wisp, Buscar a Navi de zelda. La idea es creemos un personaje animado del profesor que cumpla ese rol. Mi inspiracion para esto es: https://petdex.dev/es/docs , https://petdex.dev/es/pets/einstein. La idea es yo pasarte una foto del profesor (ya tenemos autorizacion) y que este aparezca en la aplicacion y le "tire las orejas" (retarlos)  a los chicos, guiarlos, o ayudarlos, quejarse cuando ponen algo mal y te dice donde fijarse. Para crear el personaje vas a usar la extension de ego lite broswer y vas a usar chagpt image 2.6 (especificar esto en el modelo) y pedir que te genere la imagen chibi del profesor. […] Tambien ya estamos podrias fijarte si hay algun asset interesante para poner de background a la app (voy a iterar sobre el frontend porque el de ahora esta muy basico pero eso lo hare en la proxima sesion). Tenes que pedirle un 5x5 pixel art spire sheets for the character animation.»
- **L2** Generación en ChatGPT. Pidió autorización porque no puede verificar `gpt-image-2.6`; se le respondió que use el generador integrado. Su respuesta final: «La herramienta no devuelve el identificador del modelo, por lo que no puedo confirmar que haya sido gpt-image-2.6.» Salieron 13 imágenes. Las hojas vinieron en 1254x1254, que no se divide exacto en 5. Se normalizaron a 1000x1000 con `C:/Users/lautaro/ego/profe-guia-20261111/scripts/procesar.py`, que pasa el magenta a transparente. Los originales y la hoja de referencia (fondo negro) quedan en `C:/Users/lautaro/ego/profe-guia-20261111/assets/`. En `pensando`, 4 celdas tienen partículas que tocan el borde de la celda.
- **L3** El humano aprobó el plan y eligió «Sí, pero también en otras pantallas».
- **L4** T1–T3 cerradas: 23 suites y 1005 tests en verde, typecheck sin errores. Hubo que correr `npm ci`, porque faltaba `node_modules`; avisó 29 vulnerabilidades (1 crítica), que no se tocan en esta feature. Pendientes menores:
  - `Sprite` no escucha `reduceMotionChanged`;
  - `diagnostico.ts` importa de `@/screens/formula/numeros`;
  - los PNG en modo paleta no se probaron en Expo Go.
- **L5** Se cerraron T4–T6: 25 suites y 1023 tests en verde, 0 avisos `act(...)` y typecheck sin errores. Decisiones de diseño:
  - el guía va abajo a la derecha, con `pointerEvents: 'box-none'`, y las pantallas suman `ALTO_GUIA` al relleno inferior;
  - flota con un vaivén de ±4 px;
  - el halo usa el token nuevo `brilloGuia` (#F2B35E), que solo rellena;
  - al tocarlo se minimiza a un orbe de 28 px;
  - no aparece en las fichas de consulta.
  Falta probarlo en Expo Go: sombra, contraste, vaivén y PNG en modo paleta.
