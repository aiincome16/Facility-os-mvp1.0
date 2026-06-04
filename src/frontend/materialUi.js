import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showMaterialReports() {
  const reports =
    appState.materialOrders || [];

  openModal({
    title: "Material",
    content: reports.length
      ? reports
          .map(formatMaterialCard)
          .join("")
      :       <div class="info-card">         Keine Materialmeldungen vorhanden.       </div>    
  });

  reports.forEach((report) => {

    document
      .getElementById(
        material-${report.Order_ID}
      )
      ?.addEventListener(
        "click",
        () => showMaterialDetails(report)
      );

  });

}

function formatMaterialCard(report) {

  return     <button       id="material-${report.Order_ID}"       class="info-card green"     >        <div class="card-title">         ${report.Material || "Material"}       </div>        Menge:       ${report.Menge || "-"}       ${report.Einheit || ""}        <br><br>        Status:       ${report.Status || "-"}      </button>  ;

}

export function showMaterialDetails(report) {

  openModal({
    title:
      report.Material || "Material",

    content:       <div class="info-card blue">          <div class="card-title">           Menge         </div>          ${report.Menge || "-"}         ${report.Einheit || ""}        </div>        <div class="info-card yellow">          <div class="card-title">           Status         </div>          ${report.Status || "-"}        </div>        <div class="info-card">          <div class="card-title">           Notiz         </div>          ${report.Notiz || "-"}        </div>     
  });

}

export function showMaterialPhotoDialog() {

  openModal({

    title:
      "Material melden",

    content:        <div class="info-card">          Foto aufnehmen oder         Material manuell melden.        </div>        <button         id="btnPhotoMaterial"         class="btn green"       >          Foto aufnehmen        </button>        <br><br>        <button         id="btnManualMaterial"         class="btn blue"       >          Manuell eingeben        </button>     

  });

}

export function showMaterialSuggestions() {

  const suggestions =
    appState.materialSuggestions || [];

  openModal({

    title:
      "KI-Vorschläge",

    content:

      suggestions.length

        ? suggestions
            .map(
              suggestion =>                 <div class="info-card orange">                    <div class="card-title">                      ${suggestion.material}                    </div>                    Vorschlag:                    ${suggestion.quantity}                   ${suggestion.unit}                  </div>              
            )
            .join("")

        :            <div class="info-card">              Keine Vorschläge vorhanden.            </div>         

  });

}

export function createManualMaterialReport() {

  showToast(
    "Manuelle Materialmeldung folgt",
    "INFO"
  );

}

export function bindMaterialEvents() {

  document
    .getElementById(
      "btnMaterial"
    )
    ?.addEventListener(
      "click",
      showMaterialPhotoDialog
    );

}