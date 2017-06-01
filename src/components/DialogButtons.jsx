import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui-old/FlatButton';
import ArrowForward from 'material-ui-old/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui-old/svg-icons/navigation/arrow-back';

const styles = {
  button: {
    border: '1px solid #555555',
    padding: 15,
    margin: 5,
    borderRadius: 20,
    lineHeight: '0.4em',
    marginTop: '1em',
  },
  iconButton: {
    padding: '6px',
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
        <FlatButton
          label="Cancel"
          onTouchTap={this.props.handleCancel}
          style={styles.button}
        />
        <FlatButton
          label="Back"
          onTouchTap={this.props.handlePrev}
          labelPosition="after"
          icon={<ArrowBack />}
          disabled={this.props.stepIndex === 0}
          style={{ ...styles.button, ...styles.iconButton }}
        />
        <FlatButton
          label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
          icon={this.props.stepIndex === 2 ? '' : <ArrowForward />}
          labelPosition="before"
          type="submit"
          primary={this.props.stepIndex === 2}
          onTouchTap={this.props.handleSubmit}
          style={{ ...styles.button, ...styles.iconButton }}
        />
      </div>
    );
  }
}

export default DialogButtons;
