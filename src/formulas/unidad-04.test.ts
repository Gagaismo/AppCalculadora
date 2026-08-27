import { verificarEjemplo } from '@/dominio/pruebas';

import { EJEMPLOS_UNIDAD_04, FORMULAS_UNIDAD_04 } from './unidad-04';

/**
 * Los Ejemplos resueltos de la cátedra, corridos contra el motor.
 *
 * Esto es lo que prueba que la transcripción de las Fórmulas es correcta.
 */

describe('Unidad 4 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_04.map((ejemplo, index) => [
      ejemplo.formulaId,
      ejemplo.pagina,
      index,
      ejemplo,
    ] as const),
  )(
    '%s reproduce el resultado de la diapositiva (pág. %s, #%d)',
    (_id, _pagina, _index, ejemplo) => {
      const veredicto = verificarEjemplo(ejemplo);
      if (!veredicto.ok) throw new Error(veredicto.detalle);
      expect(veredicto.ok).toBe(true);
    },
  );

  it('registra el apartamiento cuando la diapositiva se equivoca en la cuenta', () => {
    const conApartamiento = EJEMPLOS_UNIDAD_04.filter((ejemplo) => ejemplo.apartamiento);

    // En U04-F08 (pág. 33), la diapositiva dice Rd = 20% cuando la cuenta da 18,9% (18,87%).
    expect(conApartamiento).toHaveLength(1);
    expect(conApartamiento[0].formulaId).toBe('U04-F08');
    expect(conApartamiento[0].esperado).toEqual({ valor: 18.9, multiplo: '' });
    expect(conApartamiento[0].apartamiento).toMatch(/20%/);
  });

  it('carga las 16 fórmulas de la Unidad 4', () => {
    expect(FORMULAS_UNIDAD_04).toHaveLength(16);
  });
});


