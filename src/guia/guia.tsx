import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colores, espacio, radio, tipografia } from '@/tema';

import { ANIMACIONES } from './animaciones';
import type { Frase } from './frases';
import { Sprite } from './sprite';

/**
 * El profe guía: flota en la esquina inferior derecha, como Navi o un fuego fatuo,
 * con un halo cálido y un globo con una línea corta.
 *
 * Va superpuesto a la pantalla, así que se puede minimizar: al tocarlo queda sólo un
 * orbe chico que brilla, y al tocarlo de nuevo vuelve. La pantalla que lo usa le deja
 * aire abajo (`ALTO_GUIA`) para que ningún campo quede tapado sin remedio.
 *
 * Con movimiento reducido no se mece ni anima: queda quieto en el primer cuadro.
 */

const TAMANO_SPRITE = 72;
const TAMANO_ORBE = 28;
const VAIVEN = 4;

/** El alto que ocupa el guía desplegado; las pantallas lo suman a su relleno inferior. */
export const ALTO_GUIA = TAMANO_SPRITE + espacio.xl * 2;

export function Guia({ animacion, texto }: Frase) {
  const [minimizado, setMinimizado] = useState(false);
  const margenInferior = useSafeAreaInsets().bottom;
  const desplazamiento = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let vigente = true;
    let vaiven: Animated.CompositeAnimation | undefined;

    AccessibilityInfo.isReduceMotionEnabled().then((reducido) => {
      if (!vigente || reducido) return;
      const tramo = (hacia: number) =>
        Animated.timing(desplazamiento, { toValue: hacia, duration: 1400, useNativeDriver: true });
      vaiven = Animated.loop(Animated.sequence([tramo(-VAIVEN), tramo(VAIVEN)]));
      vaiven.start();
    });

    return () => {
      vigente = false;
      vaiven?.stop();
    };
  }, [desplazamiento]);

  const tamano = minimizado ? TAMANO_ORBE : TAMANO_SPRITE;
  const animacionActual = ANIMACIONES[animacion];

  return (
    <View style={[estilos.esquina, { bottom: espacio.md + margenInferior }]}>
      {!minimizado && (
        <View testID="guia-globo" style={estilos.globo} accessibilityLiveRegion="polite">
          <Text style={estilos.textoGlobo}>{texto}</Text>
        </View>
      )}

      <Pressable
        testID="guia"
        accessibilityRole="button"
        accessibilityLabel={
          minimizado ? 'Mostrar al profe guía' : 'Minimizar al profe guía'
        }
        hitSlop={espacio.sm}
        onPress={() => setMinimizado((previo) => !previo)}
      >
        <Animated.View
          style={[
            estilos.cuerpo,
            { width: tamano, height: tamano, transform: [{ translateY: desplazamiento }] },
          ]}
        >
          <View
            style={[
              estilos.halo,
              {
                width: tamano * 1.25,
                height: tamano * 1.25,
                opacity: minimizado ? 0.85 : 0.35,
              },
            ]}
          />
          {minimizado ? (
            <View testID="guia-orbe" style={estilos.orbe} />
          ) : (
            <Sprite
              hoja={animacionActual.hoja}
              fps={animacionActual.fps}
              tamano={TAMANO_SPRITE}
              testID="guia-sprite"
            />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  esquina: {
    position: 'absolute',
    right: espacio.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: espacio.xs,
    // Los toques que no caen sobre el guía ni el globo pasan a la pantalla de abajo.
    pointerEvents: 'box-none',
  },
  globo: {
    maxWidth: 200,
    marginBottom: TAMANO_SPRITE / 2,
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.sm,
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.brilloGuia,
    backgroundColor: colores.superficie,
  },
  textoGlobo: {
    ...tipografia.etiqueta,
    color: colores.texto,
  },
  cuerpo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    borderRadius: radio.pastilla,
    backgroundColor: colores.brilloGuia,
    shadowColor: colores.brilloGuia,
    shadowOpacity: 0.9,
    shadowRadius: espacio.lg,
    shadowOffset: { width: 0, height: 0 },
  },
  orbe: {
    width: TAMANO_ORBE / 2,
    height: TAMANO_ORBE / 2,
    borderRadius: radio.pastilla,
    // El centro blanco sobre el halo cálido: la luz del fuego fatuo.
    backgroundColor: colores.superficie,
  },
});
