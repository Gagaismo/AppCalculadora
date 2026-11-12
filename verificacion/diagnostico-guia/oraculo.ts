import type { Formula } from '@/dominio/formula';
import { FACTOR, MULTIPLOS, aCanonico } from '@/dominio/multiplos';
import type { NombreAnimacion } from '@/guia/animaciones';

import type { Caso } from './generador';

/**
 * El oráculo: qué tendría que pasar con un caso, calculado sin pasar por
 * `diagnosticar` ni por `fraseDelGuia`, y la comparación con lo que pasó.
 *
 * Lo único que comparte con la app es la `calcular()` de cada Fórmula, que es el dato
 * bajo prueba de otro lado (sus Ejemplos resueltos), y la tabla de múltiplos.
 */

/**
 * Cómo lee la app un texto de campo (`parsearEntrada`, `src/screens/formula/numeros.ts`):
 * se recorta, la primera coma pasa a punto, y vale si `Number` da un número finito.
 * Se reescribe acá a propósito: si alguien cambia esa regla, esta verificación avisa.
 */
export function leerTexto(texto: string): 'vacia' | 'invalida' | number {
  const limpio = texto.trim().replace(',', '.');
  if (limpio === '') return 'vacia';
  const valor = Number(limpio);
  return Number.isFinite(valor) ? valor : 'invalida';
}

export type EstadoEsperado = 'vacia' | 'no-numerica' | 'faltantes' | 'no-definido' | 'exito';

export interface Esperado {
  readonly estado: EstadoEsperado;
  /** Los campos con algún texto que no es un número, en el orden de la Fórmula. */
  readonly invalidos: readonly string[];
  /** Las Variables sin ningún número cargado, en el orden de la Fórmula. */
  readonly faltan: readonly string[];
  /** El resultado en unidad canónica, cuando el estado es `exito`. */
  readonly canonico: number | null;
  /** Si la `calcular()` de la Fórmula lanzó con estos valores, lo que lanzó. */
  readonly lanzo?: unknown;
}

export function esperar(formula: Formula, caso: Caso): Esperado {
  const invalidos: string[] = [];
  const faltan: string[] = [];
  const valores: Record<string, number> = {};
  const listas: Record<string, number[]> = {};
  let hayAlgo = false;

  for (const variable of formula.entradas) {
    const leidos = (caso.textos[variable.simbolo] ?? ['']).map(leerTexto);
    if (leidos.some((l) => l !== 'vacia')) hayAlgo = true;
    if (leidos.includes('invalida')) {
      invalidos.push(variable.simbolo);
      continue;
    }
    const numeros = leidos.filter((l): l is number => typeof l === 'number');
    if (numeros.length === 0) {
      faltan.push(variable.simbolo);
      continue;
    }
    const multiplo = caso.multiplos[variable.simbolo];
    if (variable.esLista) listas[variable.simbolo] = numeros.map((n) => aCanonico(n, multiplo));
    else valores[variable.simbolo] = aCanonico(numeros[0], multiplo);
  }

  if (invalidos.length > 0) return { estado: 'no-numerica', invalidos, faltan, canonico: null };
  if (faltan.length > 0) {
    return { estado: hayAlgo ? 'faltantes' : 'vacia', invalidos, faltan, canonico: null };
  }
  try {
    const canonico = formula.calcular(valores, listas);
    return Number.isFinite(canonico)
      ? { estado: 'exito', invalidos, faltan, canonico }
      : { estado: 'no-definido', invalidos, faltan, canonico: null };
  } catch (error) {
    return { estado: 'no-definido', invalidos, faltan, canonico: null, lanzo: error };
  }
}

/**
 * Los mensajes de la pantalla, copiados byte a byte de `src/guia/diagnostico.ts`.
 * El de `exito` no está: depende del número y se comprueba leyéndolo de vuelta.
 */
export function mensajeEsperado(esperado: Esperado): string | null {
  const lista = (s: readonly string[]) => s.join(', ');
  switch (esperado.estado) {
    case 'no-numerica':
      return esperado.invalidos.length === 1
        ? `Entrada no numérica en ${esperado.invalidos[0]}`
        : `Entrada no numérica en: ${lista(esperado.invalidos)}`;
    case 'vacia':
    case 'faltantes':
      return esperado.faltan.length === 1
        ? `Falta: ${esperado.faltan[0]}`
        : `Faltan: ${lista(esperado.faltan)}`;
    case 'no-definido':
      return 'La fórmula no está definida para los valores cargados.';
    case 'exito':
      return null;
  }
}

/** «a», «a y b», «a, b y c» de vuelta a la lista. Ningún símbolo lleva «, » ni « y ». */
function desenumerar(texto: string): string[] {
  const corte = texto.lastIndexOf(' y ');
  if (corte < 0) return [texto];
  return [...texto.slice(0, corte).split(', '), texto.slice(corte + 3)];
}

/**
 * Los campos que nombra el globo del guía, o `null` si no nombra ninguno.
 * Lee las dos frases de `src/guia/frases.ts` que nombran campos.
 */
export function camposNombrados(textoGuia: string): string[] | null {
  const reto = /Mirá (?:el campo|los campos) (.+)\.$/u.exec(textoGuia);
  if (reto) return desenumerar(reto[1]);
  const falta = /^Te falta cargar (.+)\. Fijate (?:ese campo|esos campos)\.$/u.exec(textoGuia);
  if (falta) return desenumerar(falta[1]);
  return null;
}

/** Lo que se ve: en la prueba pura, lo dibuja el diagnóstico; en la de pantalla, el árbol. */
export interface Observado {
  /** Los campos con «Debe ser un número válido» debajo. */
  readonly marcados: readonly string[];
  /** El texto de `resultado`. */
  readonly resultado: string;
  readonly animacion: NombreAnimacion;
  readonly textoGuia: string;
}

