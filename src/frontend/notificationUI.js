import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showMailbox() {
  const messages = appState.notifications || [];

  openModal({
    title: "Postfach",
    content: messages.length
      ? messages.map(formatMessageCard).join("")
      : `
        <div class="info-card">
          Keine Nachrichten vorhanden.
        </div>
      `
  });

  messages.forEach((message) => {
    document
      .getElementById(`msg-${message.Message_ID}`)
      ?.addEventListener("click", () => {
        showMessageDetails(message);
      });
  });
}

function formatMessageCard(message) {
  const readClass =
    message.Gelesen === "JA"
      ? ""
      : "yellow";

  return `
    <button
      id="msg-${message.Message_ID}"
      class="info-card ${readClass}"
    >
      <div class="card-title">
        ${message.Titel || "Nachricht"}
      </div>

      Typ: ${message.Typ || "INFO"}<br>
      Priorität: ${message.Prioritaet || "NORMAL"}<br>
      Status: ${message.Status || "-"}
    </button>
  `;
}

export function showMessageDetails(message) {
  message.Gelesen = "JA";

  openModal({
    title: message.Titel || "Nachricht",
    content: `
      <div class="info-card blue">
        <div class="card-title">Typ</div>
        ${message.Typ || "INFO"}
      </div>

      <div class="info-card">
        <div class="card-title">Nachricht</div>
        ${message.Nachricht || "-"}
      </div>

      <div class="info-card yellow">
        <div class="card-title">Status</div>
        ${message.Status || "-"}
      </div>
    `
  });

  showToast("Nachricht geöffnet", "SUCCESS");
}

export function bindNotificationEvents() {
  document
    .getElementById("btnMailbox")
    ?.addEventListener("click", showMailbox);
}