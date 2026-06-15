const CACHE_NAME = 'mid-dec-cache-v1.3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './assets/logo.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.png'
];

self.addEventListener('install', event => {
  // Activate the new worker as soon as it finishes installing.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Drop any old caches so stale HTML/assets can't be served, then take control.
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const accept = req.headers.get('accept') || '';

  // Network-first for page navigations / HTML so content updates appear immediately.
  if (req.mode === 'navigate' || accept.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets (icons, bundles, etc.).
  event.respondWith(
    caches.match(req).then(res => res || fetch(req))
  );
});
