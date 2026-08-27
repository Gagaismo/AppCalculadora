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

export const FORMULAS_UNIDAD_07: readonly Formula[] = [];

export const EJEMPLOS_UNIDAD_07: readonly EjemploResuelto[] = [];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 7, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_07: readonly string[] = [
  'U07-F01', 'U07-F02', 'U07-F03', 'U07-F04',
];
