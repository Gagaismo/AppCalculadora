-------------------------------- MODULE VrcLrc --------------------------------
(***************************************************************************)
(* El recorrido «paso a paso» de la pantalla de VRC/LRC                     *)
(* (src/screens/bits/vrc-lrc.tsx, con la navegación de pasos.tsx) y la      *)
(* corrección del receptor de la tabla.                                     *)
(*                                                                          *)
(* `cambiados` son los bits de la tabla recibida que llegaron distintos de  *)
(* como se emitieron: datos, VRC, LRC o la esquina. NO está en el código:   *)
(* la pantalla sólo ve lo recibido. Es lo que permite preguntar si lo que   *)
(* la pantalla ofrece corregir es lo que de verdad llegó mal.               *)
(*                                                                          *)
(* SUPUESTOS:                                                               *)
(*  - lo emitido era una tabla correcta (tablaBidimensional de              *)
(*    src/bits/paridad.ts) con la misma paridad, par o impar, que usa el    *)
(*    receptor. Entonces una fila «falla» en verificarTabla si y sólo si    *)
(*    tiene una cantidad impar de bits cambiados contando su LRC, y lo      *)
(*    mismo una columna con su VRC: la paridad es lineal;                   *)
(*  - el selector Par/Impar no cambia qué falla (cambia las dos paridades   *)
(*    a la vez); el modelo sólo guarda que apaga «corregida».               *)
(*                                                                          *)
(* Del BCC lineal sólo guarda el ancho, que decide cuántos pasos hay.       *)
(* Cada acción es un manejador de un toque; sus `set…` se aplican juntos.   *)
(***************************************************************************)
EXTENDS Naturals, FiniteSets

CONSTANTS
    Filas,            \* filas B1…Bm de la tabla (la pantalla usa 7)
    Columnas,         \* columnas D1…Dk (la pantalla usa 8)
    MaxAncho,         \* cota: bits por carácter en el BCC (la pantalla admite 8)
    MaxErrores,       \* cota: cuántos bits de la tabla pueden llegar cambiados
    VerificaEsquina,  \* FALSE = el código; TRUE = la corrección propuesta, que también mira la esquina
    Variante          \* "codigo", o una rotura a propósito

Variantes == {"codigo", "vistaNoReinicia", "editaEnCualquierPaso", "irNoDescorrige",
              "corrigeSinCruceUnico"}
ASSUME Variante \in Variantes /\ VerificaEsquina \in BOOLEAN
ASSUME Filas \in Nat \ {0} /\ Columnas \in Nat \ {0} /\ MaxAncho \in Nat /\ MaxErrores \in Nat

\* Un bit de la tabla recibida: <<clase, fila, columna>>, con 0 donde no aplica.
Dato(f, c) == <<"dato", f, c>>
Vrc(c) == <<"vrc", 0, c>>       \* la fila de abajo: un bit por columna
Lrc(f) == <<"lrc", f, 0>>       \* la columna de la derecha: un bit por fila
Esquina == <<"esquina", 0, 0>>
Bits ==
    {Dato(f, c) : f \in 1..Filas, c \in 1..Columnas}
        \cup {Vrc(c) : c \in 1..Columnas} \cup {Lrc(f) : f \in 1..Filas} \cup {Esquina}

INVALIDO == 0    \* el bloque del BCC no es válido: `bcc` lanza

VARIABLES
    vista,      \* "tabla" o "bcc"
    modo,       \* "emisor" o "receptor" (sólo cuenta en la vista tabla)
    paso,       \* el paso en pantalla, desde 0
    aviso,      \* TRUE si se muestra el mensaje de error del bloque del BCC
    corregida,  \* TRUE después de tocar «Corregir el bit»
    ancho,      \* bits por carácter del bloque del BCC, o INVALIDO
    cambiados   \* bits de la tabla que llegaron cambiados (no está en el código)

vars == <<vista, modo, paso, aviso, corregida, ancho, cambiados>>

Impar(n) == n % 2 = 1

\* verificarTabla: `distintos(tabla.lrc, lrcRecibido)` y `distintos(tabla.vrc, vrcRecibido)`.
FilasConError ==
    {f \in 1..Filas :
        Impar(Cardinality({c \in 1..Columnas : Dato(f, c) \in cambiados})
              + (IF Lrc(f) \in cambiados THEN 1 ELSE 0))}
