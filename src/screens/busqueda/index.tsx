import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Formula } from '@/dominio/formula';
import { FORMULAS } from '@/formulas';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

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
            placeholderTextColor={colores.textoTenue}
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
    backgroundColor: colores.fondo,
  },
  contenedorBuscador: {
    paddingHorizontal: espacio.lg,
    paddingTop: espacio.md,
    paddingBottom: espacio.sm,
    backgroundColor: colores.superficie,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  cajaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.fondo,
    borderRadius: radio.sm,
    paddingHorizontal: espacio.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  iconoBuscador: {
    ...tipografia.cuerpo,
    marginRight: espacio.sm,
  },
  input: {
    flex: 1,
    paddingVertical: espacio.sm,
    ...tipografia.cuerpo,
    color: colores.texto,
  },
  botonLimpiar: {
    padding: espacio.sm,
    borderRadius: radio.md,
    backgroundColor: colores.borde,
    marginLeft: espacio.sm,
  },
  textoBotonLimpiar: {
    ...tipografia.pie,
    fontFamily: fuentes.interfazFuerte,
    color: colores.texto,
  },
  contenido: {
    padding: espacio.lg,
    gap: espacio.md,
    paddingBottom: espacio.xxl,
  },
  conteoResultados: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
    marginBottom: espacio.xs,
  },
  tarjetaResultado: {
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    padding: espacio.lg,
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
  badgeUnidad: {
    backgroundColor: colores.superficieEnfasis,
    paddingHorizontal: espacio.sm,
    paddingVertical: espacio.xs,
    borderRadius: radio.sm,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  textoBadgeUnidad: {
    ...tipografia.etiqueta,
    color: colores.accion,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  identificadorFormula: {
    ...tipografia.etiqueta,
    opacity: 0.6,
    fontVariant: ['tabular-nums'],
  },
  nombreFormula: {
    ...tipografia.subtitulo,
    color: colores.texto,
  },
  expresionFormula: {
    ...tipografia.cuerpo,
    fontFamily: fuentes.nota,
    color: colores.texto,
    backgroundColor: colores.fondo,
    padding: espacio.sm,
    borderRadius: radio.sm,
    overflow: 'hidden',
  },
  pieTarjeta: {
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingTop: espacio.sm,
    marginTop: espacio.xs,
  },
  textoVariables: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.nota,
    color: colores.textoSuave,
  },
  tarjetaMensaje: {
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    padding: espacio.xl,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: 'center',
    gap: espacio.sm,
    marginTop: espacio.md,
  },
  tituloMensaje: {
    ...tipografia.subtitulo,
    color: colores.texto,
    textAlign: 'center',
  },
  textoMensaje: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
    textAlign: 'center',
  },
});
