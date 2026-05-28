const users = [
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
];
const qrCodes = [
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
];

function detectQRType(qrId) {
  const qr = qrCodes.find(
    (item) =>
      item.QR_ID.toLowerCase() ===
      qrId.toLowerCase()
  );

  if (!qr) {
    return {
      success: false,
      message: "QR-Code nicht gefunden"
    };
  }

  if (qr.Aktiv !== "JA") {
    return {
      success: false,
      message: "QR-Code deaktiviert"
    };
  }

  return {
    success: true,
    qr
  };
}
function login(email, password) {
  const user = users.find(
    (u) =>
      u.Email.toLowerCase().trim() ===
      email.toLowerCase().trim()
  );

  if (!user) {
    return { success: false, message: "Benutzer nicht gefunden" };
  }

  if (user.Aktiv !== "JA") {
    return { success: false, message: "Benutzer deaktiviert" };
  }

  if (user.Passwort !== password) {
    return { success: false, message: "Falsches Passwort" };
  }

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

        <div class="menu">
          ${getMenuByRole(user.role)}
        </div>

        <button id="logoutBtn">Logout</button>
      </section>
    </main>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("facilityUser");
    location.reload();
  });
}

function getMenuByRole(role) {
  if (role === "ADMIN") {
    return `
      <button>Benutzer</button>
      <button>Objekte</button>
      <button>System</button>
    `;
  }

  if (role === "OBJEKTLEITER") {
    return `
      <button>Schichten</button>
      <button>Tickets</button>
      <button>Vertretungen</button>
    `;
  }

  if (role === "MITARBEITER") {
    return `
      <button>QR scannen</button>
      <button>Meine Schichten</button>
      <button>Krank melden</button>
      <button>Urlaub beantragen</button>
    `;
  }

  return "";
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
