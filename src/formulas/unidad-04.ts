import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 4 — Teoría de la Información y Codificación.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad.
 *
 * Esta Unidad se completa en su ticket propio. Acá está sólo `U04-F06`, que es la
 * Fórmula con la que se estableció el patrón de las Variables de lista.
 */

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

export const FORMULAS_UNIDAD_04: readonly Formula[] = [U04_F06];

export const EJEMPLOS_UNIDAD_04: readonly EjemploResuelto[] = [
  {
    formulaId: 'U04-F06',
    enunciado:
      'Ejemplo 07: una fuente produce cuatro símbolos A, B, C y D; calcular la entropía de la fuente.',
    entradas: { P: { valores: [0.5, 0.25, 0.125, 0.125], multiplo: '' } },
    esperado: { valor: 1.75, multiplo: '' },
    pagina: '28',
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
];
