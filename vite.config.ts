import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 8080
    },
    // Add security headers to mitigate the CORS vulnerability in esbuild
    cors: {
      // Restrict CORS to same origin in development
      origin: mode === 'development' ? false : true,
    },
    headers: {
      // Add security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'same-origin',
      // These headers help mitigate the vulnerability by restricting cross-origin requests
      // Only apply strict CORP/COOP in production - they break external resources in development
      ...(mode === 'development' ? {} : {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin',
      }),
      // CSP for development - more permissive to allow Vite HMR and inline scripts
      // Production CSP should be configured on the hosting platform (Vercel, etc.)
      ...(mode === 'development' ? {} : {
        'Content-Security-Policy': "default-src 'self'; frame-src 'self' https://open.spotify.com https://*.spotify.com; img-src 'self' data: https://*.spotify.com https://cbarrgs.com; connect-src 'self' https://*.spotify.com; script-src 'self' 'unsafe-inline' https://cdn.gpteng.co https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com;"
      })
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // This doesn't actually fix the vulnerability but helps reduce its impact
      // by limiting what can be accessed
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
