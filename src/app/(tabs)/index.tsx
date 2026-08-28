import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PantallaUnidades } from '@/screens/unidades';
import { colores } from '@/tema';

/**
 * Pestaña «Unidades»: el catálogo de las diez Unidades de la materia.
 *
 * Las pestañas no llevan encabezado —el título de cada una ya está en la barra
 * inferior y la pantalla abre con su propio título—, así que el margen superior
 * lo pone `SafeAreaView`: sin él el contenido arrancaría debajo de la hora y la
 * batería.
 *
 * Con la barra de pestañas, el acceso a Buscar ya está a un toque de distancia
 * en cualquier momento. El botón «🔍 Buscar» del encabezado se suprime para
 * evitar duplicar el punto de entrada, pero el testID del botón de inicio en
 * PantallaUnidades se conserva intacto.
 */
export default function Inicio() {
  return (
    <SafeAreaView edges={['top']} style={estilos.pantalla}>
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
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
});
