import { StyleSheet, Text, View } from 'react-native';

import type { EjemploResuelto, Formula } from '@/dominio/formula';
import { conMultiplo } from '@/dominio/multiplos';
import { ejemplosDeFormula } from '@/formulas';

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

                <Text style={[estilos.ejemploSubtitulo, { marginTop: 6 }]}>
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
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#8886',
    paddingTop: 20,
  },
  seccion: {
    gap: 6,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: '700',
  },
  seccionTexto: {
    fontSize: 14,
    opacity: 0.85,
    lineHeight: 20,
  },
  confianzaTexto: {
    fontSize: 13,
    opacity: 0.75,
    marginTop: 2,
  },
  confianzaValor: {
    fontWeight: '600',
  },
  observacion: {
    backgroundColor: '#FFFBEB',
    borderColor: '#F59E0B',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  observacionTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  observacionTexto: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
  ejemploTarjeta: {
    borderWidth: 1,
    borderColor: '#8884',
    borderRadius: 8,
    padding: 12,
    gap: 8,
    backgroundColor: '#8881',
  },
  ejemploEnunciado: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  ejemploPagina: {
    fontSize: 12,
    opacity: 0.7,
  },
  ejemploValores: {
    gap: 4,
    paddingVertical: 4,
  },
  ejemploSubtitulo: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
  ejemploValorItem: {
    fontSize: 13,
    fontFamily: 'monospace',
  },
  ejemploResultado: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  apartamiento: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    gap: 4,
  },
  apartamientoTitulo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#991B1B',
  },
  apartamientoTexto: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 16,
  },
});
