# Catálogo de fórmulas — Comunicaciones (UTN-FRT)

Fórmulas calculables de las **Presentaciones de unidad**. Cada una cita su página de origen.

## Estado de verificación

Las 140 fórmulas fueron extraídas por un lector y luego revisadas por un segundo lector adversarial
que releyó las fuentes y **recalculó los Ejemplos resueltos** para detectar errores de transcripción.

- **122** confirmadas contra la fuente sin cambios
- **16** con observaciones (2 que afectan el resultado numérico)
- **3** recuperadas por la verificación (el primer lector las había salteado)

> [!IMPORTANT]
> Las correcciones están **anotadas, no aplicadas**: la fórmula figura como la extrajo el primer lector,
> con la observación debajo. Al implementar cada una, resolver la observación primero.

> **Unidad 1 devolvió 0 fórmulas.** Es el hueco más sospechoso del catálogo: material previo de la
> materia contiene fórmulas básicas atribuidas a esa altura del programa. Requiere revisión manual.

## Alcance

**Dentro:** las 10 Presentaciones de unidad (684 páginas), fuente maestra del proyecto.  
**Fuera:** los 38 PDFs de Material complementario y los libros de `Biblioteca/`.

## Índice

| Unidad | Tema | Fórmulas | Ejemplos resueltos |
|---|---|---:|---:|
| 1 | Sistemas de Comunicación | 0 | 0 |
| 2 | Análisis de las Señales (Fourier, filtros) | 29 | 18 |
| 3 | Atenuación, Distorsión y Ruido | 17 | 28 |
| 4 | Teoría de la Información y Codificación | 16 | 22 |
| 5 | Canales de Comunicaciones | 25 | 21 |
| 6 | Errores en la Transmisión de Datos | 11 | 23 |
| 7 | Técnicas de transmisión de la información | 4 | 5 |
| 8 | Modulación y Multiplexación de Señales | 21 | 22 |
| 9 | Equipos de Comunicación de Datos (DCE) | 9 | 13 |
| 10 | Capa Física de Redes de Datos | 8 | 12 |
| | **Total** | **140** | **164** |

## Resumen

| ID | Nombre | Expresión | Conf. | Verif. |
|---|---|---|---|---|
| `U02-F01` | Señal exponencial (real y compleja) | $x(t) = C e^{st},\ \ C = A \pm jB,\ \ s = \sigma \pm j\omega \ \Rightarrow\ \text{real (}B=0,\omega=0\text{): } x(t)=A e^{\sigma t};\ \ \text{compleja (}B=0,\sigma=0\text{): } x(t)=A e^{\pm j\omega t}$ | alta | ✅ |
| `U02-F02` | Relación de Euler | $e^{\pm j\theta} = \cos\theta \pm j\,\mathrm{sen}\,\theta;\quad \cos\theta = \tfrac{1}{2}\left(e^{j\theta}+e^{-j\theta}\right);\quad \mathrm{sen}\,\theta = \tfrac{1}{2j}\left(e^{j\theta}-e^{-j\theta}\right)$ | alta | ✅ |
| `U02-F03` | Longitud de onda a partir de la frecuencia | $v = \lambda \cdot f \ \Rightarrow\ \lambda = \frac{v}{f}\quad\left(\text{en espacio libre } v=c=3\times10^{8}\,\mathrm{m/s}\right)$ | alta | ✅ |
| `U02-F04` | Longitud de onda a partir del período | $\lambda = v\,T$ | alta | ✅ |
| `U02-F05` | Frecuencia angular | $\omega = 2\pi f$ | alta | ✅ |
| `U02-F06` | Frecuencia angular fundamental | $\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0} \ \left(\text{o simplemente } \omega_0 = \frac{2\pi}{T}\right)$ | alta | ✅ |
| `U02-F07` | Frecuencia fundamental y armónicos | $f_0 = \frac{1}{T};\quad \omega_n = n\,\omega_0;\quad f_n = n\,f_0$ | media | ✅ |
| `U02-F08` | Señal periódica simple (senoidal) | $f(t) = A\,\mathrm{sen}(\omega t + \theta) = A\,\mathrm{sen}(2\pi f t + \theta)$ | alta | ✅ |
| `U02-F09` | Señal periódica compuesta (suma de senoidales) | $f(t) = A\,\mathrm{sen}(2\pi f_1 t) + B\,\mathrm{sen}(2\pi f_2 t) + C\,\mathrm{sen}(2\pi f_3 t)$ | alta | ✅ |
| `U02-F10` | Ancho de banda absoluto | $BW_{abs} = f_{max} - f_{min}$ | media | ✅ |
| `U02-F11` | Serie de Fourier trigonométrica (síntesis) | $f(t) = \frac{1}{2}a_0 + \sum_{n=1}^{\infty} a_n \cos(n\omega_0 t) + \sum_{n=1}^{\infty} b_n\,\mathrm{sen}(n\omega_0 t)$ | alta | ✅ |
| `U02-F12` | Coeficiente a_0 de la serie trigonométrica | $a_0 = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\,dt$ | alta | ✅ |
| `U02-F13` | Coeficiente a_n de la serie trigonométrica | $a_n = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\cos(n\omega_0 t)\,dt$ | alta | ✅ |
| `U02-F14` | Coeficiente b_n de la serie trigonométrica | $b_n = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\,\mathrm{sen}(n\omega_0 t)\,dt$ | alta | ✅ |
| `U02-F15` | Coeficientes b_n de la onda cuadrada simétrica de amplitud 1 | $b_n = \frac{2}{n\pi}\left[1-(-1)^n\right] = \begin{cases} \dfrac{4}{n\pi} & n\ \text{impar}\\[4pt] 0 & n\ \text{par}\end{cases}\qquad (a_0 = 0,\ a_n = 0)$ | alta | ✅ |
| `U02-F16` | Serie de Fourier de la onda cuadrada simétrica | $f(t) = \frac{4}{\pi}\left[\mathrm{sen}(\omega_0 t) + \frac{1}{3}\mathrm{sen}(3\omega_0 t) + \frac{1}{5}\mathrm{sen}(5\omega_0 t) + \frac{1}{7}\mathrm{sen}(7\omega_0 t) + \cdots\right] = \frac{4}{\pi}\sum_{n\ \text{impar}} \frac{1}{n}\,\mathrm{sen}(n\omega_0 t)$ | alta | ✅ |
| `U02-F17` | Serie de Fourier compleja (síntesis) | $f(t) = \sum_{n=-\infty}^{+\infty} C_n\,e^{j n \omega_0 t},\qquad \omega_0 = \frac{2\pi}{T}$ | alta | ✅ |
| `U02-F18` | Coeficientes de la serie de Fourier compleja | $C_n = \frac{1}{T}\int_{0}^{T} f(t)\,e^{-j n \omega_0 t}\,dt \qquad n = 0, \pm1, \pm2, \pm3,\ldots$ | alta | ✅ |
| `U02-F19` | Relación entre coeficientes complejos y trigonométricos | $C_0 = \frac{1}{2}a_0;\qquad C_n = \frac{1}{2}\left(a_n + j b_n\right);\qquad C_{-n} = \frac{1}{2}\left(a_n - j b_n\right)$ | baja | ⚠️ |
| `U02-F20` | Coeficientes complejos de la onda cuadrada simétrica | $C_n = -j\,\frac{1}{n\pi}\left[1-(-1)^n\right] = \begin{cases} -j\dfrac{2}{n\pi} & n\ \text{impar}\\[4pt] 0 & n\ \text{par o } n=0\end{cases};\qquad \|C_n\| = \frac{1}{n\pi}\left[1-(-1)^n\right]$ | alta | ✅ |
| `U02-F21` | Coeficientes del tren de pulsos rectangulares (función sinc) | $C_n = A\,\frac{p}{T}\cdot\frac{\mathrm{sen}\!\left(n\omega_0 p/2\right)}{n\omega_0 p/2} = A\,\frac{p}{T}\,\mathrm{sinc}(x),\qquad x = n\omega_0\frac{p}{2} = \frac{n\,2\pi\,p}{2T} = \frac{n\pi p}{T}$ | alta | ✅ |
| `U02-F22` | Función sinc | $\mathrm{sinc}(x) = \frac{\mathrm{sen}(x)}{x}$ | alta | ✅ |
| `U02-F23` | Número de fasores hasta el primer cruce por cero | $n_{\text{fasores}} = \frac{T}{p}$ | alta | ✅ |
| `U02-F24` | Frecuencia del primer cruce por cero del espectro del pulso | $f_{\text{1er cero}} = \frac{1}{p}$ | alta | ✅ |
| `U02-F25` | Transformada de Fourier | $F(\omega) = \int_{-\infty}^{+\infty} f(t)\,e^{-j\omega t}\,dt$ | alta | ✅ |
| `U02-F26` | Transformada inversa de Fourier | $f(t) = \frac{1}{2\pi}\int_{-\infty}^{+\infty} F(\omega)\,e^{j\omega t}\,d\omega$ | alta | ✅ |
| `U02-F27` | Transformada de Fourier del pulso rectangular (en omega) | $F(\omega) = p\,\frac{\mathrm{sen}(\omega p/2)}{\omega p/2}$ | alta | ✅ |
| `U02-F28` | Transformada de Fourier del pulso rectangular (en frecuencia f) | $F(f) = p\,\frac{\mathrm{sen}(\pi p f)}{\pi p f} = p\,\mathrm{sinc}(\pi p f),\qquad \text{con } \frac{\omega p}{2} = \frac{2\pi f p}{2} = \pi p f$ | alta | ✅ |
| `U02-F29` | Densidad espectral (módulo al cuadrado) del pulso rectangular | $\left\|F(f)\right\|^{2} = \left[p\,\frac{\mathrm{sen}(\pi p f)}{\pi p f}\right]^{2}$ | alta | ✅ |
| `U03-F01` | Relación de potencias en decibeles (atenuación / ganancia) | $dB = 10 \log_{10}\left(\frac{P_o}{P_i}\right) \iff \frac{P_o}{P_i} = 10^{\frac{dB}{10}}$ | alta | ✅ |
| `U03-F02` | Pérdida total de un medio con atenuación específica por unidad de longitud | $L_{dB} = \alpha \cdot d$ | alta | ✅ |
| `U03-F03` | Suma algebraica de decibeles en una cadena de transmisión | $dB_{total} = \sum_{i} dB_i$ | alta | ✅ |
| `U03-F04` | Nivel de potencia absoluto en dBm (referido a 1 mW) | $P_{dBm} = 10 \log_{10}\left(\frac{P}{1\,mW}\right) \iff P = 10^{\frac{P_{dBm}}{10}} \times 1\,mW$ | alta | ✅ |
| `U03-F05` | Ganancia (directividad) de antena en dBi | $dBi = 10 \log_{10}\left(\frac{P_{antena}}{P_{isotropica}}\right)$ | alta | ✅ |
| `U03-F06` | Pérdida en el espacio libre (frecuencia en MHz) | $L_0\,[dB] = 32.45 + 20 \log_{10}(f_{MHz}) + 20 \log_{10}(d_{Km})$ | alta | ✅ |
| `U03-F07` | Pérdida en el espacio libre (frecuencia en GHz) | $L_0\,[dB] = 92.44 + 20 \log_{10}(f_{GHz}) + 20 \log_{10}(d_{Km})$ | alta | ✅ |
| `U03-F08` | Balance de enlace / potencia recibida (RSSI) en un radioenlace WiFi | $P_{RX} = P_{TX} + L_{cable} + G_{antena} + L_{espacio\ libre} + G_{antena} + L_{cable}$ | alta | ✅ |
| `U03-F09` | Margen del enlace (RSSI sobre sensibilidad del receptor) | $M\,[dB] = RSSI\,[dBm] - S_{RX}\,[dBm] = 10 \log_{10}\left(\frac{P_{RSSI}}{P_{S_{RX}}}\right)$ | alta | ✅ |
| `U03-F10` | Densidad de potencia de ruido térmico | $N_0 = K \cdot T \quad [W/Hz]$ | alta | ✅ |
| `U03-F11` | Conversión de temperatura de grados Celsius a Kelvin | $T\,[K] = T\,[^{\circ}C] + 273$ | alta | ✅ |
| `U03-F12` | Potencia total de ruido térmico en un ancho de banda | $N = N_0 \cdot B = K \cdot T \cdot B \quad [W]$ | alta | ✅ |
| `U03-F13` | Potencia de ruido térmico expresada en dBm | $N_{dBm} = 10 \log_{10}\left(\frac{K \cdot T \cdot B}{0.001}\right)$ | alta | ✅ |
| `U03-F14` | Relación señal a ruido en veces (lineal) | $SNR = \frac{P_S}{P_N} = \frac{S}{N}$ | alta | ✅ |
| `U03-F15` | Relación señal a ruido en decibeles | $SNR\,[dB] = 10 \log_{10}\left(\frac{S}{N}\right)$ | alta | ✅ |
| `U03-F16` | Factor de ruido (f) | $f = \frac{S_i/N_i}{S_o/N_o}$ | baja | · |
| `U03-F17` | Índice de ruido (factor de ruido en dB) | $NF\,[dB] = 10 \log_{10}(f)$ | baja | · |
| `U04-F01` | Autoinformación (cantidad de información de un evento o símbolo) | $I_A = \log_b\frac{1}{P_A} = -\log_b P_A$ | alta | ✅ |
| `U04-F02` | Información total de un mensaje formado por símbolos independientes | $I_{TOTAL} = \sum_{i=1}^{n} I_i = \sum_{i=1}^{n} \log_2\frac{1}{P_i} = \log_2\frac{1}{P_{TOTAL}}, \quad P_{TOTAL} = \prod_{i=1}^{n} P_i$ | alta | ✅ |
| `U04-F03` | Normalización: la suma de las probabilidades de la fuente vale 1 | $\sum_{i=1}^{N} P_i = 1$ | alta | ✅ |
| `U04-F04` | Información aportada por el símbolo j en una secuencia de L símbolos | $I_{j,L} = L \cdot P_j \cdot I_j = L \cdot P_j \cdot \log_2\frac{1}{P_j}$ | alta | ✅ |
| `U04-F05` | Información total contenida en una secuencia larga de L símbolos | $I_T = L\sum_{j=1}^{N} P_j \log_2\frac{1}{P_j} = L \cdot H$ | alta | ✅ |
| `U04-F06` | Entropía de la fuente (información promedio por símbolo) | $H = \frac{I_T}{L} = \sum_{j=1}^{N} P_j \log_2\frac{1}{P_j} \;\left[\frac{bits}{simbolo}\right]$ | alta | ✅ |
| `U04-F07` | Entropía máxima (fuente con símbolos equiprobables) | $H_{MAX} = \log_2 N \;\left[\frac{bits}{simbolo}\right]$ | alta | ✅ |
| `U04-F08` | Redundancia de una fuente (porcentual) | $Rd\% = \frac{H_{MAX} - H}{H_{MAX}} \times 100$ | alta | ✅ |
| `U04-F09` | Duración promedio del símbolo | $\bar{\sigma} = \sum_{j=1}^{m} P_j \, \sigma_j \;\left[\frac{seg}{simbolo}\right]$ | alta | ⚠️ |
| `U04-F10` | Tasa de información de una fuente discreta | $R = \frac{H}{\bar{\sigma}} \;\left[\frac{bit}{s}\right]$ | alta | ⚠️ |
| `U04-F11` | Velocidad de símbolos (símbolos por segundo) | $r = \frac{1}{\sigma} = \frac{1}{T_S} \;\left[\frac{simbolos}{segundo}\right]$ | alta | ⚠️ |
| `U04-F12` | Tasa de información con símbolos de igual duración | $R = \frac{H}{T_s} = r\,H = r\sum_{j=1}^{N} P_j \log_2\frac{1}{P_j} \;(bps)$ | alta | ✅ |
| `U04-F13` | Tasa de información con símbolos equiprobables e igual duración | $R = r\,H = \frac{1}{T_s}\log_2 N \;(bps)$ | alta | ✅ |
| `U04-F14` | Longitud promedio de la palabra código | $\bar{L} = \sum_{i=1}^{N} P_i L_i \;\left[\frac{digitos}{simbolo}\right]$ | alta | ⚠️ |
| `U04-F15` | Longitud promedio del código a partir de los bits totales transmitidos | $\bar{L} = \frac{B_{total}}{n}$ | media | ⚠️ |
| `U04-F16` | Eficiencia del codificador de fuente | $\eta = \frac{H(x)}{\bar{L}}$ | alta | ⚠️ |
| `U05-F01` | Cantidad de informacion de un simbolo (informacion propia) | $I_i = \log_2\left(\frac{1}{P_i}\right) = -\log_2 P_i$ | alta | ✅ |
| `U05-F02` | Entropia de la fuente H(x) | $H(x) = \sum_{j=1}^{N} P_j \log_2\left(\frac{1}{P_j}\right)$ | alta | ✅ |
| `U05-F03` | Duracion promedio de un simbolo | $\bar{\sigma} = \sum_{j=1}^{m} P_j\,\sigma_j$ | alta | ✅ |
| `U05-F04` | Velocidad de simbolos (tasa de senalizacion) | $r = \frac{1}{\sigma} = \frac{1}{T_S}$ | alta | ⚠️ |
| `U05-F05` | Velocidad de transmision de informacion (velocidad de entropia de la fuente) R | $R = \frac{H}{\bar{\sigma}} = \frac{H}{T_S} = r \times H$ | alta | ✅ |
| `U05-F06` | Velocidad de transmision para simbolos equiprobables | $R = r \times H = \frac{1}{T_S} \times \log_2 N$ | media | ✅ |
| `U05-F07` | Longitud promedio de una palabra codigo | $\bar{L} = \sum_{j=1}^{N} P_j \times L_j$ | alta | ✅ |
| `U05-F08` | Eficiencia de un codificador de fuente | $\eta = \frac{H(x)}{\bar{L}}$ | alta | ✅ |
| `U05-F09` | Probabilidad de un nivel equiprobable | $p = \frac{1}{N}$ | alta | ✅ |
| `U05-F10` | Cantidad de simbolos contenidos en la senal | $m = \frac{T}{T_S}$ | alta | ✅ |
| `U05-F11` | Contenido de informacion de una senal | $I = m \times \log_2\left(\frac{1}{p}\right) = \frac{T}{T_S}\,\log_2 N$ | alta | ✅ |
| `U05-F12` | Bits por simbolo / entropia con simbolos equiprobables | $H = I = \log_2 N$ | alta | ✅ |
| `U05-F13` | Periodo de muestreo | $T_s = \frac{1}{f_s}$ | alta | ⚠️ |
| `U05-F14` | Frecuencia de Nyquist (velocidad minima de muestreo) | $f_{Nyquist} = f_S = 2\,f_{Max}$ | alta | ✅ |
| `U05-F15` | Teorema de Nyquist: capacidad de un canal sin ruido | $C = 2B\,\log_2 M$ | alta | ✅ |
| `U05-F16` | Ancho de banda a partir del espectro del canal | $B = f_{sup} - f_{inf}$ | media | ✅ |
| `U05-F17` | Formula de Shannon: capacidad de un canal con ruido | $C = B\,\log_2\left(1 + \frac{S}{N}\right)$ | alta | ✅ |
| `U05-F18` | Relacion senal a ruido en decibeles | $SNR_{dB} = 10\,\log_{10}(SNR)$ | alta | ✅ |
| `U05-F19` | Eficiencia espectral maxima | $E_{max} = \frac{C}{B} = \log_2\left(1 + \frac{S}{N}\right)$ | alta | ✅ |
| `U05-F20` | Shannon-Hartley: niveles de senal requeridos | $M = \sqrt{1 + SNR}$ | alta | ✅ |
| `U05-F21` | Potencia de senal en funcion de la energia por bit | $S = \frac{E_b}{T_b}$ | alta | ✅ |
| `U05-F22` | Potencia total de ruido a partir de la densidad espectral | $N = N_0\,B$ | alta | ✅ |
| `U05-F23` | Tasa de bit en funcion del tiempo de bit | $R = \frac{1}{T_b}$ | alta | ✅ |
| `U05-F24` | SNR en funcion de Eb/No | $SNR = \frac{S}{N} = \frac{E_b/N_0}{T_b\,B} = \frac{E_b/N_0}{B/C}$ | alta | ✅ |
| `U05-F25` | Relacion Eb/No a partir de la SNR y la eficiencia espectral | $\frac{E_b}{N_0} = \frac{SNR}{E_{max}}$ | alta | ✅ |
| `U06-F01` | Tasa de Errores BER (Bit Error Rate) | $BER = \frac{N_e}{N_t}$ | alta | ✅ |
| `U06-F02` | Bits perdidos ante una rafaga de ruido | $N_{perdidos} = R \cdot t$ | alta | ✅ |
| `U06-F03` | Combinaciones posibles de un codigo binario de N digitos | $M = 2^{N}$ | alta | ✅ |
| `U06-F04` | Distancia de Hamming entre dos palabras | $d_H(x,y) = \sum_{i=1}^{L} [\, x_i \neq y_i \,]$ | alta | ✅ |
| `U06-F05` | Distancia minima de un codigo | $H = \min_{i \neq j} \; d_H(c_i, c_j)$ | alta | ✅ |
| `U06-F06` | Capacidad de deteccion de errores segun la distancia de Hamming | $H = D + 1 \quad \Longleftrightarrow \quad D = H - 1$ | alta | ✅ |
| `U06-F07` | Capacidad de correccion de errores segun la distancia de Hamming | $H = 2C + 1 \quad \Longleftrightarrow \quad C = \frac{H-1}{2}$ | alta | ✅ |
| `U06-F08` | Reparto entre capacidad de deteccion y de correccion (minima distancia de un codigo) | $H - 1 = D + C \quad , \quad D \geq C$ | alta | ✅ |
| `U06-F09` | Cantidad de bits de paridad en la codificacion Hamming | $2^{p} \geq n + p + 1$ | alta | ✅ |
| `U06-F10` | Posicion del bit erroneo (sindrome de Hamming) | $pos = \sum_{i=1}^{p} p_i \cdot 2^{\,i-1}$ | media | ✅ |
| `U06-F11` | Codigo de Redundancia Ciclica (CRC): resto y trama a transmitir | $R(x) = \left[\, x^{r} \cdot M(x) \,\right] \bmod G(x) \quad ; \quad T(x) = x^{r} \cdot M(x) + R(x)$ | media | ✅ |
| `U07-F01` | Número de bits por elemento de señal (bits por símbolo) | $n = \log_2(N)$ | alta | ✅ |
| `U07-F02` | Velocidad de transmisión (tasa de bits) a partir de la tasa de símbolos | $R = r \cdot n$ | alta | ✅ |
| `U07-F03` | Ancho de banda de un canal / señal analógica | $B = \Delta f = f_2 - f_1$ | alta | ✅ |
| `U07-F04` | Bits extra por segundo por desviación del reloj del receptor | $b_{extra} = R \cdot \frac{d}{100}$ | baja | ✅ |
| `U08-F01` | Velocidad de transmisión (tasa binaria) a partir del tiempo de símbolo | $R = \frac{1}{T_S} \cdot \log_2 M$ | alta | ✅ |
| `U08-F02` | Bits por símbolo y cantidad de niveles / símbolos M-arios | $n = \log_2 M \qquad ; \qquad M = 2^{n}$ | alta | ⚠️ |
| `U08-F03` | Ancho de banda / velocidad de modulación M-aria | $B_{M\text{-}ario} = \frac{R}{\log_2 M} = \frac{R}{n}$ | alta | ✅ |
| `U08-F04` | Velocidad de modulación (baudios) a partir del tiempo de símbolo | $r = \frac{1}{T_S}$ | media | ✅ |
| `U08-F05` | Ancho de banda de ASK | $BW_{ASK} = 2B$ | media | ✅ |
| `U08-F06` | Ancho de banda de FSK | $BW_{FSK} = 2B + 2\,\Delta f = 2(\Delta f + B)$ | media | ✅ |
| `U08-F07` | Ancho de banda de PSK | $BW_{PSK} = 2B$ | media | ✅ |
| `U08-F08` | Frecuencias de marca y espacio en FSK | $f_1 = f_P + \Delta f \qquad ; \qquad f_2 = f_P - \Delta f$ | alta | ⚠️ |
| `U08-F09` | Señal portadora sinusoidal | $v_p(t) = V_p \, \mathrm{sen}(2\pi f_p t)$ | alta | ⚠️ |
| `U08-F10` | Cota del número de estados en QAM | $M \le N^{\circ}\ Fases \times N^{\circ}\ Amplitudes$ | alta | ⚠️ |
| `U08-F11` | Relación entre número de estados M y SNR (nQAM adaptativo) | $M = SNR + 1$ | alta | ✅ |
| `U08-F12` | Teorema del muestreo (Nyquist): frecuencia de muestreo mínima | $f_S \ge 2\, f_{MAX}$ | alta | ✅ |
| `U08-F13` | Período de muestreo | $T_S = \frac{1}{f_S}$ | alta | ⚠️ |
| `U08-F14` | Velocidad del canal PCM (velocidad de la señal digitalizada) | $C = f_S \times n$ | alta | ✅ |
| `U08-F15` | Longitud de onda de una portadora óptica (WDM) | $\lambda = \frac{C}{f}$ | media | ✅ |
| `U08-F16` | Cantidad de bits de la trama de salida en TDM sincrónica | $N_{trama} = k \cdot b + s$ | media | ✅ |
| `U08-F17` | Duración de la trama en TDM sincrónica | $T_{trama} = \frac{b}{R_{canal}}$ | media | ✅ |
| `U08-F18` | Tasa de transmisión del enlace en TDM sincrónica | $R_{enlace} = \frac{N_{trama}}{T_{trama}}$ | alta | ✅ |
| `U08-F19` | Duración de un time slot dentro de la trama PCM | $T_{TS} = \frac{T_{trama}}{N_{TS}}$ | alta | ✅ |
| `U08-F20` | Velocidad de la trama E1 a partir de los canales E0 | $R = N_{TS} \times R_{E0}$ | alta | ✅ |
| `U08-F21` | Velocidad de la trama SDH (STM-1) | $R_{STM} = f_{trama} \times (columnas \times filas \times 8)$ | alta | ✅ |
| `U09-F01` | Velocidad de transmisión (tasa binaria) del módem M-ario | $R = \frac{1}{T_S} \log_2 M = B_{M\text{-}ario} \cdot \log_2 M$ | alta | ✅ |
| `U09-F02` | Capacidad de canal de Nyquist (canal sin ruido) | $C = 2B \cdot \log_2 M$ | alta | ✅ |
| `U09-F03` | Capacidad de canal de Shannon (canal con ruido) | $C = B \cdot \log_2 (1 + SNR)$ | alta | ✅ |
| `U09-F04` | Máximo orden de modulación M por portadora (DMT/ADSL) | $M = \sqrt{1 + SNR}$ | alta | ✅ |
| `U09-F05` | Potencia de ruido térmico | $N = K \cdot T \cdot B$ | alta | ✅ |
| `U09-F06` | Relación señal/ruido en decibeles | $SNR_{dB} = 10 \log_{10} (S/N)$ | alta | ✅ |
| `U09-F07` | Bits por símbolo de una modulación M-aria | $n = \log_2 M$ | media | ✅ |
| `U09-F08` | Velocidad máxima teórica de un enlace multiportadora (ADSL/DMT) | $R = N_{canales} \cdot B_{canal} \cdot n$ | media | ✅ |
| `U09-F09` | Ancho de banda de cada subcanal DMT | $B_{canal} = \frac{B_{total}}{N_{canales}}$ | media | ⚠️ |
| `U10-F01` | Tasa de símbolos con codificación de bloque 4B/5B | $R_s = R_b \times \frac{5}{4}$ | alta | ✅ |
| `U10-F02` | Tasa de símbolos con codificación de bloque 8B/10B | $R_s = R_b \times \frac{10}{8}$ | alta | ✅ |
| `U10-F03` | Tasa de símbolos con codificación de bloque 64B/66B | $R_s = R_b \times \frac{66}{64}$ | alta | ✅ |
| `U10-F04` | Tasa de símbolos a partir de los bits por símbolo (modulación multinivel) | $R_s = \frac{R_b}{m}$ | alta | ✅ |
| `U10-F05` | Tasa de símbolos total de un enlace multipar | $R_{s,total} = N_{pares} \times R_{s,par}$ | alta | ⚠️ |
| `U10-F06` | Velocidad binaria por par trenzado | $R_{b,par} = \frac{R_{b,total}}{N_{pares}}$ | media | ✅ |
| `U10-F07` | Ancho de banda de una banda de frecuencias (ISM / Wi-Fi) | $AB = f_{sup} - f_{inf}$ | media | ✅ |
| `U10-F08` | Separación entre subportadoras OFDM (802.11a) | $\Delta f = \frac{BW}{N_{FFT}}$ | media | ✅ |


---

## Unidad 1 — Sistemas de Comunicación

> RESULTADO: la Unidad 1 NO contiene ninguna formula calculable. Devuelvo formulas=[] y ejemplos=[] deliberadamente, no por falta de lectura.

== EVIDENCIA DE LA VERIFICACION ==
Lei las 79 paginas completas y ademas corri controles mecanicos sobre el archivo fuente:
1. Cantidad de signos "=" en todo el archivo (2262 lineas): CERO. No hay una sola igualdad en la unidad.
2. Busqueda de "log", "sqrt", "^", "²", "×", "·": cero coincidencias matematicas (los unicos hits de "log" son la palabra "topologia"/"tecnologia"/"logra").
3. Inventario completo de caracteres no-ASCII del archivo: los unicos simbolos matematicos presentes son lambda (U+03BB, 1 vez), mu (U+03BC, 7 veces, siempre como unidad "μm"), y cuatro caracteres de italica matematica Unicode (U+1D706 lambda + U+1D44E/44F/450 = a,b,c) que forman las etiquetas "λa λb λc" de la PAGINA 61. Esas etiquetas rotulan tres longitudes de onda en el dibujo de multiplexado WDM de fibra monomodo: son rotulos de un diagrama, no una expresion calculable.
4. Busqueda de "Ejemplo", "Ejercicio", "calcular", "resolver", "solucion": cero ejercicios resueltos. Los unicos hits de "ejemplo" son "por ejemplo" en prosa conceptual (paginas 6, 23).

== CONTENIDO REAL DE LA UNIDAD ==
Es una unidad 100% conceptual/descriptiva: objetivos de un sistema de comunicacion, esquema fuente-transmisor-canal-ruido-receptor (p.5-8), criterios de red rendimiento/fiabilidad/seguridad (p.10), tipo de conexion punto a punto y multipunto (p.11), topologias fisicas malla/estrella/bus/anillo (p.12-16), clasificacion geografica LAN/MAN/WAN/PAN/SAN (p.17-22), organismos de normalizacion (p.23-31), modelos OSI y TCP/IP (p.32-41) y medios de transmision guiados y no guiados (p.42-79).

Hay MUCHOS numeros, pero todos son datos tabulados o rangos de especificacion, no formulas. Los excluyo explicitamente segun la consigna:
- p.55: tabla de categorias de par trenzado (Cat 3 = 16 MHz / 16 Mbps ... Cat 7 = 600 MHz / 10 Gbps) y tabla 10BASE-T / 100BASE-TX / 1000BASE-CX / 1000BASE-T con longitudes maximas de segmento.
- p.66: tabla comparativa cobre vs fibra (ancho de banda admitido, distancias 1-100 m vs 1-100.000 m).
- p.68: tabla de atenuacion de fibra optica en dB/km por tipo y ventana (850/1310/1550 nm). Son valores de referencia tabulados; para volverse calculables necesitarian la formula de atenuacion total (A = alfa * L), que NO aparece en esta unidad.
- p.69: tabla comparativa emisores LED vs laser ILD.
- p.72: rangos espectrales. OJO con la transcripcion: el texto crudo dice "entre 3 x 1011 y 2 x 1014Hz" para infrarrojos; son exponentes perdidos por pypdf, en realidad 3x10^11 Hz a 2x10^14 Hz. Igual es un rango de definicion, no una formula.
- p.77: velocidades y bandas de los estandares 802.11 a/b/g/n/ac/ad, 802.15 y 802.16.
Ninguna de estas tablas admite "meter numeros y que salga un numero", asi que ninguna califica como formula.

== CONTROL CRUZADO CON EL DESTILADO PREVIO ==
Lei el cheatsheet y ch01 DESPUES de terminar mi extraccion. El destilado si trae formulas, y NINGUNA de ellas esta en las diapositivas de la Unidad 1. Por consigna NO las incluyo. Las listo para que se sepa de donde NO salen:

A) En "destilado-teoria/chapters/ch01-...md":
   - lambda = v/f (con Ejemplo 1: 340 m/s / 20 kHz = 17 mm; y 3e8 / 2,4 GHz = 12,5 cm).
   - Enlaces de malla completa = N(N-1)/2 y puertos por nodo = N-1 (con Ejemplo 2: N=12 -> 66 enlaces, 11 puertos).
   Verificacion puntual: la PAGINA 13 (topologia malla) de la diapositiva solo dice "Desventajas: se relacionan con la cantidad de cable y el numero de puertos de entrada/salida necesarios". NO da la formula N(N-1)/2 en texto. Podria estar dibujada en la imagen de la lamina, pero no puedo confirmarlo desde el texto extraido, y no la invento.
   Ademas el ch01 discrepa con la diapositiva en dos datos tabulados: dice Cat 6 = 250 MHz y Cat 6A = 500 MHz, mientras la PAGINA 55 dice Cat 6 = 200 MHz y Cat 6E = 500 MHz; y dice 802.11ac hasta 6.9 Gbps mientras la PAGINA 77 dice 1 Gbps. Si la app llegara a mostrar estos valores, la fuente de verdad para esta catedra es la diapositiva.

B) En "destilado practica/cheatsheet.md" (todas ajenas a esta unidad, casi seguro de Unidad 2/3 o de los TPs):
   f = 1/T ; lambda = v/f ; BW = fmax - fmin ; BW ~ 1/tau ; P(dBm) = 10*log10(P(mW)) ; FSPL = 32,44 + 20log10(d_km) + 20log10(f_MHz) ; N = k*T*B (Johnson-Nyquist) ; SNR(dB) = Prx(dBm) - N(dBm) ; C = B*log2(1+SNR) (Shannon).
   El propio destilado lo confirma en su seccion "Connects To": manda el calculo de ancho de banda al Ch 02 y los modelos cuantitativos de atenuacion, decibeles y ruido al Ch 03. Es coherente con que la Unidad 1 sea puramente conceptual.

== RIESGO RESIDUAL / QUE CONVENDRIA REVISAR A MANO ==
pypdf extrae texto pero no lo que esta dibujado dentro de una imagen. Estas paginas quedaron practicamente vacias de texto (solo titulo y pie), o sea que su contenido es 100% grafico y no lo puedo auditar: PAGINAS 35, 38, 39, 58, 63, 64, 75, 76, 78 y 79. Tambien las paginas 33, 34, 37 y 44 son mayormente diagramas/tablas de capas y estandares. Por el tema que tratan (modelo OSI, corte de cable coaxial, tipos de fibra, antenas, familia 802.x) es muy improbable que escondan una formula calculable, pero si aparece una en el PDF original casi seguro estara ahi. Recomiendo una pasada visual sobre esas laminas antes de dar la unidad por cerrada, y en particular sobre la PAGINA 13 por el tema de N(N-1)/2.

CONCLUSION PARA LA APP: la Unidad 1 no aporta ninguna calculadora. Su valor es de teoria/multiple choice. La primera unidad con formulas deberia ser la 2 (señales/Fourier/ancho de banda) y la 3 (atenuacion, dB, ruido, Shannon).

_Sin fórmulas calculables extraídas._


---

## Unidad 2 — Análisis de las Señales (Fourier, filtros)

> RUTA DE LA FUENTE: C:/Users/lautaro/AppData/Local/Temp/claude/C--Users-lautaro-Documents-AppCalculadora/6ff223b4-e711-4edb-a0ad-78b61e3a99eb/scratchpad/unidades/U02.txt (83 páginas, leído completo).

=== 1) ERRATA GRAVE DE LA DIAPOSITIVA (pág. 46) — bug potencial en la app ===
La pág. 46 define C_n = (1/2)(a_n + j*b_n) y C_-n = (1/2)(a_n - j*b_n), PERO en la misma página el desarrollo algebraico que la precede llega a que el coeficiente de e^{+j n w0 t} es (1/2)(a_n - j*b_n). El Ejemplo02 de la propia cátedra (págs. 50-51) confirma la convención estándar: con a_n = 0 y b_n = 4/(n*pi) obtiene C_n = -j*2/(n*pi), lo cual sólo sale de C_n = (1/2)(a_n - j*b_n). Si la app implementa literalmente la línea de la pág. 46 va a dar el conjugado (signo de la parte imaginaria invertido). Recomendación: implementar C_n = (1/2)(a_n - j*b_n), C_-n = (1/2)(a_n + j*b_n), y mostrar una advertencia. Ver U02-F19 (confianza baja).

=== 2) FÓRMULAS DE FILTROS: NO ESTÁN EN EL TEXTO ===
Las págs. 79 a 83 anuncian fórmulas ("La frecuencia de corte se define como aquella para la que el valor óhmico de la resistencia coincide con el valor óhmico de la reactancia", "La ganancia en tensión del filtro será:", "Expresando Gv en función de la frecuencia tendremos que:", "El desfase ... vendrá dado por:") pero las ecuaciones están como IMÁGENES y pypdf no las extrajo. Verifiqué con grep: en todo el archivo NO aparecen las cadenas RC, Xc, arctan, ni ninguna expresión de Gv. Por lo tanto NO incluí fc = 1/(2*pi*R*C), Gv = 1/sqrt(1+(f/fc)^2), Gv_altos = (f/fc)/sqrt(1+(f/fc)^2), ni theta = -arctan(f/fc). Si se quieren en la app hay que re-extraer el PDF original con OCR o pedir la imagen. Lo único calculable que sí está escrito de filtros es conceptual: en fc la ganancia cae de 1 a 0,707 (= -3 dB) (pág. 78) y en filtros de primer orden la ganancia cae -6 dB por octava fuera de la banda de paso (pág. 81); ninguna de las dos se da como ecuación.

