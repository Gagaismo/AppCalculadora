import { router, Stack } from 'expo-router';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import RutaFormula from '@/app/formula/[id]';
import RutaGrafica from '@/app/formula/[id]/grafica';
import { ProveedorSesion } from '@/graficas/sesion';
import { OrientationLock, lockAsync } from '@/pruebas/screen-orientation-doble';

/**
 * Los recorridos del modelo `OrientacionGrafica.tla`, repetidos sobre las rutas reales.
 *
 * El modelo no deduce en qué orden pide la orientación cada pantalla cuando el foco pasa
 * de una gráfica a otra: lo toma de acá. Si esta prueba cambia de resultado, la
 * definición `CambioDeFoco` del modelo dejó de describir el código.
 *
 * Lo que no prueba: que el teléfono gire. `lockAsync` es un doble.
 */

jest.mock('expo-screen-orientation', () => require('@/pruebas/screen-orientation-doble'));

const rutas = {
  _layout: () => (
    <ProveedorSesion>
      <Stack />
    </ProveedorSesion>
  ),
  index: () => null,
  'formula/[id]': RutaFormula,
  'formula/[id]/grafica': RutaGrafica,
};

const H = 'LANDSCAPE';
const V = 'PORTRAIT_UP';
const pedidos = () => lockAsync.mock.calls.map(([bloqueo]) => OrientationLock[bloqueo]);

beforeEach(() => lockAsync.mockClear());

it('AbrirGrafica y SalirGrafica: horizontal al entrar, vertical al salir', async () => {
  await renderRouter(rutas, { initialUrl: '/formula/U05-F17' });
  expect(pedidos()).toEqual([]);

  await fireEvent.press(screen.getByTestId('ver-grafica'));
  expect(pedidos()).toEqual([H]);

  await fireEvent.press(screen.getByTestId('salir-grafica'));
  expect(pedidos()).toEqual([H, V]);
});

it('AbrirOtraGraficaEncima (doble toque): la limpieza de la primera va antes que el foco de la segunda', async () => {
  await renderRouter(rutas, { initialUrl: '/formula/U05-F17' });
  const boton = screen.getByTestId('ver-grafica');

  // Dos toques seguidos: el segundo llega antes de que la gráfica tape el botón.
  await fireEvent.press(boton);
  await fireEvent.press(boton);
  // El último pedido es horizontal: en la segunda gráfica la app queda horizontal.
  expect(pedidos()).toEqual([H, V, H]);

  // Volver una vez: sigue habiendo una gráfica, y el último pedido es horizontal.
  await act(() => router.back());
  expect(pedidos()).toEqual([H, V, H, V, H]);

  // Volver otra vez: ya está la Fórmula, y el último pedido es vertical.
  await act(() => router.back());
  expect(pedidos()).toEqual([H, V, H, V, H, V]);
  expect(screen.getByTestId('ver-grafica')).toBeTruthy();
});

it('ElArbolSeDesmonta: si la limpieza corre, pide vertical', async () => {
  const { unmount } = await renderRouter(rutas, { initialUrl: '/formula/U05-F17/grafica' });
  await act(() => unmount());
  expect(pedidos()).toEqual([H, V]);
});
