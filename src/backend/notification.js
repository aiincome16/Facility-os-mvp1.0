import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";

export function createNotification({
  userId,
  type = "INFO",
  title,
  message = "",
  priority = "NORMAL",
  relatedObjectId = "",
  relatedId = ""
}) {
  if (!userId || !title) {
    return {
      success: false,
      message: "Empfänger oder Titel fehlt"
    };
  }

  return googleSheets.insertRow(
    "46_Mailbox",
    {
      Message_ID: createId("MSG"),
      Empfaenger_ID: userId,
      Typ: type,
      Titel: title,
      Nachricht: message,
      Prioritaet: priority,
      Objekt_ID: relatedObjectId,
      Referenz_ID: relatedId,
      Gelesen: "NEIN",
      Status: "OFFEN",
      Erstellt_am: new Date().toISOString()
    }
  );
}

export function getUserNotifications(userId) {
  return googleSheets.findAllByField(
    "46_Mailbox",
    "Empfaenger_ID",
    userId
  );
}

export function getUnreadNotifications(userId) {
  return getUserNotifications(userId).filter(
    (message) => message.Gelesen !== "JA"
  );
}

export function markNotificationRead(messageId) {
  return googleSheets.updateByField(
    "46_Mailbox",
    "Message_ID",
    messageId,
    {
      Gelesen: "JA",
      Gelesen_am: new Date().toISOString()
    }
  );
}

export function notifyReplacementRequest({
  userId,
  objectId,
  objectName,
  date,
  time,
  replacementId
}) {
  return createNotification({
    userId,
    type: "VERTRETUNG",
    priority: "HOCH",
    relatedObjectId: objectId,
    relatedId: replacementId,
    title: "Neue Vertretungsanfrage",
    message: `Du wurdest für ${objectName} am ${date} um ${time} als Vertretung angefragt.`
  });
}

export function notifyReplacementAccepted({
  managerId,
  employeeName,
  objectId,
  objectName,
  replacementId
}) {
  return createNotification({
    userId: managerId,
    type: "VERTRETUNG",
    priority: "HOCH",
    relatedObjectId: objectId,
    relatedId: replacementId,
    title: "Vertretung wartet auf Freigabe",
    message: `${employeeName} hat die Vertretung für ${objectName} angenommen.`
  });
}

export function notifyVacationStatus({
  userId,
  from,
  to,
  status
}) {
  return createNotification({
    userId,
    type: "URLAUB",
    priority: "NORMAL",
    title: `Urlaub ${status}`,
    message: `Dein Urlaub vom ${from} bis ${to} wurde auf ${status} gesetzt.`
  });
}

export function notifySickReportReceived({
  userId,
  from,
  to
}) {
  return createNotification({
    userId,
    type: "KRANKMELDUNG",
    priority: "NORMAL",
    title: "Krankmeldung erfasst",
    message: `Deine Krankmeldung vom ${from} bis ${to} wurde gespeichert.`
  });
}

export function notifyCustomerRequest({
  userId,
  objectId,
  objectName,
  title,
  requestId
}) {
  return createNotification({
    userId,
    type: "KUNDENWUNSCH",
    priority: "HOCH",
    relatedObjectId: objectId,
    relatedId: requestId,
    title: "Neuer Kundenwunsch",
    message: `${objectName}: ${title}`
  });
}

export function notifyMaterialStatus({
  userId,
  objectId,
  material,
  status
}) {
  return createNotification({
    userId,
    type: "MATERIAL",
    priority: "NORMAL",
    relatedObjectId: objectId,
    title: `Material ${status}`,
    message: `${material} wurde auf Status ${status} gesetzt.`
  });
}
