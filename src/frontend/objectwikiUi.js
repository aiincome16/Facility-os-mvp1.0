import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showObjectWiki() {
  const object = appState.currentObject;

  openModal({
    title: "Objekt-Wiki",
    content: `
      <div class="info-card blue">
        <div class="card-title">
          ${object?.Name || "Objekt"}
        </div>
        ${object?.Adresse || "-"}
      </div>

      <div class="button-stack">
        <button id="wikiFloorPlanBtn" class="btn blue">
          Grundriss
        </button>

        <button id="wikiVideosBtn" class="btn blue">
          Video-Begehung
        </button>

        <button id="wikiPhotosBtn" class="btn blue">
          Fotos
        </button>

        <button id="wikiDocumentsBtn" class="btn blue">
          Dokumente
        </button>

        <button id="wikiSpecialBtn" class="btn blue">
          Besonderheiten
        </button>

        <button id="wikiClosingBtn" class="btn blue">
          Schließhinweise
        </button>
      </div>
    `
  });

  document
    .getElementById("wikiFloorPlanBtn")
    ?.addEventListener("click", showFloorPlan);

  document
    .getElementById("wikiVideosBtn")
    ?.addEventListener("click", showObjectVideos);

  document
    .getElementById("wikiPhotosBtn")
    ?.addEventListener("click", showObjectPhotos);

  document
    .getElementById("wikiDocumentsBtn")
    ?.addEventListener("click", showObjectDocuments);

  document
    .getElementById("wikiSpecialBtn")
    ?.addEventListener("click", showSpecialHints);

  document
    .getElementById("wikiClosingBtn")
    ?.addEventListener("click", showClosingHints);
}

export function showFloorPlan() {
  const object = appState.currentObject;

  openModal({
    title: "Grundriss",
    content: `
      <div class="floorplan">
        <b>${object?.Name || "Objekt"}</b>

        <div class="floor-room">Eingang</div>
        <div class="floor-room">Flur</div>
        <div class="floor-room">Sanitär</div>
        <div class="floor-room">Büro / Nebenräume</div>
      </div>

      <div class="info-card blue">
        Echter Grundriss wird später als Bild oder PDF aus Google Drive geladen.
      </div>
    `
  });
}

export function showObjectVideos() {
  const videos = appState.cachedVideos || [];

  openModal({
    title: "Video-Begehung",
    content: videos.length
      ? videos.map(video => `
        <div class="info-card blue">
          <div class="card-title">${video.Titel || "Video"}</div>
          Raum: ${video.Raum || "-"}<br>
          Datei: ${video.URL || "Platzhalter"}
        </div>
      `).join("")
      : `
        <div class="info-card">
          Keine Videos vorhanden.
        </div>
      `
  });
}

export function showObjectPhotos() {
  const photos = appState.cachedPhotos || [];

  openModal({
    title: "Objektfotos",
    content: photos.length
      ? photos.map(photo => `
        <div class="info-card blue">
          <div class="card-title">${photo.Titel || "Foto"}</div>
          Raum: ${photo.Raum || "-"}<br>
          Datei: ${photo.URL || "Platzhalter"}
        </div>
      `).join("")
      : `
        <div class="info-card">
          Keine Fotos vorhanden.
        </div>
      `
  });
}

export function showObjectDocuments() {
  const documents = appState.cachedDocuments || [];

  openModal({
    title: "Dokumente",
    content: documents.length
      ? documents.map(doc => `
        <div class="info-card blue">
          <div class="card-title">${doc.Titel || "Dokument"}</div>
          Typ: ${doc.Typ || "-"}<br>
          Datei: ${doc.URL || "Platzhalter"}
        </div>
      `).join("")
      : `
        <div class="info-card">
          Keine Dokumente vorhanden.
        </div>
      `
  });
}

export function showSpecialHints() {
  const object = appState.currentObject;

  openModal({
    title: "Besonderheiten",
    content: `
      <div class="info-card yellow">
        <div class="card-title">Objekthinweise</div>
        ${object?.Besonderheiten || "Keine besonderen Hinweise hinterlegt."}
      </div>

      <div class="info-card red">
        <div class="card-title">Wichtig</div>
        Kundenwünsche, Beschwerden oder Sonderaufgaben werden beim QR-Check-in automatisch angezeigt.
      </div>
    `
  });
}

export function showClosingHints() {
  const object = appState.currentObject;

  openModal({
    title: "Schließhinweise",
    content: `
      <div class="info-card red">
        <div class="card-title">Sicherung / Abschluss</div>
        ${object?.Schliesshinweis || "Keine Schließhinweise hinterlegt."}
      </div>
    `
  });
}

export function bindObjectWikiEvents() {
  document
    .getElementById("btnFloorPlan")
    ?.addEventListener("click", showFloorPlan);

  document
    .getElementById("btnVideos")
    ?.addEventListener("click", showObjectVideos);
}