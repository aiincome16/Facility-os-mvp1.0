const BRANDING = {
  appName: "Facility-OS",
  subtitle: "Mobile Facility Management",
  primaryColor: "#2563eb",
  accentColor: "#22c55e"
};

const users = [
  { User_ID: "USR-001", Vorname: "Kristin", Nachname: "Rabener", Rolle: "ADMIN", Email: "allrountin@gmail.com", Passwort: "Test123!", Aktiv: "JA" },
  { User_ID: "USR-002", Vorname: "Anna", Nachname: "Becker", Rolle: "MITARBEITER", Email: "anna@test.de", Passwort: "Test123!", Aktiv: "JA" },
  { User_ID: "USR-003", Vorname: "Lisa", Nachname: "Schneider", Rolle: "MITARBEITER", Email: "lisa@test.de", Passwort: "Test123!", Aktiv: "JA" },
  { User_ID: "USR-004", Vorname: "Sarah", Nachname: "Mueller", Rolle: "OBJEKTLEITER", Email: "sarah@test.de", Passwort: "Test123!", Aktiv: "JA" },
  { User_ID: "USR-005", Vorname: "Apotheke", Nachname: "Mueller", Rolle: "KUNDE", Email: "kunde@test.de", Passwort: "Test123!", Aktiv: "JA" }
];

const objects = [
  {
    Objekt_ID: "OBJ-001",
    Name: "Apotheke Mueller",
    Adresse: "Musterstraße 1, Wimmelburg",
    Ansprechpartner: "Herr Mueller",
    Telefon: "03475 000000",
    Objektleiter_ID: "USR-004"
  },
  {
    Objekt_ID: "OBJ-002",
    Name: "Praxis Schmidt",
    Adresse: "Hauptstraße 12, Halle",
    Ansprechpartner: "Frau Schmidt",
    Telefon: "0345 000000",
    Objektleiter_ID: "USR-004"
  }
];

const objectGuides = [
  {
    Objekt_ID: "OBJ-001",
    Zugang: "Hintereingang über Parkplatz. Türcode beim Objektleiter hinterlegt.",
    Schluesselort: "Grauer Schlüsselkasten links neben dem Hintereingang.",
    Materiallager: "Abstellraum hinten rechts, Regal 2.",
    Muellstandort: "Mülltonnen hinter dem Gebäude, Zugang über Seitentor.",
    Alarmanlage: "Nach 20:00 Uhr aktivieren. Bedienfeld im Flur neben Büro.",
    Parken: "Parkplatz hinter dem Objekt nutzen, nicht vor Kundeneingang.",
    Besonderheiten: "Laborraum nicht betreten. Verkaufsfläche besonders auf Glas und Spuren prüfen.",
    Grundriss: ["Hintereingang", "Verkaufsraum", "Sanitär", "Lager / Personalbereich"],
    Video: "Demo-Video-Begehung: Rundgang vom Hintereingang durch alle freigegebenen Räume."
  },
  {
    Objekt_ID: "OBJ-002",
    Zugang: "Haupteingang über Praxisflur.",
    Schluesselort: "Schlüssel liegt im gesicherten Schlüsseltresor im Technikraum.",
    Materiallager: "Putzwagen im Abstellraum neben WC.",
    Muellstandort: "Restmüll im Hof links, Papier im Keller.",
    Alarmanlage: "Keine Alarmanlage aktiv.",
    Parken: "Kurzzeitparkplatz vor dem Objekt.",
    Besonderheiten: "Behandlungsräume nur nach Freigabe reinigen.",
    Grundriss: ["Haupteingang", "Empfang", "Wartebereich", "Sanitär"],
    Video: "Demo-Video-Begehung: Praxisrundgang mit Fokus auf Wartebereich und Sanitär."
  }
];

const cleaningMaterials = [
  { Material_ID: "MAT-001", Name: "Sanitärreiniger", Kategorie: "Reiniger", Gefahr: "Nicht mit Chlor mischen. Handschuhe tragen.", Dosierung: "50 ml auf 5 Liter Wasser", NichtAuf: "Naturstein, empfindliche Oberflächen" },
  { Material_ID: "MAT-002", Name: "Glasreiniger", Kategorie: "Reiniger", Gefahr: "Nicht einatmen. Nicht auf heiße Flächen sprühen.", Dosierung: "Direkt anwenden", NichtAuf: "unversiegeltes Holz" },
  { Material_ID: "MAT-003", Name: "Neutralreiniger", Kategorie: "Reiniger", Gefahr: "Kontakt mit Augen vermeiden.", Dosierung: "30 ml auf 5 Liter Wasser", NichtAuf: "-" },
  { Material_ID: "MAT-004", Name: "Rote Reinigungstücher", Kategorie: "Material", Gefahr: "Nur Sanitärbereich.", Dosierung: "-", NichtAuf: "-" },
  { Material_ID: "MAT-005", Name: "Blaue Reinigungstücher", Kategorie: "Material", Gefahr: "Nur allgemeine Flächen.", Dosierung: "-", NichtAuf: "-" },
  { Material_ID: "MAT-006", Name: "Müllbeutel klein", Kategorie: "Material", Gefahr: "-", Dosierung: "-", NichtAuf: "-" },
  { Material_ID: "MAT-007", Name: "Toilettenpapier", Kategorie: "Verbrauch", Gefahr: "-", Dosierung: "-", NichtAuf: "-" }
];

