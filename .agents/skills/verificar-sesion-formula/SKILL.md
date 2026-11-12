---
name: verificar-sesion-formula
description: Verifica con un modelo TLA+ la sesión que comparten la pantalla de Fórmula y su gráfica — que los campos muestren lo último cargado mientras la Fórmula esté abierta y que al cerrarla no quede nada guardado. Usala antes de commitear cualquier cambio a ProveedorSesion o useSesionFormula en src/graficas/sesion.tsx, al useEffect que llama a olvidar en src/screens/formula/index.tsx, al uso de la sesión en src/screens/grafica/index.tsx, al proveedor de src/app/_layout.tsx o a cómo se apilan las rutas de formula/[id], y cuando alguien reporte campos que se vacían solos o una Fórmula que abre con valores viejos.
---

# Verificar la sesión de la Fórmula

`ProveedorSesion` (`src/graficas/sesion.tsx`) guarda, arriba de toda la pila de
pantallas, lo cargado en los campos de cada Fórmula. La pantalla de Fórmula y la de su
gráfica leen y escriben la misma entrada, y la pantalla de Fórmula la borra al cerrarse
(`useEffect(() => olvidar, [olvidar])`). La entrada se busca **sólo por `formula.id`**:
no sabe qué pantalla la creó.

La pregunta es sobre el orden en que se abren, escriben y cierran pantallas, así que la
herramienta es un modelo TLA+ verificado con TLC, que recorre todos los órdenes dentro de
las cotas.

## Las reglas

| Regla | En una frase | Daño si se rompe |
|---|---|---|
| `LaFormulaMuestraLoCargado` | Mientras la Fórmula esté abierta, sus campos muestran lo último que se cargó, escrito en ella o movido en su gráfica. | Se pierde lo cargado sin que nadie toque «Limpiar campos». |
| `SinPantallasNoQuedaSesion` | Sin ninguna pantalla de la Fórmula abierta, no queda sesión guardada. | La Fórmula abre con valores de la vez anterior y el resultado no corresponde a lo que se ve cargar. |

## Hallazgo abierto

**`dosPantallasDeLaMismaFormula`** rompe `LaFormulaMuestraLoCargado`.

1. Tocás una Fórmula en la lista dos veces seguidas. `router.push` apila siempre: quedan
   dos pantallas de la misma Fórmula, una sobre otra.
2. Escribís un valor en la que se ve.
3. Volvés atrás una vez. La pantalla de arriba se desmonta y su limpieza borra
   `sesiones[formula.id]`.
4. Queda en pantalla la misma Fórmula, con los campos vacíos.

Pasa porque las dos pantallas comparten una sola entrada y cualquiera de las dos la
borra al cerrarse. También se llega con un enlace `appcalculadora://formula/<id>` a una
Fórmula que ya está abierta.

Está repetido sobre las rutas reales en `repeticion.verif.tsx`, prueba
«HALLAZGO dosPantallasDeLaMismaFormula». Esa prueba afirma lo que el código hace hoy; el
día que se arregle va a fallar, y ahí:

1. invertí la afirmación de la prueba (el campo tiene que conservar `'3000'`);
2. poné `DosVecesLaMisma = TRUE` en `SesionFormula.cfg`;
3. borrá `hallazgos/dosPantallasDeLaMismaFormula.cfg`;
4. llevá al modelo cómo quedó la clave de la sesión.

## Cobertura

Commit de sincronización: `d8942313af22e499fd8e351863ee17924a10e577`

| Código | Parte del modelo |
|---|---|
| `src/graficas/sesion.tsx`, `ProveedorSesion.cambiar` | `Escribir`, `MoverDeslizador`; la variable `sesion` es `sesiones[formula.id]` |
| `src/graficas/sesion.tsx`, `ProveedorSesion.olvidar` | `Volver`, cuando la pantalla que se cierra es una Fórmula |
| `src/graficas/sesion.tsx`, `useSesionFormula` (`sesiones[formula.id] ?? local`) | `Mostrado` |
| `src/screens/formula/index.tsx`, `useEffect(() => olvidar, [olvidar])` | `Volver` |
| `src/screens/formula/index.tsx`, `limpiarCampos` | `Limpiar` |
| `src/screens/grafica/index.tsx`, `mover` y el `if (valor === undefined)` | `MoverDeslizador`: sin un valor cargado no hay deslizador |
| `src/app/_layout.tsx`, `<ProveedorSesion>` | una sola sesión por Fórmula para toda la pila |
| `src/graficas/vista-previa.tsx`, el botón `ver-grafica` | `VerGrafica` |
| `router.push` de las listas, y los enlaces | `AbrirFormula`, `AbrirLaMismaFormulaEncima`, `AbrirGraficaPorEnlace` |

