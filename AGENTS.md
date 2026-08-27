# AGENTS.md

Instrucciones para cualquier agente que trabaje en este repositorio. Es la fuente de verdad;
`CLAUDE.md` apunta acá.

## El proyecto

Aplicación móvil que calcula las fórmulas de **Comunicaciones** (UTN-FRT, 3° año ISI).
Es el Trabajo Final Integrador de la materia: se entrega un **APK** más un **informe escrito**,
en **noviembre de 2026**, y se defiende oralmente sobre tres ejes — qué es, cómo se hizo y para
qué sirve. Se evalúa que la app **funcione y calcule bien**.

Trabajo grupal; la calculadora la construye Lautaro.

## Reglas duras

Estas no se negocian. Son las que hacen que la app sea defendible.

1. **Nunca inventes una fórmula.** La fuente única es
   [`docs/research/formulas-comunicaciones.md`](docs/research/formulas-comunicaciones.md), donde cada
   fórmula cita la página de su Presentación de unidad. No agregues fórmulas desde conocimiento
   general de la materia, por obvias que parezcan. Si falta una, se decide primero si entra en alcance.
2. **No todas las 140 son calculadoras.** Antes de cargar una Fórmula, mirá su clase en
   [`docs/research/clasificacion-formulas.md`](docs/research/clasificacion-formulas.md): 105 son
   calculables, 20 lo son con una restricción que va escrita en `condiciones`, y 15 entran como
   ficha de consulta sin campos de entrada. No decidas la clase por tu cuenta.
3. **Toda fórmula implementada lleva un test contra su Ejemplo resuelto.** El catálogo trae 164
   ejemplos con entradas y resultado esperado, sacados de las diapositivas. Ese test es la prueba de
   que la transcripción es correcta; sin él la fórmula no está terminada.
4. **Las fórmulas marcadas ⚠️ ya tienen su observación resuelta.** Las decisiones están en
   [`docs/research/observaciones-resueltas.md`](docs/research/observaciones-resueltas.md): al cargar
   una de esas 16, aplicá lo que dice ahí y no la vuelvas a decidir. Si aparece una observación
   nueva, resolvela explícitamente y dejá registro; nunca la apliques en silencio.
5. **`Unidad` y `Unidad de medida` son cosas distintas.** La primera es una de las diez divisiones
   temáticas de la materia; la segunda es Hz, dBm, bit/s. Nunca llames `unidad` a una unidad de medida
   en el código. Ver [`CONTEXT.md`](CONTEXT.md).
6. **Los múltiplos importan.** Cargar MHz donde la fórmula espera Hz da un resultado un millón de
   veces mayor sin ningún error visible. Cada Variable expone selector de múltiplo con su unidad
   canónica preseleccionada.
7. **Escribí en español**: código comentado, documentos, mensajes de commit e interfaz.

## Stack

- **Expo** + React Native + TypeScript. Desarrollo con **Expo Go** (no hace falta Android Studio).
- El **APK** se compila con **EAS Build** en la nube. _Los límites del plan gratuito de EAS todavía
  no se verificaron: confirmarlos contra la documentación oficial antes de depender de ellos._
- Objetivo primario **Android**; iOS después, solo si la cátedra lo pide.

## Arquitectura

**Las fórmulas son datos, no pantallas.** Cada Fórmula es un objeto tipado con sus Variables, sus
Unidades de medida y una función `calcular()`; **una sola pantalla genérica** las renderiza a todas.

Son 140 fórmulas: escribir una pantalla por fórmula no termina nunca, y un evaluador de expresiones
de terceros convierte errores de compilación en errores en tiempo de ejecución — justo lo que no
querés en una defensa oral. Agregar una fórmula debe costar unas pocas líneas de datos más su test.

El cálculo es **unidireccional**: se cargan todas las Variables salvo la de salida. No se despeja una
incógnita elegida por quien usa la app.

## Alcance

**Dentro:** las diez Presentaciones de unidad (684 páginas), fuente maestra del proyecto.
**Fuera:** los 38 PDFs de Material complementario y los libros de `Biblioteca/`.

Los trabajos prácticos **no** se usan como guía de prioridad: el cuatrimestre sigue en curso y faltan
TPs por publicarse, así que priorizar por ellos sesgaría la app hacia la primera mitad del programa.

## Reparto del trabajo

Claude orquesta mediante las skills `orchestration` y `orca-cli` de Orca. La implementación de volumen
la ejecuta un agente **agy** (Gemini vía Google Antigravity).

El criterio: **agy aplica patrones ya definidos, Claude define el patrón y revisa lo que vuelve.**
Cargar 140 fórmulas siguiendo una estructura establecida es trabajo de agy. Diseñar esa estructura,
resolver una observación ⚠️, o decidir algo que se defiende en el oral, no.

Lo que vuelve de agy se revisa contra las reglas duras antes de commitear. El test contra el Ejemplo
resuelto es la primera revisión y no es opcional.

## Cómo se agrega una Fórmula

El patrón ya está establecido en `src/formulas/unidad-10.ts` con `U10-F07`. Leelo antes de cargar
una Unidad: es la referencia, no este resumen.

Dónde va cada cosa:

- `src/dominio/` — el tipo de la Fórmula, los múltiplos, el motor de cálculo. **No se toca** al
  cargar Fórmulas. Si una Fórmula parece necesitar un cambio acá, es una escalación, no una edición.
- `src/formulas/unidad-N.ts` — las Fórmulas de esa Unidad y sus Ejemplos resueltos, como datos.
- `src/formulas/index.ts` — el registro único. Se toca al sumar una Unidad.
- `src/formulas/catalogo.ts` — el invariante de cobertura. **Al cargar una Unidad hay que sacar sus
  identificadores de `PENDIENTES_DE_CARGA`**, o el invariante falla nombrándolos. Es a propósito:
  esa lista es la deuda declarada y su único destino es encogerse hasta quedar vacía.
- Los tests van **al lado** del archivo que prueban (`unidad-10.test.ts`), no en `__tests__/`.

Tres cosas que importan al escribirlas:

1. **`calcular()` recibe los valores ya en unidad canónica.** La conversión de múltiplos la hace el
   motor, una sola vez, para todas. Una fórmula que convierte por su cuenta está mal.
2. **Los símbolos pertenecen a la Fórmula, no a la Unidad.** No hay tabla compartida. `T_s` es el
   período de muestreo en `U05-F13` y la duración del símbolo en `U05-F04`: compartirlos alimentaría
   una fórmula con la magnitud equivocada sin ningún síntoma.
3. **En `@testing-library/react-native` 14, `render` y `fireEvent` devuelven Promesas.** Sin `await`,
   el test falla con «`render` function has not been called», que no dice nada sobre la causa.
4. **Una Variable que suma sobre N términos se declara `esLista`** y llega en el segundo parámetro
   de `calcular`. El patrón está en `src/formulas/unidad-04.ts` con `U04-F06`, la entropía.
   El múltiplo es uno para toda la lista, no uno por elemento.

Comandos: `npm test`, `npm run typecheck`, `npm start` (Expo Go).

## Convenciones del repositorio

- **Issues**: GitHub Issues vía `gh`. Ver `docs/agents/issue-tracker.md`.
- **Etiquetas de triage**: los cinco roles canónicos. Ver `docs/agents/triage-labels.md`.
- **Documentos de dominio**: contexto único — `CONTEXT.md` y `docs/adr/` en la raíz.
  Ver `docs/agents/domain.md`.
- **Commits**: en español, describiendo el porqué y no solo el qué. El informe final sale del repo,
  así que el historial es parte del entregable.
