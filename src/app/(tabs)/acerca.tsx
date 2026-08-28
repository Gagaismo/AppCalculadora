import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PantallaAcerca } from '@/screens/acerca';
import { colores } from '@/tema';

/**
 * Pestaña «Acerca de»: contexto del proyecto para la defensa oral.
 *
 * Contiene los datos verificables de la app —números, decisiones y cómo
 * leer una ficha— para que el tribunal pueda consultarlos dentro de la
 * misma herramienta que se está evaluando.
 */
export default function RutaAcerca() {
  return (
    <SafeAreaView edges={['top']} style={estilos.pantalla}>
      <PantallaAcerca />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
});
