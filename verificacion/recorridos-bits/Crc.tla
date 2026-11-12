--------------------------------- MODULE Crc ---------------------------------
(***************************************************************************)
(* El recorrido «paso a paso» de la pantalla de CRC                         *)
(* (src/screens/bits/crc.tsx, con la navegación de pasos.tsx).              *)
(*                                                                          *)
(* El modelo no hace la división: de la entrada sólo guarda lo que decide   *)
(* el recorrido, que es cuántos XOR tiene la división (o que la entrada no  *)
(* es válida) y, en el receptor, si el resto da 0. Que la división esté     *)
(* bien calculada lo prueban los tests de src/bits/crc.ts.                  *)
(*                                                                          *)
(* Cada acción es un manejador de un toque. Los `set…` de un mismo          *)
(* manejador se aplican juntos (React los agrupa): es un solo paso.         *)
(***************************************************************************)
EXTENDS Naturals

CONSTANTS
    MaxXor,    \* cota: XOR de la división más larga
    Variante   \* "codigo", o una rotura a propósito

Variantes == {"codigo", "modoNoReinicia", "editaEnCualquierPaso", "avanzaConEntradaInvalida"}
ASSUME Variante \in Variantes /\ MaxXor \in Nat

INVALIDA == 99    \* calcularCrc / verificarCrc lanzan: `error` tiene el mensaje
Entradas == (0..MaxXor) \cup {INVALIDA}

VARIABLES
    modo,       \* "emisor" o "receptor"
    paso,       \* el paso en pantalla, desde 0
    aviso,      \* TRUE si se muestra el mensaje de error de la entrada
    xorEmisor,  \* XOR de dividir P(x) por G(x), o INVALIDA
    xorRecep,   \* XOR de dividir T'(x) por G(x), o INVALIDA
    restoCero   \* receptor: TRUE si el resto de T'(x) da 0

vars == <<modo, paso, aviso, xorEmisor, xorRecep, restoCero>>

Entrada == IF modo = "emisor" THEN xorEmisor ELSE xorRecep
HayError == Entrada = INVALIDA

\* `const total = (division?.pasos.length ?? 0) + 2;`
Total == (IF HayError THEN 0 ELSE Entrada) + 2
Final == paso = Total - 1

\* El ejemplo de la cátedra: válido en los dos modos, y la trama llega sin error.
Init ==
    /\ modo = "emisor" /\ paso = 0 /\ aviso = FALSE
    /\ xorEmisor \in 0..MaxXor /\ xorRecep \in 0..MaxXor
    /\ restoCero = TRUE

\* El teclado de bits y los chips de generadores: sólo se dibujan con `paso === 0`.
\* Cambian M(x), G(x) o T'(x); G(x) es de los dos modos, así que pueden cambiar las dos divisiones.
EditarLaEntrada ==
    /\ paso = 0 \/ Variante = "editaEnCualquierPaso"
    /\ xorEmisor' \in Entradas /\ xorRecep' \in Entradas
    /\ restoCero' \in BOOLEAN
    /\ aviso' = FALSE
    /\ UNCHANGED <<modo, paso>>

\* El selector Emisor / Verificar en el receptor: setModo, setCampo, setPaso(0), setAviso(undefined).
CambiarDeModo ==
    /\ modo' = IF modo = "emisor" THEN "receptor" ELSE "emisor"
    /\ paso' = IF Variante = "modoNoReinicia" THEN paso ELSE 0
    /\ aviso' = FALSE
    /\ UNCHANGED <<xorEmisor, xorRecep, restoCero>>

\* `ir(destino)`: con la entrada inválida no deja pasar del paso 0 y muestra el aviso.
Ir(destino) ==
    IF paso = 0 /\ destino = 1 /\ HayError /\ Variante # "avanzaConEntradaInvalida"
        THEN aviso' = TRUE /\ UNCHANGED <<modo, paso, xorEmisor, xorRecep, restoCero>>
        ELSE paso' = destino /\ UNCHANGED <<modo, aviso, xorEmisor, xorRecep, restoCero>>

\* «Siguiente»; en el último paso dice «Volver a la entrada» y va al 0 (NavegacionPasos).
Siguiente == Ir(IF Final THEN 0 ELSE paso + 1)

\* «Anterior»: deshabilitado en el paso 0.
Anterior == paso > 0 /\ Ir(paso - 1)

Next == EditarLaEntrada \/ CambiarDeModo \/ Siguiente \/ Anterior

Spec == Init /\ [][Next]_vars

-----------------------------------------------------------------------------
TypeOK ==
    /\ modo \in {"emisor", "receptor"} /\ paso \in Nat /\ aviso \in BOOLEAN
    /\ xorEmisor \in Entradas /\ xorRecep \in Entradas /\ restoCero \in BOOLEAN

\* Regla: el paso en pantalla siempre existe («Paso 3 de 8», nunca «Paso 9 de 8»).
PasoDentroDelRecorrido == paso < Total

\* Regla: fuera de la entrada siempre hay una división que mostrar.
FueraDeLaEntradaHayDivision == paso > 0 => ~HayError

\* Regla: el aviso de entrada inválida sólo se ve en la entrada.
AvisoSoloEnLaEntrada == aviso => paso = 0
=============================================================================
