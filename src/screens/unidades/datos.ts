/**
 * Información estática de las diez Unidades de la materia Comunicaciones.
 *
 * Los temas y la numeración fueron copiados fielmente del índice de
 * `docs/research/formulas-comunicaciones.md`.
 */

export interface InfoUnidad {
  readonly numero: number;
  readonly tema: string;
  readonly nota?: string;
}

export const UNIDADES: readonly InfoUnidad[] = [
  {
    numero: 1,
    tema: 'Sistemas de Comunicación',
    nota: 'Unidad introductoria sin fórmulas calculables (verificado en sus 79 páginas).',
  },
  {
    numero: 2,
    tema: 'Análisis de las Señales (Fourier, filtros)',
  },
  {
    numero: 3,
    tema: 'Atenuación, Distorsión y Ruido',
  },
  {
    numero: 4,
    tema: 'Teoría de la Información y Codificación',
  },
  {
    numero: 5,
    tema: 'Canales de Comunicaciones',
  },
  {
    numero: 6,
    tema: 'Errores en la Transmisión de Datos',
  },
  {
    numero: 7,
    tema: 'Técnicas de transmisión de la información',
  },
  {
    numero: 8,
    tema: 'Modulación y Multiplexación de Señales',
  },
  {
    numero: 9,
    tema: 'Equipos de Comunicación de Datos (DCE)',
  },
  {
    numero: 10,
    tema: 'Capa Física de Redes de Datos',
  },
];

export function obtenerUnidad(numero: number): InfoUnidad | undefined {
  return UNIDADES.find((unidad) => unidad.numero === numero);
}
