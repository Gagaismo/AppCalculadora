# Clasificación de las 140 Fórmulas

Las 140 Fórmulas del catálogo **no son 140 calculadoras**. Hay entradas que son definiciones de
expresión, integrales de una función arbitraria o series infinitas, y no tienen forma de «cargo
números y sale un número».

Este archivo clasifica cada una. Al cargar una Unidad, **mirá acá primero**: la clase decide si la
Fórmula lleva campos de entrada o si entra como ficha de consulta. No la decidas de nuevo por tu
cuenta.

## Las tres clases

**`calculable`** — dadas todas sus Variables de entrada como números reales, `calcular()` devuelve
un número real. Es el caso normal y son 105 de las 140.

**`con restricciones`** — se implementa igual, pero sólo bajo una condición que hay que dejar escrita
en `condiciones`: evaluar una función del tiempo en un instante dado, devolver una cota en vez de una
igualdad, elegir una relación canónica entre varias. Son 20.

**`no calculable`** — no puede devolver un número real a partir de números. Entra como **ficha de
consulta**: su expresión y el significado de sus símbolos, sin campos de entrada. Sigue estando en la
app y sigue contando para el invariante de cobertura del catálogo; lo que no tiene es calculadora.
Son 15, y trece de esas quince están en la Unidad 2.

Que la Unidad 2 concentre casi todas las no calculables tiene sentido: es la unidad de Fourier, y
Fourier se enseña con integrales y series, no con cuentas de una línea.

## Los dos huecos del modelo que esta clasificación destapó

Estos **no son decisiones de quien carga las Fórmulas**. Son cambios al tipo `Formula`, que vive en
`src/dominio/` y nadie toca sin escalarlo. Están anotados acá porque aparecieron al clasificar.

**1. Variables de lista — resuelto.** Diez Fórmulas suman sobre una lista de términos —la entropía
`H = Σ P_j log₂(1/P_j)`, la longitud promedio `L̄ = Σ P_i L_i`, la duración promedio del símbolo— y
cada Variable era un escalar. No había forma de cargar «las probabilidades de los N símbolos».

El tipo `Variable` admite ahora `esLista`, y `U04-F06` (la entropía) está implementada de punta a
punta con sus cuatro Ejemplos resueltos como referencia. Las nueve restantes se cargan en el ticket
de su Unidad, siguiendo ese patrón: `U03-F03`, `U04-F02`, `U04-F05`, `U04-F09`, `U04-F14`,
`U05-F02`, `U05-F03`, `U05-F07` y `U06-F10`.

El múltiplo es **uno para toda la lista**, no uno por elemento. Las magnitudes que se cargan así son
homogéneas —las probabilidades de una fuente, las duraciones de sus símbolos— y un selector por
elemento sería una forma cara de invitar al error que la regla dura 6 quiere evitar.

Una lista sin ningún elemento cargado cuenta como Variable faltante: sumar sobre nada daría cero,
que es justo la clase de resultado plausible y equivocado que esta app existe para evitar.

**2. Entradas no numéricas.** Tres Fórmulas de la Unidad 6 no reciben números: la distancia de
Hamming compara dos palabras binarias, la distancia mínima recorre un conjunto de palabras, y el CRC
opera con polinomios sobre GF(2). El modelo sólo admite Variables numéricas.

Son `U06-F04`, `U06-F05` y `U06-F11`. La tercera queda directamente como no calculable; las otras
dos dependen de si se decide admitir una Variable de texto.

## Tabla

