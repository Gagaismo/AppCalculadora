import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { formulasDeUnidad } from '@/formulas';
import { formatearCantidadFormulas, obtenerUnidad } from '@/screens/unidades';

export { obtenerUnidad } from '@/screens/unidades';

export interface PantallaUnidadProps {
  readonly numero: number;
  readonly onSeleccionarFormula?: (id: string) => void;
}

/**
 * Pantalla que muestra las Fórmulas de una Unidad específica.
 *
 * Muestra el número, tema y la lista de Fórmulas con su nombre y expresión matemática.
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

  return (
    <ScrollView
      testID="lista-formulas"
      style={estilos.pantalla}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.encabezado}>
        <Text style={estilos.identificadorUnidad}>{`Unidad ${numero}`}</Text>
        <Text style={estilos.tituloTema}>{tema}</Text>
        <Text style={estilos.subtituloConteo}>{textoCantidad}</Text>
      </View>

      {formulas.length > 0 ? (
        formulas.map((formula) => (
          <Pressable
            key={formula.id}
            testID={`formula-item-${formula.id}`}
            accessibilityRole="button"
            accessibilityLabel={`${formula.id}: ${formula.nombre}, ${formula.expresion}`}
            style={({ pressed }) => [estilos.tarjetaFormula, pressed && estilos.tarjetaPresionada]}
            onPress={() => manejarSeleccionFormula(formula.id)}
          >
            <Text style={estilos.identificadorFormula}>{formula.id}</Text>
            <Text testID={`formula-nombre-${formula.id}`} style={estilos.nombreFormula}>
              {formula.nombre}
            </Text>
            <Text testID={`formula-expresion-${formula.id}`} style={estilos.expresionFormula}>
              {formula.expresion}
            </Text>
          </Pressable>
        ))
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
    backgroundColor: '#F8FAFC',
  },
  contenido: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  encabezado: {
    marginBottom: 4,
    gap: 4,
  },
  identificadorUnidad: {
    fontSize: 13,
    fontWeight: '700',
    color: '#208AEF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tituloTema: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 28,
  },
  subtituloConteo: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  tarjetaFormula: {
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
  identificadorFormula: {
    fontSize: 13,
    opacity: 0.6,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  nombreFormula: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
  },
  expresionFormula: {
    fontSize: 15,
    fontFamily: 'monospace',
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  contenedorVacio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  textoVacioTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  textoVacioDetalle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});
