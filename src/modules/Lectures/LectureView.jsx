import { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { push } from 'react-router-redux'

import {
  get
} from '../../utils/api';

class Lectures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: []
    };
  }

  openLecture(lectureId) {
    const path = '/lectures/' + lectureId;
    this.props.dispatch(push(path));
  }

  async componentDidMount() {
    const lectures = await get('/lectures');
    this.setState({ lectures });
  }

  render() {
    return(
      <List>
        {this.state.lectures.map(lecture => (
          <ListItem
            key={lecture.id}
            primaryText={lecture.title}
            onClick={(e) => {
               e.preventDefault();
               this.openLecture(lecture.id)
             }} />
         ))}
     </List>
    );
  }
}

Lectures.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Lectures;
