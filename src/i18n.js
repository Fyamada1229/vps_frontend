import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Hello: "Hello",
      "Hello world": "Hello world",
    },
  },
  jp: {
    translation: {
      Hello: "こんにちは",
      "Hello world": "こんにちは、世界",
    },
  },
  th: {
    translation: {
      Hello: "สวัสดี",
      "Hello world": "こんにちは、世界",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
