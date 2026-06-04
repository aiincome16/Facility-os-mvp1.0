import { googleSheets } from "../services/googleSheets.js";

function toNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return number;
}

export function getObjectShifts(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "05_Shifts",
    "Objekt_ID",
    objectId
  );
}

export function getUserShifts(userId) {
  if (!userId) {
    return [];
  }

  return googleSheets.findAllByField(
    "05_Shifts",
    "Mitarbeiter_ID",
    userId
  );
}

export function calculateShiftDeviation(shift) {
  const planned =
    toNumber(shift.Sollzeit_Minuten);

  const actual =
    toNumber(shift.Istzeit_Minuten);

  return {
    planned,
    actual,
    deviation: actual - planned
  };
}

export function getObjectTimeAnalysis(objectId) {
  const shifts =
    getObjectShifts(objectId);

  const completed =
    shifts.filter(
      (shift) =>
        shift.Status === "ABGESCHLOSSEN"
    );

  const totalPlanned =
    completed.reduce(
      (sum, shift) =>
        sum + toNumber(shift.Sollzeit_Minuten),
      0
    );

  const totalActual =
    completed.reduce(
      (sum, shift) =>
        sum + toNumber(shift.Istzeit_Minuten),
      0
    );

  return {
    objectId,
    completedShifts: completed.length,
    totalPlanned,
    totalActual,
    deviation: totalActual - totalPlanned
  };
}

export function getUserPerformanceSummary(userId) {
  const user =
    googleSheets.findByField(
      "01_Users",
      "User_ID",
      userId
    );

  const shifts =
    getUserShifts(userId);

  const completed =
    shifts.filter(
      (shift) =>
        shift.Status === "ABGESCHLOSSEN"
    );

  const late =
    shifts.filter(
      (shift) =>
        shift.Verspaetet === "JA"
    );

  const complaints =
    googleSheets.findAllByField(
      "43_CustomerComplaints",
      "Mitarbeiter_ID",
      userId
    );

  const openComplaints =
    complaints.filter(
      (complaint) =>
        complaint.Status !== "ERLEDIGT" &&
        complaint.Status !== "ABGELEHNT"
    );

  return {
    userId,
    name: user
      ? `${user.Vorname} ${user.Nachname}`
      : userId,
    score: user?.Score || "",
    completedShifts: completed.length,
    lateCount: late.length,
    complaintCount: openComplaints.length
  };
}

export function getMaterialUsageSummary(objectId) {
  const reports =
    googleSheets.findAllByField(
      "15_MaterialReports",
      "Objekt_ID",
      objectId
    );

  const grouped = {};

  reports.forEach((report) => {
    const material =
      report.Material || "Unbekannt";

    if (!grouped[material]) {
      grouped[material] = {
        material,
        count: 0,
        open: 0
      };
    }

    grouped[material].count += 1;

    if (
      report.Status !== "ERLEDIGT" &&
      report.Status !== "ABGELEHNT"
    ) {
      grouped[material].open += 1;
    }
  });

  return Object.values(grouped);
}

export function createObjectAnalysisSnapshot(objectId) {
  const time =
    getObjectTimeAnalysis(objectId);

  const material =
    getMaterialUsageSummary(objectId);

  return googleSheets.insertRow(
    "36_TimeDeviation",
    {
      Analysis_ID: `ANALYSIS-${Date.now()}`,
      Objekt_ID: objectId,
      Abgeschlossene_Schichten:
        time.completedShifts,
      Sollzeit_Gesamt:
        time.totalPlanned,
      Istzeit_Gesamt:
        time.totalActual,
      Abweichung:
        time.deviation,
      Material_Report_Count:
        material.length,
      Erstellt_am:
        new Date().toISOString()
    }
  );
}