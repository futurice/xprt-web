import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui-old/FlatButton';
import MUITextField from '../../components/MUITextField';
import theme from '../../utils/theme';

import { required, email } from '../../utils/validate';

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);

const styles = {
  buttonStyle: {
    border: '1px solid #555555',
    margin: 5,
    // padding: '15px',
    borderRadius: '20px',
    // lineHeight: '0.4em',
    marginTop: '1em',
    marginBottom: '2em',
  },
  loginButtonStyle: {
    border: '1px solid #555555',
    margin: 5,
    // padding: '15px',
    borderRadius: '20px',
    //lineHeight: '0.4em',
  },
  buttonGold: {
    color: theme.legacyPalette.primary2Color,
  },
};

@reduxForm({
  form: 'loginForm',
  destroyOnUnmount: false,
})
export default class LoginFields extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Field name="email" validate={[required, email]} component={renderTextField} label="Email" type="text" />
            <Field name="password" validate={required} component={renderTextField} label="Password" type="password" />
          </div>

          <div>
            <FlatButton
              type="button"
              label="Cancel"
              style={styles.buttonStyle}
              onTouchTap={this.props.handleClose}
            />
            <FlatButton
              type="submit"
              label="Login"
              style={styles.loginButtonStyle}
              primary
              onTouchTap={this.handleSubmit}
            />
          </div>
        </div>
      </form>
    );
  }
}
