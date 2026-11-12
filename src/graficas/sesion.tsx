import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Formula } from '@/dominio/formula';
import { aCanonico, type Multiplo } from '@/dominio/multiplos';
import { parsearEntrada } from '@/screens/formula/numeros';

/**
 * La sesión de una Fórmula: los textos de sus campos y el múltiplo elegido en cada
 * uno, tal como los dejó quien usa la app.
 *
 * Vive arriba de la pila porque la leen dos pantallas: la vertical de la Fórmula y la
 * horizontal de la gráfica, que arranca de esos valores y devuelve lo que se movió con
 * los deslizadores. Es un contexto y no parámetros de la ruta porque el camino es de
 * ida y vuelta: al volver, los campos tienen que mostrar el valor nuevo, y una ruta
 * sólo lleva datos hacia adelante.
 *
 * Sin proveedor, el hook guarda el estado en la propia pantalla: así se prueba la
 * pantalla de la Fórmula sola, como hasta ahora.
 */

export interface Sesion {
  /** Una Variable escalar tiene un texto; una de lista, uno por campo. */
  readonly textos: Readonly<Record<string, string[]>>;
  readonly multiplos: Readonly<Record<string, Multiplo>>;
}

type Actualizar<T> = T | ((previo: T) => T);
type Cambio = (previa: Sesion) => Sesion;

interface ValorContexto {
  readonly sesiones: Readonly<Record<string, Sesion>>;
  readonly cambiar: (formula: Formula, cambio: Cambio) => void;
  readonly olvidar: (id: string) => void;
}

const Contexto = createContext<ValorContexto | null>(null);

/** Los campos vacíos y el múltiplo canónico de cada Variable: la pantalla recién abierta. */
export function sesionInicial(formula: Formula): Sesion {
  return {
    textos: Object.fromEntries(formula.entradas.map((v) => [v.simbolo, ['']])),
    multiplos: Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
  };
}

export function ProveedorSesion({
  children,
  inicial = {},
}: {
  children: ReactNode;
  /** Sesiones ya cargadas, por id de Fórmula. Lo usan las pruebas. */
  inicial?: Readonly<Record<string, Sesion>>;
}) {
  const [sesiones, setSesiones] = useState(inicial);
  const cambiar = useCallback(
    (formula: Formula, cambio: Cambio) =>
      setSesiones((previas) => ({
        ...previas,
        [formula.id]: cambio(previas[formula.id] ?? sesionInicial(formula)),
      })),
    [],
  );
  const olvidar = useCallback(
    (id: string) =>
      setSesiones((previas) => {
        if (!(id in previas)) return previas;
        const { [id]: _, ...resto } = previas;
        return resto;
      }),
    [],
  );
  const valor = useMemo(() => ({ sesiones, cambiar, olvidar }), [sesiones, cambiar, olvidar]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

const aplicar = <T,>(actualizar: Actualizar<T>, previo: T): T =>
  typeof actualizar === 'function' ? (actualizar as (p: T) => T)(previo) : actualizar;

/**
 * La sesión de `formula`, con setters que funcionan como los de `useState`.
 * `olvidar` la descarta: la pantalla de la Fórmula lo llama al cerrarse, así la
 * próxima vez abre vacía como siempre.
 */
export function useSesionFormula(formula: Formula) {
  const contexto = useContext(Contexto);
  const [local, setLocal] = useState(() => sesionInicial(formula));
  const sesion = contexto ? (contexto.sesiones[formula.id] ?? local) : local;

  const olvidarGlobal = contexto?.olvidar;
  const olvidar = useCallback(() => olvidarGlobal?.(formula.id), [olvidarGlobal, formula.id]);

  const cambiar = (cambio: Cambio) =>
    contexto ? contexto.cambiar(formula, cambio) : setLocal(cambio);

  return {
    textos: sesion.textos,
    multiplos: sesion.multiplos,
    setTextos: (actualizar: Actualizar<Sesion['textos']>) =>
      cambiar((s) => ({ ...s, textos: aplicar(actualizar, s.textos) })),
    setMultiplos: (actualizar: Actualizar<Sesion['multiplos']>) =>
      cambiar((s) => ({ ...s, multiplos: aplicar(actualizar, s.multiplos) })),
    olvidar,
  };
}

/**
 * Lo que un deslizador escribe en el campo: tres cifras significativas con coma
 * decimal, como lo tipearía una persona. 4754,68 Hz se escribe «4750», no
 * «4754,679577»: la cuarta cifra no la elige nadie a mano con un dedo.
 */
export function textoDeslizador(valor: number): string {
  return String(Number(valor.toPrecision(3))).replace('.', ',');
}

/** Lo cargado en una sesión, ya en unidad canónica, listo para `muestrear`. */
export interface Cargados {
  /** Las Variables escalares con un número válido. */
  readonly valores: Readonly<Record<string, number>>;
  readonly listas: Readonly<Record<string, number[]>>;
  /** Escalares vacías y listas sin ningún valor. */
  readonly faltan: readonly string[];
  /** Las que tienen algún campo que no es un número. */
  readonly invalidos: readonly string[];
}

export function leerCargados(formula: Formula, sesion: Sesion): Cargados {
  const valores: Record<string, number> = {};
  const listas: Record<string, number[]> = {};
  const faltan: string[] = [];
  const invalidos: string[] = [];
  for (const variable of formula.entradas) {
    const s = variable.simbolo;
    const entradas = (sesion.textos[s] ?? ['']).map(parsearEntrada);
    if (entradas.some((e) => e.estado === 'invalida')) {
      invalidos.push(s);
      continue;
    }
    const multiplo = sesion.multiplos[s] ?? variable.multiploCanonico;
    const numeros = entradas.flatMap((e) => (e.estado === 'cargada' ? [aCanonico(e.valor, multiplo)] : []));
    if (numeros.length === 0) faltan.push(s);
    else if (variable.esLista) listas[s] = numeros;
    else valores[s] = numeros[0];
  }
  return { valores, listas, faltan, invalidos };
}
