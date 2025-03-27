
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
      // Restrict CORS to only allow requests from the same origin in development
      origin: mode === 'development' ? 'same-origin' : true,
    },
    headers: {
      // Add security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'same-origin',
      // These headers help mitigate the vulnerability by preventing cross-origin requests
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin'
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
    include: ['nanoid', '@babel/runtime'],
    force: true,
  },
}));
