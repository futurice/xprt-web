import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import { AppBar, Drawer } from 'material-ui-old';

import { toggleDrawer } from './NavigationDrawer';
import theme from '../utils/theme';

const styles = {
  drawer: {
    backgroundColor: theme.legacyPalette.primary1Color,
    color: theme.legacyPalette.textColor,
    zIndex: '1501',
    boxShadow: 'none',
  },
  appBar: {
    boxShadow: 'none',
  },
  leftNav: {
    '@media (max-width:900px)': {
      display: 'none',
    },
  },
  topNav: {
    '@media (min-width: 901px)': {
      display: 'none',
    },
  },
};

const mapDispatchToProps = dispatch => ({
  toggle() {
    dispatch(toggleDrawer());
  },
});

@connect(undefined, mapDispatchToProps)
@Radium
export default class NavigationDrawerSmall extends React.Component {
  render() {
    const { toggle } = this.props;

    return (
      <div>
        <div style={styles.leftNav}>
          <Drawer
            open
            docked
            width={60}
            containerStyle={styles.drawer}
            onRequestChange={() => toggle()}
          >
            <AppBar
              style={styles.appBar}
              onLeftIconButtonTouchTap={() => toggle()}
            />
          </Drawer>
        </div>
        <div style={styles.topNav}>
          <AppBar
            style={styles.appBar}
            onLeftIconButtonTouchTap={() => toggle()}
          />
        </div>
      </div>
    );
  }
}
