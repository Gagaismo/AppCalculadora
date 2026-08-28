import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colores, espacio, radio, tipografia } from '@/tema';

/**
 * Pantalla «Acerca de».
 *
 * Su razón de ser: la defensa oral del Trabajo Final Integrador gira sobre
 * tres ejes — qué es, cómo se hizo y para qué sirve. Esta pantalla cubre
 * los primeros dos dentro de la propia app, con datos verificables y sin
 * inventar nada que no esté en los documentos del repositorio.
 *
 * Cuatro secciones:
 * 1. Qué es — identidad del proyecto.
 * 2. Los números — cifras trazables al catálogo y los tests.
 * 3. Cómo leer una ficha — explicación de los tres elementos que la app
 *    muestra y que nadie explicó en la interfaz.
 * 4. Fuentes — de dónde sale cada Fórmula.
 */
export function PantallaAcerca() {
  return (
    <ScrollView
      style={estilos.pantalla}
      contentContainerStyle={estilos.contenido}
    >
      {/* ── 1. Qué es ──────────────────────────────────────────────────── */}
      <Seccion titulo="Qué es">
        <Parrafo>
          Calculadora de las fórmulas de{' '}
          <Enfasis>Comunicaciones</Enfasis> (UTN-FRT, 3.° año ISI). Trabajo
          Final Integrador de la materia, entregado como APK más informe
          escrito.
        </Parrafo>
        <Parrafo>
          La fuente son las diez <Enfasis>Presentaciones de unidad</Enfasis>{' '}
          de la materia. Toda Fórmula cita la página de la diapositiva de la
          que salió.
        </Parrafo>
      </Seccion>

      {/* ── 2. Los números ─────────────────────────────────────────────── */}
      <Seccion titulo="Los números">
        <ItemLista>
          <Cifra>138</Cifra> Fórmulas cargadas de las 140 del catálogo.
        </ItemLista>
        <ItemLista>
          <Cifra>234</Cifra> Ejemplos resueltos de la cátedra corriendo como
          casos de test contra el motor de cálculo.
        </ItemLista>
        <ItemLista>
          <Cifra>10</Cifra> Unidades temáticas. La Unidad 1 es introductoria
          y no tiene fórmulas calculables.
        </ItemLista>
        <AvisoFaltantes />
      </Seccion>

      {/* ── 3. Cómo leer una ficha ─────────────────────────────────────── */}
      <Seccion titulo="Cómo leer una ficha">
        <DefinicionTermino
          termino="Confianza de transcripción"
          valores="alta / media / baja"
        >
          Indica cuánta certeza hay de que la fórmula se copió correctamente
          de la diapositiva. Una confianza baja no significa que el resultado
          sea incorrecto, sino que la lectura del LaTeX original presentó
          ambigüedad.
        </DefinicionTermino>

        <DefinicionTermino termino="Apartamiento">
          Aparece cuando el Ejemplo resuelto de la cátedra tiene un error y
          la app calcula distinto a la lámina, a propósito. La app sigue la
          fórmula, no el resultado impreso.
        </DefinicionTermino>

        <DefinicionTermino termino="Selector de múltiplo">
          Cada Variable de entrada tiene un selector (k, M, G…) junto a su
          unidad de medida. Cargar MHz donde la fórmula espera Hz da un
          resultado un millón de veces mayor sin ningún síntoma visible; el
          selector existe para evitar exactamente ese error.
        </DefinicionTermino>
      </Seccion>

      {/* ── 4. Fuentes ─────────────────────────────────────────────────── */}
      <Seccion titulo="Fuentes">
        <Parrafo>
          Las diez Presentaciones de unidad de la materia son la fuente
          única del catálogo. Cada Fórmula cita la página de la que salió;
          ningún resultado se afirma sin esa trazabilidad.
        </Parrafo>
        <Parrafo>
          234 Ejemplos resueltos de la propia cátedra corren como casos de
          test. La app no dice que calcula bien: lo demuestra contra la
          fuente que la evalúa.
        </Parrafo>
        <NotaIA />
      </Seccion>
    </ScrollView>
  );
}

/* ── Componentes internos de composición ─────────────────────────────────── */

function Seccion({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <View style={estilos.seccion}>
      <Text style={estilos.tituloSeccion}>{titulo}</Text>
      <View style={estilos.cuerpoSeccion}>{children}</View>
    </View>
  );
}

