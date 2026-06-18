export const dataStore = {
  users: [],
  objects: [],
  rooms: [],
  tasks: [],
  materials: [],
  shifts: [],
  qrCodes: [],
  notifications: [],
  customerRequests: []
};

export function setData(key, rows) {
  if (!Object.prototype.hasOwnProperty.call(dataStore, key)) {
    throw new Error(`Unbekannter Datenbereich: ${key}`);
  }

  if (!Array.isArray(rows)) {
    throw new Error(`Daten für ${key} müssen ein Array sein`);
  }

  dataStore[key] = rows;
}

export function getData(key) {
  if (!Object.prototype.hasOwnProperty.call(dataStore, key)) {
    throw new Error(`Unbekannter Datenbereich: ${key}`);
  }

  return dataStore[key];
}

export function findByField(key, field, value) {
  return getData(key).find(
    (item) =>
      String(item[field] || "").trim().toLowerCase() ===
      String(value || "").trim().toLowerCase()
  ) || null;
}

export function filterByField(key, field, value) {
  return getData(key).filter(
    (item) =>
      String(item[field] || "").trim().toLowerCase() ===
      String(value || "").trim().toLowerCase()
  );
}
