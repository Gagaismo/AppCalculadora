/**
 * Pre-renderiza las expresiones LaTeX de las Fórmulas a SVG.
 *
 * Corre una vez, en el equipo de desarrollo, y deja el resultado escrito en
 * `src/formulas/expresiones-generadas.ts`. La aplicación no ejecuta MathJax: dibuja
 * SVG estático. Eso es deliberado —lo que el tribunal ve en el teléfono es
 * exactamente lo que MathJax produjo acá, sin una capa que pueda fallar en vivo— y
 * además es lo único que permite mostrar notación en una lista de 29 Fórmulas sin
 * que el scroll se arrastre.
 *
 *     npm run expresiones
 *
 * Si alguna expresión tiene un error de TeX, el script **falla y las nombra**. Una
 * expresión rota que se emite igual aparecería en pantalla como un hueco, y un hueco
 * en la fórmula es peor que el texto plano que estamos reemplazando.
 */

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { mathjax } from '@mathjax/src/mjs/mathjax.js';
import { TeX } from '@mathjax/src/mjs/input/tex.js';
import { SVG } from '@mathjax/src/mjs/output/svg.js';
import { liteAdaptor } from '@mathjax/src/mjs/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from '@mathjax/src/mjs/handlers/html.js';
import { MathJaxNewcmFont } from '@mathjax/mathjax-newcm-font/mjs/svg.js';

// Cada paquete de TeX se registra al importarse. `ams` es el que trae \begin{cases},
// \dfrac y \text, que el catálogo usa; `newcommand` y `configmacros` son baratos y
// evitan que una macro suelta del catálogo tire todo abajo.
import '@mathjax/src/mjs/input/tex/base/BaseConfiguration.js';
import '@mathjax/src/mjs/input/tex/ams/AmsConfiguration.js';
import '@mathjax/src/mjs/input/tex/newcommand/NewcommandConfiguration.js';
import '@mathjax/src/mjs/input/tex/configmacros/ConfigMacrosConfiguration.js';

const PAQUETES = ['base', 'ams', 'newcommand', 'configmacros'];

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const DESTINO = join(raiz, 'src', 'formulas', 'expresiones-generadas.ts');

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const documento = mathjax.document('', {
  InputJax: new TeX({ packages: PAQUETES }),
  // `fontCache: 'none'` repite las definiciones de glifo en cada SVG en vez de
  // referenciarlas con <use>. Pesa más, pero cada expresión queda autocontenida:
  // react-native-svg dibuja cada una por separado y no comparte un <defs> global.
  OutputJax: new SVG({ fontCache: 'none', font: new MathJaxNewcmFont() }),
});

/** Dibuja una expresión. Devuelve el SVG y sus proporciones, o el error de TeX. */
function renderizar(latex) {
  const nodo = documento.convert(latex, { display: true });
  const svg = adaptor.innerHTML(nodo);

  if (/data-mjx-error|<merror/.test(svg)) {
    const motivo = svg.match(/data-mjx-error="([^"]*)"/);
    return { error: motivo ? motivo[1] : 'expresión LaTeX inválida' };
  }

  // El ancho y el alto vienen en `ex`, la unidad tipográfica de MathJax. Se guardan
  // como proporción para que la pantalla elija el tamaño y la expresión escale sola.
  const ancho = svg.match(/width="([\d.]+)ex"/);
  const alto = svg.match(/height="([\d.]+)ex"/);
  if (!ancho || !alto) {
    return { error: 'MathJax no devolvió dimensiones' };
  }

  return {
    svg,
    anchoEx: Number(ancho[1]),
    altoEx: Number(alto[1]),
  };
}

const { FORMULAS } = await import('../src/formulas/index.ts');

const generadas = [];
const fallidas = [];
let sinLatex = 0;

for (const formula of FORMULAS) {
  if (!formula.expresionLatex) {
    sinLatex += 1;
    continue;
  }

  const resultado = renderizar(formula.expresionLatex);
  if (resultado.error) {
    fallidas.push({ id: formula.id, latex: formula.expresionLatex, motivo: resultado.error });
    continue;
  }
  generadas.push({ id: formula.id, ...resultado });
}

if (fallidas.length > 0) {
  console.error(`\n${fallidas.length} expresión(es) con error de TeX:\n`);
  for (const f of fallidas) {
    console.error(`  ${f.id}  ${f.motivo}`);
    console.error(`     ${f.latex}\n`);
  }
  process.exit(1);
}

const contenido = `/**
 * Expresiones matemáticas pre-renderizadas. **Archivo generado: no se edita a mano.**
 *
 * Lo produce \`npm run expresiones\` a partir del campo \`expresionLatex\` de cada
 * Fórmula. Para cambiar una expresión hay que cambiar su LaTeX en
 * \`src/formulas/unidad-N.ts\` y volver a correr el script.
 */

export interface ExpresionRenderizada {
  readonly svg: string;
  /** Ancho y alto en \`ex\`, la unidad tipográfica de MathJax: definen la proporción. */
  readonly anchoEx: number;
  readonly altoEx: number;
}

export const EXPRESIONES: Readonly<Record<string, ExpresionRenderizada>> = {
${generadas
  .map(
    (e) =>
      `  ${JSON.stringify(e.id)}: {\n    anchoEx: ${e.anchoEx},\n    altoEx: ${e.altoEx},\n    svg: ${JSON.stringify(e.svg)},\n  },`,
  )
  .join('\n')}
};
`;

writeFileSync(DESTINO, contenido, 'utf8');

const pesoKb = (contenido.length / 1024).toFixed(0);
console.log(`${generadas.length} expresiones renderizadas → ${DESTINO} (${pesoKb} KB)`);
if (sinLatex > 0) {
  console.log(`${sinLatex} Fórmula(s) todavía sin \`expresionLatex\`; muestran el texto plano.`);
}
