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

const defaultShifts = [
  {
    Shift_ID: "SHIFT-001",
    Mitarbeiter_ID: "USR-002",
    Objekt_ID: "OBJ-001",
    Objekt_Name: "Apotheke Mueller",
    Datum: "2026-05-29",
    Startzeit: "07:00",
    Endzeit: "08:30",
    Status: "GEPLANT",
    Checkin_Zeit: null,
    Checkout_Zeit: null
  }
];

let shifts =
  JSON.parse(localStorage.getItem("facilityShifts")) ||
  defaultShifts;

function saveShifts() {
  localStorage.setItem(
    "facilityShifts",
    JSON.stringify(shifts)
  );
}

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

function findOpenShift(userId, objectId) {
  return shifts.find(
    (shift) =>
      shift.Mitarbeiter_ID === userId &&
      shift.Objekt_ID === objectId &&
      shift.Status !== "ABGESCHLOSSEN"
  );
}

function login(email, password) {
  const user = users.find(
    (u) =>
      u.Email.toLowerCase().trim() ===
      email.toLowerCase().trim()
  );

  if (!user) {
    return {
      success: false,
      message: "Benutzer nicht gefunden"
    };
  }

  if (user.Aktiv !== "JA") {
    return {
      success: false,
      message: "Benutzer deaktiviert"
    };
  }

  if (user.Passwort !== password) {
    return {
      success: false,
      message: "Falsches Passwort"
    };
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

<div id="qrReader"></div>

        <button id="logoutBtn">Logout</button>
      </section>
    </main>
  `;

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("facilityUser");
    location.reload();
  });
document.getElementById("sickBtn")?.addEventListener("click", () => {
  reportSick(user);
});
  document.getElementById("qrScanBtn")?.addEventListener("click", () => {
    handleQRScan(user);
  });

  document.getElementById("myShiftBtn")?.addEventListener("click", () => {
    showMyShifts(user);
  });
}

function handleQRScan(user) {
  const reader =
    document.getElementById(
      "qrReader"
    );

  reader.style.display =
    "block";

  const html5QrCode =
    new Html5Qrcode(
      "qrReader"
    );

  html5QrCode.start(
    {
      facingMode:
        "environment"
    },
    {
      fps: 10,
      qrbox: 250
    },
    (decodedText) => {
      html5QrCode.stop();

      reader.style.display =
        "none";

      const qrResult =
        detectQRType(
          decodedText
        );

      if (
        !qrResult.success
      ) {
        alert(
          qrResult.message
        );
        return;
      }

      const shift =
        findOpenShift(
          user.userId,
          qrResult.qr.Objekt_ID
        );

      if (!shift) {
        alert(
          "Keine passende offene Schicht gefunden"
        );
        return;
      }

      const now =
        new Date()
          .toLocaleTimeString(
            "de-DE",
            {
              hour:
                "2-digit",
              minute:
                "2-digit"
            }
          );

      if (
        !shift.Checkin_Zeit
      ) {
        shift.Checkin_Zeit =
          now;

        shift.Status =
          "GESTARTET";

        saveShifts();

        alert(
          `Schicht gestartet

${shift.Objekt_Name}

${now}`
        );

        return;
      }

      if (
        !shift.Checkout_Zeit
      ) {
        shift.Checkout_Zeit =
          now;

        shift.Status =
          "ABGESCHLOSSEN";

        saveShifts();

        alert(
          `Schicht beendet

${shift.Objekt_Name}

${now}`
        );

        return;
      }

      alert(
        "Schicht bereits abgeschlossen"
      );
    }
  );
}

function showMyShifts(user) {
  const myShifts = shifts.filter(
    (shift) => shift.Mitarbeiter_ID === user.userId
  );

  if (!myShifts.length) {
    alert("Keine Schichten vorhanden");
    return;
  }

  const text = myShifts
    .map(
      (shift) =>
        `Objekt:\n${shift.Objekt_Name}\n\nStatus:\n${shift.Status}\n\nCheck-In:\n${shift.Checkin_Zeit || "-"}\n\nCheck-Out:\n${shift.Checkout_Zeit || "-"}`
    )
    .join("\n\n────────\n\n");

  alert(text);
}
function reportSick(user) {
  const reason =
    prompt(
      "Grund der Krankmeldung"
    );

  if (!reason) return;

  const today =
    new Date()
      .toLocaleDateString(
        "de-DE"
      );

  alert(
    `Krankmeldung gespeichert

Mitarbeiter:
${user.firstName}
${user.lastName}

Datum:
${today}

Grund:
${reason}`
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

  if (role === "OBJEKTLEITER") {
    return `
      <button>Schichten</button>
      <button>Tickets</button>
      <button>Vertretungen</button>
    `;
  }

  if (role === "MITARBEITER") {
    return `
      <button id="qrScanBtn">QR scannen</button>
      <button id="myShiftBtn">Meine Schichten</button>
      <button id="sickBtn">
  Krank melden
</button>
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
