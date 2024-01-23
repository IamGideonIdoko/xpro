import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': '/src/'
    }
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3005,
    strictPort: true,
    open: true,
  },
});
