import { router, Stack } from 'expo-router';

import { PantallaUnidades } from '@/screens/unidades';

/**
 * Pantalla de inicio de la aplicación.
 *
 * Muestra el catálogo de las diez Unidades de la materia con la cantidad
 * de Fórmulas disponibles en cada una.
 */
export default function Inicio() {
  return (
    <>
      <Stack.Screen options={{ title: 'Comunicaciones' }} />
      <PantallaUnidades
        onSeleccionarUnidad={(numero) => {
          router.push({
            pathname: '/unidad/[numero]',
            params: { numero: String(numero) },
          });
        }}
      />
    </>
  );
}
