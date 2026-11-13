# Gráficas interactivas (estilo GeoGebra)

Gráficas que cambian en vivo según los valores cargados en la calculadora. Se hace por etapas: la etapa 1 es una gráfica genérica para toda Fórmula calculable; la etapa 2, señales propias de la materia, va en su propio ciclo.
Rama: `feature/graficas`, que sale de `feature/herramientas-bits`.

## Specs

- **S1** Pedido textual: «Quiero incluir graficas que segun los valores que introduzcan en la calculadoras vayan cambiando. Estilo geogebra»
- **S2** Qué se grafica (respuesta del humano: «Las dos, por etapas»).
  - Etapa 1 (este ciclo): salida vs. una Variable para cada Fórmula calculable. El eje X es una Variable elegible; la curva se calcula con la misma `calcular()` de la Fórmula a través del motor; un punto marca el valor actual.
  - Etapa 2 (ciclo aparte): señales específicas de la materia (onda en el tiempo, espectro, AM/FM, Fourier), cada una verificada contra las diapositivas.
- **S3** Interacción (respuesta del humano: «Sliders + tocar la curva»): cada Variable tiene un deslizador además del campo, y al arrastrarlo la curva y el resultado se mueven en vivo. Además, tocar o arrastrar sobre la curva lee el valor (x, y) de cualquier punto.
- **S4** Diseño (respuesta del humano: «Sí, primero mockups»): 2-3 direcciones en el canvas antes de implementar.
- **S5** Reglas del repo:
  - Nunca se inventa una fórmula: la curva sale solo de la `calcular()` existente.
  - Los múltiplos y las Unidades de medida importan: los ejes llevan unidad y múltiplo.
  - Las fichas de consulta, que no tienen entradas, no tienen gráfica.
  - `src/dominio/` no se toca sin escalar.
  - El tema `src/tema/index.ts` es la única fuente de colores.
  - Se dibuja con `react-native-svg`, que ya está instalado: no se suma una librería de gráficos.
  - Los tests van al lado del archivo; en RNTL 14, `render` y `fireEvent` llevan `await`.
  - Interfaz y commits en español.

- **S6** Diseño elegido: `design/graficas/03-pantalla-completa-horizontal.html` («Gráfica a pantalla completa (horizontal)»); 01 y 02 quedan como alternativas.
  - En vertical, la pantalla de Fórmula muestra una vista previa de la gráfica con «Ver gráfica» y la pista de girar el teléfono.
  - En horizontal hay un lienzo grande con un panel compacto: chips del eje X, deslizadores por Variable con valor y múltiplo, Lineal/Log y «Encuadrar».
  - Tocar o arrastrar el lienzo muestra la cruz con la lectura (x, y), con unidad y múltiplo.
  - Bordes: el hueco rayado «sin valor» donde la fórmula no está definida, y el aviso cuando la curva no existe en todo el rango.
  - El guía no aparece en horizontal.

## Decisiones

- **D1** Orientación: se suma `expo-screen-orientation`, un módulo del SDK de Expo instalado con `npx expo install`. La app sigue trabada en vertical y solo la pantalla de la gráfica se traba en horizontal; al salir vuelve a vertical. Es un cambio de dependencias y de configuración: riesgo 5, con verificación independiente.
- **D2** Rango del eje X: se centra en el valor cargado (de 0 a 2·x en lineal; de x/100 a x·100 en log) y queda fijo hasta tocar «Encuadrar». Es la recomendación aplicada, sin respuesta del humano.
- **D3** Escala log automática para las Variables que abarcan décadas (lista explícita de Unidades de medida en el código). Recomendación aplicada.
- **D4** En esta etapa no hay botón «Probar con el Ejemplo resuelto» (no está en la 03) y la lectura no se pasa al campo. Queda para más adelante si el humano lo pide.

## Tasks

- [x] T1 — S2–S4 — mockups de la etapa 1 en `design/graficas/` — worker de diseño — commit: 77a5cdf
- [x] T2 — S2, S3, S5, D2, D3 — motor puro en `src/graficas/`: muestreo de la curva con la `calcular()` del motor y huecos donde no está definida, rango y escala, marcas y formato de la lectura; tests contra los Ejemplos de U05-F17, U03-F07 y U03-F01 — worker A — commit: 678ab3b
- [x] T3 — S3, S6 — componente `Lienzo` con `react-native-svg`: curva con huecos, ejes, marcas, punto actual y cruz al tocar o arrastrar — worker A — commit: bdf2000
- [x] T4 — S6, D1 — orientación con `expo-screen-orientation` y `app.json`, y componente `Deslizador` (¿hay Slider en `@expo/ui`?, con su doble de prueba) — worker B, en paralelo — commit: 714ef2d
- [x] T5 — S6 — integración: vista previa en la pantalla de Fórmula y pantalla horizontal con el panel de control — worker — commit: 45d33cc, 6c158ad
- [x] T6 — todas — suite y typecheck, verificación independiente por el riesgo 5, handoff «implemented» — parent — commit: este registro

