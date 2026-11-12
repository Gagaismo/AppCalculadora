// Vista de /statechart para ReceptorVrcLrc.tla: (b) el receptor de la tabla VRC/LRC hasta «Corregir».
type Bit = { 1: string; 2: number; 3: number };
type V = { paso: number; corregida: boolean; cambiados: Bit[] };

const final = (v: V) => v.paso === 3;
const hay = (v: V, clase: string, f: number, c: number) =>
  v.cambiados.some((b) => b[1] === clase && b[2] === f && b[3] === c);
/** Las filas y columnas que fallan: una cantidad impar de bits cambiados, contando su control. */
function fallan(v: V) {
  const filas = new Map<number, number>();
  const columnas = new Map<number, number>();
  for (const b of v.cambiados) {
    if (b[1] === "dato" || b[1] === "lrc") filas.set(b[2], (filas.get(b[2]) ?? 0) + 1);
    if (b[1] === "dato" || b[1] === "vrc") columnas.set(b[3], (columnas.get(b[3]) ?? 0) + 1);
  }
  const impares = (m: Map<number, number>) => [...m].filter(([, n]) => n % 2 === 1).map(([i]) => i);
  return { filas: impares(filas), columnas: impares(columnas) };
}

export const title = "VRC/LRC, receptor de la tabla: de lo recibido a «Corregir el bit»";

function resultado(v: V) {
  const { filas, columnas } = fallan(v);
  if (filas.length + columnas.length === 0) {
    return v.cambiados.length === 0
      ? "«Sin error detectado»: llegó como se emitió"
      : "«Sin error detectado», y la esquina llegó cambiada";
  }
  if (filas.length !== 1 || columnas.length !== 1) return "«Error detectado, sin cruce único»";
  const sano = !hay(v, "dato", filas[0], columnas[0]);
  if (!v.corregida) {
    return sano
      ? "Señala un dato que llegó bien y ofrece «Corregir el bit»"
      : "Señala el dato que llegó cambiado y ofrece «Corregir el bit»";
  }
  return sano ? "«Corregido»: se invirtió un dato que había llegado bien" : "Corregido: el dato quedó como se emitió";
}

export const state = (v: V) =>
  v.paso === 0 ? "Tabla recibida" : final(v) ? resultado(v) : "Recalculando VRC por columna y LRC por fila";

export const group = (v: V) => (v.paso === 0 ? "entrada" : final(v) ? "resultado" : "revision");
export const colors = { entrada: "blue", revision: "yellow", resultado: "teal" };

const porque: Record<string, string> = {
  "«Sin error detectado»: llegó como se emitió": "no llegó ningún bit cambiado",
  "«Sin error detectado», y la esquina llegó cambiada": "sólo llegó cambiada la esquina",
  "«Error detectado, sin cruce único»": "no falla exactamente una fila y una columna",
  "Señala un dato que llegó bien y ofrece «Corregir el bit»": "llegaron cambiados un VRC y un LRC",
  "Señala el dato que llegó cambiado y ofrece «Corregir el bit»": "fallan la fila y la columna del dato cambiado",
};

export const step = (action: string, from: V, to: V) => {
  if (action.startsWith("UnBitLlegaCambiado")) return "tocás un bit de la tabla";
  if (action === "Corregir") return "tocás «Corregir el bit»";
  if (to.paso === 0 && final(from)) return "tocás «Volver a la entrada»";
  if (to.paso < from.paso) return "tocás «Anterior»";
  if (final(to)) return `tocás «Siguiente» [${porque[resultado(to)]}]`;
  return "tocás «Siguiente»";
};
