import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";
import { showTickets } from "./ticketUi.js";
import { showMaterialPhotoDialog } from "./materialUi.js";

export function showRoomTasks() {

  const room = appState.currentRoom;

  if (!room) {
    showToast("Kein Raum ausgewählt", "ERROR");
    return;
  }

  const tasks = (appState.data?.tasks || []).filter(
    task => task.Raum_ID === room.Raum_ID
  );

  document.getElementById("app").innerHTML = `

<div class="app-shell">

<div class="header-card">

<h1>${room.Raum_Name}</h1>

<div>Aufgaben</div>

</div>

<div id="taskList"
class="section-card">

</div>

<div class="section-card">

<div class="button-stack">

<button
id="btnCustomerRequest"
class="btn blue">

Kundenwünsche

</button>

<button
id="btnComplaint"
class="btn yellow">

Beschwerden

</button>

<button
id="btnTicket"
class="btn orange">

Ticket erstellen

</button>

<button
id="btnMaterial"
class="btn green">

Material melden

</button>

<button
id="btnBackRooms"
class="btn secondary">

Zur Räumeübersicht

</button>

</div>

</div>

</div>

`;

  renderTaskList(tasks);

  bindTaskEvents();

}

function renderTaskList(tasks) {

  const list =
    document.getElementById("taskList");

  if (!list) return;

  if (!tasks.length) {

    list.innerHTML = `

<div class="info-card">

Keine Aufgaben vorhanden.

</div>

`;

    return;
  }

  list.innerHTML = "";

  tasks.forEach(task => {

    const finished =
      task.Status === "ERLEDIGT";

    const button =
      document.createElement("button");

    button.className =
      finished
        ? "info-card green"
        : "info-card blue";

    button.innerHTML = `

<div class="card-title">

${task.Aufgabe}

</div>

Dauer:
${task.Dauer || "-"}

Minuten

<br>

Status:

${finished ? "Erledigt" : "Offen"}

`;

    button.addEventListener("click", () => {

      showTaskDetails(task);

    });

    list.appendChild(button);

  });

}

export function showTaskDetails(task) {

  document.getElementById("app").innerHTML = `

<div class="app-shell">

<div class="header-card">

<h1>

${task.Aufgabe}

</h1>

</div>

<div class="section-card">

<div class="info-card">

${task.Beschreibung || "Keine Beschreibung"}

</div>

<div class="button-stack">

<button
id="btnFinishTask"
class="btn green">

Aufgabe erledigt

</button>

<button
id="btnTaskPhoto"
class="btn blue">

Vorher/Nachher Foto

</button>

<button
id="btnTaskTicket"
class="btn yellow">

Ticket erstellen

</button>

<button
id="btnBackTasks"
class="btn secondary">

Zurück

</button>

</div>

</div>

</div>

`;

  document
    .getElementById("btnFinishTask")
    ?.addEventListener("click", () => {

      task.Status = "ERLEDIGT";
      task.ErledigtAm =
        new Date().toISOString();

      showToast(
        "Aufgabe erledigt",
        "SUCCESS"
      );

      showRoomTasks();

    });

  document
    .getElementById("btnTaskPhoto")
    ?.addEventListener("click", () => {

      showToast(
        "Fotofunktion folgt",
        "INFO"
      );

    });

  document
    .getElementById("btnTaskTicket")
    ?.addEventListener("click", showTickets);

  document
    .getElementById("btnBackTasks")
    ?.addEventListener("click", showRoomTasks);

}

function bindTaskEvents() {

  document
    .getElementById("btnCustomerRequest")
    ?.addEventListener("click", () => {

      showToast(
        "Kundenwünsche folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnComplaint")
    ?.addEventListener("click", () => {

      showToast(
        "Beschwerden folgen",
        "INFO"
      );

    });

  document
    .getElementById("btnTicket")
    ?.addEventListener("click", showTickets);

  document
    .getElementById("btnMaterial")
    ?.addEventListener(
      "click",
      showMaterialPhotoDialog
    );

  document
    .getElementById("btnBackRooms")
    ?.addEventListener("click", () => {

      if (typeof showRooms === "function") {
        showRooms();
      }

    });

}