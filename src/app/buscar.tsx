import { router, Stack } from 'expo-router';

import { PantallaBusqueda } from '@/screens/busqueda';

/**
 * Ruta para la búsqueda de Fórmulas por nombre o por símbolo.
 *
 * Permite buscar en todo el catálogo de fórmulas desde cualquier parte de la app
 * y navegar directamente a la pantalla de cálculo de la fórmula seleccionada.
 */
export default function RutaBusqueda() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Buscar fórmulas',
          headerRight: () => null,
        }}
      />
      <PantallaBusqueda
        onSeleccionarFormula={(id) => {
          router.push({
            pathname: '/formula/[id]',
            params: { id },
          });
        }}
      />
    </>
  );
}
