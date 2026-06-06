import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showObjectInfo() {
  const object = appState.currentObject;

  if (!object) {
    openModal({
      title: "Objektinfo",
      content: `
        <div class="info-card yellow">
          Kein Objekt ausgewählt.
        </div>
      `
    });
    return;
  }

  openModal({
    title: `Objektinfo: ${object.Name || "Objekt"}`,
    content: `
      <div class="info-card blue">
        <div class="card-title">Adresse</div>
        ${object.Adresse || "-"}
      </div>

      <div class="info-card blue">
        <div class="card-title">Ansprechpartner</div>
        ${object.Ansprechpartner || "-"}<br>
        ${object.Telefon || ""}
      </div>

      <div class="info-card green">
        <div class="card-title">Zugang</div>
        ${object.Zugang || "-"}
      </div>

      <div class="info-card green">
        <div class="card-title">Schlüssel</div>
        ${object.Schluessel || "-"}
      </div>

      <div class="info-card yellow">
        <div class="card-title">Besonderheiten</div>
        ${object.Besonderheiten || "-"}
      </div>
    `
  });
}

export function showWastePlan() {
  const waste = appState.cachedWaste || [];

  openModal({
    title: "Müllplan",
    content: waste.length
      ? waste.map(item => `
        <div class="info-card blue">
          <div class="card-title">${item.Muellart || "Müll"}</div>
          Intervall: ${item.Intervall || "-"}<br>
          Standort: ${item.Standort || "-"}<br>
          Hinweis: ${item.Hinweis || "-"}
        </div>
      `).join("")
      : `<div class="info-card">Kein Müllplan vorhanden.</div>`
  });
}

export function showKeys() {
  const keys = appState.cachedKeys || [];

  openModal({
    title: "Schlüssel",
    content: keys.length
      ? keys.map(key => `
        <div class="info-card green">
          <div class="card-title">${key.Schluessel_Name || "Schlüssel"}</div>
          Standort: ${key.Standort || "-"}<br>
          Status: ${key.Status || "-"}<br>
          Hinweis: ${key.Hinweis || "-"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Schlüsselinfos vorhanden.</div>`
  });
}

export function showDangerKnowledge() {
  const materials = appState.cachedMaterials || [];

  openModal({
    title: "Gefahren- und Anwendungshinweise",
    content: materials.length
      ? materials.map(material => `
        <div class="info-card red">
          <div class="card-title">${material.Name || "Material"}</div>
          Gefahr: ${material.Gefahr || "-"}<br><br>
          Dosierung: ${material.Dosierung || "-"}<br><br>
          Anwendung: ${material.Anwendung || "-"}<br><br>
          PDF Sicherheitsdatenblatt:<br>
          ${material.PDF || "Platzhalter"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Gefahrstoffdaten vorhanden.</div>`
  });
}

export function showDocuments() {
  const docs = appState.cachedDocuments || [];

  openModal({
    title: "Dokumente",
    content: docs.length
      ? docs.map(doc => `
        <div class="info-card blue">
          <div class="card-title">${doc.Titel || "Dokument"}</div>
          Typ: ${doc.Typ || "-"}<br>
          Datei: ${doc.URL || "Platzhalter"}
        </div>
      `).join("")
      : `<div class="info-card">Keine Dokumente vorhanden.</div>`
  });
}

export function bindObjectEvents() {
  document.getElementById("btnObjectInfo")
    ?.addEventListener("click", showObjectInfo);

  document.getElementById("btnWaste")
    ?.addEventListener("click", showWastePlan);

  document.getElementById("btnKeys")
    ?.addEventListener("click", showKeys);

  document.getElementById("btnDanger")
    ?.addEventListener("click", showDangerKnowledge);

  document.getElementById("btnDocuments")
    ?.addEventListener("click", showDocuments);
}