import { fireEvent, render, screen } from '@testing-library/react-native';

import { PantallaVrcLrc } from './vrc-lrc';

/** Avanza con «Siguiente» hasta la tarjeta del resultado. */
async function irAlResultado() {
  for (let i = 0; i < 20 && !screen.queryByText('Resultado'); i++) {
    await fireEvent.press(screen.getByText('Siguiente'));
  }
}

describe('pantalla VRC/LRC', () => {
  it('en el emisor, la tabla de la cátedra da LRC 1111011, VRC 01100110 y esquina 0 (pág. 25)', async () => {
    await render(<PantallaVrcLrc />);
    expect(screen.getByText('Paso 1 de 5')).toBeTruthy();

    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('VRC = 01100110')).toBeTruthy();
    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('LRC = 1111011')).toBeTruthy();

    await irAlResultado();
    expect(screen.getByText('Tabla a transmitir')).toBeTruthy();
    expect(screen.getByLabelText('LRC de B4: 1')).toBeTruthy();
    expect(screen.getByLabelText('VRC de D6: 1')).toBeTruthy();
    expect(screen.getByLabelText('Esquina: 0')).toBeTruthy();
    expect(screen.getByTestId('vrc-resumen')).toHaveTextContent(
      'LRC 1111011 · VRC 01100110 · esquina 0',
    );
  });

  it('en el receptor, la tabla recibida de la cátedra ubica el error en B4 · D6 y lo corrige', async () => {
    await render(<PantallaVrcLrc />);
    await fireEvent.press(screen.getByText('Receptor'));
    expect(screen.getByLabelText(/^B4, D6: 0/)).toBeTruthy();

    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('VRC de D6: llegó 1, da 0')).toBeTruthy();
    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('LRC de B4: llegó 1, da 0')).toBeTruthy();

    await irAlResultado();
    expect(screen.getByText('Error en B4 · D6')).toBeTruthy();
    expect(screen.getByLabelText('B4, D6: 0, bit erróneo')).toBeTruthy();

    await fireEvent.press(screen.getByText('Corregir el bit'));
    expect(screen.getByText('Corregido: B4 · D6 = 1')).toBeTruthy();
    expect(screen.getByLabelText('B4, D6: 1, corregido')).toBeTruthy();
  });

  it('tocar una celda de la entrada invierte su bit', async () => {
    await render(<PantallaVrcLrc />);
    expect(screen.getByLabelText('B1, D1: 0')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('B1, D1: 0'));
    expect(screen.getByLabelText('B1, D1: 1')).toBeTruthy();
    expect(screen.queryByLabelText('B1, D1: 0')).toBeNull();
  });

  it('con un error armado en dos filas y dos columnas, detecta pero no ubica el bit', async () => {
    await render(<PantallaVrcLrc />);
    await fireEvent.press(screen.getByText('Receptor'));
    await fireEvent.press(screen.getByLabelText('B1, D1: 0'));

    await irAlResultado();
    expect(screen.getByText('Error detectado, sin cruce único')).toBeTruthy();
    expect(screen.queryByText('Corregir el bit')).toBeNull();
  });

  it('con paridad impar sobre la tabla de la cátedra avisa que la cátedra usa paridad par', async () => {
    await render(<PantallaVrcLrc />);
    expect(screen.queryByText(/la cátedra usa paridad par/)).toBeNull();
    await fireEvent.press(screen.getByText('Impar'));
    expect(screen.getByText(/la cátedra usa paridad par/)).toBeTruthy();
  });

  it('el BCC lineal del bloque de la pág. 23 es 10101010', async () => {
    await render(<PantallaVrcLrc />);
    await fireEvent.press(screen.getByText('BCC lineal'));
    expect(screen.getByLabelText('Carácter 1: 10101001')).toBeTruthy();
    expect(screen.getByText('Paso 1 de 10')).toBeTruthy();

    await irAlResultado();
    expect(screen.getByText('BCC = 10101010')).toBeTruthy();
    expect(screen.getByTestId('bcc-bloque')).toHaveTextContent(
      '10101010 10101001 00111001 11011101 11100111',
    );
  });

  it('en el BCC, caracteres de distinto largo no avanzan y explican por qué', async () => {
    await render(<PantallaVrcLrc />);
    await fireEvent.press(screen.getByText('BCC lineal'));
    await fireEvent.press(screen.getByLabelText('Borrar el último bit'));

    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('Todas las cadenas tienen que tener la misma cantidad de bits.')).toBeTruthy();
    expect(screen.getByText('Paso 1 de 2')).toBeTruthy();
  });
});
