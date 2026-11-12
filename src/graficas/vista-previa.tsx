import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import type { Formula, Variable } from '@/dominio/formula';
import { FACTOR, type Multiplo } from '@/dominio/multiplos';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

import { escalaInicial, rangoInicial, rangoY, type RangoInicial } from './escala';
import { Lienzo } from './lienzo';
import { evaluar, muestrear, variablesEjeX } from './muestreo';
import { leerCargados, type Cargados, type Sesion } from './sesion';
import type { Escala, Rango, Segmento } from './tipos';

/**
 * La vista previa de la gráfica en la pantalla vertical (S6, lámina A), y las piezas
 * que comparte con la pantalla horizontal: qué Variable va en X, el rango de partida y
 * la curva armada a partir de lo cargado.
 */

/** El alto del dibujo de la vista previa: chico, para no empujar el resultado fuera. */
const ALTO_PREVIA = 140;

/** La primera Variable escalar con un valor cargado; si no hay ninguna, la primera. */
export function ejeXPorDefecto(formula: Formula, cargados: Cargados): Variable {
  const ejes = variablesEjeX(formula);
  return ejes.find((v) => v.simbolo in cargados.valores) ?? ejes[0];
}

/**
 * El rango de partida de una Variable, centrado en su valor (D2). Sin valor, se
 * centra en 1 del múltiplo de su campo: el eje X puede quedar vacío.
 */
export function marcoInicial(
  variable: Variable,
  cargados: Cargados,
  multiplo: Multiplo,
  escala: Escala = escalaInicial(variable),
): RangoInicial {
  return rangoInicial(cargados.valores[variable.simbolo] ?? FACTOR[multiplo], escala, multiplo);
}

export interface Curva {
  readonly segmentos: Segmento[];
  readonly rangos: { readonly x: Rango; readonly y: Rango | null };
  readonly puntoActual: { readonly x: number; readonly y: number | null } | null;
  readonly leer: (x: number) => number | null;
}

/** Las Variables que impiden dibujar: todas las faltantes o inválidas salvo la del eje X. */
export function pendientes(cargados: Cargados, simboloX: string) {
  return {
    faltan: cargados.faltan.filter((s) => s !== simboloX),
    invalidos: cargados.invalidos.filter((s) => s !== simboloX),
  };
}

/** La curva con la `calcular()` de la Fórmula, o `null` si falta cargar otra Variable. */
export function armarCurva(
  formula: Formula,
  cargados: Cargados,
  simboloX: string,
  marco: { readonly rango: Rango; readonly escala: Escala },
): Curva | null {
  const { faltan, invalidos } = pendientes(cargados, simboloX);
  if (faltan.length > 0 || invalidos.length > 0) return null;
  const { valores, listas } = cargados;
  const x = valores[simboloX];
  const segmentos = muestrear({
    formula,
    valoresCanonicos: valores,
    listasCanonicas: listas,
    variableX: simboloX,
    rango: marco.rango,
    escala: marco.escala,
    incluir: x === undefined ? [] : [x],
  });
  const y = x === undefined ? null : evaluar(formula, valores, listas);
  return {
    segmentos,
    rangos: { x: marco.rango, y: rangoY(segmentos, y) },
    puntoActual: x === undefined ? null : { x, y },
    leer: (xi) => evaluar(formula, { ...valores, [simboloX]: xi }, listas),
  };
}

/** «A», «A y B», «A, B y C». */
const lista = (simbolos: readonly string[]) =>
  simbolos.length < 2
    ? simbolos.join('')
    : `${simbolos.slice(0, -1).join(', ')} y ${simbolos[simbolos.length - 1]}`;

/** En lugar de la curva: qué hay que cargar para poder dibujarla. */
export function TarjetaPendientes({
  formula,
  cargados,
  simboloX,
}: {
  formula: Formula;
  cargados: Cargados;
  simboloX: string;
}) {
  const { faltan, invalidos } = pendientes(cargados, simboloX);
  return (
    <View testID="grafica-pendientes" style={estilos.tarjeta}>
      <Text style={estilos.tarjetaTitulo}>{`${formula.salida.simbolo} en función de ${simboloX}`}</Text>
      {faltan.length > 0 && (
        <Text style={estilos.tarjetaTexto}>
          {`Para dibujar la curva cargá ${lista(faltan)}. ${simboloX} va en el eje X: puede quedar vacío.`}
        </Text>
      )}
      {invalidos.length > 0 && (
        <Text style={estilos.tarjetaTexto}>{`Revisá ${lista(invalidos)}: debe ser un número válido.`}</Text>
      )}
    </View>
  );
}

/**
 * La tarjeta de la pantalla vertical: la curva chica, sólo para ver, y el acceso a la
 * pantalla horizontal. Sólo la reciben las Fórmulas graficables.
 */
export function VistaPrevia({ formula, sesion }: { formula: Formula; sesion: Sesion }) {
  const { width } = useWindowDimensions();
  const cargados = leerCargados(formula, sesion);
  const variableX = ejeXPorDefecto(formula, cargados);
  const multiploX = sesion.multiplos[variableX.simbolo] ?? variableX.multiploCanonico;
  const marco = marcoInicial(variableX, cargados, multiploX);
  const curva = armarCurva(formula, cargados, variableX.simbolo, marco);
  // El ancho de la pantalla menos el relleno de la pantalla y el de la tarjeta.
  const ancho = Math.max(160, width - 2 * espacio.xl - 2 * espacio.sm - 2);

  return (
    <View testID="vista-previa" style={estilos.previa} accessibilityLabel="Vista previa de la gráfica">
      {curva ? (
        // Sólo para ver: tocar y leer puntos es de la pantalla horizontal.
        <View pointerEvents="none">
          <Lienzo
            {...curva}
            escala={marco.escala}
            variableX={variableX}
            multiploX={multiploX}
            salida={formula.salida}
            ancho={ancho}
            alto={ALTO_PREVIA}
          />
        </View>
      ) : (
        <TarjetaPendientes formula={formula} cargados={cargados} simboloX={variableX.simbolo} />
      )}
      <View style={estilos.acceso}>
        <Pressable
          testID="ver-grafica"
          accessibilityRole="button"
          accessibilityLabel={`Ver gráfica de ${formula.salida.simbolo} a pantalla completa`}
          style={estilos.botonVer}
          onPress={() =>
            router.push({ pathname: '/formula/[id]/grafica', params: { id: formula.id } })
          }
        >
          <Text style={estilos.botonVerTexto}>Ver gráfica</Text>
        </Pressable>
        <Text style={estilos.pista}>Se abre en horizontal, a pantalla completa</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  previa: {
    gap: espacio.sm,
    padding: espacio.sm,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.md,
    backgroundColor: colores.superficie,
  },
  tarjeta: {
    gap: espacio.sm,
    padding: espacio.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colores.texto,
    borderRadius: radio.md,
    backgroundColor: colores.superficie,
  },
  tarjetaTitulo: {
    ...tipografia.subtitulo,
    color: colores.texto,
  },
  tarjetaTexto: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.interfaz,
    color: colores.texto,
  },
  acceso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.sm,
  },
  botonVer: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: espacio.lg,
    borderRadius: radio.pastilla,
    backgroundColor: colores.texto,
  },
  botonVerTexto: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.interfazFuerte,
    color: colores.fondo,
  },
  pista: {
    ...tipografia.pie,
    flex: 1,
    color: colores.textoSuave,
  },
});
