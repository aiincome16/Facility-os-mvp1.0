import { googleSheets } from "../services/googleSheets.js";

function toNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return null;
  }

  return number;
}

export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000;

  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return Math.round(earthRadius * c);
}

export function getObjectGpsSettings(objectId) {
  const object = googleSheets.findByField(
    "02_Objects",
    "Objekt_ID",
    objectId
  );

  if (!object) {
    return {
      success: false,
      message: "Objekt nicht gefunden"
    };
  }

  return {
    success: true,
    gps: {
      lat: toNumber(object.GPS_Lat),
      lon: toNumber(object.GPS_Lng),
      radius: toNumber(object.Radius) || 100,
      active: object.GPS_Aktiv === "JA"
    }
  };
}

export function validateGpsForObject(objectId, userLat, userLon) {
  const settings = getObjectGpsSettings(objectId);

  if (!settings.success) {
    return settings;
  }

  if (!settings.gps.active) {
    return {
      success: true,
      allowed: true,
      message: "GPS-Prüfung für dieses Objekt deaktiviert"
    };
  }

  if (
    settings.gps.lat === null ||
    settings.gps.lon === null
  ) {
    return {
      success: false,
      allowed: false,
      message: "GPS-Daten am Objekt fehlen"
    };
  }

  const distance = calculateDistanceMeters(
    toNumber(userLat),
    toNumber(userLon),
    settings.gps.lat,
    settings.gps.lon
  );

  const allowed =
    distance <= settings.gps.radius;

  return {
    success: true,
    allowed,
    distance,
    radius: settings.gps.radius,
    message: allowed
      ? "Standort bestätigt"
      : "Standort außerhalb des Objektbereichs"
  };
}

export function logGpsCheck({
  userId,
  objectId,
  lat,
  lon,
  allowed,
  distance
}) {
  return googleSheets.insertRow(
    "41_GPSLogs",
    {
      GPSLog_ID: `GPS-${Date.now()}`,
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Datum: new Date().toISOString(),
      Latitude: lat,
      Longitude: lon,
      Erlaubt: allowed ? "JA" : "NEIN",
      Entfernung_Meter: distance || ""
    }
  );
}