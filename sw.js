var CACHE = 'cache-only';


 
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
});

function precache() {
    return caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        'vue-pomodoro/script.js',
        'vue-pomodoro/style.css',
        'vue-pomodoro/index.html'
      ]);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
      return cache.match(request).then(function (matching) {
        return matching || Promise.reject('no-match');
      });
    });
}
