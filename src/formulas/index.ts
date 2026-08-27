import type { EjemploResuelto, Formula } from '@/dominio/formula';

import { EJEMPLOS_UNIDAD_04, FORMULAS_UNIDAD_04 } from './unidad-04';
import { EJEMPLOS_UNIDAD_10, FORMULAS_UNIDAD_10 } from './unidad-10';

/**
 * El registro único de Fórmulas de la app.
 *
 * Cada Unidad aporta su archivo y se suma acá. Éste es el único lugar que hay que
 * tocar al incorporar una Unidad nueva.
 *
 * Unidad 1 no aparece porque tiene 0 Fórmulas: se releyó su Presentación completa
 * (79 páginas) y no contiene ninguna fórmula calculable. Es la unidad introductoria.
 * El hueco está verificado, no asumido.
 */

export const FORMULAS: readonly Formula[] = [...FORMULAS_UNIDAD_04, ...FORMULAS_UNIDAD_10];

export const EJEMPLOS_RESUELTOS: readonly EjemploResuelto[] = [
  ...EJEMPLOS_UNIDAD_04,
  ...EJEMPLOS_UNIDAD_10,
];

export function buscarFormula(id: string): Formula | undefined {
  return FORMULAS.find((formula) => formula.id === id);
}

export function formulasDeUnidad(unidad: number): readonly Formula[] {
  return FORMULAS.filter((formula) => formula.unidad === unidad);
}

export function ejemplosDeFormula(id: string): readonly EjemploResuelto[] {
  return EJEMPLOS_RESUELTOS.filter((ejemplo) => ejemplo.formulaId === id);
}
