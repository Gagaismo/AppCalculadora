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

  it('en log, las marcas llevan su propio múltiplo', async () => {
    await dibujar('U03-F07', 'd', { f: 5.8e9, d: 100 }, { min: 1, max: 1e4 }, 'log');
    expect(textosSvg()).toEqual(expect.arrayContaining(['1 m', '100 m', '1 km', '10 km']));
  });
});
