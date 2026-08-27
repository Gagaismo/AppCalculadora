# ADR 0001: Las Fórmulas son datos, no pantallas

## Estado
Aceptado

## Contexto
La materia Comunicaciones comprende 140 Fórmulas distribuidas a lo largo de las diez Unidades. Cada Fórmula involucra un conjunto particular de Variables con sus respectivas Unidades de medida, restricciones de aplicación y una operación de cálculo específica.
Para construir una aplicación móvil mantenible, confiable y que pueda ser defendida con solvencia en el Trabajo Final Integrador, es fundamental definir cómo se representan y renderizan las Fórmulas en el código.

## Decisión
Se decidió modelar cada Fórmula como un objeto de datos fuertemente tipado en TypeScript y utilizar una única pantalla genérica (`PantallaFormula`) para renderizar y operar las 140 Fórmulas de la aplicación.

Cada objeto `Formula` encapsula:
- Su identificador del catálogo (por ejemplo, `U10-F07`), número de Unidad y nombre.
- La expresión matemática textual visible en pantalla.
- La lista de Variables de entrada y la Variable fija de salida, cada una con su símbolo, significado, Unidad de medida y múltiplo canónico.
- Las condiciones de aplicación, páginas de origen en la Presentación de unidad y nivel de confianza.
- Una función pura `calcular()` que opera sobre valores normalizados en Unidad de medida canónica.

El sistema de tipos de TypeScript es deliberadamente estricto: si una Fórmula omite la Unidad de medida de una Variable, la Variable de salida o la referencia a las páginas de origen, el proyecto no compila.

## Alternativas descartadas y por qué

1. **Construir una pantalla dedicada por cada Fórmula (140 pantallas):**
   - *Por qué se descartó:* Escribir 140 pantallas o componentes individuales genera una duplicación masiva de lógica de interfaz, selectores de múltiplo, validaciones de entrada, manejo de estados y presentación de resultados. No escala para el volumen del proyecto y multiplica el costo de mantenimiento ante cualquier ajuste de diseño o comportamiento común.

2. **Utilizar un evaluador de expresiones matemáticas dinámico de terceros (parseo de strings en tiempo de ejecución):**
   - *Por qué se descartó:* Un motor de evaluación dinámica traslada la detección de errores de tipeo o inconsistencias de dominio desde el tiempo de compilación al tiempo de ejecución. En una defensa oral ante el tribunal evaluador, un error de sintaxis en un string evaluado dinámicamente causaría un fallo en vivo en la aplicación. Además, incorpora dependencias externas opacas e innecesarias para cálculos numéricos directos.

## Consecuencias
- Agregar una nueva Fórmula al sistema requiere únicamente definir su estructura de datos tipada y su correspondiente test automatizado contra el Ejemplo resuelto de la cátedra.
- La experiencia de usuario, la validación de entradas y la presentación de errores resultan 100% consistentes en toda la aplicación.
- Los errores de transcripción o tipado se detectan en tiempo de compilación gracias a TypeScript, eliminando fallos en tiempo de ejecución.
