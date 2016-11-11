import { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
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
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: this.context.muiTheme.spacing.desktopGutter / 2
      }}>
        <Card style={{
          margin: this.context.muiTheme.spacing.desktopGutter / 2,
          flex: 1,
          flexBasis: '450px'
        }}>
          <CardHeader
            title={ <FormattedMessage id='lectures' /> }
            subtitle={ <FormattedMessage id='lecturesDesc' /> } />
          <CardText>
            <ul>
              {this.state.lectures.map(lecture => (
                 <li key={lecture.id}>
                   <a href="#" onClick={(e) => {
                     e.preventDefault();
                     this.openLecture(lecture.id)
                   }}>{lecture.title}</a>
                 </li>
               ))}
             </ul>
          </CardText>
        </Card>
      </div>
    );
  }
}

Lectures.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Lectures;
