import React from 'react';
import { Field, reduxForm } from 'redux-form';
import MUITextField from '../../components/MUITextField';
import DialogButtons from '../../components/DialogButtons';

const required = value => (value ? undefined : 'Required');
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
);

const tel = value => (
  value && !/^\d{8,10}$/.test(value) ?
  'Invalid phone number' : undefined
);

const name = value => (
  value && !/^[A-ZÅÄÖa-zåäö\s-]{3,100}$/.test(value) ?
  'Name must contain only letters and be at least 3 characters long' : undefined
);

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);

const validate = (values) => {
  const errors = {};
  if (values.password !== values.repeatpassword) {
    errors.repeatpassword = 'Passwords must match';
  }
  return errors;
};

@reduxForm({
  form: 'registerForm',
  validate,
  destroyOnUnmount: false,
})
export default class BasicInfoFields extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div
          style={{
            minHeight: 450,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Field name="name" validate={[required, name]} component={renderTextField} label="Name" type="text" />
            <Field name="phone" validate={[required, tel]} component={renderTextField} label="Phone" type="text" />
            <Field name="email" validate={[required, email]} component={renderTextField} label="Email" type="text" />
            <Field name="password" validate={required} component={renderTextField} label="Password" type="password" />
            <Field name="repeatpassword" validate={required} component={renderTextField} label="Repeat password" type="password" />
          </div>
          <DialogButtons
            stepIndex={this.props.stepIndex}
            handleSubmit={this.props.handleSubmit}
            handleCancel={this.props.handleCancel}
          />
        </div>
      </form>
    );
  }
}
