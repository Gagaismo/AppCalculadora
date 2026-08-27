import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { formulasDeUnidad } from '@/formulas';

import { InfoUnidad, UNIDADES } from './datos';

export { InfoUnidad, UNIDADES, obtenerUnidad } from './datos';

export interface PantallaUnidadesProps {
  readonly onSeleccionarUnidad?: (numero: number) => void;
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
export function PantallaUnidades({ onSeleccionarUnidad }: PantallaUnidadesProps) {
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
    backgroundColor: '#F8FAFC',
  },
  contenido: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  encabezado: {
    marginBottom: 4,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtituloPrincipal: {
    fontSize: 14,
    color: '#64748B',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  tarjetaPresionada: {
    backgroundColor: '#F1F5F9',
  },
  tarjetaEncabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numeroUnidad: {
    fontSize: 13,
    fontWeight: '700',
    color: '#208AEF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  conteoFormulas: {
    fontSize: 13,
    fontWeight: '500',
    color: '#64748B',
    fontVariant: ['tabular-nums'],
  },
  temaUnidad: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
  },
  contenedorNota: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#64748B',
    marginTop: 4,
  },
  textoNota: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
});
