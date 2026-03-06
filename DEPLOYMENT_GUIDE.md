# 🚀 Deployment Guide - Islamic Quiz App online bringen

## Option 1: Vercel (EMPFOHLEN - am einfachsten!)

### Warum Vercel?
- ✅ Kostenlos für persönliche Projekte
- ✅ Automatische HTTPS
- ✅ Sehr schnell
- ✅ Einfaches Setup
- ✅ Kostenlose Domain (*.vercel.app)

### Schritt-für-Schritt:

#### 1. GitHub Repository erstellen (falls nicht vorhanden)

```bash
# In deinem Projektordner:
git init
git add .
git commit -m "Initial commit - Islamic Quiz App"

# Erstelle ein neues Repo auf github.com
# Dann:
git remote add origin https://github.com/DEIN-USERNAME/islamic-quiz.git
git branch -M main
git push -u origin main
```

#### 2. Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "Sign Up"
3. Melde dich mit GitHub an
4. Autorisiere Vercel

#### 3. Projekt deployen

1. Klicke auf "Add New Project"
2. Wähle dein `islamic-quiz` Repository
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`

**Environment Variables hinzufügen:**
Klicke auf "Environment Variables" und füge hinzu:

```
SUPABASE_URL=deine-supabase-url
SUPABASE_ANON_KEY=dein-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=dein-service-role-key
STRIPE_SECRET_KEY=dein-stripe-key
STRIPE_WEBHOOK_SECRET=dein-webhook-secret
```

7. Klicke auf **"Deploy"**

#### 4. Deployment abwarten

- Dauert 2-5 Minuten
- Du bekommst eine URL wie: `https://islamic-quiz-abc123.vercel.app`

#### 5. Eigene Domain verbinden (Optional)

**Kostenlose Domain (.vercel.app):**
- Gehe zu "Settings" → "Domains"
- Füge einen Namen hinzu: `islamic-quiz.vercel.app`

**Eigene Domain (falls du eine hast):**
- Klicke auf "Add Domain"
- Gib deine Domain ein (z.B. `islamic-quiz.com`)
- Folge den DNS-Anweisungen

---

## Option 2: Netlify

### Schritt-für-Schritt:

1. Gehe zu [netlify.com](https://netlify.com)
2. "Sign up" mit GitHub
3. "Add new site" → "Import from Git"
4. Wähle dein Repository
5. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Environment Variables hinzufügen (wie bei Vercel)
7. "Deploy site"

---

## Option 3: Firebase Hosting

### Schritt-für-Schritt:

#### 1. Firebase CLI installieren

```bash
npm install -g firebase-tools
```

#### 2. Firebase Login

```bash
firebase login
```

#### 3. Firebase Projekt erstellen

```bash
firebase init hosting

# Fragen beantworten:
# - What do you want to use as your public directory? dist
# - Configure as a single-page app? Yes
# - Set up automatic builds? No
```

#### 4. Build & Deploy

```bash
# App bauen
npm run build

# Deployen
firebase deploy --only hosting
```

Du bekommst eine URL wie: `https://islamic-quiz-abc123.web.app`

---

## ✅ Nach dem Deployment

### 1. Teste deine App

Öffne die URL in verschiedenen Browsern:
- Chrome (Desktop)
- Safari (Mobile)
- Firefox

### 2. PWA Installation testen

Auf dem Handy:
1. Öffne die URL in Chrome/Safari
2. Klicke auf "Zum Startbildschirm hinzufügen"
3. Teste die App offline

### 3. Notiere dir die URL

Du brauchst sie für:
- Bubblewrap Setup
- Play Store Listing
- assetlinks.json

---

## 🆘 Probleme lösen

### Problem: Build schlägt fehl

**Lösung:** Prüfe deine `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Problem: Supabase funktioniert nicht

**Lösung:** Environment Variables prüfen
- In Vercel: Settings → Environment Variables
- In Netlify: Site settings → Environment variables

### Problem: 404 beim Reload

**Lösung:** Vercel/Netlify sollte das automatisch handhaben.

Falls nicht, erstelle `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Oder `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📝 Nächster Schritt

Wenn deine App online ist:
1. ✅ Notiere die URL
2. ✅ Teste alle Features
3. ✅ Weiter zu "Icons erstellen"
