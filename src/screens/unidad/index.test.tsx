import { fireEvent, render, screen } from '@testing-library/react-native';

import { buscarFormula } from '@/formulas';

import { PantallaUnidad } from './index';

const formulaU10 = buscarFormula('U10-F07')!;

describe('PantallaUnidad', () => {
  describe('Unidad con fórmulas (Unidad 10)', () => {
    it('muestra el encabezado con el número, el tema y la cantidad de fórmulas', async () => {
      await render(<PantallaUnidad numero={10} />);

      expect(screen.getByText('Unidad 10')).toBeTruthy();
      expect(screen.getByText('Capa Física de Redes de Datos')).toBeTruthy();
      expect(screen.getByText('8 fórmulas')).toBeTruthy();
    });

    it('lista las fórmulas con su identificador, nombre y expresión', async () => {
      await render(<PantallaUnidad numero={10} />);

      expect(screen.getByTestId('formula-item-U10-F07')).toBeTruthy();
      expect(screen.getByText('U10-F07')).toBeTruthy();
      expect(screen.getByText(formulaU10.nombre)).toBeTruthy();
      expect(screen.getByText(formulaU10.expresion)).toBeTruthy();
    });

    it('llama a onSeleccionarFormula con el id al tocar una Fórmula', async () => {
      const onSeleccionarFormula = jest.fn();
      await render(
        <PantallaUnidad numero={10} onSeleccionarFormula={onSeleccionarFormula} />,
      );

      await fireEvent.press(screen.getByTestId('formula-item-U10-F07'));
      expect(onSeleccionarFormula).toHaveBeenCalledTimes(1);
      expect(onSeleccionarFormula).toHaveBeenCalledWith('U10-F07');
    });
  });

  describe('Unidad 1 (sin fórmulas por diseño verificado)', () => {
    it('muestra el estado vacío con la nota explicativa correspondiente', async () => {
      await render(<PantallaUnidad numero={1} />);

      expect(screen.getByText('Unidad 1')).toBeTruthy();
      expect(screen.getByText('Sistemas de Comunicación')).toBeTruthy();
      expect(screen.getByText('0 fórmulas')).toBeTruthy();

      expect(screen.getByTestId('unidad-vacia')).toBeTruthy();
      expect(
        screen.getByText(
          'Unidad introductoria sin fórmulas calculables (verificado en sus 79 páginas).',
        ),
      ).toBeTruthy();
    });
  });

  describe('Unidad sin fórmulas cargadas aún (ej. Unidad 2)', () => {
    it('muestra el mensaje genérico de unidad vacía', async () => {
      await render(<PantallaUnidad numero={2} />);

      expect(screen.getByText('Unidad 2')).toBeTruthy();
      expect(
        screen.getByText('Análisis de las Señales (Fourier, filtros)'),
      ).toBeTruthy();
      expect(screen.getByText('0 fórmulas')).toBeTruthy();

      expect(screen.getByTestId('unidad-vacia')).toBeTruthy();
      expect(
        screen.getByText('No hay fórmulas cargadas todavía para esta Unidad.'),
      ).toBeTruthy();
    });
  });
});
