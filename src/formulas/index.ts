import type { EjemploResuelto, Formula } from '@/dominio/formula';

import { EJEMPLOS_UNIDAD_02, FORMULAS_UNIDAD_02, PENDIENTES_UNIDAD_02 } from './unidad-02';
import { EJEMPLOS_UNIDAD_03, FORMULAS_UNIDAD_03, PENDIENTES_UNIDAD_03 } from './unidad-03';
import { EJEMPLOS_UNIDAD_04, FORMULAS_UNIDAD_04, PENDIENTES_UNIDAD_04 } from './unidad-04';
import { EJEMPLOS_UNIDAD_05, FORMULAS_UNIDAD_05, PENDIENTES_UNIDAD_05 } from './unidad-05';
import { EJEMPLOS_UNIDAD_06, FORMULAS_UNIDAD_06, PENDIENTES_UNIDAD_06 } from './unidad-06';
import { EJEMPLOS_UNIDAD_07, FORMULAS_UNIDAD_07, PENDIENTES_UNIDAD_07 } from './unidad-07';
import { EJEMPLOS_UNIDAD_08, FORMULAS_UNIDAD_08, PENDIENTES_UNIDAD_08 } from './unidad-08';
import { EJEMPLOS_UNIDAD_09, FORMULAS_UNIDAD_09, PENDIENTES_UNIDAD_09 } from './unidad-09';
import { EJEMPLOS_UNIDAD_10, FORMULAS_UNIDAD_10, PENDIENTES_UNIDAD_10 } from './unidad-10';

/**
 * El registro único de Fórmulas de la app.
 *
 * Las nueve Unidades con Fórmulas ya están enganchadas acá, cada una con su archivo,
 * aunque todavía estén vacías. **Este archivo no se toca al cargar una Unidad**: se
 * edita únicamente `unidad-NN.ts`. Está hecho así a propósito, para que varias
 * Unidades se puedan cargar en paralelo sin pisarse.
 *
 * Unidad 1 no aparece porque tiene 0 Fórmulas: se releyó su Presentación completa
 * (79 páginas) y no contiene ninguna fórmula calculable. Es la unidad introductoria.
 * El hueco está verificado, no asumido.
 */

export const FORMULAS: readonly Formula[] = [
  ...FORMULAS_UNIDAD_02,
  ...FORMULAS_UNIDAD_03,
  ...FORMULAS_UNIDAD_04,
  ...FORMULAS_UNIDAD_05,
  ...FORMULAS_UNIDAD_06,
  ...FORMULAS_UNIDAD_07,
  ...FORMULAS_UNIDAD_08,
  ...FORMULAS_UNIDAD_09,
  ...FORMULAS_UNIDAD_10,
];

export const EJEMPLOS_RESUELTOS: readonly EjemploResuelto[] = [
  ...EJEMPLOS_UNIDAD_02,
  ...EJEMPLOS_UNIDAD_03,
  ...EJEMPLOS_UNIDAD_04,
  ...EJEMPLOS_UNIDAD_05,
  ...EJEMPLOS_UNIDAD_06,
  ...EJEMPLOS_UNIDAD_07,
  ...EJEMPLOS_UNIDAD_08,
  ...EJEMPLOS_UNIDAD_09,
  ...EJEMPLOS_UNIDAD_10,
];

/** La deuda de cobertura de todas las Unidades, que el invariante usa como referencia. */
export const PENDIENTES_DE_CARGA: readonly string[] = [
  ...PENDIENTES_UNIDAD_02,
  ...PENDIENTES_UNIDAD_03,
  ...PENDIENTES_UNIDAD_04,
  ...PENDIENTES_UNIDAD_05,
  ...PENDIENTES_UNIDAD_06,
  ...PENDIENTES_UNIDAD_07,
  ...PENDIENTES_UNIDAD_08,
  ...PENDIENTES_UNIDAD_09,
  ...PENDIENTES_UNIDAD_10,
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
