import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// lovable-tagger removed — migrated to Cloudflare Pages

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
      // Production CSP is configured via public/_headers (Cloudflare Pages)
      // This is only used for local preview builds
      ...(mode === 'development' ? {} : {
        'Content-Security-Policy': "default-src 'self'; frame-src 'self' https://open.spotify.com https://*.spotify.com; img-src 'self' data: https://*.spotify.com https://cbarrgs.com; connect-src 'self' https://*.spotify.com https://*.supabase.co; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;"
      })
    }
  },
  plugins: [
    react(),
    // componentTagger removed — was Lovable-specific
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
    },
  },
  optimizeDeps: {
    include: ['nanoid', '@babel/runtime'],
    force: true,
  },
  build: {
    chunkSizeWarningLimit: 500,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('react-dom') || id.includes('react-router-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react';
          }
          if (id.includes('framer-motion')) {
            return 'vendor-motion';
          }
          if (id.includes('@radix-ui')) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
}));
