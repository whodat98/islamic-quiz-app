# ⚡ QUICK START - Die wichtigsten Befehle

## 🎯 Alles was du copy-pasten musst!

---

## 1️⃣ ICONS GENERIEREN (2 Minuten)

```bash
# Starte Dev-Server
npm run dev
```

Dann im Browser:
```
http://localhost:5173/icon-converter.html
```

Klicke: **"Alle Icons generieren"** → Download alle 3 Icons → Speichere in `/public/`

---

## 2️⃣ APP ONLINE BRINGEN (5 Minuten)

### GitHub Push:

```bash
git add .
git commit -m "Ready for Play Store"
git push origin main
```

### Vercel Deploy:

1. Gehe zu [vercel.com/new](https://vercel.com/new)
2. Wähle dein Repository
3. Klicke "Deploy"
4. **NOTIERE URL:** _________________________________

---

## 3️⃣ SCREENSHOTS MACHEN (10 Minuten)

```bash
# Öffne deine deployed App
# Drücke F12
# Strg+Shift+M (Handy-Ansicht)
# Rechtsklick → "Capture screenshot"
```

Mache 7 Screenshots:
- ✅ Dashboard
- ✅ Quiz
- ✅ Quizduell
- ✅ Ergebnis
- ✅ Profil
- ✅ Arabisch
- ✅ Über die App

---

## 4️⃣ SOFTWARE INSTALLIEREN (10 Minuten)

```bash
# Bubblewrap installieren
npm install -g @bubblewrap/cli

# Prüfen
bubblewrap --version
java -version
node --version
```

Falls Java fehlt: [adoptium.net](https://adoptium.net/temurin/releases/) → JDK 17

---

## 5️⃣ ANDROID APP BAUEN (15 Minuten)

```bash
# Neuer Ordner (NICHT im React-Projekt!)
cd ~/Desktop
mkdir islamic-quiz-android
cd islamic-quiz-android

# Init (ERSETZE DEINE-URL!)
bubblewrap init --manifest https://DEINE-URL.vercel.app/manifest.json

# Fragen beantworten (siehe /STEP_BY_STEP.md)
# WICHTIG: Passwort notieren!

# Android SDK Setup
bubblewrap doctor

# BUILD!
bubblewrap build
```

**Output:**
```
./app/build/outputs/bundle/release/app-release.aab
```

---

## 6️⃣ DIGITAL ASSET LINKS (5 Minuten)

```bash
# SHA-256 holen (ERSETZE DEIN-PASSWORT!)
keytool -list -v -keystore android.keystore -alias islamic-quiz-key -storepass DEIN-PASSWORT
```

Kopiere die **SHA256** Zeile!

Gehe zu deinem React-Projekt:
```bash
# Öffne /public/.well-known/assetlinks.json
# Ersetze "REPLACE_WITH_YOUR_SHA256_FINGERPRINT" mit deinem SHA256

# Deploy
git add public/.well-known/assetlinks.json
git commit -m "Add asset links"
git push
```

Test:
```bash
curl https://DEINE-URL.vercel.app/.well-known/assetlinks.json
```

---

## 7️⃣ PLAY CONSOLE (30 Minuten)

1. **Account erstellen:** [play.google.com/console](https://play.google.com/console)
2. **$25 bezahlen**
3. **App erstellen:**
   - Name: `Islamic Quiz - Wissenstest`
   - Sprache: Deutsch
   - Kostenlos

4. **Dashboard ausfüllen:**
   - App-Zugang: Ohne Anmeldung ✅
   - Anzeigen: Keine ✅
   - Datenschutz-URL: `https://DEINE-URL.vercel.app/PRIVACY_POLICY.html`
   - Kategorie: Lernen

5. **Store-Eintrag:**
   - Kurzbeschreibung: (siehe /STEP_BY_STEP.md)
   - Vollständige Beschreibung: (siehe /STEP_BY_STEP.md)
   - Feature Graphic hochladen (1024x500)
   - Screenshots hochladen (min. 2)

6. **Altersfreigabe:**
   - Fragebogen: Alle Nein (außer Nutzer-Kommunikation: Ja)

7. **Länder:**
   - Alle Länder ✅

8. **Upload:**
   - Produktion → Neues Release
   - .aab hochladen
   - Release-Hinweise schreiben

9. **VERÖFFENTLICHEN!**
   - "Zur Überprüfung senden"

---

## 8️⃣ WARTEN (1-7 Tage)

⏳ Google prüft deine App...

📧 Check deine E-Mails!

🎉 **APP IST LIVE!**

---

## 📋 CHECKLISTE

- [ ] Icons generiert (3 Stück)
- [ ] App auf Vercel/Netlify deployed
- [ ] URL notiert
- [ ] 7 Screenshots gemacht
- [ ] Feature Graphic erstellt (Canva)
- [ ] Datenschutzerklärung online
- [ ] Bubblewrap installiert
- [ ] .aab erstellt
- [ ] SHA-256 in assetlinks.json
- [ ] Play Console Account erstellt
- [ ] $25 bezahlt
- [ ] Store-Eintrag ausgefüllt
- [ ] App hochgeladen
- [ ] Zur Überprüfung gesendet

---

## 🆘 HILFE BENÖTIGT?

**Sag mir:**
- Bei welchem Schritt du bist
- Was nicht funktioniert
- Fehlermeldung (falls vorhanden)

Ich helfe dir weiter! 🤝

---

## 📚 FULL GUIDES

- 📖 `/STEP_BY_STEP.md` - Detaillierte Anleitung mit Copy-Paste
- 📋 `/MASTER_CHECKLIST.md` - Komplette Checkliste
- 🎨 `/ICONS_GUIDE.md` - Icon-Erstellung
- 🫧 `/BUBBLEWRAP_GUIDE.md` - Android App bauen
- 🎮 `/PLAY_CONSOLE_GUIDE.md` - Play Store Upload

---

**Let's go! 🚀**
