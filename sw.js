/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "about/index.html",
    "revision": "f6aa05de5a9215d5b3520fb1983ebb30"
  },
  {
    "url": "css/additional.css",
    "revision": "70643d52dd63ec116cedc139a1963af5"
  },
  {
    "url": "css/farese.css",
    "revision": "deb500a1530b0a681b3feceacb4cf3b7"
  },
  {
    "url": "img/icons/192.png",
    "revision": "62172437e91be884d38af0eca0c0e68e"
  },
  {
    "url": "img/icons/512.png",
    "revision": "80761a044ee59b563a9d145df57a85b9"
  },
  {
    "url": "img/icons/apple-touch-icon.png",
    "revision": "2cefcb464680b161f596b6d225a2e7cb"
  },
  {
    "url": "img/icons/favicon-16x16.png",
    "revision": "300a5980a795010e0d2e2b7fb33be329"
  },
  {
    "url": "img/icons/favicon-32x32.png",
    "revision": "214c3992e6c8bbca73891fb6cfa96dde"
  },
  {
    "url": "img/icons/mstile-150x150.png",
    "revision": "b85c9092cdb103d0aa4b3d18acceccd7"
  },
  {
    "url": "img/JohnnyFarese.png",
    "revision": "99cbb2ece5ec6eb3507cdf5e79b24a44"
  },
  {
    "url": "img/map-preview-old.png",
    "revision": "a52d2c60ccf5e5c7f331e41075ea483b"
  },
  {
    "url": "img/map-preview.png",
    "revision": "46c3521a8b26e063a39fa8db774918a7"
  },
  {
    "url": "img/marker.png",
    "revision": "3f6dd5b6d87e05f05824b907ab3013ed"
  },
  {
    "url": "index.html",
    "revision": "d9e606819a3c66a021f6e52e8bfd1c26"
  },
  {
    "url": "list/index.html",
    "revision": "949548f94df057bb895913f6f56552fe"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "9505ef3abab7fc13a063a10fccf079a5"
  },
  {
    "url": "map/data.json",
    "revision": "ec7d3809a322b8a6e7c3c5272eebae69"
  },
  {
    "url": "map/email.gif",
    "revision": "75b8d056abace7360b4997068d38e2ae"
  },
  {
    "url": "map/index.html",
    "revision": "003e066961ddc53a0f980d2e76f4f8c2"
  },
  {
    "url": "map/map.js",
    "revision": "afed8b479d5ef24b9fe0174a6d0b100e"
  },
  {
    "url": "workbox-config.js",
    "revision": "586a03306a94ec46f5307127aa7aa1f9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/.*(?:api\.tiles|api|a\.tiles)\.mapbox\.com/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/.*farese\.com\/legacy/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:\/\/fonts\.googleapis\.com/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute("https://cdn.google.com/example-script.min.js", new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js", new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js", new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", new workbox.strategies.CacheFirst(), 'GET');
