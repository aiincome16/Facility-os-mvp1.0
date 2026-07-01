/******************************************************
 * Facility-OS
 * app.js
 * Einstiegspunkt der gesamten Anwendung
 ******************************************************/

/***********************
 * MODULE
 ***********************/
import { appState } from "./appState.js";

import { loadAppData } from "./loadAppData.js";

import { bindModalEvents } from "./modalUi.js";
import { bindQrEvents } from "./qrUi.js";
import { showToast } from "./toastUi.js";

import { renderLogin } from "./loginUi.js";

import { renderEmployeeDashboard } from "./employeeDashboard.js";
import { renderManagerDashboard } from "./managerDashboard.js";
import { renderAccountingDashboard } from "./accountingUi.js";
import { renderAdminDashboard } from "./adminUi.js";
import { renderCustomerDashboard } from "./customerUi.js";

/***********************
 * CONFIG
 ***********************/
const APP_NAME = "Facility-OS";
const VERSION = "1.0";

/***********************
 * GLOBAL ERROR
 ***********************/
window.onerror = function (
  msg,
  src,
  line,
  col,
  err
) {

  const app =
    document.getElementById("app");

  if (!app) return;

  app.innerHTML = `
      <div style="padding:20px;font-family:Arial">
          <h2>App Crash</h2>

          <pre>${msg}</pre>

          <small>
          ${src}<br>
          Zeile ${line}
          </small>
      </div>
  `;

};

/***********************
 * SAFE DOM
 ***********************/
export function render(html) {

  const app =
    document.getElementById("app");

  if (!app) {
    return;
  }

  app.innerHTML = html;

}

export function safeBind(
  id,
  callback
) {

  const element =
    document.getElementById(id);

  if (!element) {
    return;
  }

  if (typeof callback !== "function") {
    return;
  }

  element.onclick = callback;

}

/***********************
 * USER
 ***********************/
export function normalizeUser(user) {

  if (!user) {
    return null;
  }

  return {

    User_ID:
      user.User_ID ?? "",

    Name:
      user.Name ?? "",

    Vorname:
      user.Vorname ?? "",

    Nachname:
      user.Nachname ?? "",

    Rolle:
      user.Rolle ?? "Mitarbeiter",

    Branche:
      user.Branche ?? "facility",

    Objekt_ID:
      user.Objekt_ID ?? ""

  };

}

export function getUser() {

  return appState.currentUser;

}

export function setCurrentUser(user) {

  appState.currentUser =
    normalizeUser(user);

  localStorage.setItem(
    "facilityUser",
    JSON.stringify(
      appState.currentUser
    )
  );

  route();

}

export function logout() {

  appState.currentUser = null;

  appState.currentObject = null;

  appState.currentRoom = null;

  appState.currentShift = null;

  appState.shiftStarted = false;

  localStorage.removeItem(
    "facilityUser"
  );

  renderLogin();

}

window.logout = logout;
/***********************
 * APP BOOT
 ***********************/
export async function boot() {

  try {

    const app =
      document.getElementById("app");

    if (!app) {

      console.error(
        "#app Container fehlt"
      );

      return;

    }

    console.log(
      `${APP_NAME} ${VERSION} startet...`
    );

    bindModalEvents();

    bindQrEvents();

    const loaded =
      await loadAppData();

    if (!loaded) {

      showToast(
        "Daten konnten nicht geladen werden",
        "ERROR"
      );

      return;

    }

    const savedUser =
      localStorage.getItem(
        "facilityUser"
      );

    if (savedUser) {

      try {

        appState.currentUser =
          normalizeUser(
            JSON.parse(savedUser)
          );

      } catch (error) {

        console.error(error);

        localStorage.removeItem(
          "facilityUser"
        );

      }

    }

    if (!appState.currentUser) {

      renderLogin();

      return;

    }

    route();

  }

  catch (error) {

    console.error(error);

    render(`
      <div style="padding:20px">
          <h2>Boot Error</h2>

          <pre>${error.message}</pre>
      </div>
    `);

  }

}

window.addEventListener(
  "DOMContentLoaded",
  boot
);
