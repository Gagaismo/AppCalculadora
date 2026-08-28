import { FORMULAS } from './index';
import { simbolosDeLatex } from './latex';

/**
 * El invariante de la transcripción LaTeX.
 *
 * La expresión se dibuja justo encima de los campos de entrada. Si arriba dice `σ` y
 * el campo de abajo se rotula `T_s`, la app le está mostrando a quien la usa dos
 * nombres para la misma magnitud, en la única pantalla donde no puede permitírselo.
 *
 * El catálogo trae el LaTeX de la fuente; `observaciones-resueltas.md` ya decidió,
 * para varias Fórmulas, llamar a las cosas de otra manera. Este test es lo que impide
 * que la transcripción se olvide de aplicar la segunda.
 *
 * Lo que **no** puede verificar: si el LaTeX dice lo que la fuente quiso decir. Que
 * los símbolos liguen no prueba que el signo sea correcto — `U02-F19` pasaría con la
 * errata de la lámina 46 puesta. Para eso está la tabla de
 * `docs/research/latex-transcripcion.md`, revisada a mano.
 */
describe('expresionLatex', () => {
  const conLatex = FORMULAS.filter((f) => f.expresionLatex !== undefined);

  it('hay al menos una Fórmula con expresión LaTeX cargada', () => {
    expect(conLatex.length).toBeGreaterThan(0);
  });

  describe.each(conLatex.map((f) => [f.id, f] as const))('%s', (_id, formula) => {
    const presentes = simbolosDeLatex(formula.expresionLatex!);
    const declarados = [
      ...formula.entradas.map((v) => [v.simbolo, v.esLista === true] as const),
      [formula.salida.simbolo, false] as const,
    ];

    it.each(declarados)('declara «%s» y la expresión lo usa', (simbolo, esLista) => {
      // Un campo de lista se rotula `P`, pero adentro de una sumatoria la notación que
      // corresponde es `P_i`: el subíndice es el término que se suma, no otra magnitud.
      const ligado =
        presentes.includes(simbolo) ||
        (esLista && presentes.some((p) => p.startsWith(`${simbolo}_`)));

      expect(ligado).toBe(true);
    });
  });

  it('ninguna expresión LaTeX quedó vacía', () => {
    for (const formula of conLatex) {
      expect(formula.expresionLatex!.trim()).not.toBe('');
    }
  });

  /**
   * El invariante tiene que morder, no sólo estar.
   *
   * Estas son las expresiones **tal como las trae el catálogo**, sin aplicar las
   * decisiones de `observaciones-resueltas.md`. Son exactamente lo que saldría de
   * copiar y pegar, y ninguna liga con los símbolos que la Fórmula declara.
   */
  describe('rechaza el LaTeX del catálogo sin corregir', () => {
    it.each([
      // El catálogo escribe `T_s`; la Fórmula declara `T_muestreo` para no confundirlo
      // con la duración del símbolo.
      ['U05-F13', 'T_muestreo', 'T_s = \\frac{1}{f_s}'],
      // El catálogo escribe `f_S` con ese: el código declara `f_s`, y la diferencia de
      // caja es justo la que se pierde de vista al copiar.
      ['U08-F13', 'f_s', 'T_S = \\frac{1}{f_S}'],
      // El catálogo escribe `N^{\circ}\ Fases`.
      ['U08-F10', 'N_fases', 'M \\le N^{\\circ}\\ Fases \\times N^{\\circ}\\ Amplitudes'],
      // El catálogo escribe `\sigma`, que no es un campo de la app.
      ['U05-F04', 'T_s', 'r = \\frac{1}{\\sigma} = \\frac{1}{T_S}'],
    ])('%s: el LaTeX del catálogo no menciona «%s»', (_id, simbolo, latexDelCatalogo) => {
      expect(simbolosDeLatex(latexDelCatalogo)).not.toContain(simbolo);
    });
  });
});
