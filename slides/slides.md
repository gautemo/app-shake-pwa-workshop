---
theme: default
background: ./assets/bg.svg
class: text-center
highlighter: shiki
info: >
  ## Slides for my PWA Workshop

  All content can be found on
  [GitHub](https://github.com/gautemo/app-shake-pwa-workshop)
title: PWA Workshop
---

# PWA Workshop

<a href="https://twitter.com/GauteMeekOlsen" target="_blank" alt="Twitter"
  class="abs-br m-6 text-xl icon-btn opacity-50 !border-none !hover:text-white">
  <carbon-logo-twitter />
</a>

<style>
  h1 {
    font-size: 70px;
    color: black;
    font-weight: bold;
    transform: translateY(-190px);
    text-shadow: 2px 2px 2px #333;
  }
</style>

---
theme: default
class: flex flex-col text-center justify-center font-bold text-fuchsia-700
---

<p class="text-8xl bg">PWA</p>
<p class="text-6xl">=</p>
<p class="text-6xl">Progressive Web Apps</p>


---

# What you will learn

- What PWA is
- Why PWA is the answer to everything
- Why PWA is NOT the answer to everything
- How to transform a website to a PWA

---

# Website vs Mobile App

## Pro Website
- Discovered on Google
- Less development cost
- Deploy new versions fast

## Pro Mobile App
- Discovered on App Store
- Device capabilities
- Open from home screen
- Offline access
- Users spend more time on apps

---
layout: center
class: text-center
---

# Can PWA close the advantage gap for mobile apps?

---

# What is a PWA

A website that is installable, reliable, and capable.

---

# Installable

Installed apps are used more often.

<div class="flex justify-around">
  <img width="300" src="assets/install_desktop.png" alt="install desktop" style="object-fit: contain;">
  <img width="300" src="assets/install_mobile.png" alt="install mobile" style="object-fit: contain;">
  <img width="200" src="assets/install_custom.png" alt="install custom" style="object-fit: contain;">
</div>

---

# Reliable

Fast and dependable regardless of the network.

<div class="flex justify-around">
  <Offline/>
  <Loading/>
  <OfflineOk/>
</div>

PWA allowes you to cache files and data for performance and offline