import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";
import { showRoomTasks } from "./taskUi.js";

export function showRooms() {

  const object = appState.currentObject;

  if (!object) {
    showToast("Kein Objekt ausgewählt", "ERROR");
    return;
  }

  const rooms = (appState.data?.rooms || []).filter(
    room => room.Objekt_ID === object.Objekt_ID
  );

  document.getElementById("app").innerHTML = `

<div class="app-shell">

<div class="header-card">

<h1>Räume</h1>

<div>${object.Name}</div>

</div>

<div id="roomList"
class="section-card">

</div>

<div class="section-card">

<button
id="btnBackDashboard"
class="btn secondary">

Dashboard

</button>

</div>

</div>

`;

  renderRoomList(rooms);

  document
    .getElementById("btnBackDashboard")
    ?.addEventListener("click", () => {

      if (typeof renderEmployeeDashboard === "function") {
        renderEmployeeDashboard();
      }

    });

}

function renderRoomList(rooms) {

  const list =
    document.getElementById("roomList");

  if (!list) return;

  if (!rooms.length) {

    list.innerHTML = `
      <div class="info-card">
        Keine Räume vorhanden.
      </div>
    `;

    return;
  }

  list.innerHTML = "";

  rooms.forEach(room => {

    const button =
      document.createElement("button");

    button.className = "info-card blue";

    button.innerHTML = `

<div class="card-title">

${room.Raum_Name}

</div>

Etage:

${room.Etage || "-"}

<br>

Typ:

${room.Raum_Typ || "-"}

`;

    button.addEventListener("click", () => {

      appState.currentRoom = room;

      showRoomDetails(room);

    });

    list.appendChild(button);

  });

}

export function showRoomDetails(room) {

  document.getElementById("app").innerHTML = `

<div class="app-shell">

<div class="header-card">

<h1>

${room.Raum_Name}

</h1>

</div>

<div class="section-card">

<div class="button-stack">

<button
id="btnTasks"
class="btn green">

Aufgaben

</button>

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
id="btnQrRoom"
class="btn orange">

QR prüfen

</button>

<button
id="btnBackRooms"
class="btn secondary">

Zurück

</button>

</div>

</div>

</div>

`;

  document
    .getElementById("btnTasks")
    ?.addEventListener("click", showRoomTasks);

  document
    .getElementById("btnCustomerRequest")
    ?.addEventListener("click", () => {

      showToast("Kundenwünsche folgen", "INFO");

    });

  document
    .getElementById("btnComplaint")
    ?.addEventListener("click", () => {

      showToast("Beschwerden folgen", "INFO");

    });

  document
    .getElementById("btnQrRoom")
    ?.addEventListener("click", () => {

      showToast("Raum-QR wird später geprüft", "INFO");

    });

  document
    .getElementById("btnBackRooms")
    ?.addEventListener("click", showRooms);

}