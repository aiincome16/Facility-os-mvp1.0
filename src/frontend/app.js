import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";
import { showToast } from "./toastUi.js";

document.getElementById("app").innerHTML = `
  <div class="app-shell">
    <div class="header-card">
      <h1>Facility-OS</h1>
      <p>Test Toast Import</p>
    </div>

    <div class="section-card">
      dashboard.js, modalUi.js und toastUi.js werden geladen.
    </div>
  </div>
`;

bindModalEvents();
showToast("Toast funktioniert", "SUCCESS");
bindModalEvents();
showToast("Toast funktioniert", "SUCCESS");