// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import koTranslations from './locales/ko/translation.json';

// i18n 초기화
i18n
  .use(initReactI18next) // 연결
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ko: {
        translation: koTranslations
      }
    },
    lng: 'en', // 기본 언어
    fallbackLng: 'en', // 기본 언어로 사용할 언어
    interpolation: {
      escapeValue: false // React는 기본적으로 XSS 공격에 안전하므로 이 옵션을 false로 설정합니다.
    }
  });

export default i18n;