import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Checkbox from 'material-ui-old/Checkbox';

import MUITextField from '../../components/MUITextField';
import DialogButtons from '../../components/DialogButtons';

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={!!input.value}
    onCheck={input.onChange}
  />
);

const selector = formValueSelector('registerForm');
const mapStateToProps = state => ({
  officeVisitPossible: selector(state, 'officeVisitPossible'),
});

@reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
})
@connect(mapStateToProps)
export default class OccupationFields extends React.Component {
  /* This prevents enter from closing the registration window*/
  // onKeyPress(event) {
  //   if (event.which === 13 /* Enter */) {
  //     event.preventDefault();
  //   }
  // }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >
        <div style={{ height: 394 }}>
          <Field
            name="companyName"
            label="Company name"
            component={renderTextField}
            id="companyName"
          />

          <Field
            name="title"
            label="Title"
            component={renderTextField}
            id="title"
          />

          <Field
            name="officeVisitPossible"
            id="officeVisitPossible"
            component={renderCheckbox}
            label="Office visit possible"
          />

          <p>
            Check this box if you agree that teachers can come to your office with a group of
            students
          </p>

          {this.props.officeVisitPossible &&
          <Field
            name="officeAddress"
            label="Office address"
            component={renderTextField}
            id="officeAddress"
          />
          }
        </div>
        <DialogButtons
          stepIndex={this.props.stepIndex}
          handlePrev={this.props.handlePrev}
          handleSubmit={this.props.handleSubmit}
          handleCancel={this.props.handleCancel}
        />
      </form>
    );
  }
}