=== 3) CONTROL CRUZADO con el destilado previo (cheatsheet.md y ch02) ===
Fórmulas que el destilado trae y que NO están en las diapositivas de U02 (NO las incluí):
- fc = 1/(2*pi*R*C), fc = R/(2*pi*L), Gv = 1/sqrt(1+(f/fc)^2), Gv = (f/fc)/sqrt(1+(f/fc)^2), theta = -arctan(f/fc), -20 dB/década, desfase ±45° en fc, y el "Ejemplo 3: filtro RC con R=1k, C=159nF" completo. Todo esto es material del destilado, no del PDF (ver punto 2).
- |C_n| = (1/2)*sqrt(a_n^2 + b_n^2) — no está en U02.
- C_n = C_-n* (conjugados) — no está en U02.
- BW ≈ 1/tau (ancho de banda de pulso) — no está en U02 (lo más cercano es el primer cruce por cero f = 1/p, que sí está y es U02-F24, pero la diapositiva no lo llama "ancho de banda").
- F(w) = A*p*sinc(w*p/(2*pi)) — el destilado normaliza el argumento; la diapositiva escribe F(w) = p*sen(w*p/2)/(w*p/2) y F(f) = p*sen(pi*p*f)/(pi*p*f). Usar la forma de la diapositiva.
- P(dBm) = 10*log10(P(mW)), FSPL = 32,44 + 20log(d_km) + 20log(f_MHz), N = k*T*B, SNR(dB) = Prx - N, C = B*log2(1+SNR): pertenecen a otras unidades (U01/U03), no aparecen en U02.
- BW_efectivo con umbral de 90%-99% de energía: la diapositiva (págs. 20-21) sólo dice "la mayor parte de la energía" y grafica 100%/50%; no da umbral numérico ni fórmula.
El destilado NO trae ninguna fórmula calculable de U02 que yo haya omitido; al revés, yo extraje varias que el destilado no lista (lambda = v*T, n° de fasores = T/p, |F(f)|^2, exponencial Ce^{st}, la señal compuesta de 3 componentes, ancho de banda absoluto).

=== 4) EJEMPLOS NO CAPTURABLES ===
- Ejemplo05 (pág. 62): pregunta a) si el espectro es de la serie compleja, b) valor de C_0, c) frecuencia fundamental f_0, d) dibujar f(t). Los datos están en un GRÁFICO que no se extrajo; el texto sólo conserva las marcas 1/T, 2/T, 3/T, 4/T de los ejes. No se puede convertir en caso de test sin ver la imagen.
- Ejemplo06 (pág. 63): A = 1, p = 1, T -> infinito. Es un límite conceptual (el espectro discreto C_n se vuelve continuo, el tren se vuelve un pulso único); no tiene resultado numérico.
- Pág. 18: se da la señal f(t) = 15 + 10*sen(2*pi*8*t) + 5*sen(2*pi*16*t) como ilustración de señal compuesta, pero sin pregunta ni resultado. Sirve como entrada de test para U02-F09 (componente continua 15, armónicas de 8 Hz y 16 Hz).
- Pág. 68: contiene código MATLAB del Ejemplo07 (heaviside(t+a)-heaviside(t-a), fourier(), a_val = 0.5, o sea p = 1). Útil como verificación cruzada, no como fórmula.

=== 5) TRAMPAS DE TRANSCRIPCIÓN QUE RESOLVÍ ===
- Fracciones partidas en dos líneas: "2π \n T" = 2*pi/T (no 2*pi*T); "4 \n nπ" = 4/(n*pi); "1 \n 2 a0" = (1/2)*a_0; "A p \n T" = A*p/T; "2 \n T ∫" = (2/T)*∫. Todas reconstruidas y verificadas contra los resultados numéricos de los Ejemplos 01, 02 y 04.
- Límites de integral partidos: "න \n −T \n 2 \n T \n 2" = integral de -T/2 a T/2.
- Pág. 55 llega muy dañada ("sen π = 0 Cn = 0π π π n = T/p π"); reconstruí n = T/p y lo validé contra la pág. 61 ("n° de fasores = T/p"), que está limpia.
- Pág. 51 escribe e^{i n w0 t} (con i) mientras el resto usa j; es la misma unidad imaginaria.
- Pág. 43 escribe b_n como una sumatoria (b_n = suma desde n=1 a inf de 4/(n*pi)); es un abuso de notación de la diapositiva: b_n es el término individual, no la suma.
- Pág. 52 "como -j = 1" significa "como |-j| = 1", de ahí |C_n| = (1/(n*pi))[1-(-1)^n].
- Pie de página "UNIDAD 2: Análisis de Señales UTN-FRT – ISI – COMUNICACIÓN DE DATOS <n>" ignorado en todas las páginas.

=== 6) CONVENCIÓN DE sinc EN ESTA CÁTEDRA (crítico para la app) ===
La cátedra usa sinc NO normalizada: sinc(x) = sen(x)/x con x en RADIANES. Cuidado: en la pág. 69 escribe "F(f) = p*sinc(pi*p*f)", donde el pi ya va dentro del argumento. Si la app usa la sinc normalizada de numpy (numpy.sinc(x) = sen(pi*x)/(pi*x)) los resultados van a diferir por un factor pi en el argumento. Todos los ejemplos de la pág. 56-60 y 66-70 fueron verificados numéricamente con la convención sen(x)/x y coinciden.

=== 7) PÁGINAS SIN NADA CALCULABLE ===
Págs. 1-12 (clasificación de señales: continuas/discretas, analógicas/digitales, determinísticas/aleatorias, periódicas/aperiódicas — sólo condiciones de periodicidad f(t)=f(t±nT) y x[n]=x[n±mN], que son definiciones, no cálculos), 20-24 (ancho de banda efectivo, banda ISM, IEEE 802.11 — gráficos y tablas de estándares), 26 (condiciones de Dirichlet — criterio cualitativo, lo puse como "condiciones" de U02-F11), 53 (comparativa serie trigonométrica vs compleja), 71-78 (definición y clasificación de filtros: pasivos/activos, pasa bajos/altos/banda/rechaza banda, orden del filtro), 83 (filtro pasa alto, sólo circuito).

### `U02-F01` · Señal exponencial (real y compleja) ✅

$$x(t) = C e^{st},\ \ C = A \pm jB,\ \ s = \sigma \pm j\omega \ \Rightarrow\ \text{real (}B=0,\omega=0\text{): } x(t)=A e^{\sigma t};\ \ \text{compleja (}B=0,\sigma=0\text{): } x(t)=A e^{\pm j\omega t}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $x(t)$ | valor de la señal en el instante t | unidad de la señal (V, A, etc.) |
| $A$ | parte real de la constante C (amplitud) | unidad de la señal (V) |
| $B$ | parte imaginaria de la constante C | unidad de la señal (V) |
| $sigma$ | parte real de s: factor de crecimiento/decaimiento exponencial | 1/s (Np/s) |
| $omega$ | parte imaginaria de s: frecuencia angular | rad/s |
| $t$ | tiempo | s |
| $e$ | número de Euler = 2,718281828 | adimensional |

**Condiciones:** Caso real requiere B=0 y omega=0. Caso complejo requiere B=0 y sigma=0. Con sigma<0 la exponencial real decae; con sigma>0 crece. Para despejar sigma o t hace falta A != 0 y x(t)/A > 0.

**Despejable para:** x(t), A, sigma, t

**Confianza:** alta · **Página(s):** 13, 14

### `U02-F02` · Relación de Euler ✅

