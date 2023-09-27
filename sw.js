
const CACHE_NAME = 'ga-queens-v1';
const STATIC_FILES = [
  'index.html',
  'script.js',
  'styles.css',
  'queen-icon.png',
  'run-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
