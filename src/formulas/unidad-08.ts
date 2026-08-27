import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 8 — Modulación y Multiplexación de Señales.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

export const FORMULAS_UNIDAD_08: readonly Formula[] = [];

export const EJEMPLOS_UNIDAD_08: readonly EjemploResuelto[] = [];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 8, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_08: readonly string[] = [
  'U08-F01', 'U08-F02', 'U08-F03', 'U08-F04', 'U08-F05', 'U08-F06',
  'U08-F07', 'U08-F08', 'U08-F09', 'U08-F10', 'U08-F11', 'U08-F12',
  'U08-F13', 'U08-F14', 'U08-F15', 'U08-F16', 'U08-F17', 'U08-F18',
  'U08-F19', 'U08-F20', 'U08-F21',
];
