import { useEffect, useId, useState } from 'react';
import { type GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Line,
  Path,
  Pattern,
  Rect,
  Text as SvgText,
} from 'react-native-svg';

import type { Variable } from '@/dominio/formula';
import { elegirMultiplo, type Multiplo } from '@/dominio/multiplos';
import { colores, espacio, fuentes, tipografia } from '@/tema';

import {
  formatearLectura,
  formatearMarca,
  fraccionEn,
  marcas,
  unidadConMultiplo,
  valorEn,
} from './escala';
import { huecos } from './muestreo';
import type { Escala, Rango, Segmento } from './tipos';

/** El aire alrededor del área de dibujo: marcas de Y a la izquierda, de X y título abajo. */
export const MARGEN = { izquierda: 46, derecha: 12, arriba: 22, abajo: 38 } as const;

/** Cuánto corre la cruz cada acción de accesibilidad: un veinteavo del eje. */
const PASO_ACCESIBLE = 0.05;
/** Un hueco más angosto que esto se raya pero no se rotula: el rótulo no entra. */
const ANCHO_ROTULO = 74;

export interface LecturaLienzo {
  readonly x: number;
  readonly y: number | null;
  readonly texto: string;
}

export interface PropsLienzo {
  /** La curva, de `muestrear`. Entre dos Segmentos hay un hueco «sin valor». */
  readonly segmentos: readonly Segmento[];
  /** Y es `null` cuando no hay curva: el lienzo dibuja el marco y el aviso. */
  readonly rangos: { readonly x: Rango; readonly y: Rango | null };
  readonly escala: Escala;
  /** El valor cargado. `y` es `null` si ahí la Fórmula no está definida. */
  readonly puntoActual: { readonly x: number; readonly y: number | null } | null;
  readonly variableX: Variable;
  /** El múltiplo del campo de la Variable del eje X: lo usan las marcas lineales y la lectura. */
  readonly multiploX: Multiplo;
  readonly salida: Variable;
  /** La salida exacta en un X cualquiera, con la `calcular()` de la Fórmula (`evaluar`). */
  readonly leer: (x: number) => number | null;
  /** El tamaño del área SVG. La línea de lectura va encima, fuera de ese tamaño. */
  readonly ancho: number;
  readonly alto: number;
  readonly onLectura?: (lectura: LecturaLienzo) => void;
}

/**
 * El lienzo de la gráfica: ejes, marcas, curva con huecos, punto actual y cruz.
 *
 * Tocar o arrastrar pone la cruz en ese X y la lectura dice (x, y) con palabras: no
 * depende del color. Sin gestos, las acciones de accesibilidad `increment` y
 * `decrement` corren la cruz de a un veinteavo del eje. La cruz vuelve al punto
 * actual cuando cambia el rango del eje X («Encuadrar»).
 */
