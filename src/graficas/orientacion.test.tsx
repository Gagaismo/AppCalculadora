import { Text } from 'react-native';
import { router, type Href } from 'expo-router';
import { act, renderRouter } from 'expo-router/testing-library';

import { OrientationLock, lockAsync } from '@/pruebas/screen-orientation-doble';

import { useOrientacionHorizontal } from './orientacion';

// El doble no va por `moduleNameMapper` porque esta es la única prueba que lo necesita.
jest.mock('expo-screen-orientation', () => require('@/pruebas/screen-orientation-doble'));

function PantallaGrafica() {
  useOrientacionHorizontal();
  return <Text>gráfica</Text>;
}

function PantallaFormula() {
  return <Text>fórmula</Text>;
}

const rutas = {
  index: PantallaFormula,
  grafica: PantallaGrafica,
};

beforeEach(() => {
  lockAsync.mockClear();
});

describe('useOrientacionHorizontal', () => {
  it('traba en horizontal al enfocar la pantalla de la gráfica', async () => {
    await renderRouter(rutas, { initialUrl: '/grafica' });

    expect(lockAsync).toHaveBeenCalledTimes(1);
    expect(lockAsync).toHaveBeenLastCalledWith(OrientationLock.LANDSCAPE);
  });

  it('vuelve a vertical al salir de la pantalla de la gráfica', async () => {
    await renderRouter(rutas, { initialUrl: '/' });
    expect(lockAsync).not.toHaveBeenCalled();

    // `/grafica` es una ruta de este árbol de prueba, no de la app: las rutas tipadas
    // (`.expo/types/router.d.ts`) no la conocen.
    await act(() => router.push('/grafica' as Href));
    expect(lockAsync).toHaveBeenLastCalledWith(OrientationLock.LANDSCAPE);

    await act(() => router.back());
    expect(lockAsync).toHaveBeenLastCalledWith(OrientationLock.PORTRAIT_UP);
    expect(lockAsync).toHaveBeenCalledTimes(2);
  });

  it('vuelve a vertical al desmontar la pantalla', async () => {
    const { unmount } = await renderRouter(rutas, { initialUrl: '/grafica' });

    await act(() => unmount());

    expect(lockAsync.mock.calls.map(([bloqueo]) => bloqueo)).toEqual([
      OrientationLock.LANDSCAPE,
      OrientationLock.PORTRAIT_UP,
    ]);
  });
});
