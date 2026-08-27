import { verificarEjemplo } from '@/dominio/pruebas';

import { EJEMPLOS_UNIDAD_04 } from './unidad-04';

/**
 * Los Ejemplos resueltos de la cátedra, corridos contra el motor.
 *
 * `U04-F06` es la primera Fórmula con una Variable de lista, así que estos cuatro
 * casos son además la prueba de que el camino de lista funciona de punta a punta.
 */

describe('Unidad 4 — Ejemplos resueltos', () => {
  it.each(EJEMPLOS_UNIDAD_04.map((ejemplo) => [ejemplo.pagina, ejemplo] as const))(
    'U04-F06 reproduce el resultado de la diapositiva (pág. %s)',
    (_pagina, ejemplo) => {
      const veredicto = verificarEjemplo(ejemplo);
      if (!veredicto.ok) throw new Error(veredicto.detalle);
      expect(veredicto.ok).toBe(true);
    },
  );

  it('cubre los cuatro Ejemplos resueltos que la cátedra publica para la entropía', () => {
    expect(EJEMPLOS_UNIDAD_04).toHaveLength(4);
  });
});
