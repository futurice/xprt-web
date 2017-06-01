import React from 'react';
import Radium from 'radium';
import IconButton from 'material-ui-old/IconButton';
import { connect } from 'react-redux';

import FacebookIcon from '../components/FacebookIcon';
import TwitterIcon from '../components/TwitterIcon';
import Footer from '../components/Footer';
import ContactForm from './ContactForm';

import rest from '../utils/rest';

import theme from '../utils/theme';

const styles = {

  wrapper: {
    color: theme.legacyPalette.textColor,
  },
  teacherExpertWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '20px',
    '@media (max-width: 768px)': {
      flexDirection: 'column-reverse',
    },
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  landingWrapper: {
    minHeight: '80vh',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginTop: '20vh',
    '@media (max-width: 768px)': {
      marginTop: 10,
    },
  },
  smallHeader: {
    color: theme.legacyPalette.primary1Color,
    letterSpacing: '4px',
  },
  bigHeader: {
    color: theme.legacyPalette.primary1Color,
    fontWeight: 300,
    '@media (max-width: 768px)': {
      fontSize: 24,
    },
  },
  empty: {
    flex: 3,
    flexBasis: '200px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  bigText: {
    flex: 4,
    fontSize: '18px',
    fontWeight: '300',
    flexBasis: '200px',
    marginLeft: '3em',
    paddingLeft: '3em',
    '@media (max-width: 768px)': {
      margin: 0,
      padding: 0,
      textAlign: 'center',
    },
  },
  leftSpace: {
    flex: 3,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  rightSpace: {
    flex: 3,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  leftText: {
    fontSize: '18px',
    fontWeight: '300',
    textAlign: 'right',
    flex: 3,
    flexBasis: '200px',
    '@media (max-width: 768px)': {
      textAlign: 'center',
      paddingTop: 30,
      fontSize: '16px',
    },
  },
  rightText: {
    fontSize: '18px',
    fontWeight: '300',
    borderLeft: '1px solid #333333',
    textAlign: 'left',
    flex: 4,
    marginLeft: '3em',
    paddingLeft: '3em',
    flexBasis: '200px',
    '@media (max-width: 768px)': {
      textAlign: 'center',
      margin: 0,
      padding: 0,
      borderLeft: 0,
      borderBottom: '1px solid rgba(204, 204, 204, .34)',
      paddingBottom: 60,
      fontSize: '16px',
    },
  },
  buttonStyle: {
    border: '1px solid #555555',
    padding: '15px',
    borderRadius: '20px',
    lineHeight: '0.4em',
    marginTop: '1em',
    marginBottom: '1em',
    color: theme.legacyPalette.primary2Color,
  },
  transparentInput: {
    backgroundColor: theme.legacyPalette.transparentColor,
    border: '1px solid #555555',
    marginBottom: 10,
    color: theme.legacyPalette.textColor,
    width: '100%',
    maxWidth: 350,
    padding: '10px 0px 10px 10px',
    borderRadius: 5,
    fontFamily: ('Catamaran' : 'sans-serif'),
    fontSize: 16,
    '@media (max-width: 768px)': {
      maxWidth: 768,
      width: '100%',
      borderRadius: 0,
    },
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    fontFamily: ('Catamaran' : 'sans-serif'),
    fontSize: 12,
    margin: 0,
  },
  mobileHide: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  contactForm: {
    paddingRight: 10,
  },
};

const mapDispatchToProps = dispatch => ({
  submitFeedback: (fields, cb) => {
    dispatch(rest.actions.feedback.post({}, {
      body: JSON.stringify({
        ...fields,
        creatorType: 'expert',
      }),
    }, cb));
  },
});

@connect(undefined, mapDispatchToProps)
@Radium
class Contact extends React.Component {
  state = {
    feedbackSent: false,
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.landingWrapper}>
          <div style={styles.headerWrapper}>
            <div style={styles.leftSpace} />
            <div style={styles.empty} />
            <div style={styles.bigText}>
              <h1 style={styles.bigHeader}>Contact us</h1>
            </div>
            <div style={styles.rightSpace} />
          </div>

          <div style={styles.teacherExpertWrapper}>
            <div style={styles.leftSpace} />
            <div style={styles.leftText}>
              <p style={styles.smallHeader}>XPRT</p>
              <p>c/o HundrED <br />
              Merikatu 9 <br />
            00140 Helsinki
          </p>
              <p>info@xprt.fi</p>
              <IconButton onTouchTap={() => (window.location = 'https://www.facebook.com/HundrEDorg/')}>
                <FacebookIcon />
              </IconButton>
              <IconButton onTouchTap={() => (window.location = 'https://www.twitter.com/HundrEDorg/')}>
                <TwitterIcon />
              </IconButton>
            </div>
            { !this.state.feedbackSent ? (
              <div style={styles.rightText}>
                <p>
                  Xprt connects teachers and experts for the benefit of Finnish school children.
                  Arranging a visiting lecture from a professional expert has become easier.
                </p>

                <p>
                  Contact us to hear more.

                  <span style={{ ...styles.requiredText, ...styles.mobileHide }}>
                    * marks a required field
                  </span>
                </p>

                <ContactForm onSubmit={(fields) => {
                  this.props.submitFeedback(fields, (err) => {
                    if (!err) {
                      this.setState({ feedbackSent: true });
                    }
                  });
                }}
                />

              </div>
        ) : (
          <div style={styles.rightText}>
            Thank you for sending feedback to HundrED!
          </div>
        )}
            <div style={styles.rightSpace} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Contact;
