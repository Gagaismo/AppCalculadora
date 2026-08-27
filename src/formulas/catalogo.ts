import fs from 'fs';
import path from 'path';

/**
 * Fórmulas del catálogo que se dividen en más de una entrada en los datos de la app.
 *
 * Fuente: `docs/research/observaciones-resueltas.md`
 * - `U08-F08`: frecuencias de marca y espacio en FSK (`f_1 = f_P + Δf` y `f_2 = f_P − Δf`).
 *   La diapositiva las escribe en una sola línea pero son dos fórmulas distintas.
 */
export const FORMULAS_DIVIDIDAS: Readonly<Record<string, readonly string[]>> = {
  'U08-F08': ['U08-F08a', 'U08-F08b'],
};


/**
 * Fórmulas del catálogo que todavía **no** están cargadas en la app.
 *
 * Esta lista es una deuda declarada, y su único destino es encogerse hasta quedar
 * vacía. Cada ticket de carga de una Unidad tiene que sacar de acá los
 * identificadores que incorpora; si no lo hace, el invariante falla y avisa.
 *
 * Existe por una razón práctica: el invariante compara contra esto en vez de contra
 * la lista vacía. Un test rojo de forma permanente deja de dar señal —una falla nueva
 * y real se vuelve indistinguible del ruido de fondo— y además haría imposible pedirle
 * a nadie que `npm test` pase antes de commitear.
 */
export const PENDIENTES_DE_CARGA: readonly string[] = [
  'U02-F01', 'U02-F02', 'U02-F03', 'U02-F04', 'U02-F05', 'U02-F06',
  'U02-F07', 'U02-F08', 'U02-F09', 'U02-F10', 'U02-F11', 'U02-F12',
  'U02-F13', 'U02-F14', 'U02-F15', 'U02-F16', 'U02-F17', 'U02-F18',
  'U02-F19', 'U02-F20', 'U02-F21', 'U02-F22', 'U02-F23', 'U02-F24',
  'U02-F25', 'U02-F26', 'U02-F27', 'U02-F28', 'U02-F29', 'U03-F01',
  'U03-F02', 'U03-F03', 'U03-F04', 'U03-F05', 'U03-F06', 'U03-F07',
  'U03-F08', 'U03-F09', 'U03-F10', 'U03-F11', 'U03-F12', 'U03-F13',
  'U03-F14', 'U03-F15', 'U03-F16', 'U03-F17', 'U04-F01', 'U04-F02',
  'U04-F03', 'U04-F04', 'U04-F05', 'U04-F07', 'U04-F08', 'U04-F09',
  'U04-F10', 'U04-F11', 'U04-F12', 'U04-F13', 'U04-F14', 'U04-F15',
  'U04-F16', 'U05-F01', 'U05-F02', 'U05-F03', 'U05-F04', 'U05-F05',
  'U05-F06', 'U05-F07', 'U05-F08', 'U05-F09', 'U05-F10', 'U05-F11',
  'U05-F12', 'U05-F13', 'U05-F14', 'U05-F15', 'U05-F16', 'U05-F17',
  'U05-F18', 'U05-F19', 'U05-F20', 'U05-F21', 'U05-F22', 'U05-F23',
  'U05-F24', 'U05-F25', 'U06-F01', 'U06-F02', 'U06-F03', 'U06-F04',
  'U06-F05', 'U06-F06', 'U06-F07', 'U06-F08', 'U06-F09', 'U06-F10',
  'U06-F11', 'U07-F01', 'U07-F02', 'U07-F03', 'U07-F04', 'U08-F01',
  'U08-F02', 'U08-F03', 'U08-F04', 'U08-F05', 'U08-F06', 'U08-F07',
  'U08-F08', 'U08-F09', 'U08-F10', 'U08-F11', 'U08-F12', 'U08-F13',
  'U08-F14', 'U08-F15', 'U08-F16', 'U08-F17', 'U08-F18', 'U08-F19',
  'U08-F20', 'U08-F21', 'U09-F01', 'U09-F02', 'U09-F03', 'U09-F04',
  'U09-F05', 'U09-F06', 'U09-F07', 'U09-F08', 'U09-F09', 'U10-F01',
  'U10-F02', 'U10-F03', 'U10-F04', 'U10-F05', 'U10-F06', 'U10-F08',
];

