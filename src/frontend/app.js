const BRANDING = {
  appName: "Facility-OS",
  subtitle: "Mobile Facility Management",
  primaryColor: "#2563eb",
  accentColor: "#22c55e"
};

const users = [
  { User_ID: "USR-001", Vorname: "Kristin", Nachname: "Rabener", Rolle: "ADMIN", Email: "allrountin@gmail.com", Passwort: "Test123!", Aktiv: "JA" },
  { User_ID: "USR-002", Vorname: "Anna", Nachname: "Becker", Rolle: "MITARBEITER", Email: "anna@test.de", Passwort: "Test123!", Aktiv: "JA" },
  { User_ID: "USR-004", Vorname: "Sarah", Nachname: "Mueller", Rolle: "OBJEKTLEITER", Email: "sarah@test.de", Passwort: "Test123!", Aktiv: "JA" }
];

const qrCodes = [
  { QR_ID: "QR-001", Objekt_ID: "OBJ-001", QR_Typ: "OBJEKT_CHECKIN_CHECKOUT", Beschreibung: "Eingang Apotheke Mueller", Aktiv: "JA" },
  { QR_ID: "QR-002", Objekt_ID: "OBJ-001", QR_Typ: "MATERIAL_LAGER", Beschreibung: "Materialschrank Apotheke Mueller", Aktiv: "JA" }
];

const objects = [
  { Objekt_ID: "OBJ-001", Name: "Apotheke Mueller", Adresse: "Musterstraße 1, Wimmelburg" },
  { Objekt_ID: "OBJ-002", Name: "Praxis Schmidt", Adresse: "Hauptstraße 12, Halle" }
];

