// Vista de /statechart para ReceptorHamming.tla: (b) el receptor de Hamming hasta «Corregir».
type V = { paso: number; corregido: boolean; largo: number; cambiados: number[] };

const p = (v: V) => (v.largo < 4 ? 2 : v.largo < 8 ? 3 : 4);
const final = (v: V) => v.paso === p(v) + 1;
/** El síndrome: el XOR de las posiciones que llegaron cambiadas. */
const posicion = (v: V) => v.cambiados.reduce((a, b) => a ^ b, 0);

export const title = "Hamming, receptor: de la palabra recibida a «Corregir el bit»";

export const state = (v: V) => {
  if (v.paso === 0) return "Palabra recibida";
  if (!final(v)) return "Revisando los grupos de paridad";
  const pos = posicion(v);
  if (pos === 0) return "Síndrome 0: «sin error»";
  if (pos > v.largo) return "El síndrome señala una posición que no existe: no se puede corregir";
  const sano = !v.cambiados.includes(pos);
  if (!v.corregido) {
    return sano
      ? "Señala un bit que llegó bien y ofrece «Corregir el bit»"
      : "Señala el bit que llegó cambiado y ofrece «Corregir el bit»";
  }
  return sano
    ? "«Palabra corregida» con tres bits distintos de lo emitido"
    : "Palabra corregida: igual a la emitida";
};

export const group = (v: V) => (v.paso === 0 ? "entrada" : final(v) ? "resultado" : "revision");
export const colors = { entrada: "blue", revision: "yellow", resultado: "teal" };

const llegaron = (v: V) =>
  v.cambiados.length === 0
    ? "no llegó ningún bit cambiado"
    : v.cambiados.length === 1
      ? "llegó un bit cambiado"
      : "llegaron dos bits cambiados";

export const step = (action: string, from: V, to: V) => {
  if (action.startsWith("UnBitLlegaCambiado")) return "cambiás un bit de la palabra";
  if (action === "Corregir") return "tocás «Corregir el bit»";
  if (to.paso === 0 && final(from)) return "tocás «Volver a la entrada»";
  if (to.paso < from.paso) return "tocás «Anterior»";
  if (final(to)) {
    const pos = posicion(to);
    const fuera = pos > to.largo ? ", y el síndrome se sale de la palabra" : "";
    return `tocás «Siguiente» [era el último grupo; ${llegaron(to)}${fuera}]`;
  }
  return "tocás «Siguiente»";
};
