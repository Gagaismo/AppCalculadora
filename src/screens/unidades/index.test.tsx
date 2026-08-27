import { fireEvent, render, screen } from '@testing-library/react-native';

import { UNIDADES } from './datos';
import { formatearCantidadFormulas, PantallaUnidades } from './index';

describe('formatearCantidadFormulas', () => {
  it('formatea 0 fórmulas', () => {
    expect(formatearCantidadFormulas(0)).toBe('0 fórmulas');
  });

  it('formatea 1 fórmula en singular', () => {
    expect(formatearCantidadFormulas(1)).toBe('1 fórmula');
  });

  it('formatea múltiples fórmulas en plural', () => {
    expect(formatearCantidadFormulas(5)).toBe('5 fórmulas');
  });
});

describe('PantallaUnidades', () => {
  it('lista las diez Unidades con su número y su tema exacto', async () => {
    await render(<PantallaUnidades />);

    expect(screen.getByTestId('lista-unidades')).toBeTruthy();

    for (const unidad of UNIDADES) {
      expect(screen.getByTestId(`unidad-item-${unidad.numero}`)).toBeTruthy();
      expect(screen.getByText(`Unidad ${unidad.numero}`)).toBeTruthy();
      expect(screen.getByText(unidad.tema)).toBeTruthy();
    }
  });

  it('muestra la cantidad de fórmulas para cada Unidad', async () => {
    await render(<PantallaUnidades />);

    // Unidad 10 tiene 1 fórmula cargada actualmente
    expect(screen.getByTestId('unidad-conteo-10')).toHaveTextContent('1 fórmula');

    // Unidad 1 tiene 0 fórmulas
    expect(screen.getByTestId('unidad-conteo-1')).toHaveTextContent('0 fórmulas');
  });

  it('muestra en la Unidad 1 la nota explicativa de por qué tiene 0 fórmulas', async () => {
    await render(<PantallaUnidades />);

    const notaUnidad1 = screen.getByTestId('unidad-nota-1');
    expect(notaUnidad1).toBeTruthy();
    expect(notaUnidad1).toHaveTextContent(
      'Unidad introductoria sin fórmulas calculables (verificado en sus 79 páginas).',
    );
  });

  it('llama a onSeleccionarUnidad con el número al tocar una Unidad', async () => {
    const onSeleccionarUnidad = jest.fn();
    await render(<PantallaUnidades onSeleccionarUnidad={onSeleccionarUnidad} />);

    await fireEvent.press(screen.getByTestId('unidad-item-10'));
    expect(onSeleccionarUnidad).toHaveBeenCalledTimes(1);
    expect(onSeleccionarUnidad).toHaveBeenCalledWith(10);

    await fireEvent.press(screen.getByTestId('unidad-item-1'));
    expect(onSeleccionarUnidad).toHaveBeenCalledTimes(2);
    expect(onSeleccionarUnidad).toHaveBeenCalledWith(1);
  });
});
