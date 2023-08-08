// React elements
import { useState, useMemo } from 'react'

// Routes
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// MUI
import { ColorModeContext } from './helper/Context'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, PaletteMode } from '@mui/material'
import { vmTheme } from './helper/vmTheme'

// Page
import Home from './pages/Home'

// Components
import Header from './components/Header/Header'

// Types
import { ColorModeContextType } from './types'

// Constants
import { DARK, LIGHT } from './constants/common'



const App = (): JSX.Element => {

  const [mode, setMode] = useState<PaletteMode>(DARK);
  const colorMode:ColorModeContextType = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === LIGHT ? DARK : LIGHT))
      }
  }),[])
  
  const theme = vmTheme(mode)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Header />
          <Router>
            <Routes>
              <Route path='/'>
                <Route index element={<Home />} />

                {/* Catch all - replace with 404 component if you want */}
                <Route path='*' element={<Navigate to='/' replace />} />
              </Route>
            </Routes>
          </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
