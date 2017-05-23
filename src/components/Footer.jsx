import React, { Component } from 'react';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import XprtLogoSmall from './XprtLogoSmall';
import Radium from 'radium';

import theme from '../utils/theme';

const styles = {
  footerWrapper: {
    height: '100px',
    background: '#cccccc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  footerLeft: {
    marginLeft: '5%',
    flex: 1,
    '@media (max-width: 769px)': {
      margin: 0,
    },
  },
  footerRight: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
    marginRight: '5%',
    fontSize: '16px',
    color: theme.palette.primary3Color,
    '@media (max-width: 769px)': {
      textAlign: 'center',
      margin: 0,
    },
  },
  footerText: {
    fontSize: '16px',
    color: theme.palette.primary3Color,
  },
};

@Radium
export default class Footer extends Component {
  render() {
    return (
      <div style={styles.footerWrapper}>
        <div style={styles.footerLeft}>
          <XprtLogoSmall />
        </div>
        <div style={styles.footerRight}>
          <TermsModal />
          <PrivacyModal />
        </div>
      </div>
    );
  }
}
