# Exercise 3 - Promoting PWA installation
There exists multiple [patterns](https://web.dev/promote-install/) for promoting PWA installation.

We are choosing to use a simple install button. The behaviour for installing is different in Android and iOS, this is taken into account when implementing the button.

## Android

[web.dev](https://web.dev/customize-install/).  
1. Listen for the `beforeinstallprompt` event.
2. Save the `beforeinstallprompt` event, so it can be used to trigger the install flow later.
3. Provide a button to start the in-app installation flow.

## iOS

iOS does not support automatic install of PWA and needs to show information to the user about how to install it.

1. Check if user is on iOS and is not already in PWA
2. Provide a button that shows a Alert toast message.