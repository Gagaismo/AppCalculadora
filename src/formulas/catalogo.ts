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