## Log

- **L1** (pedido, textual): «siguiente funcionalidad: Quiero incluir graficas que segun los valores que introduzcan en la calculadoras vayan cambiando. Estilo geogebra»
- **L2** Respuestas del humano: tipo de gráfica «Las dos, por etapas»; interacción «Sliders + tocar la curva»; diseño «Sí, primero mockups».
- **L3** Se armaron tres direcciones en `design/graficas/`:
  - `01-grafica-arriba.html`;
  - `02-pestanas-calcular-graficar.html`;
  - `03-pantalla-completa-horizontal.html`.
  Usan fórmulas reales del catálogo, con su `calcular` copiada literal y verificada contra los Ejemplos resueltos:
  - U05-F17 (Shannon), Ejemplos 06 y 07 de la pág. 27;
  - U03-F07 (pérdida en espacio libre), pág. 26;
  - U03-F01 (dB), pág. 12, con la zona no definida.
  Preguntas abiertas: dirección o mezcla, rango del eje X, escala log automática, múltiplo en las marcas log, botón «Probar con el Ejemplo», y pasar la lectura al campo.
- **L4** El humano pidió implementar `design/graficas/03-pantalla-completa-horizontal.html` (handoff en curso). Las demás preguntas quedaron sin responder; se aplicaron las recomendaciones D2–D4. Se encontró que `app.json` traba la app en `"orientation": "portrait"` y que `expo-screen-orientation` no está instalado; de ahí sale D1.
- **L5** El primer intento de T2–T4 se cortó porque el disco C: estaba lleno (`ENOSPC`). El humano liberó espacio y se reinstaló `expo-screen-orientation ~57.0.3`, que sumó solo ese paquete.
  - T4: la app queda trabada en vertical desde el manifiesto; en iOS el `Info.plist` y el plugin `initialOrientation PORTRAIT_UP`. El Deslizador usa el `Slider` universal de `@expo/ui`.
  - T2/T3: 40 tests.
  - Suite completa: 37 suites y 1122 tests en verde en dos corridas seguidas; typecheck 0. En una corrida anterior fallaron de forma intermitente `hamming.test.tsx` y `vrc-lrc.test.tsx` (pasan solos y en las corridas siguientes), probablemente por carga.
  - El diff de T2/T3 fue de 1197 líneas; se commiteó en dos unidades.
- **L6** T5 se cerró en `45d33cc` y `6c158ad`: 40 suites y 1143 tests en verde, typecheck 0. La copia de la vista previa pasó a «Se abre en horizontal, a pantalla completa», porque la app está trabada en vertical y girar el teléfono no hace nada.
- **L7** Verificación independiente (gentle-ai-verify), riesgo 5: **pasa con notas**.
  - La dependencia es compatible: SDK `~57.0.2`, instalada 57.0.3. `expo install --check` salió bien pero corrió offline; falta revalidar con red.
  - Config: el manifiesto queda en portrait y el Info.plist tiene las horizontales.
  - S1–S6 y D1–D4 se cumplen. Nota en S2: la curva usa `formula.calcular()` directo, no el motor; está justificado en `muestreo.ts`.
  - Avisos:
    - (1) si el `lockAsync(PORTRAIT_UP)` de salida falla, nada vuelve a trabar en vertical;
    - (2) el gesto de volver en iOS anima en horizontal;
    - (3) no hay cancelación de un lock pendiente.
  - Solo en dispositivo: el giro real, el splash, las tres formas de volver, el segundo plano y el deslizador nativo.
  - La falla intermitente de `hamming.test.tsx` y `vrc-lrc.test.tsx` bajo carga volvió a aparecer: queda para diagnosticar.
  - El aviso (1) se está modelando en `verificar-orientacion-grafica`.
- **L8** Revisión RDD por commit de los de mayor riesgo (decisión del humano: «Solo los de mayor riesgo»):
  - `714ef2d` (orientación y deslizador): aprobado, con 3 lentes (risk, resilience, reliability).
  - `45d33cc` (sesión y vista previa): aprobado, con 2 lentes.
  - `6c158ad` (pantalla horizontal): aprobado, con 2 lentes.
  - Los tres tienen el acknowledgement hecho. Dejaron 20 avisos no bloqueantes; entre ellos:
    - la sesión con clave por id;
    - el PORTRAIT de salida sin reintento;
    - `router.back()` sin historial;
    - casos sin test: eje X viejo, ficha de consulta y salida;
    - la orientación de arranque en iOS.
  - `0a279c3` (SDK 58): `lens_context_budget_exceeded` por el `package-lock.json` regenerado, que no se puede partir. El humano decidió («1. ok») que queda **sin revisión RDD**, cubierto por la verificación independiente (expo-doctor 20/20, 1247 dependencias del registro oficial con integrity) y por la prueba en el teléfono.
  - El humano autorizó además actualizar las versiones de la verificación TLA+ de orientación, fusionar en `main` y hacer push.
