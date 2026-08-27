import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Formula } from '@/dominio/formula';
import { FORMULAS } from '@/formulas';

import { buscarFormulas } from './buscar';

export { buscarFormulas } from './buscar';
export { normalizarTexto } from './normalizar';

export interface PantallaBusquedaProps {
  readonly onSeleccionarFormula?: (id: string) => void;
  readonly catalogo?: readonly Formula[];
  readonly terminoInicial?: string;
}

/** Formatea el texto de cantidad de resultados encontrados (singular/plural). */
export function formatearCantidadResultados(cantidad: number): string {
  if (cantidad === 1) {
    return '1 fórmula encontrada';
  }
  return `${cantidad} fórmulas encontradas`;
}

/**
 * Pantalla para buscar Fórmulas por nombre o por símbolo de cualquier variable (entrada o salida).
 *
 * Muestra los resultados indicando claramente a qué Unidad pertenece cada una,
 * y permite navegar a la pantalla de cálculo genérica al seleccionar un resultado.
 */
export function PantallaBusqueda({
  onSeleccionarFormula,
  catalogo = FORMULAS,
  terminoInicial = '',
}: PantallaBusquedaProps) {
  const [termino, setTermino] = useState(terminoInicial);

  const resultados = buscarFormulas(termino, catalogo);
  const busquedaActiva = termino.trim().length > 0;

  const manejarSeleccion = (id: string) => {
    if (onSeleccionarFormula) {
      onSeleccionarFormula(id);
    } else {
      router.push({
        pathname: '/formula/[id]',
        params: { id },
      });
    }
  };

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.contenedorBuscador}>
        <View style={estilos.cajaInput}>
          <Text style={estilos.iconoBuscador}>🔍</Text>
          <TextInput
            testID="input-busqueda"
            style={estilos.input}
            placeholder="Buscar por nombre o símbolo (ej. AB, f_sup)..."
            placeholderTextColor="#94A3B8"
            value={termino}
            onChangeText={setTermino}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Buscar por nombre o símbolo"
            returnKeyType="search"
          />
          {termino.length > 0 && (
            <Pressable
              testID="boton-limpiar-busqueda"
              accessibilityRole="button"
              accessibilityLabel="Limpiar búsqueda"
              style={estilos.botonLimpiar}
              onPress={() => setTermino('')}
            >
              <Text style={estilos.textoBotonLimpiar}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        testID="lista-resultados-busqueda"
        style={estilos.pantalla}
        contentContainerStyle={estilos.contenido}
        keyboardShouldPersistTaps="handled"
      >
        {!busquedaActiva ? (
          <View testID="busqueda-estado-inicial" style={estilos.tarjetaMensaje}>
            <Text style={estilos.tituloMensaje}>Búsqueda de Fórmulas</Text>
            <Text style={estilos.textoMensaje}>
              Escribí el nombre de una fórmula (ej. «Ancho de banda») o el símbolo de una variable
              (ej. «AB», «f_sup») para encontrarla en cualquier Unidad.
            </Text>
          </View>
        ) : resultados.length === 0 ? (
          <View testID="busqueda-sin-resultados" style={estilos.tarjetaMensaje}>
            <Text style={estilos.tituloMensaje}>Sin resultados</Text>
            <Text style={estilos.textoMensaje}>
              {`No se encontraron fórmulas para «${termino}». Verificá el nombre o el símbolo ingresado.`}
            </Text>
          </View>
        ) : (
          <>
            <Text
              testID="busqueda-conteo-resultados"
              style={estilos.conteoResultados}
            >
              {formatearCantidadResultados(resultados.length)}
            </Text>

            {resultados.map((formula) => {
              const simbolosEntradas = formula.entradas.map((v) => v.simbolo).join(', ');
              const textoVariables = `Variables: ${simbolosEntradas} → ${formula.salida.simbolo}`;

              return (
                <Pressable
                  key={formula.id}
                  testID={`resultado-formula-${formula.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Unidad ${formula.unidad}, ${formula.id}: ${formula.nombre}`}
                  style={({ pressed }) => [
                    estilos.tarjetaResultado,
                    pressed && estilos.tarjetaPresionada,
                  ]}
                  onPress={() => manejarSeleccion(formula.id)}
                >
                  <View style={estilos.tarjetaEncabezado}>
                    <View
                      testID={`resultado-unidad-${formula.id}`}
                      style={estilos.badgeUnidad}
                    >
                      <Text style={estilos.textoBadgeUnidad}>{`Unidad ${formula.unidad}`}</Text>
                    </View>
                    <Text
                      testID={`resultado-id-${formula.id}`}
                      style={estilos.identificadorFormula}
                    >
                      {formula.id}
                    </Text>
                  </View>

                  <Text
                    testID={`resultado-nombre-${formula.id}`}
                    style={estilos.nombreFormula}
                  >
                    {formula.nombre}
                  </Text>

                  <Text
                    testID={`resultado-expresion-${formula.id}`}
                    style={estilos.expresionFormula}
                  >
                    {formula.expresion}
                  </Text>

                  <View style={estilos.pieTarjeta}>
                    <Text style={estilos.textoVariables}>{textoVariables}</Text>
                  </View>
                </Pressable>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contenedorBuscador: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  cajaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconoBuscador: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#0F172A',
  },
  botonLimpiar: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#CBD5E1',
    marginLeft: 6,
  },
  textoBotonLimpiar: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  contenido: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  conteoResultados: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  tarjetaResultado: {
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
  badgeUnidad: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  textoBadgeUnidad: {
    fontSize: 12,
    fontWeight: '700',
    color: '#208AEF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  pieTarjeta: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    marginTop: 2,
  },
  textoVariables: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#475569',
  },
  tarjetaMensaje: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  tituloMensaje: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  textoMensaje: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});
