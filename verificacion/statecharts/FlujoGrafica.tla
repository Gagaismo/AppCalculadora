----------------------------- MODULE FlujoGrafica -----------------------------
(***************************************************************************)
(* El recorrido Fórmula -> «Ver gráfica» -> deslizadores -> volver, para    *)
(* dibujarlo con /statechart.                                               *)
(*                                                                          *)
(* Es la composición, con una sola pantalla de cada clase, de los dos       *)
(* modelos que se verifican por separado:                                   *)
(*   verificacion/sesion-formula/SesionFormula.tla       (los campos)       *)
(*   verificacion/orientacion-grafica/OrientacionGrafica.tla (la orientación)*)
(* Lo que esos modelos cubren de más (dos pantallas iguales, doble toque,   *)
(* segundo plano) acá no está: este módulo es para leer el recorrido.       *)
(***************************************************************************)
EXTENDS Naturals, Sequences

VARIABLES
    pantalla,     \* "lista", "formula" o "grafica"
    campos,       \* "vacios", "escritos" (a mano) o "movidos" (por un deslizador)
    cola,         \* pedidos de orientación hechos y todavía no aplicados
    orientacion   \* "vertical" u "horizontal"

vars == <<pantalla, campos, cola, orientacion>>

Init == pantalla = "lista" /\ campos = "vacios" /\ cola = <<>> /\ orientacion = "vertical"

\* Los toques sólo llegan con la pantalla quieta: el modelo completo
\* (OrientacionGrafica.tla) es el que cubre los toques durante el giro.
Quieta == cola = <<>>

AbrirLaFormula ==
    /\ Quieta /\ pantalla = "lista"
    /\ pantalla' = "formula"
    /\ UNCHANGED <<campos, cola, orientacion>>

Escribir ==
    /\ Quieta /\ pantalla = "formula"
    /\ campos' = "escritos"
    /\ UNCHANGED <<pantalla, cola, orientacion>>

LimpiarCampos ==
    /\ Quieta /\ pantalla = "formula" /\ campos # "vacios"
    /\ campos' = "vacios"
    /\ UNCHANGED <<pantalla, cola, orientacion>>

VerGrafica ==
    /\ Quieta /\ pantalla = "formula"
    /\ pantalla' = "grafica"
    /\ cola' = Append(cola, "horizontal")
    /\ UNCHANGED <<campos, orientacion>>

\* Sin valores cargados la gráfica no dibuja deslizadores.
MoverUnDeslizador ==
    /\ Quieta /\ pantalla = "grafica" /\ campos # "vacios"
    /\ campos' = "movidos"
    /\ UNCHANGED <<pantalla, cola, orientacion>>

SalirDeLaGrafica ==
    /\ Quieta /\ pantalla = "grafica"
    /\ pantalla' = "formula"
    /\ cola' = Append(cola, "vertical")
    /\ UNCHANGED <<campos, orientacion>>

\* Al cerrarse, la Fórmula olvida su sesión.
VolverALaLista ==
    /\ Quieta /\ pantalla = "formula"
    /\ pantalla' = "lista"
    /\ campos' = "vacios"
    /\ UNCHANGED <<cola, orientacion>>

ElTelefonoGira ==
    /\ cola # <<>>
    /\ orientacion' = Head(cola)
    /\ cola' = Tail(cola)
    /\ UNCHANGED <<pantalla, campos>>

Next ==
    \/ AbrirLaFormula \/ Escribir \/ LimpiarCampos \/ VerGrafica
    \/ MoverUnDeslizador \/ SalirDeLaGrafica \/ VolverALaLista \/ ElTelefonoGira

Spec == Init /\ [][Next]_vars

FueraDeLaGraficaVertical == (cola = <<>> /\ pantalla # "grafica") => orientacion = "vertical"
EnLaGraficaHorizontal == (cola = <<>> /\ pantalla = "grafica") => orientacion = "horizontal"
EnLaListaNoQuedaNadaCargado == pantalla = "lista" => campos = "vacios"
=============================================================================
