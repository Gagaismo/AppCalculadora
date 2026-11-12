import type { Formula } from '@/dominio/formula';

import type { NombreAnimacion } from './animaciones';
import type { Diagnostico } from './diagnostico';

/** Lo que hace y dice el guía: una animación y una línea corta que entre en el globo. */
export interface Frase {
  readonly animacion: NombreAnimacion;
  readonly texto: string;
}

/** «a», «a y b», «a, b y c». */
function enumerar(simbolos: readonly string[]): string {
  if (simbolos.length <= 1) return simbolos.join('');
  return `${simbolos.slice(0, -1).join(', ')} y ${simbolos[simbolos.length - 1]}`;
}

/**
 * Qué dice el guía según el diagnóstico de la pantalla de Fórmula.
 *
 * Es copia de interfaz, nada más: los mensajes de la pantalla siguen siendo los del
 * diagnóstico y no cambian. El tono es el de un profe exigente pero cariñoso, que
 * reta y dice dónde mirar sin burlarse.
 */
export function fraseDelGuia(diagnostico: Diagnostico, formula: Formula): Frase {
  const { simbolos } = diagnostico;
  const varios = simbolos.length > 1;

  switch (diagnostico.estado) {
    case 'vacia':
      return {
        animacion: 'hablando',
        texto: 'Cargá todas las variables menos la de salida y te digo cuánto da.',
      };
    case 'no-numerica':
      return {
        animacion: 'retando',
        texto: `¡Eso no es un número! Mirá ${varios ? 'los campos' : 'el campo'} ${enumerar(simbolos)}.`,
      };
    case 'faltantes':
      return {
        animacion: 'senalando',
        texto: `Te falta cargar ${enumerar(simbolos)}. Fijate ${varios ? 'esos campos' : 'ese campo'}.`,
      };
    case 'no-definido':
      return {
        animacion: 'confundido',
        texto:
          formula.condiciones.trim() === ''
            ? 'Con esos valores la fórmula no da. Revisá los valores que cargaste.'
            : 'Con esos valores la fórmula no da. Revisá las condiciones de la fórmula.',
      };
    case 'desconocida':
      return {
        animacion: 'confundido',
        texto: 'Uy, esta fórmula no la conozco. Volvé a la lista y elegí otra.',
      };
    case 'exito':
      return { animacion: 'festejando', texto: `¡Muy bien! Eso da ${diagnostico.mensaje}.` };
  }
}
