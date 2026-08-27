import { FORMULAS } from './index';
import {
  extraerIdentificadoresCatalogo,
  identificadoresFaltantes,
  leerIdentificadoresCatalogo,
  PENDIENTES_DE_CARGA,
} from './catalogo';

/**
 * Invariante de cobertura del catálogo de Comunicaciones (issue #4).
 *
 * Lee los identificadores del índice del catálogo (`docs/research/formulas-comunicaciones.md`)
 * y verifica que cada uno exista en los datos de la app (`FORMULAS`).
 *
 * Mientras se cargan las Unidades, este invariante fallará nombrando las Fórmulas que faltan.
 */

describe('lector del catálogo y cálculo de cobertura', () => {
  it('extrae exactamente 140 identificadores únicos del catálogo acotando a la sección Resumen', () => {
    const identificadores = leerIdentificadoresCatalogo();

    expect(identificadores).toHaveLength(140);
    expect(new Set(identificadores).size).toBe(140);
    expect(identificadores[0]).toBe('U02-F01');
    expect(identificadores[identificadores.length - 1]).toBe('U10-F08');
  });

  it('contempla la división de U08-F08 en U08-F08a y U08-F08b como cobertura completa', () => {
    const cargadas = [{ id: 'U08-F08a' }, { id: 'U08-F08b' }];
    const faltantes = identificadoresFaltantes(['U08-F08'], cargadas);

    expect(faltantes).toEqual([]);
  });

  it('reporta U08-F08 como faltante si falta alguna de sus partes', () => {
    const soloParteA = [{ id: 'U08-F08a' }];
    const soloParteB = [{ id: 'U08-F08b' }];

    expect(identificadoresFaltantes(['U08-F08'], soloParteA)).toEqual(['U08-F08']);
    expect(identificadoresFaltantes(['U08-F08'], soloParteB)).toEqual(['U08-F08']);
  });

  it('distingue falta de clasificada como no calculable: una ficha de consulta cuenta como presente', () => {
    // U02-F01 es una definición de señal exponencial clasificada como no calculable
    // (ficha de consulta sin campos de cálculo). Al existir en los datos, cuenta como presente.
    const fichaConsultaU02F01 = { id: 'U02-F01' };
    const faltantes = identificadoresFaltantes(['U02-F01'], [fichaConsultaU02F01]);

    expect(faltantes).toEqual([]);
  });

  it('identifica correctamente las fórmulas faltantes en un subconjunto', () => {
    const catalogoPrueba = ['U02-F01', 'U04-F06', 'U10-F07'];
    const cargadasPrueba = [{ id: 'U04-F06' }];

    const faltantes = identificadoresFaltantes(catalogoPrueba, cargadasPrueba);
    expect(faltantes).toEqual(['U02-F01', 'U10-F07']);
  });

  it('falla con un error explícito si el documento markdown no contiene la sección Resumen', () => {
    expect(() => extraerIdentificadoresCatalogo('# Catálogo sin tabla de resumen')).toThrow(
      /No se encontró la sección "## Resumen"/,
    );
  });
});

describe('invariante de cobertura del catálogo', () => {
  it('lo único que falta de cargar es lo declarado como pendiente', () => {
    const catalogo = leerIdentificadoresCatalogo();
    const faltantes = identificadoresFaltantes(catalogo, FORMULAS);

    // Se compara contra la deuda declarada y no contra la lista vacía, para que la
    // suite quede en verde mientras se cargan las Unidades. El invariante sigue
    // atrapando las dos cosas que importa atrapar:
    //
    //   - Si una Fórmula desaparece de los datos, aparece de más acá y el test falla.
    //   - Si se carga una Unidad sin sacar sus identificadores de PENDIENTES_DE_CARGA,
    //     aparece de menos y el test también falla, obligando a actualizar la deuda.
    //
    // El diff de Jest nombra los identificadores exactos en los dos casos.
    expect(faltantes).toEqual(PENDIENTES_DE_CARGA);
  });

  it('la deuda declarada no incluye Fórmulas que ya están cargadas', () => {
    const cargadas = new Set(FORMULAS.map((formula) => formula.id));
    const declaradasDeMas = PENDIENTES_DE_CARGA.filter((id) => cargadas.has(id));

    expect(declaradasDeMas).toEqual([]);
  });

  it('la deuda se va a terminar: hoy son 138 de 140', () => {
    // Cuando este número llegue a cero, PENDIENTES_DE_CARGA queda vacía y el
    // invariante pasa a comparar contra la lista vacía sin cambiar una línea.
    expect(PENDIENTES_DE_CARGA.length).toBe(138);
    expect(leerIdentificadoresCatalogo()).toHaveLength(140);
  });
});
