import { appState } from "./appState.js";
import { openModal, closeModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showReplacementRequests() {
  const requests =
    appState.replacementSuggestions || [];

  openModal({
    title: "Vertretungen",
    content: requests.length
      ? requests.map(formatReplacementCard).join("")
      : `
        <div class="info-card">
          Keine Vertretungsanfragen vorhanden.
        </div>
      `
  });

  requests.forEach((request) => {
    document
      .getElementById(`replacement-${request.Substitution_ID}`)
      ?.addEventListener("click", () => {
        showReplacementDetails(request);
      });
  });
}

function formatReplacementCard(request) {
  return `
    <button
      id="replacement-${request.Substitution_ID}"
      class="info-card orange"
    >
      <div class="card-title">
        ${request.Objekt_Name || "Objekt"}
      </div>

      Datum: ${request.Datum || "-"}<br>
      Zeit: ${request.Startzeit || "-"} – ${request.Endzeit || "-"}<br>
      Status: ${request.Status || "OFFEN"}
    </button>
  `;
}

export function showReplacementDetails(request) {
  openModal({
    title: "Vertretungsanfrage",
    content: `
      <div class="info-card blue">
        <div class="card-title">Objekt</div>
        ${request.Objekt_Name || "-"}
      </div>

      <div class="info-card">
        <div class="card-title">Zeit</div>
        ${request.Datum || "-"}<br>
        ${request.Startzeit || "-"} – ${request.Endzeit || "-"}
      </div>

      <div class="info-card yellow">
        <div class="card-title">Status</div>
        ${request.Status || "OFFEN"}
      </div>

      <div class="info-card">
        <div class="card-title">Grund</div>
        ${request.Grund || "-"}
      </div>
    `,
    actions: [
      {
        label: "Annehmen",
        className: "btn green",
        onClick: () => acceptReplacement(request)
      },
      {
        label: "Ablehnen",
        className: "btn danger",
        onClick: () => declineReplacement(request)
      }
    ]
  });
}

function acceptReplacement(request) {
  request.Status = "ANGENOMMEN";
  request.Vertretung_ID =
    appState.currentUser?.User_ID || "";

  closeModal();
  showToast("Vertretung angenommen", "SUCCESS");
  showReplacementRequests();
}

function declineReplacement(request) {
  request.Status = "ABGELEHNT";
  request.Abgelehnt_am = new Date().toISOString();

  closeModal();
  showToast("Vertretung abgelehnt", "WARNING");
  showReplacementRequests();
}

export function showReplacementCandidates() {
  const candidates =
    appState.cachedUsers || [];

  openModal({
    title: "Vertretungsvorschläge",
    content: candidates.length
      ? candidates.map(formatCandidateCard).join("")
      : `
        <div class="info-card">
          Keine Kandidaten vorhanden.
        </div>
      `
  });
}

function formatCandidateCard(candidate) {
  return `
    <div class="info-card orange">
      <div class="card-title">
        ${candidate.Vorname || ""} ${candidate.Nachname || ""}
      </div>

      Score: ${candidate.Score || "-"}<br>
      Wohnort: ${candidate.Wohnort || "-"}<br>
      Auto: ${candidate.Auto || "-"}<br>
      Objektkenntnis: ${candidate.Objektkenntnis || "-"}
    </div>
  `;
}

export function bindReplacementEvents() {
  document
    .getElementById("btnReplacement")
    ?.addEventListener("click", showReplacementRequests);
}