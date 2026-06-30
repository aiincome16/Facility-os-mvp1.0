import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showReplacementRequests() {
  const replacements = appState.replacementSuggestions || [];

  openModal({
    title: "Vertretungen",
    content: replacements.length
      ? replacements.map(createReplacementCard).join("")
      : `
        <div class="info-card">
          Aktuell liegen keine Vertretungsanfragen vor.
        </div>
      `
  });

  bindReplacementEvents();
}

function createReplacementCard(item) {
  const id = item.ID || item.Request_ID || Date.now();

  return `
    <div class="info-card orange">
      <div class="card-title">
        ${item.Name || "Mitarbeiter"}
      </div>

      Zeitraum:
      ${item.Von || "-"} bis ${item.Bis || "-"}<br>

      Objekt:
      ${item.Objekt || "-"}<br>

      Grund:
      ${item.Grund || "-"}<br><br>

      <button
        id="acceptReplacement-${id}"
        class="btn green">
        Übernehmen
      </button>
    </div>
  `;
}

function bindReplacementEvents() {
  const replacements = appState.replacementSuggestions || [];

  replacements.forEach(item => {

    const id = item.ID || item.Request_ID;

    document
      .getElementById(`acceptReplacement-${id}`)
      ?.addEventListener("click", () => {

        item.Status = "Übernommen";

        showToast(
          "Vertretung übernommen",
          "SUCCESS"
        );

        showReplacementRequests();

      });

  });
}