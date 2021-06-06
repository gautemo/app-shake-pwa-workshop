self.addEventListener('install', function (event) {
  console.log('installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('activated', event);
});

self.addEventListener('fetch', function (event) {
  console.log('Handling fetch event for', event.request.url);
});

// export default { };
// declare const self: ServiceWorkerGlobalScope;