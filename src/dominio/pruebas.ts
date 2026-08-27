import type { EjemploResuelto } from './formula';
import { calcular } from './motor';
import { conMultiplo, FACTOR, type Multiplo } from './multiplos';

/**
 * Soporte para los tests contra los Ejemplos resueltos.
 *
 * Cada Unidad transcribe sus Ejemplos resueltos como datos y los pasa por acá. La
 * lógica de comparación vive en un solo lugar, así ninguna Unidad inventa su propio
 * criterio de «da bien».
 */

/** Por defecto: 0,1 %. La cátedra redondea, pero no tanto. */
export const TOLERANCIA_POR_DEFECTO = 1e-3;

/**
 * Compara con tolerancia RELATIVA, no absoluta.
 *
 * Una tolerancia absoluta que sirve para 83,5 MHz es inútil para 3,33 GBaudios y
 * demasiado laxa para 0,25 dB. La relativa vale igual en toda la escala.
 */
export function esCercano(obtenido: number, esperado: number, tolerancia: number): boolean {
  if (esperado === 0) return Math.abs(obtenido) <= tolerancia;
  return Math.abs((obtenido - esperado) / esperado) <= tolerancia;
}

/**
 * Corre un Ejemplo resuelto contra el motor y devuelve el veredicto.
 *
 * Devuelve un objeto en vez de hacer la aserción para que el test que lo llama
 * pueda mostrar un mensaje que nombre la Fórmula y el enunciado: cuando fallan
 * varios a la vez, un `expect` pelado no dice cuál se rompió.
 */
export function verificarEjemplo(ejemplo: EjemploResuelto): {
  ok: boolean;
  detalle: string;
} {
  const resultado = calcular(ejemplo.formulaId, ejemplo.entradas);

  if (!resultado.ok) {
    return {
      ok: false,
      detalle: `${ejemplo.formulaId} (pág. ${ejemplo.pagina}): el motor devolvió el error «${resultado.error.tipo}».`,
    };
  }

  const tolerancia = ejemplo.tolerancia ?? TOLERANCIA_POR_DEFECTO;
  const esperadoEnSuMultiplo = ejemplo.esperado.valor;

  // Se compara en el múltiplo del Ejemplo resuelto, no en el que eligió el motor:
  // la cátedra escribe «83,5 MHz» y eso es lo que tiene que dar.
  const obtenido =
    resultado.multiplo === ejemplo.esperado.multiplo
      ? resultado.valor
      : reexpresar(resultado.valor, resultado.multiplo, ejemplo.esperado.multiplo);

  if (!esCercano(obtenido, esperadoEnSuMultiplo, tolerancia)) {
    return {
      ok: false,
      detalle:
        `${ejemplo.formulaId} (pág. ${ejemplo.pagina}): se esperaba ` +
        `${esperadoEnSuMultiplo} ${conMultiplo(ejemplo.esperado.multiplo, resultado.unidadDeMedida)} ` +
        `y se obtuvo ${obtenido}. Enunciado: ${ejemplo.enunciado}`,
    };
  }

  return { ok: true, detalle: `${ejemplo.formulaId} (pág. ${ejemplo.pagina}) verifica.` };
}

function reexpresar(valor: number, desde: Multiplo, hacia: Multiplo): number {
  return (valor * FACTOR[desde]) / FACTOR[hacia];
}
