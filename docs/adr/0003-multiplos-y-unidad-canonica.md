# ADR 0003: Gestión de múltiplos, unidad canónica y diseño del seam de test

## Estado
Aceptado

## Contexto
En la materia Comunicaciones, los valores de las Variables abarcan órdenes de magnitud muy dispares, utilizando habitualmente múltiplos y submúltiplos del Sistema Internacional (por ejemplo, frecuencias en GHz o MHz frente a tiempos en µs o ns, o potencias en mW y dBm).
Uno de los errores más comunes y dañinos en la práctica es ingresar un valor en un múltiplo erróneo (por ejemplo, cargar MHz donde la fórmula matemática requiere Hz). Este tipo de equivocación produce un resultado desplazado por varios órdenes de magnitud (un factor de $10^6$) sin generar ningún síntoma o error de ejecución visible en el software.

## Decisión
Se decidió estructurar la gestión de magnitudes bajo los siguientes principios:

1. **Unidad canónica en el dominio de cálculo:**
   - Cada Variable declara explícitamente su Unidad de medida y su múltiplo canónico (el múltiplo natural de uso en la cátedra).
   - La función `calcular()` de cada Fórmula opera exclusivamente sobre valores numéricos normalizados en su Unidad de medida canónica base. La Fórmula no realiza conversiones de múltiplos por su cuenta.

2. **Conversión centralizada en el motor:**
   - El motor de cálculo (`src/dominio/motor.ts`) y el módulo de múltiplos (`src/dominio/multiplos.ts`) centralizan la conversión de las entradas a valores canónicos (`aCanonico`) y el escalado del resultado al múltiplo de salida más legible (`elegirMultiplo` / `desdeCanonico`).
   - La interfaz preselecciona el múltiplo canónico de cada Variable, asegurando que «el camino sin pensar sea el camino correcto».

3. **Seam de test por encima de la conversión:**
   - El seam principal para las pruebas unitarias se sitúa deliberadamente **por encima** de la conversión de múltiplos. Los tests invocan al motor con la estructura `Entradas` (donde cada valor se proporciona junto a su múltiplo, tal como lo ingresa quien usa la app) y verifican el resultado final escalado.

## Alternativas descartadas y por qué

1. **Delegar la conversión de múltiplos a cada Fórmula individual dentro de su función `calcular()`:**
   - *Por qué se descartó:* Repetir la lógica de conversión 140 veces introduce una fuente crítica de errores por factores de escala mal tipeados o inconsistencias entre Fórmulas. La conversión debe ser responsabilidad exclusiva del motor de cálculo.

2. **Situar el seam de test por debajo de la conversión (probar únicamente `formula.calcular(valoresCanonicos)`):**
   - *Por qué se descartó:* Probar solo la función matemática interna con valores ya convertidos dejaría sin ejercitar la capa de conversión de múltiplos. Dado que el error de múltiplo es el único que no genera fallas en tiempo de ejecución pero falsea por completo la validez del cálculo, un seam de test por debajo no detectaría fallas críticas en la interacción real del usuario con la calculadora.

3. **Forzar la carga manual de datos siempre en la unidad de medida base sin selector de múltiplos (por ejemplo, exigir tipear 2400000000 Hz en lugar de 2,4 GHz):**
   - *Por qué se descartó:* Afecta gravemente la usabilidad de la aplicación, incrementa el riesgo de error humano por conteo de ceros y contradice la forma habitual en que la cátedra plantea los enunciados de los Ejemplos resueltos.

## Consecuencias
- Un único test automatizado por Fórmula valida simultáneamente la corrección de la expresión y la correcta transformación de múltiplos.
- Los 164 Ejemplos resueltos de las Presentaciones de unidad se trasladan de forma directa y legible a fixtures de test con sus múltiplos originales.
- El usuario dispone de selectores de múltiplo intuitivos con valores por defecto adecuados, reduciendo al mínimo la posibilidad de error operativo.
