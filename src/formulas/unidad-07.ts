import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 7 — Técnicas de transmisión de la información.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

const U07_F01: Formula = {
  id: 'U07-F01',
  unidad: 7,
  nombre: 'Número de bits por elemento de señal (bits por símbolo)',
  expresion: 'n = log₂(N)',
  expresionLatex: 'n = \\log_2(N)',
  entradas: [
    {
      simbolo: 'N',
      significado: 'Número de elementos de señal distintos (número de niveles de la señal)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'n',
    significado: 'Número de bits por elemento de señal (bits por símbolo)',
    unidadDeMedida: 'bit/baudio',
    multiploCanonico: '',
  },
  condiciones:
    'Requiere N > 0. Para que n sea entero, N debe ser potencia de 2 (la cátedra siempre usa ' +
    'N = 2, 4, 8, 16, 32, 64, 128). Vale para el caso de un elemento de señal que transporta un ' +
    'número entero de bits; en la página 12 la diapositiva muestra casos donde n es una fracción ' +
    '(1/2 bit/baudio, 4/3 bit/baudio) porque un bit se reparte entre varios elementos de señal o ' +
    'varios bits entre varios elementos: en esos casos n se lee como bits/elementos-de-señal y ' +
    'NO surge de log2(N).',
  paginas: '10, 11, 12, 13',
  confianza: 'alta',
  calcular: ({ N }) => Math.log2(N),
};

const U07_F02: Formula = {
  id: 'U07-F02',
  unidad: 7,
  nombre: 'Velocidad de transmisión (tasa de bits) a partir de la tasa de símbolos',
  expresion: 'R = r · n',
  expresionLatex: 'R = r \\cdot n',
  entradas: [
    {
      simbolo: 'r',
      significado: 'Tasa de símbolos / tasa de señal, de pulso, de modulación o de baudios',
      unidadDeMedida: 'Baud',
      multiploCanonico: '',
    },
    {
      simbolo: 'n',
      significado: 'Número de bits por elemento de señal (bits por símbolo)',
      unidadDeMedida: 'bit/baudio',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Tasa de bits / velocidad de transmisión (tasa de datos)',
    unidadDeMedida: 'bps',
    multiploCanonico: '',
  },
  condiciones:
    'Supone n constante (todos los elementos de señal transportan la misma cantidad de bits). ' +
    'Da la velocidad de transmisión bruta, NO la velocidad efectiva ni el throughput (la página 14 ' +
    'los distingue explícitamente: el throughput cuenta sólo los bits que el receptor acepta como válidos). ' +
    'No contempla overhead de sincronismo (bits de start/stop, bytes de sync).',
  paginas: '13',
  confianza: 'alta',
  calcular: ({ r, n }) => r * n,
};

const U07_F03: Formula = {
  id: 'U07-F03',
  unidad: 7,
  nombre: 'Ancho de banda de un canal / señal analógica',
  expresion: 'B = f_2 − f_1',
  // El catálogo escribe `B = \Delta f = f_2 - f_1`; se transcribe la igualdad
  // directa que la Fórmula implementa.
  expresionLatex: 'B = f_2 - f_1',
  entradas: [
    {
      simbolo: 'f_2',
      significado: 'Frecuencia superior del rango',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'f_1',
      significado: 'Frecuencia inferior del rango',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'B',
    significado: 'Ancho de banda: rango de frecuencias que deja pasar el canal satisfactoriamente',
    unidadDeMedida: 'Hz',
    multiploCanonico: '',
  },
  condiciones:
    'Definido para señales analógicas / para el rango de frecuencias donde se concentra la mayor ' +
    'parte de la potencia de la señal. Requiere f_2 > f_1 y ambas frecuencias en la misma unidad (Hz). ' +
    'NO aplica directamente a una señal digital que transporta información: al no ser periódica su ancho ' +
    'de banda es continuo y teóricamente infinito, y se trabaja con el ancho de banda EFECTIVO, que es ' +
    'finito (páginas 16 y 17). Tampoco confundir con el «ancho de banda digital» de la página 19, que es ' +
    'cantidad de datos por unidad de tiempo (bps) y no un rango de frecuencias.',
  paginas: '17',
  confianza: 'alta',
  calcular: ({ f_2, f_1 }) => f_2 - f_1,
};

const U07_F04: Formula = {
  id: 'U07-F04',
  unidad: 7,
  nombre: 'Bits extra por segundo por desviación del reloj del receptor',
  expresion: 'b_extra = R · (d / 100)',
  expresionLatex: 'b_{extra} = R \\cdot \\frac{d}{100}',
  expresionesRelacionadas: [
    {
      rotulo: 'Tasa de bits efectivamente recibida',
      expresion: 'R_recibida = R · (1 + d / 100)',
      latex: 'R_{recibida} = R \\cdot \\left(1 + \\frac{d}{100}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'R',
      significado: 'Tasa de datos nominal del emisor',
      unidadDeMedida: 'bps',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'd',
      significado: 'Desviación relativa del reloj del receptor respecto del emisor',
      unidadDeMedida: '%',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'b_extra',
    significado: 'Cantidad de bits extra que recibe el receptor en un segundo por tener el reloj más rápido',
    unidadDeMedida: 'bps',
    multiploCanonico: '',
  },
  condiciones:
    'Sólo para reloj del receptor MÁS RÁPIDO que el del emisor (si fuera más lento, el receptor pierde ' +
    'bits en vez de recibir de más). Supone tasa constante durante el segundo considerado y desviación ' +
    'expresada en porcentaje.',
  paginas: '26',
  confianza: 'baja',
  calcular: ({ R, d }) => R * (d / 100),
};

export const FORMULAS_UNIDAD_07: readonly Formula[] = [
  U07_F01,
  U07_F02,
  U07_F03,
  U07_F04,
];

export const EJEMPLOS_UNIDAD_07: readonly EjemploResuelto[] = [
  // U07-F01: pág. 11 — Ilustración relación elementos de señal y bits por elemento
  {
    formulaId: 'U07-F01',
    enunciado:
      'Ilustración de la relación entre elementos de señal y bits por elemento: N = 2 elementos de señal.',
    entradas: { N: { valor: 2, multiplo: '' } },
    esperado: { valor: 1, multiplo: '' },
    pagina: '11',
  },
  {
    formulaId: 'U07-F01',
    enunciado:
      'Ilustración de la relación entre elementos de señal y bits por elemento: N = 4 elementos de señal.',
    entradas: { N: { valor: 4, multiplo: '' } },
    esperado: { valor: 2, multiplo: '' },
    pagina: '11',
  },

  // U07-F01: pág. 13 — Tabla de bits por elemento de señal para potencias de 2
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 2.',
    entradas: { N: { valor: 2, multiplo: '' } },
    esperado: { valor: 1, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 4.',
    entradas: { N: { valor: 4, multiplo: '' } },
    esperado: { valor: 2, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 8.',
    entradas: { N: { valor: 8, multiplo: '' } },
    esperado: { valor: 3, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 16.',
    entradas: { N: { valor: 16, multiplo: '' } },
    esperado: { valor: 4, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 32.',
    entradas: { N: { valor: 32, multiplo: '' } },
    esperado: { valor: 5, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 64.',
    entradas: { N: { valor: 64, multiplo: '' } },
    esperado: { valor: 6, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F01',
    enunciado: 'Tabla de la diapositiva: bits por elemento de señal para N = 128.',
    entradas: { N: { valor: 128, multiplo: '' } },
    esperado: { valor: 7, multiplo: '' },
    pagina: '13',
  },

  // U07-F02: pág. 13 — Velocidad de transmisión para r = 1200 Baud y n = 1..7
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 1 bit/baudio (N = 2): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 1200, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 2 bit/baudio (N = 4): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 2400, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 3 bit/baudio (N = 8): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: 3600, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 4 bit/baudio (N = 16): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 4800, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 5 bit/baudio (N = 32): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 5, multiplo: '' },
    },
    esperado: { valor: 6000, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 6 bit/baudio (N = 64): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 6, multiplo: '' },
    },
    esperado: { valor: 7200, multiplo: '' },
    pagina: '13',
  },
  {
    formulaId: 'U07-F02',
    enunciado:
      'Supongamos un canal de r = 1200 baudios con n = 7 bit/baudio (N = 128): tasa de bits R.',
    entradas: {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 7, multiplo: '' },
    },
    esperado: { valor: 8400, multiplo: '' },
    pagina: '13',
  },

  // U07-F04: pág. 26 — Desviación del reloj del receptor (Ejemplo 01)
  {
    formulaId: 'U07-F04',
    enunciado:
      'Ejemplo 01: En una transmisión digital a 1 Kbps, el reloj del receptor es un 0,1 % más rápido que el del emisor.',
    entradas: {
      R: { valor: 1, multiplo: 'k' },
      d: { valor: 0.1, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '26',
  },
  {
    formulaId: 'U07-F04',
    enunciado:
      'Ejemplo 01 (segunda parte): En una transmisión digital a 1 Mbps, el reloj del receptor es un 0,1 % más rápido que el del emisor.',
    entradas: {
      R: { valor: 1, multiplo: 'M' },
      d: { valor: 0.1, multiplo: '' },
    },
    esperado: { valor: 1000, multiplo: '' },
    pagina: '26',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 7, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_07: readonly string[] = [];
