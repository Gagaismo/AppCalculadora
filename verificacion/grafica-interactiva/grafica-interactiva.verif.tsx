import { fireEvent, render, screen } from '@testing-library/react-native';

import type { Formula, Variable } from '@/dominio/formula';
import { desdeCanonico, MULTIPLOS, type Multiplo } from '@/dominio/multiplos';
import { FORMULAS } from '@/formulas';
import { posicionDe, valorDe } from '@/graficas/deslizador';
import { MARGEN } from '@/graficas/lienzo';
import { variablesEjeX } from '@/graficas/muestreo';
import { leerCargados, ProveedorSesion, textoDeslizador, type Sesion } from '@/graficas/sesion';
import type { Escala } from '@/graficas/tipos';
import { marcoInicial } from '@/graficas/vista-previa';
import { PantallaGrafica } from '@/screens/grafica';

/**
 * Verificación de la gráfica interactiva: el deslizador y la cruz del lienzo.
 *
 * No hay un verificador formal que corra sobre TypeScript + React Native, así que se
 * prueba el **código real** con entradas generadas: Fórmulas reales del catálogo,
 * valores tipeados como los tipea una persona, múltiplos y escalas al azar. El
 * generador es determinista (mulberry32): la misma semilla da las mismas entradas.
 *
 *   VERIF_SEMILLA      semilla (por defecto 20261112)
 *   VERIF_ITERACIONES  casos de las propiedades puras (por defecto 20000)
 *   VERIF_RENDERS      casos de la propiedad de la cruz, que renderiza (por defecto 60)
 *
 * Cada propiedad informa su primer contraejemplo en palabras de la app.
 */

// La orientación necesita un navegador de expo-router y no es parte de lo verificado:
// fuera de una ruta, `PantallaGrafica` se renderiza sola y mucho más rápido.
jest.mock('@/graficas/orientacion', () => ({ useOrientacionHorizontal: () => {} }));
jest.setTimeout(60_000);

const SEMILLA = Number(process.env.VERIF_SEMILLA ?? 20261112);
const ITERACIONES = Number(process.env.VERIF_ITERACIONES ?? 20000);
const RENDERS = Number(process.env.VERIF_RENDERS ?? 60);

// ── Generador determinista ──────────────────────────────────────────────────────

/** mulberry32: 32 bits de estado, suficiente para generar casos reproducibles. */
function mulberry32(semilla: number) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Azar = ReturnType<typeof mulberry32>;
const entero = (r: Azar, n: number) => Math.floor(r() * n);
const elegir = <T,>(r: Azar, xs: readonly T[]): T => xs[entero(r, xs.length)];

/** Las Fórmulas con al menos una Variable que puede ir en el eje X. */
const GRAFICABLES = FORMULAS.filter((f) => variablesEjeX(f).length > 0);

/**
 * Un número como lo tipea una persona en el campo: de 1 a 5 cifras significativas,
 * corrido entre 10⁻³ y 10⁵, a veces negativo y a veces cero. Con coma decimal.
 */
function tipeado(r: Azar): string {
  const u = r();
  if (u < 0.04) return '0';
  const cifras = 1 + entero(r, 5);
  let mantisa = 1 + entero(r, 9);
  for (let i = 1; i < cifras; i++) mantisa = mantisa * 10 + entero(r, 10);
  const valor = (u < 0.14 ? -1 : 1) * mantisa * 10 ** (entero(r, 9) - 3 - (cifras - 1));
  return String(Number(valor.toPrecision(cifras))).replace('.', ',');
}

/** Un caso del deslizador: una Variable real, su campo, su marco y una posición de pista. */
interface CasoDeslizador {
  readonly formula: Formula;
  readonly variable: Variable;
  readonly texto: string;
  readonly multiplo: Multiplo;
  readonly escala: Escala;
  readonly sesion: Sesion;
  readonly min: number;
  readonly max: number;
  readonly escalaMarco: Escala;
  readonly t: number;
}

