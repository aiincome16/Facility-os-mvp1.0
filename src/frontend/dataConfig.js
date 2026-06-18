const dataStore = {
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

  if (!(key in dataStore)) {
    throw new Error(
      `Unbekannter Datenbereich: ${key}`
    );
  }

  dataStore[key] = rows;

}

export function getData(key) {

  if (!(key in dataStore)) {
    throw new Error(
      `Unbekannter Datenbereich: ${key}`
    );
  }

  return dataStore[key];

}

export function findByField(
  key,
  field,
  value
) {

  return getData(key).find(
    (item) =>
      String(item[field])
        .trim()
        .toLowerCase() ===
      String(value)
        .trim()
        .toLowerCase()
  );

}

export function filterByField(
  key,
  field,
  value
) {

  return getData(key).filter(
    (item) =>
      String(item[field])
        .trim()
        .toLowerCase() ===
      String(value)
        .trim()
        .toLowerCase()
  );

}

export { dataStore };
