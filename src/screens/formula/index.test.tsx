import { fireEvent, render, screen, within } from '@testing-library/react-native';

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

// Los tests de `parsearEntrada` y `formatearNumero` viven en `numeros.test.ts`,
// al lado del módulo que prueban.

describe('la pantalla genérica renderiza la Fórmula', () => {
  it('muestra el identificador, el nombre y la expresión', async () => {
    await render(<PantallaFormula formula={formula} />);

    expect(screen.getByText('U10-F07')).toBeTruthy();
    expect(screen.getByText(formula.nombre)).toBeTruthy();
    // La expresión se dibuja como SVG cuando la Fórmula tiene `expresionLatex`, y un
    // SVG no tiene texto que buscar. Se afirma por la etiqueta accesible, que es lo
    // que recibe un lector de pantalla y vale para las dos formas de dibujarla.
    expect(screen.getByTestId(`expresion-${formula.id}`).props.accessibilityLabel).toBe(
      formula.expresion,
    );
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
      const selector = screen.getByTestId(`multiplos-${variable.simbolo}`);

      // El múltiplo elegido se anuncia sin desplegar nada: es el dato que evita
      // cargar MHz donde la Fórmula espera Hz.
      const rotulo = `${variable.multiploCanonico}${variable.unidadDeMedida}`;
      expect(selector.props.accessibilityValue.text).toBe(rotulo);

      // Y los nueve múltiplos siguen disponibles dentro del menú.
      expect(within(selector).getByText(rotulo)).toBeTruthy();
    }
  });

  it('muestra la Variable de salida e indica cuáles Variables faltan al inicio', async () => {
    await render(<PantallaFormula formula={formula} />);

    expect(screen.getByTestId('salida')).toBeTruthy();
    expect(screen.getByText(formula.salida.significado)).toBeTruthy();
    expect(screen.getByTestId('resultado')).toHaveTextContent('Faltan: f_sup, f_inf');
  });

  it('ofrece el botón para limpiar campos', async () => {
    await render(<PantallaFormula formula={formula} />);

    expect(screen.getByTestId('boton-limpiar')).toBeTruthy();
    expect(screen.getByText('Limpiar campos')).toBeTruthy();
  });

  it('renderiza la ficha de la Fórmula', async () => {
    await render(<PantallaFormula formula={formula} />);

    expect(screen.getByTestId('ficha-formula')).toBeTruthy();
  });
});

describe('la pantalla genérica calcula', () => {
  it('reproduce el Ejemplo resuelto de la banda ISM cargando GHz con coma', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 MHz');
  });

  it('acepta punto decimal en la entrada', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2.4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2.4835');

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 MHz');
  });

  it('cambia el resultado al cambiar el múltiplo, sin tocar los números', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');
    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 MHz');

    await fireEvent.press(within(screen.getByTestId('multiplos-f_inf')).getByText('MHz'));
    await fireEvent.press(within(screen.getByTestId('multiplos-f_sup')).getByText('MHz'));

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 kHz');
  });
});

