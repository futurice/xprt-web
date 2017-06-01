import createPalette from 'material-ui/styles/palette';
import {
  red,
  blue,
  orange,
  white,
  grey300,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui-old/utils/colorManipulator';

export default {
  // Spacing config of app. Sets the size of various components.
  spacing: {
    // material-ui@next
    unit: 8,

    // Old material-ui
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },

  /*
  Palette of the app. This is used by the material-ui@next.
  */
  palette: createPalette({
    primary: blue,
    accent: orange,
    error: red,
    type: 'light',
  }),

  /*
  Palette of the app. This is used by the old version of material-ui. Colors can be supplied as:
    - material-ui color codes (http://www.material-ui.com/#/customization/colors):
        Colors.green300
    - HTML hex color codes:
        '#123456'
    - RGBA colors:
        'rgba(255, 255, 255, 1) '
  */
  legacyPalette: {
    primary1Color: '#15a369',
    primary1ColorTransparent: 'rgba(21,163,105,0.8)',
    primary2Color: '#eab94e',
    primary3Color: '#333333',
    accent1Color: white,
    accent2Color: white,
    accent3Color: white,
    textColor: '#CCCCCC',
    hintColor: '#777777',
    alternateTextColor: white,
    menuTextColor: '#08412A',
    menuTextColorActive: '#fff',
    canvasColor: '#333333',
    borderColor: grey300,
    disabledColor: '#cccccc',
    pickerHeaderColor: white,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    transparentColor: 'rgba(0,0,0,0)',
  },
};
