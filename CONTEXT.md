# Calculadora de Comunicaciones

Aplicación móvil que calcula las fórmulas de la materia Comunicaciones (UTN-FRT, 3° año ISI). Trabajo Final Integrador.

## Language

### Material de la cátedra

**Unidad**:
Una de las diez divisiones temáticas en que la cátedra parte la materia. Siempre se identifica por su número (Unidad 5).
_Avoid_: módulo, capítulo, tema

**Presentación de unidad**:
El PDF único que la cátedra publica como material principal de una Unidad. Son diez, suman 684 páginas, y constituyen el alcance de cobertura del proyecto.
_Avoid_: deck, deck maestro, diapositivas (a secas), apunte

**Material complementario**:
Los demás PDFs que acompañan a una Presentación de unidad dentro de su carpeta, numerados por tema (1.1, 1.2, …). Fuera del alcance salvo decisión explícita.
_Avoid_: anexos, extras

### Dominio de cálculo

**Fórmula**:
Una expresión de la materia en la que se cargan valores y sale un resultado numérico. Es la pieza que la app sabe calcular y la unidad de trabajo del proyecto.
_Avoid_: ecuación, cuenta, función

**Variable**:
Cada símbolo que participa de una Fórmula, con su significado y su Unidad de medida.
_Avoid_: parámetro, campo, input

**Unidad de medida**:
Aquello en que se expresa el valor de una Variable: Hz, dBm, bit/s, segundos. Nunca se la nombra "unidad" a secas, porque esa palabra ya está tomada por la división temática de la materia.
_Avoid_: unidad, magnitud, dimensión

**Cálculo unidireccional**:
El modo en que la app resuelve una Fórmula: se cargan todas las Variables salvo una fija de salida, y se obtiene su valor. No se despeja una incógnita elegida por quien usa la app.
_Avoid_: cálculo directo, modo simple

**Ejemplo resuelto**:
Un ejercicio que aparece ya resuelto en una Presentación de unidad, con valores de entrada y resultado. Cada uno es la prueba de que su Fórmula está bien implementada.
_Avoid_: ejercicio, caso, muestra
