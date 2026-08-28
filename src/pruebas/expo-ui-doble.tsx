import { Children, isValidElement, type ReactNode } from 'react';
import { Pressable, Text as TextoRN, View } from 'react-native';

/**
 * Doble de prueba de `@expo/ui`.
 *
 * Los componentes de `@expo/ui` son vistas nativas —Jetpack Compose en Android,
 * SwiftUI en iOS— y en Jest no renderizan. Sin doble, convertir el selector de
 * múltiplo a un componente nativo habría costado la prueba que verifica el camino
 * completo: elegir MHz, que el motor convierta, que el resultado pase de 83,5 MHz a
 * 83,5 kHz. Ese es exactamente el camino que la aplicación existe para asegurar, así
 * que apagar la prueba no era una opción.
 *
 * El doble reproduce la **estructura lógica** del `Picker` con componentes de React
 * Native: cada opción es un botón con su rótulo, de modo que la prueba elige el
 * múltiplo como lo haría una persona, buscando el texto que ve en pantalla.
 *
 * Lo que el doble **no** prueba es que el componente nativo se dibuje bien. Eso se
 * verifica en el teléfono, no acá.
 *
 * Se engancha por `moduleNameMapper` en la configuración de Jest.
 */

export function Host({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

export function Text({ children }: { children?: ReactNode }) {
  return <TextoRN>{children}</TextoRN>;
}

export function Row({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

export function Column({ children }: { children?: ReactNode }) {
  return <View>{children}</View>;
}

export function Spacer() {
  return <View />;
}

interface ItemProps<T> {
  readonly label: string;
  readonly value: T;
}

function Item<T>(_props: ItemProps<T>) {
  return null;
}

interface PickerProps<T> {
  readonly selectedValue: T;
  readonly onValueChange: (valor: T) => void;
  readonly children?: ReactNode;
  readonly testID?: string;
  readonly enabled?: boolean;
  readonly appearance?: 'menu' | 'wheel';
}

function PickerBase<T>({ selectedValue, onValueChange, children, testID }: PickerProps<T>) {
  const opciones = Children.toArray(children).flatMap((hijo) =>
    isValidElement<ItemProps<T>>(hijo) ? [hijo.props] : [],
  );
  const elegida = opciones.find((o) => o.value === selectedValue);

  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="button"
      // El múltiplo elegido tiene que poder afirmarse sin desplegar el menú: es el
      // dato que evita cargar MHz donde la Fórmula espera Hz.
      accessibilityValue={{ text: elegida?.label ?? '' }}
    >
      {opciones.map((opcion) => (
        <Pressable
          key={String(opcion.value)}
          accessibilityRole="button"
          onPress={() => onValueChange(opcion.value)}
        >
          <TextoRN>{opcion.label}</TextoRN>
        </Pressable>
      ))}
    </View>
  );
}

export const Picker = Object.assign(PickerBase, { Item });
