import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { buscarFormula } from '@/formulas';
import { esGraficable } from '@/graficas/muestreo';
import { PantallaGrafica } from '@/screens/grafica';
import { colores, tipografia } from '@/tema';

/**
 * Ruta de la gráfica a pantalla completa de una Fórmula: `/formula/<id>/grafica`.
 * La pantalla trae su propia cabecera con el botón de salir: en horizontal el alto es
 * todo para el lienzo.
 */
export default function RutaGrafica() {
  const params = useLocalSearchParams<{ id: string }>();
  const formula = params.id ? buscarFormula(params.id) : undefined;

  if (!formula || !esGraficable(formula)) {
    return (
      <>
        <Stack.Screen options={{ title: 'Gráfica' }} />
        <View style={estilos.noEncontrado}>
          <Text style={estilos.textoNoEncontrado}>
            {formula ? 'Esta Fórmula es una ficha de consulta: no tiene gráfica.' : 'No se encontró la Fórmula.'}
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <PantallaGrafica formula={formula} />
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
