import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { invertir } from '@/bits/bits';
import {
  bcc,
  tablaBidimensional,
  verificarTabla,
  type Celda,
  type TipoParidad,
} from '@/bits/paridad';
import type { Frase } from '@/guia/frases';
import { ALTO_GUIA, Guia } from '@/guia/guia';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

import { Explicacion, NavegacionPasos, Opciones, ProgresoPasos, TarjetaEstado } from './pasos';
import { CampoBits, TecladoBits } from './teclado';

type Vista = 'tabla' | 'bcc';
type Modo = 'emisor' | 'receptor';

/** La tabla del Ejemplo 02 (pág. 25), escrita por filas B1..B7 como en la diapositiva. */
const FILAS_CATEDRA = [
  '00010101',
  '11110111',
  '10000101',
  '01010111',
  '01000100',
  '01110110',
  '01100100',
];
/** La misma tabla por columnas D1..D8, que es como la recibe `paridad.ts`. */
const COLUMNAS_CATEDRA = Array.from({ length: 8 }, (_, j) =>
  FILAS_CATEDRA.map((fila) => fila[j]).join(''),
);
/** Lo que llega en la pág. 25: el bit B4 de D6 invertido, con el VRC y el LRC transmitidos. */
const RECIBIDA_CATEDRA = COLUMNAS_CATEDRA.map((columna, j) => (j === 5 ? invertirEn(columna, 3) : columna));
const LRC_CATEDRA = '1111011';
const VRC_CATEDRA = '01100110';
const ESQUINA_CATEDRA = '0';

/** El bloque de la pág. 23. */
const BLOQUE_CATEDRA = ['10101001', '00111001', '11011101', '11100111'];
const BITS_POR_CARACTER = 8;
const MAXIMO_CARACTERES = 8;

function invertirEn(cadena: string, i: number): string {
  return cadena.slice(0, i) + invertir(cadena[i]) + cadena.slice(i + 1);
}

const iguales = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((s, i) => s === b[i]);

/** «1 fila», «2 filas». */
const plural = (n: number, palabra: string) => `${n} ${palabra}${n === 1 ? '' : 's'}`;

function calcularBcc(bloque: readonly string[]) {
  try {
    return { resultado: bcc(bloque, 'par'), error: undefined };
  } catch (e) {
    return { resultado: undefined, error: (e as Error).message };
  }
}

/**
 * VRC/LRC paso a paso (U06, págs. 18-25). Dos vistas: la tabla bidimensional del
 * Ejemplo 02, en el emisor y en el receptor, y el BCC lineal de la pág. 23.
 */
