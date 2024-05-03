// Name of the Cache.
const CACHE = "cacheV1";

// Select files for caching.
let urlsToCache = [
  "/calculation-trainer",
  "/calculation-trainer/index.html",
  "/calculation-trainer/components",
  "/calculation-trainer/components/images",
  "/calculation-trainer/components/images/favicon.png",
  "/calculation-trainer/components/scripts",
  "/calculation-trainer/components/scripts/main.js",
  "/calculation-trainer/components/scripts/pwa-handler.js",
  "/calculation-trainer/components/main.css",
];

// Cache all the selected items once application is installed.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("Caching started.");
      return cache.addAll(urlsToCache);
    })
  );
});

// Whenever a resource is requested, return if its cached else fetch the resourcefrom server.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
