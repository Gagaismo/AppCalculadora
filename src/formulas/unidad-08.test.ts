import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { verificarEjemplo } from '@/dominio/pruebas';
import { PantallaFormula } from '@/screens/formula';

import { EJEMPLOS_UNIDAD_08, FORMULAS_UNIDAD_08 } from './unidad-08';

/**
 * Tests de la Unidad 8 — Modulación y Multiplexación de Señales.
 *
 * Verifica:
 * 1. Que cada Ejemplo resuelto de la cátedra reproduce el resultado esperado a través del motor.
 * 2. Que todas las Fórmulas de la Unidad se renderizan correctamente en la pantalla genérica.
 */

describe('Unidad 8 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_08.map((ejemplo, index) => [
      `${ejemplo.formulaId} (#${index + 1}, pág. ${ejemplo.pagina})`,
      ejemplo,
    ] as const),
  )('%s reproduce el resultado de la diapositiva', (_nombre, ejemplo) => {
    const veredicto = verificarEjemplo(ejemplo);
    if (!veredicto.ok) throw new Error(veredicto.detalle);
    expect(veredicto.ok).toBe(true);
  });

  it('cubre todos los Ejemplos resueltos del catálogo para la Unidad 8', () => {
    expect(EJEMPLOS_UNIDAD_08.length).toBeGreaterThanOrEqual(22);
  });
});

describe('Unidad 8 — Renderizado en pantalla genérica', () => {
  it.each(FORMULAS_UNIDAD_08.map((formula) => [formula.id, formula] as const))(
    '%s se renderiza correctamente con sus variables y salida',
    async (_id, formula) => {
      await render(React.createElement(PantallaFormula, { formula }));

      // Muestra el identificador, nombre y expresión
      expect(screen.getByText(formula.id)).toBeTruthy();
      expect(screen.getByText(formula.nombre)).toBeTruthy();
      // La expresión se dibuja como SVG cuando la Fórmula tiene `expresionLatex`, y un
      // SVG no tiene texto que buscar. Se afirma por la etiqueta accesible, que es lo
      // que recibe un lector de pantalla y vale para las dos formas de dibujarla.
      expect(screen.getByTestId(`expresion-${formula.id}`).props.accessibilityLabel).toBe(
        formula.expresion,
      );

      // Muestra cada variable de entrada
      for (const variable of formula.entradas) {
        expect(screen.getByTestId(`variable-${variable.simbolo}`)).toBeTruthy();
        expect(screen.getByText(variable.significado)).toBeTruthy();
        expect(screen.getByTestId(`entrada-${variable.simbolo}`)).toBeTruthy();
      }

      // Muestra la variable de salida y la ficha
      expect(screen.getByTestId('salida')).toBeTruthy();
      expect(screen.getByText(formula.salida.significado)).toBeTruthy();
      expect(screen.getByTestId('ficha-formula')).toBeTruthy();
    },
  );
});
