import { verificarEjemplo } from '@/dominio/pruebas';

import { EJEMPLOS_UNIDAD_10 } from './unidad-10';

/**
 * Los Ejemplos resueltos de la cátedra, corridos contra el motor.
 *
 * Esto es lo que prueba que la transcripción de la Fórmula es correcta. Una Fórmula
 * sin su Ejemplo resuelto verificando no está terminada.
 */

describe('Unidad 10 — Ejemplos resueltos', () => {
  it.each(EJEMPLOS_UNIDAD_10.map((ejemplo) => [ejemplo.formulaId, ejemplo] as const))(
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
});
