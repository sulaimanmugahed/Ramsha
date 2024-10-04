import './Styles.css'
import { Toaster } from 'sonner'
import { AppRouteProvider } from '../providers/AppRouteProvider'


function App() {


  return (
    <div>
      
      <AppRouteProvider />
      <Toaster richColors />
      
    </div>

  )
}

export default App
