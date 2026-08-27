# ADR 0004: Alcance del proyecto y verificación del cero de fórmulas en Unidad 1

## Estado
Aceptado

## Contexto
El corpus bibliográfico de la materia Comunicaciones (UTN-FRT) incluye 10 Presentaciones de unidad (684 páginas en total), 38 documentos de Material complementario, libros de texto de referencia en la biblioteca de la cátedra y guías de Trabajos Prácticos que se publican progresivamente durante el ciclo lectivo.
Para el desarrollo del Trabajo Final Integrador, cuya entrega y defensa oral se realizarán en noviembre de 2026, hace falta establecer límites de alcance explícitos y demostrables.

## Decisión
Se definieron las siguientes fronteras de alcance para el proyecto:

1. **Dentro del alcance:**
   - Las 10 Presentaciones de unidad de la cátedra (684 páginas), que constituyen la fuente maestra y canónica del proyecto. De ellas se extrajeron 140 Fórmulas. Ese número es lo que encontró la extracción verificada por un segundo lector, no una garantía de que no exista ninguna más: el propio catálogo mantiene una sección de «Huecos conocidos» y clasifica cada Fórmula por nivel de confianza.

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
     - Los únicos símbolos matemáticos aislados encontrados son un caracter `λ` en un párrafo descriptivo sobre dispersión en fibra óptica multimodo y siete caracteres `μ`, de los cuales seis son la unidad de medida `μm` en diámetros de núcleo de fibra y el séptimo es `μTP`, el nombre de un protocolo.
     - Se auditó la densidad de texto por diapositiva: ninguna página arrojó menos de 60 caracteres de texto, descartando la presencia de diapositivas compuestas exclusivamente por imágenes rasterizadas donde pudieran ocultarse fórmulas no detectadas por la extracción de texto.
     - La conclusión es que la Unidad 1 es introductoria y conceptual, y que la ausencia de Fórmulas viene del material de la cátedra y no del proceso de extracción. El método tiene un límite conocido y conviene declararlo: verifica el **texto** de las diapositivas. Una fórmula compuesta enteramente como imagen vectorial dentro de una página con texto suficiente quedaría fuera de su alcance. La auditoría de densidad reduce ese riesgo pero no lo elimina.

## Alternativas descartadas y por qué

1. **Incorporar fórmulas desde el Material complementario o la bibliografía para completar la Unidad 1:**
   - *Por qué se descartó:* Rompería el criterio de fuente maestra única. El Material complementario contiene conceptos y fórmulas adicionales no evaluados en las presentaciones principales. Abrir excepciones debilitaría la frontera de alcance y multiplicaría indefinidamente el universo de fórmulas sin un criterio claro de cierre.

2. **Ocultar la Unidad 1 en la interfaz de usuario de la aplicación:**
   - *Por qué se descartó:* Ocultar la primera Unidad generaría dudas durante la defensa oral, sugiriendo un posible olvido o incompletitud. En cambio, mostrar la Unidad 1 con 0 Fórmulas y su correspondiente nota explicativa demuestra rigurosidad metodológica y control total sobre el material evaluado.

3. **Aceptar el resultado de 0 Fórmulas sin una verificación empírica documentada:**
   - *Por qué se descartó:* Afirmar que una Unidad carece de fórmulas sin pruebas reproducibles dejaría una vulnerabilidad abierta frente a preguntas del tribunal evaluador. La verificación sistemática del texto y de la densidad de caracteres provee la evidencia técnica necesaria para fundamentar la decisión en el informe escrito y en el examen oral.

## Consecuencias
- El alcance es cerrado y trazable: cada Fórmula de la app cita la página de la Presentación de unidad de la que sale.
- La estructura del catálogo se puede defender en el oral con un método reproducible y con sus límites declarados, que es más sólido que una afirmación categórica.
- La aplicación cubre las Fórmulas relevadas en las Presentaciones de unidad. No cubre el Material complementario, y eso es una decisión declarada, no una omisión.