describe('la pantalla genérica maneja errores y validación', () => {
  it('indica qué Variable falta cuando solo se carga una de ellas', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    expect(screen.getByTestId('resultado')).toHaveTextContent('Falta: f_sup');

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');
    expect(screen.getByTestId('resultado')).toHaveTextContent('Falta: f_inf');
  });

  it('muestra mensaje de error cuando una entrada no es numérica', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), 'abc');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');

    expect(screen.getByTestId('resultado')).toHaveTextContent('Entrada no numérica en f_inf');
    expect(screen.getByTestId('error-campo-f_inf')).toHaveTextContent('Debe ser un número válido');
  });

  it('el guía reta nombrando el campo no numérico, sin tapar el mensaje de la pantalla', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), 'abc');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');

    expect(screen.getByTestId('guia-globo')).toHaveTextContent(
      '¡Eso no es un número! Mirá el campo f_inf.',
    );
    expect(screen.getByTestId('error-campo-f_inf')).toHaveTextContent('Debe ser un número válido');
    expect(screen.getByTestId('resultado')).toHaveTextContent('Entrada no numérica en f_inf');
  });

  it('indica múltiples campos con entrada no numérica', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), 'xxx');
    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), 'yyy');

    expect(screen.getByTestId('resultado')).toHaveTextContent('Entrada no numérica en: f_sup, f_inf');
  });

  it('permite limpiar todos los campos con una sola acción para encadenar ejercicios', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');
    await fireEvent.press(within(screen.getByTestId('multiplos-f_inf')).getByText('MHz'));
    await fireEvent.press(within(screen.getByTestId('multiplos-f_sup')).getByText('MHz'));
    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 kHz');

    await fireEvent.press(screen.getByTestId('boton-limpiar'));

    // Los campos de texto quedan vacíos
    expect(screen.getByTestId('entrada-f_inf').props.value).toBe('');
    expect(screen.getByTestId('entrada-f_sup').props.value).toBe('');

    // Los selectores de múltiplo vuelven a sus valores canónicos (G)
    expect(screen.getByTestId('multiplos-f_inf').props.accessibilityValue.text).toBe('GHz');
    expect(screen.getByTestId('multiplos-f_sup').props.accessibilityValue.text).toBe('GHz');

    // El resultado indica que faltan todas las Variables
    expect(screen.getByTestId('resultado')).toHaveTextContent('Faltan: f_sup, f_inf');
  });
});


describe('la pantalla genérica con una Variable de lista', () => {
  const entropia = buscarFormula('U04-F06')!;

  it('arranca con un solo campo y el botón de agregar', async () => {
    await render(<PantallaFormula formula={entropia} />);

    expect(screen.getByTestId('entrada-P-0')).toBeTruthy();
    expect(screen.queryByTestId('entrada-P-1')).toBeNull();
    expect(screen.getByTestId('agregar-P')).toBeTruthy();
  });

  it('agrega y quita campos', async () => {
    await render(<PantallaFormula formula={entropia} />);

    await fireEvent.press(screen.getByTestId('agregar-P'));
    await fireEvent.press(screen.getByTestId('agregar-P'));
    expect(screen.getByTestId('entrada-P-2')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('quitar-P-2'));
    expect(screen.queryByTestId('entrada-P-2')).toBeNull();
  });

  it('nunca deja la lista sin ningún campo', async () => {
    await render(<PantallaFormula formula={entropia} />);

    await fireEvent.press(screen.getByTestId('quitar-P-0'));

    // Quitar el último deja uno vacío: sin campos no habría cómo volver a cargar.
    expect(screen.getByTestId('entrada-P-0')).toBeTruthy();
  });

  it('reproduce el Ejemplo resuelto de la entropía cargando las cuatro probabilidades', async () => {
    await render(<PantallaFormula formula={entropia} />);

    for (let i = 1; i < 4; i++) await fireEvent.press(screen.getByTestId('agregar-P'));

    const probabilidades = ['0,5', '0,25', '0,125', '0,125'];
    for (const [i, p] of probabilidades.entries()) {
      await fireEvent.changeText(screen.getByTestId(`entrada-P-${i}`), p);
    }

    // Ejemplo 07 de la página 28: H = 1,75 bit/símbolo.
    expect(screen.getByTestId('resultado')).toHaveTextContent('1,75 bit/símbolo');
  });

  it('pide la Variable mientras la lista está vacía', async () => {
    await render(<PantallaFormula formula={entropia} />);

    expect(screen.getByTestId('resultado')).toHaveTextContent('Falta: P');
  });
});

