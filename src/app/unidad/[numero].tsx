import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { PantallaUnidad, obtenerUnidad } from '@/screens/unidad';
import { colores, tipografia } from '@/tema';

/**
 * Ruta para listar las Fórmulas de una Unidad seleccionada.
 */
export default function RutaUnidad() {
  const params = useLocalSearchParams<{ numero: string }>();
  const numero = Number(params.numero);
  const info = obtenerUnidad(numero);

  if (!info || Number.isNaN(numero)) {
    return (
      <>
        <Stack.Screen options={{ title: 'Unidad' }} />
        <View style={estilos.noEncontrado}>
          <Text style={estilos.textoNoEncontrado}>No se encontró la Unidad.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Unidad ${numero}` }} />
      <PantallaUnidad
        numero={numero}
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

const estilos = StyleSheet.create({
  noEncontrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textoNoEncontrado: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
});
