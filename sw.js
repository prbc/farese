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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js");

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
    "revision": "50427cea7b573de5473d4728bc3074b4"
  },
  {
    "url": "css/additional.css",
    "revision": "4658fc6b4e690f3077318a241240858c"
  },
  {
    "url": "css/farese.css",
    "revision": "24a1f4f309b2dc96cd6781b81f6edb50"
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
    "revision": "449420b80ad8c329f48a09a4afd54a7b"
  },
  {
    "url": "list/index.html",
    "revision": "19a0e1c35b4f4fa0c8e95d7dc9cec06a"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "9505ef3abab7fc13a063a10fccf079a5"
  },
  {
    "url": "map/data.json",
    "revision": "9ce9274b84b3b81e83ae1d8263618355"
  },
  {
    "url": "map/email.gif",
    "revision": "75b8d056abace7360b4997068d38e2ae"
  },
  {
    "url": "map/index.html",
    "revision": "e0cc0e03947818d6aee3e2feb0d92c01"
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
