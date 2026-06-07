import { renderDashboard } from "./dashboard.js";
import { bindModalEvents } from "./modalUi.js";
import { bindQrEvents } from "./qrUi.js";
import { bindShiftEvents } from "./shiftUi.js";
import { bindObjectEvents } from "./objectUi.js";
import { bindRoomEvents } from "./roomUi.js";
import { bindNotificationEvents } from "./notificationUi.js";
import { bindMaterialEvents } from "./materialUi.js";
import { showToast } from "./toastUi.js";

document.getElementById("app").innerHTML = `
<div class="app-shell">
  <div class="header-card">
    <h1>Facility-OS</h1>
    <p>Basis läuft</p>
  </div>

  <div class="section-card">
    System erfolgreich gestartet.
  </div>
</div>
`;

bindModalEvents();
bindQrEvents();
bindShiftEvents();
bindObjectEvents();
bindRoomEvents();
bindNotificationEvents();
bindMaterialEvents();

showToast(
  "System gestartet",
  "SUCCESS"
);