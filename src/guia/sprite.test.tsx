import { act, render, screen } from '@testing-library/react-native';
import { AccessibilityInfo, StyleSheet } from 'react-native';

import { ANIMACIONES } from './animaciones';
import { Sprite } from './sprite';

/**
 * Tests del Sprite.
 *
 * El cuadro visible se lee por la posición de la hoja dentro del recorte: el cuadro
 * n está en la columna n % 5 y la fila n / 5, y la hoja se corre esa distancia hacia
 * arriba y a la izquierda.
 */

const TAMANO = 100;

function cuadroVisible(): number {
  const estilo = StyleSheet.flatten(screen.getByTestId('profe-hoja').props.style);
  const columna = -estilo.left / TAMANO;
  const fila = -estilo.top / TAMANO;
  return fila * 5 + columna;
}

async function avanzar(ms: number) {
  await act(async () => {
    jest.advanceTimersByTime(ms);
  });
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('el Sprite', () => {
  it('avanza un cuadro por cada 1/fps segundos', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
    await render(<Sprite hoja={ANIMACIONES.reposo.hoja} fps={10} tamano={TAMANO} testID="profe" />);

    expect(cuadroVisible()).toBe(0);
    await avanzar(100);
    expect(cuadroVisible()).toBe(1);
    await avanzar(100 * 6);
    expect(cuadroVisible()).toBe(7);
  });

  it('después del cuadro 24 vuelve al 0', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
    await render(<Sprite hoja={ANIMACIONES.reposo.hoja} fps={10} tamano={TAMANO} testID="profe" />);

    await avanzar(100 * 24);
    expect(cuadroVisible()).toBe(24);
    await avanzar(100);
    expect(cuadroVisible()).toBe(0);
  });

  it('con movimiento reducido se queda en el cuadro 0', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    await render(<Sprite hoja={ANIMACIONES.reposo.hoja} fps={10} tamano={TAMANO} testID="profe" />);

    await avanzar(1000);
    expect(cuadroVisible()).toBe(0);
  });

  it('recorta un cuadro del tamaño pedido sobre una hoja cinco veces más grande', async () => {
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    await render(<Sprite hoja={ANIMACIONES.reposo.hoja} fps={10} tamano={TAMANO} testID="profe" />);

    const recorte = StyleSheet.flatten(screen.getByTestId('profe').props.style);
    expect(recorte).toMatchObject({ width: TAMANO, height: TAMANO, overflow: 'hidden' });
    const hoja = StyleSheet.flatten(screen.getByTestId('profe-hoja').props.style);
    expect(hoja).toMatchObject({ width: TAMANO * 5, height: TAMANO * 5 });
  });
});

describe('las animaciones del guía', () => {
  it('tienen los fps de la spec', () => {
    const fps = Object.fromEntries(
      Object.entries(ANIMACIONES).map(([nombre, animacion]) => [nombre, animacion.fps]),
    );
    expect(fps).toEqual({
      reposo: 10,
      hablando: 12,
      retando: 12,
      senalando: 12,
      festejando: 15,
      confundido: 10,
      pensando: 10,
    });
  });
});
