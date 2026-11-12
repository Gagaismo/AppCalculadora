import type { Formula } from '@/dominio/formula';
import type { Multiplo } from '@/dominio/multiplos';
import { buscarFormula } from '@/formulas';

import { diagnosticar } from './diagnostico';

/**
 * Tests del diagnóstico de la pantalla de Fórmula.
 *
 * Un test por estado, con Fórmulas reales del catálogo. Los mensajes se afirman
 * textuales: son los que la pantalla ya mostraba antes de extraer el diagnóstico,
 * y no pueden cambiar.
 */

const anchoDeBanda = buscarFormula('U10-F07')!;
const separacion = buscarFormula('U10-F08')!;

function multiplosCanonicos(formula: Formula): Record<string, Multiplo> {
  return Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico]));
}

describe('diagnosticar', () => {
  it('con todos los campos vacíos el estado es «vacia» y pide todas las Variables', () => {
    const diagnostico = diagnosticar(
      anchoDeBanda,
      { f_sup: [''], f_inf: [''] },
      multiplosCanonicos(anchoDeBanda),
    );

    expect(diagnostico.estado).toBe('vacia');
    expect(diagnostico.simbolos).toEqual(['f_sup', 'f_inf']);
    expect(diagnostico.mensaje).toBe('Faltan: f_sup, f_inf');
    expect(diagnostico.valorCanonico).toBeNull();
  });

  it('con un campo no numérico el estado es «no-numerica» y nombra el campo', () => {
    const diagnostico = diagnosticar(
      anchoDeBanda,
      { f_sup: ['abc'], f_inf: ['2,4'] },
      multiplosCanonicos(anchoDeBanda),
    );

    expect(diagnostico.estado).toBe('no-numerica');
    expect(diagnostico.simbolos).toEqual(['f_sup']);
    expect(diagnostico.mensaje).toBe('Entrada no numérica en f_sup');
  });

  it('con varios campos no numéricos los lista separados por coma', () => {
    const diagnostico = diagnosticar(
      anchoDeBanda,
      { f_sup: ['abc'], f_inf: ['xyz'] },
      multiplosCanonicos(anchoDeBanda),
    );

    expect(diagnostico.estado).toBe('no-numerica');
    expect(diagnostico.simbolos).toEqual(['f_sup', 'f_inf']);
    expect(diagnostico.mensaje).toBe('Entrada no numérica en: f_sup, f_inf');
  });

  it('con una Variable faltante el estado es «faltantes» y dice «Falta: …»', () => {
    const diagnostico = diagnosticar(
      anchoDeBanda,
      { f_sup: ['2,4835'], f_inf: [''] },
      multiplosCanonicos(anchoDeBanda),
    );

    expect(diagnostico.estado).toBe('faltantes');
    expect(diagnostico.simbolos).toEqual(['f_inf']);
    expect(diagnostico.mensaje).toBe('Falta: f_inf');
  });

  it('cuando el cálculo no queda definido el estado es «no-definido»', () => {
    // Δf = BW / N_FFT con N_FFT = 0 no tiene resultado finito.
    const diagnostico = diagnosticar(
      separacion,
      { BW: ['20'], N_FFT: ['0'] },
      multiplosCanonicos(separacion),
    );

    expect(diagnostico.estado).toBe('no-definido');
    expect(diagnostico.simbolos).toEqual([]);
    expect(diagnostico.mensaje).toBe('La fórmula no está definida para los valores cargados.');
  });

  it('con una Fórmula fuera del registro el estado es «desconocida»', () => {
    const fueraDelRegistro: Formula = { ...anchoDeBanda, id: 'U99-F99' };
    const diagnostico = diagnosticar(
      fueraDelRegistro,
      { f_sup: ['2,4835'], f_inf: ['2,4'] },
      multiplosCanonicos(fueraDelRegistro),
    );

    expect(diagnostico.estado).toBe('desconocida');
    expect(diagnostico.simbolos).toEqual([]);
    expect(diagnostico.mensaje).toBe('Fórmula desconocida: U99-F99');
  });

  it('con todo cargado el estado es «exito» y trae el resultado escalado', () => {
    const diagnostico = diagnosticar(
      anchoDeBanda,
      { f_sup: ['2,4835'], f_inf: ['2,4'] },
      multiplosCanonicos(anchoDeBanda),
    );

    expect(diagnostico.estado).toBe('exito');
    expect(diagnostico.simbolos).toEqual([]);
    expect(diagnostico.mensaje).toBe('83,5 MHz');
    expect(diagnostico.valorCanonico).toBeCloseTo(83.5e6);
  });
});
