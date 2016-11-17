import { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { push } from 'react-router-redux'

import {
  get
} from '../../utils/api';

class Experts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experts: []
    };
  }

  openExpert(expertId) {
    const path = '/experts/' + expertId;
    this.props.dispatch(push(path));
  }

  async componentDidMount() {
    const experts = await get('/experts');
    this.setState({ experts });
  }

  render() {
    return(
      <List>
        {this.state.experts.map(expert => (
          <ListItem
            key={expert.id}
            primaryText={expert.name}
            secondaryText={expert.title}
            leftAvatar={
              <Avatar src={expert.photograph} />
            }
            onClick={(e) => {
               e.preventDefault();
               this.openExpert(expert.id)
             }} />
         ))}
     </List>
    );
  }
}

Experts.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Experts;
