import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showMyShifts() {
  const shifts = appState.cachedShifts || [];

  if (!shifts.length) {
    openModal({
      title: "Meine Schichten",
      content: `
        <div class="info-card">
          Keine Schichten vorhanden.
        </div>
      `
    });
    return;
  }

  openModal({
    title: "Meine Schichten",
    content: shifts
      .map(formatShiftCard)
      .join("")
  });
}

export function showCurrentShift() {
  const shift = appState.currentShift;

  if (!shift) {
    openModal({
      title: "Aktuelle Schicht",
      content: `
        <div class="info-card yellow">
          Keine aktive Schicht vorhanden.
        </div>
      `
    });
    return;
  }

  openModal({
    title: "Aktuelle Schicht",
    content: formatShiftCard(shift)
  });
}

export function startShift(shift) {
  if (!shift) {
    showToast(
      "Keine Schicht gefunden",
      "ERROR"
    );
    return;
  }

  shift.Status = "GESTARTET";
  shift.Checkin_Zeit =
    new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit"
    });

  appState.currentShift = shift;

  showToast(
    "Schicht gestartet",
    "SUCCESS"
  );

  showCurrentShift();
}

export function endShift() {
  const shift = appState.currentShift;

  if (!shift) {
    showToast(
      "Keine aktive Schicht",
      "ERROR"
    );
    return;
  }

  shift.Status = "ABGESCHLOSSEN";
  shift.Checkout_Zeit =
    new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit"
    });

  showToast(
    "Schicht beendet",
    "SUCCESS"
  );

  showCurrentShift();
}

export function formatShiftCard(shift) {
  return `
    <div class="info-card green">
      <div class="card-title">
        ${shift.Objekt_Name || "Objekt"}
      </div>

      Datum:<br>
      <b>${shift.Datum || "-"}</b><br><br>

      Start:<br>
      ${shift.Startzeit || "-"}<br><br>

      Ende:<br>
      ${shift.Endzeit || "-"}<br><br>

      Status:<br>
      <b>${shift.Status || "-"}</b><br><br>

      Check-In:<br>
      ${shift.Checkin_Zeit || "-"}<br><br>

      Check-Out:<br>
      ${shift.Checkout_Zeit || "-"}
    </div>
  `;
}

export function bindShiftEvents() {
  const myShiftsBtn =
    document.getElementById("btnMyShifts");

  if (myShiftsBtn) {
    myShiftsBtn.addEventListener(
      "click",
      showMyShifts
    );
  }
}