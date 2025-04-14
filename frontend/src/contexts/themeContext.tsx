import React, { createContext, useContext, useState } from 'react'
import CommonUtil from '../utils/CommonUtil'

type Theme = 'light' | 'dracula'

interface ThemeContext {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext|undefined>(undefined)

export const ThemeProvider = ({ children }:{ children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(CommonUtil.getLocalStorage('theme') || 'light')

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dracula' : 'light'
      CommonUtil.setLocalStorage('theme', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme 
      }}
    >
      <div data-theme={theme}>
        { children }
      </div>
    </ThemeContext.Provider>)
}

export function useThemeContext() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }

  return context
}
