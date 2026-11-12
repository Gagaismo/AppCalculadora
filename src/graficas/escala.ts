import type { Variable } from '@/dominio/formula';
import { desdeCanonico, elegirMultiplo, FACTOR, type Multiplo } from '@/dominio/multiplos';

import type { Escala, Rango, Segmento } from './tipos';

/**
 * Rango, escala, marcas y formato de la gráfica.
 *
 * Todo entra y sale en unidad canónica. El múltiplo aparece recién al escribir una
 * marca o una lectura, con dos reglas distintas según la escala (ver `formatearMarca`).
 */

/**
 * Las Unidades de medida que abarcan décadas y por eso arrancan en escala log (D3).
 *
 * Salen de las que declaran las Fórmulas de `src/formulas`:
 * - `Hz`: un ancho de banda va de un canal de voz (3 kHz) a uno óptico (GHz).
 * - `bit/s`, `bps`, `Bd`, `Baud`, `símbolo/s`: las tasas acompañan al ancho de banda.
 * - `W`, `W/Hz`: las potencias van de µW en recepción a W en transmisión.
 * - `m`: una distancia va de metros (WiFi) a cientos de km (enlace satelital).
 *
 * Quedan fuera a propósito las que ya son logarítmicas (`dB`, `dBm`, `dBi`), los
 * tiempos `s` —en las Fórmulas de la materia son períodos de un mismo orden— y el
 * resto de los adimensionales, salvo los símbolos de `SIMBOLOS_EN_DECADAS`.
 */
export const UNIDADES_EN_DECADAS: readonly string[] = [
  'Hz',
  'bit/s',
  'bps',
  'Bd',
  'Baud',
  'símbolo/s',
  'W',
  'W/Hz',
  'm',
];

/** Adimensionales que igual abarcan décadas: la SNR lineal va de 1 a 10⁶ (0 a 60 dB). */
export const SIMBOLOS_EN_DECADAS: readonly string[] = ['SNR'];

export function escalaInicial(variable: Variable): Escala {
  if (UNIDADES_EN_DECADAS.includes(variable.unidadDeMedida)) return 'log';
  if (variable.unidadDeMedida === 'adimensional' && SIMBOLOS_EN_DECADAS.includes(variable.simbolo)) {
    return 'log';
  }
  return 'lineal';
}

export interface RangoInicial {
  readonly rango: Rango;
  /** Puede no ser la pedida: la log sin un valor positivo vuelve a lineal. */
  readonly escala: Escala;
  /** Presente cuando la escala no es la pedida; dice por qué con palabras. */
  readonly aviso?: string;
}

/**
 * El rango del eje X centrado en el valor cargado (D2).
 *
 * - Lineal: de 0 a 2·x; con x negativo, de 2·x a 0. Con x = 0 no hay centro que
 *   duplicar, así que se toma un paso del múltiplo de la Variable a cada lado.
 * - Log: de x/100 a x·100, dos décadas a cada lado. El logaritmo de x ≤ 0 no existe:
 *   en ese caso se cae a lineal y se devuelve el aviso para mostrarlo.
 */
export function rangoInicial(valor: number, escala: Escala, multiplo: Multiplo = ''): RangoInicial {
  if (escala === 'log') {
    if (valor > 0) return { rango: { min: valor / 100, max: valor * 100 }, escala: 'log' };
    return {
      ...rangoInicial(valor, 'lineal', multiplo),
      aviso: 'La escala log necesita un valor mayor que cero: se muestra lineal.',
    };
  }
  if (valor > 0) return { rango: { min: 0, max: 2 * valor }, escala: 'lineal' };
  if (valor < 0) return { rango: { min: 2 * valor, max: 0 }, escala: 'lineal' };
  const paso = FACTOR[multiplo];
  return { rango: { min: -paso, max: paso }, escala: 'lineal' };
}

