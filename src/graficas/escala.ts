import type { Variable } from '@/dominio/formula';
import {
  admitePrefijo,
  desdeCanonico,
  elegirMultiplo,
  FACTOR,
  MULTIPLOS,
  type Multiplo,
} from '@/dominio/multiplos';

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
 *
 * En los extremos del double los bordes se acotan a lo representable (S1): 1e-323/100
 * se iría a 0, donde log₁₀ no existe, y 1e307·100 a Infinity, donde las marcas no
 * terminan. El marco deja de estar centrado, pero sigue conteniendo a x.
 */
export function rangoInicial(valor: number, escala: Escala, multiplo: Multiplo = ''): RangoInicial {
  if (escala === 'log') {
    if (valor > 0) {
      const min = Math.max(valor / 100, Number.MIN_VALUE);
      return { rango: { min, max: Math.min(valor * 100, MAXIMO) }, escala: 'log' };
    }
    return {
      ...rangoInicial(valor, 'lineal', multiplo),
      aviso: 'La escala log necesita un valor mayor que cero: se muestra lineal.',
    };
  }
  if (valor > 0) return { rango: { min: 0, max: Math.min(2 * valor, MAXIMO) }, escala: 'lineal' };
  if (valor < 0) return { rango: { min: Math.max(2 * valor, -MAXIMO), max: 0 }, escala: 'lineal' };
  const paso = FACTOR[multiplo];
  return { rango: { min: -paso, max: paso }, escala: 'lineal' };
}

/** El mayor double finito: el techo de todo borde que se calcula acá. */
const MAXIMO = Number.MAX_VALUE;

/** Lleva a [−MAX, MAX] un valor que desbordó; un NaN sigue siendo NaN. */
const acotar = (v: number) => Math.max(-MAXIMO, Math.min(MAXIMO, v));

/**
 * Dónde cae `valor` en el eje, de 0 (borde izquierdo) a 1 (derecho).
 *
 * En lineal, si `max − min` desborda (de −MAX a MAX), la cuenta se rehace con las
 * mitades, que no desbordan. Sólo en ese caso: el resto no cambia ni en un ulp.
 */
export function fraccionEn(valor: number, rango: Rango, escala: Escala): number {
  if (escala === 'log') {
    const a = Math.log10(rango.min);
    return (Math.log10(valor) - a) / (Math.log10(rango.max) - a);
  }
  const ancho = rango.max - rango.min;
  if (Number.isFinite(ancho)) return (valor - rango.min) / ancho;
  return (valor / 2 - rango.min / 2) / (rango.max / 2 - rango.min / 2);
}

/** La inversa de `fraccionEn`: qué valor está en esa fracción del eje. */
export function valorEn(fraccion: number, rango: Rango, escala: Escala): number {
  if (escala === 'log') {
    const a = Math.log10(rango.min);
    const v = 10 ** (a + fraccion * (Math.log10(rango.max) - a));
    // Cerca de MAX o de MIN_VALUE el redondeo de log₁₀ puede pasarse a Infinity o a 0.
    return v > 0 && Number.isFinite(v) ? v : Math.min(rango.max, Math.max(rango.min, v));
  }
  const ancho = rango.max - rango.min;
  return Number.isFinite(ancho)
    ? rango.min + fraccion * ancho
    : rango.min * (1 - fraccion) + rango.max * fraccion;
}

/**
 * El escalón 1, 2 o 5 por potencia de diez más cercano a `(max − min) / n`. Si la
 * resta desborda se divide antes de restar. Con una amplitud nula o no finita da
 * NaN: quien lo usa tiene que mirarlo.
 */
function pasoLindo(min: number, max: number, n: number): number {
  let crudo = (max - min) / n;
  if (!Number.isFinite(crudo)) crudo = max / n - min / n;
  if (!(crudo > 0) || !Number.isFinite(crudo)) return NaN;
  const decada = 10 ** Math.floor(Math.log10(crudo));
  const f = crudo / decada;
  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * decada;
}

/** Un borde redondeado a escalón: si se pasó de lo representable, queda en ±MAX. */
const borde = (v: number) => (Math.abs(v) >= MAXIMO ? Math.sign(v) * MAXIMO : limpio(v));

/** Tope de marcas por eje: ningún eje legible tiene más, y garantiza que el bucle termine. */
const MAXIMO_MARCAS = 20;

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
 *
 * Termina para cualquier entrada y sólo devuelve números finitos (S1): un borde no
 * finito o un log con min ≤ 0 no tienen marcas, y el bucle cuenta vueltas en vez de
 * confiar en que `k++` avance —por encima de 2⁵³, 1e16 + 1 === 1e16—.
 */
