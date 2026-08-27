import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

/**
 * Botón de acceso a la búsqueda en la barra de navegación superior.
 * Permite buscar fórmulas desde cualquier pantalla de la aplicación.
 */
function BotonBuscarHeader() {
  return (
    <Pressable
      testID="boton-buscar-header"
      accessibilityRole="button"
      accessibilityLabel="Buscar fórmulas por nombre o símbolo"
      onPress={() => {
        router.push('/buscar');
      }}
      style={({ pressed }) => [estilos.botonHeader, pressed && estilos.botonHeaderPresionado]}
    >
      <Text style={estilos.textoBotonHeader}>🔍 Buscar</Text>
    </Pressable>
  );
}

export default function DisposicionRaiz() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <BotonBuscarHeader />,
      }}
    />
  );
}

const estilos = StyleSheet.create({
  botonHeader: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  botonHeaderPresionado: {
    backgroundColor: '#E2E8F0',
  },
  textoBotonHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#208AEF',
  },
});
