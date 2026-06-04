import { googleSheets } from "./services/googleSheets.js";

export function getCustomerObjects(customerId) {
  if (!customerId) {
    return [];
  }

  return googleSheets.findAllByField(
    "14_CustomerAccess",
    "Kunde_ID",
    customerId
  );
}

export function createCustomerRequest({
  customerId,
  objectId,
  type,
  title,
  description,
  photoRequired = false,
  billable = false
}) {
  if (!customerId || !objectId || !title) {
    return {
      success: false,
      message: "Pflichtangaben fehlen"
    };
  }

  return googleSheets.insertRow(
    "42_CustomerRequests",
    {
      Request_ID: `REQ-${Date.now()}`,
      Kunde_ID: customerId,
      Objekt_ID: objectId,
      Typ: type || "WUNSCH",
      Titel: title,
      Beschreibung: description || "",
      Fotopflicht: photoRequired ? "JA" : "NEIN",
      Abrechnungsrelevant: billable ? "JA" : "NEIN",
      Status: "OFFEN",
      Erstellt_am: new Date().toISOString()
    }
  );
}

export function createCustomerComplaint({
  customerId,
  objectId,
  title,
  description,
  photoRequired = true
}) {
  if (!customerId || !objectId || !title) {
    return {
      success: false,
      message: "Pflichtangaben fehlen"
    };
  }

  return googleSheets.insertRow(
    "43_CustomerComplaints",
    {
      Complaint_ID: `COMP-${Date.now()}`,
      Kunde_ID: customerId,
      Objekt_ID: objectId,
      Titel: title,
      Beschreibung: description || "",
      Fotopflicht: photoRequired ? "JA" : "NEIN",
      Status: "OFFEN",
      Erstellt_am: new Date().toISOString()
    }
  );
}

export function getOpenCustomerRequests(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets
    .findAllByField(
      "42_CustomerRequests",
      "Objekt_ID",
      objectId
    )
    .filter(
      (request) =>
        request.Status !== "ERLEDIGT" &&
        request.Status !== "ABGELEHNT"
    );
}

export function getOpenCustomerComplaints(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets
    .findAllByField(
      "43_CustomerComplaints",
      "Objekt_ID",
      objectId
    )
    .filter(
      (complaint) =>
        complaint.Status !== "ERLEDIGT" &&
        complaint.Status !== "ABGELEHNT"
    );
}

export function completeCustomerRequest({
  requestId,
  userId,
  photoName = "",
  note = ""
}) {
  const request = googleSheets.findByField(
    "42_CustomerRequests",
    "Request_ID",
    requestId
  );

  if (!request) {
    return {
      success: false,
      message: "Kundenwunsch nicht gefunden"
    };
  }

  if (
    request.Fotopflicht === "JA" &&
    !photoName
  ) {
    return {
      success: false,
      message: "Foto ist für diese Aufgabe erforderlich"
    };
  }

  googleSheets.updateByField(
    "42_CustomerRequests",
    "Request_ID",
    requestId,
    {
      Status: "ERLEDIGT",
      Erledigt_von: userId,
      Erledigt_am: new Date().toISOString(),
      Foto: photoName,
      Notiz: note
    }
  );

  if (request.Abrechnungsrelevant === "JA") {
    createBillingItemFromRequest(request);
  }

  return {
    success: true,
    message: "Kundenwunsch erledigt"
  };
}

export function createBillingItemFromRequest(request) {
  return googleSheets.insertRow(
    "45_AdditionalBilling",
    {
      Billing_ID: `BILL-${Date.now()}`,
      Objekt_ID: request.Objekt_ID,
      Quelle: "KUNDENWUNSCH",
      Quelle_ID: request.Request_ID,
      Beschreibung: request.Titel,
      Monat: new Date().toISOString().slice(0, 7),
      Preis: "",
      Status: "PREIS_OFFEN",
      Abgerechnet: "NEIN"
    }
  );
}