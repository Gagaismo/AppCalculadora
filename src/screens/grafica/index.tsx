import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Formula, Variable } from '@/dominio/formula';
import { desdeCanonico } from '@/dominio/multiplos';
import { Deslizador } from '@/graficas/deslizador';
import { multiploAdmitido, unidadConMultiplo, type RangoInicial } from '@/graficas/escala';
import { Lienzo } from '@/graficas/lienzo';
import { variablesEjeX } from '@/graficas/muestreo';
import { useOrientacionHorizontal } from '@/graficas/orientacion';
import { leerCargados, textoDeslizador, useSesionFormula } from '@/graficas/sesion';
import type { Escala } from '@/graficas/tipos';
import {
  armarCurva,
  ejeXPorDefecto,
  marcoInicial,
  TarjetaPendientes,
} from '@/graficas/vista-previa';
import { diagnosticar } from '@/guia/diagnostico';
import { formatearNumero } from '@/screens/formula/numeros';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

/** El ancho del panel de control, como en la lámina B; nunca más de un 42 % de la pantalla. */
const ANCHO_PANEL = 276;
/** La fila de arriba del lienzo y la línea de lectura que el `Lienzo` pone sobre el dibujo. */
const ALTO_CABECERA = 44;
const ALTO_LECTURA = 22;

/**
 * La gráfica a pantalla completa, en horizontal (S6, láminas B y C).
 *
 * Arranca de lo cargado en la pantalla de la Fórmula y escribe ahí lo que se mueve
 * con los deslizadores: las dos leen la misma sesión. Cada Variable escalar tiene su
 * marco —rango y escala— centrado en su valor al abrir (D2); el de la Variable del
 * eje X es el rango de la gráfica. Los marcos quedan fijos mientras se arrastra, para
 * que la pista no se corra bajo el dedo, y se recalculan con «Encuadrar».
 *
 * El guía no aparece acá: el ancho es todo para la curva.
 */
