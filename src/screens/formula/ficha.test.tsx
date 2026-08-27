import { render, screen } from '@testing-library/react-native';

import type { Formula } from '@/dominio/formula';
import { buscarFormula } from '@/formulas';

import { FichaFormula } from './ficha';

/**
 * Tests de la ficha completa de la Fórmula.
 *
 * Verifican que la ficha expone toda la información que permite confiar en la Fórmula:
 * - Condiciones de aplicación.
 * - Página de origen en la Presentación de unidad (legible sin abrir el PDF).
 * - Nivel de confianza en la transcripción.
 * - Ejemplo(s) resuelto(s) con entradas y resultado esperado.
 * - Nota de apartamiento si la diapositiva original se equivocó en la cuenta.
 * - Aviso visible si existe una observación ⚠️ de verificación sin resolver.
 *
 * OJO: en @testing-library/react-native 14 `render` devuelve una Promesa y requiere `await`.
 */

const formulaReal = buscarFormula('U10-F07')!;

const formulaConObservacion: Formula = {
  id: 'U99-F01',
  unidad: 99,
  nombre: 'Fórmula de prueba con observación',
  expresion: 'X = Y + Z',
  entradas: [
    {
      simbolo: 'Y',
      significado: 'Variable Y',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'Z',
      significado: 'Variable Z',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'X',
    significado: 'Variable X',
    unidadDeMedida: 'Hz',
    multiploCanonico: '',
  },
  condiciones: 'Condición de prueba para verificar renderizado.',
  paginas: '12, 13',
  confianza: 'baja',
  observacion:
    'Existe discrepancia entre la diapositiva 12 y el apunte sobre el factor de escala.',
  calcular: ({ Y, Z }) => Y + Z,
};

describe('FichaFormula', () => {
  describe('con la fórmula real U10-F07', () => {
    it('muestra las condiciones de aplicación', async () => {
      await render(<FichaFormula formula={formulaReal} />);

      expect(screen.getByTestId('ficha-condiciones')).toBeTruthy();
      expect(screen.getByText(/Condiciones de aplicación/i)).toBeTruthy();
      expect(screen.getByText(formulaReal.condiciones)).toBeTruthy();
    });

    it('muestra la fuente y la página de la Presentación de unidad', async () => {
      await render(<FichaFormula formula={formulaReal} />);

      expect(screen.getByTestId('ficha-fuente')).toBeTruthy();
      expect(screen.getByTestId('ficha-paginas')).toHaveTextContent(
        `Presentación de Unidad 10, pág. ${formulaReal.paginas}`,
      );
    });

    it('muestra el nivel de confianza de la transcripción', async () => {
      await render(<FichaFormula formula={formulaReal} />);

      expect(screen.getByTestId('ficha-confianza')).toHaveTextContent(/Media/i);
    });

    it('muestra los Ejemplos resueltos de la cátedra con sus entradas y resultado esperado', async () => {
      await render(<FichaFormula formula={formulaReal} />);

      expect(screen.getByTestId('ficha-ejemplos')).toBeTruthy();

      // Ejemplo 0: banda 2,4 GHz
      expect(
        screen.getByText(
          'Banda ISM de 2,4 GHz usada por Wi-Fi: ancho de banda total de la banda.',
        ),
      ).toBeTruthy();
      expect(screen.getByTestId('ejemplo-pagina-0')).toHaveTextContent(
        'Presentación de Unidad 10, pág. 34',
      );
      expect(screen.getByTestId('ejemplo-entradas-0')).toHaveTextContent(/f_inf\s*=\s*2,4\s*GHz/);
      expect(screen.getByTestId('ejemplo-entradas-0')).toHaveTextContent(/f_sup\s*=\s*2,4835\s*GHz/);
      expect(screen.getByTestId('ejemplo-esperado-0')).toHaveTextContent(/AB\s*=\s*83,5\s*MHz/);

      // Ejemplo 1: banda 5 GHz
      expect(screen.getByTestId('ejemplo-pagina-1')).toHaveTextContent(
        'Presentación de Unidad 10, pág. 34',
      );
      expect(screen.getByTestId('ejemplo-entradas-1')).toHaveTextContent(/f_inf\s*=\s*5,15\s*GHz/);
      expect(screen.getByTestId('ejemplo-entradas-1')).toHaveTextContent(/f_sup\s*=\s*5,85\s*GHz/);
      expect(screen.getByTestId('ejemplo-esperado-1')).toHaveTextContent(/AB\s*=\s*700\s*MHz/);
    });

    it('muestra la nota de apartamiento cuando la diapositiva contenía un error', async () => {
      await render(<FichaFormula formula={formulaReal} />);

      const apartamiento = screen.getByTestId('ejemplo-apartamiento-1');
      expect(apartamiento).toBeTruthy();
      expect(apartamiento).toHaveTextContent(/Apartamiento respecto a la diapositiva/i);
      expect(apartamiento).toHaveTextContent(
        /La diapositiva 34 asigna AB = 70 MHz a esta banda\. La resta de su propio rango da 700 MHz\./i,
      );
    });

    it('no muestra aviso de observación si la fórmula no tiene el campo observacion', async () => {
      await render(<FichaFormula formula={formulaReal} />);

      expect(screen.queryByTestId('ficha-observacion')).toBeNull();
    });
  });

  describe('con una fórmula que tiene observación ⚠️ sin resolver', () => {
    it('muestra un aviso visible de observación', async () => {
      await render(<FichaFormula formula={formulaConObservacion} />);

      const aviso = screen.getByTestId('ficha-observacion');
      expect(aviso).toBeTruthy();
      expect(aviso).toHaveTextContent(/⚠️ Observación de verificación/i);
      expect(screen.getByText(formulaConObservacion.observacion!)).toBeTruthy();
    });

    it('muestra la confianza baja correctamente', async () => {
      await render(<FichaFormula formula={formulaConObservacion} />);

      expect(screen.getByTestId('ficha-confianza')).toHaveTextContent(/Baja/i);
    });
  });

  describe('cuando una fórmula no tiene ejemplos resueltos registrados', () => {
    it('no renderiza la sección de ejemplos si la lista está vacía', async () => {
      await render(<FichaFormula formula={formulaConObservacion} ejemplos={[]} />);

      expect(screen.queryByTestId('ficha-ejemplos')).toBeNull();
    });
  });
});
