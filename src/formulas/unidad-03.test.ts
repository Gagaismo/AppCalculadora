import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { verificarEjemplo } from '@/dominio/pruebas';
import { PantallaFormula } from '@/screens/formula';

import { EJEMPLOS_UNIDAD_03, FORMULAS_UNIDAD_03 } from './unidad-03';

/**
 * Tests de la Unidad 3 — Atenuación, Distorsión y Ruido.
 *
 * Verifica:
 * 1. Que cada Ejemplo resuelto de la cátedra se reproduzca exactamente a través del motor.
 * 2. Que los 28 Ejemplos resueltos del catálogo estén cargados.
 * 3. Que cada una de las 17 Fórmulas se renderice correctamente en la pantalla genérica.
 */

describe('Unidad 03 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_03.map((ejemplo, index) => [
      `${ejemplo.formulaId} (ejemplo ${index + 1}, pág. ${ejemplo.pagina})`,
      ejemplo,
    ] as const),
  )('%s reproduce el resultado de la diapositiva', (_nombre, ejemplo) => {
    const veredicto = verificarEjemplo(ejemplo);
    if (!veredicto.ok) throw new Error(veredicto.detalle);
    expect(veredicto.ok).toBe(true);
  });

  it('cubre los 28 Ejemplos resueltos del catálogo para la Unidad 3', () => {
    expect(EJEMPLOS_UNIDAD_03).toHaveLength(28);
  });
});

describe('Unidad 03 — Render en pantalla genérica', () => {
  it.each(FORMULAS_UNIDAD_03.map((formula) => [formula.id, formula] as const))(
    '%s renderiza sin errores en la pantalla genérica',
    async (_id, formula) => {
      await render(React.createElement(PantallaFormula, { formula }));

      expect(screen.getByText(formula.id)).toBeTruthy();
      expect(screen.getAllByText(formula.nombre).length).toBeGreaterThan(0);
      // La expresión se dibuja como SVG cuando la Fórmula tiene `expresionLatex`, y un
      // SVG no tiene texto que buscar. Se afirma por la etiqueta accesible, que es lo
      // que recibe un lector de pantalla y vale para las dos formas de dibujarla.
      expect(screen.getByTestId(`expresion-${formula.id}`).props.accessibilityLabel).toBe(
        formula.expresion,
      );
      expect(screen.getByTestId('salida')).toBeTruthy();
      expect(screen.getByTestId('ficha-formula')).toBeTruthy();
    },
    20000,
  );
});