export function PantallaVrcLrc() {
  const [vista, setVista] = useState<Vista>('tabla');
  const [modo, setModo] = useState<Modo>('emisor');
  const [tipo, setTipo] = useState<TipoParidad>('par');
  const [columnas, setColumnas] = useState(COLUMNAS_CATEDRA);
  const [recibida, setRecibida] = useState(RECIBIDA_CATEDRA);
  const [lrcRx, setLrcRx] = useState(LRC_CATEDRA);
  const [vrcRx, setVrcRx] = useState(VRC_CATEDRA);
  const [esquinaRx, setEsquinaRx] = useState(ESQUINA_CATEDRA);
  const [corregida, setCorregida] = useState(false);
  const [bloque, setBloque] = useState(BLOQUE_CATEDRA);
  const [activo, setActivo] = useState(0);
  const [paso, setPaso] = useState(0);
  const [aviso, setAviso] = useState<string>();

  const tabla = tablaBidimensional(columnas, tipo);
  const verificacion = verificarTabla(recibida, lrcRx, vrcRx, tipo);
  const { resultado: bccCalculado, error: errorBcc } = calcularBcc(bloque);

  const ancho = bccCalculado?.length ?? 0;
  const total = vista === 'bcc' ? ancho + 2 : modo === 'emisor' ? 5 : 4;
  const final = paso === total - 1;

  const esCatedra =
    vista === 'bcc'
      ? iguales(bloque, BLOQUE_CATEDRA)
      : modo === 'emisor'
        ? iguales(columnas, COLUMNAS_CATEDRA)
        : iguales(recibida, RECIBIDA_CATEDRA) && lrcRx === LRC_CATEDRA && vrcRx === VRC_CATEDRA;

  const reiniciar = () => {
    setPaso(0);
    setCorregida(false);
    setAviso(undefined);
  };

  const ir = (destino: number) => {
    if (vista === 'bcc' && paso === 0 && destino === 1 && errorBcc) {
      setAviso(errorBcc);
      return;
    }
    setCorregida(false);
    setPaso(destino);
  };

  const editarCaracter = (cambio: (valor: string) => string) => {
    setBloque((previo) =>
      previo.map((c, k) => (k === activo ? cambio(c).slice(0, BITS_POR_CARACTER) : c)),
    );
    setAviso(undefined);
  };

  const cargarCatedra = () => {
    if (vista === 'bcc') {
      setBloque(BLOQUE_CATEDRA);
      setActivo(0);
    } else if (modo === 'emisor') {
      setColumnas(COLUMNAS_CATEDRA);
    } else {
      setRecibida(RECIBIDA_CATEDRA);
      setLrcRx(LRC_CATEDRA);
      setVrcRx(VRC_CATEDRA);
      setEsquinaRx(ESQUINA_CATEDRA);
    }
    reiniciar();
  };

  const { columnasConError, filasConError, celdaErronea } = verificacion;
  const hayError = columnasConError.length + filasConError.length > 0;

  let frase: Frase = {
    animacion: 'hablando',
    texto:
      vista === 'bcc'
        ? 'Cargá los caracteres y armamos el BCC columna por columna.'
        : 'Tocá un bit para cambiarlo y seguí la paridad paso a paso.',
  };
  if (aviso) frase = { animacion: 'confundido', texto: 'Así no puedo armar el BCC. Mirá el aviso.' };
  else if (final && vista === 'tabla' && modo === 'receptor' && hayError) {
    if (celdaErronea && corregida) frase = { animacion: 'festejando', texto: '¡Bit corregido! La tabla cierra.' };
    else if (celdaErronea) {
      frase = {
        animacion: 'retando',
        texto: `¡Te encontré! El error está en B${celdaErronea.fila} · D${celdaErronea.columna}.`,
      };
    } else frase = { animacion: 'retando', texto: 'Hay error, pero no hay un cruce único para ubicarlo.' };
  } else if (final) frase = { animacion: 'festejando', texto: '¡Muy bien! Todas las paridades cierran.' };

  const nombres =
    vista === 'bcc'
      ? undefined
      : modo === 'emisor'
        ? ['Entrada', 'VRC por columna', 'LRC por fila', 'Esquina', 'Resultado']
        : ['Entrada', 'VRC por columna', 'LRC por fila', 'Resultado'];
  const nombrePaso =
    nombres?.[paso] ?? (paso === 0 ? 'Entrada' : final ? 'Resultado' : `Columna ${paso} de ${ancho}`);

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.pantalla}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          <Opciones
            rotulo="Vista"
            opciones={[
              { valor: 'tabla', texto: 'Tabla VRC/LRC' },
              { valor: 'bcc', texto: 'BCC lineal' },
            ]}
            elegida={vista}
            onElegir={(nueva) => {
              setVista(nueva);
              reiniciar();
            }}
          />
          {vista === 'tabla' ? (
            <>
              <Opciones
                rotulo="Modo"
                opciones={[
                  { valor: 'emisor', texto: 'Emisor' },
                  { valor: 'receptor', texto: 'Receptor' },
                ]}
                elegida={modo}
                onElegir={(nuevo) => {
                  setModo(nuevo);
                  reiniciar();
                }}
              />
              <Opciones
                rotulo="Tipo de paridad"
                opciones={[
                  { valor: 'par', texto: 'Par' },
                  { valor: 'impar', texto: 'Impar' },
                ]}
                elegida={tipo}
                onElegir={(nuevo) => {
                  setTipo(nuevo);
                  setCorregida(false);
                }}
              />
              {tipo === 'impar' && esCatedra ? (
                <Text style={estilos.nota}>
                  ⚠ El ejemplo de la cátedra usa paridad par (pág. 25): con impar, el resultado ya no es el
                  de la diapositiva.
                </Text>
              ) : null}
            </>
          ) : null}
          <ProgresoPasos paso={paso} total={total} nombre={nombrePaso} />

          {paso === 0 ? (
            <Opciones
              rotulo="Ejemplos"
              opciones={[{ valor: 'catedra', texto: `Cátedra · pág. ${vista === 'bcc' ? 23 : 25}` }]}
              elegida={esCatedra ? 'catedra' : undefined}
              onElegir={cargarCatedra}
            />
          ) : null}

          {vista === 'bcc' ? (
            <VistaBcc
              bloque={bloque}
              bcc={bccCalculado}
              paso={paso}
              final={final}
              activo={activo}
              aviso={aviso}
              onActivar={setActivo}
              onEditar={editarCaracter}
              onAgregar={() => {
                setBloque((previo) => [...previo, '']);
                setActivo(bloque.length);
              }}
              onQuitar={() => {
                setBloque((previo) => previo.slice(0, -1));
                setActivo((previo) => Math.min(previo, bloque.length - 2));
                setAviso(undefined);
              }}
            />
          ) : modo === 'emisor' ? (
            <>
              <ExplicacionEmisor paso={paso} tipo={tipo} {...tabla} />
              <TablaParidad
                columnas={columnas}
                vrc={paso >= 1 ? tabla.vrc : ''}
                lrc={paso >= 2 ? tabla.lrc : ''}
                esquina={paso >= 3 ? tabla.esquina : ''}
                onCelda={
                  paso === 0
                    ? (fila, columna) =>
                        setColumnas((previo) =>
                          previo.map((c, j) => (j === columna ? invertirEn(c, fila) : c)),
                        )
                    : undefined
                }
              />
            </>
          ) : (
            <>
              {final ? (
                <ResultadoReceptor
                  filas={filasConError.length}
                  columnas={columnasConError.length}
                  celda={celdaErronea}
                  llego={celdaErronea ? recibida[celdaErronea.columna - 1][celdaErronea.fila - 1] : ''}
                  corregida={corregida}
                  onCorregir={() => setCorregida(true)}
                />
              ) : (
                <ExplicacionReceptor
                  paso={paso}
                  calculado={paso === 1 ? verificacion.vrc : verificacion.lrc}
                  llegado={paso === 1 ? vrcRx : lrcRx}
                  conError={paso === 1 ? columnasConError : filasConError}
                />
              )}
              <TablaParidad
                columnas={corregida && celdaErronea ? verificacion.corregida : recibida}
                vrc={vrcRx}
                lrc={lrcRx}
                esquina={esquinaRx}
                vrcMal={paso >= 1 ? columnasConError : []}
                lrcMal={paso >= 2 ? filasConError : []}
                cruce={final ? celdaErronea : null}
                corregida={corregida}
                onCelda={
                  paso === 0
                    ? (fila, columna) =>
                        setRecibida((previo) =>
                          previo.map((c, j) => (j === columna ? invertirEn(c, fila) : c)),
                        )
                    : undefined
                }
                onControl={
                  paso === 0
                    ? (control, i) => {
                        if (control === 'vrc') setVrcRx((previo) => invertirEn(previo, i));
                        else if (control === 'lrc') setLrcRx((previo) => invertirEn(previo, i));
                        else setEsquinaRx((previo) => invertir(previo));
                      }
                    : undefined
                }
              />
            </>
          )}
        </ScrollView>
        <Guia {...frase} />
      </View>
      <View style={estilos.barraInferior}>
        <NavegacionPasos paso={paso} total={total} onIr={ir} />
      </View>
    </View>
  );
}