`esperado` no está en el código: es lo que quien usa la app cargó por última vez, y
existe para poder escribir la regla 1.

Los archivos cubiertos están en `verificacion/sesion-formula/cubiertos.txt` y los textos
exactos que el modelo representa, en `anclas.txt`.

**¿Tu cambio la toca?** Sí, si toca un archivo de `cubiertos.txt`, si cambia la clave con
la que se guarda la sesión, si otra pantalla empieza a usar `useSesionFormula`, o si
cambia qué pantallas se pueden apilar sobre una Fórmula.

## El comando

```
verificacion/sesion-formula/verificar.sh
```

Tarda unos 20 segundos (TLC son 3; el resto es Jest). Necesita Java 11 o posterior. La
primera vez descarga `tla2tools.jar` 1.7.4 a `~/.cache/tla2tools/1.7.4/` y verifica su
sha256; con `TLA2TOOLS` se le pasa uno ya descargado. `--sin-jest` corre sólo TLC.

Corre, en orden: las anclas; TLC sobre `SesionFormula.cfg` (tiene que pasar), sobre
`hallazgos/*.cfg` (cada uno tiene que seguir rompiendo su regla) y sobre `variantes/*.cfg`
(roturas a propósito); y `repeticion.verif.tsx` sobre las rutas reales.

| Salida | Qué pasó |
|---|---|
| 0 | Todo está como quedó registrado: las reglas valen bajo los supuestos del `.cfg` principal, el hallazgo sigue abierto (`HALLAZGO`), las roturas se detectan. |
| 1 | Una regla se rompe donde no debía (`ROTA`), una rotura no se detecta (`NO FALLA`) o la repetición falla. |
| 2 | Una ancla se rompió o TLC no pudo correr: el modelo ya no describe el código. |
| 3 | Un hallazgo registrado ya no ocurre (`CERRADO`): seguí los cuatro pasos de arriba. |

**Salida 0 no significa «sin errores».** Significa que no hay errores nuevos. El
`.cfg` principal supone `DosVecesLaMisma = FALSE`; el hallazgo abierto es justamente lo
que pasa cuando ese supuesto no vale.

## Cómo leer un resultado

Pedí la traza con `verificar.sh --traza NOMBRE` (`SesionFormula`, o el nombre de un
`.cfg` de `hallazgos/` o `variantes/`) y leela con la skill **`/statechart`**: muestra el
camino más corto a la regla rota en palabras y, cuando todo pasa, dibuja cómo se mueve el
sistema. No copies acá sus comandos ni sus rutas, cambian entre versiones. El recorrido
Fórmula → gráfica → volver ya está dibujado en `verificacion/statecharts/`.

Una regla rota es **un error real** si cada paso de la traza es un toque posible: buscá
la acción en la tabla de cobertura y abrí el código. Es **un error del modelo** si algún
paso no puede ocurrir. Ya pasó una vez: una versión anterior dejaba mover un deslizador en
una gráfica sin valores, y de ahí salía un «hallazgo» que la pantalla real no permite
(sin valor cargado no hay deslizador). Por eso, antes de dar por real un error, repetilo
en `repeticion.verif.tsx`, un paso por acción. Si ahí no ocurre, el modelo está mal.

## Cuando el cambio es intencional

1. Llevá el cambio a `SesionFormula.tla`: la acción que corresponda.
2. Actualizá `anclas.txt`, y `cubiertos.txt` si cambió qué archivos intervienen.
3. Si agregaste un comportamiento, agregale una variante que lo rompa en `variantes/`.
4. Corré el comando. Recién cuando salga 0 y hayas confirmado que el modelo describe el
   código en el commit nuevo, adelantá el «Commit de sincronización» de esta skill.

## Lo que no cubre

- **Qué números se cargan.** `Valores` son dos valores abstractos. Que el deslizador
  escriba un valor dentro del marco lo cubre `verificar-grafica-interactiva`.
- **Dos Fórmulas distintas.** El modelo sigue una; las sesiones de Fórmulas distintas no
  se tocan porque la clave es el id.
- **La pantalla de Fórmula sin proveedor** (`setLocal`), que sólo usan las pruebas.
- **Más de tres pantallas apiladas** (`MaxPila = 3`).
- **El modo estricto de React**, que monta y desmonta cada efecto dos veces en desarrollo.
