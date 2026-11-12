import { AccessibilityInfo } from 'react-native';

/**
 * Las pruebas arrancan con «reducir movimiento» activado.
 *
 * El guía anima su hoja con un `setInterval` y flota con un `Animated.loop`. En las
 * pruebas que renderizan una pantalla para comprobar otra cosa, esos temporizadores
 * siguen corriendo y React avisa `act(...)` en cada cuadro: ruido que tapa los avisos
 * que sí importan. Con movimiento reducido el guía se queda quieto, que es justo lo que
 * esas pruebas necesitan.
 *
 * Va en `beforeEach` para que vuelva a aplicarse después de un `restoreAllMocks`. Las
 * pruebas del `Sprite` que sí miden la animación lo pisan con su propio `spyOn`.
 */
beforeEach(() => {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
});

export {};
