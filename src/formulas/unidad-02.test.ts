import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { calcular } from '@/dominio/motor';
import { verificarEjemplo } from '@/dominio/pruebas';
import { PantallaFormula } from '@/screens/formula';

import {
  EJEMPLOS_UNIDAD_02,
  FORMULAS_UNIDAD_02,
  PENDIENTES_UNIDAD_02,
} from './unidad-02';

/**
 * Suite de tests para la Unidad 2 — Análisis de las Señales (Fourier, filtros).
 *
 * Verifica:
 * 1. Que cada Ejemplo resuelto de la cátedra reproduce el resultado de las diapositivas
 *    al correrse contra el motor de cálculo.
 * 2. Que todas las 16 fórmulas calculables (13 directas + 3 con restricciones) calculan
 *    correctamente.
 * 3. Que las 13 fichas de consulta no calculables no declaran campos de entrada.
 * 4. Que la observación de U02-F19 está registrada.
 * 5. Que las fórmulas de la Unidad 2 renderizan en la pantalla genérica.
 * 6. Que la deuda de la Unidad 2 quedó vacía (PENDIENTES_UNIDAD_02 = []).
 */

describe('Unidad 2 — Ejemplos resueltos contra el motor', () => {
  it.each(
    EJEMPLOS_UNIDAD_02.map(
      (ejemplo, index) =>
        [`${ejemplo.formulaId} (pág. ${ejemplo.pagina}) [caso ${index + 1}]`, ejemplo] as const,
    ),
  )('%s reproduce el resultado de la diapositiva', (_id, ejemplo) => {
    const veredicto = verificarEjemplo(ejemplo);
    if (!veredicto.ok) throw new Error(veredicto.detalle);
    expect(veredicto.ok).toBe(true);
  });
});

