import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showAccountingDashboard() {
  openModal({
    title: "Buchhaltung",
    content: `
      <div class="info-card blue">
        <div class="card-title">Übersicht</div>

        Offene Stundennachweise:
        ${(appState.cachedShifts || []).length}<br>

        Materialmeldungen:
        ${(appState.materialOrders || []).length}<br>

        Abrechnungsrelevante Tickets:
        ${getBillableTickets().length}<br>

        Krankmeldungen:
        ${(appState.sickReports || []).length}<br>

        Urlaubsanträge:
        ${(appState.vacationRequests || []).length}
      </div>

      <div class="button-stack">

        <button id="accountingTimesheetsBtn" class="btn blue">
          Stundennachweise
        </button>

        <button id="accountingMaterialsBtn" class="btn green">
          Materialkosten
        </button>

        <button id="accountingTicketsBtn" class="btn yellow">
          Abrechnungs-Tickets
        </button>

        <button id="accountingSickBtn" class="btn orange">
          Krankmeldungen
        </button>

        <button id="accountingVacationBtn" class="btn orange">
          Urlaubsanträge
        </button>

        <button id="accountingExportBtn" class="btn purple">
          Export
        </button>

      </div>
    `
  });

  bindAccountingEvents();
}

function getBillableTickets() {
  return (appState.tickets || []).filter(
    (ticket) =>
      String(ticket.Abrechnungsrelevant || "")
        .toUpperCase() === "JA"
  );
}

export function showTimesheets() {
  const shifts = appState.cachedShifts || [];

  openModal({
    title: "Stundennachweise",
    content: shifts.length
      ? shifts.map(formatShiftCard).join("")
      : `
        <div class="info-card">
          Keine Stundennachweise vorhanden.
        </div>
      `
  });
}

function formatShiftCard(shift) {
  return `
    <div class="info-card blue">

      <div class="card-title">
        ${shift.Name || shift.Mitarbeiter || "Mitarbeiter"}
      </div>

      Datum:
      ${shift.Datum || "-"}<br>

      Beginn:
      ${shift.Startzeit || "--:--"}<br>

      Ende:
      ${shift.Endzeit || "--:--"}<br>

      Stunden:
      ${shift.Stunden || "-"}

    </div>
  `;
}

export function showMaterialCosts() {
  const materials = appState.materialOrders || [];

  openModal({
    title: "Materialkosten",
    content: materials.length
      ? materials.map(formatMaterialCard).join("")
      : `
        <div class="info-card">
          Keine Materialmeldungen vorhanden.
        </div>
      `
  });
}

function formatMaterialCard(item) {
  return `
    <div class="info-card green">

      <div class="card-title">
        ${item.Material || "-"}
      </div>

      Menge:
      ${item.Menge || "-"} ${item.Einheit || ""}<br>

      Status:
      ${item.Status || "-"}

    </div>
  `;
}

export function showBillableTickets() {
  const tickets = getBillableTickets();

  openModal({
    title: "Abrechnungsrelevante Tickets",
    content: tickets.length
      ? tickets.map(formatTicketCard).join("")
      : `
        <div class="info-card">
          Keine abrechnungsrelevanten Tickets vorhanden.
        </div>
      `
  });
}

function formatTicketCard(ticket) {
  return `
    <div class="info-card yellow">

      <div class="card-title">
        ${ticket.Titel || "Ticket"}
      </div>

      Priorität:
      ${ticket.Prioritaet || "-"}<br>

      Status:
      ${ticket.Status || "-"}

    </div>
  `;
}

export function showAccountingExport() {

  showToast(
    "Exportfunktion wird später mit Google Sheets verbunden.",
    "INFO"
  );

}

function bindAccountingEvents() {

  document
    .getElementById("accountingTimesheetsBtn")
    ?.addEventListener(
      "click",
      showTimesheets
    );

  document
    .getElementById("accountingMaterialsBtn")
    ?.addEventListener(
      "click",
      showMaterialCosts
    );

  document
    .getElementById("accountingTicketsBtn")
    ?.addEventListener(
      "click",
      showBillableTickets
    );

  document
    .getElementById("accountingSickBtn")
    ?.addEventListener(
      "click",
      () => {
        showToast(
          "Krankmeldungen werden mit managerUi verbunden.",
          "INFO"
        );
      }
    );

  document
    .getElementById("accountingVacationBtn")
    ?.addEventListener(
      "click",
      () => {
        showToast(
          "Urlaubsanträge werden mit managerUi verbunden.",
          "INFO"
        );
      }
    );

  document
    .getElementById("accountingExportBtn")
    ?.addEventListener(
      "click",
      showAccountingExport
    );

}