import { googleSheets } from "../services/googleSheets.js";

export function getObjectInfo(objectId) {
  if (!objectId) {
    return {
      success: false,
      message: "Objekt-ID fehlt"
    };
  }

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
    object
  };
}

export function getObjectRooms(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "03_Rooms",
    "Objekt_ID",
    objectId
  );
}

export function getObjectTasks(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "04_Tasks",
    "Objekt_ID",
    objectId
  );
}

export function getObjectKnowledge(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "39_ObjectKnowledge",
    "Objekt_ID",
    objectId
  );
}

export function getObjectDocuments(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "40_ObjectDocuments",
    "Objekt_ID",
    objectId
  );
}

export function getObjectWaste(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "18_ObjectWaste",
    "Objekt_ID",
    objectId
  );
}

export function getObjectSecurity(objectId) {
  if (!objectId) {
    return [];
  }

  return googleSheets.findAllByField(
    "18_ObjectSecurity",
    "Objekt_ID",
    objectId
  );
}

export function getFullObjectWiki(objectId) {
  const info = getObjectInfo(objectId);

  if (!info.success) {
    return info;
  }

  return {
    success: true,
    object: info.object,
    rooms: getObjectRooms(objectId),
    tasks: getObjectTasks(objectId),
    knowledge: getObjectKnowledge(objectId),
    documents: getObjectDocuments(objectId),
    waste: getObjectWaste(objectId),
    security: getObjectSecurity(objectId)
  };
}