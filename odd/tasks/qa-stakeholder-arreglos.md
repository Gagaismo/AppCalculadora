# Arreglos de la revisión de stakeholder del APK 1.0.0

Corrige los seis hallazgos más graves de la revisión en teléfono del 2026-11-24 (Engram #4611).
Reparto: Pi (ODD, rama `fix/qa-pi`) y agy gemini-4-neon-medium (worktree propio). Review: Codex gpt-6.1-terra medium.

## Specs

- **S1 — Curva constante no cierra la app.** Hoy: «la app se cierra cuando la curva de la vista previa da cero en todos sus puntos» (U05-F17 con B = 3000 y SNR = 0; U02-F04 con v = 0 y T = 0) y al «llevar un deslizador lineal hasta su extremo izquierdo, que vale 0» en la gráfica (U02-F08 con A=2, f=50, t=5, θ=0, eje X «t», deslizador de A a la izquierda; U02-F03 con v=300, f=1000 kHz, eje X «f», deslizador de v a la izquierda). Logcat: `IllegalArgumentException: Invalid number formating character 'N' (… M46.0 NaNL47.3 NaN…)` en `PathViewManager.setD`. Causa: `src/graficas/escala.ts:163-164` deja `min = max = 0`. Esperado: curva plana visible, sin NaN en ningún path ni etiqueta, para cualquier serie constante (0, positiva o negativa).
- **S2 — La línea «= …» bajo el resultado.** Hoy `src/screens/formula/index.tsx:237` imprime el valor en unidad base con el rótulo del `multiploCanonico`: U10-F07 con f_sup = 2,4835 GHz y f_inf = 2,4 GHz muestra «83,5 MHz / = 83500000 MHz»; U02-F03 con v = 340, f = 20 kHz muestra «17 mm / = 0,017 mm». Esperado: el número de esa línea es el valor convertido al `multiploCanonico` de la salida, con ese mismo rótulo; si el texto queda idéntico al resultado principal, la línea no se muestra.
- **S3 — Sin prefijos SI donde no corresponden.** Hoy: «791,8124605 mdB» (U03-F15), «10 kadimensional» (U03-F14), «10 µadimensional» (U06-F01), «424,4 madimensional» (U02-F15), «500 m%» (U04-F08), «413,9268516 mdBm» (U03-F04), «468,9955936 mbit/símbolo» (U04-F06), y el selector ofrece «kdBm», «madimensional», «kadimensional». Esperado: las unidades de medida logarítmicas (dB, dBm, dBi…), %, adimensional, °C, las «por símbolo» y las que llevan exponente nunca reciben prefijo, ni en el resultado, ni en el mensaje del profe guía, ni en el selector de entrada (esas entradas no ofrecen múltiplos). La clasificación es una lista explícita y un test falla si aparece una unidad de medida del catálogo sin clasificar.
- **S4 — Unidades con exponente.** Hoy U02-F29 con p = 1 ms, f = 0 Hz muestra «1 µs²», cuando (1 ms)² = 10⁻⁶ s². Esperado: un valor correcto en s² (sin prefijo, según S3).
- **S5 — CRC en el receptor no trunca la trama.** Hoy: «Emisor → CRC-16 → M = `10110111`×4 (32 bits)» da R = `0001010000100010`; al tipear los 48 bits de T en «Verificar en el receptor» el campo se queda en 32 bits sin aviso y dice «Resto 0000011000001111 ≠ 0 · hay error». Causa: `MAXIMO_BITS = 32` (`src/screens/bits/crc.tsx:16,54`) se aplica también a T'. Esperado: T' admite el largo máximo de M más el grado del generador más largo, y ese caso da resto 0 «sin error».
- **S6 — Residuos de punto flotante.** Hoy U02-F21 con A=1, p=1, T=2, n=2 muestra «0,00001949085916 pV» (la cátedra da 0 V); U08-F09 con V_p=1, f_p=1 kHz, t=1 ms muestra «-0,0002449293598 pV» (debe dar 0 V); U02-F27 en el Ejemplo de resultado 0 muestra «28,58 ps». Esperado: esos casos muestran «0 V» / «0 s»; los valores chicos legítimos siguen mostrándose (U03-F10 con T = 290 K da 4,002·10⁻²¹ W/Hz).
- **S7 — Ejes de la gráfica sin prefijos indebidos.** Hoy: «Rd [k%]» (U04-F08 con H_MAX=1, H=0,811), «SNR [M]» y «SNR = 10 k» (U03-F14), «BER [µ]» (U06-F01). Esperado: la regla de S3 también rige títulos de eje, marcas y lectura de la gráfica.

## Tasks

| ID | Specs | Ruta | Commit |
|---|---|---|---|
| T1 | S1 | Pi worker, rama `fix/qa-pi` | — |
| T2 | S5 | Pi worker, rama `fix/qa-pi` | — |
| T3 | S2, S3, S4, S6 | agy gemini-4-neon-medium, worktree `fix-qa-agy` | — |
| T4 | S7 | Pi worker, después de mergear T3 | — |
| T5 | — | Review Codex gpt-6.1-terra medium de cada PR, merge, `apk.yml` | — |

## Log

- **L1** (2026-11-24, pedido original): «Ahi conecte el telefono. Con ADB necesito que hagas una revision completa de casos border y review general del funcionamiento desde el punto de vista de stakeholder. Usa agentes rapidos como sonnet para los test»
- **L2** (2026-11-24): propuesta «arreglar primero los ítems 1 a 6 de la primera tabla, con un test de regresión cada uno». Respuesta: «Perfecto. Los arreglos repartilos entre Agy neon 4 medium y Pi con odd. Review solamente con codex gpt 6.1 terra medium y hace los merge y directamente empeza a hacer la compilacion con github actions y gradle»
- **L3**: decisiones del coordinador — la regla de unidades sin prefijo vive en `src/dominio/multiplos.ts` (T3) y la gráfica la reutiliza (T4); S2 convierte al múltiplo canónico en lugar de borrar la línea.
