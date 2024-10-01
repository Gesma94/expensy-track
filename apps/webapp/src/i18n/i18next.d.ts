import type { defaultNS, enResourceLanguage } from './config';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof enResourceLanguage;
  }
}
