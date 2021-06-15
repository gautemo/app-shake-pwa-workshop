# Exercise 3 - Promoting PWA installation

Since we want our PWA to be like an actuall app, 
we want the user to be able to open the app without opening the browser and typing the URL or finding their bookmark.

There exists multiple [patterns](https://web.dev/promote-install/) for promoting PWA installation.

On Android phones we could do nothing and get a banner at the bottom automaticly. 
But iOS does not have the same behaviour, but also need to be added to home screen manually.
So we are choosing to use a simple install button. 
On Android we trigger the install confirmation and on iOS we show the user instructions on how to add it.

## Android

Chrome will trigger a `beforeinstallprompt` event when certain criteria is met. Currently, the user has interacted with the domain for at least 30 seconds. 

1. Listen for the `beforeinstallprompt` event.
```ts
window.addEventListener('beforeinstallprompt', (e) => {
});
```
2. Prevent the default install banner at the bottom from showing.
```ts
e.preventDefault();
```
3. Save the `beforeinstallprompt` event, so it can be used to trigger the install flow later.
```ts
deferredPrompt = e as BeforeInstallPromptEvent;
```
4. Provide a button to start the in-app installation flow.
```ts
setShowInstall(true);
```

You can read more at [web.dev](https://web.dev/customize-install/) and you can also check out how to create [richer PWA installation UI](https://developer.chrome.com/blog/richer-pwa-installation/).

## iOS

iOS does not support automatic install of PWA and needs to show information to the user about how to install it.

1. Check if user is on iOS and is not already in PWA
```ts
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}
const isInStandaloneMode = () => window.navigator.standalone;
```
2. If it's iOS and not in standalone mode you can display the install button.