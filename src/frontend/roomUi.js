import { appState, setCurrentRoom } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showRooms() {
  const rooms = appState.cachedRooms || [];

  if (!rooms.length) {
    openModal({
      title: "Räume",
      content: `
        <div class="info-card">
          Keine Räume vorhanden.
        </div>
      `
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
    <button
      id="room-${room.Raum_ID}"
      class="room-card"
    >
      ${room.Raumname || room.Name || "Raum"}
    </button>
  `;
}

export function showRoomDetails(room) {
  const tasks = getTasksForRoom(room.Raum_ID);

  openModal({
    title: room.Raumname || room.Name || "Raum",
    content: `
      <div class="info-card blue">
        <div class="card-title">Raumdaten</div>
        Intervall: ${room.Intervall || "-"}<br>
        Sollzeit: ${room.Sollzeit || room.Sollzeit_Min || "-"} Minuten<br>
        Priorität: ${room.Prioritaet || "-"}
      </div>

      <div class="info-card green">
        <div class="card-title">Aufgaben</div>
        ${
          tasks.length
            ? tasks.map(formatTaskButton).join("")
            : "Keine Aufgaben vorhanden."
        }
      </div>
    `
  });

  tasks.forEach((task) => {
    document
      .getElementById(`task-${task.Task_ID}`)
      ?.addEventListener("click", () => {
        showTaskDetails(task);
      });
  });
}

function getTasksForRoom(roomId) {
  return (appState.cachedTasks || []).filter(
    (task) => task.Raum_ID === roomId
  );
}

function formatTaskButton(task) {
  return `
    <button
      id="task-${task.Task_ID}"
      class="btn secondary"
      style="margin-top:8px;"
    >
      ${task.Bereich || task.Aufgabe || "Aufgabe"}
    </button>
  `;
}

export function showTaskDetails(task) {
  openModal({
    title: task.Bereich || task.Aufgabe || "Aufgabe",
    content: `
      <div class="info-card green">
        <div class="card-title">Aufgabe</div>
        ${task.Aufgabe || "-"}
      </div>

      <div class="info-card blue">
        <div class="card-title">Material</div>
        ${task.Material || "-"}
      </div>

      <div class="info-card">
        <div class="card-title">Anleitung</div>
        ${task.Anleitung || "-"}
      </div>

      <div class="info-card red">
        <div class="card-title">Warnung</div>
        ${task.Warnung || "-"}
      </div>

      <div class="info-card yellow">
        <div class="card-title">Kontrolle</div>
        ${task.Kontrolle || "-"}
      </div>
    `
  });
}

export function showCleaningPlan() {
  const rooms = appState.cachedRooms || [];

  openModal({
    title: "Putzplan",
    content: rooms.length
      ? rooms.map((room) => `
        <div class="info-card blue">
          <div class="card-title">
            ${room.Raumname || room.Name || "Raum"}
          </div>
          Intervall: ${room.Intervall || "-"}<br>
          Sollzeit: ${room.Sollzeit || room.Sollzeit_Min || "-"} Minuten
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