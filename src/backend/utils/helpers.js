export function safeString(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

export function safeLowercase(value) {
  return safeString(value).toLowerCase();
}

export function isActive(value) {
  return safeLowercase(value) === "ja";
}

export function createId(prefix) {
  return `${prefix}-${Date.now()}`;
}

export function requiredFields(data, fields) {
  const missing = fields.filter(
    (field) => !safeString(data[field])
  );

  return {
    valid: missing.length === 0,
    missing
  };
}

export function formatName(user) {
  if (!user) {
    return "";
  }

  return `${safeString(user.Vorname)} ${safeString(user.Nachname)}`.trim();
}

export function normalizeEmail(email) {
  return safeLowercase(email);
}

export function toNumber(value, fallback = 0) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return fallback;
  }

  return number;
}