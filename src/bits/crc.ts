import { exigirBits, xor } from './bits';

/**
 * CRC, U06-F11 (Unidad 6, págs. 28-32): división módulo 2 por XOR.
 *
 * El emisor arma P(x) = M(x)·x^r agregando r ceros, lo divide por G(x) y transmite
 * T(x) = P(x) + R(x). El receptor divide T'(x) por G(x): resto 0 es sin error.
 *
 * El cociente no se expone (decisión D2 de la feature): U06-F11 sólo pide R y T.
 */

/** Un renglón de la división, dispuesto como en el pizarrón de la pág. 30. */
export interface PasoCrc {
  /** Columna (desde 0, sobre el dividendo) donde se alinea G(x) en este paso. */
  readonly columna: number;
  /** Los bits del dividendo que quedan arriba de G(x) en este paso. */
  readonly ventana: string;
  /** Lo que se escribe debajo y se resta. La pág. 30 usa siempre G(x): nunca una fila de ceros. */
  readonly divisor: string;
  /** `ventana ⊕ divisor`, con sus ceros a la izquierda. */
  readonly xor: string;
  /** Los bits que se «bajan» (en rojo en la diapositiva) hasta que el próximo 1 quede bajo G(x). */
  readonly bajados: string;
  /** El renglón resultado tal como se escribe: `xor` seguido de `bajados`, desde `columna`. */
  readonly fila: string;
}

export interface DivisionCrc {
  /** El grado de G(x): G tiene r + 1 bits y el resto tiene r. */
  readonly r: number;
  /** El resto con sus r bits, ceros a la izquierda incluidos (01001). */
  readonly resto: string;
  /** El resto sin los ceros a la izquierda, como lo escribe la cátedra (1001). */
  readonly restoCorto: string;
  readonly pasos: readonly PasoCrc[];
}

export interface CrcEmisor extends DivisionCrc {
  /** P(x) = M(x)·x^r: el mensaje con r ceros agregados. */
  readonly p: string;
  /** T(x) = P(x) + R(x): el mensaje seguido del resto de r bits. */
  readonly trama: string;
}

export interface CrcReceptor extends DivisionCrc {
  readonly hayError: boolean;
}

/** Un generador para elegir con un toque. */
export interface Generador {
  readonly nombre: string;
  readonly bits: string;
  /** El polinomio, como lo escribe la diapositiva. */
  readonly polinomio: string;
}

/** El generador del ejemplo de la cátedra (págs. 29-31) y los estándar de la pág. 32. */
export const GENERADORES: readonly Generador[] = [
  { nombre: 'Cátedra', bits: '110011', polinomio: 'x⁵ + x⁴ + x + 1' },
  { nombre: 'CRC-12', bits: '1100000001111', polinomio: 'x¹² + x¹¹ + x³ + x² + x + 1' },
  { nombre: 'CRC-16', bits: '11000000000000101', polinomio: 'x¹⁶ + x¹⁵ + x² + 1' },
  { nombre: 'CRC-CCITT', bits: '10001000000100001', polinomio: 'x¹⁶ + x¹² + x⁵ + 1' },
];

/** El mensaje del ejemplo de la cátedra (pág. 29), que va junto con el generador «Cátedra». */
export const MENSAJE_CATEDRA = '10110111';

function exigirGenerador(g: string): void {
  if (!/^1[01]+$/.test(g)) {
    throw new Error('G(x) tiene que empezar con 1 y tener al menos 2 bits.');
  }
}

/**
 * La división módulo 2 de `dividendo` por `g`, renglón por renglón.
 *
 * Como en la pág. 30: G(x) se alinea bajo el primer 1, se hace el XOR y se bajan los bits
 * necesarios hasta que el próximo 1 quede bajo G(x). Cuando ya no entra, lo que queda en
 * las últimas r columnas es el resto.
 */
function dividir(dividendo: string, g: string): DivisionCrc {
  const ancho = g.length;
  const r = ancho - 1;
  const actual = dividendo.split('');
  const pasos: PasoCrc[] = [];

  let columna = actual.indexOf('1');
  while (columna !== -1 && columna + ancho <= actual.length) {
    const ventana = actual.slice(columna, columna + ancho).join('');
    const resultado = xor(ventana, g);
    actual.splice(columna, ancho, ...resultado);

    const siguiente = actual.indexOf('1', columna);
    const fin =
      siguiente !== -1 && siguiente + ancho <= actual.length ? siguiente + ancho : actual.length;
    const bajados = actual.slice(columna + ancho, fin).join('');
    pasos.push({ columna, ventana, divisor: g, xor: resultado, bajados, fila: resultado + bajados });
    columna = siguiente;
  }

  const resto = actual.slice(actual.length - r).join('');
  return { r, resto, restoCorto: resto.replace(/^0+/, '') || '0', pasos };
}

/** El emisor: de M(x) y G(x) a P(x), R(x) y T(x). */
export function calcularCrc(m: string, g: string): CrcEmisor {
  exigirBits(m, 'M(x)');
  exigirBits(g, 'G(x)');
  exigirGenerador(g);

  const p = m + '0'.repeat(g.length - 1);
  const division = dividir(p, g);
  return { ...division, p, trama: m + division.resto };
}

/** El receptor: divide T'(x) por G(x); resto distinto de cero es que hubo error. */
export function verificarCrc(tPrima: string, g: string): CrcReceptor {
  exigirBits(tPrima, "T'(x)");
  exigirBits(g, 'G(x)');
  exigirGenerador(g);
  if (tPrima.length < g.length) {
    throw new Error("T'(x) tiene que ser al menos tan largo como G(x).");
  }

  const division = dividir(tPrima, g);
  return { ...division, hayError: division.resto.includes('1') };
}
