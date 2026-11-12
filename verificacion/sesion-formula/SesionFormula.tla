----------------------------- MODULE SesionFormula -----------------------------
(***************************************************************************)
(* La sesión de una Fórmula: lo que se cargó en sus campos, compartido      *)
(* entre la pantalla de la Fórmula y la de su gráfica.                      *)
(*                                                                          *)
(* Promesas (comentarios de src/graficas/sesion.tsx y de                    *)
(* src/screens/formula/index.tsx):                                          *)
(*  - al volver de la gráfica, los campos muestran el valor nuevo;          *)
(*  - al cerrar la pantalla la sesión se olvida: la próxima vez la Fórmula  *)
(*    abre vacía.                                                           *)
(*                                                                          *)
(* El modelo sigue UNA Fórmula. `ProveedorSesion` guarda las sesiones en un *)
(* registro cuya clave es `formula.id` (sesion.tsx, `[formula.id]: ...`),   *)
(* así que dos Fórmulas distintas no se tocan y todas las pantallas de la   *)
(* misma Fórmula leen y escriben la misma entrada.                          *)
(*                                                                          *)
(* Cada acción es un paso indivisible: una actualización de estado de React *)
(* (`setSesiones`) o la limpieza de un efecto al desmontarse una pantalla.  *)
(***************************************************************************)
EXTENDS Naturals, Sequences

CONSTANTS
    Valores,            \* lo que se puede cargar, p. ej. {"a", "b"}
    MaxPila,            \* cota: pantallas apiladas sobre las pestañas
    DosVecesLaMisma,    \* TRUE: la misma Fórmula puede apilarse dos veces (doble toque en la lista, enlace)
    GraficaPorEnlace,   \* TRUE: la gráfica puede abrirse sin su Fórmula debajo (appcalculadora://formula/<id>/grafica)
    Variante            \* "codigo", o una rotura a propósito

Variantes == {"codigo", "sinOlvidar", "graficaConEstadoPropio"}
ASSUME Variante \in Variantes /\ MaxPila \in Nat \ {0}
ASSUME DosVecesLaMisma \in BOOLEAN /\ GraficaPorEnlace \in BOOLEAN

NADA == "nada"      \* no hay entrada para esta Fórmula en `sesiones`
VACIO == "vacio"    \* hay entrada, con todos los campos vacíos (sesionInicial)

VARIABLES
    pila,      \* las pantallas de esta Fórmula apiladas, de abajo hacia arriba: "F" o "G"
    sesion,    \* sesiones[formula.id]: NADA, VACIO o un valor
    esperado   \* (no está en el código) lo último que cargó quien usa la app desde que abrió la Fórmula

vars == <<pila, sesion, esperado>>

Init == pila = <<>> /\ sesion = NADA /\ esperado = VACIO

Arriba == pila[Len(pila)]
HayFormula(p) == \E i \in 1..Len(p) : p[i] = "F"

\* Lo que dibuja una pantalla de la Fórmula: `contexto.sesiones[formula.id] ?? local`
\* (useSesionFormula). Con proveedor, `local` no cambia nunca: es la sesión inicial.
Mostrado == IF sesion = NADA THEN VACIO ELSE sesion

\* Tocar una Fórmula en una lista (router.push en src/screens/unidad/index.tsx,
\* src/screens/busqueda/index.tsx): se apila su pantalla. No escribe la sesión.
AbrirFormula ==
    /\ pila = <<>>
    /\ pila' = <<"F">>
    /\ UNCHANGED <<sesion, esperado>>

\* El segundo toque de un doble toque llega con la primera pantalla ya apilada, y
\* router.push apila otra igual. Un enlace a la misma Fórmula hace lo mismo.
AbrirLaMismaFormulaEncima ==
    /\ DosVecesLaMisma
    /\ pila # <<>> /\ Arriba = "F" /\ Len(pila) < MaxPila
    /\ pila' = Append(pila, "F")
    /\ UNCHANGED <<sesion, esperado>>

\* «Ver gráfica» (src/graficas/vista-previa.tsx, router.push).
VerGrafica ==
    /\ pila # <<>> /\ Arriba = "F" /\ Len(pila) < MaxPila
    /\ pila' = Append(pila, "G")
    /\ UNCHANGED <<sesion, esperado>>

AbrirGraficaPorEnlace ==
    /\ GraficaPorEnlace
    /\ pila = <<>>
    /\ pila' = <<"G">>
    /\ UNCHANGED <<sesion, esperado>>

\* Escribir en un campo (escribir -> setTextos -> contexto.cambiar).
Escribir(v) ==
    /\ pila # <<>> /\ Arriba = "F"
    /\ sesion' = v
    /\ esperado' = v
    /\ UNCHANGED pila

\* «Limpiar campos» (limpiarCampos): deja la entrada, con los campos vacíos.
Limpiar ==
    /\ pila # <<>> /\ Arriba = "F"
    /\ sesion' = VACIO
    /\ esperado' = VACIO
    /\ UNCHANGED pila

\* Mover un deslizador en la gráfica (mover -> setTextos -> contexto.cambiar).
\* La gráfica sólo dibuja el deslizador de una Variable que ya tiene valor
\* (`if (valor === undefined)` muestra «sin cargar»): sin nada cargado no hay qué mover.
\* Sólo cuenta como «cargado en la Fórmula» si la Fórmula está abierta debajo.
MoverDeslizador(v) ==
    /\ pila # <<>> /\ Arriba = "G"
    /\ sesion \in Valores
    /\ sesion' = IF Variante = "graficaConEstadoPropio" THEN sesion ELSE v
    /\ esperado' = IF HayFormula(pila) THEN v ELSE esperado
    /\ UNCHANGED pila

\* Volver: la pantalla de arriba se desmonta. Si es una Fórmula, la limpieza de
\* `useEffect(() => olvidar, [olvidar])` borra sesiones[formula.id]. La gráfica no borra nada.
Volver ==
    /\ pila # <<>>
    /\ LET resto == SubSeq(pila, 1, Len(pila) - 1) IN
        /\ pila' = resto
        /\ sesion' = IF Arriba = "F" /\ Variante # "sinOlvidar" THEN NADA ELSE sesion
        /\ esperado' = IF HayFormula(resto) THEN esperado ELSE VACIO

Next ==
    \/ AbrirFormula
    \/ AbrirLaMismaFormulaEncima
    \/ VerGrafica
    \/ AbrirGraficaPorEnlace
    \/ \E v \in Valores : Escribir(v)
    \/ Limpiar
    \/ \E v \in Valores : MoverDeslizador(v)
    \/ Volver

Spec == Init /\ [][Next]_vars

-----------------------------------------------------------------------------
TypeOK ==
    /\ pila \in Seq({"F", "G"}) /\ Len(pila) <= MaxPila
    /\ sesion \in Valores \cup {NADA, VACIO}
    /\ esperado \in Valores \cup {VACIO}

\* Regla 1: mientras la Fórmula esté abierta, sus campos muestran lo último que se cargó
\* (escrito en ella o movido en su gráfica). Recién abierta, muestra los campos vacíos.
LaFormulaMuestraLoCargado == HayFormula(pila) => Mostrado = esperado

\* Regla 2: sin ninguna pantalla de la Fórmula abierta, no queda sesión guardada
\* (es lo que hace que la próxima vez abra vacía).
SinPantallasNoQuedaSesion == pila = <<>> => sesion = NADA
=============================================================================
