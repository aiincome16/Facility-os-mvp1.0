import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showAdminDashboard() {
  openModal({
    title: "Admin",
    content: `
      <div class="info-card red">
        <div class="card-title">Systemübersicht</div>
        Benutzer: ${appState.cachedUsers?.length || 0}<br>
        Objekte: ${appState.cachedObjects?.length || 0}<br>
        Räume: ${appState.cachedRooms?.length || 0}<br>
        Materialien: ${appState.cachedMaterials?.length || 0}
      </div>

      <div class="button-stack">
        <button id="adminUsersBtn" class="btn red">Benutzer</button>
        <button id="adminObjectsBtn" class="btn red">Objekte</button>
        <button id="adminQrBtn" class="btn red">QR-Codes</button>
        <button id="adminGpsBtn" class="btn red">GPS</button>
        <button id="adminBrandingBtn" class="btn red">Branding</button>
        <button id="adminRolesBtn" class="btn red">Rollen</button>
        <button id="adminSettingsBtn" class="btn red">Einstellungen</button>
      </div>
    `
  });

  document.getElementById("adminUsersBtn")?.addEventListener("click", showUsers);
  document.getElementById("adminObjectsBtn")?.addEventListener("click", showObjects);
  document.getElementById("adminQrBtn")?.addEventListener("click", showQrCodes);
  document.getElementById("adminGpsBtn")?.addEventListener("click", showGpsLogs);
  document.getElementById("adminBrandingBtn")?.addEventListener("click", showBranding);
  document.getElementById("adminRolesBtn")?.addEventListener("click", showRoles);
  document.getElementById("adminSettingsBtn")?.addEventListener("click", showSettings);
}

export function showUsers() {
  const users = appState.cachedUsers || [];

  openModal({
    title: "Benutzer",
    content: users.length
      ? users.map(user => `
        <div class="info-card red">
          <div class="card-title">${user.Vorname || ""} ${user.Nachname || ""}</div>
          Rolle: ${user.Rolle || "-"}<br>
          E-Mail: ${user.Email || "-"}<br>
          Wohnort: ${user.Wohnort || "-"}<br>
          Score: ${user.Score || "-"}<br>
          Aktiv: ${user.Aktiv || "-"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Benutzer vorhanden.</div>`
  });
}

export function showObjects() {
  const objects = appState.cachedObjects || [];

  openModal({
    title: "Objekte",
    content: objects.length
      ? objects.map(object => `
        <div class="info-card blue">
          <div class="card-title">${object.Name || "Objekt"}</div>
          Objekt-ID: ${object.Objekt_ID || "-"}<br>
          Adresse: ${object.Adresse || "-"}<br>
          QR: ${object.QR_Code || "-"}<br>
          GPS: ${object.GPS_Aktiv || "-"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Objekte vorhanden.</div>`
  });
}

export function showQrCodes() {
  const qrCodes = appState.cachedQrCodes || [];

  openModal({
    title: "QR-Codes",
    content: qrCodes.length
      ? qrCodes.map(qr => `
        <div class="info-card red">
          <div class="card-title">${qr.QR_ID || "QR-Code"}</div>
          Objekt: ${qr.Objekt_ID || "-"}<br>
          Typ: ${qr.QR_Typ || "-"}<br>
          Aktiv: ${qr.Aktiv || "-"}
        </div>
      `).join("")
      : `<div class="info-card">Keine QR-Codes vorhanden.</div>`
  });
}

export function showGpsLogs() {
  const logs = appState.cachedGpsLogs || [];

  openModal({
    title: "GPS",
    content: logs.length
      ? logs.map(log => `
        <div class="info-card red">
          <div class="card-title">${log.Objekt_ID || "Objekt"}</div>
          Mitarbeiter: ${log.Mitarbeiter_ID || "-"}<br>
          Entfernung: ${log.Entfernung_Meter || "-"} m<br>
          Erlaubt: ${log.Erlaubt || "-"}<br>
          Datum: ${log.Datum || "-"}
        </div>
      `).join("")
      : `<div class="info-card">Keine GPS-Logs vorhanden.</div>`
  });
}

export function showBranding() {
  const branding = appState.branding || {};

  openModal({
    title: "Branding",
    content: `
      <div class="info-card red">
        <div class="card-title">Aktuelles Branding</div>
        App-Name: ${branding.appName || "-"}<br>
        Untertitel: ${branding.subtitle || "-"}<br>
        Primärfarbe: ${branding.primaryColor || "-"}<br>
        Akzentfarbe: ${branding.accentColor || "-"}<br>
        Logo: ${branding.logo || "Kein Logo"}
      </div>
    `
  });
}

export function showRoles() {
  openModal({
    title: "Rollen",
    content: `
      <div class="info-card red">
        <div class="card-title">ADMIN</div>
        Vollzugriff auf System, Benutzer, Objekte, Branding und Daten.
      </div>

      <div class="info-card orange">
        <div class="card-title">OBJEKTLEITER</div>
        Zugriff auf Objekte, Mitarbeiter, Vertretungen, Material und Auswertungen.
      </div>

      <div class="info-card green">
        <div class="card-title">MITARBEITER</div>
        Zugriff auf Schichten, Objektwissen, Meldungen und Postfach.
      </div>

      <div class="info-card purple">
        <div class="card-title">KUNDE</div>
        Zugriff auf Wünsche, Tickets, Beschwerden, Berichte und Rechnungen.
      </div>
    `
  });
}

export function showSettings() {
  openModal({
    title: "Einstellungen",
    content: `
      <div class="info-card red">
        <div class="card-title">Systemeinstellungen</div>
        GPS-Radius: ${appState.gpsRadius || 100} m<br>
        Sprache: ${appState.language || "de"}<br>
        Auto-Logout: ${appState.autoLogout || 480} Minuten<br>
        Fotoqualität: ${appState.photoQuality || "high"}
      </div>
    `
  });
}

export function bindAdminEvents() {
  document
    .getElementById("btnAdmin")
    ?.addEventListener("click", showAdminDashboard);
}