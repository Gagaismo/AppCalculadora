import { formatearNumero, parsearEntrada } from './numeros';

describe('parsearEntrada', () => {
  it('lee enteros y decimales con punto', () => {
    expect(parsearEntrada('42')).toEqual({ estado: 'cargada', valor: 42 });
    expect(parsearEntrada('2.4835')).toEqual({ estado: 'cargada', valor: 2.4835 });
  });

  it('acepta la coma como separador decimal, que es como escribe la cátedra', () => {
    expect(parsearEntrada('2,4')).toEqual({ estado: 'cargada', valor: 2.4 });
    expect(parsearEntrada('2,4835')).toEqual({ estado: 'cargada', valor: 2.4835 });
    expect(parsearEntrada('-15,8')).toEqual({ estado: 'cargada', valor: -15.8 });
  });

  it('trata como vacío lo que todavía no se cargó', () => {
    expect(parsearEntrada(undefined)).toEqual({ estado: 'vacia' });
    expect(parsearEntrada('')).toEqual({ estado: 'vacia' });
    expect(parsearEntrada('   ')).toEqual({ estado: 'vacia' });
  });

  it('marca como inválido lo que no es un número', () => {
    expect(parsearEntrada('abc')).toEqual({ estado: 'invalida' });
    expect(parsearEntrada('1.2.3')).toEqual({ estado: 'invalida' });
    expect(parsearEntrada('2,4,5')).toEqual({ estado: 'invalida' });
    expect(parsearEntrada('-')).toEqual({ estado: 'invalida' });
  });

  it('nunca devuelve un valor cargado que no sea un número finito', () => {
    // Ésta es la garantía que justifica el tipo: si un `NaN` o un infinito pudiera
    // salir como «cargada», alimentaría el cálculo sin ningún síntoma visible.
    for (const texto of ['abc', 'NaN', 'Infinity', '-Infinity', '1e', '--3']) {
      const entrada = parsearEntrada(texto);
      if (entrada.estado === 'cargada') {
        expect(Number.isFinite(entrada.valor)).toBe(true);
      }
    }
  });
});

describe('formatearNumero', () => {
  it('usa coma decimal', () => {
    expect(formatearNumero(83.5)).toBe('83,5');
    expect(formatearNumero(2.4835)).toBe('2,4835');
  });

  it('saca la basura del punto flotante', () => {
    expect(formatearNumero(0.1 + 0.2)).toBe('0,3');
  });

  it('deja los enteros sin coma', () => {
    expect(formatearNumero(700)).toBe('700');
  });
});
