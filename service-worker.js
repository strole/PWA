self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static").then(function (cache) {
      return cache.addAll([
        "/style.css",
        "/dices/dice1.svg",
        "/dices/dice2.svg",
        "/dices/dice3.svg",
        "/dices/dice4.svg",
        "/dices/dice5.svg",
        "/dices/dice6.svg",
        "/dices/rolling_dice.gif",
        "/dices/rolling_dices.gif",
        "/index.html",
        "/script.js",
      ]);
    })
  );
});
self.addEventListener("activate", (event) => {
  console.log("Activated, V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open("static");
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

self.addEventListener("sync", async function (event) {
  console.log("sync event", event);
  let response = await fetch("https://catfact.ninja/fact");
  let fact = await response.json();
  console.log(fact);
  self.registration.showNotification("Cat fact", {
    body: fact.fact,
  });
});
