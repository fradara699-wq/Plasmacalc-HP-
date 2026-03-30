
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Estrategia básica: red primero, luego caché si offline (opcional aquí)
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
