import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { verificarEjemplo } from '@/dominio/pruebas';
import { PantallaFormula } from '@/screens/formula';

import { EJEMPLOS_UNIDAD_05, FORMULAS_UNIDAD_05 } from './unidad-05';

/**
 * Los Ejemplos resueltos de la cátedra para la Unidad 5, corridos contra el motor.
 *
 * Esto es lo que prueba que la transcripción de las 25 Fórmulas es correcta.
 */

describe('Unidad 5 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_05.map((ejemplo, index) => [
      `${ejemplo.formulaId} (caso ${index + 1}, pág. ${ejemplo.pagina})`,
      ejemplo,
    ] as const),
  )('%s reproduce el resultado de la diapositiva', (_nombre, ejemplo) => {
    const veredicto = verificarEjemplo(ejemplo);
    if (!veredicto.ok) throw new Error(veredicto.detalle);
    expect(veredicto.ok).toBe(true);
  });

  it('cubre los casos de prueba derivados de los Ejemplos resueltos del catálogo', () => {
    expect(EJEMPLOS_UNIDAD_05.length).toBeGreaterThanOrEqual(21);
  });
});

describe('Unidad 5 — Cobertura de Fórmulas', () => {
  it('contiene las 25 Fórmulas de la Unidad 5', () => {
    expect(FORMULAS_UNIDAD_05).toHaveLength(25);
    const ids = FORMULAS_UNIDAD_05.map((f) => f.id);
    for (let i = 1; i <= 25; i++) {
      const num = i.toString().padStart(2, '0');
      expect(ids).toContain(`U05-F${num}`);
    }
  });

  it('todas las Fórmulas pertenecen a la unidad 5', () => {
    for (const formula of FORMULAS_UNIDAD_05) {
      expect(formula.unidad).toBe(5);
    }
  });
});

describe('Unidad 5 — Render en la pantalla genérica', () => {
  it.each(FORMULAS_UNIDAD_05.map((formula) => [formula.id, formula] as const))(
    '%s se renderiza correctamente en la pantalla genérica',
    async (_id, formula) => {
      await render(React.createElement(PantallaFormula, { formula }));
      expect(screen.getAllByText(formula.id).length).toBeGreaterThan(0);
      expect(screen.getAllByText(formula.nombre).length).toBeGreaterThan(0);
      expect(screen.getAllByText(formula.expresion).length).toBeGreaterThan(0);
      expect(screen.getByTestId('salida')).toBeTruthy();
      expect(screen.getByTestId('ficha-formula')).toBeTruthy();
    },
    15000,
  );
});

