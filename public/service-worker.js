// WICHTIG: Version erhöhen bei jeder Änderung, um Cache zu clearen!
const CACHE_NAME = 'islamic-quiz-v4'; // <-- VERSION 4: Fixed Build!
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/favicon.svg'
];

// Install Service Worker - Sofort aktivieren!
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing v4 - Fixed Build! SKIP WAITING...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('[Service Worker] Cache failed:', error);
      })
  );
  // WICHTIG: Sofort aktivieren ohne auf andere Tabs zu warten!
  self.skipWaiting();
});

// Activate Service Worker - Alte Caches löschen!
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating v4 - DELETING old caches...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] ❌ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // WICHTIG: Sofort alle Clients übernehmen!
  self.clients.claim();
});

// Fetch Strategy: NETWORK FIRST für alles außer Bilder
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const url = new URL(event.request.url);
  
  // Für API-Calls: IMMER Network, KEIN Cache!
  if (url.pathname.includes('/functions/v1/') || url.pathname.includes('/auth/v1/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Für JavaScript: IMMER Network First
  if (url.pathname.endsWith('.js') || url.pathname.includes('/assets/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache die neue Version
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Nur bei Offline: Cache verwenden
          return caches.match(event.request);
        })
    );
    return;
  }

  // Für HTML: IMMER Network First
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Für alle anderen Dateien (Bilder, Icons, etc.): Cache First (Performance)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
  );
});