export type Propiedad = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

export interface Violacion {
  readonly propiedad: Propiedad;
  readonly detalle: string;
}

const TEXTOS_ROTOS = /NaN|Infinity|undefined|null|\[object/;

/** El valor que muestra un resultado `«número» «múltiplo»«unidad»`, en unidad canónica. */
function leerResultado(resultado: string, unidad: string): number[] {
  const espacio = resultado.indexOf(' ');
  if (espacio < 0) return [];
  const numero = Number(resultado.slice(0, espacio).replace(',', '.'));
  const resto = resultado.slice(espacio + 1);
  if (!Number.isFinite(numero)) return [];
  return MULTIPLOS.filter((m) => resto === `${m}${unidad}`).map((m) => numero * FACTOR[m]);
}

const parecido = (a: number, b: number) =>
  Math.abs(a - b) <= 1e-8 * Math.max(Math.abs(a), Math.abs(b)) || Math.abs(a - b) < 1e-300;

const iguales = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

export function comprobar(formula: Formula, esperado: Esperado, visto: Observado): Violacion[] {
  const fallas: Violacion[] = [];
  const falla = (propiedad: Propiedad, detalle: string) => fallas.push({ propiedad, detalle });

  // P1: el guía reta si y sólo si la pantalla marca algún campo, y la pantalla marca
  // algún campo si y sólo si alguno no es un número.
  const reta = visto.animacion === 'retando';
  const marca = visto.marcados.length > 0;
  const debeMarcar = esperado.invalidos.length > 0;
  if (reta !== marca || marca !== debeMarcar) {
    falla(
      'P1',
      `el guía ${reta ? 'reta' : 'no reta'} (${visto.animacion}), la pantalla ${marca ? `marca ${visto.marcados.join(', ')}` : 'no marca ningún campo'}, y ${debeMarcar ? `no son números: ${esperado.invalidos.join(', ')}` : 'todos los campos son números o están vacíos'}`,
    );
  }

  // P2: cuando reta, nombra justo los campos marcados; cuando falta algo, justo los
  // que faltan, que son también los que lista la pantalla.
  const nombrados = camposNombrados(visto.textoGuia);
  if (reta && !(nombrados && iguales(nombrados, visto.marcados) && iguales(nombrados, esperado.invalidos))) {
    falla(
      'P2',
      `el guía dice «${visto.textoGuia}» pero la pantalla marca ${visto.marcados.join(', ') || 'nada'} y no son números: ${esperado.invalidos.join(', ')}`,
    );
  }
  if (esperado.estado === 'faltantes' && !(nombrados && iguales(nombrados, esperado.faltan))) {
    falla(
      'P2',
      `faltan ${esperado.faltan.join(', ')} y el guía dice «${visto.textoGuia}» (${visto.animacion})`,
    );
  }

  // P3: festeja si y sólo si hay resultado, y lo que dice es el resultado de la pantalla.
  const festeja = visto.animacion === 'festejando';
  const hayResultado = esperado.estado === 'exito';
  if (festeja !== hayResultado) {
    falla(
      'P3',
      `el guía ${festeja ? 'festeja' : `no festeja (${visto.animacion})`} y ${hayResultado ? `la Fórmula da ${esperado.canonico} en unidad canónica` : `no hay resultado (${esperado.estado})`}; el guía dice «${visto.textoGuia}»`,
    );
  } else if (festeja && (visto.resultado === '' || !visto.textoGuia.includes(visto.resultado))) {
    falla('P3', `la pantalla muestra «${visto.resultado}» y el guía dice «${visto.textoGuia}»`);
  }

  // P4: el mensaje de la pantalla es el de siempre, letra por letra.
  const mensaje = mensajeEsperado(esperado);
  if (mensaje !== null && visto.resultado !== mensaje) {
    falla('P4', `la pantalla muestra «${visto.resultado}» donde va «${mensaje}»`);
  }
  if (mensaje === null && esperado.canonico !== null) {
    const leidos = leerResultado(visto.resultado, formula.salida.unidadDeMedida);
    if (!leidos.some((v) => parecido(v, esperado.canonico!))) {
      falla(
        'P4',
        `la pantalla muestra «${visto.resultado}» y la Fórmula da ${esperado.canonico} ${formula.salida.unidadDeMedida}`,
      );
    }
  }

  // P5: nada de NaN, Infinity ni undefined en lo que se lee.
  for (const texto of [visto.resultado, visto.textoGuia]) {
    if (TEXTOS_ROTOS.test(texto)) falla('P5', `se lee «${texto}»`);
  }
  if (esperado.lanzo !== undefined) {
    falla('P5', `la calcular() de la Fórmula lanza: ${String(esperado.lanzo)}`);
  }

  return fallas;
}

/** Un caso contado como lo cargaría alguien: campo por campo, con su múltiplo. */
export function contarCaso(formula: Formula, caso: Caso): string {
  const campos = formula.entradas.map((v) => {
    const textos = caso.textos[v.simbolo];
    const valor = textos === undefined ? '(sin clave)' : textos.map((t) => JSON.stringify(t)).join(' | ');
    return `${v.simbolo} = ${valor} [${caso.multiplos[v.simbolo]}${v.unidadDeMedida}]`;
  });
  return `${formula.id}: ${campos.join('; ')}`;
}

/** Cuánto «pesa» un caso, para mostrar primero el contraejemplo más corto. */
export function pesoCaso(caso: Caso): number {
  return Object.values(caso.textos).reduce((s, t) => s + t.join('').length + t.length, 0);
}
