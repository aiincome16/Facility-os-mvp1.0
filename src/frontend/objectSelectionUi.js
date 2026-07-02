import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";
import { openQrScanner } from "./qrUi.js";

export function renderObjectSelection() {

  const user = appState.currentUser;

  if (!user) {
    showToast("Kein Benutzer angemeldet", "ERROR");
    return;
  }

  // Vorläufig alle Objekte
  // Später nur freigegebene Objekte laden
  const objects = appState.data?.objects || [];

  document.getElementById("app").innerHTML = `

<div class="app-shell">

    <div class="header-card">
        <h1>Meine Objekte</h1>

        <div>
            Bitte Objekt auswählen
        </div>
    </div>

    <div class="section-card">

        <div
        id="objectList"
        class="button-stack">

        </div>

    </div>

    <div class="section-card">

        <button
        id="btnBackDashboard"
        class="btn secondary">

        Zurück

        </button>

    </div>

</div>

`;

  const list =
    document.getElementById("objectList");

  if (!objects.length) {

    list.innerHTML = `
      <div class="info-card">
        Keine Objekte vorhanden.
      </div>
    `;

    return;
  }

  objects.forEach(object => {

    const btn =
      document.createElement("button");

    btn.className = "btn blue";

    btn.innerHTML =
      object.Name ||
      object.Objekt_Name ||
      object.Objekt_ID;

    btn.addEventListener(
      "click",
      () => selectObject(object)
    );

    list.appendChild(btn);

  });

  document
    .getElementById("btnBackDashboard")
    ?.addEventListener(
      "click",
      backToDashboard
    );

}

function selectObject(object) {

  appState.currentObject = object;

  localStorage.setItem(
    "facilityObject",
    JSON.stringify(object)
  );

  showToast(
    "Objekt ausgewählt",
    "SUCCESS"
  );

  openQrScanner();

}

function backToDashboard() {

  if (typeof renderEmployeeDashboard === "function") {
    renderEmployeeDashboard();
  }

}