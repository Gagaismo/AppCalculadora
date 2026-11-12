/**
 * Jest sólo para la verificación del diagnóstico y el guía.
 *
 * Reusa la configuración de `package.json` (preset `jest-expo`, dobles de prueba,
 * alias `@/`) pero busca únicamente los `*.verif.ts(x)` de esta carpeta: así
 * `npm test` no los corre y sus 124.000 casos no alargan la suite del proyecto.
 */
const base = require('../../package.json').jest;

module.exports = {
  ...base,
  rootDir: '../..',
  roots: ['<rootDir>/verificacion/diagnostico-guia'],
  testMatch: ['**/*.verif.ts?(x)'],
};
