import { Component, PropTypes } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedMessage } from 'react-intl';
import {
  get,
  errors
} from '../../utils/api';

errors.on('*', (err, status) => {
  alert(err, status);
});

class Home extends Component {
  constructor() {
    super();

    this.state = {
      experts: []
    };
  }

  async componentDidMount() {
    const experts = await get('/experts');
    this.setState({ experts });
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
          title={ <FormattedMessage id='newFeedback' /> }
          subtitle={ <FormattedMessage id='newFeedbackDesc' /> } />
        <CardText>
          {JSON.stringify(this.state.experts, null, 4)}
        </CardText>
      </Card>
      </div>
    );
  }
}

Home.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Home;
