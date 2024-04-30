import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '35.171.16.37',
    port: 3000
  },
  optimizeDeps: {
    include: [
      '@reduxjs/toolkit',
      // other dependencies...
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@emotion/react',
        '@emotion/react/jsx-runtime',
        /^@emotion\/react\/*./, // Add a regex to handle submodules
      ],
    },
  }
});