ColumnasConError ==
    {c \in 1..Columnas :
        Impar(Cardinality({f \in 1..Filas : Dato(f, c) \in cambiados})
              + (IF Vrc(c) \in cambiados THEN 1 ELSE 0))}

\* La esquina es la paridad de la fila del VRC. El código la calcula y la dibuja, pero
\* verificarTabla no recibe la esquina que llegó: no la compara nunca.
EsquinaNoCierra ==
    Impar(Cardinality({c \in 1..Columnas : Vrc(c) \in cambiados})
          + (IF Esquina \in cambiados THEN 1 ELSE 0))
FallaLaEsquina == VerificaEsquina /\ EsquinaNoCierra

\* `celdaErronea`: sólo cuando falla exactamente una fila y una columna.
HayCruceUnico ==
    /\ Cardinality(FilasConError) = 1 /\ Cardinality(ColumnasConError) = 1
    /\ ~FallaLaEsquina
ElCruce == Dato(CHOOSE f \in FilasConError : TRUE, CHOOSE c \in ColumnasConError : TRUE)

BccConError == ancho = INVALIDO

\* `const total = vista === 'bcc' ? ancho + 2 : modo === 'emisor' ? 5 : 4;`
Total == IF vista = "bcc" THEN ancho + 2 ELSE IF modo = "emisor" THEN 5 ELSE 4
Final == paso = Total - 1

EnElResultadoDelReceptor == vista = "tabla" /\ modo = "receptor" /\ Final

\* Lo que dibuja ResultadoReceptor.
DiceSinError ==
    /\ EnElResultadoDelReceptor
    /\ FilasConError = {} /\ ColumnasConError = {} /\ ~FallaLaEsquina
