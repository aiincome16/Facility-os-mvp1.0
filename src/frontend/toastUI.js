import { appState } from "./appState.js";

let toastTimer = null;

export function showToast(message, type = "INFO", duration = 2800) {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.error("Toast-Element fehlt");
    return;
  }

  toast.innerText = message;
  toast.className = "toast";
  toast.classList.add(getToastClass(type));

  toast.classList.remove("hidden");

  appState.toastQueue.push({
    message,
    type,
    createdAt: new Date().toISOString()
  });

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    hideToast();
  }, duration);
}

export function hideToast() {
  const toast = document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.className = "toast hidden";
}

function getToastClass(type) {
  if (type === "SUCCESS") {
    return "green";
  }

  if (type === "WARNING") {
    return "yellow";
  }

  if (type === "ERROR") {
    return "red";
  }

  return "dark";
}

export function clearToastQueue() {
  appState.toastQueue = [];
}