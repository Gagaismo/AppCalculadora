/**
 * Lo que comparten las tres herramientas de bits: validar una cadena y operar bit a bit.
 *
 * Una cadena de bits se maneja como `string` de `0` y `1`, con el bit más significativo
 * a la izquierda, que es como la escribe la cátedra en todas las diapositivas.
 */

/**
 * Exige que `valor` sea una cadena de bits no vacía. `nombre` es cómo la ve quien usa la
 * app («M(x)», «Los datos»), porque el mensaje del error se muestra tal cual.
 *
 * `vacio` y `admite` sólo ajustan la concordancia («no pueden quedar vacíos», «sólo admiten»).
 */
export function exigirBits(
  valor: string,
  nombre: string,
  { vacio = 'no puede quedar vacío', admite = 'sólo admite' } = {},
): void {
  if (valor.length === 0) throw new Error(`${nombre} ${vacio}.`);
  if (!/^[01]+$/.test(valor)) throw new Error(`${nombre} ${admite} 0 y 1.`);
}

/** XOR bit a bit de dos cadenas del mismo largo: la suma (y la resta) módulo 2. */
export function xor(a: string, b: string): string {
  let resultado = '';
  for (let i = 0; i < a.length; i++) resultado += a[i] === b[i] ? '0' : '1';
  return resultado;
}

/** Cuántos unos tiene la cadena. */
export function contarUnos(bits: string): number {
  let unos = 0;
  for (const bit of bits) if (bit === '1') unos++;
  return unos;
}

/** El bit opuesto. */
export function invertir(bit: string): '0' | '1' {
  return bit === '1' ? '0' : '1';
}
