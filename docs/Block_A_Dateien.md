Block A – Benötigte Dateien

app.js

Verantwortlich für:

* App-Start
* Automatischer QR-Start
* Weiterleitung nach erfolgreichem Arbeitsbeginn

⸻

qrUi.js

Verantwortlich für:

* Kamera öffnen
* QR-Code lesen
* Manuellen Code
* Fehlerbehandlung

⸻

gpsService.js

Verantwortlich für:

* Standort ermitteln
* Distanz prüfen
* Plausibilitätskontrolle

⸻

shiftUi.js

Verantwortlich für:

* Arbeitsbeginn
* Arbeitsende
* Zeitstempel

⸻

notificationUi.js

Verantwortlich für:

* Pflichtmeldungen
* Roter Rahmen
* Bestätigung
* Erledigt-Status

⸻

dailyControlUi.js

Neue Datei.

Verantwortlich für:

* Tagessteuerung
* Mitteilungen
* Kundenwünsche
* Material
* Offene Punkte
* Arbeitsende

⸻

appState.js

Neue Zustände:

* currentShift
* shiftStarted
* mandatoryMessagesConfirmed
* qrValidated
* gpsValidated
