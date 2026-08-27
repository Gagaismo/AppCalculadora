import { buscarFormula } from '@/formulas';

import type { ValorCargado } from './formula';
import { aCanonico, desdeCanonico, elegirMultiplo, type Multiplo } from './multiplos';

/**
 * El motor de cálculo.
 *
 * Es el seam principal del proyecto: recibe los valores tal como los carga quien usa
 * la app —número más múltiplo, sin convertir— y devuelve el resultado ya escalado.
 *
 * Está deliberadamente por encima de la conversión de múltiplos. Un test que entra
 * por acá verifica la fórmula y la conversión a la vez, que es justo lo que hace
 * falta: el error de múltiplo no da ningún síntoma por sí solo.
 */

export type Entradas = Readonly<Record<string, ValorCargado>>;

export type ErrorDeCalculo =
  | { readonly tipo: 'formula-desconocida'; readonly id: string }
  | { readonly tipo: 'variables-faltantes'; readonly simbolos: readonly string[] }
  | { readonly tipo: 'calculo-no-definido'; readonly motivo: string };

export type Resultado =
  | {
      readonly ok: true;
      readonly valor: number;
      readonly unidadDeMedida: string;
      readonly multiplo: Multiplo;
    }
  | { readonly ok: false; readonly error: ErrorDeCalculo };

export function calcular(idFormula: string, entradas: Entradas): Resultado {
  const formula = buscarFormula(idFormula);
  if (!formula) {
    return { ok: false, error: { tipo: 'formula-desconocida', id: idFormula } };
  }

  const faltantes = formula.entradas
    .filter((variable) => entradas[variable.simbolo] === undefined)
    .map((variable) => variable.simbolo);
  if (faltantes.length > 0) {
    return { ok: false, error: { tipo: 'variables-faltantes', simbolos: faltantes } };
  }

  const valores: Record<string, number> = {};
  for (const variable of formula.entradas) {
    const cargado = entradas[variable.simbolo];
    valores[variable.simbolo] = aCanonico(cargado.valor, cargado.multiplo);
  }

  const canonico = formula.calcular(valores);
  if (!Number.isFinite(canonico)) {
    return {
      ok: false,
      error: {
        tipo: 'calculo-no-definido',
        motivo: 'La fórmula no está definida para los valores cargados.',
      },
    };
  }

  const multiplo = elegirMultiplo(canonico);
  return {
    ok: true,
    valor: desdeCanonico(canonico, multiplo),
    unidadDeMedida: formula.salida.unidadDeMedida,
    multiplo,
  };
}
