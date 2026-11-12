import type { EntradaCargada, Formula } from '@/dominio/formula';
import { calcular } from '@/dominio/motor';
import { aCanonico, conMultiplo, type Multiplo } from '@/dominio/multiplos';
import { formatearNumero, parsearEntrada } from '@/screens/formula/numeros';

/**
 * El diagnóstico de lo que hay cargado en la pantalla de una Fórmula.
 *
 * Es función pura y vive aparte de la pantalla porque lo leen dos: la pantalla, que
 * muestra el mensaje, y el guía, que reacciona al estado. Si cada uno lo calculara
 * por su cuenta, el guía podría retar por un error que la pantalla no muestra.
 *
 * - `vacia`: no hay nada cargado todavía. No es un error, pero el mensaje es el mismo
 *   que el de `faltantes`, porque es lo que la pantalla ya mostraba.
 * - `no-numerica`: algún campo no es un número; `simbolos` dice cuáles.
 * - `faltantes`: hay algo cargado pero falta alguna Variable; `simbolos` dice cuáles.
 * - `no-definido`: los valores están, pero la Fórmula no da un resultado finito.
 * - `desconocida`: la Fórmula no está en el registro.
 * - `exito`: hay resultado; `valorCanonico` lo trae en la unidad canónica.
 */
export type EstadoDiagnostico =
  | 'vacia'
  | 'no-numerica'
  | 'faltantes'
  | 'no-definido'
  | 'desconocida'
  | 'exito';

export interface Diagnostico {
  readonly estado: EstadoDiagnostico;
  /** Los campos a los que hay que mirar: los no numéricos o los faltantes. */
  readonly simbolos: readonly string[];
  readonly mensaje: string;
  readonly valorCanonico: number | null;
}

export function diagnosticar(
  formula: Formula,
  textos: Readonly<Record<string, readonly string[]>>,
  multiplos: Readonly<Record<string, Multiplo>>,
): Diagnostico {
  const noNumericos: string[] = [];
  const entradas: Record<string, EntradaCargada> = {};
  let hayAlgoCargado = false;

  for (const variable of formula.entradas) {
    const crudos = textos[variable.simbolo] ?? [''];
    const parseadas = crudos.map(parsearEntrada);
    if (parseadas.some((e) => e.estado !== 'vacia')) hayAlgoCargado = true;

    if (parseadas.some((e) => e.estado === 'invalida')) {
      noNumericos.push(variable.simbolo);
      continue;
    }

    const cargados = parseadas.flatMap((e) => (e.estado === 'cargada' ? [e.valor] : []));
    const multiplo = multiplos[variable.simbolo];

    if (variable.esLista) {
      // Una lista vacía la resuelve el motor como Variable faltante, que es lo
      // correcto: sumar sobre nada daría cero, un resultado plausible y equivocado.
      entradas[variable.simbolo] = { valores: cargados, multiplo };
    } else if (cargados.length > 0) {
      entradas[variable.simbolo] = { valor: cargados[0], multiplo };
    }
  }

  if (noNumericos.length > 0) {
    return {
      estado: 'no-numerica',
      simbolos: noNumericos,
      mensaje:
        noNumericos.length === 1
          ? `Entrada no numérica en ${noNumericos[0]}`
          : `Entrada no numérica en: ${noNumericos.join(', ')}`,
      valorCanonico: null,
    };
  }

  const resultado = calcular(formula.id, entradas);
  if (resultado.ok) {
    return {
      estado: 'exito',
      simbolos: [],
      mensaje: `${formatearNumero(resultado.valor)} ${conMultiplo(resultado.multiplo, resultado.unidadDeMedida)}`,
      valorCanonico: aCanonico(resultado.valor, resultado.multiplo),
    };
  }

  switch (resultado.error.tipo) {
    case 'variables-faltantes': {
      const simbolos = resultado.error.simbolos;
      return {
        estado: hayAlgoCargado ? 'faltantes' : 'vacia',
        simbolos,
        mensaje:
          simbolos.length === 1 ? `Falta: ${simbolos[0]}` : `Faltan: ${simbolos.join(', ')}`,
        valorCanonico: null,
      };
    }
    case 'calculo-no-definido':
      return {
        estado: 'no-definido',
        simbolos: [],
        mensaje: resultado.error.motivo,
        valorCanonico: null,
      };
    case 'formula-desconocida':
      return {
        estado: 'desconocida',
        simbolos: [],
        mensaje: `Fórmula desconocida: ${resultado.error.id}`,
        valorCanonico: null,
      };
  }
}