export function marcas(rango: Rango, escala: Escala): number[] {
  const { min, max } = rango;
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [];
  if (!(max > min)) return [min];
  const resultado: number[] = [];
  const agregar = (v: number) => {
    if (resultado[resultado.length - 1] !== v) resultado.push(v);
  };
  if (escala === 'log') {
    if (!(min > 0)) return [];
    const desde = Math.ceil(Math.log10(min) - 1e-9);
    const hasta = Math.floor(Math.log10(max) + 1e-9);
    const salto = Math.max(1, Math.ceil((hasta - desde + 1) / 7));
    for (let i = 0, e = desde; i < MAXIMO_MARCAS && e <= hasta; i++, e += salto) {
      const v = limpio(10 ** e);
      if (v > 0 && Number.isFinite(v)) agregar(v);
    }
    return resultado;
  }
  const paso = pasoLindo(min, max, 4);
  if (!Number.isFinite(paso)) return [min];
  const desde = Math.ceil(min / paso - 1e-9);
  for (let i = 0; i < MAXIMO_MARCAS; i++) {
    const v = (desde + i) * paso;
    if (!Number.isFinite(v) || v > max + paso * 1e-9) break;
    agregar(limpio(v));
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
 * no estrena un eje negativo por el margen, y una que nunca sube de cero no estrena
 * uno positivo. Una curva que vale 0 en todos sus puntos es las dos cosas a la vez:
 * recortar los dos lados dejaría min = max = 0 y el Lienzo dividiría por cero (S1),
 * así que ahí el eje queda a los dos lados del 0. Devuelve `null` si no hay datos.
 */
export function rangoY(segmentos: readonly Segmento[], yActual?: number | null): Rango | null {
  const reales = segmentos.flatMap((s) => s.map((p) => p.y)).sort((a, b) => a - b);
  if (reales.length === 0) return null;
  // Para dimensionar el eje un subnormal vale 0 (S1): con |y| < 2,2·10⁻³⁰⁸ el paso
  // del eje se redondea a 0. El eje se abre entonces alrededor del 0 y lo contiene.
  // Aplanar es monótono, así que `ys` queda ordenado igual que `reales`.
  const ys = reales.map(aEscala);
  const n = ys.length - 1;
  const i3 = Math.floor(n * 0.03);
  const i97 = Math.ceil(n * 0.97);
  const sinPuntas = ys[n] - ys[0] <= 3 * (ys[i97] - ys[i3]);
  const [a, b] = sinPuntas ? [0, n] : [i3, i97];
  let [lo, hi] = [ys[a], ys[b]];
  // Lo que el eje tiene que contener sí o sí, con los valores sin aplanar.
  let [debeLo, debeHi] = [reales[a], reales[b]];
  if (yActual != null && Number.isFinite(yActual)) {
    lo = Math.min(lo, aEscala(yActual));
    hi = Math.max(hi, aEscala(yActual));
    debeLo = Math.min(debeLo, yActual);
    debeHi = Math.max(debeHi, yActual);
  }
  // En los extremos del double ensanchar desborda: cada paso se acota a ±MAX y el
  // margen sale de las mitades, que no desbordan (S1, una serie en −1,7·10³⁰⁸).
  if (hi - lo < 1e-9 * Math.max(1, Math.abs(hi))) {
    const d = Math.abs(hi) || 1;
    lo = acotar(lo - d / 2);
    hi = acotar(hi + d / 2);
  }
  const margen = (hi / 2 - lo / 2) * 0.12;
  lo = acotar(lo - margen);
  hi = acotar(hi + margen);
  // El signo se mira en los valores sin aplanar: −1e-323 nunca es positivo, y
  // recortar su lado negativo a 0 lo dejaría fuera del eje.
  const nuncaNegativa = reales[0] >= 0;
  const nuncaPositiva = reales[n] <= 0;
  if (nuncaNegativa && !nuncaPositiva && lo < 0) lo = 0;
  if (nuncaPositiva && !nuncaNegativa && hi > 0) hi = 0;
  if (lo > 0 && lo < 0.4 * hi) lo = 0;
  const paso = pasoLindo(lo, hi, 5);
  const rango = rangoDibujable({
    min: borde(Math.floor(lo / paso + 1e-9) * paso),
    max: borde(Math.ceil(hi / paso - 1e-9) * paso),
  });
  if (rango.min <= debeLo && rango.max >= debeHi) return rango;
  // Última red: si algo de lo anterior dejó un valor afuera, un eje simétrico que lo
  // contiene. Finito siempre: el radio se acota a MAX.
  const radio = Math.max(Math.abs(debeLo), Math.abs(debeHi));
  const tope = radio < 0.5 ? 1 : acotar(2 * radio);
  return { min: -tope, max: tope };
}

/** El menor double normal. Por debajo, los subnormales pierden cifras al operar. */
const MINIMO_NORMAL = 2.2250738585072014e-308;

/** Un subnormal vale 0 para dimensionar el eje: sólo para eso. */
const aEscala = (v: number) => (Math.abs(v) < MINIMO_NORMAL ? 0 : v);

/**
 * Un rango con el que se puede dibujar: bordes finitos y max > min.
 *
 * Es la guarda de la última línea (S1): un rango colapsado haría `(y − min) / 0` y un
 * borde no finito propagaría NaN hasta el `d` del path, que en Android cierra la app.
 * El colapsado se abre medio valor a cada lado —o medio a cada lado del 0, si es 0—;
 * lo que no es finito cae a [0, 1]. Un rango sano vuelve tal cual.
 *
 * En log además los bordes tienen que ser positivos: se acotan a [MIN_VALUE, MAX]
 * (un 0 sube a MIN_VALUE, un Infinity baja a MAX), el colapsado se abre una década
 * a cada lado y lo que no es un número cae a [1, 10].
 */
export function rangoDibujable(rango: Rango | null | undefined, escala: Escala = 'lineal'): Rango {
  if (escala === 'log') return rangoLogDibujable(rango);
  if (rango && Number.isFinite(rango.min) && Number.isFinite(rango.max)) {
    if (rango.max > rango.min) return rango;
    const medio = (Math.abs(rango.min) || 1) / 2;
    const abierto = { min: acotar(rango.min - medio), max: acotar(rango.max + medio) };
    if (abierto.max > abierto.min) return abierto;
  }
  return { min: 0, max: 1 };
}

function rangoLogDibujable(rango: Rango | null | undefined): Rango {
  const positivo = (v: number | undefined) =>
    v === undefined || Number.isNaN(v) ? NaN : Math.min(MAXIMO, Math.max(Number.MIN_VALUE, v));
  const min = positivo(rango?.min);
  const max = positivo(rango?.max);
  if (Number.isNaN(min) || Number.isNaN(max)) return { min: 1, max: 10 };
  if (max > min) return min === rango!.min && max === rango!.max ? rango! : { min, max };
  return { min: positivo(min / 10), max: positivo(max * 10) };
}

const SUPERINDICES: Readonly<Record<string, string>> = {
  '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
};
const superindice = (n: number) => [...String(n)].map((c) => SUPERINDICES[c]).join('');

/**
 * Un número con coma decimal, signo menos tipográfico y `cifras` significativas.
 * Fuera de [10⁻³, 10⁷) va como mantisa·10ⁿ, antes que como una ristra de ceros.
 *
 * Mantisa y exponente salen de `toExponential`, que redondea en decimal sobre el
 * double exacto (S1). Así no hay división por 10 ** e —que con e = −324 es 0 y daba
 * «Infinity·10⁻³²⁴»—, y una mantisa que redondea a 10 ya sube de exponente: 999999999
 * es «1·10⁹» y no «10·10⁸». El rango [10⁻³, 10⁷) se decide con el valor redondeado.
 * Para cualquier finito el texto es un número; un no finito dice «sin valor».
 */
export function formatearCifras(valor: number, cifras: number): string {
  if (valor === 0) return '0';
  if (!Number.isFinite(valor)) return 'sin valor';
  const { mantisa, exponente } = partes(valor, cifras);
  return componer(mantisa, exponente);
}

/** La mantisa con `cifras` significativas, como texto, y su exponente decimal. */
function partes(valor: number, cifras: number) {
  const digitos = Math.min(100, Math.max(0, Math.round(cifras) - 1));
  const [mantisa, exponente] = valor.toExponential(digitos).split('e');
  return { mantisa, exponente: Number(exponente) };
}

function componer(mantisa: string, exponente: number): string {
  const texto =
    exponente >= -3 && exponente < 7
      ? String(Number(`${mantisa}e${exponente}`))
      : `${Number(mantisa)}·10${superindice(exponente)}`;
  return texto.replace('.', ',').replace('-', '−');
}

/** Cuántas potencias de diez corre cada múltiplo: «k» es 3, «p» es −12. */
const POTENCIA = Object.fromEntries(
  MULTIPLOS.map((m) => [m, Math.round(Math.log10(FACTOR[m]))]),
) as Readonly<Record<Multiplo, number>>;

/**
 * `valor` (canónico) escrito en `multiplo`. Si dividir por el factor desborda —MAX
 * en pico— o cae en un subnormal —MIN_VALUE en tera—, el múltiplo se aplica
 * corriendo el exponente decimal en vez de dividir: nunca sale Infinity ni un 0
 * falso. En los demás casos es exactamente `formatearCifras(desdeCanonico(…))`.
 */
function cifrasEnMultiplo(valor: number, multiplo: Multiplo, cifras: number): string {
  if (valor === 0 || !Number.isFinite(valor)) return formatearCifras(valor, cifras);
  const escalado = desdeCanonico(valor, multiplo);
  if (Number.isFinite(escalado) && Math.abs(escalado) >= MINIMO_NORMAL) {
    return formatearCifras(escalado, cifras);
  }
  const { mantisa, exponente } = partes(valor, cifras);
  return componer(mantisa, exponente - POTENCIA[multiplo]);
}

/**
 * El múltiplo con el que se escribe en la gráfica una Unidad de medida (S7): el pedido,
 * salvo que la Unidad de medida no admita prefijos SI (`admitePrefijo`), y entonces
 * ninguno. Es la misma regla que el resultado de la pantalla de la Fórmula: «%» nunca
 * es «k%» ni un adimensional «M». Número y rótulo pasan los dos por acá, así que
 * nunca queda un número escalado con un rótulo sin escalar.
 */
export function multiploAdmitido(unidadDeMedida: string, multiplo: Multiplo): Multiplo {
  return admitePrefijo(unidadDeMedida) ? multiplo : '';
}

/**
 * La Unidad de medida con su múltiplo; un adimensional no lleva texto. Una Unidad de
 * medida sin prefijos SI va siempre en su forma base (S7).
 */
export function unidadConMultiplo(unidadDeMedida: string, multiplo: Multiplo): string {
  if (unidadDeMedida === 'adimensional') return '';
  return `${multiploAdmitido(unidadDeMedida, multiplo)}${unidadDeMedida}`;
}

function conUnidad(valor: number, unidadDeMedida: string, pedido: Multiplo, cifras: number) {
  const multiplo = multiploAdmitido(unidadDeMedida, pedido);
  const unidad = unidadConMultiplo(unidadDeMedida, multiplo);
  const numero = cifrasEnMultiplo(valor, multiplo, cifras);
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
 *   potencia de diez fuera de ahí. Lo mismo cualquier Unidad de medida sin prefijos
 *   SI —%, dB—, que además lleva su rótulo: «1000 %», «10⁻³ dB» (S7).
 *
 * Un múltiplo que la Unidad de medida no admite se ignora (S7).
 */
export function formatearMarca(
  valor: number,
  unidadDeMedida: string,
  escala: Escala,
  pedido: Multiplo = '',
): string {
  const multiplo = multiploAdmitido(unidadDeMedida, pedido);
  if (escala === 'lineal') return cifrasEnMultiplo(valor, multiplo, 3);
  // El logaritmo de un valor ≤ 0 o no finito no existe: se escribe el número tal cual.
  if (!(valor > 0) || !Number.isFinite(valor)) return cifrasEnMultiplo(valor, multiplo, 3);
  if (!admitePrefijo(unidadDeMedida)) {
    const e = Math.round(Math.log10(valor));
    const numero = e >= -2 && e <= 3 ? formatearCifras(10 ** e, 3) : `10${superindice(e)}`;
    const unidad = unidadConMultiplo(unidadDeMedida, '');
    return unidad ? `${numero} ${unidad}` : numero;
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
 * resultado de la pantalla. Cuatro cifras significativas en los dos. Una Unidad de
 * medida sin prefijos SI va en su forma base, en x y en y (S7).
 */
export function formatearLectura({ variableX, multiploX, x, salida, y }: Lectura): string {
  const textoX = conUnidad(x, variableX.unidadDeMedida, multiploX, 4);
  const textoY =
    y === null
      ? 'sin valor'
      : conUnidad(y, salida.unidadDeMedida, elegirMultiplo(y, salida.unidadDeMedida), 4);
  return `${variableX.simbolo} = ${textoX} → ${salida.simbolo} = ${textoY}`;
}
