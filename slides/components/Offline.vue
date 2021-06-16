<template>
  <Mobile>
    <iframe id="dino" title="offline" src="https://offline-dino-game.firebaseapp.com/"></iframe>
    <div class="small">
      <h2>No internet</h2>
      Try: 
      <ul>
        <li>Turning off ariplane mode</li>
        <li>Turning on mobile data or Wi-Fi</li>
        <li>Checking the signal in your area</li>
      </ul>
      ERR_INTERNET_DISCONNECTED
    </div>
  </Mobile>
</template>

<style scoped>
#dino{
  width: 100%;
  /* transform: scale(0.5) translate(-50%, -50%); */
}

.small{
  font-size: 10px;
  padding: 0 8px;
}

.small h2{
  font-size: 12px;
}
</style>