module.exports = {
  skipWaiting: true,
  clientsClaim: true,
  globDirectory: ".",
  globPatterns: [
    "**/*.{html,css,png,htm,gif,jpg,json,js,webmanifest}"
  ],
  globIgnores: ['legacy/**'],
  swDest: "sw.js",
  runtimeCaching: [
    {
      urlPattern: /.*(?:api\.tiles|api|a\.tiles)\.mapbox\.com/,
      handler: 'cacheFirst'
    },
    {
      urlPattern: /.*farese\.com\/legacy/,
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      urlPattern: 'https://cdn.google.com/example-script.min.js',
      urlPattern: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
      urlPattern: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
      urlPattern: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
      handler: 'staleWhileRevalidate'
    }
  ]
};
