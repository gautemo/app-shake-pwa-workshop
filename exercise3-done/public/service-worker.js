importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

self.__WB_DISABLE_DEV_LOGS = true;
const { registerRoute } = workbox.routing;
const { NetworkFirst, CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  ({ request }) => ['script', 'document', 'style'].includes(request.destination),
  new NetworkFirst()
);

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

// TODO Exercise 4
// Add event listener for push

const notificationIcons = {
  1: 'assets/1st.png',
  2: 'assets/2nd.png',
  3: 'assets/3rd.png',
}