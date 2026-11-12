import type { Formula } from '@/dominio/formula';
import { FORMULAS } from '@/formulas';
import { esGraficable } from '@/graficas/muestreo';
import { diagnosticar } from '@/guia/diagnostico';
import { fraseDelGuia } from '@/guia/frases';

import { SEMILLA, generadorAleatorio, generarCaso, type Caso } from './generador';
import {
  comprobar,
  contarCaso,
  esperar,
  pesoCaso,
  type Propiedad,
  type Violacion,
} from './oraculo';

/**
 * Verificación por casos generados de `diagnosticar` + `fraseDelGuia`, sobre todas las
 * Fórmulas con entradas del registro. Ver `.agents/skills/verificar-diagnostico-guia`.
 *
 * Lo que «ve» la pantalla se toma del diagnóstico, que es lo que la pantalla dibuja
 * (`src/screens/formula/index.tsx`); que lo dibuje tal cual lo comprueba
 * `pantalla-guia.verif.tsx`.
 */

const ITERACIONES = Number(process.env.VERIFICAR_ITERACIONES ?? 1000);
const CALCULABLES = FORMULAS.filter((f) => f.entradas.length > 0);
const PROPIEDADES: readonly Propiedad[] = ['P1', 'P2', 'P3', 'P4', 'P5'];

interface Contraejemplo {
  readonly caso: string;
  readonly peso: number;
  readonly violacion: Violacion;
}

const hallazgos: Record<Propiedad, Contraejemplo[]> = { P1: [], P2: [], P3: [], P4: [], P5: [] };
const visitados: Record<string, number> = {};

function anotar(formula: Formula, caso: Caso, violacion: Violacion) {
  hallazgos[violacion.propiedad].push({ caso: contarCaso(formula, caso), peso: pesoCaso(caso), violacion });
}

beforeAll(() => {
  for (const [orden, formula] of CALCULABLES.entries()) {
    // Una semilla por Fórmula: sumar una Fórmula al registro no cambia los casos de las demás.
    const azar = generadorAleatorio(SEMILLA + orden * 7919);
    for (let i = 0; i < ITERACIONES; i++) {
      const caso = generarCaso(azar, formula);
      const esperado = esperar(formula, caso);
      visitados[esperado.estado] = (visitados[esperado.estado] ?? 0) + 1;
      let diagnostico;
      let frase;
      try {
        diagnostico = diagnosticar(formula, caso.textos, caso.multiplos);
        frase = fraseDelGuia(diagnostico, formula);
      } catch (error) {
        anotar(formula, caso, { propiedad: 'P5', detalle: `la pantalla se cae: ${String(error)}` });
        continue;
      }
      const violaciones = comprobar(formula, esperado, {
        marcados: diagnostico.estado === 'no-numerica' ? diagnostico.simbolos : [],
        resultado: diagnostico.mensaje,
        animacion: frase.animacion,
        textoGuia: frase.texto,
      });
      for (const v of violaciones) anotar(formula, caso, v);
    }
  }
  if (process.env.VERIFICAR_DETALLE) console.log('casos por estado', visitados);
});

function informe(propiedad: Propiedad): string {
  const lista = [...hallazgos[propiedad]].sort((a, b) => a.peso - b.peso);
  const formulas = new Set(lista.map((c) => c.caso.split(':')[0]));
  return [
    `${lista.length} contraejemplos en ${formulas.size} Fórmulas (semilla ${SEMILLA}, ${ITERACIONES} casos por Fórmula). Los más cortos:`,
    ...lista.slice(0, 5).map((c) => `  - ${c.caso}\n    → ${c.violacion.detalle}`),
  ].join('\n');
}

describe(`diagnóstico y guía en ${CALCULABLES.length} Fórmulas (semilla ${SEMILLA})`, () => {
  it('el oráculo se puede leer: ningún símbolo lleva «, » ni « y »', () => {
    const ambiguos = CALCULABLES.flatMap((f) => f.entradas.map((v) => v.simbolo)).filter(
      (s) => s.includes(', ') || s.includes(' y '),
    );
    expect(ambiguos).toEqual([]);
  });

  it('cubre todas las Fórmulas graficables y visita todos los estados', () => {
    expect(FORMULAS.filter(esGraficable).every((f) => CALCULABLES.includes(f))).toBe(true);
    const sinVisitar = ['vacia', 'no-numerica', 'faltantes', 'no-definido', 'exito'].filter(
      (estado) => !(visitados[estado] > 0),
    );
    expect(sinVisitar).toEqual([]);
  });

  it.each(PROPIEDADES)('%s se cumple en todos los casos generados', (propiedad) => {
    if (hallazgos[propiedad].length > 0) throw new Error(informe(propiedad));
  });

  it('una Fórmula fuera del registro: el guía no reta y la pantalla dice cuál', () => {
    const fantasma = { ...CALCULABLES[0], id: 'U99-F99' };
    const diagnostico = diagnosticar(fantasma, {}, {});
    expect(diagnostico.estado).toBe('desconocida');
    expect(diagnostico.mensaje).toBe('Fórmula desconocida: U99-F99');
    expect(fraseDelGuia(diagnostico, fantasma).animacion).not.toBe('retando');
  });
});
