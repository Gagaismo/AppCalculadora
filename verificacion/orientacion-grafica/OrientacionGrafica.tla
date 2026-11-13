-------------------------- MODULE OrientacionGrafica --------------------------
(***************************************************************************)
(* Orientación de la pantalla de gráfica (Android).                         *)
(*                                                                          *)
(* Promesa: fuera de la pantalla de la gráfica la app termina en vertical,  *)
(* y en la gráfica termina en horizontal.                                   *)
(*                                                                          *)
(* Cada acción es un paso indivisible del código; la cita está al lado.     *)
(* Versiones leídas: expo-screen-orientation 58.0.4, expo-modules-core      *)
(* 58.1.0, expo-router 58.0.31, react-native 0.88.1 (rutas relativas a      *)
(* node_modules/).                                                          *)
(*                                                                          *)
(* Qué orden garantiza cada capa, y dónde está leído:                       *)
(*  - JS: `lockAsync` llama a la función nativa en su parte síncrona, antes *)
(*    del primer `await` (expo-screen-orientation/src/ScreenOrientation.ts  *)
(*    :46-62). Como `orientacion.ts` no espera la promesa, cada efecto      *)
(*    encola su pedido en el mismo paso en que corre.                       *)
(*  - Android: toda AsyncFunction corre en un único HandlerThread           *)
(*    (expo-modules-core/android/.../kotlin/AppContext.kt:70-91 y           *)
(*    functions/AsyncFunctionComponent.kt:61-65). Los pedidos se aplican de *)
(*    a uno y en el orden en que JS los hizo: la cola es FIFO.              *)
(*  - Aplicar un pedido es una asignación:                                  *)
(*    `currentActivity.requestedOrientation = ...`                          *)
(*    (expo-screen-orientation/android/.../ScreenOrientationModule.kt:38).  *)
(*    Sin actividad, `currentActivity` lanza MissingActivity (:20-22), la   *)
(*    promesa se rechaza y src/graficas/orientacion.ts la descarta con      *)
(*    `.catch(() => {})`: el pedido se pierde sin aviso.                    *)
(*  - Foco: al apilar una segunda gráfica sobre la primera, la primera      *)
(*    pierde el foco (su limpieza pide vertical) ANTES de que la segunda    *)
(*    pida horizontal. Al volver, la que se desmonta pide vertical antes de *)
(*    que la de abajo recupere el foco y pida horizontal. Está repetido     *)
(*    sobre el código real en repeticion.verif.tsx; el modelo no lo deduce. *)
(***************************************************************************)
EXTENDS Naturals, Sequences

CONSTANTS
    MaxCola,      \* cota: pedidos nativos todavía sin aplicar a la vez
    MaxGraficas,  \* cota: pantallas de gráfica apiladas (2 = doble toque en «Ver gráfica»)
    Variante      \* "codigo" = el código tal como está; el resto son roturas a propósito

Variantes == {"codigo", "sinLimpieza", "sinTrabaAlEnfocar", "colaDesordenada",
              "focoAntesQueLimpieza", "manifiestoSinVertical",
              "destruyeConPedidosPendientes"}
ASSUME Variante \in Variantes /\ MaxCola \in Nat \ {0} /\ MaxGraficas \in Nat \ {0}

VARIABLES
    graficas,   \* cuántas pantallas de gráfica hay apiladas; 0 = la app está en otra pantalla
    arbol,      \* "montado" o "desmontado" (el árbol de React de la actividad destruida)
    cola,       \* pedidos de lockAsync hechos por JS y todavía no aplicados
    nativa,     \* requestedOrientation de la actividad: "vertical", "horizontal" o "libre"
    actividad,  \* "viva" o "destruida" (currentActivity nulo)
    frente      \* TRUE si la app está en primer plano

vars == <<graficas, arbol, cola, nativa, actividad, frente>>

\* app.json: "orientation": "portrait" escribe android:screenOrientation="portrait"
\* en el manifiesto. Toda actividad nueva nace así.
OrientacionDelManifiesto ==
    IF Variante = "manifiestoSinVertical" THEN "libre" ELSE "vertical"

Init ==
    /\ graficas = 0
    /\ arbol = "montado"
    /\ cola = <<>>
    /\ nativa = OrientacionDelManifiesto
    /\ actividad = "viva"
    /\ frente = TRUE

\* El efecto de foco: src/graficas/orientacion.ts, lockAsync(OrientationLock.LANDSCAPE).
PedidoAlEnfocar == IF Variante = "sinTrabaAlEnfocar" THEN <<>> ELSE <<"horizontal">>
\* Su limpieza: lockAsync(OrientationLock.PORTRAIT_UP). Corre al perder el foco y al desmontar.
PedidoAlSalir == IF Variante = "sinLimpieza" THEN <<>> ELSE <<"vertical">>

\* Cambiar el foco de una gráfica a otra: primero la limpieza de la que lo pierde.
CambioDeFoco ==
    IF Variante = "focoAntesQueLimpieza"
        THEN PedidoAlEnfocar \o PedidoAlSalir
        ELSE PedidoAlSalir \o PedidoAlEnfocar

PuedeTocar == frente /\ actividad = "viva" /\ arbol = "montado"

\* «Ver gráfica» (src/graficas/vista-previa.tsx, router.push): la pantalla
\* src/screens/grafica/index.tsx toma el foco y useOrientacionHorizontal pide horizontal.
AbrirGrafica ==
    /\ PuedeTocar /\ graficas = 0
    /\ Len(cola) + 1 <= MaxCola
    /\ graficas' = 1
    /\ cola' = cola \o PedidoAlEnfocar
    /\ UNCHANGED <<arbol, nativa, actividad, frente>>

