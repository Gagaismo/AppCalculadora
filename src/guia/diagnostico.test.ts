import type { Formula } from '@/dominio/formula';
import type { Multiplo } from '@/dominio/multiplos';
import { buscarFormula } from '@/formulas';

import { diagnosticar } from './diagnostico';
import { fraseDelGuia } from './frases';

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

describe('resultados sin prefijos indebidos (S3 y S4)', () => {
  it('no agrega prefijo SI a dB en U03-F15 ni en el globo del guía', () => {
    const formula = buscarFormula('U03-F15')!;
    const diagnostico = diagnosticar(
      formula,
      { S: ['12'], N: ['10'] },
      multiplosCanonicos(formula),
    );

    expect(diagnostico.mensaje).toBe('0,7918124605 dB');
    expect(fraseDelGuia(diagnostico, formula).texto).toContain('0,7918124605 dB');
  });

  it('no agrega prefijo SI a adimensional en U03-F14, U06-F01 y U02-F15', () => {
    const snr = buscarFormula('U03-F14')!;
    const diagSnr = diagnosticar(
      snr,
      { S: ['10'], N: ['1'] },
      { S: '', N: 'm' },
    );
    expect(diagSnr.mensaje).toBe('10000 adimensional');

    const ber = buscarFormula('U06-F01')!;
    const diagBer = diagnosticar(
      ber,
      { N_e: ['1'], N_t: ['0,1'] },
      multiplosCanonicos(ber),
    );
    expect(diagBer.mensaje).toBe('0,00001 adimensional');

    const cuadrada = buscarFormula('U02-F15')!;
    const diagCuadrada = diagnosticar(
      cuadrada,
      { n: ['3'] },
      multiplosCanonicos(cuadrada),
    );
    expect(diagCuadrada.mensaje).toBe('0,4244131816 adimensional');
  });

  it('no agrega prefijo SI a %, dBm ni bit/símbolo', () => {
    const redundancia = buscarFormula('U04-F08')!;
    const diagRd = diagnosticar(
      redundancia,
      { H_MAX: ['2'], H: ['1,99'] },
      multiplosCanonicos(redundancia),
    );
    expect(diagRd.mensaje).toBe('0,5 %');

    const dbm = buscarFormula('U03-F04')!;
    const diagDbm = diagnosticar(dbm, { P: ['1,1'] }, multiplosCanonicos(dbm));
    expect(diagDbm.mensaje).toBe('0,4139268516 dBm');

    const entropia = buscarFormula('U04-F06')!;
    const diagH = diagnosticar(
      entropia,
      { P: ['0,9', '0,1'] },
      multiplosCanonicos(entropia),
    );
    expect(diagH.mensaje).toBe('0,4689955936 bit/símbolo');
  });

  it('muestra s² sin prefijo en U02-F29 (S4)', () => {
    const formula = buscarFormula('U02-F29')!;
    const diagnostico = diagnosticar(
      formula,
      { p: ['1'], f: ['0'] },
      multiplosCanonicos(formula),
    );

    expect(diagnostico.mensaje).toBe('0,000001 s²');
    expect(fraseDelGuia(diagnostico, formula).texto).toContain('0,000001 s²');
  });
});

describe('residuos de punto flotante (S6)', () => {
  it('U02-F21 devuelve exactamente 0 V en el primer cero (A=1, p=1, T=2, n=2)', () => {
    const formula = buscarFormula('U02-F21')!;
    const diagnostico = diagnosticar(
      formula,
      { A: ['1'], p: ['1'], T: ['2'], n: ['2'] },
      multiplosCanonicos(formula),
    );

    expect(diagnostico.mensaje).toBe('0 V');
    expect(diagnostico.valorCanonico).toBe(0);
  });

  it('U08-F09 devuelve exactamente 0 V en V_p=1, f_p=1 kHz, t=1 ms', () => {
    const formula = buscarFormula('U08-F09')!;
    const diagnostico = diagnosticar(
      formula,
      { V_p: ['1'], f_p: ['1'], t: ['1'] },
      multiplosCanonicos(formula),
    );

    expect(diagnostico.mensaje).toBe('0 V');
    expect(diagnostico.valorCanonico).toBe(0);
  });

  it('U02-F27 devuelve 0 s en el primer cero exacto (ω = 2π)', () => {
    const formula = buscarFormula('U02-F27')!;
    const conDosPi = diagnosticar(
      formula,
      { p: ['1'], ω: [String(2 * Math.PI)] },
      { p: '', ω: '' },
    );
    expect(conDosPi.mensaje).toBe('0 s');
    expect(conDosPi.valorCanonico).toBe(0);
  });

  it('conserva valores chicos legítimos cerca de los ceros en U08-F09, U02-F27 y U02-F21', () => {
    const portadora = buscarFormula('U08-F09')!;
    const diagPortadora = diagnosticar(
      portadora,
      { V_p: ['1'], f_p: ['1'], t: ['0,0000000000001'] },
      multiplosCanonicos(portadora),
    );
    expect(diagPortadora.valorCanonico).toBeCloseTo(6.283185307e-13, 21);
    expect(diagPortadora.mensaje).not.toBe('0 V');

    const pulsoOmega = buscarFormula('U02-F27')!;
    const diagPulsoOmega = diagnosticar(
      pulsoOmega,
      { p: ['1'], ω: ['6,28318531'] },
      { p: '', ω: '' },
    );
    expect(diagPulsoOmega.valorCanonico).toBeCloseTo(-4.4888e-10, 13);
    expect(diagPulsoOmega.mensaje).not.toBe('0 s');

    const pulsos = buscarFormula('U02-F21')!;
    const diagPulsos = diagnosticar(
      pulsos,
      { A: ['1'], p: ['1,000000000001'], T: ['2'], n: ['2'] },
      multiplosCanonicos(pulsos),
    );
    expect(diagPulsos.valorCanonico).not.toBe(0);
    expect(diagPulsos.mensaje).not.toBe('0 V');
  });

  it('mantiene intactos los valores chicos legítimos como U03-F10 con T = 290 K', () => {
    const formula = buscarFormula('U03-F10')!;
    const diagnostico = diagnosticar(formula, { T: ['290'] }, multiplosCanonicos(formula));

    expect(diagnostico.valorCanonico).toBeCloseTo(4.002e-21, 30);
    expect(diagnostico.mensaje).not.toBe('0 W/Hz');
  });
});
