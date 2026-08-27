import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 3 — Atenuación, Distorsión y Ruido.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

export const FORMULAS_UNIDAD_03: readonly Formula[] = [];

export const EJEMPLOS_UNIDAD_03: readonly EjemploResuelto[] = [];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 3, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_03: readonly string[] = [
  'U03-F01', 'U03-F02', 'U03-F03', 'U03-F04', 'U03-F05', 'U03-F06',
  'U03-F07', 'U03-F08', 'U03-F09', 'U03-F10', 'U03-F11', 'U03-F12',
  'U03-F13', 'U03-F14', 'U03-F15', 'U03-F16', 'U03-F17',
];