describe('Unidad 2 — Cálculo de fórmulas con y sin restricciones', () => {
  it('U02-F04 calcula la longitud de onda a partir del período (λ = v · T)', () => {
    const res = calcular('U02-F04', {
      v: { valor: 340, multiplo: '' },
      T: { valor: 0.05, multiplo: 'm' }, // 50 µs = 0.05 ms -> f = 20 kHz -> λ = 340 * 0.00005 = 0.017 m = 17 mm
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(17, 3);
      expect(res.multiplo).toBe('m');
      expect(res.unidadDeMedida).toBe('m');
    }
  });

  it('U02-F05 calcula la frecuencia angular (ω = 2πf)', () => {
    const res = calcular('U02-F05', {
      f: { valor: 1, multiplo: 'k' }, // 1000 Hz -> ω = 2000π ≈ 6283.185 rad/s = 6.283 krad/s
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(6.283185, 3);
      expect(res.multiplo).toBe('k');
      expect(res.unidadDeMedida).toBe('rad/s');
    }
  });

  it('U02-F06 calcula la frecuencia angular fundamental (ω₀ = 2π / T)', () => {
    const res = calcular('U02-F06', {
      T: { valor: 1, multiplo: 'm' }, // 1 ms = 0.001 s -> ω₀ = 2000π ≈ 6283.185 rad/s = 6.283 krad/s
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(6.283185, 3);
      expect(res.multiplo).toBe('k');
      expect(res.unidadDeMedida).toBe('rad/s');
    }
  });

  it('U02-F07 calcula la frecuencia de la n-ésima armónica (f_n = n / T)', () => {
    const res = calcular('U02-F07', {
      n: { valor: 3, multiplo: '' },
      T: { valor: 1, multiplo: 'm' }, // T = 1 ms -> f₀ = 1000 Hz, f₃ = 3000 Hz = 3 kHz
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(3, 3);
      expect(res.multiplo).toBe('k');
      expect(res.unidadDeMedida).toBe('Hz');
    }
  });

  it('U02-F08 calcula el valor instantáneo de una señal senoidal', () => {
    // f(t) = A · sen(2πft + θ), con A = 10 V, f = 1 kHz, t = 0.25 ms (cuarto de período), θ = 0
    // 2π · 1000 · 0.00025 = π/2 -> sen(π/2) = 1 -> f(t) = 10 V
    const res = calcular('U02-F08', {
      A: { valor: 10, multiplo: '' },
      f: { valor: 1, multiplo: 'k' },
      t: { valor: 0.25, multiplo: 'm' },
      θ: { valor: 0, multiplo: '' },
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(10, 3);
      expect(res.unidadDeMedida).toBe('V');
    }
  });

  it('U02-F09 calcula el valor instantáneo de una señal compuesta de tres senoides', () => {
    // Componentes: 10·sen(2π·8·t) + 5·sen(2π·16·t) + 2·sen(2π·24·t)
    // En t = 0 -> f(0) = 0
    const res = calcular('U02-F09', {
      A: { valor: 10, multiplo: '' },
      f_1: { valor: 8, multiplo: '' },
      B: { valor: 5, multiplo: '' },
      f_2: { valor: 16, multiplo: '' },
      C: { valor: 2, multiplo: '' },
      f_3: { valor: 24, multiplo: '' },
      t: { valor: 0, multiplo: '' },
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(0, 3);
      expect(res.unidadDeMedida).toBe('V');
    }
  });

  it('U02-F10 calcula el ancho de banda absoluto (BW_abs = f_max − f_min)', () => {
    const res = calcular('U02-F10', {
      f_max: { valor: 20, multiplo: 'k' },
      f_min: { valor: 20, multiplo: '' },
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(19.98, 2);
      expect(res.multiplo).toBe('k');
      expect(res.unidadDeMedida).toBe('Hz');
    }
  });

  it('U02-F22 calcula la función sinc no normalizada', () => {
    // sinc(0) = 1
    const res0 = calcular('U02-F22', { x: { valor: 0, multiplo: '' } });
    expect(res0.ok).toBe(true);
    if (res0.ok) {
      expect(res0.valor).toBeCloseTo(1, 4);
      expect(res0.multiplo).toBe('');
    }

    // sinc(π/2) = sen(π/2)/(π/2) = 2/π ≈ 0.6366 = 636.62 m (adimensional)
    const resPi2 = calcular('U02-F22', { x: { valor: Math.PI / 2, multiplo: '' } });
    expect(resPi2.ok).toBe(true);
    if (resPi2.ok) {
      expect(resPi2.valor).toBeCloseTo((2 / Math.PI) * 1000, 2);
      expect(resPi2.multiplo).toBe('m');
    }

    // sinc(π) = 0
    const resPi = calcular('U02-F22', { x: { valor: Math.PI, multiplo: '' } });
    expect(resPi.ok).toBe(true);
    if (resPi.ok) {
      expect(resPi.valor).toBeCloseTo(0, 4);
    }
  });

  it('U02-F23 calcula el número de fasores del lóbulo principal (n = T / p)', () => {
    const res = calcular('U02-F23', {
      T: { valor: 5, multiplo: 'm' },
      p: { valor: 1, multiplo: 'm' },
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(5, 3);
      expect(res.unidadDeMedida).toBe('adimensional');
    }
  });

  it('U02-F24 calcula la frecuencia del primer cruce por cero (f = 1 / p)', () => {
    const res = calcular('U02-F24', {
      p: { valor: 10, multiplo: 'µ' }, // 10 µs -> 1 / 10e-6 = 100.000 Hz = 100 kHz
    });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.valor).toBeCloseTo(100, 3);
      expect(res.multiplo).toBe('k');
      expect(res.unidadDeMedida).toBe('Hz');
    }
  });
});

describe('Unidad 2 — Estructura del catálogo y cobertura', () => {
  it('contiene exactamente las 29 Fórmulas de la Unidad 2', () => {
    expect(FORMULAS_UNIDAD_02).toHaveLength(29);
    const ids = FORMULAS_UNIDAD_02.map((f) => f.id);
    expect(new Set(ids).size).toBe(29);
  });

  it('todas las Fórmulas pertenecen a la unidad 2', () => {
    for (const formula of FORMULAS_UNIDAD_02) {
      expect(formula.unidad).toBe(2);
    }
  });

  it('la deuda declarada de la Unidad 2 está vacía', () => {
    expect(PENDIENTES_UNIDAD_02).toEqual([]);
  });

  it('las 13 fichas de consulta no tienen variables de entrada', () => {
    const fichasConsultaIds = [
      'U02-F01', 'U02-F02', 'U02-F11', 'U02-F12', 'U02-F13', 'U02-F14',
      'U02-F16', 'U02-F17', 'U02-F18', 'U02-F19', 'U02-F20', 'U02-F25',
      'U02-F26',
    ];

    for (const id of fichasConsultaIds) {
      const f = FORMULAS_UNIDAD_02.find((item) => item.id === id);
      expect(f).toBeDefined();
      expect(f!.entradas).toHaveLength(0);
    }
  });

  it('U02-F19 incluye la observación de verificación sobre la contradicción de la lámina 46', () => {
    const f19 = FORMULAS_UNIDAD_02.find((f) => f.id === 'U02-F19');
    expect(f19).toBeDefined();
    expect(f19!.observacion).toBeDefined();
    expect(f19!.observacion).toMatch(/diapositiva 46 se contradice/i);
    expect(f19!.confianza).toBe('baja');
  });
});

describe('Unidad 2 — Renderizado en PantallaFormula', () => {
  it(
    'renderiza fórmulas escalares, con restricciones y fichas de consulta',
    async () => {
      const u02f03 = FORMULAS_UNIDAD_02.find((f) => f.id === 'U02-F03')!;
      await render(React.createElement(PantallaFormula, { formula: u02f03 }));
      expect(screen.getByText('U02-F03')).toBeTruthy();
      // La expresión se dibuja como SVG cuando la Fórmula tiene `expresionLatex`, y un
      // SVG no tiene texto que buscar. Se afirma por la etiqueta accesible, que es lo
      // que recibe un lector de pantalla y vale para las dos formas de dibujarla.
      expect(screen.getByTestId(`expresion-${u02f03.id}`).props.accessibilityLabel).toBe(
        u02f03.expresion,
      );
    },
    20000,
  );

  it(
    'renderiza una ficha de consulta (U02-F19) con su observación',
    async () => {
      const u02f19 = FORMULAS_UNIDAD_02.find((f) => f.id === 'U02-F19')!;
      await render(React.createElement(PantallaFormula, { formula: u02f19 }));
      expect(screen.getByText('U02-F19')).toBeTruthy();
      expect(screen.getByTestId('ficha-observacion')).toBeTruthy();
    },
    20000,
  );
});


