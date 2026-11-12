------------------------------- MODULE Hamming -------------------------------
(***************************************************************************)
(* El recorrido «paso a paso» de la pantalla de Hamming                     *)
(* (src/screens/bits/hamming.tsx, con la navegación de pasos.tsx) y la      *)
(* corrección del receptor.                                                 *)
(*                                                                          *)
(* Del emisor el modelo sólo guarda p, la cantidad de bits de paridad, que  *)
(* es lo que decide cuántos pasos hay.                                      *)
(*                                                                          *)
(* Del receptor guarda el largo de la palabra y `cambiados`: las posiciones *)
(* que llegaron distintas de como se emitieron. `cambiados` NO está en el   *)
(* código: la pantalla sólo ve la palabra recibida. Es lo que permite       *)
(* preguntar si lo que la pantalla ofrece corregir es lo que de verdad      *)
(* llegó mal. SUPUESTO: lo emitido era una palabra de Hamming válida de ese *)
(* largo, con paridad par. Entonces el síndrome que calcula                 *)
(* decodificarHamming (src/bits/hamming.ts) es el XOR de las posiciones     *)
(* cambiadas, sin importar qué palabra era: el código es lineal.            *)
(*                                                                          *)
(* Cada acción es un manejador de un toque; sus `set…` se aplican juntos.   *)
(***************************************************************************)
EXTENDS Naturals, FiniteSets

CONSTANTS
    Largos,       \* largos válidos de la palabra recibida que explora el modelo, p. ej. {3, 6}
    MaxP,         \* el p más grande del emisor (la pantalla admite hasta 11 datos: p = 4)
    MaxErrores,   \* cota: cuántos bits pueden llegar cambiados
    Variante      \* "codigo", o una rotura a propósito

Variantes == {"codigo", "modoNoReinicia", "editaEnCualquierPaso", "irNoDescorrige",
              "corrigeAunqueSeSalga"}
ASSUME Variante \in Variantes /\ MaxErrores \in Nat /\ MaxP \in Nat
ASSUME Largos \subseteq 3..15   \* decodificarHamming exige al menos 3 bits; la pantalla corta en 15

INVALIDA == 0    \* la entrada no es válida: codificarHamming / decodificarHamming lanzan

VARIABLES
    modo,       \* "emisor" o "receptor"
    paso,       \* el paso en pantalla, desde 0
    aviso,      \* TRUE si se muestra el mensaje de error de la entrada
    corregido,  \* TRUE después de tocar «Corregir el bit»
    pEmisor,    \* p de los datos cargados, o INVALIDA
    largo,      \* largo de la palabra recibida, o INVALIDA
    cambiados   \* posiciones que llegaron cambiadas (no está en el código)

vars == <<modo, paso, aviso, corregido, pEmisor, largo, cambiados>>

\* `const p = Math.floor(Math.log2(total)) + 1;` para largos de 3 a 15.
PDe(n) == IF n < 4 THEN 2 ELSE IF n < 8 THEN 3 ELSE 4
PReceptor == PDe(largo)

HayError == IF modo = "emisor" THEN pEmisor = INVALIDA ELSE largo = INVALIDA

\* `const total = emisor ? p + 4 : receptor ? p + 2 : 2;`
Total == IF HayError THEN 2 ELSE IF modo = "emisor" THEN pEmisor + 4 ELSE PReceptor + 2
Final == paso = Total - 1

\* El síndrome como número: el bit i vale 1 si el grupo p(i+1) tiene una cantidad impar de
\* posiciones cambiadas (`cumple = unos % 2 === 0`, y la palabra emitida cumplía).
Bit(n, i) == (n \div (2 ^ i)) % 2
GrupoFalla(i) == Cardinality({pos \in cambiados : Bit(pos, i) = 1}) % 2 = 1
Posicion ==
    (IF GrupoFalla(0) THEN 1 ELSE 0) + (IF GrupoFalla(1) THEN 2 ELSE 0) +
    (IF GrupoFalla(2) THEN 4 ELSE 0) + (IF GrupoFalla(3) THEN 8 ELSE 0)

EnElResultadoDelReceptor == modo = "receptor" /\ ~HayError /\ paso > 0 /\ Final

\* Lo que dibuja PasoReceptor en el último paso.
DiceSinError == EnElResultadoDelReceptor /\ Posicion = 0
\* `corregida === null`: el síndrome señala una posición que la palabra no tiene.
DiceQueNoSePuedeCorregir ==
    /\ EnElResultadoDelReceptor /\ Posicion > largo
    /\ Variante # "corrigeAunqueSeSalga"
SenialaUnaPosicion ==
    /\ EnElResultadoDelReceptor /\ Posicion > 0
    /\ Posicion <= largo \/ Variante = "corrigeAunqueSeSalga"
\* El botón «Corregir el bit».
CorregirVisible == SenialaUnaPosicion /\ ~corregido

Init ==
    /\ modo = "emisor" /\ paso = 0 /\ aviso = FALSE /\ corregido = FALSE
    /\ pEmisor \in 2..MaxP
    /\ largo \in Largos
    /\ cambiados = {}

PuedeEditar == paso = 0 \/ Variante = "editaEnCualquierPaso"

\* El teclado de bits y el chip «Cátedra»: sólo con `paso === 0`.
\* En el emisor cambian los datos, y con ellos p.
EditarLosDatos ==
    /\ PuedeEditar /\ modo = "emisor"
    /\ pEmisor' \in (2..MaxP) \cup {INVALIDA}
    /\ aviso' = FALSE
    /\ UNCHANGED <<modo, paso, corregido, largo, cambiados>>

