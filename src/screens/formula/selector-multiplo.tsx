import { DropdownMenu, DropdownMenuItem, Host, Text as TextoNativo } from '@expo/ui/jetpack-compose';
import { View } from 'react-native';

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
 * El selector de múltiplo de una Variable.
 *
 * Es el control que justifica la existencia de la aplicación: cargar MHz donde la
 * Fórmula espera Hz da un resultado un millón de veces mayor sin ningún síntoma
 * visible (regla dura 6). Por eso está pegado al campo y muestra siempre, sin
 * desplegar nada, en qué múltiplo se está cargando.
 *
 * Antes eran nueve pastillas en una fila con scroll horizontal: una Fórmula de cuatro
 * Variables dibujaba treinta y seis controles y el elegido quedaba fuera de pantalla.
 * Ahora es un menú desplegable de Material 3, uno por Variable.
 *
 * **Sobre las pruebas.** Ningún componente de `@expo/ui` acepta `testID`: el árbol
 * nativo no es alcanzable desde `@testing-library/react-native`. Por eso el `testID`
 * y la etiqueta de accesibilidad viven en la `View` de React Native que lo envuelve —
 * una prueba puede afirmar **qué múltiplo se está mostrando**, que es el hecho que le
 * importa a quien usa la app. Elegir uno distinto se prueba montando este componente
 * y llamando a `onElegir`; que la conversión sea correcta ya lo cubren los 234
 * Ejemplos resueltos contra el motor.
 */
export function SelectorMultiplo({
  simbolo,
  unidadDeMedida,
  elegido,
  onElegir,
}: SelectorMultiploProps) {
  const etiqueta = conMultiplo(elegido, unidadDeMedida);

  return (
    <View
      testID={`multiplos-${simbolo}`}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Múltiplo de ${simbolo}: ${etiqueta}. Tocá para cambiarlo.`}
      accessibilityValue={{ text: etiqueta }}
    >
      <Host matchContents>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <TextoNativo color={colores.accion}>{`${etiqueta} ▾`}</TextoNativo>
          </DropdownMenu.Trigger>

          <DropdownMenu.Items>
            {MULTIPLOS.map((multiplo) => (
              <DropdownMenuItem
                key={multiplo}
                onClick={() => onElegir(multiplo)}
                elementColors={{
                  textColor: multiplo === elegido ? colores.accion : colores.texto,
                }}
              >
                <DropdownMenuItem.Text>
                  <TextoNativo>{conMultiplo(multiplo, unidadDeMedida)}</TextoNativo>
                </DropdownMenuItem.Text>
              </DropdownMenuItem>
            ))}
          </DropdownMenu.Items>
        </DropdownMenu>
      </Host>
    </View>
  );
}
