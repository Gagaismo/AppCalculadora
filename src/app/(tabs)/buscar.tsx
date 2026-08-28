import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PantallaBusqueda } from '@/screens/busqueda';
import { colores } from '@/tema';

/**
 * Pestaña «Buscar»: búsqueda de Fórmulas por nombre o por símbolo.
 *
 * Al ser una pestaña permanente de la barra de navegación, la pila de esta
 * pestaña se preserva: si alguien escribe una búsqueda, cambia de pestaña y
 * vuelve, el texto sigue ahí.
 */
export default function RutaBusqueda() {
  return (
    <SafeAreaView edges={['top']} style={estilos.pantalla}>
      <PantallaBusqueda
        onSeleccionarFormula={(id) => {
          router.push({
            pathname: '/formula/[id]',
            params: { id },
          });
        }}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
});
