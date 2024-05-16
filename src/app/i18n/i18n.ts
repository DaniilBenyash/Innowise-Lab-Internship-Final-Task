import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import { initReactI18next } from "react-i18next";

export enum Languages {
  en = "en",
  ru = "ru",
}

export const defaultLanguage = Languages.ru;
export const languages = Object.values(Languages);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: languages,
    lng: defaultLanguage,
    debug: true,
    resources: {
      ru: ru,
      en: en,
    },
  });

export default i18n;
