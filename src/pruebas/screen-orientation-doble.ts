/**
 * Doble de prueba de `expo-screen-orientation`.
 *
 * El módulo real habla con la actividad de Android o con el controlador de vistas de
 * iOS; en Jest no hay ninguno de los dos. El doble conserva los valores del enum que
 * usa la app y deja `lockAsync` como un `jest.fn` para que la prueba afirme qué
 * orientación se pidió y en qué orden.
 *
 * Lo que el doble **no** prueba es que el teléfono gire de verdad. Eso se verifica en
 * el dispositivo.
 *
 * No se engancha por `moduleNameMapper` como el de `@expo/ui`: la prueba que lo
 * necesita lo carga con `jest.mock('expo-screen-orientation', …)` en su propio archivo.
 */

/** Los mismos valores que `OrientationLock` de `expo-screen-orientation` 57. */
export enum OrientationLock {
  DEFAULT = 0,
  ALL = 1,
  PORTRAIT = 2,
  PORTRAIT_UP = 3,
  PORTRAIT_DOWN = 4,
  LANDSCAPE = 5,
  LANDSCAPE_LEFT = 6,
  LANDSCAPE_RIGHT = 7,
  OTHER = 8,
  UNKNOWN = 9,
}

export const lockAsync = jest.fn((_bloqueo: OrientationLock) => Promise.resolve());
