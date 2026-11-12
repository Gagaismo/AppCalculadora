import { contarUnos, exigirBits, invertir } from './bits';

/**
 * Hamming, U06-F09 y U06-F10 (Unidad 6, págs. 44-50), con paridad par como la cátedra
 * (decisión D4 de la feature).
 *
 * Las posiciones se numeran de n+p a 1 de izquierda a derecha, como en las tablas de las
 * págs. 49-50; los bits de paridad van en 1, 2, 4, 8…
 */

export interface PosicionHamming {
  readonly pos: number;
  readonly tipo: 'p' | 'n';
  /** `p1`…`pp` para las paridades, `n1`…`nn` para los datos. */
  readonly etiqueta: string;
  readonly bit: string;
}

export interface GrupoEmisor {
  /** `p1`, `p2`… */
  readonly paridad: string;
  /** Las posiciones de datos que cubre, de mayor a menor (sin la del propio bit de paridad). */
  readonly posicionesCubiertas: readonly number[];
  readonly unos: number;
  /** El bit de paridad que completa un número par de unos. */
  readonly bit: string;
}

export interface GrupoReceptor {
  readonly paridad: string;
  /** Todas las posiciones del grupo, incluida la del bit de paridad, de mayor a menor. */
  readonly posicionesCubiertas: readonly number[];
  readonly unos: number;
  /** Si el grupo tiene un número par de unos. */
  readonly cumple: boolean;
  /** El bit del síndrome: 0 si cumple, 1 si no. */
  readonly bit: string;
}

export interface CodigoHamming {
  readonly p: number;
  /** La palabra a transmitir, posiciones n+p … 1. */
  readonly palabra: string;
  readonly posiciones: readonly PosicionHamming[];
  /** Un grupo por bit de paridad, de p1 a pp. */
  readonly grupos: readonly GrupoEmisor[];
}

export interface DecodificacionHamming {
  readonly p: number;
  readonly posiciones: readonly PosicionHamming[];
  readonly grupos: readonly GrupoReceptor[];
  /** pp … p1, como la escribe la cátedra (1000). */
  readonly sindrome: string;
  /** El síndrome en decimal: la posición del bit erróneo; 0 es sin error. */
  readonly posicion: number;
  /**
   * La palabra con ese bit invertido. `null` si el síndrome señala una posición que no
   * existe en la palabra: con más de un error, Hamming detecta pero no sabe corregir.
   */
  readonly corregida: string | null;
}

const esPotenciaDeDos = (x: number) => (x & (x - 1)) === 0;

/** U06-F09: el menor p con 2^p ≥ n + p + 1. Se itera porque p no se despeja. */
export function bitsDeParidad(n: number): number {
  let p = 1;
  while (2 ** p < n + p + 1) p++;
  return p;
}

/** Las etiquetas y bits de una palabra de `bits` (posición `bits.length` primero). */
function posicionesDe(bits: string): PosicionHamming[] {
  const total = bits.length;
  let dato = total - Math.floor(Math.log2(total)) - 1;
  return [...bits].map((bit, i) => {
    const pos = total - i;
    return esPotenciaDeDos(pos)
      ? { pos, tipo: 'p', etiqueta: `p${Math.log2(pos) + 1}`, bit }
      : { pos, tipo: 'n', etiqueta: `n${dato--}`, bit };
  });
}

/** Las posiciones (de mayor a menor) cuyo número tiene encendido el bit `mascara`. */
function cubiertas(total: number, mascara: number): number[] {
  const lista: number[] = [];
  for (let pos = total; pos >= 1; pos--) if (pos & mascara) lista.push(pos);
  return lista;
}

/** El emisor: `datos` se da como n_n … n_1, con el más significativo a la izquierda. */
export function codificarHamming(datos: string): CodigoHamming {
  exigirBits(datos, 'Los datos', { vacio: 'no pueden quedar vacíos', admite: 'sólo admiten' });

  const p = bitsDeParidad(datos.length);
  const total = datos.length + p;
  const bitEn: Record<number, string> = {};
  let siguienteDato = 0;
  for (let pos = total; pos >= 1; pos--) {
    if (!esPotenciaDeDos(pos)) bitEn[pos] = datos[siguienteDato++];
  }

  const grupos: GrupoEmisor[] = [];
  for (let i = 1; i <= p; i++) {
    const mascara = 1 << (i - 1);
    const posicionesCubiertas = cubiertas(total, mascara).filter((pos) => pos !== mascara);
    const unos = posicionesCubiertas.filter((pos) => bitEn[pos] === '1').length;
    bitEn[mascara] = String(unos % 2);
    grupos.push({ paridad: `p${i}`, posicionesCubiertas, unos, bit: bitEn[mascara] });
  }

  let palabra = '';
  for (let pos = total; pos >= 1; pos--) palabra += bitEn[pos];
  return { p, palabra, posiciones: posicionesDe(palabra), grupos };
}

/** El receptor: recalcula cada grupo, arma el síndrome y corrige el bit que señala. */
export function decodificarHamming(recibida: string): DecodificacionHamming {
  exigirBits(recibida, 'La palabra recibida');
  if (recibida.length < 3) {
    throw new Error('La palabra recibida tiene que tener al menos 3 bits.');
  }

  const total = recibida.length;
  const bitDe = (pos: number) => recibida[total - pos];
  const p = Math.floor(Math.log2(total)) + 1;

  const grupos: GrupoReceptor[] = [];
  for (let i = 1; i <= p; i++) {
    const posicionesCubiertas = cubiertas(total, 1 << (i - 1));
    const unos = contarUnos(posicionesCubiertas.map(bitDe).join(''));
    const cumple = unos % 2 === 0;
    grupos.push({ paridad: `p${i}`, posicionesCubiertas, unos, cumple, bit: cumple ? '0' : '1' });
  }

  const sindrome = grupos.map((g) => g.bit).reverse().join('');
  const posicion = parseInt(sindrome, 2);
  let corregida: string | null = recibida;
  if (posicion > total) corregida = null;
  else if (posicion > 0) {
    const i = total - posicion;
    corregida = recibida.slice(0, i) + invertir(recibida[i]) + recibida.slice(i + 1);
  }

  return { p, posiciones: posicionesDe(recibida), grupos, sindrome, posicion, corregida };
}
