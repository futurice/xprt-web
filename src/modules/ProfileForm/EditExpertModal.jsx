import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';

import EditPen from '../../../assets/edit.png';
import ChipInputWrapper from '../../components/ChipInputWrapper';
import MUITextField from '../../components/MUITextField';
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

const required = value => (value ? undefined : 'Required');

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
  form: 'expertDetailsEditForm',
  destroyOnUnmount: false,
  enableReinitialize: true,
})
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
                component={ChipInputWrapper}
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
