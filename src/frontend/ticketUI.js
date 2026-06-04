import { appState } from "./appState.js";
import { openModal, closeModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showTickets() {
  const tickets = appState.tickets || [];

  openModal({
    title: "Tickets",
    content: tickets.length
      ? tickets.map(formatTicketCard).join("")
      : `
        <div class="info-card">
          Keine Tickets vorhanden.
        </div>
      `,
    actions: [
      {
        label: "Neues Ticket",
        className: "btn yellow",
        onClick: showCreateTicketForm
      }
    ]
  });

  tickets.forEach((ticket) => {
    document
      .getElementById(`ticket-${ticket.Ticket_ID}`)
      ?.addEventListener("click", () => {
        showTicketDetails(ticket);
      });
  });
}

function formatTicketCard(ticket) {
  return `
    <button
      id="ticket-${ticket.Ticket_ID}"
      class="info-card yellow"
    >
      <div class="card-title">
        ${ticket.Titel || "Ticket"}
      </div>

      Typ: ${ticket.Typ || "-"}<br>
      Priorität: ${ticket.Prioritaet || "NORMAL"}<br>
      Status: ${ticket.Status || "OFFEN"}
    </button>
  `;
}

export function showTicketDetails(ticket) {
  openModal({
    title: ticket.Titel || "Ticket",
    content: `
      <div class="info-card blue">
        <div class="card-title">Beschreibung</div>
        ${ticket.Beschreibung || "-"}
      </div>

      <div class="info-card yellow">
        <div class="card-title">Status</div>
        ${ticket.Status || "OFFEN"}
      </div>

      <div class="info-card">
        <div class="card-title">Foto</div>
        ${ticket.Foto || "Kein Foto"}
      </div>

      <div class="info-card">
        <div class="card-title">Audio</div>
        ${ticket.Audio || "Keine Audiodatei"}
      </div>
    `,
    actions: [
      {
        label: "Als erledigt markieren",
        className: "btn green",
        onClick: () => completeTicket(ticket)
      }
    ]
  });
}

export function showCreateTicketForm() {
  openModal({
    title: "Neues Ticket",
    content: `
      <label>Titel</label>
      <input id="ticketTitle" placeholder="z. B. Schaden, Wunsch, Problem">

      <label>Typ</label>
      <select id="ticketType">
        <option value="MANGEL">Mangel</option>
        <option value="SCHADEN">Schaden</option>
        <option value="KUNDENWUNSCH">Kundenwunsch</option>
        <option value="ZUSATZAUFGABE">Zusatzaufgabe</option>
        <option value="HINWEIS">Hinweis</option>
      </select>

      <label>Priorität</label>
      <select id="ticketPriority">
        <option value="NORMAL">Normal</option>
        <option value="HOCH">Hoch</option>
        <option value="NIEDRIG">Niedrig</option>
      </select>

      <label>Beschreibung</label>
      <textarea id="ticketDescription" placeholder="Was ist passiert oder was muss gemacht werden?"></textarea>

      <label>Foto</label>
      <input id="ticketPhoto" type="file" accept="image/*">

      <label>Audio</label>
      <input id="ticketAudio" type="file" accept="audio/*">

      <label>Abrechnungsrelevant?</label>
      <select id="ticketBillable">
        <option value="NEIN">Nein</option>
        <option value="JA">Ja</option>
      </select>
    `,
    actions: [
      {
        label: "Ticket speichern",
        className: "btn yellow",
        onClick: createTicketFromForm
      }
    ]
  });
}

function createTicketFromForm() {
  const title = document.getElementById("ticketTitle")?.value.trim();
  const type = document.getElementById("ticketType")?.value;
  const priority = document.getElementById("ticketPriority")?.value;
  const description = document.getElementById("ticketDescription")?.value.trim();
  const billable = document.getElementById("ticketBillable")?.value;
  const photo = document.getElementById("ticketPhoto")?.files[0]?.name || "";
  const audio = document.getElementById("ticketAudio")?.files[0]?.name || "";

  if (!title) {
    showToast("Titel fehlt", "ERROR");
    return;
  }

  const ticket = {
    Ticket_ID: `TICKET-${Date.now()}`,
    Objekt_ID: appState.currentObject?.Objekt_ID || "",
    Erstellt_von: appState.currentUser?.User_ID || "",
    Typ: type,
    Prioritaet: priority,
    Titel: title,
    Beschreibung: description,
    Foto: photo,
    Audio: audio,
    Abrechnungsrelevant: billable,
    Status: "OFFEN",
    Erstellt_am: new Date().toISOString()
  };

  appState.tickets.push(ticket);

  closeModal();
  showToast("Ticket gespeichert", "SUCCESS");
  showTickets();
}

function completeTicket(ticket) {
  ticket.Status = "ERLEDIGT";
  ticket.Erledigt_am = new Date().toISOString();

  closeModal();
  showToast("Ticket erledigt", "SUCCESS");
  showTickets();
}

export function bindTicketEvents() {
  document
    .getElementById("btnTickets")
    ?.addEventListener("click", showTickets);

  document
    .getElementById("btnComplaints")
    ?.addEventListener("click", showTickets);

  document
    .getElementById("btnNotes")
    ?.addEventListener("click", showCreateTicketForm);
}