import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel'; // ← Cambiado (quita el /serverless)

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercel(), // ← Igual, solo cambió el import
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
