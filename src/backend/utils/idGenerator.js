const counters = {};

export function generateId(prefix) {
  if (!prefix) {
    throw new Error("Prefix fehlt");
  }

  if (!counters[prefix]) {
    counters[prefix] = 1;
  }

  const id = `${prefix}-${String(counters[prefix]).padStart(3, "0")}`;

  counters[prefix]++;

  return id;
}

export function resetIdCounter(prefix) {
  if (prefix) {
    counters[prefix] = 1;
  }
}
