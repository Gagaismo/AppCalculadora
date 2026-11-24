import { router, Stack } from 'expo-router';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import RutaFormula from '@/app/formula/[id]';
import RutaGrafica from '@/app/formula/[id]/grafica';
import { ProveedorSesion, type Sesion } from '@/graficas/sesion';

/**
 * La pantalla horizontal de la gráfica (S6, láminas B y C). Arranca de lo cargado en
 * la pantalla de la Fórmula, por eso cada prueba siembra la sesión. En RNTL 14
 * `render` y `fireEvent` llevan `await`.
 */

jest.mock('expo-screen-orientation', () => require('@/pruebas/screen-orientation-doble'));

const accion = (actionName: string) => ({ nativeEvent: { actionName } });

async function abrir(id: string, sesion?: Sesion, initialUrl = `/formula/${id}/grafica`) {
  return renderRouter(
    {
      _layout: () => (
        <ProveedorSesion inicial={sesion && { [id]: sesion }}>
          <Stack />
        </ProveedorSesion>
      ),
      'formula/[id]': RutaFormula,
      'formula/[id]/grafica': RutaGrafica,
    },
    { initialUrl },
  );
}

/** Ejemplo 07 de U05-F17 (pág. 27): B = 3000 Hz, SNR = 1023 → C = 30 kbit/s. */
const ejemplo07: Sesion = { textos: { B: ['3000'], SNR: ['1023'] }, multiplos: { B: '', SNR: '' } };
/** U03-F01 con P_i negativo: P_o / P_i < 0 y el logaritmo no existe en ningún punto. */
const piNegativo: Sesion = { textos: { P_o: ['79,81'], P_i: ['-4'] }, multiplos: { P_o: 'm', P_i: 'm' } };

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

const lectura = () => screen.getByTestId('lienzo-lectura');
const elegido = (testID: string) => screen.getByTestId(testID).props.accessibilityState?.selected;

