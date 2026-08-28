import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import type { Formula } from '@/dominio/formula';
import { EXPRESIONES } from '@/formulas/expresiones-generadas';
import { colores, fuentes, radio } from '@/tema';

interface ExpresionProps {
  readonly formula: Formula;
  /**
   * Altura de la expresión, en píxeles, para una expresión de una línea. Las que
   * tienen fracción o integral crecen solas en proporción.
   */
  readonly altura?: number;
}

/**
 * La expresión matemática de una Fórmula.
 *
 * Dibuja el SVG que `npm run expresiones` generó a partir del LaTeX. El SVG está
 * pre-renderizado a propósito: la app no ejecuta MathJax, así que lo que se ve en el
 * teléfono es exactamente lo que se generó, y una lista de 29 Fórmulas no paga nada
 * por mostrar notación de verdad.
 *
 * Si una Fórmula todavía no tiene `expresionLatex`, o si su SVG no se generó, cae al
 * texto plano. Degradar es deliberado: un hueco donde va la fórmula sería peor que el
 * texto que estamos reemplazando.
 */
export function Expresion({ formula, altura = 22 }: ExpresionProps) {
  const renderizada = EXPRESIONES[formula.id];

  // El SVG no tiene texto que un lector de pantalla pueda leer. La expresión en texto
  // plano sigue existiendo justamente para esto.
  const etiqueta = formula.expresion;

  if (!renderizada) {
    return (
      <Text
        testID={`expresion-${formula.id}`}
        accessibilityLabel={etiqueta}
        style={estilos.textoPlano}
      >
        {formula.expresion}
      </Text>
    );
  }

  // MathJax devuelve las medidas en `ex`. Se conserva la proporción y se escala a la
  // altura pedida, así una fracción ocupa el doble que una expresión de una línea sin
  // que nadie tenga que calcularlo.
  const escala = altura / renderizada.altoEx;

  return (
    <View
      testID={`expresion-${formula.id}`}
      accessible
      accessibilityLabel={etiqueta}
      style={estilos.contenedor}
    >
      <SvgXml
        xml={renderizada.svg}
        width={renderizada.anchoEx * escala}
        height={renderizada.altoEx * escala}
        // El SVG usa `currentColor`: el color sale del tema, no está horneado.
        color={colores.texto}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
    backgroundColor: colores.superficie,
    borderRadius: radio.sm,
    borderWidth: 1,
    borderColor: colores.borde,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  textoPlano: {
    fontFamily: fuentes.nota,
    fontSize: 15,
    color: colores.texto,
    backgroundColor: colores.superficie,
    borderRadius: radio.sm,
    borderWidth: 1,
    borderColor: colores.borde,
    paddingHorizontal: 10,
    paddingVertical: 8,
    overflow: 'hidden',
  },
});
