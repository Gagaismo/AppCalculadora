// Vista de /statechart para FlujoGrafica.tla: (a) Fórmula → Ver gráfica → deslizadores → volver.
type V = { pantalla: string; campos: string; cola: Record<string, string>; orientacion: string };

const pendiente = (v: V) => v.cola[1];

export const title = "De la Fórmula a su gráfica y de vuelta";

export const state = (v: V) => ({
  Pantalla:
    v.pantalla === "lista"
      ? "Lista de Fórmulas"
      : v.pantalla === "formula"
        ? "Fórmula"
        : v.campos === "vacios"
          ? "Gráfica sin valores: «sin cargar»"
          : "Gráfica con deslizadores",
  Campos:
    v.campos === "vacios"
      ? "Vacíos"
      : v.campos === "escritos"
        ? "Con lo que se escribió"
        : "Con lo que dejó el deslizador",
  Orientación:
    pendiente(v) === "horizontal"
      ? "Girando a horizontal"
      : pendiente(v) === "vertical"
        ? "Girando a vertical"
        : v.orientacion === "vertical"
          ? "Vertical"
          : "Horizontal",
});

export const step = (action: string) =>
  ({
    AbrirLaFormula: "tocás una Fórmula",
    Escribir: "escribís un valor",
    LimpiarCampos: "tocás «Limpiar campos»",
    VerGrafica: "tocás «Ver gráfica»",
    MoverUnDeslizador: "movés un deslizador",
    SalirDeLaGrafica: "tocás «←»",
    VolverALaLista: "volvés atrás",
    ElTelefonoGira: "el teléfono termina de girar",
  })[action] ?? action;
