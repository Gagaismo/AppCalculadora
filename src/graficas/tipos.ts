/**
 * Los tipos de la gráfica.
 *
 * Todo lo que viaja por acá está en **unidad canónica**: Hz, W, m, sin prefijo. Es
 * la misma convención que `calcular()` de la Fórmula; el múltiplo sólo aparece al
 * formatear una marca o una lectura.
 */

/** Cómo se reparte el eje X: en pasos iguales o en décadas iguales. */
export type Escala = 'lineal' | 'log';

/** Un intervalo cerrado [min, max], en unidad canónica. */
export interface Rango {
  readonly min: number;
  readonly max: number;
}

/** Un punto de la curva. `y` es siempre finito: un punto sin valor no existe, es un hueco. */
export interface Punto {
  readonly x: number;
  readonly y: number;
}

/** Un tramo continuo de la curva, ordenado por X. Entre dos Segmentos hay un hueco. */
export type Segmento = readonly Punto[];
