var CACHE_NAME = 'pomodoro-cache-v1';
var urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(CACHE_FILES))
    .then(self.skipWaiting())
    .catch(err => console.error("[sw.js] Error trying to pre-fetch cache files:", err))
    )
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});