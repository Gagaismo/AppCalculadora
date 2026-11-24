import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { calcularCrc, GENERADORES, MENSAJE_CATEDRA, verificarCrc, type PasoCrc } from '@/bits/crc';
import type { Frase } from '@/guia/frases';
import { ALTO_GUIA, Guia } from '@/guia/guia';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

import { Explicacion, NavegacionPasos, Opciones, ProgresoPasos, TarjetaEstado } from './pasos';
import { CampoBits, TecladoBits } from './teclado';

type Modo = 'emisor' | 'receptor';
type Campo = 'm' | 'g' | 't';

/** El largo máximo de M(x) y de G(x). */
const MAXIMO_BITS = 32;

/**
 * El largo máximo de T'(x): el mensaje más largo seguido del resto del generador de mayor
 * grado de la lista (CRC-16 y CRC-CCITT, grado 16), o sea 32 + 16 = 48 bits. Con el tope de
 * M(x) la trama transmitida no entraría entera y el receptor la verificaría truncada.
 */
const MAXIMO_TRAMA = MAXIMO_BITS + Math.max(...GENERADORES.map((gen) => gen.bits.length - 1));

const CATEDRA = GENERADORES[0];
const TRAMA_CATEDRA = calcularCrc(MENSAJE_CATEDRA, CATEDRA.bits).trama;

/** Calcula sin romper: con una entrada inválida devuelve el mensaje del error. */
function calcular(modo: Modo, m: string, g: string, t: string) {
  try {
    return modo === 'emisor'
      ? { emisor: calcularCrc(m, g), receptor: undefined, error: undefined }
      : { emisor: undefined, receptor: verificarCrc(t, g), error: undefined };
  } catch (e) {
    return { emisor: undefined, receptor: undefined, error: (e as Error).message };
  }
}

/**
 * CRC paso a paso (U06-F11, págs. 28-32): entrada, un paso por cada XOR de la división
 * módulo 2 y el resultado. El cociente no se muestra (decisión D2).
 */