function ExplicacionEmisor({
  paso,
  tipo,
  vrc,
  lrc,
  esquina,
}: {
  paso: number;
  tipo: TipoParidad;
  vrc: string;
  lrc: string;
  esquina: string;
}) {
  if (paso === 0) {
    return (
      <Explicacion titulo="Cada columna es un carácter">
        D1…D8 son los caracteres y B1…B7 sus posiciones de bit, como en la pág. 25. Tocá una celda para
        cambiar el bit.
      </Explicacion>
    );
  }
  if (paso === 1) {
    return (
      <Explicacion titulo={`VRC = ${vrc}`}>
        {`Un bit por carácter: la paridad ${tipo} de cada columna D1…D8 (pág. 20). Va en la fila de abajo.`}
      </Explicacion>
    );
  }
  if (paso === 2) {
    return (
      <Explicacion titulo={`LRC = ${lrc}`}>
        {`Un bit por fila: la paridad ${tipo} de cada posición B1…B7 sobre todos los caracteres (pág. 22). Va en la columna de la derecha.`}
      </Explicacion>
    );
  }
  if (paso === 3) {
    return (
      <Explicacion titulo={`Esquina = ${esquina}`}>
        {`El bit del cruce es la paridad ${tipo} de la propia fila del VRC.`}
      </Explicacion>
    );
  }
  return (
    <TarjetaEstado estado="ok" titulo="Tabla a transmitir">
      <Text testID="vrc-resumen" style={estilos.trama}>
        {`LRC ${lrc} · VRC ${vrc} · esquina ${esquina}`}
      </Text>
      <Text style={estilos.cuerpo}>
        Los caracteres viajan con su VRC, y el LRC va como carácter de control del bloque (pág. 22).
      </Text>
    </TarjetaEstado>
  );
}

