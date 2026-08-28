/**
 * El tema de la aplicación.
 *
 * Un solo lugar del que salen todos los colores, tamaños y espaciados. Existe por
 * la misma razón que `multiplos.ts`: un valor repetido a mano en cuatro pantallas
 * se desincroniza sin que nada falle, y el síntoma aparece recién en el teléfono.
 *
 * La paleta y la tipografía vienen del styleguide de Figma del proyecto. Lo que el
 * styleguide **no** trae —los colores de estado y los contrastes— está derivado acá
 * y verificado contra WCAG 2.1; los valores medidos están anotados en cada caso.
 *
 * Sólo tema claro. Es una decisión tomada, no una etapa pendiente.
 */

/**
 * Los cinco colores del styleguide, tal cual.
 *
 * No se usan directamente en las pantallas: se consumen a través de `colores`,
 * que les da un rol. Están acá para que se vea de dónde sale cada cosa.
 */
const PALETA = {
  marca: '#C67C4E',
  beige: '#EDD6C8',
  tinta: '#313131',
  grisClaro: '#E3E3E3',
  crema: '#F9F2ED',
} as const;

/**
 * Los colores por su rol, que es como los usan las pantallas.
 *
 * **La regla del marrón.** `PALETA.marca` da 2,96:1 sobre el crema: no llega ni al
 * mínimo para texto grande, y el blanco encima da 3,28:1. Por eso hay dos marrones y
 * no uno. `marca` **sólo rellena superficies** —el indicador de la barra de pestañas,
 * el fondo de un múltiplo elegido—; en cuanto un color tiene que llevar texto o ser
 * texto, va `accion`, que es el mismo tono (matiz 23) oscurecido hasta 4,79:1 sobre
 * crema y 5,31:1 con blanco encima.
 */
export const colores = {
  /** Fondo de la aplicación. */
  fondo: PALETA.crema,
  /** Superficie de una tarjeta sobre el fondo. Contraste 1,06:1 — separa sin gritar. */
  superficie: '#FFFFFF',
  /** Superficie de énfasis: el múltiplo elegido, una fila resaltada. */
  superficieEnfasis: PALETA.beige,

  /** Texto principal. 11,74:1 sobre el fondo. */
  texto: PALETA.tinta,
  /** Texto secundario: significados, conteos, notas al pie. 5,38:1 sobre el fondo. */
  textoSuave: '#6B625B',
  /** Texto terciario: sólo para acompañar, nunca información necesaria. 3,48:1. */
  textoTenue: '#8A8078',

  /** Bordes de tarjetas y campos. */
  borde: PALETA.grisClaro,

  /** El marrón que rellena. Nunca lleva texto encima que haga falta leer. */
  marca: PALETA.marca,
  /** El marrón que lleva texto: enlaces, rótulos de acción, botones con blanco encima. */
  accion: '#9C5B32',

  /** Entrada no numérica, apartamiento respecto de la diapositiva. 5,90:1. */
  error: '#B3261E',
  /** Fondo del bloque de error. Tinta encima da 11,10:1. */
  errorFondo: '#FBE9E7',

  /**
   * Observación de verificación (⚠️). 6,25:1 sobre el fondo.
   *
   * Contra `marca` da apenas 2,11:1, así que **nunca se apoya sólo en el color**:
   * el aviso va siempre dentro de `avisoFondo` y con el glifo ⚠️. En contexto el
   * contenedor es lo que lo distingue, no la tinta.
   */
  aviso: '#7A5200',
  /** Fondo del bloque de aviso. Tinta encima da 10,95:1. */
  avisoFondo: '#F5EBD0',

  /** Resultado válido. 5,69:1 sobre el fondo. */
  exito: '#2E6B4F',
  /** Fondo del bloque de resultado cuando el cálculo salió bien. */
  exitoFondo: '#E6F0EA',
} as const;

/**
 * Las dos familias tipográficas.
 *
 * Sora para la interfaz. IBM Plex Mono para todo lo que es **notación**: símbolos de
 * Variables, expresiones, valores numéricos. Que `0` se distinga de `O` y `1` de `l`
 * no es refinamiento acá: los símbolos de las fórmulas son exactamente eso.
 */
export const fuentes = {
  interfaz: 'Sora_400Regular',
  interfazMedia: 'Sora_600SemiBold',
  interfazFuerte: 'Sora_700Bold',
  nota: 'IBMPlexMono_400Regular',
  notaFuerte: 'IBMPlexMono_600SemiBold',
} as const;

/**
 * La escala tipográfica. Seis pasos, ni uno más.
 *
 * Cada paso existe por un uso concreto de la aplicación; si hace falta un tamaño que
 * no está, la pregunta es qué rol cumple, no qué número queda bien.
 */
export const tipografia = {
  /** El resultado del cálculo. Es el número que la aplicación existe para mostrar. */
  resultado: { fontSize: 32, lineHeight: 40, fontFamily: fuentes.notaFuerte },
  /** Título de pantalla. */
  titulo: { fontSize: 22, lineHeight: 28, fontFamily: fuentes.interfazFuerte },
  /** Nombre de una Fórmula, título de sección. */
  subtitulo: { fontSize: 17, lineHeight: 22, fontFamily: fuentes.interfazMedia },
  /** Texto corrido: significados, condiciones, enunciados. */
  cuerpo: { fontSize: 15, lineHeight: 21, fontFamily: fuentes.interfaz },
  /** Rótulos: «Unidad 4», conteos, encabezados de campo. */
  etiqueta: { fontSize: 13, lineHeight: 18, fontFamily: fuentes.interfazMedia },
  /** Pie: página de origen, confianza de transcripción. */
  pie: { fontSize: 12, lineHeight: 16, fontFamily: fuentes.interfaz },
} as const;

/**
 * Espaciado, en pasos de 4.
 *
 * Las listas usan densidad compacta —se está buscando— y la pantalla de cálculo usa
 * densidad cómoda, porque ahí se cargan números y el aire evita errores de dedo.
 */
export const espacio = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
} as const;

/** Radios de esquina. */
export const radio = {
  sm: 8,
  md: 12,
  /** Píldora: el selector de múltiplo, los distintivos. */
  pastilla: 999,
} as const;

export type Colores = typeof colores;
