export function formatDate(date) {
  return new Date(date).toLocaleDateString("de-DE");
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString("de-DE");
}

export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    value === ""
  );
}

export function generateTimestamp() {
  return new Date().toISOString();
}

export function safeString(value) {
  return String(value || "").trim();
}

export function safeLowercase(value) {
  return safeString(value).toLowerCase();
}
