import type { Formula } from '@/dominio/formula';
import { FORMULAS } from '@/formulas';

import { buscarFormulas, coincideTexto } from './buscar';

const formulaMockU02: Formula = {
  id: 'U02-F01',
  unidad: 2,
  nombre: 'Potencia media de una señal periódica',
  expresion: 'P = V_ef^2 / R',
  entradas: [
    {
      simbolo: 'V_ef',
      significado: 'Tensión eficaz de la señal',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'R',
      significado: 'Resistencia de carga',
      unidadDeMedida: 'Ω',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'P',
    significado: 'Potencia media',
    unidadDeMedida: 'W',
    multiploCanonico: '',
  },
  condiciones: 'Señal periódica.',
  paginas: '12',
  confianza: 'alta',
  calcular: ({ V_ef, R }) => (V_ef * V_ef) / R,
};

const formulaMockU03: Formula = {
  id: 'U03-F05',
  unidad: 3,
  nombre: 'Atenuación total en línea de transmisión',
  expresion: 'A_total = alpha * L',
  entradas: [
    {
      simbolo: 'alpha',
      significado: 'Coeficiente de atenuación',
      unidadDeMedida: 'dB/km',
      multiploCanonico: '',
    },
    {
      simbolo: 'L',
      significado: 'Longitud de la línea',
      unidadDeMedida: 'km',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'A_total',
    significado: 'Atenuación total',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones: 'Línea uniforme.',
  paginas: '20',
  confianza: 'alta',
  calcular: ({ alpha, L }) => alpha * L,
};

const catalogoPrueba: readonly Formula[] = [formulaMockU02, formulaMockU03, ...FORMULAS];

describe('coincideTexto', () => {
  it('coincide con igualdad exacta', () => {
    expect(coincideTexto('Ancho', 'Ancho')).toBe(true);
  });

  it('coincide ignorando mayúsculas y minúsculas', () => {
    expect(coincideTexto('Ancho de banda', 'ANCHO')).toBe(true);
    expect(coincideTexto('ancho', 'ANCHO')).toBe(true);
  });

  it('coincide ignorando acentos', () => {
    expect(coincideTexto('Señal', 'senal')).toBe(true);
    expect(coincideTexto('señal', 'SENAL')).toBe(true);
    expect(coincideTexto('Atenuación', 'atenuacion')).toBe(true);
    expect(coincideTexto('atenuacion', 'Atenuación')).toBe(true);
  });

  it('coincide por inclusión parcial', () => {
    expect(coincideTexto('Ancho de banda de una banda', 'banda')).toBe(true);
  });

  it('coincide en símbolos ignorando guiones bajos', () => {
    expect(coincideTexto('f_sup', 'fsup')).toBe(true);
    expect(coincideTexto('A_total', 'Atotal')).toBe(true);
    expect(coincideTexto('V_ef', 'vef')).toBe(true);
  });

  it('devuelve false cuando no hay coincidencia o entrada vacía', () => {
    expect(coincideTexto('Ancho', 'Ruido')).toBe(false);
    expect(coincideTexto('Ancho', '')).toBe(false);
    expect(coincideTexto('', 'Ancho')).toBe(false);
  });
});

describe('buscarFormulas', () => {
  describe('búsqueda por nombre', () => {
    it('encuentra fórmulas por coincidencia exacta en el nombre', () => {
      const resultados = buscarFormulas(
        'Ancho de banda de una banda de frecuencias (ISM / Wi-Fi)',
        catalogoPrueba,
      );
      expect(resultados).toHaveLength(1);
      expect(resultados[0].id).toBe('U10-F07');
    });

    it('encuentra fórmulas por coincidencia parcial en el nombre', () => {
      const resultados = buscarFormulas('Wi-Fi', catalogoPrueba);
      expect(resultados).toHaveLength(1);
      expect(resultados[0].id).toBe('U10-F07');
    });

    it('encuentra fórmulas ignorando mayúsculas (ej. ANCHO)', () => {
      const resultados = buscarFormulas('ANCHO', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('encuentra fórmulas ignorando acentos (ej. senal -> Señal)', () => {
      const resultados = buscarFormulas('senal', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U02-F01')).toBe(true);
      expect(resultados.some((f) => f.nombre === 'Potencia media de una señal periódica')).toBe(true);
    });

    it('encuentra fórmulas con tilde en la búsqueda (ej. Atenuación -> atenuacion)', () => {
      const resultados = buscarFormulas('Atenuación', catalogoPrueba);
      expect(resultados).toHaveLength(1);
      expect(resultados[0].id).toBe('U03-F05');
    });
  });

  describe('búsqueda por símbolo', () => {
    it('encuentra fórmulas por símbolo de variable de salida (ej. AB)', () => {
      const resultados = buscarFormulas('AB', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('encuentra fórmulas por símbolo de salida en minúsculas (ej. ab -> AB)', () => {
      const resultados = buscarFormulas('ab', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('encuentra fórmulas por símbolo de variable de entrada (ej. f_sup, f_inf)', () => {
      const resultadosSup = buscarFormulas('f_sup', catalogoPrueba);
      expect(resultadosSup.some((f) => f.id === 'U10-F07')).toBe(true);

      const resultadosInf = buscarFormulas('f_inf', catalogoPrueba);
      expect(resultadosInf.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('encuentra fórmulas por símbolo sin guión bajo (ej. fsup -> f_sup)', () => {
      const resultados = buscarFormulas('fsup', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('encuentra fórmulas por símbolos de entrada en otras unidades (ej. alpha, V_ef)', () => {
      const resAlpha = buscarFormulas('alpha', catalogoPrueba);
      expect(resAlpha.some((f) => f.id === 'U03-F05')).toBe(true);

      const resVef = buscarFormulas('V_ef', catalogoPrueba);
      expect(resVef.some((f) => f.id === 'U02-F01')).toBe(true);
    });
  });

  describe('búsqueda por identificador', () => {
    it('encuentra fórmula por su id de catálogo (ej. U10-F07)', () => {
      const resultados = buscarFormulas('U10-F07', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('encuentra fórmula por id en minúsculas (ej. u10)', () => {
      const resultados = buscarFormulas('u10', catalogoPrueba);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });
  });

  describe('casos borde y catálogo actual', () => {
    it('devuelve arreglo vacío ante string vacío o espacios', () => {
      expect(buscarFormulas('', catalogoPrueba)).toEqual([]);
      expect(buscarFormulas('   ', catalogoPrueba)).toEqual([]);
    });

    it('devuelve arreglo vacío cuando no hay coincidencias', () => {
      expect(buscarFormulas('termino_inexistente_xyz_123', catalogoPrueba)).toEqual([]);
    });

    it('funciona con el catálogo por defecto de la aplicación (FORMULAS)', () => {
      const resultados = buscarFormulas('ancho');
      expect(resultados.length).toBeGreaterThanOrEqual(1);
      expect(resultados.some((f) => f.id === 'U10-F07')).toBe(true);
    });

    it('no duplica fórmulas si coinciden por nombre y por símbolo', () => {
      // Mock donde coinciden nombre y símbolo
      const formulaDuplicable: Formula = {
        id: 'U09-F01',
        unidad: 9,
        nombre: 'Cálculo de SNR',
        expresion: 'SNR = P_s / P_n',
        entradas: [
          { simbolo: 'P_s', significado: 'Potencia de señal', unidadDeMedida: 'W', multiploCanonico: '' },
          { simbolo: 'P_n', significado: 'Potencia de ruido', unidadDeMedida: 'W', multiploCanonico: '' },
        ],
        salida: { simbolo: 'SNR', significado: 'Relación señal a ruido', unidadDeMedida: 'dB', multiploCanonico: '' },
        condiciones: 'General.',
        paginas: '5',
        confianza: 'alta',
        calcular: ({ P_s, P_n }) => P_s / P_n,
      };

      const resultados = buscarFormulas('SNR', [formulaDuplicable]);
      expect(resultados).toHaveLength(1);
    });
  });
});
