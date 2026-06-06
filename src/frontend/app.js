import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";

document.getElementById("app").innerHTML = `
  <div class="app-shell">
    <div class="header-card">
      <h1>Facility-OS</h1>
      <p>Test Modal Import</p>
    </div>

    <div class="section-card">
      dashboard.js und modalUi.js werden geladen.
    </div>
  </div>
`;

bindModalEvents();