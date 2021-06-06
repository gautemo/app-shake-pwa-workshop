# Exercise 1 - Make app installable

To make a PWA installable we need a manifest and a service worker and host the website on HTTPS.

## Manifest

Create `manifest.json` in root folder and import in `index.html` with `<link rel="manifest" href="manifest.json">`.
Manifest must contain `name`/`short_name`, `icons`, `start_url`, `display`

Resources [web.dev](https://web.dev/add-manifest/) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest).

## Service Wroker

Create a folder `public` and create a service worker file. In `main.tsx` you can register the service worker file.

Resources [web.dev](https://developers.google.com/web/fundamentals/primers/service-workers) and [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).

## HTTPS
A PWA needs to be hosted on HTTPS to be installable. Note that `localhost` is an exception that is accepted during local development.

Let's deploy to [Netlify](https://www.netlify.com/) that gives us HTTPS for free.  
I added two scripts in `package.json`. Run `npm run netlify:init` and then `npm run netlify:deploy` when you want to deploy.