import { buscarFormula } from '@/formulas';

import {
  escalaInicial,
  formatearLectura,
  formatearMarca,
  fraccionEn,
  marcas,
  rangoInicial,
  rangoY,
  valorEn,
} from './escala';

function variable(id: string, simbolo: string) {
  const formula = buscarFormula(id)!;
  return [...formula.entradas, formula.salida].find((v) => v.simbolo === simbolo)!;
}

describe('rangoInicial (D2)', () => {
  it('lineal: de 0 a 2·x, con x en el centro', () => {
    expect(rangoInicial(3000, 'lineal')).toEqual({ rango: { min: 0, max: 6000 }, escala: 'lineal' });
  });

  it('lineal con x negativo: de 2·x a 0, igual de centrado', () => {
    expect(rangoInicial(-5, 'lineal')).toEqual({ rango: { min: -10, max: 0 }, escala: 'lineal' });
  });

  it('lineal con x = 0: un paso del múltiplo de la Variable a cada lado', () => {
    expect(rangoInicial(0, 'lineal', 'k')).toEqual({
      rango: { min: -1000, max: 1000 },
      escala: 'lineal',
    });
  });

  it('log: de x/100 a x·100, dos décadas a cada lado', () => {
    expect(rangoInicial(3000, 'log')).toEqual({ rango: { min: 30, max: 300000 }, escala: 'log' });
  });

  it('log con x ≤ 0 no existe: vuelve a lineal y lo dice', () => {
    expect(rangoInicial(-4, 'log')).toEqual({
      rango: { min: -8, max: 0 },
      escala: 'lineal',
      aviso: 'La escala log necesita un valor mayor que cero: se muestra lineal.',
    });
    expect(rangoInicial(0, 'log').escala).toBe('lineal');
  });
});

describe('escalaInicial (D3)', () => {
  it('log para las Unidades de medida que abarcan décadas', () => {
    expect(escalaInicial(variable('U05-F17', 'B'))).toBe('log');
    expect(escalaInicial(variable('U03-F07', 'd'))).toBe('log');
    expect(escalaInicial(variable('U03-F01', 'P_o'))).toBe('log');
  });

  it('log para la SNR lineal aunque sea adimensional', () => {
    expect(escalaInicial(variable('U05-F17', 'SNR'))).toBe('log');
  });

  it('lineal por defecto: un adimensional cualquiera, un tiempo, un nivel en dB', () => {
    expect(escalaInicial({ ...variable('U05-F17', 'SNR'), simbolo: 'M' })).toBe('lineal');
    expect(escalaInicial({ ...variable('U05-F17', 'B'), unidadDeMedida: 's' })).toBe('lineal');
    expect(escalaInicial(variable('U03-F01', 'dB'))).toBe('lineal');
  });
});

describe('marcas', () => {
  it('lineal: escalones de 1, 2 o 5 por potencia de diez', () => {
    expect(marcas({ min: 0, max: 6000 }, 'lineal')).toEqual([0, 2000, 4000, 6000]);
    expect(marcas({ min: -0.08, max: 0.08 }, 'lineal')).toEqual([-0.05, 0, 0.05]);
  });

  it('log: una marca por década', () => {
    expect(marcas({ min: 30, max: 300000 }, 'log')).toEqual([100, 1000, 10000, 100000]);
  });
});

describe('formatearMarca', () => {
  it('log: cada marca lleva su propio múltiplo', () => {
    expect(formatearMarca(100, 'm', 'log')).toBe('100 m');
    expect(formatearMarca(1000, 'm', 'log')).toBe('1 km');
    expect(formatearMarca(1e6, 'Hz', 'log')).toBe('1 MHz');
    expect(formatearMarca(0.001, 'W', 'log')).toBe('1 mW');
  });

  it('log adimensional: potencias de diez, sin unidad', () => {
    expect(formatearMarca(100, 'adimensional', 'log')).toBe('100');
    expect(formatearMarca(1e6, 'adimensional', 'log')).toBe('10⁶');
    expect(formatearMarca(1e-3, 'adimensional', 'log')).toBe('10⁻³');
  });

  it('lineal: el número en el múltiplo del campo, sin unidad (la lleva el título del eje)', () => {
    expect(formatearMarca(4000, 'Hz', 'lineal', 'k')).toBe('4');
    expect(formatearMarca(-0.05, 'W', 'lineal', 'm')).toBe('−50');
    expect(formatearMarca(0.5, 'W', 'lineal')).toBe('0,5');
  });
});

describe('formatearLectura', () => {
  it('x en el múltiplo elegido en el campo; y en el múltiplo que elige el motor', () => {
    expect(
      formatearLectura({
        variableX: variable('U05-F17', 'B'),
        multiploX: '',
        x: 3000,
        salida: variable('U05-F17', 'C'),
        y: 30000,
      }),
    ).toBe('B = 3000 Hz → C = 30 kbit/s');
  });

  it('respeta el múltiplo del campo aunque no sea el más corto', () => {
    expect(
      formatearLectura({
        variableX: variable('U03-F07', 'd'),
        multiploX: 'k',
        x: 100,
        salida: variable('U03-F07', 'L_0'),
        y: 87.70856,
      }),
    ).toBe('d = 0,1 km → L_0 = 87,71 dB');
  });

  it('donde la Fórmula no está definida, la lectura lo dice con palabras', () => {
    expect(
      formatearLectura({
        variableX: variable('U03-F01', 'P_o'),
        multiploX: 'm',
        x: -0.01,
        salida: variable('U03-F01', 'dB'),
        y: null,
      }),
    ).toBe('P_o = −10 mW → dB = sin valor');
  });

  it('adimensional: sin unidad ni múltiplo', () => {
    expect(
      formatearLectura({
        variableX: variable('U05-F17', 'SNR'),
        multiploX: '',
        x: 1023,
        salida: variable('U05-F17', 'C'),
        y: 8e6,
      }),
    ).toBe('SNR = 1023 → C = 8 Mbit/s');
  });
});

describe('rangoY', () => {
  it('abarca los datos y el punto actual con un margen, en escalones lindos', () => {
    const segmento = [0, 1000, 2000, 6000].map((x) => ({ x, y: 10 * x }));
    expect(rangoY([segmento], 30000)).toEqual({ min: 0, max: 70000 });
  });

  it('sin datos no hay rango', () => {
    expect(rangoY([])).toBeNull();
  });

  it('una curva plana igual tiene altura', () => {
    const r = rangoY([[{ x: 0, y: 5 }, { x: 1, y: 5 }]])!;
    expect(r.min).toBeLessThan(5);
    expect(r.max).toBeGreaterThan(5);
  });
});

describe('posición en el eje', () => {
  it('lineal y log son inversas entre sí', () => {
    expect(fraccionEn(3000, { min: 0, max: 6000 }, 'lineal')).toBe(0.5);
    expect(fraccionEn(3000, { min: 30, max: 300000 }, 'log')).toBeCloseTo(0.5, 12);
    expect(valorEn(0.25, { min: 1, max: 1e4 }, 'log')).toBeCloseTo(10, 9);
  });
});
