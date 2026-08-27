import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 6 — Errores en la Transmisión de Datos.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

export const FORMULAS_UNIDAD_06: readonly Formula[] = [];

export const EJEMPLOS_UNIDAD_06: readonly EjemploResuelto[] = [];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 6, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_06: readonly string[] = [
  'U06-F01', 'U06-F02', 'U06-F03', 'U06-F04', 'U06-F05', 'U06-F06',
  'U06-F07', 'U06-F08', 'U06-F09', 'U06-F10', 'U06-F11',
];
