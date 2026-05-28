import { googleSheets } from "../backend/services/googleSheets.js";
import { login } from "../backend/auth.js";
import { detectQRType } from "../backend/qr.js";

// -------------------------
// TESTDATEN
// -------------------------

googleSheets.registerSheet("01_Users", [
  {
    User_ID: "USR-001",
    Vorname: "Kristin",
    Nachname: "Rabener",
    Rolle: "ADMIN",
    Email: "allrountin@gmail.com",
    Passwort: "Test123!",
    Aktiv: "JA"
  },
  {
    User_ID: "USR-002",
    Vorname: "Anna",
    Nachname: "Becker",
    Rolle: "MITARBEITER",
    Email: "anna@test.de",
    Passwort: "Test123!",
    Aktiv: "JA"
  },
  {
    User_ID: "USR-004",
    Vorname: "Sarah",
    Nachname: "Mueller",
    Rolle: "OBJEKTLEITER",
    Email: "sarah@test.de",
    Passwort: "Test123!",
    Aktiv: "JA"
  }
]);

googleSheets.registerSheet("27_QRCodes", [
  {
    QR_ID: "QR-001",
    Objekt_ID: "OBJ-001",
    QR_Typ: "OBJEKT_CHECKIN_CHECKOUT",
    Ziel_Bereich: "SCHICHT",
    Beschreibung: "Eingang Apotheke Mueller",
    Aktiv: "JA"
  },
  {
    QR_ID: "QR-002",
    Objekt_ID: "OBJ-001",
    QR_Typ: "MATERIAL_LAGER",
    Ziel_Bereich: "MATERIAL",
    Beschreibung: "Materialschrank Apotheke Mueller",
    Aktiv: "JA"
  }
]);

// -------------------------
// TESTS
// -------------------------

console.log(
  login(
    "allrountin@gmail.com",
    "Test123!"
  )
);

console.log(
  detectQRType("QR-001")
);

console.log(
  detectQRType("QR-999")
);

// -------------------------
// DASHBOARD
// -------------------------

function renderDashboard(user) {
  document.body.innerHTML = `
    <main class="app">
      <section class="card">
        <h1>Facility-OS</h1>

        <p>
          ${user.firstName}
          ${user.lastName}
        </p>

        <p>
          Rolle:
          ${user.role}
        </p>

        <div class="menu">
          ${getMenuByRole(user.role)}
        </div>

        <button id="logoutBtn">
          Logout
        </button>
      </section>
    </main>
  `;

  document
    .getElementById(
      "logoutBtn"
    )
    ?.addEventListener(
      "click",
      () => {
        localStorage.removeItem(
          "facilityUser"
        );

        location.reload();
      }
    );
}

function getMenuByRole(role) {
  if (role === "ADMIN") {
    return `
      <button>Benutzer</button>
      <button>Objekte</button>
      <button>System</button>
    `;
  }

  if (
    role ===
    "OBJEKTLEITER"
  ) {
    return `
      <button>Schichten</button>
      <button>Tickets</button>
      <button>Vertretungen</button>
    `;
  }

  if (
    role ===
    "MITARBEITER"
  ) {
    return `
      <button>QR scannen</button>
      <button>Meine Schichten</button>
      <button>Krank melden</button>
      <button>Urlaub beantragen</button>
    `;
  }

  return "";
}

// -------------------------
// LOGIN
// -------------------------

const loginBtn =
  document.getElementById(
    "loginBtn"
  );

loginBtn?.addEventListener(
  "click",
  () => {
    const email =
      document.getElementById(
        "email"
      )?.value || "";

    const password =
      document.getElementById(
        "password"
      )?.value || "";

    const result =
      login(
        email,
        password
      );

    const message =
      document.getElementById(
        "message"
      );

    if (!message) return;

    if (!result.success) {
      message.innerText =
        result.message;

      message.style.color =
        "red";

      return;
    }

    localStorage.setItem(
      "facilityUser",
      JSON.stringify(
        result.user
      )
    );

    message.innerText =
      `Login erfolgreich (${result.user.role})`;

    message.style.color =
      "green";

    console.log(
      "Eingeloggt:",
      result.user
    );

    setTimeout(() => {
      renderDashboard(
        result.user
      );
    }, 500);
  }
);

// -------------------------
// SESSION RESTORE
// -------------------------

const savedUser =
  localStorage.getItem(
    "facilityUser"
  );

if (savedUser) {
  renderDashboard(
    JSON.parse(savedUser)
  );
}
