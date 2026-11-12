import { fireEvent, render, screen } from '@testing-library/react-native';

import { PantallaHamming } from './hamming';

/** Avanza con «Siguiente» hasta el último paso. */
async function irAlResultado(nombre: RegExp | string) {
  for (let i = 0; i < 20 && !screen.queryByText(nombre); i++) {
    await fireEvent.press(screen.getByText('Siguiente'));
  }
}

describe('pantalla Hamming', () => {
  it('en el emisor, los datos de la cátedra 1001101 dan la palabra 10011100101', async () => {
    await render(<PantallaHamming />);
    expect(screen.getByLabelText('Datos n7 … n1: 1001101')).toBeTruthy();
    expect(screen.getByText('Paso 1 de 8')).toBeTruthy();

    await fireEvent.press(screen.getByText('Siguiente'));
    // U06-F09: el menor p con 2^p ≥ n + p + 1.
    expect(screen.getByText('p = 4 · palabra de 11 bits')).toBeTruthy();
    expect(screen.getByText(/p = 4: 2\^4 = 16 ≥ 7 \+ 4 \+ 1 = 12 ✓/)).toBeTruthy();

    await irAlResultado('Palabra a transmitir');
    expect(screen.getByText('Paso 8 de 8')).toBeTruthy();
    expect(screen.getByTestId('hamming-palabra')).toHaveTextContent('10011100101');
    expect(screen.getByText('p4 p3 p2 p1 = 1 0 0 1 · paridad par (pág. 49)')).toBeTruthy();
  });

  it('el grupo p1 cubre las posiciones de datos 11, 9, 7, 5 y 3 y da p1 = 1', async () => {
    await render(<PantallaHamming />);
    await irAlResultado('Grupo p1');
    expect(screen.getByText('p1 = 1')).toBeTruthy();
    expect(screen.getByText(/Posiciones 11, 9, 7, 5, 3: 3 unos/)).toBeTruthy();
  });

  it('en el receptor, 10001100101 da síndrome 1000: posición 8, y se corrige a 10011100101', async () => {
    await render(<PantallaHamming />);
    await fireEvent.press(screen.getByText('Verificar (receptor)'));
    expect(screen.getByLabelText('Palabra recibida · posición 11 → 1: 10001100101')).toBeTruthy();

    await irAlResultado('Síndrome y corrección');
    expect(screen.getByText('Paso 6 de 6')).toBeTruthy();
    expect(screen.getByText(/1000 = 8 · error en la posición 8 \(p4\)/)).toBeTruthy();
    expect(screen.queryByTestId('hamming-corregida')).toBeNull();

    await fireEvent.press(screen.getByText('Corregir el bit'));
    expect(screen.getByTestId('hamming-corregida')).toHaveTextContent('10011100101');
  });

  it('en el receptor, la palabra de la cátedra sin error da síndrome 0000', async () => {
    await render(<PantallaHamming />);
    await fireEvent.press(screen.getByText('Verificar (receptor)'));
    // Quien usa la app cambia el bit 8 de vuelta: 10001100101 → 10011100101.
    for (let i = 0; i < 8; i++) await fireEvent.press(screen.getByLabelText('Borrar el último bit'));
    for (const bit of '11100101') await fireEvent.press(screen.getByLabelText(`Agregar un ${bit}`));

    await irAlResultado('Síndrome y corrección');
    expect(screen.getByText('Síndrome 0000 · sin error')).toBeTruthy();
    expect(screen.queryByText('Corregir el bit')).toBeNull();
  });

  it('si el síndrome señala una posición que no existe, avisa que no puede corregir', async () => {
    await render(<PantallaHamming />);
    await fireEvent.press(screen.getByText('Verificar (receptor)'));
    // 1110 (posiciones 4 → 1): p3 y p1 no cumplen → síndrome 101 = 5, y la palabra tiene 4 bits.
    for (let i = 0; i < 11; i++) await fireEvent.press(screen.getByLabelText('Borrar el último bit'));
    for (const bit of '1110') await fireEvent.press(screen.getByLabelText(`Agregar un ${bit}`));

    await irAlResultado('Síndrome y corrección');
    expect(screen.getByText(/la posición 5 no existe/)).toBeTruthy();
    expect(screen.queryByText('Corregir el bit')).toBeNull();
  });

  it('con los datos vacíos no avanza y explica por qué', async () => {
    await render(<PantallaHamming />);
    for (let i = 0; i < 7; i++) await fireEvent.press(screen.getByLabelText('Borrar el último bit'));

    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('Los datos no pueden quedar vacíos.')).toBeTruthy();
    expect(screen.getByText('Paso 1 de 2')).toBeTruthy();
  });

  it('con menos de 3 bits recibidos no avanza y explica por qué', async () => {
    await render(<PantallaHamming />);
    await fireEvent.press(screen.getByText('Verificar (receptor)'));
    for (let i = 0; i < 9; i++) await fireEvent.press(screen.getByLabelText('Borrar el último bit'));

    await fireEvent.press(screen.getByText('Siguiente'));
    expect(screen.getByText('La palabra recibida tiene que tener al menos 3 bits.')).toBeTruthy();
    expect(screen.getByText('Paso 1 de 2')).toBeTruthy();
  });

  it('el chip «Cátedra» vuelve a cargar el ejemplo de las págs. 49-50', async () => {
    await render(<PantallaHamming />);
    await fireEvent.press(screen.getByLabelText('Borrar el último bit'));
    await fireEvent.press(screen.getByText('Cátedra'));
    expect(screen.getByLabelText('Datos n7 … n1: 1001101')).toBeTruthy();
  });
});
