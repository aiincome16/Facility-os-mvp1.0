export async function getCurrentPosition() {
  return new Promise((resolve, reject) => {

    if (!navigator.geolocation) {
      reject("Geolocation wird nicht unterstützt");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

      },

      (error) => {
        reject(error.message);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

  });
}

export function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371000;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +

    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *

    Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export function isCheckinAllowed(
  currentLatitude,
  currentLongitude,
  objectLatitude,
  objectLongitude,
  maxDistance = 100
) {

  const distance = calculateDistance(
    currentLatitude,
    currentLongitude,
    objectLatitude,
    objectLongitude
  );

  return distance <= maxDistance;
}

export async function validateLocation(
  objectLatitude,
  objectLongitude
) {

  const currentPosition =
    await getCurrentPosition();

  const allowed =
    isCheckinAllowed(
      currentPosition.latitude,
      currentPosition.longitude,
      objectLatitude,
      objectLongitude
    );

  return {
    allowed,
    currentLatitude:
      currentPosition.latitude,

    currentLongitude:
      currentPosition.longitude
  };
}
