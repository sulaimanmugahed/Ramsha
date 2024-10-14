import './Styles.css'
import { Toaster } from 'sonner'
import { AppRouteProvider } from '../providers/AppRouteProvider'
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';


function App() {

  const { i18n } = useTranslation()
  useLayoutEffect(() => {

    document.dir = i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.resolvedLanguage]);


  return (
    <div>

      <AppRouteProvider />
      <Toaster richColors />

    </div>

  )
}

export default App
