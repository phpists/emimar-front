import commonEN from './messages/en/common.json';
import commonRU from './messages/ru/common.json';
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        common: commonEN
    },
    ru: {
        common: commonRU
    },
};

const savedLang = localStorage.getItem('lang') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLang,
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