\* En el receptor, agregar o borrar bits cambia el largo: es otra palabra.
EditarElLargoDeLaRecibida ==
    /\ PuedeEditar /\ modo = "receptor"
    /\ largo' \in Largos \cup {INVALIDA}
    /\ cambiados' = {}
    /\ aviso' = FALSE
    /\ UNCHANGED <<modo, paso, corregido, pEmisor>>

\* …y reescribir un bit lo deja distinto (o igual) a como se emitió.
UnBitLlegaCambiado(pos) ==
    /\ PuedeEditar /\ modo = "receptor" /\ largo # INVALIDA
    /\ pos \in 1..largo
    /\ cambiados' = IF pos \in cambiados THEN cambiados \ {pos} ELSE cambiados \cup {pos}
    /\ Cardinality(cambiados') <= MaxErrores
    /\ aviso' = FALSE
    /\ UNCHANGED <<modo, paso, corregido, pEmisor, largo>>

\* El selector Codificar / Verificar: setModo, setPaso(0), setAviso(undefined), setCorregido(false).
CambiarDeModo ==
    /\ modo' = IF modo = "emisor" THEN "receptor" ELSE "emisor"
    /\ paso' = IF Variante = "modoNoReinicia" THEN paso ELSE 0
    /\ aviso' = FALSE
    /\ corregido' = FALSE
    /\ UNCHANGED <<pEmisor, largo, cambiados>>

\* `ir(destino)`: con la entrada inválida no pasa del paso 0; si pasa, setCorregido(false).
Ir(destino) ==
    IF paso = 0 /\ destino = 1 /\ HayError
        THEN aviso' = TRUE /\ UNCHANGED <<modo, paso, corregido, pEmisor, largo, cambiados>>
        ELSE /\ paso' = destino
             /\ corregido' = IF Variante = "irNoDescorrige" THEN corregido ELSE FALSE
             /\ UNCHANGED <<modo, aviso, pEmisor, largo, cambiados>>

Siguiente == Ir(IF Final THEN 0 ELSE paso + 1)
Anterior == paso > 0 /\ Ir(paso - 1)

\* «Corregir el bit»: onCorregir={() => setCorregido(true)}.
Corregir ==
    /\ CorregirVisible
    /\ corregido' = TRUE
    /\ UNCHANGED <<modo, paso, aviso, pEmisor, largo, cambiados>>

Next ==
    \/ EditarLosDatos
    \/ EditarElLargoDeLaRecibida
    \/ \E pos \in 1..15 : UnBitLlegaCambiado(pos)
    \/ CambiarDeModo
    \/ Siguiente
    \/ Anterior
    \/ Corregir

Spec == Init /\ [][Next]_vars

\* Sólo el receptor, para dibujarlo con /statechart (verificacion/statecharts/): arranca
\* en «Verificar (receptor)» y no cambia de modo. Mismas acciones, mismas reglas.
InitReceptor ==
    /\ modo = "receptor" /\ paso = 0 /\ aviso = FALSE /\ corregido = FALSE
    /\ pEmisor = 2
    /\ largo \in Largos
    /\ cambiados = {}

NextReceptor ==
    \/ \E pos \in 1..15 : UnBitLlegaCambiado(pos)
    \/ Siguiente
    \/ Anterior
    \/ Corregir

SpecReceptor == InitReceptor /\ [][NextReceptor]_vars

-----------------------------------------------------------------------------
TypeOK ==
    /\ modo \in {"emisor", "receptor"} /\ paso \in Nat
    /\ aviso \in BOOLEAN /\ corregido \in BOOLEAN
    /\ pEmisor \in (2..MaxP) \cup {INVALIDA}
    /\ largo \in Largos \cup {INVALIDA}
    /\ cambiados \subseteq 1..15

\* Regla: el paso en pantalla siempre existe.
PasoDentroDelRecorrido == paso < Total

\* Regla: fuera de la entrada siempre hay una codificación o decodificación que mostrar.
FueraDeLaEntradaHayCalculo == paso > 0 => ~HayError

\* Regla: «Palabra corregida» sólo se muestra en el resultado del receptor y cuando el
\* síndrome señala una posición que la palabra tiene.
CorregidoSoloDondeSePuede ==
    corregido => (EnElResultadoDelReceptor /\ Posicion \in 1..largo)

\* Regla: «Corregir el bit» sólo se ofrece cuando llegó cambiado un único bit, y es el que
\* la pantalla señala. (Así lo corregido es lo que se emitió.)
CorregirSoloConUnError == CorregirVisible => cambiados = {Posicion}

\* Regla: «Corregir el bit» nunca invierte un bit que llegó bien.
CorregirNoRompeUnBitSano == CorregirVisible => Posicion \in cambiados

\* Regla: si llegó cambiado exactamente un bit, el resultado lo señala a ese.
UnErrorSeUbica ==
    (EnElResultadoDelReceptor /\ Cardinality(cambiados) = 1)
        => (SenialaUnaPosicion /\ cambiados = {Posicion})

\* Regla: «sin error» sólo cuando hay cero o más de un bit cambiado; nunca con uno solo.
UnErrorNoPasaPorBueno == DiceSinError => Cardinality(cambiados) # 1
=============================================================================
