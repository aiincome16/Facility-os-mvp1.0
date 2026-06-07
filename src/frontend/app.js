const appState = {
  currentUser: null,
  currentObject: null,
  currentRoom: null,
  currentShift: null,
  notifications: [],
  tickets: [],
  customerRequests: [],
  complaints: [],
  materialOrders: [],
  replacementRequests: [],
  aiWarnings: [],
  analytics: [],
  helpLevel: 1,
  guidedMode: false
};

const users = [
  {
    User_ID: "USR-001",
    Vorname: "Kristin",
    Nachname: "Rabener",
    Rolle: "ADMIN",
    Email: "allrountin@gmail.com",
    Passwort: "Test123!",
    Wohnort: "Eisleben",
    Auto: "JA",
    Score: 95,
    Objektkenntnis: "JA",
    Hilfestufe: 1,
    Aktiv: "JA"
  },
  {
    User_ID: "USR-002",
    Vorname: "Anna",
    Nachname: "Becker",
    Rolle: "MITARBEITER",
    Email: "anna@test.de",
    Passwort: "Test123!",
    Wohnort: "Nebra",
    Auto: "JA",
    Score: 96,
    Objektkenntnis: "JA",
    Hilfestufe: 1,
    Aktiv: "JA"
  },
  {
    User_ID: "USR-003",
    Vorname: "Lisa",
    Nachname: "Schneider",
    Rolle: "MITARBEITER",
    Email: "lisa@test.de",
    Passwort: "Test123!",
    Wohnort: "Eisleben",
    Auto: "JA",
    Score: 88,
    Objektkenntnis: "JA",
    Hilfestufe: 1,
    Aktiv: "JA"
  },
  {
    User_ID: "USR-004",
    Vorname: "Kevin",
    Nachname: "Müller",
    Rolle: "MITARBEITER",
    Email: "kevin@test.de",
    Passwort: "Test123!",
    Wohnort: "Querfurt",
    Auto: "NEIN",
    Score: 42,
    Objektkenntnis: "NEIN",
    Hilfestufe: 4,
    Aktiv: "JA"
  },
  {
    User_ID: "USR-005",
    Vorname: "Sarah",
    Nachname: "Mueller",
    Rolle: "OBJEKTLEITER",
    Email: "sarah@test.de",
    Passwort: "Test123!",
    Wohnort: "Halle",
    Auto: "JA",
    Score: 90,
    Objektkenntnis: "JA",
    Hilfestufe: 2,
    Aktiv: "JA"
  },
  {
    User_ID: "USR-006",
    Vorname: "Mobau",
    Nachname: "Kunde",
    Rolle: "KUNDE",
    Email: "kunde@test.de",
    Passwort: "Test123!",
    Aktiv: "JA"
  }
];

const objects = [
  {
    Objekt_ID: "OBJ-3707",
    Name: "Gustav Wolf Nebra",
    Adresse: "Am Bahnhof 1A, 06642 Nebra",
    QR_Code: "QR-GUSTAV-WOLF-NEBRA",
    GPS_Aktiv: "JA",
    Zugang: "Schlüssel für Putzraum vorhanden.",
    Schluessel: "Schlüssel bei Mitarbeiterin.",
    Besonderheiten: "Tägliche Bereiche im UG und Produktion. Büros wöchentlich. Nass und trocken nachwischen.",
    Schliesshinweis: "Nach Abschluss alle genutzten Bereiche kontrollieren."
  },
  {
    Objekt_ID: "OBJ-MOBAU",
    Name: "Mobau Eisleben",
    Adresse: "Querfurter Str. 6, 06295 Eisleben",
    QR_Code: "QR-MOBAU",
    GPS_Aktiv: "JA",
    Zugang: "Dienstag und Donnerstag ab 17:30 Uhr.",
    Schluessel: "Schlüssel bei Mitarbeiterin.",
    Besonderheiten: "Boden nur nass wischen. Kein Trockenwischen. Müll in großen Container mit schwarzem Deckel.",
    Schliesshinweis: "Tür vom Ausstellungsraum Richtung Toilette/Umkleide verschließen. Drei Schalter im Stromkasten runter. Licht aus."
  }
];

