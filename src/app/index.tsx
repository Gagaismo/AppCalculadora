import { router, Stack } from 'expo-router';

import { PantallaUnidades } from '@/screens/unidades';

/**
 * Pestaña «Unidades»: el catálogo de las diez Unidades de la materia.
 *
 * Con la barra de pestañas, el acceso a Buscar ya está a un toque de distancia
 * en cualquier momento. El botón «🔍 Buscar» del encabezado se suprime para
 * evitar duplicar el punto de entrada, pero el testID del botón de inicio en
 * PantallaUnidades se conserva intacto.
 */
export default function Inicio() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Comunicaciones',
          headerRight: () => null,
        }}
      />
      <PantallaUnidades
        onSeleccionarUnidad={(numero) => {
          router.push({
            pathname: '/unidad/[numero]',
            params: { numero: String(numero) },
          });
        }}
        onBuscar={() => {
          router.push('/buscar');
        }}
      />
    </>
  );
}