$$e^{\pm j\theta} = \cos\theta \pm j\,\mathrm{sen}\,\theta;\quad \cos\theta = \tfrac{1}{2}\left(e^{j\theta}+e^{-j\theta}\right);\quad \mathrm{sen}\,\theta = \tfrac{1}{2j}\left(e^{j\theta}-e^{-j\theta}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $theta$ | ángulo (típicamente theta = omega*t o theta = n*omega_0*t) | rad |
| $j$ | unidad imaginaria | adimensional |

**Condiciones:** theta SIEMPRE en radianes. Las diapositivas la aplican con theta = n*omega_0*t; también usan 1/j = -j (pág. 46).

**Confianza:** alta · **Página(s):** 14, 45, 49, 50

### `U02-F03` · Longitud de onda a partir de la frecuencia ✅

$$v = \lambda \cdot f \ \Rightarrow\ \lambda = \frac{v}{f}\quad\left(\text{en espacio libre } v=c=3\times10^{8}\,\mathrm{m/s}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $lambda$ | longitud de onda | m |
| $v$ | velocidad de propagación en el medio (c = 3x10^8 m/s en espacio libre) | m/s |
| $f$ | frecuencia de la señal | Hz (1/s) |

**Condiciones:** La frecuencia debe convertirse a Hz antes de dividir (20 kHz = 20.000 Hz; 2,4 GHz = 2,4x10^9 Hz), si no el resultado sale en la escala equivocada. v depende del medio: 340 m/s para sonido en aire, c = 3x10^8 m/s en espacio libre. No usar c si el medio no es el vacío/aire.

**Despejable para:** lambda, v, f

**Confianza:** alta · **Página(s):** 15

### `U02-F04` · Longitud de onda a partir del período ✅

$$\lambda = v\,T$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $lambda$ | longitud de onda | m |
| $v$ | velocidad de propagación en el medio | m/s |
| $T$ | período de la señal | s |

**Condiciones:** Equivalente a U02-F03 con T = 1/f. T en segundos (no ms ni us).

**Despejable para:** lambda, v, T

**Confianza:** alta · **Página(s):** 15

### `U02-F05` · Frecuencia angular ✅

$$\omega = 2\pi f$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $omega$ | frecuencia angular (pulsación) | rad/s |
| $f$ | frecuencia | Hz |

**Condiciones:** f en Hz. El resultado queda en rad/s, no en Hz: no confundir omega con f al graficar espectros.

**Despejable para:** omega, f

**Confianza:** alta · **Página(s):** 16, 25, 27

### `U02-F06` · Frecuencia angular fundamental ✅

$$\omega_0 = 2\pi f_0 = \frac{2\pi}{T_0} \ \left(\text{o simplemente } \omega_0 = \frac{2\pi}{T}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $omega_0$ | frecuencia angular fundamental | rad/s |
| $f_0$ | frecuencia fundamental | Hz |
| $T$ | período fundamental (T_0) de la señal periódica | s |

**Condiciones:** Sólo para señales periódicas. T es el período fundamental (menor período positivo). En la fuente aparece con las fracciones partidas en dos líneas ('2π' arriba, 'T' abajo): la reconstrucción correcta es 2π/T, no 2πT.

**Despejable para:** omega_0, f_0, T

**Confianza:** alta · **Página(s):** 16, 25, 27, 28, 46, 47, 64

### `U02-F07` · Frecuencia fundamental y armónicos ✅

$$f_0 = \frac{1}{T};\quad \omega_n = n\,\omega_0;\quad f_n = n\,f_0$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f_0$ | frecuencia fundamental (primera armónica) | Hz |
| $T$ | período fundamental | s |
| $n$ | orden de la armónica (entero >= 1) | adimensional |
| $f_n$ | frecuencia de la n-ésima armónica | Hz |
| $omega_n$ | frecuencia angular de la n-ésima armónica | rad/s |

**Condiciones:** Sólo para señales periódicas. n entero positivo. La primera armónica (n=1) es la componente fundamental y tiene el mismo período T que f(t).

**Despejable para:** f_0, T, f_n, n, omega_n

**Confianza:** media — La diapositiva NO escribe literalmente 'f_0 = 1/T'; lo dice en palabras en la pág. 61 ('las armónicas tienen una frecuencia múltiplo de la fundamental 1/T') y se deduce sin ambigüedad de omega_0 = 2*pi*f_0 = 2*pi/T (págs. 25 y 27). La relación omega_n = n*omega_0 sí está escrita explícita (pág. 27). · **Página(s):** 25, 27, 61

### `U02-F08` · Señal periódica simple (senoidal) ✅

$$f(t) = A\,\mathrm{sen}(\omega t + \theta) = A\,\mathrm{sen}(2\pi f t + \theta)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f(t)$ | valor instantáneo de la señal | unidad de la señal (V) |
| $A$ | amplitud pico | V (unidad de la señal) |
| $omega$ | frecuencia angular | rad/s |
| $f$ | frecuencia | Hz |
| $t$ | tiempo | s |
| $theta$ | fase inicial | rad |

**Condiciones:** theta en radianes. Los símbolos f (frecuencia) y f(t) (función) se escriben igual en la diapositiva: no confundirlos. No se pueden despejar limpiamente t, f ni theta porque quedan dentro del seno (el arcoseno es multivaluado).

**Despejable para:** f(t), A

**Confianza:** alta · **Página(s):** 16

### `U02-F09` · Señal periódica compuesta (suma de senoidales) ✅

$$f(t) = A\,\mathrm{sen}(2\pi f_1 t) + B\,\mathrm{sen}(2\pi f_2 t) + C\,\mathrm{sen}(2\pi f_3 t)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f(t)$ | valor instantáneo de la señal compuesta | V (unidad de la señal) |
| $A$ | amplitud de la primera componente | V |
| $B$ | amplitud de la segunda componente | V |
| $C$ | amplitud de la tercera componente | V |
| $f_1$ | frecuencia de la primera componente | Hz |
| $f_2$ | frecuencia de la segunda componente | Hz |
| $f_3$ | frecuencia de la tercera componente | Hz |
| $t$ | tiempo | s |

**Condiciones:** La diapositiva muestra además el caso armónico f(t) = A sen(2*pi*f*t) + B sen(2*pi*3f*t) + C sen(2*pi*9f*t) = A sen(wt) + B sen(3wt) + C sen(9wt), es decir f_2 = 3*f_1 y f_3 = 9*f_1. La señal resultante sólo es periódica si las frecuencias son múltiplos enteros de una fundamental común. Se puede agregar una componente continua (ver ejemplo de pág. 18).

**Despejable para:** f(t), A, B, C

**Confianza:** alta · **Página(s):** 17, 18

### `U02-F10` · Ancho de banda absoluto ✅

$$BW_{abs} = f_{max} - f_{min}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $BW_abs$ | ancho de banda absoluto de la señal | Hz |
| $f_max$ | frecuencia más alta contenida en la señal compuesta | Hz |
| $f_min$ | frecuencia más baja contenida en la señal compuesta | Hz |

**Condiciones:** Aplica a señales compuestas con espectro de extensión finita. Distinto del ANCHO DE BANDA EFECTIVO (págs. 20-21), que es el rango que contiene la mayor parte de la energía y para el cual la cátedra NO da fórmula.

**Despejable para:** BW_abs, f_max, f_min

**Confianza:** media — La diapositiva lo enuncia en palabras ('Es la diferencia entre la más alta y la más baja frecuencia que contiene una señal compuesta. Se mide en Hz') pero NO escribe la ecuación. La transcripción a BW = f_max - f_min es directa e inequívoca, pero no es texto literal de la fuente. · **Página(s):** 19

### `U02-F11` · Serie de Fourier trigonométrica (síntesis) ✅

$$f(t) = \frac{1}{2}a_0 + \sum_{n=1}^{\infty} a_n \cos(n\omega_0 t) + \sum_{n=1}^{\infty} b_n\,\mathrm{sen}(n\omega_0 t)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f(t)$ | valor reconstruido de la señal periódica | V (unidad de la señal) |
| $a_0$ | coeficiente constante (el término de continua vale a_0/2) | V |
| $a_n$ | amplitud del coseno de la n-ésima armónica | V |
| $b_n$ | amplitud del seno de la n-ésima armónica | V |
| $n$ | orden de la armónica (entero >= 1) | adimensional |
| $omega_0$ | frecuencia angular fundamental = 2*pi/T | rad/s |
| $t$ | tiempo | s |

**Condiciones:** Sólo para f(t) PERIÓDICA de período T que cumpla las condiciones de Dirichlet (pág. 26): periódica de período T; número finito de máximos y mínimos en un período; número finito de discontinuidades finitas en un período (ninguna infinita); f(t) y f'(t) seccionalmente continuas; absolutamente integrable en un período (integral de |f(t)| sobre T < infinito). OJO con el factor 1/2 del término constante: la diapositiva escribe (1/2)a_0, no a_0. En la práctica se trunca la serie a N armónicas (señal truncada, págs. 42-43).

**Despejable para:** f(t)

**Confianza:** alta · **Página(s):** 25, 26, 28, 33, 45

### `U02-F12` · Coeficiente a_0 de la serie trigonométrica ✅

$$a_0 = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\,dt$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $a_0$ | coeficiente constante (doble del valor medio de f(t)) | V (unidad de la señal) |
| $T$ | período fundamental | s |
| $f(t)$ | función periódica a desarrollar | V |
| $t$ | variable de integración (tiempo) | s |

**Condiciones:** Requiere una expresión analítica de f(t) en un período: no es un cálculo puramente numérico. Límites -T/2 a T/2 (en la fuente aparecen partidos en varias líneas: '-T' sobre '2' y 'T' sobre '2'). Con f(t) de simetría impar (como la onda cuadrada del Ejemplo01) a_0 = 0.

**Despejable para:** a_0

**Confianza:** alta · **Página(s):** 28, 29

### `U02-F13` · Coeficiente a_n de la serie trigonométrica ✅

$$a_n = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\cos(n\omega_0 t)\,dt$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $a_n$ | amplitud del coseno de la n-ésima armónica | V (unidad de la señal) |
| $T$ | período fundamental | s |
| $n$ | orden de la armónica (entero >= 1) | adimensional |
| $omega_0$ | frecuencia angular fundamental = 2*pi/T | rad/s |
| $f(t)$ | función periódica a desarrollar | V |

**Condiciones:** Requiere expresión analítica de f(t). Si f(t) es impar (f(-t) = -f(t)), todos los a_n = 0. Al evaluar los límites, n*omega_0*t = n*(2*pi/T)*t vale -n*pi en t = -T/2 y +n*pi en t = +T/2 (pág. 30).

**Despejable para:** a_n

**Confianza:** alta · **Página(s):** 28, 30

### `U02-F14` · Coeficiente b_n de la serie trigonométrica ✅

$$b_n = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\,\mathrm{sen}(n\omega_0 t)\,dt$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $b_n$ | amplitud del seno de la n-ésima armónica | V (unidad de la señal) |
| $T$ | período fundamental | s |
| $n$ | orden de la armónica (entero >= 1) | adimensional |
| $omega_0$ | frecuencia angular fundamental = 2*pi/T | rad/s |
| $f(t)$ | función periódica a desarrollar | V |

**Condiciones:** Requiere expresión analítica de f(t). Si f(t) es par, todos los b_n = 0. Identidad auxiliar usada en la fuente (pág. 32): 2/(n*omega_0*T) = 2/(n*(2*pi/T)*T) = 1/(n*pi).

**Despejable para:** b_n

**Confianza:** alta · **Página(s):** 28, 31

### `U02-F15` · Coeficientes b_n de la onda cuadrada simétrica de amplitud 1 ✅

$$b_n = \frac{2}{n\pi}\left[1-(-1)^n\right] = \begin{cases} \dfrac{4}{n\pi} & n\ \text{impar}\\[4pt] 0 & n\ \text{par}\end{cases}\qquad (a_0 = 0,\ a_n = 0)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $b_n$ | amplitud del seno de la n-ésima armónica de la onda cuadrada | adimensional (la onda vale +-1) |
| $n$ | orden de la armónica (entero >= 1) | adimensional |

**Condiciones:** Válido SÓLO para la onda cuadrada simétrica de amplitud +-1 y valor medio nulo definida como f(t) = -1 para -T/2<t<0 y f(t) = +1 para 0<t<T/2. Es independiente de T. Para otra amplitud A se multiplica por A. Despejar n sólo tiene sentido con n impar: n = 4/(pi*b_n). La pág. 43 escribe b_n como una sumatoria ('b_n = suma de 4/(n*pi)'), lo cual es un abuso de notación de la diapositiva: b_n es el término, no la suma.

**Despejable para:** b_n, n

**Confianza:** alta · **Página(s):** 32, 43, 44

### `U02-F16` · Serie de Fourier de la onda cuadrada simétrica ✅

$$f(t) = \frac{4}{\pi}\left[\mathrm{sen}(\omega_0 t) + \frac{1}{3}\mathrm{sen}(3\omega_0 t) + \frac{1}{5}\mathrm{sen}(5\omega_0 t) + \frac{1}{7}\mathrm{sen}(7\omega_0 t) + \cdots\right] = \frac{4}{\pi}\sum_{n\ \text{impar}} \frac{1}{n}\,\mathrm{sen}(n\omega_0 t)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f(t)$ | onda cuadrada reconstruida | adimensional (+-1) |
| $omega_0$ | frecuencia angular fundamental = 2*pi/T | rad/s |
| $t$ | tiempo | s |
| $n$ | orden de la armónica, sólo impares | adimensional |

**Condiciones:** Sólo armónicas IMPARES. Al truncar la serie a N armónicas se obtiene la 'señal truncada' con rizado/redondeo de flancos (págs. 42-43); la diapositiva grafica N = 1, 2, 3, 4, 7, 13, 49 y 99 términos. Para amplitud A distinta de 1 multiplicar todo por A.

**Despejable para:** f(t)

**Confianza:** alta · **Página(s):** 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 52

### `U02-F17` · Serie de Fourier compleja (síntesis) ✅

$$f(t) = \sum_{n=-\infty}^{+\infty} C_n\,e^{j n \omega_0 t},\qquad \omega_0 = \frac{2\pi}{T}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f(t)$ | valor reconstruido de la señal periódica | V (unidad de la señal) |
| $C_n$ | coeficiente espectral complejo de orden n | V (unidad de la señal) |
| $n$ | orden del fasor: 0, +-1, +-2, +-3, ... | adimensional |
| $omega_0$ | frecuencia angular fundamental | rad/s |
| $t$ | tiempo | s |

**Condiciones:** Sólo para f(t) periódica que cumpla Dirichlet. n recorre enteros NEGATIVOS y positivos (espectro bilateral); las armónicas de frecuencia negativa son un resultado matemático sin significado físico (pág. 61). C_0 es la componente continua. En la pág. 51 la fuente escribe e^{i n w0 t} (i en vez de j): es la misma unidad imaginaria.

**Despejable para:** f(t)

**Confianza:** alta · **Página(s):** 46, 47, 51, 64

### `U02-F18` · Coeficientes de la serie de Fourier compleja ✅

$$C_n = \frac{1}{T}\int_{0}^{T} f(t)\,e^{-j n \omega_0 t}\,dt \qquad n = 0, \pm1, \pm2, \pm3,\ldots$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C_n$ | coeficiente espectral complejo de orden n | V (unidad de la señal) |
| $T$ | período fundamental | s |
| $n$ | orden del coeficiente (entero, positivo o negativo) | adimensional |
| $omega_0$ | frecuencia angular fundamental = 2*pi/T | rad/s |
| $f(t)$ | función periódica a desarrollar | V |

**Condiciones:** Requiere expresión analítica de f(t): no es un cálculo puramente numérico. La cátedra usa DOS juegos de límites equivalentes: de 0 a T (págs. 46, 47, 48, 64) y de -T/2 a T/2 (pág. 54); ambos cubren un período completo y dan el mismo resultado. Ojo con el signo NEGATIVO del exponente (el de la síntesis U02-F17 es positivo).

**Despejable para:** C_n

**Confianza:** alta · **Página(s):** 46, 47, 48, 54, 64

### `U02-F19` · Relación entre coeficientes complejos y trigonométricos ⚠️

$$C_0 = \frac{1}{2}a_0;\qquad C_n = \frac{1}{2}\left(a_n + j b_n\right);\qquad C_{-n} = \frac{1}{2}\left(a_n - j b_n\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C_0$ | componente continua del espectro complejo | V (unidad de la señal) |
| $C_n$ | coeficiente complejo de orden +n | V |
| $C_-n$ | coeficiente complejo de orden -n | V |
| $a_0$ | coeficiente constante de la serie trigonométrica | V |
| $a_n$ | amplitud del coseno de la n-ésima armónica | V |
| $b_n$ | amplitud del seno de la n-ésima armónica | V |

**Condiciones:** Sólo para señales periódicas desarrolladas en ambas formas de la serie. Ver nota de confianza: los signos de C_n y C_-n aparecen intercambiados en la fuente.

**Despejable para:** C_0, a_0, C_n, C_-n, a_n, b_n

**Confianza:** baja — LA DIAPOSITIVA SE CONTRADICE A SÍ MISMA Y NO DEBE IMPLEMENTARSE TAL CUAL. En la MISMA pág. 46 el desarrollo algebraico previo llega a f(t) = (1/2)a_0 + suma[ (1/2)(a_n - j*b_n) e^{+j n w0 t} + (1/2)(a_n + j*b_n) e^{-j n w0 t} ], de donde el coeficiente que multiplica a e^{+j n w0 t} (o sea C_n por definición) es (1/2)(a_n - j*b_n). Pero la línea de definición escribe C_n = (1/2)(a_n + j*b_n) y C_-n = (1/2)(a_n - j*b_n), es decir con los signos INVERTIDOS. El propio Ejemplo02 de la cátedra confirma la convención estándar: para la onda cuadrada a_n = 0 y b_n = 4/(n*pi) (n impar), y obtiene C_n = -j*2/(n*pi) (pág. 51), lo que sólo se cumple con C_n = (1/2)(a_n - j*b_n). Recomendación para la app: usar C_n = (1/2)(a_n - j*b_n) y C_-n = (1/2)(a_n + j*b_n), y advertir al alumno de la errata de la diapositiva. C_0 = a_0/2 sí es correcto. · **Página(s):** 46

> [!WARNING]
> **Observación de verificación (rompe-el-calculo)**  
> El campo expresion_latex reproduce LITERALMENTE la errata de la diapositiva 46: C_n = (1/2)(a_n + j b_n) y C_-n = (1/2)(a_n - j b_n). Verifiqué contra la fuente y confirmo que la errata existe en la lámina, pero también confirmo que la lámina se contradice sola: en la MISMA pág. 46 el desarrollo previo es f(t) = (1/2)a_0 + Σ[ (1/2)(a_n − j b_n) e^{+jnω0t} + (1/2)(a_n + j b_n) e^{−jnω0t} ], de donde el coeficiente de e^{+jnω0t} (o sea C_n) es (1/2)(a_n − j b_n). Contrastado además con el Ejemplo02 de la cátedra: pág. 32 da a_n = 0 y b_n = 4/(nπ) (n impar), y pág. 50-51 obtiene C_1 = −j·2/π, C_3 = −j·2/(3π), C_−1 = +j·2/π. Con la línea de definición de la pág. 46 saldría C_1 = +j·2/π, es decir el CONJUGADO. Como la app consume expresion_latex, tal cual está va a invertir el signo de la parte imaginaria de todo espectro complejo (y con él el desfasaje de cada armónica). La nota_confianza del extractor es correcta y detallada, pero la corrección tiene que estar en el campo que se ejecuta, no sólo en el comentario.  
> 
> **Corrección propuesta:** expresion_latex := "C_0 = \\frac{1}{2}a_0;\\qquad C_n = \\frac{1}{2}\\left(a_n - j b_n\\right);\\qquad C_{-n} = \\frac{1}{2}\\left(a_n + j b_n\\right)" — y dejar la forma literal de la diapositiva sólo como advertencia visible al alumno ('la lámina 46 los escribe intercambiados'). C_0 = a_0/2 queda igual.

### `U02-F20` · Coeficientes complejos de la onda cuadrada simétrica ✅

$$C_n = -j\,\frac{1}{n\pi}\left[1-(-1)^n\right] = \begin{cases} -j\dfrac{2}{n\pi} & n\ \text{impar}\\[4pt] 0 & n\ \text{par o } n=0\end{cases};\qquad |C_n| = \frac{1}{n\pi}\left[1-(-1)^n\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C_n$ | coeficiente complejo de orden n (imaginario puro) | adimensional (la onda vale +-1) |
| $n$ | orden del coeficiente (entero, positivo o negativo) | adimensional |

**Condiciones:** Válido SÓLO para la onda cuadrada simétrica de amplitud +-1 definida como f(t) = -1 para -T/2<t<0 y f(t) = +1 para 0<t<T/2. Los coeficientes son IMAGINARIOS PUROS. Es independiente de T. El módulo sale de |−j| = 1 (pág. 52). Signos: C_n negativo-imaginario para n>0 impar, C_-n positivo-imaginario. C_0 = 0 (valor medio nulo).

**Despejable para:** C_n

**Confianza:** alta · **Página(s):** 50, 51, 52

### `U02-F21` · Coeficientes del tren de pulsos rectangulares (función sinc) ✅

$$C_n = A\,\frac{p}{T}\cdot\frac{\mathrm{sen}\!\left(n\omega_0 p/2\right)}{n\omega_0 p/2} = A\,\frac{p}{T}\,\mathrm{sinc}(x),\qquad x = n\omega_0\frac{p}{2} = \frac{n\,2\pi\,p}{2T} = \frac{n\pi p}{T}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C_n$ | coeficiente espectral de orden n del tren de pulsos | V (misma unidad que A) |
| $A$ | amplitud del pulso | V (unidad de la señal) |
| $p$ | ancho (duración) del pulso | s |
| $T$ | período de repetición del tren de pulsos | s |
| $n$ | orden de la armónica (entero, positivo o negativo) | adimensional |
| $omega_0$ | frecuencia angular fundamental = 2*pi/T | rad/s |
| $x$ | argumento de la función sinc, x = n*pi*p/T | rad |

**Condiciones:** Tren PERIÓDICO de pulsos rectangulares de amplitud A, ancho p, período T, centrado en t=0 (f(t)=A para |t|<p/2, 0 para |t|>p/2). El argumento del seno está en RADIANES. Para n=0 el cociente sen(x)/x vale 1, luego C_0 = A*p/T (ciclo de trabajo por amplitud). C_n = 0 cuando x es múltiplo entero de pi, es decir n = k*T/p. Las amplitudes negativas significan desfasaje de 180 grados (pág. 61). No se pueden despejar p ni T en forma cerrada porque aparecen a la vez en el factor A*p/T y dentro del sinc.

**Despejable para:** C_n, A

**Confianza:** alta · **Página(s):** 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 66

### `U02-F22` · Función sinc ✅

$$\mathrm{sinc}(x) = \frac{\mathrm{sen}(x)}{x}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $x$ | argumento de la función | rad |
| $sinc(x)$ | valor de la función sinc | adimensional |

**Condiciones:** La cátedra usa la sinc NO NORMALIZADA: sinc(x) = sen(x)/x con x en radianes (NO sen(pi*x)/(pi*x)). Atención: en la pág. 69 escribe 'F(f) = p*sinc(pi*p*f)', o sea con el argumento ya multiplicado por pi. sinc(0) = 1 por límite. Ceros en x = k*pi (k entero distinto de 0).

**Despejable para:** sinc(x)

**Confianza:** alta · **Página(s):** 55, 69

### `U02-F23` · Número de fasores hasta el primer cruce por cero ✅

$$n_{\text{fasores}} = \frac{T}{p}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $n_fasores$ | orden de la armónica del primer cruce por cero del espectro (equivale a la cantidad de fasores del lóbulo principal) | adimensional |
| $T$ | período del tren de pulsos | s |
| $p$ | ancho del pulso | s |

**Condiciones:** Aplica al tren de pulsos rectangulares de U02-F21. T y p deben estar en la MISMA unidad (el cociente es adimensional). Es donde C_n se anula por primera vez.

**Despejable para:** n_fasores, T, p

**Confianza:** alta — El texto de la pág. 55 llega mal extraído por pypdf ('sen pi = 0 Cn = 0 pi pi pi n = T/p pi'), pero la derivación es reconstruible: n*omega_0*p/2 = pi  =>  n*2*pi*p/(2T) = pi  =>  n*p/T = 1  =>  n = T/p. La pág. 61 lo confirma en limpio: 'n° de fasores = T/p'. · **Página(s):** 55, 61

### `U02-F24` · Frecuencia del primer cruce por cero del espectro del pulso ✅

$$f_{\text{1er cero}} = \frac{1}{p}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f_1er cero$ | frecuencia del primer cruce por cero de la envolvente sinc | Hz |
| $p$ | ancho (duración) del pulso | s |

**Condiciones:** Vale tanto para el tren de pulsos periódico (envolvente de C_n) como para el pulso aislado (transformada F(f)). Los ceros sucesivos están en f = k/p con k entero distinto de 0 (págs. 69-70). p en segundos da f en Hz; si p está en microsegundos el resultado sale en MHz.

**Despejable para:** f_1er cero, p

**Confianza:** alta · **Página(s):** 61, 69, 70

### `U02-F25` · Transformada de Fourier ✅

$$F(\omega) = \int_{-\infty}^{+\infty} f(t)\,e^{-j\omega t}\,dt$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $F(omega)$ | espectro continuo de la señal (dominio de la frecuencia) | V*s (unidad de la señal por segundo) |
| $f(t)$ | señal en el dominio del tiempo | V |
| $omega$ | frecuencia angular (variable continua) | rad/s |
| $t$ | tiempo | s |

**Condiciones:** Para señales APERIÓDICAS (pulso aislado); es el límite de la serie compleja cuando T tiende a infinito, con n*omega_0 -> omega y omega_0 -> d(omega). El espectro resultante es CONTINUO en frecuencia (a diferencia del espectro discreto de la serie). Requiere expresión analítica de f(t).

**Despejable para:** F(omega)

**Confianza:** alta · **Página(s):** 64, 65, 66

### `U02-F26` · Transformada inversa de Fourier ✅

$$f(t) = \frac{1}{2\pi}\int_{-\infty}^{+\infty} F(\omega)\,e^{j\omega t}\,d\omega$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f(t)$ | señal recuperada en el dominio del tiempo | V |
| $F(omega)$ | espectro continuo de la señal | V*s |
| $omega$ | frecuencia angular | rad/s |
| $t$ | tiempo | s |

**Condiciones:** El factor 1/(2*pi) va en la ANTItransformada (convención de la cátedra, con omega en rad/s). Exponente POSITIVO (el de la directa es negativo).

**Despejable para:** f(t)

**Confianza:** alta · **Página(s):** 64, 65

### `U02-F27` · Transformada de Fourier del pulso rectangular (en omega) ✅

$$F(\omega) = p\,\frac{\mathrm{sen}(\omega p/2)}{\omega p/2}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $F(omega)$ | espectro del pulso rectangular | s (para pulso de amplitud unitaria); V*s si la amplitud es A voltios |
| $p$ | ancho (duración) del pulso | s |
| $omega$ | frecuencia angular | rad/s |

**Condiciones:** Pulso rectangular AISLADO (aperiódico) de AMPLITUD 1 centrado en el origen: f(t) = 1 para |t| < p/2, 0 para |t| > p/2. Para amplitud A multiplicar por A. Argumento en radianes. F(0) = p. Primer cero en omega*p/2 = pi, es decir omega = 2*pi/p (con p=1 queda omega = 2*pi, pág. 67). No confundir con U02-F21 (C_n), que es la versión PERIÓDICA y lleva el factor adicional 1/T.

**Despejable para:** F(omega)

**Confianza:** alta · **Página(s):** 66, 67, 69

### `U02-F28` · Transformada de Fourier del pulso rectangular (en frecuencia f) ✅

$$F(f) = p\,\frac{\mathrm{sen}(\pi p f)}{\pi p f} = p\,\mathrm{sinc}(\pi p f),\qquad \text{con } \frac{\omega p}{2} = \frac{2\pi f p}{2} = \pi p f$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $F(f)$ | espectro del pulso rectangular en función de la frecuencia f | s (pulso de amplitud unitaria); V*s si la amplitud es A voltios |
| $p$ | ancho (duración) del pulso | s |
| $f$ | frecuencia | Hz |

**Condiciones:** Misma hipótesis que U02-F27 (pulso aislado de amplitud 1, f(t)=1 para |t|<p/2). Es la MISMA función expresada en f en vez de omega, usando omega = 2*pi*f. Ceros en f = +-1/p, +-2/p, +-3/p, ... F(0) = p. Ojo: aquí 'sinc' significa sen(argumento)/argumento con el argumento ya igual a pi*p*f.

**Despejable para:** F(f)

**Confianza:** alta · **Página(s):** 69, 70

### `U02-F29` · Densidad espectral (módulo al cuadrado) del pulso rectangular ✅

$$\left|F(f)\right|^{2} = \left[p\,\frac{\mathrm{sen}(\pi p f)}{\pi p f}\right]^{2}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $|F(f)|^2$ | módulo al cuadrado del espectro del pulso (proporcional a la densidad de energía) | s^2 (pulso de amplitud unitaria); (V*s)^2 en general |
| $p$ | ancho (duración) del pulso | s |
| $f$ | frecuencia | Hz |

**Condiciones:** Misma hipótesis que U02-F28. Siempre positivo (nunca negativo): la información de fase (los lóbulos invertidos de 180 grados) se pierde al elevar al cuadrado. Los ceros siguen en f = k/p.

**Despejable para:** |F(f)|^2

**Confianza:** alta · **Página(s):** 70

### Ejemplos resueltos — Unidad 2

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U02-F03` | En un cierto medio una onda sonora se propaga a 340 m/s. ¿Qué longitud de onda, expresada  | v = 340 m/s; f = 20 KHz = 20.000 Hz (1/s) | **lambda = 340 / 20.000 = 0,017 m = 17 mm** | 15 |
| `U02-F03` | Calcular la longitud de onda de un canal de WiFi que trabaja a 2.4 GHz y se propaga por el | c = 3x10^8 m/s; f = 2,40x10^9 Hz (1/s) | **lambda = 3x10^8 / 2,40x10^9 = 0,125 m = 12,5 cm** | 15 |
| `U02-F12` | Ejemplo01 (parte a): Encontrar el coeficiente a_0 de la serie de Fourier trigonométrica de | f(t) = -1 en (-T/2, 0) y +1 en (0, T/2); período T | **a_0 = (2/T)[(0 - T/2) + (T/2 - 0)] = 0** | 29 |
| `U02-F13` | Ejemplo01 (parte b): Encontrar los coeficientes a_n de la misma onda cuadrada. Se usa que  | f(t) = -1 en (-T/2, 0) y +1 en (0, T/2); período T; n entero >= 1 | **a_n = (2/T)[0 - (1/(n*w0))sen(-n*pi) + (1/(n*w0))sen(n*pi) - 0] = 0 para todo n (a_n = 0)** | 30 |
| `U02-F15` | Ejemplo01 (parte c): Encontrar los coeficientes b_n de la misma onda cuadrada. Se usa 2/(n | f(t) = -1 en (-T/2, 0) y +1 en (0, T/2); período T; n entero >= 1 | **b_n = (1/(n*pi))[2 - 2cos(n*pi)] = (2/(n*pi))[1 - cos(n*pi)] = (2/(n*pi))[1 - (-1)^n]. Para n par: b_n = 0. Para n impar: b_n = 4/(n*pi). Valores: b1 = 4/pi, b3 = 4/(3*pi), b5 = 4/(5*pi), b7 = 4/(7*pi), b9 = 4/(9*pi)** | 32 |
| `U02-F16` | Ejemplo01 (parte d): Escribir la serie de Fourier trigonométrica completa de la onda cuadr | a_0 = 0; a_n = 0; b_n = 4/(n*pi) con n impar | **f(t) = (4/pi)[sen(w0*t) + (1/3)sen(3*w0*t) + (1/5)sen(5*w0*t) + ... ]** | 33 |
| `U02-F15` | Ejemplo01 (espectro): Graficar el espectro de amplitudes de la onda cuadrada truncada a 4  | b_n = 4/(n*pi) para n = 1, 3, 5, 7 | **Líneas espectrales de amplitud 4/pi en w0, 4/(3*pi) en 3*w0, 4/(5*pi) en 5*w0 y 4/(7*pi) en 7*w0 (numéricamente 1,273 / 0,424 / 0,255 / 0,182)** | 44 |
| `U02-F20` | Ejemplo02: Encontrar la forma compleja de la serie de Fourier para la onda cuadrada f(t) = | f(t) = -1 en (-T/2, 0) y +1 en (0, T/2); n = 0, ±1, ±3, ±5, ... | **C_n = -(2j/(n*w0*T))[1-(-1)^n] = -j(1/(n*pi))[1-(-1)^n]. Valores: C_0 = 0; C_1 = -j(2/pi); C_-1 = +j(2/pi); C_3 = -j(2/(3*pi)); C_-3 = +j(2/(3*pi)). Serie: f(t) = ... + j(2/(5*pi))e^{-j5w0t} + j(2/(3*pi))e^{-j3w0t} + j(2/pi)e^{-jw0t} - j(2/pi)e^{jw0t} - j(2/(3*pi))e^{j3w0t} - j(2/(5*pi))e^{j5w0t} - ...** | 51 |
| `U02-F21` | Ejemplo03: Encontrar la forma compleja de la serie de Fourier para un tren de pulsos recta | A, p, T simbólicos (sin valores numéricos) | **C_n = A*(p/T) * sen(n*w0*p/2) / (n*w0*p/2) = A*(p/T)*sinc(x), con x = n*w0*p/2** | 54 |
| `U02-F21` | Ejemplo04 (T = 2): Tren de pulsos rectangulares con p = constante. Calcular los coeficient | A = 1; p = 1; T = 2 (unidades coherentes); n = 0, 1, 2, 3, 4 | **c_n = (1/2) * sen(n*pi/2)/(n*pi/2). c0 = 1/2 = 0,50; c1 = 0,31; c2 = 0; c3 = -0,10; c4 = 0** | 56 |
| `U02-F21` | Ejemplo04 (T = 5): Tren de pulsos rectangulares con p = constante. Se usa n*w0*p/2 = n*pi/ | A = 1; p = 1; T = 5 (unidades coherentes); n = 0, 1, 2, 3, 4, 5 | **c_n = (1/5) * sen(n*pi/5)/(n*pi/5). c0 = 1/5 = 0,20; c1 = 0,18; c2 = 0,15; c3 = 0,10; c4 = 0,04; c5 = 0** | 57 |
| `U02-F21` | Ejemplo04 (T = 10): Tren de pulsos rectangulares con p = constante. Se usa n*w0*p/2 = n*pi | A = 1; p = 1; T = 10 (unidades coherentes); n = 0, 1, 2, 3, 10 | **c_n = (1/10) * sen(n*pi/10)/(n*pi/10). c0 = 1/10 = 0,10; c1 = 0,098; c2 = 0,093; c3 = 0,085; c10 = 0** | 58 |
| `U02-F21` | Ejemplo04 (T = 20): Tren de pulsos rectangulares con p = constante. Se usa n*w0*p/2 = n*pi | A = 1; p = 1; T = 20 (unidades coherentes); n = 0, 1, 3, 20 | **c_n = (1/20) * sen(n*pi/20)/(n*pi/20). c0 = 1/20 = 0,05; c1 = 0,049; c3 = 0,048; c20 = 0** | 59 |
| `U02-F21` | Ejemplo04 (T = 500): Tren de pulsos rectangulares con p = constante. Se usa n*w0*p/2 = n*p | A = 1; p = 1; T = 500 (unidades coherentes); n = 0, 1, 500 | **c_n = (1/500) * sen(n*pi/500)/(n*pi/500). c0 = 1/500 = 0,002; c1 = 0,0019; c500 = 0** | 60 |
| `U02-F27` | Ejemplo07: Calcular F(w) para el pulso rectangular aislado f(t) = 0 para t < -p/2, f(t) =  | Pulso de amplitud 1 y ancho p, centrado en t = 0 | **F(w) = p * sen(w*p/2) / (w*p/2)** | 66 |
| `U02-F27` | Ejemplo07 (caso numérico p = 1): Particularizar F(w) del pulso rectangular para ancho unit | p = 1; amplitud 1 | **F(w) = sen(w/2)/(w/2); primer cruce por cero en w = 2*pi (porque sen(pi) = 0). Ceros sucesivos en w = 2*pi, 4*pi, ...** | 67 |
| `U02-F28` | Ejemplo07 (en función de f): Expresar la transformada del pulso rectangular en función de  | Pulso de amplitud 1 y ancho p; variable f en Hz | **F(f) = p * sen(pi*p*f)/(pi*p*f) = p*sinc(pi*p*f); F(0) = p; ceros en f = ±1/p, ±2/p, ±3/p, ±4/p, ...** | 69 |
| `U02-F29` | Ejemplo07 (densidad espectral): Obtener el módulo al cuadrado del espectro del pulso recta | Pulso de amplitud 1 y ancho p; variable f en Hz | **\|F(f)\|^2 = [p * sen(pi*p*f)/(pi*p*f)]^2; ceros en f = ±1/p, ±2/p, ±3/p, ±4/p, ...** | 70 |


---

## Unidad 3 — Atenuación, Distorsión y Ruido

> CONTENIDO SIN FÓRMULA (excluido a propósito): las páginas 1-5, 9, 19-23, 25, 29-42 y 55-57 son conceptuales, diagramas o imágenes sin texto extraíble. Temas tratados sólo cualitativamente: causas de la atenuación (p.9), RSSI y sus rangos típicos (p.19-22, incluye el dato S_RX = -82 dBm para WiFi 2,4 GHz a 11 Mbps y una escala con -50/-70/-75 dBm), distorsión por atenuación / por retardo / por armónicas (p.29-32), definición y clases de ruido (p.33-38), ruidos correlacionados y no correlacionados, externos (cósmico, atmosférico, impulsivo, inducido, diafonía NEXT) e internos (disparo, partición, térmico) (p.39-41), y el origen físico del ruido térmico (p.42). Las páginas 55-57 ('Relación señal/ruido: Redes WiFi') son puramente imágenes: si el PDF original tiene fórmulas ahí, no aparecen en el texto extraído.

TABLAS EXCLUIDAS: p.15 (tabla relación lineal ↔ dB) y p.17 (tabla mW ↔ dBm) son la tabulación de U03-F01 y U03-F04, no fórmulas nuevas. Útiles como casos de test rápidos (2 ↔ 3 dB, 10 ↔ 10 dB, 0,5 ↔ -3 dB, 1 mW ↔ 0 dBm, etc.).

DIAPOSITIVA DUPLICADA: la p.53 es una copia exacta de la p.27 (Ejemplo09). No se contó dos veces.

NUMERACIÓN DE EJEMPLOS ROTA EN LA FUENTE: 'Ejemplo04' se usa dos veces (p.11 para la línea coaxil y p.16 para el dBm) y 'Ejemplo09' se usa dos veces (p.27/53 para el RSSI y p.54 para el ruido térmico + SNR, donde debería decir Ejemplo18). La app no debe indexar los casos de test por el número de la diapositiva.

ERRATAS Y AMBIGÜEDADES DETECTADAS EN LOS EJEMPLOS: (1) p.24 Ejemplo 8 escribe '10·log10(3/1) = 10·log10(2) = 4,8 dBi'; el paso intermedio está mal copiado, el resultado 4,8 dBi sí es el correcto (4,77). (2) p.13/14 Ejemplo06: el enunciado dice 'Pérdida TOTAL de conector: 3 dB' pero la resolución hace 3 dB × 2 = 6 dB; además usa 26 empalmes para 50 Km con separación de 2 Km sin explicitar la regla (n = L/s + 1); y el diagrama de la p.13 rotula '2 km' y 'PTX = 3 mW' pero el enunciado habla de 50 km. (3) p.54: el RSSI en potencia lineal aparece como 268,5 pW en una línea y como 268,31 pW en la siguiente; el valor exacto de -65,71 dBm es 268,5 pW (ambas cuentas dan 16,29 dB / 35,13 dB igual). (4) p.28 Ejemplo10: el diagrama lista -1 dB, -3 dB, -1 dB, 12 dB, -1 dB, 16 dBi y -107,71 dB, pero la cuenta escrita agrupa '-6 dB' del lado TX y '-1 dB' del lado RX; la atribución exacta de cada pérdida a un lado del enlace no se puede reconstruir del texto extraído (la suma sí cierra en -65,71 dBm).

CONSTANTES: la p.43 declara K = 1,3803 × 10^-23 J/°K, pero TODOS los ejemplos numéricos (p.45, 47, 48, 54) usan K = 1,38 × 10^-23. La app debe usar 1,38e-23 para reproducir los resultados de cátedra. La conversión de temperatura es siempre T[K] = T[°C] + 273 (nunca 273,15). Las constantes de espacio libre son 32,45 (versión MHz) y 92,44 (versión GHz), que no son estrictamente consistentes entre sí (deberían diferir en exactamente 60,00, es decir 32,45 → 92,45); se transcribieron tal cual figuran.

RIESGO PRINCIPAL — FACTOR E ÍNDICE DE RUIDO (U03-F16 y U03-F17, páginas 58 y 59): las expresiones matemáticas NO sobrevivieron a la extracción con pypdf. La p.58 dice 'definido por:' y luego no hay fórmula, sólo el diagrama con etiquetas 'Si/Ri' y 'So/Ro' (que en la p.59 aparecen como Si/Ni y So/No); la p.59 dice 'es decir:' y queda sólo un carácter suelto 'N'. Ambas fórmulas están RECONSTRUIDAS a partir de las propiedades enunciadas en la propia diapositiva (cociente adimensional, f = 1 ideal, f > 1 real, S/Ni siempre mayor que S/No) y llevan confianza BAJA. Antes de implementarlas hay que abrir el PDF original en esas dos páginas y verificarlas visualmente. Ningún ejemplo numérico de la unidad las usa.

CONTROL CRUZADO CON EL DESTILADO PREVIO (cheatsheet.md y ch03): el destilado coincide en U03-F01, F04, F05, F06/F07, F08, F09, F12, F14 y F15, y su Ejemplo 1 (enlace de fibra), Ejemplo 2 (dBm a Watts) y Ejemplo 3 (WiFi 5,8 GHz) son los mismos casos que las p.14, 18 y 26-27. Fórmulas que el destilado trae pero que NO están en las diapositivas de la U03 y por eso NO se incluyeron: capacidad de Shannon C = B·log2(1 + SNR); f = 1/T y T = 1/f; longitud de onda λ = v/f; BW = f_max - f_min; BW ≈ 1/τ; SNR_dB = P_rx(dBm) - N(dBm) (la p.54 calcula la SNR SIEMPRE con el cociente de potencias lineales, nunca por resta de dBm — matemáticamente equivalente, pero la cátedra no lo escribe así en esta unidad); FSPL con constante 32,44 en lugar de 32,45; la equivalencia 0 dBd = 2,15 dBi; y el criterio P_RX ≥ S_RX + margen de desvanecimiento de 10 a 20 dB (la diapositiva sólo compara RSSI contra S_RX, sin fijar un margen mínimo). Las primeras cinco parecen provenir de las Unidades 1 y 2 y de material de trabajos prácticos; conviene buscarlas ahí. El destilado, por su parte, OMITE el factor de ruido y el índice de ruido (p.58-59), la fórmula de pérdida por unidad de longitud (U03-F02), la conversión °C→K (U03-F11) y la potencia de ruido en dBm (U03-F13).

MATERIAL COMPLEMENTARIO QUE PARECE TENER MÁS CONTENIDO: las p.21, 22, 37, 38, 55, 56 y 57 son diapositivas de imágenes sin texto extraíble, y las p.58-59 tienen fórmulas perdidas en la extracción. Vale la pena revisar esas 9 páginas contra el PDF original. La p.26 cita además una calculadora web externa (telectronika.com) usada para validar la pérdida en el espacio libre.

### `U03-F01` · Relación de potencias en decibeles (atenuación / ganancia) ✅

$$dB = 10 \log_{10}\left(\frac{P_o}{P_i}\right) \iff \frac{P_o}{P_i} = 10^{\frac{dB}{10}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $dB$ | Ganancia (valor positivo) o atenuación (valor negativo) entre dos puntos del circuito | dB |
| $P_o$ | Potencia de la señal medida en el punto de SALIDA (también escrita P2) | W o mW (debe ser la MISMA unidad que P_i; el cociente es adimensional) |
| $P_i$ | Potencia de la señal medida en el punto de ENTRADA (también escrita P1) | W o mW (debe ser la MISMA unidad que P_o) |

**Condiciones:** Es una relación RELATIVA entre dos potencias: no da un nivel absoluto (para eso ver U03-F04, dBm). Ambas potencias deben expresarse en la misma unidad. dB < 0 = atenuación, dB > 0 = amplificación. La forma inversa P_o/P_i = 10^(dB/10) aparece explícita en las páginas 11, 12 y 14. No aplica a relaciones de tensión o corriente (la cátedra sólo la presenta para potencias).

**Despejable para:** dB, P_o, P_i

**Confianza:** alta · **Página(s):** 6, 7, 8, 10, 11, 12, 14, 15

### `U03-F02` · Pérdida total de un medio con atenuación específica por unidad de longitud ✅

$$L_{dB} = \alpha \cdot d$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $L_{dB}$ | Pérdida total introducida por el tramo de medio (línea coaxil, fibra óptica) | dB |
| $\alpha$ | Pérdida específica (atenuación por unidad de longitud) del medio | dB/Km |
| $d$ | Longitud del tramo de medio de transmisión | Km |

**Condiciones:** Supone atenuación uniformemente distribuida a lo largo del medio y a una frecuencia de operación dada (la atenuación crece con la frecuencia). El resultado es una PÉRDIDA: al usarla en U03-F01 o en el balance de enlace hay que ingresarla con signo negativo. Las unidades de alpha y d deben ser coherentes (dB/Km con Km). Casos de la fuente: 0,30 dB/Km × 5 Km = 1,50 dB (p.11); 0,4 dB/Km × 50 Km = 20 dB (p.14).

**Despejable para:** L_{dB}, \alpha, d

**Confianza:** alta · **Página(s):** 11, 14

### `U03-F03` · Suma algebraica de decibeles en una cadena de transmisión ✅

$$dB_{total} = \sum_{i} dB_i$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $dB_{total}$ | Ganancia o pérdida resultante de toda la cadena entre el primer y el último punto | dB |
| $dB_i$ | Ganancia (signo +) o pérdida (signo -) de cada tramo/elemento medido entre pares de puntos consecutivos | dB |

**Condiciones:** Vale sólo porque los dB son logarítmicos: multiplicar relaciones de potencia equivale a sumar dB. Cada término debe llevar su signo (atenuación negativa, amplificación positiva). No se puede despejar un término individual porque el símbolo queda dentro de la sumatoria (salvo que la app modele cada término por separado, como en U03-F08). Ejemplos de la fuente: -3 + 7 - 3 = +1 dB (p.10); 6 + 2,6 + 20 = 28,6 dB de pérdida total (p.14).

**Despejable para:** dB_{total}

**Confianza:** alta · **Página(s):** 10, 14

### `U03-F04` · Nivel de potencia absoluto en dBm (referido a 1 mW) ✅

$$P_{dBm} = 10 \log_{10}\left(\frac{P}{1\,mW}\right) \iff P = 10^{\frac{P_{dBm}}{10}} \times 1\,mW$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $P_{dBm}$ | Nivel de potencia expresado respecto de la referencia de 1 mW | dBm |
| $P$ | Potencia absoluta de la señal | mW (si se trabaja en W hay que convertir: la referencia del denominador es 1 mW = 0,001 W) |

**Condiciones:** El dBm es un nivel ABSOLUTO (0 dBm = 1 mW), a diferencia del dB de U03-F01 que es relativo. No requiere que exista físicamente 1 mW en el circuito: es sólo la referencia. La forma inversa P = 10^(PdBm/10) × 1 mW está escrita explícitamente en la página 18. Cuidado en la app: mezclar W y mW cambia el resultado en 30 dB.

**Despejable para:** P_{dBm}, P

**Confianza:** alta · **Página(s):** 16, 17, 18

### `U03-F05` · Ganancia (directividad) de antena en dBi ✅

$$dBi = 10 \log_{10}\left(\frac{P_{antena}}{P_{isotropica}}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $dBi$ | Ganancia de la antena real sobre un radiador isotrópico; es su directividad | dBi |
| $P_{antena}$ | Potencia de emisión de la antena real (ej. antena Wi-Fi) | mW (misma unidad que P_isotropica) |
| $P_{isotropica}$ | Potencia de emisión del radiador isotrópico de referencia | mW (misma unidad que P_antena) |

**Condiciones:** La antena isotrópica es teórica (no existe físicamente), pero sirve como referencia comparativa. En los ejemplos de la cátedra la referencia isotrópica es siempre 1 mW. No confundir con dBd (ganancia sobre dipolo), que la diapositiva no menciona.

**Despejable para:** dBi, P_{antena}, P_{isotropica}

**Confianza:** alta · **Página(s):** 23, 24

### `U03-F06` · Pérdida en el espacio libre (frecuencia en MHz) ✅

$$L_0\,[dB] = 32.45 + 20 \log_{10}(f_{MHz}) + 20 \log_{10}(d_{Km})$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $L_0$ | Pérdida (atenuación) básica de propagación en el espacio libre por ensanchamiento del frente de onda | dB |
| $f$ | Frecuencia de operación del enlace | MHz (obligatorio con la constante 32.45) |
| $d$ | Distancia entre transmisor y receptor | Km (obligatorio con la constante 32.45) |

**Condiciones:** Sólo válida en espacio libre: sin obstáculos, sin reflexiones ni absorción, línea de vista despejada. La constante 32.45 obliga a f en MHz y d en Km; si se usan otras unidades el resultado es erróneo. Es la misma pérdida que U03-F07 expresada con f en MHz. Al llevarla al balance de enlace (U03-F08) entra con signo negativo.

**Despejable para:** L_0, f, d

**Confianza:** alta · **Página(s):** 26

### `U03-F07` · Pérdida en el espacio libre (frecuencia en GHz) ✅

$$L_0\,[dB] = 92.44 + 20 \log_{10}(f_{GHz}) + 20 \log_{10}(d_{Km})$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $L_0$ | Pérdida (atenuación) básica de propagación en el espacio libre | dB |
| $f$ | Frecuencia de operación del enlace | GHz (obligatorio con la constante 92.44) |
| $d$ | Distancia entre transmisor y receptor | Km (obligatorio con la constante 92.44) |

**Condiciones:** Mismas condiciones que U03-F06 (espacio libre, línea de vista). La constante 92.44 obliga a f en GHz y d en Km. Verificada con el ejemplo de la propia diapositiva: f = 5,8 GHz y d = 100 m = 0,1 Km dan 92,44 + 15,27 - 20 = 87,71 dB. Ojo: la cátedra usa 32.45 en la versión MHz y 92.44 en la versión GHz, que no son exactamente consistentes entre sí (deberían diferir en 60,00).

**Despejable para:** L_0, f, d

**Confianza:** alta · **Página(s):** 26

### `U03-F08` · Balance de enlace / potencia recibida (RSSI) en un radioenlace WiFi ✅

$$P_{RX} = P_{TX} + L_{cable} + G_{antena} + L_{espacio\ libre} + G_{antena} + L_{cable}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $P_{RX}$ | Potencia recibida en el receptor, es decir el RSSI del enlace | dBm |
| $P_{TX}$ | Potencia de salida del transmisor | dBm |
| $L_{cable}$ | Pérdidas de cable/conectores; aparece dos veces, la primera del lado del transmisor y la segunda del lado del receptor | dB, ingresado con signo NEGATIVO (ej. -1 dB) |
| $G_{antena}$ | Ganancia de antena; aparece dos veces, la primera es la antena transmisora y la segunda la receptora | dBi, ingresado con signo POSITIVO (ej. +3 dBi) |
| $L_{espacio\ libre}$ | Pérdida de propagación en el espacio libre, calculada con U03-F06 o U03-F07 | dB, ingresado con signo NEGATIVO (ej. -87,71 dB) |

**Condiciones:** Suma de niveles logarítmicos: dBm + dB + dBi da dBm. Todas las pérdidas se ingresan con signo negativo y las ganancias con signo positivo. La fuente escribe L_cable y G_antena dos veces con el MISMO símbolo (lado TX y lado RX): por eso esos dos símbolos no son despejables sin ambigüedad, salvo que la app los renombre a L_cable_TX / L_cable_RX y G_antena_TX / G_antena_RX. El enlace es viable si RSSI > S_RX (sensibilidad del receptor, valor negativo en dBm; típico -82 dBm para WiFi 2,4 GHz a 11 Mbps, p.20). En el Ejemplo10 (p.28) la cadena incluye además una ganancia de amplificador de +12 dB, que se suma como un término más.

**Despejable para:** P_{RX}, P_{TX}, L_{espacio\ libre}

**Confianza:** alta · **Página(s):** 27, 28, 53

### `U03-F09` · Margen del enlace (RSSI sobre sensibilidad del receptor) ✅

$$M\,[dB] = RSSI\,[dBm] - S_{RX}\,[dBm] = 10 \log_{10}\left(\frac{P_{RSSI}}{P_{S_{RX}}}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M$ | Margen disponible del enlace por encima de la sensibilidad del receptor | dB |
| $RSSI$ | Nivel de potencia recibido (indicador de fuerza de señal recibida) | dBm |
| $S_{RX}$ | Sensibilidad de recepción: mínimo nivel que el receptor puede recibir de forma inteligible | dBm (valor negativo) |
| $P_{RSSI}$ | Potencia lineal correspondiente al RSSI (forma equivalente con cociente) | W o pW (misma unidad que P_S_RX) |
| $P_{S_{RX}}$ | Potencia lineal correspondiente a la sensibilidad del receptor | W o pW (misma unidad que P_RSSI) |

**Condiciones:** Si M > 0 el enlace es viable (RSSI por encima de la sensibilidad); si RSSI < S_RX hay pérdida de servicio (p.20). Las dos formas son equivalentes: restar dBm o hacer 10 log del cociente de las potencias lineales. La diapositiva NO fija un margen mínimo recomendado. Verificado: -65,71 dBm - (-82 dBm) = 16,29 dB.

**Despejable para:** M, RSSI, S_{RX}

**Confianza:** alta · **Página(s):** 27, 53, 54

### `U03-F10` · Densidad de potencia de ruido térmico ✅

$$N_0 = K \cdot T \quad [W/Hz]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N_0$ | Densidad de potencia del ruido térmico: potencia de ruido por cada 1 Hz de ancho de banda | W/Hz |
| $K$ | Constante de Boltzmann | J/K — la diapositiva 43 declara 1.3803 × 10^-23 J/K, pero TODOS los ejemplos numéricos usan 1.38 × 10^-23 J/K |
| $T$ | Temperatura absoluta de trabajo de la fuente | K (Kelvin). Si el dato viene en °C, convertir primero con U03-F11 |

**Condiciones:** T debe estar SIEMPRE en Kelvin. N0 es independiente de la sustancia, de la ubicación de la banda y del ancho de banda: sólo depende de la temperatura (respuesta plana / ruido blanco, presente en todas las frecuencias). Para reproducir los resultados de la cátedra usar K = 1.38e-23 (con 1.3803e-23 los resultados cambian en el tercer dígito).

**Despejable para:** N_0, T

**Confianza:** alta · **Página(s):** 43, 44, 45, 47, 48, 54

### `U03-F11` · Conversión de temperatura de grados Celsius a Kelvin ✅

$$T\,[K] = T\,[^{\circ}C] + 273$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $T\,[K]$ | Temperatura absoluta | K (Kelvin) |
| $T\,[^{\circ}C]$ | Temperatura de trabajo del equipo | °C |

**Condiciones:** La cátedra usa 273 (NO 273,15) en todos los ejemplos: 17 °C = 290 K y 25 °C = 298 K. La app debe usar 273 para reproducir exactamente los resultados de las diapositivas. Paso previo obligatorio de U03-F10, U03-F12 y U03-F13.

**Despejable para:** T\,[K], T\,[^{\circ}C]

**Confianza:** alta · **Página(s):** 45, 47, 48, 54

### `U03-F12` · Potencia total de ruido térmico en un ancho de banda ✅

$$N = N_0 \cdot B = K \cdot T \cdot B \quad [W]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N$ | Potencia total del ruido térmico presente en el ancho de banda B | W |
| $N_0$ | Densidad de potencia del ruido (= K·T, ver U03-F10) | W/Hz |
| $B$ | Ancho de banda del dispositivo o sistema | Hz (convertir: 1 MHz = 10^6 Hz) |
| $K$ | Constante de Boltzmann | J/K (1.38 × 10^-23 en los ejemplos) |
| $T$ | Temperatura absoluta | K |

**Condiciones:** Para una temperatura T dada, la potencia de ruido depende EXCLUSIVAMENTE del ancho de banda B, no de dónde esté ubicada la banda en el espectro: un canal de 10 MHz entre 0 y 10 MHz tiene la misma potencia de ruido que entre 190 y 200 MHz (p.48). B es el ancho (f_max - f_min), no la frecuencia central. B debe ir en Hz.

**Despejable para:** N, N_0, B, T

**Confianza:** alta · **Página(s):** 46, 47, 48, 54

### `U03-F13` · Potencia de ruido térmico expresada en dBm ✅

$$N_{dBm} = 10 \log_{10}\left(\frac{K \cdot T \cdot B}{0.001}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N_{dBm}$ | Potencia de ruido térmico expresada como nivel absoluto respecto de 1 mW | dBm |
| $K \cdot T \cdot B$ | Potencia de ruido N calculada con U03-F12 | W (el denominador 0.001 es 1 mW expresado en W) |
| $T$ | Temperatura absoluta | K |
| $B$ | Ancho de banda | Hz |

**Condiciones:** Es U03-F04 aplicada a la potencia de ruido: el numerador KTB debe estar en WATTS porque el denominador es 0,001 W = 1 mW. Referencia clásica que verifica la fórmula: T = 17 °C (290 K) con B = 1 Hz da -174 dBm.

**Despejable para:** N_{dBm}, T, B

**Confianza:** alta · **Página(s):** 47, 48, 54

### `U03-F14` · Relación señal a ruido en veces (lineal) ✅

$$SNR = \frac{P_S}{P_N} = \frac{S}{N}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $SNR$ | Relación señal/ruido expresada en veces | adimensional (veces) |
| $S$ | Potencia media de la señal (P_S) | W o mW (misma unidad que N) |
| $N$ | Potencia media del ruido (P_N) | W o mW (misma unidad que S) |

**Condiciones:** Cociente simple, adimensional, medido en un mismo punto de referencia del canal. Ambas potencias en la misma unidad. La potencia de la señal no puede aumentarse indefinidamente (perturbaría canales adyacentes y los amplificadores tienen potencia limitada).

**Despejable para:** SNR, S, N

**Confianza:** alta · **Página(s):** 49, 51, 52

### `U03-F15` · Relación señal a ruido en decibeles ✅

$$SNR\,[dB] = 10 \log_{10}\left(\frac{S}{N}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $SNR\,[dB]$ | Relación señal/ruido expresada en decibeles | dB |
| $S$ | Potencia media de la señal | W o mW o pW (misma unidad que N) |
| $N$ | Potencia media del ruido | W o mW o pW (misma unidad que S) |

**Condiciones:** Se aplica sobre el cociente LINEAL de potencias (U03-F14), no sobre valores ya en dBm. En la página 54 la cátedra la usa con potencias en pW (RSSI y sensibilidad convertidos a potencia lineal). Ambas potencias en la misma unidad.

**Despejable para:** SNR\,[dB], S, N

**Confianza:** alta · **Página(s):** 50, 51, 52, 54

### `U03-F16` · Factor de ruido (f)

$$f = \frac{S_i/N_i}{S_o/N_o}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f$ | Factor de ruido del canal o dispositivo electrónico | adimensional (no logarítmico) |
| $S_i$ | Potencia de señal a la ENTRADA | W (misma unidad que N_i) |
| $N_i$ | Potencia de ruido a la ENTRADA | W (misma unidad que S_i) |
| $S_o$ | Potencia de señal a la SALIDA | W (misma unidad que N_o) |
| $N_o$ | Potencia de ruido a la SALIDA | W (misma unidad que S_o) |

**Condiciones:** Cociente adimensional (no logarítmico). En un circuito ideal f = 1; un circuito no ideal siempre tiene f > 1. La relación señal-a-ruido a la salida siempre es peor que a la entrada, aunque el circuito sea amplificador. El ruido interno total del circuito contiene al menos el ruido térmico.

**Despejable para:** f, S_i, N_i, S_o, N_o

**Confianza:** baja — La expresión matemática NO sobrevivió a la extracción del PDF: la diapositiva 58 dice 'definido por:' y a continuación no hay texto de fórmula, sólo el diagrama con las etiquetas 'Si/Ri' y 'So/Ro' (que en la p.59 aparecen correctamente como Si/Ni y So/No). La expresión aquí está RECONSTRUIDA a partir de las propiedades que sí figuran en la diapositiva: es un cociente simple adimensional, vale f = 1 en un circuito ideal (SNR entrada = SNR salida), f > 1 en un circuito no ideal, y siempre S/Ni > S/No. Esas tres condiciones fijan unívocamente esta forma, pero HAY QUE VERIFICARLA CONTRA EL PDF ORIGINAL antes de implementarla en la app. · **Página(s):** 58

### `U03-F17` · Índice de ruido (factor de ruido en dB)

$$NF\,[dB] = 10 \log_{10}(f)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $NF$ | Índice de ruido: el factor de ruido expresado en decibeles | dB |
| $f$ | Factor de ruido (ver U03-F16) | adimensional |

**Condiciones:** Se aplica sobre el factor de ruido adimensional f de U03-F16. Circuito ideal (f = 1) da 0 dB; cualquier circuito real da un índice de ruido positivo. La unidad no presenta ningún ejemplo numérico de esta fórmula.

**Despejable para:** NF, f

**Confianza:** baja — La diapositiva 59 sólo dice 'El Índice de Ruido es el factor de ruido expresado en dB, es decir:' y la expresión que la sigue no sobrevivió a la extracción (en el texto extraído queda únicamente un carácter suelto 'N'). La forma 10·log10(f) está RECONSTRUIDA a partir de la definición verbal ('el factor de ruido expresado en dB') y del uso uniforme de 10·log10 para relaciones de potencia en el resto de la unidad. No se pudo confirmar si la cátedra usa 10·log o 20·log ni el símbolo exacto que emplea. VERIFICAR CONTRA EL PDF ORIGINAL antes de implementarla. · **Página(s):** 59

### Ejemplos resueltos — Unidad 3

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U03-F01` | Ejemplo01: Una señal se inyecta en un medio de transmisión y su potencia se reduce a la mi | P2 = 0,5 × P1 (relación P2/P1 = 0,5) | **dB = 10·log10(0,5) = 10·(-0,3) = -3 dB** | 7 |
| `U03-F01` | Ejemplo02: Una señal pasa a través de un amplificador y su potencia se incrementa 10 veces | P2 = 10 × P1 (relación P2/P1 = 10) | **dB = 10·log10(10) = 10·(1) = 10 dB** | 8 |
| `U03-F03` | Ejemplo03: Una señal viaja del punto 1 al punto 4. Entre 1 y 2 se atenúa 3 dB, entre 2 y 3 | -3 dB, +7 dB, -3 dB | **dB = -3 + 7 - 3 = +1 dB (la señal se amplifica)** | 10 |
| `U03-F02` | Ejemplo04: Se tiene una línea de transmisión (coaxil) de L = 5 Km, su pérdida es de 0,3 dB | L = 5 Km; alpha = 0,30 dB/Km; P1 = 2 mW | **Pérdida = 0,30 dB/Km × 5 Km = 1,50 dB → dB = -1,50 dB; P2/P1 = 10^(-1,50/10) = 10^(-0,15) = 0,707; P2 = 0,707 × 2 mW = 1,41 mW** | 11 |
| `U03-F01` | Ejemplo05: Se tiene una línea de transmisión que posee un amplificador que gana 13 dB. Si  | Ganancia = 13 dB; Pi = 4 mW | **Po/Pi = 10^(13/10) = 10^1,30 = 19,95; Po = 19,95 × 4 mW = 79,81 mW** | 12 |
| `U03-F03` | Ejemplo06: Un enlace óptico tiene una longitud de 50 Km. La salida de potencia del transmi | L = 50 Km; P_TX = 3 mW; conector 3 dB (×2); empalme 0,1 dB cada 2 Km (26 empalmes); fibra 0,4 dB/Km | **Conectores: 3 dB × 2 = 6 dB; empalmes: 26 × 0,1 dB = 2,6 dB; fibra: 50 Km × 0,4 dB/Km = 20 dB; pérdida TOTAL = 6 + 2,6 + 20 = 28,6 dB; P_RX/P_TX = 10^(-2,86) = 0,00138; P_RX = 3 mW × 0,00138 = 4,1 µW** | 14 |
| `U03-F04` | Ejemplo04 (segunda diapositiva numerada 04, sobre dBm): ¿Cuántas veces mayor que 1 mW es l | P = 1000 mW | **P_dBm = 10·log10(1000 mW / 1 mW) = 10 × 3 = 30 dBm** | 16 |
| `U03-F04` | Ejemplo04 (segunda diapositiva numerada 04, sobre dBm): expresar en dBm una potencia de 1  | P = 1 µW = 0,001 mW | **P_dBm = 10·log10(0,001 mW / 1 mW) = 10 × (-3) = -30 dBm** | 16 |
| `U03-F04` | Ejercicio sin numerar: dado un nivel de -60 dBm, calcular la potencia absoluta usando la f | P_dBm = -60 dBm | **P = 10^(-60/10) × 1 mW = 10^-6 × 10^-3 W = 10^-9 W = 1 nW** | 18 |
| `U03-F04` | Ejercicio sin numerar: dado un nivel de -80 dBm, calcular la potencia absoluta usando la f | P_dBm = -80 dBm | **P = 10^(-80/10) × 1 mW = 10^-8 × 10^-3 W = 10^-11 W = 10 pW** | 18 |
| `U03-F05` | Ejemplo 7: Si la antena isotrópica produce 1 mW de energía de ondas de radio y la antena # | P_antena = 2 mW; P_isotropica = 1 mW | **dBi = 10·log10(2/1) = 10·log10(2) = 3 dBi** | 24 |
| `U03-F05` | Ejemplo 8: Si la antena isotrópica produce 1 mW y la antena #1 de Wi-Fi produce 3 mW, calc | P_antena = 3 mW; P_isotropica = 1 mW | **dBi = 10·log10(3/1) = 4,8 dBi (tal cual figura en la diapositiva)** | 24 |
| `U03-F07` | Ejercicio sin numerar (verificación con la herramienta web citada en la diapositiva): calc | f = 5,8 GHz; d = 100 m = 0,1 Km | **L_espacio_libre = 92,44 + 20·log10(5,8) + 20·log10(0,1) = 87,71 dB** | 26 |
| `U03-F08` | Ejemplo09 (caso favorable, L0 = 87,71 dB correspondiente a 5,8 GHz y 100 m): calcular el R | P_TX = 20 dBm; L_cable_TX = -1 dB; G_antena_TX = +3 dBi; L_espacio_libre = -87,71 dB; G_antena_RX = +1 dBi; L_cable_RX = -1 dB; S_RX = -82 dBm | **RSSI = 20 - 1 + 3 - 87,71 + 1 - 1 = -65,71 dBm > -82 dBm (enlace viable)** | 27 |
| `U03-F08` | Ejemplo09 (caso desfavorable, mismo enlace pero con una pérdida de espacio libre de 107,71 | P_TX = 20 dBm; L_cable_TX = -1 dB; G_antena_TX = +3 dBi; L_espacio_libre = -107,71 dB; G_antena_RX = +1 dBi; L_cable_RX = -1 dB; S_RX = -82 dBm | **RSSI = 20 - 1 + 3 - 107,71 + 1 - 1 = -85,71 dBm < -82 dBm (pérdida de servicio)** | 27 |
| `U03-F08` | Ejemplo10: calcular el RSSI de un enlace con P_TX = 20 dBm, pérdidas de cable/conectores d | P_TX = 20 dBm; L_cable/conectores = -6 dB; G_amplificador = +12 dB; G_antena_TX = +16 dBi; L_espacio_libre = -107,71 dB; G_antena_RX = +1 dBi; L_cable_RX = -1 dB; S_RX = -82 dBm | **RSSI = 20 - 6 + 12 + 16 - 107,71 + 1 - 1 = -65,71 dBm > S_RX = -82 dBm** | 28 |
| `U03-F10` | Ejemplo 11: La temperatura de trabajo de un equipo de comunicación es T = 17 °C. Calcular  | T = 17 °C; K = 1,38 × 10^-23 J/K | **T = 17 + 273 = 290 K; N0 = 1,38×10^-23 [J/K] × 290 [K] = 4,002×10^-21 W/Hz** | 45 |
| `U03-F12` | Ejemplo12: La temperatura de trabajo de un equipo de comunicación es T = 17 °C y el ancho  | T = 17 °C (290 K); B = 1 Hz; K = 1,38 × 10^-23 J/K | **N0 = 4,002×10^-21 W/Hz; N = N0·B = 4,002×10^-21 W; N_dBm = 10·log10(4,002×10^-21 / 0,001) = -174 dBm** | 47 |
| `U03-F12` | Ejemplo13: La temperatura de trabajo de un equipo de comunicación es T = 17 °C y el ancho  | T = 17 °C (290 K); B = 1 MHz = 10^6 Hz; K = 1,38 × 10^-23 J/K | **N0 = 4,002×10^-21 W/Hz; N = N0·B = 4,002×10^-15 W; N_dBm = 10·log10(4,002×10^-15 / 0,001) = -114 dBm** | 47 |
| `U03-F12` | Ejemplo 14: La temperatura de trabajo de un equipo de comunicaciones es T = 17 °C con un r | T = 17 °C (290 K); rango 0 a 10 MHz → B = 10 MHz = 10^7 Hz; K = 1,38 × 10^-23 J/K | **N0 = 4,002×10^-21 W/Hz; N = N0·B = 4,002×10^-14 W; N_dBm = 10·log10(4,002×10^-14 / 0,001) = -111 dBm** | 48 |
| `U03-F12` | Ejemplo 15: La temperatura de trabajo de un equipo de comunicaciones es T = 17 °C con un r | T = 17 °C (290 K); rango 190 a 200 MHz → B = 10 MHz = 10^7 Hz; K = 1,38 × 10^-23 J/K | **N0 = 4,002×10^-21 W/Hz; N = N0·B = 4,002×10^-14 W; N_dBm = 10·log10(4,002×10^-14 / 0,001) = -111 dBm** | 48 |
| `U03-F14` | Ejercicio sin numerar: calcular la relación señal a ruido en veces para una señal de 10 mW | S = 10 mW; N = 1 µW = 0,001 mW | **SNR = 10 mW / 0,001 mW = 10.000 veces** | 49 |
| `U03-F15` | Ejemplo16 (Relación Señal/Ruido ALTA): potencia media de la señal S = 60 mWatt y potencia  | S = 60 mW (60 × 10^-3 W); N = 5 mW (5 × 10^-3 W) | **SNR = 60×10^-3 / 5×10^-3 = 12 veces; SNR_dB = 10·log10(12) = 10,80 dB** | 51 |
| `U03-F15` | Ejemplo17 (Relación Señal/Ruido BAJA): potencia media de la señal S = 6 mWatt y potencia m | S = 6 mW (6 × 10^-3 W); N = 5 mW (5 × 10^-3 W) | **SNR = 6×10^-3 / 5×10^-3 = 1,20; SNR_dB = 10·log10(1,20) = 0,80 dB** | 52 |
| `U03-F12` | Ejemplo rotulado nuevamente 'Ejemplo09' en la p.54 (debería ser el 18): para el enlace WiF | T = 25 °C; B = 20 MHz = 20 × 10^6 Hz; K = 1,38 × 10^-23 J/K | **T = 25 + 273 = 298 K; N0 = 1,38×10^-23 × 298 = 4,112×10^-21 W/Hz; N = N0·B = 8,224×10^-14 W (0,08224 pW); N_dBm = 10·log10(8,224×10^-14 / 0,001) = -100,8 dBm** | 54 |
| `U03-F15` | Ejemplo 'Ejemplo09' de la p.54: calcular la SNR en dB entre la potencia recibida (RSSI = - | P_RSSI = 268,5 × 10^-12 W; N = 8,224 × 10^-14 W | **SNR_dB-RSSI = 10·log10(268,5×10^-12 / 8,224×10^-14) = 35,13 dB** | 54 |
| `U03-F15` | Ejemplo 'Ejemplo09' de la p.54: calcular la SNR en dB en el umbral de sensibilidad del rec | P_SRX = 6,31 × 10^-12 W; N = 8,224 × 10^-14 W | **SNR_dB-SRX = 10·log10(6,31×10^-12 / 8,224×10^-14) = 18,84 dB** | 54 |
| `U03-F09` | Ejemplo 'Ejemplo09' de la p.54: calcular el margen del enlace por las dos vías (resta de d | RSSI = -65,71 dBm (268,31 pW según la diapositiva); S_RX = -82 dBm (6,31 pW) | **MARGEN = -65,71 dBm - (-82 dBm) = 16,29 dB; y también MARGEN = 10·log10(268,31 pW / 6,31 pW) = 16,29 dB** | 54 |


---

## Unidad 4 — Teoría de la Información y Codificación

> ALCANCE DE LA UNIDAD: la U04 es de teoría de la información y codificación de FUENTE. No contiene ninguna fórmula de capacidad de canal (no aparece Shannon-Hartley C = B·log2(1+S/N)), ni Nyquist, ni ruido térmico, ni potencias en dBm. Si la app espera esas fórmulas, están en otras unidades, no en esta. Todas las fórmulas extraídas son adimensionales o en bit / bit-por-símbolo / bit-por-segundo; la única unidad física real es el segundo (duración de símbolo σ, T_s), lo que exige cuidado si el usuario carga ms o µs.

BASE DEL LOGARITMO: la definición formal (pág. 15) usa base b genérica y aclara que "la base del logaritmo define la unidad de información", pero en toda la unidad se trabaja en base 2 (bit). Varias diapositivas (37, 38, 46-50, 52, 53) escriben simplemente "log" sin subíndice por pérdida del subíndice en la extracción: siempre es log2. En la app, log2(x) = ln(x)/ln(2).

CONTENIDO PERDIDO EN LA EXTRACCION:
- Pág. 14 ("Medida de la Información"): las CUATRO condiciones que debe cumplir la función de información quedaron como una lista vacía "1. 2. 3. 4." porque eran imagen. Una de ellas se deduce de la pág. 18: f(P_A · P_B) = f(P_A) + f(P_B). Las otras tres no se pueden recuperar de este texto.
- Págs. 6, 7, 39-43, 66: diagramas de bloques del sistema de transmisión (fuente / codificador de fuente / codificador de canal / canal / decodificador). Sin fórmulas.
- Pág. 45: tabla del código Morse (imagen). Sin cálculo.
- Págs. 46-47: tablas de dígitos binarios de 3 y 4 bits. Sin fórmula nueva.

DESIGUALDADES (NO calculables, pero útiles como VALIDACION en la app):
- 0 <= H <= log2(N) (pág. 27): la entropía nunca supera log2 N.
- L̄ >= H(x) (págs. 51 y 58, teorema de codificación de fuente de Shannon 1948): ninguna codificación puede tener longitud media menor que la entropía. Sirve para detectar datos mal cargados y para validar U04-F14/U04-F16 (η <= 1).

ALGORITMO DE HUFFMAN (págs. 60-65): es un procedimiento, no una fórmula cerrada, por eso no está en el listado de fórmulas, pero es perfectamente implementable en la app. Los cuatro pasos que da la cátedra: (1) ordenar los símbolos por probabilidad decreciente; (2) sumar las dos probabilidades menores y reinsertar el resultado manteniendo el orden decreciente, repitiendo hasta llegar a probabilidad 1; (3) asignar 0 y 1 a las dos ramas de cada bifurcación (de manera arbitraria); (4) recorrer el árbol de derecha a izquierda leyendo los bits hasta llegar al símbolo. El caso resuelto completo es el Ejemplo 16 (L̄ pasa de 3 a 2,44 dígitos/símbolo, contra una entropía de 2,38).

ERRORES / INCONSISTENCIAS DETECTADAS EN LAS DIAPOSITIVAS (importantes si se usan como tests):
1. Ejemplo 10 (pág. 33): la redundancia da 18,87% pero la diapositiva concluye 20%. El planteo y el reemplazo numérico que muestra son correctos; solo el resultado final está mal. Si se usa como test, esperar 18,87% del cálculo real.
2. Ejemplo 15 (pág. 56): la cadena final afirma "L(C3) > L(C1) > L(C2) > L(C4) = H(x) = 1,5 digitos/simbolo", igualando L̄(C4) con H(x); pero la entropía de esa fuente, calculada en la propia pág. 53, es 1,35 bits/símbolo. La igualdad es falsa (sí se cumple L̄ >= H).
3. Ejemplo 15 (pág. 53): H se informa como 1,35 cuando el valor exacto es 1,357 (truncamiento, no redondeo).
4. Ejemplo 11 (pág. 36): H se informa como 0,920 cuando el valor exacto es 0,918 (afecta levemente R: 3,44 vs 3,4436).
5. Ejemplo 16 (págs. 58 y 66): la tabla da I(x) = 3,83 bit para p = 0,07; el valor exacto es 3,84.
6. Pág. 51: la sumatoria de L̄ está escrita con índice j=1..N pero suma P_i·L_i; el índice correcto es i.

EJERCICIOS SIN RESOLVER (pág. 20, "Ejemplos a resolver"): quedan como candidatos a test una vez resueltos, pero la diapositiva NO da resultados, por eso no se incluyeron en el array de ejemplos: (a) la tirada de un dado equilibrado; (b) la información al conocer que una carta de un mazo de 52 es de corazones, una figura, o una figura de corazones; (c) la elección de una letra del alfabeto español (27 letras); (d) enviar la palabra MIGUEL con ese alfabeto. Todos se resuelven con U04-F01 y U04-F02.

FORMULA SIN EJEMPLO NUMERICO: la eficiencia del codificador η = H(x)/L̄ (U04-F16) se define en la pág. 51 pero nunca se aplica en ningún ejercicio de la unidad. Con los datos del Ejemplo 16 daría η = 2,38/2,44 = 0,975, pero ese cálculo NO figura en las diapositivas.

RELACION QUE APARECE IMPLICITA Y NO SE EXTRAJO COMO FORMULA: en los Ejemplos 05 y 06 se usa que, para un mensaje de n elementos tomados de un alfabeto de M valores equiprobables, la cantidad de mensajes posibles es M^n y la información resulta I = n·log2(M) (3·log2(2) = 3 bit en el Ej. 05; 300.000·log2(10) = 996.578 bit en el Ej. 06). No está enunciada como fórmula propia en ninguna diapositiva —es solo la aplicación de U04-F01 más la propiedad del logaritmo—, por eso no se incluyó, pero podría ser un atajo útil en la app.

### `U04-F01` · Autoinformación (cantidad de información de un evento o símbolo) ✅

$$I_A = \log_b\frac{1}{P_A} = -\log_b P_A$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $I_A$ | Información asociada al evento/símbolo A (autoinformación) | bit (cuando b = 2) |
| $P_A$ | Probabilidad de ocurrencia del evento/símbolo A | adimensional (0 < P_A <= 1) |
| $b$ | Base del logaritmo; define la unidad de información | adimensional (b = 2 -> bit, la usada en toda la unidad) |

**Condiciones:** Vale para un solo evento/mensaje, no describe una fuente completa (para eso se usa la entropía). Requiere 0 < P_A <= 1: con P_A = 1 (suceso seguro) da I = 0 y con P_A = 0 no está definida. La base del logaritmo define la unidad: b = 2 -> bit; la cátedra usa siempre base 2 aunque en varias diapositivas escribe solo 'log'. Despeje inverso: P_A = b^(-I_A) = 2^(-I_A).

**Despejable para:** I_A, P_A

**Confianza:** alta · **Página(s):** 15, 16, 17, 18, 19, 21, 24, 49, 58

### `U04-F02` · Información total de un mensaje formado por símbolos independientes ✅

$$I_{TOTAL} = \sum_{i=1}^{n} I_i = \sum_{i=1}^{n} \log_2\frac{1}{P_i} = \log_2\frac{1}{P_{TOTAL}}, \quad P_{TOTAL} = \prod_{i=1}^{n} P_i$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $I_TOTAL$ | Información total contenida en el mensaje completo | bit |
| $I_i$ | Autoinformación del i-ésimo símbolo del mensaje | bit |
| $P_i$ | Probabilidad del i-ésimo símbolo del mensaje | adimensional (0 < P_i <= 1) |
| $P_TOTAL$ | Probabilidad conjunta del mensaje (producto de las individuales) | adimensional |
| $n$ | Cantidad de símbolos que componen el mensaje (con repetición) | adimensional (entero) |

**Condiciones:** Solo si los símbolos son estadísticamente INDEPENDIENTES (fuente de memoria nula). Es la propiedad f(P_A · P_B) = f(P_A) + f(P_B) que la diapositiva 18 pide comprobar. Si un símbolo se repite en el mensaje, su información se suma tantas veces como aparece (ej. BACA = I_B + I_A + I_C + I_A). No aplica a fuentes con memoria / procesos estocásticos dependientes (págs. 30-32).

**Despejable para:** I_TOTAL, P_TOTAL

**Confianza:** alta · **Página(s):** 17, 18

### `U04-F03` · Normalización: la suma de las probabilidades de la fuente vale 1 ✅

$$\sum_{i=1}^{N} P_i = 1$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $P_i$ | Probabilidad de ocurrencia del símbolo i de la fuente | adimensional (0 <= P_i <= 1) |
| $N$ | Número de símbolos o mensajes distintos que produce la fuente | adimensional (entero) |

**Condiciones:** Vale para el conjunto completo y exhaustivo de los N símbolos de la fuente. La probabilidad nunca puede ser negativa y está acotada entre 0 y 1. En la app sirve para validar el set de probabilidades cargado y para despejar una probabilidad faltante (P_k = 1 - suma del resto). Es la ecuación que se usa en el Ejemplo 09 para hallar P = 1/8 del dado cargado.

**Despejable para:** P_i

**Confianza:** alta · **Página(s):** 12, 23, 29

### `U04-F04` · Información aportada por el símbolo j en una secuencia de L símbolos ✅

$$I_{j,L} = L \cdot P_j \cdot I_j = L \cdot P_j \cdot \log_2\frac{1}{P_j}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $I_{j,L}$ | Información asociada al símbolo j dentro de la secuencia de longitud L | bit |
| $L$ | Longitud de la secuencia transmitida (cantidad total de mensajes/símbolos) | adimensional (entero, se supone L >> 1) |
| $P_j$ | Probabilidad de ocurrencia del símbolo j | adimensional (0 < P_j <= 1) |
| $I_j$ | Autoinformación del símbolo j | bit |

**Condiciones:** Aproximación válida solo para secuencias largas (L >> 1), donde el símbolo j ocurre aproximadamente L·P_j veces. No se despeja P_j en forma cerrada porque queda además dentro del logaritmo de I_j.

**Despejable para:** I_{j,L}, L

**Confianza:** alta · **Página(s):** 24

### `U04-F05` · Información total contenida en una secuencia larga de L símbolos ✅

$$I_T = L\sum_{j=1}^{N} P_j \log_2\frac{1}{P_j} = L \cdot H$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $I_T$ | Información total contenida en la secuencia de L símbolos | bit |
| $L$ | Cantidad de mensajes/símbolos de la secuencia | adimensional (entero, L >> 1) |
| $H$ | Entropía de la fuente | bit/símbolo |
| $P_j$ | Probabilidad del símbolo j | adimensional |
| $N$ | Número de símbolos distintos de la fuente | adimensional (entero) |

**Condiciones:** Válida para secuencias largas (L >> 1) de símbolos distintos e independientes. Es la suma I_T = L·P_1·I_1 + L·P_2·I_2 + ... + L·P_N·I_N. Dividida por L da la entropía (información promedio por símbolo).

**Despejable para:** I_T, L, H

**Confianza:** alta · **Página(s):** 25, 26

### `U04-F06` · Entropía de la fuente (información promedio por símbolo) ✅

$$H = \frac{I_T}{L} = \sum_{j=1}^{N} P_j \log_2\frac{1}{P_j} \;\left[\frac{bits}{simbolo}\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H$ | Entropía de la fuente: información promedio por símbolo | bit/símbolo |
| $P_j$ | Probabilidad de ocurrencia del símbolo j | adimensional (0 < P_j <= 1) |
| $N$ | Número de símbolos o mensajes distintos que produce la fuente | adimensional (entero) |
| $I_T$ | Información total de una secuencia de L símbolos | bit |
| $L$ | Cantidad de símbolos de la secuencia | adimensional (entero) |

**Condiciones:** Supone una fuente discreta con N símbolos distintos e INDEPENDIENTES (fuente de memoria nula) y sum(P_j) = 1. Los términos con P_j = 0 se toman como 0. Está acotada por 0 <= H <= log2(N): vale 0 si un símbolo tiene probabilidad 1, y es máxima con símbolos equiprobables. Los P_j individuales NO se despejan en forma cerrada (quedan dentro de la suma y del logaritmo). En las diapositivas 37, 38, 50 y 52 se escribe 'log' sin base, pero siempre es log2.

**Despejable para:** H

**Confianza:** alta · **Página(s):** 25, 26, 27, 28, 29, 33, 37, 38, 46, 47, 48, 49, 50, 52, 53, 58

### `U04-F07` · Entropía máxima (fuente con símbolos equiprobables) ✅

$$H_{MAX} = \log_2 N \;\left[\frac{bits}{simbolo}\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H_MAX$ | Entropía máxima de la fuente (información promedio por símbolo con equiprobabilidad) | bit/símbolo |
| $N$ | Número de símbolos o mensajes distintos que produce la fuente | adimensional (entero >= 2) |

**Condiciones:** Vale SOLO cuando todos los símbolos son equiprobables: P_1 = P_2 = ... = P_N = P = 1/N. Es la cota superior de la entropía de cualquier fuente de N símbolos: 0 <= H <= log2(N). Despeje inverso: N = 2^(H_MAX).

**Despejable para:** H_MAX, N

**Confianza:** alta · **Página(s):** 27, 28, 29, 33, 46, 47, 48

### `U04-F08` · Redundancia de una fuente (porcentual) ✅

$$Rd\% = \frac{H_{MAX} - H}{H_{MAX}} \times 100$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $Rd$ | Redundancia de la fuente | % (porcentaje) |
| $H_MAX$ | Entropía máxima de la fuente = log2(N) | bit/símbolo |
| $H$ | Entropía real de la fuente | bit/símbolo |

**Condiciones:** H y H_MAX deben estar en la misma unidad (bit/símbolo) y corresponder a la misma fuente (mismo N). Requiere H_MAX > 0 (N >= 2). Resultado acotado entre 0% (fuente equiprobable, sin redundancia) y 100% (fuente totalmente predecible, H = 0). Despejes: H = H_MAX·(1 - Rd/100); H_MAX = H / (1 - Rd/100).

**Despejable para:** Rd, H, H_MAX

**Confianza:** alta · **Página(s):** 33

### `U04-F09` · Duración promedio del símbolo ⚠️

$$\bar{\sigma} = \sum_{j=1}^{m} P_j \, \sigma_j \;\left[\frac{seg}{simbolo}\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $σ̄ (sigma barra)$ | Duración promedio del símbolo | segundo/símbolo (seg) |
| $P_j$ | Probabilidad del símbolo j | adimensional |
| $σ_j$ | Duración del símbolo j | segundo (seg) |
| $m$ | Cantidad de símbolos distintos de la fuente | adimensional (entero) |

**Condiciones:** Se usa cuando los símbolos tienen DISTINTA duración (ej. punto y raya del telégrafo). Requiere sum(P_j) = 1. Si todos los símbolos duran lo mismo, σ̄ = σ = T_s y se usa directamente U04-F11/U04-F12. Su inversa 1/σ̄ es el número promedio de símbolos por unidad de tiempo.

**Despejable para:** \bar{\sigma}

**Confianza:** alta · **Página(s):** 35, 36, 37

> [!WARNING]
> **Observación de verificación (menor)**  
> Inconsistencia interna de simbolos: variables[].simbolo declara "σ̄ (sigma barra)" (unicode + prosa) mientras expresion_latex y despejable_para usan el token "\bar{\sigma}". Ningun simbolo declarado coincide literalmente con el que pide despejable_para, asi que un resolvedor que haga lookup por nombre no puede ligar la variable. En U05-F03 (la MISMA formula) esta bien hecho: alli variables usa "\bar{\sigma}". Es defecto exclusivo de U04.  
> 
> **Corrección propuesta:** variables[0].simbolo: "\bar{\sigma}" (dejar "sigma barra" en el campo significado). El resto de la formula esta correcta: \bar{\sigma} = \sum_{j=1}^{m} P_j \sigma_j coincide literal con la pag. 35.

### `U04-F10` · Tasa de información de una fuente discreta ⚠️

$$R = \frac{H}{\bar{\sigma}} \;\left[\frac{bit}{s}\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Tasa (velocidad) de información media de la fuente | bit/s (bps) |
| $H$ | Entropía de la fuente | bit/símbolo |
| $σ̄ (sigma barra)$ | Duración promedio del símbolo | segundo/símbolo (seg) |

**Condiciones:** Forma general, válida también cuando los símbolos tienen distinta duración (σ̄ se calcula con U04-F09). σ̄ debe estar en segundos: si se carga en ms hay que convertir, o el resultado sale en kbps. Describe la fuente en bits/segundo, a diferencia de la entropía que es bits/símbolo.

**Despejable para:** R, H, \bar{\sigma}

**Confianza:** alta · **Página(s):** 35, 36, 37

> [!WARNING]
> **Observación de verificación (menor)**  
> Mismo defecto de binding: variables declara "σ̄ (sigma barra)" pero despejable_para pide "\bar{\sigma}".  
> 
> **Corrección propuesta:** variables[2].simbolo: "\bar{\sigma}". La expresion R = H/\bar{\sigma} y los despejes R, H, \bar{\sigma} son algebraicamente correctos y coinciden con la pag. 35.

### `U04-F11` · Velocidad de símbolos (símbolos por segundo) ⚠️

$$r = \frac{1}{\sigma} = \frac{1}{T_S} \;\left[\frac{simbolos}{segundo}\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $r$ | Número de símbolos emitidos por unidad de tiempo | símbolos/segundo (baudios) |
| $σ = T_S$ | Duración de cada símbolo | segundo (seg) |

**Condiciones:** Válida solo si TODOS los símbolos tienen la misma duración σ = T_s. T_s en segundos (si se ingresa en ms, r sale en ksímbolos/s).

**Despejable para:** r, T_S

**Confianza:** alta · **Página(s):** 37

> [!WARNING]
> **Observación de verificación (menor)**  
> Doble defecto: (a) la unica variable de duracion se declara con el simbolo COMPUESTO "σ = T_S", asi que el token "T_S" que pide despejable_para no existe como simbolo declarado; (b) esa variable lleva unidad "segundo (seg)" mientras que la formula r = 1/σ exige leerla como seg/simbolo para que r salga en simbolos/segundo.  
> 
> **Corrección propuesta:** Declarar DOS entradas de variable: {simbolo: "\sigma", unidad: "seg/simbolo"} y {simbolo: "T_S", unidad: "seg/simbolo"}, con la nota de que \sigma = T_S. La expresion r = 1/\sigma = 1/T_S es correcta (pag. 37).

### `U04-F12` · Tasa de información con símbolos de igual duración ✅

$$R = \frac{H}{T_s} = r\,H = r\sum_{j=1}^{N} P_j \log_2\frac{1}{P_j} \;(bps)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Tasa de información de la fuente | bit/s (bps) |
| $H$ | Entropía de la fuente | bit/símbolo |
| $T_s$ | Duración de cada símbolo (todos iguales) | segundo (seg) |
| $r$ | Velocidad de símbolos = 1/T_s | símbolos/segundo |
| $P_j$ | Probabilidad del símbolo j | adimensional |
| $N$ | Número de símbolos distintos de la fuente | adimensional (entero) |

**Condiciones:** Supone que todos los símbolos tienen la misma duración σ = T_s (por eso r = 1/T_s). Si las duraciones difieren hay que usar U04-F10 con σ̄. R es máxima cuando los símbolos son equiprobables (entonces H = log2 N, ver U04-F13). T_s en segundos y r en símbolos/segundo para obtener bps.

**Despejable para:** R, H, r, T_s

**Confianza:** alta · **Página(s):** 37, 38

### `U04-F13` · Tasa de información con símbolos equiprobables e igual duración ✅

$$R = r\,H = \frac{1}{T_s}\log_2 N \;(bps)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Tasa de información máxima de la fuente | bit/s (bps) |
| $r$ | Velocidad de símbolos = 1/T_s | símbolos/segundo |
| $T_s$ | Duración de cada símbolo | segundo (seg) |
| $N$ | Número de símbolos distintos de la fuente | adimensional (entero >= 2) |

**Condiciones:** Doble supuesto: símbolos EQUIPROBABLES (P_j = 1/N, por eso H = log2 N) y todos de la MISMA duración T_s. Es la tasa máxima alcanzable por esa fuente. La diapositiva escribe el paso intermedio como r·log(1/P_j) sin indicar la base: es log2 y solo tiene sentido bajo equiprobabilidad. Despeje inverso: N = 2^(R·T_s) = 2^(R/r).

**Despejable para:** R, r, T_s, N

**Confianza:** alta · **Página(s):** 37

### `U04-F14` · Longitud promedio de la palabra código ⚠️

$$\bar{L} = \sum_{i=1}^{N} P_i L_i \;\left[\frac{digitos}{simbolo}\right]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $L̄ (L barra)$ | Longitud promedio de la palabra código (número promedio de dígitos binarios por símbolo) | dígitos binarios/símbolo |
| $P_i$ | Probabilidad del símbolo x_i de la fuente | adimensional |
| $L_i$ | Longitud en dígitos binarios de la palabra código b_i asignada al símbolo x_i | dígitos binarios (entero) |
| $N$ | Número de símbolos de la fuente S | adimensional (entero) |

**Condiciones:** Requiere sum(P_i) = 1 y un código unívocamente decodificable. Por el teorema de codificación de fuente (Shannon, 1948) siempre debe cumplirse L̄ >= H(x): sirve como validación del resultado. Un código con L̄ mínima se llama CODIGO COMPACTO. Si todas las palabras tienen la misma longitud L, entonces L̄ = L. Nota de transcripción: la diapositiva escribe el índice de la sumatoria como j=1..N pero suma P_i·L_i; el índice correcto es i.

**Despejable para:** \bar{L}

**Confianza:** alta · **Página(s):** 51, 52, 53, 54, 55, 56, 59, 65

> [!WARNING]
> **Observación de verificación (menor)**  
> variables[0].simbolo es "L̄ (L barra)" pero despejable_para pide "\bar{L}"; no ligan.  
> 
> **Corrección propuesta:** variables[0].simbolo: "\bar{L}". La expresion \bar{L} = \sum P_i L_i y la nota sobre el indice j vs i de la pag. 51 son correctas (verifique los cuatro codigos C1..C4 del Ejemplo 15 y los dos del Ejemplo 16: 2 / 1,6 / 2,8 / 1,5 / 3 / 2,44 digitos-simbolo, todos dan).

### `U04-F15` · Longitud promedio del código a partir de los bits totales transmitidos ⚠️

$$\bar{L} = \frac{B_{total}}{n}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $L̄ (L barra)$ | Longitud promedio del código | dígitos binarios/símbolo |
| $B_total$ | Cantidad total de bits utilizados para codificar el mensaje | bit (dígitos binarios) |
| $n$ | Cantidad de símbolos del mensaje codificado | adimensional (entero) |

**Condiciones:** Se aplica a un mensaje concreto ya codificado del que se conoce el total de bits emitidos y la cantidad de símbolos. Solo coincide con U04-F14 si las frecuencias relativas del mensaje coinciden con las probabilidades de la fuente.

**Despejable para:** \bar{L}, B_{total}, n

**Confianza:** media — No aparece como fórmula destacada sino como paso aritmético inline del Ejemplo 14 ('12 bits ... la longitud promedio del código seria: 12/8 = 1,5'). Es equivalente a U04-F14 medida sobre un mensaje concreto en lugar de sobre las probabilidades teóricas. · **Página(s):** 50, 52

> [!WARNING]
> **Observación de verificación (menor)**  
> variables declara "L̄ (L barra)" y "B_total" mientras despejable_para pide "\bar{L}" y "B_{total}". Ninguno de los dos primeros liga.  
> 
> **Corrección propuesta:** variables[0].simbolo: "\bar{L}"; variables[1].simbolo: "B_{total}". La formula \bar{L} = B_{total}/n es correcta (12/8 = 1,5 en pag. 50/52).

### `U04-F16` · Eficiencia del codificador de fuente ⚠️

$$\eta = \frac{H(x)}{\bar{L}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $η (eta)$ | Eficiencia del codificador de fuente | adimensional (0 < η <= 1; x100 si se quiere en %) |
| $H(x)$ | Entropía de la fuente | bit/símbolo |
| $L̄ (L barra)$ | Longitud promedio de la palabra código | dígitos binarios/símbolo |

**Condiciones:** Como L̄ >= H(x) (teorema de codificación de fuente), η nunca supera 1; η = 1 solo en el codificador óptimo/compacto ideal. Requiere L̄ > 0 y que H y L̄ correspondan a la misma fuente. La diapositiva la define sin multiplicar por 100: para expresarla en porcentaje hay que multiplicar por 100. No hay ningún ejemplo numérico de esta fórmula en la unidad.

**Despejable para:** \eta, H(x), \bar{L}

**Confianza:** alta · **Página(s):** 51

> [!WARNING]
> **Observación de verificación (menor)**  
> variables declara "η (eta)" y "L̄ (L barra)" pero despejable_para pide "\eta" y "\bar{L}".  
> 
> **Corrección propuesta:** variables[0].simbolo: "\eta"; variables[2].simbolo: "\bar{L}". La definicion η = H(x)/\bar{L} sin factor 100 coincide literal con la pag. 51.

#### Recuperadas por la verificación

- **Informacion de un mensaje de n elementos tomados de un alfabeto de M simbolos equiprobables** — $I = \log_2 M^{\,n} = n\,\log_2 M \;[bit]$ · pág. 18

### Ejemplos resueltos — Unidad 4

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U04-F01` | Ejemplo 01: arrojar una moneda no defectuosa al aire y observar el resultado. Calcular la  | P_cara = P_seca = 1/2 = 0,5 | **I_cara = log2(1/0,5) = log2(2) = 1 bit; I_seca = log2(2) = 1 bit** | 16 |
| `U04-F01` | Ejemplo 02: experimento aleatorio con 16 resultados/eventos igualmente probables. Calcular | 16 eventos equiprobables -> P(x_j) = 1/16 | **I(x_j) = log2(16) = 4 bits** | 17 |
| `U04-F02` | Ejemplo 03: una fuente de memoria nula genera dos símbolos; determinar la autoinformación  | P_A = 1/4; P_B = 3/4 | **I_A = log2(4) = 2 bit; I_B = log2(4/3) = 0,414 bit; I_TOTAL = 2 + 0,414 = 2,414 bit. Vía conjunta: P_TOTAL = 1/4 · 3/4 = 3/16 -> I_TOTAL = log2(16/3) = 2,414 bit** | 17 |
| `U04-F02` | Ejemplo 04: una fuente produce los símbolos A, B, C y D independientes. Calcular la autoin | P_A = 1/2; P_B = 1/4; P_C = 1/8; P_D = 1/8; mensaje = BACA | **I_A = log2(2) = 1 bit; I_B = log2(4) = 2 bit; I_C = log2(8) = 3 bit; I_D = log2(8) = 3 bit; I_BACA = 2 + 1 + 3 + 1 = 7 bits** | 18 |
| `U04-F01` | Ejemplo 05: se lanza una moneda tres veces seguidas; los ocho (2^3) resultados/mensajes (0 | P_MSJ = 1/8 (2^3 = 8 mensajes equiprobables) | **I_MSJ = log2(8) = 3 bit; equivalentemente I_MSJ = log2(2^3) = 3·log2(2) = 3 bit** | 18 |
| `U04-F01` | Ejemplo 06: imagen de televisión de 500 filas por 600 columnas de puntos, cada punto con 1 | 500 x 600 = 300.000 puntos; 10 niveles de brillo -> 10^300.000 imágenes distintas; P_IMG = 1/10^300.000 | **I_IMG = log2(10^300.000) = 300.000·log2(10) = 996.578 bits ≈ 1 Mb** | 19 |
| `U04-F06` | Ejemplo 07: una fuente produce cuatro símbolos A, B, C y D; calcular la entropía de la fue | P_A = 0,5; P_B = 0,25; P_C = 0,125; P_D = 0,125. Caso equiprobable: P = 1/4, N = 4 | **H = 0,5·log2(2) + 0,25·log2(4) + 0,125·log2(8) + 0,125·log2(8) = 1,75 bits/símbolo; H_MAX = log2(4) = 2 bits/símbolo** | 28 |
| `U04-F07` | Ejemplo 08: información producida por una máquina de escribir de 26 letras más el espacio  | N = 27; P = 1/27 | **H_MAX = log2(27) = 4,75 bits/símbolo** | 28 |
| `U04-F07` | Ejemplo 09 (a): calcular la entropía asociada a un dado 'correcto' (equilibrado). | N = 6 caras equiprobables (P = 1/6) | **H_MAX = log2(6) = 2,58 bits/símbolo** | 29 |
| `U04-F06` | Ejemplo 09 (b): calcular la entropía de un dado manipulado de manera que la probabilidad d | P1 = 0,25; P2 = 0,125; P3 = 0,125; P4 = 0,125; P5 = 0,125; P6 = 0,25 | **H = 2 x 0,25·log2(4) + 4 x 0,125·log2(8) = 2,50 bits/símbolo** | 29 |
| `U04-F08` | Ejemplo 10: calcular la redundancia de una fuente binaria. ATENCION: la diapositiva escrib | P(0) = 1/4; P(1) = 3/4; N = 2 | **H = (1/4)·log2(4) + (3/4)·log2(4/3) = 0,811 bits/símbolo; H_MAX = log2(2) = 1 bit/símbolo; Rd = ((1 - 0,811)/1) x 100 = 20% según la diapositiva (valor exacto: 18,87%)** | 33 |
| `U04-F10` | Ejemplo 11: calcular la tasa de información de una fuente telegráfica cuyos símbolos (punt | P_punto = 2/3; P_raya = 1/3; σ_punto = 0,2 seg; σ_raya = 0,4 seg | **H = (2/3)·log2(3/2) + (1/3)·log2(3) = 0,920 bit/símbolo (exacto 0,918); σ̄ = (2/3)·0,2 + (1/3)·0,4 = 0,267 seg/símbolo; R = 0,920/0,267 = 3,44 bit/s** | 36 |
| `U04-F12` | Ejemplo 12: una fuente produce cuatro símbolos A, B, C y D a una velocidad de 1000 símbolo | P_A = 0,5; P_B = 0,25; P_C = 0,125; P_D = 0,125; r = 1000 símbolos/seg. Caso equiprobable: P_i = 1/4 (N = 4) | **Probabilidades distintas: H = 1,75 bit/símbolo -> R = 1000 x 1,75 = 1750 bps. Equiprobables: H = log2(4) = 2 bit/símbolo -> R = 1000 x 2 = 2000 bps** | 38 |
| `U04-F07` | Ejemplo 13: se quieren representar (codificar) los 10 dígitos decimales equiprobables usan | N = 10 sucesos equiprobables; P = 1/10 | **H = sum(1/10 · log2(10)) = log2(10) = 3,32 bit/dígito** | 46 |
| `U04-F14` | Ejemplo 14: mensaje con 3 estados {x1, x2, x3}. Se codifica x1 con '0', x2 con '10' y x3 c | P(x1) = 50% = 0,5; P(x2) = 25% = 0,25; P(x3) = 25% = 0,25; L1 = 1, L2 = 2, L3 = 2 dígitos; mensaje de 8 símbolos codificado en 12 bits | **I(x1) = log2(2) = 1 bit; I(x2) = log2(4) = 2 bits; I(x3) = log2(4) = 2 bits; H(x) = 0,5·log2(2) + 0,25·log2(4) + 0,25·log2(4) = 1,5 bit/símbolo; L̄ = 0,5·1 + 0,25·2 + 0,25·2 = 1,5 dígitos/símbolo (también 12/8 = 1,5)** | 52 |
| `U04-F06` | Ejemplo 15 (entropía y código C1): fuente discreta sin memoria X = {x0, x1, x2, x3}. Calcu | p(0) = 0,7; p(1) = 0,1; p(2) = 0,1; p(3) = 0,1; código C1 con L_i = 2 dígitos para los 4 símbolos | **H(x) = (7/10)·log2(10/7) + 3·(1/10)·log2(10) = 1,35 bits/símbolo; L̄(C1) = 0,7·2 + 0,1·2 + 0,1·2 + 0,1·2 = 2 dígitos/símbolo** | 53 |
| `U04-F14` | Ejemplo 15 (código C2, longitudes variables): misma fuente, codificación 0->'0', 1->'101', | p(0) = 0,7 con L = 1; p(1) = 0,1 con L = 3; p(2) = 0,1 con L = 3; p(3) = 0,1 con L = 3 | **L̄(C2) = 0,7·1 + 0,1·3 + 0,1·3 + 0,1·3 = 1,6 dígitos/símbolo** | 54 |
| `U04-F14` | Ejemplo 15 (código C3, asignación inconveniente): misma fuente, pero la secuencia más cort | p(0) = 0,7 con L = 3; p(1) = 0,1 con L = 3; p(2) = 0,1 con L = 3; p(3) = 0,1 con L = 1 | **L̄(C3) = 0,7·3 + 0,1·3 + 0,1·3 + 0,1·1 = 2,8 dígitos/símbolo** | 55 |
| `U04-F14` | Ejemplo 15 (código C4, código compacto): misma fuente, codificación 0->'0', 1->'10', 2->'1 | p(0) = 0,7 con L = 1; p(1) = 0,1 con L = 2; p(2) = 0,1 con L = 3; p(3) = 0,1 con L = 3 | **L̄(C4) = 0,7·1 + 0,1·2 + 0,1·3 + 0,1·3 = 1,5 dígitos/símbolo** | 56 |
| `U04-F06` | Ejemplo 16 (entropía): fuente continua discretizada con un cuantificador uniforme de 8 niv | p(0) = 0,20; p(1) = 0,01; p(2) = 0,40; p(3) = 0,04; p(4) = 0,10; p(5) = 0,02; p(6) = 0,07; p(7) = 0,16 | **H(x) = 2,38 bits/símbolo. Tabla de I(x) en bit: p(0)=2,32; p(1)=6,64; p(2)=1,32; p(3)=4,64; p(4)=3,32; p(5)=5,64; p(6)=3,83 (valor exacto 3,84); p(7)=2,64** | 58 |
| `U04-F14` | Ejemplo 16 (código C1 de longitud fija): a la misma fuente de 8 niveles se le asigna a cad | p(0)=0,20; p(1)=0,01; p(2)=0,40; p(3)=0,04; p(4)=0,10; p(5)=0,02; p(6)=0,07; p(7)=0,16; todos con L_i = 3 dígitos | **L̄(C1) = 0,20·3 + 0,01·3 + 0,40·3 + 0,04·3 + 0,10·3 + 0,02·3 + 0,07·3 + 0,16·3 = 3 dígitos/símbolo** | 59 |
| `U04-F14` | Ejemplo 16 (código C2 obtenido con el algoritmo de Huffman): mismas probabilidades, código | 0,40 con L=1; 0,20 con L=3; 0,16 con L=3; 0,10 con L=3; 0,07 con L=4; 0,04 con L=5; 0,02 con L=6; 0,01 con L=6 | **L̄(C2) = 0,40·1 + 0,20·3 + 0,16·3 + 0,10·3 + 0,07·4 + 0,04·5 + 0,02·6 + 0,01·6 = 2,44 dígitos/símbolo (contra L̄(C1) = 3 y H(x) = 2,38 bits/símbolo)** | 65 |


---

## Unidad 5 — Canales de Comunicaciones

> FUENTE LEIDA COMPLETA: 37 paginas, todos los marcadores [[PAGINA n]] revisados.

EXCLUSIONES DELIBERADAS (no son calculables):
- Teorema de codificacion de la fuente, pag. 5: L(C) >= H(x) [digitos binarios/simbolo]. Es una desigualdad/cota, no produce un numero; sirve como VALIDACION de U05-F07 y U05-F08 (si L < H, los datos estan mal, y eta nunca puede pasar de 1). Vale la pena implementarla como chequeo en la app, no como formula.
- Segundo teorema de Shannon, pag. 18: criterio R <= C (transmision con error arbitrariamente pequeno) vs R > C (imposible sin errores). Es un comparador, no un calculo; util como validador cruzado entre U05-F05 y U05-F17.
- Condicion de Nyquist f_S >= 2 f_Max (pag. 23): la igualdad si esta capturada en U05-F14.
- Paginas 1, 3, 4, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 30 son puramente conceptuales o diagramas de bloques (Fuente-Codificador-Canal-Decodificador-Destino): sin formulas. La pagina 13 y los items c) y d) del Ejemplo 04 son representaciones graficas de v(t) y compresion de pulsos, sin calculo cerrado.

TRAMPAS DE EXTRACCION QUE TUVE QUE RECONSTRUIR (revisar contra el PDF original si se puede):
- Pag. 32: la RAIZ CUADRADA de M = raiz(1 + SNR) se perdio por completo en la extraccion (queda 'M = (1 + SNR)'). Confirmada por la pag. 34, donde sobrevive como '√((1 + 100))', y por los resultados numericos (16 = raiz(256), 10,04 = raiz(101)). Si se transcribiera sin la raiz, la app daria M = 256 en vez de 16: seria el bug mas grave de esta unidad.
- Pag. 2: los logaritmos de R = r x sum(Pj log(1/Pj)) y R = (1/Ts) log N figuran SIN el subindice 2. La base 2 se infiere de la unidad impresa [bps]. Por eso U05-F06 quedo en confianza media.
- Pag. 2: las fracciones 1/Pi, 1/Ts, H/sigma venian partidas en dos lineas; se reconstruyeron con verificacion dimensional (r en simbolo/seg, sigma en seg/simbolo).
- Pag. 2: la sumatoria de H(x) tiene indice 'i=1..N' pero terminos 'P_j': inconsistencia de la propia diapositiva.
- Pag. 28 y 35: los exponentes 2^(20/3) y 2^(100/20) aparecen partidos en tres lineas ('2' / '20' / '3').

ERRORES O REDONDEOS DISCUTIBLES DE LAS DIAPOSITIVAS (copiados tal cual en los ejemplos, pero conviene que la app no los replique como verdad):
1. Pag. 35, Ejemplo 13 d): la lamina escribe 'SNR = 2^5 - 1 = 31 dB'. 31 es el valor LINEAL; en dB serian 14,91 dB. Esta mal rotulado.
2. Pag. 27 y 33, Ejemplos 06 y 11: 24 dB se convierte a SNR = 255 cuando el valor exacto es 251,19. Se fuerza para que 1+SNR = 256.
3. Pag. 34 y 35, Ejemplos 12 y 13 c): M = 10,04 se 'redondea' a M = 8 (potencia de 2 inferior), no a 10 ni a 16. Es una convencion de la catedra, conviene documentarla en la app.
4. Pag. 28, Ejemplo 09: 2^(20/3) - 1 = 100,59 se informa como 100.
5. Pag. 29, Ejemplo 10 b): el enunciado pide caracteres/segundo pero la diapositiva se detiene en C = 21,3 Kbps sin dividir por los 6,78 bit/tecla (daria ~3143 caracteres/seg). Ejercicio incompleto en la fuente.
6. Pag. 10, Ejemplo 03: la cuenta usa T = 8 seg (I = 8/0,5) mientras los Ejemplos 01 y 02 usaban T = 16 seg; el enunciado no lo aclara, solo dice 'lo mismo ocurre con la duracion del intervalo'.

RIESGO DE UNIDADES PARA LA APP (critico):
- U05-F17 y U05-F19: la S/N debe entrar SIEMPRE en lineal. La mitad de los ejemplos de la unidad dan el dato en dB (24 dB, 20 dB), asi que la app deberia ofrecer el toggle dB/lineal y encadenar U05-F18 automaticamente. Confundirlos es el error mas probable del alumno.
- B en Hz/kHz/MHz determina la escala de C (bps/Kbps/Mbps): en los ejemplos conviven 3100 Hz, 3,2 KHz, 1 MHz y 20 MHz.
- S y N deben estar en la MISMA unidad de potencia (W o mW) para que S/N sea adimensional.

MATERIAL COMPLEMENTARIO: no hay tablas de estandares (Cat5e, fibras) en esta unidad; la parte de 'Canales de Comunicaciones y Tipos de Canales' (pags. 15 y 16) es solo taxonomia conceptual (canal de informacion vs canal fisico, analogico vs digital). La seccion 'Relacion Eb/No' (pags. 36 y 37) es la mas densa en formulas encadenadas y no trae ningun ejemplo numerico resuelto: es la candidata numero uno a que la catedra tome ejercicios en el parcial sin que haya casos de test en estas diapositivas.

### `U05-F01` · Cantidad de informacion de un simbolo (informacion propia) ✅

$$I_i = \log_2\left(\frac{1}{P_i}\right) = -\log_2 P_i$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $I_i$ | informacion aportada por el simbolo x_i | bit |
| $P_i$ | probabilidad de ocurrencia del simbolo x_i | adimensional (0 < P_i <= 1) |

**Condiciones:** Fuente discreta con N simbolos distintos e independientes. P_i debe estar en (0,1]; con P_i = 0 la formula diverge. El despeje inverso es P_i = 2^(-I_i). Si los simbolos son equiprobables, P_i = 1/N y se reduce a I = log2(N) (ver U05-F12).

**Despejable para:** I_i, P_i

**Confianza:** alta · **Página(s):** 2, 29

### `U05-F02` · Entropia de la fuente H(x) ✅

$$H(x) = \sum_{j=1}^{N} P_j \log_2\left(\frac{1}{P_j}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H(x)$ | entropia: informacion promedio por simbolo de la fuente | bit/simbolo |
| $P_j$ | probabilidad del simbolo j | adimensional |
| $N$ | cantidad de simbolos del alfabeto de la fuente | adimensional (entero) |

**Condiciones:** Requiere el conjunto completo de probabilidades, con sum(P_j) = 1. Los terminos con P_j = 0 se toman como 0. No se puede despejar un P_j individual en forma cerrada (queda dentro de una sumatoria de logaritmos).

**Despejable para:** H(x)

**Confianza:** alta — En la diapositiva el indice de la sumatoria figura como i=1..N mientras los terminos usan P_j: es una inconsistencia de notacion de la propia diapositiva, no afecta el calculo. · **Página(s):** 2, 6

### `U05-F03` · Duracion promedio de un simbolo ✅

$$\bar{\sigma} = \sum_{j=1}^{m} P_j\,\sigma_j$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $\bar{\sigma}$ | duracion promedio de un simbolo de la fuente | seg/simbolo |
| $P_j$ | probabilidad del simbolo j | adimensional |
| $\sigma_j$ | duracion del simbolo j | seg |
| $m$ | cantidad de simbolos considerados | adimensional (entero) |

**Condiciones:** Se usa cuando los simbolos NO tienen todos la misma duracion. Si todos duran lo mismo, sigma_barra = T_S. Requiere sum(P_j) = 1.

**Despejable para:** \bar{\sigma}

**Confianza:** alta · **Página(s):** 2

### `U05-F04` · Velocidad de simbolos (tasa de senalizacion) ⚠️

$$r = \frac{1}{\sigma} = \frac{1}{T_S}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $r$ | velocidad de simbolos emitidos por la fuente | simbolo/seg (baudios) |
| $\sigma$ | duracion de un simbolo (equivale a T_S) | seg/simbolo |
| $T_S$ | duracion de cada simbolo | seg |

**Condiciones:** Vale con simbolos de duracion uniforme; con duraciones distintas usar r = 1/sigma_barra (U05-F03). T_S > 0.

**Despejable para:** r, \sigma, T_S

**Confianza:** alta — La fraccion venia partida en dos lineas ('1' / 'sigma = 1' / 'T_S'); se reconstruyo como 1/sigma = 1/T_S = r. La unidad impresa en la diapositiva (simbolo/seg) confirma la reconstruccion. · **Página(s):** 2

> [!WARNING]
> **Observación de verificación (menor)**  
> Inconsistencia dimensional dentro de la misma formula: declara \sigma con unidad "seg/simbolo" y T_S con unidad "seg", pero la propia expresion afirma \sigma = T_S. Un motor que propague unidades marcara conflicto al despejar T_S desde r.  
> 
> **Corrección propuesta:** Unificar ambas a "seg/simbolo" (o ambas a "seg"). La expresion r = 1/\sigma = 1/T_S y la unidad impresa simbolo/seg de la pag. 2 son correctas.

### `U05-F05` · Velocidad de transmision de informacion (velocidad de entropia de la fuente) R ✅

$$R = \frac{H}{\bar{\sigma}} = \frac{H}{T_S} = r \times H$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | tasa de informacion de la fuente | bit/seg (bps) |
| $H$ | entropia de la fuente | bit/simbolo |
| $\bar{\sigma}$ | duracion promedio del simbolo | seg/simbolo |
| $T_S$ | duracion de cada simbolo (cuando son todos iguales) | seg |
| $r$ | velocidad de simbolos | simbolo/seg |

**Condiciones:** H debe calcularse con U05-F02. Se compara contra la capacidad C del canal: si R <= C existe codificacion con error arbitrariamente pequeno; si R > C no es posible transmitir sin errores (segundo teorema de Shannon, pag. 18).

**Despejable para:** R, H, \bar{\sigma}, T_S, r

**Confianza:** alta · **Página(s):** 2

### `U05-F06` · Velocidad de transmision para simbolos equiprobables ✅

$$R = r \times H = \frac{1}{T_S} \times \log_2 N$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | tasa de informacion de la fuente | bit/seg (bps) |
| $T_S$ | duracion de cada simbolo | seg |
| $N$ | cantidad de simbolos equiprobables del alfabeto | adimensional (entero) |

**Condiciones:** Solo para simbolos equiprobables (P_j = 1/N para todo j), de igual duracion T_S. Despeje inverso: N = 2^(R*T_S).

**Despejable para:** R, T_S, N

**Confianza:** media — En la diapositiva el logaritmo aparece como 'logN' y 'log 1/Pj' sin el subindice 2 (se perdio en la extraccion del PDF). La base 2 se infiere del contexto y de la unidad impresa [bps] (bits). Ademas la fraccion 1/T_S venia partida en dos lineas. · **Página(s):** 2

### `U05-F07` · Longitud promedio de una palabra codigo ✅

$$\bar{L} = \sum_{j=1}^{N} P_j \times L_j$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $\bar{L}$ | numero promedio de digitos binarios por simbolo | digitos binarios/simbolo |
| $P_j$ | probabilidad del simbolo S_j | adimensional |
| $L_j$ | longitud (cantidad de digitos binarios) de la palabra codigo b_j asignada a S_j | digitos binarios (entero) |
| $N$ | cantidad de simbolos de la fuente | adimensional (entero) |

**Condiciones:** Codificacion binaria de una fuente discreta de N simbolos. Requiere sum(P_j) = 1. Por el teorema de codificacion de la fuente (Shannon) siempre debe cumplirse L_barra >= H(x); si da menor, la codificacion o los datos estan mal.

**Despejable para:** \bar{L}

**Confianza:** alta · **Página(s):** 5, 6

### `U05-F08` · Eficiencia de un codificador de fuente ✅

$$\eta = \frac{H(x)}{\bar{L}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $\eta$ | eficiencia del codificador de fuente | adimensional (0 < eta <= 1; x100 para %) |
| $H(x)$ | entropia de la fuente | bit/simbolo |
| $\bar{L}$ | longitud promedio de la palabra codigo | digitos binarios/simbolo |

**Condiciones:** Como L_barra >= H(x), la eficiencia nunca puede superar 1 (100%). El codificador optimo es el que minimiza L_barra (codigos cortos para simbolos frecuentes).

**Despejable para:** \eta, H(x), \bar{L}

**Confianza:** alta · **Página(s):** 5, 6

### `U05-F09` · Probabilidad de un nivel equiprobable ✅

$$p = \frac{1}{N}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $p$ | probabilidad de cada nivel/simbolo | adimensional |
| $N$ | cantidad de niveles de tension o corriente (o de simbolos) posibles | adimensional (entero) |

**Condiciones:** Solo si todos los niveles son equiprobables. Es el insumo de U05-F11.

**Despejable para:** p, N

**Confianza:** alta · **Página(s):** 7

### `U05-F10` · Cantidad de simbolos contenidos en la senal ✅

$$m = \frac{T}{T_S}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $m$ | cantidad de simbolos transmitidos en el tiempo T | adimensional (entero) |
| $T$ | tiempo total de transmision de la senal | seg |
| $T_S$ | duracion de cada simbolo (intervalo de muestra) | seg |

**Condiciones:** Todos los simbolos de igual duracion T_S. T y T_S en la misma unidad de tiempo.

**Despejable para:** m, T, T_S

**Confianza:** alta · **Página(s):** 7, 8, 9, 10

### `U05-F11` · Contenido de informacion de una senal ✅

$$I = m \times \log_2\left(\frac{1}{p}\right) = \frac{T}{T_S}\,\log_2 N$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $I$ | contenido de informacion de la senal transmitida durante T | bit (por cada T; se expresa como bit/T) |
| $m$ | cantidad de simbolos en la senal | adimensional (entero) |
| $p$ | probabilidad de cada nivel (p = 1/N) | adimensional |
| $N$ | niveles probables (equiprobables) de tension o corriente | adimensional (entero) |
| $T$ | tiempo total de transmision | seg |
| $T_S$ | duracion de cada simbolo | seg |

**Condiciones:** Requiere niveles EQUIPROBABLES (p = 1/N); si no lo son hay que trabajar con la entropia (U05-F02) y la duracion promedio. El resultado se expresa siempre acompanado del tiempo T (ej: 48 bit/16seg). Despejes: N = 2^(I*T_S/T), T_S = (T*log2(N))/I, p = 2^(-I/m).

**Despejable para:** I, m, p, N, T, T_S

**Confianza:** alta · **Página(s):** 7, 8, 9, 10

### `U05-F12` · Bits por simbolo / entropia con simbolos equiprobables ✅

$$H = I = \log_2 N$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H$ | informacion por simbolo (bits necesarios para representar cada simbolo) | bit/simbolo |
| $N$ | cantidad de simbolos o caracteres distintos | adimensional (entero) |

**Condiciones:** Caso equiprobable de U05-F01 con P = 1/N. La catedra deja el resultado con decimales (Ejemplo 10: log2(110) = 6,78 bit/tecla) aunque para codificar fisicamente haga falta redondear hacia arriba al entero siguiente. En el Ejemplo 04 (N = 4) el resultado es exacto: n = 2 digitos binarios.

**Despejable para:** H, N

**Confianza:** alta · **Página(s):** 12, 29

### `U05-F13` · Periodo de muestreo ⚠️

$$T_s = \frac{1}{f_s}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $T_s$ | periodo (intervalo) entre muestras | seg |
| $f_s$ | frecuencia de muestreo | Hz (muestras/seg) |

**Condiciones:** Muestreo a velocidad constante.

**Despejable para:** T_s, f_s

**Confianza:** alta · **Página(s):** 23

> [!WARNING]
> **Observación de verificación (menor)**  
> Colision de simbolo dentro de la MISMA unidad: aca T_s = periodo de muestreo (pag. 23), pero en U05-F04, U05-F06, U05-F10 y U05-F11 el token T_S/T_s es la duracion del simbolo (pag. 2 y 7). Son magnitudes distintas. Si la app comparte tabla de simbolos entre formulas de la unidad, cargar una frecuencia de muestreo alimentara silenciosamente las formulas de I = (T/T_s)log2 N y r = 1/T_s, produciendo un numero plausible y equivocado.  
> 
> **Corrección propuesta:** Renombrar el simbolo de esta formula a "T_{muestreo}" (o "T_{sample}") y dejar constancia en condiciones de que la diapositiva lo escribe T_s. La relacion T_s = 1/f_s en si es correcta.

### `U05-F14` · Frecuencia de Nyquist (velocidad minima de muestreo) ✅

$$f_{Nyquist} = f_S = 2\,f_{Max}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f_{Nyquist}$ | frecuencia de Nyquist | Hz |
| $f_S$ | frecuencia de muestreo | Hz |
| $f_{Max}$ | maxima frecuencia de la senal (limitada en banda) | Hz |

**Condiciones:** La senal debe estar limitada en banda (acotada por el AB del canal, previo filtrado). La condicion general es f_S >= 2*f_Max; la igualdad define la frecuencia de Nyquist, que es el MINIMO para poder reconstruir la senal original. Cuidado con las unidades: si f_Max se da en kHz o MHz, f_S sale en la misma escala.

**Despejable para:** f_S, f_{Max}

**Confianza:** alta · **Página(s):** 23

### `U05-F15` · Teorema de Nyquist: capacidad de un canal sin ruido ✅

$$C = 2B\,\log_2 M$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C$ | velocidad maxima de transmision (capacidad) del canal ideal | bit/s (bps) |
| $B$ | ancho de banda del canal | Hz |
| $M$ | cantidad de niveles de la senal | adimensional (entero >= 2) |

**Condiciones:** Canal IDEAL: sin ruido ni distorsiones, de ancho de banda finito B. Si M = 2, log2(2) = 1 y queda C = 2B. B en Hz da C en bps (si B se ingresa en MHz el resultado sale en Mbps). Despeje: M = 2^(C/(2B)).

**Despejable para:** C, B, M

**Confianza:** alta · **Página(s):** 24, 25, 32

### `U05-F16` · Ancho de banda a partir del espectro del canal ✅

$$B = f_{sup} - f_{inf}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $B$ | ancho de banda del canal | Hz (o kHz/MHz segun las frecuencias) |
| $f_{sup}$ | frecuencia superior del espectro del canal | Hz |
| $f_{inf}$ | frecuencia inferior del espectro del canal | Hz |

**Condiciones:** Ambas frecuencias en la misma unidad. Se usa cuando el enunciado da el espectro del canal en lugar del ancho de banda.

**Despejable para:** B, f_{sup}, f_{inf}

**Confianza:** media — No figura enunciada como formula con nombre: aparece solo como paso aritmetico dentro de los Ejemplos 06, 11 y 12 ('B = 4MHz - 3MHz = 1MHz'). Se incluye porque es calculable y necesaria para resolver esos ejercicios. · **Página(s):** 27, 33, 34

### `U05-F17` · Formula de Shannon: capacidad de un canal con ruido ✅

$$C = B\,\log_2\left(1 + \frac{S}{N}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C$ | capacidad maxima del canal (tasa de bits de informacion) | bit/s (bps) |
| $B$ | ancho de banda del canal | Hz (Hertzios) |
| $S$ | potencia de la senal util | W, mW (misma unidad que N) |
| $N$ | potencia del ruido presente en el canal | W, mW (misma unidad que S) |
| $S/N$ | relacion senal a ruido (SNR) | adimensional, LINEAL (no en dB) |

**Condiciones:** Canal REAL con ruido aleatorio blanco. La S/N debe entrar en valor LINEAL: si el dato viene en dB hay que convertirlo primero con U05-F18 (SNR = 10^(SNR_dB/10)). B en Hz da C en bps; si B se ingresa en MHz el resultado sale en Mbps. Es un limite teorico maximo. Al aumentar B tambien entra mas ruido N, por lo que la SNR disminuye. Despeje: S/N = 2^(C/B) - 1.

**Despejable para:** C, B, S, N, S/N

**Confianza:** alta · **Página(s):** 26, 27, 28, 29, 31, 33, 34, 35

### `U05-F18` · Relacion senal a ruido en decibeles ✅

$$SNR_{dB} = 10\,\log_{10}(SNR)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $SNR_{dB}$ | relacion senal/ruido expresada en decibeles | dB |
| $SNR$ | relacion senal/ruido lineal (S/N) | adimensional (lineal) |

**Condiciones:** Relacion de POTENCIAS (por eso el factor 10 y no 20). Despeje: SNR = 10^(SNR_dB/10). Ojo: en las diapositivas 24 dB se redondea a SNR = 255 (el valor exacto es 251,19) para que 1+SNR = 256 sea potencia de 2.

**Despejable para:** SNR_{dB}, SNR

**Confianza:** alta · **Página(s):** 27, 28, 33, 34, 35

### `U05-F19` · Eficiencia espectral maxima ✅

$$E_{max} = \frac{C}{B} = \log_2\left(1 + \frac{S}{N}\right)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $E_{max}$ | eficiencia espectral del canal (tambien E_esp) | bps/Hz (bit/Hz) |
| $C$ | capacidad del canal | bit/s (bps) |
| $B$ | ancho de banda del canal | Hz |
| $S/N$ | relacion senal a ruido lineal | adimensional (lineal) |

**Condiciones:** Depende exclusivamente de la calidad del canal (su nivel de ruido), no de B. C y B deben estar en escalas coherentes (Mbps con MHz, bps con Hz). Despeje: S/N = 2^(E_max) - 1.

**Despejable para:** E_{max}, C, B, S/N

**Confianza:** alta · **Página(s):** 31, 35, 37

### `U05-F20` · Shannon-Hartley: niveles de senal requeridos ✅

$$M = \sqrt{1 + SNR}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M$ | cantidad de niveles de la senal necesarios para alcanzar la capacidad de Shannon | adimensional (entero, niveles) |
| $SNR$ | relacion senal a ruido lineal (S/N) | adimensional (lineal) |

**Condiciones:** Surge de igualar Nyquist con Shannon: 2B*log2(M) = B*log2(1+SNR) => log2(M^2) = log2(1+SNR). La raiz cuadrada convierte el cociente de potencias en un cociente de tensiones. SNR en valor LINEAL. En las diapositivas, cuando el resultado no es potencia de 2 se lo baja al valor practicable: 10,04 => M = 8 (Ejemplos 12 y 13).

**Despejable para:** M, SNR

**Confianza:** alta — En la pagina 32 la raiz cuadrada se perdio en la extraccion (queda 'M = (1 + SNR)'), pero la pagina 34 conserva el simbolo ('M = raiz((1 + 100))') y los resultados numericos lo confirman: raiz(256) = 16 y raiz(101) = 10,04. Se transcribe con raiz cuadrada. · **Página(s):** 32, 33, 34, 35

### `U05-F21` · Potencia de senal en funcion de la energia por bit ✅

$$S = \frac{E_b}{T_b}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $S$ | potencia de la senal | W (o mW) |
| $E_b$ | energia por bit | J (W*seg) |
| $T_b$ | tiempo de bit | seg |

**Condiciones:** Sistemas digitales. T_b es el tiempo de un bit, no de un simbolo. Equivale a S = E_b * R (siendo R = 1/T_b).

**Despejable para:** S, E_b, T_b

**Confianza:** alta · **Página(s):** 36

### `U05-F22` · Potencia total de ruido a partir de la densidad espectral ✅

$$N = N_0\,B$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N$ | potencia total de ruido | W (o mW) |
| $N_0$ | densidad espectral de potencia de ruido | W/Hz |
| $B$ | ancho de banda del canal | Hz |

**Condiciones:** Supone ruido BLANCO (densidad espectral constante): por eso cuanto mayor es B, mas ruido entra al sistema y menor resulta la SNR.

**Despejable para:** N, N_0, B

**Confianza:** alta · **Página(s):** 36

### `U05-F23` · Tasa de bit en funcion del tiempo de bit ✅

$$R = \frac{1}{T_b}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | tasa de bit (velocidad binaria) | bit/s (bps) |
| $T_b$ | tiempo de bit | seg |

**Condiciones:** Para obtener el limite maximo la catedra iguala R a C (capacidad del canal).

**Despejable para:** R, T_b

**Confianza:** alta · **Página(s):** 36

### `U05-F24` · SNR en funcion de Eb/No ✅

$$SNR = \frac{S}{N} = \frac{E_b/N_0}{T_b\,B} = \frac{E_b/N_0}{B/C}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $SNR$ | relacion senal a ruido lineal | adimensional (lineal) |
| $E_b$ | energia por bit | J (W*seg) |
| $N_0$ | densidad espectral de potencia de ruido | W/Hz |
| $T_b$ | tiempo de bit | seg |
| $B$ | ancho de banda del canal | Hz |
| $C$ | capacidad del canal (se usa R = 1/T_b igualada a C para el limite maximo) | bit/s (bps) |

**Condiciones:** Se deduce de S = E_b/T_b y N = N_0*B. La segunda forma [Eb/N0]/[B/C] vale solo cuando se iguala la tasa de bit R al valor de C (limite maximo). Eb/N0 es adimensional. B y C en escalas coherentes.

**Despejable para:** SNR, E_b, N_0, T_b, B, C

**Confianza:** alta · **Página(s):** 36, 37

### `U05-F25` · Relacion Eb/No a partir de la SNR y la eficiencia espectral ✅

$$\frac{E_b}{N_0} = \frac{SNR}{E_{max}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $E_b/N_0$ | relacion energia de bit / densidad de potencia de ruido (SNR por bit, SNR normalizada) | adimensional |
| $SNR$ | relacion senal a ruido lineal | adimensional (lineal) |
| $E_{max}$ | eficiencia espectral del enlace (tasa binaria bruta / ancho de banda) | bps/Hz |

**Condiciones:** Es una magnitud ADIMENSIONAL. La eficiencia espectral aqui es la tasa binaria BRUTA (incluye redundancia FEC y cabeceras de protocolo) dividida por el ancho de banda. Util para comparar BER de distintos esquemas de modulacion sin tener en cuenta el ancho de banda. SNR en valor lineal.

**Despejable para:** E_b/N_0, SNR, E_{max}

**Confianza:** alta · **Página(s):** 37

### Ejemplos resueltos — Unidad 5

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U05-F02` | Tabla de codificacion (ejemplo sin numerar, diapositiva 6): fuente de 8 simbolos x0..x7 co | P(x0)=0,20; P(x1)=0,01; P(x2)=0,40; P(x3)=0,04; P(x4)=0,10; P(x5)=0,02; P(x6)=0,07; P(x7)=0,16. Longitudes del codigo C2: L0=3, L1=6, L2=1, L3=5, L4=3, L5=6, L6=4, L7=3 digitos. | **I(x) = 2,32 / 6,64 / 1,32 / 4,64 / 3,32 / 5,64 / 3,83 / 2,64 [bit]; H(x) = 2,38 bit/simb; L(C2) = 2,44 digitos/simbolo** | 6 |
| `U05-F11` | Ejemplo 01: una senal electrica se transmite en 8 niveles de tension equiprobables, distin | N = 8 niveles; T = 16 seg; Ts = 1 seg | **I = (16/1) x log2(8) = 16 . 3 = 48 [bit/16seg]** | 8 |
| `U05-F11` | Ejemplo 02: la misma senal se genera ahora en 16 niveles de tension de 0,5 voltios cada un | N = 16 niveles; T = 16 seg; Ts = 1 seg | **I = (16/1) x log2(16) = 16 . 4 = 64 [bit/16seg]** | 9 |
| `U05-F11` | Ejemplo 03: se reduce la duracion del intervalo de lectura o muestra a Ts = 0,5 seg, con 8 | N = 8 niveles; T = 8 seg; Ts = 0,5 seg | **I = (8/0,5) x log2(8) = 16 . 3 = 48 [bit/8seg]** | 10 |
| `U05-F12` | Ejemplo 04 a): una fuente genera 4 simbolos sucesivos que se codifican con digitos binario | N = 4 simbolos; Ts = 1 seg; T = 4 seg | **n = log2(4) = 2 digitos binarios; se necesitan 2 bits/simbolo** | 12 |
| `U05-F15` | Ejemplo 05 (primera parte): un canal de voz con un ancho de banda de 3100 Hz se utiliza co | B = 3100 Hz; M = 2 niveles | **C = 2B log2(2) = 2 (3100) (1) = 2B = 6.200 bps** | 25 |
| `U05-F15` | Ejemplo 05 (segunda parte): el mismo canal de voz pero con una senal de 4 niveles de tensi | B = 3100 Hz; M = 4 niveles | **C = 2B log2(4) = 2 (3100) (2) = 12.400 bps** | 25 |
| `U05-F17` | Ejemplo 06: el espectro de un canal esta situado entre 3 MHz y 4 MHz y la SNR es de 24 dB. | f_inf = 3 MHz; f_sup = 4 MHz => B = 1 MHz; SNR_dB = 24 dB => SNR = 255 | **C = 10^6 Hz x log2(1 + 255) = 8 Mbps** | 27 |
| `U05-F17` | Ejemplo 07: un canal telefonico de grado voz tiene un ancho de banda de 3000 Hz y se utili | B = 3000 Hz; S/N = 1023 (lineal) | **C = 3000 Hz x log2(1 + 1023) = 30.000 bps = 30 Kbps** | 27 |
| `U05-F17` | Ejemplo 08 (primera parte): se desean transmitir datos analogicos por un canal telefonico  | B = 3000 Hz; S/N = 100 (lineal) | **C = 3000 x log2(1 + 100) = 19.975 bps** | 28 |
| `U05-F17` | Ejemplo 08 (segunda parte): el mismo canal pero con relacion S/N = 1000. Calcular la nueva | B = 3000 Hz; S/N = 1000 (lineal) | **C = 3000 x log2(1 + 1000) = 29.902 bps** | 28 |
| `U05-F17` | Ejemplo 09: dado un canal con una capacidad pretendida de 20 Mbps y un ancho de banda de 3 | C = 20 Mbps; B = 3 MHz | **20/3 = log2(1 + SNR) => 2^(20/3) = 1 + SNR => SNR = 2^(20/3) - 1 = 100 => SNR_dB = 20 dB** | 28 |
| `U05-F12` | Ejemplo 10 a): se tiene un teclado de 110 caracteres y cada uno se envia por medio de pala | N = 110 caracteres equiprobables | **H = log2(110) = 6,78 bit/tecla; I = log2(1/P) = log2(110) = 6,78 bits** | 29 |
| `U05-F17` | Ejemplo 10 b): que tan rapido se pueden enviar los caracteres (caracteres/segundo) a trave | B = 3,2 KHz = 3200 Hz; SNR_dB = 20 dB => SNR = 100 (lineal) | **C = 3200 Hz x log2(1 + 100) = 21,3 Kbps** | 29 |
| `U05-F20` | Ejemplo 11: espectro del canal entre 3 MHz y 4 MHz con SNR = 24 dB (idem Ejemplo 06, C = 8 | B = 1 MHz; SNR_dB = 24 dB => SNR = 255; C = 10^6 x log2(1 + 255) = 8 Mbps | **M = raiz(1 + 255) = raiz(256) = 16 => M = 16 niveles** | 33 |
| `U05-F17` | Ejemplo 12 (primera parte): espectro del canal entre 3 MHz y 4 MHz pero con la calidad de  | f_inf = 3 MHz; f_sup = 4 MHz => B = 1 MHz; SNR_dB = 20 dB => SNR = 100 | **C = 10^6 x log2(1 + 100) = 6,658 Mbps** | 34 |
| `U05-F20` | Ejemplo 12 (segunda parte): segun Nyquist, para alcanzar ese limite de 6,658 Mbps, cuantos | SNR = 100 (lineal) | **M = raiz(1 + 100) = 10,04 => se adopta M = 8** | 34 |
| `U05-F17` | Ejemplo 13 a): una senal es enviada en un canal WiFi de B = 20 MHz con SNR_dB = 20 dB. Cua | B = 20 MHz; SNR_dB = 20 dB => SNR = 100 (lineal) | **C = 20 x 10^6 x log2(1 + 100) = 133,16 Mbps** | 35 |
| `U05-F19` | Ejemplo 13 b): determinar la eficiencia espectral del canal WiFi anterior y explicar su si | C = 133,16 Mbps; B = 20 MHz | **E_esp = C/B = 6,658 bit/Hz** | 35 |
| `U05-F20` | Ejemplo 13 c): cual seria el maximo nivel de las senales digitales en el canal WiFi? (Nuev | SNR = 100 (lineal) | **M = raiz(1 + 100) = 10,04 => o sea M = 8** | 35 |
| `U05-F17` | Ejemplo 13 d): para conseguir una velocidad de transmision de 100 Mbps utilizando el mismo | C = 100 Mbps; B = 20 MHz | **100/20 = log2(1 + SNR) => 2^5 = 1 + SNR => SNR = 2^5 - 1 = 31 (la diapositiva lo escribe como '31 dB')** | 35 |


---

## Unidad 6 — Errores en la Transmisión de Datos

> FUENTE LEIDA COMPLETA: 50 paginas, todas revisadas. La Unidad 6 es mayoritariamente CONCEPTUAL (metodos de deteccion y correccion), por eso hay pocas formulas numericas puras y varias "formulas" son en realidad procedimientos sobre cadenas de bits.

TEMAS SIN FORMULA CALCULABLE (excluidos deliberadamente):
- Clasificacion de errores (aislados simples, agrupados, en rafagas), pag. 5.
- Codigos ASCII/EBCDIC como tablas de caracteres, pags. 9-10 (solo se rescato el 2^N subyacente).
- Redundancia por repeticion n veces y codificacion de "cuenta exacta", pags. 14-16: se describen cualitativamente, no hay formula de probabilidad de error ni de eficiencia.
- VRC, LRC/HRC, BCC y VRC/LRC bidimensional, pags. 18-25: son procedimientos de conteo de unos (paridad par/impar) sin expresion algebraica. Se podrian implementar como algoritmo, pero la fuente no da ninguna formula.
- ARQ (Parada y Espera, Ir N bloques atras, Retransmision selectiva), pags. 35-38: NO hay ninguna formula de eficiencia, ventana, tiempo de propagacion ni throughput. Esto es notable: en otras catedras estos temas traen formulas de eficiencia; aca no aparece ninguna.
- FEC, codigos de bloque y convolucionales, pags. 39-42: solo clasificacion.
- Tabla de polinomios generadores estandar CRC-12 / CRC-16 / CRC-CCITT y sus porcentajes de deteccion (pag. 32): son datos de referencia, quedaron dentro de las condiciones de U06-F11.

EJEMPLO 02 (pag. 25, VRC/LRC bidimensional) NO se pudo capturar como caso de test: el enunciado dice "Bytes recibidos con un bit de error en la posicion de la fila 4, columna 6 de la tabla de bits" y concluye que se detecta un error VRC en D6 y un error LRC en B4, pero la matriz de bits es una IMAGEN y no quedo en el texto extraido. Si se quiere usar como test hay que abrir el PDF original en esa pagina.

DATOS NUMERICOS UTILES PERO NO INCORPORADOS COMO EJEMPLOS:
- Pag. 8, tabla de tasas tipicas por tipo de canal: las razones "1:50Kb", "1:20Kb", "1:10Kb" son BER expresadas como fraccion y son coherentes con U06-F01 (1/50.000 = 2x10^-5, 1/20.000 = 5x10^-5, 1/10.000 = 10^-4). Es tabla de estandares, por eso quedo fuera de "ejemplos".
- Pag. 21: afirma que VRC en una linea telefonica discada de 10^3 a 10^4 bps mejora el BER de 10^-5 a 10^-7. Es un dato empirico, NO hay formula que relacione BER antes y despues.
- Pag. 34: "las tecnicas normalmente empleadas llegan a corregir el 99,99% de los errores". Dato, no formula.

TRAMPAS DE EXTRACCION DETECTADAS Y RESUELTAS:
- Exponentes perdidos: "(2N)" en pag. 11 es 2^N; "2p >= n + p +1" en pag. 47 es 2^p >= n+p+1 (confirmado en pag. 48 donde si quedo en italica matematica); "10-5", "10-9" en pags. 7-8 y 21 son 10^-5, 10^-9; "x7 + x5" en pag. 29 son x^7 + x^5; "20, 21, 22, 23" en pag. 47 son 2^0, 2^1, 2^2, 2^3.
- Fraccion partida en dos lineas: la definicion de BER (pag. 7) venia con numerador y denominador en lineas separadas; reconstruida y validada contra el Ejemplo 01.
- Pag. 48: la tabla salio mutilada, varias filas quedaron como "16 >= n=6 10" perdiendo el "n+5". Reconstrui la columna interpretando 2^4 = 16 >= n+5, lo que da n hasta 11 y coincide con el texto de la misma diapositiva.
- Pags. 49-50: la fila "posicion en binario" quedo como un chorro de bits sin separar; verifique manualmente los cuatro grupos de paridad y confirme que el ejemplo usa paridad PAR y que el sindrome 1000 = posicion 8 es correcto.

VERIFICACIONES ARITMETICAS QUE HICE (todos los ejemplos de la unidad dan BIEN, no encontre ningun resultado mal calculado):
- Ejemplo 01: 20 / 2x10^6 = 10^-5. OK.
- Pag. 6: 600 bps x 0,5 s = 300 bits y 1200 Mbps x 0,5 s = 600 Mbits. OK.
- Ejemplo 03: d(1011101,1001001)=2, d(2143896,2233796)=3, d("tener","reses")=3, min{2,3,1}=1. OK.
- Ejemplo 04: la distancia minima de {001,010,100} es efectivamente 2. OK.
- Ejemplo 05: H=5 -> D=4, C=2. OK.
- CRC pags. 29-31: verifique en modulo 2 que T(x)=1011011101001 es divisible por G(x)=110011 (resto 0), y por lo tanto que R(x)=1001 es el resto correcto de P(x)=1011011100000. OK.
- Hamming pags. 48-50: 2^3=8 admite n<=4 y 2^4=16 admite n<=11 (OK); los cuatro bits de paridad del ejemplo (p1=1,p2=0,p3=0,p4=1 con paridad par) coinciden con la palabra transmitida 10011100101 (OK); el sindrome 1000 del caso con error apunta a la posicion 8, que es exactamente el bit alterado (OK).

MATERIAL COMPLEMENTARIO: la diapositiva 32 enlaza a es.qwe.wiki sobre CRC y la 9 a elcodigoascii.com.ar; no se consultaron (fuera del alcance: solo se extrajo lo que esta en la fuente).

ADVERTENCIA PARA LA APP:
- U06-F09 es una INECUACION, no una igualdad: la app debe iterar p hasta cumplir 2^p >= n+p+1, no intentar despejar p.
- U06-F08 tiene MULTIPLES soluciones enteras (D,C) para un mismo H; la app deberia devolver la lista de pares con D >= C, no un unico valor.
- U06-F07 con H par da C no entero; la fuente no define el redondeo. Recomiendo que la app avise en ese caso y derive a U06-F08.
- U06-F11 (CRC) y U06-F10 (Hamming) no son formulas de "meter numeros y sale un numero" sino algoritmos sobre cadenas de bits; si la app solo maneja escalares con unidades, conviene implementarlos como calculadoras dedicadas o dejarlos fuera.

### `U06-F01` · Tasa de Errores BER (Bit Error Rate) ✅

$$BER = \frac{N_e}{N_t}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $BER$ | Tasa de errores de bit: relacion entre bits recibidos con error y bits totales recibidos | adimensional (fraccion, tipicamente se expresa como 10^-n) |
| $N_e$ | Cantidad de bits erroneos recibidos | bits |
| $N_t$ | Cantidad total de bits recibidos (transmitidos en el tiempo o sesion considerada) | bits |

**Condiciones:** Ambas cantidades deben estar en la MISMA unidad de bits (si N_t se da en Mbit hay que pasarlo a bits: 2 Mbit = 2x10^6 bits). Es un valor estadistico tipico de cada medio de transmision, medido sobre un tiempo o sesion determinada. La pagina 8 da valores tipicos de referencia (telefonia 10^-6, LAN par trenzado 10^-8 a 10^-9, fibra optica hasta 10^-11) y una ponderacion de calidad: muy buenos 10^-9 a 10^-10, buenos 10^-6, degradados 10^-3 a 10^-6, danados >10^-3.

**Despejable para:** BER, N_e, N_t

**Confianza:** alta — La fraccion venia partida en dos lineas (numerador 'bits erroneos recibidos' / denominador 'total de bits recibidos'); la reconstruccion es inequivoca porque el Ejemplo 01 la usa con numeros y verifica: 20 / 2x10^6 = 10^-5. · **Página(s):** 7, 8

### `U06-F02` · Bits perdidos ante una rafaga de ruido ✅

$$N_{perdidos} = R \cdot t$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N_perdidos$ | Cantidad de bits afectados/perdidos por la rafaga | bits (o Mbits si R esta en Mbps) |
| $R$ | Velocidad de transmision | bit/s (bps); en el ejemplo tambien Mbps |
| $t$ | Duracion de la rafaga de ruido impulsivo | s (segundos) |

**Condiciones:** Supone que TODOS los bits transmitidos durante la rafaga se pierden (ruido impulsivo que anula el canal durante t). Cuidado con las unidades: si R esta en Mbps el resultado sale en Mbits (la diapositiva deja el resultado en Mbits sin convertir). Ilustra el concepto: a mayor velocidad, mayor cantidad de bits con error ante la misma rafaga.

**Despejable para:** N_perdidos, R, t

**Confianza:** alta — La formula no se enuncia simbolicamente en la diapositiva; esta implicita en los dos calculos numericos explicitos ('600bps*0,5seg = 300 bits' y '1200Mbps*0,5seg = 600 Mbits'). La expresion simbolica es la lectura directa de esos calculos. · **Página(s):** 6

### `U06-F03` · Combinaciones posibles de un codigo binario de N digitos ✅

$$M = 2^{N}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M$ | Cantidad de combinaciones (simbolos/caracteres) representables | adimensional (cantidad de combinaciones) |
| $N$ | Cantidad de digitos binarios (bits) de longitud constante del codigo | bits |

**Condiciones:** Vale para codigos binarios de longitud CONSTANTE. Si se usan las 2^N combinaciones no hay redundancia y es imposible detectar errores (cualquier combinacion erronea sigue perteneciendo al codigo); la deteccion exige NO usar todas las combinaciones. Despejar N = log_2(M) solo da entero si M es potencia de 2.

**Despejable para:** M, N

**Confianza:** alta — En el texto aparece como '(2N)' por perdida del exponente en la extraccion pypdf; se confirma como 2^N con los casos ASCII 7 bits = 128, EBCDIC 8 bits = 256 y BCD 4 bits = 16 de las mismas diapositivas. · **Página(s):** 11, 9, 10, 12

### `U06-F04` · Distancia de Hamming entre dos palabras ✅

$$d_H(x,y) = \sum_{i=1}^{L} [\, x_i \neq y_i \,]$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $d_H(x,y)$ | Numero de posiciones (bits o simbolos) que hay que cambiar para transformar la palabra x en la palabra y | adimensional (cantidad de posiciones) |
| $x, y$ | Las dos palabras a comparar (cadenas de igual longitud) | cadena de simbolos (bits, digitos decimales o letras) |
| $L$ | Longitud comun de ambas palabras | cantidad de posiciones |

**Condiciones:** Ambas palabras deben tener la MISMA longitud y compararse posicion a posicion. No es exclusiva de cadenas binarias: la diapositiva la aplica tambien a digitos decimales (2143896 vs 2233796) y a palabras de texto ('tener' vs 'reses'). Si dos palabras de codigo difieren en distancia H, se necesitan H errores para convertir un codigo valido en otro codigo valido.

**Confianza:** alta · **Página(s):** 43

### `U06-F05` · Distancia minima de un codigo ✅

$$H = \min_{i \neq j} \; d_H(c_i, c_j)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H$ | Distancia minima (de Hamming) del codigo | adimensional (cantidad de posiciones) |
| $c_i, c_j$ | Palabras de codigo validas del conjunto C, tomadas de a pares distintos | cadena de bits |

**Condiciones:** Se calcula sobre TODOS los pares distintos de palabras validas del codigo y se toma el minimo. Todas las palabras deben tener la misma longitud. Es el parametro H que alimenta las formulas de capacidad de deteccion y correccion (U06-F06, U06-F07, U06-F08).

**Confianza:** alta — Se enuncia por ejemplo, no en forma simbolica: 'min {d(100,111), d(100,011), d(111,011)} = min {2,3,1} = 1'. La notacion con min es la formalizacion directa de ese calculo. · **Página(s):** 43, 46

### `U06-F06` · Capacidad de deteccion de errores segun la distancia de Hamming ✅

$$H = D + 1 \quad \Longleftrightarrow \quad D = H - 1$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H$ | Distancia de Hamming (minima) del codigo | adimensional |
| $D$ | Cantidad de errores de un bit que el codigo puede DETECTAR | adimensional (cantidad de bits erroneos) |

**Condiciones:** Para detectar D errores de un bit se necesita un codigo con distancia de Hamming de AL MENOS H = D+1 (es una cota minima, por eso con distancia H se detectan D = H-1 errores). Solo deteccion: no implica correccion. Si se quiere detectar Y corregir simultaneamente, rige el reparto H-1 = D+C (U06-F08).

**Despejable para:** H, D

**Confianza:** alta · **Página(s):** 44, 45

### `U06-F07` · Capacidad de correccion de errores segun la distancia de Hamming ✅

$$H = 2C + 1 \quad \Longleftrightarrow \quad C = \frac{H-1}{2}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H$ | Distancia de Hamming (minima) del codigo | adimensional |
| $C$ | Cantidad de errores de un bit que el codigo puede CORREGIR | adimensional (cantidad de bits erroneos) |

**Condiciones:** Para corregir C errores de un bit se necesita un codigo con distancia de Hamming de AL MENOS H = 2C+1. La diapositiva NO aclara si con H par se toma parte entera: el unico ejemplo usa H=5 (impar) dando C=2 exacto. Con H par conviene usar la relacion de reparto H-1 = D+C (U06-F08), que la catedra aplica explicitamente al caso H=4.

**Despejable para:** H, C

**Confianza:** alta — La formula esta textual en la pagina 45; la advertencia sobre H par es una limitacion de la fuente, no de la transcripcion. · **Página(s):** 45

### `U06-F08` · Reparto entre capacidad de deteccion y de correccion (minima distancia de un codigo) ✅

$$H - 1 = D + C \quad , \quad D \geq C$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $H$ | Minima distancia del codigo | adimensional |
| $D$ | Capacidad de deteccion (errores detectables) | adimensional (cantidad de bits erroneos) |
| $C$ | Capacidad de correccion (errores corregibles) | adimensional (cantidad de bits erroneos) |

**Condiciones:** Restriccion obligatoria D >= C. D y C son enteros no negativos, por lo que para un H dado hay VARIAS soluciones validas (la diapositiva las lista todas). Casos de la catedra: H=2 (control de paridad) -> D=1, C=0; H=3 (redundancia) -> (D=2,C=0) o (D=1,C=1); H=4 -> (D=3,C=0) o (D=2,C=1). El calculo debe devolver el conjunto de pares (D,C) con D+C = H-1 y D >= C.

**Despejable para:** H, D, C

**Confianza:** alta · **Página(s):** 46

### `U06-F09` · Cantidad de bits de paridad en la codificacion Hamming ✅

$$2^{p} \geq n + p + 1$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $p$ | Cantidad de bits de paridad (redundantes) a agregar | bits |
| $n$ | Cantidad de bits de datos (informacion) de la palabra original | bits |
| $n + p$ | Longitud total de la palabra codigo transmitida | bits |

**Condiciones:** Es una INECUACION: se busca el MENOR p entero que la satisface para un n dado (p no se despeja en forma cerrada, hay que iterar p = 1,2,3,... hasta cumplirla). Despejado para n: n <= 2^p - p - 1. Los p bits de paridad se ubican en las posiciones 2^0, 2^1, 2^2, 2^3... es decir 1, 2, 4, 8, ... de la cadena de n+p bits. La condicion asegura que los p bits alcancen para senalar cualquiera de las n+p posiciones erroneas mas el caso 'sin error'.

**Despejable para:** n

**Confianza:** alta — En la pagina 47 el texto sale como '2p >= n + p +1' por perdida del exponente; la pagina 48 lo confirma en italica matematica como 2^p >= n + p + 1 y con la tabla de valores (p=3 admite n=3,4; p=4 admite n=5..11). · **Página(s):** 47, 48

### `U06-F10` · Posicion del bit erroneo (sindrome de Hamming) ✅

$$pos = \sum_{i=1}^{p} p_i \cdot 2^{\,i-1}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $pos$ | Posicion decimal del bit erroneo dentro de la cadena de n+p bits (0 = sin error) | adimensional (numero de posicion, 1 a n+p) |
| $p_i$ | Bit de control recalculado en el receptor para el grupo de paridad i (1 si la paridad no se cumple, 0 si se cumple) | bit (0 o 1) |
| $p$ | Cantidad de bits de paridad del codigo | bits |

**Condiciones:** El conjunto de los p bits de control recalculados forma un numero binario natural (p_p ... p_2 p_1) cuyo equivalente decimal indica la posicion del bit erroneo; si ese numero es CERO no hay error. Solo vale para UN bit erroneo (el codigo Hamming detecta hasta dos errores simultaneos pero corrige uno solo). El ejemplo trabajado usa paridad PAR y ubica los bits de paridad en las posiciones 1, 2, 4, 8.

**Confianza:** media — La diapositiva 47 enuncia la regla en palabras ('el conjunto de los p bits de paridad forma un numero en el sistema binario natural, cuyo equivalente decimal nos indica la posicion del bit erroneo') y las diapositivas 49/50 la aplican en tablas; la sumatoria es una formalizacion mia de esa regla, no aparece escrita como formula. Ademas, el tipo de paridad (par) se deduce de los numeros de la tabla, la diapositiva 47 lo deja ambiguo. · **Página(s):** 47, 49, 50

### `U06-F11` · Codigo de Redundancia Ciclica (CRC): resto y trama a transmitir ✅

$$R(x) = \left[\, x^{r} \cdot M(x) \,\right] \bmod G(x) \quad ; \quad T(x) = x^{r} \cdot M(x) + R(x)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M(x)$ | Polinomio del mensaje a transmitir (sus coeficientes son los bits del mensaje) | cadena de bits / polinomio de grado n |
| $G(x)$ | Polinomio generador (clave), de grado r | cadena de bits / polinomio de grado r |
| $r$ | Grado del polinomio generador G(x) | adimensional (grado); genera r bits de redundancia |
| $P(x)$ | Polinomio auxiliar desplazado, P(x) = x^r . M(x) (equivale a agregar r ceros al mensaje) | cadena de bits |
| $R(x)$ | Resto de la division modulo 2 de P(x) por G(x) | cadena de bits (a lo sumo r bits) |
| $T(x)$ | Polinomio (trama) efectivamente transmitido | cadena de bits |
| $E(x)$ | Error introducido por el canal: se recibe T'(x) = T(x) + E(x) | cadena de bits |

**Condiciones:** Toda la aritmetica es MODULO 2 (suma y resta = OR EXCLUSIVA, sin acarreo ni prestamo), por eso la suma y la resta son la misma operacion. El grado n de M(x) debe cumplir n >> r. El resto R(x) siempre tiene un numero de bits menor o igual que r. Verificacion en el receptor: se calcula T'(x)/G(x); si el resto R(x) = 0 NO hay error, si R(x) != 0 SI hay error. Polinomios generadores estandar citados (pagina 32): CRC-12 = x^12+x^11+x^3+x^2+x+1, CRC-16 = x^16+x^15+x^2+1, CRC-CCITT = x^16+x^12+x^5+1.

**Confianza:** media — El procedimiento esta completo y verificado numericamente (comprobe que T = 1011011101001 es divisible por G = 110011 en modulo 2, resto 0, como dice la diapositiva 31). La confianza es media por dos motivos: (1) no es una formula algebraica con numeros y unidades sino un algoritmo sobre cadenas de bits; (2) la fuente es ambigua entre 'grado n' y 'n bits' -- la diapositiva 28 dice que P(x) contiene (r+n) bits, pero en el ejemplo M(x) tiene grado n=7 y 8 bits, y P(x) tiene 13 bits = 5 + 8, o sea el conteo correcto es r + (cantidad de bits de M), no r + grado. · **Página(s):** 28, 29, 30, 31, 27

### Ejemplos resueltos — Unidad 6

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U06-F02` | Ruido impulsivo con duracion de 0,5 seg sobre un enlace de velocidad R = 600 bps: cuantos  | R = 600 bps; t = 0,5 s | **300 bits ('Se pierden 600bps*0,5seg = 300 bits')** | 6 |
| `U06-F02` | Mismo ruido impulsivo de 0,5 seg sobre un enlace de velocidad R = 1200 Mbps: cuantos bits  | R = 1200 Mbps; t = 0,5 s | **600 Mbits ('Se pierden 1200Mbps*0,5seg = 600 Mbits'). Equivale a 6x10^8 bits, pero la diapositiva deja el resultado en Mbits.** | 6 |
| `U06-F01` | Ejemplo 01: Una computadora recibe desde una fuente remota un total de 2 Mbit que correspo | N_e = 20 bits erroneos; N_t = 2 Mbit = 2x10^6 bits | **BER = 20 / 2x10^6 = 10^-5** | 7 |
| `U06-F03` | Codigo ASCII: conjunto de caracteres de 7 bits (b0 = LSB a b6 = MSB); cuantas combinacione | N = 7 bits | **128 combinaciones** | 9 |
| `U06-F03` | Codigo EBCDIC: cada caracter esta compuesto por 8 bits = 1 byte; cuantos caracteres define | N = 8 bits | **256 caracteres** | 10 |
| `U06-F03` | Codigo BCD natural para transmitir digitos decimales con 4 digitos binarios: cuantas combi | N = 4 bits | **16 combinaciones posibles, de las que se usan 10 (sobran 6: 1010, 1011, 1100, 1101, 1110, 1111)** | 12 |
| `U06-F04` | Ejemplo 03: calcular la distancia Hamming entre 1011101 y 1001001. | x = 1011101; y = 1001001 | **2** | 43 |
| `U06-F04` | Ejemplo 03: calcular la distancia Hamming entre 2143896 y 2233796 (cadenas de digitos deci | x = 2143896; y = 2233796 | **3** | 43 |
| `U06-F04` | Ejemplo 03: calcular la distancia Hamming entre las palabras 'tener' y 'reses' (cadenas de | x = "tener"; y = "reses" | **3** | 43 |
| `U06-F05` | Ejemplo 03: calcular la distancia Hamming minima del codigo C = {100, 111, 011}. | C = {100, 111, 011} | **min {d(100,111), d(100,011), d(111,011)} = min {2, 3, 1} = 1** | 43 |
| `U06-F06` | Ejemplo 04: dado el codigo C = {001, 010, 100} con distancia Hamming = 2, determinar cuant | C = {001, 010, 100}; H = 2 | **D = H - 1 = 1 error detectable** | 44 |
| `U06-F06` | Ejemplo 05: para el codigo C = {0000000000, 0000011111, 1111100000, 1111111111} con distan | H = 5 | **Se pueden detectar H-1 = 5-1 = 4 errores** | 45 |
| `U06-F07` | Ejemplo 05: para el mismo codigo C = {0000000000, 0000011111, 1111100000, 1111111111} con  | H = 5 | **Se pueden corregir (H-1)/2 = 4/2 = 2 errores** | 45 |
| `U06-F08` | Minima distancia de un codigo con H = 2 (caso del control de Paridad): repartir entre capa | H = 2 | **2-1 = 1 = D+C -> D=1 y C=0 (detecto, pero no corrijo)** | 46 |
| `U06-F08` | Minima distancia de un codigo con H = 3 (caso de Redundancia): repartir entre capacidad de | H = 3 | **3-1 = 2 = D+C -> D=2 y C=0 (detecto 2 pero no corrijo), o D=1 y C=1 (detecto y corrijo un error)** | 46 |
| `U06-F08` | Minima distancia de un codigo con H = 4: repartir entre capacidad de deteccion y de correc | H = 4 | **4-1 = 3 = D+C -> D=3 y C=0 (detecto 3 pero no corrijo), o D=2 y C=1 (detecto 2 y corrijo 1 error)** | 46 |
| `U06-F09` | Codificacion Hamming: determinar la cantidad minima de bits de paridad p para n = 4 bits d | n = 4 bits de datos | **2^p >= 5 + p -> p = 3 (longitud total n+p = 7)** | 48 |
| `U06-F09` | Codificacion Hamming: con p = 3 bits de paridad, que valores de n admite y cual es la long | p = 3 (2^3 = 8 >= n + 4) | **n = 3 -> n+p = 6 ; n = 4 -> n+p = 7** | 48 |
| `U06-F09` | Codificacion Hamming: con p = 4 bits de paridad, que valores de n admite y cual es la long | p = 4 (2^4 = 16 >= n + 5) | **n = 5, 6, 7, ... hasta 11. Longitudes totales n+p correspondientes: 9, 10, 11, 12, 13, 14, 15** | 48 |
| `U06-F11` | CRC completo: transmitir el mensaje 10110111 usando el polinomio generador 110011. Se arma | M(x) = 10110111 = x^7 + x^5 + x^4 + x^2 + x^1 + x^0 ; G(x) = 110011 = x^5 + x^4 + x^1 + x^0 ; r = 5, polinomio auxiliar X^r = x^5 | **P(x) = x^12 + x^10 + x^9 + x^7 + x^6 + x^5 = 1011011100000 ; R(x) = 1001 ; T(x) = 1011011101001** | 29 |
| `U06-F11` | CRC, verificacion en el receptor del caso anterior: se recibe T'(x) = 1011011101001 sin er | T'(x) = 1011011101001 ; G(x) = 110011 | **R(x) = 000000 = 0 -> NO hay error (si R(x) != 0 SI hay error)** | 31 |
| `U06-F10` | Codificacion Hamming completa, caso SIN ERROR: datos n = 1001101 (7 bits, n7..n1) con p =  | n = 1001101 (n7 n6 n5 n4 n3 n2 n1); p = 4; posiciones de paridad 1, 2, 4, 8; paridad par. Palabra transmitida n+p a TX (posicion 11 -> 1) = 1 0 0 1 1 1 0 0 1 0 1. Se recibe n+p a RX = 1 0 0 1 1 1 0 0 1 0 1 | **Sindrome p4 p3 p2 p1 = 0 0 0 0 -> valor decimal 0 -> SIN ERROR** | 49 |
| `U06-F10` | Codificacion Hamming, caso CON ERROR: se transmite la misma palabra 1 0 0 1 1 1 0 0 1 0 1  | n+p a RX (posicion 11 -> 1) = 1 0 0 0 1 1 0 0 1 0 1 ; p = 4 ; paridad par | **Sindrome p4 p3 p2 p1 = 1 0 0 0 -> valor decimal 8 -> HAY ERROR en la posicion 8 (que es justamente el bit p4). La diapositiva solo rotula 'HAY ERROR'; la lectura decimal 1000 = 8 es la que identifica y permite corregir el bit.** | 50 |


---

## Unidad 7 — Técnicas de transmisión de la información

> La Unidad 7 es abrumadoramente conceptual: de 70 diapositivas, sólo 3 contienen una fórmula escrita (n = log2 N en pp.10-13, R = r.n en p.13, B = Δf = f2 - f1 en p.17) y una sola tiene un ejercicio numérico resuelto (Ejemplo 01, p.26). No hay fracciones rotas en varias líneas en esta unidad, así que no hubo ambigüedad de reconstrucción; el único riesgo de extracción fue el subíndice pegado en "𝑙𝑜𝑔2𝑁", resuelto sin dudas por la tabla verificable de la p.13.

Contenido calculable descartado a propósito (no son fórmulas de la fuente, NO agregarlos):
- p.12: la diapositiva muestra n = 1/2 bit/baudio y n = 4/3 bit/baudio ("1 bit por 2 elementos de señal", "4 bit por 3 elementos de señal"). Ahí n se lee como cociente bits/elementos-de-señal y NO se obtiene de log2(N). Si la app deja que el usuario cargue N y devuelva n por log2, estos casos quedan fuera del modelo; conviene aclararlo en la UI.
- p.19: "una línea ADSL de 256 kbps puede, teóricamente, enviar 256000 bits por segundo" es sólo conversión de unidades, más la afirmación cualitativa de que la tasa máxima depende de B, de la SNR y de la codificación de canal. La diapositiva NO escribe Nyquist ni Shannon: esas fórmulas pertenecen a otra unidad y no deben importarse acá.
- p.39: "en la transmisión asíncrona, el 20 % de lo que se transmite se utiliza para la sincronización (20 % de overhead)". Es un dato cerrado, no una fórmula parametrizable; la diapositiva no da la expresión de eficiencia (bits de datos / bits totales) ni ningún ejemplo numérico con un tamaño de trama concreto.
- p.1: es una diapositiva de REPASO de la Unidad 5 (columna P(x), I(x) en bit, H(x) = 2,38 bit/simb y código C2 de Huffman para 8 símbolos x0..x7). Trae la tabla de valores pero no escribe ninguna fórmula, y además no pertenece al temario de esta unidad. Si se quieren I(x) y H(x), deben tomarse de la Unidad 5, no de acá.
- pp.43-68: códigos de línea (Unipolar NRZ, Polar NRZ-L/NRZ-I, RZ, Manchester, Manchester Diferencial, Bipolar AMI, Pseudoternaria, B8ZS, HDB3). Son reglas de sustitución y de forma de onda, no fórmulas numéricas. Lo único "algorítmico" y potencialmente implementable como herramienta (no como fórmula) es: B8ZS sustituye 8 ceros consecutivos por 000VB0VB (000+-0-+ si el último pulso previo fue positivo, 000-+0+- si fue negativo) y HDB3 sustituye 4 ceros consecutivos por 000V si el número de pulsos distintos de 0 desde la última sustitución es impar, o por B00V si es par. Serviría como codificador visual, no como calculadora.
- pp.37-38: campos de la trama HDLC con sus longitudes en bits (Flag 8, Dirección n×8, Control 8 o 16, Información variable, FCS 16 o 32, Flag 8). Es una tabla de formato, no una fórmula; podría dar pie a un cálculo de overhead pero la cátedra no lo plantea.
- pp.40-42 (Simplex/HDX/FDX), pp.21-36 (serie/paralelo, asincrónico/sincrónico), pp.44-45 y 57-58 y 62 (características de los códigos de línea), pp.69-70 (espectros de banda base, banda base vs banda ancha): todo cualitativo.

Nota de precisión sobre U07-F02: R = r.n aparece únicamente como encabezado de columna en la tabla de la p.13 ("Velocidad de transmisión R=r.n"), mientras que las definiciones de R (bps), r (Baud), N y n están en la p.13 y en la p.10. La p.14 distingue explícitamente velocidad de transferencia de datos vs velocidad efectiva (throughput), así que la app no debería etiquetar el resultado de R = r.n como "throughput".

Nota de precisión sobre U07-F04: es la única fórmula del lote que NO está escrita en la fuente; se derivó del Ejemplo 01 de la p.26, que la cátedra resuelve sólo con números. Marcada con confianza baja por eso, no por duda sobre la aritmética (ambos resultados de la diapositiva, 1 bps y 1000 bps extra, están bien calculados).

Material complementario que probablemente tenga más fórmulas: el propio temario de la p.2 anuncia "Medida de la velocidad de transmisión" y "Ancho de banda: real vs efectivo", pero las diapositivas correspondientes (pp.14 a 20) resultaron ser puramente descriptivas; si la cátedra tiene guía de trabajos prácticos de esta unidad, es casi seguro que ahí estén los ejercicios numéricos (eficiencia de transmisión asincrónica, tiempos de transmisión, ancho de banda de los distintos códigos de línea) que las diapositivas no desarrollan.

### `U07-F01` · Número de bits por elemento de señal (bits por símbolo) ✅

$$n = \log_2(N)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $n$ | Número de bits por elemento de señal (bits por símbolo / bits por baudio) | bit/baudio (bit por símbolo) |
| $N$ | Número de elementos de señal distintos (número de niveles de la señal) | adimensional (cantidad de niveles) |

**Condiciones:** Requiere N > 0. Para que n sea entero, N debe ser potencia de 2 (la cátedra siempre usa N = 2, 4, 8, 16, 32, 64, 128). Vale para el caso de un elemento de señal que transporta un número entero de bits; en la página 12 la diapositiva muestra casos donde n es una fracción (1/2 bit/baudio, 4/3 bit/baudio) porque un bit se reparte entre varios elementos de señal o varios bits entre varios elementos: en esos casos n se lee como bits/elementos-de-señal y NO surge de log2(N).

**Despejable para:** n, N

**Confianza:** alta — Aparece literalmente y repetida en 4 diapositivas (p.10, 11, 12, 13) como '𝑛 = 𝑙𝑜𝑔2𝑁'; el subíndice 2 quedó pegado en la extracción pero es log en base 2, confirmado por la tabla de la página 13 (N=128 → n=7). · **Página(s):** 10, 11, 12, 13

### `U07-F02` · Velocidad de transmisión (tasa de bits) a partir de la tasa de símbolos ✅

$$R = r \cdot n$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Tasa de bits / velocidad de transmisión (tasa de datos) | bps (bit/s) |
| $r$ | Tasa de símbolos / tasa de señal, de pulso, de modulación o de baudios | Baud (símbolos/s) |
| $n$ | Número de bits por elemento de señal | bit/baudio (bit por símbolo) |

**Condiciones:** Supone n constante (todos los elementos de señal transportan la misma cantidad de bits). Da la velocidad de transmisión bruta, NO la velocidad efectiva ni el throughput (la página 14 los distingue explícitamente: el throughput cuenta sólo los bits que el receptor acepta como válidos). No contempla overhead de sincronismo (bits de start/stop, bytes de sync).

**Despejable para:** R, r, n

**Confianza:** alta — Aparece como encabezado de columna de la tabla de la página 13 ('Velocidad de transmisión R=r.n') y se verifica en las 7 filas de la tabla. Las variables R, r, N y n están definidas en la página 10. · **Página(s):** 13

### `U07-F03` · Ancho de banda de un canal / señal analógica ✅

$$B = \Delta f = f_2 - f_1$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $B$ | Ancho de banda: rango de frecuencias que deja pasar el canal satisfactoriamente | Hz |
| $f_2$ | Frecuencia superior del rango | Hz |
| $f_1$ | Frecuencia inferior del rango | Hz |

**Condiciones:** Definido para señales analógicas / para el rango de frecuencias donde se concentra la mayor parte de la potencia de la señal. Requiere f_2 > f_1 y ambas frecuencias en la misma unidad (Hz). NO aplica directamente a una señal digital que transporta información: al no ser periódica su ancho de banda es continuo y teóricamente infinito, y se trabaja con el ancho de banda EFECTIVO, que es finito (páginas 16 y 17). Tampoco confundir con el 'ancho de banda digital' de la página 19, que es cantidad de datos por unidad de tiempo (bps) y no un rango de frecuencias.

**Despejable para:** B, f_2, f_1

**Confianza:** alta — Aparece literalmente en la página 17 como '𝐵 = Δ𝑓 = 𝑓2 – 𝑓1'. · **Página(s):** 17

### `U07-F04` · Bits extra por segundo por desviación del reloj del receptor ✅

$$b_{extra} = R \cdot \frac{d}{100}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $b_extra$ | Cantidad de bits extra que recibe el receptor en un segundo por tener el reloj más rápido | bps (bit/s) |
| $R$ | Tasa de datos nominal del emisor | bps (bit/s) |
| $d$ | Desviación relativa del reloj del receptor respecto del emisor (cuánto más rápido es) | % (porcentaje) |

**Condiciones:** Sólo para reloj del receptor MÁS RÁPIDO que el del emisor (si fuera más lento, el receptor pierde bits en vez de recibir de más). Supone tasa constante durante el segundo considerado y desviación expresada en porcentaje. La tasa efectivamente recibida es R_recibida = R * (1 + d/100).

**Despejable para:** b_extra, R, d

**Confianza:** baja — ATENCIÓN: la diapositiva NO escribe esta fórmula. Es la reconstrucción algebraica del Ejemplo 01 de la página 26 (0,1 % sobre 1000 bps → 1 bps extra; sobre 1.000.000 bps → 1000 bps extra), que la cátedra resuelve sólo con números y en prosa. Se incluye porque el ejercicio es calculable y reproducible, pero conviene validarla con la cátedra antes de darla como fórmula oficial de la unidad. · **Página(s):** 26

### Ejemplos resueltos — Unidad 7

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U07-F01` | Ilustración de la relación entre elementos de señal y bits por elemento: con N = 2 element | N = 2 elementos de señal; N = 4 elementos de señal | **N = 2 → n = 1 bit por elemento de señal (1 bit/baudio); N = 4 → n = 2 bit por elemento de señal (2 bit/baudio)** | 11 |
| `U07-F01` | Tabla de la diapositiva: para un canal de r = 1200 baudios, número de bits por elemento de | N = 2, 4, 8, 16, 32, 64, 128 (adimensional) | **n = 1, 2, 3, 4, 5, 6, 7 bit por elemento de señal respectivamente** | 13 |
| `U07-F02` | Supongamos un canal de r = 1200 baudios (1200 símbolos transmitidos por segundo). ¿Cuál es | r = 1200 Baud (constante en las 7 filas); n = 1, 2, 3, 4, 5, 6, 7 bit/baudio (obtenidos de n = log2 N con N = 2, 4, 8, 16, 32, 64, 128) | **R = 1200 bps; 2400 bps; 3600 bps; 4800 bps; 6000 bps; 7200 bps; 8400 bps respectivamente** | 13 |
| `U07-F04` | Ejemplo 01: En una transmisión digital, el reloj del receptor es un 0,1 % más rápido que e | R = 1 Kbps (1000 bps); desviación del reloj d = 0,1 % más rápido | **El receptor recibe 1001 bps en lugar de 1000 bps: 1 bps extra** | 26 |
| `U07-F04` | Ejemplo 01 (segunda parte): En una transmisión digital, el reloj del receptor es un 0,1 %  | R = 1 Mbps (1.000.000 bps); desviación del reloj d = 0,1 % más rápido | **El receptor recibe 1.001.000 bps en lugar de 1.000.000 bps: 1000 bps extra** | 26 |


---

## Unidad 8 — Modulación y Multiplexación de Señales

> FUENTE LEIDA COMPLETA: 127 páginas. Se verificaron a nivel de bytes crudos (cat -A) las diapositivas con matemática ambigua: 16, 17, 20, 26, 34, 45, 46, 49, 82, 88, 89.

QUE SE EXCLUYO Y POR QUE:
1) Tablas de valores QAM vs SNR (págs. 46, 78, 79): "Bits/Símbolo | QAM | SNRdB para BER < 10^-7" (4→21,8 / 6→27,8 / 8→33,8 / 9→36,8 / 10→39,8 / 12→45,8 / 14→51,8). Es una tabla, no una fórmula escrita. Ajusta perfecto a SNR_dB = 3n + 9,8, pero ESA EXPRESION NO ESTA EN LAS DIAPOSITIVAS, así que no la incluí como fórmula. Si la cátedra la pide, hay que confirmarla con material complementario.
2) Tabla PCM vs SNR (pág. 79): "Bits/muestra | Niveles | SNRdB" (5→32→31,8 / 6→64→37,8 / 7→128→43,8 / 8→256→49,8). Ajusta a SNR_dB = 6n + 1,8 (la clásica 6,02n + 1,76), pero tampoco está escrita. Excluida por la misma razón.
3) Tablas de jerarquías PDH-E (E1..E4) y PDH-T (T1..T4) de las págs. 111-112 y la tabla comparativa E1/T1 de la pág. 108: son tablas de estándares. Solo extraje de ellas los cálculos explícitos (F18, F19, F20 y los ejemplos correspondientes).
4) Ley A y Ley µ (págs. 68-70): solo descripción cualitativa (13 segmentos / 15 segmentos, 16 intervalos por segmento). NO hay ninguna fórmula de compresión logarítmica en las diapositivas.
5) Celda ATM de 53 bytes = 48 datos + 5 control (pág. 105) y flujo de salida 155,52 Mbps (pág. 106): descriptivo, sin fórmula.
6) Constelaciones QPSK/16QAM/64QAM con SNR (págs. 42-44), tabla de fases QPSK (pág. 34), Cat/tipos de fibra, topologías DWDM (págs. 124-126): sin cálculo.

AGUJEROS DE LA EXTRACCION (pypdf no recuperó texto que estaba en imágenes):
- Pág. 34: dice literalmente "la ecuación general para QPSK es la siguiente" y LA ECUACION NO APARECE en el texto extraído. Es la única fórmula de la unidad que se sabe que existe y falta. Habría que abrir el PPTX/PDF original para recuperarla.
- Págs. 16, 20 y 26: los anchos de banda salen como "=2B", "=2B + 2Δf" y "=2B" sin miembro izquierdo (el rótulo estaba en la imagen del espectro). Por eso U08-F05/F06/F07 quedan en confianza media. Se corroboran con la prosa de las págs. 22-23.
- Pág. 82: el símbolo λ salió como carácter de área de uso privado (fuente Symbol) y la fracción quedó partida en dos líneas ("= C" / "f"). Reconstruida como λ = C/f por el contexto inmediato (WDM, "distinta longitud de onda λ").

ERRORES / TYPOS DETECTADOS EN LAS PROPIAS DIAPOSITIVAS (importantes para la app):
- Pág. 49: escribe "T_S ≥ 1/(2 f_MAX)". El sentido de la desigualdad está invertido: si f_S ≥ 2 f_MAX, entonces T_S ≤ 1/(2 f_MAX). Transcribí la igualdad T_S = 1/f_S (que sí se usa con números en págs. 100 y 108) y dejé la nota.
- Pág. 29: "M = 2 × 1 = 2 niveles" es en realidad M = 2^1 = 2 (exponente perdido en la extracción o error de la diapositiva).
- Pág. 71: "pues 28 = 256" es 2^8 = 256.
- Pág. 72 (Ejemplo 2): "M = 56536 = 216" debería ser M = 65536 = 2^16. Doble problema: dígito tipeado mal en la diapositiva (56536) y exponente perdido. El resultado 705,6 Kbps sí es correcto.
- Pág. 19: escribe "f1 = f + Δf" (sin subíndice P) y "f2 = fP − Δf". Ambas se refieren a la misma portadora fP.
- Pág. 108: los valores 3,9 µs y 5,2 µs están redondeados (exactos: 3,90625 µs y 5,2083 µs).
- Pág. 45/46: "M = SNR + 1" convive en la misma diapositiva con una tabla en dB que NO satisface esa fórmula (16-QAM daría 11,8 dB por fórmula vs 21,8 dB de la tabla). La fórmula usa SNR LINEAL; la tabla es un requisito práctico para BER < 10^-7. En la app hay que separarlas explícitamente o el usuario va a mezclar dB con lineal.

FORMULAS INFERIDAS (marcadas confianza media, no escritas simbólicamente en la fuente): U08-F04 (r = 1/T_S), U08-F16 (bits de la trama TDM) y U08-F17 (duración de la trama TDM). Las tres se dedujeron de la aritmética explícita de los ejemplos resueltos y cierran en los 7 casos de las págs. 93 a 100. La que sí está escrita literalmente es U08-F18 ("Tasa de bit = 8 bit/20 µs = 400 Kbps").

CASOS DE TEST SIN RESULTADO: el Ejemplo 3 (pág. 88, FDM con bandas de guarda) tiene enunciado pero la diapositiva no muestra la resolución. Además no hay en toda la unidad una fórmula escrita de ancho de banda FDM total, así que ese ejercicio no se puede resolver con lo que está en el material.

MATERIAL COMPLEMENTARIO QUE PARECE FALTAR: la pág. 1 es un repaso de la Unidad anterior (entropía H(x), I(x), codificación de fuente) — esas fórmulas pertenecen a otra unidad y no las incluí. La ecuación general de QPSK (pág. 34) y las expresiones de las leyes A y µ son los huecos más notorios de esta unidad.

### `U08-F01` · Velocidad de transmisión (tasa binaria) a partir del tiempo de símbolo ✅

$$R = \frac{1}{T_S} \cdot \log_2 M$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Velocidad de transmisión / tasa binaria | bit/s (bps) |
| $T_S$ | Duración (tiempo) de un símbolo o baudio | s (en las diapositivas se usa µs) |
| $M$ | Cantidad de símbolos o condiciones posibles (amplitudes, frecuencias, fases o combinaciones) | adimensional |

**Condiciones:** Vale para modulaciones digitales M-arias (ASK, FSK, PSK, 4PSK, QPSK, nQAM). M debe ser potencia de 2 para que log2(M)=n sea entero. 1/T_S es la velocidad de modulación r en baudios. Despeje de M: M = 2^(R·T_S). Cuidado con las unidades: si T_S está en µs, R sale en Mbps salvo que se convierta a segundos.

**Despejable para:** R, T_S, M

**Confianza:** alta — La fracción 1/T_S aparece partida en dos líneas en el PDF ("R = 1" / "T_S"), pero se reconstruye sin ambigüedad porque aparece igual en 7 diapositivas y los ejemplos numéricos cierran (1/200µs = 5000). · **Página(s):** 17, 21, 27, 30, 32, 37, 45

### `U08-F02` · Bits por símbolo y cantidad de niveles / símbolos M-arios ⚠️

$$n = \log_2 M \qquad ; \qquad M = 2^{n}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $n$ | Cantidad de bits por símbolo (en PCM: bits por muestra) | bit/símbolo (o bit/muestra) |
| $M$ | Cantidad de condiciones posibles de salida / niveles de cuantificación | adimensional (niveles) |

**Condiciones:** Doble lectura en la unidad: (a) modulaciones M-arias, M = cantidad de símbolos posibles; (b) PCM, M = cantidad de niveles de cuantificación y n = bits de la palabra codificada. n debe ser entero, por lo tanto M potencia de 2. En PCM el bit más significativo se usa como bit de signo.

**Despejable para:** n, M

**Confianza:** alta · **Página(s):** 28, 29, 63, 71, 72

> [!WARNING]
> **Observación de verificación (menor)**  
> El campo expresion_latex contiene DOS ecuaciones separadas por un delimitador tipográfico: "n = \log_2 M \qquad ; \qquad M = 2^{n}". No es una expresión evaluable: cualquier parser (sympy, mathjs, etc.) falla o toma sólo el primer miembro. Las dos ecuaciones sí están en la fuente (p.29 escribe ambas juntas), así que el contenido matemático es correcto; el defecto es de empaquetado.  
> 
> **Corrección propuesta:** Dejar una sola relación canónica, expresion_latex = "n = \log_2 M", y modelar M = 2^n como el despeje inverso (ya está en despejable_para: ["n","M"]). Alternativamente partir en U08-F02a (n = \log_2 M) y U08-F02b (M = 2^{n}).

### `U08-F03` · Ancho de banda / velocidad de modulación M-aria ✅

$$B_{M\text{-}ario} = \frac{R}{\log_2 M} = \frac{R}{n}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $B_{M-ario}$ | Ancho de banda del canal M-ario (equivale a la tasa de símbolos en baudios) | Hz (equivalente a baudios, Bd) |
| $R$ | Velocidad de transmisión | bit/s (bps) |
| $M$ | Cantidad de símbolos de la modulación | adimensional |
| $n$ | Bits por símbolo, n = log2(M) | bit/símbolo |

**Condiciones:** La diapositiva 30 escribe además R = (1/T_S)·log2(M) = B_M-ario·log2(M), o sea B_M-ario = 1/T_S. Despeje de M: M = 2^(R/B_M-ario). En el Ejemplo 4 (pág. 89) la cátedra mezcla unidades directamente: 1 Mbps / 0,250 MHz = 4, es decir R y B deben estar en el mismo múltiplo (M frente a M).

**Despejable para:** B_{M-ario}, R, n, M

**Confianza:** alta · **Página(s):** 30, 89

### `U08-F04` · Velocidad de modulación (baudios) a partir del tiempo de símbolo ✅

$$r = \frac{1}{T_S}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $r$ | Velocidad de modulación / tasa de símbolos | baudios (Bd = símbolos/s) |
| $T_S$ | Duración de un símbolo | s (en las diapositivas µs) |

**Condiciones:** Es la velocidad en baudios, distinta de R (bps) salvo cuando M = 2. Sirve también como B_M-ario según la igualdad de la pág. 30.

**Despejable para:** r, T_S

**Confianza:** media — No está escrita literalmente como "r = 1/T_S". Se deduce de dos hechos de la fuente: (1) la pág. 30 iguala (1/T_S)·log2 M = B_M-ario·log2 M, y (2) los pares de datos de las diapositivas (T_S=200µs ↔ r=5 KBaudios en págs. 17/21/27/32; T_S=125µs ↔ r=8 KBaudios en pág. 37). · **Página(s):** 17, 21, 27, 30, 32, 37

### `U08-F05` · Ancho de banda de ASK ✅

$$BW_{ASK} = 2B$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $BW_{ASK}$ | Ancho de banda ocupado por la señal ASK | Hz |
| $B$ | Velocidad de modulación / ancho de banda de la señal moduladora en banda base | Hz (equivalente a baudios, Bd) |

**Condiciones:** Modulación binaria por conmutación de amplitud (dos amplitudes, frecuencia y fase constantes). Incluye el caso OOK.

**Despejable para:** BW_{ASK}, B

**Confianza:** media — En la pág. 16 el texto extraído es solo "=2B": el miembro izquierdo estaba dentro de una imagen y pypdf no lo recuperó. Se confirma con la pág. 22, que dice literalmente "Ofrece una alta eficiencia de ancho de banda: 2B". El significado exacto de B (baudios vs ancho de banda banda base) no se define en la diapositiva. · **Página(s):** 16, 22

### `U08-F06` · Ancho de banda de FSK ✅

$$BW_{FSK} = 2B + 2\,\Delta f = 2(\Delta f + B)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $BW_{FSK}$ | Ancho de banda ocupado por la señal FSK | Hz |
| $B$ | Velocidad de modulación / ancho de banda de la señal moduladora en banda base | Hz (equivalente a baudios, Bd) |
| $\Delta f$ | Desviación de frecuencia respecto de la portadora | Hz |

**Condiciones:** FSK binaria con desplazamientos de igual magnitud y sentido opuesto respecto de fp. La pág. 23 agrega la cota práctica "al menos 4B" (caso Δf ≥ B).

**Despejable para:** BW_{FSK}, B, \Delta f

**Confianza:** media — En la pág. 20 el texto extraído es solo "=2B + 2Δf" (el miembro izquierdo estaba en una imagen). Se confirma con la pág. 23: "Utiliza un ancho de banda mayor en comparación con otras técnicas de modulación: 2(Δf + B)". · **Página(s):** 20, 23

### `U08-F07` · Ancho de banda de PSK ✅

$$BW_{PSK} = 2B$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $BW_{PSK}$ | Ancho de banda ocupado por la señal PSK | Hz |
| $B$ | Velocidad de modulación / ancho de banda de la señal moduladora en banda base | Hz (equivalente a baudios, Bd) |

**Condiciones:** PSK binaria (2PSK/BPSK), fases 0 y π.

**Despejable para:** BW_{PSK}, B

**Confianza:** media — En la pág. 26 el texto extraído es solo "=2B": el miembro izquierdo estaba dentro de una imagen. La diapositiva no repite la aclaración en prosa como sí hace ASK en la pág. 22. · **Página(s):** 26

### `U08-F08` · Frecuencias de marca y espacio en FSK ⚠️

$$f_1 = f_P + \Delta f \qquad ; \qquad f_2 = f_P - \Delta f$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f_1$ | Frecuencia asignada al "1" lógico | Hz |
| $f_2$ | Frecuencia asignada al "0" lógico | Hz |
| $f_P$ | Frecuencia de la señal portadora | Hz |
| $\Delta f$ | Desviación de frecuencia | Hz |

**Condiciones:** Supone que f1 y f2 son desplazamientos de igual magnitud y sentido opuesto respecto de la portadora (aclarado en pág. 18). Nota de transcripción: la diapositiva escribe la primera como "f1 = f + Δf" (sin el subíndice P) y la segunda como "f2 = fP − Δf"; por contexto ambas se refieren a la misma portadora fP.

**Despejable para:** f_1, f_2, f_P, \Delta f

**Confianza:** alta · **Página(s):** 19

> [!WARNING]
> **Observación de verificación (menor)**  
> Mismo problema de empaquetado pero con consecuencia funcional: expresion_latex = "f_1 = f_P + \Delta f \qquad ; \qquad f_2 = f_P - \Delta f" son DOS fórmulas distintas (marca y espacio) en un solo id, y despejable_para = ["f_1","f_2","f_P","\Delta f"] es ambiguo: si el usuario carga f_P y Δf, la app no sabe si devolver f_1 o f_2; y si despeja f_P, hay dos resultados según de qué ecuación parta. Contenido verificado contra p.19 ("f1 = f + Δf y f2 = fP − Δf"), la transcripción es fiel.  
> 
> **Corrección propuesta:** Partir en dos entradas: U08-F08a con expresion_latex = "f_1 = f_P + \Delta f", despejable_para ["f_1","f_P","\Delta f"]; y U08-F08b con expresion_latex = "f_2 = f_P - \Delta f", despejable_para ["f_2","f_P","\Delta f"].

### `U08-F09` · Señal portadora sinusoidal ⚠️

$$v_p(t) = V_p \, \mathrm{sen}(2\pi f_p t)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $v_p(t)$ | Valor instantáneo de la portadora en el instante t | V |
| $V_p$ | Amplitud pico de la portadora | V |
| $f_p$ | Frecuencia de la portadora | Hz |
| $t$ | Tiempo | s |

**Condiciones:** Es la portadora analógica sin modular usada como base de ASK, FSK y PSK. El argumento está en radianes. No se despejan f_p ni t porque quedan dentro del seno (el arcoseno es multivaluado).

**Despejable para:** v_p, V_p

**Confianza:** alta · **Página(s):** 14, 18, 24

> [!WARNING]
> **Observación de verificación (menor)**  
> Desajuste de nombres de símbolo entre campos: en `variables` el símbolo se declara como "v_p(t)" (con el argumento incluido) pero en `despejable_para` figura como "v_p". Un resolvedor que haga lookup por string no encuentra la variable y el despeje falla en silencio. La fórmula en sí es correcta: p.14/18/24 escriben "vp(t) = Vp sen(2π fp t)".  
> 
> **Corrección propuesta:** Unificar el identificador: símbolo "v_p" en `variables` (con el significado aclarando que es el valor instantáneo en el instante t), o bien "v_p(t)" en ambos campos. La exclusión de f_p y t de despejable_para es correcta.

### `U08-F10` · Cota del número de estados en QAM ⚠️

$$M \le N^{\circ}\ Fases \times N^{\circ}\ Amplitudes$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M$ | Cantidad de estados (símbolos) de la constelación QAM | adimensional |
| $N° Fases$ | Cantidad de desplazamientos de fase distintos | adimensional |
| $N° Amplitudes$ | Cantidad de amplitudes distintas | adimensional |

**Condiciones:** Es una DESIGUALDAD (cota superior), no una igualdad: no todas las combinaciones fase-amplitud se usan. QAM combina ASK + PSK; la cátedra aclara que el número de desplazamientos de fase siempre es mayor que el de amplitudes. En la pág. 38 aparece marcada con (*).

**Despejable para:** M, N° Fases, N° Amplitudes

**Confianza:** alta · **Página(s):** 36, 38

> [!WARNING]
> **Observación de verificación (menor)**  
> despejable_para = ["M","N° Fases","N° Amplitudes"] no es válido para los dos últimos símbolos. La relación es una DESIGUALDAD (M ≤ N°Fases × N°Amplitudes, verificado literal en p.36 y p.38 con el (*)); despejando N°Fases se obtiene N°Fases ≥ M / N°Amplitudes, es decir una COTA INFERIOR, no un valor. La app devolvería una igualdad falsa (p. ej. "N° Fases = 4" cuando la verdad es "N° Fases ≥ 4"). El campo `condiciones` avisa que es cota superior para M, pero no cubre el despeje inverso.  
> 
> **Corrección propuesta:** Reducir despejable_para a ["M"] (único despeje que conserva el sentido de la cota, M_max = N°Fases × N°Amplitudes), o marcar los otros dos como despejes de cota y rotular el resultado con "≥" en la UI.

### `U08-F11` · Relación entre número de estados M y SNR (nQAM adaptativo) ✅

$$M = SNR + 1$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M$ | Cantidad de estados de la modulación (nQAM) | adimensional |
| $SNR$ | Relación señal / ruido | adimensional (relación lineal de potencias, NO dB) |

**Condiciones:** Transcripción literal de la diapositiva. IMPORTANTE para la app: el SNR de esta fórmula es lineal, no en dB. Verificación: para 16-QAM da SNR = 15 (≈11,8 dB), mientras que las tablas de las págs. 46/78 exigen 21,8 dB para BER < 10^-7. O sea, la fórmula es el límite teórico (tipo Shannon) y la tabla es el requisito práctico; no coinciden. No mezclar ambas en un mismo cálculo.

**Despejable para:** M, SNR

**Confianza:** alta · **Página(s):** 45, 46, 78, 79

### `U08-F12` · Teorema del muestreo (Nyquist): frecuencia de muestreo mínima ✅

$$f_S \ge 2\, f_{MAX}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $f_S$ | Frecuencia de muestreo | Hz (muestras/s) |
| $f_{MAX}$ | Frecuencia máxima (ancho de banda) de la señal analógica limitada en banda | Hz |

**Condiciones:** Requiere que la señal esté previamente filtrada (pasa bajos) y limitada en banda a f_MAX. Para el caso de igualdad f_S = 2·f_MAX se obtiene la frecuencia de muestreo mínima. Ejemplo de la cátedra: voz con f_MAX = 4000 Hz → f_S = 8000 Hz.

**Despejable para:** f_S, f_{MAX}

**Confianza:** alta · **Página(s):** 49, 51

### `U08-F13` · Período de muestreo ⚠️

$$T_S = \frac{1}{f_S}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $T_S$ | Período (intervalo) de muestreo | s (en telefonía 125 µs) |
| $f_S$ | Frecuencia de muestreo | Hz (muestras/s) |

**Condiciones:** Usado en PCM y en la trama E1/T1: T_S = 1/8000 = 125 µs (págs. 100 y 108). ADVERTENCIA de transcripción: la pág. 49 escribe "T_S ≥ 1/(2 f_MAX)", con el sentido de la desigualdad invertido respecto de Nyquist (debería ser ≤, ya que f_S ≥ 2 f_MAX implica T_S ≤ 1/(2 f_MAX)). Se transcribe la igualdad T_S = 1/f_S, que sí se usa con números en las págs. 100 y 108.

**Despejable para:** T_S, f_S

**Confianza:** alta · **Página(s):** 49, 100, 108

> [!WARNING]
> **Observación de verificación (menor)**  
> Colisión de símbolo dentro de la misma unidad: T_S aquí es el PERÍODO DE MUESTREO (T_S = 1/f_S, 125 µs en E1/T1), mientras que en U08-F01 y U08-F04 T_S es la DURACIÓN DEL SÍMBOLO de la modulación (200 µs, 125 µs). Son magnitudes distintas con el mismo nombre. Si la app comparte una tabla de símbolos entre fórmulas de la misma unidad, cargar T_S = 125 µs en el bloque PCM y reutilizarlo en R = (1/T_S)·log2 M da un resultado sin sentido físico. La ambigüedad viene de la fuente (la cátedra usa T_S para las dos cosas), pero el modelo de datos debe desambiguarla.  
> 
> **Corrección propuesta:** Renombrar en esta fórmula a T_m (o T_muestreo): expresion_latex = "T_m = \frac{1}{f_S}", y dejar T_S reservado para la duración del símbolo. Mantener la advertencia ya presente sobre el "T_S ≥ 1/(2 f_MAX)" invertido de la p.49.

### `U08-F14` · Velocidad del canal PCM (velocidad de la señal digitalizada) ✅

$$C = f_S \times n$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C$ | Velocidad del canal digitalizado | bit/s (bps) |
| $f_S$ | Frecuencia de muestreo | Hz (muestras/s) |
| $n$ | Bits por muestra (bits de la palabra de cuantificación) | bit/muestra |

**Condiciones:** PCM con cuantificación uniforme de n bits. Escrita en las diapositivas como "C = 8000 muestra/seg x 8 Bits/muestra = 64.000 bps". Es la base del canal E0/T0 de 64 kbps.

**Despejable para:** C, f_S, n

**Confianza:** alta · **Página(s):** 72, 100, 108

### `U08-F15` · Longitud de onda de una portadora óptica (WDM) ✅

$$\lambda = \frac{C}{f}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $\lambda$ | Longitud de onda de la portadora óptica | m (en la práctica nm o µm) |
| $C$ | Velocidad de la luz (constante) | m/s |
| $f$ | Frecuencia de la portadora óptica | Hz |

**Condiciones:** Aplica a WDM/DWDM, donde cada señal viaja con una λ distinta. La diapositiva no da el valor de C ni aclara si es la velocidad de la luz en el vacío o en la fibra.

**Despejable para:** \lambda, f

**Confianza:** media — La fracción quedó partida en dos líneas del PDF ("= C" / "f") y el símbolo λ salió como un carácter de área de uso privado (fuente Symbol). Se reconstruye por contexto: la línea inmediatamente anterior habla de "distinta longitud de onda λ". La diapositiva no escribe el miembro izquierdo explícito ni define C numéricamente. · **Página(s):** 82

### `U08-F16` · Cantidad de bits de la trama de salida en TDM sincrónica ✅

$$N_{trama} = k \cdot b + s$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N_{trama}$ | Cantidad de bits de la trama de salida | bits |
| $k$ | Cantidad de canales (conexiones) multiplexados | adimensional |
| $b$ | Bits por ranura de tiempo (unidad de entrada) de cada canal | bits |
| $s$ | Bits de sobrecarga por trama (sincronismo + señalización); s = 0 si no hay | bits |

**Condiciones:** TDM sincrónica: se asigna una ranura a cada canal aunque no tenga datos. Verificado contra los Ejemplos 5 a 11: 4·1+0=4; 4·8+0=32; 4·2+0=8; 4·1+1=5; 4·8+8=40; 4·2+1=9; 30·8+8+8=256 (= 32 TS · 8 bits).

**Despejable para:** N_{trama}, k, b, s

**Confianza:** media — No aparece escrita simbólicamente en ninguna diapositiva: se infiere de la aritmética explícita de los siete ejemplos resueltos (págs. 93-100), donde siempre cierra. · **Página(s):** 93, 94, 95, 97, 98, 99, 100

### `U08-F17` · Duración de la trama en TDM sincrónica ✅

$$T_{trama} = \frac{b}{R_{canal}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $T_{trama}$ | Duración de la trama de salida (igual a la duración de la unidad de entrada de un canal) | s (en los ejemplos ms o µs) |
| $b$ | Bits por ranura de tiempo (unidad de entrada) de cada canal | bits |
| $R_{canal}$ | Tasa de datos de cada canal de entrada | bit/s (bps) |

**Condiciones:** Todos los canales de entrada deben tener la misma tasa R_canal (TDM sincrónica con tasas iguales). Los bits de sincronismo/señalización NO entran en b: no alargan la trama, solo aumentan la tasa del enlace. Verificado: 1 bit/1 Kbps = 1 ms; 8 bits/100 bps = 80 ms; 2 bits/100 Kbps = 20 µs; 8 bits/64 Kbps = 125 µs.

**Despejable para:** T_{trama}, b, R_{canal}

**Confianza:** media — No aparece escrita simbólicamente; se infiere de los valores "Duración de la trama = ..." de los Ejemplos 5 a 11, que cierran en los siete casos. · **Página(s):** 93, 94, 95, 97, 98, 99, 100

### `U08-F18` · Tasa de transmisión del enlace en TDM sincrónica ✅

$$R_{enlace} = \frac{N_{trama}}{T_{trama}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_{enlace}$ | Tasa de transmisión (velocidad de bit) del enlace multiplexado | bit/s (bps) |
| $N_{trama}$ | Cantidad de bits de la trama de salida | bits |
| $T_{trama}$ | Duración de la trama | s |

**Condiciones:** Escrita literalmente en las diapositivas como "Tasa de bit = 8 bit/20 µs = 400 Kbps", "Tasa de bit = 40 bits/80 ms = 500 bps", y en la pág. 108 como "256 bits/125 µs = 2,048 Mbps" (E1) y "193 bits/125 µs = 1,544 Mbps" (T1). Los bits de sincronismo y señalización SÍ se cuentan en N_trama.

**Despejable para:** R_{enlace}, N_{trama}, T_{trama}

**Confianza:** alta · **Página(s):** 93, 94, 95, 97, 98, 99, 100, 108

### `U08-F19` · Duración de un time slot dentro de la trama PCM ✅

$$T_{TS} = \frac{T_{trama}}{N_{TS}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $T_{TS}$ | Duración de un intervalo de tiempo (time slot) | s (en los ejemplos µs) |
| $T_{trama}$ | Duración de la trama PCM (125 µs en E1 y T1) | s |
| $N_{TS}$ | Cantidad de time slots por trama | adimensional |

**Condiciones:** Escrita como "125 µs/32 = 3,9 µs" para E1 y "125 µs/24 = 5,2 µs" para T1. T_trama = 125 µs viene de f_S = 8 kHz. Los valores 3,9 y 5,2 µs de la diapositiva están redondeados (los exactos son 3,90625 µs y 5,2083 µs).

**Despejable para:** T_{TS}, T_{trama}, N_{TS}

**Confianza:** alta · **Página(s):** 108

### `U08-F20` · Velocidad de la trama E1 a partir de los canales E0 ✅

$$R = N_{TS} \times R_{E0}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Velocidad de la trama multiplexada | bit/s (kbps en la diapositiva) |
| $N_{TS}$ | Cantidad de time slots por trama (32 en E1) | adimensional |
| $R_{E0}$ | Velocidad del canal básico E0 | bit/s (64 kbps) |

**Condiciones:** Escrita literalmente como "transmite a 32 × 64Kbps = 2048 Kbps". Ojo: los 32 time slots incluyen 30 canales de voz + 2 de servicio (sincronismo y señalización), no 32 canales útiles. No es directamente aplicable a T1, que usa 24 TS + 1 bit = 193 bits/trama (no 24 × 64 kbps).

**Despejable para:** R, N_{TS}, R_{E0}

**Confianza:** alta · **Página(s):** 107

### `U08-F21` · Velocidad de la trama SDH (STM-1) ✅

$$R_{STM} = f_{trama} \times (columnas \times filas \times 8)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_{STM}$ | Velocidad binaria de la trama SDH | bit/s (Mbps) |
| $f_{trama}$ | Cantidad de tramas por segundo (8000, una cada 125 µs) | tramas/s |
| $columnas$ | Columnas de la trama (270 total en STM-1; 261 si se cuenta solo la carga útil) | adimensional |
| $filas$ | Filas de la trama (9 en STM-1) | adimensional |
| $8$ | Bits por byte de la matriz de la trama | bit/byte |

**Condiciones:** Aplica a STM-1. Escrita como "8000 tramas * (270 columnas * 9 filas * 8 bits) = 155,52 Mbps" y también como "(270*9*8) bit/125 µs". Con 261 columnas (270 menos las 9 de SOH = Section OverHead) da la carga útil de datos: 150,336 Mbps. Para STM-N los niveles superiores se obtienen multiplexando byte a byte N estructuras STM-1 (págs. 116 y 118), pero la diapositiva no da una fórmula cerrada para STM-N.

**Despejable para:** R_{STM}, f_{trama}, columnas, filas

**Confianza:** alta · **Página(s):** 115

### Ejemplos resueltos — Unidad 8

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U08-F01` | ASK - Bit vs Baudio. Se transmite con ASK de 2 amplitudes y tiempo de símbolo de 200 µs (5 | T_s = 200 µs ; r = 5 KBaudios ; M = 2 amplitudes | **R = (1/200µs) · log2(2) = 5000 × 1 = 5 Kbps** | 17 |
| `U08-F01` | FSK - Bit vs Baudio. Se transmite con FSK de 2 frecuencias y tiempo de símbolo de 200 µs ( | T_s = 200 µs ; r = 5 KBaudios ; M = 2 frecuencias | **R = (1/200µs) · log2(2) = 5000 × 1 = 5 Kbps** | 21 |
| `U08-F01` | PSK - Bit vs Baudio. Se transmite con PSK de 2 fases y tiempo de símbolo de 200 µs (5 KBau | T_s = 200 µs ; r = 5 KBaudios ; M = 2 fases | **R = (1/200µs) · log2(2) = 5000 × 1 = 5 Kbps** | 27 |
| `U08-F02` | Sistema FSK binario: dos valores posibles (un "1" o un "0" lógico), se procesa un bit por  | M = 2 | **n = log2(2) = 1 [bit/símbolo]  o  M = 2^1 = 2 niveles (la diapositiva lo imprime como "M = 2 × 1 = 2")** | 29 |
| `U08-F02` | 4PSK: su entrada es binaria y debe producir 4 condiciones distintas. Calcular cuántos bits | M = 4 | **n = log2(4) = 2 bit/símbolo (2 bits: 00, 01, 10, 11 → 4 fases posibles)** | 31 |
| `U08-F01` | 4PSK - Bit vs Baudio. Tiempo de símbolo 200 µs (5 KBaudios) con 4 fases. Calcular R. | T_s = 200 µs ; r = 5 KBaudios ; M = 4 fases | **R = (1/200µs) · log2(4) = 5000 × 2 = 10 Kbps** | 32 |
| `U08-F01` | 8QAM - Bit vs Baudio. Tiempo de símbolo 125 µs (8 KBaudios) con M = 8. Calcular R. | T_s = 125 µs ; r = 8 KBaudios ; M = 8 | **R = (1/125µs) · log2(8) = 8000 × 3 = 24 Kbps** | 37 |
| `U08-F14` | Ejemplo 1 (PCM, telefonía): los datos de voz se limitan por debajo de 4000 Hz (f_MAX = 400 | f_MAX = 4000 Hz ; f_S = 8000 Hz ; n = 8 bits/muestra ; M = 256 niveles | **C = 8000 muestra/seg × 8 Bits/muestra = 64.000 bps = 64 Kbps** | 72 |
| `U08-F14` | Ejemplo 2 (PCM, audio de CD): se muestrea a f_S = 44.100 Hz y se cuantifica a n = 16 bits. | f_S = 44.100 Hz ; n = 16 bits/muestra ; M = 65536 niveles (la diapositiva dice 56536) | **C = 44.100 muestra/seg × 16 Bits/muestra = 705.600 bps = 705,6 Kbps** | 72 |
| `U08-F05` | Ejemplo 3 (FDM): se multiplexan cinco canales de radio, cada uno con B = 100 KHz. ¿Cuál es | 5 canales ; B = 100 KHz cada uno ; banda de guarda = 10 KHz entre canales | **No figura en la diapositiva (solo aparece el enunciado, sin solución). Tampoco hay en la unidad una fórmula escrita de ancho de banda FDM.** | 88 |
| `U08-F03` | Ejemplo 4 (FDM + nQAM): para 4 canales de datos digitales, cada uno transmitiendo a R = 1  | 4 canales ; R = 1 Mbps por canal ; B total = 1 MHz → B_M-ario = 1MHz/4 = 250 KHz | **B_M-ario = 250 KHz ; log2(M) = R / B_M-ario = 1 Mbps / 0,250 MHz = 4 ; entonces M = 16 → la modulación será 16-QAM** | 89 |
| `U08-F18` | Ejemplo 5 (TDM Sincrónica orientada al bit): cuatro conexiones de 1 Kbps se multiplexan ju | k = 4 conexiones ; R_canal = 1 Kbps ; b = 1 bit por ranura ; sin bits de sincronismo | **a) 4 bits (trama de 4 bits) ; b) 1 ms ; c) Tasa de bit = 4 bits/1 ms = 4 Kbps** | 93 |
| `U08-F18` | Ejemplo 6 (TDM Sincrónica orientada al carácter): se multiplexan 4 canales de 100 bps cada | k = 4 canales ; R_canal = 100 bps ; b = 8 bits (1 byte) ; sin sincronismo | **a) 32 bits ; b) 80 ms ; c) Tasa de bit = 32 bits/80 ms = 400 bps** | 94 |
| `U08-F18` | Ejemplo 7 (TDM Sincrónica orientada al carácter): un multiplexor combina 4 canales de 100  | k = 4 canales ; R_canal = 100 Kbps ; b = 2 bits por ranura ; sin sincronismo | **a) 20 µs ; b) 8 bits ; c) Tasa de bit = 8 bit/20 µs = 400 Kbps** | 95 |
| `U08-F18` | Ejemplo 8 (TDM Sincrónica orientada al bit, con sincronismo): cuatro conexiones de 1 Kbps  | k = 4 conexiones ; R_canal = 1 Kbps ; b = 1 bit por ranura ; s = 1 bit de sincronismo por trama | **a) 5 bits (trama de 5 bits) ; b) 1 ms ; c) Tasa de bit = 5 bits/1 ms = 5 Kbps** | 97 |
| `U08-F18` | Ejemplo 9 (TDM Sincrónica orientada al carácter, con sincronismo): se multiplexan 4 canale | k = 4 canales ; R_canal = 100 bps ; b = 8 bits (1 byte) ; s = 8 bits (1 byte de sincronismo) | **a) 40 bits (trama de 5 bytes) ; b) 80 ms ; c) Tasa de bit = 40 bits/80 ms = 500 bps** | 98 |
| `U08-F18` | Ejemplo 10 (TDM Sincrónica orientada al carácter, con sincronismo): un multiplexor combina | k = 4 canales ; R_canal = 100 Kbps ; b = 2 bits por ranura ; s = 1 bit de sincronismo | **a) 20 µs ; b) 9 bits ; c) Tasa de bit = 9 bit/20 µs = 450 Kbps** | 99 |
| `U08-F18` | Ejemplo 11 (TDM Sincrónica, trama E1): un multiplexor combina 30 canales de 64 Kbps utiliz | k = 30 canales ; R_canal (E0) = 64 Kbps ; b = 8 bits (1 byte) ; s = 8 bits sincronismo + 8 bits señalización → 32 TS en total | **a) 32 TS × 8 bits = 256 bits ; b) Ts = 1/8000 = 125 µs ; c) R = 2,048 Mbps** | 100 |
| `U08-F20` | Jerarquía PDH sistema E: la señal E1 contiene 30 canales + 2 de servicio + sincronismo. Ca | 32 time slots × 64 Kbps | **32 × 64 Kbps = 2048 Kbps (2,048 Mbps)** | 107 |
| `U08-F14` | Características comunes E1 y T1: la voz se limita por debajo de 4000 Hz (f_MAX = 4000 Hz), | f_MAX = 4000 Hz ; f_S = 8000 Hz ; n = 8 bits/muestra | **T_S = 1/8000 = 125 µs ; R = 8000 m/s · 8 bits/m = 64 Kbps ; M = 256 = 2^8** | 108 |
| `U08-F18` | Comparación E1 vs T1: E1 tiene 32 time slots (32 × 8 bits = 256 bits por trama); T1 tiene  | E1: 32 TS, 256 bits/trama, T_trama = 125 µs. T1: 24 TS + 1 bit, 193 bits/trama, T_trama = 125 µs | **E1: duración TS = 125 µs/32 = 3,9 µs ; velocidad = 256 bits/125 µs = 2,048 Mbps. T1: duración TS = 125 µs/24 = 5,2 µs ; velocidad = 193 bits/125 µs = 1,544 Mbps** | 108 |
| `U08-F21` | Módulo de Transporte Síncrono STM-1: se transmiten 8.000 tramas por segundo (una cada 125  | f_trama = 8000 tramas/s (T_trama = 125 µs) ; 270 columnas × 9 filas × 8 bits (total) ; 261 columnas × 9 filas × 8 bits (carga útil) ; SOH = 9 columnas | **Total: 8000 × (270 × 9 × 8) = (270*9*8) bit/125 µs = 155,52 Mbps. Carga útil: (261*9*8) bit/125 µs = 150,336 Mbps** | 115 |


---

## Unidad 9 — Equipos de Comunicación de Datos (DCE)

> TÍTULO: el PDF se titula "Unidad 09: Equipos de Comunicación de Datos (DCE)" (Data Circuit-terminating Equipment), no "ECD" como figuraba en el pedido. Usé el título tal cual aparece en las diapositivas.

CARÁCTER DE LA UNIDAD: es mayormente descriptiva (equipos, arquitecturas de acceso, capa física). De 58 páginas, la matemática calculable se concentra en apenas 6: p.7, p.10, p.13, p.19, p.20, p.21-23 (repeticiones de M = sqrt(1+SNR)) más las cuentas numéricas de p.26-28. La p.20 es la más densa: contiene 5 de las 6 fórmulas escritas explícitamente.

LECTURA: el PDF es imagen pura (0 caracteres de capa de texto, verificado con PyMuPDF). Lo rendericé página por página a PNG con PyMuPDF y lo leí visualmente; las expresiones críticas (p.7, p.19, p.20, tabla de tasas de p.7, polinomio de scrambling de p.56) las volví a recortar y ampliar 4-5x para confirmar subíndices y exponentes. Todas las fórmulas de confianza "alta" fueron verificadas en zoom.

FÓRMULAS REPETIDAS: R = (1/Ts)·log2(M) = B_M-ario·log2(M) aparece 5 veces (p.7, 10, 13 -en versión corta R = B_M-ario·log2 M-, 19 y 20). M = sqrt(1+SNR) aparece 4 veces (p.20, 21, 22, 23), siempre resaltada en amarillo. La repetición es indicio de que la cátedra las considera centrales.

CUIDADO CON EL FACTOR 2 (posible ambigüedad de notación): la p.20 encadena C = 2B·log2(M) = B·log2(1+SNR). Estrictamente, con la misma B en ambos miembros esto no es Nyquist+Shannon canónicos (Nyquist canónico es C = 2B·log2 M con B = banda pasante, Shannon es C = B·log2(1+SNR) con B = banda pasante). En los diagramas de las p.19-21 la cátedra dibuja la señal modulada ocupando "2B" alrededor de f_p, o sea usa B como banda base. Transcribí la cadena TAL CUAL figura, sin corregirla, y separé los dos miembros en U09-F02 y U09-F03 porque cada uno es calculable por separado. La app debería dejar claro al usuario qué B está pidiendo.

FILA "FSK" DE LA TABLA DE p.7: no la incluí como ejemplo porque el resultado no es un número exacto: la tabla dice "<2.400" (semidúplex) y "<1.200" (dúplex). El resto de las filas de la tabla verifica exactamente R = B_M-ario·log2(M) y las capturé todas como casos de test.

INCONSISTENCIAS NUMÉRICAS DEL PROPIO MATERIAL (no son errores míos, están en la fuente):
- Ancho de canal DMT: p.26 dice 4,3125 KHz, p.29 dice 4.312 kHz, y las cuentas de velocidad de p.27/28 usan 4 KHz. Los tres valores conviven en el mismo deck.
- Reparto de canales: p.27 dice "canales 6-30" (que son 25 canales) y luego "24 canales de datos + 1 canal de control"; p.28 dice "canales 31-255" (225 canales) y "224 canales de datos + 1 de control". Las cuentas usan 24 y 224, coherente.
- p.3 dice que el módem analógico "oscila entre los 9.5 Kbps y los 56 Kbps"; el 9.5 Kbps es inusual (suele citarse 9.6 Kbps). Lo dejo señalado, no lo corrijo.
- Los resultados 1,44 Mbps y 13,44 Mbps de p.27/28 están BIEN calculados (24·4000·15 = 1.440.000 y 224·4000·15 = 13.440.000). 1,104 MHz / 256 = 4,3125 kHz también está bien.

CONTENIDO NO CALCULABLE QUE SÍ CUBRE LA UNIDAD (excluido a propósito): definición y clasificación de MODEM (analógico / digital / cable modem, interno / externo); DTE vs DCE; ancho de banda telefónico (300-3300 Hz voz, 600-3000 Hz = 2400 Hz para datos); módems de 56K y estándares ITU-T serie V (V.32, V.90); POTS/PSTN; familia xDSL (ADSL, VDSL, HDSL, SDSL, IDSL, CDSL); arquitectura ADSL (ATU-R, ATU-C, splitter, bucle de abonado); plan de frecuencias ADSL (voz 0-4 kHz, upstream 26-108 kHz, downstream 138-1104 kHz); FDM y DMT; bit-swapping / realocación de bits por SNR; red de acceso con pares de cobre; DSLAM y DSLAM ATM (interfaces STM-1, STM-4, E3); VDSL/VDSL2; FTTx (FTTN, FTTB, FTTC, FTTH); HFC; tecnología PON (OLT, splitter, ONU, ODN), clasificación (APON, BPON, EPON, GEPON, GPON, XG-PON, XGS-PON, NG-PON2), evolución y capa física.

TABLAS DE ESTÁNDARES EXCLUIDAS (por consigna, no son fórmulas): p.36 tasas ADSL/ADSL2/ADSL2+ (8/1, 12/2, 24/2 Mbps); p.42 tabla VDSL distancia-velocidad (300 m: 52/6,4 Mbps; 300 m: 26/26; 1000 m: 26/3,2; 1000 m: 13/13; 1500 m: 13/1,6); p.43 tabla ADSL máximo downstream / mínimo upstream; p.53 tabla PON con longitudes de onda (nm) y velocidades (Gbps) de GPON/XG-PON/XGS-PON/NG-PON2; p.52 línea de tiempo de estándares PON.

DOS CANDIDATOS QUE DESCARTÉ DELIBERADAMENTE (para no inventar):
1. Reed-Solomon de p.58: la diapositiva dice "RS (255, 239) (es decir, 16 bytes de redundancia por cada 239 bytes de datos)" y "permite corregir hasta 8 bytes erróneos por código". Las relaciones generales redundancia = n - k y t = (n-k)/2 NO están escritas en el material, solo los números concretos; venían de conocimiento general de teoría de códigos, así que no las incluí como fórmula. Si la app quiere un caso de test fijo: n=255, k=239 → 16 bytes de redundancia y t=8 bytes corregibles.
2. Ancho de banda de una banda como f_max - f_min: la p.17 dice "Upstream 26KHz-108KHz, o sea B_M-ario ≈ 80KHz" y "Downstream 138KHz-1104KHz, o sea B_M-ario ≈ 1MHz". Son restas aproximadas (82 kHz y 966 kHz redondeados), enunciadas en palabras y no como fórmula. Las dejé como condición de U09-F01 en vez de crear una fórmula.

OTROS DATOS NUMÉRICOS SUELTOS, ÚTILES COMO PRESETS PERO NO COMO FÓRMULA: banda vocal 300-3400 Hz (p.10) o 300-3300 Hz (p.6) según la diapositiva; módem digital RDSI 128 Kbps (p.4); límite del módem analógico 56 Kbps (p.8, p.11); ADSL2/ADSL2+ ocupan hasta 1,1 MHz y 2,2 MHz respectivamente y VDSL2 hasta 12 MHz (p.36, p.41); VDSL 51-55 Mbps sobre 300 m (p.41); VDSL2 300/100 Mbps asimétrico o 100/100 simétrico en condiciones ideales (p.42); PON usa 1310 nm subida, 1490 nm bajada, 1550 nm video (p.49); GPON codifica NRZ con scrambling de polinomio 1 + x^39 + x^58 (p.56, exponentes verificados en zoom) y modula IM/DD con formato OOK/ASK (p.57); FEC mejora la sensibilidad óptica del receptor entre 2 y 3 dB (p.58); el SNR se re-mide durante showtime cada 10 s por default (p.25).

### `U09-F01` · Velocidad de transmisión (tasa binaria) del módem M-ario ✅

$$R = \frac{1}{T_S} \log_2 M = B_{M\text{-}ario} \cdot \log_2 M$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Velocidad de transmisión / tasa binaria del módem | bit/s |
| $T_S$ | Duración del símbolo (tiempo de símbolo) | s |
| $M$ | Número de estados o símbolos de la modulación (orden M-ario; ej. M=16 para 16-QAM) | adimensional |
| $B_M-ario$ | Ancho de banda asignado a la señal M-aria, numéricamente igual a la velocidad de modulación (baudios) = 1/T_S | Hz |

**Condiciones:** Tasa TEÓRICA, sin considerar ruido, codificación ni overhead. Se asume B_M-ario = 1/T_S (baudios). M debe ser potencia de 2 para que log_2(M) sea entero. Sobre línea telefónica el ancho de banda útil para datos es 2400 Hz (600-3000 Hz dentro de la banda vocal 300-3300 Hz): en SEMIDÚPLEX B_M-ario = 2400 Hz y en DÚPLEX B_M-ario = 1200 Hz por sentido (1200 Up + 1200 Down). En ADSL la misma fórmula se aplica con B_M-ario ≈ 80 kHz para upstream (banda 26-108 kHz) y B_M-ario ≈ 1 MHz para downstream (banda 138-1104 kHz). En la p.19/20 la fórmula aparece con asterisco (R = (1/T_S)*log2 M) y en la p.7/10 sin él: es la misma expresión.

**Despejable para:** R, T_S, B_M-ario, M

**Confianza:** alta · **Página(s):** 7, 10, 13, 19, 20

### `U09-F02` · Capacidad de canal de Nyquist (canal sin ruido) ✅

$$C = 2B \cdot \log_2 M$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C$ | Capacidad del canal | bit/s |
| $B$ | Ancho de banda de banda base de la señal moduladora (la señal modulada ocupa 2B alrededor de la portadora f_p) | Hz |
| $M$ | Número de estados o símbolos de la modulación | adimensional |

**Condiciones:** Aparece como primer miembro de la cadena de igualdades 'C = 2B.log2 M = B.log2(1 + SNR)' de la p.20, usada para derivar el M máximo por portadora en DMT. OJO con el factor 2: según los diagramas de las p.19-21 el espectro modulado ocupa 2B centrado en f_p, es decir B es la banda base y 2B la banda pasante. No contempla ruido.

**Despejable para:** C, B, M

**Confianza:** alta · **Página(s):** 20

### `U09-F03` · Capacidad de canal de Shannon (canal con ruido) ✅

$$C = B \cdot \log_2 (1 + SNR)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $C$ | Capacidad máxima del canal ruidoso | bit/s |
| $B$ | Ancho de banda del canal | Hz |
| $SNR$ | Relación señal/ruido S/N en veces (lineal) | adimensional (veces, NO dB) |

**Condiciones:** SNR debe ir en VECES (lineal), no en dB. Si el dato viene en dB, convertir antes con SNR = 10^(SNR_dB/10) (ver U09-F06). Aparece como segundo miembro de la cadena 'C = 2B.log2 M = B.log2(1 + SNR)' de la p.20. Es un límite teórico superior, no alcanzable en la práctica.

**Despejable para:** C, B, SNR

**Confianza:** alta · **Página(s):** 20

### `U09-F04` · Máximo orden de modulación M por portadora (DMT/ADSL) ✅

$$M = \sqrt{1 + SNR}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $M$ | Máximo número de estados (nQAM) soportado por la portadora | adimensional |
| $SNR$ | Relación señal/ruido medida sobre esa portadora, en veces (lineal) | adimensional (veces, NO dB) |

**Condiciones:** Se obtiene igualando Nyquist y Shannon en la p.20: 2B·log2(M) = B·log2(1+SNR) → B·log2(M^2) = B·log2(1+SNR) → M^2 = 1+SNR. SNR en veces, no en dB. El resultado se lleva luego a la potencia de 2 (nQAM real) soportada: mínimo 4-QAM (2 bits/símbolo) y máximo 16384-QAM (14 bits/símbolo) según p.23. En ADSL el SNR se mide por portadora en la inicialización y se re-mide durante showtime a intervalos regulares (default 10 s).

**Despejable para:** M, SNR

**Confianza:** alta · **Página(s):** 20, 21, 22, 23

### `U09-F05` · Potencia de ruido térmico ✅

$$N = K \cdot T \cdot B$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $N$ | Potencia de ruido térmico | W |
| $K$ | Constante de Boltzmann | J/K |
| $T$ | Temperatura absoluta | K (Kelvin) |
| $B$ | Ancho de banda | Hz |

**Condiciones:** La diapositiva la escribe literalmente como 'N = KTB (W)' y NO da el valor numérico de K ni define los símbolos. Para obtener N en watts, T debe ir en Kelvin y B en Hz. El '(W)' del original indica la unidad del resultado, no es un factor.

**Despejable para:** N, K, T, B

**Confianza:** alta · **Página(s):** 20

### `U09-F06` · Relación señal/ruido en decibeles ✅

$$SNR_{dB} = 10 \log_{10} (S/N)$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $SNR_dB$ | Relación señal/ruido expresada en decibeles | dB |
| $S$ | Potencia de la señal | W |
| $N$ | Potencia del ruido (ver U09-F05) | W |

**Condiciones:** La diapositiva escribe 'log' sin indicar la base; por el factor 10 corresponde a logaritmo DECIMAL (base 10). S y N deben estar en la MISMA unidad de potencia (W con W, mW con mW). Es una relación de potencias, por eso el factor 10 y no 20. Para usar el SNR en U09-F03 o U09-F04 hay que volver a veces: SNR = 10^(SNR_dB/10).

**Despejable para:** SNR_dB, S, N

**Confianza:** alta · **Página(s):** 20

### `U09-F07` · Bits por símbolo de una modulación M-aria ✅

$$n = \log_2 M$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $n$ | Cantidad de bits transportados por cada símbolo (bits/símbolo o bits/baudio) | bit/símbolo |
| $M$ | Número de estados de la modulación (orden nQAM/nPSK) | adimensional |

**Condiciones:** M debe ser potencia de 2 para que n sea entero. En ADSL/DMT n va de 2 (4-QAM, mínimo) a 14 bits/símbolo (16384-QAM, máximo) por portadora.

**Despejable para:** n, M

**Confianza:** media — No aparece escrita como ecuación aislada en ninguna diapositiva. Se deduce del factor log_2(M) de U09-F01 y de los pares M -> bits/símbolo que la cátedra sí escribe explícitamente: p.20 (4QAM=2bps, 8-PSK=3bps, 16QAM=4bps, 32QAM=5bps, 64QAM=6bps, 128QAM=7bps), p.23 (4-QAM -> 2 bits/símbolo, 16384-QAM -> 14 bits/símbolo) y p.25 (4096-QAM -> 12 bits/símbolo, 1024-QAM -> 10 bits/símbolo). La generalización simbólica es del extractor, no del material. · **Página(s):** 20, 23, 25

### `U09-F08` · Velocidad máxima teórica de un enlace multiportadora (ADSL/DMT) ✅

$$R = N_{canales} \cdot B_{canal} \cdot n$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R$ | Velocidad máxima teórica del enlace (upstream o downstream) | bit/s |
| $N_canales$ | Cantidad de canales (portadoras) efectivamente usados para datos | adimensional |
| $B_canal$ | Ancho de banda de cada canal, tomado como velocidad de modulación en baudios | Hz (baudios) |
| $n$ | Bits por baudio de la modulación QAM usada en cada canal | bit/baudio |

**Condiciones:** Es velocidad TEÓRICA; la real es sensiblemente menor porque algunas portadoras no se pueden usar por el nivel de ruido (upstream real ~1 Mbps, downstream real ~8 Mbps). En las cuentas de la cátedra se usa B_canal = 4 kHz (redondeando los 4,3125 kHz nominales del canal DMT) y n = 15 bits/baudio. N_canales excluye el canal de control: upstream canales 6-30 = 25 canales, de los cuales 24 son de datos + 1 de control; downstream canales 31-255 = 225 canales, de los cuales 224 son de datos + 1 de control.

**Despejable para:** R, N_canales, B_canal, n

**Confianza:** media — La cátedra NO la escribe en forma simbólica: aparece solo como la cuenta explícita '24 x 4KHz x 15 bits = 1,44 Mbps' (p.27) y '224 x 4KHz x 15 bits = 13,44 Mbps' (p.28). La generalización simbólica es del extractor. · **Página(s):** 27, 28

### `U09-F09` · Ancho de banda de cada subcanal DMT ⚠️

$$B_{canal} = \frac{B_{total}}{N_{canales}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $B_canal$ | Ancho de banda de cada subcanal (portadora) DMT | Hz |
| $B_total$ | Ancho de banda total de la línea telefónica usado por ADSL | Hz |
| $N_canales$ | Cantidad total de canales en que se divide la banda | adimensional |

**Condiciones:** Válida para ADSL con DMT: 1,104 MHz / 256 = 4,3125 kHz por canal, con frecuencias espaciadas de forma constante. Reparto de canales: canal 0 = voz (4 kHz), canales 1-5 = banda de guarda, canales 6-30 = upstream, canales 31-255 = downstream. Nota: en la p.29 el mismo valor aparece redondeado a 4.312 kHz y en las cuentas de velocidad (U09-F08) se usa 4 kHz.

**Despejable para:** B_canal, B_total, N_canales

**Confianza:** media — No figura como ecuación; la p.26 lo enuncia en palabras y con números: 'El ancho de banda de la línea telefónica (1,104 MHz) se divide en 256 canales (cada canal es de 4,3125 KHz)'. La expresión simbólica es del extractor. · **Página(s):** 26

> [!WARNING]
> **Observación de verificación (menor)**  
> El objeto de la variable "B_canal" arrastra un campo espurio: "significado_extra": "" (cadena vacía) que no existe en el resto del esquema. Es basura de extracción: rompe validación estricta de esquema y puede pisar el render del significado. El contenido matemático está bien: verificado contra p.26 ("El ancho de banda de la línea telefónica (1,104 MHz) se divide en 256 canales (cada canal es de 4,3125 KHz)"); 1,104e6 / 256 = 4312,5 Hz exacto.  
> 
> **Corrección propuesta:** Eliminar el par "significado_extra": "" del objeto de B_canal. Sin otros cambios: B_{canal} = B_{total} / N_{canales}.

#### Recuperadas por la verificación

- **Tasa binaria de cada subcanal en DMT (reparto del flujo entre N portadoras)** — $R_{subcanal} = \frac{R_b}{N}$ · pág. 22

### Ejemplos resueltos — Unidad 9

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria de un módem telefónico c | M = 2 (ASK / 2-PSK); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **2.400 bit/s (semidúplex); 1.200 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 4-PSK o 4 | M = 4 (4-PSK / 4-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **4.800 bit/s (semidúplex); 2.400 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 8-PSK u 8 | M = 8 (8-PSK / 8-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **7.200 bit/s (semidúplex); 3.600 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 16-QAM (M | M = 16 (16-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **9.600 bit/s (semidúplex); 4.800 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 32-QAM (M | M = 32 (32-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **12.000 bit/s (semidúplex); 6.000 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 64-QAM (M | M = 64 (64-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **14.400 bit/s (semidúplex); 7.200 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 128-QAM ( | M = 128 (128-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **16.800 bit/s (semidúplex); 8.400 bit/s (dúplex)** | 7 |
| `U09-F01` | Tabla 'Tasa de bits teóricas para los módems' (p.7): tasa binaria con modulación 256-QAM ( | M = 256 (256-QAM); B_M-ario = 2400 Hz (semidúplex) o 1200 Hz (dúplex) | **19.200 bit/s (semidúplex); 9.600 bit/s (dúplex)** | 7 |
| `U09-F09` | División del ancho de banda de la línea telefónica en subcanales DMT para ADSL: 'El ancho  | B_total = 1,104 MHz; N_canales = 256 | **B_canal = 4,3125 kHz por canal** | 26 |
| `U09-F08` | Velocidad máxima teórica del enlace de subida (Upstream) de ADSL sobre los canales 6-30: 2 | N_canales = 24; B_canal = 4 KHz; n = 15 bits/baudio | **1,44 Mbps teóricos (velocidad real máxima alcanzable ~1 Mbps)** | 27 |
| `U09-F08` | Velocidad máxima teórica del enlace de bajada (Downstream) de ADSL sobre los canales 31-25 | N_canales = 224; B_canal = 4 KHz; n = 15 bits/baudio | **13,44 Mbps teóricos (velocidad real máxima alcanzable ~8 Mbps)** | 28 |
| `U09-F07` | Rango de modulaciones nQAM admitidas por portadora en DMT para ADSL: mínimo y máximo de bi | M = 4 (4-QAM, mínimo) y M = 16384 (16384-QAM, máximo) | **4-QAM => 2 bits/símbolo; 16384-QAM => 14 bits/símbolo** | 23 |
| `U09-F07` | Ejemplo de funcionamiento de DMT (p.25): el SNR medido en una portadora en la inicializaci | M_max = 4096 (máximo por SNR); M_usado = 1024 (con margen de guarda) | **12 bits/símbolo máximos; 10 bits/símbolo usados; 2 bits extra reubicables** | 25 |


---

## Unidad 10 — Capa Física de Redes de Datos

> FUENTE Y MÉTODO: el PDF U10.pdf (55 páginas) es imagen pura, sin capa de texto (verificado con PyMuPDF: 0 caracteres en las 55 páginas). Como la herramienta Read no podía rasterizar el PDF en este entorno (falta poppler/pdftoppm), rendericé las 55 páginas a JPG con PyMuPDF a 140 dpi en C:/Users/lautaro/AppData/Local/Temp/claude/C--Users-lautaro-Documents-AppCalculadora/6ff223b4-e711-4edb-a0ad-78b61e3a99eb/scratchpad/u10img/p01.jpg ... p55.jpg y las leí TODAS visualmente, una por una. No hubo muestreo.

CARÁCTER DE LA UNIDAD: es mayoritariamente DESCRIPTIVA (hardware, estándares y tecnologías de capa física), tal como se anticipaba. Cubre: capa física en redes cableadas e inalámbricas (p1); normas IEEE 802 y su mapeo sobre OSI, subcapas MAC/LLC (p2-3, 8); tipos de NIC (p4-5); catálogo de categorías IEEE 802.1 a 802.22 (p6-7); IEEE 802.3 Ethernet: convención de nomenclatura 100BaseT y banda base (p9-10); medios y alcances por estándar, UTP/STP, coaxial fino y grueso, fibra (p11-12); presupuesto de energía en fibra, gráfico cualitativo (p13); formato de la trama 802.3 (p14); codificación y modulación por familia: 10Base/Manchester, 100Base/4B5B+MLT-3+NRZI, 1000Base/8B10B+4D-PAM-5+NRZ, 10GBase/THP+128D-PAM-16 y 64B/66B, 25G-50G-100GBase/PAM-4+FEC RS (p15-22); redes inalámbricas: definición, 10 aplicaciones, 9 tecnologías (Wi-Fi, Bluetooth, LTE, 5G, NFC, satélite, Zigbee, Sigfox/LoRa, IR), ventajas vs desventajas (p23-30); WPAN/WLAN/WMAN/WWAN y 802.11x sobre OSI (p31-33); bandas ISM y ancho de banda (p34-35); fichas técnicas de 802.11, b, a, g, n, ac, ax con año, frecuencia, ancho de banda, canalización, modulación, velocidad máxima y alcance (p36-43); FHSS, DSSS y OFDM (p44-47); MIMO y tabla de routers comerciales (p48); resumen Wi-Fi (p49); componentes de una WLAN, enrutadores y AP (p50-52); WiMAX 802.16 y FWA/BAFI 5G (p53-55).

TODA la matemática calculable de la unidad está concentrada en las diapositivas 16 a 21 (tasas de símbolos de Ethernet), más dos relaciones menores en 34-35 (ancho de banda de bandas ISM) y 47 (subcarrier spacing OFDM). Son 8 fórmulas en total y 12 ejercicios resueltos.

QUÉ SE EXCLUYÓ DELIBERADAMENTE (datos tabulados o conceptuales, no fórmulas):
- Tablas de estándares y alcances de medios (p11-12), tabla 4B/5B de 16 entradas (p16-17), tabla de códigos 8B/10B (p18-19), tabla de canales DSSS 1 a 14 con su frecuencia (p46), tabla de routers MIMO comerciales (p48), fichas y resúmenes 802.11 (p36-43, 49).
- La relación canal-frecuencia de 802.11b (canal 1 = 2.412 GHz, separación de 5 MHz entre canales consecutivos, canal 14 = 2.484 GHz como excepción) NO está escrita como fórmula: la cátedra sólo muestra la tabla en la p46. No la incluí para no inventar.
- Manchester (p15): las diapositivas dicen \"10Base-T / 10Base-F: 10 Mbps, Tasa de Símbolos 20 Mbaudios\", de donde se deduce R_s = 2·R_b, pero la cátedra NO escribe esa multiplicación en ningún lado (a diferencia de 4B/5B, 8B/10B y 64B/66B, que sí aparecen como productos explícitos). Por eso la dejé fuera de las fórmulas y la registro acá: si querés cubrirla en la app, es un caso a confirmar con la cátedra.
- 128D-PAM-16 de 10GBase-T (p20): con 16 niveles (4 bits/símbolo) y 2,50 Gbps por par saldrían 625 MBaudios, no los 833,33 MBaudios que declara la diapositiva. Hay una inconsistencia interna en la fuente que no resolví (la cátedra no explicita cuántos bits/símbolo usa allí). Por eso U10-F04 se acota explícitamente al caso 4D-PAM-5.
- 25G/50G/100GBase (p22): declara 64B/66B + PAM-4 + FEC Reed-Solomon pero NO da tasa de símbolos; no hay nada calculable.
- Trama Ethernet 802.3 (p14): tamaños fijos en bits (preámbulo 64, @destino 48, @origen 48, Lon 16, CRC 32) y rango 64-1518 bytes de trama, 0-1497 bytes de datos. Se podría armar una suma de overhead, pero la cátedra no plantea ningún cálculo; queda como dato.
- Presupuesto de energía en fibra (p13): el gráfico muestra pérdida de fibra, de conector, de empalme, margen y sensibilidad del receptor, pero es sólo un diagrama cualitativo, sin fórmula ni valores. Si en la cátedra existe una fórmula de link budget, está en material complementario, no en esta unidad.

ERRATA DETECTADA EN LA FUENTE: página 34, banda de 5 GHz, \"5 GHz (5.150 a 5.850GHz) - AB=70MHz\". El rango indicado da 700 MHz. Está transcripto tal cual como caso de test (podría ser el resultado esperado \"oficial\" en un parcial); marcarlo en la app si se usa como validación.

RIESGOS DE LECTURA VISUAL: las expresiones de las páginas 16 a 21 están en cursiva matemática y con las fracciones en superíndice/subíndice (5/4, 10/8, 66/64, 250Mbps/2 bits-simbolo). Verifiqué cada una haciendo la cuenta: 100×5/4=125, 250/2=125, 1×10/8=1,25, 4×833,33=3333 MBaud=3,33 GBaud, 10×66/64=10,3125≈10,31. Todas cierran con el resultado impreso, lo que confirma la lectura de los subíndices. El único dato leído de tipografía pequeña dentro de una imagen es el subcarrier spacing de la página 47 (marcado con confianza media).

### `U10-F01` · Tasa de símbolos con codificación de bloque 4B/5B ✅

$$R_s = R_b \times \frac{5}{4}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_s$ | Tasa de símbolos (velocidad de señalización en línea) | Mbaudios (baudios; en las diapositivas se usa Mbaudios) |
| $R_b$ | Velocidad binaria útil (tasa de bits de datos) | Mbps (bit/s) |

**Condiciones:** Sólo aplica a enlaces con codificación de bloque 4B/5B: 100Base-TX (cobre, línea MLT-3) y 100Base-FX (fibra, línea NRZI). El factor 5/4 es el overhead del bloque (5 bits de línea por cada 4 bits de datos). No aplica a 10Base (Manchester), 1000Base (8B/10B) ni 10GBase (64B/66B). R_s y R_b deben expresarse en la misma escala (Mbps -> Mbaudios).

**Despejable para:** R_s, R_b

**Confianza:** alta — La expresión aparece escrita explícitamente en la diapositiva: "Tasa de Símbolos 100Mbps × (5/4) = 125Mbaudios", en páginas 16 y 17. · **Página(s):** 16, 17

### `U10-F02` · Tasa de símbolos con codificación de bloque 8B/10B ✅

$$R_s = R_b \times \frac{10}{8}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_s$ | Tasa de símbolos (velocidad de señalización en línea) | Gbaudios (baudios) |
| $R_b$ | Velocidad binaria útil (tasa de bits de datos) | Gbps (bit/s) |

**Condiciones:** Sólo aplica a enlaces con codificación de bloque 8B/10B: 1000Base-FX / 1000Base-SX / 1000Base-LX sobre fibra (línea NRZ) y 1000Base-TX en cobre (que además usa 4D-PAM-5). Factor 10/8 = overhead del bloque (10 bits de línea por 8 bits de datos). Mismas escalas para R_s y R_b.

**Despejable para:** R_s, R_b

**Confianza:** alta — Escrito textualmente en la diapositiva 19: "Tasa de Símbolos 1Gbps × (10/8) = 1,25Gbaudios". · **Página(s):** 19

### `U10-F03` · Tasa de símbolos con codificación de bloque 64B/66B ✅

$$R_s = R_b \times \frac{66}{64}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_s$ | Tasa de símbolos (velocidad de señalización en línea) | Gbaudios (baudios) |
| $R_b$ | Velocidad binaria útil (tasa de bits de datos) | Gbps (bit/s) |

**Condiciones:** Sólo aplica a enlaces con codificación de bloque 64B/66B: 10GBase-SR / 10GBase-LR (fibra, línea NRZ). En la diapositiva 22 el estándar 25G/50G/100GBase también declara 64B/66B pero allí NO se da la tasa de símbolos (usa línea PAM-4 y FEC Reed-Solomon, lo que cambia el cálculo). Mismas escalas para R_s y R_b.

**Despejable para:** R_s, R_b

**Confianza:** alta — Escrito textualmente en la diapositiva 21: "Tasa de Símbolos 10Gbps × (66/64) = 10,31Gbaudios". · **Página(s):** 21

### `U10-F04` · Tasa de símbolos a partir de los bits por símbolo (modulación multinivel) ✅

$$R_s = \frac{R_b}{m}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_s$ | Tasa de símbolos por par (velocidad de señalización) | Mbaudios (baudios) |
| $R_b$ | Velocidad binaria por par trenzado | Mbps (bit/s) |
| $m$ | Cantidad de bits transportados por cada símbolo | bits/símbolo (adimensional) |

**Condiciones:** Se aplica a modulación por pulsos multinivel; en la fuente se usa para 1000Base-TX con 4D-PAM-5 tomando m = 2 bits/símbolo sobre cada par (250 Mbps por par -> 125 Mbaudios). R_b es la velocidad POR PAR, no la total del enlace. La diapositiva no explicita el m de 128D-PAM-16 (10GBase-T), por lo que no debe reutilizarse ese caso con esta fórmula.

**Despejable para:** R_s, R_b, m

**Confianza:** alta — La expresión figura escrita como fracción en la diapositiva 18: "Tasa de Símbolos 125Mbaudios = 250Mbps / 2 bits/simbolo". El numerador (250Mbps) y el denominador (2 bits/simbolo) están en renglones distintos en el original; la reconstrucción es inequívoca porque el resultado 125 Mbaudios cierra. · **Página(s):** 18

### `U10-F05` · Tasa de símbolos total de un enlace multipar ⚠️

$$R_{s,total} = N_{pares} \times R_{s,par}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_{s,total}$ | Tasa de símbolos agregada del enlace | GBaudios (baudios) |
| $N_{pares}$ | Cantidad de pares trenzados utilizados en paralelo | adimensional (pares) |
| $R_{s,par}$ | Tasa de símbolos de cada par | MBaudios (baudios) |

**Condiciones:** Aplica a enlaces cobre que transmiten en paralelo sobre varios pares (en la fuente: 10GBase-T con 4 pares Cat 6A, 833,33 MBaudios por par). Supone que todos los pares operan a la misma tasa de símbolos. Cuidado con la escala: MBaudios × pares da MBaudios (3333,32 MBaudios = 3,33 GBaudios).

**Despejable para:** R_{s,total}, N_{pares}, R_{s,par}

**Confianza:** alta — Escrito textualmente en la diapositiva 20: "Tasa de Símbolos 4 pares × 833,33MBaudios = 3,33GBaudios". · **Página(s):** 20

> [!WARNING]
> **Observación de verificación (rompe-el-calculo)**  
> Inconsistencia de unidades que produce un error de factor 1000. La fórmula es R_{s,total} = N_pares × R_{s,par}, pero las variables declaran R_{s,total} en "GBaudios" y R_{s,par} en "MBaudios". Una app que respete los campos `unidad` literalmente calcularía 4 × 833,33 = 3333,32 y lo rotularía "GBaudios", cuando la diapositiva 20 dice 3,33 GBaudios (= 3333,32 MBaudios). El aviso está sólo en prosa dentro de `condiciones`, que la app no evalúa. Verificado contra p.20: "Tasa de Símbolos 4 pares × 833,33MBaudios = 3,33GBaudios".  
> 
> **Corrección propuesta:** Declarar la MISMA unidad base en ambas variables: R_{s,total} unidad "baudios (Bd)" y R_{s,par} unidad "baudios (Bd)", dejando el prefijo (M/G) como conversión de presentación, no como parte del modelo. Expresión sin cambios: R_{s,total} = N_{pares} \times R_{s,par}.

### `U10-F06` · Velocidad binaria por par trenzado ✅

$$R_{b,par} = \frac{R_{b,total}}{N_{pares}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $R_{b,par}$ | Velocidad binaria que transporta cada par trenzado | Mbps o Gbps (bit/s) |
| $R_{b,total}$ | Velocidad binaria nominal total del estándar | Mbps o Gbps (bit/s) |
| $N_{pares}$ | Cantidad de pares trenzados en paralelo | adimensional (pares) |

**Condiciones:** Aplica sólo a estándares cobre multipar en full dúplex con reparto uniforme de la carga: 1000Base-TX (1000 Mbps / 4 pares = 250 Mbps por par) y 10GBase-T (10 Gbps / 4 pares = 2,50 Gbps por par). No aplica a 10Base-T ni 100Base-TX (1 y 2 pares con la totalidad de los datos en un par).

**Despejable para:** R_{b,par}, R_{b,total}, N_{pares}

**Confianza:** media — La cátedra NO escribe esta división como fórmula: en las diapositivas 18 y 20 sólo aparece el dato "4 pares trenzado UTP Cat 5 o superior: 250Mbps por cada par trenzado" y "4 pares trenzado UTP Cat 6A o superior: 2,50Gbps por cada par trenzado". La relación se deduce de que 1000/4 = 250 y 10/4 = 2,50 exactamente, pero es una reconstrucción, no un enunciado literal. · **Página(s):** 18, 20

### `U10-F07` · Ancho de banda de una banda de frecuencias (ISM / Wi-Fi) ✅

$$AB = f_{sup} - f_{inf}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $AB$ | Ancho de banda de la banda de frecuencias | MHz o GHz |
| $f_{sup}$ | Frecuencia superior del rango de la banda | GHz |
| $f_{inf}$ | Frecuencia inferior del rango de la banda | GHz |

**Condiciones:** Se aplica a las bandas no licenciadas listadas por la cátedra (2,4 GHz ISM, 5 GHz, 6 GHz). Es el ancho de banda TOTAL de la banda, no el ancho de canal (20/40/80/160 MHz de las diapositivas 37 a 43). Requiere que ambas frecuencias estén en la misma unidad antes de restar. ATENCIÓN: el valor AB=70MHz que la diapositiva 34 asigna a la banda de 5 GHz no se corresponde con el rango 5.150-5.850 GHz que ella misma indica (daría 700 MHz).

**Despejable para:** AB, f_{sup}, f_{inf}

**Confianza:** media — La cátedra no escribe la resta como fórmula: sólo presenta pares "rango - AB=valor" en las diapositivas 34 y 35. Dos de los tres casos verifican exactamente (83,5 MHz y 1,20 GHz) y el tercero (70 MHz para 5 GHz) no cierra, lo que sugiere una errata en la diapositiva, no una fórmula distinta. · **Página(s):** 34, 35

### `U10-F08` · Separación entre subportadoras OFDM (802.11a) ✅

$$\Delta f = \frac{BW}{N_{FFT}}$$

| Símbolo | Significado | Unidad de medida |
|---|---|---|
| $\Delta f$ | Separación entre subportadoras (subcarrier spacing) | kHz |
| $BW$ | Ancho de banda del canal | MHz |
| $N_{FFT}$ | Cantidad de puntos de la FFT | adimensional (puntos) |

**Condiciones:** Corresponde a la PHY OFDM de 802.11a con canal de 20 MHz y FFT de 64 puntos. Del total de 64 posiciones sólo 52 son subportadoras activas (48 de datos, 4 piloto BPSK, 1 nula DC), por lo que el ancho ocupado real es OBW = 16,6 MHz, distinto de BW. No usar N igual a 52 en esta fórmula: el divisor son los puntos de la FFT (64).

**Despejable para:** \Delta f, BW, N_{FFT}

**Confianza:** media — La relación figura entre paréntesis dentro de una tabla de imagen de la diapositiva 47: "Subcarrier Spacing 312.5 Khz (20MHz/64 Pt FFT)". La tipografía es pequeña; el valor 312,5 kHz y la división 20 MHz/64 son legibles y consistentes entre sí, pero la fórmula no está enunciada por la cátedra en texto propio. · **Página(s):** 47

#### Recuperadas por la verificación

- **Tasa de símbolos con codificación de línea Manchester (10Base)** — $R_s = 2 \cdot R_b$ · pág. 15

### Ejemplos resueltos — Unidad 10

Casos de test: si la fórmula está bien implementada, reproduce estos resultados.

| Fórmula | Enunciado | Entradas | Resultado esperado | Pág. |
|---|---|---|---|---|
| `U10-F01` | 100Base-TX (cobre, 2 pares UTP Cat 5, codificación de bloque 4B/5B y línea MLT-3): calcula | R_b = 100 Mbps; factor de bloque 4B/5B = 5/4 | **125 Mbaudios** | 16 |
| `U10-F01` | 100Base-FX (fibra óptica multimodo, codificación de bloque 4B/5B y línea NRZI): calcular l | R_b = 100 Mbps; factor de bloque 4B/5B = 5/4 | **125 Mbaudios** | 17 |
| `U10-F04` | 1000Base-TX (cobre, 4 pares UTP Cat 5, bloque 8B/10B y modulación por pulsos 4D-PAM-5): ca | R_b = 250 Mbps por par; m = 2 bits/símbolo | **125 Mbaudios** | 18 |
| `U10-F06` | 1000Base-TX (1 Gbps) repartido sobre 4 pares trenzados UTP Cat 5 o superior: velocidad por | R_b,total = 1000 Mbps; N_pares = 4 | **250 Mbps por cada par trenzado** | 18 |
| `U10-F02` | 1000Base-FX (fibra óptica multimodo 850 nm / monomodo 1310 nm, bloque 8B/10B, línea NRZ):  | R_b = 1 Gbps; factor de bloque 8B/10B = 10/8 | **1,25 Gbaudios** | 19 |
| `U10-F05` | 10GBase-T (cobre, 4 pares UTP Cat 6A, bloque THP y modulación 128D-PAM-16): calcular la ta | N_pares = 4; R_s,par = 833,33 MBaudios | **3,33 GBaudios** | 20 |
| `U10-F06` | 10GBase-T (10 Gbps) repartido sobre 4 pares trenzados UTP Cat 6A o superior: velocidad por | R_b,total = 10 Gbps; N_pares = 4 | **2,50 Gbps por cada par trenzado** | 20 |
| `U10-F03` | 10GBase-SR (fibra multimodo 850 nm) / 10GBase-LR (monomodo 1310 nm), bloque 64B/66B y líne | R_b = 10 Gbps; factor de bloque 64B/66B = 66/64 | **10,31 Gbaudios** | 21 |
| `U10-F07` | Banda ISM de 2,4 GHz usada por Wi-Fi: ancho de banda total de la banda. | f_inf = 2.4 GHz; f_sup = 2.4835 GHz | **AB = 83,5 MHz** | 34 |
| `U10-F07` | Banda de 5 GHz usada por Wi-Fi: ancho de banda total de la banda. ATENCIÓN: la diapositiva | f_inf = 5.150 GHz; f_sup = 5.850 GHz | **AB = 70 MHz (según la diapositiva; la resta daría 700 MHz)** | 34 |
| `U10-F07` | Banda de 6 GHz (Wi-Fi 6E): ancho de banda total de la banda. | f_inf = 5.925 GHz; f_sup = 7.125 GHz | **AB = 1,20 GHz** | 35 |
| `U10-F08` | PHY OFDM de 802.11a con canal de 20 MHz y FFT de 64 puntos: calcular la separación entre s | BW = 20 MHz; N_FFT = 64 puntos | **312,5 kHz** | 47 |


---

## Huecos conocidos

1. **Unidad 1 con 0 fórmulas** — el hueco más sospechoso. Revisar manualmente.
2. **Fórmulas marcadas ⚠️** — tienen una observación de verificación sin resolver.
3. **Fórmulas de confianza media o baja** — revisar contra la fuente antes de implementarlas.
4. **Material complementario sin procesar** — 38 PDFs fuera de alcance que podrían contener más fórmulas.