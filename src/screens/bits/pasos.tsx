import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, espacio, radio, tipografia } from '@/tema';

/**
 * Las piezas del recorrido «Paso a paso» que comparten CRC, Hamming y VRC/LRC:
 * el progreso arriba, la navegación abajo, los selectores y la tarjeta del resultado.
 */

/** «Entrada · Paso 1 de 8» y una barra de tramos. */
export function ProgresoPasos({
  paso,
  total,
  nombre,
}: {
  /** Desde 0. */
  readonly paso: number;
  readonly total: number;
  readonly nombre: string;
}) {
  return (
    <View style={estilos.progreso}>
      <View style={estilos.fila}>
        <Text style={estilos.nombrePaso}>{nombre}</Text>
        <Text style={estilos.contador}>{`Paso ${paso + 1} de ${total}`}</Text>
      </View>
      <View style={estilos.tramos} accessibilityElementsHidden importantForAccessibility="no">
        {Array.from({ length: total }, (_, i) => (
          <View key={i} style={[estilos.tramo, i <= paso && estilos.tramoHecho]} />
        ))}
      </View>
    </View>
  );
}

/** Anterior / Siguiente. En el último paso «Siguiente» vuelve a la entrada. */
export function NavegacionPasos({
  paso,
  total,
  onIr,
}: {
  readonly paso: number;
  readonly total: number;
  readonly onIr: (paso: number) => void;
}) {
  const ultimo = paso === total - 1;
  return (
    <View style={estilos.navegacion}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: paso === 0 }}
        disabled={paso === 0}
        onPress={() => onIr(paso - 1)}
        style={[estilos.boton, estilos.botonSecundario, paso === 0 && estilos.deshabilitado]}
      >
        <Text style={estilos.textoSecundario}>Anterior</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => onIr(ultimo ? 0 : paso + 1)}
        style={[estilos.boton, estilos.botonPrincipal]}
      >
        <Text style={estilos.textoPrincipal}>{ultimo ? 'Volver a la entrada' : 'Siguiente'}</Text>
      </Pressable>
    </View>
  );
}

/** Opciones excluyentes: el modo Emisor/Receptor o los chips de ejemplos. */
export function Opciones<T extends string>({
  rotulo,
  opciones,
  elegida,
  onElegir,
}: {
  readonly rotulo: string;
  readonly opciones: readonly { readonly valor: T; readonly texto: string }[];
  readonly elegida: T | undefined;
  readonly onElegir: (valor: T) => void;
}) {
  return (
    <View style={estilos.opciones} accessibilityLabel={rotulo}>
      {opciones.map((opcion) => {
        const activa = opcion.valor === elegida;
        return (
          <Pressable
            key={opcion.valor}
            accessibilityRole="button"
            accessibilityState={{ selected: activa }}
            onPress={() => onElegir(opcion.valor)}
            style={[estilos.opcion, activa && estilos.opcionActiva]}
          >
            <Text style={estilos.textoOpcion}>{opcion.texto}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** La explicación del paso actual: una línea fuerte con la cuenta y el porqué debajo. */
export function Explicacion({ titulo, children }: { readonly titulo: string; readonly children: ReactNode }) {
  return (
    <View style={estilos.explicacion} accessibilityLiveRegion="polite">
      <Text style={estilos.tituloExplicacion}>{titulo}</Text>
      <Text style={estilos.cuerpo}>{children}</Text>
    </View>
  );
}

/** El resultado: ícono y texto, nunca sólo el color (✓ sin error, ⚠ hay error). */
export function TarjetaEstado({
  estado,
  titulo,
  children,
}: {
  readonly estado: 'ok' | 'error';
  readonly titulo: string;
  readonly children?: ReactNode;
}) {
  const ok = estado === 'ok';
  return (
    <View accessibilityRole="summary" style={[estilos.tarjeta, ok ? estilos.tarjetaOk : estilos.tarjetaError]}>
      <Text style={[estilos.icono, { color: ok ? colores.exito : colores.error }]}>{ok ? '✓' : '⚠'}</Text>
      <View style={estilos.cuerpoTarjeta}>
        <Text style={estilos.tituloExplicacion}>{titulo}</Text>
        {children}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  progreso: { gap: espacio.sm },
  fila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  nombrePaso: { ...tipografia.subtitulo, color: colores.texto },
  contador: { ...tipografia.etiqueta, color: colores.textoSuave },
  tramos: { flexDirection: 'row', gap: espacio.xs },
  tramo: { flex: 1, height: 4, borderRadius: radio.pastilla, backgroundColor: colores.borde },
  tramoHecho: { backgroundColor: colores.marca },
  navegacion: { flexDirection: 'row', gap: espacio.md },
  boton: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.pastilla,
  },
  botonSecundario: { borderWidth: 1, borderColor: colores.borde, backgroundColor: colores.superficie },
  botonPrincipal: { backgroundColor: colores.accion },
  deshabilitado: { opacity: 0.45 },
  textoSecundario: { ...tipografia.etiqueta, color: colores.texto },
  textoPrincipal: { ...tipografia.etiqueta, color: colores.superficie },
  opciones: { flexDirection: 'row', flexWrap: 'wrap', gap: espacio.sm },
  opcion: {
    minHeight: 44,
    paddingHorizontal: espacio.lg,
    justifyContent: 'center',
    borderRadius: radio.pastilla,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  opcionActiva: { borderColor: colores.accion, backgroundColor: colores.superficieEnfasis },
  textoOpcion: { ...tipografia.etiqueta, color: colores.texto },
  explicacion: {
    gap: espacio.xs,
    padding: espacio.md,
    borderRadius: radio.md,
    borderLeftWidth: 3,
    borderLeftColor: colores.marca,
    backgroundColor: colores.superficie,
  },
  tituloExplicacion: { ...tipografia.etiqueta, color: colores.texto },
  cuerpo: { ...tipografia.cuerpo, color: colores.textoSuave },
  tarjeta: { flexDirection: 'row', gap: espacio.md, padding: espacio.lg, borderRadius: radio.md },
  tarjetaOk: { backgroundColor: colores.exitoFondo },
  tarjetaError: { backgroundColor: colores.errorFondo },
  icono: { ...tipografia.titulo },
  cuerpoTarjeta: { flex: 1, gap: espacio.xs },
});
