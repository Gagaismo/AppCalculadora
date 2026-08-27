import { fireEvent, render, screen } from '@testing-library/react-native';

import { buscarFormula } from '@/formulas';

import { PantallaFormula } from '.';

/**
 * Tests de la pantalla genérica.
 *
 * Verifican que una Fórmula, dada como dato, se convierte en una pantalla usable:
 * todas sus Variables con su significado, su Unidad de medida y su selector de
 * múltiplo. Es la red que atrapa un dato mal formado antes de que llegue al APK.
 *
 * OJO al replicar esto para las demás Unidades: en @testing-library/react-native 14
 * `render` y `fireEvent` devuelven Promesas. Sin `await`, `screen` queda vacío y el
 * test falla con «`render` function has not been called», que no dice nada sobre la
 * causa real.
 */

const formula = buscarFormula('U10-F07')!;

describe('la pantalla genérica renderiza la Fórmula', () => {
  it('muestra el identificador, el nombre y la expresión', async () => {
    await render(<PantallaFormula formula={formula} />);

    expect(screen.getByText('U10-F07')).toBeTruthy();
    expect(screen.getByText(formula.nombre)).toBeTruthy();
    expect(screen.getByText(formula.expresion)).toBeTruthy();
  });

  it('muestra cada Variable de entrada con su símbolo y su significado', async () => {
    await render(<PantallaFormula formula={formula} />);

    for (const variable of formula.entradas) {
      expect(screen.getByTestId(`variable-${variable.simbolo}`)).toBeTruthy();
      expect(screen.getByText(variable.significado)).toBeTruthy();
      expect(screen.getByTestId(`entrada-${variable.simbolo}`)).toBeTruthy();
    }
  });

  it('ofrece el selector de múltiplo con el canónico ya elegido', async () => {
    await render(<PantallaFormula formula={formula} />);

    for (const variable of formula.entradas) {
      expect(screen.getByTestId(`multiplos-${variable.simbolo}`)).toBeTruthy();

      const canonico = screen.getByTestId(
        `multiplo-${variable.simbolo}-${variable.multiploCanonico || 'base'}`,
      );
      expect(canonico.props.accessibilityState.selected).toBe(true);

      // Los chips se rotulan con la unidad tal como se escribe: GHz, MHz, Hz.
      const rotulo = `${variable.multiploCanonico}${variable.unidadDeMedida}`;
      expect(screen.getAllByText(rotulo).length).toBeGreaterThan(0);
    }
  });

  it('muestra la Variable de salida y todavía no un resultado', async () => {
    await render(<PantallaFormula formula={formula} />);

    expect(screen.getByTestId('salida')).toBeTruthy();
    expect(screen.getByText(formula.salida.significado)).toBeTruthy();
    expect(screen.getByTestId('resultado')).toHaveTextContent('—');
  });
});

describe('la pantalla genérica calcula', () => {
  it('reproduce el Ejemplo resuelto de la banda ISM cargando GHz', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 MHz');
  });

  it('cambia el resultado al cambiar el múltiplo, sin tocar los números', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');
    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 MHz');

    await fireEvent.press(screen.getByTestId('multiplo-f_inf-M'));
    await fireEvent.press(screen.getByTestId('multiplo-f_sup-M'));

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 kHz');
  });

  it('vuelve a no mostrar resultado si se borra una Variable', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '');

    expect(screen.getByTestId('resultado')).toHaveTextContent('—');
  });
});
