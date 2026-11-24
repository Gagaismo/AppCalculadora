import { fireEvent, render, screen } from '@testing-library/react-native';

import { buscarFormula } from '@/formulas';

import { rangoY } from './escala';
import { Lienzo, MARGEN } from './lienzo';
import { evaluar, muestrear } from './muestreo';
import type { Escala, Rango } from './tipos';

/**
 * El lienzo con Fórmulas reales del catálogo. En RNTL 14 `render` y `fireEvent`
 * devuelven Promesas: sin `await` el test falla con un mensaje que no dice la causa.
 */

const ANCHO = MARGEN.izquierda + 400 + MARGEN.derecha;
const ALTO = 240;

async function dibujar(
  id: string,
  simboloX: string,
  valores: Record<string, number>,
  rango: Rango,
  escala: Escala,
  onLectura?: jest.Mock,
) {
  const formula = buscarFormula(id)!;
  const segmentos = muestrear({
    formula,
    valoresCanonicos: valores,
    variableX: simboloX,
    rango,
    escala,
    incluir: [valores[simboloX]],
  });
  const yActual = evaluar(formula, valores);
  await render(
    <Lienzo
      segmentos={segmentos}
      rangos={{ x: rango, y: rangoY(segmentos, yActual) }}
      escala={escala}
      puntoActual={{ x: valores[simboloX], y: yActual }}
      variableX={formula.entradas.find((v) => v.simbolo === simboloX)!}
      multiploX=""
      salida={formula.salida}
      leer={(x) => evaluar(formula, { ...valores, [simboloX]: x })}
      ancho={ANCHO}
      alto={ALTO}
      onLectura={onLectura}
    />,
  );
}

/** Los textos dibujados dentro del SVG: viajan en la prop `content` de cada `TSpan`. */
function textosSvg(): string[] {
  const textos: string[] = [];
  const recorrer = (nodo: unknown): void => {
    if (Array.isArray(nodo)) return nodo.forEach(recorrer);
    if (!nodo || typeof nodo !== 'object') return;
    const { type, props, children } = nodo as { type: string; props: { content?: string }; children?: unknown };
    if (type === 'RNSVGTSpan' && props.content !== undefined) textos.push(props.content);
    recorrer(children);
  };
  recorrer(screen.toJSON());
  return textos;
}

/**
 * Toda prop o texto del árbol dibujado que lleve un número no finito. En Android un
 * `d` con «NaN» cierra la app (`PathViewManager.setD`): acá tiene que quedar vacío.
 */
function noFinitos(arbol: unknown): string[] {
  const hallados: string[] = [];
  const malo = (v: unknown) =>
    (typeof v === 'number' && !Number.isFinite(v)) ||
    (typeof v === 'string' && /NaN|Infinity/.test(v));
  const recorrer = (nodo: unknown, camino: string): void => {
    if (Array.isArray(nodo)) return nodo.forEach((n, i) => recorrer(n, `${camino}[${i}]`));
    if (malo(nodo)) {
      hallados.push(`${camino}: ${String(nodo)}`);
      return;
    }
    if (!nodo || typeof nodo !== 'object') return;
    const { type, props, children } = nodo as { type?: string; props?: object; children?: unknown };
    for (const [clave, valor] of Object.entries(props ?? {})) {
      if (malo(valor)) hallados.push(`${camino}${type}.${clave}: ${String(valor)}`);
    }
    recorrer(children, `${camino}${type}>`);
  };
  recorrer(arbol, '');
  return hallados;
}

const shannon = () =>
  dibujar('U05-F17', 'B', { B: 3000, SNR: 1023 }, { min: 0, max: 6000 }, 'lineal', jest.fn());

