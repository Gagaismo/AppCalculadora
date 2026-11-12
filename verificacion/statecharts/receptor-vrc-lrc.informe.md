# VrcLrc

TLC reached 196 states and 520 steps. The chart draws 9 states and 25 arrows.
The chart does not draw 249 steps that stay in one chart state.

## UnBitCambiadoSeDetecta breaks
The shortest path has 4 steps:
0. Tabla recibida
1. tocás un bit de la tabla: Tabla recibida
2. tocás «Siguiente»: Recalculando VRC por columna y LRC por fila
3. tocás «Siguiente»: Recalculando VRC por columna y LRC por fila
4. tocás «Siguiente» [sólo llegó cambiada la esquina]: «Sin error detectado», y la esquina llegó cambiada

## CorregirNoRompeUnBitSano breaks
The shortest path has 5 steps:
0. Tabla recibida
1. tocás un bit de la tabla: Tabla recibida
2. tocás un bit de la tabla: Tabla recibida
3. tocás «Siguiente»: Recalculando VRC por columna y LRC por fila
4. tocás «Siguiente»: Recalculando VRC por columna y LRC por fila
5. tocás «Siguiente» [llegaron cambiados un VRC y un LRC]: Señala un dato que llegó bien y ofrece «Corregir el bit»

## Rules that hold
PasoDentroDelRecorrido, CorregidaSoloDondeSePuede, NoDeadlock