function casoDeslizador(r: Azar, tFuera: boolean): CasoDeslizador {
  const formula = elegir(r, GRAFICABLES);
  const variable = elegir(r, variablesEjeX(formula));
  const texto = tipeado(r);
  const multiplo = elegir(r, MULTIPLOS);
  const escala: Escala = r() < 0.5 ? 'lineal' : 'log';
  const sesion: Sesion = {
    textos: { [variable.simbolo]: [texto] },
    multiplos: { [variable.simbolo]: multiplo },
  };
  // El marco como lo arma `PantallaGrafica` al abrir o al tocar Lineal/Log.
  const marco = marcoInicial(variable, leerCargados(formula, sesion), multiplo, escala);
  const u = r();
  const t = tFuera
    ? -0.25 + 1.5 * r()
    : u < 0.1
      ? 0
      : u < 0.2
        ? 1
        : r();
  return {
    formula,
    variable,
    texto,
    multiplo,
    escala,
    sesion,
    min: marco.rango.min,
    max: marco.rango.max,
    escalaMarco: marco.escala,
    t,
  };
}

/** Lo que hace `mover` de `PantallaGrafica` con el valor del deslizador, y cómo se relee. */
function vueltaCompleta(c: CasoDeslizador) {
  const valor = valorDe(c.t, c.min, c.max, c.escalaMarco);
  const escrito = textoDeslizador(desdeCanonico(valor, c.multiplo));
  const releido = leerCargados(c.formula, {
    textos: { ...c.sesion.textos, [c.variable.simbolo]: [escrito] },
    multiplos: c.sesion.multiplos,
  }).valores[c.variable.simbolo];
  return { valor, escrito, releido };
}

const unidad = (c: CasoDeslizador) =>
  c.variable.unidadDeMedida === 'adimensional' ? '' : ` ${c.variable.unidadDeMedida}`;

/** El caso contado como lo vería quien usa la app. */
function contar(c: CasoDeslizador, extra: string): string {
  return (
    `${c.formula.id}, Variable ${c.variable.simbolo}: el campo dice «${c.texto}» con múltiplo ` +
    `«${c.multiplo || 'ninguno'}», escala ${c.escalaMarco}; el marco va de ${c.min} a ${c.max}` +
    `${unidad(c)} (canónico). La pista se lleva a t = ${c.t}. ${extra}`
  );
}

/** Corre una propiedad sobre `n` casos y devuelve el contraejemplo más corto. */
function buscar<C>(
  n: number,
  semilla: number,
  generar: (r: Azar) => C,
  falla: (c: C) => string | null,
  largo: (c: C) => number,
) {
  const r = mulberry32(semilla);
  let peor: { caso: C; motivo: string } | null = null;
  let fallas = 0;
  for (let i = 0; i < n; i++) {
    const caso = generar(r);
    const motivo = falla(caso);
    if (motivo === null) continue;
    fallas++;
    if (!peor || largo(caso) < largo(peor.caso)) peor = { caso, motivo };
  }
  return { fallas, n, contraejemplo: peor?.motivo ?? null };
}

const informe = (nombre: string, res: { fallas: number; n: number; contraejemplo: string | null }) =>
  res.contraejemplo === null
    ? null
    : `${nombre}: ${res.fallas} de ${res.n} casos fallan (semilla ${SEMILLA}).\n` +
      `Contraejemplo: ${res.contraejemplo}`;

// ── P1–P4: el deslizador ────────────────────────────────────────────────────────