export function PantallaCrc() {
  const [modo, setModo] = useState<Modo>('emisor');
  const [m, setM] = useState(MENSAJE_CATEDRA);
  const [g, setG] = useState(CATEDRA.bits);
  const [t, setT] = useState(TRAMA_CATEDRA);
  const [campo, setCampo] = useState<Campo>('m');
  const [paso, setPaso] = useState(0);
  const [aviso, setAviso] = useState<string>();

  const { emisor, receptor, error } = calcular(modo, m, g, t);
  const division = emisor ?? receptor;
  const total = (division?.pasos.length ?? 0) + 2;
  const final = paso === total - 1;
  const dividendo = emisor ? emisor.p : t;
  const generador = GENERADORES.find((gen) => gen.bits === g);

  const valores = { m, g, t };
  const editar = (cambio: (valor: string) => string) => {
    const nuevo = cambio(valores[campo]).slice(0, campo === 't' ? MAXIMO_TRAMA : MAXIMO_BITS);
    ({ m: setM, g: setG, t: setT })[campo](nuevo);
    setAviso(undefined);
  };

  const ir = (destino: number) => {
    if (paso === 0 && destino === 1 && error) {
      setAviso(error);
      return;
    }
    setPaso(destino);
  };

  let frase: Frase = { animacion: 'hablando', texto: 'Cargá los bits y seguí la división paso a paso.' };
  if (aviso) frase = { animacion: 'confundido', texto: 'Así no puedo dividir. Mirá el aviso.' };
  else if (final && receptor?.hayError) {
    frase = { animacion: 'retando', texto: '¡El resto no da 0! Esa trama llegó con error.' };
  } else if (final) frase = { animacion: 'festejando', texto: '¡Muy bien! Llegamos al resto.' };

  const nombrePaso =
    paso === 0 ? 'Entrada' : final ? 'Resultado' : `XOR ${paso} de ${total - 2}`;

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.pantalla}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          <Opciones
            rotulo="Modo"
            opciones={[
              { valor: 'emisor', texto: 'Emisor' },
              { valor: 'receptor', texto: 'Verificar en el receptor' },
            ]}
            elegida={modo}
            onElegir={(nuevo) => {
              setModo(nuevo);
              setCampo(nuevo === 'emisor' ? 'm' : 't');
              setPaso(0);
              setAviso(undefined);
            }}
          />
          <ProgresoPasos paso={paso} total={total} nombre={nombrePaso} />

          {paso === 0 ? (
            <>
              {modo === 'emisor' ? (
                <CampoBits rotulo="M(x) · mensaje" valor={m} activo={campo === 'm'} onPress={() => setCampo('m')} />
              ) : (
                <CampoBits rotulo="T'(x) · trama recibida" valor={t} activo={campo === 't'} onPress={() => setCampo('t')} />
              )}
              <CampoBits
                rotulo={`G(x) · generador${generador ? ` · ${generador.polinomio}` : ''}`}
                valor={g}
                activo={campo === 'g'}
                onPress={() => setCampo('g')}
              />
              <Opciones
                rotulo="Generadores"
                opciones={GENERADORES.map((gen) => ({ valor: gen.nombre, texto: gen.nombre }))}
                elegida={generador?.nombre}
                onElegir={(nombre) => {
                  const elegido = GENERADORES.find((gen) => gen.nombre === nombre)!;
                  setG(elegido.bits);
                  // El ejemplo de la cátedra trae también su mensaje y su trama.
                  if (elegido === CATEDRA) {
                    setM(MENSAJE_CATEDRA);
                    setT(TRAMA_CATEDRA);
                  }
                  setAviso(undefined);
                }}
              />
              <TecladoBits
                onBit={(bit) => editar((valor) => valor + bit)}
                onBorrar={() => editar((valor) => valor.slice(0, -1))}
              />
              {aviso ? (
                <Text accessibilityRole="alert" style={estilos.aviso}>
                  {aviso}
                </Text>
              ) : null}
            </>
          ) : division ? (
            <>
              <Text style={estilos.datos}>
                {`${emisor ? 'M(x)' : "T'(x)"} = ${emisor ? m : t}\nG(x) = ${g} · r = ${division.r}` +
                  (emisor ? `\nP(x) = ${emisor.p}` : '')}
              </Text>
              {final ? (
                emisor ? (
                  <TarjetaEstado estado="ok" titulo={`R(x) = ${emisor.restoCorto}`}>
                    <Text style={estilos.cuerpo}>
                      {`Con r = ${emisor.r} bits: ${emisor.resto}. Trama a transmitir T(x) = P(x) + R(x):`}
                    </Text>
                    <Text testID="crc-trama" style={estilos.trama}>
                      {m}
                      <Text style={estilos.bajado}>{emisor.resto}</Text>
                    </Text>
                  </TarjetaEstado>
                ) : receptor?.hayError ? (
                  <TarjetaEstado estado="error" titulo={`Resto ${receptor.resto} ≠ 0 · hay error`}>
                    <Text style={estilos.cuerpo}>T'(x) no es divisible por G(x): la trama llegó con error.</Text>
                  </TarjetaEstado>
                ) : (
                  <TarjetaEstado estado="ok" titulo={`Resto ${receptor?.resto} · sin error`}>
                    <Text style={estilos.cuerpo}>
                      T'(x) es divisible por G(x): la trama llegó como se envió (pág. 31).
                    </Text>
                  </TarjetaEstado>
                )
              ) : (
                <ExplicacionPaso
                  pasoCrc={division.pasos[paso - 1]}
                  ultimo={paso === total - 2}
                  r={division.r}
                />
              )}
              <Division
                dividendo={dividendo}
                rotulo={emisor ? 'P(x)' : "T'(x)"}
                pasos={division.pasos.slice(0, final ? undefined : paso)}
                actual={final ? -1 : paso - 1}
                final={final}
              />
            </>
          ) : null}
        </ScrollView>
        <Guia {...frase} />
      </View>
      <View style={estilos.barraInferior}>
        <NavegacionPasos paso={paso} total={total} onIr={ir} />
      </View>
    </View>
  );
}

