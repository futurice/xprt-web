import React from 'react';
import { Field, reduxForm } from 'redux-form';

import ChipInputWrapper from '../../components/ChipInputWrapper';
import MUITextField from '../../components/MUITextField';
import DialogButtons from '../../components/DialogButtons';

// TODO: fetch from backend
const subjectList = [
  'Liikunta',
  'Äidinkieli',
  'Matematiikka',
  'Fysiikka',
  'Kemia',
  'Psykologia',
  'Musiikki',
  'Historia',
];

// TODO: fetch from backend
const cityList = [
  'Helsinki',
  'Espoo',
  'Vantaa',
];

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);

const required = value => (value ? undefined : 'Required');

@reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
})
export default class ExpertProfileFields extends React.Component {
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
              name="shortIntroduction"
              label="Short introduction"
              component={renderTextField}
              hintText="Describe yourself, your expertise and experience briefly"
              floatingLabelFixed
              multiLine
              rowsMax={6}
              validate={required}
            />

            <Field
              name="subjects"
              floatingLabelText="Subjects"
              component={ChipInputWrapper}
              id="subjects"
              dataSource={subjectList}
              hintText="Subjects you could teach"
              floatingLabelFixed
              multiLine
              rowsMax={6}
              validate={required}
            />

            <Field
              name="lectureDetails"
              label="Lecture details"
              component={renderTextField}
              hintText="Preferred topic in mind? Presentation or interactive? Most suitable for which ages? Any special equipment needed?"
              floatingLabelFixed
              multiLine
              rowsMax={6}
              validate={required}
            />

            <Field
              name="supportedLocations"
              floatingLabelText="Locations"
              component={ChipInputWrapper}
              id="supportedLocations"
              dataSource={cityList}
              hintText="Cities you could teach in"
              floatingLabelFixed
              multiLine
              rowsMax={6}
              validate={required}
            />

          </div>
          <DialogButtons
            stepIndex={this.props.stepIndex}
            handlePrev={this.props.handlePrev}
            handleCancel={this.props.handleCancel}
            handleSubmit={this.props.handleSubmit}
          />
        </div>
      </form>
    );
  }
}
