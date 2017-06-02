import React from 'react';
import Dialog from 'material-ui-old/Dialog';
import { Step, Stepper, StepLabel } from 'material-ui-old/Stepper';

import Radium from 'radium';
import MediaQuery from 'react-responsive';

import {
  createAction,
  createReducer,
} from 'redux-act';

import { connect } from 'react-redux';

import rest from '../utils/rest';

import BasicInfoFields from './RegisterForm/BasicInfoFields';
import OccupationFields from './RegisterForm/OccupationFields';
import ExpertProfileFields from './RegisterForm/ExpertProfileFields';
import theme from '../utils/theme';

const styles = {
  fieldsStyle: {
    width: '100%',
    minHeight: 450,
  },
  button: {
    border: '1px solid #555555',
    padding: 15,
    margin: 5,
    borderRadius: '20px',
    lineHeight: '0.4em',
    marginTop: '1em',
  },
  buttonGold: {
    color: theme.legacyPalette.primary2Color,
  },
  stepLabel: {
    color: theme.legacyPalette.primary2Color,
    fontSize: 17,
  },
};

// Action creators
export const openRegisterModal = createAction('Open register modal');
export const closeRegisterModal = createAction('Close register modal');
export const stepForward = createAction('Step forward in modal');
export const stepBack = createAction('Step back in modal');

// Initial state
const initialState = {
  open: false,
  stepIndex: 0,
};

const numSteps = 3;

// Reducer
export const reducer = createReducer({
  [openRegisterModal]: state => ({
    ...state,
    stepIndex: 0,
    open: true,
  }),
  [closeRegisterModal]: state => ({
    ...state,
    open: false,
  }),
  [stepForward]: state => ({
    ...state,
    stepIndex: Math.min(numSteps - 1, state.stepIndex + 1),
  }),
  [stepBack]: state => ({
    ...state,
    stepIndex: Math.max(0, state.stepIndex - 1),
  }),
}, initialState);

const mapStateToProps = state => ({
  open: state.registerModal.open,
  stepIndex: state.registerModal.stepIndex,
});

const mapDispatchToProps = dispatch => ({
  doRegister: user => dispatch(rest.actions.register.post({}, {
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      description: user.shortIntroduction,
      isExpert: true,
      details: user.lectureDetails,
      title: user.title,
      address: user.officeAddress,
      phone: user.phone,
      company: user.companyName,
      locale: 'fi',
      subjects: user.subjects,
      area: user.supportedLocations,
    }),
  })),
  doStepForward: () => dispatch(stepForward()),
  doStepBack: () => dispatch(stepBack()),
  doCloseRegisterModal: () => dispatch(closeRegisterModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
@Radium
export default class RegisterModal extends React.Component {
  getStepContent = () => {
    const { doStepForward, doStepBack, doCloseRegisterModal, doRegister, stepIndex } = this.props;

    switch (stepIndex) {
      case 0:
        return (
          <BasicInfoFields
            stepIndex={stepIndex}
            onSubmit={doStepForward}
            handleCancel={doCloseRegisterModal}
          />
        );
      case 1:
        return (
          <OccupationFields
            stepIndex={stepIndex}
            onSubmit={doStepForward}
            handleCancel={doCloseRegisterModal}
            handlePrev={doStepBack}
          />
        );
      case 2:
        return (
          <ExpertProfileFields
            stepIndex={stepIndex}
            onSubmit={doRegister}
            handleCancel={doCloseRegisterModal}
            handlePrev={doStepBack}
          />
        );
      default:
        console.log('Unexpected stepIndex in RegisterModal');
        return null;
    }
  };

  render() {
    const { open, stepIndex, doCloseRegisterModal } = this.props;
    console.log(open);

    return (
      <Dialog
        open={open}
        onRequestClose={doCloseRegisterModal}
        autoScrollBodyContent
      >

        <MediaQuery query="(min-width: 769px)">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel style={styles.stepLabel}>BASIC INFO</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepLabel}>OCCUPATION</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepLabel}>EXPERT PROFILE</StepLabel>
            </Step>
          </Stepper>
        </MediaQuery>
        <MediaQuery query="(max-width: 768px)">
          <Stepper orientation="vertical" activeStep={stepIndex}>
            <Step>
              <StepLabel style={styles.stepLabel}>BASIC INFO</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepLabel}>OCCUPATION</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepLabel}>EXPERT PROFILE</StepLabel>
            </Step>
          </Stepper>
        </MediaQuery>

        <div style={styles.fieldsStyle}>
          {this.getStepContent()}
        </div>
      </Dialog>
    );
  }
}
