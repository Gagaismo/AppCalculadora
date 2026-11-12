import { Host, Slider } from '@expo/ui';
import { StyleSheet, Text, View, type AccessibilityActionEvent } from 'react-native';

import { formatearNumero } from '@/screens/formula/numeros';
import { colores, espacio, fuentes, tipografia } from '@/tema';

export type Escala = 'lineal' | 'log';

/**
 * Cuánto avanza una acción `increment` o `decrement` del lector de pantalla: un
 * vigésimo del recorrido. En log son partes iguales en décadas, no en valor.
 */
const PASOS = 20;

/** El área táctil mínima de la pista, como en el diseño (44 × 44). */
const ALTO_TACTIL = 44;

const recortar = (t: number) => Math.min(1, Math.max(0, t));

/**
 * La escala log necesita un rango positivo. Si no lo es, el deslizador se comporta
 * como lineal en vez de entregar `NaN`.
 */
const esLog = (minimo: number, maximo: number, escala: Escala) =>
  escala === 'log' && minimo > 0 && maximo > 0;

/** Dónde cae `valor` en la pista, de 0 a 1. Un valor fuera del rango queda en el borde. */
export function posicionDe(valor: number, minimo: number, maximo: number, escala: Escala): number {
  if (maximo === minimo) return 0;
  if (esLog(minimo, maximo, escala)) {
    if (valor <= 0) return 0;
    return recortar(Math.log10(valor / minimo) / Math.log10(maximo / minimo));
  }
  return recortar((valor - minimo) / (maximo - minimo));
}

/** El valor que corresponde a la posición `t` de la pista. Siempre dentro del rango. */
export function valorDe(t: number, minimo: number, maximo: number, escala: Escala): number {
  const p = recortar(t);
  if (p === 0) return minimo;
  if (p === 1) return maximo;
  if (esLog(minimo, maximo, escala)) return minimo * (maximo / minimo) ** p;
  return minimo + p * (maximo - minimo);
}

export interface DeslizadorProps {
  /** El valor actual, en la misma unidad que `minimo` y `maximo`. */
  readonly valor: number;
  readonly minimo: number;
  readonly maximo: number;
  readonly escala: Escala;
  /** Recibe el valor nuevo, siempre dentro de `[minimo, maximo]`. */
  readonly onCambiar: (valor: number) => void;
  /** El símbolo de la Variable. Es también el rótulo para el lector de pantalla. */
  readonly etiqueta: string;
  /**
   * El valor como se lee, con su múltiplo y su Unidad de medida («3 kHz»). Sin él se
   * muestra el número con coma decimal.
   */
  readonly textoValor?: string;
  readonly testID?: string;
}

/**
 * Una fila del panel de la gráfica: símbolo, pista y valor (S6).
 *
 * La pista es el `Slider` **universal** de `@expo/ui` (Material 3 en Android, SwiftUI
 * en iOS) y siempre recorre de 0 a 1: la conversión a la escala lineal o log la hace
 * este componente con `posicionDe` y `valorDe`, para que la pista se mueva parejo por
 * décadas y no se amontone en el último tramo.
 *
 * La fila entera es un único control `adjustable` para el lector de pantalla, con
 * `increment` y `decrement`: así se anuncia el símbolo junto con el valor legible y
 * no la posición cruda de la pista.
 */
export function Deslizador({
  valor,
  minimo,
  maximo,
  escala,
  onCambiar,
  etiqueta,
  textoValor,
  testID,
}: DeslizadorProps) {
  const posicion = posicionDe(valor, minimo, maximo, escala);
  const texto = textoValor ?? formatearNumero(valor);

  const alAccion = (evento: AccessibilityActionEvent) => {
    const { actionName } = evento.nativeEvent;
    if (actionName !== 'increment' && actionName !== 'decrement') return;
    const paso = actionName === 'increment' ? 1 : -1;
    onCambiar(valorDe(posicion + paso / PASOS, minimo, maximo, escala));
  };

  return (
    <View
      testID={testID}
      style={estilos.fila}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={etiqueta}
      accessibilityValue={{ text: texto }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={alAccion}
    >
      <Text style={estilos.simbolo}>{etiqueta}</Text>
      <Host
        matchContents={{ vertical: true }}
        colorScheme="light"
        seedColor={colores.marca}
        style={estilos.pista}
      >
        <Slider
          testID={testID && `${testID}-pista`}
          value={posicion}
          min={0}
          max={1}
          onValueChange={(t) => onCambiar(valorDe(t, minimo, maximo, escala))}
        />
      </Host>
      <Text style={estilos.valor}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
    minHeight: ALTO_TACTIL,
  },
  simbolo: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.notaFuerte,
    color: colores.texto,
    minWidth: 32,
  },
  pista: {
    flex: 1,
    minHeight: ALTO_TACTIL,
    justifyContent: 'center',
  },
  valor: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.nota,
    color: colores.texto,
    minWidth: 72,
    textAlign: 'right',
  },
});
