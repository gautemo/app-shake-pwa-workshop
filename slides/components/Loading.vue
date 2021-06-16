<template>
  <Mobile>
    <div class="container">
      <div class="loader">Loading...</div>
    </div>
  </Mobile>
</template>

<style>
html:not(.dark) {
  /* light mode css here */
  --spinner-color: #000;
  --circle-color: rgba(0, 0, 0, 0.2);
}

html.dark {
  /* dark mode css here */
  --spinner-color: #fff;
  --circle-color: rgba(255, 255, 255, 0.2);
}

.container{
  display: grid;
  place-items: center;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid var(--circle-color);
  border-right: 1.1em solid var(--circle-color);
  border-bottom: 1.1em solid var(--circle-color);
  border-left: 1.1em solid var(--spinner-color);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>