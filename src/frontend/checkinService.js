import { appState } from "./appState.js";

import { processQrCode } from "./qrService.js";

import { validateLocation } from "./gpsService.js";

import { startShift } from "./shiftService.js";

export async function processCheckin({
  qrCode,
  qrCodes = [],
  objects = []
}) {

  const qrResult =
    processQrCode({
      qrCode,
      qrCodes,
      objects
    });

  if (!qrResult.success) {
    return qrResult;
  }

  const object = qrResult.object;

  const gpsResult =
    await validateLocation(
      object.Latitude,
      object.Longitude
    );

  if (!gpsResult.allowed) {

    appState.qrValidated = false;
    appState.gpsValidated = false;

    return {
      success: false,
      message:
        "Standortprüfung fehlgeschlagen"
    };
  }

  appState.qrValidated = true;
  appState.gpsValidated = true;
  appState.currentObject = object;

  return startShift();
}
