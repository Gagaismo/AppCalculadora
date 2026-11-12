import { router, Stack } from 'expo-router';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import RutaFormula from '@/app/formula/[id]';
import RutaGrafica from '@/app/formula/[id]/grafica';
import RutaUnidad from '@/app/unidad/[numero]';
import { ProveedorSesion } from '@/graficas/sesion';

/**
 * Los recorridos del modelo `SesionFormula.tla`, repetidos sobre las rutas reales.
 *
 * Las pruebas «HALLAZGO» afirman lo que el código hace HOY, que rompe una regla del
 * modelo. Mientras el hallazgo siga abierto, pasan. El día que se arregle van a fallar:
 * ahí se invierte la afirmación, se pasa la regla al `.cfg` principal y se borra el
 * `.cfg` de `hallazgos/`.
 */

jest.mock('expo-screen-orientation', () => require('@/pruebas/screen-orientation-doble'));

const rutas = {
  _layout: () => (
    <ProveedorSesion>
      <Stack />
    </ProveedorSesion>
  ),
  index: () => null,
  'unidad/[numero]': RutaUnidad,
  'formula/[id]': RutaFormula,
  'formula/[id]/grafica': RutaGrafica,
};

/** U05-F17, la capacidad de Shannon: entradas B y SNR, graficable. */
const ID = 'U05-F17';
const campoB = () => screen.getByTestId('entrada-B').props.value;

it('regla 1, recorrido sin hallazgo: lo que mueve la gráfica vuelve a los campos de la Fórmula', async () => {
  await renderRouter(rutas, { initialUrl: `/formula/${ID}` });
  await fireEvent.changeText(screen.getByTestId('entrada-B'), '3000');
  await fireEvent.changeText(screen.getByTestId('entrada-SNR'), '1023');

  await fireEvent.press(screen.getByTestId('ver-grafica'));
  await fireEvent(screen.getByTestId('deslizador-B'), 'accessibilityAction', {
    nativeEvent: { actionName: 'increment' },
  });
  await fireEvent.press(screen.getByTestId('salir-grafica'));

  expect(campoB()).not.toBe('3000');
  expect(campoB()).not.toBe('');
});

it('regla 2, recorrido sin hallazgo: al cerrar la Fórmula y volver a abrirla, abre vacía', async () => {
  await renderRouter(rutas, { initialUrl: '/' });
  await act(() => router.push(`/formula/${ID}`));
  await fireEvent.changeText(screen.getByTestId('entrada-B'), '3000');
  await act(() => router.back());

  await act(() => router.push(`/formula/${ID}`));
  expect(campoB()).toBe('');
});

it('HALLAZGO dosPantallasDeLaMismaFormula: cerrar la de arriba borra lo cargado en la que queda', async () => {
  await renderRouter(rutas, { initialUrl: '/unidad/5' });

  // AbrirFormula y AbrirLaMismaFormulaEncima: los dos toques de un doble toque en la
  // lista. La lista llama a router.push sin ninguna guarda, y push apila siempre.
  await act(() => router.push({ pathname: '/formula/[id]', params: { id: ID } }));
  await act(() => router.push({ pathname: '/formula/[id]', params: { id: ID } }));

  // Escribir.
  await fireEvent.changeText(screen.getByTestId('entrada-B'), '3000');
  expect(campoB()).toBe('3000');

  // Volver: una sola vez. Sigue en pantalla la misma Fórmula (la de abajo)…
  await act(() => router.back());
  expect(screen.getByTestId('entrada-B')).toBeTruthy();
  // …pero lo cargado se perdió. La regla pide '3000'.
  expect(campoB()).toBe('');
});

it('AbrirGraficaPorEnlace: una gráfica sin Fórmula debajo no tiene deslizadores, así que no escribe la sesión', async () => {
  await renderRouter(rutas, { initialUrl: `/formula/${ID}/grafica` });
  expect(screen.getByTestId('salir-grafica')).toBeTruthy();
  // «sin cargar»: el lugar del deslizador está, pero no hay pista que mover.
  expect(screen.getByTestId('deslizador-B')).toHaveTextContent(/sin cargar/);
  expect(screen.queryByTestId('deslizador-B-pista')).toBeNull();
});
