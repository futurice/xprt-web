import React from 'react';
import Dialog from 'material-ui-old/Dialog';
import FlatButton from 'material-ui-old/FlatButton';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import MUITextField from '../components/MUITextField';
import theme from '../utils/theme';
import rest from '../utils/rest';

const styles = {
  buttonStyle: {
    border: '1px solid #555555',
    margin: 5,
    padding: '15px',
    borderRadius: '20px',
    lineHeight: '0.4em',
    marginTop: '1em',
    marginBottom: '2em',
  },
  LoginButtonStyle: {
    border: '1px solid #555555',
    margin: 5,
    padding: '15px',
    borderRadius: '20px',
    lineHeight: '0.4em',
  },
  buttonGold: {
    color: theme.legacyPalette.primary2Color,
  },
  dialog: {
    width: '100%',
    maxWidth: '350px',
    textAlign: 'center',
  },
};

class LoginModal extends React.Component {

  state = {
    open: false,
    email: '',
    password: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      email: '',
      password: '',
    });
    this.props.clearLogin();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.doLogin({ email: this.state.email, password: this.state.password }, (err) => {
      if (!err) {
        this.props.changeView('/profile');
      }
    });
  };

  handleForgottenPassword = (event) => {
    event.preventDefault();
    this.props.changeView('/contact');
  }

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    const errMsg = this.props.auth.error && this.props.auth.error.message;

    return (

      <div>
        <FlatButton label="LOGIN" style={{ ...styles.buttonStyle, ...styles.buttonGold }} onTouchTap={this.handleOpen} />
        <Dialog
          title="LOGIN"
          titleStyle={{ color: theme.legacyPalette.primary2Color, fontSize: 17 }}
          modal={false}
          open={this.state.open}
          contentStyle={styles.dialog}
          onRequestClose={this.handleClose}
        >
          <form
            onSubmit={this.handleSubmit}
          >
            <MUITextField
              label="Email"
              value={this.state.email}
              onChange={(event) => {
                this.handleChange(event, 'email');
              }}
            />
            <MUITextField
              label="Password"
              type="password"
              value={this.state.password}
              onChange={(event) => {
                this.handleChange(event, 'password');
              }}
            />
            <FlatButton
              labelStyle={{ fontSize: 13, color: theme.legacyPalette.primary2Color }}
              label="Forgotten password?"
              hoverColor="#444444"
              onTouchTap={this.handleForgottenPassword}
              style={{ width: '100%' }}
            />
            {errMsg}
            <FlatButton
              type="button"
              label="Cancel"
              style={styles.buttonStyle}
              onTouchTap={this.handleClose}
            />
            <FlatButton
              type="submit"
              label="Login"
              style={styles.LoginButtonStyle}
              primary
              onTouchTap={this.handleSubmit}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    changeView(view) {
      dispatch(push(view.toLowerCase()));
    },
    clearLogin() {
      dispatch(rest.actions.auth.reset());
    },
  }),
)(LoginModal);
