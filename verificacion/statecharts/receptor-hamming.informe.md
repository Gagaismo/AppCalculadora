# Hamming

TLC reached 128 states and 324 steps. The chart draws 8 states and 22 arrows.
The chart does not draw 156 steps that stay in one chart state.

## CorregirNoRompeUnBitSano breaks
The shortest path has 6 steps:
0. Palabra recibida
1. cambiás un bit de la palabra: Palabra recibida
2. cambiás un bit de la palabra: Palabra recibida
3. tocás «Siguiente»: Revisando los grupos de paridad
4. tocás «Siguiente»: Revisando los grupos de paridad
5. tocás «Siguiente»: Revisando los grupos de paridad
6. tocás «Siguiente» [era el último grupo; llegaron dos bits cambiados]: Señala un bit que llegó bien y ofrece «Corregir el bit»

## Rules that hold
PasoDentroDelRecorrido, CorregidoSoloDondeSePuede, UnErrorSeUbica, UnErrorNoPasaPorBueno, NoDeadlock
