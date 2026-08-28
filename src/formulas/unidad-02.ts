import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 2 — Análisis de las Señales (Fourier, filtros).
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Clasificación de las 29 Fórmulas (`docs/research/clasificacion-formulas.md`):
 * - 13 calculables: U02-F03, U02-F04, U02-F05, U02-F06, U02-F10, U02-F15, U02-F21,
 *   U02-F22, U02-F23, U02-F24, U02-F27, U02-F28, U02-F29
 * - 3 con restricciones: U02-F07, U02-F08, U02-F09 (restricción en `condiciones`)
 * - 13 fichas de consulta (no calculables): U02-F01, U02-F02, U02-F11, U02-F12,
 *   U02-F13, U02-F14, U02-F16, U02-F17, U02-F18, U02-F19, U02-F20, U02-F25, U02-F26
 * - 1 con observación ⚠️ resuelta: U02-F19 (decisión en `docs/research/observaciones-resueltas.md`)
 */

const U02_F01: Formula = {
  id: 'U02-F01',
  unidad: 2,
  nombre: 'Señal exponencial (real y compleja)',
  expresion: 'x(t) = C · e^(s·t)',
  expresionLatex: 'x(t) = C e^{st},\\ \\ C = A \\pm jB,\\ \\ s = \\sigma \\pm j\\omega',
  expresionesRelacionadas: [
    {
      rotulo: 'Caso real (B = 0, ω = 0)',
      expresion: 'x(t) = A · e^(σ·t)',
      latex: 'x(t) = A e^{\\sigma t}',
    },
    {
      rotulo: 'Caso complejo (B = 0, σ = 0)',
      expresion: 'x(t) = A · e^(±j·ω·t)',
      latex: 'x(t) = A e^{\\pm j\\omega t}',
    },
  ],
  entradas: [],
  salida: {
    simbolo: 'x(t)',
    significado: 'Valor de la señal en el instante t',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Es una identidad o definición de expresión, no un cálculo numérico directo. ' +
    'Con σ < 0 la exponencial decae; con σ > 0 crece.',
  paginas: '13, 14',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F02: Formula = {
  id: 'U02-F02',
  unidad: 2,
  nombre: 'Relación de Euler',
  expresion: 'e^(±jθ) = cos(θ) ± j·sen(θ)',
  expresionLatex: 'e^{\\pm j\\theta} = \\cos\\theta \\pm j\\,\\mathrm{sen}\\,\\theta',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma equivalente del coseno',
      expresion: 'cos(θ) = ½(e^(jθ) + e^(−jθ))',
      latex: '\\cos\\theta = \\tfrac{1}{2}\\left(e^{j\\theta}+e^{-j\\theta}\\right)',
    },
    {
      rotulo: 'Forma equivalente del seno',
      expresion: 'sen(θ) = (1/(2j))(e^(jθ) − e^(−jθ))',
      latex: '\\mathrm{sen}\\,\\theta = \\tfrac{1}{2j}\\left(e^{j\\theta}-e^{-j\\theta}\\right)',
    },
  ],
  entradas: [],
  salida: {
    simbolo: 'e^(±jθ)',
    significado: 'Forma exponencial compleja expresada en componentes trigonométricas',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Es una identidad matemática fundamental. θ siempre en radianes. ' +
    'Las diapositivas la aplican con θ = n·ω₀·t; también usan 1/j = −j.',
  paginas: '14, 45, 49, 50',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F03: Formula = {
  id: 'U02-F03',
  unidad: 2,
  nombre: 'Longitud de onda a partir de la frecuencia',
  expresion: 'λ = v / f',
  expresionLatex: '\\lambda = \\frac{v}{f}',
  entradas: [
    {
      simbolo: 'v',
      significado: 'Velocidad de propagación en el medio',
      unidadDeMedida: 'm/s',
      multiploCanonico: '',
    },
    {
      simbolo: 'f',
      significado: 'Frecuencia de la señal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'λ',
    significado: 'Longitud de onda',
    unidadDeMedida: 'm',
    multiploCanonico: 'm',
  },
  condiciones:
    'La frecuencia debe convertirse a Hz antes de operar. v depende del medio: ' +
    '340 m/s para sonido en aire, v = c = 3 × 10⁸ m/s en espacio libre. ' +
    'No usar c si el medio no es el vacío o aire.',
  paginas: '15',
  confianza: 'alta',
  calcular: ({ v, f }) => v / f,
};

const U02_F04: Formula = {
  id: 'U02-F04',
  unidad: 2,
  nombre: 'Longitud de onda a partir del período',
  expresion: 'λ = v · T',
  expresionLatex: '\\lambda = v \\cdot T',
  entradas: [
    {
      simbolo: 'v',
      significado: 'Velocidad de propagación en el medio',
      unidadDeMedida: 'm/s',
      multiploCanonico: '',
    },
    {
      simbolo: 'T',
      significado: 'Período de la señal',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'λ',
    significado: 'Longitud de onda',
    unidadDeMedida: 'm',
    multiploCanonico: 'm',
  },
  condiciones: 'Equivalente a λ = v / f con T = 1/f. T en segundos.',
  paginas: '15',
  confianza: 'alta',
  calcular: ({ v, T }) => v * T,
};

const U02_F05: Formula = {
  id: 'U02-F05',
  unidad: 2,
  nombre: 'Frecuencia angular',
  expresion: 'ω = 2 · π · f',
  expresionLatex: '\\omega = 2\\pi f',
  entradas: [
    {
      simbolo: 'f',
      significado: 'Frecuencia de la señal',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'ω',
    significado: 'Frecuencia angular (pulsación)',
    unidadDeMedida: 'rad/s',
    multiploCanonico: '',
  },
  condiciones:
    'f en Hz. El resultado queda en rad/s, no en Hz: no confundir ω con f al graficar espectros.',
  paginas: '16, 25, 27',
  confianza: 'alta',
  calcular: ({ f }) => 2 * Math.PI * f,
};

const U02_F06: Formula = {
  id: 'U02-F06',
  unidad: 2,
  nombre: 'Frecuencia angular fundamental',
  expresion: 'ω₀ = 2 · π / T',
  expresionLatex: '\\omega_0 = \\frac{2\\pi}{T}',
  entradas: [
    {
      simbolo: 'T',
      significado: 'Período fundamental de la señal periódica',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'ω_0',
    significado: 'Frecuencia angular fundamental',
    unidadDeMedida: 'rad/s',
    multiploCanonico: '',
  },
  condiciones:
    'Sólo para señales periódicas. T es el período fundamental (menor período positivo). ' +
    'En la fuente aparece con las fracciones partidas en dos líneas (2π/T).',
  paginas: '16, 25, 27, 28, 46, 47, 64',
  confianza: 'alta',
  calcular: ({ T }) => (2 * Math.PI) / T,
};

const U02_F07: Formula = {
  id: 'U02-F07',
  unidad: 2,
  nombre: 'Frecuencia fundamental y armónicos',
  expresion: 'f_n = n / T',
  expresionLatex: 'f_n = \\frac{n}{T}',
  entradas: [
    {
      simbolo: 'n',
      significado: 'Orden de la armónica (entero ≥ 1)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'T',
      significado: 'Período fundamental',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'f_n',
    significado: 'Frecuencia de la n-ésima armónica',
    unidadDeMedida: 'Hz',
    multiploCanonico: '',
  },
  condiciones:
    'Sólo para señales periódicas. n entero positivo. La primera armónica (n = 1) es la ' +
    'componente fundamental f₀ = 1/T y tiene el mismo período T que f(t). ' +
    'Las armónicas tienen frecuencia múltiplo de la fundamental: f_n = n · f₀ = n / T.',
  paginas: '25, 27, 61',
  confianza: 'media',
  calcular: ({ n, T }) => n / T,
};

const U02_F08: Formula = {
  id: 'U02-F08',
  unidad: 2,
  nombre: 'Señal periódica simple (senoidal)',
  expresion: 'f(t) = A · sen(2 · π · f · t + θ)',
  expresionLatex: 'f(t) = A\\,\\mathrm{sen}(2\\pi f t + \\theta)',
  entradas: [
    {
      simbolo: 'A',
      significado: 'Amplitud pico',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'f',
      significado: 'Frecuencia',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 't',
      significado: 'Instante de tiempo',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'θ',
      significado: 'Fase inicial',
      unidadDeMedida: 'rad',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'f(t)',
    significado: 'Valor instantáneo de la señal senoidal',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Es una función del tiempo: se calcula su valor instantáneo en un instante t dado, que entra como Variable. ' +
    'θ en radianes. No confundir el símbolo f (frecuencia) con f(t) (función).',
  paginas: '16',
  confianza: 'alta',
  calcular: ({ A, f, t, θ }) => A * Math.sin(2 * Math.PI * f * t + θ),
};

const U02_F09: Formula = {
  id: 'U02-F09',
  unidad: 2,
  nombre: 'Señal periódica compuesta (suma de senoidales)',
  expresion: 'f(t) = A · sen(2 · π · f₁ · t) + B · sen(2 · π · f₂ · t) + C · sen(2 · π · f₃ · t)',
  expresionLatex:
    'f(t) = A\\,\\mathrm{sen}(2\\pi f_1 t) + B\\,\\mathrm{sen}(2\\pi f_2 t) + C\\,\\mathrm{sen}(2\\pi f_3 t)',
  entradas: [
    {
      simbolo: 'A',
      significado: 'Amplitud de la primera componente',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'f_1',
      significado: 'Frecuencia de la primera componente',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'B',
      significado: 'Amplitud de la segunda componente',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'f_2',
      significado: 'Frecuencia de la segunda componente',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'C',
      significado: 'Amplitud de la tercera componente',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'f_3',
      significado: 'Frecuencia de la tercera componente',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 't',
      significado: 'Instante de tiempo',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'f(t)',
    significado: 'Valor instantáneo de la señal compuesta',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Es una función del tiempo: se calcula su valor instantáneo en un instante t dado, que entra como Variable. ' +
    'La señal resultante sólo es periódica si las frecuencias son múltiplos enteros de una fundamental común.',
  paginas: '17, 18',
  confianza: 'alta',
  calcular: ({ A, f_1, B, f_2, C, f_3, t }) =>
    A * Math.sin(2 * Math.PI * f_1 * t) +
    B * Math.sin(2 * Math.PI * f_2 * t) +
    C * Math.sin(2 * Math.PI * f_3 * t),
};

const U02_F10: Formula = {
  id: 'U02-F10',
  unidad: 2,
  nombre: 'Ancho de banda absoluto',
  expresion: 'BW_abs = f_max − f_min',
  expresionLatex: 'BW_{abs} = f_{max} - f_{min}',
  entradas: [
    {
      simbolo: 'f_max',
      significado: 'Frecuencia más alta contenida en la señal compuesta',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'f_min',
      significado: 'Frecuencia más baja contenida en la señal compuesta',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'BW_abs',
    significado: 'Ancho de banda absoluto de la señal',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'Aplica a señales compuestas con espectro de extensión finita. ' +
    'Distinto del ancho de banda efectivo (págs. 20-21), que es el rango que contiene la mayor parte ' +
    'de la energía y para el cual la cátedra no da fórmula.',
  paginas: '19',
  confianza: 'media',
  calcular: ({ f_max, f_min }) => f_max - f_min,
};

const U02_F11: Formula = {
  id: 'U02-F11',
  unidad: 2,
  nombre: 'Serie de Fourier trigonométrica (síntesis)',
  expresion: 'f(t) = ½·a₀ + Σ a_n·cos(n·ω₀·t) + Σ b_n·sen(n·ω₀·t)',
  expresionLatex:
    'f(t) = \\frac{1}{2}a_0 + \\sum_{n=1}^{\\infty} a_n \\cos(n\\omega_0 t) + \\sum_{n=1}^{\\infty} b_n\\,\\mathrm{sen}(n\\omega_0 t)',
  entradas: [],
  salida: {
    simbolo: 'f(t)',
    significado: 'Valor reconstruido de la señal periódica',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Suma infinita: la cátedra no fija dónde truncarla. Sólo para f(t) periódica de período T ' +
    'que cumpla las condiciones de Dirichlet (pág. 26). El término constante vale ½·a₀. ' +
    'En la práctica se trunca la serie a N armónicas.',
  paginas: '25, 26, 28, 33, 45',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F12: Formula = {
  id: 'U02-F12',
  unidad: 2,
  nombre: 'Coeficiente a_0 de la serie trigonométrica',
  expresion: 'a₀ = (2 / T) · ∫ f(t) dt',
  expresionLatex: 'a_0 = \\frac{2}{T}\\int_{-T/2}^{T/2} f(t)\\,dt',
  entradas: [],
  salida: {
    simbolo: 'a_0',
    significado: 'Coeficiente constante (doble del valor medio de f(t))',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Integral de una f(t) arbitraria en [−T/2, T/2]: requiere una expresión analítica de f(t). ' +
    'Con f(t) de simetría impar (como la onda cuadrada simétrica), a₀ = 0.',
  paginas: '28, 29',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F13: Formula = {
  id: 'U02-F13',
  unidad: 2,
  nombre: 'Coeficiente a_n de la serie trigonométrica',
  expresion: 'a_n = (2 / T) · ∫ f(t) · cos(n · ω₀ · t) dt',
  expresionLatex: 'a_n = \\frac{2}{T}\\int_{-T/2}^{T/2} f(t)\\cos(n\\omega_0 t)\\,dt',
  entradas: [],
  salida: {
    simbolo: 'a_n',
    significado: 'Amplitud del coseno de la n-ésima armónica',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Integral de una f(t) arbitraria en [−T/2, T/2]: requiere expresión analítica de f(t). ' +
    'Si f(t) es impar (f(−t) = −f(t)), todos los a_n = 0.',
  paginas: '28, 30',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F14: Formula = {
  id: 'U02-F14',
  unidad: 2,
  nombre: 'Coeficiente b_n de la serie trigonométrica',
  expresion: 'b_n = (2 / T) · ∫ f(t) · sen(n · ω₀ · t) dt',
  expresionLatex: 'b_n = \\frac{2}{T}\\int_{-T/2}^{T/2} f(t)\\,\\mathrm{sen}(n\\omega_0 t)\\,dt',
  entradas: [],
  salida: {
    simbolo: 'b_n',
    significado: 'Amplitud del seno de la n-ésima armónica',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Integral de una f(t) arbitraria en [−T/2, T/2]: requiere expresión analítica de f(t). ' +
    'Si f(t) es par (f(−t) = f(t)), todos los b_n = 0.',
  paginas: '28, 31',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F15: Formula = {
  id: 'U02-F15',
  unidad: 2,
  nombre: 'Coeficientes b_n de la onda cuadrada simétrica de amplitud 1',
  expresion: 'b_n = (2 / (n · π)) · [1 − (−1)ⁿ]',
  expresionLatex:
    'b_n = \\frac{2}{n\\pi}\\left[1-(-1)^n\\right] = \\begin{cases} \\dfrac{4}{n\\pi} & n\\ \\text{impar}\\\\[4pt] 0 & n\\ \\text{par}\\end{cases}',
  entradas: [
    {
      simbolo: 'n',
      significado: 'Orden de la armónica (entero ≥ 1)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'b_n',
    significado: 'Amplitud de la n-ésima armónica senoidal',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Válido SÓLO para la onda cuadrada simétrica de amplitud ±1 y valor medio nulo (a₀ = 0, a_n = 0). ' +
    'Para otra amplitud A, multiplicar por A.',
  paginas: '32, 43, 44',
  confianza: 'alta',
  calcular: ({ n }) => {
    const nInt = Math.round(n);
    if (nInt % 2 === 0) return 0;
    return 4 / (nInt * Math.PI);
  },
};

const U02_F16: Formula = {
  id: 'U02-F16',
  unidad: 2,
  nombre: 'Serie de Fourier de la onda cuadrada simétrica',
  expresion: 'f(t) = (4 / π) · Σ (1 / n) · sen(n · ω₀ · t), n impar',
  expresionLatex:
    'f(t) = \\frac{4}{\\pi}\\sum_{n\\ \\text{impar}} \\frac{1}{n}\\,\\mathrm{sen}(n\\omega_0 t)',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma desarrollada (primeros términos)',
      expresion:
        'f(t) = (4 / π) · [sen(ω₀·t) + ⅓·sen(3·ω₀·t) + ⅕·sen(5·ω₀·t) + ...]',
      latex:
        'f(t) = \\frac{4}{\\pi}\\left[\\mathrm{sen}(\\omega_0 t) + \\frac{1}{3}\\mathrm{sen}(3\\omega_0 t) + \\frac{1}{5}\\mathrm{sen}(5\\omega_0 t) + \\cdots\\right]',
    },
  ],
  entradas: [],
  salida: {
    simbolo: 'f(t)',
    significado: 'Onda cuadrada reconstruida',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Suma infinita sobre armónicas impares. Al truncar la serie a N armónicas se obtiene la ' +
    'señal truncada con rizado en los flancos (fenómeno de Gibbs). Para amplitud A distinta de 1 multiplicar por A.',
  paginas: '33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 52',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F17: Formula = {
  id: 'U02-F17',
  unidad: 2,
  nombre: 'Serie de Fourier compleja (síntesis)',
  expresion: 'f(t) = Σ C_n · e^(j · n · ω₀ · t)',
  expresionLatex:
    'f(t) = \\sum_{n=-\\infty}^{+\\infty} C_n\\,e^{j n \\omega_0 t},\\qquad \\omega_0 = \\frac{2\\pi}{T}',
  entradas: [],
  salida: {
    simbolo: 'f(t)',
    significado: 'Valor reconstruido de la señal periódica',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Suma infinita desde n = −∞ hasta +∞ (espectro bilateral). C₀ es la componente continua. ' +
    'Sólo para f(t) periódica que cumpla las condiciones de Dirichlet.',
  paginas: '46, 47, 51, 64',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F18: Formula = {
  id: 'U02-F18',
  unidad: 2,
  nombre: 'Coeficientes de la serie de Fourier compleja',
  expresion: 'C_n = (1 / T) · ∫ f(t) · e^(−j · n · ω₀ · t) dt',
  expresionLatex:
    'C_n = \\frac{1}{T}\\int_{0}^{T} f(t)\\,e^{-j n \\omega_0 t}\\,dt \\qquad n = 0, \\pm1, \\pm2, \\pm3,\\ldots',
  entradas: [],
  salida: {
    simbolo: 'C_n',
    significado: 'Coeficiente espectral complejo de orden n',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Integral de f(t) en un período completo (de 0 a T o de −T/2 a T/2). ' +
    'Requiere expresión analítica de f(t). El exponente lleva signo negativo.',
  paginas: '46, 47, 48, 54, 64',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F19: Formula = {
  id: 'U02-F19',
  unidad: 2,
  nombre: 'Relación entre coeficientes complejos y trigonométricos',
  expresion: 'C_n = ½(a_n − j·b_n)',
  // Decisión de observaciones-resueltas.md: se invierte el signo para corregir la errata de la lámina 46.
  expresionLatex: 'C_n = \\frac{1}{2}\\left(a_n - j b_n\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'Componente continua (n = 0)',
      expresion: 'C₀ = ½·a₀',
      latex: 'C_0 = \\frac{1}{2}a_0',
    },
    {
      rotulo: 'Armónica de orden negativo (n < 0)',
      expresion: 'C_−n = ½(a_n + j·b_n)',
      latex: 'C_{-n} = \\frac{1}{2}\\left(a_n + j b_n\\right)',
    },
  ],
  entradas: [],
  salida: {
    simbolo: 'C_n',
    significado: 'Coeficiente complejo de orden n',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Sólo para señales periódicas desarrolladas en ambas formas de la serie. ' +
    'El resultado es un número complejo, por lo que entra como ficha de consulta.',
  paginas: '46',
  confianza: 'baja',
  observacion:
    'La diapositiva 46 se contradice a sí misma: su línea de definición escribe C_n = ½(a_n + j·b_n) ' +
    'y C_−n = ½(a_n − j·b_n), pero el desarrollo algebraico de esa misma página y el Ejemplo 02 (págs. 50-51) ' +
    'demuestran que la forma correcta es C_n = ½(a_n − j·b_n) y C_−n = ½(a_n + j·b_n). Se adopta la forma correcta.',
  calcular: () => NaN,
};

const U02_F20: Formula = {
  id: 'U02-F20',
  unidad: 2,
  nombre: 'Coeficientes complejos de la onda cuadrada simétrica',
  expresion: 'C_n = −j · (1 / (n · π)) · [1 − (−1)ⁿ]',
  expresionLatex:
    'C_n = -j\\,\\frac{1}{n\\pi}\\left[1-(-1)^n\\right] = \\begin{cases} -j\\dfrac{2}{n\\pi} & n\\ \\text{impar}\\\\[4pt] 0 & n\\ \\text{par o } n=0\\end{cases}',
  expresionesRelacionadas: [
    {
      rotulo: 'Módulo del coeficiente espectral',
      expresion: '|C_n| = (1 / (n · π)) · [1 − (−1)ⁿ]',
      latex:
        '|C_n| = \\frac{1}{n\\pi}\\left[1-(-1)^n\\right] = \\begin{cases} \\dfrac{2}{n\\pi} & n\\ \\text{impar}\\\\[4pt] 0 & n\\ \\text{par o } n=0\\end{cases}',
    },
    {
      rotulo: 'Armónica de orden negativo (n impar negativo)',
      expresion: 'C_−n = +j · 2 / (n · π)',
      latex: 'C_{-n} = +j\\,\\frac{2}{n\\pi}',
    },
  ],
  entradas: [],
  salida: {
    simbolo: 'C_n',
    significado: 'Coeficiente complejo de orden n (imaginario puro)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Válido para la onda cuadrada simétrica de amplitud ±1. Coeficientes imaginarios puros con C₀ = 0. ' +
    'Al ser números complejos, entra como ficha de consulta.',
  paginas: '50, 51, 52',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F21: Formula = {
  id: 'U02-F21',
  unidad: 2,
  nombre: 'Coeficientes del tren de pulsos rectangulares (función sinc)',
  expresion: 'C_n = A · (p / T) · sinc(n · π · p / T)',
  expresionLatex:
    'C_n = A\\,\\frac{p}{T}\\,\\mathrm{sinc}\\!\\left(\\frac{n\\,\\pi\\,p}{T}\\right)',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma trigonométrica (con pulsación fundamental ω₀)',
      expresion:
        'C_n = A · (p / T) · [sen(n · ω₀ · p / 2) / (n · ω₀ · p / 2)]',
      latex:
        'C_n = A\\,\\frac{p}{T}\\cdot\\frac{\\mathrm{sen}\\!\\left(n\\,\\omega_0\\,p/2\\right)}{n\\,\\omega_0\\,p/2}',
    },
    {
      rotulo: 'Componente continua (n = 0)',
      expresion: 'C₀ = A · p / T',
      latex: 'C_0 = A\\,\\frac{p}{T}',
    },
  ],
  entradas: [
    {
      simbolo: 'A',
      significado: 'Amplitud del pulso',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'p',
      significado: 'Ancho (duración) del pulso',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'T',
      significado: 'Período de repetición del tren de pulsos',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'n',
      significado: 'Orden de la armónica (entero)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C_n',
    significado: 'Coeficiente espectral de orden n del tren de pulsos',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Tren periódico de pulsos rectangulares de amplitud A, ancho p, período T, centrado en t = 0. ' +
    'La cátedra usa la sinc no normalizada: sinc(x) = sen(x)/x con x en radianes. ' +
    'C_n = 0 cuando n es múltiplo entero de T/p.',
  paginas: '54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 66',
  confianza: 'alta',
  calcular: ({ A, p, T, n }) => {
    if (T === 0) return NaN;
    const x = (n * Math.PI * p) / T;
    const sinc = x === 0 ? 1 : Math.sin(x) / x;
    return A * (p / T) * sinc;
  },
};

const U02_F22: Formula = {
  id: 'U02-F22',
  unidad: 2,
  nombre: 'Función sinc',
  expresion: 'sinc(x) = sen(x) / x',
  expresionLatex: '\\mathrm{sinc}(x) = \\frac{\\mathrm{sen}(x)}{x}',
  entradas: [
    {
      simbolo: 'x',
      significado: 'Argumento de la función',
      unidadDeMedida: 'rad',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'sinc(x)',
    significado: 'Valor de la función sinc',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'La cátedra usa la sinc no normalizada: sinc(x) = sen(x)/x con x en radianes (no sen(πx)/(πx)). ' +
    'En x = 0 vale sinc(0) = 1 por límite. Ceros en x = k·π con k entero ≠ 0.',
  paginas: '55, 69',
  confianza: 'alta',
  calcular: ({ x }) => (x === 0 ? 1 : Math.sin(x) / x),
};

const U02_F23: Formula = {
  id: 'U02-F23',
  unidad: 2,
  nombre: 'Número de fasores hasta el primer cruce por cero',
  expresion: 'n_fasores = T / p',
  // El catálogo escribe n_{\text{fasores}}; se normaliza a subíndice para ligar con n_fasores.
  expresionLatex: 'n_{fasores} = \\frac{T}{p}',
  entradas: [
    {
      simbolo: 'T',
      significado: 'Período del tren de pulsos',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'p',
      significado: 'Ancho (duración) del pulso',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'n_fasores',
    significado: 'Orden de la armónica del primer cruce por cero / cantidad de fasores del lóbulo principal',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Aplica al tren de pulsos rectangulares de U02-F21. T y p deben estar en la misma unidad. ' +
    'Es donde C_n se anula por primera vez.',
  paginas: '55, 61',
  confianza: 'alta',
  calcular: ({ T, p }) => T / p,
};

const U02_F24: Formula = {
  id: 'U02-F24',
  unidad: 2,
  nombre: 'Frecuencia del primer cruce por cero del espectro del pulso',
  expresion: 'f_cero = 1 / p',
  // El catálogo escribe f_{\text{1er cero}}; el código declara f_cero.
  expresionLatex: 'f_{cero} = \\frac{1}{p}',
  entradas: [
    {
      simbolo: 'p',
      significado: 'Ancho (duración) del pulso',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
  ],
  salida: {
    simbolo: 'f_cero',
    significado: 'Frecuencia del primer cruce por cero de la envolvente sinc',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'M',
  },
  condiciones:
    'Vale para la envolvente del tren de pulsos periódicos y para el pulso aislado (transformada F(f)). ' +
    'Ceros sucesivos en f = k / p con k entero distinto de 0.',
  paginas: '61, 69, 70',
  confianza: 'alta',
  calcular: ({ p }) => 1 / p,
};

const U02_F25: Formula = {
  id: 'U02-F25',
  unidad: 2,
  nombre: 'Transformada de Fourier',
  expresion: 'F(ω) = ∫ f(t) · e^(−j·ω·t) dt',
  expresionLatex: 'F(\\omega) = \\int_{-\\infty}^{+\\infty} f(t)\\,e^{-j\\omega t}\\,dt',
  entradas: [],
  salida: {
    simbolo: 'F(ω)',
    significado: 'Espectro continuo de la señal en frecuencia',
    unidadDeMedida: 'V·s',
    multiploCanonico: '',
  },
  condiciones:
    'Para señales aperiódicas (pulso aislado); es el límite de la serie compleja cuando T → ∞. ' +
    'El espectro resultante es continuo en frecuencia. Requiere expresión analítica de f(t).',
  paginas: '64, 65, 66',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F26: Formula = {
  id: 'U02-F26',
  unidad: 2,
  nombre: 'Transformada inversa de Fourier',
  expresion: 'f(t) = (1 / (2·π)) · ∫ F(ω) · e^(j·ω·t) dω',
  expresionLatex: 'f(t) = \\frac{1}{2\\pi}\\int_{-\\infty}^{+\\infty} F(\\omega)\\,e^{j\\omega t}\\,d\\omega',
  entradas: [],
  salida: {
    simbolo: 'f(t)',
    significado: 'Señal recuperada en el dominio del tiempo',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'El factor 1/(2π) va en la antitransformada (convención de la cátedra con ω en rad/s). Exponente positivo.',
  paginas: '64, 65',
  confianza: 'alta',
  calcular: () => NaN,
};

const U02_F27: Formula = {
  id: 'U02-F27',
  unidad: 2,
  nombre: 'Transformada de Fourier del pulso rectangular (en omega)',
  expresion: 'F(ω) = p · sen(ω·p / 2) / (ω·p / 2)',
  expresionLatex: 'F(\\omega) = p\\,\\frac{\\mathrm{sen}(\\omega p / 2)}{\\omega p / 2}',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma equivalente con función sinc',
      expresion: 'F(ω) = p · sinc(ω · p / 2)',
      latex: 'F(\\omega) = p\\,\\mathrm{sinc}\\!\\left(\\frac{\\omega p}{2}\\right)',
    },
  ],
  entradas: [
    {
      simbolo: 'p',
      significado: 'Ancho (duración) del pulso',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'ω',
      significado: 'Frecuencia angular',
      unidadDeMedida: 'rad/s',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'F(ω)',
    significado: 'Espectro del pulso rectangular unitario',
    unidadDeMedida: 's',
    multiploCanonico: 'm',
  },
  condiciones:
    'Pulso rectangular aislado de amplitud 1 centrado en el origen (f(t) = 1 para |t| < p/2, 0 para |t| > p/2). ' +
    'Para amplitud A, multiplicar por A. En ω = 0 vale F(0) = p. Primer cruce por cero en ω = 2π/p.',
  paginas: '66, 67, 69',
  confianza: 'alta',
  calcular: ({ p, ω }) => {
    const x = (ω * p) / 2;
    return x === 0 ? p : p * (Math.sin(x) / x);
  },
};

const U02_F28: Formula = {
  id: 'U02-F28',
  unidad: 2,
  nombre: 'Transformada de Fourier del pulso rectangular (en frecuencia f)',
  expresion: 'F(f) = p · sinc(π · p · f)',
  expresionLatex: 'F(f) = p\\,\\mathrm{sinc}(\\pi p f)',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma trigonométrica equivalente',
      expresion: 'F(f) = p · sen(π · p · f) / (π · p · f)',
      latex: 'F(f) = p\\,\\frac{\\mathrm{sen}(\\pi p f)}{\\pi p f}',
    },
  ],
  entradas: [
    {
      simbolo: 'p',
      significado: 'Ancho (duración) del pulso',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'f',
      significado: 'Frecuencia',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'F(f)',
    significado: 'Espectro del pulso rectangular unitario en función de f',
    unidadDeMedida: 's',
    multiploCanonico: 'm',
  },
  condiciones:
    'Misma hipótesis que U02-F27 con ω = 2πf. Ceros en f = ±1/p, ±2/p, ... En f = 0 vale F(0) = p.',
  paginas: '69, 70',
  confianza: 'alta',
  calcular: ({ p, f }) => {
    const x = Math.PI * p * f;
    return x === 0 ? p : p * (Math.sin(x) / x);
  },
};

const U02_F29: Formula = {
  id: 'U02-F29',
  unidad: 2,
  nombre: 'Densidad espectral (módulo al cuadrado) del pulso rectangular',
  expresion: '|F(f)|² = [p · sinc(π · p · f)]²',
  expresionLatex: '|F(f)|^2 = \\left[p\\,\\mathrm{sinc}(\\pi p f)\\right]^2',
  expresionesRelacionadas: [
    {
      rotulo: 'Forma trigonométrica equivalente',
      expresion: '|F(f)|² = [p · sen(π · p · f) / (π · p · f)]²',
      latex:
        '|F(f)|^2 = \\left[p\\,\\frac{\\mathrm{sen}(\\pi p f)}{\\pi p f}\\right]^2',
    },
  ],
  entradas: [
    {
      simbolo: 'p',
      significado: 'Ancho (duración) del pulso',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'f',
      significado: 'Frecuencia',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: '|F(f)|²',
    significado: 'Módulo al cuadrado del espectro (densidad espectral de energía)',
    unidadDeMedida: 's²',
    multiploCanonico: 'µ',
  },
  condiciones:
    'Misma hipótesis que U02-F28. Siempre positivo o cero. Ceros en f = ±k/p (k entero ≠ 0). ' +
    'En f = 0 vale |F(0)|² = p².',
  paginas: '70',
  confianza: 'alta',
  calcular: ({ p, f }) => {
    const x = Math.PI * p * f;
    const sinc = x === 0 ? 1 : Math.sin(x) / x;
    return Math.pow(p * sinc, 2);
  },
};

export const FORMULAS_UNIDAD_02: readonly Formula[] = [
  U02_F01,
  U02_F02,
  U02_F03,
  U02_F04,
  U02_F05,
  U02_F06,
  U02_F07,
  U02_F08,
  U02_F09,
  U02_F10,
  U02_F11,
  U02_F12,
  U02_F13,
  U02_F14,
  U02_F15,
  U02_F16,
  U02_F17,
  U02_F18,
  U02_F19,
  U02_F20,
  U02_F21,
  U02_F22,
  U02_F23,
  U02_F24,
  U02_F25,
  U02_F26,
  U02_F27,
  U02_F28,
  U02_F29,
];

export const EJEMPLOS_UNIDAD_02: readonly EjemploResuelto[] = [
  {
    formulaId: 'U02-F03',
    enunciado:
      'En un cierto medio una onda sonora se propaga a 340 m/s. ¿Qué longitud de onda, expresada en mm, corresponde a una frecuencia de 20 kHz?',
    entradas: {
      v: { valor: 340, multiplo: '' },
      f: { valor: 20, multiplo: 'k' },
    },
    esperado: { valor: 17, multiplo: 'm' },
    pagina: '15',
  },
  {
    formulaId: 'U02-F03',
    enunciado:
      'Calcular la longitud de onda de un canal de Wi-Fi que trabaja a 2,4 GHz y se propaga por el espacio libre (c = 3 × 10⁸ m/s).',
    entradas: {
      v: { valor: 300, multiplo: 'M' },
      f: { valor: 2.4, multiplo: 'G' },
    },
    esperado: { valor: 125, multiplo: 'm' },
    pagina: '15',
  },
  {
    formulaId: 'U02-F15',
    enunciado:
      'Ejemplo 01 (parte c): Coeficiente b_1 de la onda cuadrada simétrica de amplitud 1.',
    entradas: {
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 4 / Math.PI, multiplo: '' },
    pagina: '32',
  },
  {
    formulaId: 'U02-F15',
    enunciado:
      'Ejemplo 01 (parte c): Coeficiente b_3 de la onda cuadrada simétrica de amplitud 1.',
    entradas: {
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: 4 / (3 * Math.PI), multiplo: '' },
    pagina: '32',
  },
  {
    formulaId: 'U02-F15',
    enunciado:
      'Ejemplo 01 (parte c): Coeficiente b_5 de la onda cuadrada simétrica de amplitud 1.',
    entradas: {
      n: { valor: 5, multiplo: '' },
    },
    esperado: { valor: 4 / (5 * Math.PI), multiplo: '' },
    pagina: '32',
  },
  {
    formulaId: 'U02-F15',
    enunciado:
      'Ejemplo 01 (parte c): Coeficiente b_7 de la onda cuadrada simétrica de amplitud 1.',
    entradas: {
      n: { valor: 7, multiplo: '' },
    },
    esperado: { valor: 4 / (7 * Math.PI), multiplo: '' },
    pagina: '32',
  },
  {
    formulaId: 'U02-F15',
    enunciado:
      'Ejemplo 01 (parte c): Coeficiente b_n para armónica par (n = 2) de la onda cuadrada simétrica.',
    entradas: {
      n: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '32',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 2): Tren de pulsos rectangulares (A = 1, p = 1, T = 2) para n = 0 (componente continua c0 = 0,50).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 2, multiplo: '' },
      n: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 0.5, multiplo: '' },
    pagina: '56',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 2): Tren de pulsos rectangulares (A = 1, p = 1, T = 2) para n = 1 (c1 = 0,31).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 2, multiplo: '' },
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0.31, multiplo: '' },
    pagina: '56',
    tolerancia: 0.03,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 2): Tren de pulsos rectangulares (A = 1, p = 1, T = 2) para n = 2 (c2 = 0).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 2, multiplo: '' },
      n: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '56',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 2): Tren de pulsos rectangulares (A = 1, p = 1, T = 2) para n = 3 (c3 = −0,10).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 2, multiplo: '' },
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: -0.1, multiplo: '' },
    pagina: '56',
    tolerancia: 0.07,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 2): Tren de pulsos rectangulares (A = 1, p = 1, T = 2) para n = 4 (c4 = 0).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 2, multiplo: '' },
      n: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '56',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 5): Tren de pulsos rectangulares (A = 1, p = 1, T = 5) para n = 0 (c0 = 0,20).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 5, multiplo: '' },
      n: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 0.2, multiplo: '' },
    pagina: '57',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 5): Tren de pulsos rectangulares (A = 1, p = 1, T = 5) para n = 1 (c1 = 0,18).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 5, multiplo: '' },
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0.18, multiplo: '' },
    pagina: '57',
    tolerancia: 0.05,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 5): Tren de pulsos rectangulares (A = 1, p = 1, T = 5) para n = 2 (c2 = 0,15).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 5, multiplo: '' },
      n: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 0.15, multiplo: '' },
    pagina: '57',
    tolerancia: 0.015,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 5): Tren de pulsos rectangulares (A = 1, p = 1, T = 5) para n = 3 (c3 = 0,10).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 5, multiplo: '' },
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: 0.1, multiplo: '' },
    pagina: '57',
    tolerancia: 0.015,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 5): Tren de pulsos rectangulares (A = 1, p = 1, T = 5) para n = 4 (c4 = 0,04).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 5, multiplo: '' },
      n: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 0.04, multiplo: '' },
    pagina: '57',
    tolerancia: 0.18,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 5): Tren de pulsos rectangulares (A = 1, p = 1, T = 5) para n = 5 (c5 = 0).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 5, multiplo: '' },
      n: { valor: 5, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '57',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 10): Tren de pulsos rectangulares (A = 1, p = 1, T = 10) para n = 0 (c0 = 0,10).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 10, multiplo: '' },
      n: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 0.1, multiplo: '' },
    pagina: '58',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 10): Tren de pulsos rectangulares (A = 1, p = 1, T = 10) para n = 1 (c1 = 0,098).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 10, multiplo: '' },
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0.098, multiplo: '' },
    pagina: '58',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 10): Tren de pulsos rectangulares (A = 1, p = 1, T = 10) para n = 2 (c2 = 0,093).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 10, multiplo: '' },
      n: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 0.093, multiplo: '' },
    pagina: '58',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 10): Tren de pulsos rectangulares (A = 1, p = 1, T = 10) para n = 3 (c3 = 0,085).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 10, multiplo: '' },
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: 0.085, multiplo: '' },
    pagina: '58',
    tolerancia: 0.015,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 10): Tren de pulsos rectangulares (A = 1, p = 1, T = 10) para n = 10 (c10 = 0).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 10, multiplo: '' },
      n: { valor: 10, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '58',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 20): Tren de pulsos rectangulares (A = 1, p = 1, T = 20) para n = 0 (c0 = 0,05).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 20, multiplo: '' },
      n: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 0.05, multiplo: '' },
    pagina: '59',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 20): Tren de pulsos rectangulares (A = 1, p = 1, T = 20) para n = 1 (c1 = 0,049).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 20, multiplo: '' },
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0.049, multiplo: '' },
    pagina: '59',
    tolerancia: 0.02,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 20): Tren de pulsos rectangulares (A = 1, p = 1, T = 20) para n = 3 (c3 = 0,048).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 20, multiplo: '' },
      n: { valor: 3, multiplo: '' },
    },
    esperado: { valor: 0.048, multiplo: '' },
    pagina: '59',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 20): Tren de pulsos rectangulares (A = 1, p = 1, T = 20) para n = 20 (c20 = 0).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 20, multiplo: '' },
      n: { valor: 20, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '59',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 500): Tren de pulsos rectangulares (A = 1, p = 1, T = 500) para n = 0 (c0 = 0,002).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 500, multiplo: '' },
      n: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 0.002, multiplo: '' },
    pagina: '60',
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 500): Tren de pulsos rectangulares (A = 1, p = 1, T = 500) para n = 1 (c1 = 0,0019).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 500, multiplo: '' },
      n: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0.0019, multiplo: '' },
    pagina: '60',
    tolerancia: 0.06,
  },
  {
    formulaId: 'U02-F21',
    enunciado:
      'Ejemplo 04 (T = 500): Tren de pulsos rectangulares (A = 1, p = 1, T = 500) para n = 500 (c500 = 0).',
    entradas: {
      A: { valor: 1, multiplo: '' },
      p: { valor: 1, multiplo: '' },
      T: { valor: 500, multiplo: '' },
      n: { valor: 500, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '60',
  },
  {
    formulaId: 'U02-F27',
    enunciado:
      'Ejemplo 07 (p = 1): Transformada F(ω) del pulso rectangular para ω = 0 (F(0) = 1 s).',
    entradas: {
      p: { valor: 1, multiplo: '' },
      ω: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '67',
  },
  {
    formulaId: 'U02-F27',
    enunciado:
      'Ejemplo 07 (p = 1): Transformada F(ω) del pulso rectangular para ω = 2π (primer cero F(2π) = 0 s).',
    entradas: {
      p: { valor: 1, multiplo: '' },
      ω: { valor: 2 * Math.PI, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '67',
  },
  {
    formulaId: 'U02-F28',
    enunciado:
      'Ejemplo 07 (p = 1): Transformada F(f) del pulso rectangular para f = 0 (F(0) = 1 s).',
    entradas: {
      p: { valor: 1, multiplo: '' },
      f: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '69',
  },
  {
    formulaId: 'U02-F28',
    enunciado:
      'Ejemplo 07 (p = 1): Transformada F(f) del pulso rectangular para f = 1 Hz (primer cero F(1) = 0 s).',
    entradas: {
      p: { valor: 1, multiplo: '' },
      f: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '69',
  },
  {
    formulaId: 'U02-F29',
    enunciado:
      'Ejemplo 07 (p = 1): Densidad espectral |F(f)|² del pulso rectangular para f = 0 (|F(0)|² = 1 s²).',
    entradas: {
      p: { valor: 1, multiplo: '' },
      f: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '70',
  },
  {
    formulaId: 'U02-F29',
    enunciado:
      'Ejemplo 07 (p = 1): Densidad espectral |F(f)|² del pulso rectangular para f = 1 Hz (primer cero |F(1)|² = 0 s²).',
    entradas: {
      p: { valor: 1, multiplo: '' },
      f: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 0, multiplo: '' },
    pagina: '70',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Al cargarse las 29 Fórmulas de la Unidad 2, la deuda queda vacía.
 */
export const PENDIENTES_UNIDAD_02: readonly string[] = [];

