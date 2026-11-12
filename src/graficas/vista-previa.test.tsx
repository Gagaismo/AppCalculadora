import { Text } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

import RutaFormula from '@/app/formula/[id]';
import { buscarFormula } from '@/formulas';
import { PantallaFormula } from '@/screens/formula';

import { ProveedorSesion } from './sesion';

/**
 * La vista previa de la gráfica en la pantalla vertical de la Fórmula (S6, lámina A).
 * En RNTL 14 `render` y `fireEvent` llevan `await`.
 */

jest.mock('expo-screen-orientation', () => require('@/pruebas/screen-orientation-doble'));

const shannon = buscarFormula('U05-F17')!;

async function cargar(simbolo: string, texto: string) {
  await fireEvent.changeText(screen.getByTestId(`entrada-${simbolo}`), texto);
}

describe('vista previa de la gráfica', () => {
  it('una Fórmula graficable muestra «Ver gráfica» y la pista de girar el teléfono', async () => {
    await render(<PantallaFormula formula={shannon} />);
    expect(screen.getByTestId('ver-grafica')).toHaveTextContent('Ver gráfica');
    expect(screen.getByText('Se abre en horizontal, a pantalla completa')).toBeTruthy();
  });

  it('una ficha de consulta no tiene vista previa', async () => {
    await render(<PantallaFormula formula={buscarFormula('U02-F02')!} />);
    expect(screen.queryByText('Ver gráfica')).toBeNull();
    expect(screen.queryByTestId('vista-previa')).toBeNull();
  });

  it('sin datos, dice qué falta cargar en vez de dibujar', async () => {
    await render(<PantallaFormula formula={shannon} />);
    expect(screen.getByText('C en función de B')).toBeTruthy();
    expect(
      screen.getByText('Para dibujar la curva cargá SNR. B va en el eje X: puede quedar vacío.'),
    ).toBeTruthy();
    expect(screen.queryByTestId('lienzo')).toBeNull();
  });

  it('con una entrada no numérica, pide revisarla', async () => {
    await render(<PantallaFormula formula={shannon} />);
    await cargar('B', '3000');
    await cargar('SNR', 'abc');
    expect(screen.getByText('Revisá SNR: debe ser un número válido.')).toBeTruthy();
    expect(screen.queryByTestId('lienzo')).toBeNull();
  });

  it('con el Ejemplo 07 dibuja la curva y marca el punto actual', async () => {
    await render(<PantallaFormula formula={shannon} />);
    await cargar('B', '3000');
    await cargar('SNR', '1023');
    expect(screen.getByTestId('lienzo-lectura')).toHaveTextContent('B = 3000 Hz → C = 30 kbit/s');
    expect(screen.getByTestId('lienzo-punto-actual')).toBeTruthy();
    expect(screen.getByTestId('lienzo-curva-0')).toBeTruthy();
  });

  it('«Ver gráfica» abre la pantalla horizontal de esa Fórmula', async () => {
    await renderRouter(
      {
        _layout: () => (
          <ProveedorSesion>
            <Stack />
          </ProveedorSesion>
        ),
        'formula/[id]': RutaFormula,
        'formula/[id]/grafica': function Destino() {
          return <Text testID="ruta">{usePathname()}</Text>;
        },
      },
      { initialUrl: '/formula/U05-F17' },
    );
    await fireEvent.press(screen.getByTestId('ver-grafica'));
    expect(screen.getByTestId('ruta')).toHaveTextContent('/formula/U05-F17/grafica');
  });
});
