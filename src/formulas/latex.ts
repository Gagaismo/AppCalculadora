/**
 * Extrae de una expresión LaTeX los símbolos que menciona, escritos como los escribe
 * el código.
 *
 * Existe para un solo uso: que `latex.test.ts` pueda comprobar que la expresión que se
 * dibuja y los campos que se cargan debajo hablan de las mismas magnitudes. No es un
 * parser de LaTeX ni pretende serlo —le alcanza con reconocer identificadores.
 */

/** Las letras griegas que aparecen en el catálogo, con el carácter que usa el código. */
const GRIEGAS: Readonly<Record<string, string>> = {
  '\\alpha': 'α',
  '\\beta': 'β',
  '\\gamma': 'γ',
  '\\delta': 'δ',
  '\\Delta': 'Δ',
  '\\epsilon': 'ε',
  '\\eta': 'η',
  '\\theta': 'θ',
  '\\lambda': 'λ',
  '\\mu': 'µ',
  '\\pi': 'π',
  '\\rho': 'ρ',
  '\\sigma': 'σ',
  '\\Sigma': 'Σ',
  '\\tau': 'τ',
  '\\phi': 'φ',
  '\\omega': 'ω',
  '\\Omega': 'Ω',
};

/**
 * Comandos que no aportan un símbolo: separaciones, delimitadores, envoltorios.
 * Se borran antes de buscar identificadores para que no ensucien el resultado.
 */
const RUIDO = [
  '\\left',
  '\\right',
  '\\displaystyle',
  '\\limits',
  '\\quad',
  '\\qquad',
  '\\,',
  '\\;',
  '\\:',
  '\\!',
  '\\ ',
];

/**
 * Alias aceptados: el código escribe una cosa y el LaTeX, legítimamente, otra.
 *
 * Es una lista corta y **su único destino es no crecer**. Cada entrada es una
 * excepción que alguien tuvo que justificar; si aparece una nueva, la pregunta es
 * primero si el símbolo del código no debería cambiar.
 */
const ALIAS: Readonly<Record<string, readonly string[]>> = {
  // `Δf` es la desviación de frecuencia en FSK (U08-F08a y U08-F08b). El código no
  // puede usar `Δf` como clave sin que las llamadas a `calcular` queden ilegibles.
  delta_f: ['Δf'],
};

/** Normaliza la expresión y devuelve los identificadores que menciona. */
export function simbolosDeLatex(latex: string): string[] {
  let texto = latex;

  for (const comando of RUIDO) {
    texto = texto.split(comando).join(' ');
  }

  // `\mathrm{sen}` y `\text{impar}` son prosa dentro de la fórmula, no símbolos.
  texto = texto.replace(/\\(?:mathrm|text|operatorname)\{[^}]*\}/g, ' ');

  for (const [comando, letra] of Object.entries(GRIEGAS)) {
    // Si la letra griega está seguida de espacio y luego letra (ej: \Delta f), unirlos en un solo identificador (Δf)
    texto = texto.replace(new RegExp(`\\${comando}\\s*(?=[a-zA-Z])`, 'g'), letra);
    // La frontera evita que `\pi` se coma el `\pim` de un comando más largo.
    texto = texto.replace(new RegExp(`\\${comando}(?![a-zA-Z])`, 'g'), letra);
  }

  // `T_{muestreo}` y `f_{sup}` son `T_muestreo` y `f_sup` en el código.
  texto = texto.replace(/_\{([^}]*)\}/g, '_$1');

  // Lo que queda de `\frac`, `\le`, `\times`… ya no es un símbolo.
  texto = texto.replace(/\\[a-zA-Z]+/g, ' ');

  const encontrados = texto.match(/[A-Za-zαβγδΔεηθλµπρσΣτφωΩ][A-Za-z0-9_,αβγδΔεηθλµπρσΣτφωΩ°]*/g) ?? [];
  const conjunto = new Set(encontrados);

  // Un alias declarado cuenta como presente si su forma LaTeX está en la expresión.
  for (const [codigo, formas] of Object.entries(ALIAS)) {
    if (formas.some((forma) => texto.includes(forma))) {
      conjunto.add(codigo);
    }
  }

  return [...conjunto];
}
