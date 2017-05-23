import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import MUITextField from '../../components/MUITextField';
import ChipInput from '../../components/ChipInput';
import MenuItem from 'material-ui-old/MenuItem';
import AutoComplete from 'material-ui-old/AutoComplete';
import DialogButtons from '../../components/DialogButtons';
import styles from './registerFormStyles';

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

const cityList = [
  'Helsinki',
  'Espoo',
  'Vantaa',
];

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

/* const renderChipInput = props => (
  <ChipInput
    onChange={(chips) => handleChange(chips)} // Chips inside textfield
    filter={AutoComplete.fuzzyFilter} // Autocomplete
    dataSource={props.dataSource} // Autocomplete (source of suggestions)
    maxSearchResults={5} // Autocomplete (number of suggestions shown)
    hintText={props.hintText}
    floatingLabelText={props.label}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    underlineFocusStyle={styles.underlineStyle}
    floatingLabelFixed={true}
    className='formcontainer'
    fullWidth={true}/>
)*/

const required = value => value ? undefined : 'Required';
const chipRequired = value => value ? undefined : 'At least one chip';

const renderChipInput = ({ input, label, hintText, dataSource, meta: { touched, error }, ...custom }) => (
  <ChipInput

    {...input}
    value={input.value || []}
    onRequestAdd={(addedChip) => {
      let values = input.value || [];
      values = values.slice();
      values.push(addedChip);
      input.onChange(values);
    }}
    onRequestDelete={(deletedChip) => {
      let values = input.value || [];
      values = values.filter(v => v !== deletedChip);
      input.onChange(values);
    }}
    onBlur={() => input.onBlur()}

    onChange={chips => handleChange(chips)} // Chips inside textfield
    filter={AutoComplete.fuzzyFilter} // Autocomplete
    maxSearchResults={5} // Autocomplete (number of suggestions shown)
    hintText={hintText}
    floatingLabelText={label}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    underlineFocusStyle={styles.underlineStyle}
    floatingLabelFixed
    className="formcontainer"
    fullWidth
    dataSource={dataSource}
    {...custom}
  />
);


class ExpertProfileFields extends Component {
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
            name="shortIntroduction"
            label="Short introduction"
            component={renderTextField}
            type="text"
            hintText="Tell briefly about you, your expertise and experience"
            floatingLabelFixed
            validate={required}
          />

          <Field
            name="subjects"
            label="Subjects"
            component={renderChipInput}
            id="subjects"
            dataSource={subjectList}
            hintText="List of subjects you could teach about"
            validate={chipRequired}
          />

          <Field
            name="lectureDetails"
            label="Lecture details"
            component={renderTextField}
            hintText="Preferred topic in mind? Presentation or interactive? Most suitable for which ages? Any special equipment needed?"
            floatingLabelFixed
            multiLine
            rows={2}
            rowsMax={4}
            validate={required}
          />

          <Field
            name="supportedLocations"
            label="Supported locations"
            component={renderChipInput}
            id="supportedLocations"
            dataSource={cityList}
            hintText="List the cities you could teach in"
            validate={chipRequired}
          />

        </div>
        <DialogButtons
          stepIndex={this.props.stepIndex}
          handlePrev={this.props.handlePrev}
          handleCancel={this.props.handleCancel}
          handleSubmit={this.props.handleSubmit}
        />
      </form>
    );
  }
}

ExpertProfileFields = reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
})(ExpertProfileFields);

export default ExpertProfileFields;
