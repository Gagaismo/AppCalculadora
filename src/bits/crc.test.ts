import { calcularCrc, GENERADORES, verificarCrc } from './crc';

/** Pasa un polinomio dado por sus exponentes a la cadena de bits de sus coeficientes. */
function bitsDePolinomio(exponentes: readonly number[]): string {
  const grado = Math.max(...exponentes);
  let bits = '';
  for (let e = grado; e >= 0; e--) bits += exponentes.includes(e) ? '1' : '0';
  return bits;
}

describe('CRC del emisor contra el ejemplo de la cátedra (págs. 29-31)', () => {
  const resultado = calcularCrc('10110111', '110011');

  it('da r = 5, P = 1011011100000, R = 1001 y T = 1011011101001', () => {
    expect(resultado.r).toBe(5);
    expect(resultado.p).toBe('1011011100000');
    expect(resultado.resto).toBe('01001');
    expect(resultado.restoCorto).toBe('1001');
    expect(resultado.trama).toBe('1011011101001');
  });

  it('arma los renglones de la división como en el pizarrón de la pág. 30', () => {
    expect(resultado.pasos.map((p) => [p.columna, p.ventana, p.xor, p.bajados])).toEqual([
      [0, '101101', '011110', '1'],
      [1, '111101', '001110', '10'],
      [3, '111010', '001001', '00'],
      [5, '100100', '010111', '0'],
      [6, '101110', '011101', '0'],
      [7, '111010', '001001', ''],
    ]);
    // El renglón que se escribe debajo es el XOR más los bits bajados (en rojo en la diapositiva).
    expect(resultado.pasos.map((p) => p.fila)).toEqual([
      '0111101',
      '00111010',
      '00100100',
      '0101110',
      '0111010',
      '001001',
    ]);
    for (const paso of resultado.pasos) expect(paso.divisor).toBe('110011');
  });
});

describe('CRC del receptor', () => {
  it('con la trama de la cátedra da resto 0: sin error (pág. 31)', () => {
    const verificacion = verificarCrc('1011011101001', '110011');
    expect(verificacion.resto).toBe('00000');
    expect(verificacion.hayError).toBe(false);
    expect(verificacion.pasos.length).toBeGreaterThan(0);
  });

  it('caso armado (no es de la cátedra): un bit invertido da resto distinto de 0', () => {
    const verificacion = verificarCrc('1011111101001', '110011');
    expect(verificacion.resto).not.toBe('00000');
    expect(verificacion.hayError).toBe(true);
  });
});

describe('generadores estándar de la pág. 32', () => {
  it('coinciden con sus polinomios', () => {
    const porNombre = Object.fromEntries(GENERADORES.map((g) => [g.nombre, g.bits]));
    expect(porNombre['CRC-12']).toBe(bitsDePolinomio([12, 11, 3, 2, 1, 0]));
    expect(porNombre['CRC-16']).toBe(bitsDePolinomio([16, 15, 2, 0]));
    expect(porNombre['CRC-CCITT']).toBe(bitsDePolinomio([16, 12, 5, 0]));
    expect(porNombre['CRC-12']).toBe('1100000001111');
    expect(porNombre['CRC-16']).toBe('11000000000000101');
    expect(porNombre['CRC-CCITT']).toBe('10001000000100001');
    expect(porNombre['Cátedra']).toBe('110011');
  });
});

describe('entradas inválidas', () => {
  it('rechaza caracteres que no son bits y cadenas vacías', () => {
    expect(() => calcularCrc('1012', '110011')).toThrow('M(x) sólo admite 0 y 1.');
    expect(() => calcularCrc('', '110011')).toThrow('M(x) no puede quedar vacío.');
    expect(() => verificarCrc('10a1', '110011')).toThrow("T'(x) sólo admite 0 y 1.");
  });

  it('rechaza un generador que empieza con 0 o tiene menos de 2 bits', () => {
    const aviso = 'G(x) tiene que empezar con 1 y tener al menos 2 bits.';
    expect(() => calcularCrc('1011', '011')).toThrow(aviso);
    expect(() => calcularCrc('1011', '1')).toThrow(aviso);
  });

  it("rechaza una trama recibida más corta que G(x)", () => {
    expect(() => verificarCrc('1100', '110011')).toThrow(
      "T'(x) tiene que ser al menos tan largo como G(x).",
    );
  });
});
