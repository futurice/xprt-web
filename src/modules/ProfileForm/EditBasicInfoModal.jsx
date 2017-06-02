import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';

import EditPen from '../../../assets/edit.png';
import MUITextField from '../../components/MUITextField';
import ChipInputWrapper from '../../components/ChipInputWrapper';
import styles from './editModalStyles';

const cityList = [
  'Helsinki',
  'Espoo',
  'Vantaa',
];

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

const mapStateToProps = (state, ownProps) => ({
  initialValues: ownProps.expert,
});

@connect(mapStateToProps)
@reduxForm({
  form: 'myProfileEditForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})
@Radium
export default class BasicInfoModal extends React.Component {

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
        <a style={styles.link} label="Dialog" onTouchTap={this.handleOpen}>
          <img alt="edit" src={EditPen} style={styles.editPen} />
        </a>
        <Dialog
          modal={false}
          autoScrollBodyContent
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={styles.noborder}
          actionsContainerStyle={styles.noborder}
        >
          <div style={styles.contentCard}>
            <form onSubmit={this.props.handleSubmit}>
              <div>
                <Field
                  name="name"
                  validate={[required, name]}
                  component={renderTextField}
                  label="Name"
                  type="text"
                  floatingLabelFixed
                />
                <Field
                  name="phone"
                  validate={[required, tel]}
                  component={renderTextField}
                  label="Phone"
                  type="text"
                  floatingLabelFixed
                />
                <Field
                  name="email"
                  validate={[required, email]}
                  component={renderTextField}
                  label="Email"
                  type="text"
                  floatingLabelFixed
                />
                <Field
                  name="area"
                  label="Supported locations"
                  component={ChipInputWrapper}
                  id="supportedLocations"
                  dataSource={cityList}
                  floatingLabelFixed
                />

              </div>
              <FlatButton
                label="Save"
                primary
                type="submit"
                style={styles.button}
              />
              <FlatButton
                label="Cancel"
                primary
                onTouchTap={this.handleClose}
                type="button"
                style={styles.button}
              />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}
