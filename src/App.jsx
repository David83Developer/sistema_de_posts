
import './App.css'
import RoutesApp from './RoutesApp'

import { AuthProvider } from './contexts/AuthUser'

function App() {

  return (
    <>
      <AuthProvider>
      <RoutesApp/>
      </AuthProvider>
    </>
  )
}

export default App
