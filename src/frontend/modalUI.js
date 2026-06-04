import { appState } from "./appState.js";

export function openModal({
  title = "Facility-OS",
  content = "",
  actions = []
}) {
  const overlay = document.getElementById("modalOverlay");
  const titleEl = document.getElementById("modalTitle");
  const contentEl = document.getElementById("modalContent");
  const actionsEl = document.getElementById("modalActions");

  if (!overlay || !titleEl || !contentEl || !actionsEl) {
    console.error("Modal-Elemente fehlen");
    return;
  }

  titleEl.innerHTML = title;
  contentEl.innerHTML = content;
  actionsEl.innerHTML = "";

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.className = action.className || "btn";
    button.innerText = action.label;

    button.addEventListener("click", () => {
      if (typeof action.onClick === "function") {
        action.onClick();
      }
    });

    actionsEl.appendChild(button);
  });

  overlay.classList.remove("hidden");
  appState.modalOpen = true;
}

export function closeModal() {
  const overlay = document.getElementById("modalOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.add("hidden");
  appState.modalOpen = false;
}

export function bindModalEvents() {
  const closeBtn = document.getElementById("modalCloseBtn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
}

export function confirmModal({
  title = "Bestätigen",
  message = "",
  confirmLabel = "Bestätigen",
  cancelLabel = "Abbrechen",
  onConfirm
}) {
  openModal({
    title,
    content: `<div class="info-card">${message}</div>`,
    actions: [
      {
        label: confirmLabel,
        className: "btn green",
        onClick: () => {
          if (typeof onConfirm === "function") {
            onConfirm();
          }

          closeModal();
        }
      },
      {
        label: cancelLabel,
        className: "btn secondary",
        onClick: closeModal
      }
    ]
  });
}