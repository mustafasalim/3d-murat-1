import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const web3FormsKey =
    env.VITE_WEB3FORMS_ACCESS_KEY ||
    env.WEB3FORMS_ACCESS_KEY ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY ||
    process.env.WEB3FORMS_ACCESS_KEY ||
    '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // import.meta.env ile çakışabildiği için ayrı sabit (Vercel process.env buraya yazılır)
      __WEB3FORMS_ACCESS_KEY__: JSON.stringify(web3FormsKey),
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
