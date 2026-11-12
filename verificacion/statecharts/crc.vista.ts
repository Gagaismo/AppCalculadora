// Vista de /statechart para Crc.tla: (c) CRC, emisor y receptor.
type V = { modo: string; paso: number; aviso: boolean; xorEmisor: number; xorRecep: number; restoCero: boolean };

const INVALIDA = 99;
const xor = (v: V) => (v.modo === "emisor" ? v.xorEmisor : v.xorRecep);
const total = (v: V) => (xor(v) === INVALIDA ? 0 : xor(v)) + 2;

export const title = "CRC paso a paso: emisor y receptor";

export const state = (v: V) => {
  const modo = v.modo === "emisor" ? "Emisor" : "Receptor";
  if (v.paso === 0) return [modo, v.aviso ? "Entrada, con el aviso de entrada inválida" : "Entrada"];
  if (v.paso < total(v) - 1) return [modo, "División: un XOR por paso"];
  if (v.modo === "emisor") return [modo, "Resultado: R(x) y la trama T(x)"];
  return [modo, v.restoCero ? "Resultado: resto 0, sin error" : "Resultado: resto distinto de 0, hay error"];
};

export const group = (v: V) =>
  v.paso === 0 ? "entrada" : v.paso < total(v) - 1 ? "division" : "resultado";
export const colors = { entrada: "blue", division: "yellow", resultado: "teal" };

export const step = (action: string, from: V, to: V) => {
  if (action === "CambiarDeModo") return to.modo === "emisor" ? "elegís «Emisor»" : "elegís «Verificar en el receptor»";
  if (action === "EditarLaEntrada") return "cambiás los bits";
  if (to.aviso && !from.aviso) return "tocás «Siguiente» [entrada inválida]";
  if (to.paso === 0 && from.paso > 0 && from.paso === total(from) - 1) return "tocás «Volver a la entrada»";
  if (to.paso > from.paso) {
    const ultimo = to.paso === total(to) - 1;
    const resto = to.modo === "emisor" ? "" : to.restoCero ? "; el resto da 0" : "; el resto no da 0";
    if (from.paso === 0) {
      return ultimo
        ? `tocás «Siguiente» [entrada válida; la división no tiene ningún XOR${resto}]`
        : "tocás «Siguiente» [entrada válida]";
    }
    return ultimo ? `tocás «Siguiente» [era el último XOR${resto}]` : "tocás «Siguiente»";
  }
  return "tocás «Anterior»";
};