function Parrafo({ children }: { children: React.ReactNode }) {
  return <Text style={estilos.parrafo}>{children}</Text>;
}

function Enfasis({ children }: { children: React.ReactNode }) {
  return <Text style={estilos.enfasis}>{children}</Text>;
}

function Cifra({ children }: { children: React.ReactNode }) {
  return <Text style={estilos.cifra}>{children}</Text>;
}

function ItemLista({ children }: { children: React.ReactNode }) {
  return (
    <View style={estilos.itemLista}>
      <Text style={estilos.bulletLista}>·</Text>
      <Text style={estilos.textoItemLista}>{children}</Text>
    </View>
  );
}

function DefinicionTermino({
  termino,
  valores,
  children,
}: {
  termino: string;
  valores?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={estilos.definicion}>
      <View style={estilos.cabeceraDefinicion}>
        <Text style={estilos.terminoDefinicion}>{termino}</Text>
        {valores ? (
          <Text style={estilos.valoresDefinicion}>{valores}</Text>
        ) : null}
      </View>
      <Text style={estilos.cuerpoDefinicion}>{children}</Text>
    </View>
  );
}

/**
 * Aviso sobre las tres Fórmulas que no se cargaron, con la razón concreta.
 * El alcance declarado se declara — Principio de producto n.° 5.
 */
function AvisoFaltantes() {
  return (
    <View style={estilos.avisoFaltantes}>
      <Text style={estilos.textoAvisoFaltantes}>
        <Text style={estilos.enfasisAviso}>Faltan 3 fórmulas</Text>
        {' (U06-F04, U06-F05, U06-F11): '}
        reciben palabras binarias o polinomios sobre GF(2), y el modelo sólo
        admite variables numéricas.
      </Text>
    </View>
  );
}

/**
 * Nota sobre el uso de asistencia de IA en el desarrollo.
 * Mención sobria, sin atribuir autoría. Brand Commitment del proyecto.
 */
function NotaIA() {
  return (
    <Text style={estilos.notaIA}>
      En el desarrollo se usó asistencia de IA.
    </Text>
  );
}

/* ── Estilos ──────────────────────────────────────────────────────────────── */

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: espacio.lg,
    gap: espacio.lg,
    paddingBottom: espacio.xxl,
  },

  /* Sección */
  seccion: {
    backgroundColor: colores.superficie,
    borderRadius: radio.md,
    overflow: 'hidden',
  },
  tituloSeccion: {
    ...tipografia.subtitulo,
    color: colores.texto,
    backgroundColor: colores.superficieEnfasis,
    paddingHorizontal: espacio.lg,
    paddingVertical: espacio.sm,
  },
  cuerpoSeccion: {
    padding: espacio.lg,
    gap: espacio.md,
  },

  /* Texto corrido */
  parrafo: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  enfasis: {
    ...tipografia.cuerpo,
    color: colores.texto,
    fontFamily: 'Sora_600SemiBold',
  },

  /* Lista de números */
  itemLista: {
    flexDirection: 'row',
    gap: espacio.sm,
    alignItems: 'flex-start',
  },
  bulletLista: {
    ...tipografia.cuerpo,
    color: colores.marca,
    lineHeight: 21,
  },
  textoItemLista: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
    flex: 1,
  },
  cifra: {
    ...tipografia.cuerpo,
    color: colores.texto,
    fontFamily: 'IBMPlexMono_600SemiBold',
  },

  /* Definición de término */
  definicion: {
    gap: espacio.xs,
    borderLeftWidth: 3,
    borderLeftColor: colores.marca,
    paddingLeft: espacio.md,
  },
  cabeceraDefinicion: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: espacio.sm,
    flexWrap: 'wrap',
  },
  terminoDefinicion: {
    ...tipografia.etiqueta,
    color: colores.texto,
  },
  valoresDefinicion: {
    ...tipografia.pie,
    color: colores.textoTenue,
  },
  cuerpoDefinicion: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },

  /* Aviso de fórmulas faltantes */
  avisoFaltantes: {
    backgroundColor: colores.avisoFondo,
    borderRadius: radio.sm,
    padding: espacio.md,
  },
  textoAvisoFaltantes: {
    ...tipografia.cuerpo,
    color: colores.aviso,
  },
  enfasisAviso: {
    fontFamily: 'Sora_600SemiBold',
  },

  /* Nota al pie sobre IA */
  notaIA: {
    ...tipografia.pie,
    color: colores.textoTenue,
    marginTop: espacio.xs,
  },
});
