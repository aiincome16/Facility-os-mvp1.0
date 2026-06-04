export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function nowISO() {
  return new Date().toISOString();
}

export function getCurrentTimeDE() {
  return new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function getCurrentDateDE() {
  return new Date().toLocaleDateString("de-DE");
}

export function formatDateDE(dateValue) {
  if (!dateValue) {
    return "";
  }

  return new Date(dateValue).toLocaleDateString("de-DE");
}

export function formatDateTimeDE(dateValue) {
  if (!dateValue) {
    return "";
  }

  return new Date(dateValue).toLocaleString("de-DE");
}

export function isDateInRange(date, from, to) {
  if (!date || !from || !to) {
    return false;
  }

  const checkDate = new Date(date);
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return checkDate >= fromDate && checkDate <= toDate;
}

export function minutesBetween(start, end) {
  if (!start || !end) {
    return 0;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  const differenceMs = endDate - startDate;

  if (Number.isNaN(differenceMs)) {
    return 0;
  }

  return Math.round(differenceMs / 60000);
}

export function addDays(dateValue, days) {
  const date = new Date(dateValue);
  date.setDate(date.getDate() + Number(days || 0));

  return date.toISOString().slice(0, 10);
}

export function getMonthKey(dateValue = new Date()) {
  return new Date(dateValue).toISOString().slice(0, 7);
}