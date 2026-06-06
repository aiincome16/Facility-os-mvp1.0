import { appState } from "./appState.js";
import { openModal } from "./modalUi.js";

export function showHelp() {

  openModal({

    title: "Hilfe",

    content: `

      <div class="button-stack">

        <button
          id="btnRoomKnowledge"
          class="btn blue"
        >
          Raumwissen
        </button>

        <button
          id="btnTaskKnowledge"
          class="btn green"
        >
          Aufgaben
        </button>

        <button
          id="btnWarnings"
          class="btn orange"
        >
          Warnungen
        </button>

        <button
          id="btnPhotos"
          class="btn purple"
        >
          Fotos
        </button>

        <button
          id="btnVideos"
          class="btn red"
        >
          Videos
        </button>

      </div>

    `

  );

}

export function showRoomKnowledge() {

  openModal({

    title: "Raumwissen",

    content: `
      <div class="info-card">

        Hier erscheinen später:

        Raum →
        Bereiche →
        Aufgaben →
        Material →
        Kontrolle

      </div>
    `

  });

}

export function showTaskKnowledge() {

  openModal({

    title: "Aufgaben",

    content: `
      <div class="info-card">

        Schritt-für-Schritt-Anleitungen
        werden hier angezeigt.

      </div>
    `

  });

}

export function showWarnings() {

  openModal({

    title: "Warnungen",

    content: `
      <div class="info-card red">

        Gefahrstoffe,
        Besonderheiten und Hinweise.

      </div>
    `

  });

}

export function showPhotos() {

  openModal({

    title: "Fotos",

    content: `
      <div class="info-card">

        Vorher-/Nachher-Fotos.

      </div>
    `

  });

}

export function showVideos() {

  openModal({

    title: "Videos",

    content: `
      <div class="info-card">

        Kurze Erklärvideos.

      </div>
    `

  });

}