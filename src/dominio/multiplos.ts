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
 * Clasificación explícita de cada Unidad de medida del catálogo según si admite
 * prefijos métricos del SI (p, n, µ, m, k, M, G, T).
 *
 * No admiten prefijo:
 * - Logarítmicas (dB, dBm, dBi, dB/km): un prefijo SI carece de sentido físico.
 * - Porcentaje (%) y magnitudes adimensionales: nunca llevan prefijo.
 * - Grados Celsius (°C): escala con cero desplazado.
 * - Magnitudes «por símbolo» y razones discretas (bit/símbolo, dígito/símbolo,
 *   dígitos binarios/símbolo, s/símbolo, bit/Hz, bit/baudio, bit/muestra,
 *   dígitos binarios, símbolo).
 * - Unidades con exponente (s²): el prefijo se elevaría al cuadrado (1 µs² ≠ 10⁻⁶ s²).
 *
 * Un test en `multiplos.test.ts` falla si aparece en el catálogo una Unidad de medida
 * que no figure en esta tabla.
 */
export const PREFIJO_POR_UNIDAD: Readonly<Record<string, boolean>> = {
  // Unidades físicas lineales que admiten prefijos del SI
  '1/s': true,
  Baud: true,
  Bd: true,
  Hz: true,
  J: true,
  'J/K': true,
  K: true,
  V: true,
  'V·s': true,
  W: true,
  'W/Hz': true,
  bit: true,
  'bit/s': true,
  bps: true,
  m: true,
  'm/s': true,
  rad: true,
  'rad/s': true,
  s: true,
  'símbolo/s': true,

  // Logarítmicas
  dB: false,
  'dB/km': false,
  dBi: false,
  dBm: false,

  // Porcentaje, adimensional y temperatura con cero desplazado
  '%': false,
  adimensional: false,
  '°C': false,

  // Magnitudes «por símbolo» y razones discretas
  'bit/Hz': false,
  'bit/baudio': false,
  'bit/muestra': false,
  'bit/símbolo': false,
  'dígito/símbolo': false,
  'dígitos binarios': false,
  'dígitos binarios/símbolo': false,
  's/símbolo': false,
  símbolo: false,

  // Unidades con exponente
  's²': false,
};

/**
 * Indica si una Unidad de medida admite prefijos SI (m, k, M, …).
 *
 * Reutilizable desde la pantalla de Fórmula, el diagnóstico del guía y la gráfica:
 * cualquier Unidad de medida que devuelva `false` se muestra y se carga siempre en
 * su forma base, sin prefijo ni selector de múltiplos. Una unidad no clasificada
 * devuelve `false` por seguridad.
 */
export function admitePrefijo(unidadDeMedida: string): boolean {
  return PREFIJO_POR_UNIDAD[unidadDeMedida] === true;
}

/**
 * Elige el múltiplo que deja la parte entera del número entre 1 y 999.
 *
 * Es lo que convierte 83500000 Hz en «83,5 MHz» en vez de en notación científica.
 * Si se pasa `unidadDeMedida` y ésta no admite prefijos SI (`!admitePrefijo`),
 * devuelve `''` para mantener el valor sin escalar.
 */
export function elegirMultiplo(valorCanonico: number, unidadDeMedida?: string): Multiplo {
  if (unidadDeMedida !== undefined && !admitePrefijo(unidadDeMedida)) return '';
  if (!Number.isFinite(valorCanonico) || valorCanonico === 0) return '';

  const absoluto = Math.abs(valorCanonico);
  for (let i = MULTIPLOS.length - 1; i >= 0; i--) {
    const multiplo = MULTIPLOS[i];
    if (absoluto / FACTOR[multiplo] >= 1) return multiplo;
  }

  // Más chico que pico: se muestra en pico igual, antes que en notación científica.
  return MULTIPLOS[0];
}
