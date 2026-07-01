import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";

export function renderObjectSelection() {

  const objects = appState.data?.objects || [];

  document.getElementById("app").innerHTML = `

<div class="app-shell">

  <div class="header-card">
      <h1>Objekt auswählen</h1>
  </div>

  <div class="section-card">

      <div id="objectList"></div>

  </div>

</div>

`;

  const list = document.getElementById("objectList");

  if (!objects.length) {

    list.innerHTML = `
      <div class="info-card">
        Keine Objekte gefunden.
      </div>
    `;

    return;
  }

  objects.forEach(object => {

    const button = document.createElement("button");

    button.className = "btn blue";

    button.style.marginBottom = "10px";

    button.innerHTML = `
      ${object.Name || object.Objekt_Name || "Objekt"}
    `;

    button.onclick = () => selectObject(object);

    list.appendChild(button);

  });

}

function selectObject(object) {

  appState.currentObject = object;

  localStorage.setItem(
    "facilityObject",
    JSON.stringify(object)
  );

  showToast(
    "Objekt ausgewählt",
    "SUCCESS"
  );

  if (typeof renderEmployeeDashboard === "function") {
    renderEmployeeDashboard();
  }

}