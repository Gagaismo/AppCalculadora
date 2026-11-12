/**
 * Jest sólo para la verificación de la gráfica interactiva.
 *
 * Reusa la configuración de `package.json` (preset `jest-expo`, dobles de prueba,
 * alias `@/`) pero busca únicamente los `*.verif.ts(x)` de esta carpeta: así
 * `npm test` no los corre y los hallazgos abiertos no rompen la suite del proyecto.
 */
const base = require('../../package.json').jest;

module.exports = {
  ...base,
  rootDir: '../..',
  roots: ['<rootDir>/verificacion/grafica-interactiva'],
  testMatch: ['**/*.verif.ts?(x)'],
};
