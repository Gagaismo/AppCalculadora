import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Formula } from '@/dominio/formula';
import { calcular, type Entradas } from '@/dominio/motor';
import { conMultiplo, MULTIPLOS, type Multiplo } from '@/dominio/multiplos';

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

  const entradas: Entradas = Object.fromEntries(
    formula.entradas.flatMap((variable) => {
      const valor = parsearNumero(textos[variable.simbolo]);
      if (valor === undefined) return [];
      return [[variable.simbolo, { valor, multiplo: multiplos[variable.simbolo] }]];
    }),
  );

  const resultado = calcular(formula.id, entradas);

  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.identificador}>{formula.id}</Text>
      <Text style={estilos.nombre}>{formula.nombre}</Text>
      <Text style={estilos.expresion}>{formula.expresion}</Text>

      {formula.entradas.map((variable) => (
        <View key={variable.simbolo} testID={`variable-${variable.simbolo}`} style={estilos.campo}>
          <Text style={estilos.simbolo}>{variable.simbolo}</Text>
          <Text style={estilos.significado}>{variable.significado}</Text>

          <TextInput
            testID={`entrada-${variable.simbolo}`}
            style={estilos.input}
            keyboardType="numeric"
            inputMode="decimal"
            placeholder="0"
            accessibilityLabel={`${variable.simbolo}, ${variable.significado}`}
            value={textos[variable.simbolo] ?? ''}
            onChangeText={(texto) =>
              setTextos((previos) => ({ ...previos, [variable.simbolo]: texto }))
            }
          />

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
      ))}

      <View testID="salida" style={estilos.salida}>
        <Text style={estilos.simbolo}>{formula.salida.simbolo}</Text>
        <Text style={estilos.significado}>{formula.salida.significado}</Text>
        <Text testID="resultado" style={estilos.resultado}>
          {resultado.ok
            ? `${formatearNumero(resultado.valor)} ${conMultiplo(resultado.multiplo, resultado.unidadDeMedida)}`
            : '—'}
        </Text>
      </View>
    </ScrollView>
  );
}

/** Acepta coma decimal: es como la cátedra escribe los números. */
export function parsearNumero(texto: string | undefined): number | undefined {
  if (texto === undefined) return undefined;
  const limpio = texto.trim().replace(',', '.');
  if (limpio === '') return undefined;
  const valor = Number(limpio);
  return Number.isFinite(valor) ? valor : undefined;
}

/** Muestra el número con coma decimal y sin la basura del punto flotante. */
export function formatearNumero(valor: number): string {
  return String(Number(valor.toPrecision(10))).replace('.', ',');
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
  salida: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#8886',
    paddingTop: 20,
  },
  resultado: { fontSize: 28, fontWeight: '700' },
});
