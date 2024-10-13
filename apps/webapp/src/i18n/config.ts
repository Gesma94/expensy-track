import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common.json';
import componentsEn from './locales/en/components.json';
import hooksEn from './locales/en/hooks.json';
import modulesEn from './locales/en/modules.json';
import commonIt from './locales/it/common.json';
import componentsIt from './locales/it/components.json';
import hooksIt from './locales/it/hooks.json';
import modulesIt from './locales/it/modules.json';

export const defaultNS = 'common';
export const enResourceLanguage = {
  common: commonEn,
  components: componentsEn,
  modules: modulesEn,
  hooks: hooksEn
};

const defaultLocale = 'en';
const resources = {
  [defaultLocale]: enResourceLanguage,
  it: {
    common: commonIt,
    components: componentsIt,
    modules: modulesIt,
    hooks: hooksIt
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    nsSeparator: '.',
    fallbackLng: defaultLocale,
    debug: import.meta.env.DEV,
    ns: ['common', 'components', 'modules', 'hooks'],
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
