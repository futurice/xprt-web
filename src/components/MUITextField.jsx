import React from 'react';
import PropTypes from 'prop-types';
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
  hintStyle: {
    color: theme.legacyPalette.hintColor,
  },
};

class MUITextField extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  };

  static defaultProps = {
    label: '',
  };

  render() {
    const { ...rest } = this.props;

    return (<TextField
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      underlineFocusStyle={styles.underlineStyle}
      hintStyle={styles.hintStyle}
      fullWidth
      {...rest}
    />
    );
  }
}
export default MUITextField;
