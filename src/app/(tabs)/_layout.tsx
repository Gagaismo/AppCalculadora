import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { colores } from '@/tema';

/**
 * La barra de pestañas nativa con las tres secciones de la aplicación.
 *
 * Vive en el grupo `(tabs)` y no en la raíz a propósito: `NativeTabs` descarta
 * toda ruta del directorio que no esté declarada como `<NativeTabs.Trigger>`,
 * así que las pantallas de Unidad y de Fórmula tienen que quedar afuera. Se
 * apilan sobre esta barra desde el Stack de `src/app/_layout.tsx`.
 *
 * El nombre del grupo va entre paréntesis, de modo que las direcciones no
 * cambian: la pestaña de inicio sigue siendo `/`, la de búsqueda `/buscar`.
 */
export default function DisposicionPestanas() {
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
