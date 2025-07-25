
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { type Language, type AllTranslations } from '../types';
import { translations } from '../constants/translations';

type LocalizationContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');

    const t = useCallback((key: string): string => {
        const langTranslations = translations[language] as AllTranslations[Language];
        return (langTranslations[key] as string) || key;
    }, [language]);

    return (
        <LocalizationContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (context === undefined) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};
