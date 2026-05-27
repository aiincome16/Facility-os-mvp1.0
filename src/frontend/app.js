import { googleSheets } from "../backend/services/googleSheets.js";
import { login } from "../backend/auth.js";
import { detectQRType } from "../backend/qr.js";

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
