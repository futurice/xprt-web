import { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { push } from 'react-router-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

  createNewLecture() {
    this.props.dispatch(push('/lecture/new'));
  }

  async componentDidMount() {
    const lectures = await get('/lectures');
    this.setState({ lectures });
  }

  render() {
    return(
     <div>
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
        <FloatingActionButton
          style={{
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 20,
              left: 'auto',
              position: 'fixed',
              zIndex: 1
          }}
          secondary={true}
          onClick={(e) => {
             e.preventDefault();
             this.createNewLecture()
           }}>
          <ContentAdd />
        </FloatingActionButton>
        <Card style={{
            margin: this.context.muiTheme.spacing.desktopGutter / 2,
            flex: 1,
            flexBasis: '450px'
          }}>
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
       </Card>
      </div>
    );
  }
}

Lectures.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Lectures;
