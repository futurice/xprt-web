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
    onCheck={(e, checked) => input.onChange(checked)}
  />
);

const selector = formValueSelector('registerForm');
const mapStateToProps = state => ({
  officeVisit: selector(state, 'officeVisit'),
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
            <Field
              name="companyName"
              label="Company name"
              component={renderTextField}
              id="companyName"
              validate={() => false}
            />

            <Field
              name="title"
              label="Title"
              component={renderTextField}
              id="title"
            />

            <Field
              name="officeVisit"
              id="officeVisit"
              component={renderCheckbox}
              label="Office visit possible"
            />

            <p>
              Check this box if you agree that teachers can come to your office with a group of
              students
            </p>

            {this.props.officeVisit &&
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
        </div>
      </form>
    );
  }
}
