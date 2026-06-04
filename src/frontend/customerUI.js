import { appState } from "./appState.js";
import { openModal, closeModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showCustomerDashboard() {
  openModal({
    title: "Kundenbereich",
    content: `
      <div class="info-card purple">
        <div class="card-title">Objektstatus</div>
        Letzte Reinigung: ${appState.currentObject?.Letzte_Reinigung || "-"}<br>
        Nächste Reinigung: ${appState.currentObject?.Naechste_Reinigung || "-"}<br>
        Offene Wünsche: ${appState.customerRequests?.length || 0}
      </div>

      <div class="button-stack">
        <button id="customerRequestsBtn" class="btn purple">Wünsche</button>
        <button id="customerComplaintBtn" class="btn purple">Beschwerde</button>
        <button id="customerServiceBtn" class="btn purple">Zusatzleistung</button>
        <button id="customerReportsBtn" class="btn purple">Monatsberichte</button>
      </div>
    `
  });

  document.getElementById("customerRequestsBtn")?.addEventListener("click", showCustomerRequests);
  document.getElementById("customerComplaintBtn")?.addEventListener("click", showCustomerComplaintForm);
  document.getElementById("customerServiceBtn")?.addEventListener("click", showAdditionalServiceForm);
  document.getElementById("customerReportsBtn")?.addEventListener("click", showCustomerReports);
}

export function showCustomerRequests() {
  const requests = appState.customerRequests || [];

  openModal({
    title: "Kundenwünsche",
    content: requests.length
      ? requests.map(formatCustomerRequest).join("")
      : `<div class="info-card">Keine Kundenwünsche vorhanden.</div>`,
    actions: [
      {
        label: "Neuen Wunsch erstellen",
        className: "btn purple",
        onClick: showCustomerRequestForm
      }
    ]
  });
}

function formatCustomerRequest(request) {
  return `
    <div class="info-card purple">
      <div class="card-title">${request.Titel || "Kundenwunsch"}</div>
      Typ: ${request.Typ || "WUNSCH"}<br>
      Status: ${request.Status || "OFFEN"}<br>
      Fotopflicht: ${request.Fotopflicht || "NEIN"}<br>
      Abrechnung: ${request.Abrechnungsrelevant || "NEIN"}<br><br>
      ${request.Beschreibung || ""}
    </div>
  `;
}

export function showCustomerRequestForm() {
  openModal({
    title: "Kundenwunsch erstellen",
    content: `
      <label>Titel</label>
      <input id="customerRequestTitle" placeholder="z. B. Fensterbank zusätzlich reinigen">

      <label>Beschreibung</label>
      <textarea id="customerRequestDescription" placeholder="Was soll zusätzlich gemacht werden?"></textarea>

      <label>Fotopflicht</label>
      <select id="customerRequestPhoto">
        <option value="NEIN">Nein</option>
        <option value="JA">Ja</option>
      </select>

      <label>Abrechnungsrelevant</label>
      <select id="customerRequestBillable">
        <option value="NEIN">Nein</option>
        <option value="JA">Ja</option>
      </select>
    `,
    actions: [
      {
        label: "Wunsch speichern",
        className: "btn purple",
        onClick: createCustomerRequestFromForm
      }
    ]
  });
}

function createCustomerRequestFromForm() {
  const title = document.getElementById("customerRequestTitle")?.value.trim();
  const description = document.getElementById("customerRequestDescription")?.value.trim();
  const photoRequired = document.getElementById("customerRequestPhoto")?.value;
  const billable = document.getElementById("customerRequestBillable")?.value;

  if (!title) {
    showToast("Titel fehlt", "ERROR");
    return;
  }

  appState.customerRequests.push({
    Request_ID: `REQ-${Date.now()}`,
    Objekt_ID: appState.currentObject?.Objekt_ID || "",
    Typ: "WUNSCH",
    Titel: title,
    Beschreibung: description,
    Fotopflicht: photoRequired,
    Abrechnungsrelevant: billable,
    Status: "OFFEN",
    Erstellt_am: new Date().toISOString()
  });

  closeModal();
  showToast("Kundenwunsch gespeichert", "SUCCESS");
  showCustomerRequests();
}

export function showCustomerComplaintForm() {
  openModal({
    title: "Beschwerde erstellen",
    content: `
      <label>Titel</label>
      <input id="customerComplaintTitle" placeholder="z. B. WC nicht sauber">

      <label>Beschreibung</label>
      <textarea id="customerComplaintDescription" placeholder="Was ist aufgefallen?"></textarea>

      <label>Fotopflicht</label>
      <select id="customerComplaintPhoto">
        <option value="JA">Ja</option>
        <option value="NEIN">Nein</option>
      </select>
    `,
    actions: [
      {
        label: "Beschwerde speichern",
        className: "btn purple",
        onClick: createCustomerComplaintFromForm
      }
    ]
  });
}

function createCustomerComplaintFromForm() {
  const title = document.getElementById("customerComplaintTitle")?.value.trim();
  const description = document.getElementById("customerComplaintDescription")?.value.trim();
  const photoRequired = document.getElementById("customerComplaintPhoto")?.value;

  if (!title) {
    showToast("Titel fehlt", "ERROR");
    return;
  }

  appState.complaints.push({
    Complaint_ID: `COMP-${Date.now()}`,
    Objekt_ID: appState.currentObject?.Objekt_ID || "",
    Titel: title,
    Beschreibung: description,
    Fotopflicht: photoRequired,
    Status: "OFFEN",
    Erstellt_am: new Date().toISOString()
  });

  closeModal();
  showToast("Beschwerde gespeichert", "SUCCESS");
}

export function showAdditionalServiceForm() {
  openModal({
    title: "Zusatzleistung",
    content: `
      <label>Leistung</label>
      <input id="additionalServiceTitle" placeholder="z. B. Wandfliesen komplett reinigen">

      <label>Beschreibung</label>
      <textarea id="additionalServiceDescription"></textarea>

      <label>Preis offen?</label>
      <select id="additionalServicePrice">
        <option value="PREIS_OFFEN">Preis offen</option>
        <option value="ANGEBOT_ERFORDERLICH">Angebot erforderlich</option>
      </select>
    `,
    actions: [
      {
        label: "Zusatzleistung speichern",
        className: "btn purple",
        onClick: createAdditionalServiceFromForm
      }
    ]
  });
}

function createAdditionalServiceFromForm() {
  const title = document.getElementById("additionalServiceTitle")?.value.trim();
  const description = document.getElementById("additionalServiceDescription")?.value.trim();
  const priceStatus = document.getElementById("additionalServicePrice")?.value;

  if (!title) {
    showToast("Leistung fehlt", "ERROR");
    return;
  }

  appState.customerRequests.push({
    Request_ID: `SERV-${Date.now()}`,
    Objekt_ID: appState.currentObject?.Objekt_ID || "",
    Typ: "ZUSATZLEISTUNG",
    Titel: title,
    Beschreibung: description,
    Fotopflicht: "NEIN",
    Abrechnungsrelevant: "JA",
    Status: priceStatus,
    Erstellt_am: new Date().toISOString()
  });

  closeModal();
  showToast("Zusatzleistung gespeichert", "SUCCESS");
}

export function showCustomerReports() {
  openModal({
    title: "Monatsberichte",
    content: `
      <div class="info-card purple">
        <div class="card-title">Monatsbericht</div>
        Reinigungshistorie, Zusatzleistungen, Beschwerden und Fotodokumentation werden hier angezeigt.
      </div>
    `
  });
}

export function bindCustomerEvents() {
  document
    .getElementById("btnCustomer")
    ?.addEventListener("click", showCustomerDashboard);
}