window.onerror = function (msg, src, line, col, err) {
  document.getElementById("app").innerHTML = `
    <div style="padding:20px;font-family:Arial">
      <h2>App Crash</h2>
      <pre>${msg}</pre>
      <small>${line}:${col}</small>
    </div>
  `;
};
/***********************
 * CONFIG
 ***********************/
const API_BASE = "https://DEIN-SERVER-URL.com";

/***********************
 * GLOBAL STATE
 ***********************/
const appState = {
  currentUser: null,
  currentObject: null,
  data: {}
};

/***********************
 * SAFE DOM
 ***********************/
function render(html) {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = html;
}

function safeBind(id, fn) {
  const el = document.getElementById(id);
  if (el && typeof fn === "function") el.onclick = fn;
}

/***********************
 * USER
 ***********************/
function normalizeUser(user) {
  if (!user) return null;

  return {
    User_ID: user.User_ID ?? null,
    Name: user.Name ?? "",
    Rolle: user.Rolle ?? "Mitarbeiter",
    Branche: user.Branche ?? "facility",
    Objekt_ID: user.Objekt_ID ?? null
  };
}

function getUser() {
  return appState.currentUser;
}

function setCurrentUser(user) {
  appState.currentUser = normalizeUser(user);
  localStorage.setItem("facilityUser", JSON.stringify(appState.currentUser));
  route();
}

function logout() {
  appState.currentUser = null;
  appState.currentObject = null;
  localStorage.removeItem("facilityUser");
  renderLogin();
}

window.logout = logout;

/***********************
 * GOOGLE SHEETS API LAYER
 ***********************/
async function fetchSheet(name) {
  try {
    const res = await fetch(`${API_BASE}/api/sheet/${name}`);
    if (!res.ok) throw new Error("Fetch failed");
    return await res.json();
  } catch (e) {
    console.error("Sheet error:", name, e);
    return [];
  }
}

async function appendSheet(name, row) {
  try {
    await fetch(`${API_BASE}/api/sheet/${name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row })
    });
  } catch (e) {
    console.error("Append error:", e);
  }
}

function getData(key) {
  return appState.data[key] || [];
}

async function loadAppData() {
  appState.data.users = await fetchSheet("users");
  appState.data.objects = await fetchSheet("objects");
  appState.data.rooms = await fetchSheet("rooms");
  appState.data.tasks = await fetchSheet("tasks");
  appState.data.materials = await fetchSheet("materials");
  appState.data.shifts = await fetchSheet("shifts");
  appState.data.notifications = await fetchSheet("notifications");
  appState.data.customerRequests = await fetchSheet("customerRequests");
  appState.data.tickets = await fetchSheet("tickets");

  return true;
}

/***********************
 * ROUTER
 ***********************/
function route() {
  const user = appState.currentUser;

  if (!user || !user.Rolle) {
    renderLogin?.();
    return;
  }

  const role = user.Rolle;

  switch (role) {
    case "Admin":
      return renderAdminDashboard();

    case "Objektleiter":
      return renderManagerDashboard();

    case "Buchhaltung":
      return renderAccountingDashboard();

    case "Mitarbeiter":
      return renderEmployeeDashboard();

    case "Kunde":
      return renderCustomerDashboard();

    default:
      console.warn("Unknown role:", role);
      renderLogin?.();
  }
}

/***********************
 * BOOT
 ***********************/
async function boot() {
  try {
    if (!document.getElementById("app")) {
      console.error("Missing #app container");
      return;
    }

    bindModalEvents?.();
    bindQrEvents?.();

    await loadAppData();

    const saved = localStorage.getItem("facilityUser");

    if (saved) {
      try {
        appState.currentUser = normalizeUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("facilityUser");
        appState.currentUser = null;
      }
    }

    if (!appState.currentUser) {
      if (typeof renderLogin !== "function") {
        document.getElementById("app").innerHTML =
          "<div style='padding:20px'>renderLogin() fehlt</div>";
        return;
      }
      renderLogin();
      return;
    }

    route();

  } catch (e) {
    document.getElementById("app").innerHTML = `
      <div style="padding:20px;font-family:Arial">
        <h2>Boot Error</h2>
        <pre>${e.message}</pre>
      </div>
    `;
  }
}
/***********************
 * DASHBOARDS
 ***********************/

/* MANAGER */
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

/* ADMIN */
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

/* BUCHHALTUNG */
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

/* MITARBEITER */
function renderEmployeeDashboard() {
  if (!appState.currentObject) {
    showToast("Bitte Objekt auswählen", "ERROR");
    renderCheckinStart();
    return;
  }

  const user = getUser();

  render(`
    <div class="app-shell">
      <div class="header-card">
        <h1>Facility-OS</h1>
        <p>${appState.currentObject?.Name || ""}</p>
        <div class="role-badge">${user?.Rolle || "-"}</div>
      </div>

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
          <button id="btnTickets" class="btn yellow">Tickets</button>
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
  `);

  bindEmployeeEvents();
}

/* KUNDE */
function renderCustomerDashboard() {
  render(`
    <div class="app-shell">
      <div class="header-card"><h1>Kundenportal</h1></div>

      <div class="section-card">
        <div class="button-stack">
          <button id="btnRequests" class="btn purple">Anfragen</button>
          <button id="btnTickets" class="btn yellow">Tickets</button>
          <button id="btnLogout" class="btn secondary">Logout</button>
        </div>
      </div>
    </div>
  `);

  safeBind("btnRequests", showCustomerRequests);
  safeBind("btnTickets", showTickets);
  safeBind("btnLogout", logout);
}

/***********************
 * EVENTS EMPLOYEE
 ***********************/
function bindEmployeeEvents() {
  safeBind("btnStartShift", openQrScanner);
  safeBind("btnMyShifts", showMyShifts);
  safeBind("btnMailbox", showMailbox);
  safeBind("btnSick", showSickForm);
  safeBind("btnVacation", showVacationForm);
  safeBind("btnMaterial", showMaterialForm);
  safeBind("btnHelp", showHelp);

  safeBind("btnObjectInfo", showObjectInfo);
  safeBind("btnRooms", showRooms);
  safeBind("btnTickets", showTickets);

  safeBind("btnReplacement", showReplacements);
  safeBind("btnWarnings", showWarnings);
  safeBind("btnAnalytics", showAnalytics);

  safeBind("btnAdmin", showAdmin);
  safeBind("btnLogout", logout);

  bindQrEvents?.();
}