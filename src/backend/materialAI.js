import { googleSheets } from "../services/googleSheets.js";

export function analyzeMaterialPhoto(photoName) {
  if (!photoName) {
    return {
      success: false,
      message: "Kein Foto vorhanden"
    };
  }

  return {
    success: true,
    status: "FAST_LEER",
    confidence: 0.87,
    suggestion: {
      material: "Toilettenpapier",
      quantity: 3,
      unit: "Rollen"
    }
  };
}

export function createMaterialOrderSuggestion(report) {
  if (!report) {
    return {
      success: false
    };
  }

  return googleSheets.insertRow(
    "16_MaterialOrders",
    {
      Order_ID: `ORDER-${Date.now()}`,
      Objekt_ID: report.Objekt_ID,
      Material: report.Material,
      Menge: report.Menge,
      Einheit: report.Einheit,
      Status: "FREIGABE_AUSSTEHEND",
      Erstellt_am: new Date().toISOString()
    }
  );
}

export function approveMaterialOrder(orderId, approvedBy) {
  return googleSheets.updateByField(
    "16_MaterialOrders",
    "Order_ID",
    orderId,
    {
      Status: "FREIGEGEBEN",
      Freigegeben_von: approvedBy,
      Freigegeben_am: new Date().toISOString()
    }
  );
}

export function rejectMaterialOrder(orderId, rejectedBy) {
  return googleSheets.updateByField(
    "16_MaterialOrders",
    "Order_ID",
    orderId,
    {
      Status: "ABGELEHNT",
      Abgelehnt_von: rejectedBy,
      Abgelehnt_am: new Date().toISOString()
    }
  );
}