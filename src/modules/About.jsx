import React from 'react';
import Radium from 'radium';

import FlatButton from 'material-ui-old/FlatButton';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import rest from '../utils/rest';

import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Footer from '../components/Footer';

import theme from '../utils/theme';

const styles = {
  wrapper: {
    color: theme.legacyPalette.textColor,
  },
  teacherExpertWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column-reverse',
    },
  },
  teacherExpertWrapperBottom: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: '25px',
    '@media (max-width: 768px)': {
      flexDirection: 'column-reverse',
    },
  },
  secondWrapper: {
    height: '75vmin',
    display: 'flex',
    flexDirection: 'column',
  },
  secondInnerWrapper: {
    background: '#cccccc',
    height: '70vmin',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      display: 'none',
    },
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
  smallHeaderUnder: {
    color: theme.legacyPalette.primary1Color,
    letterSpacing: '4px',
    marginTop: '10%',
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
      fontSize: '16px',
    },
  },
  rightText: {
    fontSize: '18px',
    fontWeight: '300',
    borderLeft: '1px solid rgba(204, 204, 204, .34)',
    borderBottom: 0,
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
      display: 'flex',
      flexDirection: 'column-reverse',
      flexBasis: '0px',
      fontSize: '16px',
    },
  },
  buttonStyle: {
    border: '1px solid #555555',
    padding: '15px',
    borderRadius: '20px',
    lineHeight: '0.4em',
    marginTop: '1em',
    margin: 5,
    width: '235px',
  },
  mobileHide: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  video: {
    '@media (min-width: 768px)': {
      order: '-1',
    },
  },
  videoSize: {
    width: '100%',
    height: 315,
  },
  mobileShow: {
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
};

const mapStateToProps = state => ({
  isLoggedIn: !!state.auth.data.token,
});

const mapDispatchToProps = dispatch => ({
  getExperts() {
    dispatch(rest.actions.experts());
  },
  changeView(view) {
    dispatch(push(view.toLowerCase()));
  },
  doLogin(creds, callback) {
    dispatch(rest.actions.auth({}, { body: JSON.stringify(creds) }, callback));
  },
  doRegister(user) {
    dispatch(rest.actions.register.post({}, { body: JSON.stringify(
      { name: user.name,
        email: user.email,
        password: user.password,
        description: user.shortIntroduction,
        isExpert: true,
        details: user.lectureDetails,
        title: user.title,
        address: user.officeAddress,
        phone: user.phone,
        company: user.companyName,
        locale: 'fi',
        subjects: user.subjects,
        area: user.supportedLocations }),
    }));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@Radium
class About extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.landingWrapper}>

          <div style={styles.headerWrapper}>
            <div style={styles.leftSpace} />
            <div style={styles.empty} />
            <div style={styles.bigText}>
              <h1 style={styles.bigHeader}>About</h1>
            </div>
            <div style={styles.rightSpace} />
          </div>

          <div style={styles.teacherExpertWrapperBottom}>
            <div style={styles.leftSpace} />
            <div style={styles.leftText}>
              <p style={styles.smallHeader}>TEACHERS</p>
              <p>
                Download and install the app to browse and view the experts profile. Easily invite
                experts to your classroom.
              </p>
              <FlatButton label="DOWNLOAD FOR IPHONE" style={styles.buttonStyle} /><br />
              <FlatButton label="DOWNLOAD FOR ANDROID" style={styles.buttonStyle} />

              <p style={styles.smallHeaderUnder}>EXPERTS</p>
              <p>
                Sign up as an expert and  to share your skills for the benefit of the future
                generation.
              </p>
              {this.props.isLoggedIn ?
                <FlatButton label="MY PROFILE" style={styles.buttonStyle} onTouchTap={() => this.props.changeView('/profile')} />
                :
                <div>
                  <RegisterModal doRegister={this.props.doRegister} />
                  <LoginModal doLogin={this.props.doLogin} />
                </div>

              }
            </div>
            <div style={styles.rightText}>
              <p>
                Xprt connects teachers and experts for the benefit on Finnish school children.
                Arranging a visiting lecture from a professional expert has become easier
              </p>
              <p style={styles.mobileHide}>
                See Xprt in action.
              </p>
              <div style={styles.mobileShow}>
                <h1 style={styles.bigHeader}>About</h1>
              </div>
              <div style={styles.video}>
                <iframe
                  title="HundrED introduction video"
                  style={styles.videoSize}
                  src="https://www.youtube.com/embed/niGGKthoCNQ"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            <div style={styles.rightSpace} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
