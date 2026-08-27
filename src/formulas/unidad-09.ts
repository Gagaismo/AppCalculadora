import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 9 — Equipos de Comunicación de Datos (DCE).
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

const U09_F01: Formula = {
  id: 'U09-F01',
  unidad: 9,
  nombre: 'Velocidad de transmisión (tasa binaria) del módem M-ario',
  expresion: 'R = (1 / T_S) · log₂(M) = B_M_ario · log₂(M)',
  entradas: [
    {
      simbolo: 'B_M_ario',
      significado: 'Ancho de banda asignado a la señal M-aria (velocidad de modulación en baudios)',
      unidadDeMedida: 'Hz',
      multiploCanonico: '',
    },
    {
      simbolo: 'M',
      significado: 'Número de estados o símbolos de la modulación (orden M-ario)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Velocidad de transmisión / tasa binaria del módem',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'Tasa teórica, sin considerar ruido, codificación ni overhead. Se asume B_M_ario = 1/T_S (baudios). ' +
    'M debe ser potencia de 2 para que log₂(M) sea entero. Sobre línea telefónica el ancho de banda útil ' +
    'para datos es 2400 Hz (600–3000 Hz dentro de la banda vocal 300–3300 Hz): en semidúplex B_M_ario = 2400 Hz ' +
    'y en dúplex B_M_ario = 1200 Hz por sentido (1200 Up + 1200 Down). En ADSL la misma fórmula se aplica con ' +
    'B_M_ario ≈ 80 kHz para upstream (banda 26–108 kHz) y B_M_ario ≈ 1 MHz para downstream (banda 138–1104 kHz).',
  paginas: '7, 10, 13, 19, 20',
  confianza: 'alta',
  calcular: ({ B_M_ario, M }) => B_M_ario * Math.log2(M),
};

const U09_F02: Formula = {
  id: 'U09-F02',
  unidad: 9,
  nombre: 'Capacidad de canal de Nyquist (canal sin ruido)',
  expresion: 'C = 2 · B · log₂(M)',
  entradas: [
    {
      simbolo: 'B',
      significado: 'Ancho de banda en banda base de la señal moduladora',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'M',
      significado: 'Número de estados o símbolos de la modulación',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C',
    significado: 'Capacidad del canal sin ruido',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'Aparece como primer miembro de la cadena de igualdades C = 2B·log₂(M) = B·log₂(1 + SNR) de la pág. 20, ' +
    'usada para derivar el M máximo por portadora en DMT. B es el ancho de banda en banda base; la señal ' +
    'modulada ocupa 2B centrado en f_p. No contempla ruido.',
  paginas: '20',
  confianza: 'alta',
  calcular: ({ B, M }) => 2 * B * Math.log2(M),
};

const U09_F03: Formula = {
  id: 'U09-F03',
  unidad: 9,
  nombre: 'Capacidad de canal de Shannon (canal con ruido)',
  expresion: 'C = B · log₂(1 + SNR)',
  entradas: [
    {
      simbolo: 'B',
      significado: 'Ancho de banda del canal',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'SNR',
      significado: 'Relación señal a ruido en veces (lineal)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C',
    significado: 'Capacidad máxima del canal ruidoso',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'SNR debe ir en veces (lineal), no en dB. Si el dato viene en dB, convertir antes con ' +
    'SNR = 10^(SNR_dB/10) (ver U09-F06). Aparece como segundo miembro de la cadena ' +
    'C = 2B·log₂(M) = B·log₂(1 + SNR) de la pág. 20. Es un límite teórico superior, no alcanzable en la práctica.',
  paginas: '20',
  confianza: 'alta',
  calcular: ({ B, SNR }) => B * Math.log2(1 + SNR),
};

const U09_F04: Formula = {
  id: 'U09-F04',
  unidad: 9,
  nombre: 'Máximo orden de modulación M por portadora (DMT/ADSL)',
  expresion: 'M = √(1 + SNR)',
  entradas: [
    {
      simbolo: 'SNR',
      significado: 'Relación señal a ruido medida sobre la portadora (en veces, lineal)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'M',
    significado: 'Máximo número de estados (nQAM) soportado por la portadora',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Se obtiene igualando Nyquist y Shannon en la pág. 20: 2B·log₂(M) = B·log₂(1+SNR) ⇒ M = √(1+SNR). ' +
    'SNR en veces (lineal), no en dB. El resultado continuo se redondea a la potencia de 2 soportada ' +
    '(mínimo 4-QAM [2 bits/símbolo] y máximo 16384-QAM [14 bits/símbolo] según pág. 23). ' +
    'En ADSL el SNR se mide por portadora en la inicialización y se re-mide durante showtime (default 10 s).',
  paginas: '20, 21, 22, 23',
  confianza: 'alta',
  calcular: ({ SNR }) => Math.sqrt(1 + SNR),
};

const U09_F05: Formula = {
  id: 'U09-F05',
  unidad: 9,
  nombre: 'Potencia de ruido térmico',
  expresion: 'N = K · T · B',
  entradas: [
    {
      simbolo: 'K',
      significado: 'Constante de Boltzmann',
      unidadDeMedida: 'J/K',
      multiploCanonico: '',
    },
    {
      simbolo: 'T',
      significado: 'Temperatura absoluta',
      unidadDeMedida: 'K',
      multiploCanonico: '',
    },
    {
      simbolo: 'B',
      significado: 'Ancho de banda',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'N',
    significado: 'Potencia de ruido térmico',
    unidadDeMedida: 'W',
    multiploCanonico: 'p',
  },
  condiciones:
    'La diapositiva 20 la escribe literalmente como N = KTB (W). Para obtener N en watts, ' +
    'T debe ir en Kelvin (T[K] = T[°C] + 273) y B en Hz. K es la constante de Boltzmann (≈ 1,380649 × 10⁻²³ J/K).',
  paginas: '20',
  confianza: 'alta',
  calcular: ({ K, T, B }) => K * T * B,
};

const U09_F06: Formula = {
  id: 'U09-F06',
  unidad: 9,
  nombre: 'Relación señal/ruido en decibeles',
  expresion: 'SNR_dB = 10 · log₁₀(S / N)',
  entradas: [
    {
      simbolo: 'S',
      significado: 'Potencia de la señal',
      unidadDeMedida: 'W',
      multiploCanonico: 'm',
    },
    {
      simbolo: 'N',
      significado: 'Potencia del ruido (ruido térmico)',
      unidadDeMedida: 'W',
      multiploCanonico: 'p',
    },
  ],
  salida: {
    simbolo: 'SNR_dB',
    significado: 'Relación señal a ruido expresada en decibeles',
    unidadDeMedida: 'dB',
    multiploCanonico: '',
  },
  condiciones:
    'S y N deben estar en la misma unidad de potencia (ambos convertidos a W en la unidad canónica). ' +
    'Es una relación de potencias, por eso el factor 10. Para usar el SNR en U09-F03 o U09-F04 ' +
    'hay que convertir a veces: SNR = 10^(SNR_dB/10).',
  paginas: '20',
  confianza: 'alta',
  calcular: ({ S, N }) => 10 * Math.log10(S / N),
};

const U09_F07: Formula = {
  id: 'U09-F07',
  unidad: 9,
  nombre: 'Bits por símbolo de una modulación M-aria',
  expresion: 'n = log₂(M)',
  entradas: [
    {
      simbolo: 'M',
      significado: 'Número de estados de la modulación (orden nQAM/nPSK)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'n',
    significado: 'Cantidad de bits transportados por cada símbolo (bits/símbolo o bits/baudio)',
    unidadDeMedida: 'bit/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'M debe ser potencia de 2 para que n sea entero. En ADSL/DMT n va de 2 (4-QAM, mínimo) ' +
    'a 14 bits/símbolo (16384-QAM, máximo) por portadora.',
  paginas: '20, 23, 25',
  confianza: 'media',
  calcular: ({ M }) => Math.log2(M),
};

const U09_F08: Formula = {
  id: 'U09-F08',
  unidad: 9,
  nombre: 'Velocidad máxima teórica de un enlace multiportadora (ADSL/DMT)',
  expresion: 'R = N_canales · B_canal · n',
  entradas: [
    {
      simbolo: 'N_canales',
      significado: 'Cantidad de canales (portadoras) efectivamente usados para datos',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'B_canal',
      significado: 'Ancho de banda de cada canal (velocidad de modulación en baudios)',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'n',
      significado: 'Bits por baudio de la modulación QAM usada en cada canal',
      unidadDeMedida: 'bit/baudio',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Velocidad máxima teórica del enlace (upstream o downstream)',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'M',
  },
  condiciones:
    'Es velocidad teórica; la real es menor porque algunas portadoras no se pueden usar por ' +
    'el nivel de ruido (upstream real ~1 Mbps, downstream real ~8 Mbps). En las cuentas de la cátedra ' +
    'se usa B_canal = 4 kHz (redondeando los 4,3125 kHz nominales del canal DMT) y n = 15 bits/baudio. ' +
    'N_canales excluye el canal de control: upstream canales 6–30 = 25 canales (24 de datos + 1 control); ' +
    'downstream canales 31–255 = 225 canales (224 de datos + 1 control).',
  paginas: '27, 28',
  confianza: 'media',
  calcular: ({ N_canales, B_canal, n }) => N_canales * B_canal * n,
};

const U09_F09: Formula = {
  id: 'U09-F09',
  unidad: 9,
  nombre: 'Ancho de banda de cada subcanal DMT',
  expresion: 'B_canal = B_total / N_canales',
  entradas: [
    {
      simbolo: 'B_total',
      significado: 'Ancho de banda total de la línea telefónica usado por ADSL',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'N_canales',
      significado: 'Cantidad total de canales en que se divide la banda',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'B_canal',
    significado: 'Ancho de banda de cada subcanal (portadora) DMT',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'Válida para ADSL con DMT: 1,104 MHz / 256 = 4,3125 kHz por canal, con frecuencias espaciadas de ' +
    'forma constante. Reparto de canales: canal 0 = voz (4 kHz), canales 1–5 = banda de guarda, ' +
    'canales 6–30 = upstream, canales 31–255 = downstream. Nota: en la pág. 29 el mismo valor aparece ' +
    'redondeado a 4,312 kHz y en las cuentas de velocidad (U09-F08) se usa 4 kHz.',
  paginas: '26',
  confianza: 'media',
  calcular: ({ B_total, N_canales }) => B_total / N_canales,
};

export const FORMULAS_UNIDAD_09: readonly Formula[] = [
  U09_F01,
  U09_F02,
  U09_F03,
  U09_F04,
  U09_F05,
  U09_F06,
  U09_F07,
  U09_F08,
  U09_F09,
];

export const EJEMPLOS_UNIDAD_09: readonly EjemploResuelto[] = [
  // U09-F01 — Fila 1: ASK / 2-PSK (M = 2)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación ASK / 2-PSK " +
      '(M = 2) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 2400, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación ASK / 2-PSK " +
      '(M = 2) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 1200, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 2: 4-PSK / 4-QAM (M = 4)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 4-PSK o 4-QAM " +
      '(M = 4) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 4800, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 4-PSK o 4-QAM " +
      '(M = 4) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 2400, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 3: 8-PSK / 8-QAM (M = 8)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 8-PSK u 8-QAM " +
      '(M = 8) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 7200, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 8-PSK u 8-QAM " +
      '(M = 8) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 3600, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 4: 16-QAM (M = 16)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 16-QAM " +
      '(M = 16) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 16, multiplo: '' },
    },
    esperado: { valor: 9600, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 16-QAM " +
      '(M = 16) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 16, multiplo: '' },
    },
    esperado: { valor: 4800, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 5: 32-QAM (M = 32)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 32-QAM " +
      '(M = 32) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 32, multiplo: '' },
    },
    esperado: { valor: 12000, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 32-QAM " +
      '(M = 32) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 32, multiplo: '' },
    },
    esperado: { valor: 6000, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 6: 64-QAM (M = 64)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 64-QAM " +
      '(M = 64) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 64, multiplo: '' },
    },
    esperado: { valor: 14400, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 64-QAM " +
      '(M = 64) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 64, multiplo: '' },
    },
    esperado: { valor: 7200, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 7: 128-QAM (M = 128)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 128-QAM " +
      '(M = 128) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 128, multiplo: '' },
    },
    esperado: { valor: 16800, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 128-QAM " +
      '(M = 128) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 128, multiplo: '' },
    },
    esperado: { valor: 8400, multiplo: '' },
    pagina: '7',
  },

  // U09-F01 — Fila 8: 256-QAM (M = 256)
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 256-QAM " +
      '(M = 256) en semidúplex (B_M-ario = 2400 Hz).',
    entradas: {
      B_M_ario: { valor: 2400, multiplo: '' },
      M: { valor: 256, multiplo: '' },
    },
    esperado: { valor: 19200, multiplo: '' },
    pagina: '7',
  },
  {
    formulaId: 'U09-F01',
    enunciado:
      "Tabla 'Tasa de bits teóricas para los módems' (pág. 7): tasa binaria con modulación 256-QAM " +
      '(M = 256) en dúplex (B_M-ario = 1200 Hz).',
    entradas: {
      B_M_ario: { valor: 1200, multiplo: '' },
      M: { valor: 256, multiplo: '' },
    },
    esperado: { valor: 9600, multiplo: '' },
    pagina: '7',
  },

  // U09-F09 — Fila 9: Subcanales DMT
  {
    formulaId: 'U09-F09',
    enunciado:
      "División del ancho de banda de la línea telefónica en subcanales DMT para ADSL: 'El ancho de " +
      "banda de la línea telefónica (1,104 MHz) se divide en 256 canales (cada canal es de 4,3125 KHz)'.",
    entradas: {
      B_total: { valor: 1.104, multiplo: 'M' },
      N_canales: { valor: 256, multiplo: '' },
    },
    esperado: { valor: 4.3125, multiplo: 'k' },
    pagina: '26',
  },

  // U09-F08 — Fila 10: Upstream ADSL
  {
    formulaId: 'U09-F08',
    enunciado:
      'Velocidad máxima teórica del enlace de subida (Upstream) de ADSL sobre los canales 6–30: ' +
      '24 canales de datos × 4 kHz × 15 bits/baudio = 1,44 Mbps.',
    entradas: {
      N_canales: { valor: 24, multiplo: '' },
      B_canal: { valor: 4, multiplo: 'k' },
      n: { valor: 15, multiplo: '' },
    },
    esperado: { valor: 1.44, multiplo: 'M' },
    pagina: '27',
  },

  // U09-F08 — Fila 11: Downstream ADSL
  {
    formulaId: 'U09-F08',
    enunciado:
      'Velocidad máxima teórica del enlace de bajada (Downstream) de ADSL sobre los canales 31–255: ' +
      '224 canales de datos × 4 kHz × 15 bits/baudio = 13,44 Mbps.',
    entradas: {
      N_canales: { valor: 224, multiplo: '' },
      B_canal: { valor: 4, multiplo: 'k' },
      n: { valor: 15, multiplo: '' },
    },
    esperado: { valor: 13.44, multiplo: 'M' },
    pagina: '28',
  },

  // U09-F07 — Fila 12: Rango nQAM mínimo y máximo
  {
    formulaId: 'U09-F07',
    enunciado:
      'Rango de modulaciones nQAM admitidas por portadora en DMT para ADSL: modulación mínima 4-QAM (2 bits/símbolo).',
    entradas: {
      M: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 2, multiplo: '' },
    pagina: '23',
  },
  {
    formulaId: 'U09-F07',
    enunciado:
      'Rango de modulaciones nQAM admitidas por portadora en DMT para ADSL: modulación máxima 16384-QAM (14 bits/símbolo).',
    entradas: {
      M: { valor: 16384, multiplo: '' },
    },
    esperado: { valor: 14, multiplo: '' },
    pagina: '23',
  },

  // U09-F07 — Fila 13: Ejemplo de funcionamiento DMT (pág. 25)
  {
    formulaId: 'U09-F07',
    enunciado:
      'Ejemplo de funcionamiento de DMT (pág. 25): SNR medido en inicialización permite modulación máxima 4096-QAM (12 bits/símbolo).',
    entradas: {
      M: { valor: 4096, multiplo: '' },
    },
    esperado: { valor: 12, multiplo: '' },
    pagina: '25',
  },
  {
    formulaId: 'U09-F07',
    enunciado:
      'Ejemplo de funcionamiento de DMT (pág. 25): modulación usada con margen de guarda 1024-QAM (10 bits/símbolo).',
    entradas: {
      M: { valor: 1024, multiplo: '' },
    },
    esperado: { valor: 10, multiplo: '' },
    pagina: '25',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Es la deuda declarada de la Unidad 9, y su único destino es encogerse hasta quedar
 * vacía. Al incorporar una Fórmula hay que sacar su identificador de acá, o el
 * invariante de cobertura falla nombrándolo.
 */
export const PENDIENTES_UNIDAD_09: readonly string[] = [];