export function PantallaGrafica({ formula }: { formula: Formula }) {
  useOrientacionHorizontal();
  const { width, height } = useWindowDimensions();
  const margen = useSafeAreaInsets();
  const { textos, multiplos, setTextos } = useSesionFormula(formula);
  const cargados = leerCargados(formula, { textos, multiplos });
  const ejes = variablesEjeX(formula);
  const multiploDe = (v: Variable) => multiplos[v.simbolo] ?? v.multiploCanonico;

  const [simboloX, setSimboloX] = useState(() => ejeXPorDefecto(formula, cargados).simbolo);
  const centrar = (escalas: Readonly<Record<string, Escala>> = {}) =>
    Object.fromEntries(
      ejes.map((v) => [v.simbolo, marcoInicial(v, cargados, multiploDe(v), escalas[v.simbolo])]),
    );
  const [marcos, setMarcos] = useState<Record<string, RangoInicial>>(() => centrar());

  const variableX = ejes.find((v) => v.simbolo === simboloX)!;
  const multiploX = multiploDe(variableX);
  const marcoX = marcos[simboloX];
  const curva = armarCurva(formula, cargados, simboloX, marcoX);
  const diagnostico = diagnosticar(formula, textos, multiplos);

  const elegirEscala = (escala: Escala) =>
    setMarcos((previos) => ({
      ...previos,
      [simboloX]: marcoInicial(variableX, cargados, multiploX, escala),
    }));
  const encuadrar = () =>
    setMarcos((previos) =>
      centrar(Object.fromEntries(Object.entries(previos).map(([s, m]) => [s, m.escala]))),
    );
  const mover = (v: Variable, valorCanonico: number) =>
    setTextos((previos) => ({
      ...previos,
      [v.simbolo]: [textoDeslizador(desdeCanonico(valorCanonico, multiploDe(v)))],
    }));

  const anchoPanel = Math.min(ANCHO_PANEL, width * 0.42);
  const anchoLienzo = Math.max(
    160,
    width - anchoPanel - margen.left - margen.right - 2 * espacio.sm,
  );
  const altoLienzo = Math.max(
    120,
    height - margen.top - margen.bottom - ALTO_CABECERA - ALTO_LECTURA - 2 * espacio.sm,
  );

  return (
    <View
      style={[
        estilos.pantalla,
        { paddingTop: margen.top, paddingBottom: margen.bottom, paddingLeft: margen.left, paddingRight: margen.right },
      ]}
    >
      <View style={estilos.lienzo}>
        <View style={estilos.cabecera}>
          <Pressable
            testID="salir-grafica"
            accessibilityRole="button"
            accessibilityLabel="Salir de la pantalla completa"
            style={estilos.botonSalir}
            onPress={() => router.back()}
          >
            <Text style={estilos.botonSalirTexto}>←</Text>
          </Pressable>
          <Text style={estilos.expresion} numberOfLines={1}>
            {formula.expresion}
          </Text>
        </View>
        {curva ? (
          <Lienzo
            {...curva}
            escala={marcoX.escala}
            variableX={variableX}
            multiploX={multiploX}
            salida={formula.salida}
            ancho={anchoLienzo}
            alto={altoLienzo}
          />
        ) : (
          <TarjetaPendientes formula={formula} cargados={cargados} simboloX={simboloX} />
        )}
      </View>

      <ScrollView
        style={[estilos.panel, { width: anchoPanel }]}
        contentContainerStyle={estilos.panelContenido}
        accessibilityLabel="Controles"
      >
        <View style={estilos.encabezado}>
          <Text style={estilos.identificador}>{formula.id}</Text>
          <Pressable
            testID="encuadrar"
            accessibilityRole="button"
            accessibilityLabel="Encuadrar el eje X en el valor actual"
            style={estilos.boton}
            onPress={encuadrar}
          >
            <Text style={estilos.botonTexto}>Encuadrar</Text>
          </Pressable>
        </View>

        <View style={estilos.fila}>
          <Text style={estilos.rotulo}>Eje X</Text>
          {ejes.map((v) => {
            const esX = v.simbolo === simboloX;
            return (
              <Pressable
                key={v.simbolo}
                testID={`eje-${v.simbolo}`}
                accessibilityRole="button"
                accessibilityLabel={`Eje X: ${v.simbolo}, ${v.significado}`}
                accessibilityState={{ selected: esX }}
                style={[estilos.chip, esX && estilos.elegido]}
                onPress={() => setSimboloX(v.simbolo)}
              >
                <Text style={estilos.chipTexto}>{esX ? `✓ ${v.simbolo}` : v.simbolo}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={estilos.segmentado} accessibilityLabel="Escala del eje X">
          {(['lineal', 'log'] as const).map((escala) => {
            const activa = marcoX.escala === escala;
            return (
              <Pressable
                key={escala}
                testID={`escala-${escala}`}
                accessibilityRole="button"
                accessibilityState={{ selected: activa }}
                style={[estilos.segmento, activa && estilos.elegido]}
                onPress={() => elegirEscala(escala)}
              >
                <Text style={estilos.segmentoTexto}>{escala === 'lineal' ? 'Lineal' : 'Log'}</Text>
              </Pressable>
            );
          })}
        </View>
        {marcoX.aviso && (
          <Text testID="aviso-escala" style={estilos.aviso}>
            {marcoX.aviso}
          </Text>
        )}

        {ejes.map((v) => {
          const valor = cargados.valores[v.simbolo];
          const marco = marcos[v.simbolo];
          const multiplo = multiploDe(v);
          if (valor === undefined) {
            return (
              <View key={v.simbolo} testID={`deslizador-${v.simbolo}`} style={estilos.sinValor}>
                <Text style={estilos.simbolo}>{v.simbolo}</Text>
                <Text style={estilos.sinValorTexto}>
                  {cargados.invalidos.includes(v.simbolo) ? 'no válido' : 'sin cargar'}
                </Text>
              </View>
            );
          }
          // Número y rótulo con el mismo múltiplo: el base si la Unidad de medida no
          // admite prefijos SI (S7).
          const unidad = unidadConMultiplo(v.unidadDeMedida, multiplo);
          const numero = formatearNumero(desdeCanonico(valor, multiploAdmitido(v.unidadDeMedida, multiplo)));
          return (
            <Deslizador
              key={v.simbolo}
              testID={`deslizador-${v.simbolo}`}
              etiqueta={v.simbolo}
              valor={valor}
              minimo={marco.rango.min}
              maximo={marco.rango.max}
              escala={marco.escala}
              textoValor={unidad ? `${numero} ${unidad}` : numero}
              onCambiar={(nuevo) => mover(v, nuevo)}
            />
          );
        })}

        <View style={estilos.franja}>
          <Text style={estilos.rotulo}>{diagnostico.estado === 'exito' ? 'Resultado' : 'Sin resultado'}</Text>
          <Text testID="grafica-resultado" style={estilos.resultado}>
            {diagnostico.mensaje}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, flexDirection: 'row', backgroundColor: colores.fondo },
  lienzo: { flex: 1, minWidth: 0, padding: espacio.sm },
  cabecera: { flexDirection: 'row', alignItems: 'center', gap: espacio.sm, minHeight: ALTO_CABECERA },
  botonSalir: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  botonSalirTexto: { ...tipografia.subtitulo, color: colores.accion },
  expresion: { ...tipografia.etiqueta, fontFamily: fuentes.nota, color: colores.texto, flex: 1 },
  panel: {
    flexGrow: 0,
    backgroundColor: colores.superficie,
    borderLeftWidth: 1,
    borderLeftColor: colores.borde,
  },
  panelContenido: { padding: espacio.md, gap: espacio.sm },
  encabezado: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  identificador: { ...tipografia.pie, fontFamily: fuentes.notaFuerte, color: colores.accion },
  boton: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: espacio.sm,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.pastilla,
    backgroundColor: colores.superficie,
  },
  botonTexto: { ...tipografia.etiqueta, color: colores.accion },
  fila: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: espacio.xs },
  rotulo: { ...tipografia.pie, fontFamily: fuentes.interfazFuerte, color: colores.texto },
  chip: {
    minHeight: 36,
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: espacio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.pastilla,
    backgroundColor: colores.superficie,
  },
  chipTexto: { ...tipografia.etiqueta, fontFamily: fuentes.notaFuerte, color: colores.texto },
  elegido: { backgroundColor: colores.superficieEnfasis, borderColor: colores.texto },
  segmentado: {
    flexDirection: 'row',
    padding: 2,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.pastilla,
  },
  segmento: {
    flex: 1,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: radio.pastilla,
  },
  segmentoTexto: { ...tipografia.etiqueta, color: colores.texto },
  aviso: { ...tipografia.pie, color: colores.aviso },
  sinValor: { flexDirection: 'row', alignItems: 'center', gap: espacio.sm, minHeight: 44 },
  simbolo: { ...tipografia.etiqueta, fontFamily: fuentes.notaFuerte, color: colores.texto, minWidth: 32 },
  sinValorTexto: { ...tipografia.pie, color: colores.textoSuave },
  franja: {
    gap: espacio.xs,
    padding: espacio.sm,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.md,
    backgroundColor: colores.superficie,
  },
  resultado: { ...tipografia.etiqueta, fontFamily: fuentes.notaFuerte, color: colores.texto },
});
