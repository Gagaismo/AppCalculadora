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
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { colores } from '@/tema';

/**
 * Mantiene el splash visible hasta que las fuentes estén listas.
 * Sin esto, el primer frame muestra la tipografía del sistema antes de
 * que carguen Sora e IBM Plex Mono, produciendo un parpadeo visible.
 */
SplashScreen.preventAutoHideAsync();

/**
 * Layout raíz de la aplicación.
 *
 * Responsabilidades:
 * 1. Cargar exactamente las cinco fuentes que el tema declara en `fuentes`.
 * 2. Mantener el splash visible hasta que las fuentes resuelvan.
 * 3. Montar la barra de pestañas nativa con las tres secciones de la app.
 *
 * La pantalla de Fórmula y la de Unidad **no son pestañas**: se apilan sobre
 * la pestaña activa mediante el Stack implícito que `NativeTabs` hereda de
 * `expo-router`. El botón «Volver» sigue funcionando igual que antes.
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
    <NativeTabs
      indicatorColor={colores.marca}
      rippleColor={colores.marca}
    >
      {/* Pestaña 1 — Unidades: el inicio actual con el catálogo de las diez Unidades */}
      <NativeTabs.Trigger name="index" accessibilityLabel="Unidades">
        <NativeTabs.Trigger.Label>Unidades</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="calculate" />
      </NativeTabs.Trigger>

      {/* Pestaña 2 — Buscar: búsqueda global de Fórmulas por nombre o símbolo */}
      <NativeTabs.Trigger name="buscar" accessibilityLabel="Buscar">
        <NativeTabs.Trigger.Label>Buscar</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="search" />
      </NativeTabs.Trigger>

      {/* Pestaña 3 — Acerca de: contexto del proyecto para la defensa oral */}
      <NativeTabs.Trigger name="acerca" accessibilityLabel="Acerca de">
        <NativeTabs.Trigger.Label>Acerca de</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="info" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
