import { fireEvent, render, screen } from '@testing-library/react-native';

import type { Formula } from '@/dominio/formula';

import { formatearCantidadResultados, PantallaBusqueda } from './index';

const formulaU02Mock: Formula = {
  id: 'U02-F01',
  unidad: 2,
  nombre: 'Potencia media de una señal periódica',
  expresion: 'P = V_ef^2 / R',
  entradas: [
    {
      simbolo: 'V_ef',
      significado: 'Tensión eficaz',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'R',
      significado: 'Resistencia',
      unidadDeMedida: 'Ω',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'P',
    significado: 'Potencia media',
    unidadDeMedida: 'W',
    multiploCanonico: '',
  },
  condiciones: 'Señal periódica.',
  paginas: '12',
  confianza: 'alta',
  calcular: ({ V_ef, R }) => (V_ef * V_ef) / R,
};

const formulaU10Mock: Formula = {
  id: 'U10-F07',
  unidad: 10,
  nombre: 'Ancho de banda de una banda de frecuencias (ISM / Wi-Fi)',
  expresion: 'AB = f_sup − f_inf',
  entradas: [
    {
      simbolo: 'f_sup',
      significado: 'Frecuencia superior',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'G',
    },
    {
      simbolo: 'f_inf',
      significado: 'Frecuencia inferior',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'G',
    },
  ],
  salida: {
    simbolo: 'AB',
    significado: 'Ancho de banda',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'M',
  },
  condiciones: 'Bandas ISM.',
  paginas: '34',
  confianza: 'media',
  calcular: ({ f_sup, f_inf }) => f_sup - f_inf,
};

const catalogoMock: readonly Formula[] = [formulaU02Mock, formulaU10Mock];

describe('formatearCantidadResultados', () => {
  it('formatea 1 fórmula encontrada en singular', () => {
    expect(formatearCantidadResultados(1)).toBe('1 fórmula encontrada');
  });

  it('formatea múltiples fórmulas encontradas en plural', () => {
    expect(formatearCantidadResultados(3)).toBe('3 fórmulas encontradas');
  });
});

describe('PantallaBusqueda', () => {
  it('muestra el campo de búsqueda y el mensaje de estado inicial', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    expect(screen.getByTestId('input-busqueda')).toBeTruthy();
    expect(screen.getByTestId('busqueda-estado-inicial')).toBeTruthy();
    expect(screen.getByText('Búsqueda de Fórmulas')).toBeTruthy();
  });

  it('encuentra fórmulas por nombre e indica a qué Unidad pertenece cada resultado', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'ancho');

    expect(screen.getByTestId('busqueda-conteo-resultados')).toHaveTextContent('1 fórmula encontrada');
    expect(screen.getByTestId('resultado-formula-U10-F07')).toBeTruthy();
    expect(screen.getByTestId('resultado-unidad-U10-F07')).toHaveTextContent('Unidad 10');
    expect(screen.getByTestId('resultado-id-U10-F07')).toHaveTextContent('U10-F07');
    expect(screen.getByTestId('resultado-nombre-U10-F07')).toHaveTextContent(formulaU10Mock.nombre);
    expect(screen.getByTestId('resultado-expresion-U10-F07')).toHaveTextContent(formulaU10Mock.expresion);
  });

  it('encuentra fórmulas ignorando mayúsculas y acentos (ej. senal -> Señal)', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'senal');

    expect(screen.getByTestId('resultado-formula-U02-F01')).toBeTruthy();
    expect(screen.getByTestId('resultado-unidad-U02-F01')).toHaveTextContent('Unidad 2');
    expect(screen.getByTestId('resultado-nombre-U02-F01')).toHaveTextContent(
      'Potencia media de una señal periódica',
    );
  });

  it('encuentra fórmulas por símbolo de variable de entrada (ej. f_sup)', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'f_sup');

    expect(screen.getByTestId('resultado-formula-U10-F07')).toBeTruthy();
    expect(screen.getByTestId('resultado-unidad-U10-F07')).toHaveTextContent('Unidad 10');
  });

  it('encuentra fórmulas por símbolo de variable de salida (ej. AB)', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'AB');

    expect(screen.getByTestId('resultado-formula-U10-F07')).toBeTruthy();
  });

  it('encuentra fórmulas por símbolo de salida en minúsculas (ej. ab -> AB)', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'ab');

    expect(screen.getByTestId('resultado-formula-U10-F07')).toBeTruthy();
  });

  it('muestra estado sin resultados cuando no hay coincidencias', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'termino_inexistente_xyz');

    expect(screen.getByTestId('busqueda-sin-resultados')).toBeTruthy();
    expect(screen.getByText('Sin resultados')).toBeTruthy();
    expect(
      screen.getByText(
        'No se encontraron fórmulas para «termino_inexistente_xyz». Verificá el nombre o el símbolo ingresado.',
      ),
    ).toBeTruthy();
  });

  it('permite limpiar la búsqueda con el botón de limpieza', async () => {
    await render(<PantallaBusqueda catalogo={catalogoMock} />);

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'ancho');

    expect(screen.getByTestId('resultado-formula-U10-F07')).toBeTruthy();

    const botonLimpiar = screen.getByTestId('boton-limpiar-busqueda');
    await fireEvent.press(botonLimpiar);

    expect(screen.getByTestId('busqueda-estado-inicial')).toBeTruthy();
    expect(screen.queryByTestId('resultado-formula-U10-F07')).toBeNull();
  });

  it('llama a onSeleccionarFormula con el id al presionar un resultado', async () => {
    const onSeleccionarFormula = jest.fn();
    await render(
      <PantallaBusqueda
        catalogo={catalogoMock}
        onSeleccionarFormula={onSeleccionarFormula}
      />,
    );

    const input = screen.getByTestId('input-busqueda');
    await fireEvent.changeText(input, 'ancho');

    const resultado = screen.getByTestId('resultado-formula-U10-F07');
    await fireEvent.press(resultado);

    expect(onSeleccionarFormula).toHaveBeenCalledTimes(1);
    expect(onSeleccionarFormula).toHaveBeenCalledWith('U10-F07');
  });

  it('acepta un término inicial de búsqueda', async () => {
    await render(
      <PantallaBusqueda catalogo={catalogoMock} terminoInicial="f_inf" />,
    );

    expect(screen.getByTestId('resultado-formula-U10-F07')).toBeTruthy();
  });
});
