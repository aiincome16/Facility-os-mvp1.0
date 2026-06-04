import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";

export function issueKey({
  keyId,
  userId,
  objectId
}) {
  return googleSheets.insertRow(
    "26_Keys",
    {
      Ausgabe_ID: createId("KEY"),
      Schlüssel_ID: keyId,
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Ausgegeben_am: new Date().toISOString(),
      Status: "AUSGEGEBEN"
    }
  );
}

export function returnKey(keyId) {
  return googleSheets.updateByField(
    "26_Keys",
    "Schlüssel_ID",
    keyId,
    {
      Status: "ZURUECK",
      Zurückgegeben_am:
        new Date().toISOString()
    }
  );
}

export function reportLostKey(
  keyId,
  note = ""
) {
  return googleSheets.updateByField(
    "26_Keys",
    "Schlüssel_ID",
    keyId,
    {
      Status: "VERLOREN",
      Notiz: note
    }
  );
}

export function getKeysByObject(objectId) {
  return googleSheets.findAllByField(
    "26_Keys",
    "Objekt_ID",
    objectId
  );
}

export function getKeysByUser(userId) {
  return googleSheets.findAllByField(
    "26_Keys",
    "Mitarbeiter_ID",
    userId
  );
}
