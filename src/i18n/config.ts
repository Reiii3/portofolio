'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/common.json'
import id from './locales/id/common.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      id: { common: id },
    },
    lng: 'id', // fixed, sama persis kayak yang di-render server
    fallbackLng: 'id',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

export default i18n