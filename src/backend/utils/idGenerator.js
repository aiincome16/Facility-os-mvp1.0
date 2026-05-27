const counters = {};

function normalizePrefix(prefix) {
  if (!prefix || typeof prefix !== "string") {
    throw new Error("Ungültiger Prefix");
  }

  const cleanPrefix = prefix.trim().toUpperCase();

  if (!cleanPrefix) {
    throw new Error("Prefix fehlt");
  }

  if (!/^[A-Z0-9_]+$/.test(cleanPrefix)) {
    throw new Error("Prefix darf nur A-Z, 0-9 und _ enthalten");
  }

  return cleanPrefix;
}

export function generateId(prefix) {
  const cleanPrefix = normalizePrefix(prefix);

  if (!counters[cleanPrefix]) {
    counters[cleanPrefix] = 1;
  }

  const id = `${cleanPrefix}-${String(counters[cleanPrefix]).padStart(3, "0")}`;

  counters[cleanPrefix]++;

  return id;
}

export function resetIdCounter(prefix) {
  const cleanPrefix = normalizePrefix(prefix);
  counters[cleanPrefix] = 1;
}

export function resetAllIdCounters() {
  Object.keys(counters).forEach((key) => {
    delete counters[key];
  });
}
