import { fireEvent, render, screen, within } from '@testing-library/react-native';
import React from 'react';

import { calcular } from '@/dominio/motor';
import { verificarEjemplo } from '@/dominio/pruebas';
import { buscarFormula } from '@/formulas';
import { PantallaFormula } from '@/screens/formula';

import { EJEMPLOS_UNIDAD_07, FORMULAS_UNIDAD_07 } from './unidad-07';

/**
 * Tests de la Unidad 7 — Técnicas de transmisión de la información.
 *
 * Cubre:
 * 1. Todos los Ejemplos resueltos de las diapositivas de la cátedra corridos contra el motor.
 * 2. Pruebas directas de cálculo de las 4 fórmulas del catálogo (U07-F01 a U07-F04).
 * 3. Pruebas de render e interacción en la pantalla genérica para cada fórmula.
 */

describe('Unidad 7 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_07.map((ejemplo, index) => [
      `${ejemplo.formulaId} (pág. ${ejemplo.pagina}) [#${index + 1}]`,
      ejemplo,
    ] as const),
  )('%s reproduce el resultado de la diapositiva', (_nombre, ejemplo) => {
    const veredicto = verificarEjemplo(ejemplo);
    if (!veredicto.ok) throw new Error(veredicto.detalle);
    expect(veredicto.ok).toBe(true);
  });

  it('cubre todos los casos de los 5 Ejemplos resueltos del catálogo', () => {
    // 2 casos ilustrativos p.11 + 7 filas de la tabla p.13 (F01) +
    // 7 filas de la tabla p.13 (F02) + 2 casos del Ejemplo 01 p.26 (F04) = 18 casos
    expect(EJEMPLOS_UNIDAD_07.length).toBe(18);
  });
});

describe('Unidad 7 — Cálculo de fórmulas', () => {
  it('U07-F01: calcula bits por símbolo n = log₂(N)', () => {
    const res2 = calcular('U07-F01', { N: { valor: 2, multiplo: '' } });
    expect(res2).toEqual({ ok: true, valor: 1, unidadDeMedida: 'bit/baudio', multiplo: '' });

    const res8 = calcular('U07-F01', { N: { valor: 8, multiplo: '' } });
    expect(res8).toEqual({ ok: true, valor: 3, unidadDeMedida: 'bit/baudio', multiplo: '' });

    const res256 = calcular('U07-F01', { N: { valor: 256, multiplo: '' } });
    expect(res256).toEqual({ ok: true, valor: 8, unidadDeMedida: 'bit/baudio', multiplo: '' });
  });

  it('U07-F02: calcula tasa de bits R = r · n', () => {
    const res = calcular('U07-F02', {
      r: { valor: 1200, multiplo: '' },
      n: { valor: 3, multiplo: '' },
    });
    // 3600 bps se expresa como 3,6 kbps
    expect(res).toEqual({ ok: true, valor: 3.6, unidadDeMedida: 'bps', multiplo: 'k' });
  });

  it('U07-F03: calcula ancho de banda de señal analógica B = f_2 − f_1', () => {
    const resHz = calcular('U07-F03', {
      f_2: { valor: 3400, multiplo: '' },
      f_1: { valor: 300, multiplo: '' },
    });
    // 3100 Hz = 3,1 kHz
    expect(resHz).toEqual({ ok: true, valor: 3.1, unidadDeMedida: 'Hz', multiplo: 'k' });

    const resKHz = calcular('U07-F03', {
      f_2: { valor: 20, multiplo: 'k' },
      f_1: { valor: 20, multiplo: '' },
    });
    // 20 kHz - 20 Hz = 19980 Hz = 19,98 kHz
    expect(resKHz).toEqual({ ok: true, valor: 19.98, unidadDeMedida: 'Hz', multiplo: 'k' });
  });

  it('U07-F04: calcula bits extra por desviación del reloj b_extra = R · (d / 100)', () => {
    const res1k = calcular('U07-F04', {
      R: { valor: 1, multiplo: 'k' },
      d: { valor: 0.1, multiplo: '' },
    });
    expect(res1k).toEqual({ ok: true, valor: 1, unidadDeMedida: 'bps', multiplo: '' });

    const res1M = calcular('U07-F04', {
      R: { valor: 1, multiplo: 'M' },
      d: { valor: 0.1, multiplo: '' },
    });
    // 1000 bps = 1 kbps
    expect(res1M).toEqual({ ok: true, valor: 1, unidadDeMedida: 'bps', multiplo: 'k' });
  });
});

