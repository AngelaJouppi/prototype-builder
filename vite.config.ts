import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Needed for Replit preview
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Helpful for debugging production issues
    rollupOptions: {
      output: {
        manualChunks: {
          // Code splitting strategy
          'vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      // Optional: Add path aliases for cleaner imports
      // '@': '/src',
      // '@components': '/components',
    },
  },
});