const rooms = [
  {
    Raum_ID: "ROOM-3707-HWC",
    Objekt_ID: "OBJ-3707",
    Bereich: "UG",
    Raumname: "Herren-WC",
    Intervall: "5x wöchentlich",
    Sollzeit: "20",
    Prioritaet: "HOCH"
  },
  {
    Raum_ID: "ROOM-3707-DUSCHE",
    Objekt_ID: "OBJ-3707",
    Bereich: "UG",
    Raumname: "Duschen Herren",
    Intervall: "5x wöchentlich",
    Sollzeit: "18",
    Prioritaet: "HOCH"
  },
  {
    Raum_ID: "ROOM-3707-UMKLEIDE",
    Objekt_ID: "OBJ-3707",
    Bereich: "UG",
    Raumname: "Umkleiden",
    Intervall: "5x wöchentlich",
    Sollzeit: "25",
    Prioritaet: "NORMAL"
  },
  {
    Raum_ID: "ROOM-MOBAU-WC-H",
    Objekt_ID: "OBJ-MOBAU",
    Bereich: "Sanitär",
    Raumname: "Männer-WC mit Dusche",
    Intervall: "Dienstag und Donnerstag",
    Sollzeit: "25",
    Prioritaet: "HOCH"
  },
  {
    Raum_ID: "ROOM-MOBAU-VERKAUF",
    Objekt_ID: "OBJ-MOBAU",
    Bereich: "Verkauf",
    Raumname: "Verkaufshalle / Ausstellung",
    Intervall: "Dienstag und Donnerstag",
    Sollzeit: "45",
    Prioritaet: "NORMAL"
  }
];

const tasks = [
  {
    Task_ID: "TASK-001",
    Raum_ID: "ROOM-3707-HWC",
    Bereich: "WC",
    Aufgabe: "WC reinigen",
    Material: "Powerfix Gel / SR11 nach Vorgabe",
    Anleitung: "Nur im WC verwenden. Einwirken lassen, bürsten, nachspülen.",
    Warnung: "Powerfix niemals auf Armaturen verwenden.",
    Kontrolle: "WC sauber, keine Rückstände, Geruch neutral."
  },
  {
    Task_ID: "TASK-002",
    Raum_ID: "ROOM-3707-HWC",
    Bereich: "Waschbecken",
    Aufgabe: "Waschbecken und Armaturen reinigen",
    Material: "KO33, bei Kalk SR11 gezielt",
    Anleitung: "Feucht reinigen. Armaturen trocken nachwischen.",
    Warnung: "Powerfix greift Armaturen an.",
    Kontrolle: "Keine Wasserflecken, keine Kalkränder."
  },
  {
    Task_ID: "TASK-003",
    Raum_ID: "ROOM-3707-HWC",
    Bereich: "Boden",
    Aufgabe: "Boden wischen",
    Material: "Veriprop / Turbo bei starker Verschmutzung",
    Anleitung: "Nass wischen und trocken nachwischen.",
    Warnung: "Nasse Bereiche absichern.",
    Kontrolle: "Boden sauber und trocken."
  },
  {
    Task_ID: "TASK-004",
    Raum_ID: "ROOM-MOBAU-WC-H",
    Bereich: "Sanitär",
    Aufgabe: "WC, Pissoir, Waschbecken und Dusche reinigen",
    Material: "SR11, KO33, Powerfix nur WC",
    Anleitung: "Sanitär reinigen. Armaturen nur mit geeignetem Mittel behandeln.",
    Warnung: "Powerfix nicht auf Armaturen.",
    Kontrolle: "Sanitär sauber, keine sichtbaren Rückstände."
  },
  {
    Task_ID: "TASK-005",
    Raum_ID: "ROOM-MOBAU-VERKAUF",
    Bereich: "Boden",
    Aufgabe: "Verkaufshalle und Ausstellung wischen",
    Material: "Veriprop / Turbo bei Bedarf",
    Anleitung: "Boden nass wischen.",
    Warnung: "Kein Trockenwischen bei Mobau.",
    Kontrolle: "Boden sichtbar sauber."
  }
];

