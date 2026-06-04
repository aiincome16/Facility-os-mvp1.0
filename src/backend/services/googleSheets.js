import { safeLowercase } from "../utils/helpers.js";

export class GoogleSheetsService {
  constructor() {
    this.sheets = {};
  }

  registerSheet(name, rows = []) {
    if (!name || typeof name !== "string") {
      throw new Error("Ungültiger Sheet-Name");
    }

    if (!Array.isArray(rows)) {
      throw new Error("Rows müssen ein Array sein");
    }

    this.sheets[name] = [...rows];
  }

  getSheet(name) {
    return this.sheets[name] || [];
  }

  findByField(sheetName, field, value) {
    const rows = this.getSheet(sheetName);

    return (
      rows.find(
        (row) =>
          row &&
          safeLowercase(row[field]) === safeLowercase(value)
      ) || null
    );
  }

  filterByField(sheetName, field, value) {
    const rows = this.getSheet(sheetName);

    return rows.filter(
      (row) =>
        row &&
        safeLowercase(row[field]) === safeLowercase(value)
    );
  }

  findAllByField(sheetName, field, value) {
    return this.filterByField(sheetName, field, value);
  }

  insertRow(sheetName, row) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      throw new Error("Ungültige Zeile");
    }

    if (!this.sheets[sheetName]) {
      this.sheets[sheetName] = [];
    }

    this.sheets[sheetName].push(row);

    return {
      success: true,
      row
    };
  }

  updateRow(sheetName, idField, idValue, updates) {
    const rows = this.getSheet(sheetName);

    const index = rows.findIndex(
      (row) =>
        row &&
        safeLowercase(row[idField]) === safeLowercase(idValue)
    );

    if (index === -1) {
      return null;
    }

    this.sheets[sheetName][index] = {
      ...rows[index],
      ...updates
    };

    return this.sheets[sheetName][index];
  }

  updateByField(sheetName, field, value, updates) {
    const row = this.updateRow(
      sheetName,
      field,
      value,
      updates
    );

    if (!row) {
      return {
        success: false,
        message: "Datensatz nicht gefunden"
      };
    }

    return {
      success: true,
      row
    };
  }

  deleteRow(sheetName, idField, idValue) {
    const rows = this.getSheet(sheetName);

    const index = rows.findIndex(
      (row) =>
        row &&
        safeLowercase(row[idField]) === safeLowercase(idValue)
    );

    if (index === -1) {
      return false;
    }

    this.sheets[sheetName].splice(index, 1);

    return true;
  }

  deleteByField(sheetName, field, value) {
    const deleted = this.deleteRow(
      sheetName,
      field,
      value
    );

    return {
      success: deleted
    };
  }

  reset() {
    this.sheets = {};

    return {
      success: true
    };
  }
}

export const googleSheets = new GoogleSheetsService();