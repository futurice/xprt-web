import React from 'react';
import TermsModal from './TermsModal';
import PrivacyModal from './PrivacyModal';
import XprtLogoSmall from './XprtLogoSmall';

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
  },
  footerRight: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
    marginRight: '5%',
    fontSize: '16px',
    color: theme.legacyPalette.primary3Color,
  },
  footerText: {
    fontSize: '16px',
    color: theme.legacyPalette.primary3Color,
  },
};

export default class Footer extends React.Component {
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