/** Dónde cae `valor` en el eje, de 0 (borde izquierdo) a 1 (derecho). */
export function fraccionEn(valor: number, rango: Rango, escala: Escala): number {
  if (escala === 'log') {
    const a = Math.log10(rango.min);
    return (Math.log10(valor) - a) / (Math.log10(rango.max) - a);
  }
  return (valor - rango.min) / (rango.max - rango.min);
}

/** La inversa de `fraccionEn`: qué valor está en esa fracción del eje. */
export function valorEn(fraccion: number, rango: Rango, escala: Escala): number {
  if (escala === 'log') {
    const a = Math.log10(rango.min);
    return 10 ** (a + fraccion * (Math.log10(rango.max) - a));
  }
  return rango.min + fraccion * (rango.max - rango.min);
}

/** El escalón 1, 2 o 5 por potencia de diez más cercano a `amplitud / n`. */
function pasoLindo(amplitud: number, n: number): number {
  const crudo = amplitud / n;
  const decada = 10 ** Math.floor(Math.log10(crudo));
  const f = crudo / decada;
  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * decada;
}

/** Corrige la basura del punto flotante (0,1 · 3 = 0,30000000000000004) y el −0. */
function limpio(valor: number): number {
  const v = Number(valor.toPrecision(12));
  return v === 0 ? 0 : v;
}

/**
 * Dónde van las marcas del eje.
 *
 * Lineal: escalones de 1, 2 o 5 por potencia de diez, unas cuatro marcas. Log: una
 * por década; si son más de siete, una cada tantas para que los rótulos no se pisen.
 */
export function marcas(rango: Rango, escala: Escala): number[] {
  if (!(rango.max > rango.min)) return [rango.min];
  if (escala === 'log') {
    const desde = Math.ceil(Math.log10(rango.min) - 1e-9);
    const hasta = Math.floor(Math.log10(rango.max) + 1e-9);
    const salto = Math.max(1, Math.ceil((hasta - desde + 1) / 7));
    const resultado: number[] = [];
    for (let e = desde; e <= hasta; e += salto) resultado.push(limpio(10 ** e));
    return resultado;
  }
  const paso = pasoLindo(rango.max - rango.min, 4);
  const resultado: number[] = [];
  for (let k = Math.ceil(rango.min / paso - 1e-9); k * paso <= rango.max + paso * 1e-9; k++) {
    resultado.push(limpio(k * paso));
  }
  return resultado;
}

/**
 * El rango del eje Y, que siempre es lineal: abarca la curva y el punto actual con
 * un margen del 6 %, redondeado a escalones de 1, 2 o 5.
 *
 * Cerca de una asíntota —el logaritmo de algo que tiende a cero— una sola punta
 * aplastaría toda la curva; si el total supera tres veces el rango entre los
 * percentiles 3 y 97, se descartan las puntas. Una magnitud que nunca baja de cero
 * no estrena un eje negativo por el margen. Devuelve `null` si no hay datos.
 */
export function rangoY(segmentos: readonly Segmento[], yActual?: number | null): Rango | null {
  const ys = segmentos.flatMap((s) => s.map((p) => p.y)).sort((a, b) => a - b);
  if (ys.length === 0) return null;
  const n = ys.length - 1;
  const p3 = ys[Math.floor(n * 0.03)];
  const p97 = ys[Math.ceil(n * 0.97)];
  let [lo, hi] = ys[n] - ys[0] <= 3 * (p97 - p3) ? [ys[0], ys[n]] : [p3, p97];
  if (yActual != null && Number.isFinite(yActual)) {
    lo = Math.min(lo, yActual);
    hi = Math.max(hi, yActual);
  }
  if (hi - lo < 1e-9 * Math.max(1, Math.abs(hi))) {
    const d = Math.abs(hi) || 1;
    lo -= d / 2;
    hi += d / 2;
  }
  const margen = (hi - lo) * 0.06;
  lo -= margen;
  hi += margen;
  if (ys[0] >= 0 && lo < 0) lo = 0;
  if (ys[n] <= 0 && hi > 0) hi = 0;
  if (lo > 0 && lo < 0.4 * hi) lo = 0;
  const paso = pasoLindo(hi - lo, 5);
  return {
    min: limpio(Math.floor(lo / paso + 1e-9) * paso),
    max: limpio(Math.ceil(hi / paso - 1e-9) * paso),
  };
}

