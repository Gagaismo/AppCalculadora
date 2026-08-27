import { normalizarTexto } from './normalizar';

describe('normalizarTexto', () => {
  it('baja texto a minúsculas', () => {
    expect(normalizarTexto('ANCHO DE BANDA')).toBe('ancho de banda');
    expect(normalizarTexto('AB')).toBe('ab');
  });

  it('elimina tildes y diacríticos en vocales y caracteres especiales', () => {
    expect(normalizarTexto('Señal')).toBe('senal');
    expect(normalizarTexto('SEÑAL')).toBe('senal');
    expect(normalizarTexto('Fórmula')).toBe('formula');
    expect(normalizarTexto('Atenuación')).toBe('atenuacion');
    expect(normalizarTexto('Línea de transmisión')).toBe('linea de transmision');
    expect(normalizarTexto('Análisis')).toBe('analisis');
    expect(normalizarTexto('Óhmico')).toBe('ohmico');
    expect(normalizarTexto('Útil')).toBe('util');
  });

  it('elimina espacios en blanco al inicio y al final', () => {
    expect(normalizarTexto('   f_sup   ')).toBe('f_sup');
    expect(normalizarTexto('\n  ancho \t ')).toBe('ancho');
  });

  it('preserva símbolos matemáticos y guiones bajos', () => {
    expect(normalizarTexto('f_sup')).toBe('f_sup');
    expect(normalizarTexto('f_inf')).toBe('f_inf');
    expect(normalizarTexto('T_s')).toBe('t_s');
  });

  it('maneja strings vacíos o valores nulos/indefinidos', () => {
    expect(normalizarTexto('')).toBe('');
    expect(normalizarTexto('   ')).toBe('');
    expect(normalizarTexto(null)).toBe('');
    expect(normalizarTexto(undefined)).toBe('');
  });
});
