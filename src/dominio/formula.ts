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
  /**
   * Presente y en `true` cuando la Variable recibe una **lista** de valores en vez de
   * uno solo. Es el caso de las Fórmulas que suman sobre N términos: la entropía
   * `H = Σ P_j log₂(1/P_j)` recibe las probabilidades de los N símbolos, no una.
   *
   * El múltiplo es uno para toda la lista, no uno por elemento: las magnitudes que
   * se cargan así son homogéneas —las probabilidades de una fuente, las duraciones
   * de sus símbolos— y un selector por elemento sería una forma cara de invitar al
   * error que la regla dura 6 quiere evitar.
   */
  readonly esLista?: true;
}

/** Un valor tal como lo carga quien usa la app: número más múltiplo, sin convertir. */
export interface ValorCargado {
  readonly valor: number;
  readonly multiplo: Multiplo;
}

/** Lo mismo para una Variable de lista: N valores bajo un mismo múltiplo. */
export interface ValoresCargados {
  readonly valores: readonly number[];
  readonly multiplo: Multiplo;
}

/**
 * Lo que se carga en una Variable, sea escalar o lista.
 *
 * Se distinguen por su forma —`valor` contra `valores`— y no por una etiqueta, así
 * el compilador estrecha el tipo solo con `'valores' in entrada` y las Fórmulas
 * escalares, que son la enorme mayoría, no cambian ni una línea.
 */
export type EntradaCargada = ValorCargado | ValoresCargados;

/** Valores escalares ya llevados a la Unidad de medida canónica, por símbolo. */
export type ValoresCanonicos = Readonly<Record<string, number>>;

/** Listas ya llevadas a la Unidad de medida canónica, por símbolo. */
export type ListasCanonicas = Readonly<Record<string, readonly number[]>>;

export interface Formula {
  /** El identificador del catálogo: 'U10-F07'. Es la clave de trazabilidad a la fuente. */
  readonly id: string;
  /** El número de la Unidad de la materia a la que pertenece. */
  readonly unidad: number;
  readonly nombre: string;
  /**
   * La expresión en texto plano.
   *
   * Aunque la pantalla dibuje la versión LaTeX, ésta no desaparece: es el respaldo si
   * el pre-renderizado falla, la etiqueta que lee el lector de pantalla —un SVG no
   * tiene texto accesible— y lo que indexa la búsqueda.
   */
  readonly expresion: string;
  /**
   * La misma expresión en LaTeX, para dibujarla como notación matemática de verdad.
   *
   * **Los símbolos tienen que coincidir con los de `entradas` y `salida`, no con los
   * de la diapositiva.** El catálogo trae el LaTeX de las 140 Fórmulas, pero para
   * varias de ellas `observaciones-resueltas.md` ya decidió llamar a las cosas de otra
   * manera; transcribir sin aplicar esa decisión deja la expresión mostrando un símbolo
   * y el campo de entrada justo debajo mostrando otro, para la misma magnitud.
   *
   * La regla completa, con los nueve casos verificados, está en
   * `docs/research/latex-transcripcion.md`. Hay un test que la vigila.
   */
  readonly expresionLatex?: string;
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
   *
   * El segundo parámetro trae las Variables marcadas `esLista`. Una Fórmula que no
   * tiene ninguna simplemente no lo declara:
   *
   *     calcular: ({ f_sup, f_inf }) => f_sup - f_inf
   *     calcular: (_, { P }) => P.reduce((h, p) => h + p * Math.log2(1 / p), 0)
   */
  calcular(valores: ValoresCanonicos, listas: ListasCanonicas): number;
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
  readonly entradas: Readonly<Record<string, EntradaCargada>>;
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
