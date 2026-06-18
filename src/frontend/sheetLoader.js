import { setData } from "./dataService.js";

export async function loadJsonData(url, key) {
  if (!url) {
    throw new Error("Daten-URL fehlt");
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Daten konnten nicht geladen werden: ${url}`);
  }

  const rows = await response.json();

  setData(key, rows);

  return rows;
}

export async function loadAllData(config) {
  if (!config || typeof config !== "object") {
    throw new Error("Datenkonfiguration fehlt");
  }

  const results = {};

  for (const [key, url] of Object.entries(config)) {
    results[key] = await loadJsonData(url, key);
  }

  return results;
}
