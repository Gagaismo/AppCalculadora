import type { Multiplo } from './multiplos';

/**
 * Una Fórmula es un dato, no una pantalla. Una sola pantalla genérica las renderiza
 * a todas, así que agregar una Fórmula cuesta este objeto más su test contra el
 * Ejemplo resuelto de la cátedra.
 *
 * El tipo es deliberadamente exigente: si falta la Unidad de medida de una Variable,
 * la Variable de salida o la página de origen, no compila. Una Fórmula a medias no
 * llega a la app.
 */

/** Cuán confiable es la transcripción, según la verificación del catálogo. */
export type Confianza = 'alta' | 'media' | 'baja';

/**
 * Cada símbolo que participa de una Fórmula.
 *
 * `unidadDeMedida` es Hz, dBm, bit/s, seg. Nunca se la llama «unidad» a secas:
 * esa palabra ya está tomada por la división temática de la materia.
 */
export interface Variable {
  readonly simbolo: string;
  readonly significado: string;
  readonly unidadDeMedida: string;
  /** El múltiplo que viene preseleccionado. El camino sin pensar es el camino correcto. */
  readonly multiploCanonico: Multiplo;
}

/** Un valor tal como lo carga quien usa la app: número más múltiplo, sin convertir. */
export interface ValorCargado {
  readonly valor: number;
  readonly multiplo: Multiplo;
}

/** Valores ya llevados a la Unidad de medida canónica, indexados por símbolo. */
export type ValoresCanonicos = Readonly<Record<string, number>>;

export interface Formula {
  /** El identificador del catálogo: 'U10-F07'. Es la clave de trazabilidad a la fuente. */
  readonly id: string;
  /** El número de la Unidad de la materia a la que pertenece. */
  readonly unidad: number;
  readonly nombre: string;
  /** La expresión tal como se muestra en pantalla. */
  readonly expresion: string;
  readonly entradas: readonly Variable[];
  /**
   * La Variable de salida, fija. El cálculo es unidireccional: se cargan todas las
   * entradas y sale ésta. No se despeja una incógnita elegida por quien usa la app.
   */
  readonly salida: Variable;
  readonly condiciones: string;
  /** Página o páginas de la Presentación de unidad de donde sale. */
  readonly paginas: string;
  readonly confianza: Confianza;
  /**
   * La observación de verificación del catálogo, cuando sigue sin resolverse.
   * Su presencia es lo que dispara el aviso en la ficha.
   */
  readonly observacion?: string;
  /**
   * Recibe los valores YA en Unidad de medida canónica y devuelve el resultado en la
   * unidad canónica de la salida. La conversión de múltiplos no es asunto suyo: la
   * hace el motor, una sola vez, para todas las Fórmulas.
   */
  calcular(valores: ValoresCanonicos): number;
}

/**
 * Un ejercicio que la cátedra publica ya resuelto en una Presentación de unidad.
 *
 * Es la prueba de que la transcripción de la Fórmula es correcta. Sin él, la Fórmula
 * no está terminada.
 */
export interface EjemploResuelto {
  readonly formulaId: string;
  readonly enunciado: string;
  readonly entradas: Readonly<Record<string, ValorCargado>>;
  readonly esperado: ValorCargado;
  readonly pagina: string;
  /**
   * Tolerancia relativa. La cátedra redondea en las diapositivas (3,33 GBaudios),
   * así que comparar por igualdad exacta haría fallar transcripciones correctas.
   */
  readonly tolerancia?: number;
  /**
   * Se completa cuando la propia diapositiva se equivoca en la cuenta. Registra el
   * apartamiento en vez de forzar a la app a reproducir el error de la cátedra.
   */
  readonly apartamiento?: string;
}
