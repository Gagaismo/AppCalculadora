import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Formula } from '@/dominio/formula';
import { conMultiplo, type Multiplo } from '@/dominio/multiplos';
import { diagnosticar } from '@/guia/diagnostico';
import { fraseDelGuia } from '@/guia/frases';
import { ALTO_GUIA, Guia } from '@/guia/guia';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

import { FichaFormula } from './ficha';
import { Expresion, ExpresionesRelacionadas } from './expresion';
import { SelectorMultiplo } from './selector-multiplo';
import { formatearNumero } from './numeros';

/**
 * La pantalla genérica.
 *
 * Es una sola para las 140 Fórmulas: recibe la Fórmula como dato y arma la pantalla
 * a partir de sus Variables. Escribir una pantalla por Fórmula no termina nunca.
 */
/** Los campos de una Variable: uno solo si es escalar, N si es de lista. */
function camposIniciales(formula: Formula): Record<string, string[]> {
  return Object.fromEntries(formula.entradas.map((v) => [v.simbolo, ['']]));
}

export function PantallaFormula({ formula }: { formula: Formula }) {
  const esFicha = formula.entradas.length === 0;

  // Esta pantalla se apila sobre la barra de pestañas, así que nada le reserva el
  // alto de la barra de navegación del sistema: sin este relleno, el último Ejemplo
  // resuelto queda tapado por los botones de Atrás e Inicio y no se puede terminar
  // de leer por más que se desplace.
  const margenInferior = useSafeAreaInsets().bottom;

  // Toda Variable guarda un arreglo de textos. Una escalar simplemente tiene uno,
  // así el resto de la pantalla no necesita dos caminos para cada cosa.
  const [textos, setTextos] = useState<Record<string, string[]>>(() => camposIniciales(formula));
  const [multiplos, setMultiplos] = useState<Record<string, Multiplo>>(() =>
    Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
  );

  if (esFicha) {
    return (
      <ScrollView
        style={estilos.pantalla}
        contentContainerStyle={[estilos.contenido, { paddingBottom: espacio.xl + margenInferior }]}
      >
        <Text style={estilos.rotuloConsulta}>Ficha de consulta — sin cálculo</Text>
        <Text style={estilos.identificador}>{formula.id}</Text>
        <Text style={estilos.nombre}>{formula.nombre}</Text>
        <Expresion formula={formula} altura={26} />
        <ExpresionesRelacionadas formula={formula} />
        <FichaFormula formula={formula} />
      </ScrollView>
    );
  }

  // El diagnóstico es el mismo que lee el guía: la pantalla sólo lo dibuja.
  const diagnostico = diagnosticar(formula, textos, multiplos);
  const noNumericos = diagnostico.estado === 'no-numerica' ? diagnostico.simbolos : [];
  const mensajeResultado = diagnostico.mensaje;
  const valorCanonico = diagnostico.valorCanonico;
  const esExito = diagnostico.estado === 'exito';
  const esError = diagnostico.estado === 'no-numerica' || diagnostico.estado === 'desconocida';

  const limpiarCampos = () => {
    setTextos(camposIniciales(formula));
    setMultiplos(
      Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
    );
  };

  const escribir = (simbolo: string, indice: number, texto: string) =>
    setTextos((previos) => {
      const campos = [...(previos[simbolo] ?? [''])];
      campos[indice] = texto;
      return { ...previos, [simbolo]: campos };
    });

  const agregarCampo = (simbolo: string) =>
    setTextos((previos) => ({ ...previos, [simbolo]: [...(previos[simbolo] ?? []), ''] }));

  const quitarCampo = (simbolo: string, indice: number) =>
    setTextos((previos) => {
      const campos = (previos[simbolo] ?? ['']).filter((_, i) => i !== indice);
      return { ...previos, [simbolo]: campos.length > 0 ? campos : [''] };
    });

  // El relleno extra (`ALTO_GUIA`) deja llevar el último campo y el resultado por
  // encima del guía, que flota abajo a la derecha.
  const contenido = (
    <ScrollView
      style={estilos.pantalla}
      contentContainerStyle={[
        estilos.contenido,
        { paddingBottom: espacio.xl + margenInferior + ALTO_GUIA },
      ]}
    >
      <Text style={estilos.identificador}>{formula.id}</Text>
      <Text style={estilos.nombre}>{formula.nombre}</Text>
      <Expresion formula={formula} altura={26} />
      <ExpresionesRelacionadas formula={formula} />

      {formula.entradas.map((variable) => {
        const esInvalido = noNumericos.includes(variable.simbolo);
        return (
          <View key={variable.simbolo} testID={`variable-${variable.simbolo}`} style={estilos.campo}>
            <Text style={estilos.simbolo}>{variable.simbolo}</Text>
            <Text style={estilos.significado}>{variable.significado}</Text>

            {(textos[variable.simbolo] ?? ['']).map((texto, indice) => (
              <View key={indice} style={estilos.fila}>
                <TextInput
                  testID={
                    variable.esLista
                      ? `entrada-${variable.simbolo}-${indice}`
                      : `entrada-${variable.simbolo}`
                  }
                  style={[estilos.input, estilos.inputFlexible, esInvalido && estilos.inputError]}
                  keyboardType="numeric"
                  inputMode="decimal"
                  placeholder={variable.esLista ? `${variable.simbolo}${indice + 1}` : '0'}
                  placeholderTextColor={colores.textoTenue}
                  accessibilityLabel={
                    variable.esLista
                      ? `${variable.simbolo} ${indice + 1}, ${variable.significado}`
                      : `${variable.simbolo}, ${variable.significado}`
                  }
                  value={texto}
                  onChangeText={(nuevo) => escribir(variable.simbolo, indice, nuevo)}
                />

                {variable.esLista && (
                  <Pressable
                    testID={`quitar-${variable.simbolo}-${indice}`}
                    accessibilityRole="button"
                    accessibilityLabel={`Quitar el valor ${indice + 1} de ${variable.simbolo}`}
                    style={estilos.botonQuitar}
                    onPress={() => quitarCampo(variable.simbolo, indice)}
                  >
                    <Text style={estilos.botonQuitarTexto}>−</Text>
                  </Pressable>
                )}

                {/*
                  El múltiplo va pegado al campo, no debajo: cargar «2,4» y elegir
                  «GHz» es un solo gesto, y el error que la regla dura 6 quiere evitar
                  aparece justamente cuando las dos cosas se leen por separado.

                  En una Variable de lista el múltiplo es uno para todos los valores,
                  así que va una sola vez, después de los campos.
                */}
                {!variable.esLista && (
                  <SelectorMultiplo
                    simbolo={variable.simbolo}
                    unidadDeMedida={variable.unidadDeMedida}
                    elegido={multiplos[variable.simbolo]}
                    onElegir={(multiplo) =>
                      setMultiplos((previos) => ({ ...previos, [variable.simbolo]: multiplo }))
                    }
                  />
                )}
              </View>
            ))}

            {variable.esLista && (
              <SelectorMultiplo
                simbolo={variable.simbolo}
                unidadDeMedida={variable.unidadDeMedida}
                elegido={multiplos[variable.simbolo]}
                onElegir={(multiplo) =>
                  setMultiplos((previos) => ({ ...previos, [variable.simbolo]: multiplo }))
                }
              />
            )}

            {variable.esLista && (
              <Pressable
                testID={`agregar-${variable.simbolo}`}
                accessibilityRole="button"
                accessibilityLabel={`Agregar otro valor a ${variable.simbolo}`}
                style={estilos.botonAgregar}
                onPress={() => agregarCampo(variable.simbolo)}
              >
                <Text style={estilos.botonAgregarTexto}>+ Agregar valor</Text>
              </Pressable>
            )}

            {esInvalido && (
              <Text testID={`error-campo-${variable.simbolo}`} style={estilos.errorCampo}>
                Debe ser un número válido
              </Text>
            )}
          </View>
        );
      })}

      <Pressable
        testID="boton-limpiar"
        accessibilityRole="button"
        accessibilityLabel="Limpiar todos los campos"
        style={estilos.botonLimpiar}
        onPress={limpiarCampos}
      >
        <Text style={estilos.botonLimpiarTexto}>Limpiar campos</Text>
      </Pressable>

      <View testID="salida" style={estilos.salida}>
        <Text style={estilos.simboloSalida}>{formula.salida.simbolo}</Text>
        <Text style={estilos.significadoSalida}>{formula.salida.significado}</Text>
        <View
          style={[
            estilos.bloqueResultado,
            esExito && estilos.bloqueResultadoExito,
            esError && estilos.bloqueResultadoError,
          ]}
        >
          <Text
            testID="resultado"
            style={[
              estilos.resultado,
              esExito && estilos.resultadoExito,
              esError && estilos.resultadoError,
            ]}
          >
            {mensajeResultado}
          </Text>
          {esExito && valorCanonico !== null && (
            <Text style={estilos.resultadoCanonico}>
              {`= ${formatearNumero(valorCanonico)} ${conMultiplo(formula.salida.multiploCanonico, formula.salida.unidadDeMedida)}`}
            </Text>
          )}
        </View>
      </View>

      <FichaFormula formula={formula} />
    </ScrollView>
  );

  return (
    <View style={estilos.pantalla}>
      {contenido}
      <Guia {...fraseDelGuia(diagnostico, formula)} />
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: espacio.xl,
    gap: espacio.xl,
  },
  rotuloConsulta: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
  },
  identificador: {
    ...tipografia.etiqueta,
    color: colores.accion,
    fontVariant: ['tabular-nums'],
  },
  nombre: {
    ...tipografia.titulo,
    color: colores.texto,
  },
  campo: {
    gap: espacio.sm,
  },
  simbolo: {
    ...tipografia.cuerpo,
    fontFamily: fuentes.notaFuerte,
    color: colores.texto,
  },
  significado: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  input: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.sm,
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.sm,
    ...tipografia.cuerpo,
    fontFamily: fuentes.nota,
    color: colores.texto,
    backgroundColor: colores.superficie,
  },
  inputError: {
    borderColor: colores.error,
  },
  inputFlexible: {
    flex: 1,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
  },
  botonQuitar: {
    width: espacio.xl * 2,
    height: espacio.xl * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.sm,
    backgroundColor: colores.superficie,
  },
  botonQuitarTexto: {
    ...tipografia.subtitulo,
    color: colores.textoSuave,
  },
  botonAgregar: {
    alignSelf: 'flex-start',
    paddingHorizontal: espacio.md,
    paddingVertical: espacio.xs,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.pastilla,
    backgroundColor: colores.superficie,
  },
  botonAgregarTexto: {
    ...tipografia.etiqueta,
    color: colores.accion,
  },
  errorCampo: {
    ...tipografia.pie,
    color: colores.error,
  },
  botonLimpiar: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.sm,
    paddingHorizontal: espacio.lg,
    paddingVertical: espacio.sm,
    backgroundColor: colores.superficie,
  },
  botonLimpiarTexto: {
    ...tipografia.cuerpo,
    fontFamily: fuentes.interfazMedia,
    color: colores.accion,
  },
  salida: {
    gap: espacio.sm,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingTop: espacio.xl,
  },
  simboloSalida: {
    ...tipografia.cuerpo,
    fontFamily: fuentes.notaFuerte,
    color: colores.texto,
  },
  significadoSalida: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  bloqueResultado: {
    minHeight: 88,
    justifyContent: 'center',
    padding: espacio.lg,
    borderRadius: radio.md,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: espacio.xs,
  },
  bloqueResultadoExito: {
    backgroundColor: colores.exitoFondo,
    borderColor: colores.exito,
  },
  bloqueResultadoError: {
    backgroundColor: colores.errorFondo,
    borderColor: colores.error,
  },
  resultado: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  resultadoExito: {
    ...tipografia.resultado,
    color: colores.exito,
  },
  resultadoError: {
    ...tipografia.cuerpo,
    color: colores.error,
  },
  resultadoCanonico: {
    ...tipografia.pie,
    fontFamily: fuentes.nota,
    color: colores.textoSuave,
  },
});
