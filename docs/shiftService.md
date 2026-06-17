shiftService

Aufgabe

Steuert Arbeitsbeginn und Arbeitsende.

⸻

startShift()

Voraussetzungen:

* QR-Code gültig
* GPS-Prüfung erfolgreich

Aktionen:

* shiftStarted = true
* currentShift setzen
* Startzeit speichern
* Arbeitsbeginn protokollieren

⸻

endShift()

Aktionen:

* Endzeit speichern
* Schicht abschließen
* Tagesdaten sichern

⸻

canStartShift()

Prüft:

* QR-Code erfolgreich
* GPS erfolgreich

Ergebnis:

Ja oder Nein

⸻

Ziel

Ein Arbeitsbeginn darf nur erfolgen, wenn:

QR-Code

↓

GPS

↓

Plausibilitätsprüfung

↓

Arbeitsbeginn

erfolgreich waren.
