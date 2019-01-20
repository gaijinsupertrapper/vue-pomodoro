var CACHE_NAME = 'pomodoro-cache-v1';
var urlsToCache = [
  '/index.html',
  '/style.css',
  '/script.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).then(() => console.log('Assets added to cache'))
        .catch(err => console.log('Error while fetching assets', err));;
      })
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