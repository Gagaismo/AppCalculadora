import { contarUnos, exigirBits, invertir } from './bits';

/**
 * VRC, LRC/BCC y la tabla bidimensional (Unidad 6, págs. 18-25).
 *
 * La tabla se modela exactamente como la de la pág. 25: las columnas D1…Dk son los
 * caracteres y las filas B1…Bm sus posiciones de bit. El VRC es la fila de abajo (un bit
 * por carácter) y el LRC la columna de la derecha (un bit por fila).
 *
 * Paridad par por defecto, con impar como opción (decisión D4 de la feature).
 */

export type TipoParidad = 'par' | 'impar';

/** Una celda de la tabla, con fila y columna numeradas desde 1 como B4 y D6. */
export interface Celda {
  readonly fila: number;
  readonly columna: number;
}

export interface TablaBidimensional {
  /** Un bit por fila B1…Bm. */
  readonly lrc: string;
  /** Un bit por columna D1…Dk. */
  readonly vrc: string;
  /** El bit del cruce: la paridad de la propia fila del VRC. */
  readonly esquina: string;
}

export interface VerificacionTabla extends TablaBidimensional {
  /** Las filas (desde 1) cuyo LRC recalculado no coincide con el recibido. */
  readonly filasConError: readonly number[];
  /** Las columnas (desde 1) cuyo VRC recalculado no coincide con el recibido. */
  readonly columnasConError: readonly number[];
  /** El cruce, sólo cuando falla exactamente una fila y una columna. */
  readonly celdaErronea: Celda | null;
  /** Las columnas con el bit del cruce invertido; sin cruce único, tal como llegaron. */
  readonly corregida: readonly string[];
}

/** El bit que completa la paridad pedida. */
export function paridadDe(bits: string, tipo: TipoParidad): '0' | '1' {
  const par = contarUnos(bits) % 2 === 0 ? '0' : '1';
  return tipo === 'par' ? par : invertir(par);
}

/** VRC: el bit de paridad de un carácter (pág. 20). */
export function vrc(caracter: string, tipo: TipoParidad): '0' | '1' {
  exigirBits(caracter, 'El carácter');
  return paridadDe(caracter, tipo);
}

/** La cadena formada por el bit `i` de cada cadena de `lista`. */
const transponer = (lista: readonly string[], i: number) => lista.map((s) => s[i]).join('');

function exigirBloque(bloque: readonly string[], nombre: string): void {
  if (bloque.length === 0) throw new Error(`${nombre} no puede quedar vacío.`);
  for (const cadena of bloque) exigirBits(cadena, nombre);
  if (bloque.some((cadena) => cadena.length !== bloque[0].length)) {
    throw new Error('Todas las cadenas tienen que tener la misma cantidad de bits.');
  }
}

/** BCC/LRC lineal: un bit de paridad por posición sobre el bloque (pág. 23). Par es el XOR. */
export function bcc(bloque: readonly string[], tipo: TipoParidad): string {
  exigirBloque(bloque, 'El bloque');
  return [...bloque[0]].map((_, i) => paridadDe(transponer(bloque, i), tipo)).join('');
}

/** LRC por fila, VRC por columna y la esquina de la tabla de la pág. 25. */
export function tablaBidimensional(
  columnas: readonly string[],
  tipo: TipoParidad,
): TablaBidimensional {
  exigirBloque(columnas, 'La tabla');
  const vrcFila = columnas.map((columna) => paridadDe(columna, tipo)).join('');
  const lrc = [...columnas[0]].map((_, i) => paridadDe(transponer(columnas, i), tipo)).join('');
  return { lrc, vrc: vrcFila, esquina: paridadDe(vrcFila, tipo) };
}

/** El receptor: recalcula LRC y VRC, los compara con los recibidos y busca el cruce. */
export function verificarTabla(
  recibida: readonly string[],
  lrcRecibido: string,
  vrcRecibido: string,
  tipo: TipoParidad,
): VerificacionTabla {
  const tabla = tablaBidimensional(recibida, tipo);
  const distintos = (calculado: string, llegado: string) =>
    [...calculado].flatMap((bit, i) => (bit === llegado[i] ? [] : [i + 1]));
  const filasConError = distintos(tabla.lrc, lrcRecibido);
  const columnasConError = distintos(tabla.vrc, vrcRecibido);

  const celdaErronea =
    filasConError.length === 1 && columnasConError.length === 1
      ? { fila: filasConError[0], columna: columnasConError[0] }
      : null;

  const corregida = recibida.map((columna, j) => {
    if (!celdaErronea || j !== celdaErronea.columna - 1) return columna;
    const i = celdaErronea.fila - 1;
    return columna.slice(0, i) + invertir(columna[i]) + columna.slice(i + 1);
  });

  return { ...tabla, filasConError, columnasConError, celdaErronea, corregida };
}
