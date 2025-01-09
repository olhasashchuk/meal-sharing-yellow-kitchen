"use client";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeFonts = createTheme({
  typography: {
    fontFamily: 'var(--font-martel-sans-regular), var(--font-martel-sans-bold), var(--font-poppins-light)',
    h1: {
      fontFamily: 'var(--font-martel-sans-bold)',
    },
    h2: {
      fontFamily: 'var(--font-martel-sans-bold)',
    },
    h5: {
      fontFamily: 'var(--font-poppins-light)',
    },
    body1: {
      fontFamily: 'var(--font-martel-sans-regular)',
    },
    body2: {
      fontFamily: 'var(--font-poppins-light)',
    },
  },
});

export default function ThemeProviderFonts ({ children }) {
  return (
    <ThemeProvider theme={themeFonts}>
      {children}
    </ThemeProvider>
  );
}

