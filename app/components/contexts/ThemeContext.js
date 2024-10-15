"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

const commonPalette = {
  primary: {
    main: '#FFE145',
    contrastText: '#3F4255',
  },
  secondary: {
    main: '#F2F4FA',
    contrastText: '#3F4255',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#3F4255',
      secondary: '#9093A6',
      footer: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F2F4FA',
      footer: '#3F4255'
    },
    ...commonPalette
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: '#D9D9D9',
      footer: '#3F4255',
    },
    background: {
      default: '#000000',
      paper: '#252525',
      footer: '#F2F4FA'
    },
    ...commonPalette
  },
});

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProviderClient({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('modeTheme', JSON.stringify(newTheme));
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const savedTheme = localStorage.getItem('modeTheme');
    if (savedTheme !== null) {
      setIsDarkMode(JSON.parse(savedTheme));
    } else {
      setIsDarkMode(true); 
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, darkTheme, lightTheme, handleThemeChange }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
