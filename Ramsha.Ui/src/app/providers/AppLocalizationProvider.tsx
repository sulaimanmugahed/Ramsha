import { I18nextProvider } from 'react-i18next';
import ar from '../resources/ar.json';
import en from '../resources/en.json';

import i18n from 'i18next';

type AppLocalizationProviderProps = {
    children: React.ReactNode
}

export const AppLocalizationProvider = ({ children }: AppLocalizationProviderProps) => {


    i18n.init({
        interpolation: { escapeValue: false },
        lng: localStorage.getItem('currentLanguage') || 'en',
        resources: {
            en: {
                translation: en
            },
            ar: {
                translation: ar
            }
        }
    });

    return (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    )
}

