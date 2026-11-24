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

/**
 * Toda prop o texto del árbol dibujado que lleve un número no finito. En Android un
 * `d` con «NaN» cierra la app (`PathViewManager.setD`): acá tiene que quedar vacío.
 */
function noFinitos(arbol: unknown): string[] {
  const hallados: string[] = [];
  const malo = (v: unknown) =>
    (typeof v === 'number' && !Number.isFinite(v)) ||
    (typeof v === 'string' && /NaN|Infinity/.test(v));
  const recorrer = (nodo: unknown, camino: string): void => {
    if (Array.isArray(nodo)) return nodo.forEach((n, i) => recorrer(n, `${camino}[${i}]`));
    if (malo(nodo)) {
      hallados.push(`${camino}: ${String(nodo)}`);
      return;
    }
    if (!nodo || typeof nodo !== 'object') return;
    const { type, props, children } = nodo as { type?: string; props?: object; children?: unknown };
    for (const [clave, valor] of Object.entries(props ?? {})) {
      if (malo(valor)) hallados.push(`${camino}${type}.${clave}: ${String(valor)}`);
    }
    recorrer(children, `${camino}${type}>`);
  };
  recorrer(arbol, '');
  return hallados;
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

  // S1: una curva que da 0 en todos sus puntos no cierra la app.
  it.each([
    ['U05-F17 con B = 3000 y SNR = 0', 'U05-F17', { B: '3000', SNR: '0' }],
    ['U02-F04 con v = 0 y T = 0', 'U02-F04', { v: '0', T: '0' }],
  ])('%s: dibuja la curva plana sin números no finitos', async (_, id, textos) => {
    await render(<PantallaFormula formula={buscarFormula(id)!} />);
    for (const [simbolo, texto] of Object.entries(textos)) await cargar(simbolo, texto);
    expect(screen.getByTestId('lienzo-curva-0').props.d).toMatch(/^M[\d.]+ [\d.]+(L[\d.]+ [\d.]+)+$/);
    expect(screen.getByTestId('lienzo-punto-actual')).toBeTruthy();
    expect(noFinitos(screen.toJSON())).toEqual([]);
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
