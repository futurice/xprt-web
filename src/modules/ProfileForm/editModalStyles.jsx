import theme from '../../utils/theme';

export default {
  floatingLabelFocusStyle: {
    color: theme.legacyPalette.primary2Color,
  },
  underlineStyle: {
    color: theme.legacyPalette.primary2Color,
    borderColor: theme.legacyPalette.primary2Color,
  },
  link: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  button: {
    width: '12em',
    border: '1px solid #555555',
    //padding: 15,
    margin: 5,
    borderRadius: 20,
    //lineHeight: '0.4em',
    marginTop: '1em',
    float: 'left',
    color: theme.legacyPalette.textColor,
  },
  noborder: {
    border: 0,
  },
  editProfilePicture: {
    borderRadius: '50%',
    width: '200px',
    height: '200px',
  },
  imgPreview: {
    height: 200,
    margin: 0,
  },
  editPictureWindow: {
    height: '100%',
    textAlign: 'center',
  },


  // Styling for editing Pen on left column
  editPen: {
    float: 'right',
    width: '24px',
    height: '24px',
  },
  editPenLeft: {
    float: 'left',
    marginLeft: '150px',
    marginTop: '-32px',
    width: '24px',
    height: '24px',
  },

  transparentInput: {
    backgroundColor: theme.legacyPalette.transparentColor,
    border: '1px solid #555555',
    marginBottom: 10,
    color: theme.legacyPalette.textColor,
    width: '100%',
    maxWidth: 700,
    padding: '10px 0px 10px 10px',
    borderRadius: 5,
    fontFamily: ('Catamaran' : 'sans-serif'),
    fontSize: '16px',
    fontWeight: '300',
    '@media (max-width: 768px)': {
      maxWidth: 768,
      width: '100%',
      borderRadius: 0,
    },
  },
  mobileHide: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  contactForm: {
    paddingRight: 10,
  },
  mainDivTextTitle: {
    color: theme.legacyPalette.primary1Color,
    fontSize: '16px',
    fontWeight: '300',
  },
  uploadInput: {
    cursor: 'pointer',
    width: '100%',
    display: 'none',
  },
  buttonArea: {
    width: '100%',
    display: 'flex',
    flexFlow: ' nowrap',
    justifyContent: 'space-around',
  },
};