| ID | Nombre | Clase | Nota |
|---|---|---|---|
| `U02-F01` | Señal exponencial (real y compleja) | no calculable | Es una identidad o definición de expresión, no un cálculo con entrada y salida. |
| `U02-F02` | Relación de Euler | no calculable | Es una identidad o definición de expresión, no un cálculo con entrada y salida. |
| `U02-F03` | Longitud de onda a partir de la frecuencia | calculable |  |
| `U02-F04` | Longitud de onda a partir del período | calculable |  |
| `U02-F05` | Frecuencia angular | calculable |  |
| `U02-F06` | Frecuencia angular fundamental | calculable |  |
| `U02-F07` | Frecuencia fundamental y armónicos | con restricciones | El catálogo empaqueta varias relaciones en un identificador: elegir la canónica al cargarla. |
| `U02-F08` | Señal periódica simple (senoidal) | con restricciones | Es una función del tiempo: se calcula su valor instantáneo en un `t` dado, que entra como Variable. |
| `U02-F09` | Señal periódica compuesta (suma de senoidales) | con restricciones | Es una función del tiempo: se calcula su valor instantáneo en un `t` dado, que entra como Variable. |
| `U02-F10` | Ancho de banda absoluto | calculable |  |
| `U02-F11` | Serie de Fourier trigonométrica (síntesis) | no calculable | Suma infinita: la cátedra no fija dónde truncarla. |
| `U02-F12` | Coeficiente a_0 de la serie trigonométrica | no calculable | Integral de una `f(t)` arbitraria: no hay nada que calcular con números de entrada. |
| `U02-F13` | Coeficiente a_n de la serie trigonométrica | no calculable | Integral de una `f(t)` arbitraria: no hay nada que calcular con números de entrada. |
| `U02-F14` | Coeficiente b_n de la serie trigonométrica | no calculable | Integral de una `f(t)` arbitraria: no hay nada que calcular con números de entrada. |
| `U02-F15` | Coeficientes b_n de la onda cuadrada simétrica de am | calculable |  |
| `U02-F16` | Serie de Fourier de la onda cuadrada simétrica | no calculable | Suma infinita: la cátedra no fija dónde truncarla. |
| `U02-F17` | Serie de Fourier compleja (síntesis) | no calculable | Suma infinita: la cátedra no fija dónde truncarla. |
| `U02-F18` | Coeficientes de la serie de Fourier compleja | no calculable | Integral de una `f(t)` arbitraria: no hay nada que calcular con números de entrada. |
| `U02-F19` | Relación entre coeficientes complejos y trigonométri | no calculable | El resultado es un número complejo y `calcular()` devuelve un número real. |
| `U02-F20` | Coeficientes complejos de la onda cuadrada simétrica | no calculable | El resultado es un número complejo y `calcular()` devuelve un número real. |
| `U02-F21` | Coeficientes del tren de pulsos rectangulares (funci | calculable |  |
| `U02-F22` | Función sinc | calculable |  |
| `U02-F23` | Número de fasores hasta el primer cruce por cero | calculable |  |
| `U02-F24` | Frecuencia del primer cruce por cero del espectro de | calculable |  |
| `U02-F25` | Transformada de Fourier | no calculable | Integral de una `f(t)` arbitraria: no hay nada que calcular con números de entrada. |
| `U02-F26` | Transformada inversa de Fourier | no calculable | Integral de una `f(t)` arbitraria: no hay nada que calcular con números de entrada. |
| `U02-F27` | Transformada de Fourier del pulso rectangular (en om | calculable |  |
| `U02-F28` | Transformada de Fourier del pulso rectangular (en fr | calculable |  |
| `U02-F29` | Densidad espectral (módulo al cuadrado) del pulso re | calculable |  |
| `U03-F01` | Relación de potencias en decibeles (atenuación / gan | calculable |  |
| `U03-F02` | Pérdida total de un medio con atenuación específica  | calculable |  |
| `U03-F03` | Suma algebraica de decibeles en una cadena de transm | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U03-F04` | Nivel de potencia absoluto en dBm (referido a 1 mW) | calculable |  |
| `U03-F05` | Ganancia (directividad) de antena en dBi | calculable |  |
| `U03-F06` | Pérdida en el espacio libre (frecuencia en MHz) | calculable |  |
| `U03-F07` | Pérdida en el espacio libre (frecuencia en GHz) | calculable |  |
| `U03-F08` | Balance de enlace / potencia recibida (RSSI) en un r | calculable |  |
| `U03-F09` | Margen del enlace (RSSI sobre sensibilidad del recep | calculable |  |
| `U03-F10` | Densidad de potencia de ruido térmico | calculable |  |
| `U03-F11` | Conversión de temperatura de grados Celsius a Kelvin | calculable |  |
| `U03-F12` | Potencia total de ruido térmico en un ancho de banda | calculable |  |
| `U03-F13` | Potencia de ruido térmico expresada en dBm | calculable |  |
| `U03-F14` | Relación señal a ruido en veces (lineal) | calculable |  |
| `U03-F15` | Relación señal a ruido en decibeles | calculable |  |
| `U03-F16` | Factor de ruido (f) | calculable |  |
| `U03-F17` | Índice de ruido (factor de ruido en dB) | calculable |  |
| `U04-F01` | Autoinformación (cantidad de información de un event | calculable |  |
| `U04-F02` | Información total de un mensaje formado por símbolos | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U04-F03` | Normalización: la suma de las probabilidades de la f | no calculable | Es una condición de normalización, no un cálculo. |
| `U04-F04` | Información aportada por el símbolo j en una secuenc | calculable |  |
| `U04-F05` | Información total contenida en una secuencia larga d | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U04-F06` | Entropía de la fuente (información promedio por símb | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U04-F07` | Entropía máxima (fuente con símbolos equiprobables) | calculable |  |
| `U04-F08` | Redundancia de una fuente (porcentual) | calculable |  |
| `U04-F09` | Duración promedio del símbolo | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U04-F10` | Tasa de información de una fuente discreta | calculable |  |
| `U04-F11` | Velocidad de símbolos (símbolos por segundo) | calculable |  |
| `U04-F12` | Tasa de información con símbolos de igual duración | calculable |  |
| `U04-F13` | Tasa de información con símbolos equiprobables e igu | calculable |  |
| `U04-F14` | Longitud promedio de la palabra código | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U04-F15` | Longitud promedio del código a partir de los bits to | calculable |  |
| `U04-F16` | Eficiencia del codificador de fuente | calculable |  |
| `U05-F01` | Cantidad de informacion de un simbolo (informacion p | calculable |  |
| `U05-F02` | Entropia de la fuente H(x) | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U05-F03` | Duracion promedio de un simbolo | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U05-F04` | Velocidad de simbolos (tasa de senalizacion) | calculable |  |
| `U05-F05` | Velocidad de transmision de informacion (velocidad d | calculable |  |
| `U05-F06` | Velocidad de transmision para simbolos equiprobables | calculable |  |
| `U05-F07` | Longitud promedio de una palabra codigo | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U05-F08` | Eficiencia de un codificador de fuente | calculable |  |
| `U05-F09` | Probabilidad de un nivel equiprobable | calculable |  |
| `U05-F10` | Cantidad de simbolos contenidos en la senal | calculable |  |
| `U05-F11` | Contenido de informacion de una senal | calculable |  |
| `U05-F12` | Bits por simbolo / entropia con simbolos equiprobabl | calculable |  |
| `U05-F13` | Periodo de muestreo | calculable |  |
| `U05-F14` | Frecuencia de Nyquist (velocidad minima de muestreo) | calculable |  |
| `U05-F15` | Teorema de Nyquist: capacidad de un canal sin ruido | calculable |  |
| `U05-F16` | Ancho de banda a partir del espectro del canal | calculable |  |
| `U05-F17` | Formula de Shannon: capacidad de un canal con ruido | calculable |  |
| `U05-F18` | Relacion senal a ruido en decibeles | calculable |  |
| `U05-F19` | Eficiencia espectral maxima | calculable |  |
| `U05-F20` | Shannon-Hartley: niveles de senal requeridos | calculable |  |
| `U05-F21` | Potencia de senal en funcion de la energia por bit | calculable |  |
| `U05-F22` | Potencia total de ruido a partir de la densidad espe | calculable |  |
| `U05-F23` | Tasa de bit en funcion del tiempo de bit | calculable |  |
| `U05-F24` | SNR en funcion de Eb/No | calculable |  |
| `U05-F25` | Relacion Eb/No a partir de la SNR y la eficiencia es | calculable |  |
| `U06-F01` | Tasa de Errores BER (Bit Error Rate) | calculable |  |
| `U06-F02` | Bits perdidos ante una rafaga de ruido | calculable |  |
| `U06-F03` | Combinaciones posibles de un codigo binario de N dig | calculable |  |
| `U06-F04` | Distancia de Hamming entre dos palabras | con restricciones | La entrada no es numérica (palabras binarias o polinomios): el modelo sólo admite Variables numéricas. |
| `U06-F05` | Distancia minima de un codigo | con restricciones | La entrada no es numérica (palabras binarias o polinomios): el modelo sólo admite Variables numéricas. |
| `U06-F06` | Capacidad de deteccion de errores segun la distancia | calculable |  |
| `U06-F07` | Capacidad de correccion de errores segun la distanci | calculable |  |
| `U06-F08` | Reparto entre capacidad de deteccion y de correccion | con restricciones | Es una desigualdad: la salida es una cota, no una igualdad, y hay que rotularla como tal. |
| `U06-F09` | Cantidad de bits de paridad en la codificacion Hammi | con restricciones | Es una desigualdad: la salida es una cota, no una igualdad, y hay que rotularla como tal. |
| `U06-F10` | Posicion del bit erroneo (sindrome de Hamming) | con restricciones | Suma sobre una lista de términos: la Variable se declara `esLista`. |
| `U06-F11` | Codigo de Redundancia Ciclica (CRC): resto y trama a | no calculable | La entrada no es numérica (palabras binarias o polinomios): el modelo sólo admite Variables numéricas. |
| `U07-F01` | Número de bits por elemento de señal (bits por símbo | calculable |  |
| `U07-F02` | Velocidad de transmisión (tasa de bits) a partir de  | calculable |  |
| `U07-F03` | Ancho de banda de un canal / señal analógica | calculable |  |
| `U07-F04` | Bits extra por segundo por desviación del reloj del  | calculable |  |
| `U08-F01` | Velocidad de transmisión (tasa binaria) a partir del | calculable |  |
| `U08-F02` | Bits por símbolo y cantidad de niveles / símbolos M- | calculable |  |
| `U08-F03` | Ancho de banda / velocidad de modulación M-aria | calculable |  |
| `U08-F04` | Velocidad de modulación (baudios) a partir del tiemp | calculable |  |
| `U08-F05` | Ancho de banda de ASK | calculable |  |
| `U08-F06` | Ancho de banda de FSK | calculable |  |
| `U08-F07` | Ancho de banda de PSK | calculable |  |
| `U08-F08` | Frecuencias de marca y espacio en FSK | calculable |  |
| `U08-F09` | Señal portadora sinusoidal | con restricciones | Es una función del tiempo: se calcula su valor instantáneo en un `t` dado, que entra como Variable. |
| `U08-F10` | Cota del número de estados en QAM | con restricciones | Es una desigualdad: la salida es una cota, no una igualdad, y hay que rotularla como tal. |
| `U08-F11` | Relación entre número de estados M y SNR (nQAM adapt | calculable |  |
| `U08-F12` | Teorema del muestreo (Nyquist): frecuencia de muestr | con restricciones | Es una desigualdad: la salida es una cota, no una igualdad, y hay que rotularla como tal. |
| `U08-F13` | Período de muestreo | calculable |  |
| `U08-F14` | Velocidad del canal PCM (velocidad de la señal digit | calculable |  |
| `U08-F15` | Longitud de onda de una portadora óptica (WDM) | calculable |  |
| `U08-F16` | Cantidad de bits de la trama de salida en TDM sincró | calculable |  |
| `U08-F17` | Duración de la trama en TDM sincrónica | calculable |  |
| `U08-F18` | Tasa de transmisión del enlace en TDM sincrónica | calculable |  |
| `U08-F19` | Duración de un time slot dentro de la trama PCM | calculable |  |
| `U08-F20` | Velocidad de la trama E1 a partir de los canales E0 | calculable |  |
| `U08-F21` | Velocidad de la trama SDH (STM-1) | calculable |  |
| `U09-F01` | Velocidad de transmisión (tasa binaria) del módem M- | calculable |  |
| `U09-F02` | Capacidad de canal de Nyquist (canal sin ruido) | calculable |  |
| `U09-F03` | Capacidad de canal de Shannon (canal con ruido) | calculable |  |
| `U09-F04` | Máximo orden de modulación M por portadora (DMT/ADSL | calculable |  |
| `U09-F05` | Potencia de ruido térmico | calculable |  |
| `U09-F06` | Relación señal/ruido en decibeles | calculable |  |
| `U09-F07` | Bits por símbolo de una modulación M-aria | calculable |  |
| `U09-F08` | Velocidad máxima teórica de un enlace multiportadora | calculable |  |
| `U09-F09` | Ancho de banda de cada subcanal DMT | calculable |  |
| `U10-F01` | Tasa de símbolos con codificación de bloque 4B/5B | calculable |  |
| `U10-F02` | Tasa de símbolos con codificación de bloque 8B/10B | calculable |  |
| `U10-F03` | Tasa de símbolos con codificación de bloque 64B/66B | calculable |  |
| `U10-F04` | Tasa de símbolos a partir de los bits por símbolo (m | calculable |  |
| `U10-F05` | Tasa de símbolos total de un enlace multipar | calculable |  |
| `U10-F06` | Velocidad binaria por par trenzado | calculable |  |
| `U10-F07` | Ancho de banda de una banda de frecuencias (ISM / Wi | calculable |  |
| `U10-F08` | Separación entre subportadoras OFDM (802.11a) | calculable |  |


## Por Unidad


| Unidad | calculable | con restricciones | no calculable |
|---|---:|---:|---:|
| 2 | 13 | 3 | 13 |
| 3 | 16 | 1 | 0 |
| 4 | 10 | 5 | 1 |
| 5 | 22 | 3 | 0 |
| 6 | 5 | 5 | 1 |
| 7 | 4 | 0 | 0 |
| 8 | 18 | 3 | 0 |
| 9 | 9 | 0 | 0 |
| 10 | 8 | 0 | 0 |

**Total: 105 calculables, 20 con restricciones, 15 no calculables.**

La Unidad 1 no aparece porque tiene 0 Fórmulas, verificado sobre sus 79 páginas.
