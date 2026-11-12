---
name: verificar-orientacion-grafica
description: Verifica con un modelo TLA+ que la app termine en vertical fuera de la pantalla de gráfica y en horizontal dentro de ella, en cualquier orden de toques, giros pendientes y pasos por segundo plano. Usala antes de commitear cualquier cambio a src/graficas/orientacion.ts, al uso de useOrientacionHorizontal o del botón «←» en src/screens/grafica/index.tsx, al botón «Ver gráfica» de src/graficas/vista-previa.tsx, a "orientation" en app.json, a la versión de expo-screen-orientation, expo-modules-core, expo-router o react-native, y cuando alguien reporte que la app quedó acostada o que la gráfica abrió parada.
---

# Verificar la orientación de la pantalla de gráfica

`useOrientacionHorizontal` (`src/graficas/orientacion.ts`) pide horizontal cuando la
pantalla de gráfica toma el foco y pide vertical en la limpieza. Los dos pedidos son
`lockAsync(...)` **sin `await`** y con `.catch(() => {})`: nadie espera a que el
teléfono gire y un pedido que falla no deja rastro. La pregunta que un test no contesta
es si, con pedidos encolados, toques durante el giro y la actividad destruida en segundo
plano, hay **algún** orden que deje la app acostada fuera de la gráfica.

La herramienta es un modelo TLA+ verificado con TLC, porque la pregunta es sobre el
orden de los eventos y no sobre un cálculo. TLC recorre todos los órdenes posibles
dentro de las cotas.

## Las reglas

| Regla | En una frase | Daño si se rompe |
|---|---|---|
| `FueraDeLaGraficaVertical` | En reposo y fuera de la gráfica, la app está en vertical. | Toda la app queda acostada: listas, Fórmulas y herramientas de bits no están diseñadas para horizontal. |
| `EnLaGraficaHorizontal` | En reposo y en la gráfica, la app está en horizontal. | La gráfica a pantalla completa se ve parada, con el lienzo angosto. |

«En reposo» es: hay actividad, el árbol de React está montado y no queda ningún pedido
de orientación sin aplicar.

## Qué orden garantiza cada capa

Está leído en `node_modules/` y citado en la cabecera de `OrientacionGrafica.tla`:

- **JS**: `lockAsync` llama a la función nativa antes de su primer `await`
  (`expo-screen-orientation/src/ScreenOrientation.ts:47-63`). Cada efecto encola su
  pedido en el momento en que corre.
- **Android**: toda `AsyncFunction` corre en un único `HandlerThread`
  (`expo-modules-core/android/.../kotlin/AppContext.kt:71-92`). Los pedidos se aplican de
  a uno y en el orden en que JS los hizo. **El módulo nativo no desordena.**
- **iOS**: la cola por defecto también es serie
  (`expo-modules-core/ios/Core/Functions/AsyncFunctionDefinition.swift:20`). El modelo es
  de Android; iOS no está modelado.
- **Foco**: cuando el foco pasa de una gráfica a otra, la limpieza de la que lo pierde
  corre **antes** que el efecto de la que lo toma. Esto no sale de leer: lo afirma
  `repeticion.verif.tsx` sobre las rutas reales.
- **Sin actividad** (`currentActivity` nulo), `lockAsync` rechaza con `MissingActivity`
  y el `.catch` vacío lo descarta. Es el único caso en que el vertical de salida falla,
  y no hace daño porque la actividad nueva nace vertical por `"orientation": "portrait"`
  de `app.json`.

## Cobertura

Commit de sincronización: `d8942313af22e499fd8e351863ee17924a10e577`

| Código | Parte del modelo |
|---|---|
| `src/graficas/orientacion.ts`, el efecto de `useFocusEffect` | `PedidoAlEnfocar`, `PedidoAlSalir`, `CambioDeFoco` |
| `src/screens/grafica/index.tsx`, `useOrientacionHorizontal()` y el botón `salir-grafica` | `AbrirGrafica`, `SalirGrafica` |
| `src/graficas/vista-previa.tsx`, el botón `ver-grafica` (`router.push`) | `AbrirGrafica`, `AbrirOtraGraficaEncima` (doble toque) |
| `src/app/formula/[id]/grafica.tsx` | la ruta de la gráfica |
| `app.json`, `"orientation": "portrait"` | `OrientacionDelManifiesto` |
| el hilo nativo de `expo-modules-core` | `ElSistemaAplicaUnPedido` (cola FIFO) |
| Android en segundo plano | `IrAlFondo`, `VolverAlFrente`, `ElSistemaDestruyeLaActividad`, `ElArbolSeDesmonta`, `VolverYRecrear` |

Los archivos cubiertos están en `verificacion/orientacion-grafica/cubiertos.txt` y los
textos exactos que el modelo representa, en `anclas.txt`.

