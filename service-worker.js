const CACHE_VERSION = 'v7';
const CACHE_NAME = `whyd-cache-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './styles/main.css',
  './styles/onboarding.css',
  './js/store.js',
  './js/utils.js',
  './js/app.js',
  './js/core-input.js',
  './js/tag-system.js',
  './js/timeline-view.js',
  './js/edit-delete.js',
  './js/streak-tracker.js',
  './js/daily-summary.js',
  './js/statistics.js',
  './js/export-feature.js',
  './js/onboarding.js',
  './js/search.js',
  './js/theme.js',
  './js/shortcuts.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('whyd-cache-') && name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
