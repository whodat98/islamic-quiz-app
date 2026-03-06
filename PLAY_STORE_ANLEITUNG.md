# 📱 Play Store Upload Anleitung - Islamic Quiz App

## Übersicht
Diese Anleitung zeigt dir, wie du deine PWA (Progressive Web App) als native Android-App im Google Play Store veröffentlichst.

---

## 🎯 Voraussetzungen

### 1. Google Play Console Account
- **Kosten:** Einmalig $25 USD
- **Registrierung:** [play.google.com/console](https://play.google.com/console)
- **Benötigt:** Google-Konto, Kreditkarte, Entwickler-Informationen

### 2. Deine App muss online sein
- Deine PWA muss unter einer URL erreichbar sein (z.B. `https://islamic-quiz.app`)
- HTTPS ist **zwingend erforderlich**
- Die App muss stabil laufen

---

## 🛠️ Methode: TWA (Trusted Web Activity) mit Bubblewrap

**Bubblewrap** ist das offizielle Google-Tool, um PWAs in Android-Apps zu verpacken.

### Schritt 1: Installation von Bubblewrap

```bash
# Node.js muss installiert sein (v14+)
npm install -g @bubblewrap/cli

# Java JDK 11+ installieren (falls nicht vorhanden)
# Download: https://adoptium.net/
```

### Schritt 2: Projekt initialisieren

```bash
# Navigiere in einen neuen Ordner
mkdir islamic-quiz-android
cd islamic-quiz-android

# Initialisiere das Projekt
bubblewrap init --manifest https://DEINE-URL.com/manifest.json
```

**Wichtig:** Ersetze `DEINE-URL.com` mit deiner tatsächlichen Domain!

### Schritt 3: Fragen beantworten

Bubblewrap wird dich fragen:

```
? Application name: Islamic Quiz
? Short name: Islamic Quiz
? Application ID: com.ayoubbezoui.islamicquiz
? Display mode: standalone
? Orientation: portrait
? Theme color: #10b981 (Emerald-600)
? Background color: #ffffff
? Start URL: /
? Icon URL: https://DEINE-URL.com/icon-512.png
? Maskable icon URL: https://DEINE-URL.com/icon-maskable-512.png
? Splash screen color: #10b981
? Enable notifications: Yes
? Signing key path: android.keystore (wird erstellt)
? Key name: islamic-quiz-key
```

### Schritt 4: App Icons vorbereiten

Du brauchst folgende Icons:

1. **App Icon (512x512 px)**
   - Quadratisches Icon
   - PNG-Format
   - Transparenter oder farbiger Hintergrund
   - Speichern als: `icon-512.png`

2. **Maskable Icon (512x512 px)**
   - Wichtiger Bereich muss in der Mitte sein (80%)
   - Generator: [maskable.app](https://maskable.app)
   - Speichern als: `icon-maskable-512.png`

3. **Feature Graphic (1024x500 px)**
   - Für Play Store Listing
   - Zeigt App-Name und Beschreibung
   - Kein transparenter Hintergrund

**Tipp:** Tools zum Erstellen:
- [Canva](https://canva.com) (einfach)
- [Figma](https://figma.com) (professionell)
- [Icon Kitchen](https://icon.kitchen) (speziell für App Icons)

### Schritt 5: Manifest.json anpassen

Erstelle/aktualisiere deine `/public/manifest.json`:

```json
{
  "name": "Islamic Quiz - Wissenstest",
  "short_name": "Islamic Quiz",
  "description": "300 schwere Fragen zu Quran, Hadith, Fiqh, Seerah, islamische Geschichte und Aqidah",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#10b981",
  "background_color": "#ffffff",
  "lang": "de",
  "dir": "ltr",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Schritt 6: Build erstellen

```bash
# Android App Bundle erstellen (empfohlen für Play Store)
bubblewrap build

# Das erstellt eine .aab Datei in:
# ./app/build/outputs/bundle/release/app-release.aab
```

**Falls Fehler auftreten:**
```bash
# Android SDK akzeptieren
bubblewrap doctor

# Signing Key neu generieren
bubblewrap update
```

---

## 📝 Play Console Setup

### Schritt 1: App erstellen

1. Gehe zu [play.google.com/console](https://play.google.com/console)
2. Klicke auf "**App erstellen**"
3. Fülle aus:
   - **App-Name:** Islamic Quiz - Wissenstest
   - **Standardsprache:** Deutsch
   - **App-Typ:** App oder Spiel → **App**
   - **Kostenlos/Kostenpflichtig:** **Kostenlos**
   - **Datenschutzerklärung erforderlich:** Ja

### Schritt 2: Store-Eintrag ausfüllen

#### App-Details:
- **Kurzbeschreibung (80 Zeichen):**
  ```
  300 schwere islamische Fragen. Teste dein Wissen über Quran, Hadith & mehr!
  ```

- **Vollständige Beschreibung (4000 Zeichen):**
  ```
  🕌 Islamic Quiz - Dein islamisches Wissensquiz
  
  Teste und vertiefe dein islamisches Wissen mit 300 anspruchsvollen Fragen aus 6 Kategorien:
  
  📖 KATEGORIEN:
  • Quran - Verse, Suren, Offenbarungen
  • Hadith - Authentische Überlieferungen
  • Fiqh - Islamische Rechtslehre
  • Seerah - Leben des Propheten ﷺ
  • Islamische Geschichte - Ereignisse & Persönlichkeiten
  • Aqidah - Glaubenslehre
  
  ✨ FEATURES:
  • 300 schwere Fragen für Fortgeschrittene
  • Quizduell-Modus - Trete gegen andere an
  • Mehrsprachig - Deutsch & Arabisch
  • Offline verfügbar - Lerne überall
  • Bis zu 5 Profile - Für die ganze Familie
  • 100% islamische Inhalte - Keine säkularen Themen
  • Fortschritts-Tracking - Sehe deine Entwicklung
  • Kostenlos - Alle Fragen freigeschaltet
  
  🎯 FÜR WEN?
  Diese App richtet sich an Muslime, die ihr Wissen vertiefen möchten. Alle Fragen sind anspruchsvoll und basieren auf authentischen Quellen.
  
  ⚠️ WICHTIGER HINWEIS:
  Diese App dient ausschließlich Bildungszwecken. Für verbindliche religiöse Auskünfte konsultieren Sie bitte qualifizierte Gelehrte.
  
  🔒 DATENSCHUTZ:
  • Keine Werbung
  • Keine Datenweitergabe an Dritte
  • Nutzung ohne Anmeldung möglich
  • Alle Daten bleiben lokal auf deinem Gerät
  
  📱 ENTWICKELT MIT ❤️ FÜR DIE UMMAH
  
  Von Ayoub Bezoui
  © 2026 - Alle Rechte vorbehalten
  ```

#### Screenshots (Erforderlich):
- **Mindestens 2 Screenshots** (Smartphone)
- **Empfohlen:** 4-8 Screenshots
- **Format:** PNG oder JPG
- **Auflösung:** 1080 x 1920 px oder höher
- **Seitenverhältnis:** 9:16

**Screenshot-Ideen:**
1. Dashboard mit Kategorien
2. Quiz in Aktion
3. Quizduell-Modus
4. Statistiken/Fortschritt
5. Profil-Auswahl
6. Ergebnis-Seite
7. Arabische Sprachversion
8. "Über die App" Seite

**Screenshot-Tools:**
- Chrome DevTools (F12 → Toggle Device Toolbar → Screenshot)
- Simulator: Android Studio Emulator
- Online: [Mockuphone](https://mockuphone.com)

#### Feature Graphic (Erforderlich):
- **Größe:** 1024 x 500 px
- **Format:** PNG oder JPG
- **Inhalt:** App-Name, Slogan, visueller Eyecatcher

**Beispiel-Text für Feature Graphic:**
```
Islamic Quiz
300 Fragen • 6 Kategorien • Quizduell
🕌 Teste dein Wissen
```

#### App-Icon (Automatisch aus Build):
- Wird aus deinem `icon-512.png` übernommen

### Schritt 3: Inhaltsrichtlinien

#### Datenschutzerklärung:
Du brauchst eine **Datenschutzerklärung-URL**. Erstelle eine einfache HTML-Seite:

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Datenschutzerklärung - Islamic Quiz</title>
</head>
<body>
    <h1>Datenschutzerklärung - Islamic Quiz</h1>
    
    <h2>1. Datenerhebung</h2>
    <p>Diese App sammelt keine persönlichen Daten. Alle Quiz-Fortschritte werden lokal auf Ihrem Gerät gespeichert.</p>
    
    <h2>2. Keine Weitergabe</h2>
    <p>Ihre Daten werden niemals an Dritte weitergegeben oder verkauft.</p>
    
    <h2>3. Optionale Anmeldung</h2>
    <p>Falls Sie sich für ein Konto anmelden, werden nur E-Mail und Passwort gespeichert. Diese werden verschlüsselt über Supabase gesichert.</p>
    
    <h2>4. Analytics</h2>
    <p>Wir verwenden keine Tracking-Tools oder Werbe-IDs.</p>
    
    <h2>5. Kontakt</h2>
    <p>Entwickler: Ayoub Bezoui<br>
    E-Mail: [DEINE-EMAIL]</p>
    
    <p>Stand: März 2026</p>
</body>
</html>
```

**Hoste diese Datei auf:**
- Deiner Domain (z.B. `https://islamic-quiz.app/privacy`)
- GitHub Pages (kostenlos)
- Google Sites (kostenlos)

#### Altersfreigabe:
- **Zielgruppe:** 12+ (religiöser/bildender Inhalt)
- **Keine unangemessenen Inhalte**

#### Kategorie:
- **Hauptkategorie:** Lernen (Education)
- **Tags:** Quiz, Religion, Islam, Bildung

### Schritt 4: App-Bundle hochladen

1. Gehe zu **"Produktion" → "Neues Release erstellen"**
2. Lade die `.aab` Datei hoch:
   ```
   app/build/outputs/bundle/release/app-release.aab
   ```
3. **Release-Name:** `1.0.0 - Erste Veröffentlichung`
4. **Release-Hinweise (Deutsch):**
   ```
   🎉 Erste Version!
   
   • 300 schwere Fragen in 6 Kategorien
   • Quizduell-Modus
   • Deutsch & Arabisch
   • Offline verfügbar
   • Komplett kostenlos
   ```

### Schritt 5: Preise & Vertrieb

- **Preis:** Kostenlos
- **Länder:** Alle (oder spezifisch: Deutschland, Österreich, Schweiz, Türkei, Saudi-Arabien, etc.)
- **Content-Rating:** Ausfüllen (USK, PEGI, etc.)

---

## 🔐 Digital Asset Links (Wichtig für TWA!)

Damit deine TWA als vollwertige App erkannt wird, musst du eine `assetlinks.json` auf deinem Server bereitstellen.

### Schritt 1: SHA-256 Fingerprint abrufen

```bash
# Im Bubblewrap-Projektordner:
keytool -list -v -keystore android.keystore -alias islamic-quiz-key

# Kopiere die SHA256-Zeile (z.B.):
# SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90...
```

### Schritt 2: assetlinks.json erstellen

Erstelle die Datei unter:
```
/.well-known/assetlinks.json
```

Inhalt:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.ayoubbezoui.islamicquiz",
    "sha256_cert_fingerprints": [
      "AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12"
    ]
  }
}]
```

**Wichtig:**
- Ersetze `package_name` mit deiner Package-ID
- Ersetze `sha256_cert_fingerprints` mit deinem SHA-256

### Schritt 3: Datei hochladen

Die Datei muss unter dieser URL erreichbar sein:
```
https://DEINE-DOMAIN.com/.well-known/assetlinks.json
```

**Testen:**
```bash
curl https://DEINE-DOMAIN.com/.well-known/assetlinks.json
```

---

## ✅ Checkliste vor dem Upload

- [ ] PWA ist live und erreichbar (HTTPS)
- [ ] manifest.json ist korrekt
- [ ] Icons (192px, 512px, maskable) erstellt
- [ ] Feature Graphic (1024x500) erstellt
- [ ] Screenshots (4-8 Stück) erstellt
- [ ] Datenschutzerklärung online
- [ ] assetlinks.json auf Server
- [ ] .aab Datei gebaut
- [ ] Play Console Account bezahlt ($25)
- [ ] Store-Eintrag ausgefüllt
- [ ] Content-Rating abgeschlossen

---

## 🚀 Veröffentlichung

### Testphase (Empfohlen):

1. **Interne Tests:**
   - Lade die App für max. 100 Tester
   - Teste alle Features
   - Sammle Feedback

2. **Geschlossene Tests:**
   - Erweitere auf max. 1000 Tester
   - Teste auf verschiedenen Geräten

3. **Offene Tests:**
   - Jeder kann testen
   - Sammle Bewertungen

### Produktions-Release:

1. Gehe zu **"Produktion"**
2. Klicke auf **"Neues Release erstellen"**
3. Lade die `.aab` hoch
4. Klicke auf **"Überprüfen"**
5. **"Zur Überprüfung senden"**

**⏰ Prüfungsdauer:** 1-7 Tage (meist 1-2 Tage)

---

## 📊 Nach der Veröffentlichung

### Updates veröffentlichen:

```bash
# Version in twaManifest.json erhöhen
# z.B. von 1 auf 2

# Neuen Build erstellen
bubblewrap build

# In Play Console hochladen unter "Produktion → Neues Release"
```

### Analytics einrichten:

- Google Play Console bietet eingebaute Analytics
- Crash-Reports sind automatisch verfügbar

### Bewertungen sammeln:

- Füge einen "App bewerten"-Button in deine App ein
- Reagiere auf Rezensionen

---

## 🆘 Häufige Probleme

### Problem: "App nicht installiert"
**Lösung:** Signatur stimmt nicht → assetlinks.json prüfen

### Problem: "Digital Asset Links nicht gefunden"
**Lösung:** 
```bash
# URL testen:
curl https://DEINE-DOMAIN.com/.well-known/assetlinks.json

# CORS-Header prüfen
# Server muss diese Datei ohne Auth ausliefern
```

### Problem: "Build fehlgeschlagen"
**Lösung:**
```bash
# Bubblewrap updaten
npm update -g @bubblewrap/cli

# Java Version prüfen (11-17 empfohlen)
java -version

# Android SDK installieren
bubblewrap doctor
```

### Problem: "TWA öffnet im Browser"
**Lösung:**
- assetlinks.json muss korrekt sein
- Package name muss übereinstimmen
- SHA-256 muss korrekt sein
- App neu installieren nach assetlinks.json-Änderung

---

## 📚 Weitere Ressourcen

- **Bubblewrap Docs:** [github.com/GoogleChromeLabs/bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- **TWA Guide:** [developer.chrome.com/docs/android/trusted-web-activity](https://developer.chrome.com/docs/android/trusted-web-activity)
- **Play Console Help:** [support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)
- **Asset Links Tester:** [developers.google.com/digital-asset-links/tools/generator](https://developers.google.com/digital-asset-links/tools/generator)

---

## ✨ Gratulation!

Nach erfolgreicher Überprüfung ist deine App im Play Store verfügbar! 🎉

**Share-Link:**
```
https://play.google.com/store/apps/details?id=com.ayoubbezoui.islamicquiz
```

**Viel Erfolg mit deiner Islamic Quiz App! 🕌📱**

---

**Entwickelt von Ayoub Bezoui**
© 2026 - Alle Rechte vorbehalten
