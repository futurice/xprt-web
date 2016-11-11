import { Component, PropTypes } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';

import {
  get,
  errors
} from '../../utils/api';

errors.on('*', (err, status) => {
  alert(err, status);
});

class Lectures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: []
    };
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
          {JSON.stringify(this.state.lectures, null, 4)}
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
