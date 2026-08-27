import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { verificarEjemplo } from '@/dominio/pruebas';
import { PantallaFormula } from '@/screens/formula';

import { EJEMPLOS_UNIDAD_10, FORMULAS_UNIDAD_10 } from './unidad-10';

// Aumentar el timeout para renderizado en entorno de testing en Windows.
jest.setTimeout(30000);

/**
 * Los Ejemplos resueltos de la cátedra, corridos contra el motor.
 *
 * Esto es lo que prueba que la transcripción de la Fórmula es correcta. Una Fórmula
 * sin su Ejemplo resuelto verificando no está terminada.
 */

describe('Unidad 10 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_10.map((ejemplo, index) => [
      `${ejemplo.formulaId} [#${index + 1}] (pág. ${ejemplo.pagina})`,
      ejemplo,
    ] as const),
  )(
    '%s reproduce el resultado de la diapositiva',
    (_id, ejemplo) => {
      const veredicto = verificarEjemplo(ejemplo);
      // El detalle nombra la Fórmula y la página: cuando fallan varios a la vez,
      // un `expect` pelado no dice cuál se rompió.
      if (!veredicto.ok) throw new Error(veredicto.detalle);
      expect(veredicto.ok).toBe(true);
    },
  );

  it('registra el apartamiento cuando la diapositiva se equivoca en la cuenta', () => {
    const conApartamiento = EJEMPLOS_UNIDAD_10.filter((ejemplo) => ejemplo.apartamiento);

    // La banda de 5 GHz: la diapositiva 34 dice 70 MHz y su propio rango da 700 MHz.
    expect(conApartamiento).toHaveLength(1);
    expect(conApartamiento[0].esperado).toEqual({ valor: 700, multiplo: 'M' });
    expect(conApartamiento[0].apartamiento).toMatch(/70 MHz/);
  });

  it('cubre los 12 Ejemplos resueltos del catálogo para la Unidad 10', () => {
    expect(EJEMPLOS_UNIDAD_10).toHaveLength(12);
  });

  it('cubre las 8 Fórmulas de la Unidad 10', () => {
    expect(FORMULAS_UNIDAD_10).toHaveLength(8);
  });
});

describe('Unidad 10 — Render de pantalla genérica', () => {
  it.each(FORMULAS_UNIDAD_10.map((formula) => [formula.id, formula] as const))(
    '%s renderiza en la pantalla genérica',
    async (_id, formula) => {
      await render(React.createElement(PantallaFormula, { formula }));

      expect(screen.getByText(formula.id)).toBeTruthy();
      expect(screen.getByText(formula.nombre)).toBeTruthy();
      expect(screen.getByText(formula.expresion)).toBeTruthy();
    },
    30000,
  );
});
