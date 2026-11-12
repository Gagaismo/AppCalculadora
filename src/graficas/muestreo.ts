import type { Formula, ListasCanonicas, ValoresCanonicos, Variable } from '@/dominio/formula';

import { valorEn } from './escala';
import type { Escala, Punto, Rango, Segmento } from './tipos';

/**
 * El muestreo de la curva: la salida de la Fórmula contra una de sus Variables.
 *
 * Cada punto sale de la misma `calcular()` de la Fórmula; acá no hay ninguna fórmula
 * propia ni ninguna aproximación (regla dura 1). Se la llama directo y no a través de
 * `calcular` del motor porque el motor recibe valores con múltiplo y devuelve el
 * resultado ya escalado: para 200 puntos ya canónicos sería convertir de ida y de
 * vuelta en cada uno. Se replica, en cambio, su regla de borde: un resultado no
 * finito es «no definido», nunca un número.
 */

/** Las Variables que pueden ir en el eje X: las escalares. Una lista no es un eje. */
export function variablesEjeX(formula: Formula): readonly Variable[] {
  return formula.entradas.filter((v) => !v.esLista);
}

/** Una ficha de consulta no tiene entradas, y sin una Variable escalar no hay eje X. */
export function esGraficable(formula: Formula): boolean {
  return variablesEjeX(formula).length > 0;
}

/** La salida en un punto, o `null` donde la Fórmula no está definida o falla. */
export function evaluar(
  formula: Formula,
  valores: ValoresCanonicos,
  listas: ListasCanonicas = {},
): number | null {
  try {
    const y = formula.calcular(valores, listas);
    return Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
}

export interface Muestreo {
  readonly formula: Formula;
  /** Las demás Variables, ya en unidad canónica. La del eje X se pisa en cada punto. */
  readonly valoresCanonicos: ValoresCanonicos;
  readonly listasCanonicas?: ListasCanonicas;
  readonly variableX: string;
  readonly rango: Rango;
  readonly escala: Escala;
  /** Cuántos puntos repartidos en el rango. Por defecto 200. */
  readonly puntos?: number;
  /**
   * Valores de X que tienen que estar sí o sí, como el valor cargado: así el punto
   * actual cae exactamente sobre la curva y no entre dos muestras.
   */
  readonly incluir?: readonly number[];
}

/**
 * Los Segmentos de la curva en el rango, ordenados por X.
 *
 * Donde la Fórmula no está definida la curva se corta: no hay punto con `NaN` ni
 * con `Infinity`, hay un Segmento que termina y otro que empieza. Si no está definida
 * en ningún punto, devuelve una lista vacía.
 */
export function muestrear({
  formula,
  valoresCanonicos,
  listasCanonicas = {},
  variableX,
  rango,
  escala,
  puntos = 200,
  incluir = [],
}: Muestreo): Segmento[] {
  const n = Math.max(2, Math.round(puntos));
  // El paso de muestreo deja restos como 1,7·10⁻¹⁸ donde iba un cero exacto, y ahí
  // log₁₀ daría −390 dB en vez de un hueco. Se redondea a cero lo que es ruido.
  const ruido = Math.abs(rango.max - rango.min) * 1e-12;
  const xs = new Set<number>();
  for (let i = 0; i < n; i++) {
    const x =
      i === 0 ? rango.min : i === n - 1 ? rango.max : valorEn(i / (n - 1), rango, escala);
    xs.add(Math.abs(x) < ruido ? 0 : x);
  }
  for (const x of incluir) if (x >= rango.min && x <= rango.max) xs.add(x);

  const segmentos: Segmento[] = [];
  let actual: Punto[] = [];
  for (const x of [...xs].sort((a, b) => a - b)) {
    const y = evaluar(formula, { ...valoresCanonicos, [variableX]: x }, listasCanonicas);
    if (y === null) {
      if (actual.length > 0) segmentos.push(actual);
      actual = [];
    } else {
      actual.push({ x, y });
    }
  }
  if (actual.length > 0) segmentos.push(actual);
  return segmentos;
}

/**
 * Los intervalos de X sin valor: entre el borde del rango y el primer punto, entre
 * dos Segmentos y entre el último punto y el otro borde. Son las zonas rayadas.
 */
export function huecos(segmentos: readonly Segmento[], rango: Rango): Rango[] {
  if (segmentos.length === 0) return [rango];
  const resultado: Rango[] = [];
  let desde = rango.min;
  for (const segmento of segmentos) {
    const inicio = segmento[0].x;
    if (inicio > desde) resultado.push({ min: desde, max: inicio });
    desde = segmento[segmento.length - 1].x;
  }
  if (rango.max > desde) resultado.push({ min: desde, max: rango.max });
  return resultado;
}
