# 🫧 Bubblewrap Guide - Android App erstellen

## Was ist Bubblewrap?

Bubblewrap ist das **offizielle Google-Tool**, um deine PWA als Android-App zu verpacken. Es erstellt eine TWA (Trusted Web Activity) - eine native Android-App, die deine Website anzeigt.

---

## ⚙️ Voraussetzungen installieren

### 1. Node.js prüfen/installieren

```bash
# Version prüfen (mindestens v14)
node --version

# Falls nicht installiert:
# Download: https://nodejs.org (LTS Version)
```

### 2. Java JDK installieren (11-17)

**Windows:**
1. Download: [Adoptium JDK 17](https://adoptium.net/temurin/releases/)
2. Installieren
3. Umgebungsvariable prüfen:
```cmd
java -version
```

**Mac:**
```bash
brew install openjdk@17
```

**Linux:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

### 3. Bubblewrap installieren

```bash
npm install -g @bubblewrap/cli
```

Prüfen:
```bash
bubblewrap --version
```

---

## 🚀 Schritt-für-Schritt: Android App erstellen

### Schritt 1: Neuer Ordner für Android-Projekt

```bash
# Erstelle einen neuen Ordner (NICHT in deinem React-Projekt!)
mkdir islamic-quiz-android
cd islamic-quiz-android
```

### Schritt 2: Bubblewrap initialisieren

**Wichtig:** Deine App muss online sein! Ersetze `YOUR-URL.com` mit deiner echten URL.

```bash
bubblewrap init --manifest https://YOUR-URL.com/manifest.json
```

**Beispiel:**
```bash
bubblewrap init --manifest https://islamic-quiz.vercel.app/manifest.json
```

### Schritt 3: Fragen beantworten

Bubblewrap wird dir folgende Fragen stellen:

```bash
? Domain being opened in the TWA: 
→ islamic-quiz.vercel.app (deine Domain ohne https://)

? Name of the application: 
→ Islamic Quiz

? Short name for the application: 
→ Islamic Quiz

? Application ID (must start with com.*): 
→ com.ayoubbezoui.islamicquiz

? Display mode: 
→ standalone (mit Pfeiltasten auswählen, Enter drücken)

? Orientation: 
→ portrait

? Theme color: 
→ #10b981 (Enter drücken für Default)

? Background color: 
→ #ffffff

? Start URL: 
→ /

? Icon URL (must be at least 512x512): 
→ /icon-512.png (oder die volle URL)

? Maskable icon URL: 
→ /icon-maskable-512.png

? Splash screen color: 
→ #10b981

? Enable Notification Delegation: 
→ Yes

? Signing key path: 
→ android.keystore (Enter für Default)

? Key name: 
→ islamic-quiz-key

? Key password: 
→ [WÄHLE EIN SICHERES PASSWORT - GUT AUFBEWAHREN!]

? Key alias password: 
→ [GLEICHES PASSWORT WIE OBEN]

? Full name (for certificate): 
→ Ayoub Bezoui

? Organization (for certificate): 
→ Ayoub Bezoui

? Organization Unit (for certificate): 
→ Development

? Country Code (2 letters, for certificate): 
→ DE (oder dein Land)
```

**❗ WICHTIG:**
- Bewahre das Passwort sicher auf!
- Sichere die `android.keystore` Datei (z.B. in Google Drive)
- Ohne diese Datei kannst du keine Updates hochladen!

### Schritt 4: Android SDK Setup

```bash
bubblewrap doctor
```

Das Tool prüft:
- ✅ Java JDK installiert?
- ✅ Android SDK installiert?

Falls Android SDK fehlt:
```bash
# Bubblewrap installiert es automatisch
# Folge den Anweisungen und akzeptiere die Lizenzen
```

### Schritt 5: Build erstellen

```bash
bubblewrap build
```

Das dauert 2-10 Minuten (beim ersten Mal länger).

**Output:**
```
BUILD SUCCESSFUL
✅ Android App Bundle generated at:
   ./app/build/outputs/bundle/release/app-release.aab
```

---

## 📱 Die .aab Datei testen

### Option 1: Android Studio (empfohlen)

1. Download Android Studio: [developer.android.com/studio](https://developer.android.com/studio)
2. Installieren
3. Öffne Device Manager
4. Erstelle einen virtuellen Emulator (z.B. Pixel 6)
5. Installiere die App:

```bash
# Im islamic-quiz-android Ordner:
bundletool build-apks --bundle=app/build/outputs/bundle/release/app-release.aab --output=app.apks --mode=universal

# Entpacke die APK
unzip app.apks -d apk-output

# Installiere auf Emulator
adb install apk-output/universal.apk
```

### Option 2: Auf echtem Handy

**Vorbereitung:**
1. Aktiviere "Entwickleroptionen" auf deinem Android-Handy
2. Aktiviere "USB-Debugging"
3. Verbinde Handy mit USB

**Installation:**
```bash
# Konvertiere .aab zu .apk
bundletool build-apks --bundle=app/build/outputs/bundle/release/app-release.aab --output=app.apks --connected-device

# Installiere
bundletool install-apks --apks=app.apks
```

### Option 3: Internal Testing in Play Console

1. Lade die `.aab` in Play Console hoch
2. Erstelle einen "Internal Test Track"
3. Füge dich selbst als Tester hinzu
4. Installiere die App über den Test-Link

---

## 🔗 Digital Asset Links einrichten

**Warum?** Damit deine App als vollwertige App erkannt wird und nicht in einem Browser öffnet.

### Schritt 1: SHA-256 Fingerprint abrufen

```bash
# Im islamic-quiz-android Ordner:
keytool -list -v -keystore android.keystore -alias islamic-quiz-key -storepass DEIN-PASSWORT
```

**Output:**
```
Certificate fingerprints:
MD5:  XX:XX:XX...
SHA1: XX:XX:XX...
SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12
```

Kopiere die **SHA256** Zeile!

### Schritt 2: assetlinks.json erstellen

Erstelle eine Datei: `.well-known/assetlinks.json` in deinem Web-Projekt (im `public` Ordner):

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

**Ersetze:**
- `package_name` → deine Package ID
- `sha256_cert_fingerprints` → dein SHA-256 Fingerprint

### Schritt 3: Auf Server hochladen

Die Datei muss unter dieser URL erreichbar sein:
```
https://islamic-quiz.vercel.app/.well-known/assetlinks.json
```

**Für Vercel/Netlify:**
- Erstelle den Ordner `public/.well-known/`
- Speichere `assetlinks.json` dort
- Deploy die Änderungen
- Git commit & push

### Schritt 4: Testen

```bash
# URL im Browser öffnen:
https://DEINE-URL.com/.well-known/assetlinks.json

# Sollte die JSON-Datei anzeigen
```

**Google Asset Links Tester:**
[developers.google.com/digital-asset-links/tools/generator](https://developers.google.com/digital-asset-links/tools/generator)

---

## 🔄 App updaten

Wenn du Änderungen an deiner Web-App machst:

### Option 1: Nur Web-Update (empfohlen)

Wenn du nur Content änderst (keine neuen Features):
1. Deploy deine Website
2. Die App aktualisiert sich automatisch beim nächsten Start
3. **Kein neuer Play Store Upload nötig!**

### Option 2: Neue Android-Version

Wenn du die App-Konfiguration änderst:

```bash
cd islamic-quiz-android

# twaManifest.json öffnen und Version erhöhen:
# "versionCode": 2,
# "versionName": "1.1.0"

# Neuen Build erstellen
bubblewrap build

# Neue .aab hochladen in Play Console
```

---

## 📁 Projektstruktur

Nach `bubblewrap init`:

```
islamic-quiz-android/
├── android.keystore          ← WICHTIG! Sichern!
├── twaManifest.json         ← App-Konfiguration
├── store_icon.png           ← Play Store Icon
├── app/                     ← Android-Projekt
│   └── build/
│       └── outputs/
│           └── bundle/
│               └── release/
│                   └── app-release.aab  ← DAS BRAUCHST DU!
└── build.gradle
```

---

## ⚠️ Troubleshooting

### Fehler: "Android SDK not found"

```bash
# Manuell installieren
bubblewrap doctor

# Oder SDK-Pfad angeben
export ANDROID_HOME=/path/to/android-sdk
```

### Fehler: "Manifest not found"

Prüfe:
- Ist deine App online?
- Ist `/manifest.json` erreichbar?
- Stimmt die URL (mit/ohne www)?

### Fehler: "Build failed"

```bash
# Gradle Cache löschen
cd app
./gradlew clean

# Neu bauen
cd ..
bubblewrap build
```

### Fehler: "Icon size too small"

Icon muss mindestens 512x512 px sein:
- Prüfe `/icon-512.png`
- Prüfe in manifest.json

### TWA öffnet im Browser statt in der App

Prüfe:
- assetlinks.json korrekt?
- SHA-256 stimmt?
- Package name stimmt?
- App neu installieren!

---

## ✅ Checkliste

Vor dem Build:

- [ ] App ist online und erreichbar
- [ ] manifest.json ist korrekt
- [ ] Icons (512x512) sind vorhanden
- [ ] Java JDK installiert (11-17)
- [ ] Node.js installiert (14+)
- [ ] Bubblewrap installiert

Nach dem Build:

- [ ] .aab Datei erstellt
- [ ] android.keystore gesichert
- [ ] Passwort notiert
- [ ] assetlinks.json online
- [ ] App getestet (Emulator oder Gerät)

Bereit für Play Store:

- [ ] .aab funktioniert
- [ ] Digital Asset Links funktionieren
- [ ] Screenshots erstellt
- [ ] Feature Graphic erstellt
- [ ] Datenschutzerklärung online
- [ ] Play Console Account bereit

---

## 📝 Nächster Schritt

Wenn du die `.aab` Datei hast:
1. ✅ Teste die App
2. ✅ Prüfe assetlinks.json
3. ✅ Weiter zu "Play Console Upload"

**Die .aab Datei findest du hier:**
```
islamic-quiz-android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🆘 Weitere Hilfe

- **Bubblewrap Docs:** [github.com/GoogleChromeLabs/bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- **TWA Guide:** [developer.chrome.com/docs/android/trusted-web-activity](https://developer.chrome.com/docs/android/trusted-web-activity)
- **Bubblewrap Issues:** [github.com/GoogleChromeLabs/bubblewrap/issues](https://github.com/GoogleChromeLabs/bubblewrap/issues)