describe('pantalla de la gráfica', () => {
  it('ofrece un chip de eje X por Variable escalar, con B elegido', async () => {
    await abrir('U05-F17', ejemplo07);
    expect(screen.getByTestId('eje-B')).toHaveTextContent(/B$/);
    expect(screen.getByTestId('eje-SNR')).toHaveTextContent(/SNR$/);
    expect(elegido('eje-B')).toBe(true);
    expect(elegido('eje-SNR')).toBe(false);
  });

  it('arranca de los valores cargados: el punto actual del Ejemplo 07 es 30 kbit/s', async () => {
    await abrir('U05-F17', ejemplo07);
    expect(lectura()).toHaveTextContent('B = 3000 Hz → C = 30 kbit/s');
    expect(screen.getByTestId('lienzo-punto-actual')).toBeTruthy();
    expect(screen.getByTestId('grafica-resultado')).toHaveTextContent('30 kbit/s');
    expect(screen.getByTestId('deslizador-B')).toHaveTextContent(/3000 Hz$/);
  });

  it('mover un deslizador mueve la lectura y el resultado', async () => {
    await abrir('U05-F17', ejemplo07);
    // B va en log de 30 Hz a 300 kHz: un paso son 0,2 décadas, 4754,7 Hz → «4750».
    await fireEvent(screen.getByTestId('deslizador-B'), 'accessibilityAction', accion('increment'));
    expect(lectura()).toHaveTextContent('B = 4750 Hz → C = 47,5 kbit/s');
    expect(screen.getByTestId('grafica-resultado')).toHaveTextContent('47,5 kbit/s');
  });

  it('cambiar el eje X a SNR redibuja con SNR en X', async () => {
    await abrir('U05-F17', ejemplo07);
    await fireEvent.press(screen.getByTestId('eje-SNR'));
    expect(elegido('eje-SNR')).toBe(true);
    expect(lectura()).toHaveTextContent('SNR = 1023 → C = 30 kbit/s');
  });

  it('Lineal y Log cambian la escala del eje X', async () => {
    await abrir('U05-F17', ejemplo07);
    expect(elegido('escala-log')).toBe(true);
    await fireEvent.press(screen.getByTestId('escala-lineal'));
    expect(elegido('escala-lineal')).toBe(true);
    expect(elegido('escala-log')).toBe(false);
    // En lineal B va de 0 a 6000 Hz: un paso es 300 Hz.
    await fireEvent(screen.getByTestId('deslizador-B'), 'accessibilityAction', accion('increment'));
    expect(lectura()).toHaveTextContent('B = 3300 Hz → C = 33 kbit/s');
  });

  it('«Encuadrar» vuelve a centrar el eje X en el valor actual', async () => {
    await abrir('U05-F17', ejemplo07);
    await fireEvent.press(screen.getByTestId('escala-lineal'));
    await fireEvent(screen.getByTestId('deslizador-B'), 'accessibilityAction', accion('increment'));
    await fireEvent.press(screen.getByTestId('encuadrar'));
    // De 0 a 6600 Hz: 3300 queda en el medio y un paso más es 330 Hz, no 300.
    await fireEvent(screen.getByTestId('deslizador-B'), 'accessibilityAction', accion('increment'));
    expect(lectura()).toHaveTextContent('B = 3630 Hz → C = 36,3 kbit/s');
  });

  it('U03-F01 con P_i negativo avisa que la curva no existe en todo el rango', async () => {
    await abrir('U03-F01', piNegativo);
    expect(screen.getByText('La fórmula no está definida en todo el rango')).toBeTruthy();
  });

  it('con el eje X en un valor negativo, Log avisa y queda lineal', async () => {
    await abrir('U03-F01', piNegativo);
    await fireEvent.press(screen.getByTestId('eje-P_i'));
    expect(screen.getByTestId('aviso-escala')).toHaveTextContent(
      'La escala log necesita un valor mayor que cero: se muestra lineal.',
    );
    expect(elegido('escala-lineal')).toBe(true);
  });

  // S1: llevar un deslizador lineal a su extremo izquierdo, que vale 0, deja la curva
  // en 0 en todos sus puntos. Antes el rango Y colapsaba y el path llevaba NaN.
  it.each([
    [
      'U02-F08 con A = 2, f = 50, t = 5 ms, θ = 0, eje X «t», A al piso',
      'U02-F08',
      { textos: { A: ['2'], f: ['50'], t: ['5'], θ: ['0'] }, multiplos: { A: '', f: '', t: 'm', θ: '' } },
      't',
      'A',
    ],
    [
      'U02-F03 con v = 300, f = 1000 kHz, eje X «f», v al piso',
      'U02-F03',
      { textos: { v: ['300'], f: ['1000'] }, multiplos: { v: '', f: 'k' } },
      'f',
      'v',
    ],
  ] as [string, string, Sesion, string, string][])('%s: curva plana sin NaN', async (_, id, sesion, ejeX, piso) => {
    await abrir(id, sesion);
    await fireEvent.press(screen.getByTestId(`eje-${ejeX}`));
    expect(elegido(`eje-${ejeX}`)).toBe(true);
    // Veinte pasos recorren la pista entera; uno más confirma que queda en el borde.
    for (let i = 0; i < 21; i++) {
      await fireEvent(screen.getByTestId(`deslizador-${piso}`), 'accessibilityAction', accion('decrement'));
    }
    expect(screen.getByTestId(`deslizador-${piso}`)).toHaveTextContent(new RegExp(`^${piso}0 `));
    expect(screen.getByTestId('lienzo-curva-0').props.d).toMatch(/^M[\d.]+ [\d.]+(L[\d.]+ [\d.]+)+$/);
    expect(noFinitos(screen.toJSON())).toEqual([]);
  });

  it('no muestra al guía', async () => {
    await abrir('U05-F17', ejemplo07);
    expect(screen.queryByTestId('guia')).toBeNull();
  });

  it('una Fórmula que no existe lo dice', async () => {
    await abrir('U99-F99');
    expect(screen.getByText('No se encontró la Fórmula.')).toBeTruthy();
  });

  it('al volver, la Fórmula tiene el valor del deslizador en su campo', async () => {
    await abrir('U05-F17', undefined, '/formula/U05-F17');
    await fireEvent.changeText(screen.getByTestId('entrada-B'), '3000');
    await fireEvent.changeText(screen.getByTestId('entrada-SNR'), '1023');
    await fireEvent.press(screen.getByTestId('ver-grafica'));
    await fireEvent(screen.getByTestId('deslizador-B'), 'accessibilityAction', accion('increment'));
    await act(() => router.back());
    expect(screen.getByTestId('entrada-B').props.value).toBe('4750');
    expect(screen.getByTestId('resultado')).toHaveTextContent('47,5 kbit/s');
  });
});