/**
 * Ruta por defecto al catálogo de fórmulas de Comunicaciones (`formulas-comunicaciones.md`).
 */
export const RUTA_CATALOGO_POR_DEFECTO = path.resolve(
  __dirname,
  '../../docs/research/formulas-comunicaciones.md',
);

/**
 * Extrae los identificadores de fórmula de la sección `## Resumen` del catálogo en markdown.
 *
 * La búsqueda se acota deliberadamente entre `## Resumen` y `## Unidad 1` para evitar
 * contar las tablas de Ejemplos resueltos del resto del documento (que usan el mismo
 * formato de fila y sumarían 304 entradas en vez de las 140 únicas del catálogo).
 */
export function extraerIdentificadoresCatalogo(contenidoMarkdown: string): readonly string[] {
  const inicioResumen = contenidoMarkdown.indexOf('## Resumen');
  if (inicioResumen === -1) {
    throw new Error('No se encontró la sección "## Resumen" en el catálogo de fórmulas.');
  }

  // La sección termina donde empieza la Unidad 1
  const finResumen = contenidoMarkdown.indexOf('## Unidad 1', inicioResumen);
  const textoResumen =
    finResumen !== -1
      ? contenidoMarkdown.slice(inicioResumen, finResumen)
      : contenidoMarkdown.slice(inicioResumen);

  const regexFila = /\|\s*`([^`]+)`\s*\|/g;
  const identificadores: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = regexFila.exec(textoResumen)) !== null) {
    identificadores.push(match[1].trim());
  }

  return identificadores;
}

/**
 * Lee el archivo markdown del catálogo de fórmulas y devuelve la lista de identificadores
 * presentes en su índice (`## Resumen`).
 */
export function leerIdentificadoresCatalogo(
  rutaArchivo: string = RUTA_CATALOGO_POR_DEFECTO,
): readonly string[] {
  const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
  return extraerIdentificadoresCatalogo(contenido);
}

/**
 * Determina si un identificador del catálogo está cubierto por el conjunto de identificadores
 * cargados en la app.
 *
 * Un identificador está cubierto si:
 * 1. Existe directamente en los datos (sea una fórmula calculable o una ficha de consulta).
 * 2. O bien, si es una fórmula dividida (ej. `U08-F08`), están presentes TODAS sus partes (`U08-F08a` y `U08-F08b`).
 */
export function estaCubierto(
  catalogoId: string,
  idsCargados: ReadonlySet<string> | readonly string[],
): boolean {
  const conjuntoCargados = idsCargados instanceof Set ? idsCargados : new Set(idsCargados);

  if (conjuntoCargados.has(catalogoId)) {
    return true;
  }

  const partes = FORMULAS_DIVIDIDAS[catalogoId];
  if (partes && partes.length > 0) {
    return partes.every((parteId) => conjuntoCargados.has(parteId));
  }

  return false;
}

/**
 * Devuelve la lista de identificadores del catálogo que NO están cargados en los datos de la app.
 *
 * Recibe cualquier colección de objetos que tengan un campo `id` (como `Formula` o fichas de consulta),
 * o directamente una lista de IDs cargados.
 */
export function identificadoresFaltantes(
  catalogoIds: readonly string[],
  cargados: readonly { readonly id: string }[] | readonly string[],
): readonly string[] {
  const idsCargados = new Set(
    cargados.map((item) => (typeof item === 'string' ? item : item.id)),
  );

  return catalogoIds.filter((catalogoId) => !estaCubierto(catalogoId, idsCargados));
}
