import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui-old/TextField';
import MUITextField from '../components/MUITextField';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';
import ChipInput from '../components/ChipInput';
import AutoComplete from 'material-ui-old/AutoComplete';
import styles from './editModalStyles';

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

const formdata = {
  introduction: 'Short introduction about expert. I can do this and that and tell cool jokes about Scrum etc.',
  subjects: 'Major Tom, Lalilulelo, Liquid, Snake',
  lectureDetails: 'Details about lecture',
};

const required = value => value ? undefined : 'Required';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

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

@Radium
export default class ExperdDetailsModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <a style={styles.link} label="Dialog" onTouchTap={this.handleOpen}><img src={'../../img/edit.png'} style={styles.editPen} /></a>
        <Dialog
          modal={false}
          autoScrollBodyContent
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={styles.noborder}
          actionsContainerStyle={styles.noborder}
        >
          <form onSubmit={this.props.handleSubmit}>
            <div>
              <Field
                name="description"
                validate={required}
                component={renderTextField}
                label="Short introduction"
                type="text"
                floatingLabelFixed
              />

              <Field
                name="subjects"
                label="Subjects"
                validate={required}
                component={renderChipInput}
                id="subjects"
                dataSource={subjectList}
                floatingLabelFixed
              />

              <Field
                name="details"
                validate={required}
                component={renderTextField}
                label="Lecture details"
                type="text"
                floatingLabelFixed
              />

            </div>
            <FlatButton
              type="submit"
              label="Save"
              primary
              style={styles.button}
            />
            <FlatButton
              type="button"
              label="Cancel"
              primary
              onTouchTap={this.handleClose}
              style={styles.button}
            />
          </form>


        </Dialog>
      </div>
    );
  }
}

ExperdDetailsModal = reduxForm({
  form: 'expertDetailsEditForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})(ExperdDetailsModal);

ExperdDetailsModal = connect(
  (state, ownProps) => ({
    initialValues: ownProps.expert,
  }),
)(ExperdDetailsModal);
