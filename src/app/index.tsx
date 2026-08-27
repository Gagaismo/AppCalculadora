import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { buscarFormula } from '@/formulas';
import { PantallaFormula } from '@/screens/formula';

/**
 * Por ahora la app abre directamente en la Fórmula con la que se estableció el patrón.
 * La navegación por Unidades llega en su propio ticket.
 */
export default function Inicio() {
  const formula = buscarFormula('U10-F07');

  if (!formula) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text>No se encontró la Fórmula.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Unidad ${formula.unidad}` }} />
      <PantallaFormula formula={formula} />
    </>
  );
}
