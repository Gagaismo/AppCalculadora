# Herramientas de bits (CRC, Hamming, VRC/LRC)

Nueva sección de la app con tres herramientas paso a paso que trabajan sobre cadenas de bits. No son Fórmulas: el modelo de Fórmula solo admite Variables numéricas.
Diseño elegido: `design/herramientas-bits/01-paso-a-paso.html` («Paso a paso»); 02 y 03 quedan como alternativas. Rama: `feature/herramientas-bits`, que sale de `feature/guia-profesor`.

## Specs

- **S1** Pedido textual: «Actualmente podemos usar la calculadora para calcular y obtener crc con modulo 2 y usando XOR , detectar errores con bit de pariedad con la tabla usando FEC - Codificacion hamming , Metodo de deteccion de errores con tabla vrc/lrc ?» Hoy no se puede; se agrega como sección «Herramientas de bits».
- **S2** CRC, U06-F11, págs. 28-32: división módulo 2 por XOR, mostrada renglón por renglón como en la pág. 30.
  - Emisor: M(x) y G(x) → P(x) = M·x^r, R(x) y T(x) = P(x) + R(x).
  - Receptor: T'(x) / G(x); resto 0 = sin error, resto ≠ 0 = hay error.
  - Ejemplo de la cátedra, con test obligatorio: M = 10110111, G = 110011, r = 5 → P = 1011011100000, R = 1001, T = 1011011101001; el receptor con T da resto 0.
  - Generadores estándar de la pág. 32 como atajos: CRC-12 = x^12+x^11+x^3+x^2+x+1, CRC-16 = x^16+x^15+x^2+1, CRC-CCITT = x^16+x^12+x^5+1.
  - El cociente no se muestra (decisión D2).
- **S3** Hamming, U06-F09/F10, págs. 44-50.
  - Emisor: n bits de datos; p es el menor entero con 2^p ≥ n+p+1; los bits de paridad van en las posiciones 1, 2, 4, 8…; se muestra la tabla de grupos con paridad par.
  - Receptor: síndrome p4 p3 p2 p1 → posición del bit erróneo (0 = sin error) y corrección.
  - Ejemplo de la cátedra, con test obligatorio: datos n7…n1 = 1001101, p = 4 → palabra 10011100101 (posiciones 11→1); paridades p4 = 1, p3 = 0, p2 = 0, p1 = 1. Recibida 10001100101 → síndrome 1000 = 8 → se corrige a 10011100101.
- **S4** VRC/LRC, págs. 18-25.
  - VRC: un bit de paridad por carácter; ejemplo de la pág. 20: 1000010 → VRC 0.
  - LRC/BCC lineal: paridad por posición de bit sobre el bloque; ejemplo de la pág. 23: 10101001, 00111001, 11011101, 11100111 → BCC 10101010.
  - Tabla bidimensional del Ejemplo 02 (pág. 25), con test obligatorio: filas B1..B7 y columnas D1..D8.
    ```
    B1: 0 0 0 1 0 1 0 1 | LRC 1
    B2: 1 1 1 1 0 1 1 1 | 1
    B3: 1 0 0 0 0 1 0 1 | 1
    B4: 0 1 0 1 0 1 1 1 | 1
    B5: 0 1 0 0 0 1 0 0 | 0
    B6: 0 1 1 1 0 1 1 0 | 1
    B7: 0 1 1 0 0 1 0 0 | 1
    VRC: 0 1 1 0 0 1 1 0 | 0
    ```
    En el receptor llega B4/D6 = 0 → error VRC en D6 y error LRC en B4 → el bit erróneo es (B4, D6) y se corrige.
  - Paridad par por defecto, con selector Par/Impar (decisión D4).
- **S5** Diseño «Paso a paso» (artboard 01): Entrada → pasos con Anterior/Siguiente, cada paso con su explicación → resultado. Teclado de bits 0/1/⌫, chips de ejemplos (Cátedra, CRC-12, CRC-16, CRC-CCITT) y modos Emisor/Receptor. En VRC/LRC, la celda del cruce se marca y hay un botón «Corregir el bit», más una pestaña para el BCC lineal.
- **S6** Reglas del repo (AGENTS.md):
  - No se inventa nada: solo los procedimientos y ejemplos de las págs. citadas.
  - Cada herramienta lleva un test contra su ejemplo resuelto.
  - `src/dominio/` no se toca.
  - El tema `src/tema/index.ts` es la única fuente de colores.
  - Los componentes nativos vienen de `@expo/ui` universal.
  - Los tests van al lado del archivo; en RNTL 14 `render` y `fireEvent` llevan `await`.
  - Código, interfaz y commits en español.

## Decisiones

- **D1** Va como sección aparte, no como Fórmulas: el modelo de Fórmula solo admite números, y cambiarlo sería una escalación en `src/dominio/`.
- **D2** No se muestra el cociente del CRC. La diapositiva 30 da 1101011 (7 bits), pero la cuenta correcta es 11010111 (8 bits), y U06-F11 solo pide R y T. Observación nueva, resuelta así y registrada acá.
- **D3** Los ejemplos que se presentan como «de la cátedra» son solo los de las diapositivas. Los casos con error que arme quien usa la app son entrada suya, nunca un ejemplo de la cátedra.
- **D4** El selector Par/Impar está solo en VRC/LRC. Hamming queda en paridad par, como la cátedra.

