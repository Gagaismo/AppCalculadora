import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 5 — Canales de Comunicaciones.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

const U05_F01: Formula = {
  id: 'U05-F01',
  unidad: 5,
  nombre: 'Cantidad de información de un símbolo (información propia)',
  expresion: 'I_i = log₂(1 / P_i) = −log₂ P_i',
  expresionLatex: 'I_i = \\log_2\\left(\\frac{1}{P_i}\\right) = -\\log_2 P_i',
  expresionesRelacionadas: [
    {
      rotulo: 'Caso de símbolos equiprobables (P_i = 1/N)',
      expresion: 'I_i = log₂ N',
      latex: 'I_i = \\log_2 N',
    },
  ],
  entradas: [
    {
      simbolo: 'P_i',
      significado: 'Probabilidad de ocurrencia del símbolo x_i',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'I_i',
    significado: 'Información aportada por el símbolo x_i',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Fuente discreta con N símbolos distintos e independientes. P_i debe estar en (0, 1]; con P_i = 0 ' +
    'la fórmula diverge.',
  paginas: '2, 29',
  confianza: 'alta',
  calcular: ({ P_i }) => Math.log2(1 / P_i),
};

const U05_F02: Formula = {
  id: 'U05-F02',
  unidad: 5,
  nombre: 'Entropía de la fuente H(x)',
  expresion: 'H(x) = Σ P_j · log₂(1 / P_j)',
  // El catálogo escribe `H(x)` y `P_j`; la Fórmula declara `H` y `P`.
  expresionLatex: 'H = \\sum P \\log_2\\left(\\frac{1}{P}\\right)',
  entradas: [
    {
      simbolo: 'P',
      significado: 'Probabilidad de ocurrencia de cada símbolo de la fuente',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'H',
    significado: 'Entropía: información promedio por símbolo de la fuente',
    unidadDeMedida: 'bit/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Requiere el conjunto completo de probabilidades, con Σ P_j = 1. Los términos con P_j = 0 se ' +
    'toman como 0. En la diapositiva el índice de la sumatoria figura como i=1..N mientras los ' +
    'términos usan P_j.',
  paginas: '2, 6',
  confianza: 'alta',
  calcular: (_, { P }) => P.reduce((h, p) => (p > 0 ? h + p * Math.log2(1 / p) : h), 0),
};

const U05_F03: Formula = {
  id: 'U05-F03',
  unidad: 5,
  nombre: 'Duración promedio de un símbolo',
  expresion: 'σ̄ = Σ P_j · σ_j',
  expresionLatex: '\\bar{\\sigma} = \\sum_{j=1}^{m} P_j \\, \\sigma_j',
  expresionesRelacionadas: [
    {
      rotulo: 'Caso de símbolos de igual duración',
      expresion: 'σ̄ = T_s',
      latex: '\\bar{\\sigma} = T_s',
    },
  ],
  entradas: [
    {
      simbolo: 'P',
      significado: 'Probabilidad de ocurrencia de cada símbolo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
    {
      simbolo: 'σ',
      significado: 'Duración de cada símbolo',
      unidadDeMedida: 's',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'σ̄',
    significado: 'Duración promedio de un símbolo de la fuente',
    unidadDeMedida: 's/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Se usa cuando los símbolos no tienen todos la misma duración. ' +
    'Requiere Σ P_j = 1.',
  paginas: '2',
  confianza: 'alta',
  calcular: (_, { P, σ }) => P.reduce((sum, p, i) => sum + p * (σ[i] ?? 0), 0),
};

const U05_F04: Formula = {
  id: 'U05-F04',
  unidad: 5,
  nombre: 'Velocidad de símbolos (tasa de señalización)',
  expresion: 'r = 1 / T_s',
  // El catálogo escribe `\sigma` y `T_S`; la Fórmula declara `T_s`. Ver docs/research/latex-transcripcion.md.
  expresionLatex: 'r = \\frac{1}{T_s}',
  expresionesRelacionadas: [
    {
      rotulo: 'Caso con duraciones distintas',
      expresion: 'r = 1 / σ̄',
      latex: 'r = \\frac{1}{\\bar{\\sigma}}',
    },
  ],
  entradas: [
    {
      simbolo: 'T_s',
      significado: 'Duración del símbolo',
      unidadDeMedida: 's/símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'r',
    significado: 'Velocidad de símbolos emitidos por la fuente',
    unidadDeMedida: 'símbolo/s',
    multiploCanonico: '',
  },
  condiciones:
    'Vale con símbolos de duración uniforme. ' +
    'T_s > 0. La cátedra escribe indistintamente σ o T_s para la duración del símbolo.',
  paginas: '2',
  confianza: 'alta',
  calcular: ({ T_s }) => 1 / T_s,
};

const U05_F05: Formula = {
  id: 'U05-F05',
  unidad: 5,
  nombre: 'Velocidad de transmisión de información (velocidad de entropía de la fuente) R',
  expresion: 'R = r · H',
  // El catálogo incluye formas con `\bar{\sigma}` y `T_S`; la Fórmula implementa `R = r \times H`.
  expresionLatex: 'R = r \\times H',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la duración promedio del símbolo',
      expresion: 'R = H / σ̄',
      latex: 'R = \\frac{H}{\\bar{\\sigma}}',
    },
    {
      rotulo: 'En función de la duración del símbolo',
      expresion: 'R = H / T_s',
      latex: 'R = \\frac{H}{T_s}',
    },
  ],
  entradas: [
    {
      simbolo: 'r',
      significado: 'Velocidad de símbolos',
      unidadDeMedida: 'símbolo/s',
      multiploCanonico: '',
    },
    {
      simbolo: 'H',
      significado: 'Entropía de la fuente',
      unidadDeMedida: 'bit/símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Tasa de información de la fuente',
    unidadDeMedida: 'bit/s',
    multiploCanonico: '',
  },
  condiciones:
    'H debe calcularse con U05-F02 o U05-F12. Se compara contra la capacidad C del canal: si R ≤ C ' +
    'existe codificación con error arbitrariamente pequeño; si R > C no es posible transmitir ' +
    'sin errores (segundo teorema de Shannon).',
  paginas: '2',
  confianza: 'alta',
  calcular: ({ r, H }) => r * H,
};

const U05_F06: Formula = {
  id: 'U05-F06',
  unidad: 5,
  nombre: 'Velocidad de transmisión para símbolos equiprobables',
  expresion: 'R = (1 / T_s) · log₂ N',
  // El catálogo escribe `T_S` e incluye `r \times H`; la Fórmula declara `T_s` y `N`.
  expresionLatex: 'R = \\frac{1}{T_s} \\times \\log_2 N',
  entradas: [
    {
      simbolo: 'T_s',
      significado: 'Duración de cada símbolo',
      unidadDeMedida: 's',
      multiploCanonico: '',
    },
    {
      simbolo: 'N',
      significado: 'Cantidad de símbolos equiprobables del alfabeto',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Tasa de información de la fuente',
    unidadDeMedida: 'bit/s',
    multiploCanonico: '',
  },
  condiciones:
    'Solo para símbolos equiprobables (P_j = 1/N para todo j) y de igual duración T_s. En la diapositiva ' +
    'el logaritmo figura sin subíndice 2, pero la unidad impresa [bps] confirma la base 2.',
  paginas: '2',
  confianza: 'media',
  calcular: ({ T_s, N }) => (1 / T_s) * Math.log2(N),
};

const U05_F07: Formula = {
  id: 'U05-F07',
  unidad: 5,
  nombre: 'Longitud promedio de una palabra código',
  expresion: 'L̄ = Σ P_j · L_j',
  expresionLatex: '\\bar{L} = \\sum_{j=1}^{N} P_j \\times L_j',
  entradas: [
    {
      simbolo: 'P',
      significado: 'Probabilidad del símbolo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
    {
      simbolo: 'L',
      significado: 'Longitud de la palabra código asignada al símbolo',
      unidadDeMedida: 'dígitos binarios',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'L̄',
    significado: 'Número promedio de dígitos binarios por símbolo',
    unidadDeMedida: 'dígitos binarios/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Codificación binaria de una fuente discreta de N símbolos. Requiere Σ P_j = 1. Por el teorema ' +
    'de codificación de la fuente (Shannon) siempre debe cumplirse L̄ ≥ H(x); si da menor, la ' +
    'codificación o los datos están mal.',
  paginas: '5, 6',
  confianza: 'alta',
  calcular: (_, { P, L }) => P.reduce((sum, p, i) => sum + p * (L[i] ?? 0), 0),
};

const U05_F08: Formula = {
  id: 'U05-F08',
  unidad: 5,
  nombre: 'Eficiencia de un codificador de fuente',
  expresion: 'η = H(x) / L̄',
  expresionLatex: '\\eta = \\frac{H}{\\bar{L}}',
  entradas: [
    {
      simbolo: 'H',
      significado: 'Entropía de la fuente',
      unidadDeMedida: 'bit/símbolo',
      multiploCanonico: '',
    },
    {
      simbolo: 'L̄',
      significado: 'Longitud promedio de la palabra código',
      unidadDeMedida: 'dígitos binarios/símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'η',
    significado: 'Eficiencia del codificador de fuente',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Como L̄ ≥ H(x), la eficiencia nunca puede superar 1 (100%). El codificador óptimo es el que ' +
    'minimiza L̄ (códigos cortos para símbolos frecuentes).',
  paginas: '5, 6',
  confianza: 'alta',
  calcular: ({ H, ['L̄']: L_barra }) => H / L_barra,
};

const U05_F09: Formula = {
  id: 'U05-F09',
  unidad: 5,
  nombre: 'Probabilidad de un nivel equiprobable',
  expresion: 'p = 1 / N',
  expresionLatex: 'p = \\frac{1}{N}',
  entradas: [
    {
      simbolo: 'N',
      significado: 'Cantidad de niveles de tensión o corriente (o símbolos) posibles',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'p',
    significado: 'Probabilidad de cada nivel o símbolo',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones: 'Solo si todos los niveles son equiprobables. Es el insumo de U05-F11.',
  paginas: '7',
  confianza: 'alta',
  calcular: ({ N }) => 1 / N,
};

const U05_F10: Formula = {
  id: 'U05-F10',
  unidad: 5,
  nombre: 'Cantidad de símbolos contenidos en la señal',
  expresion: 'm = T / T_s',
  // El catálogo escribe `T_S`; la Fórmula declara `T_s`.
  expresionLatex: 'm = \\frac{T}{T_s}',
  entradas: [
    {
      simbolo: 'T',
      significado: 'Tiempo total de transmisión de la señal',
      unidadDeMedida: 's',
      multiploCanonico: '',
    },
    {
      simbolo: 'T_s',
      significado: 'Duración de cada símbolo (intervalo de muestra)',
      unidadDeMedida: 's',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'm',
    significado: 'Cantidad de símbolos transmitidos en el tiempo T',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones: 'Todos los símbolos de igual duración T_s. Requiere T y T_s en la misma escala de tiempo.',
  paginas: '7, 8, 9, 10',
  confianza: 'alta',
  calcular: ({ T, T_s }) => T / T_s,
};

const U05_F11: Formula = {
  id: 'U05-F11',
  unidad: 5,
  nombre: 'Contenido de información de una señal',
  expresion: 'I = (T / T_s) · log₂ N',
  // El catálogo escribe `T_S` e incluye la forma con `m` y `p`; la Fórmula implementa `I = \frac{T}{T_s} \log_2 N`.
  expresionLatex: 'I = \\frac{T}{T_s} \\log_2 N',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la cantidad de símbolos y su probabilidad',
      expresion: 'I = m · log₂(1 / p)',
      latex: 'I = m \\log_2\\left(\\frac{1}{p}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'T',
      significado: 'Tiempo total de transmisión',
      unidadDeMedida: 's',
      multiploCanonico: '',
    },
    {
      simbolo: 'T_s',
      significado: 'Duración de cada símbolo',
      unidadDeMedida: 's',
      multiploCanonico: '',
    },
    {
      simbolo: 'N',
      significado: 'Niveles equiprobables de tensión o corriente',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'I',
    significado: 'Contenido de información de la señal transmitida durante T',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Requiere niveles equiprobables (p = 1/N). El resultado expresa la información transmitida ' +
    'durante el intervalo T.',
  paginas: '7, 8, 9, 10',
  confianza: 'alta',
  calcular: ({ T, T_s, N }) => (T / T_s) * Math.log2(N),
};

const U05_F12: Formula = {
  id: 'U05-F12',
  unidad: 5,
  nombre: 'Bits por símbolo / entropía con símbolos equiprobables',
  expresion: 'H = log₂ N',
  // El catálogo escribe `H = I = \log_2 N`; la Fórmula implementa `H = \log_2 N`.
  expresionLatex: 'H = \\log_2 N',
  entradas: [
    {
      simbolo: 'N',
      significado: 'Cantidad de símbolos o caracteres distintos',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'H',
    significado: 'Información por símbolo (bits necesarios para representar cada símbolo)',
    unidadDeMedida: 'bit/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Caso equiprobable de U05-F01 con P = 1/N. En los ejemplos de la cátedra se expresa con decimales ' +
    '(ej. log₂(110) = 6,78 bit/tecla).',
  paginas: '12, 29',
  confianza: 'alta',
  calcular: ({ N }) => Math.log2(N),
};

const U05_F13: Formula = {
  id: 'U05-F13',
  unidad: 5,
  nombre: 'Período de muestreo',
  expresion: 'T_muestreo = 1 / f_s',
  // El catálogo escribe `T_s`; se renombró para no confundirlo con la duración del
  // símbolo. Ver docs/research/latex-transcripcion.md.
  expresionLatex: 'T_{muestreo} = \\frac{1}{f_s}',
  entradas: [
    {
      simbolo: 'f_s',
      significado: 'Frecuencia de muestreo',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'T_muestreo',
    significado: 'Período (intervalo) entre muestras',
    unidadDeMedida: 's',
    multiploCanonico: '',
  },
  condiciones:
    'Muestreo a velocidad constante. La diapositiva escribe T_s para el período de muestreo; ' +
    'se utiliza el símbolo T_muestreo para evitar confusión con la duración del símbolo.',
  paginas: '23',
  confianza: 'alta',
  calcular: ({ f_s }) => 1 / f_s,
};

const U05_F14: Formula = {
  id: 'U05-F14',
  unidad: 5,
  nombre: 'Frecuencia de Nyquist (velocidad mínima de muestreo)',
  expresion: 'f_Nyquist = 2 · f_max',
  // El catálogo escribe `f_S = 2 f_{Max}`; la Fórmula declara `f_{Nyquist} = 2 f_{max}`.
  expresionLatex: 'f_{Nyquist} = 2 f_{max}',
  expresionesRelacionadas: [
    {
      rotulo: 'Condición general de muestreo (teorema de Nyquist)',
      expresion: 'f_s ≥ 2 · f_max',
      latex: 'f_s \\ge 2 f_{max}',
    },
  ],
  entradas: [
    {
      simbolo: 'f_max',
      significado: 'Máxima frecuencia de la señal (limitada en banda)',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'f_Nyquist',
    significado: 'Frecuencia de Nyquist (velocidad mínima de muestreo)',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'La señal debe estar limitada en banda. La igualdad ' +
    'define la frecuencia de Nyquist mínima para reconstruir la señal original.',
  paginas: '23',
  confianza: 'alta',
  calcular: ({ f_max }) => 2 * f_max,
};

const U05_F15: Formula = {
  id: 'U05-F15',
  unidad: 5,
  nombre: 'Teorema de Nyquist: capacidad de un canal sin ruido',
  expresion: 'C = 2 · B · log₂ M',
  expresionLatex: 'C = 2 B \\log_2 M',
  expresionesRelacionadas: [
    {
      rotulo: 'Caso binario (M = 2)',
      expresion: 'C = 2 · B',
      latex: 'C = 2 B',
    },
  ],
  entradas: [
    {
      simbolo: 'B',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'M',
      significado: 'Cantidad de niveles de la señal',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C',
    significado: 'Velocidad máxima de transmisión (capacidad) del canal ideal',
    unidadDeMedida: 'bit/s',
    multiploCanonico: '',
  },
  condiciones: 'Canal ideal: sin ruido ni distorsiones, de ancho de banda finito B.',
  paginas: '24, 25, 32',
  confianza: 'alta',
  calcular: ({ B, M }) => 2 * B * Math.log2(M),
};

const U05_F16: Formula = {
  id: 'U05-F16',
  unidad: 5,
  nombre: 'Ancho de banda a partir del espectro del canal',
  expresion: 'B = f_sup − f_inf',
  expresionLatex: 'B = f_{sup} - f_{inf}',
  entradas: [
    {
      simbolo: 'f_sup',
      significado: 'Frecuencia superior del espectro del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'f_inf',
      significado: 'Frecuencia inferior del espectro del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'B',
    significado: 'Ancho de banda del canal',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'M',
  },
  condiciones: 'Se usa cuando el enunciado da el espectro del canal en lugar del ancho de banda.',
  paginas: '27, 33, 34',
  confianza: 'media',
  calcular: ({ f_sup, f_inf }) => f_sup - f_inf,
};

const U05_F17: Formula = {
  id: 'U05-F17',
  unidad: 5,
  nombre: 'Fórmula de Shannon: capacidad de un canal con ruido',
  expresion: 'C = B · log₂(1 + SNR)',
  // El catálogo escribe `\frac{S}{N}`; la Fórmula declara `SNR`.
  expresionLatex: 'C = B \\log_2\\left(1 + SNR\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de las potencias de señal y ruido',
      expresion: 'C = B · log₂(1 + S / N)',
      latex: 'C = B \\log_2\\left(1 + \\frac{S}{N}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'B',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'SNR',
      significado: 'Relación señal a ruido lineal (S/N)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C',
    significado: 'Capacidad máxima del canal (tasa de bits de información)',
    unidadDeMedida: 'bit/s',
    multiploCanonico: '',
  },
  condiciones:
    'Canal real con ruido aleatorio blanco. La SNR debe entrar en valor lineal: si el dato viene en dB ' +
    'hay que convertirlo primero a escala lineal.',
  paginas: '26, 27, 28, 29, 31, 33, 34, 35',
  confianza: 'alta',
  calcular: ({ B, SNR }) => B * Math.log2(1 + SNR),
};

const U05_F18: Formula = {
  id: 'U05-F18',
  unidad: 5,
  nombre: 'Relación señal a ruido en decibeles',
  expresion: 'SNR_dB = 10 · log₁₀(SNR)',
  expresionLatex: 'SNR_{dB} = 10 \\log_{10}\\left(SNR\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'Despeje del valor lineal',
      expresion: 'SNR = 10^(SNR_dB / 10)',
      latex: 'SNR = 10^{\\frac{SNR_{dB}}{10}}',
    },
  ],
  entradas: [
    {
      simbolo: 'SNR',
      significado: 'Relación señal a ruido lineal (S/N)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'SNR_dB',
    significado: 'Relación señal a ruido expresada en decibeles',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'Relación de potencias (factor 10). En las diapositivas a veces ' +
    '24 dB se redondea a SNR = 255 para que 1+SNR sea potencia de 2.',
  paginas: '27, 28, 33, 34, 35',
  confianza: 'alta',
  calcular: ({ SNR }) => 10 * Math.log10(SNR),
};

const U05_F19: Formula = {
  id: 'U05-F19',
  unidad: 5,
  nombre: 'Eficiencia espectral máxima',
  expresion: 'E_max = C / B = log₂(1 + SNR)',
  // El catálogo incluye la forma con SNR; la Fórmula implementa `E_{max} = \frac{C}{B}`.
  expresionLatex: 'E_{max} = \\frac{C}{B}',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la relación señal a ruido (límite de Shannon)',
      expresion: 'E_max = log₂(1 + SNR)',
      latex: 'E_{max} = \\log_2\\left(1 + SNR\\right)',
    },
    {
      rotulo: 'En función de las potencias de señal y ruido',
      expresion: 'E_max = log₂(1 + S / N)',
      latex: 'E_{max} = \\log_2\\left(1 + \\frac{S}{N}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'C',
      significado: 'Capacidad del canal',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'B',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'E_max',
    significado: 'Eficiencia espectral del canal',
    unidadDeMedida: 'bit/Hz',
    multiploCanonico: '',
  },
  condiciones: 'Depende exclusivamente de la calidad del canal (su nivel de ruido), no del ancho de banda B.',
  paginas: '31, 35, 37',
  confianza: 'alta',
  calcular: ({ C, B }) => C / B,
};

const U05_F20: Formula = {
  id: 'U05-F20',
  unidad: 5,
  nombre: 'Shannon-Hartley: niveles de señal requeridos',
  expresion: 'M = √(1 + SNR)',
  expresionLatex: 'M = \\sqrt{1 + SNR}',
  expresionesRelacionadas: [
    {
      rotulo: 'Igualdad de Nyquist y Shannon',
      expresion: '2B · log₂(M) = B · log₂(1 + SNR)',
      latex: '2B \\log_2 M = B \\log_2\\left(1 + SNR\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'SNR',
      significado: 'Relación señal a ruido lineal (S/N)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'M',
    significado: 'Cantidad de niveles de la señal necesarios para alcanzar la capacidad de Shannon',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Surge de igualar la capacidad de Nyquist con la de Shannon. SNR en valor ' +
    'lineal. En las diapositivas, si no es potencia de 2 se adopta la potencia de 2 inferior.',
  paginas: '32, 33, 34, 35',
  confianza: 'alta',
  calcular: ({ SNR }) => Math.sqrt(1 + SNR),
};

const U05_F21: Formula = {
  id: 'U05-F21',
  unidad: 5,
  nombre: 'Potencia de señal en función de la energía por bit',
  expresion: 'S = E_b / T_b',
  expresionLatex: 'S = \\frac{E_b}{T_b}',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la tasa de bit',
      expresion: 'S = E_b · R',
      latex: 'S = E_b \\times R',
    },
  ],
  entradas: [
    {
      simbolo: 'E_b',
      significado: 'Energía por bit',
      unidadDeMedida: 'J',
      multiploCanonico: '',
    },
    {
      simbolo: 'T_b',
      significado: 'Tiempo de bit',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
  ],
  salida: {
    simbolo: 'S',
    significado: 'Potencia de la señal',
    unidadDeMedida: 'W',
    multiploCanonico: 'm',
  },
  condiciones: 'Sistemas digitales. T_b es el tiempo de un bit, con R = 1/T_b.',
  paginas: '36',
  confianza: 'alta',
  calcular: ({ E_b, T_b }) => E_b / T_b,
};

const U05_F22: Formula = {
  id: 'U05-F22',
  unidad: 5,
  nombre: 'Potencia total de ruido a partir de la densidad espectral',
  expresion: 'N = N_0 · B',
  expresionLatex: 'N = N_0 B',
  entradas: [
    {
      simbolo: 'N_0',
      significado: 'Densidad espectral de potencia de ruido',
      unidadDeMedida: 'W/Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'B',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'N',
    significado: 'Potencia total de ruido',
    unidadDeMedida: 'W',
    multiploCanonico: 'm',
  },
  condiciones: 'Supone ruido blanco con densidad espectral N_0 constante en todo el ancho de banda B.',
  paginas: '36',
  confianza: 'alta',
  calcular: ({ N_0, B }) => N_0 * B,
};

const U05_F23: Formula = {
  id: 'U05-F23',
  unidad: 5,
  nombre: 'Tasa de bit en función del tiempo de bit',
  expresion: 'R = 1 / T_b',
  expresionLatex: 'R = \\frac{1}{T_b}',
  entradas: [
    {
      simbolo: 'T_b',
      significado: 'Tiempo de bit',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Tasa de bit (velocidad binaria)',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones: 'Para obtener el límite máximo se iguala R a C (capacidad del canal).',
  paginas: '36',
  confianza: 'alta',
  calcular: ({ T_b }) => 1 / T_b,
};

const U05_F24: Formula = {
  id: 'U05-F24',
  unidad: 5,
  nombre: 'SNR en función de Eb/No',
  expresion: 'SNR = (E_b / N_0) / (T_b · B)',
  expresionLatex: 'SNR = \\frac{E_b/N_0}{T_b \\, B}',
  expresionesRelacionadas: [
    {
      rotulo: 'En función de la capacidad C (límite máximo R = C)',
      expresion: 'SNR = (E_b / N_0) / (B / C)',
      latex: 'SNR = \\frac{E_b/N_0}{B/C}',
    },
    {
      rotulo: 'En función de las potencias de señal y ruido',
      expresion: 'SNR = S / N',
      latex: 'SNR = \\frac{S}{N}',
    },
  ],
  entradas: [
    {
      simbolo: 'E_b/N_0',
      significado: 'Relación energía por bit a densidad espectral de potencia de ruido',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'T_b',
      significado: 'Tiempo de bit',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
    {
      simbolo: 'B',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'SNR',
    significado: 'Relación señal a ruido lineal',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Se deduce de S = E_b/T_b y N = N_0·B. La forma en función de B/C vale cuando se iguala la tasa de bit ' +
    'R = 1/T_b a la capacidad C.',
  paginas: '36, 37',
  confianza: 'alta',
  calcular: ({ ['E_b/N_0']: Eb_N0, T_b, B }) => Eb_N0 / (T_b * B),
};

const U05_F25: Formula = {
  id: 'U05-F25',
  unidad: 5,
  nombre: 'Relación Eb/No a partir de la SNR y la eficiencia espectral',
  expresion: 'E_b/N_0 = SNR / E_max',
  expresionLatex: '\\frac{E_b}{N_0} = \\frac{SNR}{E_{max}}',
  entradas: [
    {
      simbolo: 'SNR',
      significado: 'Relación señal a ruido lineal',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'E_max',
      significado: 'Eficiencia espectral del enlace',
      unidadDeMedida: 'bit/Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'E_b/N_0',
    significado: 'Relación energía de bit a densidad de potencia de ruido (SNR por bit)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Magnitud adimensional (SNR normalizada). E_max es la eficiencia espectral (tasa binaria bruta ' +
    'dividida por el ancho de banda). SNR en valor lineal.',
  paginas: '37',
  confianza: 'alta',
  calcular: ({ SNR, E_max }) => SNR / E_max,
};

export const FORMULAS_UNIDAD_05: readonly Formula[] = [
  U05_F01,
  U05_F02,
  U05_F03,
  U05_F04,
  U05_F05,
  U05_F06,
  U05_F07,
  U05_F08,
  U05_F09,
  U05_F10,
  U05_F11,
  U05_F12,
  U05_F13,
  U05_F14,
  U05_F15,
  U05_F16,
  U05_F17,
  U05_F18,
  U05_F19,
  U05_F20,
  U05_F21,
  U05_F22,
  U05_F23,
  U05_F24,
  U05_F25,
];

export const EJEMPLOS_UNIDAD_05: readonly EjemploResuelto[] = [
  {
    formulaId: 'U05-F02',
    enunciado:
      'Tabla de codificación (diapositiva 6): fuente de 8 símbolos x0..x7 con distintas probabilidades. Calcular la entropía H(x).',
    entradas: {
      P: { valores: [0.2, 0.01, 0.4, 0.04, 0.1, 0.02, 0.07, 0.16], multiplo: '' },
    },
    esperado: { valor: 2.38, multiplo: '' },
    pagina: '6',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U05-F07',
    enunciado:
      'Tabla de codificación (diapositiva 6): fuente de 8 símbolos con código C2. Calcular la longitud promedio L̄.',
    entradas: {
      P: { valores: [0.2, 0.01, 0.4, 0.04, 0.1, 0.02, 0.07, 0.16], multiplo: '' },
      L: { valores: [3, 6, 1, 5, 3, 6, 4, 3], multiplo: '' },
    },
    esperado: { valor: 2.44, multiplo: '' },
    pagina: '6',
  },
  {
    formulaId: 'U05-F11',
    enunciado:
      'Ejemplo 01: señal eléctrica transmitida en 8 niveles de tensión equiprobables con Ts = 1 s durante T = 16 s.',
    entradas: {
      N: { valor: 8, multiplo: '' },
      T: { valor: 16, multiplo: '' },
      T_s: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 48, multiplo: '' },
    pagina: '8',
  },
  {
    formulaId: 'U05-F11',
    enunciado:
      'Ejemplo 02: la misma señal generada en 16 niveles de tensión con Ts = 1 s durante T = 16 s.',
    entradas: {
      N: { valor: 16, multiplo: '' },
      T: { valor: 16, multiplo: '' },
      T_s: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 64, multiplo: '' },
    pagina: '9',
  },
  {
    formulaId: 'U05-F11',
    enunciado:
      'Ejemplo 03: duración del intervalo de muestra reducida a Ts = 0,5 s, con 8 niveles durante T = 8 s.',
    entradas: {
      N: { valor: 8, multiplo: '' },
      T: { valor: 8, multiplo: '' },
      T_s: { valor: 0.5, multiplo: '' },
    },
    esperado: { valor: 48, multiplo: '' },
    pagina: '10',
  },
  {
    formulaId: 'U05-F12',
    enunciado:
      'Ejemplo 04 a): fuente que genera 4 símbolos sucesivos codificados en binario (N = 4).',
    entradas: {
      N: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 2, multiplo: '' },
    pagina: '12',
  },
  {
    formulaId: 'U05-F15',
    enunciado:
      'Ejemplo 05 (primera parte): canal de voz con B = 3100 Hz y señal binaria (M = 2 niveles).',
    entradas: {
      B: { valor: 3100, multiplo: '' },
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 6200, multiplo: '' },
    pagina: '25',
  },
  {
    formulaId: 'U05-F15',
    enunciado:
      'Ejemplo 05 (segunda parte): canal de voz con B = 3100 Hz y señal de 4 niveles de tensión (M = 4).',
    entradas: {
      B: { valor: 3100, multiplo: '' },
      M: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 12400, multiplo: '' },
    pagina: '25',
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 06: espectro de canal entre 3 MHz y 4 MHz (B = 1 MHz) con SNR = 24 dB (SNR lineal = 255).',
    entradas: {
      B: { valor: 1, multiplo: 'M' },
      SNR: { valor: 255, multiplo: '' },
    },
    esperado: { valor: 8, multiplo: 'M' },
    pagina: '27',
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 07: canal telefónico de grado voz con B = 3000 Hz y relación S/N = 1023 (lineal).',
    entradas: {
      B: { valor: 3000, multiplo: '' },
      SNR: { valor: 1023, multiplo: '' },
    },
    esperado: { valor: 30, multiplo: 'k' },
    pagina: '27',
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 08 (primera parte): canal telefónico con B = 3000 Hz y relación S/N = 100 (lineal).',
    entradas: {
      B: { valor: 3000, multiplo: '' },
      SNR: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 19975, multiplo: '' },
    pagina: '28',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 08 (segunda parte): el mismo canal (B = 3000 Hz) con relación S/N = 1000 (lineal).',
    entradas: {
      B: { valor: 3000, multiplo: '' },
      SNR: { valor: 1000, multiplo: '' },
    },
    esperado: { valor: 29902, multiplo: '' },
    pagina: '28',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 09: canal con B = 3 MHz y SNR = 100,59 lineal (20 dB) para alcanzar una capacidad de 20 Mbps.',
    entradas: {
      B: { valor: 3, multiplo: 'M' },
      SNR: { valor: 100.5936, multiplo: '' },
    },
    esperado: { valor: 20, multiplo: 'M' },
    pagina: '28',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U05-F12',
    enunciado:
      'Ejemplo 10 a): teclado de 110 caracteres equiprobables (N = 110). Calcular información por carácter.',
    entradas: {
      N: { valor: 110, multiplo: '' },
    },
    esperado: { valor: 6.78, multiplo: '' },
    pagina: '29',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 10 b): velocidad de transmisión a través de un canal con B = 3,2 kHz y SNR = 100 (20 dB).',
    entradas: {
      B: { valor: 3.2, multiplo: 'k' },
      SNR: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 21.3, multiplo: 'k' },
    pagina: '29',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U05-F20',
    enunciado:
      'Ejemplo 11: canal con SNR = 24 dB (SNR lineal = 255). Calcular niveles de señal requeridos M.',
    entradas: {
      SNR: { valor: 255, multiplo: '' },
    },
    esperado: { valor: 16, multiplo: '' },
    pagina: '33',
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 12 (primera parte): canal con espectro 3–4 MHz (B = 1 MHz) y SNR = 100 (20 dB).',
    entradas: {
      B: { valor: 1, multiplo: 'M' },
      SNR: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 6.658, multiplo: 'M' },
    pagina: '34',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U05-F20',
    enunciado:
      'Ejemplo 12 (segunda parte): niveles de señal requeridos M para canal con SNR = 100.',
    entradas: {
      SNR: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 10.04, multiplo: '' },
    pagina: '34',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 13 a): canal Wi-Fi con B = 20 MHz y SNR = 100 (20 dB). Capacidad de canal C.',
    entradas: {
      B: { valor: 20, multiplo: 'M' },
      SNR: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 133.16, multiplo: 'M' },
    pagina: '35',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U05-F19',
    enunciado:
      'Ejemplo 13 b): eficiencia espectral de canal Wi-Fi con C = 133,16 Mbps y B = 20 MHz.',
    entradas: {
      C: { valor: 133.16, multiplo: 'M' },
      B: { valor: 20, multiplo: 'M' },
    },
    esperado: { valor: 6.658, multiplo: '' },
    pagina: '35',
    tolerancia: 0.001,
  },
  {
    formulaId: 'U05-F20',
    enunciado:
      'Ejemplo 13 c): niveles de señal digital en canal Wi-Fi con SNR = 100.',
    entradas: {
      SNR: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 10.04, multiplo: '' },
    pagina: '35',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U05-F17',
    enunciado:
      'Ejemplo 13 d): canal Wi-Fi con B = 20 MHz y SNR = 31 (la diapositiva lo rotula erróneamente 31 dB).',
    entradas: {
      B: { valor: 20, multiplo: 'M' },
      SNR: { valor: 31, multiplo: '' },
    },
    esperado: { valor: 100, multiplo: 'M' },
    pagina: '35',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 5, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_05: readonly string[] = [];

