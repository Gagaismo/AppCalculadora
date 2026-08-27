/**
 * Normaliza un texto para búsquedas insensibles a mayúsculas y acentos:
 * 1. Pasa a minúsculas.
 * 2. Descompone caracteres con tildes/diacríticos (NFD) y elimina las marcas de combinación.
 * 3. Elimina espacios en blanco sobrantes al inicio y al final.
 *
 * Ejemplos:
 * - 'Señal' -> 'senal'
 * - 'ANCHO' -> 'ancho'
 * - 'Fórmula de Nyquist' -> 'formula de nyquist'
 */
export function normalizarTexto(texto?: string | null): string {
  if (!texto) {
    return '';
  }

  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}
