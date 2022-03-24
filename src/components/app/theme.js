import { colors, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'light',
    // primary: colors.teal,
    // secondary: colors.amber,
    primary: colors.indigo,
    secondary: colors.pink,
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
});

export default theme;
