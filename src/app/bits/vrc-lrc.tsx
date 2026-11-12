import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { colores, espacio, tipografia } from '@/tema';

// Provisorio: la pantalla de esta herramienta la reemplaza la tarea que le corresponde.
export default function RutaVrcLrc() {
  return (
    <>
      <Stack.Screen options={{ title: 'VRC / LRC · paridad' }} />
      <Text style={{ ...tipografia.cuerpo, color: colores.textoSuave, padding: espacio.lg }}>
        Próximamente
      </Text>
    </>
  );
}