describe('Unidad 7 — Render en pantalla genérica', () => {
  it('renderiza U07-F01 y calcula en la interfaz', async () => {
    const formula = buscarFormula('U07-F01')!;
    expect(formula).toBeDefined();

    await render(React.createElement(PantallaFormula, { formula }));

    expect(screen.getByText('U07-F01')).toBeTruthy();
    expect(screen.getAllByText(formula.nombre).length).toBeGreaterThanOrEqual(1);
    // La expresión se dibuja como SVG cuando la Fórmula tiene `expresionLatex`, y un
    // SVG no tiene texto que buscar. Se afirma por la etiqueta accesible, que es lo
    // que recibe un lector de pantalla y vale para las dos formas de dibujarla.
    expect(screen.getByTestId(`expresion-${formula.id}`).props.accessibilityLabel).toBe(
      formula.expresion,
    );

    await fireEvent.changeText(screen.getByTestId('entrada-N'), '8');
    expect(screen.getByTestId('resultado')).toHaveTextContent('3 bit/baudio');
  });

  it('renderiza U07-F02 y calcula en la interfaz', async () => {
    const formula = buscarFormula('U07-F02')!;
    expect(formula).toBeDefined();

    await render(React.createElement(PantallaFormula, { formula }));

    expect(screen.getByText('U07-F02')).toBeTruthy();
    expect(screen.getAllByText(formula.nombre).length).toBeGreaterThanOrEqual(1);

    await fireEvent.changeText(screen.getByTestId('entrada-r'), '1200');
    await fireEvent.changeText(screen.getByTestId('entrada-n'), '3');
    expect(screen.getByTestId('resultado')).toHaveTextContent('3,6 kbps');
  });

  it('renderiza U07-F03 y calcula en la interfaz con conversión de múltiplos', async () => {
    const formula = buscarFormula('U07-F03')!;
    expect(formula).toBeDefined();

    await render(React.createElement(PantallaFormula, { formula }));

    expect(screen.getByText('U07-F03')).toBeTruthy();
    expect(screen.getAllByText(formula.nombre).length).toBeGreaterThanOrEqual(1);

    // Cargar 4 kHz y 300 Hz
    await fireEvent.changeText(screen.getByTestId('entrada-f_2'), '4');
    await fireEvent.press(within(screen.getByTestId('multiplos-f_2')).getByText('kHz'));
    await fireEvent.changeText(screen.getByTestId('entrada-f_1'), '300');

    expect(screen.getByTestId('resultado')).toHaveTextContent('3,7 kHz');
  });

  it('renderiza U07-F04 y calcula en la interfaz', async () => {
    const formula = buscarFormula('U07-F04')!;
    expect(formula).toBeDefined();

    await render(React.createElement(PantallaFormula, { formula }));

    expect(screen.getByText('U07-F04')).toBeTruthy();
    expect(screen.getAllByText(formula.nombre).length).toBeGreaterThanOrEqual(1);

    // R = 1 Kbps (multiplo k por defecto), d = 0,1 %
    await fireEvent.changeText(screen.getByTestId('entrada-R'), '1');
    await fireEvent.changeText(screen.getByTestId('entrada-d'), '0,1');
    expect(screen.getByTestId('resultado')).toHaveTextContent('1 bps');
  });

  it('todas las fórmulas de la Unidad 7 existen en el registro', () => {
    expect(FORMULAS_UNIDAD_07).toHaveLength(4);
    for (const f of FORMULAS_UNIDAD_07) {
      expect(buscarFormula(f.id)).toBeDefined();
    }
  });
});