\* Segundo toque en «Ver gráfica» antes de que la primera gráfica tape el botón:
\* router.push apila otra. La de abajo pierde el foco y la nueva lo toma.
AbrirOtraGraficaEncima ==
    /\ PuedeTocar /\ graficas >= 1 /\ graficas < MaxGraficas
    /\ Len(cola) + 2 <= MaxCola
    /\ graficas' = graficas + 1
    /\ cola' = cola \o CambioDeFoco
    /\ UNCHANGED <<arbol, nativa, actividad, frente>>

\* Salir con «←» (src/screens/grafica/index.tsx, router.back()) o con el botón atrás.
\* La gráfica de arriba se desmonta y su limpieza pide vertical; si debajo hay otra
\* gráfica, recupera el foco y pide horizontal.
SalirGrafica ==
    /\ PuedeTocar /\ graficas >= 1
    /\ Len(cola) + 2 <= MaxCola
    /\ graficas' = graficas - 1
    /\ cola' = IF graficas = 1 THEN cola \o PedidoAlSalir ELSE cola \o CambioDeFoco
    /\ UNCHANGED <<arbol, nativa, actividad, frente>>

\* El hilo nativo aplica el pedido más viejo. Con actividad viva lo escribe; sin
\* actividad lo rechaza y nadie se entera (el .catch vacío).
AplicarPedido(i) ==
    /\ nativa' = IF actividad = "viva" THEN cola[i] ELSE nativa
    /\ cola' = [j \in 1..(Len(cola) - 1) |-> IF j < i THEN cola[j] ELSE cola[j + 1]]
    /\ UNCHANGED <<graficas, arbol, actividad, frente>>

ElSistemaAplicaUnPedido ==
    /\ cola # <<>>
    /\ IF Variante = "colaDesordenada"
          THEN \E i \in 1..Len(cola) : AplicarPedido(i)
          ELSE AplicarPedido(1)

IrAlFondo ==
    /\ frente /\ actividad = "viva"
    /\ frente' = FALSE
    /\ UNCHANGED <<graficas, arbol, cola, nativa, actividad>>

\* Volver sin que el sistema haya destruido la actividad: nadie toca la orientación
\* (ScreenOrientationModule.kt:84-90, onHostResume sólo recuerda la inicial).
VolverAlFrente ==
    /\ ~frente /\ actividad = "viva"
    /\ frente' = TRUE
    /\ UNCHANGED <<graficas, arbol, cola, nativa, actividad>>

\* Android destruye la actividad en segundo plano. ReactDelegate.onHostDestroy
\* (react-native/ReactAndroid/.../ReactDelegate.kt:161-172) detiene la superficie
\* (unloadApp, :343-345) y currentActivity queda en null.
\* SUPUESTO: para entonces el hilo nativo ya aplicó lo pendiente (milisegundos contra un
\* ciclo pause -> stop -> destroy). La variante "destruyeConPedidosPendientes" lo quita.
ElSistemaDestruyeLaActividad ==
    /\ ~frente /\ actividad = "viva"
    /\ Variante = "destruyeConPedidosPendientes" \/ cola = <<>>
    /\ actividad' = "destruida"
    /\ UNCHANGED <<graficas, arbol, cola, nativa, frente>>

\* El árbol de la superficie detenida se desmonta. No está leído si la limpieza del
\* efecto llega a correr, así que el modelo admite las dos cosas: con limpieza (pide
\* vertical, y sin actividad el pedido se rechaza en silencio) o sin ella.
ElArbolSeDesmonta ==
    /\ actividad = "destruida" /\ arbol = "montado"
    /\ arbol' = "desmontado"
    /\ graficas' = 0
    /\ \/ cola' = cola
       \/ graficas >= 1 /\ Len(cola) + 1 <= MaxCola /\ cola' = cola \o PedidoAlSalir
    /\ UNCHANGED <<nativa, actividad, frente>>

\* Quien usa la app vuelve y Android crea una actividad nueva: nace con la orientación
\* del manifiesto y ReactDelegate.loadApp (:322-327) arranca una superficie nueva, que
\* monta la app desde la ruta inicial, fuera de la gráfica.
VolverYRecrear ==
    /\ ~frente /\ actividad = "destruida" /\ arbol = "desmontado"
    /\ actividad' = "viva"
    /\ nativa' = OrientacionDelManifiesto
    /\ arbol' = "montado"
    /\ frente' = TRUE
    /\ UNCHANGED <<graficas, cola>>

Next ==
    \/ AbrirGrafica
    \/ AbrirOtraGraficaEncima
    \/ SalirGrafica
    \/ ElSistemaAplicaUnPedido
    \/ IrAlFondo
    \/ VolverAlFrente
    \/ ElSistemaDestruyeLaActividad
    \/ ElArbolSeDesmonta
    \/ VolverYRecrear

Spec == Init /\ [][Next]_vars

-----------------------------------------------------------------------------
TypeOK ==
    /\ graficas \in 0..MaxGraficas
    /\ arbol \in {"montado", "desmontado"}
    /\ cola \in Seq({"horizontal", "vertical"})
    /\ nativa \in {"vertical", "horizontal", "libre"}
    /\ actividad \in {"viva", "destruida"}
    /\ frente \in BOOLEAN

\* «En reposo»: hay actividad, el árbol está montado y no queda ningún pedido por aplicar.
EnReposo == actividad = "viva" /\ arbol = "montado" /\ cola = <<>>

\* Regla 1: fuera de la gráfica, en reposo, la app está en vertical.
FueraDeLaGraficaVertical == (EnReposo /\ graficas = 0) => nativa = "vertical"

\* Regla 2: en la gráfica, en reposo, la app está en horizontal.
EnLaGraficaHorizontal == (EnReposo /\ graficas >= 1) => nativa = "horizontal"
=============================================================================
