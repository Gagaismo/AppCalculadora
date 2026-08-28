import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { EntradaCargada, Formula } from '@/dominio/formula';
import { calcular } from '@/dominio/motor';
import { conMultiplo, type Multiplo } from '@/dominio/multiplos';

import { FichaFormula } from './ficha';
import { SelectorMultiplo } from './selector-multiplo';
import { formatearNumero, parsearEntrada } from './numeros';

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
  // Toda Variable guarda un arreglo de textos. Una escalar simplemente tiene uno,
  // así el resto de la pantalla no necesita dos caminos para cada cosa.
  const [textos, setTextos] = useState<Record<string, string[]>>(() => camposIniciales(formula));
  const [multiplos, setMultiplos] = useState<Record<string, Multiplo>>(() =>
    Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
  );

  const noNumericos: string[] = [];
  const entradas: Record<string, EntradaCargada> = {};

  for (const variable of formula.entradas) {
    const crudos = textos[variable.simbolo] ?? [''];
    const parseadas = crudos.map(parsearEntrada);

    if (parseadas.some((e) => e.estado === 'invalida')) {
      noNumericos.push(variable.simbolo);
      continue;
    }

    const cargados = parseadas.flatMap((e) => (e.estado === 'cargada' ? [e.valor] : []));
    const multiplo = multiplos[variable.simbolo];

    if (variable.esLista) {
      // Una lista vacía la resuelve el motor como Variable faltante, que es lo
      // correcto: sumar sobre nada daría cero, un resultado plausible y equivocado.
      entradas[variable.simbolo] = { valores: cargados, multiplo };
    } else if (cargados.length > 0) {
      entradas[variable.simbolo] = { valor: cargados[0], multiplo };
    }
  }

  let mensajeResultado: string;
  let esExito = false;

  if (noNumericos.length > 0) {
    mensajeResultado =
      noNumericos.length === 1
        ? `Entrada no numérica en ${noNumericos[0]}`
        : `Entrada no numérica en: ${noNumericos.join(', ')}`;
  } else {
    const resultado = calcular(formula.id, entradas);
    if (resultado.ok) {
      esExito = true;
      mensajeResultado = `${formatearNumero(resultado.valor)} ${conMultiplo(resultado.multiplo, resultado.unidadDeMedida)}`;
    } else {
      switch (resultado.error.tipo) {
        case 'variables-faltantes':
          mensajeResultado =
            resultado.error.simbolos.length === 1
              ? `Falta: ${resultado.error.simbolos[0]}`
              : `Faltan: ${resultado.error.simbolos.join(', ')}`;
          break;
        case 'calculo-no-definido':
          mensajeResultado = resultado.error.motivo;
          break;
        case 'formula-desconocida':
          mensajeResultado = `Fórmula desconocida: ${resultado.error.id}`;
          break;
      }
    }
  }

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

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.identificador}>{formula.id}</Text>
      <Text style={estilos.nombre}>{formula.nombre}</Text>
      <Text style={estilos.expresion}>{formula.expresion}</Text>

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
              </View>
            ))}

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

            <SelectorMultiplo
              simbolo={variable.simbolo}
              unidadDeMedida={variable.unidadDeMedida}
              elegido={multiplos[variable.simbolo]}
              onElegir={(multiplo) =>
                setMultiplos((previos) => ({ ...previos, [variable.simbolo]: multiplo }))
              }
            />
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
        <Text style={estilos.simbolo}>{formula.salida.simbolo}</Text>
        <Text style={estilos.significado}>{formula.salida.significado}</Text>
        <Text
          testID="resultado"
          style={[estilos.resultado, !esExito && estilos.resultadoIncompleto]}
        >
          {mensajeResultado}
        </Text>
      </View>

      <FichaFormula formula={formula} />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1 },
  contenido: { padding: 20, gap: 20 },
  identificador: { fontSize: 13, opacity: 0.6, fontVariant: ['tabular-nums'] },
  nombre: { fontSize: 22, fontWeight: '600' },
  expresion: { fontSize: 18, fontFamily: 'monospace' },
  campo: { gap: 6 },
  simbolo: { fontSize: 16, fontWeight: '700', fontFamily: 'monospace' },
  significado: { fontSize: 14, opacity: 0.75 },
  input: {
    borderWidth: 1,
    borderColor: '#8888',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  inputFlexible: { flex: 1 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  botonQuitar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8886',
    borderRadius: 8,
  },
  botonQuitarTexto: { fontSize: 20, fontWeight: '600', opacity: 0.7 },
  botonAgregar: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#8886',
    borderRadius: 999,
  },
  botonAgregarTexto: { fontSize: 13, fontWeight: '600' },
  errorCampo: {
    fontSize: 12,
    color: '#D32F2F',
  },
  multiplos: { gap: 6, paddingVertical: 2 },
  multiplo: {
    borderWidth: 1,
    borderColor: '#8886',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  multiploElegido: { backgroundColor: '#208AEF', borderColor: '#208AEF' },
  multiploTexto: { fontSize: 13 },
  multiploTextoElegido: { color: 'white', fontWeight: '600' },
  botonLimpiar: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#8888',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  botonLimpiarTexto: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.85,
  },
  salida: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#8886',
    paddingTop: 20,
  },
  resultado: { fontSize: 28, fontWeight: '700' },
  resultadoIncompleto: { fontSize: 18, fontWeight: '400', opacity: 0.75 },
});
