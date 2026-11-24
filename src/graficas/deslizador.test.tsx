import { fireEvent, render, screen } from '@testing-library/react-native';

import { Deslizador, posicionDe, valorDe } from './deslizador';

/**
 * El `Slider` de `@expo/ui` llega como el doble de `src/pruebas/expo-ui-doble.tsx`: la
 * prueba mueve la pista con `valueChange` y usa las acciones de accesibilidad
 * `increment` y `decrement`, que es como lo maneja un lector de pantalla.
 */

const accion = (actionName: string) => ({ nativeEvent: { actionName } });

async function montar(props: Partial<Parameters<typeof Deslizador>[0]> = {}) {
  const onCambiar = jest.fn();
  await render(
    <Deslizador
      etiqueta="B"
      valor={3000}
      minimo={10}
      maximo={1e8}
      escala="log"
      onCambiar={onCambiar}
      testID="desl-B"
      {...props}
    />,
  );
  return onCambiar;
}

describe('posicionDe y valorDe', () => {
  it('en lineal reparten el rango en partes iguales', () => {
    expect(posicionDe(0.07, 0, 0.2, 'lineal')).toBeCloseTo(0.35, 12);
    expect(valorDe(0.35, 0, 0.2, 'lineal')).toBeCloseTo(0.07, 12);
  });

  it('en log reparten el rango en décadas iguales', () => {
    // De 10 Hz a 100 MHz hay siete décadas: 1 kHz está a dos de ellas.
    expect(posicionDe(1000, 10, 1e8, 'log')).toBeCloseTo(2 / 7, 12);
    expect(valorDe(2 / 7, 10, 1e8, 'log')).toBeCloseTo(1000, 6);
    expect(valorDe(0.5, 1, 1e4, 'log')).toBeCloseTo(100, 9);
  });

  it('son inversas una de la otra', () => {
    for (const v of [0.01, 1, 1023, 1e6]) {
      expect(valorDe(posicionDe(v, 0.01, 1e6, 'log'), 0.01, 1e6, 'log')).toBeCloseTo(v, 6);
    }
  });

  it('nunca salen del rango', () => {
    expect(posicionDe(1e9, 10, 1e8, 'log')).toBe(1);
    expect(posicionDe(-5, 10, 1e8, 'log')).toBe(0);
    expect(posicionDe(5, 0, 0.2, 'lineal')).toBe(1);
    expect(valorDe(1.3, 10, 1e8, 'log')).toBe(1e8);
    expect(valorDe(-0.2, 0, 0.2, 'lineal')).toBe(0);
  });

  // S1, review de PR #24: un marco que abarca casi todo el double no desborda.
  it('con un marco de −MAX a MAX siguen siendo finitos e inversos', () => {
    const M = Number.MAX_VALUE;
    expect(valorDe(0.5, -M, M, 'lineal')).toBe(0);
    expect(posicionDe(0, -M, M, 'lineal')).toBeCloseTo(0.5, 12);
    expect(valorDe(1, -M, M, 'lineal')).toBe(M);
    expect(valorDe(0.75, -M, M, 'lineal') / M).toBeCloseTo(0.5, 12);
    expect(posicionDe(M / 2, -M, M, 'lineal')).toBeCloseTo(0.75, 12);
  });

  it('en log con un marco de MIN_VALUE a MAX siguen siendo finitos', () => {
    const min = Number.MIN_VALUE;
    const M = Number.MAX_VALUE;
    const v = valorDe(0.5, min, M, 'log');
    expect(Number.isFinite(v)).toBe(true);
    expect(v).toBeGreaterThan(min);
    expect(v).toBeLessThan(M);
    expect(posicionDe(v, min, M, 'log')).toBeCloseTo(0.5, 6);
  });
});

describe('Deslizador', () => {
  it('muestra la etiqueta y el valor', async () => {
    await montar({ textoValor: '3 kHz' });

    expect(screen.getByText('B')).toBeTruthy();
    expect(screen.getByText('3 kHz')).toBeTruthy();
    expect(screen.getByTestId('desl-B').props.accessibilityValue).toMatchObject({
      text: '3 kHz',
    });
  });

  it('sin textoValor muestra el número con coma decimal', async () => {
    await montar({ valor: 0.07, minimo: 0, maximo: 0.2, escala: 'lineal' });

    expect(screen.getByText('0,07')).toBeTruthy();
  });

  it('ubica la pista en la posición del valor', async () => {
    await montar({ valor: 1000 });

    expect(screen.getByTestId('desl-B-pista').props.accessibilityValue.now).toBeCloseTo(
      2 / 7,
      12,
    );
  });

  it('al mover la pista entrega el valor en la escala log', async () => {
    const onCambiar = await montar();

    await fireEvent(screen.getByTestId('desl-B-pista'), 'valueChange', 2 / 7);

    expect(onCambiar).toHaveBeenCalledTimes(1);
    expect(onCambiar.mock.calls[0][0]).toBeCloseTo(1000, 6);
  });

  it('incrementar y decrementar avanzan un vigésimo del recorrido', async () => {
    const onCambiar = await montar({ valor: 0.1, minimo: 0, maximo: 0.2, escala: 'lineal' });
    const desl = screen.getByTestId('desl-B');

    expect(desl.props.accessibilityRole).toBe('adjustable');
    await fireEvent(desl, 'accessibilityAction', accion('increment'));
    await fireEvent(desl, 'accessibilityAction', accion('decrement'));

    expect(onCambiar.mock.calls[0][0]).toBeCloseTo(0.11, 12);
    expect(onCambiar.mock.calls[1][0]).toBeCloseTo(0.09, 12);
  });

  it('incrementar en el máximo no sale del rango', async () => {
    const onCambiar = await montar({ valor: 1e8 });
    await fireEvent(screen.getByTestId('desl-B'), 'accessibilityAction', accion('increment'));
    expect(onCambiar).toHaveBeenCalledWith(1e8);
  });

  it('incrementar en el máximo de un marco lineal no sale del rango', async () => {
    const onCambiar = await montar({ valor: 4, minimo: 0, maximo: 4, escala: 'lineal' });
    await fireEvent(screen.getByTestId('desl-B'), 'accessibilityAction', accion('increment'));
    expect(onCambiar).toHaveBeenCalledWith(4);
  });

  it('decrementar en el mínimo no sale del rango', async () => {
    const onCambiar = await montar({ valor: 10 });
    await fireEvent(screen.getByTestId('desl-B'), 'accessibilityAction', accion('decrement'));
    expect(onCambiar).toHaveBeenCalledWith(10);
  });
});