describe('deslizador', () => {
  it('P1 — valorDe nunca sale del marco, ni con la pista fuera de [0, 1]', () => {
    const res = buscar(
      ITERACIONES,
      SEMILLA,
      (r) => casoDeslizador(r, true),
      (c) => {
        const v = valorDe(c.t, c.min, c.max, c.escalaMarco);
        return v >= c.min && v <= c.max ? null : contar(c, `valorDe devuelve ${v}.`);
      },
      (c) => c.texto.length,
    );
    expect(informe('P1', res)).toBeNull();
  });

  it('P2 — posicionDe deshace valorDe: la pista vuelve a donde la dejó el dedo', () => {
    const res = buscar(
      ITERACIONES,
      SEMILLA + 1,
      (r) => casoDeslizador(r, false),
      (c) => {
        const v = valorDe(c.t, c.min, c.max, c.escalaMarco);
        const t2 = posicionDe(v, c.min, c.max, c.escalaMarco);
        return Math.abs(t2 - c.t) <= 1e-9
          ? null
          : contar(c, `valorDe da ${v} y posicionDe lo devuelve a t = ${t2}.`);
      },
      (c) => c.texto.length,
    );
    expect(informe('P2', res)).toBeNull();
  });

  it('P3 — lo que el deslizador escribe en el campo, releído, queda dentro del marco', () => {
    // Dos causas distintas, que se informan por separado: el redondeo a tres cifras
    // de `textoDeslizador` (se pasa en una fracción visible del marco) y el ruido de
    // punto flotante de ida y vuelta por el múltiplo (se pasa en unos pocos ulp).
    const r = mulberry32(SEMILLA + 2);
    const clases = {
      redondeo: { fallas: 0, caso: null as string | null, largo: Infinity },
      'punto flotante': { fallas: 0, caso: null as string | null, largo: Infinity },
    };
    for (let i = 0; i < ITERACIONES; i++) {
      const c = casoDeslizador(r, false);
      const { valor, escrito, releido } = vueltaCompleta(c);
      if (releido !== undefined && releido >= c.min && releido <= c.max) continue;
      const exceso =
        releido === undefined ? Infinity : Math.max(c.min - releido, releido - c.max) / (c.max - c.min);
      const clase = clases[exceso > 1e-9 ? 'redondeo' : 'punto flotante'];
      clase.fallas++;
      if (c.texto.length >= clase.largo) continue;
      clase.largo = c.texto.length;
      clase.caso = contar(
        c,
        `valorDe da ${valor}; el campo queda «${escrito}», que se relee como ${releido}` +
          `${unidad(c)} canónico: fuera del marco, el punto actual deja de dibujarse.`,
      );
    }
    const fallas = Object.entries(clases).filter(([, k]) => k.fallas > 0);
    expect(
      fallas.length === 0
        ? null
        : `P3 (semilla ${SEMILLA}, ${ITERACIONES} casos):\n` +
            fallas.map(([nombre, k]) => `- ${nombre}: ${k.fallas} casos. Contraejemplo: ${k.caso}`).join('\n'),
    ).toBeNull();
  });

  it('P4 — el redondeo a tres cifras no hace saltar la pista más de un 1 % del recorrido', () => {
    const res = buscar(
      ITERACIONES,
      SEMILLA + 3,
      (r) => casoDeslizador(r, false),
      (c) => {
        const { escrito, releido } = vueltaCompleta(c);
        if (releido === undefined) return contar(c, `el campo queda «${escrito}», que no se lee.`);
        const t2 = posicionDe(releido, c.min, c.max, c.escalaMarco);
        return Math.abs(t2 - c.t) <= 0.01
          ? null
          : contar(c, `el campo queda «${escrito}» y la pista salta a t = ${t2}.`);
      },
      (c) => c.texto.length,
    );
    expect(informe('P4', res)).toBeNull();
  });

  it('P3, ejemplo: U05-F17 con B = 4998 Hz, llevar la pista de B al tope borra el punto actual', async () => {
    const sesion: Sesion = { textos: { B: ['4998'], SNR: ['1023'] }, multiplos: { B: '', SNR: '' } };
    const formula = FORMULAS.find((f) => f.id === 'U05-F17')!;
    await render(
      <ProveedorSesion inicial={{ [formula.id]: sesion }}>
        <PantallaGrafica formula={formula} />
      </ProveedorSesion>,
    );
    expect(screen.getByTestId('lienzo-punto-actual')).toBeTruthy();
    // B va en log de 49,98 Hz a 499,8 kHz; el tope escribe «500000» en el campo.
    await fireEvent(screen.getByTestId('deslizador-B-pista'), 'valueChange', 1);
    expect(screen.getByTestId('deslizador-B')).toHaveTextContent(/500000 Hz$/);
    expect(screen.queryByTestId('lienzo-punto-actual')).toBeTruthy();
  });
});

// ── P5: la cruz del lienzo ──────────────────────────────────────────────────────

/** Fórmulas sin listas y con dos o más Variables para el eje X: se puede cambiar de chip. */
const CON_DOS_EJES = FORMULAS.filter(
  (f) => !f.entradas.some((v) => v.esLista) && variablesEjeX(f).length >= 2,
);

/** Pocos valores, para que dos Variables caigan a veces con el mismo marco, como en la app. */
const VALORES_CRUZ = ['1', '2', '10', '100', '1000', '0,5'] as const;

interface CasoCruz {
  readonly formula: Formula;
  readonly sesion: Sesion;
  readonly desde: string;
  readonly hacia: string;
  readonly fraccion: number;
}

