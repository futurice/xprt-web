// Disable prop type checking in modules
/* eslint-disable react/prop-types */

import React, { Component } from 'react';

import { FormattedMessage } from 'react-intl';

import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import { AppBar, Divider, Drawer, MenuItem } from 'material-ui-old';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from 'material-ui/List';

import isArray from 'lodash/isArray';

import {
  createAction,
  createReducer,
} from 'redux-act';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';

import routes from '../utils/routes';
import theme from '../utils/theme';

const styles = {
  drawer: {
    backgroundColor:theme.legacyPalette.primary1ColorTransparent,
    color: theme.legacyPalette.menuTextColor,
  },
}

// Action creators
export const closeDrawer = createAction('Close menu drawer');
export const openDrawer = createAction('Open menu drawer');
export const toggleDrawer = createAction('Toggle menu drawer');

// Initial state
const initialState = {
  drawerOpened: false,
};

// Reducer
export const reducer = createReducer({
  [closeDrawer]: state => ({
    ...state,
    drawerOpened: false,
  }),
  [openDrawer]: state => ({
    ...state,
    drawerOpened: true,
  }),
  [toggleDrawer]: state => ({
    ...state,
    drawerOpened: !state.drawerOpened,
  }),
}, initialState);

const mapStateToProps = (state, ownProps) => ({
  drawerOpened: state.drawer.drawerOpened,
  path: ownProps.location.pathname,
  user: state.auth.data.decoded,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeView(view) {
    dispatch(closeDrawer());
    dispatch(push(view.toLowerCase()));
  },
  close() {
    console.log('close() called');
    dispatch(closeDrawer());
  },
});

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class NavigationDrawer extends Component {
  static defaultProps = {
    user: null,
  };

  render() {
    const { close, changeView, drawerOpened, path, user } = this.props;

    return (
      <Drawer
        open={this.props.drawerOpened}
        docked={false}
        containerStyle={styles.drawer}
        onRequestChange={() => this.props.close()} >

        {
          routes.map((route, index) => {
            let active = (this.props.pathname === route.path);
            if (route.path === routes[0].path && this.props.pathname === '/') {
              active = true;
            }

            if (isArray(route.hideWhenScope) && route.hideWhenScope.includes(this.props.scope)) {
              return null;
            }

            return(
              <div key={index}>
                {route.separator ? <Divider /> : null}
                <MenuItem
                  style={{
                    color: active ? theme.palette.menuTextColorActive : null,
                    paddingLeft: '50px',
                  }}
                  onTouchTap={() => {this.props.changeView(route.path)}}>

                  <FormattedMessage id={route.name} />
                </MenuItem>
              </div>
            );
          })
        }
      </Drawer>
    );
  }
}
