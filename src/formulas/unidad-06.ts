import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 6 — Errores en la Transmisión de Datos.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

const U06_F01: Formula = {
  id: 'U06-F01',
  unidad: 6,
  nombre: 'Tasa de Errores BER (Bit Error Rate)',
  expresion: 'BER = N_e / N_t',
  entradas: [
    {
      simbolo: 'N_e',
      significado: 'Cantidad de bits erróneos recibidos',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
    {
      simbolo: 'N_t',
      significado: 'Cantidad total de bits recibidos',
      unidadDeMedida: 'bit',
      multiploCanonico: 'M',
    },
  ],
  salida: {
    simbolo: 'BER',
    significado: 'Tasa de errores de bit (Bit Error Rate)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Ambas cantidades deben estar en la misma unidad de bits (si N_t se da en Mbit hay que pasarlo a bits: ' +
    '2 Mbit = 2×10⁶ bits). Es un valor estadístico típico de cada medio de transmisión, medido sobre un ' +
    'tiempo o sesión determinada. Valores de referencia: telefonía 10⁻⁶, LAN par trenzado 10⁻⁸ a 10⁻⁹, ' +
    'fibra óptica hasta 10⁻¹¹.',
  paginas: '7, 8',
  confianza: 'alta',
  calcular: ({ N_e, N_t }) => N_e / N_t,
};

const U06_F02: Formula = {
  id: 'U06-F02',
  unidad: 6,
  nombre: 'Bits perdidos ante una ráfaga de ruido',
  expresion: 'N_perdidos = R · t',
  entradas: [
    {
      simbolo: 'R',
      significado: 'Velocidad de transmisión',
      unidadDeMedida: 'bit/s',
      multiploCanonico: '',
    },
    {
      simbolo: 't',
      significado: 'Duración de la ráfaga de ruido impulsivo',
      unidadDeMedida: 's',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'N_perdidos',
    significado: 'Cantidad de bits afectados o perdidos por la ráfaga',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Supone que todos los bits transmitidos durante la ráfaga se pierden (ruido impulsivo que anula el ' +
    'canal durante t). Ilustra el concepto: a mayor velocidad de transmisión, mayor cantidad de bits ' +
    'afectados ante una ráfaga de la misma duración.',
  paginas: '6',
  confianza: 'alta',
  calcular: ({ R, t }) => R * t,
};

const U06_F03: Formula = {
  id: 'U06-F03',
  unidad: 6,
  nombre: 'Combinaciones posibles de un código binario de N dígitos',
  expresion: 'M = 2^N',
  entradas: [
    {
      simbolo: 'N',
      significado: 'Cantidad de dígitos binarios (bits) de longitud constante del código',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'M',
    significado: 'Cantidad de combinaciones (símbolos o caracteres) representables',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Válido para códigos binarios de longitud constante. Si se utilizan las 2^N combinaciones no hay ' +
    'redundancia y es imposible detectar errores (cualquier combinación errónea sigue perteneciendo al ' +
    'código); la detección exige no usar todas las combinaciones posibles.',
  paginas: '9, 10, 11, 12',
  confianza: 'alta',
  calcular: ({ N }) => Math.pow(2, N),
};

const U06_F06: Formula = {
  id: 'U06-F06',
  unidad: 6,
  nombre: 'Capacidad de detección de errores según la distancia de Hamming',
  expresion: 'D = H − 1',
  entradas: [
    {
      simbolo: 'H',
      significado: 'Distancia de Hamming mínima del código',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'D',
    significado: 'Cantidad de errores de un bit que el código puede detectar',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Para detectar D errores de un bit se necesita un código con distancia de Hamming de al menos ' +
    'H = D + 1 (es una cota mínima, por eso con distancia H se detectan D = H − 1 errores). ' +
    'Solo detección: no implica corrección. Si se desea detectar y corregir simultáneamente, ' +
    'rige el reparto H − 1 = D + C (U06-F08).',
  paginas: '44, 45',
  confianza: 'alta',
  calcular: ({ H }) => H - 1,
};

const U06_F07: Formula = {
  id: 'U06-F07',
  unidad: 6,
  nombre: 'Capacidad de corrección de errores según la distancia de Hamming',
  expresion: 'C = (H − 1) / 2',
  entradas: [
    {
      simbolo: 'H',
      significado: 'Distancia de Hamming mínima del código',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C',
    significado: 'Cantidad de errores de un bit que el código puede corregir',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Para corregir C errores de un bit se necesita un código con distancia de Hamming de al menos ' +
    'H = 2C + 1. La diapositiva no aclara si con H par se toma parte entera: el único ejemplo usa ' +
    'H = 5 (impar) dando C = 2 exacto. Con H par rige la relación de reparto H − 1 = D + C (U06-F08).',
  paginas: '45',
  confianza: 'alta',
  calcular: ({ H }) => (H - 1) / 2,
};

const U06_F08: Formula = {
  id: 'U06-F08',
  unidad: 6,
  nombre: 'Reparto entre capacidad de detección y de corrección (mínima distancia de un código)',
  expresion: 'H − 1 = D + C  (con D ≥ C)',
  entradas: [
    {
      simbolo: 'D',
      significado: 'Capacidad de detección deseada (cantidad de errores detectables)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'C',
      significado: 'Capacidad de corrección deseada (cantidad de errores corregibles)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'H',
    significado: 'Distancia mínima de Hamming requerida del código (H = D + C + 1)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Restricción obligatoria D ≥ C. D y C son enteros no negativos. Para un H dado existen ' +
    'múltiples repartos válidos (D, C) enteros no negativos con D ≥ C. Como el cálculo es ' +
    'unidireccional, dadas las capacidades deseadas D y C calcula la mínima distancia H = D + C + 1 requerida.',
  paginas: '46',
  confianza: 'alta',
  calcular: ({ D, C }) => D + C + 1,
};

const U06_F09: Formula = {
  id: 'U06-F09',
  unidad: 6,
  nombre: 'Cantidad de bits de paridad en la codificación Hamming',
  expresion: '2^p ≥ n + p + 1',
  entradas: [
    {
      simbolo: 'n',
      significado: 'Cantidad de bits de datos (información) de la palabra original',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'p',
    significado: 'Cantidad mínima de bits de paridad (redundantes) a agregar',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Es una inecuación: se busca el menor p entero que satisface 2^p ≥ n + p + 1 para un n dado. ' +
    'Los p bits de paridad se ubican en las posiciones potencia de 2 (1, 2, 4, 8, ...) de la palabra ' +
    'código de longitud total n + p. La condición asegura que los p bits alcancen para señalar ' +
    'cualquiera de las n + p posiciones erróneas más el caso sin error.',
  paginas: '47, 48',
  confianza: 'alta',
  calcular: ({ n }) => {
    let p = 1;
    while (Math.pow(2, p) < n + p + 1) {
      p++;
    }
    return p;
  },
};

const U06_F10: Formula = {
  id: 'U06-F10',
  unidad: 6,
  nombre: 'Posición del bit erróneo (síndrome de Hamming)',
  expresion: 'pos = Σ p_i · 2^(i−1)',
  entradas: [
    {
      simbolo: 'p',
      significado: 'Bits de control del síndrome (p₁, p₂, ..., p_p; 1 si no cumple paridad, 0 si cumple)',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'pos',
    significado: 'Posición decimal del bit erróneo en la trama (0 = sin error)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'El conjunto de los p bits de control recalculados (síndrome) forma un número binario natural ' +
    'cuyo equivalente decimal indica la posición del bit erróneo (1 a n+p); si vale 0 indica que no hubo ' +
    'error. Los bits de entrada se cargan en orden p₁, p₂, ..., p_p (desde el de menor peso 2⁰ hasta 2^(p-1)). ' +
    'Válido para la corrección de un único bit erróneo en código Hamming con paridad par.',
  paginas: '47, 49, 50',
  confianza: 'media',
  calcular: (_, { p }) => p.reduce((pos, bit, i) => pos + bit * Math.pow(2, i), 0),
};

export const FORMULAS_UNIDAD_06: readonly Formula[] = [
  U06_F01,
  U06_F02,
  U06_F03,
  U06_F06,
  U06_F07,
  U06_F08,
  U06_F09,
  U06_F10,
];

export const EJEMPLOS_UNIDAD_06: readonly EjemploResuelto[] = [
  {
    formulaId: 'U06-F01',
    enunciado:
      'Ejemplo 01: Una computadora recibe desde una fuente remota un total de 2 Mbit que corresponden a un texto; ' +
      'si se detectan 20 bits con error, calcular el BER.',
    entradas: {
      N_e: { valor: 20, multiplo: '' },
      N_t: { valor: 2, multiplo: 'M' },
    },
    esperado: { valor: 1e-5, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U06-F02',
    enunciado:
      'Ruido impulsivo con duración de 0,5 seg sobre un enlace de velocidad R = 600 bps: cuántos bits se pierden.',
    entradas: {
      R: { valor: 600, multiplo: '' },
      t: { valor: 0.5, multiplo: '' },
    },
    esperado: { valor: 300, multiplo: '' },
    pagina: '6',
  },
  {
    formulaId: 'U06-F02',
    enunciado:
      'Mismo ruido impulsivo de 0,5 seg sobre un enlace de velocidad R = 1200 Mbps: cuántos bits se pierden.',
    entradas: {
      R: { valor: 1200, multiplo: 'M' },
      t: { valor: 0.5, multiplo: '' },
    },
    esperado: { valor: 600, multiplo: 'M' },
    pagina: '6',
  },
  {
    formulaId: 'U06-F03',
    enunciado:
      'Código ASCII: conjunto de caracteres de 7 bits (b0 = LSB a b6 = MSB); cuántas combinaciones define.',
    entradas: {
      N: { valor: 7, multiplo: '' },
    },
    esperado: { valor: 128, multiplo: '' },
    pagina: '9',
  },
  {
    formulaId: 'U06-F03',
    enunciado:
      'Código EBCDIC: cada carácter está compuesto por 8 bits = 1 byte; cuántos caracteres define.',
    entradas: {
      N: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 256, multiplo: '' },
    pagina: '10',
  },
  {
    formulaId: 'U06-F03',
    enunciado:
      'Código BCD natural para transmitir dígitos decimales con 4 dígitos binarios: cuántas combinaciones posibles.',
    entradas: {
      N: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 16, multiplo: '' },
    pagina: '12',
  },
  {
    formulaId: 'U06-F06',
    enunciado:
      'Ejemplo 04: dado el código C = {001, 010, 100} con distancia Hamming = 2, determinar cuántos errores detecta.',
    entradas: {
      H: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '44',
  },
  {
    formulaId: 'U06-F06',
    enunciado:
      'Ejemplo 05: para el código C = {0000000000, 0000011111, 1111100000, 1111111111} con distancia Hamming = 5, ' +
      'determinar cuántos errores se pueden detectar.',
    entradas: {
      H: { valor: 5, multiplo: '' },
    },
    esperado: { valor: 4, multiplo: '' },
    pagina: '45',
  },
  {
    formulaId: 'U06-F07',
    enunciado:
      'Ejemplo 05: para el mismo código C = {0000000000, 0000011111, 1111100000, 1111111111} con distancia Hamming = 5, ' +
      'determinar cuántos errores se pueden corregir.',
    entradas: {
      H: { valor: 5, multiplo: '' },
    },
    esperado: { valor: 2, multiplo: '' },
    pagina: '45',
  },
  {
    formulaId: 'U06-F08',
    enunciado:
      'Mínima distancia de un código con H = 2 (caso del control de Paridad): capacidad de detección D = 1 y corrección C = 0.',
    entradas: {
      D: { valor: 1, multiplo: '' },
      C: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 2, multiplo: '' },
    pagina: '46',
  },
  {
    formulaId: 'U06-F08',
    enunciado:
      'Mínima distancia de un código con H = 3 (caso de Redundancia): capacidad de detección D = 2 y corrección C = 0.',
    entradas: {
      D: { valor: 2, multiplo: '' },
      C: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 3, multiplo: '' },
    pagina: '46',
  },
  {
    formulaId: 'U06-F08',
    enunciado:
      'Mínima distancia de un código con H = 3 (caso de Redundancia): capacidad de detección D = 1 y corrección C = 1.',
    entradas: {
      D: { valor: 1, multiplo: '' },
      C: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 3, multiplo: '' },
    pagina: '46',
  },
  {
    formulaId: 'U06-F08',
    enunciado:
      'Mínima distancia de un código con H = 4: capacidad de detección D = 3 y corrección C = 0.',
    entradas: {
      D: { valor: 3, multiplo: '' },
      C: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 4, multiplo: '' },
    pagina: '46',
  },
  {
    formulaId: 'U06-F08',
    enunciado:
      'Mínima distancia de un código con H = 4: capacidad de detección D = 2 y corrección C = 1.',
    entradas: {
      D: { valor: 2, multiplo: '' },
      C: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 4, multiplo: '' },
    pagina: '46',
  },
  {
    formulaId: 'U06-F09',
    enunciado:
      'Codificación Hamming: determinar la cantidad mínima de bits de paridad p para n = 4 bits de datos.',
    entradas: {
      n: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 3, multiplo: '' },
    pagina: '48',
  },
  {
    formulaId: 'U06-F09',
    enunciado:
      'Codificación Hamming: cantidad mínima de bits de paridad p para n = 3 bits de datos (admite longitud n+p = 6).',
    entradas: {
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: 3, multiplo: '' },
    pagina: '48',
  },
  {
    formulaId: 'U06-F09',
    enunciado:
      'Codificación Hamming: cantidad mínima de bits de paridad p para n = 11 bits de datos (límite superior para p = 4).',
    entradas: {
      n: { valor: 11, multiplo: '' },
    },
    esperado: { valor: 4, multiplo: '' },
    pagina: '48',
  },
  {
    formulaId: 'U06-F09',
    enunciado:
      'Codificación Hamming: cantidad mínima de bits de paridad p para n = 5 bits de datos (límite inferior para p = 4).',
    entradas: {
      n: { valor: 5, multiplo: '' },
    },
    esperado: { valor: 4, multiplo: '' },
    pagina: '48',
  },
  {
    formulaId: 'U06-F10',
    enunciado:
      'Codificación Hamming completa, caso SIN ERROR: datos n = 1001101 (7 bits) con p = 4 bits de paridad, síndrome p = [0, 0, 0, 0].',
    entradas: {
      p: { valores: [0, 0, 0, 0], multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '49',
  },
  {
    formulaId: 'U06-F10',
    enunciado:
      'Codificación Hamming, caso CON ERROR en bit 8: datos con p = 4 bits de paridad, síndrome p = [0, 0, 0, 1] (p4=1, p3=0, p2=0, p1=0).',
    entradas: {
      p: { valores: [0, 0, 0, 1], multiplo: '' },
    },
    esperado: { valor: 8, multiplo: '' },
    pagina: '50',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 6, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 *
 * U06-F04, U06-F05 y U06-F11 reciben palabras binarias o polinomios (entradas no numéricas).
 * El modelo de dominio actual sólo admite Variables numéricas, por lo que quedan en deuda.
 */
export const PENDIENTES_UNIDAD_06: readonly string[] = [
  'U06-F04', // Distancia de Hamming entre dos palabras (entrada no numérica: cadenas binarias/letras)
  'U06-F05', // Distancia mínima de un código (entrada no numérica: conjunto de cadenas binarias)
  'U06-F11', // CRC: resto y trama a transmitir (entrada no numérica: polinomios sobre GF(2))
];
