import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showMaterialReports() {
  const reports = appState.materialOrders || [];

  openModal({
    title: "Material",
    content: reports.length
      ? reports.map(formatMaterialCard).join("")
      : `<div class="info-card">Keine Materialmeldungen vorhanden.</div>`
  });
}

function formatMaterialCard(report) {
  return `
    <div class="info-card green">
      <div class="card-title">
        ${report.Material || "Material"}
      </div>

      Menge: ${report.Menge || "-"} ${report.Einheit || ""}<br>
      Status: ${report.Status || "-"}
    </div>
  `;
}

export function showMaterialPhotoDialog() {
  openModal({
    title: "Material melden",
    content: `
      <div class="info-card">
        Material per Foto oder manuell melden.
      </div>

      <button id="btnPhotoMaterial" class="btn green">
        Foto aufnehmen
      </button>

      <button id="btnManualMaterial" class="btn blue">
        Manuell eingeben
      </button>
    `
  });

  document
    .getElementById("btnPhotoMaterial")
    ?.addEventListener("click", () => {
      showToast("Foto-Funktion folgt", "INFO");
    });

  document
    .getElementById("btnManualMaterial")
    ?.addEventListener("click", createManualMaterialReport);
}

export function showMaterialSuggestions() {
  const suggestions = appState.materialSuggestions || [];

  openModal({
    title: "KI-Vorschläge",
    content: suggestions.length
      ? suggestions.map((suggestion) => `
          <div class="info-card orange">
            <div class="card-title">${suggestion.material || "Material"}</div>
            Vorschlag: ${suggestion.quantity || "-"} ${suggestion.unit || ""}
          </div>
        `).join("")
      : `<div class="info-card">Keine Vorschläge vorhanden.</div>`
  });
}

export function createManualMaterialReport() {
  openModal({
    title: "Material manuell melden",
    content: `
      <label>Material</label>
      <input id="materialName" placeholder="z. B. SR11, Müllbeutel, Papier">

      <label>Menge</label>
      <input id="materialAmount" placeholder="z. B. 5">

      <label>Einheit</label>
      <input id="materialUnit" placeholder="z. B. Liter, Stück, Rollen">

      <label>Notiz</label>
      <textarea id="materialNote" placeholder="Hinweis"></textarea>
    `,
    actions: [
      {
        label: "Speichern",
        className: "btn green",
        onClick: saveManualMaterialReport
      }
    ]
  });
}

function saveManualMaterialReport() {
  const material = document.getElementById("materialName")?.value.trim();
  const amount = document.getElementById("materialAmount")?.value.trim();
  const unit = document.getElementById("materialUnit")?.value.trim();
  const note = document.getElementById("materialNote")?.value.trim();

  if (!material) {
    showToast("Material fehlt", "ERROR");
    return;
  }

  appState.materialOrders.push({
    Order_ID: `MAT-${Date.now()}`,
    Material: material,
    Menge: amount,
    Einheit: unit,
    Notiz: note,
    Status: "OFFEN"
  });

  showToast("Materialmeldung gespeichert", "SUCCESS");
  showMaterialReports();
}

export function bindMaterialEvents() {

  const materialButton =
    document.getElementById("btnMaterial");

  if (materialButton) {
    materialButton.addEventListener(
      "click",
      showMaterialPhotoDialog
    );
  }

  const ordersButton =
    document.getElementById("btnOrders");

  if (ordersButton) {
    ordersButton.addEventListener(
      "click",
      showMaterialReports
    );
  }

}
export function bindMaterialEvents() {

  const btnMaterial =
    document.getElementById("btnMaterial");

  if (btnMaterial) {
    btnMaterial.addEventListener(
      "click",
      showMaterialPhotoDialog
    );
  }

  const btnOrders =
    document.getElementById("btnOrders");

  if (btnOrders) {
    btnOrders.addEventListener(
      "click",
      showMaterialReports
    );
  }

}
