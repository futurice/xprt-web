import React from 'react';
import Radium from 'radium';
import FlatButton from 'material-ui-old/FlatButton';
import Dialog from 'material-ui-old/Dialog';
import { connect } from 'react-redux';

import EditPen from '../../../assets/edit.png';
import styles from './editModalStyles';

import rest from '../../utils/rest';

const mapDispatchToProps = dispatch => ({
  editProfile(data, cb) {
    dispatch(rest.actions.profile.patch({}, {
      body: JSON.stringify(data),
    }, cb));
  },
});

@connect(null, mapDispatchToProps)
@Radium
export default class EditPictureModal extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit() {
    this.props.editProfile({
      image: this.state.file,
    });
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (readFile) => {
      this.setState({
        file: readFile.target.result,
        imagePreviewUrl: readFile.target.result,
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
          </div>
        </Dialog>
      </div>
    );
  }
}