function ExplicacionReceptor({
  paso,
  calculado,
  llegado,
  conError,
}: {
  paso: number;
  calculado: string;
  llegado: string;
  conError: readonly number[];
}) {
  if (paso === 0) {
    return (
      <Explicacion titulo="Llegan los caracteres con su VRC y su LRC">
        Los recuadros de la fila de abajo y de la columna de la derecha son los bits de control tal como
        llegaron. Tocá cualquier bit para cambiar lo que llegó.
      </Explicacion>
    );
  }
  const control = paso === 1 ? 'VRC' : 'LRC';
  const prefijo = paso === 1 ? 'D' : 'B';
  return (
    <>
      <Explicacion titulo={`${control} recalculado = ${calculado}`}>
        {paso === 1
          ? 'Se recalcula la paridad de cada columna y se compara con el VRC que llegó.'
          : 'Se recalcula la paridad de cada fila y se compara con el LRC que llegó.'}
      </Explicacion>
      <View style={estilos.chequeos} accessibilityLiveRegion="polite">
        {conError.length === 0 ? (
          <Chequeo ok texto={`Todas las ${paso === 1 ? 'columnas' : 'filas'} cumplen`} />
        ) : (
          conError.map((n) => (
            <Chequeo
              key={n}
              texto={`${control} de ${prefijo}${n}: llegó ${llegado[n - 1]}, da ${calculado[n - 1]}`}
            />
          ))
        )}
      </View>
    </>
  );
}

function Chequeo({ ok = false, texto }: { ok?: boolean; texto: string }) {
  return (
    <View style={estilos.chequeo}>
      <Text style={[estilos.iconoChequeo, { color: ok ? colores.exito : colores.error }]}>{ok ? '✓' : '⚠'}</Text>
      <Text style={estilos.cuerpo}>{texto}</Text>
    </View>
  );
}

function ResultadoReceptor({
  filas,
  columnas,
  celda,
  llego,
  corregida,
  onCorregir,
}: {
  filas: number;
  columnas: number;
  celda: Celda | null;
  llego: string;
  corregida: boolean;
  onCorregir: () => void;
}) {
  if (filas + columnas === 0) {
    return (
      <TarjetaEstado estado="ok" titulo="Sin error detectado">
        <Text style={estilos.cuerpo}>
          Todas las filas y columnas cumplen la paridad. Ojo: errores en un número par de bits, en iguales
          posiciones de un número par de caracteres, pasan sin detectarse (pág. 24).
        </Text>
      </TarjetaEstado>
    );
  }
  if (!celda) {
    return (
      <TarjetaEstado estado="error" titulo="Error detectado, sin cruce único">
        <Text style={estilos.cuerpo}>
          {`Fallan ${plural(filas, 'fila')} y ${plural(columnas, 'columna')}: no hay un único cruce, así que el bit no se puede ubicar. VRC y LRC juntos ubican con precisión un solo error (pág. 25).`}
        </Text>
      </TarjetaEstado>
    );
  }
  const nombre = `B${celda.fila} · D${celda.columna}`;
  if (corregida) {
    return (
      <TarjetaEstado estado="ok" titulo={`Corregido: ${nombre} = ${invertir(llego)}`}>
        <Text style={estilos.cuerpo}>
          Con un solo error, VRC y LRC juntos determinan el bit erróneo y permiten corregirlo (pág. 25).
        </Text>
      </TarjetaEstado>
    );
  }
  return (
    <TarjetaEstado estado="error" titulo={`Error en ${nombre}`}>
      <Text style={estilos.cuerpo}>
        {`Falla el VRC de D${celda.columna} y el LRC de B${celda.fila}: el bit erróneo es el del cruce (pág. 25). Llegó ${llego}.`}
      </Text>
      <Pressable accessibilityRole="button" onPress={onCorregir} style={estilos.botonCorregir}>
        <Text style={estilos.textoBoton}>Corregir el bit</Text>
      </Pressable>
    </TarjetaEstado>
  );
}

