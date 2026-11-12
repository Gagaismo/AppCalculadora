import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colores, espacio, radio, tipografia } from '@/tema';

export { PantallaCrc } from './crc';

/** Las tres herramientas de la Unidad 6 y la ruta de cada una. */
export const HERRAMIENTAS = [
  { ruta: '/bits/crc', nombre: 'CRC', detalle: 'División módulo 2 por XOR · págs. 28-32' },
  { ruta: '/bits/hamming', nombre: 'Hamming', detalle: 'Corrección FEC con síndrome · págs. 44-50' },
  { ruta: '/bits/vrc-lrc', nombre: 'VRC / LRC', detalle: 'Paridad por carácter y tabla · págs. 18-25' },
] as const;

export type RutaHerramienta = (typeof HERRAMIENTAS)[number]['ruta'];

/**
 * La sección «Herramientas de bits». No son Fórmulas —trabajan sobre cadenas de bits, no
 * sobre números—, por eso viven aparte del catálogo (decisión D1).
 */
export function PantallaHerramientas({ onElegir }: { readonly onElegir: (ruta: RutaHerramienta) => void }) {
  return (
    <ScrollView style={estilos.pantalla} contentContainerStyle={estilos.contenido}>
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Herramientas de bits</Text>
        <Text style={estilos.subtitulo}>Unidad 6 · detección y corrección de errores, paso a paso</Text>
      </View>
      {HERRAMIENTAS.map((herramienta) => (
        <Pressable
          key={herramienta.ruta}
          accessibilityRole="button"
          accessibilityLabel={`${herramienta.nombre}: ${herramienta.detalle}`}
          onPress={() => onElegir(herramienta.ruta)}
          style={({ pressed }) => [estilos.tarjeta, pressed && estilos.tarjetaPresionada]}
        >
          <Text style={estilos.nombre}>{herramienta.nombre}</Text>
          <Text style={estilos.detalle}>{herramienta.detalle}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.fondo },
  contenido: { padding: espacio.lg, gap: espacio.md },
  encabezado: { gap: espacio.xs, marginBottom: espacio.xs },
  titulo: { ...tipografia.titulo, color: colores.texto },
  subtitulo: { ...tipografia.cuerpo, color: colores.textoSuave },
  tarjeta: {
    gap: espacio.xs,
    padding: espacio.md,
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  tarjetaPresionada: { backgroundColor: colores.superficieEnfasis },
  nombre: { ...tipografia.subtitulo, color: colores.texto },
  detalle: { ...tipografia.etiqueta, color: colores.textoSuave },
});
