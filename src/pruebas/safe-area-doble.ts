/**
 * Doble de `react-native-safe-area-context` para las pruebas.
 *
 * `useSafeAreaInsets()` **lanza** si no encuentra un `SafeAreaProvider` encima
 * (`SafeAreaContext.js`: `if (insets == null) throw new Error(NO_INSETS_ERROR)`), y las
 * pruebas renderizan cada pantalla suelta, sin el árbol de la app. Sin este doble, toda
 * prueba que toque la pantalla de Unidad o la de Fórmula falla con un error que habla
 * del proveedor y no de lo que la prueba estaba comprobando.
 *
 * Devuelve cero en los cuatro lados: es el caso del emulador sin barras del sistema, y
 * deja los estilos calculados iguales a los que la prueba espera. Lo que se comprueba
 * acá es que el relleno se sume, no cuánto mide en un teléfono concreto.
 *
 * El resto del módulo queda intacto —`SafeAreaView` y los proveedores son los de
 * verdad—, porque las pantallas de pestañas ya los usan y funcionan en las pruebas.
 */
jest.mock('react-native-safe-area-context', () => {
  const real = jest.requireActual('react-native-safe-area-context');

  return {
    ...real,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

export {};
