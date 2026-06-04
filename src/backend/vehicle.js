import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";
import { nowISO } from "../utils/dateUtils.js";

export function createVehicle({
  licensePlate,
  type = "",
  brand = "",
  model = "",
  status = "AKTIV"
}) {
  if (!licensePlate) {
    return {
      success: false,
      message: "Kennzeichen fehlt"
    };
  }

  return googleSheets.insertRow(
    "38_Vehicles",
    {
      Vehicle_ID: createId("VEH"),
      Kennzeichen: licensePlate,
      Typ: type,
      Marke: brand,
      Modell: model,
      Status: status,
      Erstellt_am: nowISO()
    }
  );
}

export function assignVehicle({
  vehicleId,
  userId,
  objectId = "",
  note = ""
}) {
  if (!vehicleId || !userId) {
    return {
      success: false,
      message: "Fahrzeug oder Mitarbeiter fehlt"
    };
  }

  return googleSheets.insertRow(
    "39_VehicleAssignments",
    {
      Assignment_ID: createId("VEHASSIGN"),
      Vehicle_ID: vehicleId,
      Mitarbeiter_ID: userId,
      Objekt_ID: objectId,
      Notiz: note,
      Status: "AKTIV",
      Zugewiesen_am: nowISO()
    }
  );
}

export function returnVehicle({
  assignmentId,
  mileage = "",
  note = ""
}) {
  if (!assignmentId) {
    return {
      success: false,
      message: "Zuweisungs-ID fehlt"
    };
  }

  return googleSheets.updateByField(
    "39_VehicleAssignments",
    "Assignment_ID",
    assignmentId,
    {
      Status: "ZURUECK",
      Rueckgabe_KM: mileage,
      Rueckgabe_Notiz: note,
      Rueckgabe_am: nowISO()
    }
  );
}

export function reportVehicleIssue({
  vehicleId,
  userId,
  title,
  description = "",
  photo = "",
  priority = "NORMAL"
}) {
  if (!vehicleId || !userId || !title) {
    return {
      success: false,
      message: "Pflichtangaben fehlen"
    };
  }

  return googleSheets.insertRow(
    "40_VehicleIssues",
    {
      Issue_ID: createId("VEHISSUE"),
      Vehicle_ID: vehicleId,
      Mitarbeiter_ID: userId,
      Titel: title,
      Beschreibung: description,
      Foto: photo,
      Prioritaet: priority,
      Status: "OFFEN",
      Erstellt_am: nowISO()
    }
  );
}

export function getVehicles() {
  return googleSheets.getSheet("38_Vehicles");
}

export function getActiveVehicles() {
  return getVehicles().filter(
    (vehicle) => vehicle.Status === "AKTIV"
  );
}

export function getVehicleAssignments(vehicleId) {
  return googleSheets.findAllByField(
    "39_VehicleAssignments",
    "Vehicle_ID",
    vehicleId
  );
}

export function getUserVehicleAssignments(userId) {
  return googleSheets.findAllByField(
    "39_VehicleAssignments",
    "Mitarbeiter_ID",
    userId
  );
}

export function getVehicleIssues(vehicleId) {
  return googleSheets.findAllByField(
    "40_VehicleIssues",
    "Vehicle_ID",
    vehicleId
  );
}

export function closeVehicleIssue({
  issueId,
  userId = "",
  note = ""
}) {
  return googleSheets.updateByField(
    "40_VehicleIssues",
    "Issue_ID",
    issueId,
    {
      Status: "ERLEDIGT",
      Erledigt_von: userId,
      Erledigt_Notiz: note,
      Erledigt_am: nowISO()
    }
  );
}
