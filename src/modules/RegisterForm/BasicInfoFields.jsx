import React from 'react';
import { Field, reduxForm } from 'redux-form';
import MUITextField from '../../components/MUITextField';
import DialogButtons from '../../components/DialogButtons';

import { required, email, matchingPasswords } from '../../utils/validate';

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);

@reduxForm({
  form: 'registerForm',
  matchingPasswords,
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
            <Field name="name" validate={[required]} component={renderTextField} label="Name" type="text" />
            <Field name="phone" validate={[required]} component={renderTextField} label="Phone" type="text" />
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
