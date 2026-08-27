import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 2 — Análisis de las Señales (Fourier, filtros).
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

export const FORMULAS_UNIDAD_02: readonly Formula[] = [];

export const EJEMPLOS_UNIDAD_02: readonly EjemploResuelto[] = [];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 2, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_02: readonly string[] = [
  'U02-F01', 'U02-F02', 'U02-F03', 'U02-F04', 'U02-F05', 'U02-F06',
  'U02-F07', 'U02-F08', 'U02-F09', 'U02-F10', 'U02-F11', 'U02-F12',
  'U02-F13', 'U02-F14', 'U02-F15', 'U02-F16', 'U02-F17', 'U02-F18',
  'U02-F19', 'U02-F20', 'U02-F21', 'U02-F22', 'U02-F23', 'U02-F24',
  'U02-F25', 'U02-F26', 'U02-F27', 'U02-F28', 'U02-F29',
];
