import {extendTheme} from 'native-base';
import {COLORS} from '../constants';

export const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#ebdefa',
      100: '#d5bdf5',
      200: '#bf9def',
      300: '#a77de9',
      400: '#8c5ee3',
      500: '#6e3ddc',
      600: '#5c34b4',
      700: '#6E3DDC',
      800: '#4b2c8d',
      900: '#3a2368',
    },
    // Redefinig only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
