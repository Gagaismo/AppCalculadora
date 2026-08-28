import { StyleSheet, Text, View } from 'react-native';

import type { EjemploResuelto, Formula } from '@/dominio/formula';
import { conMultiplo } from '@/dominio/multiplos';
import { ejemplosDeFormula } from '@/formulas';
import { colores, espacio, fuentes, radio, tipografia } from '@/tema';

import { formatearNumero } from './numeros';

interface FichaFormulaProps {
  readonly formula: Formula;
  /** Permite inyectar ejemplos en tests o usar los registrados por defecto. */
  readonly ejemplos?: readonly EjemploResuelto[];
}

/**
 * Ficha completa de la Fórmula.
 *
 * Muestra todo lo que permite confiar en la Fórmula y rastrearla hasta la fuente:
 * - Condiciones de aplicación.
 * - Página(s) de la Presentación de unidad de donde sale.
 * - Nivel de confianza en la transcripción.
 * - Aviso visible si tiene una observación de verificación sin resolver (⚠️).
 * - Ejemplos resueltos de la cátedra con sus entradas, resultado esperado y
 *   notas de apartamiento si la diapositiva contenía un error.
 */
export function FichaFormula({ formula, ejemplos }: FichaFormulaProps) {
  const listaEjemplos = ejemplos ?? ejemplosDeFormula(formula.id);

  return (
    <View testID="ficha-formula" style={estilos.ficha}>
      {formula.observacion && (
        <View testID="ficha-observacion" style={estilos.observacion}>
          <Text style={estilos.observacionTitulo}>⚠️ Observación de verificación</Text>
          <Text style={estilos.observacionTexto}>{formula.observacion}</Text>
        </View>
      )}

      <View testID="ficha-condiciones" style={estilos.seccion}>
        <Text style={estilos.seccionTitulo}>Condiciones de aplicación</Text>
        <Text style={estilos.seccionTexto}>{formula.condiciones}</Text>
      </View>

      <View testID="ficha-fuente" style={estilos.seccion}>
        <Text style={estilos.seccionTitulo}>Fuente</Text>
        <Text testID="ficha-paginas" style={estilos.seccionTexto}>
          Presentación de Unidad {formula.unidad}, pág. {formula.paginas}
        </Text>
        <Text testID="ficha-confianza" style={estilos.confianzaTexto}>
          Confianza de transcripción:{' '}
          <Text style={estilos.confianzaValor}>{capitalizar(formula.confianza)}</Text>
        </Text>
      </View>

      {listaEjemplos.length > 0 && (
        <View testID="ficha-ejemplos" style={estilos.seccion}>
          <Text style={estilos.seccionTitulo}>
            {listaEjemplos.length === 1 ? 'Ejemplo resuelto' : 'Ejemplos resueltos'}
          </Text>

          {listaEjemplos.map((ejemplo, index) => (
            <View
              key={`${ejemplo.formulaId}-${ejemplo.pagina}-${index}`}
              testID={`ejemplo-resuelto-${index}`}
              style={estilos.ejemploTarjeta}
            >
              <Text testID={`ejemplo-enunciado-${index}`} style={estilos.ejemploEnunciado}>
                {ejemplo.enunciado}
              </Text>
              <Text testID={`ejemplo-pagina-${index}`} style={estilos.ejemploPagina}>
                Presentación de Unidad {formula.unidad}, pág. {ejemplo.pagina}
              </Text>

              <View testID={`ejemplo-entradas-${index}`} style={estilos.ejemploValores}>
                <Text style={estilos.ejemploSubtitulo}>Entradas:</Text>
                {formula.entradas.map((variable) => {
                  const cargado = ejemplo.entradas[variable.simbolo];
                  if (!cargado) return null;
                  const escrito =
                    'valores' in cargado
                      ? cargado.valores.map(formatearNumero).join('; ')
                      : formatearNumero(cargado.valor);
                  return (
                    <Text key={variable.simbolo} style={estilos.ejemploValorItem}>
                      • {variable.simbolo} = {escrito}{' '}
                      {conMultiplo(cargado.multiplo, variable.unidadDeMedida)}
                    </Text>
                  );
                })}

                <Text style={estilos.ejemploSubtituloEspaciado}>
                  Resultado esperado:
                </Text>
                <Text testID={`ejemplo-esperado-${index}`} style={estilos.ejemploResultado}>
                  • {formula.salida.simbolo} = {formatearNumero(ejemplo.esperado.valor)}{' '}
                  {conMultiplo(ejemplo.esperado.multiplo, formula.salida.unidadDeMedida)}
                </Text>
              </View>

              {ejemplo.apartamiento && (
                <View testID={`ejemplo-apartamiento-${index}`} style={estilos.apartamiento}>
                  <Text style={estilos.apartamientoTitulo}>
                    Apartamiento respecto a la diapositiva:
                  </Text>
                  <Text style={estilos.apartamientoTexto}>{ejemplo.apartamiento}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function capitalizar(texto: string): string {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const estilos = StyleSheet.create({
  ficha: {
    gap: espacio.lg,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingTop: espacio.xl,
  },
  seccion: {
    gap: espacio.sm,
  },
  seccionTitulo: {
    ...tipografia.subtitulo,
    color: colores.texto,
  },
  seccionTexto: {
    ...tipografia.cuerpo,
    color: colores.textoSuave,
  },
  confianzaTexto: {
    ...tipografia.pie,
    color: colores.textoSuave,
    marginTop: espacio.xs,
  },
  confianzaValor: {
    fontFamily: fuentes.interfazMedia,
    color: colores.texto,
  },
  observacion: {
    backgroundColor: colores.avisoFondo,
    borderColor: colores.aviso,
    borderWidth: 1,
    borderRadius: radio.sm,
    padding: espacio.md,
    gap: espacio.xs,
  },
  observacionTitulo: {
    ...tipografia.etiqueta,
    color: colores.aviso,
  },
  observacionTexto: {
    ...tipografia.cuerpo,
    color: colores.aviso,
  },
  ejemploTarjeta: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radio.sm,
    padding: espacio.md,
    gap: espacio.sm,
    backgroundColor: colores.superficie,
  },
  ejemploEnunciado: {
    ...tipografia.cuerpo,
    fontFamily: fuentes.interfazMedia,
    color: colores.texto,
  },
  ejemploPagina: {
    ...tipografia.pie,
    color: colores.textoSuave,
  },
  ejemploValores: {
    gap: espacio.xs,
    paddingVertical: espacio.xs,
  },
  ejemploSubtitulo: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
  },
  ejemploSubtituloEspaciado: {
    ...tipografia.etiqueta,
    color: colores.textoSuave,
    marginTop: espacio.sm,
  },
  ejemploValorItem: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.nota,
    color: colores.texto,
  },
  ejemploResultado: {
    ...tipografia.etiqueta,
    fontFamily: fuentes.notaFuerte,
    color: colores.texto,
  },
  apartamiento: {
    backgroundColor: colores.errorFondo,
    borderColor: colores.error,
    borderWidth: 1,
    borderRadius: radio.sm,
    padding: espacio.md,
    marginTop: espacio.xs,
    gap: espacio.xs,
  },
  apartamientoTitulo: {
    ...tipografia.pie,
    fontFamily: fuentes.interfazMedia,
    color: colores.error,
  },
  apartamientoTexto: {
    ...tipografia.pie,
    color: colores.error,
  },
});