describe('Lienzo', () => {
  it('dibuja la curva de Shannon como un solo trazo, sin huecos', async () => {
    await shannon();
    const curva = screen.getByTestId('lienzo-curva-0');
    expect(curva.props.d).toMatch(/^M[\d.]+ [\d.]+(L[\d.]+ [\d.]+)+$/);
    expect(screen.queryByTestId('lienzo-curva-1')).toBeNull();
    expect(textosSvg()).not.toContain('sin valor');
  });

  it('en reposo, la lectura es la del punto actual (Ejemplo 07)', async () => {
    await shannon();
    expect(screen.getByTestId('lienzo-lectura')).toHaveTextContent('B = 3000 Hz → C = 30 kbit/s');
  });

  it('U03-F01 con P_o ≤ 0 en el rango: la zona sin definir lleva el rótulo «sin valor»', async () => {
    await dibujar(
      'U03-F01',
      'P_o',
      { P_i: 0.004, P_o: 0.07981 },
      { min: -0.08, max: 0.08 },
      'lineal',
    );
    expect(textosSvg()).toContain('sin valor');
    expect(screen.getByTestId('lienzo-hueco-0')).toBeTruthy();
  });

  it('si la curva no existe en todo el rango, lo avisa con palabras', async () => {
    await dibujar('U03-F01', 'P_o', { P_i: 0.004, P_o: -0.04 }, { min: -0.08, max: 0 }, 'lineal');
    expect(screen.getByText('La fórmula no está definida en todo el rango')).toBeTruthy();
  });

  it('tocar el lienzo muestra la lectura (x, y) de ese punto y la avisa', async () => {
    const onLectura = jest.fn();
    await dibujar('U05-F17', 'B', { B: 3000, SNR: 1023 }, { min: 0, max: 6000 }, 'lineal', onLectura);
    // Tres cuartos del área de dibujo: B = 4500 Hz.
    await fireEvent(screen.getByTestId('lienzo'), 'responderGrant', {
      nativeEvent: { locationX: MARGEN.izquierda + 300 },
    });
    const texto = 'B = 4500 Hz → C = 45 kbit/s';
    expect(screen.getByTestId('lienzo-lectura')).toHaveTextContent(texto);
    expect(screen.getByTestId('lienzo-cruz')).toBeTruthy();
    expect(onLectura).toHaveBeenLastCalledWith({ x: 4500, y: 45000, texto });
  });

  it('arrastrar mueve la lectura; fuera del área queda en el borde', async () => {
    await shannon();
    await fireEvent(screen.getByTestId('lienzo'), 'responderMove', {
      nativeEvent: { locationX: ANCHO + 50 },
    });
    expect(screen.getByTestId('lienzo-lectura')).toHaveTextContent('B = 6000 Hz → C = 60 kbit/s');
  });

  it('sin gestos: la acción de accesibilidad «increment» corre la cruz un paso', async () => {
    await shannon();
    const lienzo = screen.getByTestId('lienzo');
    expect(lienzo.props.accessibilityActions).toEqual(
      expect.arrayContaining([{ name: 'increment' }, { name: 'decrement' }]),
    );
    await fireEvent(lienzo, 'accessibilityAction', { nativeEvent: { actionName: 'increment' } });
    expect(screen.getByTestId('lienzo-lectura')).toHaveTextContent('B = 3300 Hz → C = 33 kbit/s');
  });

  // S1: una curva plana en 0 se dibuja sin NaN en ningún path ni etiqueta.
  it('U05-F17 con SNR = 0: la curva plana en 0 se dibuja sin números no finitos', async () => {
    await dibujar('U05-F17', 'B', { B: 3000, SNR: 0 }, { min: 0, max: 6000 }, 'lineal');
    expect(screen.getByTestId('lienzo-curva-0').props.d).toMatch(/^M[\d.]+ [\d.]+(L[\d.]+ [\d.]+)+$/);
    expect(screen.getByTestId('lienzo-punto-actual')).toBeTruthy();
    expect(noFinitos(screen.toJSON())).toEqual([]);
  });

  // S1, guarda defensiva: aunque le llegue un rango Y colapsado o no finito, el
  // Lienzo no emite un path con NaN ni Infinity.
  it.each([
    ['colapsado en 0', { min: 0, max: 0 }],
    ['colapsado en 5', { min: 5, max: 5 }],
    ['con NaN', { min: NaN, max: NaN }],
    ['con Infinity', { min: -Infinity, max: Infinity }],
  ])('un rango Y %s no produce números no finitos', async (_, ry) => {
    const formula = buscarFormula('U05-F17')!;
    const segmentos = [[0, 3000, 6000].map((x) => ({ x, y: ry.min === 5 ? 5 : 0 }))];
    await render(
      <Lienzo
        segmentos={segmentos}
        rangos={{ x: { min: 0, max: 6000 }, y: ry }}
        escala="lineal"
        puntoActual={{ x: 3000, y: segmentos[0][1].y }}
        variableX={formula.entradas[0]}
        multiploX=""
        salida={formula.salida}
        leer={() => 0}
        ancho={ANCHO}
        alto={ALTO}
      />,
    );
    await fireEvent(screen.getByTestId('lienzo'), 'responderGrant', {
      nativeEvent: { locationX: MARGEN.izquierda + 100 },
    });
    expect(screen.getByTestId('lienzo-curva-0').props.d).toMatch(/^M[\d.]+ [\d.]+(L[\d.]+ [\d.]+)+$/);
    expect(noFinitos(screen.toJSON())).toEqual([]);
  });

  /** Los pares (x, y) de un `d` de la curva. */
  const coordenadas = (d: string) =>
    [...d.matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);

  async function lienzoCon(segmentos: { x: number; y: number }[][], rx: Rango, escala: Escala) {
    const formula = buscarFormula('U05-F17')!;
    const p = segmentos[0][0];
    await render(
      <Lienzo
        segmentos={segmentos}
        rangos={{ x: rx, y: rangoY(segmentos, p.y) }}
        escala={escala}
        puntoActual={{ x: p.x, y: p.y }}
        variableX={formula.entradas[0]}
        multiploX=""
        salida={formula.salida}
        leer={() => p.y}
        ancho={ANCHO}
        alto={ALTO}
      />,
    );
    await fireEvent(screen.getByTestId('lienzo'), 'responderGrant', {
      nativeEvent: { locationX: MARGEN.izquierda + 100 },
    });
  }

  // S1, review de PR #24: una serie de un solo punto se dibuja, dentro del área.
  it.each([
    ['en 5', 5],
    ['en 0', 0],
    ['en −1,7·10³⁰⁸', -1.7e308],
    ['en 1,7·10³⁰⁸', 1.7e308],
  ])('una serie de un solo punto %s se dibuja dentro del área', async (_, y) => {
    await lienzoCon([[{ x: 3000, y }]], { min: 0, max: 6000 }, 'lineal');
    const d = screen.getByTestId('lienzo-curva-0').props.d as string;
    expect(d).toMatch(/^M[\d.]+ [\d.]+$/);
    const [[cx, cy]] = coordenadas(d);
    expect(cx).toBeGreaterThanOrEqual(MARGEN.izquierda);
    expect(cx).toBeLessThanOrEqual(ANCHO - MARGEN.derecha);
    expect(cy).toBeGreaterThanOrEqual(MARGEN.arriba);
    expect(cy).toBeLessThanOrEqual(ALTO - MARGEN.abajo);
    expect(screen.getByTestId('lienzo-punto-actual')).toBeTruthy();
    expect(noFinitos(screen.toJSON())).toEqual([]);
  });

  // S1, review de PR #24: un marco de X degenerado o inválido no produce NaN ni cuelga
  // las marcas, en lineal ni en log.
  it.each([
    ['lineal colapsado', { min: 3000, max: 3000 }, 'lineal'],
    ['lineal con NaN', { min: NaN, max: NaN }, 'lineal'],
    ['log desde 0', { min: 0, max: 1e4 }, 'log'],
    ['log hasta Infinity', { min: 1e305, max: Infinity }, 'log'],
    ['log colapsado', { min: 3000, max: 3000 }, 'log'],
  ] as [string, Rango, Escala][])('un marco de X %s se dibuja sin números no finitos', async (_, rx, escala) => {
    await lienzoCon([[{ x: 3000, y: 1 }, { x: 3000, y: 2 }]], rx, escala);
    // Fuera del marco la coordenada puede ser negativa: el recorte la oculta.
    expect(screen.getByTestId('lienzo-curva-0').props.d).toMatch(/^M-?[\d.]+ -?[\d.]+(L-?[\d.]+ -?[\d.]+)*$/);
    expect(noFinitos(screen.toJSON())).toEqual([]);
  });

  it('en log, las marcas llevan su propio múltiplo', async () => {
    await dibujar('U03-F07', 'd', { f: 5.8e9, d: 100 }, { min: 1, max: 1e4 }, 'log');
    expect(textosSvg()).toEqual(expect.arrayContaining(['1 m', '100 m', '1 km', '10 km']));
  });
});
