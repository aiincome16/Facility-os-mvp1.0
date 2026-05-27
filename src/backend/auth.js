import { googleSheets } from "./services/googleSheets.js";
import { safeLowercase } from "./utils/helpers.js";

export function findUserByEmail(email) {
  if (!email) return null;

  return googleSheets.findByField(
    "01_Users",
    "Email",
    safeLowercase(email)
  );
}

export function verifyPassword(user, password) {
  if (!user || !user.Passwort || !password) {
    return false;
  }

  return (
    String(user.Passwort).trim() ===
    String(password).trim()
  );
}

export function login(email, password) {
  const user =
    findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      message:
        "Benutzer nicht gefunden"
    };
  }

  if (
    safeLowercase(user.Aktiv) !==
    "ja"
  ) {
    return {
      success: false,
      message:
        "Benutzer deaktiviert"
    };
  }

  const passwordValid =
    verifyPassword(
      user,
      password
    );

  if (!passwordValid) {
    return {
      success: false,
      message:
        "Falsches Passwort"
    };
  }

  return {
    success: true,
    user: {
      userId:
        user.User_ID,

      role:
        safeLowercase(
          user.Rolle
        ).toUpperCase(),

      firstName:
        user.Vorname,

      lastName:
        user.Nachname,

      email:
        user.Email
    }
  };
}
