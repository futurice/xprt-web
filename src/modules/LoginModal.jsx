import React from 'react';
import Dialog from 'material-ui-old/Dialog';
import FlatButton from 'material-ui-old/FlatButton';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
  createAction,
  createReducer,
} from 'redux-act';

import rest from '../utils/rest';

import LoginFields from './LoginForm/LoginFields';
import theme from '../utils/theme';

const styles = {
  dialog: {
    width: '100%',
    maxWidth: '350px',
    textAlign: 'center',
  },
};

// Action creators
export const openLoginModal = createAction('Open login modal');
export const closeLoginModal = createAction('Close login modal');

// Initial state
const initialState = {
  open: false,
};

// Reducer
export const reducer = createReducer({
  [openLoginModal]: state => ({
    ...state,
    open: true,
  }),
  [closeLoginModal]: state => ({
    ...state,
    open: false,
  }),
}, initialState);

const mapStateToProps = state => ({
  auth: state.auth,
  open: state.loginModal.open,
});

const mapDispatchToProps = dispatch => ({
  doLogin: (creds, callback) => dispatch(rest.actions.auth({}, {
    body: JSON.stringify(creds),
  }, callback)),
  doCloseLoginModal: () => dispatch(closeLoginModal()),
  changeView: view => dispatch(push(view.toLowerCase())),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginModal extends React.Component {
  render() {
    const errMsg = this.props.auth.error && this.props.auth.error.message;
    const { open, doCloseLoginModal, doLogin, changeView } = this.props;

    return (
      <div>
        <Dialog
          title="LOGIN"
          titleStyle={{ color: theme.legacyPalette.primary2Color, fontSize: 17 }}
          modal={false}
          open={open}
          contentStyle={styles.dialog}
          onRequestClose={doCloseLoginModal}
        >
          <LoginFields
            onSubmit={(creds) => {
              doCloseLoginModal();
              doLogin(creds, (err) => {
                if (!err) {
                  // WTF: this doesn't work here?
                  /*
                  changeView('/about');
                  */
                }
              });
            }}
            handleClose={doCloseLoginModal}
          />
          {errMsg}
          <FlatButton
            labelStyle={{ fontSize: 13, color: theme.legacyPalette.primary2Color }}
            label="Forgotten password?"
            hoverColor="#444444"
            onTouchTap={() => {
              doCloseLoginModal();
              changeView('/contact');
            }}
            style={{ width: '100%' }}
          />
        </Dialog>
      </div>
    );
  }
}
