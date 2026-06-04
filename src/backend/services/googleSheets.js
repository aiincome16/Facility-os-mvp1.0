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

  filterByField(sheetName, field, value) }  
  findAllByField(sheetName, field, value) {
    return this.filterByField(sheetName, field, value);
  }
    const rows = this.getSheet(sheetName);

    return rows.filter(
      (row) =>
        row &&
        safeLowercase(row[field]) === safeLowercase(value)
    );
  }

  insertRow(sheetName, row) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      throw new Error("Ungültige Zeile");
    }

    if (!this.sheets[sheetName]) {
      this.sheets[sheetName] = [];
    }

    this.sheets[sheetName].push(row);

    return row;
  }

  updateRow(sheetName, idField, idValue, updates) {  updateByField(sheetName, field, value, updates) {
    return this.updateRow(sheetName, field, value, updates);
  }
    const rows = this.getSheet(sheetName);

    const index = rows.findIndex((row) => row && row[idField] === idValue);

    if (index === -1) {
      return null;
    }

    this.sheets[sheetName][index] = {
      ...rows[index],
      ...updates
    };

    return this.sheets[sheetName][index];
  }

  deleteRow(sheetName, idField, idValue) {  deleteByField(sheetName, field, value) {
    return this.deleteRow(sheetName, field, value);
  }
    const rows = this.getSheet(sheetName);

    const index = rows.findIndex((row) => row && row[idField] === idValue);

    if (index === -1) {
      return false;
    }

    rows.splice(index, 1);

    return true;
  }
}

export const googleSheets = new GoogleSheetsService();
