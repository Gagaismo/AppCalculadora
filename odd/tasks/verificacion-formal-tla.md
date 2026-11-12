# Verificación formal con TLA+ y statecharts

Tres skills de verificación con modelo TLA+ (orientación de la gráfica, sesión de la Fórmula,
recorridos de bits) y tres statecharts. Rama `feature/graficas`. No se cambia código de producto:
los hallazgos se informan con su contraejemplo.

## Specs

- **S1** `verificar-orientacion-grafica` — `src/graficas/orientacion.ts` + `src/screens/grafica/index.tsx`.
  «Promesa: fuera de la pantalla de gráfica la app termina en vertical. Riesgos: lockAsync sin await
  con .catch vacío, pedidos que se cumplen desordenados, el PORTRAIT de salida que falla en silencio,
  segundo plano. Revisá en node_modules/expo-screen-orientation qué orden garantiza el módulo nativo.»
- **S2** `verificar-sesion-formula` — `src/graficas/sesion.tsx`, `src/screens/formula/index.tsx`,
  `src/app/_layout.tsx`. «Hallazgo sospechado: dos pantallas de la misma Fórmula se borran la sesión,
  porque la clave es solo el id.»
- **S3** `verificar-recorridos-bits` (parte TLA+) — `src/screens/bits/{crc,hamming,vrc-lrc,pasos}.tsx`.
  «Invariantes: paso < total; Corregir visible solo con un error único. Ojo: la esquina VRC/LRC nunca
  se verifica.»
- **S4** Statecharts con `/statechart`: «(a) Fórmula → Ver gráfica → deslizadores → volver; (b) receptor
  de Hamming/VRC hasta Corregir; (c) CRC emisor y receptor.»
- **S5** «No cambies código de producto: los hallazgos se informan con su contraejemplo.»
- **S6** Cada skill sigue `/create-formal-verification-skill`: fiel al código, capaz de fallar (variantes),
  alcance honesto, un comando, cobertura y commit de sincronización, probada una vez con un cambio de
  descarte sobre el código real.

## Tasks

- [x] T1 · S1, S5, S6 · en línea · modelo y skill de orientación. TLC: 2 reglas valen, 6 roturas detectadas.
- [x] T2 · S2, S5, S6 · en línea · modelo y skill de sesión. TLC: 1 hallazgo (dos pantallas de la misma Fórmula).
- [x] T3 · S3, S5, S6 · en línea · modelos y skill de recorridos de bits. TLC: 3 hallazgos, 11 roturas detectadas.
- [x] T4 · S4 · en línea · statecharts en `verificacion/statecharts/` (cuatro cartas).
- [ ] T5 · S6 · en línea · prueba de traspaso. Hecha la parte de anclas y TLC con un cambio de
  descarte por skill. **Pendiente: correr los `repeticion.verif.tsx`** (ver L5).

## Log

- **L1** (pedido original, 2026-11-12): «Con /create-formal-verification-skill […] creá una skill por
  subsistema con modelo TLA+: 1. verificar-orientacion-grafica […] 2. verificar-sesion-formula […]
  3. verificar-recorridos-bits (parte TLA+) […] Después, con /statechart […] dibujá: (a) Fórmula → Ver
  gráfica → deslizadores → volver; (b) receptor de Hamming/VRC hasta Corregir; (c) CRC emisor y receptor.
  No cambies código de producto: los hallazgos se informan con su contraejemplo. Hay un intento previo
  sin validar en verificacion/orientacion-grafica/ y TLC a medio instalar en
  C:/Users/lautaro/ego/verificacion-formal-20261112/tools. Java está instalado, mise no, deno y npx sí.
  Hay unos 5 GB libres en C:.»
- **L2** El jar de TLC en `ego/.../tools/tla2tools-1.7.4/` está completo: su sha256 coincide con el de
  tla2tools 1.7.4 (`936a2620…0e88`).
- **L3** Orden nativo leído: Android corre cada `AsyncFunction` en un único `HandlerThread`
  (`expo-modules-core/android/.../kotlin/AppContext.kt:71`), iOS en una cola serie
  (`ios/Core/Functions/AsyncFunctionDefinition.swift:20`): los pedidos se aplican en el orden en que JS
  los hizo. El desorden posible está antes, en JS: `useFocusEvents` avisa el `blur` de la pantalla
  anterior después de que la nueva ya corrió su efecto de foco.
- **L4** Un «hallazgo» descartado: el modelo de la sesión dejaba mover un deslizador en una gráfica
  abierta por enlace, sin Fórmula debajo, y de ahí salía una sesión huérfana. La pantalla real no
  dibuja deslizadores sin valores cargados (`if (valor === undefined)`): era un error del modelo.
- **L5** A las 16:24 del 2026-11-12, otra sesión cambió `package.json` a Expo SDK 58 y dejó
  `node_modules` a medias (`expo` 58.0.25, `expo-router` 57.0.17, sin `expo-modules-core`). Jest no
  arranca («Cannot find module 'expo-modules-core'»), así que los tres `repeticion.verif.tsx` quedaron
  escritos y sin correr en su versión final. Antes de eso, una corrida exploratoria con SDK 57
  confirmó sobre el código real el orden de los pedidos de orientación (`H, V, H` con doble toque) y
  el borrado de la sesión con dos pantallas de la misma Fórmula.
- **L6** El comando de `/statechart` no corre en Windows tal cual (`/bin/sh` y CRLF). Las cartas se
  generaron con una copia corregida en `C:/Users/lautaro/ego/verificacion-formal-20261112/statechart-win`.
