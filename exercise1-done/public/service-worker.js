self.addEventListener('install', function (event) {
  console.log('installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('activated', event);
});

self.addEventListener('fetch', function (event) {
  console.log('Handling fetch event for', event.request.url);
});

// TODO Exercise 2
// Cache files with workbox

// TODO Exercise 4
// Add event listener for push

const notificationIcons = {
  1: 'assets/1st.png',
  2: 'assets/2nd.png',
  3: 'assets/3rd.png',
}