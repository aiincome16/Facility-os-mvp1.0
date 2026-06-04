export function createNotification({
  userId,
  title,
  message,
  type = "INFO",
  priority = "NORMAL"
}) {
  if (!userId || !title) {
    return {
      success: false,
      message: "Empfänger oder Titel fehlt"
    };
  }

  return {
    success: true,
    notification: {
      Notification_ID: `NOTIFY-${Date.now()}`,
      User_ID: userId,
      Typ: type,
      Prioritaet: priority,
      Titel: title,
      Nachricht: message || "",
      Gelesen: "NEIN",
      Erstellt_am: new Date().toISOString()
    }
  };
}

export function notifyReplacementRequest(userId, objectName, date, time) {
  return createNotification({
    userId,
    type: "VERTRETUNG",
    priority: "HOCH",
    title: "Neue Vertretungsanfrage",
    message: `Du wurdest für ${objectName} am ${date} um ${time} angefragt.`
  });
}

export function notifyVacationApproved(userId, from, to) {
  return createNotification({
    userId,
    type: "URLAUB",
    priority: "NORMAL",
    title: "Urlaub genehmigt",
    message: `Dein Urlaub vom ${from} bis ${to} wurde genehmigt.`
  });
}

export function notifyMaterialApproved(userId, material, objectName) {
  return createNotification({
    userId,
    type: "MATERIAL",
    priority: "NORMAL",
    title: "Materialbestellung freigegeben",
    message: `${material} für ${objectName} wurde freigegeben.`
  });
}

export function notifyCustomerRequest(userId, objectName, title) {
  return createNotification({
    userId,
    type: "KUNDENWUNSCH",
    priority: "HOCH",
    title: "Neuer Kundenwunsch",
    message: `${objectName}: ${title}`
  });
}