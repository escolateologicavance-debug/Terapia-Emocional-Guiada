const CACHE_NAME = "terapia-app-v3";

const urlsToCache = [
  "index.html",
  "1.html",
  "2.html",
  "3.html",
  "4.html",
  "5.html",
  "6.html",
  "7.html",
  "Anamnese.html",

  "logo-192.png",
  "logo-512.png"
];

// INSTALAÇÃO
self.addEventListener("install", event => {
  self.skipWaiting(); // ativa imediatamente

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ATIVAÇÃO (limpa cache antigo)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// FETCH (offline inteligente)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});
