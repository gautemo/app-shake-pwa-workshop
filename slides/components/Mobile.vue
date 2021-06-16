<template>
  <div class="mobile-cover">
    <slot></slot>
  </div>
</template>

<style>
html:not(.dark) {
  /* light mode css here */
  --border-color: #000;
}

html.dark {
  /* dark mode css here */
  --border-color: #fff;
}

.mobile-cover{
  height: 350px;
  width: 170px;
  border-radius: 25px;
  border: 5px solid var(--border-color);
  border-top: 20px solid var(--border-color);
  border-bottom: 20px solid var(--border-color);
}
</style>