import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui-old/TextField';
import MUITextField from '../components/MUITextField';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';
import ChipInput from '../components/ChipInput';
import AutoComplete from 'material-ui-old/AutoComplete';
import styles from './editModalStyles';


@Radium
export default class EditPictureModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  _handleSubmit(e) {
    console.log('handle uploading-', this.state.file);
    this.props.doEdit(e);
  }

  _handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={styles.editProfilePicture} src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div style={styles.editProfilePicture}>Please select a profile picture</div>);
    }

    return (
      <div>
        <a style={styles.link} label="Dialog" onTouchTap={this.handleOpen}><img src={'../../img/edit.png'} style={styles.editPenLeft} /></a>
        <Dialog
          title="Choose your avatar"
          modal={false}
          autoScrollBodyContent
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={styles.noborder}
          actionsContainerStyle={styles.noborder}
        >
          <div style={styles.editPictureWindow}>
            <form onSubmit={this.props.handleSubmit}>
              <form name="image" onSubmit={e => this._handleSubmit(e)}>
                <div className="imgPreview" style={styles.imgPreview}>
                  {$imagePreview}
                </div>

                <div style={styles.buttonArea}>
                  <FlatButton
                    label="Choose an Image"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                  >
                    <input
                      type="file" style={styles.uploadInput}
                      onChange={e => this._handleImageChange(e)}
                    />
                  </FlatButton>
                  <FlatButton
                    label="Submit"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                    onClick={e => this._handleSubmit(e)}
                  />
                </div>
              </form>
            </form>
          </div>

        </Dialog>

      </div>
    );
  }
}
