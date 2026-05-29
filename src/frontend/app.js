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
    alert("Demo-Daten zurückgesetzt");
    location.reload();
  });

  document.getElementById("qrScanBtn")?.addEventListener("click", () => handleQRScan(user));
  document.getElementById("myShiftBtn")?.addEventListener("click", () => showMyShifts(user));
  document.getElementById("sickBtn")?.addEventListener("click", () => reportSick(user));
  document.getElementById("vacationBtn")?.addEventListener("click", () => requestVacation(user));

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
    const manual = prompt("Kamera nicht verfügbar. QR-Code manuell eingeben:");
    if (manual) processQR(manual, user);
  });
}

function processQR(qrText, user) {
  const result = detectQRType(qrText);

  if (!result.success) {
    alert(result.message);
    return;
  }

  if (result.qr.QR_Typ === "MATERIAL_LAGER") {
    const material = prompt("Welches Material fehlt?");
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
    alert("Materialmeldung gespeichert");
    return;
  }

  const shift = findOpenShift(user.userId, result.qr.Objekt_ID);

  if (!shift) {
    alert("Keine passende offene Schicht gefunden");
    return;
  }

  const now = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  if (!shift.Checkin_Zeit) {
    shift.Checkin_Zeit = now;
    shift.Status = "GESTARTET";
    saveAll();
    alert(`Schicht gestartet\n\nObjekt:\n${shift.Objekt_Name}\n\nCheck-In:\n${now}`);
    return;
  }

  if (!shift.Checkout_Zeit) {
    shift.Checkout_Zeit = now;
    shift.Status = "ABGESCHLOSSEN";
    saveAll();
    alert(`Schicht beendet\n\nObjekt:\n${shift.Objekt_Name}\n\nCheck-Out:\n${now}`);
    return;
  }

  alert("Schicht bereits abgeschlossen");
}

function showMyShifts(user) {
  const myShifts = shifts.filter(s => s.Mitarbeiter_ID === user.userId);
  if (!myShifts.length) return alert("Keine Schichten vorhanden");

  alert(myShifts.map(formatShift).join("\n\n────────\n\n"));
}

function showAllShifts() {
  alert(shifts.map(formatShift).join("\n\n────────\n\n"));
}

function formatShift(s) {
  const employee = users.find(u => u.User_ID === s.Mitarbeiter_ID);
  return `Mitarbeiter:\n${employee?.Vorname || "-"} ${employee?.Nachname || ""}

Objekt:
${s.Objekt_Name}

Datum:
${s.Datum}

Status:
${s.Status}

Check-In:
${s.Checkin_Zeit || "-"}

Check-Out:
${s.Checkout_Zeit || "-"}`;
}

function reportSick(user) {
  const reason = prompt("Grund der Krankmeldung");
  if (!reason) return;

  const report = {
    id: `SICK-${Date.now()}`,
    userId: user.userId,
    name: `${user.firstName} ${user.lastName}`,
    date: new Date().toLocaleDateString("de-DE"),
    reason,
    status: "GEMELDET"
  };

  sickReports.push(report);
  saveAll();

  alert(`Krankmeldung gespeichert\n\n${report.name}\n${report.date}\n${report.reason}`);
}

function requestVacation(user) {
  const from = prompt("Urlaub von (TT.MM.JJJJ)");
  if (!from) return;

  const to = prompt("Urlaub bis (TT.MM.JJJJ)");
  if (!to) return;

  const reason = prompt("Grund optional") || "-";

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

  alert(`Urlaubsantrag gespeichert\n\nVon: ${from}\nBis: ${to}\nGrund: ${reason}`);
}

function showSickReports() {
  if (!sickReports.length) return alert("Keine Krankmeldungen vorhanden");

  alert(sickReports.map(r =>
    `Mitarbeiter:\n${r.name}\n\nDatum:\n${r.date}\n\nGrund:\n${r.reason}\n\nStatus:\n${r.status}`
  ).join("\n\n────────\n\n"));
}

function showVacationRequests() {
  if (!vacationRequests.length) return alert("Keine Urlaubsanträge vorhanden");

  alert(vacationRequests.map(v =>
    `Mitarbeiter:\n${v.name}\n\nVon:\n${v.from}\n\nBis:\n${v.to}\n\nGrund:\n${v.reason}\n\nStatus:\n${v.status}`
  ).join("\n\n────────\n\n"));
}

function showMaterialReports() {
  if (!materialReports.length) return alert("Keine Materialmeldungen vorhanden");

  alert(materialReports.map(m =>
    `Objekt:\n${m.objectName}\n\nMaterial:\n${m.material}\n\nZeit:\n${m.createdAt}\n\nStatus:\n${m.status}`
  ).join("\n\n────────\n\n"));
}

function showObjects() {
  alert(objects.map(o =>
    `Objekt:\n${o.Name}\n\nAdresse:\n${o.Adresse}\n\nObjekt-ID:\n${o.Objekt_ID}`
  ).join("\n\n────────\n\n"));
}

function showUsers() {
  alert(users.map(u =>
    `Name:\n${u.Vorname} ${u.Nachname}\n\nRolle:\n${u.Rolle}\n\nStatus:\n${u.Aktiv}`
  ).join("\n\n────────\n\n"));
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
