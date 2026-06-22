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
function renderRoleDashboard() {

  const role = appState.currentUser?.Rolle;

  switch(role) {

    case "MITARBEITER":
      renderEmployeeDashboard();
      break;

    case "OBJEKTLEITER":
      renderManagerDashboard();
      break;

    case "ADMIN":
      renderAdminDashboard();
      break;
      
    case "BUCHHALTUNG":
      renderAccountingDashboard();
      break;

    case "KUNDE":
      renderCustomerDashboard();
      break;

    default:
      renderEmployeeDashboard();

  }
}
  function renderCustomerDashboard() {

  document.getElementById("app").innerHTML = `
    <div class="app-shell">

      <div class="header-card">
        <h1>Kundenportal</h1>
        <p>${appState.currentObject?.Name || ""}</p>
      </div>

      <div class="section-card">

        <div class="button-stack">

          <button
            id="btnCustomerRequests"
            class="btn purple">
            Wünsche
          </button>

          <button
            id="btnTickets"
            class="btn yellow">
            Reklamationen
          </button>

          <button
            id="btnLogout"
            class="btn secondary">
            Logout
          </button>

        </div>

      </div>

    </div>
  `;

  document.getElementById("btnCustomerRequests")
    .onclick = showCustomerRequests;

  document.getElementById("btnTickets")
    .onclick = showTickets;

  document.getElementById("btnLogout")
    .onclick = logout;
}
  /***********************
 * SAFE HELPERS
 ***********************/
function safeBind(id, fn) {
  const el = document.getElementById(id);
  if (el && typeof fn === "function") {
    el.onclick = fn;
  }
}

function render(appHTML) {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = appHTML;
}

/***********************
 * MANAGER DASHBOARD
 ***********************/
function renderManagerDashboard() {
  render(`
    <div class="app-shell">

      <div class="header-card">
        <h1>Objektleiter</h1>
      </div>

      <div class="section-card">

        <div class="button-stack">

          <button id="btnReplacement" class="btn orange">Vertretungen</button>
          <button id="btnWarnings" class="btn orange">KI Warnungen</button>
          <button id="btnAnalytics" class="btn orange">Auswertungen</button>
          <button id="btnMailbox" class="btn green">Postfach</button>
          <button id="btnLogout" class="btn secondary">Logout</button>

        </div>

      </div>

    </div>
  `);

  safeBind("btnReplacement", showReplacements);
  safeBind("btnWarnings", showWarnings);
  safeBind("btnAnalytics", showAnalytics);
  safeBind("btnMailbox", showMailbox);
  safeBind("btnLogout", logout);
}

/***********************
 * ADMIN DASHBOARD
 ***********************/
function renderAdminDashboard() {
  render(`
    <div class="app-shell">

      <div class="header-card">
        <h1>Admin</h1>
      </div>

      <div class="section-card">

        <div class="button-stack">

          <button id="btnAdmin" class="btn red">System</button>
          <button id="btnLogout" class="btn secondary">Logout</button>

        </div>

      </div>

    </div>
  `);

  safeBind("btnAdmin", showAdmin);
  safeBind("btnLogout", logout);
}

/***********************
 * ACCOUNTING DASHBOARD
 ***********************/
function renderAccountingDashboard() {
  render(`
    <div class="app-shell">

      <div class="header-card">
        <h1>Buchhaltung</h1>
      </div>

      <div class="section-card">

        <div class="button-stack">

          <button id="btnTimesheets" class="btn blue">Stundennachweise</button>
          <button id="btnInvoices" class="btn orange">Abrechnung</button>
          <button id="btnCosts" class="btn yellow">Materialkosten</button>
          <button id="btnExport" class="btn green">Export</button>
          <button id="btnLogout" class="btn secondary">Logout</button>

        </div>

      </div>

    </div>
  `);

  safeBind("btnTimesheets", showTimesheets);
  safeBind("btnInvoices", showInvoices);
  safeBind("btnCosts", showCosts);
  safeBind("btnExport", showExport);
  safeBind("btnLogout", logout);
}

/***********************
 * EMPLOYEE DASHBOARD
 ***********************/
