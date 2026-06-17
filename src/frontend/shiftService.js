import { appState } from "./appState.js";

export function canStartShift() {
  return (
    appState.qrValidated === true &&
    appState.gpsValidated === true
  );
}

export function startShift() {

  if (!canStartShift()) {
    return {
      success: false,
      message:
        "Arbeitsbeginn nicht möglich. QR-Code oder GPS-Prüfung fehlgeschlagen."
    };
  }

  const now = new Date();

  appState.currentShift = {
    Startzeit: now.toLocaleTimeString(
      "de-DE",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    ),

    Endzeit: null,

    Datum: now.toISOString()
      .split("T")[0]
  };

  appState.shiftStarted = true;

  return {
    success: true,
    message: "Schicht erfolgreich gestartet"
  };
}

export function endShift() {

  if (!appState.shiftStarted) {
    return {
      success: false,
      message: "Keine aktive Schicht vorhanden"
    };
  }

  const now = new Date();

  appState.currentShift.Endzeit =
    now.toLocaleTimeString(
      "de-DE",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

  appState.shiftStarted = false;

  return {
    success: true,
    message: "Schicht erfolgreich beendet"
  };
}
