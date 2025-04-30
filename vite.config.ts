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
      // Allow Spotify domains for embedding
      origin: mode === 'development' ? ['https://open.spotify.com', 'http://localhost:4000'] : true,
    },
    headers: {
      // Add security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'same-origin',
      // These headers help mitigate the vulnerability by allowing Spotify embeds
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      // Add Content-Security-Policy to allow Spotify embeds
      'Content-Security-Policy': "default-src 'self'; frame-src 'self' https://open.spotify.com https://*.spotify.com; img-src 'self' data: https://*.spotify.com; connect-src 'self' https://*.spotify.com;"
    }
  },
  plugins: [
    react({
      jsxImportSource: "react"
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['nanoid'],
    force: true,
  },
}));
