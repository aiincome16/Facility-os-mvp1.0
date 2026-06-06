import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";

let html5QrCode = null;

export function openQrScanner() {
  const overlay =
    document.getElementById("qrOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("hidden");

  appState.qrScannerActive = true;

  startCamera();
}

export function closeQrScanner() {
  const overlay =
    document.getElementById("qrOverlay");

  if (overlay) {
    overlay.classList.add("hidden");
  }

  appState.qrScannerActive = false;

  stopCamera();
}

async function startCamera() {
  try {

    if (
      typeof Html5Qrcode === "undefined"
    ) {
      showToast(
        "QR-Bibliothek fehlt",
        "ERROR"
      );

      return;
    }

    html5QrCode =
      new Html5Qrcode(
        "qrReader"
      );

    await html5QrCode.start(
      {
        facingMode: "environment"
      },
      {
        fps: 10,
        qrbox: 250
      },
      onQrSuccess
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Kamera konnte nicht gestartet werden",
      "ERROR"
    );

  }
}

async function stopCamera() {

  try {

    if (html5QrCode) {

      await html5QrCode.stop();

      await html5QrCode.clear();

      html5QrCode = null;

    }

  } catch (error) {

    console.error(error);

  }

}

function onQrSuccess(decodedText) {

  appState.currentQrCode =
    decodedText;

  showToast(
    "QR-Code erkannt",
    "SUCCESS"
  );

  closeQrScanner();

  processQr(
    decodedText
  );

}

export function processQr(qrCode) {

  console.log(
    "QR erkannt:",
    qrCode
  );

  /*
     Hier später:

     Objekt suchen
     GPS prüfen
     Schicht starten
     Kundenwünsche laden
     Objekt-Wiki öffnen
  */

}

export function manualQrInput() {

  const code =
    prompt(
      "QR-Code eingeben"
    );

  if (!code) {
    return;
  }

  processQr(code);

}

export function bindQrEvents() {

  const closeBtn =
    document.getElementById(
      "closeQrBtn"
    );

  const manualBtn =
    document.getElementById(
      "manualQrBtn"
    );

  if (closeBtn) {
    closeBtn.addEventListener(
      "click",
      closeQrScanner
    );
  }

  if (manualBtn) {
    manualBtn.addEventListener(
      "click",
      manualQrInput
    );
  }

}