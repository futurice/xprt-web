import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import SessionTable from '../Sessions/SessionTable';

import { FormattedMessage } from 'react-intl';

import Paper from 'material-ui/Paper';

import {
  get,
  errors
} from '../../src/utils/api';

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

function select(state, ownProps) {
  return {
    employeeId: state.auth.data.employeeId
  };
}

export default connect(select)(Home);