const SUPERINDICES: Readonly<Record<string, string>> = {
  '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
};
const superindice = (n: number) => [...String(n)].map((c) => SUPERINDICES[c]).join('');

/**
 * Un número con coma decimal, signo menos tipográfico y `cifras` significativas.
 * Fuera de [10⁻³, 10⁷) va como mantisa·10ⁿ, antes que como una ristra de ceros.
 */
export function formatearCifras(valor: number, cifras: number): string {
  if (valor === 0) return '0';
  const absoluto = Math.abs(valor);
  let texto: string;
  if (absoluto >= 1e-3 && absoluto < 1e7) {
    texto = String(Number(valor.toPrecision(cifras)));
  } else {
    const e = Math.floor(Math.log10(absoluto));
    texto = `${Number((valor / 10 ** e).toPrecision(cifras))}·10${superindice(e)}`;
  }
  return texto.replace('.', ',').replace('-', '−');
}

/** La Unidad de medida con su múltiplo; un adimensional sólo lleva el múltiplo, si tiene. */
export function unidadConMultiplo(unidadDeMedida: string, multiplo: Multiplo): string {
  return unidadDeMedida === 'adimensional' ? multiplo : `${multiplo}${unidadDeMedida}`;
}

function conUnidad(valor: number, unidadDeMedida: string, multiplo: Multiplo, cifras: number) {
  const unidad = unidadConMultiplo(unidadDeMedida, multiplo);
  const numero = formatearCifras(desdeCanonico(valor, multiplo), cifras);
  return unidad ? `${numero} ${unidad}` : numero;
}

/**
 * El rótulo de una marca del eje.
 *
 * - Lineal: sólo el número, en el múltiplo del campo de la Variable. La unidad la
 *   lleva una sola vez el título del eje, así que todas las marcas comparten múltiplo.
 * - Log: cada marca lleva **su propio** múltiplo —«100 m», «1 km»—, porque en tres
 *   décadas un múltiplo común dejaría «0,001» en un extremo o «1000» en el otro. Un
 *   adimensional no tiene múltiplo: va como número entre 0,01 y 1000, y como
 *   potencia de diez fuera de ahí.
 */
export function formatearMarca(
  valor: number,
  unidadDeMedida: string,
  escala: Escala,
  multiplo: Multiplo = '',
): string {
  if (escala === 'lineal') return formatearCifras(desdeCanonico(valor, multiplo), 3);
  if (unidadDeMedida === 'adimensional') {
    const e = Math.round(Math.log10(valor));
    return e >= -2 && e <= 3 ? formatearCifras(10 ** e, 3) : `10${superindice(e)}`;
  }
  return conUnidad(valor, unidadDeMedida, elegirMultiplo(valor), 3);
}

export interface Lectura {
  readonly variableX: Variable;
  /** El múltiplo elegido en el campo de la Variable del eje X. */
  readonly multiploX: Multiplo;
  readonly x: number;
  readonly salida: Variable;
  /** `null` donde la Fórmula no está definida. */
  readonly y: number | null;
}

/**
 * La lectura (x, y) con palabras, para la cruz y para el lector de pantalla.
 *
 * x va en el múltiplo que eligió quien usa la app en el campo, aunque no sea el más
 * corto: es el que está mirando. y va en el múltiplo que elige el motor para el
 * resultado (`elegirMultiplo`), así la lectura en el punto actual coincide con el
 * resultado de la pantalla. Cuatro cifras significativas en los dos.
 */
export function formatearLectura({ variableX, multiploX, x, salida, y }: Lectura): string {
  const textoX = conUnidad(x, variableX.unidadDeMedida, multiploX, 4);
  const textoY =
    y === null ? 'sin valor' : conUnidad(y, salida.unidadDeMedida, elegirMultiplo(y), 4);
  return `${variableX.simbolo} = ${textoX} → ${salida.simbolo} = ${textoY}`;
}
