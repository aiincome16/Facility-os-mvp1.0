import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";
import { showToast } from "./toastUi.js";

import {
  openQrScanner,
  bindQrEvents
} from "./qrUi.js";

document.getElementById("app").innerHTML = `
  <div class="app-shell">
    <div class="header-card">
      <h1>Facility-OS</h1>
      <p>Test QR Import</p>
    </div>

    <div class="section-card">
      qrUi.js wird geladen.
    </div>
  </div>
`;

bindModalEvents();
bindQrEvents();

showToast(
  "QR Import funktioniert",
  "SUCCESS"
);