import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      light: '#ff669a',
      main: '#ff4081',
      dark: '#b22c5a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#9670ff',
      main: '#7c4dff',
      dark: '#5635b2',
      contrastText: '#fff',
    },
  },
});

export { theme };
