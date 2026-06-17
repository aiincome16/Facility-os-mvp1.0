import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showDailyControl() {
  openModal({
    title: "Tagessteuerung",
    content: `
      <div class="info-card blue">
        <div class="card-title">
          Heute
        </div>

        Objekt:
        ${appState.currentObject?.Name || "-"}
        <br><br>

        Arbeitszeit:
        ${appState.currentShift?.Startzeit || "--:--"}
        -
        ${appState.currentShift?.Endzeit || "--:--"}
      </div>

      <button id="btnDailyMessages" class="btn red">
        Mitteilungen
      </button>

      <button id="btnDailyRequests" class="btn orange">
        Kundenwünsche
      </button>

      <button id="btnDailyMaterial" class="btn green">
        Material
      </button>

      <button id="btnDailyTickets" class="btn yellow">
        Offene Punkte
      </button>

      <button id="btnDailyCheckout" class="btn blue">
        Arbeitsende
      </button>
    `
  });

  bindDailyControlEvents();
}

export function bindDailyControlEvents() {
  document
    .getElementById("btnDailyMessages")
    ?.addEventListener("click", () => {
      console.log("Mitteilungen");
    });

  document
    .getElementById("btnDailyRequests")
    ?.addEventListener("click", () => {
      console.log("Kundenwünsche");
    });

  document
    .getElementById("btnDailyMaterial")
    ?.addEventListener("click", () => {
      console.log("Material");
    });

  document
    .getElementById("btnDailyTickets")
    ?.addEventListener("click", () => {
      console.log("Offene Punkte");
    });

  document
    .getElementById("btnDailyCheckout")
    ?.addEventListener("click", () => {
      console.log("Arbeitsende");
    });
}
