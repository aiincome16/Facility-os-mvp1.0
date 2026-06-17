export function findQrCode(qrCode, qrCodes = []) {
  if (!qrCode) {
    return null;
  }

  return (
    qrCodes.find(
      (item) =>
        item.QR_ID &&
        item.QR_ID.toLowerCase() ===
          String(qrCode).trim().toLowerCase()
    ) || null
  );
}

export function findObjectByQrCode(qrCodeData, objects = []) {
  if (!qrCodeData || !qrCodeData.Objekt_ID) {
    return null;
  }

  return (
    objects.find(
      (object) =>
        object.Objekt_ID === qrCodeData.Objekt_ID
    ) || null
  );
}

export function validateQrCode(qrCodeData) {
  if (!qrCodeData) {
    return {
      success: false,
      message: "QR-Code nicht gefunden"
    };
  }

  if (qrCodeData.Aktiv !== "JA") {
    return {
      success: false,
      message: "QR-Code ist deaktiviert"
    };
  }

  if (!qrCodeData.Objekt_ID) {
    return {
      success: false,
      message: "QR-Code ist keinem Objekt zugeordnet"
    };
  }

  return {
    success: true,
    message: "QR-Code gültig"
  };
}

export function processQrCode({
  qrCode,
  qrCodes = [],
  objects = []
}) {
  const qrCodeData = findQrCode(
    qrCode,
    qrCodes
  );

  const validation =
    validateQrCode(qrCodeData);

  if (!validation.success) {
    return validation;
  }

  const object =
    findObjectByQrCode(
      qrCodeData,
      objects
    );

  if (!object) {
    return {
      success: false,
      message: "Objekt zum QR-Code nicht gefunden"
    };
  }

  return {
    success: true,
    message: "QR-Code erfolgreich geprüft",
    qrCodeData,
    object
  };
}
