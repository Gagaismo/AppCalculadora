import { useEffect, useState } from 'react';
import { AccessibilityInfo, Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

/**
 * Un cuadro de una hoja de sprites de 5x5.
 *
 * La hoja se dibuja entera, cinco veces más grande que el recorte, y se corre para
 * que por el recorte asome sólo el cuadro actual. Los cuadros van de izquierda a
 * derecha y de arriba abajo, y después del 24 se vuelve al 0.
 *
 * Con movimiento reducido activado en el sistema se queda quieto en el cuadro 0.
 */

const LADO = 5;
const CUADROS = LADO * LADO;

export function Sprite({
  hoja,
  fps,
  tamano,
  testID,
}: {
  hoja: ImageSourcePropType;
  fps: number;
  tamano: number;
  testID?: string;
}) {
  const [cuadro, setCuadro] = useState(0);

  useEffect(() => {
    let vigente = true;
    let intervalo: ReturnType<typeof setInterval> | undefined;

    AccessibilityInfo.isReduceMotionEnabled().then((reducido) => {
      if (!vigente || reducido) return;
      intervalo = setInterval(() => setCuadro((previo) => (previo + 1) % CUADROS), 1000 / fps);
    });

    return () => {
      vigente = false;
      if (intervalo !== undefined) clearInterval(intervalo);
      setCuadro(0);
    };
  }, [hoja, fps]);

  return (
    <View testID={testID} style={[estilos.recorte, { width: tamano, height: tamano }]}>
      <Image
        testID={testID === undefined ? undefined : `${testID}-hoja`}
        source={hoja}
        style={{
          position: 'absolute',
          width: tamano * LADO,
          height: tamano * LADO,
          left: -(cuadro % LADO) * tamano,
          top: -Math.floor(cuadro / LADO) * tamano,
        }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  recorte: {
    overflow: 'hidden',
  },
});
