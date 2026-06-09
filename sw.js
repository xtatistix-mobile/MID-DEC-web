const CACHE_NAME = 'mid-dec-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './assets/logo.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
