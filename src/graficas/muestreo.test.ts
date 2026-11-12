import { calcular } from '@/dominio/motor';
import { aCanonico } from '@/dominio/multiplos';
import { buscarFormula, ejemplosDeFormula, FORMULAS } from '@/formulas';

import { esGraficable, evaluar, huecos, muestrear, variablesEjeX } from './muestreo';
import type { Segmento } from './tipos';

function formula(id: string) {
  const encontrada = buscarFormula(id);
  if (!encontrada) throw new Error(`No existe ${id}`);
  return encontrada;
}

/** El Ejemplo resuelto llevado a unidad canónica, como lo recibe `muestrear`. */
function canonicos(id: string, indice: number): Record<string, number> {
  const ejemplo = ejemplosDeFormula(id)[indice];
  const valores: Record<string, number> = {};
  for (const [simbolo, cargado] of Object.entries(ejemplo.entradas)) {
    if ('valor' in cargado) valores[simbolo] = aCanonico(cargado.valor, cargado.multiplo);
  }
  return valores;
}

function buscarPunto(segmentos: readonly Segmento[], x: number) {
  return segmentos.flat().find((p) => p.x === x);
}

function todosFinitos(segmentos: readonly Segmento[]) {
  return segmentos.flat().every((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
}

describe('qué Fórmulas se grafican', () => {
  it('una Fórmula calculable se grafica y ofrece sus Variables escalares como eje X', () => {
    expect(esGraficable(formula('U05-F17'))).toBe(true);
    expect(variablesEjeX(formula('U05-F17')).map((v) => v.simbolo)).toEqual(['B', 'SNR']);
  });

  it('una ficha de consulta, sin entradas, no tiene gráfica', () => {
    const ficha = FORMULAS.find((f) => f.entradas.length === 0);
    expect(ficha).toBeDefined();
    expect(esGraficable(ficha!)).toBe(false);
  });

  it('una Variable de lista no es candidata al eje X; si es la única entrada, no hay gráfica', () => {
    const entropia = formula('U04-F06');
    expect(entropia.entradas.every((v) => v.esLista)).toBe(true);
    expect(variablesEjeX(entropia)).toEqual([]);
    expect(esGraficable(entropia)).toBe(false);
  });
});

describe('muestrear contra los Ejemplos resueltos', () => {
  it('U05-F17, Ejemplo 07 (pág. 27): en B = 3000 Hz con SNR = 1023 la curva pasa por 30000 bit/s', () => {
    const shannon = formula('U05-F17');
    const valores = canonicos('U05-F17', 1);
    expect(valores).toEqual({ B: 3000, SNR: 1023 });

    const segmentos = muestrear({
      formula: shannon,
      valoresCanonicos: valores,
      variableX: 'B',
      rango: { min: 0, max: 6000 },
      escala: 'lineal',
      incluir: [3000],
    });

    expect(segmentos).toHaveLength(1);
    expect(buscarPunto(segmentos, 3000)?.y).toBe(30000);
    // El punto actual es la misma calcular() de la Fórmula, sin ninguna aproximación.
    expect(evaluar(shannon, valores)).toBe(shannon.calcular(valores, {}));
  });

  it('U05-F17, Ejemplo 06 (pág. 27): B = 1 MHz, SNR = 255 da 8 Mbit/s, igual que el motor', () => {
    const shannon = formula('U05-F17');
    const valores = canonicos('U05-F17', 0);
    expect(valores).toEqual({ B: 1e6, SNR: 255 });

    const segmentos = muestrear({
      formula: shannon,
      valoresCanonicos: valores,
      variableX: 'B',
      rango: { min: 1e4, max: 1e8 },
      escala: 'log',
      incluir: [1e6],
    });

    expect(buscarPunto(segmentos, 1e6)?.y).toBe(8e6);
    const motor = calcular('U05-F17', ejemplosDeFormula('U05-F17')[0].entradas);
    expect(motor).toMatchObject({ ok: true, valor: 8, multiplo: 'M' });
  });

  it('el muestreo log reparte los puntos en décadas iguales y respeta la cantidad pedida', () => {
    const segmentos = muestrear({
      formula: formula('U05-F17'),
      valoresCanonicos: { B: 3000, SNR: 1023 },
      variableX: 'SNR',
      rango: { min: 1, max: 1e4 },
      escala: 'log',
      puntos: 5,
    });
    expect(segmentos[0].map((p) => p.x)).toEqual([1, 10, 100, 1000, 10000]);
  });

  it('U03-F07 (pág. 26): con f = 5,8 GHz, la curva en d = 100 m da 87,71 dB', () => {
    const espacioLibre = formula('U03-F07');
    const ejemplo = ejemplosDeFormula('U03-F07')[0];
    const valores = canonicos('U03-F07', 0);
    expect(valores).toEqual({ f: 5.8e9, d: 100 });

    const segmentos = muestrear({
      formula: espacioLibre,
      valoresCanonicos: valores,
      variableX: 'd',
      rango: { min: 1, max: 1e4 },
      escala: 'log',
      incluir: [100],
    });

    const y = buscarPunto(segmentos, 100)?.y;
    expect(y).toBeCloseTo(87.70856, 4);
    expect(Math.abs(y! - ejemplo.esperado.valor) / ejemplo.esperado.valor).toBeLessThan(
      ejemplo.tolerancia!,
    );
  });
});

describe('huecos donde la Fórmula no está definida', () => {
  it('U03-F01 con P_o entre −80 mW y 80 mW: la mitad ≤ 0 queda como hueco, nunca como NaN', () => {
    const decibeles = formula('U03-F01');
    const valores = canonicos('U03-F01', 2);
    expect(valores).toEqual({ P_i: 0.004, P_o: 0.07981 });

    const rango = { min: -0.08, max: 0.08 };
    const segmentos = muestrear({
      formula: decibeles,
      valoresCanonicos: valores,
      variableX: 'P_o',
      rango,
      escala: 'lineal',
      puntos: 201,
    });

    expect(segmentos).toHaveLength(1);
    expect(todosFinitos(segmentos)).toBe(true);
    expect(segmentos[0][0].x).toBeGreaterThan(0);
    const [hueco] = huecos(segmentos, rango);
    expect(hueco.min).toBe(-0.08);
    expect(hueco.max).toBeGreaterThan(0);
    expect(hueco.max).toBeLessThan(0.001);
  });

  it('si la Fórmula no está definida en todo el rango, no hay Segmentos y todo el rango es hueco', () => {
    const rango = { min: -0.08, max: -0.01 };
    const segmentos = muestrear({
      formula: formula('U03-F01'),
      valoresCanonicos: { P_i: 0.004 },
      variableX: 'P_o',
      rango,
      escala: 'lineal',
    });
    expect(segmentos).toEqual([]);
    expect(huecos(segmentos, rango)).toEqual([rango]);
  });

  it('U03-F01 con P_i en el eje X: P_i = 0 (división por cero) y P_i < 0 caen en el hueco', () => {
    const segmentos = muestrear({
      formula: formula('U03-F01'),
      valoresCanonicos: { P_o: 0.001 },
      variableX: 'P_i',
      rango: { min: -0.01, max: 0.01 },
      escala: 'lineal',
      puntos: 21,
    });
    expect(segmentos).toHaveLength(1);
    expect(segmentos[0].every((p) => p.x > 0)).toBe(true);
    expect(todosFinitos(segmentos)).toBe(true);
  });

  it('un hueco en el medio parte la curva en dos Segmentos', () => {
    // Doble de prueba del motor de muestreo, no una Fórmula del catálogo: no se registra
    // en ningún lado. √(x² − 1) no está definida en (−1, 1) y sí a ambos lados.
    const doble = {
      ...formula('U05-F17'),
      entradas: [{ ...formula('U05-F17').entradas[0], simbolo: 'x' }],
      calcular: ({ x }: Record<string, number>) => Math.sqrt(x * x - 1),
    };
    const segmentos = muestrear({
      formula: doble,
      valoresCanonicos: {},
      variableX: 'x',
      rango: { min: -2, max: 2 },
      escala: 'lineal',
      puntos: 9,
    });
    expect(segmentos.map((s) => s.map((p) => p.x))).toEqual([
      [-2, -1.5, -1],
      [1, 1.5, 2],
    ]);
    expect(huecos(segmentos, { min: -2, max: 2 })).toEqual([{ min: -1, max: 1 }]);
  });

});
