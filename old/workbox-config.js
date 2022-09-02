module.exports = {
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  globDirectory: ".",
  globPatterns: [
    "**/*.{html,css,png,htm,gif,jpg,json,js,webmanifest}"
  ],
  globIgnores: ['legacy/**'],
  swDest: "sw.js",
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /.*(?:api\.tiles|api|a\.tiles)\.mapbox\.com/,
      handler: 'StaleWhileRevalidate'
    },
    {
      urlPattern: /.*farese\.com\/legacy/,
      handler: 'StaleWhileRevalidate'
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /^https:\/\/code\.jquery\.com/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /^https:\/\/stackpath\.bootstrapcdn\.com/,
      handler: 'CacheFirst'
    }
  ]
};