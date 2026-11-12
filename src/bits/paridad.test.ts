import { bcc, paridadDe, tablaBidimensional, verificarTabla, vrc } from './paridad';

/** La tabla del Ejemplo 02 (pág. 25), escrita por filas B1..B7 como en la diapositiva. */
const FILAS_PAG_25 = [
  '00010101', // B1
  '11110111', // B2
  '10000101', // B3
  '01010111', // B4
  '01000100', // B5
  '01110110', // B6
  '01100100', // B7
];
/** La misma tabla por columnas D1..D8: cada carácter con sus bits B1..B7. */
const COLUMNAS_PAG_25 = Array.from({ length: 8 }, (_, j) =>
  FILAS_PAG_25.map((fila) => fila[j]).join(''),
);

describe('paridad de una cadena', () => {
  it('par completa un número par de unos; impar, uno impar', () => {
    expect(paridadDe('1101', 'par')).toBe('1');
    expect(paridadDe('1101', 'impar')).toBe('0');
    expect(paridadDe('1001', 'par')).toBe('0');
  });
});

describe('VRC, BCC y tabla bidimensional contra la cátedra', () => {
  it('VRC de 1000010 con paridad par es 0 (pág. 20)', () => {
    expect(vrc('1000010', 'par')).toBe('0');
  });

  it('BCC del bloque de la pág. 23 es 10101010', () => {
    expect(bcc(['10101001', '00111001', '11011101', '11100111'], 'par')).toBe('10101010');
  });

  it('la tabla de la pág. 25 da LRC 1111011, VRC 01100110 y esquina 0', () => {
    const tabla = tablaBidimensional(COLUMNAS_PAG_25, 'par');
    expect(tabla.lrc).toBe('1111011');
    expect(tabla.vrc).toBe('01100110');
    expect(tabla.esquina).toBe('0');
  });

  it('con B4/D6 invertido ubica el error en (B4, D6) y lo corrige (pág. 25)', () => {
    const recibida = COLUMNAS_PAG_25.slice();
    recibida[5] = recibida[5].slice(0, 3) + '0' + recibida[5].slice(4);
    const verificacion = verificarTabla(recibida, '1111011', '01100110', 'par');
    expect(verificacion.filasConError).toEqual([4]);
    expect(verificacion.columnasConError).toEqual([6]);
    expect(verificacion.celdaErronea).toEqual({ fila: 4, columna: 6 });
    expect(verificacion.corregida).toEqual(COLUMNAS_PAG_25);
  });

  it('caso armado: dos errores en la misma fila no dejan un cruce único', () => {
    const recibida = COLUMNAS_PAG_25.slice();
    for (const j of [0, 1]) {
      recibida[j] = (recibida[j][0] === '1' ? '0' : '1') + recibida[j].slice(1);
    }
    const verificacion = verificarTabla(recibida, '1111011', '01100110', 'par');
    expect(verificacion.filasConError).toEqual([]);
    expect(verificacion.columnasConError).toEqual([1, 2]);
    expect(verificacion.celdaErronea).toBeNull();
    expect(verificacion.corregida).toEqual(recibida);
  });
});

describe('entradas inválidas', () => {
  it('rechaza caracteres que no son bits, cadenas vacías y bloques desparejos', () => {
    expect(() => vrc('10a', 'par')).toThrow('El carácter sólo admite 0 y 1.');
    expect(() => vrc('', 'par')).toThrow('El carácter no puede quedar vacío.');
    expect(() => bcc(['1010', '101'], 'par')).toThrow(
      'Todas las cadenas tienen que tener la misma cantidad de bits.',
    );
  });
});
