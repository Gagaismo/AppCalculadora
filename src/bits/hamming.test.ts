import { bitsDeParidad, codificarHamming, decodificarHamming } from './hamming';

describe('cantidad de bits de paridad (U06-F09, pág. 48)', () => {
  it('2^3 = 8 admite hasta n = 4 y 2^4 = 16 hasta n = 11', () => {
    expect(bitsDeParidad(4)).toBe(3);
    expect(bitsDeParidad(5)).toBe(4);
    expect(bitsDeParidad(7)).toBe(4);
    expect(bitsDeParidad(11)).toBe(4);
    expect(bitsDeParidad(12)).toBe(5);
  });
});

describe('Hamming en el emisor contra la cátedra (pág. 49)', () => {
  const codigo = codificarHamming('1001101');

  it('codifica 1001101 en 10011100101 con p4 = 1, p3 = 0, p2 = 0, p1 = 1', () => {
    expect(codigo.p).toBe(4);
    expect(codigo.palabra).toBe('10011100101');
    expect(codigo.grupos.map((g) => [g.paridad, g.bit])).toEqual([
      ['p1', '1'],
      ['p2', '0'],
      ['p3', '0'],
      ['p4', '1'],
    ]);
  });

  it('ubica las paridades en 1, 2, 4, 8 y los datos de n7 a n1', () => {
    expect(codigo.posiciones.map((p) => p.etiqueta)).toEqual([
      'n7', 'n6', 'n5', 'p4', 'n4', 'n3', 'n2', 'p3', 'n1', 'p2', 'p1',
    ]);
    expect(codigo.posiciones[0]).toEqual({ pos: 11, tipo: 'n', etiqueta: 'n7', bit: '1' });
    expect(codigo.grupos[0]).toEqual({
      paridad: 'p1',
      posicionesCubiertas: [11, 9, 7, 5, 3],
      unos: 3,
      bit: '1',
    });
  });
});

describe('Hamming en el receptor contra la cátedra (pág. 50)', () => {
  it('10001100101 da síndrome 1000: error en la posición 8, se corrige', () => {
    const resultado = decodificarHamming('10001100101');
    expect(resultado.sindrome).toBe('1000');
    expect(resultado.posicion).toBe(8);
    expect(resultado.corregida).toBe('10011100101');
    expect(resultado.grupos.map((g) => g.cumple)).toEqual([true, true, true, false]);
  });

  it('la palabra transmitida da síndrome 0000: sin error', () => {
    const resultado = decodificarHamming('10011100101');
    expect(resultado.sindrome).toBe('0000');
    expect(resultado.posicion).toBe(0);
    expect(resultado.corregida).toBe('10011100101');
  });
});

describe('entradas inválidas', () => {
  it('rechaza caracteres que no son bits y cadenas vacías', () => {
    expect(() => codificarHamming('10x1')).toThrow('Los datos sólo admiten 0 y 1.');
    expect(() => codificarHamming('')).toThrow('Los datos no pueden quedar vacíos.');
    expect(() => decodificarHamming('1021')).toThrow('La palabra recibida sólo admite 0 y 1.');
  });

  it('rechaza una palabra recibida de menos de 3 bits', () => {
    expect(() => decodificarHamming('10')).toThrow(
      'La palabra recibida tiene que tener al menos 3 bits.',
    );
  });
});
