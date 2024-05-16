import React, { ReactNode, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Languages, languages, defaultLanguage } from "app/i18n";

type LanguageProviderProps = {
  children: ReactNode;
};

type LanguageProviderInterface = {
  handleChangeLanguage: (language: Languages) => void;
  languages: Languages[];
  defaultLanguage: keyof typeof Languages;
};

const defaultValue: LanguageProviderInterface = {
  handleChangeLanguage: (language: Languages) => {
    return language;
  },
  languages,
  defaultLanguage,
};

const LanguagesContext = createContext(defaultValue);
const useLanguagesContext = () =>
  useContext<LanguageProviderInterface>(LanguagesContext);

const LanguagesProvider = ({ children }: LanguageProviderProps) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
  };

  return (
    <LanguagesContext.Provider
      value={{ handleChangeLanguage, languages, defaultLanguage }}
    >
      {children}
    </LanguagesContext.Provider>
  );
};

export { LanguagesProvider, useLanguagesContext };