## Tasks

- [x] T1 — S2–S4, S6 — lógica pura en `src/bits/`: `crc.ts`, `hamming.ts` y `paridad.ts`, con sus pasos para la UI y tests contra la cátedra — worker A — commit: 94baf58
- [x] T2 — S5 — UI compartida: teclado de bits, entrada de bits y stepper; sección y navegación; pantalla CRC — worker A — commit: 011874e (diseños y plan en 4abb405)
- [x] T3 — S3, S5 — pantalla Hamming — worker B — commit: da2a431
- [x] T4 — S4, S5 — pantalla VRC/LRC, más BCC — worker C — commit: 8aadecd
- [x] T5 — todas — `npm test` y `npm run typecheck` en verde, revisión contra el artboard y handoff «implemented» — parent — commit: este registro

## Log

- **L1** (pedido, textual): «Actualmente podemos usar la calculadora para calcular y obtener crc con modulo 2 y usando XOR , detectar errores con bit de pariedad con la tabla usando FEC - Codificacion hamming , Metodo de deteccion de errores con tabla vrc/lrc ?»
- **L2** «Si quiero agregar eso, necesitas que te pase un pdf para el vrc/lrc ?» → «Dale te doy el ok.» Se leyó `C:\Users\lautaro\Downloads\Test\Unidad 6 Errores en la transmisión de datos 2026.pdf`, págs. 18-25. El relevamiento verifica los ejemplos de las págs. 20, 23 y 25; texto y capturas en `C:/Users/lautaro/ego/u6-errores-20261112/`.
- **L3** El humano eligió «Primero quiero ver un diseño». Se armaron tres direcciones en `design/herramientas-bits/`.
- **L4** El humano pidió implementar `design/herramientas-bits/01-paso-a-paso.html`. Las preguntas abiertas sobre el cociente, el caso con error y la paridad impar no se contestaron; se aplicaron las recomendaciones D2–D4 y se informan al cierre.
- **L5** T1 y T2 cerradas: dos corridas seguidas con 30 suites y 1053 tests en verde, typecheck sin errores.
  - Navegación: cuarta pestaña nativa «Bits» que lista las tres herramientas, con rutas apiladas en `/bits/*`.
  - El diff fue de unas 1471 líneas, por encima del tope de 900; se commiteó en tres unidades.
  - Los tests de UI de T2 se escribieron después del código y no tuvieron RED.
  - Falta probar en el teléfono la alineación monoespaciada de la división, sobre todo con CRC-16.
  - T3 y T4 se lanzaron en paralelo, con superficies disjuntas.
- **L6** T3–T5 cerradas: 32 suites y 1068 tests en verde, typecheck sin errores, ningún color escrito a mano en `src/screens/bits`.
  Hamming: 8 tests, con RED de comportamiento contra un stub. VRC/LRC: 7 tests, también con RED. El diff de T4 fue de 922 líneas.
  Pendientes:
  - El orden del bloque BCC es ambiguo: la pág. 23 dibuja el BCC primero y la pág. 22 dice «al finalizar el bloque». La pantalla lo muestra como lo dibuja la pág. 23, sin afirmar cuál sale antes.
  - La esquina recibida no se verifica.
  - Las celdas de la tabla miden 34 px.
  - Falta probar en el teléfono la alineación y el scroll horizontal (CRC-16, tablas de 15 columnas).
- **L7** El humano dijo «hacele el rdd». El candidato completo no entra en el presupuesto (`lens_context_budget_exceeded`), así que se partió un candidato por commit, con worktrees temporales ya removidos, y se autorizaron 5 corridas:
  - A `94baf58` (lógica): reliability, aprobado.
  - B `011874e` (pestaña y CRC): readability y reliability, aprobado.
  - C `da2a431` (Hamming): reliability, aprobado.
  - D `8aadecd` (VRC/LRC): reliability, aprobado.
  Los cuatro tienen el acknowledgement hecho. Ninguno abrió una corrección.
  No se revisaron los mockups HTML de `4abb405` ni el registro de `0b731ac`.
  Advertencias para hacer después:
  - Hamming con `corregida = null` no tiene test.
  - `verificarTabla` no valida las paridades recibidas, y la esquina no se verifica.
  - En CRC, una trama editada puede quedar truncada.
  - El comentario sobre el máximo de bits del CRC.
  - Un BCC vacío.
- **L8** El hook RDD volvió a marcar como pendiente el target de la rama entera (base `5fd93bd`), que no entra en el presupuesto. El humano eligió la opción «1»: dejarlo así. Ese target queda sin revisar a propósito, porque la revisión por commit cubre el código de la app. Los mockups (`4abb405`) y los registros (`0b731ac`, `5bb272d` y este) quedan sin revisión RDD.
