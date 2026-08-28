import { Host, Picker } from '@expo/ui';

import { conMultiplo, MULTIPLOS, type Multiplo } from '@/dominio/multiplos';

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
    <Host matchContents={{ vertical: true }}>
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
