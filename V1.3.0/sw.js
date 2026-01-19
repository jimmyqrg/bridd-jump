// Service Worker for Bridd Jump V1.3.0 (offline-first)
const CACHE_NAME = 'bridd-jump-v1.3.0';
const ASSETS = [
  '/V1.3.0/',
  '/V1.3.0/index.html',
  '/V1.3.0/game.js',
  '/V1.3.0/settings.html',
  '/V1.3.0/infinite-campus.ico',
  '/manifest.json',
  '/game-images/games/bridd-jump.png',
  '/images/healer.png',
  '/images/extremeHealer.png',
  '/images/healthIncreaser.png',
  '/images/shield.png',
  '/images/minus.png',
  '/images/speed%20up.png',
  '/images/jumper.png',
  '/sounds/first-jump.mp3',
  '/sounds/second-jump.mp3',
  '/sounds/trigger-drop.mp3',
  '/sounds/land.mp3',
  '/sounds/die.mp3',
  '/sounds/collect-gem.mp3',
  '/sounds/start-chooseversion.mp3',
  '/sounds/apply-save.mp3',
  '/sounds/menu-click.mp3',
  '/sounds/background.mp3',
  '/sounds/heal-ultra-heal.mp3',
  '/sounds/healthIncreaser.mp3',
  '/sounds/minus.mp3',
  '/sounds/speed-up.mp3',
  '/sounds/boost.mp3',
  '/sounds/speed-up-music.mp3',
  '/sounds/speed-up-music-loop.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone).catch(() => {});
        });
        return response;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/V1.3.0/index.html');
        }
        return cached;
      });
    })
  );
});
