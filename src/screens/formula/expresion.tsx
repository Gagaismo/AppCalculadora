import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import type { Formula } from '@/dominio/formula';
import { EXPRESIONES } from '@/formulas/expresiones-generadas';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

/** Relleno y borde del marco. Se descuentan del ancho útil, así que son constantes. */
const RELLENO = 10;
const BORDE = 1;

interface DibujoProps {
  readonly testID: string;
  /** La clave en `EXPRESIONES`: el id de la Fórmula, o `«id»#N` para una relacionada. */
  readonly clave: string;
  /** La misma expresión en texto plano: respaldo y etiqueta para el lector de pantalla. */
  readonly textoPlano: string;
  readonly altura: number;
}

/**
 * Un bloque de notación matemática.
 *
 * Dibuja el SVG que `npm run expresiones` generó a partir del LaTeX. El SVG está
 * pre-renderizado a propósito: la app no ejecuta MathJax, así que lo que se ve en el
 * teléfono es exactamente lo que se generó, y una lista de 29 Fórmulas no paga nada
 * por mostrar notación de verdad.
 *
 * **Las expresiones anchas se desplazan, no se achican.** La mediana del catálogo mide
 * 15,6 ex y entra holgada, pero 27 de las 138 pasan de 25 ex y once pasan de 40:
 * `U02-F01` medía 115,6 ex. Encogerla hasta que entrara en un teléfono la dejaría a un
 * cuarto de tamaño, ilegible, que es exactamente el problema que el SVG vino a
 * resolver. Así que la expresión conserva su tamaño y el marco se vuelve desplazable
 * en horizontal.
 *
 * Si el SVG no se generó, cae al texto plano. Degradar es deliberado: un hueco donde
 * va la fórmula sería peor que el texto que estamos reemplazando.
 */
function Dibujo({ testID, clave, textoPlano, altura }: DibujoProps) {
  // Cuánto ancho hay disponible. Sale de `onLayout`, así que en el primer cuadro vale
  // cero: ahí se dibuja sin desplazamiento, que es lo correcto para la mayoría.
  const [anchoDisponible, setAnchoDisponible] = useState(0);

  const renderizada = EXPRESIONES[clave];

  if (!renderizada) {
    return (
      <Text testID={testID} accessibilityLabel={textoPlano} style={estilos.textoPlano}>
        {textoPlano}
      </Text>
    );
  }

  // MathJax devuelve las medidas en `ex`. Se conserva la proporción y se escala a la
  // altura pedida, así una fracción ocupa el doble que una expresión de una línea sin
  // que nadie tenga que calcularlo.
  const escala = altura / renderizada.altoEx;
  const ancho = renderizada.anchoEx * escala;
  const alto = renderizada.altoEx * escala;

  const anchoUtil = anchoDisponible - (RELLENO + BORDE) * 2;
  // Sin medida todavía, se asume que entra: evita un parpadeo con barra de
  // desplazamiento en las expresiones cortas, que son la mayoría.
  const entra = anchoDisponible === 0 || ancho <= anchoUtil;

  const svg = (
    <SvgXml
      xml={renderizada.svg}
      width={ancho}
      height={alto}
      // El SVG usa `currentColor`: el color sale del tema, no está horneado.
      color={colores.texto}
    />
  );

  return (
    <View
      style={estilos.medidor}
      onLayout={(evento) => setAnchoDisponible(evento.nativeEvent.layout.width)}
    >
      <View
        testID={testID}
        accessible
        accessibilityLabel={textoPlano}
        style={[estilos.marco, entra ? estilos.marcoAjustado : estilos.marcoDesplazable]}
      >
        {entra ? (
          svg
        ) : (
          <ScrollView
            horizontal
            // La barra es la única señal de que ahí hay más fórmula para ver.
            showsHorizontalScrollIndicator
            contentContainerStyle={estilos.lienzo}
          >
            {svg}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

interface ExpresionProps {
  readonly formula: Formula;
  /**
   * Altura de la expresión, en píxeles, para una expresión de una línea. Las que
   * tienen fracción o integral crecen solas en proporción.
   */
  readonly altura?: number;
}

/** La expresión matemática principal de una Fórmula. */
export function Expresion({ formula, altura = 22 }: ExpresionProps) {
  return (
    <Dibujo
      testID={`expresion-${formula.id}`}
      clave={formula.id}
      textoPlano={formula.expresion}
      altura={altura}
    />
  );
}

/**
 * Las formas equivalentes y los casos particulares de una Fórmula, cada uno en su
 * bloque y con su rótulo.
 *
 * Van acá y no dentro de `condiciones` porque son fórmulas completas: una ecuación con
 * fracciones y exponentes no se lee en un renglón de texto corrido. Las igualdades
 * cortas que forman parte de una frase siguen en la prosa, que es donde se leen mejor.
 *
 * Se dibujan un punto más chicas que la principal: acompañan, no compiten con ella.
 */
export function ExpresionesRelacionadas({ formula, altura = 22 }: ExpresionProps) {
  const relacionadas = formula.expresionesRelacionadas ?? [];

  if (relacionadas.length === 0) {
    return null;
  }

  return (
    <View testID={`expresiones-relacionadas-${formula.id}`} style={estilos.relacionadas}>
      {relacionadas.map((relacionada, indice) => (
        <View key={relacionada.latex} style={estilos.relacionada}>
          <Text style={estilos.rotulo}>{relacionada.rotulo}</Text>
          <Dibujo
            testID={`expresion-${formula.id}#${indice}`}
            clave={`${formula.id}#${indice}`}
            textoPlano={relacionada.expresion}
            altura={altura}
          />
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  /** Ocupa todo el ancho disponible sin dibujar nada: existe sólo para medirlo. */
  medidor: {
    alignSelf: 'stretch',
  },
  marco: {
    backgroundColor: colores.superficie,
    borderRadius: radio.sm,
    borderWidth: BORDE,
    borderColor: colores.borde,
    paddingHorizontal: RELLENO,
    paddingVertical: 8,
  },
  /** La expresión entra: el marco ajusta a su ancho, como venía siendo. */
  marcoAjustado: {
    alignSelf: 'flex-start',
  },
  /** La expresión no entra: el marco toma todo el ancho y se desplaza adentro. */
  marcoDesplazable: {
    alignSelf: 'stretch',
    // Aire para que la barra de desplazamiento no se apoye sobre la fórmula.
    paddingBottom: 12,
  },
  lienzo: {
    alignItems: 'center',
  },
  relacionadas: {
    gap: espacio.sm,
  },
  relacionada: {
    gap: espacio.xs,
  },
  rotulo: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
  },
  textoPlano: {
    fontFamily: fuentes.nota,
    fontSize: 15,
    color: colores.texto,
    backgroundColor: colores.superficie,
    borderRadius: radio.sm,
    borderWidth: BORDE,
    borderColor: colores.borde,
    paddingHorizontal: RELLENO,
    paddingVertical: 8,
    overflow: 'hidden',
  },
});