const materials = [
  {
    Name: "SR11",
    Gefahr: "Verursacht schwere Verätzungen und Augenschäden.",
    Dosierung: "10–50 ml / 10 Liter.",
    Anwendung: "Gegen Kalk und Sanitärverschmutzungen.",
    Warnung: "Handschuhe tragen. Nicht mischen."
  },
  {
    Name: "KO33",
    Gefahr: "Bei sachgemäßer Anwendung keine bedeutende Gefahr.",
    Dosierung: "40–100 ml / 10 Liter.",
    Anwendung: "Oberflächen, Spiegel, Armaturen.",
    Warnung: "Nicht direkt auf empfindliche Flächen sprühen."
  },
  {
    Name: "Veriprop",
    Gefahr: "Kontakt mit Augen vermeiden.",
    Dosierung: "40 ml / 8 Liter.",
    Anwendung: "Boden-Unterhaltsreinigung.",
    Warnung: "Rutschgefahr bei nassem Boden."
  },
  {
    Name: "Powerfix Gel",
    Gefahr: "Nur WC. Nicht auf Armaturen verwenden.",
    Dosierung: "Unverdünnt im WC.",
    Anwendung: "WC und Urinal.",
    Warnung: "Greift Armaturen an."
  }
];

const shifts = [
  {
    Shift_ID: "SHIFT-001",
    Mitarbeiter_ID: "USR-002",
    Objekt_ID: "OBJ-3707",
    Objekt_Name: "Gustav Wolf Nebra",
    Datum: "2026-05-29",
    Startzeit: "07:00",
    Endzeit: "09:00",
    Status: "GEPLANT",
    Checkin_Zeit: "",
    Checkout_Zeit: ""
  },
  {
    Shift_ID: "SHIFT-002",
    Mitarbeiter_ID: "USR-003",
    Objekt_ID: "OBJ-MOBAU",
    Objekt_Name: "Mobau Eisleben",
    Datum: "2026-05-28",
    Startzeit: "17:30",
    Endzeit: "19:30",
    Status: "GEPLANT",
    Checkin_Zeit: "",
    Checkout_Zeit: ""
  }
];

const qrCodes = [
  {
    QR_ID: "QR-GUSTAV-WOLF-NEBRA",
    Objekt_ID: "OBJ-3707",
    Typ: "OBJEKT",
    Aktiv: "JA"
  },
  {
    QR_ID: "QR-MOBAU",
    Objekt_ID: "OBJ-MOBAU",
    Typ: "OBJEKT",
    Aktiv: "JA"
  }
];

appState.notifications = [
  {
    Message_ID: "MSG-001",
    Typ: "KUNDENWUNSCH",
    Titel: "Zusatzaufgabe bei Gustav Wolf",
    Nachricht: "Bitte heute Waschbecken im Herren-WC besonders auf Kalk prüfen.",
    Prioritaet: "HOCH",
    Status: "OFFEN",
    Gelesen: "NEIN"
  }
];

appState.customerRequests = [
  {
    Request_ID: "REQ-001",
    Objekt_ID: "OBJ-3707",
    Titel: "Waschbecken besonders prüfen",
    Beschreibung: "Kalk am Waschbecken kontrollieren.",
    Fotopflicht: "NEIN",
    Abrechnungsrelevant: "NEIN",
    Status: "OFFEN"
  }
];

appState.replacementRequests = [
  {
    Substitution_ID: "SUB-001",
    Objekt_Name: "Gustav Wolf Nebra",
    Datum: "2026-05-29",
    Startzeit: "07:00",
    Endzeit: "09:00",
    Status: "ANGEFRAGT",
    Grund: "Krankmeldung"
  }
];

appState.aiWarnings = [
  {
    Titel: "Auffälliger Mitarbeiter-Score",
    Typ: "MITARBEITER_SCORE",
    Schweregrad: "HOCH",
    Beschreibung: "Kevin Müller hat einen Score von 42.",
    Vorschlag: "Nachschulung und engere Qualitätskontrolle prüfen."
  }
];

function openModal({ title = "Facility-OS", content = "", actions = [] }) {
  document.getElementById("modalTitle").innerHTML = title;
  document.getElementById("modalContent").innerHTML = content;

  const actionsEl = document.getElementById("modalActions");
  actionsEl.innerHTML = "";

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.className = action.className || "btn";
    button.innerText = action.label;
    button.addEventListener("click", action.onClick);
    actionsEl.appendChild(button);
  });

  document.getElementById("modalOverlay").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
}

