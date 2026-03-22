/** Vite `define` ile build zamanında enjekte edilir (vite.config.ts). */
declare const __WEB3FORMS_ACCESS_KEY__: string;

export function getWeb3FormsAccessKey(): string {
  return typeof __WEB3FORMS_ACCESS_KEY__ !== 'undefined' ? __WEB3FORMS_ACCESS_KEY__ : '';
}
