import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const hasRemoteQuoteApi = Boolean(env.VITE_QUOTE_API_URL?.trim());

  return {
    plugins: [
      {
        name: 'dev-quote-api-fallback',
        configureServer(server) {
          if (hasRemoteQuoteApi) return;
          server.middlewares.use((req, res, next) => {
            const path = req.url?.split('?')[0] ?? '';
            if (path === '/api/quote' && req.method === 'POST') {
              res.statusCode = 503;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(
                JSON.stringify({
                  ok: false,
                  error:
                    'Yerel Vite /api çalıştırmaz. .env içine VITE_QUOTE_API_URL=https://PROJE.vercel.app/api/quote ekleyin veya `npx vercel dev` kullanın.',
                })
              );
              return;
            }
            next();
          });
        },
      },
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