export function Lienzo(props: PropsLienzo) {
  const { segmentos, rangos, escala, puntoActual, variableX, multiploX, salida } = props;
  const { leer, ancho, alto, onLectura } = props;
  const [cursor, setCursor] = useState<number | null>(null);
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => setCursor(null), [rangos.x.min, rangos.x.max]);

  const x0 = MARGEN.izquierda;
  const x1 = ancho - MARGEN.derecha;
  const y0 = MARGEN.arriba;
  const y1 = alto - MARGEN.abajo;
  const rx = rangos.x;
  const ry = rangos.y ?? { min: 0, max: 1 };
  const px = (x: number) => x0 + fraccionEn(x, rx, escala) * (x1 - x0);
  // Lejos del área la coordenada se acota: el recorte la oculta igual y SVG no
  // tiene que lidiar con números de 10¹⁵ píxeles cerca de una asíntota.
  const py = (y: number) =>
    Math.max(-5 * alto, Math.min(6 * alto, y1 - ((y - ry.min) / (ry.max - ry.min)) * (y1 - y0)));

  const lectura = (x: number, y: number | null): LecturaLienzo => ({
    x,
    y,
    texto: formatearLectura({ variableX, multiploX, x, salida, y }),
  });

  const ponerCursor = (fraccion: number) => {
    const x = valorEn(Math.min(1, Math.max(0, fraccion)), rx, escala);
    setCursor(x);
    onLectura?.(lectura(x, leer(x)));
  };
  const alTocar = (e: GestureResponderEvent) =>
    ponerCursor((e.nativeEvent.locationX - x0) / (x1 - x0));
  const alAccion = (e: { nativeEvent: { actionName: string } }) => {
    const desde = cursor ?? puntoActual?.x ?? valorEn(0.5, rx, escala);
    const signo = e.nativeEvent.actionName === 'increment' ? 1 : -1;
    ponerCursor(fraccionEn(desde, rx, escala) + signo * PASO_ACCESIBLE);
  };

  const enCurso =
    cursor !== null ? lectura(cursor, leer(cursor)) : puntoActual && lectura(puntoActual.x, puntoActual.y);
  const textoLectura = enCurso?.texto ?? `Sin punto actual: falta ${variableX.simbolo}`;

  const multiploY = elegirMultiplo(Math.max(Math.abs(ry.min), Math.abs(ry.max)));
  const unidadX = unidadConMultiplo(variableX.unidadDeMedida, multiploX) || 'adimensional';
  const unidadY = unidadConMultiplo(salida.unidadDeMedida, multiploY) || 'adimensional';
  const tituloX =
    escala === 'log' ? `${variableX.simbolo} → · escala log` : `${variableX.simbolo} [${unidadX}] →`;

  const dentro = (x: number) => x >= rx.min && x <= rx.max;
  const sinCurva = segmentos.length === 0;

  return (
    <View>
      <Text testID="lienzo-lectura" style={estilos.lectura} accessibilityLiveRegion="polite">
        {textoLectura}
      </Text>
      <View
        testID="lienzo"
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={`Gráfica de ${salida.simbolo} en función de ${variableX.simbolo}`}
        accessibilityValue={{ text: textoLectura }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={alAccion}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={alTocar}
        onResponderMove={alTocar}
      >
        <Svg width={ancho} height={alto}>
          <Defs>
            <Pattern
              id={`${id}raya`}
              width={7}
              height={7}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <Rect width={7} height={7} fill={colores.avisoFondo} />
              <Line x1={0} y1={0} x2={0} y2={7} stroke={colores.aviso} strokeWidth={1.4} />
            </Pattern>
            <ClipPath id={`${id}area`}>
              <Rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} />
            </ClipPath>
          </Defs>
          <Rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={colores.superficie} />

          {marcas(rx, escala).map((v) => (
            <G key={`x${v}`}>
              <Line x1={px(v)} x2={px(v)} y1={y0} y2={y1 + 4} stroke={colores.borde} />
              <SvgText {...marca} x={px(v)} y={y1 + 16} textAnchor="middle">
                {formatearMarca(v, variableX.unidadDeMedida, escala, multiploX)}
              </SvgText>
            </G>
          ))}
          {rangos.y &&
            marcas(ry, 'lineal').map((v) => (
              <G key={`y${v}`}>
                <Line x1={x0 - 4} x2={x1} y1={py(v)} y2={py(v)} stroke={colores.borde} />
                <SvgText {...marca} x={x0 - 6} y={py(v) + 4} textAnchor="end">
                  {formatearMarca(v, salida.unidadDeMedida, 'lineal', multiploY)}
                </SvgText>
              </G>
            ))}
          {rangos.y && ry.min < 0 && ry.max > 0 && (
            <Line x1={x0} x2={x1} y1={py(0)} y2={py(0)} stroke={colores.texto} />
          )}
          {escala === 'lineal' && rx.min < 0 && rx.max > 0 && (
            <Line x1={px(0)} x2={px(0)} y1={y0} y2={y1} stroke={colores.texto} />
          )}

          <G clipPath={`url(#${id}area)`}>
            {huecos(segmentos, rx).map((h, i) => {
              const a = px(h.min);
              const b = px(h.max);
              return (
                <G key={`h${i}`} testID={`lienzo-hueco-${i}`}>
                  <Rect x={a} y={y0} width={Math.max(2, b - a)} height={y1 - y0} fill={`url(#${id}raya)`} />
                  {b - a > ANCHO_ROTULO && !sinCurva && (
                    <G>
                      <Rect
                        x={(a + b) / 2 - 34}
                        y={y0 + 8}
                        width={68}
                        height={20}
                        rx={4}
                        fill={colores.avisoFondo}
                        stroke={colores.aviso}
                      />
                      <SvgText {...marca} fill={colores.aviso} x={(a + b) / 2} y={y0 + 22} textAnchor="middle">
                        sin valor
                      </SvgText>
                    </G>
                  )}
                </G>
              );
            })}
            {segmentos.map((s, i) => (
              <Path
                key={`c${i}`}
                testID={`lienzo-curva-${i}`}
                d={s.map((p, j) => `${j ? 'L' : 'M'}${px(p.x).toFixed(1)} ${py(p.y).toFixed(1)}`).join('')}
                fill="none"
                stroke={colores.accion}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
            {puntoActual && dentro(puntoActual.x) && puntoActual.y !== null && (
              <Circle
                testID="lienzo-punto-actual"
                cx={px(puntoActual.x)}
                cy={py(puntoActual.y)}
                r={7}
                fill={colores.accion}
                stroke={colores.superficie}
                strokeWidth={2.5}
              />
            )}
            {puntoActual && dentro(puntoActual.x) && puntoActual.y === null && (
              <Path
                testID="lienzo-punto-actual"
                d={`M${px(puntoActual.x) - 7} ${y1 - 19}l14 14m0 -14l-14 14`}
                stroke={colores.error}
                strokeWidth={3}
                strokeLinecap="round"
              />
            )}
            {enCurso && cursor !== null && (
              <G testID="lienzo-cruz">
                <Line {...punteada} x1={px(cursor)} x2={px(cursor)} y1={y0} y2={y1} />
                {enCurso.y !== null && (
                  <G>
                    <Line {...punteada} x1={x0} x2={x1} y1={py(enCurso.y)} y2={py(enCurso.y)} />
                    <Circle cx={px(cursor)} cy={py(enCurso.y)} r={9} fill="none" stroke={colores.texto} strokeWidth={2.5} />
                  </G>
                )}
              </G>
            )}
          </G>

          <Path d={`M${x0} ${y0}V${y1}H${x1}`} fill="none" stroke={colores.texto} strokeWidth={1.2} />
          <SvgText {...marca} x={x0} y={y0 - 8}>
            {`${salida.simbolo} [${unidadY}] ↑`}
          </SvgText>
          <SvgText {...marca} x={x1} y={alto - 4} textAnchor="end">
            {tituloX}
          </SvgText>
        </Svg>
        {sinCurva && (
          <View pointerEvents="none" style={[estilos.aviso, { top: y0, left: x0, width: x1 - x0, height: y1 - y0 }]}>
            <Text style={estilos.textoAviso}>La fórmula no está definida en todo el rango</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const marca = { fontSize: 11, fontFamily: fuentes.nota, fill: colores.textoSuave } as const;
const punteada = { stroke: colores.texto, strokeWidth: 1.2, strokeDasharray: '4 3' } as const;

const estilos = StyleSheet.create({
  lectura: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.nota,
    color: colores.texto,
    marginBottom: espacio.xs,
  },
  aviso: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  textoAviso: {
    ...tipografia.etiqueta,
    color: colores.aviso,
    backgroundColor: colores.avisoFondo,
    paddingHorizontal: espacio.sm,
    paddingVertical: espacio.xs,
  },
});
