import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      light: '#ed4b82',
      main: '#e91e63',
      dark: '#a31545',
      contrastText: '#fff',
    },
    secondary: {
      light: '#33eaff',
      main: '#00e5ff',
      dark: '#00a0b2',
      contrastText: '#000',
    },
  },
});

export { theme };