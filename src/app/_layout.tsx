import {
  IBMPlexMono_400Regular,
  IBMPlexMono_600SemiBold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { colores, fuentes } from '@/tema';

/**
 * Mantiene el splash visible hasta que las fuentes estén listas.
 * Sin esto, el primer frame muestra la tipografía del sistema antes de
 * que carguen Sora e IBM Plex Mono, produciendo un parpadeo visible.
 */
SplashScreen.preventAutoHideAsync();

/**
 * Layout raíz de la aplicación: una **pila**.
 *
 * Responsabilidades:
 * 1. Cargar exactamente las cinco fuentes que el tema declara en `fuentes`.
 * 2. Mantener el splash visible hasta que las fuentes resuelvan.
 * 3. Apilar las pantallas de Unidad y de Fórmula sobre la barra de pestañas.
 *
 * **Por qué la raíz es un Stack y no `NativeTabs`.** `NativeTabs` registra
 * únicamente las rutas que se declaran como `<NativeTabs.Trigger>`: el resto de
 * los archivos del directorio se descartan (`withLayoutContext` lo llama
 * `useOnlyUserDefinedScreens`). Con `NativeTabs` en la raíz, `unidad/[numero]` y
 * `formula/[id]` no existían para el navegador y `router.push()` hacia ellas no
 * hacía absolutamente nada. La barra de pestañas vive ahora en `(tabs)/_layout`,
 * un nivel más abajo, y estas dos pantallas se apilan encima con su encabezado y
 * su botón «Volver».
 */
export default function DisposicionRaiz() {
  const [fontsCargadas, errorFuentes] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
    IBMPlexMono_400Regular,
    IBMPlexMono_600SemiBold,
  });

  useEffect(() => {
    if (fontsCargadas || errorFuentes) {
      // Las fuentes resolvieron (con éxito o con error): ya podemos mostrar la app.
      SplashScreen.hideAsync();
    }
  }, [fontsCargadas, errorFuentes]);

  // No montamos la interfaz hasta tener las fuentes.
  if (!fontsCargadas && !errorFuentes) {
    return null;
  }

  return (
    <>
      {/* Fondo crema y tema claro fijo: los íconos de la barra de estado van oscuros. */}
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.fondo },
          headerTintColor: colores.accion,
          headerTitleStyle: {
            fontFamily: fuentes.interfazFuerte,
            color: colores.texto,
          },
          contentStyle: { backgroundColor: colores.fondo },
        }}
      >
        {/* La barra de pestañas trae su propio encabezado por pantalla. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