function showToast(message, type = "INFO") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "toast";
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

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
        <button id="demoManagerBtn" class="btn secondary">Demo Objektleiter</button>
        <button id="demoAdminBtn" class="btn secondary">Demo Admin</button>
        <button id="demoCustomerBtn" class="btn secondary">Demo Kunde</button>
      </div>
    </div>
  `;

  document.getElementById("loginBtn").addEventListener("click", loginFromForm);
  document.getElementById("demoEmployeeBtn").addEventListener("click", () => loginUser("anna@test.de", "Test123!"));
  document.getElementById("demoManagerBtn").addEventListener("click", () => loginUser("sarah@test.de", "Test123!"));
  document.getElementById("demoAdminBtn").addEventListener("click", () => loginUser("allrountin@gmail.com", "Test123!"));
  document.getElementById("demoCustomerBtn").addEventListener("click", () => loginUser("kunde@test.de", "Test123!"));
}

function loginFromForm() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  loginUser(email, password);
}

function loginUser(email, password) {
  const user = users.find((item) => item.Email.toLowerCase() === email.toLowerCase());

  if (!user) {
    showToast("Benutzer nicht gefunden", "ERROR");
    return;
  }

  if (user.Passwort !== password) {
    showToast("Falsches Passwort", "ERROR");
    return;
  }

  appState.currentUser = user;
  appState.currentObject = user.Rolle === "KUNDE" ? objects[1] : objects[0];
  appState.helpLevel = Number(user.Hilfestufe || 1);
  appState.guidedMode = user.Objektkenntnis === "NEIN" || appState.helpLevel >= 4;

  localStorage.setItem("facilityUser", JSON.stringify(user));

  renderDashboard();
  showToast("Login erfolgreich", "SUCCESS");
}

function logout() {
  localStorage.removeItem("facilityUser");
  appState.currentUser = null;
  renderLogin();
}

function renderDashboard() {
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

  bindEvents();
}

function bindEvents() {
  document.getElementById("modalCloseBtn").onclick = closeModal;
  document.getElementById("closeQrBtn").onclick = closeQrScanner;
  document.getElementById("manualQrBtn").onclick = manualQrInput;

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
}

function openQrScanner() {
  document.getElementById("qrOverlay").classList.remove("hidden");
}

function closeQrScanner() {
  document.getElementById("qrOverlay").classList.add("hidden");
}

function manualQrInput() {
  const code = prompt("QR-Code eingeben");
  if (code) processQr(code);
}

function processQr(code) {
  const qr = qrCodes.find((item) => item.QR_ID.toLowerCase() === code.toLowerCase());

  if (!qr) {
    showToast("QR-Code nicht gefunden", "ERROR");
    return;
  }

  const object = objects.find((item) => item.Objekt_ID === qr.Objekt_ID);
  appState.currentObject = object;

  closeQrScanner();
  startOrEndShift();

  if (appState.customerRequests.some((item) => item.Objekt_ID === object.Objekt_ID && item.Status !== "ERLEDIGT")) {
    showCustomerRequests();
  }
}

function startOrEndShift() {
  const user = appState.currentUser;

  const shift = shifts.find(
    (item) =>
      item.Mitarbeiter_ID === user.User_ID &&
      item.Objekt_ID === appState.currentObject.Objekt_ID &&
      item.Status !== "ABGESCHLOSSEN"
  );

  if (!shift) {
    showToast("Keine offene Schicht gefunden", "ERROR");
    return;
  }

  if (!shift.Checkin_Zeit) {
    shift.Checkin_Zeit = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    shift.Status = "GESTARTET";
    appState.currentShift = shift;
    showToast("Schicht gestartet", "SUCCESS");

    if (appState.guidedMode) {
      showHelp();
    }

    return;
  }

  if (!shift.Checkout_Zeit) {
    shift.Checkout_Zeit = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    shift.Status = "ABGESCHLOSSEN";
    showToast("Schicht beendet", "SUCCESS");
    showMyShifts();
  }
}

function showMyShifts() {
  const user = appState.currentUser;
  const userShifts = shifts.filter((item) => item.Mitarbeiter_ID === user.User_ID);

  openModal({
    title: "Meine Schichten",
    content: userShifts.map(formatShift).join("") || `<div class="info-card">Keine Schichten vorhanden.</div>`
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
  openModal({
    title: "Postfach",
    content: appState.notifications.map((msg) => `
      <div class="info-card ${msg.Gelesen === "JA" ? "" : "yellow"}">
        <div class="card-title">${msg.Titel}</div>
        ${msg.Nachricht}<br><br>
        Status: ${msg.Status}
      </div>
    `).join("") || `<div class="info-card">Keine Nachrichten vorhanden.</div>`
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

      <label>Grund</label>
      <textarea id="sickReason"></textarea>
    `,
    actions: [
      {
        label: "Speichern",
        className: "btn green",
        onClick: () => {
          showToast("Krankmeldung gespeichert. Vertretung wird benötigt.", "SUCCESS");
          closeModal();
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
          closeModal();
        }
      }
    ]
  });
}

