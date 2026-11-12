import { isDeepStrictEqual } from 'util';

import { fireEvent, render, screen } from '@testing-library/react-native';

import type { Formula } from '@/dominio/formula';
import { FORMULAS, buscarFormula } from '@/formulas';
import { ANIMACIONES, type NombreAnimacion } from '@/guia/animaciones';
import { diagnosticar } from '@/guia/diagnostico';
import { PantallaFormula } from '@/screens/formula';

import { SEMILLA, generadorAleatorio, generarCaso, type Caso } from './generador';
import { comprobar, contarCaso, esperar } from './oraculo';

/**
 * La misma verificación, pero sobre la pantalla de verdad: se tipean los textos en los
 * campos y se lee lo que queda a la vista — los «Debe ser un número válido», el
 * `resultado`, el globo y la hoja del guía. Así se comprueba además que la pantalla
 * dibuja el diagnóstico tal cual (P4) y que el guía reacciona al mismo.
 *
 * Es cara (cada caso monta la pantalla entera), así que corre sobre una muestra.
 */

const FORMULAS_MUESTRA = Number(process.env.VERIFICAR_FORMULAS_PANTALLA ?? 10);
const CASOS_POR_FORMULA = Number(process.env.VERIFICAR_CASOS_PANTALLA ?? 6);

function muestra(): { formula: Formula; caso: Caso }[] {
  const azar = generadorAleatorio(SEMILLA ^ 0x5eed);
  const calculables = FORMULAS.filter((f) => f.entradas.length > 0);
  // Siempre una de lista (la entropía) y la de referencia del patrón; el resto, al azar.
  const elegidas = [buscarFormula('U04-F06')!, buscarFormula('U10-F07')!];
  while (elegidas.length < Math.min(FORMULAS_MUESTRA, calculables.length)) {
    const f = calculables[Math.floor(azar() * calculables.length)];
    if (!elegidas.includes(f)) elegidas.push(f);
  }
  return elegidas.flatMap((formula) =>
    Array.from({ length: CASOS_POR_FORMULA }, () => {
      // La pantalla arranca con el múltiplo canónico y acá no se lo cambia: los
      // múltiplos al azar ya los cubre la verificación pura.
      const { textos } = generarCaso(azar, formula, false);
      const multiplos = Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico]));
      return { formula, caso: { textos, multiplos } };
    }),
  );
}

/** El texto de un elemento, juntando el de sus hijos. */
function textoDe(nodo: unknown): string {
  if (typeof nodo === 'string' || typeof nodo === 'number') return String(nodo);
  if (nodo && typeof nodo === 'object' && 'children' in nodo) {
    return (nodo.children as unknown[]).map(textoDe).join('');
  }
  return '';
}

function animacionVisible(): NombreAnimacion {
  const hoja = screen.getByTestId('guia-sprite-hoja').props.source;
  const nombres = (Object.keys(ANIMACIONES) as NombreAnimacion[]).filter((n) =>
    isDeepStrictEqual(ANIMACIONES[n].hoja, hoja),
  );
  // Si dos animaciones compartieran hoja en las pruebas, no se podría saber cuál se ve.
  if (nombres.length !== 1) throw new Error(`hoja ambigua: ${nombres.join(', ')}`);
  return nombres[0];
}

const CASOS = muestra();

describe(`la pantalla y el guía dicen lo mismo (semilla ${SEMILLA})`, () => {
  it.each(CASOS.map((c) => [contarCaso(c.formula, c.caso), c] as const))('%s', async (_, { formula, caso }) => {
    await render(<PantallaFormula formula={formula} />);

    for (const variable of formula.entradas) {
      const textos = caso.textos[variable.simbolo];
      if (variable.esLista) {
        for (let i = 1; i < textos.length; i++) {
          await fireEvent.press(screen.getByTestId(`agregar-${variable.simbolo}`));
        }
        for (const [i, texto] of textos.entries()) {
          await fireEvent.changeText(screen.getByTestId(`entrada-${variable.simbolo}-${i}`), texto);
        }
      } else {
        await fireEvent.changeText(screen.getByTestId(`entrada-${variable.simbolo}`), textos[0]);
      }
    }

    const marcados = formula.entradas
      .map((v) => v.simbolo)
      .filter((s) => screen.queryByTestId(`error-campo-${s}`) !== null);
    for (const s of marcados) {
      expect(textoDe(screen.getByTestId(`error-campo-${s}`))).toBe('Debe ser un número válido');
    }
    const resultado = textoDe(screen.getByTestId('resultado'));
    const visto = {
      marcados,
      resultado,
      animacion: animacionVisible(),
      textoGuia: textoDe(screen.getByTestId('guia-globo')),
    };

    // P4 a nivel de pantalla: lo que se lee es el mensaje del diagnóstico, byte a byte.
    expect(resultado).toBe(diagnosticar(formula, caso.textos, caso.multiplos).mensaje);
    expect(comprobar(formula, esperar(formula, caso), visto)).toEqual([]);
  });
});
