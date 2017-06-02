import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import FlatButton from 'material-ui-old/FlatButton';
import ArrowForward from 'material-ui-old/svg-icons/navigation/arrow-forward';
import Cancel from 'material-ui-old/svg-icons/navigation/cancel';
import Checkmark from 'material-ui-old/svg-icons/navigation/check';
import ArrowBack from 'material-ui-old/svg-icons/navigation/arrow-back';

import theme from '../utils/theme';

const styles = {
  button: {
    border: '1px solid #555555',
    // padding: 6,
    margin: 5,
    borderRadius: 20,
    // lineHeight: '0.4em',
    marginTop: '1em',
  },
  smallButton: {
    flex: 1,
    border: '1px solid #555555',
    // padding: 6,
    margin: 5,
    borderRadius: 20,
    // lineHeight: '0.4em',
    marginTop: '1em',
    minWidth: 44, // override, default is 88
  },
};

class DialogButtons extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handlePrev: PropTypes.func,
    stepIndex: PropTypes.number.isRequired,
  };

  static defaultProps = {
    handleSubmit: null,
    handlePrev: null,
  };

  render() {
    return (
      <div>
        <MediaQuery query="(min-width: 769px)">
          <FlatButton
            label="Cancel"
            icon={<Cancel />}
            onTouchTap={this.props.handleCancel}
            style={{ ...styles.button, color: theme.legacyPalette.errorColor }}
          />
          <FlatButton
            label="Back"
            onTouchTap={this.props.handlePrev}
            labelPosition="after"
            icon={<ArrowBack />}
            disabled={this.props.stepIndex === 0}
            style={styles.button}
          />
          <FlatButton
            label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
            icon={this.props.stepIndex === 2 ? <Checkmark /> : <ArrowForward />}
            labelPosition="before"
            type={'submit' /* this is here to enable submit on return press */}
            primary={this.props.stepIndex === 2}
            onTouchTap={this.props.handleSubmit}
            style={styles.button}
          />
        </MediaQuery>
        <MediaQuery query="(max-width: 768px)">
          <div style={{ display: 'flex' }}>
            <FlatButton
              icon={<Cancel />}
              onTouchTap={this.props.handleCancel}
              style={{ ...styles.smallButton, color: theme.legacyPalette.errorColor }}
            />
            <FlatButton
              onTouchTap={this.props.handlePrev}
              icon={<ArrowBack />}
              disabled={this.props.stepIndex === 0}
              style={styles.smallButton}
            />
            <FlatButton
              icon={this.props.stepIndex === 2 ? <Checkmark /> : <ArrowForward />}
              type={'submit' /* this is here to enable submit on return press */}
              primary={this.props.stepIndex === 2}
              onTouchTap={this.props.handleSubmit}
              style={styles.smallButton}
            />
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default DialogButtons;
