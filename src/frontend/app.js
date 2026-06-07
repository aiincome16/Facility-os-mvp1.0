import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";
import { showToast } from "./toastUi.js";
import { bindQrEvents } from "./qrUi.js";

import {
  bindShiftEvents,
  showMyShifts
} from "./shiftUi.js";

document.getElementById("app").innerHTML = `
  <div class="app-shell">
    <div class="header-card">
      <h1>Facility-OS</h1>
      <p>Test Shift Import</p>
    </div>

    <div class="section-card">
      shiftUi.js wird geladen.
    </div>
  </div>
`;

bindModalEvents();
bindQrEvents();
bindShiftEvents();

showToast(
  "Shift Import funktioniert",
  "SUCCESS"
);