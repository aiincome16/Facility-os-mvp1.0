import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";
import { processCheckin } from "./checkinService.js";
import { showDailyControl } from "./dailyControlUi.js";

let html5QrCode = null;

export function openQrScanner() {
  const overlay = document.getElementById("qrOverlay");

  if (!overlay) {
    showToast("QR-Fenster nicht gefunden", "ERROR");
    return;
  }

  overlay.classList.remove("hidden");
  appState.qrScannerActive = true;

  startCamera();
}

export function closeQrScanner() {
  const overlay = document.getElementById("qrOverlay");

  if (overlay) {
    overlay.classList.add("hidden");
  }

  appState.qrScannerActive = false;
  stopCamera();
}

async function startCamera() {
  try {
    if (typeof Html5Qrcode === "undefined") {
      showToast("QR-Bibliothek fehlt", "ERROR");
      return;
    }

    if (html5QrCode) {
      return;
    }

    html5QrCode = new Html5Qrcode("qrReader");

    await html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      onQrSuccess
    );
  } catch (error) {
    console.error(error);
    showToast("Kamera konnte nicht gestartet werden", "ERROR");
  }
}

async function stopCamera() {
  try {
    if (!html5QrCode) {
      return;
    }

    await html5QrCode.stop();
    await html5QrCode.clear();

    html5QrCode = null;
  } catch (error) {
    console.error(error);
  }
}

async function onQrSuccess(decodedText) {
  appState.currentQrCode = decodedText;

  showToast("QR-Code erkannt", "SUCCESS");

  closeQrScanner();

  await processQr(decodedText);
}

export async function processQr(qrCode) {
  if (!qrCode) {
    showToast("QR-Code fehlt", "ERROR");
    return;
  }

  const result = await processCheckin({
    qrCode,
    qrCodes: appState.qrCodes || [],
    objects: appState.cachedObjects || []
  });

  showToast(
    result.message,
    result.success ? "SUCCESS" : "ERROR"
  );

  if (!result.success) {
    return;
  }

  showDailyControl();
}

export function manualQrInput() {
  const code = prompt("QR-Code eingeben");

  if (!code) {
    return;
  }

  processQr(code);
}

export function bindQrEvents() {
  const closeBtn = document.getElementById("closeQrBtn");
  const manualBtn = document.getElementById("manualQrBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeQrScanner);
  }

  if (manualBtn) {
    manualBtn.addEventListener("click", manualQrInput);
  }
}
