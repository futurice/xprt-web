import React, { Component } from 'react';
import TextField from 'material-ui-old/TextField';

import theme from '../utils/theme';

const styles = {
  floatingLabelFocusStyle: {
    color: theme.legacyPalette.primary2Color,
  },
  underlineStyle: {
    color: theme.legacyPalette.primary2Color,
    borderColor: theme.legacyPalette.primary2Color,
  },
  errorStyle: {
    position: 'absolute',
    right: 0,
  },
};

class MUITextField extends Component {

  render() {
    const { label, id, type, ...rest } = this.props;

    return (<TextField
      floatingLabelText={label}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      errorStyle={styles.errorStyle}
      type={type}
      id={id}
      fullWidth
      {...rest}
    />
    );
  }
}
export default MUITextField;
