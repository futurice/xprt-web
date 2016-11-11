import { Component, PropTypes } from 'react';

class LectureDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Hello from details!
      </div>
    );
  }
}

LectureDetail.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default LectureDetail;