const objectMaterialMap = [
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-001" },
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-002" },
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-003" },
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-004" },
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-005" },
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-006" },
  { Objekt_ID: "OBJ-001", Material_ID: "MAT-007" },
  { Objekt_ID: "OBJ-002", Material_ID: "MAT-001" },
  { Objekt_ID: "OBJ-002", Material_ID: "MAT-003" },
  { Objekt_ID: "OBJ-002", Material_ID: "MAT-004" },
  { Objekt_ID: "OBJ-002", Material_ID: "MAT-006" },
  { Objekt_ID: "OBJ-002", Material_ID: "MAT-007" }
];

const roomPlans = [
  {
    Raum_ID: "ROOM-001",
    Objekt_ID: "OBJ-001",
    Raum: "Verkaufsraum",
    Reihenfolge: 1,
    Sollzeit_Min: 20,
    Intervall: "Täglich",
    Aufgaben: ["Eingangsglas reinigen", "Thekenbereich abwischen", "Boden saugen/wischen", "Fingerabdrücke entfernen"],
    Materialien: ["MAT-002", "MAT-003", "MAT-005"],
    Kontrollpunkte: ["Glas streifenfrei", "Boden trocken", "Theke ohne Staub"],
    Hinweis: "Nicht direkt auf Bildschirme oder Kassenbereich sprühen."
  },
  {
    Raum_ID: "ROOM-002",
    Objekt_ID: "OBJ-001",
    Raum: "Sanitär",
    Reihenfolge: 2,
    Sollzeit_Min: 12,
    Intervall: "Täglich",
    Aufgaben: ["WC reinigen", "Waschbecken reinigen", "Spiegel reinigen", "Mülleimer leeren", "Boden wischen"],
    Materialien: ["MAT-001", "MAT-002", "MAT-004", "MAT-006"],
    Kontrollpunkte: ["WC sauber", "Spiegel streifenfrei", "Müllbeutel erneuert"],
    Hinweis: "Sanitärreiniger nicht mit anderen Reinigern mischen."
  },
  {
    Raum_ID: "ROOM-003",
    Objekt_ID: "OBJ-001",
    Raum: "Lager / Personalbereich",
    Reihenfolge: 3,
    Sollzeit_Min: 10,
    Intervall: "2x wöchentlich",
    Aufgaben: ["Flächen abwischen", "Boden reinigen", "Müll prüfen"],
    Materialien: ["MAT-003", "MAT-005", "MAT-006"],
    Kontrollpunkte: ["Regale nicht umräumen", "Keine Ware versetzen"],
    Hinweis: "Kundenware nicht berühren."
  },
  {
    Raum_ID: "ROOM-004",
    Objekt_ID: "OBJ-002",
    Raum: "Wartebereich",
    Reihenfolge: 1,
    Sollzeit_Min: 15,
    Intervall: "Täglich",
    Aufgaben: ["Stühle abwischen", "Tische reinigen", "Boden reinigen", "Müll leeren"],
    Materialien: ["MAT-003", "MAT-005", "MAT-006"],
    Kontrollpunkte: ["Stühle sauber", "Tische frei", "Boden ohne sichtbaren Schmutz"],
    Hinweis: "Zeitschriften nicht entsorgen."
  },
  {
    Raum_ID: "ROOM-005",
    Objekt_ID: "OBJ-002",
    Raum: "Sanitär Praxis",
    Reihenfolge: 2,
    Sollzeit_Min: 12,
    Intervall: "Täglich",
    Aufgaben: ["WC reinigen", "Waschbecken reinigen", "Spiegel reinigen", "Boden wischen"],
    Materialien: ["MAT-001", "MAT-004", "MAT-006"],
    Kontrollpunkte: ["Papier prüfen", "Seife prüfen", "Müll prüfen"],
    Hinweis: "Handschuhe Pflicht."
  }
];

const wastePlans = [
  { Objekt_ID: "OBJ-001", Muellart: "Papier", Intervall: "Montag", Uhrzeit: "bis 06:00", Standort: "Blaue Tonne hinter Gebäude", PflichtBeimCheckout: "JA" },
  { Objekt_ID: "OBJ-001", Muellart: "Restmüll", Intervall: "Freitag", Uhrzeit: "nach Reinigung", Standort: "Schwarze Tonne hinter Gebäude", PflichtBeimCheckout: "JA" },
  { Objekt_ID: "OBJ-002", Muellart: "Restmüll", Intervall: "Dienstag und Freitag", Uhrzeit: "nach Reinigung", Standort: "Hof links", PflichtBeimCheckout: "JA" }
];

