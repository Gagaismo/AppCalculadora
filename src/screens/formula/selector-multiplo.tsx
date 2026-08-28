import { Host, Picker } from '@expo/ui';
import { StyleSheet } from 'react-native';

import { conMultiplo, MULTIPLOS, type Multiplo } from '@/dominio/multiplos';
import { colores } from '@/tema';

export interface SelectorMultiploProps {
  /** El símbolo de la Variable. Identifica al selector en las pruebas. */
  readonly simbolo: string;
  readonly unidadDeMedida: string;
  readonly elegido: Multiplo;
  readonly onElegir: (multiplo: Multiplo) => void;
}

/**
 * `Multiplo` incluye la cadena vacía —la unidad base, Hz sin prefijo—, y el `Picker`
 * necesita que cada opción tenga un valor distinguible. `'base'` es ese valor.
 */
const BASE = 'base';

/**
 * El selector de múltiplo de una Variable.
 *
 * Es el control que justifica la existencia de la aplicación: cargar MHz donde la
 * Fórmula espera Hz da un resultado un millón de veces mayor sin ningún síntoma
 * visible (regla dura 6). Por eso está pegado al campo y muestra siempre, sin
 * desplegar nada, en qué múltiplo se está cargando.
 *
 * Antes eran nueve pastillas en una fila con scroll horizontal: una Fórmula de cuatro
 * Variables dibujaba treinta y seis controles y el elegido quedaba fuera de pantalla.
 *
 * Usa el `Picker` **universal** de `@expo/ui`, no el de Jetpack Compose. En Android
 * dibuja exactamente el mismo menú de Material 3, pero además funciona en iOS sin una
 * segunda implementación —que es lo que vuelve barata la decisión de dejar iOS
 * registrado a futuro— y, a diferencia de los componentes de `jetpack-compose`,
 * acepta `testID`.
 */
export function SelectorMultiplo({
  simbolo,
  unidadDeMedida,
  elegido,
  onElegir,
}: SelectorMultiploProps) {
  return (
    // `matchContents` en los dos ejes para que el control mida lo que ocupa y no se
    // estire a todo el ancho de la fila. `colorScheme` fijo en claro porque la app no
    // tiene tema oscuro: sin esto, Material 3 sigue al sistema y el selector aparece
    // como una barra negra sobre el fondo claro.
    <Host
      matchContents
      colorScheme="light"
      seedColor={colores.marca}
      style={estilos.contenedor}
    >
      <Picker
        testID={`multiplos-${simbolo}`}
        selectedValue={elegido === '' ? BASE : elegido}
        onValueChange={(valor) => onElegir(valor === BASE ? '' : (valor as Multiplo))}
      >
        {MULTIPLOS.map((multiplo) => (
          <Picker.Item
            key={multiplo || BASE}
            label={conMultiplo(multiplo, unidadDeMedida)}
            value={multiplo || BASE}
          />
        ))}
      </Picker>
    </Host>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    // Un piso de ancho para que «Hz» y «bit/símbolo» no den controles de tamaños
    // muy distintos en la misma pantalla.
    minWidth: 96,
  },
});
