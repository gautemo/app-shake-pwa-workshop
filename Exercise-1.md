# Exercise 1 - Make app installable

To make a PWA installable we need a manifest and a service worker and host the website on HTTPS.

## Manifest

Create `manifest.json` in the `public` folder and import in `index.html` with `<link rel="manifest" href="manifest.json">`.  
The manifest has some required properties that need to be set, which is `name`/`short_name`, `icons`, `start_url`, `display`.

It is best to have a somewhat complete manifest and adding the properties that make sense for your application. 
You can read more about all properties on [web.dev](https://web.dev/add-manifest/) or [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest).

[Read more](https://web.dev/manifest-updates/) about what happens when updating the values later, after a user might have installed the app.

## Service Wroker

Service Worker is a script that runs in the background, even though when the user have closed the website. 
It does not have access to the DOM. It gives us new features such as caching and push notifications.

Add a file called `service-worker.js` in the `public` folder. 
The file can actually be empty, but if you want to add some event listener to better understand what it does.
```js
self.addEventListener('install', function (event) {
  console.log('installed', event);
});

self.addEventListener('activate', function (event) {
  console.log('activated', event);
});

self.addEventListener('fetch', function (event) {
  console.log('Handling fetch event for', event.request.url);
});
```

In the entrypoint of your application, `main.tsx`, you are now going to register this service worker file.
```ts
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}
```

If the content of the service worker has changed the browser will detect it and register the new one, but won't do anything for the same file. The new service worker will be activated once the user closes the tab or navigates away, not on refresh.

You can read more on [web.dev](https://developers.google.com/web/fundamentals/primers/service-workers) and [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

## HTTPS
A PWA needs to be hosted on HTTPS to be installable. Note that `localhost` is an exception that is accepted during local development.

Let's deploy to [Netlify](https://www.netlify.com/) that gives us HTTPS for free.  
I added two scripts in `package.json`. Navigate to the working folder in the terminal. 
Run `npm run netlify:init` and then `npm run netlify:deploy` when you want to deploy.