import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 4001, // Match the port we're using
    strictPort: false, // Allow port to be changed if in use
    hmr: {
      clientPort: 4001 // Match the port we're using
    },
    // Modified for local development
    cors: {
      origin: true, // Allow all origins in development
    },
    headers: mode === 'production' ? {
      // Add security headers for production only
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Content-Security-Policy': "default-src 'self'; frame-src 'self' https://open.spotify.com https://*.spotify.com; img-src 'self' data: https://*.spotify.com; connect-src 'self' https://*.spotify.com;"
    } : {} // No restrictive headers in development
  },
  plugins: [
    react(),
    mode === 'development' && false, // Disable componentTagger in dev
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode)
      }
    },
    include: ['nanoid', '@babel/runtime'],
    force: true,
  },
  build: {
    // Prevent breaking the build on warnings
    chunkSizeWarningLimit: 1600,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: [],
    },
  },
}));
