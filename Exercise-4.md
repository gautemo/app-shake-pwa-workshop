# Exercise 4 - Capable

In this exercise we will utilize that PWA/web can use a variety of advanced capabilities, 
such as device sensors and push notifications. 

Check out [What Web Can Do Today](https://whatwebcando.today/) for a list of features the web can use today.

## Accelerometer

Go to `useAccelerometer.ts` and implement an event listener for `devicemotion` 
and call `setIfMax` with the summing up the absolute values of `x`, `y` and `z`.

General > Safari > Privacy & Security > Motion & Orientation Access

```ts
if (typeof DeviceMotionEvent.requestPermission === 'function') {
  DeviceMotionEvent.requestPermission()
    .then(response => {
      console.log(response)
      if (response == 'granted') {

      }
    })
    .catch(e => alert(e))
}
```

## Push Notification