import { aCanonico, conMultiplo, desdeCanonico, elegirMultiplo } from './multiplos';

describe('conversión de múltiplos', () => {
  it('lleva GHz a Hz', () => {
    expect(aCanonico(2.4, 'G')).toBe(2.4e9);
  });

  it('lleva Hz a MHz para mostrar', () => {
    expect(desdeCanonico(83.5e6, 'M')).toBe(83.5);
  });

  it('deja el valor intacto sin múltiplo', () => {
    expect(aCanonico(1200, '')).toBe(1200);
  });

  it('maneja los múltiplos chicos', () => {
    expect(aCanonico(1, 'µ')).toBe(1e-6);
    expect(aCanonico(250, 'n')).toBeCloseTo(2.5e-7, 15);
  });
});

describe('elegirMultiplo', () => {
  it('elige M para 83,5 millones', () => {
    expect(elegirMultiplo(83.5e6)).toBe('M');
  });

  it('elige G a partir de mil millones', () => {
    expect(elegirMultiplo(1.2e9)).toBe('G');
  });

  it('no usa múltiplo para valores entre 1 y 999', () => {
    expect(elegirMultiplo(1200 / 2)).toBe('');
    expect(elegirMultiplo(1)).toBe('');
  });

  it('elige k justo en el límite de mil', () => {
    expect(elegirMultiplo(1000)).toBe('k');
    expect(elegirMultiplo(999)).toBe('');
  });

  it('respeta el signo', () => {
    expect(elegirMultiplo(-83.5e6)).toBe('M');
  });

  it('devuelve el múltiplo base para cero y para valores no finitos', () => {
    expect(elegirMultiplo(0)).toBe('');
    expect(elegirMultiplo(Number.NaN)).toBe('');
    expect(elegirMultiplo(Number.POSITIVE_INFINITY)).toBe('');
  });

  it('baja a los múltiplos chicos', () => {
    expect(elegirMultiplo(0.25)).toBe('m');
    expect(elegirMultiplo(2.5e-7)).toBe('n');
  });
});

describe('conMultiplo', () => {
  it('arma el nombre de la unidad como se escribe', () => {
    expect(conMultiplo('G', 'Hz')).toBe('GHz');
    expect(conMultiplo('', 'Hz')).toBe('Hz');
    expect(conMultiplo('k', 'bit/s')).toBe('kbit/s');
  });
});
