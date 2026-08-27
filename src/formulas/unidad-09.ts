import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 9 — Equipos de Comunicación de Datos (DCE).
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

export const FORMULAS_UNIDAD_09: readonly Formula[] = [];

export const EJEMPLOS_UNIDAD_09: readonly EjemploResuelto[] = [];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 9, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_09: readonly string[] = [
  'U09-F01', 'U09-F02', 'U09-F03', 'U09-F04', 'U09-F05', 'U09-F06',
  'U09-F07', 'U09-F08', 'U09-F09',
];
