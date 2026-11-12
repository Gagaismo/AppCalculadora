import type { Formula } from '@/dominio/formula';
import { buscarFormula } from '@/formulas';

import type { Diagnostico, EstadoDiagnostico } from './diagnostico';
import { fraseDelGuia } from './frases';

/**
 * Tests de lo que dice el guía.
 *
 * Un test por estado del diagnóstico, con las frases afirmadas textuales: son
 * copia de interfaz y el globo es chico, así que un cambio de frase tiene que verse.
 */

const formula = buscarFormula('U10-F08')!;

function diagnostico(
  estado: EstadoDiagnostico,
  simbolos: readonly string[] = [],
  mensaje = '',
): Diagnostico {
  return { estado, simbolos, mensaje, valorCanonico: null };
}

describe('fraseDelGuia', () => {
  it('con todo vacío da la bienvenida y explica cómo se usa', () => {
    expect(fraseDelGuia(diagnostico('vacia', ['BW', 'N_FFT']), formula)).toEqual({
      animacion: 'hablando',
      texto: 'Cargá todas las variables menos la de salida y te digo cuánto da.',
    });
  });

  it('con un campo no numérico reta y nombra el campo', () => {
    expect(fraseDelGuia(diagnostico('no-numerica', ['f_inf']), formula)).toEqual({
      animacion: 'retando',
      texto: '¡Eso no es un número! Mirá el campo f_inf.',
    });
  });

  it('con varios campos no numéricos reta y los nombra a todos', () => {
    expect(fraseDelGuia(diagnostico('no-numerica', ['f_sup', 'f_inf']), formula)).toEqual({
      animacion: 'retando',
      texto: '¡Eso no es un número! Mirá los campos f_sup y f_inf.',
    });
  });

  it('con una Variable faltante la señala', () => {
    expect(fraseDelGuia(diagnostico('faltantes', ['N_FFT']), formula)).toEqual({
      animacion: 'senalando',
      texto: 'Te falta cargar N_FFT. Fijate ese campo.',
    });
  });

  it('con varias Variables faltantes las señala a todas', () => {
    expect(fraseDelGuia(diagnostico('faltantes', ['a', 'b', 'c']), formula)).toEqual({
      animacion: 'senalando',
      texto: 'Te falta cargar a, b y c. Fijate esos campos.',
    });
  });

  it('cuando la fórmula no da, remite a las condiciones', () => {
    expect(fraseDelGuia(diagnostico('no-definido'), formula)).toEqual({
      animacion: 'confundido',
      texto: 'Con esos valores la fórmula no da. Revisá las condiciones de la fórmula.',
    });
  });

  it('cuando la fórmula no da y no tiene condiciones, remite a los valores', () => {
    const sinCondiciones: Formula = { ...formula, condiciones: '' };
    expect(fraseDelGuia(diagnostico('no-definido'), sinCondiciones)).toEqual({
      animacion: 'confundido',
      texto: 'Con esos valores la fórmula no da. Revisá los valores que cargaste.',
    });
  });

  it('con una Fórmula desconocida se confunde', () => {
    expect(fraseDelGuia(diagnostico('desconocida'), formula)).toEqual({
      animacion: 'confundido',
      texto: 'Uy, esta fórmula no la conozco. Volvé a la lista y elegí otra.',
    });
  });

  it('con resultado festeja y dice cuánto da', () => {
    expect(fraseDelGuia(diagnostico('exito', [], '83,5 MHz'), formula)).toEqual({
      animacion: 'festejando',
      texto: '¡Muy bien! Eso da 83,5 MHz.',
    });
  });
});
