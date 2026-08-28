# Product

<!-- impeccable:product-schema 1 -->

## Platform

android

Decisión diferida, registrada a propósito: **iOS está fuera de alcance por ahora, no
descartado.** No es verificable hoy —hace falta una Mac o una cuenta de desarrollador de
Apple, y no hay ninguna de las dos— así que implementarlo dejaría la mitad del trabajo
nativo sin probar hasta la entrega. Los componentes nativos se escriben sabiendo que
existe una variante `@expo/ui/swift-ui`, aunque no se implemente.

## Stack

Expo + React Native + TypeScript, ya establecido. Desarrollo contra Expo Go; el APK se
compila con EAS Build en la nube (15 builds por mes), por lo que `eas build` no corre en
integración continua: el APK se arma en hitos, no en cada push.

## Users

**Quien construye y defiende el Trabajo Final Integrador**, y el tribunal que lo evalúa.
La app no circula fuera del grupo: no hay usuarios ajenos que necesiten que la interfaz
se explique sola a alguien que nunca la vio.

La situación de uso primaria es concreta y acotada: **el tribunal pide un cálculo de
cualquier Unidad y hay que resolverlo en el momento**, sabiendo de antemano qué Fórmula
se quiere usar. Estudiar con la app y consultarla en clase son usos reconocidos pero
explícitamente diferidos.

## Product Purpose

Calcula las fórmulas de **Comunicaciones** (UTN-FRT, 3° año ISI) a partir del catálogo de
las diez Presentaciones de unidad de la materia.

Existe para resolver un error específico: **cargar un múltiplo equivocado**. Poner MHz
donde la fórmula espera Hz da un resultado un millón de veces mayor sin ningún síntoma
visible. Todo lo demás del producto está subordinado a eso.

El éxito se mide en que **funcione y calcule bien**. Se entrega un APK más un informe
escrito en **noviembre de 2026**, y se defiende oralmente sobre tres ejes: qué es, cómo
se hizo y para qué sirve.

## Positioning

Lo que una app de fórmulas cualquiera no puede copiar: **cada Fórmula es trazable a la
página de la diapositiva de la que salió**, y **234 Ejemplos resueltos de la propia
cátedra corren como casos de test contra el motor**. La app no dice que calcula bien: lo
demuestra contra la fuente que la evalúa.

Las Fórmulas son **datos tipados, no cadenas interpretadas**. Esa decisión disolvió por
sí sola ocho de las dieciséis observaciones de verificación del catálogo: no se
corrigieron ocho errores uno por uno, se eligió un modelo en el que no pueden ocurrir.

## Operating Context

Se usa en el aula o frente al tribunal, en un teléfono Android, con el ejercicio a mano y
poco tiempo. El recorrido real es: encontrar la Fórmula (por Unidad o buscándola), cargar
números con su múltiplo, leer un resultado.

El historial de git es parte del entregable: el informe final sale del repositorio, así
que los mensajes de commit se escriben en español explicando el porqué.

## Capabilities and Constraints

- **138 Fórmulas cargadas de las 140** del catálogo. Faltan tres (`U06-F04`, `U06-F05`,
  `U06-F11`) y es deliberado: reciben palabras binarias o polinomios sobre GF(2), y el
  modelo sólo admite Variables numéricas.
- **105 son calculables, 20 lo son con una restricción escrita, y 15 son ficha de
  consulta sin campos de entrada.** La clase no se decide al cargarlas: está en el
  catálogo.
- El cálculo es **unidireccional**: se cargan todas las Variables salvo la de salida. No
  se despeja una incógnita elegida por quien usa la app.
- **Nunca se inventa una fórmula.** La fuente única es
  `docs/research/formulas-comunicaciones.md`, donde cada una cita su página.
- **Los símbolos pertenecen a la Fórmula, no a la Unidad.** No hay tabla compartida: `T_s`
  es el período de muestreo en una y la duración del símbolo en otra, y compartirlos
  alimentaría una fórmula con la magnitud equivocada sin ningún síntoma.
- **«Unidad» y «Unidad de medida» son cosas distintas.** La primera es una de las diez
  divisiones temáticas de la materia; la segunda es Hz, dBm, bit/s.
- **Todo en español**: código comentado, documentos, commits e interfaz.

## Brand Commitments

La paleta y la tipografía salen de un styleguide de Figma que el usuario eligió: cinco
colores (`#C67C4E`, `#EDD6C8`, `#313131`, `#E3E3E3`, `#F9F2ED`) y la familia **Sora**.
Es una restricción visual vinculante.

Lo que el styleguide no cubre —colores de estado, contrastes, una monoespaciada para la
notación— está derivado y documentado en `src/tema/index.ts`.

**La IA no figura como autora.** Que se usó puede mencionarse; atribuirle autoría, no.

## Evidence on Hand

- `docs/research/formulas-comunicaciones.md` — el catálogo de las 140 Fórmulas con su
  expresión LaTeX, su página de origen y su nivel de confianza.
- `docs/research/clasificacion-formulas.md` — calculable / con restricciones / ficha.
- `docs/research/observaciones-resueltas.md` — las 16 observaciones ⚠️ y su resolución.
- `docs/research/latex-transcripcion.md` — la regla de transcripción del LaTeX.
- `docs/adr/` — las decisiones que se defienden en el oral.
- 234 Ejemplos resueltos de la cátedra, corriendo como tests.

**Nada de esto se inventa ni se amplía.** Si una fórmula, un ejemplo o una página no está
en el catálogo, no existe para el producto.

## Product Principles

1. **Calcular bien es el producto.** Todo lo demás —la interfaz incluida— existe para que
   ese cálculo sea correcto y creíble, no para competir con él.
2. **El múltiplo siempre a la vista.** Es el error que la app existe para evitar; el
   control que lo elige nunca se esconde ni se abrevia.
3. **Trazable hasta la diapositiva.** Toda Fórmula muestra de dónde salió y cuánta
   confianza tiene su transcripción. El rigor es visible, no una promesa.
4. **Lo que no se puede probar, no se afirma.** Una Fórmula sin su test contra el Ejemplo
   resuelto no está terminada; un invariante que no puede fallar no vigila nada.
5. **El alcance declarado se declara.** Las tres Fórmulas que faltan y las que no tienen
   Ejemplo resuelto se nombran, no se omiten.

## Accessibility & Inclusion

No hay requisito formal de la cátedra. Se sostiene lo que ya existe —etiquetas de
accesibilidad en los controles, contraste AA verificado en los tokens del tema— porque es
barato y se defiende bien en el oral.

Una consecuencia concreta: como las expresiones matemáticas se dibujan como SVG y un SVG
no tiene texto que un lector de pantalla pueda leer, la expresión en texto plano se
conserva como etiqueta de accesibilidad.
