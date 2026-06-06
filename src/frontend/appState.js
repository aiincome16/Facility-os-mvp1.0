export const appState = {

  // Benutzer
  currentUser: null,

  // Objekt
  currentObject: null,
  currentRoom: null,
  currentShift: null,

  // Tickets
  tickets: [],

  // Nachrichten
  notifications: [],

  // Kunden
  customerRequests: [],
  complaints: [],

  // Material
  materialOrders: [],
  materialSuggestions: [],

  // KI
  aiWarnings: [],
  analytics: [],

  // Vertretungen
  replacementSuggestions: [],

  // Cache
  cachedUsers: [],
  cachedObjects: [],
  cachedRooms: [],
  cachedTasks: [],
  cachedMaterials: [],
  cachedDocuments: [],
  cachedWaste: [],
  cachedKeys: [],
  cachedShifts: [],
  cachedVideos: [],
  cachedPhotos: [],
  cachedQrCodes: [],
  cachedGpsLogs: [],

  // Hilfe-System
  helpMode: false,
  guidedMode: false,
  helpLevel: 0,

  // QR
  currentQrCode: "",
  qrScannerActive: false,

  // UI
  modalOpen: false,
  toastQueue: [],

  // Branding
  branding: {
    appName: "Facility-OS",
    subtitle: "Mobile Facility Management",
    primaryColor: "#2563eb",
    accentColor: "#16a34a",
    logo: ""
  },

  // Einstellungen
  language: "de",
  gpsRadius: 100,
  autoLogout: 480,
  photoQuality: "high"
};

export function setCurrentUser(user) {
  appState.currentUser = user;
}

export function getCurrentUser() {
  return appState.currentUser;
}

export function setCurrentObject(object) {
  appState.currentObject = object;
}

export function getCurrentObject() {
  return appState.currentObject;
}

export function setCurrentRoom(room) {
  appState.currentRoom = room;
}

export function getCurrentRoom() {
  return appState.currentRoom;
}

export function setCurrentShift(shift) {
  appState.currentShift = shift;
}

export function getCurrentShift() {
  return appState.currentShift;
}