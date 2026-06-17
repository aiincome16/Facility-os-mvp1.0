import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";
import {
  getMandatoryMessages,
  markMessageDone
} from "./notificationService.js";

export function showDailyControl() {
  const mandatoryMessages =
    getMandatoryMessages();

  openModal({
    title: "Tagessteuerung",
    content: `
      <div class="info-card blue">
        <div class="card-title">Heute</div>

        Objekt:
        ${appState.currentObject?.Name || "-"}
        <br><br>

        Arbeitszeit:
        ${appState.currentShift?.Startzeit || "--:--"}
        -
        ${appState.currentShift?.Endzeit || "--:--"}
      </div>

      ${
        mandatoryMessages.length
          ? renderMandatoryMessages(mandatoryMessages)
          : `
            <div class="info-card green">
              <div class="card-title">Pflichtmeldungen</div>
              Keine offenen Pflichtmeldungen.
            </div>
          `
      }

      <div class="button-stack">
        <button id="btnDailyRequests" class="btn orange">
          Kundenwünsche
        </button>

        <button id="btnDailyMaterial" class="btn green">
          Material
        </button>

        <button id="btnDailyTickets" class="btn yellow">
          Offene Punkte
        </button>

        <button id="btnDailyCheckout" class="btn blue">
          Arbeitsende
        </button>
      </div>
    `
  });

  bindDailyControlEvents();
}

function renderMandatoryMessages(messages) {
  return `
    <div class="info-card red mandatory-box">
      <div class="card-title">Wichtige Pflichtmeldungen</div>

      ${messages
        .map(
          (message) => `
            <div class="mandatory-message">
              <b>${message.Titel || "Mitteilung"}</b>
              <br>
              ${message.Nachricht || ""}
              <br><br>

              <button
                id="done-${message.Message_ID}"
                class="btn red"
              >
                Erledigt abhaken
              </button>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

export function bindDailyControlEvents() {
  getMandatoryMessages().forEach((message) => {
    document
      .getElementById(`done-${message.Message_ID}`)
      ?.addEventListener("click", () => {
        const result =
          markMessageDone(message.Message_ID);

        showToast(
          result.message,
          result.success ? "SUCCESS" : "ERROR"
        );

        showDailyControl();
      });
  });

  document
    .getElementById("btnDailyRequests")
    ?.addEventListener("click", () => {
      showToast("Kundenwünsche werden in Block A verbunden", "INFO");
    });

  document
    .getElementById("btnDailyMaterial")
    ?.addEventListener("click", () => {
      showToast("Material wird in Block C verbunden", "INFO");
    });

  document
    .getElementById("btnDailyTickets")
    ?.addEventListener("click", () => {
      showToast("Offene Punkte werden später verbunden", "INFO");
    });

  document
    .getElementById("btnDailyCheckout")
    ?.addEventListener("click", () => {
      showToast("Arbeitsende wird mit shiftService verbunden", "INFO");
    });
}
