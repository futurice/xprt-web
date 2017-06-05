import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';
import Checkbox from 'material-ui-old/Checkbox';

import {
  createAction,
  createReducer,
} from 'redux-act';

import EditPen from '../../assets/edit.png';
import MUITextField from '../components/MUITextField';
import ChipInputWrapper from '../components/ChipInputWrapper';
import theme from '../utils/theme';

import { required, email } from '../utils/validate';

const styles = {
  floatingLabelFocusStyle: {
    color: theme.legacyPalette.primary2Color,
  },
  underlineStyle: {
    color: theme.legacyPalette.primary2Color,
    borderColor: theme.legacyPalette.primary2Color,
  },
  link: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  button: {
    border: '1px solid #555555',
    padding: 15,
    margin: 5,
    borderRadius: 20,
    lineHeight: '0.4em',
    marginTop: '1em',
    float: 'left',
    color: theme.legacyPalette.textColor,
  },
  noborder: {
    border: 0,
  },
  editProfilePicture: {
    borderRadius: '50%',
    width: '200px',
    height: '200px',
  },
  editPictureWindow: {
    height: '300px',
    textAlign: 'center',
  },


  // Styling for editing Pen on left column
  editPen: {
    float: 'right',
    width: '24px',
    height: '24px',
  },
  editPenLeft: {
    float: 'left',
    marginLeft: '150px',
    marginTop: '-32px',
    width: '24px',
    height: '24px',
  },

  transparentInput: {
    backgroundColor: theme.legacyPalette.transparentColor,
    border: '1px solid #555555',
    marginBottom: 10,
    color: theme.legacyPalette.textColor,
    width: '100%',
    maxWidth: 700,
    padding: '10px 0px 10px 10px',
    borderRadius: 5,
    fontFamily: ('Catamaran' : 'sans-serif'),
    fontSize: '16px',
    fontWeight: '300',
    '@media (max-width: 900px)': {
      maxWidth: 900,
      width: '100%',
      borderRadius: 0,
    },
  },
  mobileHide: {
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  contactForm: {
    paddingRight: 10,
  },
  mainDivTextTitle: {
    color: theme.legacyPalette.primary1Color,
    fontSize: '16px',
    fontWeight: '300',
  },
};

// TODO: retreive from backend?
const cityList = [
  'Helsinki',
  'Espoo',
  'Vantaa',
];

// TODO: retreive from backend?
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

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => (
  <MUITextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...rest}
  />
);
const renderCheckbox = ({ input, label, style }) => (
  <Checkbox
    label={label}
    checked={!!input.value}
    onCheck={(e, checked) => input.onChange(checked)}
    style={style}
  />
);

const selector = formValueSelector('myProfileEditForm');

// Action creators
export const openAdminEditModal = createAction('Open admin edit modal');
export const closeAdminEditModal = createAction('Close admin edit modal');

// Initial state
const initialState = {
  open: false,
};

// Reducer
export const reducer = createReducer({
  [openAdminEditModal]: state => ({
    ...state,
    open: true,
  }),
  [closeAdminEditModal]: state => ({
    ...state,
    open: false,
  }),
}, initialState);

const mapStateToProps = (state, ownProps) => ({
  officeVisit: selector(state, 'officeVisit'),
  initialValues: ownProps.user,
  editModalOpen: state.adminEditModal.open,
});

const mapDispatchToProps = dispatch => ({
  doCloseModal: () => dispatch(closeAdminEditModal()),
  doOpenModal: () => dispatch(openAdminEditModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
  form: 'myProfileEditForm',
  destroyOnUnmount: true,
  enableReinitialize: true,
})
@Radium
export default class AdminEditModal extends React.Component {
  render() {
    const { editModalOpen, doOpenModal, doCloseModal, handleSubmit } = this.props;
    return (
      <div>
        <a style={styles.link} label="Dialog" onTouchTap={doOpenModal}>
          <img alt="edit" src={EditPen} style={styles.editPen} />
        </a>
        <Dialog
          modal={false}
          autoScrollBodyContent
          open={editModalOpen}
          onRequestClose={doCloseModal}
          titleStyle={styles.noborder}
          actionsContainerStyle={styles.noborder}
        >
          <div style={styles.contentCard}>
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="name"
                  validate={required}
                  component={renderTextField}
                  label="Name"
                  type="text"
                  floatingLabelFixed
                />

                <Field
                  name="phone"
                  validate={required}
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

                <Field
                  name="company"
                  label="Company name"
                  component={renderTextField}
                  id="companyName"
                  floatingLabelFixed
                />

                <Field
                  name="title"
                  label="Title"
                  component={renderTextField}
                  id="title"
                  floatingLabelFixed
                />

                <Field
                  name="officeVisit"
                  id="officeVisitPossible"
                  component={renderCheckbox}
                  label="Office visit possible"
                  style={{ marginTop: 20 }}
                />

                <p>Check this box if you agree that teachers can come to your office with
                      a group of students</p>

                {this.props.officeVisit &&
                  <Field
                    name="address"
                    label="Office address"
                    component={renderTextField}
                    id="officeAddress"
                    floatingLabelFixed
                  />}

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
                label="Save"
                primary
                type="submit"
                style={styles.button}
              />
              <FlatButton
                label="Cancel"
                primary
                onTouchTap={doCloseModal}
                style={styles.button}
              />
            </form>
          </div>

        </Dialog>
      </div>
    );
  }
}
