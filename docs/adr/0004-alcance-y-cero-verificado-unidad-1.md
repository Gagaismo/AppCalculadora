# ADR 0004: Alcance del proyecto y verificación del cero de fórmulas en Unidad 1

## Estado
Aceptado

## Contexto
El corpus bibliográfico de la materia Comunicaciones (UTN-FRT) incluye 10 Presentaciones de unidad (684 páginas en total), 38 documentos de Material complementario, libros de texto de referencia en la biblioteca de la cátedra y guías de Trabajos Prácticos que se publican progresivamente durante el ciclo lectivo.
Para el desarrollo del Trabajo Final Integrador, cuya entrega y defensa oral se realizarán en noviembre de 2026, es indispensable establecer límites de alcance inequívocos, exhaustivos y técnicamente demostrables ante el tribunal docente.

## Decisión
Se definieron las siguientes fronteras de alcance para el proyecto:

1. **Dentro del alcance:**
   - Las 10 Presentaciones de unidad de la cátedra (684 páginas), que constituyen la fuente maestra y canónica del proyecto. Se garantiza la cobertura del 100% de las Fórmulas calculables presentes en ellas (140 Fórmulas en total).

2. **Fuera del alcance:**
   - Los 38 documentos de Material complementario y los libros de `Biblioteca/`.
   - Los Trabajos Prácticos de la materia como criterio de priorización o alcance, ya que al publicarse de manera desfasada a lo largo del cuatrimestre sesgarían el desarrollo hacia la primera mitad del programa, descuidando Unidades avanzadas.

3. **Determinación del cero verificado de Unidad 1:**
   - La Unidad 1 («Sistemas de Comunicación») queda formalmente asentada en el catálogo y en la navegación de la aplicación con 0 Fórmulas calculables.
   - Para asegurar que este resultado no fuese consecuencia de un defecto en la herramienta de extracción de datos, se aplicó un método riguroso de verificación empírica sobre las 79 páginas de la Presentación de Unidad 1:
     - Se extrajo el texto digital completo de las 79 páginas y se analizó exhaustivamente.
     - Se verificó que no existe ninguna línea de texto que contenga el signo igual (`=`).
     - Se constató la ausencia total de términos operativos asociados a cálculo o formulación matemática: «fórmula», «ecuación», «se calcula», «hallar» y «determinar».
     - Los únicos 2 usos de la palabra «ejemplo» en todo el documento corresponden a analogías conceptuales explicativas en prosa, sin variables numéricas ni resolución de ejercicios.
     - Los únicos símbolos matemáticos aislados encontrados son un caracter `λ` en un párrafo descriptivo sobre dispersión en fibra óptica multimodo y siete caracteres `μ` que representan exclusivamente unidades de medida de diámetro de núcleo de fibra (`μm`).
     - Se auditó la densidad de texto por diapositiva: ninguna página arrojó menos de 60 caracteres de texto, descartando la presencia de diapositivas compuestas exclusivamente por imágenes rasterizadas donde pudieran ocultarse fórmulas no detectadas por la extracción de texto.
     - Se concluye con certeza que la Unidad 1 es puramente introductoria y conceptual; la ausencia de Fórmulas es una propiedad intrínseca del material oficial de la cátedra y no un defecto del proceso de relevamiento.

## Alternativas descartadas y por qué

1. **Incorporar fórmulas desde el Material complementario o la bibliografía para completar la Unidad 1:**
   - *Por qué se descartó:* Rompería el criterio de fuente maestra única. El Material complementario contiene conceptos y fórmulas adicionales no evaluados en las presentaciones principales. Abrir excepciones debilitaría la frontera de alcance y multiplicaría indefinidamente el universo de fórmulas sin un criterio claro de cierre.

2. **Ocultar la Unidad 1 en la interfaz de usuario de la aplicación:**
   - *Por qué se descartó:* Ocultar la primera Unidad generaría dudas durante la defensa oral, sugiriendo un posible olvido o incompletitud. En cambio, mostrar la Unidad 1 con 0 Fórmulas y su correspondiente nota explicativa demuestra rigurosidad metodológica y control total sobre el material evaluado.

3. **Aceptar el resultado de 0 Fórmulas sin una verificación empírica documentada:**
   - *Por qué se descartó:* Afirmar que una Unidad carece de fórmulas sin pruebas reproducibles dejaría una vulnerabilidad abierta frente a preguntas del tribunal evaluador. La verificación sistemática del texto y de la densidad de caracteres provee la evidencia técnica necesaria para fundamentar la decisión en el informe escrito y en el examen oral.

## Consecuencias
- El alcance del proyecto es cerrado, trazable y 100% verificable contra las 10 Presentaciones de unidad.
- Se cuenta con una fundamentación empírica inobjetable para defender la estructura del catálogo en la instancia oral del Trabajo Final Integrador.
- La aplicación refleja de manera fiel y transparente la totalidad del contenido evaluable de la cátedra.
