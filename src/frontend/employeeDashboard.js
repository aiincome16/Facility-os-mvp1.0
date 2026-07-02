import { appState } from "./appState.js";
import { openQrScanner } from "./qrUi.js";
import { showToast } from "./toastUi.js";

export function renderEmployeeDashboard() {
  const user = appState.currentUser;

  if (!user) {
    showToast("Kein Benutzer angemeldet", "ERROR");
    return;
  }

  const objectName =
    appState.currentObject?.Name ||
    "Kein Objekt ausgewählt";

  const shiftStarted =
    appState.shiftStarted === true;

  document.getElementById("app").innerHTML = `
<div class="app-shell">

    <div class="header-card">
        <h1>Facility-OS</h1>

        <div>${objectName}</div>

        <div class="role-badge">
            Mitarbeiter
        </div>

        <div style="margin-top:8px;">
            ${user.Name || ""}
        </div>
    </div>

    <div class="section-card">

        <div class="button-stack">

            ${
              shiftStarted
                ? `
<button id="btnContinueShift"
class="btn green">

Zur Schicht

</button>
`
                : `
document
  .getElementById("btnStartShift")
  ?.addEventListener(
    "click",
    renderObjectSelection
  );

</button>
`
            }

            <button
            id="btnMailbox"
            class="btn green">

Postfach

</button>

            <button
            id="btnMyShifts"
            class="btn blue">

Meine Schichten

</button>

            <button
            id="btnVacation"
            class="btn blue">

Urlaub

</button>

            <button
            id="btnSick"
            class="btn blue">

Krankmeldung

</button>

        </div>

    </div>

    <div class="section-card">

        <div class="button-stack">

            <button
            id="btnRooms"
            class="btn orange">

Räume

</button>

            <button
            id="btnTickets"
            class="btn yellow">

Tickets

</button>

            <button
            id="btnMaterial"
            class="btn green">

Material

</button>

            <button
            id="btnReplacement"
            class="btn orange">

Vertretungen

</button>

        </div>

    </div>

    <div class="section-card">

        <div class="button-stack">

            <button
            id="btnObjectInfo"
            class="btn blue">

Objektinfo

</button>

            <button
            id="btnWarnings"
            class="btn orange">

Warnungen

</button>

            <button
            id="btnAnalytics"
            class="btn orange">

Auswertungen

</button>

            <button
            id="btnHelp"
            class="btn secondary">

Hilfe

</button>

        </div>

    </div>

    <div class="section-card">

        <div class="button-stack">

            <button
            id="btnLogout"
            class="btn secondary">

Logout

</button>

        </div>

    </div>

</div>
`;

  bindEmployeeEvents();
}

function bindEmployeeEvents() {

  document
    .getElementById("btnStartShift")
    ?.addEventListener("click", () => {

      openQrScanner();

    });

  document
    .getElementById("btnContinueShift")
    ?.addEventListener("click", () => {

      showToast(
        "Schicht läuft bereits",
        "INFO"
      );

    });

  document
    .getElementById("btnMailbox")
    ?.addEventListener("click", () => {

      showToast(
        "Postfach folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnMyShifts")
    ?.addEventListener("click", () => {

      showToast(
        "Schichten folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnVacation")
    ?.addEventListener("click", () => {

      showToast(
        "Urlaub folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnSick")
    ?.addEventListener("click", () => {

      showToast(
        "Krankmeldung folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnRooms")
    ?.addEventListener("click", () => {

      showToast(
        "Räume folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnTickets")
    ?.addEventListener("click", () => {

      showToast(
        "Tickets folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnMaterial")
    ?.addEventListener("click", () => {

      showToast(
        "Material folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnReplacement")
    ?.addEventListener("click", () => {

      showToast(
        "Vertretungen folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnObjectInfo")
    ?.addEventListener("click", () => {

      showToast(
        "Objektinfo folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnWarnings")
    ?.addEventListener("click", () => {

      showToast(
        "Warnungen folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnAnalytics")
    ?.addEventListener("click", () => {

      showToast(
        "Auswertungen folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnHelp")
    ?.addEventListener("click", () => {

      showToast(
        "Hilfe folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnLogout")
    ?.addEventListener("click", () => {

      if (typeof window.logout === "function") {
        window.logout();
      }

    });

}