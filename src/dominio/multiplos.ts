/**
 * Múltiplos del SI.
 *
 * Este archivo existe por una razón concreta: cargar MHz donde la fórmula espera Hz
 * da un resultado un millón de veces mayor sin ningún síntoma visible. La conversión
 * vive acá, en un solo lugar, y el motor de cálculo la aplica siempre.
 */

export type Multiplo = 'p' | 'n' | 'µ' | 'm' | '' | 'k' | 'M' | 'G' | 'T';

/** De menor a mayor. El orden importa: `elegirMultiplo` lo recorre. */
export const MULTIPLOS: readonly Multiplo[] = ['p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T'];

export const FACTOR: Readonly<Record<Multiplo, number>> = {
  p: 1e-12,
  n: 1e-9,
  µ: 1e-6,
  m: 1e-3,
  '': 1,
  k: 1e3,
  M: 1e6,
  G: 1e9,
  T: 1e12,
};

/** Cómo se escribe el múltiplo delante de la Unidad de medida: 'G' + 'Hz' = 'GHz'. */
export function conMultiplo(multiplo: Multiplo, unidadDeMedida: string): string {
  return `${multiplo}${unidadDeMedida}`;
}

/** Lleva un valor cargado por quien usa la app a la Unidad de medida canónica. */
export function aCanonico(valor: number, multiplo: Multiplo): number {
  return valor * FACTOR[multiplo];
}

/** Lleva un valor canónico al múltiplo pedido, para mostrarlo. */
export function desdeCanonico(valorCanonico: number, multiplo: Multiplo): number {
  return valorCanonico / FACTOR[multiplo];
}

/**
 * Elige el múltiplo que deja la parte entera del número entre 1 y 999.
 *
 * Es lo que convierte 83500000 Hz en «83,5 MHz» en vez de en notación científica.
 */
export function elegirMultiplo(valorCanonico: number): Multiplo {
  if (!Number.isFinite(valorCanonico) || valorCanonico === 0) return '';

  const absoluto = Math.abs(valorCanonico);
  for (let i = MULTIPLOS.length - 1; i >= 0; i--) {
    const multiplo = MULTIPLOS[i];
    if (absoluto / FACTOR[multiplo] >= 1) return multiplo;
  }

  // Más chico que pico: se muestra en pico igual, antes que en notación científica.
  return MULTIPLOS[0];
}