function showMaterialForm() {
  openModal({
    title: "Material melden",
    content: `
      <label>Material</label>
      <input id="matName" placeholder="z. B. SR11">

      <label>Menge</label>
      <input id="matAmount" placeholder="z. B. 5">

      <label>Einheit</label>
      <input id="matUnit" placeholder="z. B. Liter, Stück, Rollen">

      <label>Notiz</label>
      <textarea id="matNote"></textarea>
    `,
    actions: [
      {
        label: "Meldung speichern",
        className: "btn green",
        onClick: () => {
          const material = document.getElementById("matName").value.trim();

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
          closeModal();
        }
      }
    ]
  });
}

function showHelp() {
  openModal({
    title: "Hilfe / Objektwissen",
    content: `
      <div class="info-card blue">
        Für neue Kräfte und Vertretungen wird hier der geführte Modus angezeigt.
      </div>

      <div class="button-stack">
        <button class="btn blue" onclick="window.facilityShowRooms()">Räume öffnen</button>
        <button class="btn red" onclick="window.facilityShowDanger()">Gefahrenhinweise</button>
      </div>
    `
  });
}

function showObjectInfo() {
  const obj = appState.currentObject;

  openModal({
    title: "Objektinfo",
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
        <div class="card-title">Besonderheiten</div>
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
  const objectRooms = rooms.filter((room) => room.Objekt_ID === appState.currentObject.Objekt_ID);

  openModal({
    title: "Räume",
    content: objectRooms.map((room) => `
      <button class="room-card" onclick="window.facilityShowRoom('${room.Raum_ID}')">
        ${room.Raumname}
      </button>
    `).join("")
  });
}

function showRoomDetails(roomId) {
  const room = rooms.find((item) => item.Raum_ID === roomId);
  const roomTasks = tasks.filter((task) => task.Raum_ID === roomId);

  openModal({
    title: room.Raumname,
    content: `
      <div class="info-card blue">
        Intervall: ${room.Intervall}<br>
        Sollzeit: ${room.Sollzeit} Minuten<br>
        Priorität: ${room.Prioritaet}
      </div>

      ${roomTasks.map((task) => `
        <div class="info-card green">
          <div class="card-title">${task.Bereich}</div>
          Aufgabe: ${task.Aufgabe}<br><br>
          Material: ${task.Material}<br><br>
          Anleitung: ${task.Anleitung}<br><br>
          <b>Warnung:</b> ${task.Warnung}<br><br>
          Kontrolle: ${task.Kontrolle}
        </div>
      `).join("")}
    `
  });
}

function showCleaningPlan() {
  const objectRooms = rooms.filter((room) => room.Objekt_ID === appState.currentObject.Objekt_ID);

  openModal({
    title: "Putzplan",
    content: objectRooms.map((room) => `
      <div class="info-card blue">
        <div class="card-title">${room.Raumname}</div>
        Intervall: ${room.Intervall}<br>
        Sollzeit: ${room.Sollzeit} Minuten
      </div>
    `).join("")
  });
}

function showDocuments() {
  openModal({
    title: "Dokumente",
    content: `
      <div class="info-card blue">Leistungsbeschreibung Gustav Wolf – Platzhalter</div>
      <div class="info-card red">Sicherheitsdatenblatt SR11 – Platzhalter</div>
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
    title: "Müllplan",
    content: `
      <div class="info-card blue">
        Mobau: Keine Mülltrennung. Großer Container auf dem Hof mit schwarzem Deckel.
      </div>
    `
  });
}

function showKeys() {
  openModal({
    title: "Schlüssel",
    content: `
      <div class="info-card green">
        Schlüssel befinden sich bei der Mitarbeiterin. Nicht weitergeben.
      </div>
    `
  });
}

function showDanger() {
  openModal({
    title: "Gefahren & Anwendung",
    content: materials.map((item) => `
      <div class="info-card red">
        <div class="card-title">${item.Name}</div>
        Gefahr: ${item.Gefahr}<br><br>
        Dosierung: ${item.Dosierung}<br><br>
        Anwendung: ${item.Anwendung}<br><br>
        Warnung: ${item.Warnung}
      </div>
    `).join("")
  });
}

function showTickets() {
  openModal({
    title: "Tickets",
    content: appState.tickets.map((ticket) => `
      <div class="info-card yellow">
        <div class="card-title">${ticket.Titel}</div>
        ${ticket.Beschreibung}<br>
        Status: ${ticket.Status}
      </div>
    `).join("") || `<div class="info-card">Keine Tickets vorhanden.</div>`,
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
  openModal({
    title: "Kundenwünsche",
    content: appState.customerRequests.map((item) => `
      <div class="info-card yellow">
        <div class="card-title">${item.Titel}</div>
        ${item.Beschreibung}<br><br>
        Fotopflicht: ${item.Fotopflicht}<br>
        Abrechnung: ${item.Abrechnungsrelevant}<br>
        Status: ${item.Status}
      </div>
    `).join("") || `<div class="info-card">Keine Kundenwünsche vorhanden.</div>`
  });
}

function showReplacements() {
  openModal({
    title: "Vertretungen",
    content: appState.replacementRequests.map((item) => `
      <div class="info-card orange">
        <div class="card-title">${item.Objekt_Name}</div>
        Datum: ${item.Datum}<br>
        Zeit: ${item.Startzeit}–${item.Endzeit}<br>
        Status: ${item.Status}<br>
        Grund: ${item.Grund}
      </div>
    `).join("")
  });
}

function showWarnings() {
  openModal({
    title: "KI-Warnungen",
    content: appState.aiWarnings.map((warning) => `
      <div class="info-card red">
        <div class="card-title">${warning.Titel}</div>
        Typ: ${warning.Typ}<br>
        Schweregrad: ${warning.Schweregrad}<br><br>
        ${warning.Beschreibung}<br><br>
        Vorschlag: <b>${warning.Vorschlag}</b>
      </div>
    `).join("")
  });
}

function showAnalytics() {
  openModal({
    title: "Analysen",
    content: `
      <div class="info-card orange">
        <div class="card-title">Arbeitszeit Gustav Wolf</div>
        Sollzeit: 120 Minuten<br>
        Istzeit: 135 Minuten<br>
        Abweichung: +15 Minuten
      </div>

      <div class="info-card red">
        <div class="card-title">Mitarbeiter Kevin Müller</div>
        Score: 42<br>
        Empfehlung: Nachschulung und Kontrolle.
      </div>
    `
  });
}

function showCustomerPortal() {
  openModal({
    title: "Kundenportal",
    content: `
      <div class="info-card purple">
        Kunden können Wünsche, Beschwerden und Zusatzleistungen erstellen.
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
        Benutzer: ${users.length}<br>
        Objekte: ${objects.length}<br>
        Räume: ${rooms.length}<br>
        Materialien: ${materials.length}
      </div>
    `
  });
}

window.facilityShowRoom = showRoomDetails;
window.facilityShowRooms = showRooms;
window.facilityShowDanger = showDanger;
window.facilityShowCustomerRequests = showCustomerRequests;

function boot() {
  document.getElementById("modalCloseBtn").onclick = closeModal;
  document.getElementById("closeQrBtn").onclick = closeQrScanner;
  document.getElementById("manualQrBtn").onclick = manualQrInput;

  const savedUser = localStorage.getItem("facilityUser");

  if (savedUser) {
    appState.currentUser = JSON.parse(savedUser);
    appState.currentObject = objects[0];
    renderDashboard();
    return;
  }

  renderLogin();
}

boot();