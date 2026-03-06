# ✅ Master Checklist - Play Store Upload

## 📍 Schritt-für-Schritt Übersicht

Nutze diese Checkliste, um den gesamten Prozess zu verfolgen!

---

## Phase 1: Vorbereitung (2-3 Stunden)

### ☐ 1.1 App online bringen
- [ ] Vercel/Netlify Account erstellt
- [ ] Repository auf GitHub hochgeladen
- [ ] App auf Vercel/Netlify deployed
- [ ] App-URL notiert: `https://___________________`
- [ ] App im Browser getestet
- [ ] Alle Features funktionieren

**📖 Guide:** `/DEPLOYMENT_GUIDE.md`

---

### ☐ 1.2 Icons & Assets erstellen
- [ ] App Icon erstellt (512x512 px) → `icon-512.png`
- [ ] App Icon erstellt (192x192 px) → `icon-192.png`
- [ ] Maskable Icon erstellt (512x512 px) → `icon-maskable-512.png`
- [ ] Feature Graphic erstellt (1024x500 px) → `feature-graphic.png`
- [ ] Icons in `/public` hochgeladen
- [ ] manifest.json aktualisiert

**📖 Guide:** `/ICONS_GUIDE.md`

---

### ☐ 1.3 Screenshots erstellen
- [ ] Screenshot 1: Dashboard
- [ ] Screenshot 2: Quiz in Aktion
- [ ] Screenshot 3: Quizduell
- [ ] Screenshot 4: Ergebnis-Seite
- [ ] Screenshot 5: Profil/Statistiken
- [ ] Screenshot 6: Arabische Version
- [ ] Screenshot 7: "Über die App"
- [ ] Screenshot 8: (Optional)
- [ ] Alle Screenshots in 1080x1920 oder höher
- [ ] Screenshots in Ordner gespeichert

**📖 Guide:** `/ICONS_GUIDE.md` (Abschnitt Screenshots)

---

### ☐ 1.4 Datenschutzerklärung
- [ ] `PRIVACY_POLICY.html` angepasst (E-Mail-Adresse eingetragen)
- [ ] Datei auf Server hochgeladen
- [ ] URL getestet: `https://___________________/PRIVACY_POLICY.html`
- [ ] Im Browser sichtbar

**📖 File:** `/PRIVACY_POLICY.html`

---

## Phase 2: Android App erstellen (1-2 Stunden)

### ☐ 2.1 Software installieren
- [ ] Node.js installiert (v14+)
- [ ] Java JDK installiert (11-17)
- [ ] `node --version` funktioniert
- [ ] `java -version` funktioniert
- [ ] Bubblewrap installiert: `npm install -g @bubblewrap/cli`
- [ ] `bubblewrap --version` funktioniert

**📖 Guide:** `/BUBBLEWRAP_GUIDE.md`

---

### ☐ 2.2 Bubblewrap Setup
- [ ] Neuer Ordner erstellt: `islamic-quiz-android`
- [ ] In Ordner navigiert: `cd islamic-quiz-android`
- [ ] `bubblewrap init` ausgeführt
- [ ] Alle Fragen beantwortet
- [ ] Passwort notiert: `________________` ⚠️ WICHTIG!
- [ ] `android.keystore` erstellt

**Wichtige Werte notieren:**

```
Domain: _________________________________
Package Name: com.ayoubbezoui.islamicquiz
Theme Color: #10b981
Key Password: ________________ (SICHER AUFBEWAHREN!)
```

---

### ☐ 2.3 Build erstellen
- [ ] `bubblewrap doctor` ausgeführt (Android SDK OK)
- [ ] `bubblewrap build` ausgeführt
- [ ] Build erfolgreich
- [ ] `.aab` Datei vorhanden:
  ```
  app/build/outputs/bundle/release/app-release.aab
  ```
- [ ] Dateigröße: ca. _____ MB

---

### ☐ 2.4 Digital Asset Links
- [ ] SHA-256 Fingerprint abgerufen:
  ```bash
  keytool -list -v -keystore android.keystore -alias islamic-quiz-key
  ```
