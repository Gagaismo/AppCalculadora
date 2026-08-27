import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Formula } from '@/dominio/formula';
import { calcular, type Entradas } from '@/dominio/motor';
import { conMultiplo, MULTIPLOS, type Multiplo } from '@/dominio/multiplos';

import { FichaFormula } from './ficha';
import { formatearNumero, parsearEntrada } from './numeros';

/**
 * La pantalla genérica.
 *
 * Es una sola para las 140 Fórmulas: recibe la Fórmula como dato y arma la pantalla
 * a partir de sus Variables. Escribir una pantalla por Fórmula no termina nunca.
 */
export function PantallaFormula({ formula }: { formula: Formula }) {
  const [textos, setTextos] = useState<Record<string, string>>({});
  const [multiplos, setMultiplos] = useState<Record<string, Multiplo>>(() =>
    Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
  );

  const noNumericos: string[] = [];
  const entradas: Record<string, { valor: number; multiplo: Multiplo }> = {};

  for (const variable of formula.entradas) {
    const entrada = parsearEntrada(textos[variable.simbolo]);
    if (entrada.estado === 'invalida') {
      noNumericos.push(variable.simbolo);
    } else if (entrada.estado === 'cargada') {
      entradas[variable.simbolo] = {
        valor: entrada.valor,
        multiplo: multiplos[variable.simbolo],
      };
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
    setTextos({});
    setMultiplos(
      Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
    );
  };

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

            <TextInput
              testID={`entrada-${variable.simbolo}`}
              style={[estilos.input, esInvalido && estilos.inputError]}
              keyboardType="numeric"
              inputMode="decimal"
              placeholder="0"
              accessibilityLabel={`${variable.simbolo}, ${variable.significado}`}
              value={textos[variable.simbolo] ?? ''}
              onChangeText={(texto) =>
                setTextos((previos) => ({ ...previos, [variable.simbolo]: texto }))
              }
            />

            {esInvalido && (
              <Text testID={`error-campo-${variable.simbolo}`} style={estilos.errorCampo}>
                Debe ser un número válido
              </Text>
            )}

            <ScrollView
              horizontal
              testID={`multiplos-${variable.simbolo}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={estilos.multiplos}
            >
              {MULTIPLOS.map((multiplo) => {
                const elegido = multiplos[variable.simbolo] === multiplo;
                return (
                  <Pressable
                    key={multiplo}
                    testID={`multiplo-${variable.simbolo}-${multiplo || 'base'}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: elegido }}
                    style={[estilos.multiplo, elegido && estilos.multiploElegido]}
                    onPress={() =>
                      setMultiplos((previos) => ({ ...previos, [variable.simbolo]: multiplo }))
                    }
                  >
                    <Text style={[estilos.multiploTexto, elegido && estilos.multiploTextoElegido]}>
                      {conMultiplo(multiplo, variable.unidadDeMedida)}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
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
