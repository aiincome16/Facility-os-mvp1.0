import { googleSheets } from "../services/googleSheets.js";

import {
  appState,
  setCurrentUser,
  setCurrentObject
} from "./appState.js";

import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";
import { showToast } from "./toastUi.js";

import {
  openQrScanner,
  bindQrEvents
} from "./qrUi.js";

import {
  bindShiftEvents,
  showMyShifts
} from "./shiftUi.js";

import { bindObjectEvents } from "./objectUi.js";
import { bindRoomEvents } from "./roomUi.js";
import { bindNotificationEvents } from "./notificationUi.js";
import { bindMaterialEvents } from "./materialUi.js";
import { bindTicketEvents } from "./ticketUi.js";
import { bindReplacementEvents } from "./replacementUi.js";
import { bindManagerEvents } from "./managerUi.js";
import { bindAnalyticsEvents } from "./analyticsUi.js";
import { bindCustomerEvents } from "./customerUi.js";
import { bindAdminEvents } from "./adminUi.js";
import { bindObjectWikiEvents } from "./objectWikiUi.js";

const demoUsers = [
  {
    User_ID: "USR-001",
    Vorname: "Kristin",
    Nachname: "Rabener",
    Rolle: "ADMIN",
    Email: "allrountin@gmail.com",
    Passwort: "Test123!",
    Wohnort: "Eisleben",
    Auto: "JA",
    Score: "95",
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
    Score: "96",
    Objektkenntnis: "JA",
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
    Score: "88",
    Objektkenntnis: "JA",
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
    Score: "42",
    Objektkenntnis: "NEIN",
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
    Score: "90",
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

const demoObjects = [
  {
    Objekt_ID: "OBJ-3707",
    Kunde_ID: "KND-13607",
    Name: "Gustav Wolf Nebra",
    Adresse: "Am Bahnhof 1A, 06642 Nebra",
    QR_Code: "QR-GUSTAV-WOLF-NEBRA",
    GPS_Aktiv: "JA",
    Ansprechpartner: "Objektkontakt",
    Telefon: "-",
    Zugang: "Schlüssel für Putzraum vorhanden.",
    Schluessel: "Schlüssel bei Mitarbeiterin.",
    Besonderheiten: "Tägliche Bereiche im UG und Produktion. Büros wöchentlich. Nass und trocken nachwischen.",
    Schliesshinweis: "Nach Abschluss alle genutzten Bereiche kontrollieren."
  },
  {
    Objekt_ID: "OBJ-MOBAU",
    Kunde_ID: "KND-MOBAU",
    Name: "Mobau Eisleben",
    Adresse: "Querfurter Str. 6, 06295 Eisleben",
    QR_Code: "QR-MOBAU",
    GPS_Aktiv: "JA",
    Ansprechpartner: "Objektkontakt",
    Telefon: "-",
    Zugang: "Reinigung Dienstag und Donnerstag ab 17:30 Uhr.",
    Schluessel: "Schlüssel bei Mitarbeiterin.",
    Besonderheiten: "Boden nur nass wischen. Kein Trockenwischen. Müll in großen Container mit schwarzem Deckel.",
    Schliesshinweis: "Tür vom Ausstellungsraum Richtung Toilette/Umkleide verschließen. Drei Schalter im Stromkasten runter. Licht aus."
  }
];

const demoRooms = [
  {
    Raum_ID: "ROOM-3707-UG-HWC",
    Objekt_ID: "OBJ-3707",
    Bereich: "UG",
    Raumname: "Herren-WC",
    Intervall: "5x wöchentlich",
    Sollzeit: "20",
    Prioritaet: "HOCH"
  },
  {
    Raum_ID: "ROOM-3707-UG-DUSCHE",
    Objekt_ID: "OBJ-3707",
    Bereich: "UG",
    Raumname: "Duschen Herren",
    Intervall: "5x wöchentlich",
    Sollzeit: "18",
    Prioritaet: "HOCH"
  },
  {
    Raum_ID: "ROOM-3707-UG-UMKLEIDE",
    Objekt_ID: "OBJ-3707",
    Bereich: "UG",
    Raumname: "Umkleiden",
    Intervall: "5x wöchentlich",
    Sollzeit: "25",
    Prioritaet: "NORMAL"
  },
  {
    Raum_ID: "ROOM-3707-OG-BUERO",
    Objekt_ID: "OBJ-3707",
    Bereich: "OG",
    Raumname: "Büros OG",
    Intervall: "1x wöchentlich",
    Sollzeit: "30",
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

const demoTasks = [
  {
    Task_ID: "TASK-001",
    Raum_ID: "ROOM-3707-UG-HWC",
    Bereich: "Toilette",
    Aufgabe: "WC reinigen",
    Material: "Powerfix Gel / SR11 nach Vorgabe",
    Anleitung: "WC-Gel nur im WC verwenden. Einwirken lassen, mit Bürste reinigen und nachspülen.",
    Warnung: "Powerfix niemals auf Armaturen verwenden.",
    Kontrolle: "WC sauber, keine Rückstände, Geruch neutral."
  },
  {
    Task_ID: "TASK-002",
    Raum_ID: "ROOM-3707-UG-HWC",
    Bereich: "Waschbecken",
    Aufgabe: "Waschbecken und Armaturen reinigen",
    Material: "KO33, bei Kalk SR11 gezielt",
    Anleitung: "Feucht reinigen. Armaturen danach trocken nachwischen.",
    Warnung: "Powerfix greift Armaturen an. Nicht verwenden.",
    Kontrolle: "Keine Wasserflecken, keine Kalkränder."
  },
  {
    Task_ID: "TASK-003",
    Raum_ID: "ROOM-3707-UG-HWC",
    Bereich: "Boden",
    Aufgabe: "Boden wischen",
    Material: "Veriprop / Turbo bei starker Verschmutzung",
    Anleitung: "Nass wischen und anschließend trocken nachwischen.",
    Warnung: "Nasse Bereiche absichern.",
    Kontrolle: "Boden sauber und trocken."
  },
  {
    Task_ID: "TASK-004",
    Raum_ID: "ROOM-MOBAU-WC-H",
    Bereich: "Sanitär",
    Aufgabe: "WC, Pissoir, Waschbecken und Dusche reinigen",
    Material: "SR11, KO33, Powerfix nur WC",
    Anleitung: "Sanitär reinigen. Armaturen mit geeignetem Mittel behandeln.",
    Warnung: "Powerfix nicht auf Armaturen. Bei Mobau kein Trockenwischen Boden.",
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

const demoMaterials = [
  {
    Material_ID: "MAT-SR11",
    Name: "SR11",
    Gefahr: "Verursacht schwere Verätzungen und Augenschäden.",
    Dosierung: "10–50 ml / 10 Liter, WC ggf. unverdünnt nach Vorgabe.",
    Anwendung: "Gegen Kalk und Sanitärverschmutzungen.",
    PDF: "Sicherheitsdatenblatt SR11"
  },
  {
    Material_ID: "MAT-KO33",
    Name: "KO33 Alkoholreiniger",
    Gefahr: "Keine bedeutende Gefahr bei sachgemäßer Anwendung.",
    Dosierung: "40–100 ml / 10 Liter.",
    Anwendung: "Oberflächen, Spiegel, Armaturen.",
    PDF: "Sicherheitsdatenblatt KO33"
  },
  {
    Material_ID: "MAT-VERIPROP",
    Name: "Veriprop",
    Gefahr: "Kontakt mit Augen vermeiden.",
    Dosierung: "40 ml / 8 Liter.",
    Anwendung: "Boden-Unterhaltsreinigung.",
    PDF: "Sicherheitsdatenblatt Veriprop"
  },
  {
    Material_ID: "MAT-POWERFIX",
    Name: "Powerfix Gel",
    Gefahr: "Nur WC. Nicht auf Armaturen verwenden.",
    Dosierung: "Unverdünnt im WC.",
    Anwendung: "WC und Urinal.",
    PDF: "Sicherheitsdatenblatt Powerfix"
  }
];

const demoShifts = [
  {
    Shift_ID: "SHIFT-001",
    Mitarbeiter_ID: "USR-002",
    Objekt_ID: "OBJ-3707",
    Objekt_Name: "Gustav Wolf Nebra",
    Datum: "2026-05-29",
    Startzeit: "07:00",
    Endzeit: "09:00",
    Sollzeit_Minuten: "120",
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
    Sollzeit_Minuten: "120",
    Status: "GEPLANT",
    Checkin_Zeit: "",
    Checkout_Zeit: ""
  }
];

const demoMessages = [
  {
    Message_ID: "MSG-001",
    Empfaenger_ID: "USR-002",
    Typ: "KUNDENWUNSCH",
    Titel: "Zusatzaufgabe bei Gustav Wolf",
    Nachricht: "Bitte heute Waschbecken im Herren-WC besonders auf Kalk prüfen.",
    Prioritaet: "HOCH",
    Status: "OFFEN",
    Gelesen: "NEIN"
  }
];

function registerDemoData() {
  googleSheets.registerSheet("01_Users", demoUsers);
  googleSheets.registerSheet("02_Objects", demoObjects);
  googleSheets.registerSheet("03_Rooms", demoRooms);
  googleSheets.registerSheet("04_Tasks", demoTasks);
  googleSheets.registerSheet("05_Shifts", demoShifts);
  googleSheets.registerSheet("13_Materials", demoMaterials);
  googleSheets.registerSheet("46_Mailbox", demoMessages);

  appState.cachedUsers = demoUsers;
  appState.cachedObjects = demoObjects;
  appState.cachedRooms = demoRooms;
  appState.cachedTasks = demoTasks;
  appState.cachedMaterials = demoMaterials;
  appState.cachedDocuments = [
    {
      Titel: "Leistungsbeschreibung Gustav Wolf",
      Typ: "PDF",
      URL: "Platzhalter"
    },
    {
      Titel: "Sicherheitsdatenblatt SR11",
      Typ: "PDF",
      URL: "Platzhalter"
    }
  ];
  appState.cachedWaste = [
    {
      Objekt_ID: "OBJ-MOBAU",
      Muellart: "Restmüll",
      Intervall: "Dienstag und Donnerstag",
      Standort: "Großer Container auf dem Hof mit schwarzem Deckel",
      Hinweis: "Keine Mülltrennung."
    }
  ];
  appState.cachedKeys = [
    {
      Objekt_ID: "OBJ-3707",
      Schluessel_Name: "Putzraum-Schlüssel",
      Standort: "Bei Mitarbeiterin",
      Status: "AUSGEGEBEN",
      Hinweis: "Schlüssel nicht weitergeben."
    }
  ];
  appState.notifications = demoMessages;
  appState.cachedShifts = demoShifts;
  appState.materialOrders = [];
  appState.tickets = [];
  appState.customerRequests = [];
  appState.complaints = [];
  appState.replacementSuggestions = [
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
  appState.analytics = [
    {
      Objekt_ID: "OBJ-3707",
      Objekt_Name: "Gustav Wolf Nebra",
      Sollzeit_Gesamt: "120",
      Istzeit_Gesamt: "135",
      Abweichung: "+15"
    }
  ];
}

function renderLogin() {
  const app = document.getElementById("app");

  app.innerHTML = `
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

        <button id="loginBtn" class="btn green">
          Einloggen
        </button>

        <hr>

        <button id="demoEmployeeBtn" class="btn secondary">
          Demo Mitarbeiter
        </button>

        <button id="demoManagerBtn" class="btn secondary">
          Demo Objektleiter
        </button>

        <button id="demoAdminBtn" class="btn secondary">
          Demo Admin
        </button>
      </div>
    </div>
  `;

  document
    .getElementById("loginBtn")
    ?.addEventListener("click", loginFromForm);

  document
    .getElementById("demoEmployeeBtn")
    ?.addEventListener("click", () => loginUser("anna@test.de", "Test123!"));

  document
    .getElementById("demoManagerBtn")
    ?.addEventListener("click", () => loginUser("sarah@test.de", "Test123!"));

  document
    .getElementById("demoAdminBtn")
    ?.addEventListener("click", () => loginUser("allrountin@gmail.com", "Test123!"));
}

function loginFromForm() {
  const email = document.getElementById("loginEmail")?.value || "";
  const password = document.getElementById("loginPassword")?.value || "";

  loginUser(email, password);
}

function loginUser(email, password) {
  const user = googleSheets.findByField(
    "01_Users",
    "Email",
    email
  );

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

  setCurrentUser(user);

  const firstObject =
    user.Rolle === "KUNDE"
      ? demoObjects[1]
      : demoObjects[0];

  setCurrentObject(firstObject);

  localStorage.setItem(
    "facilityUser",
    JSON.stringify(user)
  );

  showToast("Login erfolgreich", "SUCCESS");

  renderApp();
}

function renderApp() {
  renderDashboard();
  bindAllEvents();
}

function bindAllEvents() {
  bindModalEvents();
  bindQrEvents();

  document
    .getElementById("btnStartShift")
    ?.addEventListener("click", openQrScanner);

  bindShiftEvents();
  bindObjectEvents();
  bindRoomEvents();
  bindNotificationEvents();
  bindMaterialEvents();
  bindTicketEvents();
  bindReplacementEvents();
  bindManagerEvents();
  bindAnalyticsEvents();
  bindCustomerEvents();
  bindAdminEvents();
  bindObjectWikiEvents();

  document
    .getElementById("btnMyShifts")
    ?.addEventListener("click", showMyShifts);
}

function boot() {
  registerDemoData();

  const savedUser =
    localStorage.getItem("facilityUser");

  if (savedUser) {
    const user = JSON.parse(savedUser);
    setCurrentUser(user);
    setCurrentObject(demoObjects[0]);
    renderApp();
    return;
  }

  renderLogin();
  bindModalEvents();
  bindQrEvents();
}

boot();