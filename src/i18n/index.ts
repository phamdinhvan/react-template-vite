import i18n from 'i18next';
import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      // loadPath: '../locales/{{lng}}/{{ns}}.json',
    },
    lng: 'vn',
    fallbackLng: ['en', 'vn'],
    ns: ['common'],
    debug: false,
    // detection: {
    //   order: [
    //     'cookie',
    //     'navigator',
    //     'localStorage',
    //     'querystring',
    //     'sessionStorage',
    //     'htmlTag',
    //     'path',
    //     'subdomain',
    //   ],
    //   caches: ['cookie'],
    // },
    interpolation: {
      escapeValue: true,
      formatSeparator: ',',
    },
  });

export default i18n;
