import { fireEvent, render, screen } from '@testing-library/react-native';

import { PantallaCrc } from './crc';

/** Avanza con «Siguiente» hasta la tarjeta del resultado. */
async function irAlResultado() {
  for (let i = 0; i < 30 && !screen.queryByText('Resultado'); i++) {
    await fireEvent.press(screen.getByText('Siguiente'));
  }
}

describe('pantalla CRC', () => {
  it('con el ejemplo de la cátedra recorre los 6 XOR y llega a R = 1001 y T = 1011011101001', async () => {
    await render(<PantallaCrc />);

    expect(screen.getByText('Paso 1 de 8')).toBeTruthy();
    await fireEvent.press(screen.getByText('Siguiente'));
    // El primer renglón de la pág. 30, con el bit que se baja.
    expect(screen.getByText('101101 ⊕ 110011 = 011110')).toBeTruthy();

    await irAlResultado();
    expect(screen.getByText('Paso 8 de 8')).toBeTruthy();
    expect(screen.getByText('R(x) = 1001')).toBeTruthy();
    expect(screen.getByTestId('crc-trama')).toHaveTextContent('1011011101001');
    expect(screen.queryByText(/cociente/i)).toBeNull();
  });

  it('en el receptor la trama de la cátedra da resto 0: sin error', async () => {
    await render(<PantallaCrc />);
    await fireEvent.press(screen.getByText('Verificar en el receptor'));
    expect(screen.getByLabelText("T'(x) · trama recibida: 1011011101001")).toBeTruthy();

    await irAlResultado();
    expect(screen.getByText('Resto 00000 · sin error')).toBeTruthy();
  });

  it('con un bit cambiado por quien usa la app, el receptor avisa que hay error', async () => {
    await render(<PantallaCrc />);
    await fireEvent.press(screen.getByText('Verificar en el receptor'));
    await fireEvent.press(screen.getByLabelText('Borrar el último bit'));
    await fireEvent.press(screen.getByLabelText('Agregar un 0'));

    await irAlResultado();
    expect(screen.getByText(/≠ 0 · hay error/)).toBeTruthy();
  });

  it('con un generador inválido no avanza y explica por qué', async () => {
    await render(<PantallaCrc />);
    await fireEvent.press(screen.getByLabelText(/^G\(x\)/));
    for (let i = 0; i < 5; i++) await fireEvent.press(screen.getByLabelText('Borrar el último bit'));

    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('G(x) tiene que empezar con 1 y tener al menos 2 bits.')).toBeTruthy();
    expect(screen.getByText('Paso 1 de 2')).toBeTruthy();
  });
});
