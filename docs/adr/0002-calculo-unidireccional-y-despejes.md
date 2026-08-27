# ADR 0002: Cálculo unidireccional y criterio de inclusión de despejes

## Estado
Aceptado

## Contexto
En el estudio de las telecomunicaciones, casi todas las relaciones matemáticas entre magnitudes pueden despejarse algebraicamente para distintas incógnitas. De hecho, el catálogo de investigación del proyecto identifica que 135 de las 140 Fórmulas son teóricamente despejables para otras Variables, lo que generaría un espacio combinatorio de aproximadamente 400 despejes posibles.
Se debe definir cómo aborda la calculadora la dirección del cálculo y bajo qué criterio se incorporan las variantes de despeje algebraico.

## Decisión
Se decidió que el cálculo en la aplicación sea estrictamente **Cálculo unidireccional** y que se implemente como Fórmula independiente únicamente aquel despeje que aparece explícitamente resuelto por la cátedra en un **Ejemplo resuelto** dentro de una Presentación de unidad.

En este modelo:
- Cada Fórmula posee una lista fija de Variables de entrada y una única Variable de salida predefinida. Quien usa la app ingresa todas las entradas requeridas para obtener el valor de la salida; la aplicación no permite seleccionar una incógnita arbitraria para despejar.
- Cuando la cátedra publica un Ejemplo resuelto donde se calcula una Variable que originalmente aparecía como entrada en otra Fórmula, se crea una nueva Fórmula independiente con su propio identificador y su función de cálculo.
- Los despejes teóricos que la cátedra no resuelve en sus Presentaciones de unidad no se implementan a priori, quedando disponibles para incorporarse en el futuro si surge un Ejemplo resuelto oficial que los respalde.

## Alternativas descartadas y por qué

1. **Permitir el despeje libre de incógnitas mediante un motor de álgebra computacional (CAS) o resolución simbólica:**
   - *Por qué se descartó:* Incorporar un motor simbólico o algoritmos numéricos de búsqueda de raíces para despejar cualquier Variable elegida por el usuario introduce una enorme complejidad algorítmica, riesgos de indeterminaciones, divisiones por cero imprevistas o soluciones múltiples en fórmulas no lineales. Además, desvía el propósito pedagógico de la aplicación, que busca reflejar con precisión los métodos y problemas exactos dictados por la cátedra.

2. **Implementar de forma anticipada los ~400 despejes teóricos posibles:**
   - *Por qué se descartó:* Crear cientos de Fórmulas combinatorias adicionales violaría la regla dura fundamental del proyecto: «Toda fórmula implementada lleva un test contra su Ejemplo resuelto». Al no existir Ejemplos resueltos oficiales en las Presentaciones de unidad para la inmensa mayoría de esos despejes, no habría forma de probar su transcripción contra datos de referencia de la cátedra, introduciendo fórmulas no verificadas en el entregable final.

## Consecuencias
- Cada Fórmula implementada en la aplicación cuenta con trazabilidad directa a una Presentación de unidad y al menos un test unitario contra un Ejemplo resuelto oficial.
- El alcance se mantiene riguroso, verificable y directamente defendible frente al tribunal evaluador.
- La arquitectura de cálculo es predecible, determinista y de ejecución instantánea.
