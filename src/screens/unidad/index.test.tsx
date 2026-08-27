import { fireEvent, render, screen } from '@testing-library/react-native';
import { formulasDeUnidad } from '@/formulas';


import { buscarFormula } from '@/formulas';

import { PantallaUnidad } from './index';

const formulaU10 = buscarFormula('U10-F07')!;

describe('PantallaUnidad', () => {
  describe('Unidad con fórmulas (Unidad 10)', () => {
    it('muestra el encabezado con el número, el tema y la cantidad de fórmulas', async () => {
      await render(<PantallaUnidad numero={10} />);

      expect(screen.getByText('Unidad 10')).toBeTruthy();
      expect(screen.getByText('Capa Física de Redes de Datos')).toBeTruthy();
      // Derivado del dato: el conteo crece al cargar la Unidad.
      expect(screen.getByText(`${formulasDeUnidad(10).length} fórmula${formulasDeUnidad(10).length === 1 ? '' : 's'}`)).toBeTruthy();
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

  describe('Unidad sin Fórmulas', () => {
    // Se usa la Unidad 1, que está vacía por naturaleza y no por casualidad: se releyó
    // su Presentación completa y no tiene ninguna fórmula calculable. Antes este test
    // usaba la Unidad 2 «que todavía no se cargó», y se rompió apenas se cargó.
    it('muestra el mensaje de unidad vacía', async () => {
      await render(<PantallaUnidad numero={1} />);

      expect(screen.getByText('Unidad 1')).toBeTruthy();
      expect(screen.getByText('Sistemas de Comunicación')).toBeTruthy();
      expect(screen.getByText('0 fórmulas')).toBeTruthy();

      expect(screen.getByTestId('unidad-vacia')).toBeTruthy();
      // La Unidad 1 tiene nota propia, así que muestra el porqué del hueco en vez
      // del mensaje genérico. Que diga por qué está vacía es justamente el punto:
      // el 0 está verificado, y eso se defiende en el oral.
      expect(screen.getByText(/verificado en sus 79 páginas/i)).toBeTruthy();
    });
  });
});
