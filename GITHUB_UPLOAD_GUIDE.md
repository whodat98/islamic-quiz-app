# 🚀 GitHub Upload Guide - Islamic Quiz App

## 📋 Schritt-für-Schritt Anleitung

### ✅ SCHRITT 1: Projekt von Figma Make herunterladen

#### Option A: Export-Button nutzen (EINFACHSTE!)
1. Schaue oben rechts in Figma Make
2. Suche nach einem **"Export"** oder **"Download"** Button
3. Klicke darauf → Download als ZIP
4. Speichere auf Desktop
5. Entpacke die ZIP-Datei

#### Option B: Falls kein Export-Button vorhanden
1. Öffne das **Terminal** in Figma Make (falls verfügbar)
2. Oder: Kopiere die Dateien manuell (siehe unten)

---

### ✅ SCHRITT 2: GitHub Repository vorbereiten

Du hast bereits ein Repository erstellt auf GitHub.com:
- **Name:** `islamic-quiz-app`
- **URL:** `https://github.com/DEIN-USERNAME/islamic-quiz-app`

Ersetze `DEIN-USERNAME` mit deinem echten GitHub-Benutzernamen!

---

### ✅ SCHRITT 3: Code hochladen mit Git

#### 3.1 Terminal öffnen (auf deinem Mac)
- Drücke **Cmd + Space**
- Tippe **"Terminal"**
- Enter

#### 3.2 Zum Projekt-Ordner navigieren
```bash
cd ~/Desktop/islamic-quiz-app
# (Falls du das Projekt woanders entpackt hast, passe den Pfad an)
```

#### 3.3 Git initialisieren
```bash
git init
```

#### 3.4 Alle Dateien hinzufügen
```bash
git add .
```

#### 3.5 Ersten Commit erstellen
```bash
git commit -m "Initial commit - Islamic Quiz App with 300 questions"
```

#### 3.6 Branch umbenennen
```bash
git branch -M main
```

#### 3.7 GitHub Repository verknüpfen
```bash
git remote add origin https://github.com/DEIN-USERNAME/islamic-quiz-app.git
```

**⚠️ WICHTIG:** Ersetze `DEIN-USERNAME` mit deinem GitHub-Benutzernamen!

#### 3.8 Code hochladen
```bash
git push -u origin main
```

**Falls GitHub nach Login fragt:**
- **Username:** Dein GitHub-Benutzername
- **Password:** Du brauchst einen **Personal Access Token** (nicht dein Passwort!)

---

### 🔑 Personal Access Token erstellen (falls nötig)

Wenn Git nach einem Passwort fragt:

1. Gehe zu [github.com/settings/tokens](https://github.com/settings/tokens)
2. Klicke **"Generate new token"** → **"Generate new token (classic)"**
3. **Name:** `Islamic Quiz App`
4. **Expiration:** `90 days`
5. **Scopes:** Haken bei ✅ **repo** (alle Unterpunkte)
6. Klicke **"Generate token"**
7. **Kopiere den Token** (sieht aus wie: `ghp_xxxxxxxxxxxx`)
8. Nutze diesen Token als "Passwort" beim `git push`

---

## ✅ FERTIG!

Nach dem Push:
1. Gehe zu `https://github.com/DEIN-USERNAME/islamic-quiz-app`
2. Du solltest alle Dateien sehen! 🎉

---

## 📱 NÄCHSTER SCHRITT: Vercel Deployment

Sobald der Code auf GitHub ist, zeige ich dir:
1. Wie du Vercel verbindest
2. Die App live stellst
3. Die URL für den Play Store nutzt

---

## 🆘 PROBLEME?

### "Permission denied"
→ Du hast keinen Zugriff. Prüfe GitHub-Username und Token.

### "Repository not found"
→ Prüfe die URL: `https://github.com/DEIN-USERNAME/islamic-quiz-app.git`

### "Already exists"
→ Du hast bereits ein Git-Repo. Nutze `git remote set-url origin <URL>`

### "Nothing to commit"
→ Keine Dateien im Ordner. Prüfe, ob du im richtigen Verzeichnis bist.

---

**Bei Fragen: Einfach fragen! 😊**
