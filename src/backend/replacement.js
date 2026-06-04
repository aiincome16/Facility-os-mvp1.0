import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";
import { sortReplacementCandidates } from "../utils/scoreUtils.js";
import {
  notifyReplacementRequest,
  notifyReplacementAccepted
} from "./notification.js";

export function createReplacementRequest({
  missingUserId,
  objectId,
  objectName,
  shiftId,
  date,
  startTime,
  endTime,
  reason = "AUSFALL"
}) {
  if (!missingUserId || !objectId || !shiftId) {
    return {
      success: false,
      message: "Pflichtangaben fehlen"
    };
  }

  return googleSheets.insertRow(
    "33_SubstitutionRequests",
    {
      Substitution_ID: createId("SUB"),
      Fehlender_Mitarbeiter_ID: missingUserId,
      Objekt_ID: objectId,
      Objekt_Name: objectName,
      Shift_ID: shiftId,
      Datum: date,
      Startzeit: startTime,
      Endzeit: endTime,
      Grund: reason,
      Angefragt_an: "",
      Vertretung_ID: "",
      Status: "OFFEN",
      Erstellt_am: new Date().toISOString()
    }
  );
}

export function getOpenReplacementRequests() {
  return googleSheets
    .getSheet("33_SubstitutionRequests")
    .filter(
      (request) =>
        request.Status !== "BESTAETIGT" &&
        request.Status !== "ABGELEHNT"
    );
}

export function findReplacementCandidates({
  objectId,
  missingUserId
}) {
  const users = googleSheets
    .getSheet("01_Users")
    .filter(
      (user) =>
        user.Rolle === "MITARBEITER" &&
        user.Aktiv === "JA" &&
        user.User_ID !== missingUserId
    );

  const enriched = users.map((user) => {
    const objectKnowledge =
      googleSheets.findByField(
        "34_SubstitutionHistory",
        "Mitarbeiter_ID",
        user.User_ID
      );

    return {
      ...user,
      Objektkenntnis:
        objectKnowledge &&
        objectKnowledge.Objekt_ID === objectId
          ? "JA"
          : user.Objektkenntnis || "NEIN"
    };
  });

  return sortReplacementCandidates(enriched);
}

export function requestBestReplacement(substitutionId) {
  const request = googleSheets.findByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId
  );

  if (!request) {
    return {
      success: false,
      message: "Vertretungsanfrage nicht gefunden"
    };
  }

  const candidates =
    findReplacementCandidates({
      objectId: request.Objekt_ID,
      missingUserId:
        request.Fehlender_Mitarbeiter_ID
    });

  if (!candidates.length) {
    return {
      success: false,
      message: "Keine Vertretung gefunden"
    };
  }

  const candidate = candidates[0];

  googleSheets.updateByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId,
    {
      Angefragt_an: candidate.User_ID,
      Status: "ANGEFRAGT",
      Angefragt_am: new Date().toISOString()
    }
  );

  notifyReplacementRequest({
    userId: candidate.User_ID,
    objectId: request.Objekt_ID,
    objectName: request.Objekt_Name,
    date: request.Datum,
    time: request.Startzeit,
    replacementId: substitutionId
  });

  return {
    success: true,
    candidate
  };
}

export function acceptReplacement({
  substitutionId,
  userId
}) {
  const request = googleSheets.findByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId
  );

  if (!request) {
    return {
      success: false,
      message: "Vertretungsanfrage nicht gefunden"
    };
  }

  if (request.Angefragt_an !== userId) {
    return {
      success: false,
      message: "Diese Anfrage gehört nicht zu diesem Mitarbeiter"
    };
  }

  googleSheets.updateByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId,
    {
      Vertretung_ID: userId,
      Status: "ANGENOMMEN",
      Angenommen_am: new Date().toISOString()
    }
  );

  const manager = googleSheets.findByField(
    "01_Users",
    "Rolle",
    "OBJEKTLEITER"
  );

  const employee = googleSheets.findByField(
    "01_Users",
    "User_ID",
    userId
  );

  if (manager) {
    notifyReplacementAccepted({
      managerId: manager.User_ID,
      employeeName: `${employee?.Vorname || ""} ${employee?.Nachname || ""}`,
      objectId: request.Objekt_ID,
      objectName: request.Objekt_Name,
      replacementId: substitutionId
    });
  }

  return {
    success: true,
    message: "Vertretung angenommen"
  };
}

export function declineReplacement({
  substitutionId,
  userId
}) {
  const request = googleSheets.findByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId
  );

  if (!request) {
    return {
      success: false,
      message: "Vertretungsanfrage nicht gefunden"
    };
  }

  if (request.Angefragt_an !== userId) {
    return {
      success: false,
      message: "Diese Anfrage gehört nicht zu diesem Mitarbeiter"
    };
  }

  googleSheets.updateByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId,
    {
      Status: "ABGELEHNT",
      Abgelehnt_am: new Date().toISOString()
    }
  );

  return {
    success: true,
    message: "Vertretung abgelehnt"
  };
}

export function confirmReplacement({
  substitutionId,
  managerId
}) {
  const request = googleSheets.findByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId
  );

  if (!request) {
    return {
      success: false,
      message: "Vertretungsanfrage nicht gefunden"
    };
  }

  if (request.Status !== "ANGENOMMEN") {
    return {
      success: false,
      message: "Vertretung wurde noch nicht angenommen"
    };
  }

  googleSheets.updateByField(
    "33_SubstitutionRequests",
    "Substitution_ID",
    substitutionId,
    {
      Status: "BESTAETIGT",
      Bestaetigt_von: managerId,
      Bestaetigt_am: new Date().toISOString()
    }
  );

  googleSheets.updateByField(
    "05_Shifts",
    "Shift_ID",
    request.Shift_ID,
    {
      Mitarbeiter_ID: request.Vertretung_ID,
      Status: "VERTRETUNG_GEFUNDEN"
    }
  );

  googleSheets.insertRow(
    "34_SubstitutionHistory",
    {
      History_ID: createId("SUBHIST"),
      Substitution_ID: substitutionId,
      Fehlender_Mitarbeiter_ID:
        request.Fehlender_Mitarbeiter_ID,
      Vertretung_ID: request.Vertretung_ID,
      Objekt_ID: request.Objekt_ID,
      Datum: request.Datum,
      Erfolgreich: "JA",
      Erstellt_am: new Date().toISOString()
    }
  );

  return {
    success: true,
    message: "Vertretung bestätigt"
  };
}
