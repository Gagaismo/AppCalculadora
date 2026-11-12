import type { ImageSourcePropType } from 'react-native';

/**
 * Las animaciones del guía.
 *
 * Cada una es una hoja de 5x5 cuadros (1000x1000 px, celdas de 200 px, fondo
 * transparente) con los fps que fija la spec. Los `require` van escritos uno por uno
 * porque Metro sólo empaqueta las imágenes que ve nombradas de forma literal.
 */

export type NombreAnimacion =
  | 'reposo'
  | 'hablando'
  | 'retando'
  | 'senalando'
  | 'festejando'
  | 'confundido'
  | 'pensando';

export interface Animacion {
  readonly hoja: ImageSourcePropType;
  readonly fps: number;
}

export const ANIMACIONES: Readonly<Record<NombreAnimacion, Animacion>> = {
  reposo: { hoja: require('../../assets/guia/reposo.png'), fps: 10 },
  hablando: { hoja: require('../../assets/guia/hablando.png'), fps: 12 },
  retando: { hoja: require('../../assets/guia/retando.png'), fps: 12 },
  senalando: { hoja: require('../../assets/guia/senalando.png'), fps: 12 },
  festejando: { hoja: require('../../assets/guia/festejando.png'), fps: 15 },
  confundido: { hoja: require('../../assets/guia/confundido.png'), fps: 10 },
  pensando: { hoja: require('../../assets/guia/pensando.png'), fps: 10 },
};
