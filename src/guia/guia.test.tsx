import { fireEvent, render, screen } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';

import { ANIMACIONES, type NombreAnimacion } from './animaciones';
import { Guia } from './guia';

/**
 * Tests del guía.
 *
 * La animación se lee por la hoja que dibuja el Sprite: cada animación tiene la suya.
 */

beforeEach(() => {
  // Con movimiento reducido no corren ni el Sprite ni el vaivén: el test mira qué
  // se dibuja, no el paso del tiempo.
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('el guía', () => {
  it('muestra la frase en el globo', async () => {
    await render(<Guia animacion="hablando" texto="¡Bienvenidos!" />);

    expect(screen.getByTestId('guia-globo')).toHaveTextContent('¡Bienvenidos!');
  });

  it.each<NombreAnimacion>(['retando', 'senalando', 'festejando', 'confundido'])(
    'dibuja la hoja de la animación «%s»',
    async (animacion) => {
      await render(<Guia animacion={animacion} texto="Hola" />);

      expect(screen.getByTestId('guia-sprite-hoja').props.source).toEqual(
        ANIMACIONES[animacion].hoja,
      );
    },
  );

  it('al tocarlo se minimiza a un orbe y al tocarlo de nuevo vuelve', async () => {
    await render(<Guia animacion="hablando" texto="¡Bienvenidos!" />);

    const guia = screen.getByTestId('guia');
    expect(guia.props.accessibilityRole).toBe('button');
    expect(guia.props.accessibilityLabel).toBe('Minimizar al profe guía');

    await fireEvent.press(guia);
    expect(screen.queryByTestId('guia-globo')).toBeNull();
    expect(screen.queryByTestId('guia-sprite')).toBeNull();
    expect(screen.getByTestId('guia-orbe')).toBeTruthy();
    expect(screen.getByTestId('guia').props.accessibilityLabel).toBe('Mostrar al profe guía');

    await fireEvent.press(screen.getByTestId('guia'));
    expect(screen.getByTestId('guia-globo')).toHaveTextContent('¡Bienvenidos!');
    expect(screen.getByTestId('guia-sprite')).toBeTruthy();
  });
});
