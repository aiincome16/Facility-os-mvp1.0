import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";
import { showToast } from "./toastUi.js";

export function showMailbox() {

  const user = appState.currentUser;

  const messages = (appState.data?.notifications || []).filter(msg =>
    !msg.Empfaenger ||
    msg.Empfaenger === user.User_ID ||
    msg.Empfaenger === user.Rolle
  );

  openModal({
    title: "Postfach",
    content: messages.length
      ? messages.map(createMessageCard).join("")
      : `
        <div class="info-card">
          Keine Nachrichten vorhanden.
        </div>
      `
  });

  messages.forEach(message => {

    document
      .getElementById(`msg-${message.Message_ID}`)
      ?.addEventListener("click", () => {

        showMessage(message);

      });

  });

}

function createMessageCard(message) {

  return `

<button
id="msg-${message.Message_ID}"
class="info-card blue">

<div class="card-title">

${message.Titel || "Nachricht"}

</div>

${message.Datum || ""}

</button>

`;

}

function showMessage(message) {

  openModal({

    title: message.Titel || "Nachricht",

    content: `

<div class="info-card">

${message.Text || ""}

</div>

<div class="info-card green">

Status:

${message.Gelesen ? "Gelesen" : "Neu"}

</div>

`,

    actions: [

      {

        label: "Als gelesen markieren",

        className: "btn green",

        onClick: () => {

          message.Gelesen = true;

          showToast(
            "Nachricht gelesen",
            "SUCCESS"
          );

          showMailbox();

        }

      }

    ]

  });

}

export function sendInternalMessage({

  empfaenger,

  titel,

  text

}) {

  if (!appState.data.notifications) {
    appState.data.notifications = [];
  }

  appState.data.notifications.push({

    Message_ID: `MSG-${Date.now()}`,

    Empfaenger: empfaenger,

    Titel: titel,

    Text: text,

    Datum: new Date().toLocaleString(),

    Gelesen: false,

    Von: appState.currentUser?.User_ID || ""

  });

  showToast(
    "Nachricht versendet",
    "SUCCESS"
  );

}

export function bindMailboxEvents() {

  document
    .getElementById("btnMailbox")
    ?.addEventListener(
      "click",
      showMailbox
    );

}