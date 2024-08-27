import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#1976d2' : '#008cff',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? '#333333' : '#ffffff',
      secondary: mode === 'light' ? '#666666' : '#b0b0b0',
    },
    success: {
      main: mode === 'light' ? '#4caf50' : '#81c784',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? '#666666' : '#b0b0b0',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: mode === 'dark' ? '#008cff' : undefined,
          },
        },
      },
    },
  },
});

export const getAppTheme = (mode: 'light' | 'dark') => createTheme(getTheme(mode));