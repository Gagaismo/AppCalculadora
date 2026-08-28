import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { buscarFormula } from '@/formulas';
import { colores, tipografia } from '@/tema';
import { PantallaFormula } from '@/screens/formula';

/**
 * Ruta para la pantalla genérica de cálculo de una Fórmula seleccionada.
 */
export default function RutaFormula() {
  const params = useLocalSearchParams<{ id: string }>();
  const formula = params.id ? buscarFormula(params.id) : undefined;

  if (!formula) {
    return (
      <>
        <Stack.Screen options={{ title: 'Fórmula' }} />
        <View style={estilos.noEncontrado}>
          <Text style={estilos.textoNoEncontrado}>No se encontró la Fórmula.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Unidad ${formula.unidad}` }} />
      <PantallaFormula formula={formula} />
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
