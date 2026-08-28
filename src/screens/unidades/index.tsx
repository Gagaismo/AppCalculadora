import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { formulasDeUnidad } from '@/formulas';
import { colores, espacio, radio, tipografia } from '@/tema';

import { InfoUnidad, UNIDADES } from './datos';

export { InfoUnidad, UNIDADES, obtenerUnidad } from './datos';

export interface PantallaUnidadesProps {
  readonly onSeleccionarUnidad?: (numero: number) => void;
  readonly onBuscar?: () => void;
}

/** Formatea el texto de cantidad de fórmulas según corresponda (singular/plural). */
export function formatearCantidadFormulas(cantidad: number): string {
  if (cantidad === 1) {
    return '1 fórmula';
  }
  return `${cantidad} fórmulas`;
}

/**
 * Pantalla que lista las diez Unidades de la materia Comunicaciones.
 *
 * Muestra el número de Unidad, el tema y la cantidad de Fórmulas disponibles.
 * Para la Unidad 1, muestra explícitamente la nota explicativa de por qué tiene 0 fórmulas.
 */
export function PantallaUnidades({ onSeleccionarUnidad, onBuscar }: PantallaUnidadesProps) {
  const manejarSeleccion = (numero: number) => {
    if (onSeleccionarUnidad) {
      onSeleccionarUnidad(numero);
    } else {
      router.push({
        pathname: '/unidad/[numero]',
        params: { numero: String(numero) },
      });
    }
  };

  const manejarBusqueda = () => {
    if (onBuscar) {
      onBuscar();
    } else {
      router.push('/buscar');
    }
  };

  return (
    <ScrollView
      testID="lista-unidades"
      style={estilos.pantalla}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.encabezado}>
        <Text style={estilos.tituloPrincipal}>Unidades de la materia</Text>
        <Text style={estilos.subtituloPrincipal}>
          Seleccioná una Unidad para ver y calcular sus fórmulas
        </Text>
      </View>

      <Pressable
        testID="boton-buscar-inicio"
        accessibilityRole="button"
        accessibilityLabel="Buscar fórmulas por nombre o símbolo"
        style={({ pressed }) => [estilos.barraBusqueda, pressed && estilos.barraBusquedaPresionada]}
        onPress={manejarBusqueda}
      >
        <Text style={estilos.iconoBusqueda}>🔍</Text>
        <Text style={estilos.textoBarraBusqueda}>
          Buscar por nombre o símbolo (ej. AB, f_sup)...
        </Text>
      </Pressable>

      {UNIDADES.map((unidad) => {
        const cantidad = formulasDeUnidad(unidad.numero).length;
        const textoCantidad = formatearCantidadFormulas(cantidad);

        return (
          <Pressable
            key={unidad.numero}
            testID={`unidad-item-${unidad.numero}`}
            accessibilityRole="button"
            accessibilityLabel={`Unidad ${unidad.numero}: ${unidad.tema}, ${textoCantidad}`}
            style={({ pressed }) => [estilos.tarjeta, pressed && estilos.tarjetaPresionada]}
            onPress={() => manejarSeleccion(unidad.numero)}
          >
            <View style={estilos.tarjetaEncabezado}>
              <Text style={estilos.numeroUnidad}>{`Unidad ${unidad.numero}`}</Text>
              <Text testID={`unidad-conteo-${unidad.numero}`} style={estilos.conteoFormulas}>
                {textoCantidad}
              </Text>
            </View>

            <Text style={estilos.temaUnidad}>{unidad.tema}</Text>

            {unidad.nota ? (
              <View testID={`unidad-nota-${unidad.numero}`} style={estilos.contenedorNota}>
                <Text style={estilos.textoNota}>{unidad.nota}</Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
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
  tituloPrincipal: {
    ...tipografia.titulo,
    color: colores.texto,
  },
  subtituloPrincipal: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  barraBusqueda: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: espacio.sm,
    marginBottom: espacio.xs,
  },
  barraBusquedaPresionada: {
    backgroundColor: colores.superficieEnfasis,
  },
  iconoBusqueda: {
    fontSize: tipografia.cuerpo.fontSize,
  },
  textoBarraBusqueda: {
    ...tipografia.cuerpo,
    color: colores.textoTenue,
  },
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    padding: espacio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: espacio.xs,
  },
  tarjetaPresionada: {
    backgroundColor: colores.superficieEnfasis,
  },
  tarjetaEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numeroUnidad: {
    ...tipografia.etiqueta,
    color: colores.accion,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  conteoFormulas: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
    fontVariant: ['tabular-nums'],
  },
  temaUnidad: {
    ...tipografia.subtitulo,
    color: colores.texto,
  },
  contenedorNota: {
    backgroundColor: colores.fondo,
    borderRadius: radio.sm,
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.sm,
    borderLeftWidth: 3,
    borderLeftColor: colores.textoSuave,
    marginTop: espacio.xs,
  },
  textoNota: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
  },
});
