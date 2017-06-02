import React from 'react';
import FlatButton from 'material-ui-old/FlatButton';
import { Field, reduxForm } from 'redux-form';

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
    // padding: '15px',
    borderRadius: '20px',
    // lineHeight: '0.4em',
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

// TODO Validate max lengths etc. http://redux-form.com/6.6.3/examples/fieldLevelValidation/
const required = value => (value ? undefined : 'Required');
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
);

const renderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    {touched && error &&
    <p style={styles.errorText}>{error}</p>
      }
    <input
      {...input}
      placeholder={label}
      type={type}
      style={touched && error ?
        { ...styles.transparentInput, ...styles.errorInput } :
        styles.transparentInput}
    />
  </div>
);

const renderTextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    {touched && error &&
    <p style={styles.errorText}>{error}</p>
      }
    <textarea
      {...input}
      placeholder={label}
      type={type}
      style={touched && error ?
        { ...styles.transparentInput, ...styles.errorInput } :
        styles.transparentInput}
    />
  </div>
);

const ContactForm = (props) => {
  const { handleSubmit } = props;
  return (

    <form onSubmit={handleSubmit} style={styles.contactForm}>

      <Field
        name="name"
        type="text"
        label="Your name"
        component={renderTextField}
      />

      <Field
        name="email"
        type="text"
        label="Your email address"
        validate={email}
        component={renderTextField}
      />

      <Field
        name="phone"
        type="text"
        label="Your phone number"
        component={renderTextField}
      />

      <Field
        name="text"
        label="Your message *"
        validate={required}
        component={renderTextArea}
      />
      <FlatButton type="submit" label="SUBMIT" style={styles.buttonStyle} />
    </form>

  );
};

export default reduxForm({
  form: 'contactForm', // a unique identifier for this form
})(ContactForm);
