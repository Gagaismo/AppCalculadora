import { calcular } from './motor';

/**
 * Tests del seam principal. Se entra por donde entra la app: valores con su múltiplo,
 * sin convertir.
 */

describe('el motor calcula', () => {
  it('resuelve U10-F07 con las entradas en GHz y devuelve MHz', () => {
    const resultado = calcular('U10-F07', {
      f_inf: { valor: 2.4, multiplo: 'G' },
      f_sup: { valor: 2.4835, multiplo: 'G' },
    });

    expect(resultado.ok).toBe(true);
    if (!resultado.ok) return;

    expect(resultado.valor).toBeCloseTo(83.5, 6);
    expect(resultado.multiplo).toBe('M');
    expect(resultado.unidadDeMedida).toBe('Hz');
  });

  it('da el mismo resultado cargando las mismas frecuencias en Hz', () => {
    const enGigahercios = calcular('U10-F07', {
      f_inf: { valor: 2.4, multiplo: 'G' },
      f_sup: { valor: 2.4835, multiplo: 'G' },
    });
    const enHercios = calcular('U10-F07', {
      f_inf: { valor: 2_400_000_000, multiplo: '' },
      f_sup: { valor: 2_483_500_000, multiplo: '' },
    });

    expect(enGigahercios).toEqual(enHercios);
  });

  it('el múltiplo cambia el resultado: es el error que la app existe para evitar', () => {
    const bien = calcular('U10-F07', {
      f_inf: { valor: 2.4, multiplo: 'G' },
      f_sup: { valor: 2.4835, multiplo: 'G' },
    });
    const conMultiploEquivocado = calcular('U10-F07', {
      f_inf: { valor: 2.4, multiplo: 'M' },
      f_sup: { valor: 2.4835, multiplo: 'M' },
    });

    expect(bien.ok && conMultiploEquivocado.ok).toBe(true);
    if (!bien.ok || !conMultiploEquivocado.ok) return;

    // Mil veces menos, y sin ningún síntoma más que el número.
    expect(conMultiploEquivocado.multiplo).toBe('k');
    expect(conMultiploEquivocado.valor).toBeCloseTo(83.5, 6);
  });
});

describe('el motor rechaza lo que no puede calcular', () => {
  it('avisa cuando la Fórmula no existe', () => {
    const resultado = calcular('U99-F99', {});

    expect(resultado.ok).toBe(false);
    if (resultado.ok) return;
    expect(resultado.error).toEqual({ tipo: 'formula-desconocida', id: 'U99-F99' });
  });

  it('nombra las Variables que faltan, en el orden en que las declara la Fórmula', () => {
    const resultado = calcular('U10-F07', { f_sup: { valor: 2.4835, multiplo: 'G' } });

    expect(resultado.ok).toBe(false);
    if (resultado.ok) return;
    expect(resultado.error).toEqual({ tipo: 'variables-faltantes', simbolos: ['f_inf'] });
  });

  it('con la pantalla vacía pide las dos Variables', () => {
    const resultado = calcular('U10-F07', {});

    expect(resultado.ok).toBe(false);
    if (resultado.ok) return;
    expect(resultado.error).toEqual({
      tipo: 'variables-faltantes',
      simbolos: ['f_sup', 'f_inf'],
    });
  });

  it('avisa cuando el cálculo no queda definido', () => {
    const resultado = calcular('U10-F07', {
      f_inf: { valor: Number.POSITIVE_INFINITY, multiplo: '' },
      f_sup: { valor: Number.POSITIVE_INFINITY, multiplo: '' },
    });

    expect(resultado.ok).toBe(false);
    if (resultado.ok) return;
    expect(resultado.error.tipo).toBe('calculo-no-definido');
  });
});

describe('el motor con Variables de lista', () => {
  it('resuelve la entropía a partir de la lista de probabilidades', () => {
    const resultado = calcular('U04-F06', {
      P: { valores: [0.5, 0.25, 0.125, 0.125], multiplo: '' },
    });

    expect(resultado.ok).toBe(true);
    if (!resultado.ok) return;
    expect(resultado.valor).toBeCloseTo(1.75, 6);
    expect(resultado.unidadDeMedida).toBe('bit/símbolo');
  });

  it('aplica el múltiplo a CADA elemento de la lista, no sólo al primero', () => {
    // Las mismas cuatro probabilidades cargadas en mili: 500m = 0,5.
    // Si el múltiplo se aplicara sólo al primer elemento, la entropía no daría 1,75.
    const enMili = calcular('U04-F06', {
      P: { valores: [500, 250, 125, 125], multiplo: 'm' },
    });
    const enBase = calcular('U04-F06', {
      P: { valores: [0.5, 0.25, 0.125, 0.125], multiplo: '' },
    });

    expect(enMili).toEqual(enBase);
  });

  it('trata una lista vacía como Variable faltante', () => {
    // Sumar sobre una lista vacía daría cero: un resultado plausible y equivocado.
    const resultado = calcular('U04-F06', { P: { valores: [], multiplo: '' } });

    expect(resultado.ok).toBe(false);
    if (resultado.ok) return;
    expect(resultado.error).toEqual({ tipo: 'variables-faltantes', simbolos: ['P'] });
  });

  it('da entropía cero cuando un símbolo tiene toda la probabilidad', () => {
    const resultado = calcular('U04-F06', { P: { valores: [1, 0, 0], multiplo: '' } });

    expect(resultado.ok).toBe(true);
    if (!resultado.ok) return;
    // Los términos con P = 0 se toman como 0, según las condiciones de la cátedra.
    expect(resultado.valor).toBeCloseTo(0, 10);
  });
});
