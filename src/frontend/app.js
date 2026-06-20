import { appState } from "./appState.js";
import { loadAppData } from "./loadAppData.js";
import { dataStore, getData, findByField, filterByField } from "./dataService.js";
import { openModal, bindModalEvents } from "./modalUi.js";
import { showToast } from "./toastUi.js";
import { openQrScanner, closeQrScanner, manualQrInput, bindQrEvents } from "./qrUi.js";

function renderLogin() {
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      <div class="header-card">
        <h1>Facility-OS</h1>
        <p>Mobile Facility Management</p>
        <div class="role-badge">Login</div>
      </div>

      <div class="section-card">
        <label>E-Mail</label>
        <input id="loginEmail" value="anna@test.de">

        <label>Passwort</label>
        <input id="loginPassword" type="password" value="Test123!">

        <button id="loginBtn" class="btn green">Einloggen</button>

        <hr>

        <button id="demoEmployeeBtn" class="btn secondary">Demo Mitarbeiter</button>
        <button id="demoNewEmployeeBtn" class="btn secondary">Demo neue Kraft</button>
        <button id="demoManagerBtn" class="btn secondary">Demo Objektleiter</button>
        <button id="demoAdminBtn" class="btn secondary">Demo Admin</button>
        <button id="demoCustomerBtn" class="btn secondary">Demo Kunde</button>
      </div>
    </div>
  `;

  document.getElementById("loginBtn").addEventListener("click", loginFromForm);

  document.getElementById("demoEmployeeBtn").addEventListener("click", () => {
    loginUser("anna@test.de", "Test123!");
  });

  document.getElementById("demoNewEmployeeBtn").addEventListener("click", () => {
    loginUser("kevin@test.de", "Test123!");
  });

  document.getElementById("demoManagerBtn").addEventListener("click", () => {
    loginUser("sarah@test.de", "Test123!");
  });

  document.getElementById("demoAdminBtn").addEventListener("click", () => {
    loginUser("allrountin@gmail.com", "Test123!");
  });

  document.getElementById("demoCustomerBtn").addEventListener("click", () => {
    loginUser("kunde@test.de", "Test123!");
  });
}

function loginFromForm() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  loginUser(email, password);
}

function loginUser(email, password) {
  const user = findByField("users", "Email", email);

  if (!user) {
    showToast("Benutzer nicht gefunden", "ERROR");
    return;
  }

  if (user.Passwort !== password) {
    showToast("Falsches Passwort", "ERROR");
    return;
  }

  if (user.Aktiv !== "JA") {
    showToast("Benutzer deaktiviert", "ERROR");
    return;
  }

  const objects = getData("objects");

  appState.currentUser = user;
  appState.currentObject = null;
  appState.helpLevel = Number(user.Hilfestufe || 1);
  appState.guidedMode =
    user.Objektkenntnis === "NEIN" ||
    appState.helpLevel >= 4;

  appState.cachedUsers = getData("users");
  appState.cachedObjects = getData("objects");
  appState.cachedRooms = getData("rooms");
  appState.cachedTasks = getData("tasks");
  appState.cachedMaterials = getData("materials");
  appState.cachedShifts = getData("shifts");
  appState.qrCodes = getData("qrCodes");
  appState.notifications = getData("notifications");
  appState.customerRequests = getData("customerRequests");

  localStorage.setItem("facilityUser", JSON.stringify(user));

  renderCheckinStart();
  showToast("Login erfolgreich", "SUCCESS");
}

function logout() {
  localStorage.removeItem("facilityUser");

  appState.currentUser = null;
  appState.currentObject = null;
  appState.currentRoom = null;
  appState.currentShift = null;

  appState.shiftStarted = false;
  appState.qrValidated = false;
  appState.gpsValidated = false;
  appState.mandatoryMessagesConfirmed = false;

  renderLogin();
}

function renderCheckinStart() {
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      <div class="header-card">
        <h1>Facility-OS</h1>
        <p>Arbeitsbeginn</p>
        <div class="role-badge">${appState.currentUser?.Rolle || "-"}</div>
      </div>

      <div class="section-card">
        <div class="section-title">QR-Check-in erforderlich</div>
        <div class="section-subtitle">
          Bitte Objekt-QR-Code scannen. Danach werden Standort, Objekt und Arbeitsbeginn geprüft.
        </div>

        <div class="button-stack" style="margin-top: 16px;">
          <button id="btnOpenQrScanner" class="btn green">QR-Code scannen</button>
          <button id="btnOpenDailyControl" class="btn secondary">Tagessteuerung öffnen</button>
          <button id="btnLogout" class="btn secondary">Logout</button>
        </div>
      </div>
    </div>
  `;

  bindCheckinStartEvents();

  setTimeout(() => {
    openQrScanner();
  }, 500);
}