describe('línea de resultado canónico (S2)', () => {
  it('oculta la línea «= …» en U10-F07 cuando coincide con el resultado principal (83,5 MHz)', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 MHz');
    expect(screen.queryByTestId('resultado-canonico')).toBeNull();
    expect(screen.queryByText(/= 83500000/)).toBeNull();
  });

  it('muestra la línea «= …» convertida al múltiplo canónico de salida cuando difiere', async () => {
    await render(<PantallaFormula formula={formula} />);

    await fireEvent.changeText(screen.getByTestId('entrada-f_inf'), '2,4');
    await fireEvent.changeText(screen.getByTestId('entrada-f_sup'), '2,4835');
    await fireEvent.press(within(screen.getByTestId('multiplos-f_inf')).getByText('MHz'));
    await fireEvent.press(within(screen.getByTestId('multiplos-f_sup')).getByText('MHz'));

    expect(screen.getByTestId('resultado')).toHaveTextContent('83,5 kHz');
    expect(screen.getByTestId('resultado-canonico')).toHaveTextContent('= 0,0835 MHz');
  });

  it('oculta la línea «= …» en U02-F03 cuando ya está en mm y la convierte cuando está en m', async () => {
    const longitudOnda = buscarFormula('U02-F03')!;
    await render(<PantallaFormula formula={longitudOnda} />);

    await fireEvent.changeText(screen.getByTestId('entrada-v'), '340');
    await fireEvent.changeText(screen.getByTestId('entrada-f'), '20');

    expect(screen.getByTestId('resultado')).toHaveTextContent('17 mm');
    expect(screen.queryByTestId('resultado-canonico')).toBeNull();
    expect(screen.queryByText(/= 0,017/)).toBeNull();

    await fireEvent.press(within(screen.getByTestId('multiplos-f')).getByText('Hz'));

    expect(screen.getByTestId('resultado')).toHaveTextContent('17 m');
    expect(screen.getByTestId('resultado-canonico')).toHaveTextContent('= 17000 mm');
  });
});

describe('entradas sin selector de múltiplos y unidades con exponente (S3, S4 y S6)', () => {
  it('no ofrece selector de múltiplos en entradas de dBm o adimensional (S3)', async () => {
    const margen = buscarFormula('U03-F09')!;
    await render(<PantallaFormula formula={margen} />);

    expect(screen.queryByTestId('multiplos-RSSI')).toBeNull();
    expect(screen.getByTestId('unidad-fija-RSSI')).toHaveTextContent('dBm');
    expect(screen.queryByText('kdBm')).toBeNull();

    const cuadrada = buscarFormula('U02-F15')!;
    await render(<PantallaFormula formula={cuadrada} />);

    expect(screen.queryByTestId('multiplos-n')).toBeNull();
    expect(screen.getByTestId('unidad-fija-n')).toHaveTextContent('adimensional');
    expect(screen.queryByText('madimensional')).toBeNull();
    expect(screen.queryByText('kadimensional')).toBeNull();
  });

  it('muestra U02-F29 en s² sin prefijo ni línea redundante (S4)', async () => {
    const densidad = buscarFormula('U02-F29')!;
    await render(<PantallaFormula formula={densidad} />);

    await fireEvent.changeText(screen.getByTestId('entrada-p'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-f'), '0');

    expect(screen.getByTestId('resultado')).toHaveTextContent('0,000001 s²');
    expect(screen.queryByTestId('resultado-canonico')).toBeNull();
  });

  it('muestra 0 V en U02-F21 y U08-F09 y 0 s en U02-F27 (S6)', async () => {
    const pulsos = buscarFormula('U02-F21')!;
    await render(<PantallaFormula formula={pulsos} />);

    await fireEvent.changeText(screen.getByTestId('entrada-A'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-p'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-T'), '2');
    await fireEvent.changeText(screen.getByTestId('entrada-n'), '2');

    expect(screen.getByTestId('resultado')).toHaveTextContent('0 V');

    const portadora = buscarFormula('U08-F09')!;
    await render(<PantallaFormula formula={portadora} />);

    await fireEvent.changeText(screen.getByTestId('entrada-V_p'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-f_p'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-t'), '1');

    expect(screen.getByTestId('resultado')).toHaveTextContent('0 V');

    const pulsoOmega = buscarFormula('U02-F27')!;
    await render(<PantallaFormula formula={pulsoOmega} />);

    await fireEvent.press(within(screen.getByTestId('multiplos-p')).getByText('s'));
    await fireEvent.changeText(screen.getByTestId('entrada-p'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-ω'), String(2 * Math.PI));

    expect(screen.getByTestId('resultado')).toHaveTextContent('0 s');
  });
});
