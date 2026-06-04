import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showAnalytics() {
  openModal({
    title: "Analysen",
    content: `
      ${formatTimeAnalysis()}
      ${formatEmployeeScores()}
      ${formatMaterialAnalysis()}
      ${formatWarningSummary()}
    `
  });
}

function formatTimeAnalysis() {
  const analytics = appState.analytics || [];

  if (!analytics.length) {
    return `
      <div class="info-card">
        <div class="card-title">Arbeitszeiten</div>
        Keine Zeitdaten vorhanden.
      </div>
    `;
  }

  return analytics.map(item => `
    <div class="info-card orange">
      <div class="card-title">
        ${item.Objekt_Name || item.Objekt_ID || "Objekt"}
      </div>

      Sollzeit: ${item.Sollzeit_Gesamt || "-"} Minuten<br>
      Istzeit: ${item.Istzeit_Gesamt || "-"} Minuten<br>
      Abweichung: <b>${item.Abweichung || "0"} Minuten</b>
    </div>
  `).join("");
}

function formatEmployeeScores() {
  const users = appState.cachedUsers || [];

  if (!users.length) {
    return `
      <div class="info-card">
        <div class="card-title">Mitarbeiter-Scoring</div>
        Keine Mitarbeiterdaten vorhanden.
      </div>
    `;
  }

  return users.map(user => `
    <div class="info-card ${getScoreClass(user.Score)}">
      <div class="card-title">
        ${user.Vorname || ""} ${user.Nachname || ""}
      </div>

      Rolle: ${user.Rolle || "-"}<br>
      Score: <b>${user.Score || "-"}</b><br>
      Wohnort: ${user.Wohnort || "-"}<br>
      Objektkenntnis: ${user.Objektkenntnis || "-"}
    </div>
  `).join("");
}

function getScoreClass(score) {
  const value = Number(score || 0);

  if (value >= 85) {
    return "green";
  }

  if (value >= 60) {
    return "yellow";
  }

  return "red";
}

function formatMaterialAnalysis() {
  const materialOrders = appState.materialOrders || [];

  return `
    <div class="info-card blue">
      <div class="card-title">Material</div>
      Offene Meldungen: ${materialOrders.length}
    </div>
  `;
}

function formatWarningSummary() {
  const warnings = appState.aiWarnings || [];

  return `
    <div class="info-card orange">
      <div class="card-title">KI-Warnungen</div>
      Offene Warnungen: ${warnings.length}
    </div>
  `;
}

export function showWorkingTimeAnalysis() {
  openModal({
    title: "Arbeitszeiten",
    content: formatTimeAnalysis()
  });
}

export function showUserScores() {
  openModal({
    title: "Mitarbeiter-Scoring",
    content: formatEmployeeScores()
  });
}

export function bindAnalyticsEvents() {
  document
    .getElementById("btnAnalytics")
    ?.addEventListener("click", showAnalytics);
}