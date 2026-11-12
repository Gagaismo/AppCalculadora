import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PantallaHerramientas } from '@/screens/bits';
import { colores } from '@/tema';

/** Pestaña «Bits»: las herramientas paso a paso de CRC, Hamming y VRC/LRC. */
export default function RutaHerramientas() {
  return (
    <SafeAreaView edges={['top']} style={estilos.pantalla}>
      <PantallaHerramientas onElegir={(ruta) => router.push(ruta)} />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
});
