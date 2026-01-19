import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/**/*', 'manifest.webmanifest'],
      manifest: {
        name: "Farese's Reformed Baptist Directory",
        short_name: 'Farese',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0067b2',
        background_color: '#0067b2',
        description: 'A directory of Reformed Baptist churches',
        icons: [
          { src: 'img/icons/192.png', sizes: '192x192', type: 'image/png' },
          { src: 'img/icons/512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,png,jpg,jpeg,svg,gif,json}'],
        globIgnores: ['legacy/**'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.maplibre\.org/,
            handler: 'StaleWhileRevalidate' as const,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
