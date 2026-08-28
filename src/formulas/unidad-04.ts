import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 4 — Teoría de la Información y Codificación.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad.
 */

const U04_F01: Formula = {
  id: 'U04-F01',
  unidad: 4,
  nombre: 'Autoinformación (cantidad de información de un evento o símbolo)',
  expresion: 'I_A = log₂(1 / P_A) = −log₂(P_A)',
  entradas: [
    {
      simbolo: 'P_A',
      significado: 'Probabilidad de ocurrencia del evento o símbolo A',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'I_A',
    significado: 'Autoinformación asociada al evento o símbolo A',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Vale para un solo evento o mensaje independiente. Requiere 0 < P_A ≤ 1: con P_A = 1 (suceso seguro) ' +
    'da I = 0 y con P_A = 0 no está definida. La cátedra utiliza siempre logaritmo en base 2 (resultado en bits).',
  paginas: '15, 16, 17, 18, 19, 21, 24, 49, 58',
  confianza: 'alta',
  calcular: ({ P_A }) => Math.log2(1 / P_A),
};

const U04_F02: Formula = {
  id: 'U04-F02',
  unidad: 4,
  nombre: 'Información total de un mensaje formado por símbolos independientes',
  expresion: 'I_{TOTAL} = Σ log₂(1 / P_i)',
  entradas: [
    {
      simbolo: 'P',
      significado: 'Probabilidad de cada símbolo que compone el mensaje (con repetición)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'I_{TOTAL}',
    significado: 'Información total contenida en el mensaje completo',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Suma sobre una lista de términos. Solo si los símbolos son estadísticamente independientes ' +
    '(fuente de memoria nula). Si un símbolo se repite en el mensaje, su probabilidad se ingresa ' +
    'tantas veces como aparece.',
  paginas: '17, 18',
  confianza: 'alta',
  calcular: (_, { P }) => P.reduce((acc, p) => (p > 0 ? acc + Math.log2(1 / p) : acc), 0),
};

const U04_F03: Formula = {
  id: 'U04-F03',
  unidad: 4,
  nombre: 'Normalización: la suma de las probabilidades de la fuente vale 1',
  expresion: 'Σ P_i = 1',
  entradas: [],
  salida: {
    simbolo: 'Σ P_i',
    significado: 'Suma de las probabilidades de la fuente',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Condición de normalización para el conjunto completo y exhaustivo de los N símbolos de la fuente. ' +
    'La probabilidad nunca puede ser negativa y su suma debe ser exactamente 1. Ficha de consulta: no es una fórmula de cálculo.',
  paginas: '12, 23, 29',
  confianza: 'alta',
  calcular: () => 1,
};

const U04_F04: Formula = {
  id: 'U04-F04',
  unidad: 4,
  nombre: 'Información aportada por el símbolo j en una secuencia de L símbolos',
  expresion: 'I_{j,L} = L · P_j · log₂(1 / P_j)',
  entradas: [
    {
      simbolo: 'L',
      significado: 'Longitud de la secuencia transmitida (cantidad total de símbolos)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'P_j',
      significado: 'Probabilidad de ocurrencia del símbolo j',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'I_{j,L}',
    significado: 'Información asociada al símbolo j en la secuencia de longitud L',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Aproximación válida solo para secuencias largas (L ≫ 1), donde el símbolo j ocurre ' +
    'aproximadamente L · P_j veces. Requiere 0 < P_j ≤ 1.',
  paginas: '24',
  confianza: 'alta',
  calcular: ({ L, P_j }) => L * P_j * Math.log2(1 / P_j),
};

const U04_F05: Formula = {
  id: 'U04-F05',
  unidad: 4,
  nombre: 'Información total contenida en una secuencia larga de L símbolos',
  expresion: 'I_T = L · Σ P_j · log₂(1 / P_j)',
  entradas: [
    {
      simbolo: 'L',
      significado: 'Cantidad total de símbolos en la secuencia',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'P',
      significado: 'Probabilidad de ocurrencia de cada símbolo de la fuente',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'I_T',
    significado: 'Información total contenida en la secuencia de L símbolos',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'Suma sobre una lista de términos. Válida para secuencias largas (L ≫ 1) de símbolos distintos ' +
    'e independientes. Equivale a I_T = L · H. Los términos con P_j = 0 se toman como 0.',
  paginas: '25, 26',
  confianza: 'alta',
  calcular: ({ L }, { P }) =>
    L * P.reduce((h, p) => (p > 0 ? h + p * Math.log2(1 / p) : h), 0),
};

const U04_F06: Formula = {
  id: 'U04-F06',
  unidad: 4,
  nombre: 'Entropía de la fuente (información promedio por símbolo)',
  expresion: 'H = Σ P_j · log₂(1 / P_j)',
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
    significado: 'Entropía de la fuente: información promedio por símbolo',
    unidadDeMedida: 'bit/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Supone una fuente discreta con N símbolos distintos e INDEPENDIENTES (fuente de memoria nula) ' +
    'y que la suma de las probabilidades da 1. Los términos con P_j = 0 se toman como 0. Está acotada ' +
    'por 0 ≤ H ≤ log₂(N): vale 0 si un símbolo tiene probabilidad 1, y es máxima con símbolos ' +
    'equiprobables. Los P_j individuales no se despejan en forma cerrada, porque quedan dentro de la ' +
    'suma y del logaritmo. En las diapositivas se escribe «log» sin base, pero siempre es log₂.',
  paginas: '25, 26, 27, 28, 29, 33, 37, 38, 46, 47, 48, 49, 50, 52, 53, 58',
  confianza: 'alta',
  // El término con P_j = 0 se toma como 0, según las condiciones de la cátedra:
  // sin ese caso, log₂(1/0) sería infinito y arrastraría toda la suma.
  calcular: (_, { P }) => P.reduce((h, p) => (p > 0 ? h + p * Math.log2(1 / p) : h), 0),
};

const U04_F07: Formula = {
  id: 'U04-F07',
  unidad: 4,
  nombre: 'Entropía máxima (fuente con símbolos equiprobables)',
  expresion: 'H_{MAX} = log₂ N',
  entradas: [
    {
      simbolo: 'N',
      significado: 'Número de símbolos o mensajes distintos que produce la fuente',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'H_{MAX}',
    significado: 'Entropía máxima de la fuente (información promedio por símbolo con equiprobabilidad)',
    unidadDeMedida: 'bit/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Vale solo cuando todos los símbolos son equiprobables (P_1 = P_2 = ... = P_N = 1/N). ' +
    'Es la cota superior de la entropía para cualquier fuente de N símbolos: 0 ≤ H ≤ log₂(N). Requiere N ≥ 2.',
  paginas: '27, 28, 29, 33, 46, 47, 48',
  confianza: 'alta',
  calcular: ({ N }) => Math.log2(N),
};

const U04_F08: Formula = {
  id: 'U04-F08',
  unidad: 4,
  nombre: 'Redundancia de una fuente (porcentual)',
  expresion: 'Rd% = ((H_{MAX} − H) / H_{MAX}) · 100',
  entradas: [
    {
      simbolo: 'H_MAX',
      significado: 'Entropía máxima de la fuente (log₂ N)',
      unidadDeMedida: 'bit/símbolo',
      multiploCanonico: '',
    },
    {
      simbolo: 'H',
      significado: 'Entropía real de la fuente',
      unidadDeMedida: 'bit/símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'Rd',
    significado: 'Redundancia porcentual de la fuente',
    unidadDeMedida: '%',
    multiploCanonico: '',
  },
  condiciones:
    'H y H_MAX deben estar en la misma unidad (bit/símbolo) y corresponder a la misma fuente. ' +
    'Requiere H_MAX > 0 (N ≥ 2). El resultado está acotado entre 0% (fuente equiprobable, sin redundancia) ' +
    'y 100% (fuente totalmente predecible, H = 0).',
  paginas: '33',
  confianza: 'alta',
  calcular: ({ H_MAX, H }) => ((H_MAX - H) / H_MAX) * 100,
};

const U04_F09: Formula = {
  id: 'U04-F09',
  unidad: 4,
  nombre: 'Duración promedio del símbolo',
  expresion: 'σ̄ = Σ P_j · σ_j',
  entradas: [
    {
      simbolo: 'P',
      significado: 'Probabilidad de ocurrencia de cada símbolo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
    {
      simbolo: 'sigma',
      significado: 'Duración de cada símbolo',
      unidadDeMedida: 's',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'σ̄',
    significado: 'Duración promedio del símbolo',
    unidadDeMedida: 's/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Suma sobre una lista de términos. Se usa cuando los símbolos tienen distinta duración ' +
    '(ej. punto y raya del telégrafo). Requiere que las listas P y σ tengan la misma longitud ' +
    'y que la suma de probabilidades sea 1.',
  paginas: '35, 36, 37',
  confianza: 'alta',
  calcular: (_, { P, sigma }) =>
    P.reduce((acc, p, i) => acc + p * (sigma[i] ?? 0), 0),
};

const U04_F10: Formula = {
  id: 'U04-F10',
  unidad: 4,
  nombre: 'Tasa de información de una fuente discreta',
  expresion: 'R = H / σ̄',
  entradas: [
    {
      simbolo: 'H',
      significado: 'Entropía de la fuente',
      unidadDeMedida: 'bit/símbolo',
      multiploCanonico: '',
    },
    {
      simbolo: 'sigma_prom',
      significado: 'Duración promedio del símbolo',
      unidadDeMedida: 's/símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Tasa (velocidad) de información media de la fuente',
    unidadDeMedida: 'bit/s',
    multiploCanonico: '',
  },
  condiciones:
    'Forma general, válida también cuando los símbolos tienen distinta duración (σ̄ se calcula con U04-F09). ' +
    'Describe la fuente en bits/segundo. Requiere σ̄ > 0.',
  paginas: '35, 36, 37',
  confianza: 'alta',
  calcular: ({ H, sigma_prom }) => H / sigma_prom,
};

const U04_F11: Formula = {
  id: 'U04-F11',
  unidad: 4,
  nombre: 'Velocidad de símbolos (símbolos por segundo)',
  expresion: 'r = 1 / T_s',
  entradas: [
    {
      simbolo: 'T_s',
      significado: 'Duración de cada símbolo',
      unidadDeMedida: 's/símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'r',
    significado: 'Velocidad de símbolos emitidos por unidad de tiempo',
    unidadDeMedida: 'símbolo/s',
    multiploCanonico: '',
  },
  condiciones:
    'Válida solo si todos los símbolos tienen la misma duración. La cátedra escribe indistintamente ' +
    'la duración como σ o T_S. Requiere T_s > 0.',
  paginas: '37',
  confianza: 'alta',
  calcular: ({ T_s }) => 1 / T_s,
};

const U04_F12: Formula = {
  id: 'U04-F12',
  unidad: 4,
  nombre: 'Tasa de información con símbolos de igual duración',
  expresion: 'R = r · H = H / T_s',
  entradas: [
    {
      simbolo: 'r',
      significado: 'Velocidad de emisión de símbolos (1/T_s)',
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
    'Supone que todos los símbolos tienen la misma duración σ = T_s (r = 1/T_s). ' +
    'Si las duraciones difieren, se debe calcular la duración promedio σ̄ y usar U04-F10.',
  paginas: '37, 38',
  confianza: 'alta',
  calcular: ({ r, H }) => r * H,
};

const U04_F13: Formula = {
  id: 'U04-F13',
  unidad: 4,
  nombre: 'Tasa de información con símbolos equiprobables e igual duración',
  expresion: 'R = r · log₂ N = (1 / T_s) · log₂ N',
  entradas: [
    {
      simbolo: 'r',
      significado: 'Velocidad de símbolos (1/T_s)',
      unidadDeMedida: 'símbolo/s',
      multiploCanonico: '',
    },
    {
      simbolo: 'N',
      significado: 'Número de símbolos distintos de la fuente',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Tasa de información máxima de la fuente',
    unidadDeMedida: 'bit/s',
    multiploCanonico: '',
  },
  condiciones:
    'Doble supuesto: símbolos equiprobables (H = log₂ N) y todos de la misma duración (r = 1/T_s). ' +
    'Es la tasa máxima alcanzable por esa fuente. Requiere N ≥ 2 y r > 0.',
  paginas: '37',
  confianza: 'alta',
  calcular: ({ r, N }) => r * Math.log2(N),
};

const U04_F14: Formula = {
  id: 'U04-F14',
  unidad: 4,
  nombre: 'Longitud promedio de la palabra código',
  expresion: 'L̄ = Σ P_i · L_i',
  entradas: [
    {
      simbolo: 'P',
      significado: 'Probabilidad de ocurrencia de cada símbolo',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
      esLista: true,
    },
    {
      simbolo: 'L',
      significado: 'Longitud en dígitos binarios de cada palabra código',
      unidadDeMedida: 'dígito/símbolo',
      multiploCanonico: '',
      esLista: true,
    },
  ],
  salida: {
    simbolo: 'L̄',
    significado: 'Longitud promedio de la palabra código',
    unidadDeMedida: 'dígito/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Suma sobre una lista de términos. Requiere que las listas P y L tengan la misma longitud ' +
    'y que la suma de probabilidades sea 1. Por el teorema de Shannon, siempre se cumple L̄ ≥ H(x).',
  paginas: '51, 52, 53, 54, 55, 56, 59, 65',
  confianza: 'alta',
  calcular: (_, { P, L }) =>
    P.reduce((acc, p, i) => acc + p * (L[i] ?? 0), 0),
};

const U04_F15: Formula = {
  id: 'U04-F15',
  unidad: 4,
  nombre: 'Longitud promedio del código a partir de los bits totales transmitidos',
  expresion: 'L̄ = B_{total} / n',
  entradas: [
    {
      simbolo: 'B_total',
      significado: 'Cantidad total de bits utilizados para codificar el mensaje',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
    {
      simbolo: 'n',
      significado: 'Cantidad de símbolos del mensaje codificado',
      unidadDeMedida: 'símbolo',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'L̄',
    significado: 'Longitud promedio de la palabra código',
    unidadDeMedida: 'dígito/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Se aplica a un mensaje concreto ya codificado del que se conoce el total de bits emitidos ' +
    'y la cantidad de símbolos. Requiere n > 0.',
  paginas: '50, 52',
  confianza: 'media',
  calcular: ({ B_total, n }) => B_total / n,
};

const U04_F16: Formula = {
  id: 'U04-F16',
  unidad: 4,
  nombre: 'Eficiencia del codificador de fuente',
  expresion: 'η = H(x) / L̄',
  // El catálogo escribe `H(x)` y `\\bar{L}`; ninguno liga con un campo de la app.
  expresionLatex: '\\eta = \\frac{H}{L_{prom}}',
  entradas: [
    {
      simbolo: 'H',
      significado: 'Entropía de la fuente',
      unidadDeMedida: 'bit/símbolo',
      multiploCanonico: '',
    },
    {
      simbolo: 'L_prom',
      significado: 'Longitud promedio de la palabra código',
      unidadDeMedida: 'dígito/símbolo',
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
    'Como L̄ ≥ H(x) por el teorema de codificación de Shannon, η nunca supera 1 (η = 1 en el codificador ' +
    'óptimo/compacto ideal). Se expresa en tanto por uno (multiplicar por 100 para porcentaje). Requiere L̄ > 0.',
  paginas: '51',
  confianza: 'alta',
  calcular: ({ H, L_prom }) => H / L_prom,
};

export const FORMULAS_UNIDAD_04: readonly Formula[] = [
  U04_F01,
  U04_F02,
  U04_F03,
  U04_F04,
  U04_F05,
  U04_F06,
  U04_F07,
  U04_F08,
  U04_F09,
  U04_F10,
  U04_F11,
  U04_F12,
  U04_F13,
  U04_F14,
  U04_F15,
  U04_F16,
];

export const EJEMPLOS_UNIDAD_04: readonly EjemploResuelto[] = [
  {
    formulaId: 'U04-F01',
    enunciado:
      'Ejemplo 01 (cara): arrojar una moneda no defectuosa al aire y observar el resultado cara.',
    entradas: { P_A: { valor: 0.5, multiplo: '' } },
    esperado: { valor: 1, multiplo: '' },
    pagina: '16',
  },
  {
    formulaId: 'U04-F01',
    enunciado:
      'Ejemplo 01 (seca): arrojar una moneda no defectuosa al aire y observar el resultado seca.',
    entradas: { P_A: { valor: 0.5, multiplo: '' } },
    esperado: { valor: 1, multiplo: '' },
    pagina: '16',
  },
  {
    formulaId: 'U04-F01',
    enunciado:
      'Ejemplo 02: experimento aleatorio con 16 resultados/eventos igualmente probables (P = 1/16).',
    entradas: { P_A: { valor: 0.0625, multiplo: '' } },
    esperado: { valor: 4, multiplo: '' },
    pagina: '17',
  },
  {
    formulaId: 'U04-F02',
    enunciado:
      'Ejemplo 03: una fuente de memoria nula genera dos símbolos; determinar la autoinformación total con P_A = 1/4 y P_B = 3/4.',
    entradas: { P: { valores: [0.25, 0.75], multiplo: '' } },
    esperado: { valor: 2.414, multiplo: '' },
    pagina: '17',
    // La diapositiva redondea: log2(4) + log2(4/3) = 2 + 0,4150 = 2,4150.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F02',
    enunciado:
      'Ejemplo 04: una fuente produce los símbolos A, B, C y D independientes. Calcular la autoinformación del mensaje BACA.',
    entradas: { P: { valores: [0.25, 0.5, 0.125, 0.5], multiplo: '' } },
    esperado: { valor: 7, multiplo: '' },
    pagina: '18',
  },
  {
    formulaId: 'U04-F01',
    enunciado:
      'Ejemplo 05: se lanza una moneda tres veces seguidas (8 mensajes equiprobables, P = 1/8).',
    entradas: { P_A: { valor: 0.125, multiplo: '' } },
    esperado: { valor: 3, multiplo: '' },
    pagina: '18',
  },
  {
    formulaId: 'U04-F04',
    enunciado:
      'Información aportada por el símbolo j en una secuencia de L = 1000 símbolos con P_j = 0,5.',
    entradas: {
      L: { valor: 1000, multiplo: '' },
      P_j: { valor: 0.5, multiplo: '' },
    },
    esperado: { valor: 500, multiplo: '' },
    pagina: '24',
  },
  {
    formulaId: 'U04-F05',
    enunciado:
      'Información total contenida en una secuencia de L = 1000 símbolos con entropía H = 1,75 bit/símbolo.',
    entradas: {
      L: { valor: 1000, multiplo: '' },
      P: { valores: [0.5, 0.25, 0.125, 0.125], multiplo: '' },
    },
    esperado: { valor: 1750, multiplo: '' },
    pagina: '25',
  },
  {
    formulaId: 'U04-F06',
    enunciado:
      'Ejemplo 07: una fuente produce cuatro símbolos A, B, C y D; calcular la entropía de la fuente.',
    entradas: { P: { valores: [0.5, 0.25, 0.125, 0.125], multiplo: '' } },
    esperado: { valor: 1.75, multiplo: '' },
    pagina: '28',
  },
  {
    formulaId: 'U04-F07',
    enunciado:
      'Ejemplo 08: información producida por una máquina de escribir de 26 letras más el espacio (N = 27).',
    entradas: { N: { valor: 27, multiplo: '' } },
    esperado: { valor: 4.75, multiplo: '' },
    pagina: '28',
    // La diapositiva redondea: log2(27) = 4,7549.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F07',
    enunciado:
      'Ejemplo 09 (a): entropía asociada a un dado equilibrado (N = 6 caras equiprobables).',
    entradas: { N: { valor: 6, multiplo: '' } },
    esperado: { valor: 2.58, multiplo: '' },
    pagina: '29',
    // La diapositiva redondea: log2(6) = 2,5850.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F06',
    enunciado:
      'Ejemplo 09 (b): entropía de un dado manipulado, con las caras 1 y 6 al doble de probabilidad ' +
      'que las otras cuatro.',
    entradas: { P: { valores: [0.25, 0.125, 0.125, 0.125, 0.125, 0.25], multiplo: '' } },
    esperado: { valor: 2.5, multiplo: '' },
    pagina: '29',
  },
  {
    formulaId: 'U04-F08',
    enunciado:
      'Ejemplo 10: redundancia de una fuente binaria con H = 0,811 bit/símbolo y H_MAX = 1 bit/símbolo.',
    entradas: {
      H_MAX: { valor: 1, multiplo: '' },
      H: { valor: 0.811, multiplo: '' },
    },
    esperado: { valor: 18.9, multiplo: '' },
    pagina: '33',
    apartamiento:
      'La diapositiva 33 informa Rd = 20% como valor redondeado; el cálculo numérico directo con ' +
      'H = 0,811 da 18,9% (y con H exacto da 18,87%). Se implementa el valor correcto.',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F09',
    enunciado:
      'Ejemplo 11 (duración promedio): fuente telegráfica con punto (P = 2/3, σ = 0,2 s) y raya (P = 1/3, σ = 0,4 s).',
    entradas: {
      P: { valores: [2 / 3, 1 / 3], multiplo: '' },
      sigma: { valores: [0.2, 0.4], multiplo: '' },
    },
    esperado: { valor: 0.267, multiplo: '' },
    pagina: '36',
    // La diapositiva redondea: (2/3)*0,2 + (1/3)*0,4 = 0,2667 s/símbolo.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F10',
    enunciado:
      'Ejemplo 11 (tasa de información): fuente telegráfica con H = 0,92 bit/símbolo y σ̄ = 0,267 s/símbolo.',
    entradas: {
      H: { valor: 0.92, multiplo: '' },
      sigma_prom: { valor: 0.267, multiplo: '' },
    },
    esperado: { valor: 3.44, multiplo: '' },
    pagina: '36',
    // La diapositiva da 0,920 / 0,267 = 3,44 bit/s.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F11',
    enunciado:
      'Ejemplo 12 (velocidad de símbolos): duración de símbolo T_s = 1 ms.',
    entradas: {
      T_s: { valor: 1, multiplo: 'm' },
    },
    esperado: { valor: 1000, multiplo: '' },
    pagina: '37',
  },
  {
    formulaId: 'U04-F12',
    enunciado:
      'Ejemplo 12 (probabilidades distintas): fuente de cuatro símbolos a 1000 símbolos/s con H = 1,75 bit/símbolo.',
    entradas: {
      r: { valor: 1000, multiplo: '' },
      H: { valor: 1.75, multiplo: '' },
    },
    esperado: { valor: 1750, multiplo: '' },
    pagina: '38',
  },
  {
    formulaId: 'U04-F12',
    enunciado:
      'Ejemplo 12 (equiprobables): fuente de cuatro símbolos a 1000 símbolos/s con entropía máxima H = 2 bit/símbolo.',
    entradas: {
      r: { valor: 1000, multiplo: '' },
      H: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 2000, multiplo: '' },
    pagina: '38',
  },
  {
    formulaId: 'U04-F13',
    enunciado:
      'Ejemplo 12 (símbolos equiprobables e igual duración): N = 4 símbolos a velocidad r = 1000 símbolos/s.',
    entradas: {
      r: { valor: 1000, multiplo: '' },
      N: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 2000, multiplo: '' },
    pagina: '37',
  },
  {
    formulaId: 'U04-F07',
    enunciado:
      'Ejemplo 13: codificación de 10 dígitos decimales equiprobables usando dígitos binarios (N = 10).',
    entradas: { N: { valor: 10, multiplo: '' } },
    esperado: { valor: 3.32, multiplo: '' },
    pagina: '46',
    // La diapositiva redondea: log2(10) = 3,3219.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F15',
    enunciado:
      'Ejemplo 14 (longitud promedio por bits totales): mensaje de 8 símbolos codificado en 12 bits.',
    entradas: {
      B_total: { valor: 12, multiplo: '' },
      n: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 1.5, multiplo: '' },
    pagina: '50',
  },
  {
    formulaId: 'U04-F16',
    enunciado:
      'Ejemplo 14 (eficiencia del codificador): fuente con H = 1,5 bit/símbolo y longitud promedio L̄ = 1,5 dígitos/símbolo.',
    entradas: {
      H: { valor: 1.5, multiplo: '' },
      L_prom: { valor: 1.5, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '52',
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 14: longitud promedio para tres estados con probabilidades 0,5, 0,25, 0,25 y longitudes 1, 2, 2.',
    entradas: {
      P: { valores: [0.5, 0.25, 0.25], multiplo: '' },
      L: { valores: [1, 2, 2], multiplo: '' },
    },
    esperado: { valor: 1.5, multiplo: '' },
    pagina: '52',
  },
  {
    formulaId: 'U04-F06',
    enunciado:
      'Ejemplo 15: fuente discreta sin memoria X = {x0, x1, x2, x3}. Calcular la entropía.',
    entradas: { P: { valores: [0.7, 0.1, 0.1, 0.1], multiplo: '' } },
    esperado: { valor: 1.35, multiplo: '' },
    pagina: '53',
    // La diapositiva redondea a dos decimales: el valor exacto es 1,3568.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 15 (código C1): fuente X = {x0, x1, x2, x3} con palabras de longitud fija L = 2.',
    entradas: {
      P: { valores: [0.7, 0.1, 0.1, 0.1], multiplo: '' },
      L: { valores: [2, 2, 2, 2], multiplo: '' },
    },
    esperado: { valor: 2, multiplo: '' },
    pagina: '53',
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 15 (código C2): fuente X = {x0, x1, x2, x3} con longitudes 1, 3, 3, 3.',
    entradas: {
      P: { valores: [0.7, 0.1, 0.1, 0.1], multiplo: '' },
      L: { valores: [1, 3, 3, 3], multiplo: '' },
    },
    esperado: { valor: 1.6, multiplo: '' },
    pagina: '54',
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 15 (código C3): fuente X = {x0, x1, x2, x3} con longitudes 3, 3, 3, 1.',
    entradas: {
      P: { valores: [0.7, 0.1, 0.1, 0.1], multiplo: '' },
      L: { valores: [3, 3, 3, 1], multiplo: '' },
    },
    esperado: { valor: 2.8, multiplo: '' },
    pagina: '55',
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 15 (código C4, compacto): fuente X = {x0, x1, x2, x3} con longitudes 1, 2, 3, 3.',
    entradas: {
      P: { valores: [0.7, 0.1, 0.1, 0.1], multiplo: '' },
      L: { valores: [1, 2, 3, 3], multiplo: '' },
    },
    esperado: { valor: 1.5, multiplo: '' },
    pagina: '56',
  },
  {
    formulaId: 'U04-F06',
    enunciado:
      'Ejemplo 16: fuente continua discretizada con un cuantificador uniforme de 8 niveles.',
    entradas: {
      P: { valores: [0.2, 0.01, 0.4, 0.04, 0.1, 0.02, 0.07, 0.16], multiplo: '' },
    },
    esperado: { valor: 2.38, multiplo: '' },
    pagina: '58',
    // La diapositiva redondea a dos decimales: el valor exacto es 2,3820.
    tolerancia: 0.01,
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 16 (código C1): fuente cuantificada de 8 niveles con palabras de longitud fija 3.',
    entradas: {
      P: { valores: [0.2, 0.01, 0.4, 0.04, 0.1, 0.02, 0.07, 0.16], multiplo: '' },
      L: { valores: [3, 3, 3, 3, 3, 3, 3, 3], multiplo: '' },
    },
    esperado: { valor: 3, multiplo: '' },
    pagina: '59',
  },
  {
    formulaId: 'U04-F14',
    enunciado:
      'Ejemplo 16 (código C2, Huffman): fuente de 8 niveles con longitudes 1, 3, 3, 3, 4, 5, 6, 6.',
    entradas: {
      P: { valores: [0.4, 0.2, 0.16, 0.1, 0.07, 0.04, 0.02, 0.01], multiplo: '' },
      L: { valores: [1, 3, 3, 3, 4, 5, 6, 6], multiplo: '' },
    },
    esperado: { valor: 2.44, multiplo: '' },
    pagina: '65',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 4, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_04: readonly string[] = [];

