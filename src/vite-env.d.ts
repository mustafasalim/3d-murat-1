/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Yerelde `npm run dev` iken canlı API’ye yönlendirmek için (ör. https://xxx.vercel.app/api/quote) */
  readonly VITE_QUOTE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
