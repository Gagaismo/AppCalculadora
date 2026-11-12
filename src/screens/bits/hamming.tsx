import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { invertir } from '@/bits/bits';
import {
  codificarHamming,
  decodificarHamming,
  type GrupoReceptor,
  type PosicionHamming,
} from '@/bits/hamming';
import type { Frase } from '@/guia/frases';
import { ALTO_GUIA, Guia } from '@/guia/guia';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

import { Explicacion, NavegacionPasos, Opciones, ProgresoPasos, TarjetaEstado } from './pasos';
import { CampoBits, TecladoBits } from './teclado';

type Modo = 'emisor' | 'receptor';

/** El ejemplo de la cátedra, págs. 49-50: los datos, y la palabra que llega con el bit 8 cambiado. */
const DATOS_CATEDRA = '1001101';
const RECIBIDA_CATEDRA = '10001100101';

/** Hasta 11 datos y palabras de 15 bits: p llega a 4, como en las tablas de la cátedra. */
const MAXIMO_DATOS = 11;
const MAXIMO_PALABRA = 15;

/** Calcula sin romper: con una entrada inválida devuelve el mensaje del error. */
function calcular(modo: Modo, datos: string, recibida: string) {
  try {
    return modo === 'emisor'
      ? { emisor: codificarHamming(datos), receptor: undefined, error: undefined }
      : { emisor: undefined, receptor: decodificarHamming(recibida), error: undefined };
  } catch (e) {
    return { emisor: undefined, receptor: undefined, error: (e as Error).message };
  }
}

const unos = (cuantos: number) => `${cuantos} ${cuantos === 1 ? 'uno' : 'unos'}`;

/**
 * Hamming paso a paso (U06-F09/F10, págs. 44-50), siempre con paridad par (decisión D4).
 *
 * Emisor: datos → cuántos bits de paridad → tabla de posiciones → un paso por grupo →
 * palabra a transmitir. Receptor: palabra recibida → un paso por grupo → síndrome y corrección.
 */
