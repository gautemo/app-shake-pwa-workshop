# Exercise 4 - Capable

In this exercise we will utilize that PWA/web can use a variety of advanced capabilities, 
such as device sensors and push notifications. 

Check out [What Web Can Do Today](https://whatwebcando.today/) for a list of features the web can use today.

## Accelerometer

Out app is a game where having access to the accelerometer is necessary to listen for movement to the device.

Go to `useAccelerometer.ts` and implement an event listener for `devicemotion` 
and call `setIfMax` with the summing up the absolute values of `x`, `y` and `z`. 
The backend only accepts integers, so make sure to use `Math.ceil` on your final number.

```ts
window.addEventListener('devicemotion', ({acceleration}) => {
  const { x, y, z } = acceleration ?? {};
});
```

For iOS you might not have access to the accelerometer by default. 
On some versions you need to turn it on in settings: `General > Safari > Privacy & Security > Motion & Orientation Access`. 
On other versions you need to prompt the user for permission, which can't be triggered on page load, 
but needs to be done after the user has performed an action such as a button click.

```ts
if (typeof DeviceMotionEvent.requestPermission === 'function') {
  DeviceMotionEvent.requestPermission()
    .then(response => {
      console.log(response == 'granted') // true if granted
    })
    .catch(e => alert(e))
}
```

## Push Notification

Push notification is often seen as a very important part of apps. Unfortenatly iOS does not support this. 
But it's possible on Android, Windows, Mac and Linux.

We have already generated a public and a private key that will be used to securly send notifications. 
If you are interested you can look into the backend for how it's done. 
The client only needs the public key which is saved in the `.env` file.

Websites often trigger the prompt for being able to send push notifications on page load, 
but I think the user has better chance of accepting after using the app a little. 
So we will have a button that allows the user to initiate the prompt flow.

Prompting the user for permission to send push notifications.

```ts
const result = await Notification.requestPermission();
console.log(result === 'granted'); // true if granted
```

Get the subscription if the user already has subscribed. 
We will use this to check if the user already has subscribed and hide the button.

```ts
const sw = await navigator.serviceWorker.ready;
const sub = await sw.pushManager.getSubscription();
```

If the user has granted permission we can first subscribe, then save the subscription in our backend so we know where to send the notification.

```ts
// 1. Service worker is ready
const sw = await navigator.serviceWorker.ready;
// 2. Subscribe
const subscription = await sw.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlB64ToUint8Array(import.meta.env.VITE_PUSH_KEY)
});
// 3. Send subscription with endpoint and keys to backend
fetch(`${import.meta.env.VITE_SERVER_URL}/subscribe`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(subscription),
});
```

The backend will send a push notification once a new player has reached the leaderboard. Our client needs to [listen for the push notification event]((https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)). Which is done in the service worker.

```js
self.addEventListener('push', event => {
  let data = event.data.json();
  self.registration.showNotification(`New ${data.place}. place!`, {
    body: `${data.score.name} got ${data.score.points} points`,
    icon: notificationIcons[data.place],
  });
});
```

You can also look into [Firebase Cloud Messaging](https://firebase.google.com/products/cloud-messaging) to simplify the code on both frontend and backend, but also easier control who should be sent notification to.