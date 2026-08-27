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
2. **Toda fórmula implementada lleva un test contra su Ejemplo resuelto.** El catálogo trae 164
   ejemplos con entradas y resultado esperado, sacados de las diapositivas. Ese test es la prueba de
   que la transcripción es correcta; sin él la fórmula no está terminada.
3. **Las fórmulas marcadas ⚠️ tienen una observación de verificación sin resolver.** Resolvela
   explícitamente antes de implementarla y dejá registro de qué se decidió. No la apliques en silencio.
4. **`Unidad` y `Unidad de medida` son cosas distintas.** La primera es una de las diez divisiones
   temáticas de la materia; la segunda es Hz, dBm, bit/s. Nunca llames `unidad` a una unidad de medida
   en el código. Ver [`CONTEXT.md`](CONTEXT.md).
5. **Los múltiplos importan.** Cargar MHz donde la fórmula espera Hz da un resultado un millón de
   veces mayor sin ningún error visible. Cada Variable expone selector de múltiplo con su unidad
   canónica preseleccionada.
6. **Escribí en español**: código comentado, documentos, mensajes de commit e interfaz.

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

## Convenciones del repositorio

- **Issues**: GitHub Issues vía `gh`. Ver `docs/agents/issue-tracker.md`.
- **Etiquetas de triage**: los cinco roles canónicos. Ver `docs/agents/triage-labels.md`.
- **Documentos de dominio**: contexto único — `CONTEXT.md` y `docs/adr/` en la raíz.
  Ver `docs/agents/domain.md`.
- **Commits**: en español, describiendo el porqué y no solo el qué. El informe final sale del repo,
  así que el historial es parte del entregable.