**¿Tu cambio la toca?** Sí, si toca un archivo de `cubiertos.txt`, si agrega otro
`lockAsync`/`unlockAsync` en `src/`, si otra pantalla empieza a usar
`useOrientacionHorizontal`, o si cambia la versión de alguno de los cuatro paquetes
citados. El comando avisa de las cuatro cosas.

## El comando

```
verificacion/orientacion-grafica/verificar.sh
```

Tarda unos 25 segundos (TLC son 5; el resto es Jest). Necesita Java 11 o posterior. La
primera vez descarga `tla2tools.jar` 1.7.4 a `~/.cache/tla2tools/1.7.4/` y verifica su
sha256; con `TLA2TOOLS` se le pasa uno ya descargado. `--sin-jest` corre sólo TLC.

Hace tres cosas, en orden:

1. Comprueba que el modelo siga describiendo el código: cada ancla de `anclas.txt` tiene
   que seguir en su archivo, nadie más puede pedir orientación, y avisa si cambió un
   archivo cubierto o la versión de un paquete citado.
2. Corre TLC sobre `OrientacionGrafica.cfg` (el código tal como está, tiene que pasar) y
   sobre cada `.cfg` de `variantes/` (roturas a propósito, cada una tiene que romper la
   regla que anota en su línea `\* ROMPE:`).
3. Corre `repeticion.verif.tsx`: los recorridos del modelo sobre las rutas reales, con
   `lockAsync` reemplazado por un doble que anota el orden de los pedidos.

| Salida | Qué pasó |
|---|---|
| 0 | Las dos reglas valen y las seis roturas se detectan. |
| 1 | Una regla se rompe (`ROTA`), una rotura no se detecta (`NO FALLA`) o la repetición falla. |
| 2 | Una ancla se rompió o TLC no pudo correr: el modelo ya no describe el código. |

## Cómo leer un resultado

Cuando salga `ROTA`, pedí la traza con `verificar.sh --traza OrientacionGrafica` y leela
con la skill **`/statechart`**: muestra el camino más corto a la regla rota en palabras
y, cuando todo pasa, dibuja cómo se mueve el sistema. No copies acá sus comandos ni sus
rutas, cambian entre versiones.

Una regla rota es **un error real** si cada paso de la traza es algo que el código hace:
buscá la acción en la tabla de cobertura y abrí el código. Es **un error del modelo** si
algún paso no puede ocurrir. Tres supuestos que conviene mirar primero:

- `ElSistemaDestruyeLaActividad` exige la cola vacía: el hilo nativo aplica lo pendiente
  en milisegundos y Android tarda mucho más en destruir una actividad. La variante
  `destruyeConPedidosPendientes` muestra qué pasa sin ese supuesto.
- `ElArbolSeDesmonta` admite que la limpieza del efecto corra o no corra. No está leído
  cuál de las dos pasa en React Native 0.86; la regla vale con las dos.
- Los toques durante un giro pendiente sí están modelados (`MaxCola = 4`).

Antes de dar por real un error, repetilo en `repeticion.verif.tsx` como un recorrido
más, un paso por acción. Si ahí no ocurre, el modelo está mal.

## Cuando el cambio es intencional

1. Llevá el cambio al modelo: la acción que corresponda en `OrientacionGrafica.tla`, y su
   cita.
2. Actualizá `anclas.txt` con el texto nuevo, y `cubiertos.txt` si cambió qué archivos
   intervienen.
3. Si agregaste un comportamiento, agregale una variante que lo rompa en `variantes/`:
   una regla que nunca se vio fallar no prueba nada.
4. Si cambió el orden de los pedidos, cambiá primero `repeticion.verif.tsx` (es lo que
   dice qué hace el código) y después `CambioDeFoco`.
5. Corré el comando. Recién cuando salga 0 y hayas confirmado que el modelo describe el
   código en el commit nuevo, adelantá el «Commit de sincronización» de esta skill.

## Lo que no cubre

- **Que el teléfono gire.** El modelo llega hasta `requestedOrientation`; que Android
  rote la pantalla al cambiarlo se prueba en el dispositivo.
- **iOS.** Ahí el pedido pasa por `requestGeometryUpdate`, que puede negarse. No está
  modelado; el objetivo primario del proyecto es Android.
- **Expo Go.** En Expo Go la actividad es la de Expo Go y no la de este manifiesto.
- **Web.** `lockAsync` puede rechazar fuera de pantalla completa; la gráfica se usa
  igual en vertical.
- **Más de dos gráficas apiladas** (`MaxGraficas = 2`) y más de cuatro pedidos
  pendientes (`MaxCola = 4`).
- Las versiones de paquetes distintas de las citadas: hay que releer las citas.
