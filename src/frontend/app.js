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
  { Objekt_ID: "OBJ-001", Name: "Apotheke Mueller", Adresse: "Musterstraße 1, Wimmelburg", Objektleiter_ID: "USR-004" },
  { Objekt_ID: "OBJ-002", Name: "Praxis Schmidt", Adresse: "Hauptstraße 12, Halle", Objektleiter_ID: "USR-004" }
];

const defaultShifts = [
  { Shift_ID: "SHIFT-001", Mitarbeiter_ID: "USR-002", Objekt_ID: "OBJ-001", Objekt_Name: "Apotheke Mueller", Datum: "2026-05-29", Startzeit: "07:00", Endzeit: "08:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null },
  { Shift_ID: "SHIFT-002", Mitarbeiter_ID: "USR-002", Objekt_ID: "OBJ-002", Objekt_Name: "Praxis Schmidt", Datum: "2026-05-30", Startzeit: "08:00", Endzeit: "09:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null }
];

let shifts = JSON.parse(localStorage.getItem("facilityShifts")) || defaultShifts;
let sickReports = JSON.parse(localStorage.getItem("facilitySickReports")) || [];
let vacationRequests = JSON.parse(localStorage.getItem("facilityVacations")) || [];
let materialReports = JSON.parse(localStorage.getItem("facilityMaterials")) || [];

function saveAll() {
  localStorage.setItem("facilityShifts", JSON.stringify(shifts));
  localStorage.setItem("facilitySickReports", JSON.stringify(sickReports));
  localStorage.setItem("facilityVacations", JSON.stringify(vacationRequests));
  localStorage.setItem("facilityMaterials", JSON.stringify(materialReports));
}

function appModal(title, body, actions = "") {
  document.getElementById("appModal")?.remove();

  const modal = document.createElement("div");
  modal.id = "appModal";
  modal.innerHTML = `
    <div style="
      position: fixed; inset: 0; background: rgba(15,23,42,.55);
      display: flex; align-items: center; justify-content: center;
      padding: 18px; z-index: 9999;">
      <div style="
        background: white; width: 100%; max-width: 430px;
        border-radius: 22px; padding: 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,.22);">
        <h2 style="margin-bottom: 14px; color:#0f172a;">${title}</h2>
        <div style="color:#334155; font-size:16px; line-height:1.45;">${body}</div>
        <div style="margin-top:20px; display:grid; gap:10px;">
          ${actions}
          <button onclick="closeModal()">Schließen</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeModal() {
  document.getElementById("appModal")?.remove();
}

window.closeModal = closeModal;

function inputModal(title, fields, onSubmitName) {
  const body = fields.map(f => `
    <label style="display:block;margin:12px 0 6px;font-weight:700;">${f.label}</label>
    <input id="${f.id}" placeholder="${f.placeholder || ""}" style="
      width:100%;padding:13px;border:1px solid #dbe2ea;
      border-radius:12px;font-size:16px;">
  `).join("");

  const actions = `<button onclick="${onSubmitName}()">Speichern</button>`;
  appModal(title, body, actions);
}

function login(email, password) {
  const user = users.find(u => u.Email.toLowerCase().trim() === email.toLowerCase().trim());
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
  document.body.innerHTML = `
    <main class="app">
      <section class="card">
        <h1>Facility-OS</h1>
        <p>${user.firstName} ${user.lastName}</p>
        <p>Rolle: ${user.role}</p>

        <div class="menu">${getMenuByRole(user.role)}</div>
        <div id="qrReader"></div>

        <button id="resetBtn">Demo zurücksetzen</button>
        <button id="logoutBtn">Logout</button>
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
    location.reload();
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

function findOpenShift(userId, objectId) {
  return shifts.find(s =>
    s.Mitarbeiter_ID === userId &&
    s.Objekt_ID === objectId &&
    s.Status !== "ABGESCHLOSSEN"
  );
}

function handleQRScan(user) {
  const reader = document.getElementById("qrReader");
  reader.style.display = "block";

  const html5QrCode = new Html5Qrcode("qrReader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    decodedText => {
      html5QrCode.stop();
      reader.style.display = "none";
      processQR(decodedText, user);
    }
  ).catch(() => {
    reader.style.display = "none";
    inputModal("QR manuell eingeben", [
      { id: "manualQr", label: "QR-Code", placeholder: "QR-001" }
    ], "submitManualQr");
    window.submitManualQr = () => {
      const value = document.getElementById("manualQr").value;
      closeModal();
      processQR(value, user);
    };
  });
}

function processQR(qrText, user) {
  const result = detectQRType(qrText);

  if (!result.success) {
    appModal("QR Fehler", result.message);
    return;
  }

  if (result.qr.QR_Typ === "MATERIAL_LAGER") {
    inputModal("Materialmeldung", [
      { id: "materialName", label: "Welches Material fehlt?", placeholder: "z. B. Toilettenpapier" }
    ], "submitMaterialReport");

    window.submitMaterialReport = () => {
      const material = document.getElementById("materialName").value;
      if (!material) return;

      materialReports.push({
        id: `MATREP-${Date.now()}`,
        userId: user.userId,
        objectId: result.qr.Objekt_ID,
        objectName: result.qr.Beschreibung,
        material,
        createdAt: new Date().toLocaleString("de-DE"),
        status: "NEU"
      });

      saveAll();
      closeModal();
      appModal("Materialmeldung gespeichert", `Material:<br><b>${material}</b>`);
    };
    return;
  }

  const shift = findOpenShift(user.userId, result.qr.Objekt_ID);

  if (!shift) {
    appModal("Keine Schicht gefunden", "Für diesen QR-Code wurde keine offene Schicht gefunden.");
    return;
  }

  const now = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  if (!shift.Checkin_Zeit) {
    shift.Checkin_Zeit = now;
    shift.Status = "GESTARTET";
    saveAll();

    appModal("Schicht gestartet", `
      Objekt:<br><b>${shift.Objekt_Name}</b><br><br>
      Check-In:<br><b>${now}</b>
    `);
    return;
  }

  if (!shift.Checkout_Zeit) {
    shift.Checkout_Zeit = now;
    shift.Status = "ABGESCHLOSSEN";
    saveAll();

    appModal("Schicht beendet", `
      Objekt:<br><b>${shift.Objekt_Name}</b><br><br>
      Check-Out:<br><b>${now}</b>
    `);
    return;
  }

  appModal("Info", "Schicht bereits abgeschlossen.");
}

function showMyShifts(user) {
  const myShifts = shifts.filter(s => s.Mitarbeiter_ID === user.userId);
  if (!myShifts.length) return appModal("Meine Schichten", "Keine Schichten vorhanden.");

  appModal("Meine Schichten", myShifts.map(formatShift).join("<hr>"));
}

function showAllShifts() {
  appModal("Schichten", shifts.map(formatShift).join("<hr>"));
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
  window.currentUserForForm = user;

  inputModal("Krankmeldung", [
    { id: "sickReason", label: "Grund", placeholder: "z. B. krank / Arzttermin" }
  ], "submitSickReport");
}

window.submitSickReport = function () {
  const user = window.currentUserForForm;
  const reason = document.getElementById("sickReason").value;

  if (!reason) return;

  sickReports.push({
    id: `SICK-${Date.now()}`,
    userId: user.userId,
    name: `${user.firstName} ${user.lastName}`,
    date: new Date().toLocaleDateString("de-DE"),
    reason,
    status: "GEMELDET"
  });

  saveAll();
  closeModal();
  appModal("Krankmeldung gespeichert", `Status:<br><b>GEMELDET</b><br><br>Grund:<br>${reason}`);
};

function openVacationForm(user) {
  window.currentUserForForm = user;

  inputModal("Urlaub beantragen", [
    { id: "vacFrom", label: "Von", placeholder: "TT.MM.JJJJ" },
    { id: "vacTo", label: "Bis", placeholder: "TT.MM.JJJJ" },
    { id: "vacReason", label: "Grund optional", placeholder: "optional" }
  ], "submitVacationRequest");
}

window.submitVacationRequest = function () {
  const user = window.currentUserForForm;
  const from = document.getElementById("vacFrom").value;
  const to = document.getElementById("vacTo").value;
  const reason = document.getElementById("vacReason").value || "-";

  if (!from || !to) return;

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
  appModal("Urlaubsantrag gespeichert", `Von:<br><b>${from}</b><br><br>Bis:<br><b>${to}</b><br><br>Status:<br><b>BEANTRAGT</b>`);
};

function showSickReports() {
  if (!sickReports.length) return appModal("Krankmeldungen", "Keine Krankmeldungen vorhanden.");

  appModal("Krankmeldungen", sickReports.map(r =>
    `Mitarbeiter:<br><b>${r.name}</b><br><br>Datum:<br>${r.date}<br><br>Grund:<br>${r.reason}<br><br>Status:<br><b>${r.status}</b>`
  ).join("<hr>"));
}

function showVacationRequests() {
  if (!vacationRequests.length) return appModal("Urlaubsanträge", "Keine Urlaubsanträge vorhanden.");

  appModal("Urlaubsanträge", vacationRequests.map(v =>
    `Mitarbeiter:<br><b>${v.name}</b><br><br>Von:<br>${v.from}<br><br>Bis:<br>${v.to}<br><br>Grund:<br>${v.reason}<br><br>Status:<br><b>${v.status}</b>`
  ).join("<hr>"));
}

function showMaterialReports() {
  if (!materialReports.length) return appModal("Materialmeldungen", "Keine Materialmeldungen vorhanden.");

  appModal("Materialmeldungen", materialReports.map(m =>
    `Objekt:<br><b>${m.objectName}</b><br><br>Material:<br>${m.material}<br><br>Zeit:<br>${m.createdAt}<br><br>Status:<br><b>${m.status}</b>`
  ).join("<hr>"));
}

function showObjects() {
  appModal("Objekte", objects.map(o =>
    `Objekt:<br><b>${o.Name}</b><br><br>Adresse:<br>${o.Adresse}<br><br>Objekt-ID:<br>${o.Objekt_ID}`
  ).join("<hr>"));
}

function showUsers() {
  appModal("Benutzer", users.map(u =>
    `Name:<br><b>${u.Vorname} ${u.Nachname}</b><br><br>Rolle:<br>${u.Rolle}<br><br>Status:<br><b>${u.Aktiv}</b>`
  ).join("<hr>"));
}

const savedUser = localStorage.getItem("facilityUser");

if (savedUser) {
  renderDashboard(JSON.parse(savedUser));
}

const loginBtn = document.getElementById("loginBtn");

loginBtn?.addEventListener("click", () => {
  const email = document.getElementById("email")?.value || "";
  const password = document.getElementById("password")?.value || "";
  const message = document.getElementById("message");

  const result = login(email, password);

  if (!result.success) {
    message.innerText = result.message;
    message.style.color = "red";
    return;
  }

  localStorage.setItem("facilityUser", JSON.stringify(result.user));

  message.innerText = `Login erfolgreich (${result.user.role})`;
  message.style.color = "green";

  setTimeout(() => {
    renderDashboard(result.user);
  }, 300);
});
