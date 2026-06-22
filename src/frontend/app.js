/***********************
 * SAFE HELPERS
 ***********************/
function safeBind(id, fn) {
  const el = document.getElementById(id);
  if (el && typeof fn === "function") {
    el.onclick = fn;
  }
}

function render(html) {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = html;
}

/***********************
 * AUTH FLOW FIX
 ***********************/
function afterLogin(user) {
  appState.currentUser = user;
  renderRoleDashboard();
}

/***********************
 * LOGOUT FIX (KRITISCH)
 ***********************/
function logout() {
  try {
    appState.currentUser = null;
    appState.currentObject = null;

    localStorage.removeItem("facilityUser");

    renderLogin();
  } catch (e) {
    console.error("Logout error:", e);
    renderLogin();
  }
}

window.logout = logout;

/***********************
 * ROLE ROUTER (KRITISCH)
 ***********************/
function renderRoleDashboard() {
  const role = appState?.currentUser?.Rolle;

  if (!role) {
    renderLogin();
    return;
  }

  switch (role) {
    case "Objektleiter":
      renderManagerDashboard();
      break;

    case "Admin":
      renderAdminDashboard();
      break;

    case "Buchhaltung":
      renderAccountingDashboard();
      break;

    default:
      renderEmployeeDashboard();
      break;
  }
}

/***********************
 * MANAGER DASHBOARD
 ***********************/
function renderManagerDashboard() {
  render(`
    <div class="app-shell">
      <div class="header-card"><h1>Objektleiter</h1></div>

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
      <div class="header-card"><h1>Admin</h1></div>

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
      <div class="header-card"><h1>Buchhaltung</h1></div>

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
          <div class="button-stack">
            <button id="btnTickets" class="btn yellow">Tickets</button>
            <button id="btnCustomerRequests" class="btn yellow">Kundenwünsche</button>
            <button id="btnNotes" class="btn yellow">Notiz</button>
          </div>
        </div>

        <div class="section-card">
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
 * SAFE BIND EVENTS
 ***********************/
function safeBind(id, fn) {
  const el = document.getElementById(id);
  if (el && typeof fn === "function") {
    el.onclick = fn;
  }
}

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
    render(`<div class="app-shell"><div class="section-card">Daten konnten nicht geladen werden.</div></div>`);
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