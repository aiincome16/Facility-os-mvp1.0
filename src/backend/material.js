import { googleSheets } from "../services/googleSheets.js";
import { createId } from "../utils/helpers.js";

export function createMaterialReport({
  objectId,
  userId,
  material,
  quantity,
  unit,
  note = "",
  photo = ""
}) {
  const report = {
    Report_ID: createId("MAT"),
    Objekt_ID: objectId,
    Mitarbeiter_ID: userId,
    Material: material,
    Menge: quantity,
    Einheit: unit,
    Notiz: note,
    Foto: photo,
    Status: "OFFEN",
    Erstellt_am: new Date().toISOString()
  };

  return googleSheets.insertRow(
    "15_MaterialReports",
    report
  );
}

export function getOpenMaterialReports(objectId) {
  return googleSheets
    .findAllByField(
      "15_MaterialReports",
      "Objekt_ID",
      objectId
    )
    .filter(
      report =>
        report.Status !== "ERLEDIGT"
    );
}

export function completeMaterialReport(reportId) {
  return googleSheets.updateByField(
    "15_MaterialReports",
    "Report_ID",
    reportId,
    {
      Status: "ERLEDIGT",
      Erledigt_am: new Date().toISOString()
    }
  );
}

export function getMaterialStock(objectId) {
  return googleSheets.findAllByField(
    "14_MaterialStock",
    "Objekt_ID",
    objectId
  );
}
