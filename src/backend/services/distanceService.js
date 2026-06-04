export function toRad(value) {
  return (Number(value) * Math.PI) / 180;
}

export function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000;

  const nLat1 = Number(lat1);
  const nLon1 = Number(lon1);
  const nLat2 = Number(lat2);
  const nLon2 = Number(lon2);

  if (
    Number.isNaN(nLat1) ||
    Number.isNaN(nLon1) ||
    Number.isNaN(nLat2) ||
    Number.isNaN(nLon2)
  ) {
    return null;
  }

  const dLat = toRad(nLat2 - nLat1);
  const dLon = toRad(nLon2 - nLon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(nLat1)) *
      Math.cos(toRad(nLat2)) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return Math.round(earthRadius * c);
}

export function isWithinRadius({
  userLat,
  userLon,
  objectLat,
  objectLon,
  radiusMeters = 100
}) {
  const distance = calculateDistanceMeters(
    userLat,
    userLon,
    objectLat,
    objectLon
  );

  if (distance === null) {
    return {
      success: false,
      allowed: false,
      distance: null,
      message: "GPS-Daten ungültig"
    };
  }

  return {
    success: true,
    allowed: distance <= radiusMeters,
    distance,
    radius: radiusMeters,
    message:
      distance <= radiusMeters
        ? "Standort bestätigt"
        : "Standort außerhalb des Objektbereichs"
  };
}