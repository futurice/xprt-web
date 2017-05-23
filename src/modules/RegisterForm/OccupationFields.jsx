import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import MUITextField from '../../components/MUITextField';
import Checkbox from 'material-ui-old/Checkbox';
import DialogButtons from '../../components/DialogButtons';
import styles from './registerFormStyles';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={!!input.value}
    onCheck={input.onChange}
  />
);


class OccupationFields extends Component {
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

          <p>Check this box if you agree that teachers can come to your office with
              a group of students</p>

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
          handleCancel={this.props.handleCancel}
        />
      </form>
    );
  }
}

OccupationFields = reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
})(OccupationFields);

const selector = formValueSelector('registerForm');
OccupationFields = connect(
  (state) => {
    // can select values individually
    const officeVisitPossible = selector(state, 'officeVisitPossible');
    return {
      officeVisitPossible,
    };
  },
)(OccupationFields);

export default OccupationFields;
