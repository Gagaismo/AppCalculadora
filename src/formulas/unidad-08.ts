import type { EjemploResuelto, Formula } from '@/dominio/formula';

/**
 * Unidad 8 — Modulación y Multiplexación de Señales.
 *
 * Fuente única: `docs/research/formulas-comunicaciones.md`, con la cita de página de
 * la Presentación de unidad. Nunca agregues una fórmula desde conocimiento general de
 * la materia: si falta una, se decide primero si entra en alcance.
 *
 * Antes de cargar una Fórmula, mirá su clase en `docs/research/clasificacion-formulas.md`
 * y, si está marcada ⚠️, la decisión ya tomada en `docs/research/observaciones-resueltas.md`.
 */

const U08_F01: Formula = {
  id: 'U08-F01',
  unidad: 8,
  nombre: 'Velocidad de transmisión (tasa binaria) a partir del tiempo de símbolo',
  expresion: 'R = (1 / T_s) · log₂(M)',
  entradas: [
    {
      simbolo: 'T_s',
      significado: 'Duración (tiempo) de un símbolo o baudio',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
    {
      simbolo: 'M',
      significado: 'Cantidad de símbolos o condiciones posibles de la modulación',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Velocidad de transmisión / tasa binaria',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'Vale para modulaciones digitales M-arias (ASK, FSK, PSK, 4PSK, QPSK, nQAM). ' +
    'M debe ser potencia de 2 para que log₂(M) sea entero. 1/T_s es la velocidad de modulación r en baudios.',
  paginas: '17, 21, 27, 30, 32, 37, 45',
  confianza: 'alta',
  calcular: ({ T_s, M }) => (1 / T_s) * Math.log2(M),
};

const U08_F02: Formula = {
  id: 'U08-F02',
  unidad: 8,
  nombre: 'Bits por símbolo y cantidad de niveles / símbolos M-arios',
  expresion: 'n = log₂ M',
  entradas: [
    {
      simbolo: 'M',
      significado: 'Cantidad de condiciones posibles de salida / niveles de cuantificación',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'n',
    significado: 'Cantidad de bits por símbolo (en PCM: bits por muestra)',
    unidadDeMedida: 'bit/símbolo',
    multiploCanonico: '',
  },
  condiciones:
    'Doble lectura en la unidad: (a) modulaciones M-arias, M = cantidad de símbolos posibles; ' +
    '(b) PCM, M = cantidad de niveles de cuantificación y n = bits de la palabra codificada. ' +
    'n debe ser entero, por lo tanto M potencia de 2. En PCM el bit más significativo se usa como bit de signo. ' +
    'Se implementa el despeje que la cátedra resuelve (n = log₂ M).',
  paginas: '28, 29, 63, 71, 72',
  confianza: 'alta',
  calcular: ({ M }) => Math.log2(M),
};

const U08_F03: Formula = {
  id: 'U08-F03',
  unidad: 8,
  nombre: 'Ancho de banda / velocidad de modulación M-aria',
  expresion: 'B_{M-ario} = R / log₂(M)',
  entradas: [
    {
      simbolo: 'R',
      significado: 'Velocidad de transmisión',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'M',
      significado: 'Cantidad de símbolos de la modulación',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'B_M_ario',
    significado: 'Ancho de banda del canal M-ario (equivale a la tasa de símbolos en baudios)',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'La diapositiva 30 escribe además R = (1/T_s)·log₂(M) = B_M-ario·log₂(M), o sea B_M-ario = 1/T_s. ' +
    'Requiere que M sea potencia de 2.',
  paginas: '30, 89',
  confianza: 'alta',
  calcular: ({ R, M }) => R / Math.log2(M),
};

const U08_F04: Formula = {
  id: 'U08-F04',
  unidad: 8,
  nombre: 'Velocidad de modulación (baudios) a partir del tiempo de símbolo',
  expresion: 'r = 1 / T_s',
  entradas: [
    {
      simbolo: 'T_s',
      significado: 'Duración de un símbolo',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
  ],
  salida: {
    simbolo: 'r',
    significado: 'Velocidad de modulación / tasa de símbolos',
    unidadDeMedida: 'Bd',
    multiploCanonico: 'k',
  },
  condiciones:
    'Es la velocidad en baudios, distinta de R (bps) salvo cuando M = 2. ' +
    'Sirve también como B_M-ario según la igualdad de la diapositiva 30.',
  paginas: '17, 21, 27, 30, 32, 37',
  confianza: 'media',
  calcular: ({ T_s }) => 1 / T_s,
};

const U08_F05: Formula = {
  id: 'U08-F05',
  unidad: 8,
  nombre: 'Ancho de banda de ASK',
  expresion: 'BW_{ASK} = 2 · B',
  entradas: [
    {
      simbolo: 'B',
      significado: 'Velocidad de modulación / ancho de banda de la señal moduladora en banda base',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'BW_ASK',
    significado: 'Ancho de banda ocupado por la señal ASK',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'Modulación binaria por conmutación de amplitud (dos amplitudes, frecuencia y fase constantes). ' +
    'Incluye el caso OOK.',
  paginas: '16, 22',
  confianza: 'media',
  calcular: ({ B }) => 2 * B,
};

const U08_F06: Formula = {
  id: 'U08-F06',
  unidad: 8,
  nombre: 'Ancho de banda de FSK',
  expresion: 'BW_{FSK} = 2 · (Δf + B)',
  entradas: [
    {
      simbolo: 'delta_f',
      significado: 'Desviación de frecuencia respecto de la portadora',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'B',
      significado: 'Velocidad de modulación / ancho de banda de la señal moduladora en banda base',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'BW_FSK',
    significado: 'Ancho de banda ocupado por la señal FSK',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'FSK binaria con desplazamientos de igual magnitud y sentido opuesto respecto de f_p. ' +
    'La diapositiva 23 agrega la cota práctica de al menos 4B (caso Δf ≥ B).',
  paginas: '20, 23',
  confianza: 'media',
  calcular: ({ delta_f, B }) => 2 * (delta_f + B),
};

const U08_F07: Formula = {
  id: 'U08-F07',
  unidad: 8,
  nombre: 'Ancho de banda de PSK',
  expresion: 'BW_{PSK} = 2 · B',
  entradas: [
    {
      simbolo: 'B',
      significado: 'Velocidad de modulación / ancho de banda de la señal moduladora en banda base',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'BW_PSK',
    significado: 'Ancho de banda ocupado por la señal PSK',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones: 'PSK binaria (2PSK/BPSK), fases 0 y π.',
  paginas: '26',
  confianza: 'media',
  calcular: ({ B }) => 2 * B,
};

const U08_F08a: Formula = {
  id: 'U08-F08a',
  unidad: 8,
  nombre: 'Frecuencia de marca en FSK',
  expresion: 'f_1 = f_p + Δf',
  entradas: [
    {
      simbolo: 'f_p',
      significado: 'Frecuencia de la señal portadora',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'delta_f',
      significado: 'Desviación de frecuencia',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'f_1',
    significado: 'Frecuencia asignada al «1» lógico (marca)',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'Supone desplazamientos simétricos respecto de la portadora. ' +
    'La diapositiva escribe f1 = f + Δf refiriéndose a la portadora f_p.',
  paginas: '19',
  confianza: 'alta',
  calcular: ({ f_p, delta_f }) => f_p + delta_f,
};

const U08_F08b: Formula = {
  id: 'U08-F08b',
  unidad: 8,
  nombre: 'Frecuencia de espacio en FSK',
  expresion: 'f_2 = f_p − Δf',
  entradas: [
    {
      simbolo: 'f_p',
      significado: 'Frecuencia de la señal portadora',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'delta_f',
      significado: 'Desviación de frecuencia',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'f_2',
    significado: 'Frecuencia asignada al «0» lógico (espacio)',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones: 'Supone desplazamientos simétricos respecto de la portadora.',
  paginas: '19',
  confianza: 'alta',
  calcular: ({ f_p, delta_f }) => f_p - delta_f,
};

const U08_F09: Formula = {
  id: 'U08-F09',
  unidad: 8,
  nombre: 'Señal portadora sinusoidal',
  expresion: 'v_p(t) = V_p · sen(2π · f_p · t)',
  entradas: [
    {
      simbolo: 'V_p',
      significado: 'Amplitud pico de la portadora',
      unidadDeMedida: 'V',
      multiploCanonico: '',
    },
    {
      simbolo: 'f_p',
      significado: 'Frecuencia de la portadora',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 't',
      significado: 'Instante de tiempo para evaluar la señal',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'v_p',
    significado: 'Valor instantáneo de la portadora en el instante t',
    unidadDeMedida: 'V',
    multiploCanonico: '',
  },
  condiciones:
    'Es una función del tiempo: se calcula su valor instantáneo en un t dado, que entra como Variable. ' +
    'Es la portadora analógica sin modular usada como base de ASK, FSK y PSK. ' +
    'El argumento de la función seno se calcula en radianes.',
  paginas: '14, 18, 24',
  confianza: 'alta',
  calcular: ({ V_p, f_p, t }) => V_p * Math.sin(2 * Math.PI * f_p * t),
};

const U08_F10: Formula = {
  id: 'U08-F10',
  unidad: 8,
  nombre: 'Cota del número de estados en QAM',
  expresion: 'M ≤ N°Fases × N°Amplitudes',
  entradas: [
    {
      simbolo: 'N_fases',
      significado: 'Cantidad de desplazamientos de fase distintos',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'N_amplitudes',
      significado: 'Cantidad de amplitudes distintas',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'M',
    significado: 'Cota superior del número de estados (símbolos) de la constelación QAM',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'Es una desigualdad (cota superior), no una igualdad: no todas las combinaciones fase-amplitud se usan. ' +
    'QAM combina ASK + PSK; la cátedra aclara que el número de desplazamientos de fase siempre es mayor que el de amplitudes. ' +
    'En la diapositiva 38 aparece marcada con (*). Se implementa la cota superior M_max = N°Fases × N°Amplitudes.',
  paginas: '36, 38',
  confianza: 'alta',
  calcular: ({ N_fases, N_amplitudes }) => N_fases * N_amplitudes,
};

const U08_F11: Formula = {
  id: 'U08-F11',
  unidad: 8,
  nombre: 'Relación entre número de estados M y SNR (nQAM adaptativo)',
  expresion: 'M = SNR + 1',
  entradas: [
    {
      simbolo: 'SNR',
      significado: 'Relación señal/ruido en veces (relación lineal de potencias, NO dB)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'M',
    significado: 'Cantidad de estados de la modulación (nQAM)',
    unidadDeMedida: 'adimensional',
    multiploCanonico: '',
  },
  condiciones:
    'El SNR de esta fórmula es lineal (veces), no en dB. ' +
    'Es el límite teórico tipo Shannon para nQAM adaptativo; no confundir con los requisitos prácticos ' +
    'de SNR en dB para BER < 10⁻⁷ de las tablas de las diapositivas 46 y 78.',
  paginas: '45, 46, 78, 79',
  confianza: 'alta',
  calcular: ({ SNR }) => SNR + 1,
};

const U08_F12: Formula = {
  id: 'U08-F12',
  unidad: 8,
  nombre: 'Teorema del muestreo (Nyquist): frecuencia de muestreo mínima',
  expresion: 'f_s ≥ 2 · f_MAX',
  entradas: [
    {
      simbolo: 'f_MAX',
      significado: 'Frecuencia máxima (ancho de banda) de la señal analógica limitada en banda',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'f_s',
    significado: 'Frecuencia de muestreo mínima (cota inferior de Nyquist)',
    unidadDeMedida: 'Hz',
    multiploCanonico: 'k',
  },
  condiciones:
    'Es una desigualdad: la salida es la frecuencia de muestreo mínima (cota inferior de Nyquist f_s = 2 · f_MAX). ' +
    'Requiere que la señal esté previamente filtrada pasa-bajos y limitada en banda a f_MAX.',
  paginas: '49, 51',
  confianza: 'alta',
  calcular: ({ f_MAX }) => 2 * f_MAX,
};

const U08_F13: Formula = {
  id: 'U08-F13',
  unidad: 8,
  nombre: 'Período de muestreo',
  expresion: 'T_muestreo = 1 / f_s',
  entradas: [
    {
      simbolo: 'f_s',
      significado: 'Frecuencia de muestreo',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'T_muestreo',
    significado: 'Período (intervalo) de muestreo',
    unidadDeMedida: 's',
    multiploCanonico: 'µ',
  },
  condiciones:
    'Usado en PCM y en la trama E1/T1 (en telefonía f_s = 8000 Hz → T_muestreo = 125 µs). ' +
    'La diapositiva escribe el símbolo como T_s; se declara T_muestreo para evitar confusión con la ' +
    'duración del símbolo de modulación. Se implementa la igualdad T_muestreo = 1/f_s corrigiendo ' +
    'la desigualdad invertida de la diapositiva 49.',
  paginas: '49, 100, 108',
  confianza: 'alta',
  calcular: ({ f_s }) => 1 / f_s,
};

const U08_F14: Formula = {
  id: 'U08-F14',
  unidad: 8,
  nombre: 'Velocidad del canal PCM (velocidad de la señal digitalizada)',
  expresion: 'C = f_s · n',
  entradas: [
    {
      simbolo: 'f_s',
      significado: 'Frecuencia de muestreo',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'n',
      significado: 'Bits por muestra (bits de la palabra de cuantificación)',
      unidadDeMedida: 'bit/muestra',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'C',
    significado: 'Velocidad del canal digitalizado',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'PCM con cuantificación uniforme de n bits. Es la base del canal E0/T0 de 64 kbps ' +
    '(8000 muestras/s × 8 bits/muestra = 64.000 bps = 64 kbps).',
  paginas: '72, 100, 108',
  confianza: 'alta',
  calcular: ({ f_s, n }) => f_s * n,
};

const U08_F15: Formula = {
  id: 'U08-F15',
  unidad: 8,
  nombre: 'Longitud de onda de una portadora óptica (WDM)',
  expresion: 'λ = c / f',
  entradas: [
    {
      simbolo: 'c',
      significado: 'Velocidad de propagación de la luz en el medio',
      unidadDeMedida: 'm/s',
      multiploCanonico: 'M',
    },
    {
      simbolo: 'f',
      significado: 'Frecuencia de la portadora óptica',
      unidadDeMedida: 'Hz',
      multiploCanonico: 'T',
    },
  ],
  salida: {
    simbolo: 'lambda',
    significado: 'Longitud de onda de la portadora óptica',
    unidadDeMedida: 'm',
    multiploCanonico: 'n',
  },
  condiciones:
    'Aplica a WDM/DWDM, donde cada señal viaja con una longitud de onda λ distinta en la fibra óptica.',
  paginas: '82',
  confianza: 'media',
  calcular: ({ c, f }) => c / f,
};

const U08_F16: Formula = {
  id: 'U08-F16',
  unidad: 8,
  nombre: 'Cantidad de bits de la trama de salida en TDM sincrónica',
  expresion: 'N_trama = k · b + s',
  entradas: [
    {
      simbolo: 'k',
      significado: 'Cantidad de canales (conexiones) multiplexados',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'b',
      significado: 'Bits por ranura de tiempo (unidad de entrada) de cada canal',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
    {
      simbolo: 's',
      significado: 'Bits de sobrecarga por trama (sincronismo + señalización); 0 si no hay',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'N_trama',
    significado: 'Cantidad de bits de la trama de salida',
    unidadDeMedida: 'bit',
    multiploCanonico: '',
  },
  condiciones:
    'TDM sincrónica: se asigna una ranura a cada canal aunque no tenga datos. ' +
    's representa los bits de sincronismo y señalización adicionales por trama.',
  paginas: '93, 94, 95, 97, 98, 99, 100',
  confianza: 'media',
  calcular: ({ k, b, s }) => k * b + s,
};

const U08_F17: Formula = {
  id: 'U08-F17',
  unidad: 8,
  nombre: 'Duración de la trama en TDM sincrónica',
  expresion: 'T_trama = b / R_canal',
  entradas: [
    {
      simbolo: 'b',
      significado: 'Bits por ranura de tiempo (unidad de entrada) de cada canal',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
    {
      simbolo: 'R_canal',
      significado: 'Tasa de datos de cada canal de entrada',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'T_trama',
    significado: 'Duración de la trama de salida (igual a la duración de la unidad de entrada de un canal)',
    unidadDeMedida: 's',
    multiploCanonico: 'm',
  },
  condiciones:
    'Todos los canales de entrada deben tener la misma tasa R_canal (TDM sincrónica con tasas iguales). ' +
    'Los bits de sincronismo/señalización no alargan la trama, solo aumentan la tasa del enlace multiplexado.',
  paginas: '93, 94, 95, 97, 98, 99, 100',
  confianza: 'media',
  calcular: ({ b, R_canal }) => b / R_canal,
};

const U08_F18: Formula = {
  id: 'U08-F18',
  unidad: 8,
  nombre: 'Tasa de transmisión del enlace en TDM sincrónica',
  expresion: 'R_enlace = N_trama / T_trama',
  entradas: [
    {
      simbolo: 'N_trama',
      significado: 'Cantidad de bits de la trama de salida',
      unidadDeMedida: 'bit',
      multiploCanonico: '',
    },
    {
      simbolo: 'T_trama',
      significado: 'Duración de la trama',
      unidadDeMedida: 's',
      multiploCanonico: 'm',
    },
  ],
  salida: {
    simbolo: 'R_enlace',
    significado: 'Tasa de transmisión (velocidad de bit) del enlace multiplexado',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'TDM sincrónica. Los bits de sincronismo y señalización sí se cuentan en N_trama. ' +
    'Se aplica tanto a tramas genéricas como a las jerarquías E1 (256 bits / 125 µs = 2,048 Mbps) ' +
    'y T1 (193 bits / 125 µs = 1,544 Mbps).',
  paginas: '93, 94, 95, 97, 98, 99, 100, 108',
  confianza: 'alta',
  calcular: ({ N_trama, T_trama }) => N_trama / T_trama,
};

const U08_F19: Formula = {
  id: 'U08-F19',
  unidad: 8,
  nombre: 'Duración de un time slot dentro de la trama PCM',
  expresion: 'T_TS = T_trama / N_TS',
  entradas: [
    {
      simbolo: 'T_trama',
      significado: 'Duración de la trama PCM (125 µs en E1 y T1)',
      unidadDeMedida: 's',
      multiploCanonico: 'µ',
    },
    {
      simbolo: 'N_TS',
      significado: 'Cantidad de time slots por trama',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'T_TS',
    significado: 'Duración de un intervalo de tiempo (time slot)',
    unidadDeMedida: 's',
    multiploCanonico: 'µ',
  },
  condiciones:
    'T_trama = 125 µs viene del muestreo f_s = 8 kHz. Para E1 (32 TS) el valor exacto es 125 µs / 32 = 3,90625 µs ' +
    '(la diapositiva redondea a 3,9 µs). Para T1 (24 TS) es 125 µs / 24 = 5,2083 µs (la diapositiva redondea a 5,2 µs).',
  paginas: '108',
  confianza: 'alta',
  calcular: ({ T_trama, N_TS }) => T_trama / N_TS,
};

const U08_F20: Formula = {
  id: 'U08-F20',
  unidad: 8,
  nombre: 'Velocidad de la trama E1 a partir de los canales E0',
  expresion: 'R = N_TS · R_E0',
  entradas: [
    {
      simbolo: 'N_TS',
      significado: 'Cantidad de time slots por trama (32 en E1)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'R_E0',
      significado: 'Velocidad del canal básico E0',
      unidadDeMedida: 'bit/s',
      multiploCanonico: 'k',
    },
  ],
  salida: {
    simbolo: 'R',
    significado: 'Velocidad de la trama multiplexada',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'k',
  },
  condiciones:
    'Aplica al sistema E1 (32 time slots: 30 de voz + 2 de servicio/señalización). ' +
    'No aplica directamente a T1 (24 TS + 1 bit = 193 bits/trama).',
  paginas: '107',
  confianza: 'alta',
  calcular: ({ N_TS, R_E0 }) => N_TS * R_E0,
};

const U08_F21: Formula = {
  id: 'U08-F21',
  unidad: 8,
  nombre: 'Velocidad de la trama SDH (STM-1)',
  expresion: 'R_STM = f_trama · (columnas · filas · 8)',
  entradas: [
    {
      simbolo: 'f_trama',
      significado: 'Cantidad de tramas por segundo (una cada 125 µs)',
      unidadDeMedida: '1/s',
      multiploCanonico: 'k',
    },
    {
      simbolo: 'columnas',
      significado: 'Columnas de la matriz de la trama (270 total, 261 carga útil)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
    {
      simbolo: 'filas',
      significado: 'Filas de la matriz de la trama (9 en STM-1)',
      unidadDeMedida: 'adimensional',
      multiploCanonico: '',
    },
  ],
  salida: {
    simbolo: 'R_STM',
    significado: 'Velocidad binaria de la trama SDH',
    unidadDeMedida: 'bit/s',
    multiploCanonico: 'M',
  },
  condiciones:
    'Aplica a STM-1 (8000 tramas/s × 270 columnas × 9 filas × 8 bits = 155,52 Mbps). ' +
    'Con 261 columnas (restando las 9 columnas de SOH) da la carga útil: 150,336 Mbps.',
  paginas: '115',
  confianza: 'alta',
  calcular: ({ f_trama, columnas, filas }) => f_trama * columnas * filas * 8,
};

export const FORMULAS_UNIDAD_08: readonly Formula[] = [
  U08_F01,
  U08_F02,
  U08_F03,
  U08_F04,
  U08_F05,
  U08_F06,
  U08_F07,
  U08_F08a,
  U08_F08b,
  U08_F09,
  U08_F10,
  U08_F11,
  U08_F12,
  U08_F13,
  U08_F14,
  U08_F15,
  U08_F16,
  U08_F17,
  U08_F18,
  U08_F19,
  U08_F20,
  U08_F21,
];

export const EJEMPLOS_UNIDAD_08: readonly EjemploResuelto[] = [
  {
    formulaId: 'U08-F01',
    enunciado:
      'ASK - Bit vs Baudio: modulación ASK con 2 amplitudes y tiempo de símbolo T_s = 200 µs (5 kBaudios).',
    entradas: {
      T_s: { valor: 200, multiplo: 'µ' },
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 5, multiplo: 'k' },
    pagina: '17',
  },
  {
    formulaId: 'U08-F01',
    enunciado:
      'FSK - Bit vs Baudio: modulación FSK con 2 frecuencias y tiempo de símbolo T_s = 200 µs (5 kBaudios).',
    entradas: {
      T_s: { valor: 200, multiplo: 'µ' },
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 5, multiplo: 'k' },
    pagina: '21',
  },
  {
    formulaId: 'U08-F01',
    enunciado:
      'PSK - Bit vs Baudio: modulación PSK con 2 fases y tiempo de símbolo T_s = 200 µs (5 kBaudios).',
    entradas: {
      T_s: { valor: 200, multiplo: 'µ' },
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 5, multiplo: 'k' },
    pagina: '27',
  },
  {
    formulaId: 'U08-F01',
    enunciado:
      '4PSK - Bit vs Baudio: modulación 4PSK con 4 fases y tiempo de símbolo T_s = 200 µs (5 kBaudios).',
    entradas: {
      T_s: { valor: 200, multiplo: 'µ' },
      M: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 10, multiplo: 'k' },
    pagina: '32',
  },
  {
    formulaId: 'U08-F01',
    enunciado:
      '8QAM - Bit vs Baudio: modulación 8QAM con M = 8 estados y tiempo de símbolo T_s = 125 µs (8 kBaudios).',
    entradas: {
      T_s: { valor: 125, multiplo: 'µ' },
      M: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 24, multiplo: 'k' },
    pagina: '37',
  },
  {
    formulaId: 'U08-F02',
    enunciado:
      'Sistema FSK binario: dos valores posibles (un «1» o un «0» lógico), calcular bits por símbolo.',
    entradas: {
      M: { valor: 2, multiplo: '' },
    },
    esperado: { valor: 1, multiplo: '' },
    pagina: '29',
  },
  {
    formulaId: 'U08-F02',
    enunciado:
      '4PSK: entrada binaria para producir 4 fases posibles. Calcular bits por símbolo.',
    entradas: {
      M: { valor: 4, multiplo: '' },
    },
    esperado: { valor: 2, multiplo: '' },
    pagina: '31',
  },
  {
    formulaId: 'U08-F03',
    enunciado:
      'Ejemplo 4 (FDM + nQAM): canal digital con R = 1 Mbps y modulación 16-QAM (M = 16).',
    entradas: {
      R: { valor: 1, multiplo: 'M' },
      M: { valor: 16, multiplo: '' },
    },
    esperado: { valor: 250, multiplo: 'k' },
    pagina: '89',
  },
  {
    formulaId: 'U08-F04',
    enunciado: 'Velocidad de modulación con tiempo de símbolo T_s = 200 µs.',
    entradas: {
      T_s: { valor: 200, multiplo: 'µ' },
    },
    esperado: { valor: 5, multiplo: 'k' },
    pagina: '17',
  },
  {
    formulaId: 'U08-F04',
    enunciado: 'Velocidad de modulación con tiempo de símbolo T_s = 125 µs.',
    entradas: {
      T_s: { valor: 125, multiplo: 'µ' },
    },
    esperado: { valor: 8, multiplo: 'k' },
    pagina: '37',
  },
  {
    formulaId: 'U08-F12',
    enunciado: 'Frecuencia de muestreo mínima de Nyquist para señal de voz limitada a 4000 Hz.',
    entradas: {
      f_MAX: { valor: 4, multiplo: 'k' },
    },
    esperado: { valor: 8, multiplo: 'k' },
    pagina: '49',
  },
  {
    formulaId: 'U08-F13',
    enunciado: 'Período de muestreo para señal digitalizada en telefonía con f_s = 8000 Hz.',
    entradas: {
      f_s: { valor: 8, multiplo: 'k' },
    },
    esperado: { valor: 125, multiplo: 'µ' },
    pagina: '100',
  },
  {
    formulaId: 'U08-F13',
    enunciado: 'Período de muestreo común para tramas E1 y T1 con f_s = 8000 Hz.',
    entradas: {
      f_s: { valor: 8000, multiplo: '' },
    },
    esperado: { valor: 125, multiplo: 'µ' },
    pagina: '108',
  },
  {
    formulaId: 'U08-F14',
    enunciado:
      'Ejemplo 1 (PCM, telefonía): f_s = 8000 Hz y cuantificación de n = 8 bits/muestra.',
    entradas: {
      f_s: { valor: 8000, multiplo: '' },
      n: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 64, multiplo: 'k' },
    pagina: '72',
  },
  {
    formulaId: 'U08-F14',
    enunciado:
      'Ejemplo 2 (PCM, audio CD): muestreo a f_s = 44.100 Hz y cuantificación de n = 16 bits/muestra.',
    entradas: {
      f_s: { valor: 44.1, multiplo: 'k' },
      n: { valor: 16, multiplo: '' },
    },
    esperado: { valor: 705.6, multiplo: 'k' },
    pagina: '72',
  },
  {
    formulaId: 'U08-F14',
    enunciado:
      'Características comunes E1 y T1: voz limitada a 4000 Hz, f_s = 8000 Hz y n = 8 bits/muestra.',
    entradas: {
      f_s: { valor: 8, multiplo: 'k' },
      n: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 64, multiplo: 'k' },
    pagina: '108',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 5 (TDM Sincrónica al bit): k = 4 conexiones, b = 1 bit por ranura, sin sobrecarga (s = 0).',
    entradas: {
      k: { valor: 4, multiplo: '' },
      b: { valor: 1, multiplo: '' },
      s: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 4, multiplo: '' },
    pagina: '93',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 6 (TDM Sincrónica al carácter): k = 4 canales, b = 8 bits por ranura, sin sobrecarga (s = 0).',
    entradas: {
      k: { valor: 4, multiplo: '' },
      b: { valor: 8, multiplo: '' },
      s: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 32, multiplo: '' },
    pagina: '94',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 7 (TDM Sincrónica al carácter): k = 4 canales, b = 2 bits por ranura, sin sobrecarga (s = 0).',
    entradas: {
      k: { valor: 4, multiplo: '' },
      b: { valor: 2, multiplo: '' },
      s: { valor: 0, multiplo: '' },
    },
    esperado: { valor: 8, multiplo: '' },
    pagina: '95',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 8 (TDM Sincrónica al bit, con sincronismo): k = 4 conexiones, b = 1 bit, s = 1 bit de sincronismo.',
    entradas: {
      k: { valor: 4, multiplo: '' },
      b: { valor: 1, multiplo: '' },
      s: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 5, multiplo: '' },
    pagina: '97',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 9 (TDM Sincrónica al carácter, con sincronismo): k = 4 canales, b = 8 bits, s = 8 bits de sincronismo.',
    entradas: {
      k: { valor: 4, multiplo: '' },
      b: { valor: 8, multiplo: '' },
      s: { valor: 8, multiplo: '' },
    },
    esperado: { valor: 40, multiplo: '' },
    pagina: '98',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 10 (TDM Sincrónica al carácter, con sincronismo): k = 4 canales, b = 2 bits, s = 1 bit de sincronismo.',
    entradas: {
      k: { valor: 4, multiplo: '' },
      b: { valor: 2, multiplo: '' },
      s: { valor: 1, multiplo: '' },
    },
    esperado: { valor: 9, multiplo: '' },
    pagina: '99',
  },
  {
    formulaId: 'U08-F16',
    enunciado:
      'Ejemplo 11 (Trama E1): k = 30 canales de voz, b = 8 bits, s = 16 bits (8 sincronismo + 8 señalización).',
    entradas: {
      k: { valor: 30, multiplo: '' },
      b: { valor: 8, multiplo: '' },
      s: { valor: 16, multiplo: '' },
    },
    esperado: { valor: 256, multiplo: '' },
    pagina: '100',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 5 (TDM Sincrónica al bit): b = 1 bit por ranura, R_canal = 1 kbps.',
    entradas: {
      b: { valor: 1, multiplo: '' },
      R_canal: { valor: 1, multiplo: 'k' },
    },
    esperado: { valor: 1, multiplo: 'm' },
    pagina: '93',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 6 (TDM Sincrónica al carácter): b = 8 bits por ranura, R_canal = 100 bps.',
    entradas: {
      b: { valor: 8, multiplo: '' },
      R_canal: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 80, multiplo: 'm' },
    pagina: '94',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 7 (TDM Sincrónica al carácter): b = 2 bits por ranura, R_canal = 100 kbps.',
    entradas: {
      b: { valor: 2, multiplo: '' },
      R_canal: { valor: 100, multiplo: 'k' },
    },
    esperado: { valor: 20, multiplo: 'µ' },
    pagina: '95',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 8 (TDM Sincrónica al bit, con sincronismo): b = 1 bit por ranura, R_canal = 1 kbps.',
    entradas: {
      b: { valor: 1, multiplo: '' },
      R_canal: { valor: 1, multiplo: 'k' },
    },
    esperado: { valor: 1, multiplo: 'm' },
    pagina: '97',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 9 (TDM Sincrónica al carácter, con sincronismo): b = 8 bits por ranura, R_canal = 100 bps.',
    entradas: {
      b: { valor: 8, multiplo: '' },
      R_canal: { valor: 100, multiplo: '' },
    },
    esperado: { valor: 80, multiplo: 'm' },
    pagina: '98',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 10 (TDM Sincrónica al carácter, con sincronismo): b = 2 bits por ranura, R_canal = 100 kbps.',
    entradas: {
      b: { valor: 2, multiplo: '' },
      R_canal: { valor: 100, multiplo: 'k' },
    },
    esperado: { valor: 20, multiplo: 'µ' },
    pagina: '99',
  },
  {
    formulaId: 'U08-F17',
    enunciado:
      'Ejemplo 11 (Trama E1): b = 8 bits por ranura, R_canal = 64 kbps (canal E0).',
    entradas: {
      b: { valor: 8, multiplo: '' },
      R_canal: { valor: 64, multiplo: 'k' },
    },
    esperado: { valor: 125, multiplo: 'µ' },
    pagina: '100',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 5 (TDM Sincrónica al bit): N_trama = 4 bits, T_trama = 1 ms.',
    entradas: {
      N_trama: { valor: 4, multiplo: '' },
      T_trama: { valor: 1, multiplo: 'm' },
    },
    esperado: { valor: 4, multiplo: 'k' },
    pagina: '93',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 6 (TDM Sincrónica al carácter): N_trama = 32 bits, T_trama = 80 ms.',
    entradas: {
      N_trama: { valor: 32, multiplo: '' },
      T_trama: { valor: 80, multiplo: 'm' },
    },
    esperado: { valor: 400, multiplo: '' },
    pagina: '94',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 7 (TDM Sincrónica al carácter): N_trama = 8 bits, T_trama = 20 µs.',
    entradas: {
      N_trama: { valor: 8, multiplo: '' },
      T_trama: { valor: 20, multiplo: 'µ' },
    },
    esperado: { valor: 400, multiplo: 'k' },
    pagina: '95',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 8 (TDM Sincrónica al bit, con sincronismo): N_trama = 5 bits, T_trama = 1 ms.',
    entradas: {
      N_trama: { valor: 5, multiplo: '' },
      T_trama: { valor: 1, multiplo: 'm' },
    },
    esperado: { valor: 5, multiplo: 'k' },
    pagina: '97',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 9 (TDM Sincrónica al carácter, con sincronismo): N_trama = 40 bits, T_trama = 80 ms.',
    entradas: {
      N_trama: { valor: 40, multiplo: '' },
      T_trama: { valor: 80, multiplo: 'm' },
    },
    esperado: { valor: 500, multiplo: '' },
    pagina: '98',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 10 (TDM Sincrónica al carácter, con sincronismo): N_trama = 9 bits, T_trama = 20 µs.',
    entradas: {
      N_trama: { valor: 9, multiplo: '' },
      T_trama: { valor: 20, multiplo: 'µ' },
    },
    esperado: { valor: 450, multiplo: 'k' },
    pagina: '99',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Ejemplo 11 (Trama E1): N_trama = 256 bits, T_trama = 125 µs.',
    entradas: {
      N_trama: { valor: 256, multiplo: '' },
      T_trama: { valor: 125, multiplo: 'µ' },
    },
    esperado: { valor: 2.048, multiplo: 'M' },
    pagina: '100',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Comparación E1 vs T1: enlace E1 con N_trama = 256 bits y T_trama = 125 µs.',
    entradas: {
      N_trama: { valor: 256, multiplo: '' },
      T_trama: { valor: 125, multiplo: 'µ' },
    },
    esperado: { valor: 2.048, multiplo: 'M' },
    pagina: '108',
  },
  {
    formulaId: 'U08-F18',
    enunciado:
      'Comparación E1 vs T1: enlace T1 con N_trama = 193 bits y T_trama = 125 µs.',
    entradas: {
      N_trama: { valor: 193, multiplo: '' },
      T_trama: { valor: 125, multiplo: 'µ' },
    },
    esperado: { valor: 1.544, multiplo: 'M' },
    pagina: '108',
  },
  {
    formulaId: 'U08-F19',
    enunciado:
      'Duración de time slot en E1: T_trama = 125 µs dividido en N_TS = 32 slots.',
    entradas: {
      T_trama: { valor: 125, multiplo: 'µ' },
      N_TS: { valor: 32, multiplo: '' },
    },
    esperado: { valor: 3.9, multiplo: 'µ' },
    pagina: '108',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U08-F19',
    enunciado:
      'Duración de time slot en T1: T_trama = 125 µs dividido en N_TS = 24 slots.',
    entradas: {
      T_trama: { valor: 125, multiplo: 'µ' },
      N_TS: { valor: 24, multiplo: '' },
    },
    esperado: { valor: 5.2, multiplo: 'µ' },
    pagina: '108',
    tolerancia: 0.01,
  },
  {
    formulaId: 'U08-F20',
    enunciado:
      'Jerarquía PDH sistema E: señal E1 con N_TS = 32 time slots y R_E0 = 64 kbps.',
    entradas: {
      N_TS: { valor: 32, multiplo: '' },
      R_E0: { valor: 64, multiplo: 'k' },
    },
    esperado: { valor: 2048, multiplo: 'k' },
    pagina: '107',
  },
  {
    formulaId: 'U08-F21',
    enunciado:
      'Módulo STM-1 (Total): f_trama = 8000 tramas/s, 270 columnas y 9 filas.',
    entradas: {
      f_trama: { valor: 8, multiplo: 'k' },
      columnas: { valor: 270, multiplo: '' },
      filas: { valor: 9, multiplo: '' },
    },
    esperado: { valor: 155.52, multiplo: 'M' },
    pagina: '115',
  },
  {
    formulaId: 'U08-F21',
    enunciado:
      'Módulo STM-1 (Carga útil): f_trama = 8000 tramas/s, 261 columnas de datos y 9 filas.',
    entradas: {
      f_trama: { valor: 8000, multiplo: '' },
      columnas: { valor: 261, multiplo: '' },
      filas: { valor: 9, multiplo: '' },
    },
    esperado: { valor: 150.336, multiplo: 'M' },
    pagina: '115',
  },
];

/**
 * Fórmulas de esta Unidad que todavía **no** están cargadas.
 *
 * Todas las Fórmulas de la Unidad 8 están cargadas, por lo que la deuda queda vacía.
 */
export const PENDIENTES_UNIDAD_08: readonly string[] = [];
