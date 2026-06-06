import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showReplacementRequests } from "./replacementUi.js";
import { showMaterialReports } from "./materialUi.js";
import { showTickets } from "./ticketUi.js";

export function showManagerDashboard() {
  openModal({
    title: "Objektleiter Dashboard",
    content: `
      <div class="info-card orange">
        <div class="card-title">Übersicht</div>
        Offene Vertretungen: ${appState.replacementSuggestions?.length || 0}<br>
        Materialmeldungen: ${appState.materialOrders?.length || 0}<br>
        Tickets: ${appState.tickets?.length || 0}<br>
        KI-Warnungen: ${appState.aiWarnings?.length || 0}
      </div>

      <div class="button-stack">
        <button id="managerReplacementBtn" class="btn orange">
          Vertretungen öffnen
        </button>

        <button id="managerMaterialBtn" class="btn orange">
          Material öffnen
        </button>

        <button id="managerTicketsBtn" class="btn orange">
          Tickets öffnen
        </button>

        <button id="managerWarningsBtn" class="btn orange">
          KI-Warnungen öffnen
        </button>
      </div>
    `
  });

  document
    .getElementById("managerReplacementBtn")
    ?.addEventListener("click", showReplacementRequests);

  document
    .getElementById("managerMaterialBtn")
    ?.addEventListener("click", showMaterialReports);

  document
    .getElementById("managerTicketsBtn")
    ?.addEventListener("click", showTickets);

  document
    .getElementById("managerWarningsBtn")
    ?.addEventListener("click", showManagerWarnings);
}

export function showManagerWarnings() {
  const warnings = appState.aiWarnings || [];

  openModal({
    title: "KI-Warnungen",
    content: warnings.length
      ? warnings.map(formatWarningCard).join("")
      : `
        <div class="info-card">
          Keine KI-Warnungen vorhanden.
        </div>
      `
  });
}

function formatWarningCard(warning) {
  return `
    <div class="info-card orange">
      <div class="card-title">
        ${warning.Titel || "Warnung"}
      </div>

      Typ: ${warning.Typ || "-"}<br>
      Schweregrad: ${warning.Schweregrad || "-"}<br><br>

      ${warning.Beschreibung || ""}<br><br>

      Vorschlag:<br>
      <b>${warning.Vorschlag || "-"}</b>
    </div>
  `;
}

export function showSickReports() {
  const reports = appState.sickReports || [];

  openModal({
    title: "Krankmeldungen",
    content: reports.length
      ? reports.map(report => `
        <div class="info-card orange">
          <div class="card-title">${report.Name || "Mitarbeiter"}</div>
          Von: ${report.Von || "-"}<br>
          Bis: ${report.Bis || "-"}<br>
          Status: ${report.Status || "-"}<br>
          Vertretung: ${report.Vertretung || "OFFEN"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Krankmeldungen vorhanden.</div>`
  });
}

export function showVacationRequests() {
  const requests = appState.vacationRequests || [];

  openModal({
    title: "Urlaubsanträge",
    content: requests.length
      ? requests.map(request => `
        <div class="info-card orange">
          <div class="card-title">${request.Name || "Mitarbeiter"}</div>
          Von: ${request.Von || "-"}<br>
          Bis: ${request.Bis || "-"}<br>
          Status: ${request.Status || "-"}<br>
          Vertretung: ${request.Vertretung || "OFFEN"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Urlaubsanträge vorhanden.</div>`
  });
}

export function bindManagerEvents() {
  document
    .getElementById("btnWarnings")
    ?.addEventListener("click", showManagerWarnings);

  document
    .getElementById("btnAnalytics")
    ?.addEventListener("click", showManagerDashboard);

  document
    .getElementById("btnOrders")
    ?.addEventListener("click", showMaterialReports);
}