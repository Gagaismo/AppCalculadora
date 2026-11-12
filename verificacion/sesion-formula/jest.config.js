/**
 * Jest sólo para las repeticiones de los contraejemplos de esta carpeta sobre el código
 * real. Reusa la configuración de `package.json` pero busca únicamente los
 * `*.verif.ts(x)` de acá: así `npm test` no los corre y los hallazgos abiertos no
 * rompen la suite del proyecto.
 */
const base = require('../../package.json').jest;

module.exports = {
  ...base,
  rootDir: '../..',
  roots: ['<rootDir>/verificacion/sesion-formula'],
  testMatch: ['**/*.verif.ts?(x)'],
};
