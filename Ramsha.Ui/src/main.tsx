import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import { AppLocalizationProvider } from './app/providers/AppLocalizationProvider.tsx'
import { AppQueryProvider } from './app/providers/AppQueryProvider.tsx'
import { AppThemeProvider } from './app/providers/AppThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  /// <StrictMode>
  <AppLocalizationProvider>
    <AppQueryProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AppQueryProvider>
  </AppLocalizationProvider>
  // </StrictMode>


)
