import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showAdmin() {
  openModal({
    title: "Administration",
    content: `
      <div class="info-card red">
        <div class="card-title">Facility-OS Administration</div>

        Benutzer:
        ${(appState.cachedUsers || []).length}<br>

        Objekte:
        ${(appState.cachedObjects || []).length}<br>

        Räume:
        ${(appState.cachedRooms || []).length}<br>

        Schichten:
        ${(appState.cachedShifts || []).length}<br>

        QR-Codes:
        ${(appState.cachedQrCodes || []).length}
      </div>

      <div class="button-stack">

        <button id="btnAdminUsers" class="btn blue">
          Benutzer
        </button>

        <button id="btnAdminObjects" class="btn blue">
          Objekte
        </button>

        <button id="btnAdminRooms" class="btn blue">
          Räume
        </button>

        <button id="btnAdminQr" class="btn green">
          QR-Codes
        </button>

        <button id="btnAdminMaterials" class="btn green">
          Material
        </button>

        <button id="btnAdminShifts" class="btn yellow">
          Schichten
        </button>

        <button id="btnAdminDocuments" class="btn orange">
          Dokumente
        </button>

        <button id="btnAdminKeys" class="btn orange">
          Schlüssel
        </button>

        <button id="btnAdminAnalytics" class="btn purple">
          KI-Auswertung
        </button>

        <button id="btnAdminSync" class="btn purple">
          Synchronisieren
        </button>

      </div>
    `
  });

  bindAdminEvents();
}

function bindAdminEvents() {

  document
    .getElementById("btnAdminUsers")
    ?.addEventListener("click", showUsers);

  document
    .getElementById("btnAdminObjects")
    ?.addEventListener("click", showObjects);

  document
    .getElementById("btnAdminRooms")
    ?.addEventListener("click", showRooms);

  document
    .getElementById("btnAdminQr")
    ?.addEventListener("click", showQrCodes);

  document
    .getElementById("btnAdminMaterials")
    ?.addEventListener("click", showMaterials);

  document
    .getElementById("btnAdminShifts")
    ?.addEventListener("click", showShifts);

  document
    .getElementById("btnAdminDocuments")
    ?.addEventListener("click", showDocuments);

  document
    .getElementById("btnAdminKeys")
    ?.addEventListener("click", showKeys);

  document
    .getElementById("btnAdminAnalytics")
    ?.addEventListener("click", showAnalytics);

  document
    .getElementById("btnAdminSync")
    ?.addEventListener("click", synchronizeSheets);

}

function showUsers() {
  showToast("Benutzerverwaltung folgt.", "INFO");
}

function showObjects() {
  showToast("Objektverwaltung folgt.", "INFO");
}

function showRooms() {
  showToast("Raumverwaltung folgt.", "INFO");
}

function showQrCodes() {
  showToast("QR-Code Verwaltung folgt.", "INFO");
}

function showMaterials() {
  showToast("Materialverwaltung folgt.", "INFO");
}

function showShifts() {
  showToast("Schichtverwaltung folgt.", "INFO");
}

function showDocuments() {
  showToast("Dokumentenverwaltung folgt.", "INFO");
}

function showKeys() {
  showToast("Schlüsselverwaltung folgt.", "INFO");
}

function showAnalytics() {
  showToast("KI-Auswertung folgt.", "INFO");
}

function synchronizeSheets() {
  showToast(
    "Synchronisation mit Google Sheets wird vorbereitet.",
    "SUCCESS"
  );
}