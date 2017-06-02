import React from 'react';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';

import EditPen from '../../../assets/edit.png';
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

  handleSubmit(e) {
    console.log('handle uploading-', this.state.file);
    this.props.doEdit(e);
  }

  handleImageChange(e) {
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
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img alt="Edit profile picture" style={styles.editProfilePicture} src={imagePreviewUrl} />
      );
    } else {
      imagePreview = (<div style={styles.editProfilePicture}>Please select a profile picture</div>);
    }

    return (
      <div>
        <a style={styles.link} label="Dialog" onTouchTap={this.handleOpen}>
          <img alt="edit" src={EditPen} style={styles.editPenLeft} />
        </a>
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
              <form name="image" onSubmit={e => this.handleSubmit(e)}>
                <div className="imgPreview" style={styles.imgPreview}>
                  {imagePreview}
                </div>

                <div style={styles.buttonArea}>
                  <FlatButton
                    label="Choose an Image"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                  >
                    <input
                      type="file"
                      style={styles.uploadInput}
                      onChange={e => this.handleImageChange(e)}
                    />
                  </FlatButton>
                  <FlatButton
                    label="Submit"
                    labelPosition="before"
                    style={styles.button}
                    containerElement="label"
                    onClick={e => this.handleSubmit(e)}
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
