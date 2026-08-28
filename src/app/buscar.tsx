import { Stack } from 'expo-router';

import { PantallaBusqueda } from '@/screens/busqueda';
import { router } from 'expo-router';

/**
 * Pestaña «Buscar»: búsqueda de Fórmulas por nombre o por símbolo.
 *
 * Al ser ahora una pestaña permanente de la barra de navegación, la pila de
 * esta pestaña se preserva: si alguien escribe una búsqueda, cambia de
 * pestaña y vuelve, el texto sigue ahí.
 */
export default function RutaBusqueda() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Buscar fórmulas',
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