/**
 * La tabla de la pág. 25: filas B1…Bm, columnas D1…Dk, el VRC abajo y el LRC a la derecha.
 * Un control vacío ('') todavía no se calculó. Lo marcado no depende sólo del color: lleva
 * borde grueso, ⚠ en el encabezado y lo dice la etiqueta accesible.
 */
function TablaParidad({
  columnas,
  vrc,
  lrc,
  esquina,
  vrcMal = [],
  lrcMal = [],
  cruce = null,
  corregida = false,
  onCelda,
  onControl,
}: {
  columnas: readonly string[];
  vrc: string;
  lrc: string;
  esquina: string;
  vrcMal?: readonly number[];
  lrcMal?: readonly number[];
  cruce?: Celda | null;
  corregida?: boolean;
  onCelda?: (fila: number, columna: number) => void;
  onControl?: (control: 'vrc' | 'lrc' | 'esquina', indice: number) => void;
}) {
  const filas = columnas[0].length;
  const control = (texto: string | undefined, mal: boolean) =>
    `${texto || 'sin calcular'}${mal ? ', no coincide' : ''}`;

  return (
    <ScrollView horizontal style={estilos.hoja} contentContainerStyle={estilos.hojaContenido}>
      <View>
        <View style={estilos.filaTabla}>
          <View style={estilos.encabezadoFila} />
          {columnas.map((_, j) => (
            <Encabezado key={j} texto={`D${j + 1}`} marcado={vrcMal.includes(j + 1)} />
          ))}
          <Encabezado texto="LRC" />
        </View>
        {Array.from({ length: filas }, (_, i) => (
          <View key={i} style={estilos.filaTabla}>
            <Text style={[estilos.encabezadoFila, estilos.textoEncabezado]}>
              {`B${i + 1}${lrcMal.includes(i + 1) ? ' ⚠' : ''}`}
            </Text>
            {columnas.map((columna, j) => {
              const bit = columna[i];
              const enCruce = cruce?.fila === i + 1 && cruce.columna === j + 1;
              const marca = enCruce ? (corregida ? ', corregido' : ', bit erróneo') : '';
              const sombreada = lrcMal.includes(i + 1) || vrcMal.includes(j + 1);
              return (
                <CeldaBit
                  key={j}
                  bit={bit}
                  etiqueta={`B${i + 1}, D${j + 1}: ${bit}${marca}`}
                  estilo={[
                    sombreada && estilos.celdaSombreada,
                    enCruce && (corregida ? estilos.celdaCorregida : estilos.celdaErronea),
                  ]}
                  onPress={onCelda && (() => onCelda(i, j))}
                />
              );
            })}
            <CeldaBit
              bit={lrc[i] ?? ''}
              etiqueta={`LRC de B${i + 1}: ${control(lrc[i], lrcMal.includes(i + 1))}`}
              estilo={[estilos.celdaControl, lrcMal.includes(i + 1) && estilos.celdaErronea]}
              onPress={onControl && (() => onControl('lrc', i))}
            />
          </View>
        ))}
        <View style={estilos.filaTabla}>
          <Text style={[estilos.encabezadoFila, estilos.textoEncabezado]}>VRC</Text>
          {columnas.map((_, j) => (
            <CeldaBit
              key={j}
              bit={vrc[j] ?? ''}
              etiqueta={`VRC de D${j + 1}: ${control(vrc[j], vrcMal.includes(j + 1))}`}
              estilo={[estilos.celdaControl, vrcMal.includes(j + 1) && estilos.celdaErronea]}
              onPress={onControl && (() => onControl('vrc', j))}
            />
          ))}
          <CeldaBit
            bit={esquina}
            etiqueta={`Esquina: ${control(esquina, false)}`}
            estilo={[estilos.celdaControl]}
            onPress={onControl && (() => onControl('esquina', 0))}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function Encabezado({ texto, marcado = false }: { texto: string; marcado?: boolean }) {
  return (
    <View style={estilos.celda}>
      <Text style={estilos.textoEncabezado}>{texto}</Text>
      {marcado ? <Text style={estilos.marcaEncabezado}>⚠</Text> : null}
    </View>
  );
}

function CeldaBit({
  bit,
  etiqueta,
  estilo,
  onPress,
}: {
  bit: string;
  etiqueta: string;
  estilo: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  const estilos_ = [estilos.celda, estilos.celdaBit, estilo];
  const texto = <Text style={estilos.textoBit}>{bit}</Text>;
  return onPress ? (
    <Pressable accessibilityRole="button" accessibilityLabel={etiqueta} onPress={onPress} style={estilos_}>
      {texto}
    </Pressable>
  ) : (
    <View accessible accessibilityLabel={etiqueta} style={estilos_}>
      {texto}
    </View>
  );
}

/** El BCC lineal de la pág. 23: un paso por cada columna de bits del bloque. */
function VistaBcc({
  bloque,
  bcc: resultado,
  paso,
  final,
  activo,
  aviso,
  onActivar,
  onEditar,
  onAgregar,
  onQuitar,
}: {
  bloque: readonly string[];
  bcc: string | undefined;
  paso: number;
  final: boolean;
  activo: number;
  aviso: string | undefined;
  onActivar: (indice: number) => void;
  onEditar: (cambio: (valor: string) => string) => void;
  onAgregar: () => void;
  onQuitar: () => void;
}) {
  if (paso === 0) {
    return (
      <>
        <Explicacion titulo="El bloque de caracteres">
          El BCC es la paridad de cada posición de bit sobre todo el bloque (pág. 22). Tocá un carácter
          para editarlo.
        </Explicacion>
        {bloque.map((caracter, k) => (
          <CampoBits
            key={k}
            rotulo={`Carácter ${k + 1}`}
            valor={caracter}
            activo={k === activo}
            onPress={() => onActivar(k)}
          />
        ))}
        <View style={estilos.botonesBloque}>
          {bloque.length < MAXIMO_CARACTERES ? (
            <Pressable accessibilityRole="button" onPress={onAgregar} style={estilos.botonSecundario}>
              <Text style={estilos.textoSecundario}>＋ Agregar carácter</Text>
            </Pressable>
          ) : null}
          {bloque.length > 1 ? (
            <Pressable accessibilityRole="button" onPress={onQuitar} style={estilos.botonSecundario}>
              <Text style={estilos.textoSecundario}>Quitar el último</Text>
            </Pressable>
          ) : null}
        </View>
        <TecladoBits
          onBit={(bit) => onEditar((valor) => valor + bit)}
          onBorrar={() => onEditar((valor) => valor.slice(0, -1))}
        />
        {aviso ? (
          <Text accessibilityRole="alert" style={estilos.aviso}>
            {aviso}
          </Text>
        ) : null}
      </>
    );
  }
  if (!resultado) return null;

  const columna = final ? -1 : paso - 1;
  const parcial = final ? resultado : resultado.slice(0, paso) + '·'.repeat(resultado.length - paso);

  return (
    <>
      {final ? (
        <TarjetaEstado estado="ok" titulo={`BCC = ${resultado}`}>
          <Text style={estilos.cuerpo}>Bloque transmitido, como lo dibuja la pág. 23 (BCC o LRC, y los datos):</Text>
          <Text testID="bcc-bloque" style={estilos.trama}>
            <Text style={estilos.resaltado}>{resultado}</Text>
            {` ${bloque.join(' ')}`}
          </Text>
        </TarjetaEstado>
      ) : (
        <ExplicacionColumna bloque={bloque} columna={columna} bit={resultado[columna]} />
      )}
      <ScrollView horizontal style={estilos.hoja} contentContainerStyle={estilos.hojaContenido}>
        <View accessibilityLabel={`Bloque de ${bloque.length} caracteres y BCC ${parcial}`}>
          {bloque.map((caracter, k) => (
            <View key={k} style={estilos.renglon}>
              <Text style={estilos.rotuloRenglon}>{k === 0 ? '' : '⊕'}</Text>
              <BitsConColumna bits={caracter} columna={columna} />
            </View>
          ))}
          <View style={[estilos.renglon, estilos.lineaBcc]}>
            <Text style={estilos.rotuloRenglon}>BCC</Text>
            <BitsConColumna bits={parcial} columna={columna} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function ExplicacionColumna({ bloque, columna, bit }: { bloque: readonly string[]; columna: number; bit: string }) {
  const bits = bloque.map((c) => c[columna]).join('');
  const unos = [...bits].filter((b) => b === '1').length;
  return (
    <Explicacion titulo={`Columna ${columna + 1}: ${bits} → ${bit}`}>
      {`Hay ${plural(unos, 'uno')} en esa posición: el BCC lleva ${bit} para que la cantidad de unos sea par. Es el XOR de la columna.`}
    </Explicacion>
  );
}

/** Los bits en monoespaciada, con la columna del paso subrayada y en negrita. */
function BitsConColumna({ bits, columna }: { bits: string; columna: number }) {
  return (
    <Text style={estilos.bits}>
      {bits.slice(0, Math.max(columna, 0))}
      {columna >= 0 ? <Text style={estilos.resaltado}>{bits[columna]}</Text> : null}
      {columna >= 0 ? bits.slice(columna + 1) : bits}
    </Text>
  );
}

const LADO_CELDA = 34;

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: espacio.lg, gap: espacio.md, paddingBottom: espacio.xxl + ALTO_GUIA },
  nota: {
    ...tipografia.cuerpo,
    color: colores.texto,
    padding: espacio.md,
    borderRadius: radio.md,
    backgroundColor: colores.avisoFondo,
  },
  aviso: {
    ...tipografia.cuerpo,
    color: colores.error,
    padding: espacio.md,
    borderRadius: radio.md,
    backgroundColor: colores.errorFondo,
  },
  cuerpo: { ...tipografia.cuerpo, color: colores.texto },
  trama: { ...tipografia.subtitulo, fontFamily: fuentes.notaFuerte, color: colores.texto },
  chequeos: { gap: espacio.xs },
  chequeo: { flexDirection: 'row', gap: espacio.sm, alignItems: 'flex-start' },
  iconoChequeo: { ...tipografia.subtitulo },
  botonCorregir: {
    alignSelf: 'flex-start',
    minHeight: 44,
    marginTop: espacio.sm,
    paddingHorizontal: espacio.lg,
    justifyContent: 'center',
    borderRadius: radio.pastilla,
    backgroundColor: colores.accion,
  },
  textoBoton: { ...tipografia.etiqueta, color: colores.superficie },
  botonesBloque: { flexDirection: 'row', flexWrap: 'wrap', gap: espacio.sm },
  botonSecundario: {
    minHeight: 44,
    paddingHorizontal: espacio.lg,
    justifyContent: 'center',
    borderRadius: radio.pastilla,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  textoSecundario: { ...tipografia.etiqueta, color: colores.accion },
  hoja: {
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  hojaContenido: { padding: espacio.md },
  filaTabla: { flexDirection: 'row' },
  encabezadoFila: { width: 44, alignSelf: 'center' },
  textoEncabezado: { ...tipografia.etiqueta, color: colores.textoSuave, textAlign: 'center' },
  marcaEncabezado: { ...tipografia.pie, color: colores.error },
  celda: { width: LADO_CELDA, minHeight: LADO_CELDA, alignItems: 'center', justifyContent: 'center' },
  celdaBit: { borderWidth: 1, borderColor: colores.borde, backgroundColor: colores.superficie },
  celdaControl: { backgroundColor: colores.superficieEnfasis },
  celdaSombreada: { backgroundColor: colores.avisoFondo },
  // El cruce lleva borde grueso además del color: se distingue aun sin verlo.
  celdaErronea: { borderWidth: 3, borderColor: colores.error, backgroundColor: colores.errorFondo },
  celdaCorregida: { borderWidth: 3, borderColor: colores.exito, backgroundColor: colores.exitoFondo },
  textoBit: { ...tipografia.subtitulo, fontFamily: fuentes.nota, color: colores.texto },
  renglon: { flexDirection: 'row' },
  lineaBcc: { borderTopWidth: 1, borderTopColor: colores.texto, marginTop: espacio.xs, paddingTop: espacio.xs },
  rotuloRenglon: { ...tipografia.etiqueta, width: 44, color: colores.accion },
  bits: { ...tipografia.cuerpo, fontFamily: fuentes.nota, color: colores.texto, letterSpacing: 2 },
  resaltado: { color: colores.accion, fontFamily: fuentes.notaFuerte, textDecorationLine: 'underline' },
  barraInferior: {
    padding: espacio.lg,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.fondo,
  },
});
