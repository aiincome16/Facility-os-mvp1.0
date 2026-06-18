import { DATA_CONFIG } from "./dataConfig.js";
import { loadAllData } from "./sheetLoader.js";
import { showToast } from "./toastUi.js";

export async function loadAppData() {

  try {

    await loadAllData(DATA_CONFIG);

    console.log(
      "Alle Daten erfolgreich geladen."
    );

    return true;

  } catch (error) {

    console.error(error);

    showToast(
      "Fehler beim Laden der Daten",
      "ERROR"
    );

    return false;

  }

}
