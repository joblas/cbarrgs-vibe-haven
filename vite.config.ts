
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
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin',
      // Add Content-Security-Policy to restrict scripts
      'Content-Security-Policy': "default-src 'self'; frame-src 'self' https://open.spotify.com https://*.spotify.com; img-src 'self' data: https://*.spotify.com; connect-src 'self' https://*.spotify.com;"
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
}));
