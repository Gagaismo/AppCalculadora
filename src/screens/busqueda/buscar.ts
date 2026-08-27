import type { Formula } from '@/dominio/formula';
import { FORMULAS } from '@/formulas';

import { normalizarTexto } from './normalizar';

/**
 * Comprueba si un texto fuente contiene el término de búsqueda, ignorando mayúsculas,
 * acentos y opcionalmente separadores como guiones bajos (ej. 'fsup' coincide con 'f_sup').
 */
export function coincideTexto(fuente: string, termino: string): boolean {
  const fuenteNorm = normalizarTexto(fuente);
  const terminoNorm = normalizarTexto(termino);

  if (!fuenteNorm || !terminoNorm) {
    return false;
  }

  // 1. Coincidencia directa por inclusión tras normalizar acentos y mayúsculas
  if (fuenteNorm.includes(terminoNorm)) {
    return true;
  }

  // 2. Coincidencia alfanumérica para facilitar la escritura en teclado móvil (ej. 'fsup' -> 'f_sup')
  const fuenteAlfa = fuenteNorm.replace(/[^a-z0-9]/g, '');
  const terminoAlfa = terminoNorm.replace(/[^a-z0-9]/g, '');
  if (terminoAlfa.length > 0 && fuenteAlfa.includes(terminoAlfa)) {
    return true;
  }

  return false;
}

/**
 * Busca Fórmulas en el catálogo según un término de búsqueda.
 *
 * Criterios de coincidencia:
 * - Nombre de la Fórmula (ej. 'Ancho de banda')
 * - Símbolos de las Variables de entrada (ej. 'f_sup', 'f_inf')
 * - Símbolo de la Variable de salida (ej. 'AB')
 * - Identificador de la Fórmula (ej. 'U10-F07')
 *
 * Devuelve un arreglo vacío si el término de búsqueda está vacío o contiene sólo espacios.
 */
export function buscarFormulas(
  termino: string,
  catalogo: readonly Formula[] = FORMULAS,
): readonly Formula[] {
  const terminoNorm = normalizarTexto(termino);
  if (!terminoNorm) {
    return [];
  }

  return catalogo.filter((formula) => {
    // 1. Nombre de la fórmula
    if (coincideTexto(formula.nombre, terminoNorm)) {
      return true;
    }

    // 2. Identificador de la fórmula (ej. U10-F07)
    if (coincideTexto(formula.id, terminoNorm)) {
      return true;
    }

    // 3. Símbolo de la variable de salida (ej. AB)
    if (coincideTexto(formula.salida.simbolo, terminoNorm)) {
      return true;
    }

    // 4. Símbolo de alguna variable de entrada (ej. f_sup, f_inf)
    if (formula.entradas.some((v) => coincideTexto(v.simbolo, terminoNorm))) {
      return true;
    }

    return false;
  });
}
