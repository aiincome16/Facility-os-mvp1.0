import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";
import { nowISO } from "../utils/dateUtils.js";

export function createTicket({
  objectId,
  userId,
  title,
  description = "",
  type = "MANGEL",
  priority = "NORMAL",
  photo = "",
  audio = "",
  billable = false
}) {
  if (!objectId || !userId || !title) {
    return {
      success: false,
      message: "Pflichtangaben fehlen"
    };
  }

  return googleSheets.insertRow(
    "10_Tickets",
    {
      Ticket_ID: createId("TICKET"),
      Objekt_ID: objectId,
      Erstellt_von: userId,
      Typ: type,
      Prioritaet: priority,
      Titel: title,
      Beschreibung: description,
      Foto: photo,
      Audio: audio,
      Abrechnungsrelevant: billable ? "JA" : "NEIN",
      Status: "OFFEN",
      Erstellt_am: nowISO()
    }
  );
}

export function getTicketsByObject(objectId) {
  return googleSheets.findAllByField(
    "10_Tickets",
    "Objekt_ID",
    objectId
  );
}

export function getTicketsByUser(userId) {
  return googleSheets.findAllByField(
    "10_Tickets",
    "Erstellt_von",
    userId
  );
}

export function getOpenTickets(objectId = "") {
  const tickets = objectId
    ? getTicketsByObject(objectId)
    : googleSheets.getSheet("10_Tickets");

  return tickets.filter(
    (ticket) =>
      ticket.Status !== "ERLEDIGT" &&
      ticket.Status !== "ABGELEHNT"
  );
}

export function updateTicketStatus({
  ticketId,
  status,
  userId = "",
  note = ""
}) {
  if (!ticketId || !status) {
    return {
      success: false,
      message: "Ticket-ID oder Status fehlt"
    };
  }

  return googleSheets.updateByField(
    "10_Tickets",
    "Ticket_ID",
    ticketId,
    {
      Status: status,
      Bearbeitet_von: userId,
      Bearbeitet_am: nowISO(),
      Bearbeitungsnotiz: note
    }
  );
}

export function completeTicket({
  ticketId,
  userId,
  note = "",
  photo = ""
}) {
  const ticket = googleSheets.findByField(
    "10_Tickets",
    "Ticket_ID",
    ticketId
  );

  if (!ticket) {
    return {
      success: false,
      message: "Ticket nicht gefunden"
    };
  }

  googleSheets.updateByField(
    "10_Tickets",
    "Ticket_ID",
    ticketId,
    {
      Status: "ERLEDIGT",
      Erledigt_von: userId,
      Erledigt_am: nowISO(),
      Erledigt_Notiz: note,
      Erledigt_Foto: photo
    }
  );

  if (ticket.Abrechnungsrelevant === "JA") {
    createBillingItemFromTicket(ticket);
  }

  return {
    success: true,
    message: "Ticket erledigt"
  };
}

export function createBillingItemFromTicket(ticket) {
  return googleSheets.insertRow(
    "45_AdditionalBilling",
    {
      Billing_ID: createId("BILL"),
      Objekt_ID: ticket.Objekt_ID,
      Quelle: "TICKET",
      Quelle_ID: ticket.Ticket_ID,
      Beschreibung: ticket.Titel,
      Monat: nowISO().slice(0, 7),
      Preis: "",
      Status: "PREIS_OFFEN",
      Abgerechnet: "NEIN",
      Erstellt_am: nowISO()
    }
  );
}