SenialaUnBit ==
    /\ EnElResultadoDelReceptor
    /\ HayCruceUnico \/ (Variante = "corrigeSinCruceUnico" /\ FilasConError # {} /\ ColumnasConError # {})
\* El botón «Corregir el bit».
CorregirVisible == SenialaUnBit /\ ~corregida

\* El Ejemplo 02 de la pág. 25: llega cambiado un dato (B4 · D6).
Catedra == {Dato(IF Filas >= 4 THEN 4 ELSE 1, IF Columnas >= 6 THEN 6 ELSE 1)}

Init ==
    /\ vista = "tabla" /\ modo = "emisor" /\ paso = 0
    /\ aviso = FALSE /\ corregida = FALSE
    /\ ancho \in 1..MaxAncho
    /\ cambiados = Catedra

PuedeEditar == paso = 0 \/ Variante = "editaEnCualquierPaso"

\* `reiniciar`: setPaso(0), setCorregida(false), setAviso(undefined).
Reiniciar ==
    /\ paso' = IF Variante = "vistaNoReinicia" THEN paso ELSE 0
    /\ corregida' = FALSE
    /\ aviso' = FALSE

CambiarDeVista ==
    /\ vista' = IF vista = "tabla" THEN "bcc" ELSE "tabla"
    /\ Reiniciar
    /\ UNCHANGED <<modo, ancho, cambiados>>

\* El selector Emisor / Receptor sólo se dibuja en la vista tabla.
CambiarDeModo ==
    /\ vista = "tabla"
    /\ modo' = IF modo = "emisor" THEN "receptor" ELSE "emisor"
    /\ Reiniciar
    /\ UNCHANGED <<vista, ancho, cambiados>>

\* El selector Par / Impar, en cualquier paso: setTipo, setCorregida(false).
CambiarLaParidad ==
    /\ vista = "tabla"
    /\ corregida' = FALSE
    /\ UNCHANGED <<vista, modo, paso, aviso, ancho, cambiados>>

\* Receptor, paso 0: tocar un dato (onCelda) o un bit de control (onControl) lo invierte.
UnBitLlegaCambiado(b) ==
    /\ vista = "tabla" /\ modo = "receptor" /\ PuedeEditar
    /\ cambiados' = IF b \in cambiados THEN cambiados \ {b} ELSE cambiados \cup {b}
    /\ Cardinality(cambiados') <= MaxErrores
    /\ UNCHANGED <<vista, modo, paso, aviso, corregida, ancho>>

\* El chip «Cátedra» (cargarCatedra), sólo con `paso === 0`.
CargarLaCatedra ==
    /\ paso = 0
    /\ cambiados' = IF vista = "tabla" /\ modo = "receptor" THEN Catedra ELSE cambiados
    /\ ancho' = IF vista = "bcc" THEN MaxAncho ELSE ancho
    /\ Reiniciar
    /\ UNCHANGED <<vista, modo>>

\* BCC, paso 0: el teclado, «Agregar carácter» y «Quitar el último» cambian el bloque.
EditarElBloque ==
    /\ vista = "bcc" /\ PuedeEditar
    /\ ancho' \in (1..MaxAncho) \cup {INVALIDO}
    /\ aviso' = FALSE
    /\ UNCHANGED <<vista, modo, paso, corregida, cambiados>>

\* `ir(destino)`: con el bloque del BCC inválido no pasa del paso 0; si pasa, setCorregida(false).
Ir(destino) ==
    IF vista = "bcc" /\ paso = 0 /\ destino = 1 /\ BccConError
        THEN aviso' = TRUE /\ UNCHANGED <<vista, modo, paso, corregida, ancho, cambiados>>
        ELSE /\ paso' = destino
             /\ corregida' = IF Variante = "irNoDescorrige" THEN corregida ELSE FALSE
             /\ UNCHANGED <<vista, modo, aviso, ancho, cambiados>>

Siguiente == Ir(IF Final THEN 0 ELSE paso + 1)
Anterior == paso > 0 /\ Ir(paso - 1)

\* «Corregir el bit»: onCorregir={() => setCorregida(true)}.
Corregir ==
    /\ CorregirVisible
    /\ corregida' = TRUE
    /\ UNCHANGED <<vista, modo, paso, aviso, ancho, cambiados>>

Next ==
    \/ CambiarDeVista
    \/ CambiarDeModo
    \/ CambiarLaParidad
    \/ \E b \in Bits : UnBitLlegaCambiado(b)
    \/ CargarLaCatedra
    \/ EditarElBloque
    \/ Siguiente
    \/ Anterior
    \/ Corregir

Spec == Init /\ [][Next]_vars

\* Sólo el receptor de la tabla, para dibujarlo con /statechart (verificacion/statecharts/):
\* arranca en «Receptor» con lo recibido igual a lo emitido, y no cambia de vista ni de modo.
\* Mismas acciones, mismas reglas.
InitReceptor ==
    /\ vista = "tabla" /\ modo = "receptor" /\ paso = 0
    /\ aviso = FALSE /\ corregida = FALSE
    /\ ancho = 1
    /\ cambiados = {}

NextReceptor ==
    \/ \E b \in Bits : UnBitLlegaCambiado(b)
    \/ Siguiente
    \/ Anterior
    \/ Corregir

SpecReceptor == InitReceptor /\ [][NextReceptor]_vars

-----------------------------------------------------------------------------
TypeOK ==
    /\ vista \in {"tabla", "bcc"} /\ modo \in {"emisor", "receptor"} /\ paso \in Nat
    /\ aviso \in BOOLEAN /\ corregida \in BOOLEAN
    /\ ancho \in (1..MaxAncho) \cup {INVALIDO}
    /\ cambiados \subseteq Bits

\* Regla: el paso en pantalla siempre existe.
PasoDentroDelRecorrido == paso < Total

\* Regla: fuera de la entrada del BCC siempre hay un BCC que mostrar.
FueraDeLaEntradaHayBcc == (vista = "bcc" /\ paso > 0) => ~BccConError

\* Regla: «Corregido» sólo se muestra en el resultado del receptor y con un cruce único.
CorregidaSoloDondeSePuede == corregida => (EnElResultadoDelReceptor /\ HayCruceUnico)

\* Regla: «Corregir el bit» sólo se ofrece cuando llegó cambiado un único bit, y es el
\* dato que la pantalla señala. (Así lo corregido es lo que se emitió.)
CorregirSoloConUnError == CorregirVisible => cambiados = {ElCruce}

\* Regla: «Corregir el bit» nunca invierte un bit que llegó bien.
CorregirNoRompeUnBitSano == CorregirVisible => ElCruce \in cambiados

\* Regla: un solo bit cambiado, sea cual sea, nunca termina en «Sin error detectado».
UnBitCambiadoSeDetecta == DiceSinError => Cardinality(cambiados) # 1
=============================================================================