export function PantallaHamming() {
  const [modo, setModo] = useState<Modo>('emisor');
  const [datos, setDatos] = useState(DATOS_CATEDRA);
  const [recibida, setRecibida] = useState(RECIBIDA_CATEDRA);
  const [paso, setPaso] = useState(0);
  const [aviso, setAviso] = useState<string>();
  const [corregido, setCorregido] = useState(false);

  const { emisor, receptor, error } = calcular(modo, datos, recibida);
  const p = (emisor ?? receptor)?.p ?? 0;
  const total = emisor ? p + 4 : receptor ? p + 2 : 2;
  const final = paso === total - 1;
  const esCatedra = modo === 'emisor' ? datos === DATOS_CATEDRA : recibida === RECIBIDA_CATEDRA;

  const editar = (cambio: (valor: string) => string) => {
    if (modo === 'emisor') setDatos(cambio(datos).slice(0, MAXIMO_DATOS));
    else setRecibida(cambio(recibida).slice(0, MAXIMO_PALABRA));
    setAviso(undefined);
  };

  const ir = (destino: number) => {
    if (paso === 0 && destino === 1 && error) {
      setAviso(error);
      return;
    }
    setCorregido(false);
    setPaso(destino);
  };

  let frase: Frase =
    modo === 'emisor'
      ? { animacion: 'hablando', texto: 'Cargá los datos y armamos la palabra de Hamming paso a paso.' }
      : { animacion: 'hablando', texto: 'Cargá la palabra recibida y revisamos grupo por grupo.' };
  if (aviso) frase = { animacion: 'confundido', texto: 'Así no puedo armar los grupos. Mirá el aviso.' };
  else if (final && emisor) frase = { animacion: 'festejando', texto: '¡Muy bien! Esa es la palabra a transmitir.' };
  else if (final && receptor?.posicion === 0) {
    frase = { animacion: 'festejando', texto: '¡Síndrome cero! La palabra llegó sin error.' };
  } else if (final && receptor?.corregida === null) {
    frase = { animacion: 'retando', texto: '¡Hay error, pero el síndrome se sale de la palabra!' };
  } else if (final && receptor && !corregido) {
    frase = { animacion: 'retando', texto: '¡Ojo! Un bit llegó cambiado. Corregilo.' };
  } else if (final && receptor) frase = { animacion: 'festejando', texto: '¡Eso! Palabra corregida.' };

  let nombrePaso: string;
  if (modo === 'emisor') {
    if (paso === 0) nombrePaso = 'Datos';
    else if (final) nombrePaso = 'Palabra a transmitir';
    else if (paso === 1) nombrePaso = 'Cuántos bits de paridad';
    else if (paso === 2) nombrePaso = 'Posiciones';
    else nombrePaso = `Grupo p${paso - 2}`;
  } else {
    nombrePaso = paso === 0 ? 'Palabra recibida' : final ? 'Síndrome y corrección' : `Grupo p${paso}`;
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.pantalla}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          <Opciones
            rotulo="Modo"
            opciones={[
              { valor: 'emisor', texto: 'Codificar (emisor)' },
              { valor: 'receptor', texto: 'Verificar (receptor)' },
            ]}
            elegida={modo}
            onElegir={(nuevo) => {
              setModo(nuevo);
              setPaso(0);
              setAviso(undefined);
              setCorregido(false);
            }}
          />
          <ProgresoPasos paso={paso} total={total} nombre={nombrePaso} />

          {paso === 0 ? (
            <>
              {modo === 'emisor' ? (
                <CampoBits
                  rotulo={datos.length ? `Datos n${datos.length} … n1` : 'Datos'}
                  valor={datos}
                  activo
                  onPress={() => {}}
                />
              ) : (
                <CampoBits
                  rotulo={recibida.length ? `Palabra recibida · posición ${recibida.length} → 1` : 'Palabra recibida'}
                  valor={recibida}
                  activo
                  onPress={() => {}}
                />
              )}
              <Opciones
                rotulo="Ejemplos"
                opciones={[{ valor: 'catedra', texto: 'Cátedra' }]}
                elegida={esCatedra ? 'catedra' : undefined}
                onElegir={() => {
                  setDatos(DATOS_CATEDRA);
                  setRecibida(RECIBIDA_CATEDRA);
                  setAviso(undefined);
                }}
              />
              <Text style={estilos.nota}>Paridad par, como en el ejemplo de la cátedra (págs. 49-50).</Text>
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
          ) : emisor ? (
            <PasoEmisor codigo={emisor} datos={datos} paso={paso} final={final} />
          ) : receptor ? (
            <PasoReceptor
              decodificacion={receptor}
              recibida={recibida}
              paso={paso}
              final={final}
              corregido={corregido}
              onCorregir={() => setCorregido(true)}
            />
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

function PasoEmisor({
  codigo,
  datos,
  paso,
  final,
}: {
  codigo: ReturnType<typeof codificarHamming>;
  datos: string;
  paso: number;
  final: boolean;
}) {
  const n = datos.length;
  const { p, palabra, posiciones, grupos } = codigo;

  if (paso === 1) {
    return (
      <>
        <View style={estilos.hoja}>
          <Text style={estilos.tituloHoja}>{`2^p ≥ n + p + 1 con n = ${n}`}</Text>
          {Array.from({ length: p }, (_, i) => {
            const q = i + 1;
            const cumple = 2 ** q >= n + q + 1;
            return (
              <Text key={q} style={estilos.desigualdad}>
                {`p = ${q}: 2^${q} = ${2 ** q} ≥ ${n} + ${q} + 1 = ${n + q + 1} ${cumple ? '✓' : '✗'}`}
              </Text>
            );
          })}
        </View>
        <Explicacion titulo={`p = ${p} · palabra de ${palabra.length} bits`}>
          {`p es el menor entero que cumple la desigualdad. Los bits de paridad van en las posiciones ${grupos
            .map((_, i) => 1 << i)
            .join(', ')}.`}
        </Explicacion>
      </>
    );
  }

  // Cuántos grupos ya se calcularon: el paso 2 es la tabla vacía, el 3 es p1…
  const hechos = final ? p : paso - 2;
  const conocido = (posicion: PosicionHamming) =>
    posicion.tipo === 'n' || Math.log2(posicion.pos) < hechos;

  return (
    <>
      <TablaHamming
        posiciones={posiciones}
        nombreFila={final ? 'TX' : 'n'}
        bitDe={(posicion) => (conocido(posicion) ? posicion.bit : '?')}
        grupos={grupos.slice(0, hechos).map((g) => g.paridad)}
        actual={final ? -1 : hechos - 1}
      />
      {final ? (
        <TarjetaEstado estado="ok" titulo={`n + p = ${palabra.length} bits a transmitir`}>
          <Text testID="hamming-palabra" style={estilos.palabra}>
            {palabra}
          </Text>
          <Text style={estilos.cuerpo}>
            {`${grupos
              .map((g) => g.paridad)
              .reverse()
              .join(' ')} = ${grupos
              .map((g) => g.bit)
              .reverse()
              .join(' ')} · paridad par (pág. 49)`}
          </Text>
        </TarjetaEstado>
      ) : paso === 2 ? (
        <Explicacion titulo={`Paridad en las posiciones ${grupos.map((_, i) => 1 << i).join(', ')}`}>
          {`Los datos n${n} … n1 ocupan las demás, de la posición ${palabra.length} hacia la 1. Los «?» se calculan en los pasos siguientes.`}
        </Explicacion>
      ) : (
        <ExplicacionGrupoEmisor grupo={grupos[hechos - 1]} />
      )}
    </>
  );
}

function ExplicacionGrupoEmisor({ grupo }: { grupo: ReturnType<typeof codificarHamming>['grupos'][number] }) {
  return (
    <Explicacion titulo={`${grupo.paridad} = ${grupo.bit}`}>
      {`Posiciones ${grupo.posicionesCubiertas.join(', ')}: ${unos(grupo.unos)}. Con paridad par, ${grupo.paridad} completa un número par de unos.`}
    </Explicacion>
  );
}

function PasoReceptor({
  decodificacion,
  recibida,
  paso,
  final,
  corregido,
  onCorregir,
}: {
  decodificacion: ReturnType<typeof decodificarHamming>;
  recibida: string;
  paso: number;
  final: boolean;
  corregido: boolean;
  onCorregir: () => void;
}) {
  const { p, posiciones, grupos, sindrome, posicion, corregida } = decodificacion;
  const hechos = final ? p : paso;
  const erronea = posiciones.find((pos) => pos.pos === posicion);
  const marcas: Record<number, Marca> = {};
  if (final && erronea && corregida !== null) marcas[posicion] = corregido ? 'corregido' : 'error';

  return (
    <>
      <TablaHamming
        posiciones={posiciones}
        nombreFila="RX"
        bitDe={(pos) => (marcas[pos.pos] === 'corregido' ? invertir(pos.bit) : pos.bit)}
        grupos={grupos.slice(0, hechos).map((g) => g.paridad)}
        actual={final ? -1 : hechos - 1}
        marcas={marcas}
      />
      <Sindrome grupos={grupos} hechos={hechos} />
      {!final ? (
        <ExplicacionGrupoReceptor grupo={grupos[hechos - 1]} recibida={recibida} />
      ) : posicion === 0 ? (
        <TarjetaEstado estado="ok" titulo={`Síndrome ${sindrome} · sin error`}>
          <Text style={estilos.cuerpo}>Todos los grupos cumplen la paridad par.</Text>
        </TarjetaEstado>
      ) : corregida === null || !erronea ? (
        <TarjetaEstado estado="error" titulo={`Síndrome ${sindrome} = ${posicion} · la posición ${posicion} no existe`}>
          <Text style={estilos.cuerpo}>
            {`Hay error, pero la palabra tiene ${recibida.length} bits: el síndrome no señala ninguno y no se puede corregir.`}
          </Text>
        </TarjetaEstado>
      ) : (
        <TarjetaEstado
          estado="error"
          titulo={`Síndrome ${sindrome} = ${posicion} · error en la posición ${posicion} (${erronea.etiqueta})`}
        >
          <Text style={estilos.cuerpo}>{`Llegó ${erronea.bit}; el bit correcto es ${invertir(erronea.bit)}.`}</Text>
          {corregido ? (
            <>
              <Text style={estilos.cuerpo}>Palabra corregida:</Text>
              <Text testID="hamming-corregida" style={estilos.palabra}>
                {[...corregida].map((bit, i) =>
                  corregida.length - i === posicion ? (
                    <Text key={i} style={estilos.bitCorregido}>
                      {bit}
                    </Text>
                  ) : (
                    bit
                  ),
                )}
              </Text>
            </>
          ) : (
            <Pressable accessibilityRole="button" onPress={onCorregir} style={estilos.botonCorregir}>
              <Text style={estilos.textoBotonCorregir}>Corregir el bit</Text>
            </Pressable>
          )}
        </TarjetaEstado>
      )}
    </>
  );
}

function ExplicacionGrupoReceptor({ grupo, recibida }: { grupo: GrupoReceptor; recibida: string }) {
  const bits = grupo.posicionesCubiertas.map((pos) => recibida[recibida.length - pos]);
  return (
    <Explicacion
      titulo={`${grupo.cumple ? '✓' : '✗'} ${grupo.paridad} ${grupo.cumple ? 'cumple' : 'no cumple'} · ${unos(grupo.unos)} → ${grupo.bit}`}
    >
      {`Posiciones ${grupo.posicionesCubiertas.join(', ')}: ${bits.join(' + ')}. ` +
        (grupo.cumple
          ? 'Cantidad par: el grupo cumple la paridad par.'
          : 'Cantidad impar: este grupo no cumple la paridad par.')}
    </Explicacion>
  );
}

/** Las cajas pp … p1 del síndrome; se llenan a medida que se revisa cada grupo. */
function Sindrome({ grupos, hechos }: { grupos: readonly GrupoReceptor[]; hechos: number }) {
  const cajas = grupos.map((g, i) => ({ ...g, visto: i < hechos })).reverse();
  return (
    <View
      style={estilos.sindrome}
      accessibilityLabel={`Síndrome ${cajas.map((c) => `${c.paridad} ${c.visto ? c.bit : 'sin revisar'}`).join(', ')}`}
    >
      <Text style={estilos.tituloHoja}>Síndrome</Text>
      {cajas.map((caja) => (
        <View key={caja.paridad} style={[estilos.caja, caja.visto && caja.bit === '1' && estilos.cajaUno]}>
          <Text style={estilos.rotuloCaja}>{caja.paridad}</Text>
          <Text style={[estilos.bitCaja, caja.visto && caja.bit === '1' && estilos.textoError]}>
            {caja.visto ? caja.bit : ' '}
          </Text>
        </View>
      ))}
    </View>
  );
}

type Marca = 'error' | 'corregido';

/**
 * La tabla de las págs. 49-50: etiquetas, posiciones n+p … 1, la fila de bits y una fila por
 * grupo con los bits que cubre. Lo cubierto lleva el bit escrito, no sólo el fondo.
 */
function TablaHamming({
  posiciones,
  nombreFila,
  bitDe,
  grupos,
  actual,
  marcas = {},
}: {
  posiciones: readonly PosicionHamming[];
  nombreFila: string;
  bitDe: (posicion: PosicionHamming) => string;
  grupos: readonly string[];
  actual: number;
  marcas?: Record<number, Marca>;
}) {
  return (
    <ScrollView horizontal style={estilos.hoja} contentContainerStyle={estilos.hojaContenido}>
      <View accessibilityLabel={`Tabla de Hamming, posiciones ${posiciones.length} a 1`}>
        <View style={estilos.fila}>
          <Text style={estilos.rotuloFila} />
          {posiciones.map((pos) => (
            <Text key={pos.pos} style={[estilos.celda, estilos.etiqueta, pos.tipo === 'p' && estilos.celdaParidad]}>
              {pos.etiqueta}
            </Text>
          ))}
        </View>
        <View style={estilos.fila}>
          <Text style={estilos.rotuloFila}>pos.</Text>
          {posiciones.map((pos) => (
            <Text key={pos.pos} style={[estilos.celda, estilos.etiqueta]}>
              {pos.pos}
            </Text>
          ))}
        </View>
        <View style={estilos.fila}>
          <Text style={estilos.rotuloFila}>{nombreFila}</Text>
          {posiciones.map((pos) => (
            <Text
              key={pos.pos}
              style={[
                estilos.celda,
                estilos.bit,
                marcas[pos.pos] === 'error' && estilos.celdaError,
                marcas[pos.pos] === 'corregido' && estilos.celdaCorregida,
              ]}
            >
              {bitDe(pos)}
            </Text>
          ))}
        </View>
        {grupos.map((paridad, i) => {
          const mascara = 1 << i;
          const esActual = i === actual;
          return (
            <View key={paridad} style={[estilos.fila, esActual && estilos.filaActual]}>
              <Text style={estilos.rotuloFila}>{`${esActual ? '▸ ' : ''}${paridad}`}</Text>
              {posiciones.map((pos) => {
                const cubre = (pos.pos & mascara) !== 0;
                return (
                  <Text key={pos.pos} style={[estilos.celda, estilos.bit, cubre && estilos.celdaCubierta]}>
                    {cubre ? pos.bit : ''}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const ANCHO_CELDA = 28;

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
  nota: {
    ...tipografia.etiqueta,
    color: colores.aviso,
    padding: espacio.sm,
    borderRadius: radio.sm,
    backgroundColor: colores.avisoFondo,
  },
  cuerpo: { ...tipografia.cuerpo, color: colores.texto },
  palabra: { ...tipografia.subtitulo, fontFamily: fuentes.notaFuerte, color: colores.texto, letterSpacing: 2 },
  // El bit corregido: subrayado y en negrita, no sólo por color.
  bitCorregido: { color: colores.exito, textDecorationLine: 'underline' },
  hoja: {
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  hojaContenido: { padding: espacio.md, gap: espacio.xs },
  tituloHoja: { ...tipografia.etiqueta, color: colores.texto },
  desigualdad: { ...tipografia.cuerpo, fontFamily: fuentes.nota, color: colores.texto },
  fila: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colores.borde },
  filaActual: { backgroundColor: colores.superficieEnfasis },
  rotuloFila: {
    ...tipografia.etiqueta,
    width: 44,
    paddingVertical: espacio.xs,
    textAlign: 'right',
    paddingRight: espacio.sm,
    color: colores.accion,
  },
  celda: { width: ANCHO_CELDA, paddingVertical: espacio.xs, textAlign: 'center', color: colores.texto },
  etiqueta: { ...tipografia.pie },
  celdaParidad: { backgroundColor: colores.superficieEnfasis, fontFamily: fuentes.interfazFuerte },
  bit: { ...tipografia.cuerpo, fontFamily: fuentes.nota },
  celdaCubierta: { backgroundColor: colores.avisoFondo },
  celdaError: {
    backgroundColor: colores.errorFondo,
    color: colores.error,
    fontFamily: fuentes.notaFuerte,
    borderWidth: 2,
    borderColor: colores.error,
  },
  celdaCorregida: {
    backgroundColor: colores.exitoFondo,
    color: colores.exito,
    fontFamily: fuentes.notaFuerte,
    textDecorationLine: 'underline',
  },
  sindrome: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: espacio.sm },
  caja: {
    width: 44,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colores.borde,
    borderRadius: radio.sm,
    backgroundColor: colores.superficie,
  },
  cajaUno: { borderColor: colores.error, backgroundColor: colores.errorFondo },
  rotuloCaja: { ...tipografia.pie, fontFamily: fuentes.interfazFuerte, color: colores.texto },
  bitCaja: { ...tipografia.subtitulo, fontFamily: fuentes.notaFuerte, color: colores.texto },
  textoError: { color: colores.error },
  botonCorregir: {
    alignSelf: 'flex-start',
    minHeight: 44,
    paddingHorizontal: espacio.lg,
    justifyContent: 'center',
    borderRadius: radio.pastilla,
    backgroundColor: colores.accion,
  },
  textoBotonCorregir: { ...tipografia.etiqueta, color: colores.superficie },
  barraInferior: {
    padding: espacio.lg,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.fondo,
  },
});
