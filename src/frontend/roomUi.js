import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";

export function showRooms() {

  const object = appState.currentObject;

  if (!object) {
    showToast("Kein Objekt ausgewählt", "ERROR");
    return;
  }

  const rooms = (appState.data?.rooms || []).filter(room =>
    room.Objekt_ID === object.Objekt_ID
  );

  document.getElementById("app").innerHTML = `

<div class="app-shell">

    <div class="header-card">
        <h1>Räume</h1>

        <div>
            ${object.Name || ""}
        </div>
    </div>

    <div class="section-card">

        <input
            id="roomSearch"
            class="input"
            placeholder="Raum suchen...">

    </div>

    <div
        id="roomList"
        class="section-card">

    </div>

    <div class="section-card">

        <button
            id="btnBackDashboard"
            class="btn secondary">

            Zurück

        </button>

    </div>

</div>

`;

  renderRoomList(rooms);

  document
    .getElementById("roomSearch")
    ?.addEventListener("input", (e) => {

      const search =
        e.target.value.toLowerCase();

      const filtered = rooms.filter(room => {

        return (
          (room.Raum_Name || "")
            .toLowerCase()
            .includes(search)

          ||

          (room.Raum_Nummer || "")
            .toLowerCase()
            .includes(search)
        );

      });

      renderRoomList(filtered);

    });

  document
    .getElementById("btnBackDashboard")
    ?.addEventListener(
      "click",
      () => {

        if (typeof renderEmployeeDashboard === "function") {
          renderEmployeeDashboard();
        }

      }
    );

}

function renderRoomList(rooms) {

  const list =
    document.getElementById("roomList");

  if (!list) return;

  if (!rooms.length) {

    list.innerHTML = `
      <div class="info-card">
        Keine Räume gefunden.
      </div>
    `;

    return;
  }

  list.innerHTML = "";

  rooms.forEach(room => {

    const button =
      document.createElement("button");

    button.className =
      "info-card blue";

    button.innerHTML = `

<div class="card-title">

${room.Raum_Nummer || ""}

</div>

${room.Raum_Name || ""}

<br><br>

Status:
${room.Status || "OFFEN"}

`;

    button.addEventListener(
      "click",
      () => {

        appState.currentRoom = room;

        showRoomDetails(room);

      }
    );

    list.appendChild(button);

  });

}

export function showRoomDetails(room) {

  document.getElementById("app").innerHTML = `

<div class="app-shell">

    <div class="header-card">

        <h1>

${room.Raum_Nummer || ""}

</h1>

<div>

${room.Raum_Name || ""}

</div>

    </div>

    <div class="section-card">

        <div class="button-stack">

            <button id="btnTasks" class="btn green">

Aufgaben

</button>

            <button id="btnTickets" class="btn yellow">

Tickets

</button>

            <button id="btnCustomerRequests" class="btn orange">

Kundenwünsche

</button>

            <button id="btnComplaints" class="btn red">

Beschwerden

</button>

            <button id="btnDocuments" class="btn blue">

Dokumente

</button>

            <button id="btnPhotos" class="btn blue">

Fotos

</button>

            <button id="btnVideos" class="btn blue">

Videos

</button>

            <button id="btnHistory" class="btn secondary">

Historie

</button>

            <button id="btnBackRooms" class="btn secondary">

Zurück

</button>

        </div>

    </div>

</div>

`;

  document
    .getElementById("btnTasks")
    ?.addEventListener("click", () => {

      showToast("Raumaufgaben folgen", "INFO");

    });

  document
    .getElementById("btnTickets")
    ?.addEventListener("click", () => {

      showToast("Raumtickets folgen", "INFO");

    });

  document
    .getElementById("btnCustomerRequests")
    ?.addEventListener("click", () => {

      showToast("Kundenwünsche folgen", "INFO");

    });

  document
    .getElementById("btnComplaints")
    ?.addEventListener("click", () => {

      showToast("Beschwerden folgen", "INFO");

    });

  document
    .getElementById("btnDocuments")
    ?.addEventListener("click", () => {

      showToast("Dokumente folgen", "INFO");

    });

  document
    .getElementById("btnPhotos")
    ?.addEventListener("click", () => {

      showToast("Fotos folgen", "INFO");

    });

  document
    .getElementById("btnVideos")
    ?.addEventListener("click", () => {

      showToast("Videos folgen", "INFO");

    });

  document
    .getElementById("btnHistory")
    ?.addEventListener("click", () => {

      showToast("Historie folgt", "INFO");

    });

  document
    .getElementById("btnBackRooms")
    ?.addEventListener("click", showRooms);

}