/**
 * Lectura y escritura de números en la interfaz.
 *
 * Vive aparte de la pantalla porque lo usan tanto la pantalla genérica como la ficha
 * de la Fórmula, y dos copias de la misma regla de formato se separan con el tiempo.
 */

/**
 * En qué estado está un campo de entrada.
 *
 * Los tres estados son distintos y la app los trata distinto: un campo vacío todavía
 * no es un error, uno inválido sí, y uno cargado alimenta el cálculo. Se modelan como
 * un tipo con estados explícitos y no con un número que a veces es `NaN`, porque `NaN`
 * es un `number` válido para TypeScript: se colaría por cualquier chequeo que sólo
 * mire si el valor está definido, y produciría un resultado sin ningún síntoma. Eso es
 * exactamente la clase de error que esta app existe para evitar.
 */
export type Entrada =
  | { readonly estado: 'vacia' }
  | { readonly estado: 'invalida' }
  | { readonly estado: 'cargada'; readonly valor: number };

const VACIA: Entrada = { estado: 'vacia' };
const INVALIDA: Entrada = { estado: 'invalida' };

/** Acepta coma decimal: es como la cátedra escribe los números. También acepta punto. */
export function parsearEntrada(texto: string | undefined): Entrada {
  if (texto === undefined) return VACIA;

  const limpio = texto.trim().replace(',', '.');
  if (limpio === '') return VACIA;

  const valor = Number(limpio);
  return Number.isFinite(valor) ? { estado: 'cargada', valor } : INVALIDA;
}

/** Muestra el número con coma decimal y sin la basura del punto flotante. */
export function formatearNumero(valor: number): string {
  return String(Number(valor.toPrecision(10))).replace('.', ',');
}
