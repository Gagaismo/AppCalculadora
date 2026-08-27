import { verificarEjemplo } from '@/dominio/pruebas';

import { EJEMPLOS_UNIDAD_06 } from './unidad-06';

/**
 * Los Ejemplos resueltos de la cátedra, corridos contra el motor.
 *
 * Esto es lo que prueba que la transcripción de la Fórmula es correcta. Una Fórmula
 * sin su Ejemplo resuelto verificando no está terminada.
 */

describe('Unidad 6 — Ejemplos resueltos', () => {
  it.each(
    EJEMPLOS_UNIDAD_06.map((ejemplo, index) => [
      `${ejemplo.formulaId} (ejemplo #${index + 1}, pág. ${ejemplo.pagina})`,
      ejemplo,
    ] as const),
  )('%s reproduce el resultado de la diapositiva', (_nombre, ejemplo) => {
    const veredicto = verificarEjemplo(ejemplo);
    if (!veredicto.ok) throw new Error(veredicto.detalle);
    expect(veredicto.ok).toBe(true);
  });

  it('cubre los 20 casos de prueba de los Ejemplos resueltos de las fórmulas cargadas', () => {
    expect(EJEMPLOS_UNIDAD_06).toHaveLength(20);
  });
});
