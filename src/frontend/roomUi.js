import { appState, setCurrentRoom } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showRooms() {
  const rooms = appState.cachedRooms || [];

  if (!rooms.length) {
    openModal({
      title: "Räume",
      content: `<div class="info-card">Keine Räume vorhanden.</div>`
    });
    return;
  }

  openModal({
    title: "Räume",
    content: `
      <div class="room-list">
        ${rooms.map(formatRoomButton).join("")}
      </div>
    `
  });

  rooms.forEach((room) => {
    document
      .getElementById(`room-${room.Raum_ID}`)
      ?.addEventListener("click", () => {
        setCurrentRoom(room);
        showRoomDetails(room);
      });
  });
}

function formatRoomButton(room) {
  return `
    <button id="room-${room.Raum_ID}" class="room-card">
      ${room.Raumname || room.Name || "Raum"}
    </button>
  `;
}

export function showRoomDetails(room) {
  const tasks = (appState.cachedTasks || []).filter(
    (task) => task.Raum_ID === room.Raum_ID
  );

  openModal({
    title: room.Raumname || room.Name || "Raum",
    content: `
      <div class="info-card blue">
        <div class="card-title">Raumdaten</div>
        Intervall: ${room.Intervall || "-"}<br>
        Sollzeit: ${room.Sollzeit || "-"} Minuten<br>
        Priorität: ${room.Prioritaet || "-"}
      </div>

      ${
        tasks.length
          ? tasks.map(formatTaskCard).join("")
          : `<div class="info-card">Keine Aufgaben vorhanden.</div>`
      }
    `
  });
}

function formatTaskCard(task) {
  return `
    <div class="info-card green">
      <div class="card-title">${task.Bereich || task.Aufgabe || "Aufgabe"}</div>
      Aufgabe: ${task.Aufgabe || "-"}<br><br>
      Material: ${task.Material || "-"}<br><br>
      Anleitung: ${task.Anleitung || "-"}<br><br>
      Warnung: ${task.Warnung || "-"}<br><br>
      Kontrolle: ${task.Kontrolle || "-"}
    </div>
  `;
}

export function showCleaningPlan() {
  const rooms = appState.cachedRooms || [];

  openModal({
    title: "Putzplan",
    content: rooms.length
      ? rooms.map((room) => `
          <div class="info-card blue">
            <div class="card-title">${room.Raumname || room.Name || "Raum"}</div>
            Intervall: ${room.Intervall || "-"}<br>
            Sollzeit: ${room.Sollzeit || "-"} Minuten
          </div>
        `).join("")
      : `<div class="info-card">Kein Putzplan vorhanden.</div>`
  });
}

export function bindRoomEvents() {
  document
    .getElementById("btnRooms")
    ?.addEventListener("click", showRooms);

  document
    .getElementById("btnCleaningPlan")
    ?.addEventListener("click", showCleaningPlan);
}
export function bindRoomEvents() {

  const btnRooms =
    document.getElementById("btnRooms");

  if (btnRooms) {
    btnRooms.addEventListener(
      "click",
      showRooms
    );
  }

  const btnCleaningPlan =
    document.getElementById("btnCleaningPlan");

  if (btnCleaningPlan) {
    btnCleaningPlan.addEventListener(
      "click",
      showCleaningPlan
    );
  }

}