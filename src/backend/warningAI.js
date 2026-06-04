import { googleSheets } from "./services/googleSheets.js";

function createWarning({
  type,
  severity,
  userId = "",
  objectId = "",
  title,
  description,
  suggestion
}) {
  return googleSheets.insertRow(
    "47_AIWarnings",
    {
      Warning_ID: `WARN-${Date.now()}`,
      Typ: type,
      Schweregrad: severity,
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Titel: title,
      Beschreibung: description,
      Vorschlag: suggestion,
      Status: "OFFEN",
      Erstellt_am: new Date().toISOString()
    }
  );
}

export function checkTimeDeviation(shift) {
  if (!shift) {
    return null;
  }

  const plannedMinutes =
    Number(shift.Sollzeit_Minuten || 0);

  const actualMinutes =
    Number(shift.Istzeit_Minuten || 0);

  if (!plannedMinutes || !actualMinutes) {
    return null;
  }

  const deviation =
    actualMinutes - plannedMinutes;

  if (deviation <= -15) {
    return createWarning({
      type: "ZEIT_ABWEICHUNG",
      severity: "HOCH",
      userId: shift.Mitarbeiter_ID,
      objectId: shift.Objekt_ID,
      title: "Schicht deutlich zu kurz",
      description: `Die Schicht war ${Math.abs(
        deviation
      )} Minuten kürzer als geplant.`,
      suggestion:
        "Objektleiter sollte prüfen, ob Aufgaben ausgelassen wurden."
    });
  }

  if (deviation >= 30) {
    return createWarning({
      type: "ZEIT_ABWEICHUNG",
      severity: "MITTEL",
      userId: shift.Mitarbeiter_ID,
      objectId: shift.Objekt_ID,
      title: "Schicht deutlich länger",
      description: `Die Schicht war ${deviation} Minuten länger als geplant.`,
      suggestion:
        "Putzplan prüfen oder Objektzeit anpassen."
    });
  }

  return null;
}

export function checkEmployeeScore(userId) {
  const user = googleSheets.findByField(
    "01_Users",
    "User_ID",
    userId
  );

  if (!user) {
    return null;
  }

  const score = Number(user.Score || 0);

  if (score && score < 60) {
    return createWarning({
      type: "MITARBEITER_SCORE",
      severity: "HOCH",
      userId,
      title: "Auffälliger Mitarbeiter-Score",
      description: `Der Mitarbeiter-Score liegt bei ${score}.`,
      suggestion:
        "Gespräch, Nachschulung oder engere Qualitätskontrolle prüfen."
    });
  }

  if (score >= 60 && score < 75) {
    return createWarning({
      type: "MITARBEITER_SCORE",
      severity: "MITTEL",
      userId,
      title: "Mitarbeiter beobachten",
      description: `Der Mitarbeiter-Score liegt bei ${score}.`,
      suggestion:
        "Entwicklung beobachten und bei weiteren Auffälligkeiten reagieren."
    });
  }

  return null;
}

export function checkRepeatedComplaints(objectId) {
  const complaints =
    googleSheets.findAllByField(
      "43_CustomerComplaints",
      "Objekt_ID",
      objectId
    );

  const openComplaints =
    complaints.filter(
      (complaint) =>
        complaint.Status !== "ERLEDIGT" &&
        complaint.Status !== "ABGELEHNT"
    );

  if (openComplaints.length >= 3) {
    return createWarning({
      type: "BESCHWERDEN",
      severity: "HOCH",
      objectId,
      title: "Mehrere offene Beschwerden",
      description: `Es liegen ${openComplaints.length} offene Beschwerden vor.`,
      suggestion:
        "Objektleiter sollte Objekt kontrollieren und Ursachen prüfen."
    });
  }

  return null;
}

export function checkMaterialProblems(objectId) {
  const reports =
    googleSheets.findAllByField(
      "15_MaterialReports",
      "Objekt_ID",
      objectId
    );

  const openReports =
    reports.filter(
      (report) =>
        report.Status !== "ERLEDIGT" &&
        report.Status !== "ABGELEHNT"
    );

  if (openReports.length >= 3) {
    return createWarning({
      type: "MATERIAL",
      severity: "MITTEL",
      objectId,
      title: "Wiederholte Materialmeldungen",
      description: `Es gibt ${openReports.length} offene Materialmeldungen.`,
      suggestion:
        "Mindestbestand oder Bestellrhythmus prüfen."
    });
  }

  return null;
}

export function runObjectWarningChecks(objectId) {
  return {
    complaints:
      checkRepeatedComplaints(objectId),
    material:
      checkMaterialProblems(objectId)
  };
}

export function runUserWarningChecks(userId) {
  return {
    score:
      checkEmployeeScore(userId)
  };
}