import { Stack } from 'expo-router';

import { PantallaAcerca } from '@/screens/acerca';

/**
 * Pestaña «Acerca de»: contexto del proyecto para la defensa oral.
 *
 * Contiene los datos verificables de la app —números, decisiones y cómo
 * leer una ficha— para que el tribunal pueda consultarlos dentro de la
 * misma herramienta que se está evaluando.
 */
export default function RutaAcerca() {
  return (
    <>
      <Stack.Screen options={{ title: 'Acerca de' }} />
      <PantallaAcerca />
    </>
  );
}