const defaultShifts = [
  { Shift_ID: "SHIFT-001", Mitarbeiter_ID: "USR-002", Objekt_ID: "OBJ-001", Objekt_Name: "Apotheke Mueller", Datum: "2026-05-29", Startzeit: "07:00", Endzeit: "08:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null },
  { Shift_ID: "SHIFT-002", Mitarbeiter_ID: "USR-002", Objekt_ID: "OBJ-002", Objekt_Name: "Praxis Schmidt", Datum: "2026-05-30", Startzeit: "08:00", Endzeit: "09:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null }
];

let shifts = JSON.parse(localStorage.getItem("facilityShifts")) || defaultShifts;
let sickReports = JSON.parse(localStorage.getItem("facilitySickReports")) || [];
let vacationRequests = JSON.parse(localStorage.getItem("facilityVacations")) || [];
let materialReports = JSON.parse(localStorage.getItem("facilityMaterials")) || [];
let currentScanner = null;

function saveAll() {
  localStorage.setItem("facilityShifts", JSON.stringify(shifts));
  localStorage.setItem("facilitySickReports", JSON.stringify(sickReports));
  localStorage.setItem("facilityVacations", JSON.stringify(vacationRequests));
  localStorage.setItem("facilityMaterials", JSON.stringify(materialReports));
}

function appModal(title, html, actions = "") {
  document.getElementById("appModal")?.remove();

  const modal = document.createElement("div");
  modal.id = "appModal";
  modal.className = "modal-bg";
  modal.innerHTML = `
    <div class="modal">
      <h2>${title}</h2>
      <div>${html}</div>
      <div class="menu">
        ${actions}
        <button class="light" onclick="closeModal()">Schließen</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

function closeModal() {
  document.getElementById("appModal")?.remove();
}

window.closeModal = closeModal;

function renderLogin() {
  document.getElementById("app").innerHTML = `
    <main class="app-shell">
      <section class="card">
        <div class="brand">
          <h1>${BRANDING.appName}</h1>
          <p>${BRANDING.subtitle}</p>
        </div>

        <div class="badge">Mitarbeiter zuerst per QR</div>

        <div class="menu">
          <button id="quickQRBtn">QR am Objekt scannen</button>
          <button class="secondary" id="fallbackLoginBtn">Login / Fallback</button>
        </div>

        <div id="loginForm" style="display:none;">
          <input id="email" type="email" placeholder="E-Mail" />
          <input id="password" type="password" placeholder="Passwort" />
          <button id="loginBtn">Einloggen</button>
          <p id="message"></p>
        </div>

        <div id="qrReader"></div>
      </section>
    </main>
  `;

  document.getElementById("fallbackLoginBtn").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "block";
  });

  document.getElementById("quickQRBtn").addEventListener("click", () => {
    appModal(
      "QR-Login Demo",
      "In der echten App erkennt das System Mitarbeiter + Objekt über QR/GPS. Für die Demo bitte als Mitarbeiter einloggen und dann QR scannen."
    );
  });

  document.getElementById("loginBtn").addEventListener("click", handleLogin);
}

function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const result = login(email, password);

  if (!result.success) {
    document.getElementById("message").innerText = result.message;
    document.getElementById("message").style.color = "red";
    return;
  }

  localStorage.setItem("facilityUser", JSON.stringify(result.user));
  renderDashboard(result.user);
}

function login(email, password) {
  const user = users.find(u => u.Email.toLowerCase().trim() === String(email).toLowerCase().trim());

  if (!user) return { success: false, message: "Benutzer nicht gefunden" };
  if (user.Aktiv !== "JA") return { success: false, message: "Benutzer deaktiviert" };
  if (user.Passwort !== password) return { success: false, message: "Falsches Passwort" };

  return {
    success: true,
    user: {
      userId: user.User_ID,
      role: user.Rolle,
      firstName: user.Vorname,
      lastName: user.Nachname,
      email: user.Email
    }
  };
}

function renderDashboard(user) {
  document.getElementById("app").innerHTML = `
    <main class="app-shell">
      <section class="card">
        <div class="brand">
          <h1>${BRANDING.appName}</h1>
          <p>${user.firstName} ${user.lastName}</p>
        </div>

        <div class="badge">${user.role}</div>

        <div class="menu">
          ${getMenuByRole(user.role)}
        </div>

        <div id="qrReader"></div>

        <button class="light" id="resetBtn">Demo zurücksetzen</button>
        <button class="secondary" id="logoutBtn">Logout</button>
      </section>
    </main>
  `;

  bindEvents(user);
}

function getMenuByRole(role) {
  if (role === "MITARBEITER") {
    return `
      <button id="qrScanBtn">QR scannen</button>
      <button id="myShiftBtn">Meine Schichten</button>
      <button id="sickBtn">Krank melden</button>
      <button id="vacationBtn">Urlaub beantragen</button>
      <button id="materialBtn">Material melden</button>
      <button id="helpBtn">Hilfe</button>
    `;
  }

  if (role === "OBJEKTLEITER") {
    return `
      <button id="managerShiftsBtn">Schichten ansehen</button>
      <button id="managerSickBtn">Krankmeldungen</button>
      <button id="managerVacationBtn">Urlaubsanträge</button>
      <button id="managerMaterialBtn">Materialmeldungen</button>
      <button id="objectsBtn">Objekte</button>
    `;
  }

  if (role === "ADMIN") {
    return `
      <button id="usersBtn">Benutzerliste</button>
      <button id="objectsBtn">Objekte</button>
      <button id="managerShiftsBtn">Alle Schichten</button>
      <button id="managerSickBtn">Krankmeldungen</button>
      <button id="managerVacationBtn">Urlaubsanträge</button>
      <button id="managerMaterialBtn">Materialmeldungen</button>
    `;
  }

  return "";
}

function bindEvents(user) {
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("facilityUser");
    renderLogin();
  });

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    localStorage.removeItem("facilityShifts");
    localStorage.removeItem("facilitySickReports");
    localStorage.removeItem("facilityVacations");
    localStorage.removeItem("facilityMaterials");
    appModal("Demo zurückgesetzt", "Die lokalen Demo-Daten wurden gelöscht.");
    setTimeout(() => location.reload(), 900);
  });

  document.getElementById("qrScanBtn")?.addEventListener("click", () => handleQRScan(user));
  document.getElementById("myShiftBtn")?.addEventListener("click", () => showMyShifts(user));
  document.getElementById("sickBtn")?.addEventListener("click", () => openSickForm(user));
  document.getElementById("vacationBtn")?.addEventListener("click", () => openVacationForm(user));
  document.getElementById("materialBtn")?.addEventListener("click", () => openMaterialForm(user));
  document.getElementById("helpBtn")?.addEventListener("click", () => appModal("Hilfe", "Bei QR-Problemen Fallback-Login nutzen. Objektleiter wird später automatisch informiert."));

  document.getElementById("managerShiftsBtn")?.addEventListener("click", showAllShifts);
  document.getElementById("managerSickBtn")?.addEventListener("click", showSickReports);
  document.getElementById("managerVacationBtn")?.addEventListener("click", showVacationRequests);
  document.getElementById("managerMaterialBtn")?.addEventListener("click", showMaterialReports);
  document.getElementById("objectsBtn")?.addEventListener("click", showObjects);
  document.getElementById("usersBtn")?.addEventListener("click", showUsers);
}

function detectQRType(qrId) {
  const qr = qrCodes.find(q => q.QR_ID.toLowerCase() === String(qrId).trim().toLowerCase());

  if (!qr) return { success: false, message: "QR-Code nicht gefunden" };
  if (qr.Aktiv !== "JA") return { success: false, message: "QR-Code deaktiviert" };

  return { success: true, qr };
}

function handleQRScan(user) {
  const reader = document.getElementById("qrReader");
  reader.style.display = "block";

  const backBtn = document.createElement("button");
  backBtn.innerText = "Zurück";
  backBtn.className = "light";
  reader.before(backBtn);

  backBtn.onclick = () => {
    if (currentScanner) {
      currentScanner.stop().catch(() => {});
    }

    currentScanner = null;
    reader.style.display = "none";
    backBtn.remove();
  };

  if (typeof Html5Qrcode === "undefined") {
    reader.style.display = "none";
    backBtn.remove();
    manualQr(user);
    return;
  }

  currentScanner = new Html5Qrcode("qrReader");

  currentScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      currentScanner.stop().catch(() => {});
      currentScanner = null;
      reader.style.display = "none";
      backBtn.remove();
      processQR(decodedText, user);
    }
  ).catch(() => {
    reader.style.display = "none";
    backBtn.remove();
    manualQr(user);
  });
}

function manualQr(user) {
  appModal(
    "QR manuell eingeben",
    `<input id="manualQr" placeholder="QR-001">`,
    `<button onclick="submitManualQr()">Prüfen</button>`
  );

  window.submitManualQr = function () {
    const value = document.getElementById("manualQr").value;
    closeModal();
    processQR(value, user);
  };
}

function processQR(qrText, user) {
  const result = detectQRType(qrText);

  if (!result.success) {
    appModal("QR Fehler", result.message);
    return;
  }

  if (result.qr.QR_Typ === "MATERIAL_LAGER") {
    openMaterialForm(user, result.qr.Beschreibung);
    return;
  }

  const shift = shifts.find(s =>
    s.Mitarbeiter_ID === user.userId &&
    s.Objekt_ID === result.qr.Objekt_ID &&
    s.Status !== "ABGESCHLOSSEN"
  );

  if (!shift) {
    appModal("Keine Schicht gefunden", "Für diesen QR-Code wurde keine offene Schicht gefunden.");
    return;
  }

  const now = new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (!shift.Checkin_Zeit) {
    shift.Checkin_Zeit = now;
    shift.Status = "GESTARTET";
    saveAll();
    appModal("Schicht gestartet", `Objekt:<br><b>${shift.Objekt_Name}</b><br><br>Check-In:<br><b>${now}</b>`);
    return;
  }

  if (!shift.Checkout_Zeit) {
    shift.Checkout_Zeit = now;
    shift.Status = "ABGESCHLOSSEN";
    saveAll();
    appModal("Schicht beendet", `Objekt:<br><b>${shift.Objekt_Name}</b><br><br>Check-Out:<br><b>${now}</b>`);
  }
}

function showMyShifts(user) {
  const myShifts = shifts.filter(s => s.Mitarbeiter_ID === user.userId);
  appModal("Meine Schichten", myShifts.map(formatShift).join("<hr>") || "Keine Schichten vorhanden.");
}

function showAllShifts() {
  appModal("Schichten", shifts.map(formatShift).join("<hr>") || "Keine Schichten vorhanden.");
}

function formatShift(s) {
  const employee = users.find(u => u.User_ID === s.Mitarbeiter_ID);

  return `
    Mitarbeiter:<br><b>${employee?.Vorname || "-"} ${employee?.Nachname || ""}</b><br><br>
    Objekt:<br><b>${s.Objekt_Name}</b><br><br>
    Datum:<br>${s.Datum}<br><br>
    Status:<br><b>${s.Status}</b><br><br>
    Check-In:<br>${s.Checkin_Zeit || "-"}<br>
    Check-Out:<br>${s.Checkout_Zeit || "-"}
  `;
}

function openSickForm(user) {
  appModal(
    "Krank melden",
    `
      <label>Von</label>
      <input id="sickFrom" type="date">

      <label>Bis</label>
      <input id="sickTo" type="date">

      <label>Grund / Hinweis</label>
      <textarea id="sickReason" placeholder="z. B. krank / Arzttermin"></textarea>
    `,
    `<button onclick="submitSickReport()">Melden</button>`
  );

  window.submitSickReport = function () {
    const from = document.getElementById("sickFrom").value;
    const to = document.getElementById("sickTo").value;
    const reason = document.getElementById("sickReason").value.trim();

    if (!from || !to) return appModal("Fehlende Angaben", "Bitte Zeitraum ausfüllen.");

    sickReports.push({
      id: `SICK-${Date.now()}`,
      userId: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      from,
      to,
      reason: reason || "-",
      status: "GEMELDET"
    });

    saveAll();
    closeModal();
    appModal("Krankmeldung gespeichert", `Zeitraum:<br><b>${from} bis ${to}</b><br><br>Status:<br><b>GEMELDET</b>`);
  };
}

function openVacationForm(user) {
  appModal(
    "Urlaub beantragen",
    `
      <label>Von</label>
      <input id="vacFrom" type="date">

      <label>Bis</label>
      <input id="vacTo" type="date">

      <label>Grund optional</label>
      <textarea id="vacReason" placeholder="optional"></textarea>
    `,
    `<button onclick="submitVacationRequest()">Beantragen</button>`
  );

  window.submitVacationRequest = function () {
    const from = document.getElementById("vacFrom").value;
    const to = document.getElementById("vacTo").value;
    const reason = document.getElementById("vacReason").value.trim() || "-";

    if (!from || !to) return appModal("Fehlende Angaben", "Bitte Zeitraum ausfüllen.");

    vacationRequests.push({
      id: `VAC-${Date.now()}`,
      userId: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      from,
      to,
      reason,
      status: "BEANTRAGT"
    });

    saveAll();
    closeModal();
    appModal("Urlaubsantrag gespeichert", `Zeitraum:<br><b>${from} bis ${to}</b><br><br>Status:<br><b>BEANTRAGT</b>`);
  };
}

function openMaterialForm(user, source = "Manuelle Materialmeldung") {
  appModal(
    "Material melden",
    `
      <label>Material</label>
      <input id="materialName" placeholder="z. B. Toilettenpapier">

      <label>Hinweis</label>
      <textarea id="materialNote" placeholder="optional"></textarea>
    `,
    `<button onclick="submitMaterialReport()">Speichern</button>`
  );

  window.submitMaterialReport = function () {
    const material = document.getElementById("materialName").value.trim();
    const note = document.getElementById("materialNote").value.trim();

    if (!material) return;

    materialReports.push({
      id: `MATREP-${Date.now()}`,
      userId: user.userId,
      objectName: source,
      material,
      note,
      createdAt: new Date().toLocaleString("de-DE"),
      status: "NEU"
    });

    saveAll();
    closeModal();
    appModal("Materialmeldung gespeichert", `Material:<br><b>${material}</b><br><br>Status:<br><b>NEU</b>`);
  };
}

function showSickReports() {
  appModal(
    "Krankmeldungen",
    sickReports.map(r =>
      `Mitarbeiter:<br><b>${r.name}</b><br><br>Von:<br>${r.from}<br><br>Bis:<br>${r.to}<br><br>Grund:<br>${r.reason}<br><br>Status:<br><b>${r.status}</b>`
    ).join("<hr>") || "Keine Krankmeldungen vorhanden."
  );
}

function showVacationRequests() {
  appModal(
    "Urlaubsanträge",
    vacationRequests.map(v =>
      `Mitarbeiter:<br><b>${v.name}</b><br><br>Von:<br>${v.from}<br><br>Bis:<br>${v.to}<br><br>Grund:<br>${v.reason}<br><br>Status:<br><b>${v.status}</b>`
    ).join("<hr>") || "Keine Urlaubsanträge vorhanden."
  );
}

function showMaterialReports() {
  appModal(
    "Materialmeldungen",
    materialReports.map(m =>
      `Objekt:<br><b>${m.objectName}</b><br><br>Material:<br>${m.material}<br><br>Hinweis:<br>${m.note || "-"}<br><br>Status:<br><b>${m.status}</b>`
    ).join("<hr>") || "Keine Materialmeldungen vorhanden."
  );
}

function showObjects() {
  appModal(
    "Objekte",
    objects.map(o =>
      `Objekt:<br><b>${o.Name}</b><br><br>Adresse:<br>${o.Adresse}<br><br>ID:<br>${o.Objekt_ID}`
    ).join("<hr>")
  );
}

function showUsers() {
  appModal(
    "Benutzer",
    users.map(u =>
      `Name:<br><b>${u.Vorname} ${u.Nachname}</b><br><br>Rolle:<br>${u.Rolle}<br><br>Status:<br><b>${u.Aktiv}</b>`
    ).join("<hr>")
  );
}

const savedUser = localStorage.getItem("facilityUser");

if (savedUser) {
  renderDashboard(JSON.parse(savedUser));
} else {
  renderLogin();
}
