import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";
import { showToast } from "./toastUi.js";
import { bindQrEvents } from "./qrUi.js";
import { bindShiftEvents } from "./shiftUi.js";
import { bindObjectEvents } from "./objectUi.js";
import { bindRoomEvents } from "./roomUi.js";
import { bindNotificationEvents } from "./notificationUi.js";

document.getElementById("app").innerHTML = `
  <div class="app-shell">
    <div class="header-card">
      <h1>Facility-OS</h1>
      <p>Test Notification Import</p>
    </div>

    <div class="section-card">
      roomUi.js wird geladen.
    </div>
  </div>
`;

bindModalEvents();
bindQrEvents();
bindShiftEvents();
bindObjectEvents();
bindRoomEvents();bindNotificationEvents();

showToast(
  "Room Import funktioniert",
  "SUCCESS"
);