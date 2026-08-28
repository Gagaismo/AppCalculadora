import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { formulasDeUnidad } from '@/formulas';
import { Expresion } from '@/screens/formula/expresion';
import { formatearCantidadFormulas, obtenerUnidad } from '@/screens/unidades';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

export { obtenerUnidad } from '@/screens/unidades';

export interface PantallaUnidadProps {
  readonly numero: number;
  readonly onSeleccionarFormula?: (id: string) => void;
}

/**
 * Pantalla que muestra las Fórmulas de una Unidad específica.
 *
 * Muestra el número, tema y la lista de Fórmulas con su nombre y expresión matemática.
 * Las fórmulas que son ficha de consulta (sin entradas calculables) se identifican con
 * un distintivo sobrio para indicar que no son interactivas como una calculadora.
 * Si la Unidad no tiene fórmulas (como Unidad 1), muestra una nota o mensaje explicativo.
 */
export function PantallaUnidad({ numero, onSeleccionarFormula }: PantallaUnidadProps) {
  const info = obtenerUnidad(numero);
  const formulas = formulasDeUnidad(numero);

  const manejarSeleccionFormula = (id: string) => {
    if (onSeleccionarFormula) {
      onSeleccionarFormula(id);
    } else {
      router.push({
        pathname: '/formula/[id]',
        params: { id },
      });
    }
  };

  const tema = info?.tema ?? `Unidad ${numero}`;
  const textoCantidad = formatearCantidadFormulas(formulas.length);

  // Esta pantalla se apila sobre la barra de pestañas, así que nada le reserva el alto
  // de la barra de navegación del sistema: sin este relleno, la última tarjeta queda
  // tapada por los botones de Atrás e Inicio.
  const margenInferior = useSafeAreaInsets().bottom;

  return (
    <ScrollView
      testID="lista-formulas"
      style={estilos.pantalla}
      contentContainerStyle={[
        estilos.contenido,
        { paddingBottom: espacio.xxl + margenInferior },
      ]}
    >
      <View style={estilos.encabezado}>
        <Text style={estilos.identificadorUnidad}>{`Unidad ${numero}`}</Text>
        <Text style={estilos.tituloTema}>{tema}</Text>
        <Text style={estilos.subtituloConteo}>{textoCantidad}</Text>
      </View>

      {formulas.length > 0 ? (
        formulas.map((formula) => {
          const esConsulta = formula.entradas.length === 0;

          return (
            <Pressable
              key={formula.id}
              testID={`formula-item-${formula.id}`}
              accessibilityRole="button"
              accessibilityLabel={`${formula.id}: ${formula.nombre}, ${formula.expresion}`}
              style={({ pressed }) => [estilos.tarjetaFormula, pressed && estilos.tarjetaPresionada]}
              onPress={() => manejarSeleccionFormula(formula.id)}
            >
              <View style={estilos.tarjetaEncabezado}>
                <Text style={estilos.identificadorFormula}>{formula.id}</Text>
                {esConsulta && (
                  <View style={estilos.distintivoConsulta}>
                    <Text style={estilos.textoDistintivoConsulta}>Consulta</Text>
                  </View>
                )}
              </View>
              <Text testID={`formula-nombre-${formula.id}`} style={estilos.nombreFormula}>
                {formula.nombre}
              </Text>
              <Expresion formula={formula} altura={20} />
            </Pressable>
          );
        })
      ) : (
        <View testID="unidad-vacia" style={estilos.contenedorVacio}>
          <Text style={estilos.textoVacioTitulo}>Sin fórmulas disponibles</Text>
          <Text style={estilos.textoVacioDetalle}>
            {info?.nota ?? 'No hay fórmulas cargadas todavía para esta Unidad.'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: espacio.lg,
    gap: espacio.md,
    paddingBottom: espacio.xxl,
  },
  encabezado: {
    marginBottom: espacio.xs,
    gap: espacio.xs,
  },
  identificadorUnidad: {
    ...tipografia.etiqueta,
    color: colores.accion,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tituloTema: {
    ...tipografia.titulo,
    color: colores.texto,
  },
  subtituloConteo: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  tarjetaFormula: {
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    padding: espacio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: espacio.sm,
  },
  tarjetaPresionada: {
    backgroundColor: colores.superficieEnfasis,
  },
  tarjetaEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  identificadorFormula: {
    fontFamily: fuentes.nota,
    fontSize: tipografia.etiqueta.fontSize,
    lineHeight: tipografia.etiqueta.lineHeight,
    color: colores.textoSuave,
    fontVariant: ['tabular-nums'],
  },
  distintivoConsulta: {
    backgroundColor: colores.fondo,
    borderRadius: radio.pastilla,
    borderWidth: 1,
    borderColor: colores.borde,
    paddingHorizontal: espacio.sm,
    paddingVertical: espacio.xs,
  },
  textoDistintivoConsulta: {
    ...tipografia.pie,
    color: colores.textoSuave,
  },
  nombreFormula: {
    ...tipografia.subtitulo,
    color: colores.texto,
  },
  contenedorVacio: {
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    padding: espacio.xl,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: 'center',
    gap: espacio.sm,
    marginTop: espacio.sm,
  },
  textoVacioTitulo: {
    ...tipografia.subtitulo,
    color: colores.texto,
    textAlign: 'center',
  },
  textoVacioDetalle: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
    textAlign: 'center',
  },
});
