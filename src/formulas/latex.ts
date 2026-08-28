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
  // Éstas no son magnitudes con un campo debajo: son el rótulo de la notación que la
  // ficha explica. `E_b/N_0` sí es una entrada, pero su barra es parte del nombre de
  // la relación y en LaTeX se escribe como fracción. Se buscan sobre el LaTeX crudo
  // porque el caret, las barras y la fracción no sobreviven a la normalización.
  'e^(±jθ)': ['e^{\\pm j\\theta}'],
  '|F(f)|²': ['|F(f)|^2'],
  'E_b/N_0': ['E_b/N_0', '\\frac{E_b}{N_0}'],
  'Σ P_i': ['\\sum_{i=1}^{N} P_i'],
};

/**
 * `\bar{L}` es el símbolo `L̄` que declara el código: la barra de promedio se escribe
 * como comando en LaTeX y como acento combinante (U+0304) en la cadena.
 */
const BARRA = /\\bar\{([^}]*)\}/g;
const COMBINANTE_BARRA = '̄';

/** Las letras del alfabeto griego que el código usa como símbolos. */
const GRIEGAS_SUELTAS = /[αβγδΔεηθλµπρσΣτφωΩ]/;

/** Un identificador: letra inicial, después letras, dígitos, guion bajo, coma o barra. */
const IDENTIFICADOR = /[A-Za-zαβγδΔεηθλµπρσΣτφωΩ][A-Za-z0-9_,̄αβγδΔεηθλµπρσΣτφωΩ°]*/g;

/** Una llamada a función con un solo argumento simple: `f(t)`, `F(ω)`, `sinc(x)`. */
const LLAMADA = /([A-Za-zαβγδΔεηθλµπρσΣτφωΩ][A-Za-z0-9_αβγδΔεηθλµπρσΣτφωΩ]*)\s*\(\s*([A-Za-zαβγδΔεηθλµπρσΣτφωΩ][A-Za-z0-9_αβγδΔεηθλµπρσΣτφωΩ]*)\s*\)/g;

/** Normaliza la expresión y devuelve los identificadores que menciona. */
export function simbolosDeLatex(latex: string): string[] {
  let texto = latex;

  for (const comando of RUIDO) {
    texto = texto.split(comando).join(' ');
  }

  // `\mathrm{sinc}` sí es un símbolo declarado, así que el nombre se conserva cuando
  // es una palabra suelta. `\text{real (}` es prosa y se borra entera.
  texto = texto.replace(/\\(?:mathrm|text|operatorname)\{([^}]*)\}/g, (_, dentro) =>
    /^[A-Za-z]+$/.test(dentro) ? ` ${dentro} ` : ' ',
  );

  // `\bar{L}` → `L̄`, antes de las griegas para que `\bar{\sigma}` llegue a `σ̄`.
  texto = texto.replace(BARRA, (_, dentro) => `${dentro}${COMBINANTE_BARRA}`);

  for (const [comando, letra] of Object.entries(GRIEGAS)) {
    // Si la letra griega está seguida de espacio y luego letra (ej: \Delta f), unirlos en un solo identificador (Δf)
    texto = texto.replace(new RegExp(`\\${comando}\\s*(?=[a-zA-Z])`, 'g'), letra);
    // La frontera evita que `\pi` se coma el `\pim` de un comando más largo.
    texto = texto.replace(new RegExp(`\\${comando}(?![a-zA-Z])`, 'g'), letra);
  }

  // `T_{muestreo}` y `f_{sup}` son `T_muestreo` y `f_sup` en el código; `B_{M-ario}`
  // es `B_M_ario`, porque el código escribe con `_` el guion de un nombre compuesto.
  texto = texto.replace(/_\{([^}]*)\}/g, (_, dentro) => `_${dentro.replace(/-/g, '_')}`);

  // Lo que queda de `\frac`, `\le`, `\times`… ya no es un símbolo.
  texto = texto.replace(/\\[a-zA-Z]+/g, ' ');

  const encontrados = texto.match(IDENTIFICADOR) ?? [];
  const conjunto = new Set(encontrados);

  // La Unidad 2 nombra sus señales como funciones —`f(t)`, `F(ω)`, `sinc(x)`— y así
  // las declara el código. Se agregan además de sus partes, no en lugar de ellas: en
  // `sen(2πf t + θ)` los símbolos que importan son los de adentro.
  for (const [, nombre, argumento] of texto.matchAll(LLAMADA)) {
    conjunto.add(`${nombre}(${argumento})`);
  }

  // Una griega pegada a un identificador se lee de las dos maneras: `Delta f` es el
  // símbolo `Δf`, pero `2pi f_p` es `π` multiplicando a `f_p`. Sin las dos lecturas
  // una de las dos Fórmulas queda sin poder demostrar que nombra sus campos.
  for (const token of encontrados) {
    const resto = token.slice(1);
    if (GRIEGAS_SUELTAS.test(token[0]) && resto.length > 0) {
      conjunto.add(resto);
    }
  }

  // Un alias declarado cuenta como presente si su forma LaTeX está en la expresión.
  for (const [codigo, formas] of Object.entries(ALIAS)) {
    if (formas.some((forma) => texto.includes(forma) || latex.includes(forma))) {
      conjunto.add(codigo);
    }
  }

  return [...conjunto];
}
