import { fireEvent, render, screen } from '@testing-library/react-native';

import { NavegacionPasos, ProgresoPasos } from './pasos';
import { TecladoBits } from './teclado';

describe('teclado de bits', () => {
  it('cada tecla tiene su rótulo en español y avisa qué se tocó', async () => {
    const onBit = jest.fn();
    const onBorrar = jest.fn();
    await render(<TecladoBits onBit={onBit} onBorrar={onBorrar} />);

    await fireEvent.press(screen.getByLabelText('Agregar un 1'));
    await fireEvent.press(screen.getByLabelText('Agregar un 0'));
    await fireEvent.press(screen.getByLabelText('Borrar el último bit'));

    expect(onBit.mock.calls).toEqual([['1'], ['0']]);
    expect(onBorrar).toHaveBeenCalledTimes(1);
  });
});

describe('stepper', () => {
  it('muestra «Paso k de N» con el nombre del paso', async () => {
    await render(<ProgresoPasos paso={2} total={8} nombre="XOR 2 de 6" />);
    expect(screen.getByText('Paso 3 de 8')).toBeTruthy();
    expect(screen.getByText('XOR 2 de 6')).toBeTruthy();
  });

  it('en el primer paso «Anterior» está deshabilitado y «Siguiente» avanza', async () => {
    const onIr = jest.fn();
    await render(<NavegacionPasos paso={0} total={4} onIr={onIr} />);

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    await fireEvent.press(screen.getByText('Siguiente'));
    expect(onIr).toHaveBeenCalledWith(1);
  });

  it('en el último paso ofrece volver a la entrada', async () => {
    const onIr = jest.fn();
    await render(<NavegacionPasos paso={3} total={4} onIr={onIr} />);

    await fireEvent.press(screen.getByText('Anterior'));
    await fireEvent.press(screen.getByText('Volver a la entrada'));
    expect(onIr.mock.calls).toEqual([[2], [0]]);
  });
});