function renderEmployeeDashboard() {
  if (!appState.currentObject) {
    showToast("Bitte zuerst am Objekt einchecken", "ERROR");
    renderCheckinStart();
    return;
  }

  const user = appState.currentUser;

  render(`
    <div class="app-shell">

      <div class="header-card">
        <h1>Facility-OS</h1>
        <p>${appState.currentObject?.Name || ""}</p>
        <div class="role-badge">${user?.Rolle || "-"}</div>
      </div>

      <div class="dashboard">

        <div class="section-card">
          <div class="section-title">Persönlich</div>
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
          <div class="button-stack">
            <button id="btnObjectInfo" class="btn blue">Objektinfo</button>
            <button id="btnRooms" class="btn blue">Räume</button>
            <button id="btnCleaningPlan" class="btn blue">Putzplan</button>
            <button id="btnDocuments" class="btn blue">Dokumente</button>
            <button id="btnFloorPlan" class="btn blue">Grundriss</button>
            <button id="btnWaste" class="btn blue">Müllplan</button>
            <button id="btnKeys" class="btn blue">Schlüssel</button>
            <button id="btnDanger" class="btn blue">Gefahren</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Kommunikation</div>
          <div class="button-stack">
            <button id="btnTickets" class="btn yellow">Tickets</button>
            <button id="btnCustomerRequests" class="btn yellow">Kundenwünsche</button>
            <button id="btnNotes" class="btn yellow">Notiz</button>
          </div>
        </div>

        <div class="section-card">
          <div class="section-title">Objektleiter</div>
          <div class="button-stack">
            <button id="btnReplacement" class="btn orange">Vertretungen</button>
            <button id="btnWarnings" class="btn orange">Warnungen</button>
            <button id="btnAnalytics" class="btn orange">Analysen</button>
          </div>
        </div>

        <div class="section-card">
          <div class="button-stack">
            <button id="btnAdmin" class="btn red">Admin</button>
            <button id="btnLogout" class="btn secondary">Logout</button>
          </div>
        </div>

      </div>
    </div>
  `);

  bindDashboardEvents();
}

/***********************
 * DASHBOARD EVENTS
 ***********************/
function bindDashboardEvents() {
  safeBind("btnStartShift", openQrScanner);
  safeBind("btnMyShifts", showMyShifts);
  safeBind("btnMailbox", showMailbox);
  safeBind("btnSick", showSickForm);
  safeBind("btnVacation", showVacationForm);
  safeBind("btnMaterial", showMaterialForm);
  safeBind("btnHelp", showHelp);

  safeBind("btnObjectInfo", showObjectInfo);
  safeBind("btnRooms", showRooms);
  safeBind("btnCleaningPlan", showCleaningPlan);
  safeBind("btnDocuments", showDocuments);
  safeBind("btnFloorPlan", showFloorPlan);
  safeBind("btnWaste", showWastePlan);
  safeBind("btnKeys", showKeys);
  safeBind("btnDanger", showDanger);

  safeBind("btnTickets", showTickets);
  safeBind("btnCustomerRequests", showCustomerRequests);
  safeBind("btnNotes", showTicketForm);

  safeBind("btnReplacement", showReplacements);
  safeBind("btnWarnings", showWarnings);
  safeBind("btnAnalytics", showAnalytics);

  safeBind("btnAdmin", showAdmin);
  safeBind("btnLogout", logout);

  bindQrEvents();
}

/***********************
 * BOOT
 ***********************/
async function boot() {
  bindModalEvents();
  bindQrEvents();

  const loaded = await loadAppData();

  if (!loaded) {
    render(`
      <div class="app-shell">
        <div class="section-card">
          Daten konnten nicht geladen werden.
        </div>
      </div>
    `);
    return;
  }

  appState.cachedUsers = getData("users");
  appState.cachedObjects = getData("objects");
  appState.cachedRooms = getData("rooms");
  appState.cachedTasks = getData("tasks");
  appState.cachedMaterials = getData("materials");
  appState.cachedShifts = getData("shifts");
  appState.notifications = getData("notifications");
  appState.customerRequests = getData("customerRequests");

  localStorage.removeItem("facilityUser");
  renderLogin();
}

boot();

/***********************
 * EXPORTS
 ***********************/
const renderDashboard = renderRoleDashboard;

export {
  renderDashboard,
  renderCheckinStart
};