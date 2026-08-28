import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { verificarEjemplo } from '@/dominio/pruebas';
import { PantallaFormula } from '@/screens/formula';

import { EJEMPLOS_UNIDAD_09, FORMULAS_UNIDAD_09 } from './unidad-09';

/**
 * Tests de la Unidad 9 — Equipos de Comunicación de Datos (DCE).
 *
 * Incluye:
 * 1. Verificación de los Ejemplos resueltos contra el motor de cálculo.
 * 2. Render de cada Fórmula en la pantalla genérica.
 */

describe('Unidad 9 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_09.map(
      (ejemplo, index) => [ejemplo.formulaId, ejemplo.pagina, index + 1, ejemplo] as const,
    ),
  )(
    '%s reproduce el resultado de la diapositiva (pág. %s, caso %s)',
    (_id, _pagina, _caso, ejemplo) => {
      const veredicto = verificarEjemplo(ejemplo);
      if (!veredicto.ok) throw new Error(veredicto.detalle);
      expect(veredicto.ok).toBe(true);
    },
  );

  it('cubre todos los Ejemplos resueltos de la Unidad 9 del catálogo', () => {
    expect(EJEMPLOS_UNIDAD_09.length).toBeGreaterThanOrEqual(13);
  });
});

describe('Unidad 9 — Render en pantalla genérica', () => {
  it.each(FORMULAS_UNIDAD_09.map((formula) => [formula.id, formula] as const))(
    '%s se renderiza correctamente en la pantalla genérica',
    async (_id, formula) => {
      await render(React.createElement(PantallaFormula, { formula }));

      expect(screen.getByText(formula.id)).toBeTruthy();
      expect(screen.getAllByText(formula.nombre).length).toBeGreaterThanOrEqual(1);
      // La expresión se dibuja como SVG cuando la Fórmula tiene `expresionLatex`, y un
      // SVG no tiene texto que buscar. Se afirma por la etiqueta accesible, que es lo
      // que recibe un lector de pantalla y vale para las dos formas de dibujarla.
      expect(screen.getByTestId(`expresion-${formula.id}`).props.accessibilityLabel).toBe(
        formula.expresion,
      );

      for (const entrada of formula.entradas) {
        expect(screen.getByTestId(`variable-${entrada.simbolo}`)).toBeTruthy();
        expect(screen.getAllByText(entrada.significado).length).toBeGreaterThanOrEqual(1);
      }

      expect(screen.getByTestId('salida')).toBeTruthy();
      expect(screen.getAllByText(formula.salida.significado).length).toBeGreaterThanOrEqual(1);
    },
  );
});