function ExplicacionPaso({ pasoCrc, ultimo, r }: { pasoCrc: PasoCrc; ultimo: boolean; r: number }) {
  const { columna, ventana, divisor, xor, bajados } = pasoCrc;
  const cuantos = bajados.length;
  return (
    <Explicacion titulo={`${ventana} ⊕ ${divisor} = ${xor}`}>
      {`Columnas ${columna + 1} a ${columna + divisor.length}. `}
      {ultimo
        ? `G(x) ya no entra: las últimas ${r} columnas son el resto.`
        : `Bajo ${cuantos} bit${cuantos > 1 ? 's' : ''} (subrayado${cuantos > 1 ? 's' : ''}) hasta que el próximo 1 quede bajo G(x).`}
    </Explicacion>
  );
}

/**
 * La cuenta dispuesta como en la pág. 30: cada renglón se corre tantas columnas como su
 * `columna`. Con la tipografía monoespaciada, los espacios alinean cada bit con el de arriba.
 */
function Division({
  dividendo,
  rotulo,
  pasos,
  actual,
  final,
}: {
  dividendo: string;
  rotulo: string;
  pasos: readonly PasoCrc[];
  actual: number;
  final: boolean;
}) {
  const sangria = (columna: number) => ' '.repeat(columna);
  return (
    <ScrollView horizontal style={estilos.hoja} contentContainerStyle={estilos.hojaContenido}>
      <View accessibilityLabel={`División módulo 2 de ${dividendo}, ${pasos.length} pasos a la vista`}>
        <Renglon rotulo={rotulo}>{dividendo}</Renglon>
        {pasos.map((p, i) => {
          const resaltado = i === actual;
          const esResto = final && i === pasos.length - 1;
          return (
            <View key={i} style={resaltado && estilos.renglonActual}>
              <Renglon rotulo="⊕">
                {sangria(p.columna)}
                <Text style={estilos.divisor}>{p.divisor}</Text>
              </Renglon>
              <Renglon rotulo={esResto ? 'R(x)' : ''}>
                {sangria(p.columna) + p.xor}
                <Text style={estilos.bajado}>{p.bajados}</Text>
              </Renglon>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

function Renglon({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <View style={estilos.renglon}>
      <Text style={estilos.rotuloRenglon}>{rotulo}</Text>
      <Text style={estilos.bits}>{children}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: espacio.lg, gap: espacio.md, paddingBottom: espacio.xxl + ALTO_GUIA },
  aviso: {
    ...tipografia.cuerpo,
    color: colores.error,
    padding: espacio.md,
    borderRadius: radio.md,
    backgroundColor: colores.errorFondo,
  },
  datos: { ...tipografia.cuerpo, fontFamily: fuentes.nota, color: colores.texto },
  cuerpo: { ...tipografia.cuerpo, color: colores.texto },
  trama: { ...tipografia.subtitulo, fontFamily: fuentes.notaFuerte, color: colores.texto },
  hoja: {
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  hojaContenido: { padding: espacio.md },
  renglon: { flexDirection: 'row' },
  renglonActual: { backgroundColor: colores.superficieEnfasis, borderRadius: radio.sm },
  rotuloRenglon: { ...tipografia.etiqueta, width: 44, color: colores.accion },
  bits: { ...tipografia.cuerpo, fontFamily: fuentes.nota, color: colores.texto, letterSpacing: 2 },
  divisor: { textDecorationLine: 'underline' },
  // Los bits bajados: subrayados y en el marrón de texto, no sólo por color.
  bajado: { color: colores.accion, fontFamily: fuentes.notaFuerte, textDecorationLine: 'underline' },
  barraInferior: {
    padding: espacio.lg,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.fondo,
  },
});
