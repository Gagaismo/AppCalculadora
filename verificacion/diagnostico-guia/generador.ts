import type { Formula } from '@/dominio/formula';
import { MULTIPLOS, type Multiplo } from '@/dominio/multiplos';

/**
 * El generador de casos de la verificación del diagnóstico y del guía.
 *
 * Es propio y determinista para no sumar dependencias: con la misma semilla genera los
 * mismos casos en cualquier máquina, así un contraejemplo se reproduce tal cual.
 */

/** La semilla de la corrida. Se cambia con `VERIFICAR_SEMILLA=<entero>`. */
export const SEMILLA = Number(process.env.VERIFICAR_SEMILLA ?? 20261112);

/** mulberry32: chico, rápido y suficiente para elegir textos de prueba. */
export function generadorAleatorio(semilla: number): () => number {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Azar = () => number;

const elegir = <T,>(azar: Azar, opciones: readonly T[]): T =>
  opciones[Math.floor(azar() * opciones.length)];

const entero = (azar: Azar, desde: number, hasta: number) =>
  desde + Math.floor(azar() * (hasta - desde + 1));

/**
 * Textos que ya rompieron, o casi, una calculadora alguna vez: separadores sueltos,
 * dos comas, el «−» tipográfico, dígitos que no son ASCII, `NaN`, desbordes, hex.
 */
export const TEXTOS_BORDE: readonly string[] = [
  ',', '.', '-', '+', ',5', '5,', '.5', '5.', '1,2,3', '1.2.3', '1,5.3', '1.5,3',
  'NaN', 'Infinity', '-Infinity', '1e400', '-1e400', '1e-400', '0x1F', '0b11', '0o7',
  '٣', '１２', '∞', '½', 'abc', '12abc', ' 3 ', '\t4\n', '1 000', '1_000', 'e', '1e',
  '--1', '+-1', '−5', '5%', '😀', 'ñ', '0', '-0', '0,0', '1e3', '1,5e-3', '2,4E9',
  'undefined', 'null', '   ',
];

const ALFABETO = '0123456789,.-+eE xñ😀−';

/** Un número bien escrito, con coma o punto, signo y exponente a veces. */
function textoNumerico(azar: Azar): string {
  const signo = elegir(azar, ['', '', '', '-', '+']);
  const parteEntera = String(entero(azar, 0, azar() < 0.7 ? 100 : 1e6));
  const decimales = azar() < 0.4 ? `${elegir(azar, [',', '.'])}${entero(azar, 0, 999)}` : '';
  const exponente = azar() < 0.1 ? `e${elegir(azar, ['', '-', '+'])}${entero(azar, 0, 12)}` : '';
  return `${signo}${parteEntera}${decimales}${exponente}`;
}

function textoCualquiera(azar: Azar): string {
  // `Array.from` recorre por puntos de código: el emoji no se parte en dos mitades.
  const letras = Array.from(ALFABETO);
  return Array.from({ length: entero(azar, 0, 6) }, () => elegir(azar, letras)).join('');
}

/** Un texto de campo: lo que quien usa la app podría tener tipeado en un campo. */
export function textoDeCampo(azar: Azar): string {
  const r = azar();
  if (r < 0.15) return '';
  if (r < 0.6) return textoNumerico(azar);
  if (r < 0.8) return elegir(azar, TEXTOS_BORDE);
  return textoCualquiera(azar);
}

export interface Caso {
  readonly textos: Record<string, string[]>;
  readonly multiplos: Record<string, Multiplo>;
}

/**
 * Un caso para `formula`: un texto por Variable escalar, de 1 a 4 por Variable de
 * lista, y un múltiplo cualquiera por Variable.
 *
 * `faltaClave` deja, a veces, una Variable sin entrada en `textos`: la sesión que la
 * pantalla recibe de `ProveedorSesion` no garantiza traerlas todas.
 */
export function generarCaso(azar: Azar, formula: Formula, faltaClave = true): Caso {
  // Uno de cada cinco casos carga sólo números: sin esto, casi todo cae en
  // `no-numerica` y los estados `exito` y `no-definido` quedan poco visitados.
  const soloNumeros = azar() < 0.2;
  const textos: Record<string, string[]> = {};
  const multiplos: Record<string, Multiplo> = {};
  for (const variable of formula.entradas) {
    multiplos[variable.simbolo] =
      azar() < 0.5 ? variable.multiploCanonico : elegir(azar, MULTIPLOS);
    if (faltaClave && azar() < 0.05) continue;
    const cuantos = variable.esLista ? entero(azar, 1, 4) : 1;
    textos[variable.simbolo] = Array.from({ length: cuantos }, () =>
      soloNumeros ? textoNumerico(azar) : textoDeCampo(azar),
    );
  }
  return { textos, multiplos };
}
