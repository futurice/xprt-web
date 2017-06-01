import React from 'react';
import Dialog from 'material-ui-old/Dialog';
import { Step, Stepper, StepLabel } from 'material-ui-old/Stepper';
import FlatButton from 'material-ui-old/FlatButton';

import Radium from 'radium';
import MediaQuery from 'react-responsive';

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

@Radium
class RegisterModal extends React.Component {

  state = {
    open: false,
    stepIndex: 0,
  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <BasicInfoFields
            stepIndex={stepIndex}
            onSubmit={this.handleNext}
            handleCancel={this.handleClose}
          />
        );
      case 1:
        return (
          <OccupationFields
            stepIndex={stepIndex}
            onSubmit={this.handleNext}
            handleCancel={this.handleClose}
            handlePrev={this.handlePrev}
            officeVisitPossible={false}
          />
        );
      case 2:
        return (
          <ExpertProfileFields
            stepIndex={stepIndex}
            onSubmit={this.handleSubmit}
            handleCancel={this.handleClose}
            handlePrev={this.handlePrev}
          />
        );
      default:
        console.log('Unexpected stepIndex in RegisterModal');
        return null;
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, stepIndex: 0 });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 });
    } if (stepIndex === 2) {
      this.setState({ open: false, stepIndex: 0 });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleSubmit = (values) => {
    this.props.doRegister(values);
    this.setState({ open: false, stepIndex: 0 });
  };

  render() {
    const { stepIndex } = this.state;

    return (
      <div>
        <FlatButton
          label="CREATE AN ACCOUNT"
          style={{ ...styles.button, ...styles.buttonGold }}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}
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
            {this.getStepContent(stepIndex)}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default RegisterModal;
