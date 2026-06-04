import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";
import { getCurrentTimeDE, todayISO, nowISO } from "../utils/dateUtils.js";

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

export function findOpenShift({
  userId,
  objectId
}) {
  const shifts = getUserShifts(userId);

  return (
    shifts.find(
      (shift) =>
        shift.Objekt_ID === objectId &&
        shift.Status !== "ABGESCHLOSSEN"
    ) || null
  );
}

export function createShift({
  userId,
  objectId,
  objectName,
  date,
  startTime,
  endTime,
  plannedMinutes = ""
}) {
  if (!userId || !objectId || !date) {
    return {
      success: false,
      message: "Pflichtangaben fehlen"
    };
  }

  return googleSheets.insertRow(
    "05_Shifts",
    {
      Shift_ID: createId("SHIFT"),
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Objekt_Name: objectName || "",
      Datum: date,
      Startzeit: startTime || "",
      Endzeit: endTime || "",
      Sollzeit_Minuten: plannedMinutes,
      Istzeit_Minuten: "",
      Status: "GEPLANT",
      Checkin_Zeit: "",
      Checkout_Zeit: "",
      Erstellt_am: nowISO()
    }
  );
}

export function checkInShift({
  shiftId,
  userId,
  objectId,
  qrCode = "",
  gpsStatus = ""
}) {
  const shift = googleSheets.findByField(
    "05_Shifts",
    "Shift_ID",
    shiftId
  );

  if (!shift) {
    return {
      success: false,
      message: "Schicht nicht gefunden"
    };
  }

  const checkinTime = getCurrentTimeDE();

  googleSheets.updateByField(
    "05_Shifts",
    "Shift_ID",
    shiftId,
    {
      Status: "GESTARTET",
      Checkin_Zeit: checkinTime,
      Checkin_ISO: nowISO()
    }
  );

  googleSheets.insertRow(
    "06_Checkins",
    {
      Checkin_ID: createId("CHECKIN"),
      Shift_ID: shiftId,
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Datum: todayISO(),
      Zeit: checkinTime,
      QR_Code: qrCode,
      GPS_Status: gpsStatus,
      Erstellt_am: nowISO()
    }
  );

  return {
    success: true,
    message: "Schicht gestartet",
    checkinTime
  };
}

export function checkOutShift({
  shiftId,
  userId,
  objectId,
  qrCode = "",
  gpsStatus = ""
}) {
  const shift = googleSheets.findByField(
    "05_Shifts",
    "Shift_ID",
    shiftId
  );

  if (!shift) {
    return {
      success: false,
      message: "Schicht nicht gefunden"
    };
  }

  const checkoutTime = getCurrentTimeDE();
  const checkoutISO = nowISO();

  const checkinISO = shift.Checkin_ISO;
  let actualMinutes = "";

  if (checkinISO) {
    const diffMs =
      new Date(checkoutISO) -
      new Date(checkinISO);

    actualMinutes =
      Math.max(
        0,
        Math.round(diffMs / 60000)
      );
  }

  googleSheets.updateByField(
    "05_Shifts",
    "Shift_ID",
    shiftId,
    {
      Status: "ABGESCHLOSSEN",
      Checkout_Zeit: checkoutTime,
      Checkout_ISO: checkoutISO,
      Istzeit_Minuten: actualMinutes
    }
  );

  googleSheets.insertRow(
    "07_Checkouts",
    {
      Checkout_ID: createId("CHECKOUT"),
      Shift_ID: shiftId,
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Datum: todayISO(),
      Zeit: checkoutTime,
      QR_Code: qrCode,
      GPS_Status: gpsStatus,
      Istzeit_Minuten: actualMinutes,
      Erstellt_am: nowISO()
    }
  );

  return {
    success: true,
    message: "Schicht beendet",
    checkoutTime,
    actualMinutes
  };
}

export function startOrEndShift({
  userId,
  objectId,
  qrCode = "",
  gpsStatus = ""
}) {
  const shift = findOpenShift({
    userId,
    objectId
  });

  if (!shift) {
    return {
      success: false,
      message: "Keine offene Schicht gefunden"
    };
  }

  if (!shift.Checkin_Zeit) {
    return checkInShift({
      shiftId: shift.Shift_ID,
      userId,
      objectId,
      qrCode,
      gpsStatus
    });
  }

  if (!shift.Checkout_Zeit) {
    return checkOutShift({
      shiftId: shift.Shift_ID,
      userId,
      objectId,
      qrCode,
      gpsStatus
    });
  }

  return {
    success: false,
    message: "Schicht ist bereits abgeschlossen"
  };
}