const qrCodes = [
  { QR_ID: "QR-001", Objekt_ID: "OBJ-001", QR_Typ: "OBJEKT_CHECKIN_CHECKOUT", Beschreibung: "Eingang Apotheke Mueller", Aktiv: "JA" },
  { QR_ID: "QR-002", Objekt_ID: "OBJ-001", QR_Typ: "MATERIAL_LAGER", Beschreibung: "Materialschrank Apotheke Mueller", Aktiv: "JA" },
  { QR_ID: "QR-003", Objekt_ID: "OBJ-002", QR_Typ: "OBJEKT_CHECKIN_CHECKOUT", Beschreibung: "Eingang Praxis Schmidt", Aktiv: "JA" }
];

const defaultShifts = [
  { Shift_ID: "SHIFT-001", Mitarbeiter_ID: "USR-002", Objekt_ID: "OBJ-001", Objekt_Name: "Apotheke Mueller", Datum: "2026-05-29", Startzeit: "07:00", Endzeit: "08:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null, Vertretung_ID: null },
  { Shift_ID: "SHIFT-002", Mitarbeiter_ID: "USR-002", Objekt_ID: "OBJ-002", Objekt_Name: "Praxis Schmidt", Datum: "2026-05-30", Startzeit: "08:00", Endzeit: "09:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null, Vertretung_ID: null },
  { Shift_ID: "SHIFT-003", Mitarbeiter_ID: "USR-003", Objekt_ID: "OBJ-001", Objekt_Name: "Apotheke Mueller", Datum: "2026-05-31", Startzeit: "07:00", Endzeit: "08:30", Status: "GEPLANT", Checkin_Zeit: null, Checkout_Zeit: null, Vertretung_ID: null }
];

let shifts = JSON.parse(localStorage.getItem("facilityShifts")) || defaultShifts;
let sickReports = JSON.parse(localStorage.getItem("facilitySickReports")) || [];
let vacationRequests = JSON.parse(localStorage.getItem("facilityVacations")) || [];
let materialReports = JSON.parse(localStorage.getItem("facilityMaterials")) || [];
let replacementRequests = JSON.parse(localStorage.getItem("facilityReplacements")) || [];
let knownObjects = JSON.parse(localStorage.getItem("facilityKnownObjects")) || [];
let currentScanner = null;

function saveAll() {
  localStorage.setItem("facilityShifts", JSON.stringify(shifts));
  localStorage.setItem("facilitySickReports", JSON.stringify(sickReports));
  localStorage.setItem("facilityVacations", JSON.stringify(vacationRequests));
  localStorage.setItem("facilityMaterials", JSON.stringify(materialReports));
  localStorage.setItem("facilityReplacements", JSON.stringify(replacementRequests));
  localStorage.setItem("facilityKnownObjects", JSON.stringify(knownObjects));
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

        <div class="badge">Mitarbeiter starten über QR am Objekt</div>

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
      "QR-Login vorbereitet",
      "In der echten App erkennt Facility-OS über QR, GPS und Schichtdaten automatisch Mitarbeiter, Objekt und Einsatz. Für diese Demo bitte Fallback-Login nutzen."
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

function dashboardGroup(title, colorClass, buttons) {
  return `
    <div class="category-title">${title}</div>
    <div class="category">
      ${buttons.map(btn => `
        <button class="${colorClass}" id="${btn.id}">
          ${btn.label}
        </button>
      `).join("")}
    </div>
  `;
}

function getMenuByRole(role) {
  if (role === "MITARBEITER") {
    return `
      ${dashboardGroup("Heute & Schicht", "", [
        { id: "qrScanBtn", label: "QR scannen" },
        { id: "myShiftBtn", label: "Meine Schichten" }
      ])}

      ${dashboardGroup("Objektwissen", "green", [
        { id: "objectInfoBtn", label: "Objektinfo" },
        { id: "floorPlanBtn", label: "Grundriss" },
        { id: "cleaningPlanBtn", label: "Putzplan" },
        { id: "roomsBtn", label: "Räume" },
        { id: "wasteBtn", label: "Müllplan" },
        { id: "dangerBtn", label: "Gefahrenhinweise" }
      ])}

      ${dashboardGroup("Meldungen", "yellow", [
        { id: "materialBtn", label: "Material melden" },
        { id: "sickBtn", label: "Krank melden" },
        { id: "vacationBtn", label: "Urlaub beantragen" }
      ])}

      ${dashboardGroup("Support", "secondary", [
        { id: "helpBtn", label: "Hilfe" }
      ])}
    `;
  }

  if (role === "OBJEKTLEITER") {
    return `
      ${dashboardGroup("Personal & Schichten", "", [
        { id: "managerShiftsBtn", label: "Schichten ansehen" },
        { id: "replacementBtn", label: "Vertretungen" }
      ])}

      ${dashboardGroup("Meldungen", "yellow", [
        { id: "managerSickBtn", label: "Krankmeldungen" },
        { id: "managerVacationBtn", label: "Urlaubsanträge" },
        { id: "managerMaterialBtn", label: "Materialmeldungen" }
      ])}

      ${dashboardGroup("Objekte", "green", [
        { id: "objectsBtn", label: "Objekte" },
        { id: "cleaningPlanBtn", label: "Putzpläne" },
        { id: "dangerBtn", label: "Gefahrenhinweise" }
      ])}
    `;
  }

  if (role === "ADMIN") {
    return `
      ${dashboardGroup("System", "", [
        { id: "usersBtn", label: "Benutzerliste" },
        { id: "objectsBtn", label: "Objekte" }
      ])}

      ${dashboardGroup("Betrieb", "green", [
        { id: "managerShiftsBtn", label: "Alle Schichten" },
        { id: "cleaningPlanBtn", label: "Putzpläne" },
        { id: "dangerBtn", label: "Gefahrenhinweise" }
      ])}

      ${dashboardGroup("Meldungen", "yellow", [
        { id: "managerSickBtn", label: "Krankmeldungen" },
        { id: "managerVacationBtn", label: "Urlaubsanträge" },
        { id: "managerMaterialBtn", label: "Materialmeldungen" },
        { id: "replacementBtn", label: "Vertretungen" }
      ])}
    `;
  }

  if (role === "KUNDE") {
    return `
      ${dashboardGroup("Kundenbereich", "", [
        { id: "customerStatusBtn", label: "Objektstatus" },
        { id: "customerNextBtn", label: "Nächste Reinigung" },
        { id: "customerRequestBtn", label: "Wunsch senden" },
        { id: "customerComplaintBtn", label: "Beschwerde senden" }
      ])}
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
    localStorage.clear();
    appModal("Demo zurückgesetzt", "Die lokalen Demo-Daten wurden gelöscht.");
    setTimeout(() => location.reload(), 900);
  });

  document.getElementById("qrScanBtn")?.addEventListener("click", () => handleQRScan(user));
  document.getElementById("myShiftBtn")?.addEventListener("click", () => showMyShifts(user));
  document.getElementById("objectInfoBtn")?.addEventListener("click", () => showObjectInfoForUser(user));
  document.getElementById("floorPlanBtn")?.addEventListener("click", () => showFloorPlanForUser(user));
  document.getElementById("cleaningPlanBtn")?.addEventListener("click", () => showCleaningPlans(user));
  document.getElementById("roomsBtn")?.addEventListener("click", () => showRoomsForUser(user));
  document.getElementById("wasteBtn")?.addEventListener("click", () => showWastePlanForUser(user));
  document.getElementById("dangerBtn")?.addEventListener("click", () => showDangerHints(user));
  document.getElementById("sickBtn")?.addEventListener("click", () => openSickForm(user));
  document.getElementById("vacationBtn")?.addEventListener("click", () => openVacationForm(user));
  document.getElementById("materialBtn")?.addEventListener("click", () => openMaterialForm(user));
  document.getElementById("helpBtn")?.addEventListener("click", showHelp);

  document.getElementById("managerShiftsBtn")?.addEventListener("click", showAllShifts);
  document.getElementById("managerSickBtn")?.addEventListener("click", showSickReports);
  document.getElementById("managerVacationBtn")?.addEventListener("click", showVacationRequests);
  document.getElementById("managerMaterialBtn")?.addEventListener("click", showMaterialReports);
  document.getElementById("replacementBtn")?.addEventListener("click", showReplacements);
  document.getElementById("objectsBtn")?.addEventListener("click", showObjects);
  document.getElementById("usersBtn")?.addEventListener("click", showUsers);

  document.getElementById("customerStatusBtn")?.addEventListener("click", showCustomerStatus);
  document.getElementById("customerNextBtn")?.addEventListener("click", showCustomerNextCleaning);
  document.getElementById("customerRequestBtn")?.addEventListener("click", () => openCustomerMessage("Wunsch senden"));
  document.getElementById("customerComplaintBtn")?.addEventListener("click", () => openCustomerMessage("Beschwerde senden"));
}

function getPrimaryObjectForUser(user) {
  const shift = shifts.find(s => s.Mitarbeiter_ID === user.userId);
  return shift ? shift.Objekt_ID : objects[0].Objekt_ID;
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
    if (currentScanner) currentScanner.stop().catch(() => {});
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
    decodedText => {
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

  if (!result.success) return appModal("QR Fehler", result.message);

  if (result.qr.QR_Typ === "MATERIAL_LAGER") {
    openMaterialForm(user, result.qr.Objekt_ID);
    return;
  }

  const shift = shifts.find(s =>
    s.Mitarbeiter_ID === user.userId &&
    s.Objekt_ID === result.qr.Objekt_ID &&
    s.Status !== "ABGESCHLOSSEN"
  );

  if (!shift) return appModal("Keine Schicht gefunden", "Für diesen QR-Code wurde keine offene Schicht gefunden.");

  const knownKey = `${user.userId}-${shift.Objekt_ID}`;

  if (!knownObjects.includes(knownKey)) {
    knownObjects.push(knownKey);
    saveAll();
    showFirstObjectInstruction(shift.Objekt_ID);
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

function showFirstObjectInstruction(objectId) {
  const object = objects.find(o => o.Objekt_ID === objectId);
  const guide = objectGuides.find(g => g.Objekt_ID === objectId);

  if (!object || !guide) return;

  appModal(
    "Erstes Mal im Objekt",
    `
      <div class="info-card yellow">
        <div class="card-title">Wichtige Einweisung</div>
        Du bist zum ersten Mal in <b>${object.Name}</b>.
      </div>

      ${formatFloorPlan(guide)}

      <div class="info-card blue"><div class="card-title">Video-Begehung</div>${guide.Video}</div>
      <div class="info-card green"><div class="card-title">Schlüssel</div>${guide.Schluesselort}</div>
      <div class="info-card green"><div class="card-title">Materiallager</div>${guide.Materiallager}</div>
      <div class="info-card yellow"><div class="card-title">Müll</div>${guide.Muellstandort}</div>
      <div class="info-card red"><div class="card-title">Achtung</div>${guide.Besonderheiten}</div>
    `
  );
}

function formatFloorPlan(guide) {
  return `
    <div class="floorplan">
      <b>Grundriss / Raumfolge</b>
      ${guide.Grundriss.map(room => `<div class="floor-room">${room}</div>`).join("")}
    </div>
  `;
}

function showObjectInfoForUser(user) {
  const objectId = getPrimaryObjectForUser(user);
  showObjectInfo(objectId);
}

function showObjectInfo(objectId) {
  const object = objects.find(o => o.Objekt_ID === objectId);
  const guide = objectGuides.find(g => g.Objekt_ID === objectId);

  if (!object || !guide) return appModal("Objektinfo", "Keine Objektinformationen vorhanden.");

  appModal(
    `Objektinfo: ${object.Name}`,
    `
      <div class="info-card blue"><div class="card-title">Adresse</div>${object.Adresse}</div>
      <div class="info-card"><div class="card-title">Ansprechpartner</div>${object.Ansprechpartner}<br>${object.Telefon}</div>
      <div class="info-card green"><div class="card-title">Zugang</div>${guide.Zugang}</div>
      <div class="info-card green"><div class="card-title">Schlüssel</div>${guide.Schluesselort}</div>
      <div class="info-card green"><div class="card-title">Materiallager</div>${guide.Materiallager}</div>
      <div class="info-card yellow"><div class="card-title">Müllstandort</div>${guide.Muellstandort}</div>
      <div class="info-card red"><div class="card-title">Besonderheiten</div>${guide.Besonderheiten}</div>
      <div class="info-card purple"><div class="card-title">Video-Begehung</div>${guide.Video}</div>
      ${formatFloorPlan(guide)}
    `
  );
}

function showFloorPlanForUser(user) {
  const objectId = getPrimaryObjectForUser(user);
  const object = objects.find(o => o.Objekt_ID === objectId);
  const guide = objectGuides.find(g => g.Objekt_ID === objectId);

  if (!object || !guide) return appModal("Grundriss", "Kein Grundriss vorhanden.");

  appModal(`Grundriss: ${object.Name}`, formatFloorPlan(guide));
}

function showCleaningPlans(user = null) {
  const objectId = user?.role === "MITARBEITER" ? getPrimaryObjectForUser(user) : null;
  const plans = objectId ? roomPlans.filter(r => r.Objekt_ID === objectId) : roomPlans;

  appModal("Putzpläne", plans.map(formatRoomPlan).join("") || "Keine Putzpläne vorhanden.");
}

function showRoomsForUser(user) {
  const objectId = getPrimaryObjectForUser(user);
  const plans = roomPlans.filter(r => r.Objekt_ID === objectId);

  appModal("Räume", plans.map(formatRoomPlan).join("") || "Keine Räume vorhanden.");
}

function formatRoomPlan(room) {
  const materials = room.Materialien
    .map(id => cleaningMaterials.find(m => m.Material_ID === id)?.Name || id)
    .join(", ");

  return `
    <div class="info-card blue">
      <div class="card-title">${room.Reihenfolge}. ${room.Raum}</div>
      <b>Sollzeit:</b> ${room.Sollzeit_Min} Minuten<br>
      <b>Intervall:</b> ${room.Intervall}
    </div>

    <div class="info-card green">
      <div class="card-title">Aufgaben</div>
      ${room.Aufgaben.map(a => `• ${a}`).join("<br>")}
    </div>

    <div class="info-card purple">
      <div class="card-title">Mittel</div>
      ${materials}
    </div>

    <div class="info-card yellow">
      <div class="card-title">Kontrollpunkte</div>
      ${room.Kontrollpunkte.map(k => `• ${k}`).join("<br>")}
    </div>

    <div class="info-card red">
      <div class="card-title">Hinweis</div>
      ${room.Hinweis}
    </div>
  `;
}

function showWastePlanForUser(user) {
  const objectId = getPrimaryObjectForUser(user);
  const plans = wastePlans.filter(w => w.Objekt_ID === objectId);

  appModal(
    "Müllplan",
    plans.map(w => `
      <div class="table-row">
        <b>${w.Muellart}</b><br>
        Intervall: ${w.Intervall}<br>
        Uhrzeit: ${w.Uhrzeit}<br>
        Standort: ${w.Standort}<br>
        Pflicht beim Checkout: <b>${w.PflichtBeimCheckout}</b>
      </div>
    `).join("") || "Kein Müllplan vorhanden."
  );
}

function showDangerHints(user = null) {
  const objectId = user?.role === "MITARBEITER" ? getPrimaryObjectForUser(user) : null;
  const materialIds = objectId
    ? objectMaterialMap.filter(x => x.Objekt_ID === objectId).map(x => x.Material_ID)
    : cleaningMaterials.map(m => m.Material_ID);

  const materials = cleaningMaterials.filter(m => materialIds.includes(m.Material_ID));

  appModal(
    "Gefahrenhinweise",
    materials.map(m => `
      <div class="info-card red">
        <div class="card-title">${m.Name}</div>
        Gefahr: ${m.Gefahr}<br><br>
        Dosierung: ${m.Dosierung}<br><br>
        Nicht verwenden auf: ${m.NichtAuf}
      </div>
    `).join("") || "Keine Gefahrenhinweise vorhanden."
  );
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
    <div class="info-card blue">
      <div class="card-title">${s.Objekt_Name}</div>
      Mitarbeiter: <b>${employee?.Vorname || "-"} ${employee?.Nachname || ""}</b><br>
      Datum: ${s.Datum}<br>
      Status: <b>${s.Status}</b><br>
      Check-In: ${s.Checkin_Zeit || "-"}<br>
      Check-Out: ${s.Checkout_Zeit || "-"}<br>
      Vertretung: ${s.Vertretung_ID || "-"}
    </div>
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
      status: "GEMELDET",
      replacementStatus: "OFFEN"
    });

    createReplacementRequest(user, from, to);
    saveAll();
    closeModal();

    appModal("Krankmeldung gespeichert", `Zeitraum:<br><b>${from} bis ${to}</b><br><br>Vertretung:<br><b>OFFEN</b>`);
  };
}

function createReplacementRequest(user, from, to) {
  const affectedShifts = shifts.filter(s => s.Mitarbeiter_ID === user.userId && s.Status !== "ABGESCHLOSSEN");

  affectedShifts.forEach(shift => {
    replacementRequests.push({
      id: `REP-${Date.now()}-${shift.Shift_ID}`,
      sickUserId: user.userId,
      sickName: `${user.firstName} ${user.lastName}`,
      shiftId: shift.Shift_ID,
      objectId: shift.Objekt_ID,
      objectName: shift.Objekt_Name,
      from,
      to,
      candidateId: null,
      candidateName: null,
      status: "OFFEN"
    });
  });function openVacationForm(user) {
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
      status: "BEANTRAGT",
      replacementStatus: "OFFEN"
    });

    createReplacementRequest(user, from, to);
    saveAll();
    closeModal();

    appModal("Urlaubsantrag gespeichert", `Zeitraum:<br><b>${from} bis ${to}</b><br><br>Vertretung:<br><b>OFFEN</b>`);
  };
}

function openMaterialForm(user, fixedObjectId = null) {
  const objectOptions = objects
    .map(o => `<option value="${o.Objekt_ID}">${o.Name}</option>`)
    .join("");

  const objectInput = fixedObjectId
    ? `<input id="materialObject" value="${fixedObjectId}" type="hidden">`
    : `
      <label>Objekt</label>
      <select id="materialObject" onchange="renderMaterialSelect()">
        ${objectOptions}
      </select>
    `;

  appModal(
    "Material melden",
    `
      ${objectInput}

      <label>Material</label>
      <select id="materialName"></select>

      <label>Menge</label>
      <input id="materialQuantity" type="number" min="1" placeholder="z. B. 3">

      <label>Einheit</label>
      <select id="materialUnit">
        <option>Stück</option>
        <option>Liter</option>
        <option>5L Kanister</option>
        <option>10L Kanister</option>
        <option>Rolle</option>
        <option>Packung</option>
        <option>Flasche</option>
        <option>Box</option>
      </select>

      <label>Zustand</label>
      <select id="materialAmount">
        <option>fast leer</option>
        <option>leer</option>
        <option>defekt</option>
        <option>nachbestellen</option>
      </select>

      <label>Foto</label>
      <input id="materialPhoto" type="file" accept="image/*">

      <label>Hinweis</label>
      <textarea id="materialNote" placeholder="optional"></textarea>
    `,
    `<button onclick="submitMaterialReport()">Speichern</button>`
  );

  window.renderMaterialSelect = function () {
    const objectId = document.getElementById("materialObject").value;
    const materialIds = objectMaterialMap
      .filter(x => x.Objekt_ID === objectId)
      .map(x => x.Material_ID);

    const select = document.getElementById("materialName");

    select.innerHTML = cleaningMaterials
      .filter(m => materialIds.includes(m.Material_ID))
      .map(m => `<option value="${m.Name}">${m.Name}</option>`)
      .join("");
  };

  window.renderMaterialSelect();

  window.submitMaterialReport = function () {
    const objectId = document.getElementById("materialObject").value;
    const object = objects.find(o => o.Objekt_ID === objectId);
    const material = document.getElementById("materialName").value;
    const quantity = document.getElementById("materialQuantity").value || "1";
    const unit = document.getElementById("materialUnit").value;
    const amount = document.getElementById("materialAmount").value;
    const note = document.getElementById("materialNote").value.trim();
    const photo = document.getElementById("materialPhoto").files[0]?.name || "-";

    if (!material) return;

    const kiSuggestion =
      amount === "leer" || amount === "defekt"
        ? "KI-Vorschlag: sofort nachbestellen"
        : "KI-Vorschlag: bei nächster Bestellung berücksichtigen";

    materialReports.push({
      id: `MATREP-${Date.now()}`,
      userId: user.userId,
      objectId,
      objectName: object?.Name || objectId,
      material,
      quantity,
      unit,
      amount,
      note,
      photo,
      createdAt: new Date().toLocaleString("de-DE"),
      status: "NEU",
      kiSuggestion
    });

    saveAll();
    closeModal();

    appModal(
      "Materialmeldung gespeichert",
      `
        <div class="info-card green">
          <div class="card-title">Objekt</div>
          ${object?.Name || objectId}
        </div>

        <div class="info-card blue">
          <div class="card-title">Material</div>
          ${material}<br>
          Menge: <b>${quantity} ${unit}</b><br>
          Zustand: ${amount}
        </div>

        <div class="info-card yellow">
          <div class="card-title">KI-Vorschlag</div>
          ${kiSuggestion}
        </div>
      `
    );
  };
}

function showSickReports() {
  appModal(
    "Krankmeldungen",
    sickReports.map(r =>
      `
      <div class="info-card red">
        <div class="card-title">${r.name}</div>
        Von: ${r.from}<br>
        Bis: ${r.to}<br>
        Grund: ${r.reason}<br>
        Status: <b>${r.status}</b><br>
        Vertretung: <b>${r.replacementStatus || "OFFEN"}</b>
      </div>
      `
    ).join("") || "Keine Krankmeldungen vorhanden."
  );
}

function showVacationRequests() {
  appModal(
    "Urlaubsanträge",
    vacationRequests.map(v =>
      `
      <div class="info-card yellow">
        <div class="card-title">${v.name}</div>
        Von: ${v.from}<br>
        Bis: ${v.to}<br>
        Grund: ${v.reason}<br>
        Status: <b>${v.status}</b><br>
        Vertretung: <b>${v.replacementStatus || "OFFEN"}</b>
      </div>
      `
    ).join("") || "Keine Urlaubsanträge vorhanden."
  );
}

function showMaterialReports() {
  appModal(
    "Materialmeldungen",
    materialReports.map(m =>
      `
      <div class="info-card green">
        <div class="card-title">${m.objectName}</div>
        Material: <b>${m.material}</b><br>
        Menge: ${m.quantity || "-"} ${m.unit || ""}<br>
        Zustand: ${m.amount || "-"}<br>
        Foto: ${m.photo || "-"}<br>
        Hinweis: ${m.note || "-"}<br>
        Status: <b>${m.status}</b><br><br>
        ${m.kiSuggestion || ""}
      </div>
      `
    ).join("") || "Keine Materialmeldungen vorhanden."
  );
}

function showReplacements() {
  if (!replacementRequests.length) {
    appModal("Vertretungen", "Keine offenen Vertretungen vorhanden.");
    return;
  }

  appModal(
    "Vertretungen",
    replacementRequests.map(r => `
      <div class="info-card purple">
        <div class="card-title">${r.objectName}</div>
        Mitarbeiter abwesend:<br><b>${r.sickName}</b><br><br>
        Zeitraum:<br>${r.from} bis ${r.to}<br><br>
        Status:<br><b>${r.status}</b><br><br>
        Kandidat:<br><b>${r.candidateName || "-"}</b><br><br>
        <button onclick="findReplacement('${r.id}')">Vertretung suchen</button>
        <button onclick="confirmReplacement('${r.id}')">Vertretung bestätigen</button>
      </div>
    `).join("")
  );
}

window.findReplacement = function (id) {
  const request = replacementRequests.find(r => r.id === id);
  if (!request) return;

  const candidate = users.find(
    u => u.Rolle === "MITARBEITER" && u.User_ID !== request.sickUserId
  );

  request.candidateId = candidate.User_ID;
  request.candidateName = `${candidate.Vorname} ${candidate.Nachname}`;
  request.status = "KANDIDAT_GEFUNDEN";

  saveAll();
  closeModal();

  appModal(
    "Vertretung gefunden",
    `
      <div class="info-card green">
        <div class="card-title">Vorschlag</div>
        ${request.candidateName}
      </div>
      <div class="info-card blue">
        Objekt:<br>${request.objectName}
      </div>
    `
  );
};

window.confirmReplacement = function (id) {
  const request = replacementRequests.find(r => r.id === id);

  if (!request || !request.candidateId) {
    appModal("Noch keine Vertretung", "Bitte zuerst Vertretung suchen.");
    return;
  }

  const shift = shifts.find(s => s.Shift_ID === request.shiftId);

  if (shift) {
    shift.Vertretung_ID = request.candidateId;
    shift.Status = "VERTRETUNG_GEFUNDEN";
  }

  request.status = "BESTAETIGT";

  sickReports.forEach(r => {
    if (r.userId === request.sickUserId) r.replacementStatus = "VERTRETUNG_GEFUNDEN";
  });

  vacationRequests.forEach(v => {
    if (v.userId === request.sickUserId) v.replacementStatus = "VERTRETUNG_GEFUNDEN";
  });

  saveAll();
  closeModal();

  appModal(
    "Vertretung bestätigt",
    `
      <div class="info-card green">
        <div class="card-title">Vertretung</div>
        ${request.candidateName}
      </div>
      <div class="info-card blue">
        Status:<br><b>BESTÄTIGT</b>
      </div>
    `
  );
};

function showObjects() {
  appModal(
    "Objekte",
    objects.map(o =>
      `
      <div class="info-card blue">
        <div class="card-title">${o.Name}</div>
        Adresse: ${o.Adresse}<br>
        Ansprechpartner: ${o.Ansprechpartner}<br>
        Telefon: ${o.Telefon}<br>
        ID: ${o.Objekt_ID}
      </div>
      `
    ).join("")
  );
}

function showUsers() {
  appModal(
    "Benutzer",
    users.map(u =>
      `
      <div class="info-card blue">
        <div class="card-title">${u.Vorname} ${u.Nachname}</div>
        Rolle: ${u.Rolle}<br>
        E-Mail: ${u.Email}<br>
        Status: <b>${u.Aktiv}</b>
      </div>
      `
    ).join("")
  );
}

function showHelp() {
  appModal(
    "Hilfe",
    `
      <div class="info-card blue">
        Bei QR-Problemen Fallback nutzen.
      </div>
      <div class="info-card green">
        Bei neuer Vertretung: Objektinfo, Grundriss, Putzplan und Gefahrenhinweise lesen.
      </div>
      <div class="info-card yellow">
        Vor Checkout: Müllpflicht und offene Hinweise prüfen.
      </div>
    `
  );
}

function showCustomerStatus() {
  appModal(
    "Objektstatus",
    `
      <div class="info-card green">
        <div class="card-title">Letzte Reinigung</div>
        Heute abgeschlossen
      </div>
      <div class="info-card blue">
        Keine offenen Beschwerden.
      </div>
    `
  );
}

function showCustomerNextCleaning() {
  appModal(
    "Nächste Reinigung",
    `
      <div class="info-card blue">
        Nächste geplante Reinigung:<br>
        <b>Morgen 07:00 Uhr</b>
      </div>
    `
  );
}

function openCustomerMessage(type) {
  appModal(
    type,
    `
      <label>Nachricht</label>
      <textarea id="customerMessage" placeholder="Ihre Nachricht"></textarea>
    `,
    `<button onclick="submitCustomerMessage('${type}')">Senden</button>`
  );
}

window.submitCustomerMessage = function (type) {
  const message = document.getElementById("customerMessage").value.trim();

  if (!message) return;

  closeModal();

  appModal(
    "Gesendet",
    `
      <div class="info-card green">
        ${type} wurde an den Objektleiter übermittelt.
      </div>
    `
  );
};

const savedUser = localStorage.getItem("facilityUser");

if (savedUser) {
  renderDashboard(JSON.parse(savedUser));
} else {
  renderLogin();
}
  };
}