function casoCruz(r: Azar): CasoCruz {
  const formula = elegir(r, CON_DOS_EJES);
  const ejes = variablesEjeX(formula);
  const sesion: Sesion = {
    textos: Object.fromEntries(formula.entradas.map((v) => [v.simbolo, [elegir(r, VALORES_CRUZ)]])),
    multiplos: Object.fromEntries(formula.entradas.map((v) => [v.simbolo, v.multiploCanonico])),
  };
  const i = entero(r, ejes.length);
  const j = (i + 1 + entero(r, ejes.length - 1)) % ejes.length;
  return { formula, sesion, desde: ejes[i].simbolo, hacia: ejes[j].simbolo, fraccion: 0.05 + 0.9 * r() };
}

async function abrir(c: CasoCruz) {
  await render(
    <ProveedorSesion inicial={{ [c.formula.id]: c.sesion }}>
      <PantallaGrafica formula={c.formula} />
    </ProveedorSesion>,
  );
}

const lectura = () => String(screen.getByTestId('lienzo-lectura').props.children);

/**
 * Lo que debería leerse tras cambiar al chip `hacia`: la lectura de una pantalla
 * recién abierta a la que sólo se le cambió el chip, sin tocar el lienzo.
 */
async function lecturaEsperada(c: CasoCruz): Promise<string | null> {
  await abrir(c);
  await fireEvent.press(screen.getByTestId(`eje-${c.desde}`));
  await fireEvent.press(screen.getByTestId(`eje-${c.hacia}`));
  const texto = screen.queryByTestId('lienzo-lectura') ? lectura() : null;
  await screen.unmount();
  return texto;
}

/** Tocar el lienzo con `desde` en X y después cambiar al chip `hacia`. */
async function lecturaTrasTocar(c: CasoCruz): Promise<{ tocada: string; despues: string } | null> {
  await abrir(c);
  await fireEvent.press(screen.getByTestId(`eje-${c.desde}`));
  if (!screen.queryByTestId('lienzo')) {
    await screen.unmount();
    return null;
  }
  // El lienzo mide 160 px o más: la fracción cae siempre dentro del área de dibujo.
  await fireEvent(screen.getByTestId('lienzo'), 'responderGrant', {
    nativeEvent: { locationX: MARGEN.izquierda + c.fraccion * 100 },
  });
  const tocada = lectura();
  await fireEvent.press(screen.getByTestId(`eje-${c.hacia}`));
  const despues = lectura();
  await screen.unmount();
  return { tocada, despues };
}

describe('cruz del lienzo', () => {
  it('P5 — al cambiar la Variable del eje X, la lectura pasa al punto actual de la nueva', async () => {
    const r = mulberry32(SEMILLA + 4);
    let fallas = 0;
    let probados = 0;
    let contraejemplo: string | null = null;
    for (let i = 0; i < RENDERS; i++) {
      const c = casoCruz(r);
      const tocar = await lecturaTrasTocar(c);
      const esperada = await lecturaEsperada(c);
      if (tocar === null || esperada === null) continue;
      probados++;
      if (tocar.despues === esperada) continue;
      fallas++;
      contraejemplo ??=
        `${c.formula.id} con ${JSON.stringify(c.sesion.textos)}: con ${c.desde} en X se toca ` +
        `el lienzo y la lectura dice «${tocar.tocada}»; al pasar el eje X a ${c.hacia} sigue ` +
        `«${tocar.despues}» en vez de «${esperada}».`;
    }
    expect(probados).toBeGreaterThan(0);
    expect(
      contraejemplo &&
        `P5: ${fallas} de ${probados} casos fallan (semilla ${SEMILLA}).\nContraejemplo: ${contraejemplo}`,
    ).toBeNull();
  });

  it('P5, ejemplo: U05-F17 con B = 1000 Hz y SNR = 1000, la cruz de B queda al pasar a SNR', async () => {
    const c: CasoCruz = {
      formula: FORMULAS.find((f) => f.id === 'U05-F17')!,
      sesion: { textos: { B: ['1000'], SNR: ['1000'] }, multiplos: { B: '', SNR: '' } },
      desde: 'B',
      hacia: 'SNR',
      fraccion: 0.5,
    };
    const esperada = await lecturaEsperada(c);
    const tocar = await lecturaTrasTocar(c);
    expect(esperada).toMatch(/^SNR = 1000 → /);
    expect(tocar?.despues).toBe(esperada);
  });
});
