/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { Pressable, Text as TextoRN, View } from 'react-native';

/**
 * Doble de prueba de `@expo/ui/jetpack-compose`.
 *
 * Los componentes de `@expo/ui` son vistas nativas de Jetpack Compose: en Jest no
 * renderizan, y además ninguno acepta `testID`, así que el árbol nativo no es
 * alcanzable desde `@testing-library/react-native`.
 *
 * Sin este doble, convertir los selectores de múltiplo a componentes nativos habría
 * costado la prueba que verifica el camino completo —elegir MHz, que el motor
 * convierta, que el resultado cambie—, que es justamente el camino que la aplicación
 * existe para asegurar. El doble reproduce la **estructura lógica** del menú con
 * componentes de React Native, de modo que esa prueba se sigue escribiendo como la
 * escribiría alguien usando la app: buscando el rótulo que ve en pantalla.
 *
 * Lo que el doble **no** prueba es que el componente nativo se dibuje bien. Eso se
 * verifica en el teléfono, no acá.
 *
 * Se engancha por `moduleNameMapper` en la configuración de Jest.
 */

export function Host({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

export function Text({ children }: { children?: ReactNode; color?: string }) {
  return <TextoRN>{children}</TextoRN>;
}

function Trigger({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

function Items({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

export function DropdownMenu({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}
DropdownMenu.Trigger = Trigger;
DropdownMenu.Items = Items;
DropdownMenu.Preview = ({ children }: { children: ReactNode }) => <View>{children}</View>;

function TextSlot({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

export function DropdownMenuItem({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: () => void;
  elementColors?: unknown;
  enabled?: boolean;
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onClick}>
      {children}
    </Pressable>
  );
}
DropdownMenuItem.Text = TextSlot;
DropdownMenuItem.LeadingIcon = TextSlot;
DropdownMenuItem.TrailingIcon = TextSlot;