function bindCheckinStartEvents() {
  document.getElementById("btnOpenQrScanner").addEventListener("click", openQrScanner);

  document.getElementById("btnOpenDailyControl").addEventListener("click", () => {
    import("./dailyControlUi.js").then((module) => {
      module.showDailyControl();
    });
  });

  document.getElementById("btnLogout").addEventListener("click", logout);

  bindQrEvents();
}

function renderDashboard() {
if (!appState.currentObject) {
  showToast(
    "Bitte zuerst am Objekt einchecken",
    "ERROR"
  );

  renderCheckinStart();
  return;
}  
  const user = appState.currentUser;

  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      <div class="header-card">
        <h1>Facility-OS</h1>
        <p>${appState.currentObject?.Name || "Objekt"}</p>
        <div class="role-badge">${user?.Rolle || "-"}</div>
      </div>

      <div class="dashboard">
        <div class="section-card">
          <div class="section-title">Persönlich</div>
          <div class="section-subtitle">Schicht, Postfach, Meldungen</div>
          <div class="button-stack">
            <button id="btnStartShift" class="btn green">Schicht starten</button>
            <button id="btnMyShifts" class="btn green">Meine Schichten</button>
            <button id="btnMailbox" class="btn green">Postfach</button>
            <button id="btnSick" class="btn green">Krankmeldung</button>
            <button id="btnVacation" class="btn green">Urlaub</button>
            <button id="btnMaterial" class="btn green">Material melden</button>
            <button id="btnHelp" class="btn secondary">Hilfe</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Objekt</div>
          <div class="section-subtitle">Objekt-Wiki und Putzplan</div>
          <div class="button-stack">
            <button id="btnObjectInfo" class="btn blue">Objektinfo</button>
            <button id="btnRooms" class="btn blue">Räume</button>
            <button id="btnCleaningPlan" class="btn blue">Putzplan</button>
            <button id="btnDocuments" class="btn blue">Dokumente</button>
            <button id="btnFloorPlan" class="btn blue">Grundriss</button>
            <button id="btnWaste" class="btn blue">Müllplan</button>
            <button id="btnKeys" class="btn blue">Schlüssel</button>
            <button id="btnDanger" class="btn blue">Gefahren & Anwendung</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Kommunikation</div>
          <div class="section-subtitle">Tickets und Kundenwünsche</div>
          <div class="button-stack">
            <button id="btnTickets" class="btn yellow">Tickets</button>
            <button id="btnCustomerRequests" class="btn yellow">Kundenwünsche</button>
            <button id="btnNotes" class="btn yellow">Sofortnotiz</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Objektleiter</div>
          <div class="section-subtitle">Vertretung, Material, Analyse</div>
          <div class="button-stack">
            <button id="btnReplacement" class="btn orange">Vertretungen</button>
            <button id="btnWarnings" class="btn orange">KI-Warnungen</button>
            <button id="btnAnalytics" class="btn orange">Analysen</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Kunde</div>
          <div class="section-subtitle">Wünsche und Zusatzleistungen</div>
          <div class="button-stack">
            <button id="btnCustomerPortal" class="btn purple">Kundenportal</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Admin</div>
          <div class="section-subtitle">System</div>
          <div class="button-stack">
            <button id="btnAdmin" class="btn red">Adminbereich</button>
            <button id="btnLogout" class="btn secondary">Logout</button>
          </div>
        </div>
      </div>
    </div>
  `;

  bindDashboardEvents();
}

function bindDashboardEvents() {
  document.getElementById("btnStartShift").onclick = openQrScanner;
  document.getElementById("btnMyShifts").onclick = showMyShifts;
  document.getElementById("btnMailbox").onclick = showMailbox;
  document.getElementById("btnSick").onclick = showSickForm;
  document.getElementById("btnVacation").onclick = showVacationForm;
  document.getElementById("btnMaterial").onclick = showMaterialForm;
  document.getElementById("btnHelp").onclick = showHelp;

  document.getElementById("btnObjectInfo").onclick = showObjectInfo;
  document.getElementById("btnRooms").onclick = showRooms;
  document.getElementById("btnCleaningPlan").onclick = showCleaningPlan;
  document.getElementById("btnDocuments").onclick = showDocuments;
  document.getElementById("btnFloorPlan").onclick = showFloorPlan;
  document.getElementById("btnWaste").onclick = showWastePlan;
  document.getElementById("btnKeys").onclick = showKeys;
  document.getElementById("btnDanger").onclick = showDanger;

  document.getElementById("btnTickets").onclick = showTickets;
  document.getElementById("btnCustomerRequests").onclick = showCustomerRequests;
  document.getElementById("btnNotes").onclick = showTicketForm;

  document.getElementById("btnReplacement").onclick = showReplacements;
  document.getElementById("btnWarnings").onclick = showWarnings;
  document.getElementById("btnAnalytics").onclick = showAnalytics;

  document.getElementById("btnCustomerPortal").onclick = showCustomerPortal;
  document.getElementById("btnAdmin").onclick = showAdmin;
  document.getElementById("btnLogout").onclick = logout;

  bindQrEvents();
}

function showMyShifts() {
  const shifts = getData("shifts");
  const user = appState.currentUser;

  const userShifts = shifts.filter(
    (item) => item.Mitarbeiter_ID === user.User_ID
  );

  openModal({
    title: "Meine Schichten",
    content:
      userShifts.map(formatShift).join("") ||
      `<div class="info-card">Keine Schichten vorhanden.</div>`
  });
}

function formatShift(shift) {
  return `
    <div class="info-card green">
      <div class="card-title">${shift.Objekt_Name}</div>
      Datum: ${shift.Datum}<br>
      Zeit: ${shift.Startzeit}–${shift.Endzeit}<br>
      Status: <b>${shift.Status}</b><br>
      Check-In: ${shift.Checkin_Zeit || "-"}<br>
      Check-Out: ${shift.Checkout_Zeit || "-"}
    </div>
  `;
}

function showMailbox() {
  const notifications = getData("notifications");

  openModal({
    title: "Postfach",
    content:
      notifications
        .map(
          (msg) => `
            <div class="info-card ${msg.Gelesen === "JA" ? "" : "yellow"}">
              <div class="card-title">${msg.Titel}</div>
              ${msg.Nachricht}<br><br>
              Status: ${msg.Status}
            </div>
          `
        )
        .join("") ||
      `<div class="info-card">Keine Nachrichten vorhanden.</div>`
  });
}

function showSickForm() {
  openModal({
    title: "Krankmeldung",
    content: `
      <label>Von</label>
      <input id="sickFrom" type="date">

      <label>Bis</label>
      <input id="sickTo" type="date">

      <label>Grund optional</label>
      <textarea id="sickReason"></textarea>
    `,
    actions: [
      {
        label: "Speichern",
        className: "btn green",
        onClick: () => {
          showToast("Krankmeldung gespeichert. Vertretung wird benötigt.", "SUCCESS");
          openModal({
            title: "Vertretungsworkflow",
            content: `<div class="info-card orange">Vertretung und Buchhaltung werden im nächsten Block angebunden.</div>`
          });
        }
      }
    ]
  });
}

function showVacationForm() {
  openModal({
    title: "Urlaub beantragen",
    content: `
      <label>Von</label>
      <input id="vacFrom" type="date">

      <label>Bis</label>
      <input id="vacTo" type="date">

      <label>Grund optional</label>
      <textarea id="vacReason"></textarea>
    `,
    actions: [
      {
        label: "Speichern",
        className: "btn green",
        onClick: () => {
          showToast("Urlaubsantrag gespeichert. Vertretung wird geprüft.", "SUCCESS");
          openModal({
            title: "Urlaubsworkflow",
            content: `<div class="info-card orange">Genehmigung, Vertretung und Buchhaltung werden im nächsten Block angebunden.</div>`
          });
        }
      }
    ]
  });
}

function showMaterialForm() {
  const materials = getData("materials");

  openModal({
    title: "Material melden",
    content: `
      <label>Material</label>
      <select id="matName">
        <option value="">Bitte auswählen</option>
        ${materials
          .map(
            (item) =>
              `<option value="${item.Name}">${item.Name}</option>`
          )
          .join("")}
      </select>

      <label>Menge</label>
      <select id="matAmount">
        <option value="">Bitte auswählen</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>

      <label>Einheit</label>
      <select id="matUnit">
        <option value="">Bitte auswählen</option>
        <option value="Stück">Stück</option>
        <option value="Liter">Liter</option>
        <option value="Rollen">Rollen</option>
        <option value="Flaschen">Flaschen</option>
        <option value="Kanister">Kanister</option>
      </select>

      <label>Notiz</label>
      <textarea id="matNote"></textarea>
    `,
    actions: [
      {
        label: "Meldung speichern",
        className: "btn green",
        onClick: () => {
          const material = document.getElementById("matName").value;

          if (!material) {
            showToast("Material fehlt", "ERROR");
            return;
          }

          appState.materialOrders.push({
            Material: material,
            Menge: document.getElementById("matAmount").value,
            Einheit: document.getElementById("matUnit").value,
            Notiz: document.getElementById("matNote").value,
            Status: "OFFEN"
          });

          showToast("Materialmeldung gespeichert", "SUCCESS");
        }
      }
    ]
  });
}

function showHelp() {
  openModal({
    title: "Objekt-Wiki",
    content: `
      <div class="info-card blue">
        Für neue Kräfte und Vertretungen wird hier der geführte Modus angezeigt.
      </div>

      <div class="button-stack">
        <button class="btn blue" onclick="window.facilityShowRooms()">Bereiche öffnen</button>
        <button class="btn red" onclick="window.facilityShowDanger()">Sicherheitsdatenblätter</button>
      </div>
    `
  });
}

function showObjectInfo() {
  const obj = appState.currentObject;

  openModal({
    title: "Objektstammdaten",
    content: `
      <div class="info-card blue">
        <div class="card-title">${obj.Name}</div>
        ${obj.Adresse}
      </div>

      <div class="info-card green">
        <div class="card-title">Zugang</div>
        ${obj.Zugang}
      </div>

      <div class="info-card yellow">
        <div class="card-title">Objektbesonderheiten</div>
        ${obj.Besonderheiten}
      </div>

      <div class="info-card red">
        <div class="card-title">Schließhinweise</div>
        ${obj.Schliesshinweis}
      </div>
    `
  });
}

function showRooms() {
  const rooms = getData("rooms");

  const objectRooms = rooms.filter(
    (room) => room.Objekt_ID === appState.currentObject.Objekt_ID
  );

  openModal({
    title: "Bereiche",
    content: objectRooms
      .map(
        (room) => `
          <button class="room-card" onclick="window.facilityShowRoom('${room.Raum_ID}')">
            ${room.Raumname}
          </button>
        `
      )
      .join("")
  });
}

function showRoomDetails(roomId) {
  const rooms = getData("rooms");
  const tasks = getData("tasks");

  const room = rooms.find((item) => item.Raum_ID === roomId);
  const roomTasks = tasks.filter((task) => task.Raum_ID === roomId);

  if (!room) {
    showToast("Bereich nicht gefunden", "ERROR");
    return;
  }

  openModal({
    title: room.Raumname,
    content: `
      <div class="info-card blue">
        Intervall: ${room.Intervall}<br>
        Sollzeit: ${room.Sollzeit} Minuten<br>
        Priorität: ${room.Prioritaet}
      </div>

      ${roomTasks
        .map(
          (task) => `
            <div class="info-card green">
              <div class="card-title">${task.Bereich}</div>
              Leistung: ${task.Aufgabe}<br><br>
              Material: ${task.Material}<br><br>
              Anleitung: ${task.Anleitung}<br><br>
              <b>Warnung:</b> ${task.Warnung}<br><br>
              Kontrolle: ${task.Kontrolle}
            </div>
          `
        )
        .join("")}
    `
  });
}

function showCleaningPlan() {
  const rooms = getData("rooms");

  const objectRooms = rooms.filter(
    (room) => room.Objekt_ID === appState.currentObject.Objekt_ID
  );

  openModal({
    title: "Leistungsverzeichnis",
    content: objectRooms
      .map(
        (room) => `
          <div class="info-card blue">
            <div class="card-title">${room.Raumname}</div>
            Intervall: ${room.Intervall}<br>
            Sollzeit: ${room.Sollzeit} Minuten
          </div>
        `
      )
      .join("")
  });
}

function showDocuments() {
  openModal({
    title: "Dokumente entfallen",
    content: `
      <div class="info-card blue">
        Dokumente werden in Version 1.1 in Objekt-Wiki, Leistungsverzeichnis und Sicherheitsdatenblätter integriert.
      </div>
    `
  });
}

function showFloorPlan() {
  openModal({
    title: "Grundriss",
    content: `
      <div class="floorplan">
        <b>${appState.currentObject.Name}</b>
        <div class="floor-room">Eingang</div>
        <div class="floor-room">Flur</div>
        <div class="floor-room">Sanitär</div>
        <div class="floor-room">Büro / Nebenräume</div>
      </div>
    `
  });
}

function showWastePlan() {
  openModal({
    title: "Entsorgung",
    content: `
      <div class="info-card blue">
        Mobau: Keine Mülltrennung. Großer Container auf dem Hof mit schwarzem Deckel.
      </div>
    `
  });
}

function showKeys() {
  openModal({
    title: "Schlüsselverwaltung",
    content: `
      <div class="info-card green">
        Schlüssel befinden sich bei der Mitarbeiterin. Nicht weitergeben.
      </div>
    `
  });
}

function showDanger() {
  const materials = getData("materials");

  openModal({
    title: "Sicherheitsdatenblätter",
    content: materials
      .map(
        (item) => `
          <div class="info-card red">
            <div class="card-title">${item.Name}</div>
            Gefahr: ${item.Gefahr}<br><br>
            Dosierung: ${item.Dosierung}<br><br>
            Anwendung: ${item.Anwendung}<br><br>
            Warnung: ${item.Warnung}
          </div>
        `
      )
      .join("")
  });
}

function showTickets() {
  openModal({
    title: "Tickets",
    content:
      appState.tickets
        .map(
          (ticket) => `
            <div class="info-card yellow">
              <div class="card-title">${ticket.Titel}</div>
              ${ticket.Beschreibung}<br>
              Status: ${ticket.Status}
            </div>
          `
        )
        .join("") ||
      `<div class="info-card">Keine Tickets vorhanden.</div>`,
    actions: [
      {
        label: "Neues Ticket",
        className: "btn yellow",
        onClick: showTicketForm
      }
    ]
  });
}

function showTicketForm() {
  openModal({
    title: "Neues Ticket",
    content: `
      <label>Titel</label>
      <input id="ticketTitle">

      <label>Beschreibung</label>
      <textarea id="ticketDescription"></textarea>

      <label>Abrechnungsrelevant</label>
      <select id="ticketBillable">
        <option value="NEIN">Nein</option>
        <option value="JA">Ja</option>
      </select>
    `,
    actions: [
      {
        label: "Speichern",
        className: "btn yellow",
        onClick: () => {
          const title = document.getElementById("ticketTitle").value.trim();

          if (!title) {
            showToast("Titel fehlt", "ERROR");
            return;
          }

          appState.tickets.push({
            Titel: title,
            Beschreibung: document.getElementById("ticketDescription").value,
            Abrechnungsrelevant: document.getElementById("ticketBillable").value,
            Status: "OFFEN"
          });

          showToast("Ticket gespeichert", "SUCCESS");
          showTickets();
        }
      }
    ]
  });
}

function showCustomerRequests() {
  const requests = getData("customerRequests");

  openModal({
    title: "Kundenwünsche",
    content:
      requests
        .map(
          (item) => `
            <div class="info-card yellow">
              <div class="card-title">${item.Titel}</div>
              ${item.Beschreibung}<br><br>
              Fotopflicht: ${item.Fotopflicht}<br>
              Abrechnung: ${item.Abrechnungsrelevant}<br>
              Status: ${item.Status}
            </div>
          `
        )
        .join("") ||
      `<div class="info-card">Keine Kundenwünsche vorhanden.</div>`
  });
}

function showReplacements() {
  openModal({
    title: "Vertretungen",
    content:
      appState.replacementSuggestions
        ?.map(
          (item) => `
            <div class="info-card orange">
              <div class="card-title">${item.Objekt_Name}</div>
              Datum: ${item.Datum}<br>
              Zeit: ${item.Startzeit}–${item.Endzeit}<br>
              Status: ${item.Status}<br>
              Grund: ${item.Grund}
            </div>
          `
        )
        .join("") ||
      `<div class="info-card">Keine Vertretungen vorhanden.</div>`
  });
}

function showWarnings() {
  openModal({
    title: "Auffälligkeiten",
    content:
      appState.aiWarnings
        .map(
          (warning) => `
            <div class="info-card red">
              <div class="card-title">${warning.Titel}</div>
              Typ: ${warning.Typ}<br>
              Schweregrad: ${warning.Schweregrad}<br><br>
              ${warning.Beschreibung}<br><br>
              Vorschlag: <b>${warning.Vorschlag}</b>
            </div>
          `
        )
        .join("") ||
      `<div class="info-card">Keine Auffälligkeiten vorhanden.</div>`
  });
}

function showAnalytics() {
  openModal({
    title: "Auswertungen",
    content: `
      <div class="info-card orange">
        <div class="card-title">Arbeitszeit Gustav Wolf</div>
        Sollzeit: 120 Minuten<br>
        Istzeit: 135 Minuten<br>
        Abweichung: +15 Minuten
      </div>
    `
  });
}

function showCustomerPortal() {
  openModal({
    title: "Kundenportal",
    content: `
      <div class="info-card purple">
        Kunden können Wünsche, Reklamationen und Zusatzleistungen erstellen.
      </div>

      <button class="btn purple" onclick="window.facilityShowCustomerRequests()">Kundenwünsche anzeigen</button>
    `
  });
}

function showAdmin() {
  openModal({
    title: "Admin",
    content: `
      <div class="info-card red">
        Benutzer: ${getData("users").length}<br>
        Objekte: ${getData("objects").length}<br>
        Bereiche: ${getData("rooms").length}<br>
        Materialien: ${getData("materials").length}
      </div>
    `
  });
}

window.facilityShowRoom = showRoomDetails;
window.facilityShowRooms = showRooms;
window.facilityShowDanger = showDanger;
window.facilityShowCustomerRequests = showCustomerRequests;

async function boot() {
  bindModalEvents();
  bindQrEvents();

  const loaded = await loadAppData();

  if (!loaded) {
    document.getElementById("app").innerHTML = `
      <div class="app-shell">
        <div class="section-card">
          Daten konnten nicht geladen werden.
        </div>
      </div>
    `;
    return;
  }

  appState.cachedUsers = getData("users");
  appState.cachedObjects = getData("objects");
  appState.cachedRooms = getData("rooms");
  appState.cachedTasks = getData("tasks");
  appState.cachedMaterials = getData("materials");
  appState.cachedShifts = getData("shifts");
  appState.qrCodes = getData("qrCodes");
  appState.notifications = getData("notifications");
  appState.customerRequests = getData("customerRequests");

  const savedUser = localStorage.getItem("facilityUser");

  if (savedUser) {
    appState.currentUser = JSON.parse(savedUser);
    appState.currentObject = getData("objects")[0];

    renderCheckinStart();
    return;
  }

  renderLogin();
}

export {
  renderDashboard,
  renderCheckinStart
};

boot();
