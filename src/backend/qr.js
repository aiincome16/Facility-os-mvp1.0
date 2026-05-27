import { googleSheets } from "./services/googleSheets.js";
import { safeLowercase } from "./utils/helpers.js";

export function findQRCode(qrId) {
  if (!qrId) return null;

  return googleSheets.findByField(
    "27_QRCodes",
    "QR_ID",
    String(qrId).trim()
  );
}

export function detectQRType(qrId) {
  const qr = findQRCode(qrId);

  if (!qr) {
    return {
      success: false,
      message: "QR-Code nicht gefunden"
    };
  }

  if (safeLowercase(qr.Aktiv) !== "ja") {
    return {
      success: false,
      message: "QR-Code ist deaktiviert"
    };
  }

  return {
    success: true,
    qrType: qr.QR_Typ,
    targetArea: qr.Ziel_Bereich,
    objectId: qr.Objekt_ID,
    qr
  };
}
