import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 10 — Capa Física de Redes de Datos.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. No agregar fórmulas desde conocimiento general de la
 * materia: si falta una, se decide primero si entra en alcance.
 *
 * Esta Unidad se completa en su ticket propio. Acá está sólo `U10-F07`, que es la
 * Fórmula con la que se estableció el patrón.
 */

const U10_F07: Formula = {
  id: 'U10-F07',
  unidad: 10,
  nombre: 'Ancho de banda de una banda de frecuencias (ISM / Wi-Fi)',
  expresion: 'AB = f_sup − f_inf',
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

export const FORMULAS_UNIDAD_10: readonly Formula[] = [U10_F07];

export const EJEMPLOS_UNIDAD_10: readonly EjemploResuelto[] = [
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
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 10, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_10: readonly string[] = [
  'U10-F01', 'U10-F02', 'U10-F03', 'U10-F04', 'U10-F05', 'U10-F06',
  'U10-F08',
];
