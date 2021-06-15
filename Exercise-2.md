# Exercise 2 - Cache files & offline mode

An important part of PWAs are improving how the web application behaves when the user has no internet or a slow connection.

## Cache files

We can cache files so the user still can open the website, but also to improve performance by not fetching files.

We can cache files with `caches` property on the [ServiceWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope) and it would look something like this:
```js
const cacheName = `cache-v1`;
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(['main.js']);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response;
      });
    })
  );
});
```

But this can turn into verbose code and make it hard to implement different cache strategies and invalidating the cache.

Therefore we will use [Workbox](https://developers.google.com/web/tools/workbox) to simplify the caching of files and strategy.

We can import the package with `importScripts` a method on worker's scope.
```js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

self.__WB_DISABLE_DEV_LOGS = true;
const { registerRoute } = workbox.routing;
const { NetworkFirst, CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
```

For HTML, JavaScript, and CSS we are going to fetch from the network first and use cache as a fallback. 
This makes it easier to allow user to always get the newest content when deploying a new version of the application. 
But a strategy with using the cache first, could improve the performance. So you need to decide what's most important for you.

```js
registerRoute(
  ({ request }) => ['script', 'document', 'style'].includes(request.destination),
  new NetworkFirst()
);
```

For images we want to use the cache first, but update the cache when the image is requested. 
That way the image is available right away, but updating the cache so the user will get the new image next time. 
We can also invalidate the cache after some days so we don't store unnecessary data.

```js
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
```

You can look at the cache in the developer tools (F12) -> Application -> Cache Storage.

Be careful to not cache the file responsible for registering the service worker and use cache first, 
then rename the service worker file. That will cause trouble.

## Offline UI

If the user is offline it will depend on the type of application for how usefull it still can be. 
But every time we can provide a better experience than nothing. 

Our application should still be playable, but the leaderboard should not try to fetch data and display the error message. 
Instead it should give user feedback about being offline in a warning.

Open `useIsOnline.ts` file and implement a hook that provides a boolean state about being online or not.
```ts
console.log(navigator.onLine); // true or false depending on online/offline
window.addEventListener('online', () => console.log('user is online 😁'));
window.addEventListener('offline', () => console.log('user is offline 😭'));
```

When the hook is completed it should be used in `Leaderboard.tsx`.