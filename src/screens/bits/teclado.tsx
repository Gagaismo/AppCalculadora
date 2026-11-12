import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

export interface TecladoBitsProps {
  readonly onBit: (bit: '0' | '1') => void;
  readonly onBorrar: () => void;
}

/**
 * El teclado de bits: 0, 1 y borrar. Reemplaza al teclado del sistema, que trae diez
 * dígitos y letras que acá sólo sirven para equivocarse.
 */
export function TecladoBits({ onBit, onBorrar }: TecladoBitsProps) {
  const teclas = [
    { texto: '0', etiqueta: 'Agregar un 0', alPresionar: () => onBit('0') },
    { texto: '1', etiqueta: 'Agregar un 1', alPresionar: () => onBit('1') },
    { texto: '⌫ Borrar', etiqueta: 'Borrar el último bit', alPresionar: onBorrar },
  ];

  return (
    <View style={estilos.teclado} accessibilityLabel="Teclado de bits">
      {teclas.map((tecla) => (
        <Pressable
          key={tecla.texto}
          accessibilityRole="button"
          accessibilityLabel={tecla.etiqueta}
          onPress={tecla.alPresionar}
          style={({ pressed }) => [estilos.tecla, pressed && estilos.teclaPresionada]}
        >
          <Text style={tecla.texto.length > 1 ? estilos.textoBorrar : estilos.textoBit}>
            {tecla.texto}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

/** Un campo de bits: muestra la cadena en monoespaciada y se elige tocándolo. */
export function CampoBits({
  rotulo,
  valor,
  activo,
  onPress,
}: {
  readonly rotulo: string;
  readonly valor: string;
  readonly activo: boolean;
  readonly onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${rotulo}: ${valor || 'vacío'}`}
      accessibilityState={{ selected: activo }}
      onPress={onPress}
      style={[estilos.campo, activo && estilos.campoActivo]}
    >
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.valor}>{valor || ' '}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  teclado: {
    flexDirection: 'row',
    gap: espacio.sm,
  },
  tecla: {
    flex: 1,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  teclaPresionada: {
    backgroundColor: colores.superficieEnfasis,
  },
  textoBit: {
    ...tipografia.resultado,
    color: colores.texto,
  },
  textoBorrar: {
    ...tipografia.etiqueta,
    color: colores.accion,
  },
  campo: {
    gap: espacio.xs,
    padding: espacio.md,
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.superficie,
  },
  campoActivo: {
    borderWidth: 2,
    borderColor: colores.accion,
  },
  rotulo: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
  },
  valor: {
    ...tipografia.subtitulo,
    fontFamily: fuentes.notaFuerte,
    color: colores.texto,
    letterSpacing: 2,
  },
});
