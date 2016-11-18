import { Component, PropTypes } from 'react';
import {Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

class LectureNew extends Component {
  render() {
    return(
      <Card style={{
          margin: 20,
          flex: 1,
          flexBasis: '450px'
        }}>
        <CardTitle title="New Lecture" subtitle="Fill the form below to suggest a lecture" />
        <CardText>
          <TextField
            hintText="Title of the leacture"
            floatingLabelText="Title"
            fullWidth={true}
          />
          <br />
          <TextField
            hintText="Description of the lecture"
            floatingLabelText="Description"
            multiLine={true}
            fullWidth={true}
          />
        </CardText>
        <CardActions>
          <FlatButton label="Send" />
          <FlatButton label="Cancel" />
        </CardActions>
      </Card>
    );
  }
}

export default LectureNew;
