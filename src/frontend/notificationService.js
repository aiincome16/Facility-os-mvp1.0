import { appState } from "./appState.js";

export function getMandatoryMessages() {
  return (appState.notifications || []).filter(
    (message) =>
      message.Prioritaet === "HOCH" &&
      message.Status !== "ERLEDIGT"
  );
}

export function hasMandatoryMessages() {
  return getMandatoryMessages().length > 0;
}

export function markMessageDone(messageId) {
  const message = (appState.notifications || []).find(
    (item) => item.Message_ID === messageId
  );

  if (!message) {
    return {
      success: false,
      message: "Mitteilung nicht gefunden"
    };
  }

  message.Status = "ERLEDIGT";
  message.Gelesen = "JA";
  message.Erledigt_am = new Date().toISOString();

  appState.mandatoryMessagesConfirmed =
    !hasMandatoryMessages();

  return {
    success: true,
    message: "Mitteilung erledigt"
  };
}

export function confirmAllMandatoryMessages() {
  getMandatoryMessages().forEach((message) => {
    message.Status = "ERLEDIGT";
    message.Gelesen = "JA";
    message.Erledigt_am = new Date().toISOString();
  });

  appState.mandatoryMessagesConfirmed = true;

  return {
    success: true,
    message: "Alle Pflichtmeldungen bestätigt"
  };
}
