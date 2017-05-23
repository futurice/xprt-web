import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui-old/TextField';
import MUITextField from '../../components/MUITextField';
import MenuItem from 'material-ui-old/MenuItem';
import DialogButtons from '../../components/DialogButtons';
import styles from './registerFormStyles';

/* const renderTextField = props => (
  <MUITextField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    underlineFocusStyle={styles.underlineStyle}
    fullWidth={true}
    {...props} />
)*/

const required = value => value ? undefined : 'Required';
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

const tel = value =>
    value && !/^\d{8,10}$/.test(value) ?
    'Invalid phone number' : undefined;

const name = value =>
      value && !/^[A-ZÅÄÖa-zåäö\s-]{3,100}$/.test(value) ?
      'Name must contain only letters and be at least 3 characters long' : undefined;

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const validate = (values) => {
  const errors = {};
  if (values.password !== values.repeatpassword) {
    errors.repeatpassword = 'Passwords must match';
  }
  return errors;
};

class BasicInfoFields extends Component {
  /* This prevents enter from closing the registration window*/
  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={this.onKeyPress}
      >
        <div style={{ height: 394 }}>
          <Field name="name" validate={[required, name]} component={renderTextField} label="Name" type="text" />
          <Field name="phone" validate={[required, tel]} component={renderTextField} label="Phone" type="text" />
          <Field name="email" validate={[required, email]} component={renderTextField} label="Email" type="text" />
          <Field name="password" validate={required} component={renderTextField} label="Password" type="password" />
          <Field name="repeatpassword" validate={required} component={renderTextField} label="Repeat password" type="password" />
        </div>
        <DialogButtons
          stepIndex={this.props.stepIndex}
          handleCancel={this.props.handleCancel}
        />
      </form>
    );
  }
}

BasicInfoFields = reduxForm({
  form: 'registerForm',
  validate,
  destroyOnUnmount: false,
})(BasicInfoFields);

export default BasicInfoFields;
