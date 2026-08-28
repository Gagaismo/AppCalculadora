import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 10 — Capa Física de Redes de Datos.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. No agregar fórmulas desde conocimiento general de la
 * materia: si falta una, se decide primero si entra en alcance.
 */

const U10_F01: Formula = {
  id: 'U10-F01',
  unidad: 10,
  nombre: 'Tasa de símbolos con codificación de bloque 4B/5B',
  expresion: 'R_s = R_b · (5 / 4)',
  entradas: [
    {
      simbolo: 'R_b',
      significado: 'Velocidad binaria útil (tasa de bits de datos)',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'R_s',
    significado: 'Tasa de símbolos (velocidad de señalización en línea)',
    unidadDeMedida: 'Bd',
    multiploCanonico: 'M',
  },
  condiciones:
    'Sólo aplica a enlaces con codificación de bloque 4B/5B: 100Base-TX (cobre, línea MLT-3) y ' +
    '100Base-FX (fibra, línea NRZI). El factor 5/4 es el overhead del bloque (5 bits de línea por cada ' +
    '4 bits de datos). No aplica a 10Base (Manchester), 1000Base (8B/10B) ni 10GBase (64B/66B). ' +
    'R_s y R_b deben expresarse en la misma escala (Mbps -> Mbaudios).',
  paginas: '16, 17',
  confianza: 'alta',
  calcular: ({ R_b }) => R_b * (5 / 4),
};

const U10_F02: Formula = {
  id: 'U10-F02',
  unidad: 10,
  nombre: 'Tasa de símbolos con codificación de bloque 8B/10B',
  expresion: 'R_s = R_b · (10 / 8)',
  entradas: [
    {
      simbolo: 'R_b',
      significado: 'Velocidad binaria útil (tasa de bits de datos)',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'G',
    },
  ],
  salida: {
    simbolo: 'R_s',
    significado: 'Tasa de símbolos (velocidad de señalización en línea)',
    unidadDeMedida: 'Bd',
    multiploCanonico: 'G',
  },
  condiciones:
    'Sólo aplica a enlaces con codificación de bloque 8B/10B: 1000Base-FX / 1000Base-SX / ' +
    '1000Base-LX sobre fibra (línea NRZ) y 1000Base-TX en cobre (que además usa 4D-PAM-5). ' +
    'Factor 10/8 = overhead del bloque (10 bits de línea por 8 bits de datos). Mismas escalas para R_s y R_b.',
  paginas: '19',
  confianza: 'alta',
  calcular: ({ R_b }) => R_b * (10 / 8),
};

const U10_F03: Formula = {
  id: 'U10-F03',
  unidad: 10,
  nombre: 'Tasa de símbolos con codificación de bloque 64B/66B',
  expresion: 'R_s = R_b · (66 / 64)',
  entradas: [
    {
      simbolo: 'R_b',
      significado: 'Velocidad binaria útil (tasa de bits de datos)',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'G',
    },
  ],
  salida: {
    simbolo: 'R_s',
    significado: 'Tasa de símbolos (velocidad de señalización en línea)',
    unidadDeMedida: 'Bd',
    multiploCanonico: 'G',
  },
  condiciones:
    'Sólo aplica a enlaces con codificación de bloque 64B/66B: 10GBase-SR / 10GBase-LR (fibra, ' +
    'línea NRZ). En la diapositiva 22 el estándar 25G/50G/100GBase también declara 64B/66B pero ' +
    'allí NO se da la tasa de símbolos (usa línea PAM-4 y FEC Reed-Solomon, lo que cambia el cálculo). ' +
    'Mismas escalas para R_s y R_b.',
  paginas: '21',
  confianza: 'alta',
  calcular: ({ R_b }) => R_b * (66 / 64),
};

const U10_F04: Formula = {
  id: 'U10-F04',
  unidad: 10,
  nombre: 'Tasa de símbolos a partir de los bits por símbolo (modulación multinivel)',
  expresion: 'R_s = R_b / m',
  entradas: [
    {
      simbolo: 'R_b',
      significado: 'Velocidad binaria por par trenzado',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'm',
      significado: 'Cantidad de bits transportados por cada símbolo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R_s',
    significado: 'Tasa de símbolos por par (velocidad de señalización)',
    unidadDeMedida: 'Bd',
    multiploCanonico: 'M',
  },
  condiciones:
    'Se aplica a modulación por pulsos multinivel; en la fuente se usa para 1000Base-TX con ' +
    '4D-PAM-5 tomando m = 2 bits/símbolo sobre cada par (250 Mbps por par -> 125 Mbaudios). ' +
    'R_b es la velocidad POR PAR, no la total del enlace. La diapositiva no explicita el m de ' +
    '128D-PAM-16 (10GBase-T), por lo que no debe reutilizarse ese caso con esta fórmula.',
  paginas: '18',
  confianza: 'alta',
  calcular: ({ R_b, m }) => R_b / m,
};

const U10_F05: Formula = {
  id: 'U10-F05',
  unidad: 10,
  nombre: 'Tasa de símbolos total de un enlace multipar',
  expresion: 'R_s,total = N_pares · R_s,par',
  entradas: [
    {
      simbolo: 'N_pares',
      significado: 'Cantidad de pares trenzados utilizados en paralelo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'R_s,par',
      significado: 'Tasa de símbolos de cada par',
      unidadDeMedida: 'Bd',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'R_s,total',
    significado: 'Tasa de símbolos agregada del enlace',
    unidadDeMedida: 'Bd',
    multiploCanonico: 'G',
  },
  condiciones:
    'Aplica a enlaces cobre que transmiten en paralelo sobre varios pares (en la fuente: 10GBase-T ' +
    'con 4 pares Cat 6A, 833,33 MBaudios por par). Supone que todos los pares operan a la misma ' +
    'tasa de símbolos. Cuidado con la escala: MBaudios × pares da MBaudios (3333,32 MBaudios = 3,33 GBaudios).',
  paginas: '20',
  confianza: 'alta',
  calcular: ({ N_pares, 'R_s,par': R_s_par }) => N_pares * R_s_par,
};

const U10_F06: Formula = {
  id: 'U10-F06',
  unidad: 10,
  nombre: 'Velocidad binaria por par trenzado',
  expresion: 'R_b,par = R_b,total / N_pares',
  entradas: [
    {
      simbolo: 'R_b,total',
      significado: 'Velocidad binaria nominal total del estándar',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'N_pares',
      significado: 'Cantidad de pares trenzados en paralelo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R_b,par',
    significado: 'Velocidad binaria que transporta cada par trenzado',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'M',
  },
  condiciones:
    'Aplica sólo a estándares cobre multipar en full dúplex con reparto uniforme de la carga: ' +
    '1000Base-TX (1000 Mbps / 4 pares = 250 Mbps por par) y 10GBase-T (10 Gbps / 4 pares = 2,50 Gbps ' +
    'por par). No aplica a 10Base-T ni 100Base-TX (1 y 2 pares con la totalidad de los datos en un par).',
  paginas: '18, 20',
  confianza: 'media',
  calcular: ({ 'R_b,total': R_b_total, N_pares }) => R_b_total / N_pares,
};

const U10_F07: Formula = {
  id: 'U10-F07',
  unidad: 10,
  nombre: 'Ancho de banda de una banda de frecuencias (ISM / Wi-Fi)',
  expresion: 'AB = f_sup − f_inf',
  expresionLatex: 'AB = f_{sup} - f_{inf}',
  entradas: [
    {
      simbolo: 'f_sup',
      significado: 'Frecuencia superior del rango de la banda',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'G',
    },
    {
      simbolo: 'f_inf',
      significado: 'Frecuencia inferior del rango de la banda',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'G',
    },
  ],
  salida: {
    simbolo: 'AB',
    significado: 'Ancho de banda de la banda de frecuencias',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'M',
  },
  condiciones:
    'Se aplica a las bandas no licenciadas listadas por la cátedra (2,4 GHz ISM, 5 GHz, 6 GHz). ' +
    'Es el ancho de banda TOTAL de la banda, no el ancho de canal (20/40/80/160 MHz de las ' +
    'diapositivas 37 a 43). Requiere que ambas frecuencias estén en la misma unidad antes de restar.',
  paginas: '34, 35',
  confianza: 'media',
  calcular: ({ f_sup, f_inf }) => f_sup - f_inf,
};

const U10_F08: Formula = {
  id: 'U10-F08',
  unidad: 10,
  nombre: 'Separación entre subportadoras OFDM (802.11a)',
  expresion: 'Δf = BW / N_FFT',
  entradas: [
    {
      simbolo: 'BW',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'N_FFT',
      significado: 'Cantidad de puntos de la FFT',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'Δf',
    significado: 'Separación entre subportadoras (subcarrier spacing)',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'Corresponde a la PHY OFDM de 802.11a con canal de 20 MHz y FFT de 64 puntos. Del total de 64 ' +
    'posiciones sólo 52 son subportadoras activas (48 de datos, 4 piloto BPSK, 1 nula DC), por lo que ' +
    'el ancho ocupado real es OBW = 16,6 MHz, distinto de BW. No usar N igual a 52 en esta fórmula: ' +
    'el divisor son los puntos de la FFT (64).',
  paginas: '47',
  confianza: 'media',
  calcular: ({ BW, N_FFT }) => BW / N_FFT,
};

export const FORMULAS_UNIDAD_10: readonly Formula[] = [
  U10_F01,
  U10_F02,
  U10_F03,
  U10_F04,
  U10_F05,
  U10_F06,
  U10_F07,
  U10_F08,
];

export const EJEMPLOS_UNIDAD_10: readonly EjemploResuelto[] = [
  {
    formulaId: 'U10-F01',
    enunciado:
      '100Base-TX (cobre, 2 pares UTP Cat 5, codificación de bloque 4B/5B y línea MLT-3): ' +
      'calcular la tasa de símbolos.',
    entradas: {
      R_b: { valor: 100, multiplo: 'M' },
    },
    esperado: { valor: 125, multiplo: 'M' },
    pagina: '16',
  },
  {
    formulaId: 'U10-F01',
    enunciado:
      '100Base-FX (fibra óptica multimodo, codificación de bloque 4B/5B y línea NRZI): ' +
      'calcular la tasa de símbolos.',
    entradas: {
      R_b: { valor: 100, multiplo: 'M' },
    },
    esperado: { valor: 125, multiplo: 'M' },
    pagina: '17',
  },
  {
    formulaId: 'U10-F04',
    enunciado:
      '1000Base-TX (cobre, 4 pares UTP Cat 5, bloque 8B/10B y modulación por pulsos 4D-PAM-5): ' +
      'calcular la tasa de símbolos por par.',
    entradas: {
      R_b: { valor: 250, multiplo: 'M' },
      m: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 125, multiplo: 'M' },
    pagina: '18',
  },
  {
    formulaId: 'U10-F06',
    enunciado:
      '1000Base-TX (1 Gbps) repartido sobre 4 pares trenzados UTP Cat 5 o superior: ' +
      'velocidad por cada par trenzado.',
    entradas: {
      'R_b,total': { valor: 1000, multiplo: 'M' },
      N_pares: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 250, multiplo: 'M' },
    pagina: '18',
  },
  {
    formulaId: 'U10-F02',
    enunciado:
      '1000Base-FX (fibra óptica multimodo 850 nm / monomodo 1310 nm, bloque 8B/10B, línea NRZ): ' +
      'calcular la tasa de símbolos.',
    entradas: {
      R_b: { valor: 1, multiplo: 'G' },
    },
    esperado: { valor: 1.25, multiplo: 'G' },
    pagina: '19',
  },
  {
    formulaId: 'U10-F05',
    enunciado:
      '10GBase-T (cobre, 4 pares UTP Cat 6A, bloque THP y modulación 128D-PAM-16): ' +
      'calcular la tasa de símbolos total.',
    entradas: {
      N_pares: { valor: 4, multiplo: '' },
      'R_s,par': { valor: 833.33, multiplo: 'M' },
    },
    esperado: { valor: 3.33, multiplo: 'G' },
    pagina: '20',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U10-F06',
    enunciado:
      '10GBase-T (10 Gbps) repartido sobre 4 pares trenzados UTP Cat 6A o superior: ' +
      'velocidad por cada par trenzado.',
    entradas: {
      'R_b,total': { valor: 10, multiplo: 'G' },
      N_pares: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 2.5, multiplo: 'G' },
    pagina: '20',
  },
  {
    formulaId: 'U10-F03',
    enunciado:
      '10GBase-SR (fibra multimodo 850 nm) / 10GBase-LR (monomodo 1310 nm), bloque 64B/66B y línea NRZ: ' +
      'calcular la tasa de símbolos.',
    entradas: {
      R_b: { valor: 10, multiplo: 'G' },
    },
    esperado: { valor: 10.31, multiplo: 'G' },
    pagina: '21',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U10-F07',
    enunciado: 'Banda ISM de 2,4 GHz usada por Wi-Fi: ancho de banda total de la banda.',
    entradas: {
      f_inf: { valor: 2.4, multiplo: 'G' },
      f_sup: { valor: 2.4835, multiplo: 'G' },
    },
    esperado: { valor: 83.5, multiplo: 'M' },
    pagina: '34',
  },
  {
    formulaId: 'U10-F07',
    enunciado:
      'Banda de 5 GHz usada por Wi-Fi: ancho de banda total de la banda. La diapositiva 34 ' +
      'escribe AB = 70 MHz, que no se corresponde con el rango 5,150–5,850 GHz que ella misma indica.',
    entradas: {
      f_inf: { valor: 5.15, multiplo: 'G' },
      f_sup: { valor: 5.85, multiplo: 'G' },
    },
    esperado: { valor: 700, multiplo: 'M' },
    pagina: '34',
    apartamiento:
      'La diapositiva 34 asigna AB = 70 MHz a esta banda. La resta de su propio rango da 700 MHz. ' +
      'El catálogo lo registra como errata de la diapositiva, no como una fórmula distinta: los ' +
      'otros dos casos de la misma página verifican exactamente. Se implementa el valor correcto.',
  },
  {
    formulaId: 'U10-F07',
    enunciado: 'Banda de 6 GHz (Wi-Fi 6E): ancho de banda total de la banda.',
    entradas: {
      f_inf: { valor: 5.925, multiplo: 'G' },
      f_sup: { valor: 7.125, multiplo: 'G' },
    },
    esperado: { valor: 1.2, multiplo: 'G' },
    pagina: '35',
  },
  {
    formulaId: 'U10-F08',
    enunciado:
      'PHY OFDM de 802.11a con canal de 20 MHz y FFT de 64 puntos: calcular la separación entre subportadoras.',
    entradas: {
      BW: { valor: 20, multiplo: 'M' },
      N_FFT: { valor: 64, multiplo: '' },
    },
    esperado: { valor: 312.5, multiplo: 'k' },
    pagina: '47',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 10, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_10: readonly string[] = [];
