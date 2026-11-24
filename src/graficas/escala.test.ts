import { MULTIPLOS } from '@/dominio/multiplos';
import { buscarFormula } from '@/formulas';

import {
  escalaInicial,
  formatearCifras,
  formatearLectura,
  formatearMarca,
  fraccionEn,
  marcas,
  rangoInicial,
  rangoY,
  unidadConMultiplo,
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

  // S1, review de PR #24: un valor extremo no deja un marco que no se pueda dibujar.
  // Con 1e-323 el piso x/100 se iba a 0 y log₁₀(0) = −∞; con 1e307 el techo x·100
  // era Infinity y el bucle de `marcas` no avanzaba (la app se colgaba).
  it.each([
    [1e-323, 'log'],
    [Number.MIN_VALUE, 'log'],
    [1e307, 'log'],
    [Number.MAX_VALUE, 'log'],
    [1e308, 'lineal'],
    [-1e308, 'lineal'],
  ] as const)('con x = %p en %s el marco es finito, válido y contiene a x', (valor, escala) => {
    const { rango, escala: final } = rangoInicial(valor, escala);
    expect(final).toBe(escala);
    expect(Number.isFinite(rango.min)).toBe(true);
    expect(Number.isFinite(rango.max)).toBe(true);
    expect(rango.max).toBeGreaterThan(rango.min);
    if (final === 'log') expect(rango.min).toBeGreaterThan(0);
    expect(rango.min).toBeLessThanOrEqual(valor);
    expect(rango.max).toBeGreaterThanOrEqual(valor);
    const f = fraccionEn(valor, rango, final);
    expect(f).toBeGreaterThanOrEqual(0);
    expect(f).toBeLessThanOrEqual(1);
    const ms = marcas(rango, final);
    expect(ms.length).toBeGreaterThan(0);
    expect(ms.every(Number.isFinite)).toBe(true);
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

  // S1, review de PR #24: `marcas` termina para cualquier entrada y sólo devuelve
  // números finitos. Antes, un techo infinito en log o un paso por debajo de la
  // resolución del double en lineal (1e16 + 1 === 1e16) dejaban el bucle sin avanzar.
  it.each([
    ['log hasta Infinity', { min: 1e305, max: Infinity }, 'log'],
    ['log desde 0', { min: 0, max: 1e4 }, 'log'],
    ['log con NaN', { min: NaN, max: NaN }, 'log'],
    ['lineal por debajo de la resolución', { min: 1e16, max: 1e16 + 4 }, 'lineal'],
    ['lineal de −MAX a MAX', { min: -Number.MAX_VALUE, max: Number.MAX_VALUE }, 'lineal'],
    ['lineal con NaN', { min: NaN, max: NaN }, 'lineal'],
    ['lineal hasta Infinity', { min: 0, max: Infinity }, 'lineal'],
  ] as const)('%s: termina y no devuelve números no finitos', (_, rango, escala) => {
    const ms = marcas(rango, escala);
    expect(ms.length).toBeLessThanOrEqual(20);
    expect(ms.every(Number.isFinite)).toBe(true);
  });

  it('lineal de −MAX a MAX: igual pone marcas', () => {
    expect(marcas({ min: -Number.MAX_VALUE, max: Number.MAX_VALUE }, 'lineal').length).toBeGreaterThan(1);
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

// S1, review de PR #24: ningún rótulo ni lectura lleva Infinity ni NaN para una
// entrada finita. Antes la mantisa salía de dividir por 10 ** e, que con e = −324
// es 0 («Infinity·10⁻³²⁴»), y el múltiplo se aplicaba dividiendo, que desborda
// (MAX en pico) o se va a 0 (MIN_VALUE en tera).
describe('formatearCifras', () => {
  it('los extremos del double se escriben con su mantisa y su exponente', () => {
    expect(formatearCifras(Number.MIN_VALUE, 4)).toBe('4,941·10⁻³²⁴');
    expect(formatearCifras(-Number.MIN_VALUE, 4)).toBe('−4,941·10⁻³²⁴');
    expect(formatearCifras(Number.MAX_VALUE, 4)).toBe('1,798·10³⁰⁸');
    expect(formatearCifras(-Number.MAX_VALUE, 4)).toBe('−1,798·10³⁰⁸');
  });

  it('una mantisa que redondea a 10 sube de exponente', () => {
    expect(formatearCifras(999999999, 4)).toBe('1·10⁹');
    expect(formatearCifras(9999999.6, 4)).toBe('1·10⁷');
    expect(formatearCifras(0.00099996, 4)).toBe('0,001');
    expect(formatearCifras(9.9996e-5, 4)).toBe('1·10⁻⁴');
  });

  it('dentro de [10⁻³, 10⁷) sigue escribiendo el número entero o con coma', () => {
    expect(formatearCifras(3000, 4)).toBe('3000');
    expect(formatearCifras(87.70856, 4)).toBe('87,71');
    expect(formatearCifras(-0.05, 3)).toBe('−0,05');
    expect(formatearCifras(0, 4)).toBe('0');
  });
});

describe('ningún formato escribe Infinity ni NaN', () => {
  const M = Number.MAX_VALUE;
  const min = Number.MIN_VALUE;
  const valores = [
    min, -min, 1e-323, -1e-323, 1e-320, 2.2e-308, 1e-300, 1e-12, 0.00099996,
    999999999, 9999999.6, 1e300, 1e308, M, -M,
  ];
  const malo = /Infinity|NaN|undefined/;

  it.each([1, 2, 3, 4, 6, 10])('formatearCifras con %i cifras', (cifras) => {
    for (const v of [...valores, 0]) expect(formatearCifras(v, cifras)).not.toMatch(malo);
  });

  it.each(MULTIPLOS.map((m) => [m]))('formatearMarca y formatearLectura con el múltiplo «%s»', (m) => {
    for (const v of valores) {
      expect(formatearMarca(v, 'V', 'lineal', m)).not.toMatch(malo);
      expect(formatearMarca(v, 'adimensional', 'lineal', m)).not.toMatch(malo);
      if (v > 0) {
        expect(formatearMarca(v, 'V', 'log', m)).not.toMatch(malo);
        expect(formatearMarca(v, 'adimensional', 'log', m)).not.toMatch(malo);
      }
      const texto = formatearLectura({
        variableX: variable('U05-F17', 'B'),
        multiploX: m,
        x: v,
        salida: variable('U05-F17', 'C'),
        y: v,
      });
      expect(texto).not.toMatch(malo);
    }
  });

  it('un valor que no entra en el múltiplo igual se escribe en ese múltiplo', () => {
    expect(formatearMarca(Number.MAX_VALUE, 'V', 'lineal', 'p')).toBe('1,8·10³²⁰');
    expect(formatearMarca(Number.MIN_VALUE, 'V', 'lineal', 'T')).toBe('4,94·10⁻³³⁶');
    expect(formatearMarca(Number.MIN_VALUE, 'Hz', 'log')).toBe('4,94·10⁻³¹² pHz');
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

// S7: la regla de S3 (`admitePrefijo`) también rige títulos, marcas y lectura.
describe('sin prefijos SI donde la Unidad de medida no los admite (S7)', () => {
  it('el título no le pone múltiplo a %, dB ni a un adimensional', () => {
    expect(unidadConMultiplo('%', 'k')).toBe('%');
    expect(unidadConMultiplo('dB', 'm')).toBe('dB');
    expect(unidadConMultiplo('adimensional', 'M')).toBe('');
    expect(unidadConMultiplo('Hz', 'k')).toBe('kHz');
  });

  it('la lectura escribe y en su forma base: «Rd = −1000 %», «SNR = 10000», «BER = 1·10⁻⁶»', () => {
    const leer = (id: string, x: string, salida: string, y: number) =>
      formatearLectura({ variableX: variable(id, x), multiploX: '', x: 1, salida: variable(id, salida), y });
    expect(leer('U04-F08', 'H_MAX', 'Rd', -1000)).toBe('H_MAX = 1 bit/símbolo → Rd = −1000 %');
    expect(leer('U03-F14', 'S', 'SNR', 10000)).toBe('S = 1 W → SNR = 10000');
    expect(leer('U06-F01', 'N_e', 'BER', 1e-6)).toBe('N_e = 1 bit → BER = 1·10⁻⁶');
    expect(leer('U03-F07', 'd', 'L_0', 0.5)).toBe('d = 1 m → L_0 = 0,5 dB');
  });

  it('x con un múltiplo que su Unidad de medida no admite se escribe en la forma base', () => {
    expect(
      formatearLectura({
        variableX: variable('U04-F08', 'H'),
        multiploX: 'k',
        x: 0.811,
        salida: variable('U04-F08', 'Rd'),
        y: 18.9,
      }),
    ).toBe('H = 0,811 bit/símbolo → Rd = 18,9 %');
  });

  it('las marcas log de %, dB o un adimensional no llevan múltiplo', () => {
    expect(formatearMarca(1000, '%', 'log')).toBe('1000 %');
    expect(formatearMarca(0.001, 'dB', 'log')).toBe('10⁻³ dB');
    expect(formatearMarca(1e6, 'adimensional', 'log')).toBe('10⁶');
  });

  it('las marcas lineales ignoran un múltiplo que la Unidad de medida no admite', () => {
    expect(formatearMarca(-1000, '%', 'lineal', 'k')).toBe('−1000');
    expect(formatearMarca(2e6, 'adimensional', 'lineal', 'M')).toBe('2000000');
  });

  it('las que sí admiten prefijos los siguen llevando', () => {
    expect(formatearMarca(1000, 'm', 'log')).toBe('1 km');
    expect(formatearMarca(3000, 'Hz', 'lineal', 'k')).toBe('3');
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

  // S1: una serie constante nunca deja min = max ni un borde no finito. Con todo en 0
  // la cuenta vieja recortaba lo a 0 por «nunca negativa» y hi a 0 por «nunca
  // positiva», y el Lienzo dividía por cero al dibujar (NaN en el path).
  const plana = (y: number, n = 50) => [Array.from({ length: n }, (_, i) => ({ x: i, y }))];
  const casosConstantes: [string, Parameters<typeof rangoY>[0], number | null | undefined][] = [
    ['todo en 0', plana(0), undefined],
    ['todo en 0, con el punto actual en 0', plana(0), 0],
    ['todo en 0, con el punto actual en 5', plana(0), 5],
    ['todo en 0, con el punto actual en −5', plana(0), -5],
    ['todo positivo', plana(5), 5],
    ['todo negativo', plana(-5), -5],
    ['un solo punto en 0', plana(0, 1), 0],
    ['un solo punto positivo', plana(3e-21, 1), 3e-21],
    ['un solo punto negativo', plana(-7, 1), null],
  ];
  it.each(casosConstantes)('serie constante (%s): rango finito con altura', (_, segmentos, y) => {
    const r = rangoY(segmentos, y)!;
    expect(Number.isFinite(r.min)).toBe(true);
    expect(Number.isFinite(r.max)).toBe(true);
    expect(r.max).toBeGreaterThan(r.min);
    const valor = segmentos[0][0].y;
    expect(r.min).toBeLessThanOrEqual(valor);
    expect(r.max).toBeGreaterThanOrEqual(valor);
  });

  // S1, review de PR #24: una serie finita pero extrema no se va fuera del eje. Antes,
  // ensanchar con el margen desbordaba a Infinity y la guarda devolvía [0, 1].
  const M = Number.MAX_VALUE;
  it.each([
    ['un punto en −1,7·10³⁰⁸', [[{ x: 1, y: -1.7e308 }]], -1.7e308],
    ['un punto en 1,7·10³⁰⁸', [[{ x: 1, y: 1.7e308 }]], 1.7e308],
    ['plana en MAX', plana(M), M],
    ['plana en −MAX', plana(-M), -M],
    ['de −MAX a MAX', [[{ x: 0, y: -M }, { x: 1, y: M }]], null],
    ['de 0 a 1,7·10³⁰⁸', [[{ x: 0, y: 0 }, { x: 1, y: 1.7e308 }]], null],
  ] as [string, Parameters<typeof rangoY>[0], number | null][])(
    'serie extrema (%s): rango finito que la contiene',
    (_, segmentos, y) => {
      const r = rangoY(segmentos, y)!;
      const ys = segmentos.flat().map((p) => p.y);
      expect(Number.isFinite(r.min)).toBe(true);
      expect(Number.isFinite(r.max)).toBe(true);
      expect(r.max).toBeGreaterThan(r.min);
      expect(r.min).toBeLessThanOrEqual(Math.min(...ys));
      expect(r.max).toBeGreaterThanOrEqual(Math.max(...ys));
      const f = ys.map((v) => fraccionEn(v, r, 'lineal'));
      expect(f.every((v) => v >= 0 && v <= 1)).toBe(true);
    },
  );

  // S1, review de PR #24: los subnormales. El paso del eje se redondeaba a 0 y la
  // guarda devolvía [0, 1], que no contiene a −1e-323.
  const subnormales = [
    -1e-323, 1e-323, Number.MIN_VALUE, -Number.MIN_VALUE, 1e-320, -1e-310, 3e-308, -2.2e-308,
  ];
  it.each(subnormales.flatMap((y) => [[y, 'un punto'], [y, 'plana']] as const))(
    'serie constante en %p (%s): rango finito, abierto, que la contiene',
    (y, forma) => {
      const segmentos = forma === 'plana' ? plana(y) : [[{ x: 1, y }]];
      for (const actual of [y, null, 0]) {
        const r = rangoY(segmentos, actual)!;
        expect(Number.isFinite(r.min)).toBe(true);
        expect(Number.isFinite(r.max)).toBe(true);
        expect(r.max).toBeGreaterThan(r.min);
        expect(r.min).toBeLessThanOrEqual(Math.min(y, actual ?? y));
        expect(r.max).toBeGreaterThanOrEqual(Math.max(y, actual ?? y));
        const f = fraccionEn(y, r, 'lineal');
        expect(f).toBeGreaterThanOrEqual(0);
        expect(f).toBeLessThanOrEqual(1);
      }
    },
  );

  it('una serie entre dos subnormales distintos también entra', () => {
    const r = rangoY([[{ x: 0, y: Number.MIN_VALUE }, { x: 1, y: 3 * Number.MIN_VALUE }]])!;
    expect(r.max).toBeGreaterThan(r.min);
    expect(r.min).toBeLessThanOrEqual(Number.MIN_VALUE);
    expect(r.max).toBeGreaterThanOrEqual(3 * Number.MIN_VALUE);
  });

  it('todo en 0: la línea plana queda dentro del eje, no sobre un borde colapsado', () => {
    const r = rangoY(plana(0), 0)!;
    expect(r.min).toBeLessThanOrEqual(0);
    expect(r.max).toBeGreaterThan(0);
  });
});

describe('posición en el eje', () => {
  it('lineal y log son inversas entre sí', () => {
    expect(fraccionEn(3000, { min: 0, max: 6000 }, 'lineal')).toBe(0.5);
    expect(fraccionEn(3000, { min: 30, max: 300000 }, 'log')).toBeCloseTo(0.5, 12);
    expect(valorEn(0.25, { min: 1, max: 1e4 }, 'log')).toBeCloseTo(10, 9);
  });
});