- [ ] SHA-256 notiert: `_________________________________`
- [ ] `.well-known/assetlinks.json` erstellt im Web-Projekt
- [ ] Package name eingetragen
- [ ] SHA-256 eingetragen
- [ ] Datei auf Server hochgeladen
- [ ] URL getestet: `https://___________________/.well-known/assetlinks.json`
- [ ] JSON wird korrekt angezeigt

**📖 Guide:** `/BUBBLEWRAP_GUIDE.md` (Abschnitt Digital Asset Links)

---

### ☐ 2.5 App testen (Optional aber empfohlen)
- [ ] App im Emulator getestet ODER
- [ ] App auf echtem Gerät getestet
- [ ] App öffnet als native App (nicht im Browser)
- [ ] Alle Features funktionieren
- [ ] Offline-Modus funktioniert

---

## Phase 3: Play Console (2-3 Stunden)

### ☐ 3.1 Account erstellen
- [ ] Play Console aufgerufen: [play.google.com/console](https://play.google.com/console)
- [ ] Mit Google-Konto angemeldet
- [ ] $25 USD Gebühr bezahlt
- [ ] Entwickler-Profil ausgefüllt
- [ ] Vereinbarung akzeptiert
- [ ] Account aktiviert

---

### ☐ 3.2 App erstellen
- [ ] "App erstellen" geklickt
- [ ] App-Name: `Islamic Quiz - Wissenstest`
- [ ] Standardsprache: `Deutsch (Deutschland)`
- [ ] App-Typ: `App`
- [ ] Preis: `Kostenlos`
- [ ] App erstellt

---

### ☐ 3.3 Dashboard-Aufgaben
- [ ] **App-Zugang:** "Ohne Anmeldung nutzbar" ✅
- [ ] **Anzeigen:** "Keine Werbung" ✅
- [ ] **Datenschutzerklärung-URL:** Eingetragen
- [ ] **Kategorie:** "Lernen" ausgewählt
- [ ] **Kontakt-E-Mail:** Eingetragen
- [ ] **Website:** (Optional) Eingetragen

---

### ☐ 3.4 Store-Eintrag
- [ ] **Kurzbeschreibung** geschrieben (max. 80 Zeichen)
- [ ] **Vollständige Beschreibung** geschrieben (siehe Guide)
- [ ] **App-Icon** automatisch übernommen ✅
- [ ] **Feature Graphic** hochgeladen (1024x500 px)
- [ ] **Screenshots** hochgeladen (min. 2, besser 4-8)
- [ ] **Video** (Optional) hinzugefügt

---

### ☐ 3.5 Altersfreigabe
- [ ] Fragebogen ausgefüllt
- [ ] Altersfreigabe: 12+ oder niedriger
- [ ] Gespeichert

---

### ☐ 3.6 Preise & Vertrieb
- [ ] Länder ausgewählt (Deutschland, Österreich, etc.)
- [ ] Oder "Alle Länder" ✅
- [ ] Preis: Kostenlos ✅

---

### ☐ 3.7 Release erstellen
- [ ] "Produktion-Track" → "Neues Release"
- [ ] `.aab` Datei hochgeladen
- [ ] Upload erfolgreich
- [ ] Version Code: 1
- [ ] Version Name: 1.0.0
- [ ] **Release-Name** geschrieben: `1.0.0 - Erste Veröffentlichung`
- [ ] **Release-Hinweise** geschrieben (Deutsch + optional Arabisch)

**📖 Guide:** `/PLAY_CONSOLE_GUIDE.md`

---

### ☐ 3.8 Finale Überprüfung
- [ ] Alle Dashboard-Aufgaben ✅ (grüne Häkchen)
- [ ] "Überprüfen" geklickt
- [ ] Keine Fehler
- [ ] Alle Warnungen gelesen

---

### ☐ 3.9 Veröffentlichen
- [ ] **"Zur Überprüfung senden"** geklickt
- [ ] Bestätigungsmail erhalten
- [ ] Status: "Wird überprüft"
- [ ] Datum eingereicht: ______________

---

## Phase 4: Nach der Veröffentlichung

### ☐ 4.1 Warten auf Genehmigung
- [ ] Geduld haben (1-7 Tage)
- [ ] E-Mails von Google Play Console checken
- [ ] Status in Play Console überwachen

---

### ☐ 4.2 App ist live! 🎉
- [ ] Genehmigung erhalten
- [ ] App-Link notiert:
  ```
  https://play.google.com/store/apps/details?id=com.ayoubbezoui.islamicquiz
  ```
- [ ] App im Play Store gefunden
- [ ] App auf Handy installiert & getestet

---

### ☐ 4.3 Marketing
- [ ] App-Link geteilt auf Social Media
- [ ] Freunde & Familie informiert
- [ ] In islamischen Gruppen geteilt
- [ ] Website aktualisiert (falls vorhanden)
- [ ] QR-Code erstellt (optional)

---

### ☐ 4.4 Monitoring
- [ ] Play Console Dashboard checken (täglich/wöchentlich)
- [ ] Downloads beobachten
- [ ] Bewertungen lesen
- [ ] Auf Feedback reagieren
- [ ] Crash-Reports prüfen

---

### ☐ 4.5 Backup & Sicherheit
- [ ] `android.keystore` gesichert (Google Drive/Dropbox)
- [ ] Passwort sicher gespeichert (Passwort-Manager)
- [ ] SHA-256 Fingerprint gespeichert
- [ ] Projekt-Ordner gesichert

---

## 🆘 Support & Ressourcen

### Guides in diesem Projekt:
- 📱 `/PLAY_STORE_ANLEITUNG.md` - Komplette Anleitung
- 🚀 `/DEPLOYMENT_GUIDE.md` - App online bringen
- 🎨 `/ICONS_GUIDE.md` - Icons & Screenshots erstellen
- 🫧 `/BUBBLEWRAP_GUIDE.md` - Android App bauen
- 🎮 `/PLAY_CONSOLE_GUIDE.md` - Play Store Upload
- 🔒 `/PRIVACY_POLICY.html` - Datenschutzerklärung

### Externe Links:
- Bubblewrap: [github.com/GoogleChromeLabs/bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- Play Console: [play.google.com/console](https://play.google.com/console)
- Play Console Hilfe: [support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)
- Canva: [canva.com](https://canva.com)
- Maskable Icons: [maskable.app](https://maskable.app)

---

## 📊 Fortschritt

```
Phase 1: Vorbereitung           [ ] 0% [ ] 25% [ ] 50% [ ] 75% [ ] 100%
Phase 2: Android App            [ ] 0% [ ] 25% [ ] 50% [ ] 75% [ ] 100%
Phase 3: Play Console           [ ] 0% [ ] 25% [ ] 50% [ ] 75% [ ] 100%
Phase 4: Nach Veröffentlichung  [ ] 0% [ ] 25% [ ] 50% [ ] 75% [ ] 100%

Gesamt:                         [ ] 0% [ ] 25% [ ] 50% [ ] 75% [ ] 100%
```

---

## 🎯 Geschätzte Zeit

| Phase | Dauer |
|-------|-------|
| Phase 1: Vorbereitung | 2-3 Stunden |
| Phase 2: Android App | 1-2 Stunden |
| Phase 3: Play Console | 2-3 Stunden |
| **Gesamt (deine Arbeit)** | **5-8 Stunden** |
| Phase 4: Google Prüfung | 1-7 Tage (Wartezeit) |

---

## 💡 Tipps

✅ **Mach Pausen!** Nicht alles an einem Tag
✅ **Backup!** Sichere android.keystore sofort
✅ **Teste!** Teste die App vor dem Upload
✅ **Screenshots!** Je besser, desto mehr Downloads
✅ **Beschreibung!** Nutze Emojis und klare Struktur
✅ **Geduld!** Google braucht Zeit für die Prüfung

---

## 🎉 Gratulation!

Wenn alle Checkboxen ✅ sind, hast du es geschafft!

**Deine Islamic Quiz App ist im Play Store! 🕌📱**

---

**Entwickelt von Ayoub Bezoui**
© 2026 - Alle Rechte vorbehalten

**Möge Allah deine Bemühungen segnen! 🤲**
