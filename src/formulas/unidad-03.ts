import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 3 — Atenuación, Distorsión y Ruido.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Clasificación (`docs/research/clasificacion-formulas.md`):
 * - 16 calculables: U03-F01, U03-F02, U03-F04 a U03-F17
 * - 1 con restricciones: U03-F03 (suma sobre lista de términos con `esLista`)
 * - 0 fichas de consulta
 * - 0 con observación ⚠️
 */

const U03_F01: Formula = {
  id: 'U03-F01',
  unidad: 3,
  nombre: 'Relación de potencias en decibeles (atenuación / ganancia)',
  expresion: 'dB = 10 · log₁₀(P_o / P_i)',
  expresionLatex: 'dB = 10 \\log_{10}\\left(\\frac{P_o}{P_i}\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma inversa (relación de potencias)',
      expresion: 'P_o / P_i = 10^(dB / 10)',
      latex: '\\frac{P_o}{P_i} = 10^{\\frac{dB}{10}}',
    },
  ],
  entradas: [
    {
      simbolo: 'P_o',
      significado: 'Potencia de la señal en el punto de salida',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'P_i',
      significado: 'Potencia de la señal en el punto de entrada',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'dB',
    significado: 'Ganancia o atenuación entre dos puntos',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Es una relación relativa entre dos potencias (no da un nivel absoluto). ' +
    'Ambas potencias deben expresarse en la misma unidad de medida. ' +
    'dB < 0 indica atenuación y dB > 0 indica amplificación.',
  paginas: '6, 7, 8, 10, 11, 12, 14, 15',
  confianza: 'alta',
  calcular: ({ P_o, P_i }) => 10 * Math.log10(P_o / P_i),
};

const U03_F02: Formula = {
  id: 'U03-F02',
  unidad: 3,
  nombre: 'Pérdida total de un medio con atenuación específica por unidad de longitud',
  expresion: 'L_dB = α · d',
  expresionLatex: 'L_{dB} = \\alpha \\cdot d',
  entradas: [
    {
      simbolo: 'α',
      significado: 'Pérdida específica (atenuación por unidad de longitud) del medio',
      unidadDeMedida: 'dB/km',
      multiploCanonico: '',
    },
    {
      simbolo: 'd',
      significado: 'Longitud del tramo de medio de transmisión',
      unidadDeMedida: 'm',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'L_dB',
    significado: 'Pérdida total introducida por el tramo de medio',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Supone atenuación uniformemente distribuida a lo largo del medio a una frecuencia de ' +
    'operación dada. El resultado es una pérdida: al usarla en balances de enlace entra con signo negativo.',
  paginas: '11, 14',
  confianza: 'alta',
  calcular: ({ α, d }) => α * (d / 1000),
};

const U03_F03: Formula = {
  id: 'U03-F03',
  unidad: 3,
  nombre: 'Suma algebraica de decibeles en una cadena de transmisión',
  expresion: 'dB_total = Σ dB_i',
  // El catálogo escribe \sum_i dB_i; el código declara dB como lista.
  expresionLatex: 'dB_{total} = \\sum dB',
  entradas: [
    {
      simbolo: 'dB',
      significado: 'Ganancia (signo +) o pérdida (signo -) de cada tramo o elemento',
      unidadDeMedida: 'dB',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'dB_total',
    significado: 'Ganancia o pérdida total resultante de la cadena',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Suma sobre una lista de términos de la cadena de transmisión. Cada término debe llevar su ' +
    'signo correspondiente (ganancia positiva, atenuación negativa). Vale porque los decibeles son logarítmicos.',
  paginas: '10, 14',
  confianza: 'alta',
  calcular: (_, { dB }) => dB.reduce((total, d) => total + d, 0),
};

const U03_F04: Formula = {
  id: 'U03-F04',
  unidad: 3,
  nombre: 'Nivel de potencia absoluto en dBm (referido a 1 mW)',
  expresion: 'P_dBm = 10 · log₁₀(P / 1 mW)',
  expresionLatex: 'P_{dBm} = 10 \\log_{10}\\left(\\frac{P}{1\\,\\text{mW}}\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma inversa (potencia absoluta)',
      expresion: 'P = 10^(P_dBm / 10) · 1 mW',
      latex: 'P = 10^{\\frac{P_{dBm}}{10}} \\cdot 1\\,\\text{mW}',
    },
  ],
  entradas: [
    {
      simbolo: 'P',
      significado: 'Potencia absoluta de la señal',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'P_dBm',
    significado: 'Nivel de potencia absoluto respecto de 1 mW',
    unidadDeMedida: 'dBm',
    multiploCanonico: '',
  },
  condiciones:
    'El dBm es un nivel de potencia absoluto referido a 1 mW (0 dBm = 1 mW = 0,001 W). ' +
    'P debe ser estrictamente mayor a cero.',
  paginas: '16, 17, 18',
  confianza: 'alta',
  calcular: ({ P }) => 10 * Math.log10(P / 0.001),
};

const U03_F05: Formula = {
  id: 'U03-F05',
  unidad: 3,
  nombre: 'Ganancia (directividad) de antena en dBi',
  expresion: 'dBi = 10 · log₁₀(P_antena / P_isotropica)',
  expresionLatex: 'dBi = 10 \\log_{10}\\left(\\frac{P_{antena}}{P_{isotropica}}\\right)',
  entradas: [
    {
      simbolo: 'P_antena',
      significado: 'Potencia radiada por la antena real',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'P_isotropica',
      significado: 'Potencia de referencia del radiador isotrópico',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'dBi',
    significado: 'Ganancia (directividad) de la antena sobre el radiador isotrópico',
    unidadDeMedida: 'dBi',
    multiploCanonico: '',
  },
  condiciones:
    'La antena isotrópica es una referencia teórica ideal (en los ejemplos de la cátedra vale 1 mW). ' +
    'Ambas potencias deben expresarse en la misma unidad.',
  paginas: '23, 24',
  confianza: 'alta',
  calcular: ({ P_antena, P_isotropica }) => 10 * Math.log10(P_antena / P_isotropica),
};

const U03_F06: Formula = {
  id: 'U03-F06',
  unidad: 3,
  nombre: 'Pérdida en el espacio libre (frecuencia en MHz)',
  expresion: 'L_0 = 32.45 + 20 · log₁₀(f) + 20 · log₁₀(d)',
  // El catálogo escribe f_{MHz} y d_{Km}; el código declara f y d.
  expresionLatex: 'L_0 = 32.45 + 20 \\log_{10}(f) + 20 \\log_{10}(d)',
  entradas: [
    {
      simbolo: 'f',
      significado: 'Frecuencia de operación',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'd',
      significado: 'Distancia entre transmisor y receptor',
      unidadDeMedida: 'm',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'L_0',
    significado: 'Pérdida básica de propagación en el espacio libre',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Válida únicamente en espacio libre con línea de vista despejada. ' +
    'La fórmula empírica asume internamente la frecuencia en MHz y la distancia en km.',
  paginas: '26',
  confianza: 'alta',
  calcular: ({ f, d }) => 32.45 + 20 * Math.log10(f / 1e6) + 20 * Math.log10(d / 1e3),
};

const U03_F07: Formula = {
  id: 'U03-F07',
  unidad: 3,
  nombre: 'Pérdida en el espacio libre (frecuencia en GHz)',
  expresion: 'L_0 = 92.44 + 20 · log₁₀(f) + 20 · log₁₀(d)',
  // El catálogo escribe f_{GHz} y d_{Km}; el código declara f y d.
  expresionLatex: 'L_0 = 92.44 + 20 \\log_{10}(f) + 20 \\log_{10}(d)',
  entradas: [
    {
      simbolo: 'f',
      significado: 'Frecuencia de operación',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'G',
    },
    {
      simbolo: 'd',
      significado: 'Distancia entre transmisor y receptor',
      unidadDeMedida: 'm',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'L_0',
    significado: 'Pérdida básica de propagación en el espacio libre',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Válida en espacio libre con línea de vista despejada. ' +
    'La fórmula empírica asume internamente la frecuencia en GHz y la distancia en km.',
  paginas: '26',
  confianza: 'alta',
  calcular: ({ f, d }) => 92.44 + 20 * Math.log10(f / 1e9) + 20 * Math.log10(d / 1e3),
};

const U03_F08: Formula = {
  id: 'U03-F08',
  unidad: 3,
  nombre: 'Balance de enlace / potencia recibida (RSSI) en un radioenlace WiFi',
  expresion: 'P_RX = P_TX + L_cable_TX + G_antena_TX + L_espacio_libre + G_antena_RX + L_cable_RX',
  // El catálogo repite L_{cable} y G_{antena}; el código desambigua TX y RX.
  expresionLatex:
    'P_{RX} = P_{TX} + L_{cable_TX} + G_{antena_TX} + L_{espacio_libre} + G_{antena_RX} + L_{cable_RX}',
  entradas: [
    {
      simbolo: 'P_TX',
      significado: 'Potencia de salida del transmisor',
      unidadDeMedida: 'dBm',
      multiploCanonico: '',
    },
    {
      simbolo: 'L_cable_TX',
      significado: 'Pérdidas de cable y conectores del lado transmisor',
      unidadDeMedida: 'dB',
      multiploCanonico: '',
    },
    {
      simbolo: 'G_antena_TX',
      significado: 'Ganancia de la antena transmisora',
      unidadDeMedida: 'dBi',
      multiploCanonico: '',
    },
    {
      simbolo: 'L_espacio_libre',
      significado: 'Pérdida de propagación en el espacio libre',
      unidadDeMedida: 'dB',
      multiploCanonico: '',
    },
    {
      simbolo: 'G_antena_RX',
      significado: 'Ganancia de la antena receptora',
      unidadDeMedida: 'dBi',
      multiploCanonico: '',
    },
    {
      simbolo: 'L_cable_RX',
      significado: 'Pérdidas de cable y conectores del lado receptor',
      unidadDeMedida: 'dB',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'P_RX',
    significado: 'Potencia recibida en el receptor (RSSI)',
    unidadDeMedida: 'dBm',
    multiploCanonico: '',
  },
  condiciones:
    'Suma algebraica de niveles logarítmicos (dBm + dB + dBi = dBm). ' +
    'Las pérdidas deben ingresarse con signo negativo y las ganancias con signo positivo.',
  paginas: '27, 28, 53',
  confianza: 'alta',
  calcular: ({ P_TX, L_cable_TX, G_antena_TX, L_espacio_libre, G_antena_RX, L_cable_RX }) =>
    P_TX + L_cable_TX + G_antena_TX + L_espacio_libre + G_antena_RX + L_cable_RX,
};

const U03_F09: Formula = {
  id: 'U03-F09',
  unidad: 3,
  nombre: 'Margen del enlace (RSSI sobre sensibilidad del receptor)',
  expresion: 'M = RSSI − S_RX',
  expresionLatex: 'M = RSSI - S_{RX}',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma equivalente con potencias lineales',
      expresion: 'M = 10 · log₁₀(P_RSSI / P_S_RX)',
      latex: 'M = 10 \\log_{10}\\left(\\frac{P_{RSSI}}{P_{S_{RX}}}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'RSSI',
      significado: 'Nivel de potencia recibido (indicador de fuerza de señal)',
      unidadDeMedida: 'dBm',
      multiploCanonico: '',
    },
    {
      simbolo: 'S_RX',
      significado: 'Sensibilidad de recepción del receptor',
      unidadDeMedida: 'dBm',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'M',
    significado: 'Margen disponible del enlace por encima de la sensibilidad',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Si M > 0 el enlace es viable; si RSSI < S_RX hay pérdida de servicio. ' +
    'Ambos niveles se expresan en dBm (valores negativos).',
  paginas: '27, 53, 54',
  confianza: 'alta',
  calcular: ({ RSSI, S_RX }) => RSSI - S_RX,
};

const U03_F10: Formula = {
  id: 'U03-F10',
  unidad: 3,
  nombre: 'Densidad de potencia de ruido térmico',
  expresion: 'N_0 = K · T',
  expresionLatex: 'N_0 = K \\cdot T',
  entradas: [
    {
      simbolo: 'T',
      significado: 'Temperatura absoluta de trabajo',
      unidadDeMedida: 'K',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'N_0',
    significado: 'Densidad de potencia N_0',
    unidadDeMedida: 'W/Hz',
    multiploCanonico: 'p',
  },
  condiciones:
    'T debe estar en Kelvin (usar U03-F11 para convertir desde °C). ' +
    'Se utiliza la constante de Boltzmann K = 1,38 × 10⁻²³ J/K según los ejemplos de la cátedra.',
  paginas: '43, 44, 45, 47, 48, 54',
  confianza: 'alta',
  calcular: ({ T }) => 1.38e-23 * T,
};

const U03_F11: Formula = {
  id: 'U03-F11',
  unidad: 3,
  nombre: 'Conversión de temperatura de grados Celsius a Kelvin',
  expresion: 'T = T_C + 273',
  // El catálogo escribe T[°C] y T[K]; el código declara T_C y T.
  expresionLatex: 'T = T_C + 273',
  entradas: [
    {
      simbolo: 'T_C',
      significado: 'Temperatura en grados Celsius',
      unidadDeMedida: '°C',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'T',
    significado: 'Temperatura absoluta en Kelvin',
    unidadDeMedida: 'K',
    multiploCanonico: '',
  },
  condiciones: 'La cátedra utiliza 273 (no 273,15) en todos los ejercicios y ejemplos.',
  paginas: '45, 47, 48, 54',
  confianza: 'alta',
  calcular: ({ T_C }) => T_C + 273,
};

const U03_F12: Formula = {
  id: 'U03-F12',
  unidad: 3,
  nombre: 'Potencia total de ruido térmico en un ancho de banda',
  expresion: 'N = K · T · B',
  expresionLatex: 'N = K \\cdot T \\cdot B',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la densidad de potencia de ruido',
      expresion: 'N = N_0 · B',
      latex: 'N = N_0 \\cdot B',
    },
  ],
  entradas: [
    {
      simbolo: 'T',
      significado: 'Temperatura absoluta',
      unidadDeMedida: 'K',
      multiploCanonico: '',
    },
    {
      simbolo: 'B',
      significado: 'Ancho de banda del dispositivo o sistema',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'N',
    significado: 'Potencia total del ruido térmico',
    unidadDeMedida: 'W',
    multiploCanonico: 'p',
  },
  condiciones:
    'T debe estar en Kelvin y B en Hertz. ' +
    'Se utiliza la constante de Boltzmann K = 1,38 × 10⁻²³ J/K.',
  paginas: '46, 47, 48, 54',
  confianza: 'alta',
  calcular: ({ T, B }) => 1.38e-23 * T * B,
};

const U03_F13: Formula = {
  id: 'U03-F13',
  unidad: 3,
  nombre: 'Potencia de ruido térmico expresada en dBm',
  expresion: 'N_dBm = 10 · log₁₀((K · T · B) / 1 mW)',
  expresionLatex: 'N_{dBm} = 10 \\log_{10}\\left(\\frac{K \\cdot T \\cdot B}{1\\,\\text{mW}}\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la potencia total de ruido',
      expresion: 'N_dBm = 10 · log₁₀(N / 1 mW)',
      latex: 'N_{dBm} = 10 \\log_{10}\\left(\\frac{N}{1\\,\\text{mW}}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'T',
      significado: 'Temperatura absoluta',
      unidadDeMedida: 'K',
      multiploCanonico: '',
    },
    {
      simbolo: 'B',
      significado: 'Ancho de banda',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'N_dBm',
    significado: 'Potencia de ruido térmico en dBm',
    unidadDeMedida: 'dBm',
    multiploCanonico: '',
  },
  condiciones:
    'T debe estar en Kelvin y B en Hertz. ' +
    'El cálculo se refiere a 1 mW (0,001 W) con K = 1,38 × 10⁻²³ J/K.',
  paginas: '47, 48, 54',
  confianza: 'alta',
  calcular: ({ T, B }) => 10 * Math.log10((1.38e-23 * T * B) / 0.001),
};

const U03_F14: Formula = {
  id: 'U03-F14',
  unidad: 3,
  nombre: 'Relación señal a ruido en veces (lineal)',
  expresion: 'SNR = S / N',
  expresionLatex: 'SNR = \\frac{S}{N}',
  expresionesRelacionadas: [
    {
      rotulo: 'Notación alternativa con potencias medias',
      expresion: 'SNR = P_S / P_N',
      latex: 'SNR = \\frac{P_S}{P_N}',
    },
  ],
  entradas: [
    {
      simbolo: 'S',
      significado: 'Potencia media de la señal',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'N',
      significado: 'Potencia media del ruido',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'SNR',
    significado: 'Relación señal a ruido en veces',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Cociente adimensional lineal medido en el mismo punto de referencia. ' +
    'Ambas potencias deben expresarse en la misma unidad.',
  paginas: '49, 51, 52',
  confianza: 'alta',
  calcular: ({ S, N }) => S / N,
};

const U03_F15: Formula = {
  id: 'U03-F15',
  unidad: 3,
  nombre: 'Relación señal a ruido en decibeles',
  expresion: 'SNR_dB = 10 · log₁₀(S / N)',
  // El catálogo escribe SNR [dB]; el código declara SNR_dB.
  expresionLatex: 'SNR_{dB} = 10 \\log_{10}\\left(\\frac{S}{N}\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la relación señal a ruido lineal',
      expresion: 'SNR_dB = 10 · log₁₀(SNR)',
      latex: 'SNR_{dB} = 10 \\log_{10}(SNR)',
    },
  ],
  entradas: [
    {
      simbolo: 'S',
      significado: 'Potencia media de la señal',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'N',
      significado: 'Potencia media del ruido',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'SNR_dB',
    significado: 'Relación señal/ruido en decibeles',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Se aplica sobre el cociente lineal de potencias. ' +
    'Ambas potencias deben expresarse en la misma unidad.',
  paginas: '50, 51, 52, 54',
  confianza: 'alta',
  calcular: ({ S, N }) => 10 * Math.log10(S / N),
};

const U03_F16: Formula = {
  id: 'U03-F16',
  unidad: 3,
  nombre: 'Factor de ruido (f)',
  expresion: 'f = (S_i / N_i) / (S_o / N_o)',
  expresionLatex: 'f = \\frac{S_i / N_i}{S_o / N_o}',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de las relaciones señal/ruido',
      expresion: 'f = SNR_i / SNR_o',
      latex: 'f = \\frac{SNR_i}{SNR_o}',
    },
  ],
  entradas: [
    {
      simbolo: 'S_i',
      significado: 'Potencia de señal a la entrada',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'N_i',
      significado: 'Potencia de ruido a la entrada',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'S_o',
      significado: 'Potencia de señal a la salida',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'N_o',
      significado: 'Potencia de ruido a la salida',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'f',
    significado: 'Factor de ruido (adimensional)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Cociente adimensional de la relación señal a ruido de entrada sobre la de salida. ' +
    'En un circuito ideal f = 1; en un circuito real f > 1.',
  paginas: '58',
  confianza: 'baja',
  observacion:
    'La expresión matemática no sobrevivió a la extracción del PDF. ' +
    'Reconstruida a partir de las propiedades enunciadas en la diapositiva.',
  calcular: ({ S_i, N_i, S_o, N_o }) => (S_i / N_i) / (S_o / N_o),
};

const U03_F17: Formula = {
  id: 'U03-F17',
  unidad: 3,
  nombre: 'Índice de ruido (factor de ruido en dB)',
  expresion: 'NF = 10 · log₁₀(f)',
  // El catálogo escribe NF [dB]; el código declara NF.
  expresionLatex: 'NF = 10 \\log_{10}(f)',
  entradas: [
    {
      simbolo: 'f',
      significado: 'Factor de ruido (adimensional)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'NF',
    significado: 'Índice de ruido en decibeles',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'El índice de ruido es el factor de ruido expresado en decibeles. ' +
    'f debe ser mayor a cero. Un circuito ideal (f = 1) tiene un índice de 0 dB.',
  paginas: '59',
  confianza: 'baja',
  observacion:
    'Expresión reconstruida a partir de la definición verbal en la diapositiva.',
  calcular: ({ f }) => 10 * Math.log10(f),
};

export const FORMULAS_UNIDAD_03: readonly Formula[] = [
  U03_F01,
  U03_F02,
  U03_F03,
  U03_F04,
  U03_F05,
  U03_F06,
  U03_F07,
  U03_F08,
  U03_F09,
  U03_F10,
  U03_F11,
  U03_F12,
  U03_F13,
  U03_F14,
  U03_F15,
  U03_F16,
  U03_F17,
];

export const EJEMPLOS_UNIDAD_03: readonly EjemploResuelto[] = [
  {
    formulaId: 'U03-F01',
    enunciado:
      'Ejemplo01: Una señal se inyecta en un medio de transmisión y su potencia se reduce a la mitad (P2 = 0,5 · P1).',
    entradas: {
      P_i: { valor: 1, multiplo: 'm' },
      P_o: { valor: 0.5, multiplo: 'm' },
    },
    esperado: { valor: -3, multiplo: '' },
    pagina: '7',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F01',
    enunciado:
      'Ejemplo02: Una señal pasa a través de un amplificador y su potencia se incrementa 10 veces (P2 = 10 · P1).',
    entradas: {
      P_i: { valor: 1, multiplo: 'm' },
      P_o: { valor: 10, multiplo: 'm' },
    },
    esperado: { valor: 10, multiplo: '' },
    pagina: '8',
  },
  {
    formulaId: 'U03-F03',
    enunciado:
      'Ejemplo03: Una señal viaja del punto 1 al punto 4. Entre 1 y 2 se atenúa 3 dB, entre 2 y 3 se amplifica 7 dB, y entre 3 y 4 se atenúa 3 dB.',
    entradas: {
      dB: { valores: [-3, 7, -3], multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '10',
  },
  {
    formulaId: 'U03-F02',
    enunciado:
      'Ejemplo04: Se tiene una línea de transmisión (coaxil) de L = 5 Km, su pérdida es de 0,30 dB/Km. Calcular la pérdida total.',
    entradas: {
      α: { valor: 0.3, multiplo: '' },
      d: { valor: 5, multiplo: 'k' },
    },
    esperado: { valor: 1.5, multiplo: '' },
    pagina: '11',
  },
  {
    formulaId: 'U03-F01',
    enunciado:
      'Ejemplo05: Se tiene una línea de transmisión que posee un amplificador que gana 13 dB. Si Pi = 4 mW y Po = 79,81 mW, verificar la relación en dB.',
    entradas: {
      P_i: { valor: 4, multiplo: 'm' },
      P_o: { valor: 79.81, multiplo: 'm' },
    },
    esperado: { valor: 13, multiplo: '' },
    pagina: '12',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F03',
    enunciado:
      'Ejemplo06: Pérdida total de un enlace óptico de 50 Km con conectores (6 dB), empalmes (2,6 dB) y fibra (20 dB).',
    entradas: {
      dB: { valores: [6, 2.6, 20], multiplo: '' },
    },
    esperado: { valor: 28.6, multiplo: '' },
    pagina: '14',
  },
  {
    formulaId: 'U03-F04',
    enunciado:
      'Ejemplo04 (pág. 16): ¿Cuántas veces mayor que 1 mW es la potencia de 1000 mW? Expresar en dBm.',
    entradas: {
      P: { valor: 1000, multiplo: 'm' },
    },
    esperado: { valor: 30, multiplo: '' },
    pagina: '16',
  },
  {
    formulaId: 'U03-F04',
    enunciado:
      'Ejemplo04 (pág. 16): expresar en dBm una potencia de 1 µW.',
    entradas: {
      P: { valor: 1, multiplo: 'µ' },
    },
    esperado: { valor: -30, multiplo: '' },
    pagina: '16',
  },
  {
    formulaId: 'U03-F04',
    enunciado:
      'Ejercicio sin numerar (pág. 18): calcular el nivel en dBm correspondiente a una potencia absoluta de 1 nW.',
    entradas: {
      P: { valor: 1, multiplo: 'n' },
    },
    esperado: { valor: -60, multiplo: '' },
    pagina: '18',
  },
  {
    formulaId: 'U03-F04',
    enunciado:
      'Ejercicio sin numerar (pág. 18): calcular el nivel en dBm correspondiente a una potencia absoluta de 10 pW.',
    entradas: {
      P: { valor: 10, multiplo: 'p' },
    },
    esperado: { valor: -80, multiplo: '' },
    pagina: '18',
  },
  {
    formulaId: 'U03-F05',
    enunciado:
      'Ejemplo 7: Antena isotrópica produce 1 mW y la antena Wi-Fi produce 2 mW. Calcular la directividad en dBi.',
    entradas: {
      P_antena: { valor: 2, multiplo: 'm' },
      P_isotropica: { valor: 1, multiplo: 'm' },
    },
    esperado: { valor: 3, multiplo: '' },
    pagina: '24',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F05',
    enunciado:
      'Ejemplo 8: Antena isotrópica produce 1 mW y la antena #1 Wi-Fi produce 3 mW. Calcular la ganancia en dBi.',
    entradas: {
      P_antena: { valor: 3, multiplo: 'm' },
      P_isotropica: { valor: 1, multiplo: 'm' },
    },
    esperado: { valor: 4.8, multiplo: '' },
    pagina: '24',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F07',
    enunciado:
      'Ejercicio sin numerar (pág. 26): cálculo de pérdida de espacio libre para f = 5,8 GHz y d = 100 m (0,1 Km).',
    entradas: {
      f: { valor: 5.8, multiplo: 'G' },
      d: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 87.71, multiplo: '' },
    pagina: '26',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U03-F08',
    enunciado:
      'Ejemplo09 (caso favorable): RSSI de enlace WiFi 5,8 GHz con L_espacio_libre = -87,71 dB.',
    entradas: {
      P_TX: { valor: 20, multiplo: '' },
      L_cable_TX: { valor: -1, multiplo: '' },
      G_antena_TX: { valor: 3, multiplo: '' },
      L_espacio_libre: { valor: -87.71, multiplo: '' },
      G_antena_RX: { valor: 1, multiplo: '' },
      L_cable_RX: { valor: -1, multiplo: '' },
    },
    esperado: { valor: -65.71, multiplo: '' },
    pagina: '27',
  },
  {
    formulaId: 'U03-F08',
    enunciado:
      'Ejemplo09 (caso desfavorable): RSSI de enlace WiFi con pérdida de espacio libre de -107,71 dB.',
    entradas: {
      P_TX: { valor: 20, multiplo: '' },
      L_cable_TX: { valor: -1, multiplo: '' },
      G_antena_TX: { valor: 3, multiplo: '' },
      L_espacio_libre: { valor: -107.71, multiplo: '' },
      G_antena_RX: { valor: 1, multiplo: '' },
      L_cable_RX: { valor: -1, multiplo: '' },
    },
    esperado: { valor: -85.71, multiplo: '' },
    pagina: '27',
  },
  {
    formulaId: 'U03-F08',
    enunciado:
      'Ejemplo10 (pág. 28): balance de enlace con amplificador (+12 dB) y pérdidas de cable (-6 dB) en TX, antena TX (+16 dBi), L0 (-107,71 dB), antena RX (+1 dBi) y cable RX (-1 dB).',
    entradas: {
      P_TX: { valor: 20, multiplo: '' },
      L_cable_TX: { valor: 6, multiplo: '' },
      G_antena_TX: { valor: 16, multiplo: '' },
      L_espacio_libre: { valor: -107.71, multiplo: '' },
      G_antena_RX: { valor: 1, multiplo: '' },
      L_cable_RX: { valor: -1, multiplo: '' },
    },
    esperado: { valor: -65.71, multiplo: '' },
    pagina: '28',
  },
  {
    formulaId: 'U03-F10',
    enunciado:
      'Ejemplo 11: Densidad de potencia de ruido térmico N0 a T = 17 °C (290 K).',
    entradas: {
      T: { valor: 290, multiplo: '' },
    },
    esperado: { valor: 4.002e-9, multiplo: 'p' },
    pagina: '45',
  },
  {
    formulaId: 'U03-F12',
    enunciado:
      'Ejemplo12: Potencia total de ruido térmico a T = 17 °C (290 K) y B = 1 Hz.',
    entradas: {
      T: { valor: 290, multiplo: '' },
      B: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 4.002e-9, multiplo: 'p' },
    pagina: '47',
  },
  {
    formulaId: 'U03-F12',
    enunciado:
      'Ejemplo13: Potencia total de ruido térmico a T = 17 °C (290 K) y B = 1 MHz.',
    entradas: {
      T: { valor: 290, multiplo: '' },
      B: { valor: 1, multiplo: 'M' },
    },
    esperado: { valor: 4.002e-3, multiplo: 'p' },
    pagina: '47',
  },
  {
    formulaId: 'U03-F12',
    enunciado:
      'Ejemplo 14: Potencia total de ruido térmico a T = 17 °C (290 K) y B = 10 MHz (rango 0 a 10 MHz).',
    entradas: {
      T: { valor: 290, multiplo: '' },
      B: { valor: 10, multiplo: 'M' },
    },
    esperado: { valor: 4.002e-2, multiplo: 'p' },
    pagina: '48',
  },
  {
    formulaId: 'U03-F12',
    enunciado:
      'Ejemplo 15: Potencia total de ruido térmico a T = 17 °C (290 K) y B = 10 MHz (rango 190 a 200 MHz).',
    entradas: {
      T: { valor: 290, multiplo: '' },
      B: { valor: 10, multiplo: 'M' },
    },
    esperado: { valor: 4.002e-2, multiplo: 'p' },
    pagina: '48',
  },
  {
    formulaId: 'U03-F14',
    enunciado:
      'Ejercicio sin numerar (pág. 49): Relación señal a ruido en veces para S = 10 mW y N = 1 µW.',
    entradas: {
      S: { valor: 10, multiplo: 'm' },
      N: { valor: 1, multiplo: 'µ' },
    },
    esperado: { valor: 10000, multiplo: '' },
    pagina: '49',
  },
  {
    formulaId: 'U03-F15',
    enunciado:
      'Ejemplo16 (SNR ALTA): S = 60 mW y N = 5 mW; calcular relación señal a ruido en dB.',
    entradas: {
      S: { valor: 60, multiplo: 'm' },
      N: { valor: 5, multiplo: 'm' },
    },
    esperado: { valor: 10.8, multiplo: '' },
    pagina: '51',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F15',
    enunciado:
      'Ejemplo17 (SNR BAJA): S = 6 mW y N = 5 mW; calcular relación señal a ruido en dB.',
    entradas: {
      S: { valor: 6, multiplo: 'm' },
      N: { valor: 5, multiplo: 'm' },
    },
    esperado: { valor: 0.8, multiplo: '' },
    pagina: '52',
    tolerancia: 0.02,
  },
  {
    formulaId: 'U03-F12',
    enunciado:
      'Ejemplo pág. 54: Potencia total de ruido térmico para T = 25 °C (298 K) y B = 20 MHz.',
    entradas: {
      T: { valor: 298, multiplo: '' },
      B: { valor: 20, multiplo: 'M' },
    },
    esperado: { valor: 0.08224, multiplo: 'p' },
    pagina: '54',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U03-F15',
    enunciado:
      'Ejemplo pág. 54: SNR en dB entre potencia recibida (RSSI = 268,5 pW) y ruido térmico (N = 8,224 × 10⁻¹⁴ W = 0,08224 pW).',
    entradas: {
      S: { valor: 268.5, multiplo: 'p' },
      N: { valor: 0.08224, multiplo: 'p' },
    },
    esperado: { valor: 35.13, multiplo: '' },
    pagina: '54',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F15',
    enunciado:
      'Ejemplo pág. 54: SNR en dB en el umbral de sensibilidad (S_RX = 6,31 pW) y ruido térmico (N = 8,224 × 10⁻¹⁴ W = 0,08224 pW).',
    entradas: {
      S: { valor: 6.31, multiplo: 'p' },
      N: { valor: 0.08224, multiplo: 'p' },
    },
    esperado: { valor: 18.84, multiplo: '' },
    pagina: '54',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U03-F09',
    enunciado:
      'Ejemplo pág. 54: Margen del enlace WiFi para RSSI = -65,71 dBm y S_RX = -82 dBm.',
    entradas: {
      RSSI: { valor: -65.71, multiplo: '' },
      S_RX: { valor: -82, multiplo: '' },
    },
    esperado: { valor: 16.29, multiplo: '' },
    pagina: '54',
    tolerancia: 0.001,
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 3, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_03: readonly string[] = [];
