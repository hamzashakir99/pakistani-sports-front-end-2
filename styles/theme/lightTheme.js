import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
        main: '#008066'
    },
    secondary: {
        main: '#4DFFD8'
    },
    error: {
        main: '#00FFCC'
    },
    dark: {
        main: '#498277'
    },
    light: {
        main: '#01CCA3'
    },
  },
});

export default lightTheme;