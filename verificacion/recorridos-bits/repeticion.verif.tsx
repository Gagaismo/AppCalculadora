import { fireEvent, render, screen } from '@testing-library/react-native';

import { PantallaHamming } from '@/screens/bits/hamming';
import { PantallaVrcLrc } from '@/screens/bits/vrc-lrc';

/**
 * Los contraejemplos de `Hamming.tla` y `VrcLrc.tla`, repetidos sobre las pantallas reales.
 *
 * Las pruebas «HALLAZGO» afirman lo que el código hace HOY, que rompe una regla del
 * modelo. Mientras el hallazgo siga abierto, pasan. El día que se arregle van a fallar:
 * ahí se invierte la afirmación, se pasa la regla al `.cfg` principal y se borra el
 * `.cfg` de `hallazgos/`.
 *
 * En los modelos, «cambiados» son los bits que llegaron distintos de como se emitieron.
 * Acá lo emitido es el ejemplo de la cátedra, y cada toque cambia un bit de lo recibido.
 */

async function irAlResultado(nombre: string) {
  for (let i = 0; i < 20 && !screen.queryByText(nombre); i++) {
    await fireEvent.press(screen.getByText('Siguiente'));
  }
}

/** Receptor de la tabla con lo recibido igual a lo emitido: deshace el error del Ejemplo 02 (B4 · D6). */
async function receptorSinErrores() {
  await render(<PantallaVrcLrc />);
  await fireEvent.press(screen.getByText('Receptor'));
  await fireEvent.press(screen.getByLabelText(/^B4, D6: /));
}

describe('VrcLrc.tla', () => {
  it('sin bits cambiados, el receptor dice «Sin error detectado»', async () => {
    await receptorSinErrores();
    await irAlResultado('Resultado');
    expect(screen.getByText('Sin error detectado')).toBeTruthy();
  });

  it('HALLAZGO vrcLrc-esquinaSinVerificar: con la esquina cambiada, el receptor dice «Sin error detectado»', async () => {
    await receptorSinErrores();
    // UnBitLlegaCambiado(Esquina): el único bit que llega mal.
    await fireEvent.press(screen.getByLabelText('Esquina: 0'));
    expect(screen.getByLabelText('Esquina: 1')).toBeTruthy();

    await irAlResultado('Resultado');
    // La regla pide que un bit cambiado nunca pase por bueno.
    expect(screen.getByText('Sin error detectado')).toBeTruthy();
  });

  it('HALLAZGO vrcLrc-dosErroresDeControl: con un VRC y un LRC cambiados, «Corregir» invierte un dato que llegó bien', async () => {
    await receptorSinErrores();
    const dato = screen.getByLabelText(/^B3, D2: /).props.accessibilityLabel as string;
    const llego = dato.slice(-1);

    // UnBitLlegaCambiado(Vrc(2)) y UnBitLlegaCambiado(Lrc(3)): llegan mal dos bits de control.
    await fireEvent.press(screen.getByLabelText(/^VRC de D2: /));
    await fireEvent.press(screen.getByLabelText(/^LRC de B3: /));

    await irAlResultado('Resultado');
    // La pantalla culpa al dato del cruce, que llegó bien, y ofrece corregirlo.
    expect(screen.getByText('Error en B3 · D2')).toBeTruthy();
    await fireEvent.press(screen.getByText('Corregir el bit'));
    expect(screen.getByText(`Corregido: B3 · D2 = ${llego === '0' ? '1' : '0'}`)).toBeTruthy();
  });
});

describe('Hamming.tla', () => {
  /** Lo emitido: la palabra de la cátedra, 10011100101 (págs. 49-50). */
  async function recibir(palabra: string) {
    await render(<PantallaHamming />);
    await fireEvent.press(screen.getByText('Verificar (receptor)'));
    for (let i = 0; i < 11; i++) await fireEvent.press(screen.getByLabelText('Borrar el último bit'));
    for (const bit of palabra) await fireEvent.press(screen.getByLabelText(`Agregar un ${bit}`));
    await irAlResultado('Síndrome y corrección');
  }

  it('con un bit cambiado (posición 8), señala ese bit', async () => {
    await recibir('10001100101');
    expect(screen.getByText(/error en la posición 8/)).toBeTruthy();
  });

  it('HALLAZGO hamming-dosErrores: con las posiciones 1 y 2 cambiadas, «Corregir» invierte la 3, que llegó bien', async () => {
    // Emitida 10011100101; llegan cambiadas la posición 1 (último bit) y la 2.
    await recibir('10011100110');
    expect(screen.getByText(/error en la posición 3/)).toBeTruthy();
    await fireEvent.press(screen.getByText('Corregir el bit'));
    // La «corregida» tiene tres bits distintos de lo emitido: 1, 2 y ahora también 3.
    expect(screen.getByTestId('hamming-corregida')).toHaveTextContent('10011100010');
  });
});
