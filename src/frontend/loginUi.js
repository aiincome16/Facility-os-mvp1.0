import { appState } from "./appState.js";
import { showToast } from "./toastUi.js";

export function renderLogin() {

  document.getElementById("app").innerHTML = `

<div class="app-shell">

  <div class="header-card">
      <h1>Facility-OS</h1>
      <div>Login</div>
  </div>

  <div class="section-card">

      <label>E-Mail</label>

      <input
        id="loginEmail"
        type="email"
        placeholder="E-Mail">

      <label>Passwort</label>

      <input
        id="loginPassword"
        type="password"
        placeholder="Passwort">

      <div class="button-stack">

          <button
            id="btnLogin"
            class="btn green">

            Anmelden

          </button>

      </div>

  </div>

</div>

`;

  document
    .getElementById("btnLogin")
    ?.addEventListener("click", loginUser);
}

function loginUser() {

  const email =
    document
      .getElementById("loginEmail")
      ?.value
      .trim()
      .toLowerCase();

  const password =
    document
      .getElementById("loginPassword")
      ?.value
      .trim();

  if (!email || !password) {

    showToast(
      "Bitte alle Felder ausfüllen",
      "ERROR"
    );

    return;
  }

  const users =
    appState.data?.users || [];

  const user =
    users.find(u =>
      String(u.Email || "")
        .toLowerCase() === email &&
      String(u.Passwort || "") === password
    );

  if (!user) {

    showToast(
      "Benutzer nicht gefunden",
      "ERROR"
    );

    return;
  }

  appState.currentUser = user;

  localStorage.setItem(
    "facilityUser",
    JSON.stringify(user)
  );

  if (typeof route === "function") {
    route();
  } else {
    location.reload();
  }

}