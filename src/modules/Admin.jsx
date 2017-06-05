import React from 'react';
import Radium from 'radium';
import {
  Card,
  CardText,
  CardHeader,
} from 'material-ui-old/Card';
import Avatar from 'material-ui-old/Avatar';
import { Tabs, Tab } from 'material-ui-old/Tabs';
import TextField from 'material-ui-old/TextField';
import CircularProgress from 'material-ui-old/CircularProgress';
import DropDownMenu from 'material-ui-old/DropDownMenu';
import MenuItem from 'material-ui-old/MenuItem';

import { connect } from 'react-redux';

import rest from '../utils/rest';
import EditModal, { closeAdminEditModal } from './AdminEditModal';
import XprtBackground from '../../assets/xprt-background.png';

import theme from '../utils/theme';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tabStyle: {
    backgroundColor: 'rgba(68,68,68,1)',
  },
  contentContainerStyle: {
    backgroundColor: 'rgba(68,68,68,1)',
  },
  wrapper: {
    color: theme.legacyPalette.textColor,


  },

  landingWrapper: {
    minHeight: '100vh',
    paddingLeft: '4%',
    paddingRight: '4%',
    backgroundImage: `url(${XprtBackground})`,
    backgroundSize: '2500px',
    '@media (max-width: 900px)': {
      marginTop: 10,
    },
  },
  sameLine: {
    display: 'flex',
    flexDirection: 'row',

  },
  firstWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    '@media (max-width: 900px)': {
      flexDirection: 'column-reverse',
    },
  },

  bigHeader: {
    color: theme.legacyPalette.primary1Color,
    fontWeight: 300,
    '@media (max-width: 900px)': {
      fontSize: 24,
    },
  },
  // bigText is used in dropdown menu
  bigText: {
    flex: 4,
    fontSize: '18px',
    fontWeight: '300',
    flexBasis: '200px',
    marginLeft: '3em',
    paddingLeft: '3em',
    '@media (max-width: 900px)': {
      margin: 0,
      padding: 0,
      textAlign: 'center',
    },
  },
  leftSpace: {
    flex: 3,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  rightSpace: {
    flex: 3,
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  leftText: {
    fontSize: '16px',
    fontWeight: '300',
    textAlign: 'right',
    flex: 3,
    flexBasis: '200px',
    '@media (max-width: 900px)': {
      textAlign: 'center',
      fontSize: '16px',
    },
  },
  fullSearchBar: {
    fontSize: '16px',
    fontWeight: '300',
  },
  rightText: {
    fontSize: '16px',
    fontWeight: '300',
    borderLeft: '1px solid rgba(204, 204, 204, .34)',
    borderBottom: 0,
    textAlign: 'left',
    flex: 4,
    marginLeft: '3em',
    paddingLeft: '3em',
    flexBasis: '200px',
    '@media (max-width: 900px)': {
      textAlign: 'center',
      margin: 0,
      padding: 0,
      borderLeft: 0,
      borderBottom: '1px solid rgba(204, 204, 204, .34)',
      display: 'flex',
      flexDirection: 'column-reverse',
      flexBasis: '0px',
      fontSize: '16px',
    },
  },

  DropDownMenu: {
    width: '250px',
    margin: -9,


  },

  buttonStyle: {
    border: '1px solid rgba(204, 204, 204, .34)',
    // padding: '15px',
    borderRadius: '20px',
    // lineHeight: '0.4em',
    marginTop: '1em',
  },
  mobileHide: {
    '@media (max-width: 900px)': {
      display: 'none',
    },
  },
  mobileShow: {
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
  contentCard: {
    width: '100%',
    background: 'rgba(68,68,68,1)',
    marginBottom: '2em',
    padding: '30px',
    boxShadow: '0px 2px 8px 1px rgba(0,0,0,0.16), 0 2px 8px 1px rgba(0,0,0,0.23)',
  },
  /*
  Titlestyle, subtitleStyle & avatarStyle are used to stylize
  contentcards on the right side of page
  */
  titleStyle: {
    fontSize: '16px',
    color: theme.legacyPalette.primary2Color,
    fontWeight: '300',
    paddingLeft: '15px',
  },
  subtitleStyle: {
    fontSize: '16px',
    color: theme.legacyPalette.textColor,
    marginTop: '7px',
    fontWeight: '300',

  },
  avatarStyle: {
    marginTop: '-5px',
  },
  // Yellow line for invitations that are not handled yet
  colorIndicatorYellow: {
    borderLeft: 'solid',
    borderMargin: '#585858',
    borderOffset: { height: 10 },
    color: theme.legacyPalette.primary2Color,
  },
    // Green line for accpted invitations
  colorIndicatorGreen: {
    borderLeft: 'solid',
    color: theme.legacyPalette.primary1Color,
  },
  cardMargin: {
    marginBottom: 20,
  },
  parent: {
    fontSize: '16px',
    color: theme.legacyPalette.textColor,
    fontWeight: '300',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    '@media (min-width: 900px)': {
      flexWrap: 'nowrap',
    },
  },
  left: {
    order: 1,
      // background: 'red',
    flexBasis: '100%',
  },
  middle: {
    order: 2,
      // background: 'blue',
    flexBasis: '100%',
  },
  right: {
    order: 3,
    paddingRight: '50px',
      // background: 'green',
    flexBasis: '100%',
  },
  boldText: {
    fontWeight: 'bold',
  },
  cardHeaderStyle: {
    fontSize: '16px',
    color: theme.legacyPalette.textColor,
    fontWeight: '300',
  },
  header3top: {
    marginTop: 0,
  },
  accepted: {
    backgroundColor: theme.legacyPalette.primary1Color,
    padding: '5px',
    borderRadius: '20px',
    lineHeight: '0.4em',
  },
  declined: {
    backgroundColor: '#8A0808',
    padding: '5px',
    borderRadius: '20px',
    lineHeight: '0.4em',
  },
  ignored: {
    backgroundColor: '#8A0808',
    padding: '5px',
    borderRadius: '20px',
    lineHeight: '0.4em',
  },
};

const mapStateToProps = state => ({
  users: state.users,
  adminLectures: state.adminLectures,
});

const mapDispatchToProps = dispatch => ({
  refresh() {
    dispatch(rest.actions.users());
    dispatch(rest.actions.adminLectures());
  },
  doCloseModal() {
    dispatch(closeAdminEditModal());
  },
  editProfile(userId, data, cb) {
    dispatch(rest.actions.adminUser.patch({ userId }, { body: JSON.stringify(
      data),
    }, cb));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@Radium
class AdminView extends React.Component {
  // Gives sorting dropdown menu a default value. 1 = first value of options
  constructor(props) {
    super(props);
    this.state = { userValue: 'all', lectureValue: 'all', lectureSearch: '', userSearch: '' };
  }

  componentDidMount() {
    this.props.refresh();
  }

// triggered when user types on textfield
  updateLectureSearch = (event) => {
    this.setState({ lectureSearch: event.target.value });
  }
// triggered when user types on textfield
  updateUserSearch = (event) => {
    this.setState({ userSearch: event.target.value });
  }
// triggered when dropdown is selected
  lectureHandleChange = (event, index, lectureValue) => this.setState({ lectureValue });
  // triggered when dropdown is selected
  userHandleChange = (event, index, userValue) => this.setState({ userValue });

  handleEdit = (values) => {
    console.log('handleEdit', values);
    this.props.editProfile(values.id, values, () => {
      this.props.doCloseModal();
      this.props.refresh();
    });
  }

  // counts date difference between two dates
  dateDiffInDays = (today, datesent, msPerDay) => {
    // Discard the time and time-zone information
    const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const utc2 = Date.UTC(datesent.getFullYear(), datesent.getMonth(), datesent.getDate());
    return Math.floor((utc1 - utc2) / msPerDay);
  };

  render() {
    const { editModalOpen } = this.props;

    const users = this.props.users.data;
    const lectures = this.props.adminLectures.data;
    const loading = this.props.users.loading;

    // shows the circular loading animation until users and lectures are loaded
    if (!users || !lectures || loading) {
      return <CircularProgress />;
    }

    // this function checks if any of lecture data mathches with search and makes an array of the
    // matching data
    let filteredLectures = lectures.filter((lecture) => {
      const lectureName = lecture.lecturetheme.toLowerCase();
      const expertName = lecture.ExpertName.toLowerCase();
      const teacherName = lecture.TeacherName.toLowerCase();
      const expertEmail = lecture.ExpertEmail.toLowerCase();
      const teacherEmail = lecture.TeacherEmail.toLowerCase();
      const schoolName = lecture.TeacherSchool.toLowerCase();
      const location = lecture.TeacherAddress.toLowerCase();
      const subjectsList = lecture.subjects && lecture.subjects.toString().toLowerCase();

      let lectureStatus = lecture.status;
      const searchString = this.state.lectureSearch.toLowerCase();
      const stateValue = this.state.lectureValue;
      const msPerDay = 1000 * 60 * 60 * 24;

      // if 'not answered' is selected from dropdown menu, calculates days
      // between today and datesent, if days >= 14 changes lectureStatus to ignored
      if (stateValue === 'ignored' && lectureStatus === 'pending') {
        const datesent = new Date(lecture.datesent);
        const today = new Date();
        const days = this.dateDiffInDays(today, datesent, msPerDay);
        if (days >= 14) {
          lectureStatus = 'ignored';
        }
      }

      // returns if any data matches with the search, also checks if user wants to see all lectures
      // or for example held lectures
      return (lectureName.indexOf(searchString) !== -1
      || expertName.indexOf(searchString) !== -1
      || teacherName.indexOf(searchString) !== -1
      || expertEmail.indexOf(searchString) !== -1
      || teacherEmail.indexOf(searchString) !== -1
      || schoolName.indexOf(searchString) !== -1
      || location.indexOf(searchString) !== -1
      || subjectsList.indexOf(searchString) !== -1)
      && (lectureStatus === stateValue || stateValue === 'all');
    });

    // this function loops trough arrays inside object
    function List(props) {
      const values = props.values;
      if (!values) {
        return null;
      }
      const length = values.length;
      // if object has an array, this function loops through array and adds "," after each item
      const list = values.map((value, i) => {
        if (length === i + 1) {
          return <span key={value}>{value}</span>;
        }

        return <span key={value}>{value}, </span>;
      });
      // returns for example: Helsinki, Vantaa, Espoo
      return (
        <span>{list}</span>
      );
    }
    // if there isn't address, this function returns text "Office visit not possible"
    function OfficeVisit(props) {
      if (!props.address) {
        return (
          <span>Office visit not possible</span>
        );
      }
      return (
        <span>{props.address}</span>
      );
    }

    // makes dates be in format dd.mm.yyyy
    function DateFormat(props) {
      if (!props.date) {
        return (
          <span>No date set</span>
        );
      }
      const date = props.date;
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      return (
        <span>{day}.{month}.{year}</span>
      );
    }

    // if lecture status is 'pending' statusDate is not shown
    function StatusDate(props) {
      const date = props.date;
      const status = props.status;
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      if (status === 'pending') {
        return <span>{status}</span>;
      }
      return <span>{status} {day}.{month}.{year}</span>;
    }

    // loops trough every lecture and prints all information of a lecture and returns an expandable
    // div
    filteredLectures = filteredLectures.map(lecture => (
      <div key={lecture.id}>
        <Card style={{ ...styles.colorIndicatorGreen, ...styles.cardMargin }}>
          <CardHeader actAsExpander showExpandableButton style={styles.cardHeaderStyle}>
            <div style={styles.parent}>
              <div style={styles.left}>
                <h3 style={styles.header3top}>From:</h3>
                <p>{lecture.TeacherName}<br />
                  {lecture.TeacherEmail}
                </p>
              </div>
              <div style={styles.middle}>
                <h3 style={styles.header3top}>To:</h3>
                <p>{lecture.ExpertName}<br />
                  {lecture.ExpertEmail}
                </p>
              </div>
              <div style={styles.right}>
                <h3 style={styles.header3top}>Date sent:</h3>
                <p><DateFormat date={lecture.datesent} /><br />
                  <StatusDate status={lecture.status} date={lecture.statusDate} />
                </p>
              </div>
            </div>

          </CardHeader>

          <CardText expandable>
            <div style={styles.parent}>
              <div style={styles.left}>
                <p><span style={styles.boldText}>School name:</span><br />
                  {lecture.TeacherSchool}
                </p>
                <p><span style={styles.boldText}>Subjects:</span><br />
                  <List values={lecture.subjects} />
                </p>
                <p><span style={styles.boldText}>Educational stage:</span><br />
                  {lecture.educationalstage}
                </p>
              </div>
              <div style={styles.middle}>
                <p><span style={styles.boldText}>Lecture theme:</span><br />
                  {lecture.lecturetheme}
                </p>
                <p><span style={styles.boldText}>Date of lecture: (option1)</span><br />
                  <DateFormat date={lecture.dateOption1} />
                </p>
                <p><span style={styles.boldText}>Date of lecture: (option2)</span><br />
                  <DateFormat date={lecture.dateOption2} />
                </p>
                <p><span style={styles.boldText}>Location:</span><br />
                  {lecture.TeacherAddress}
                </p>
                <p><span style={styles.boldText}>Short description:</span><br />
                  {lecture.description}
                </p>
              </div>
              <div style={styles.right} />
            </div>
          </CardText>
        </Card>
      </div>
      ));
      // this function checks if any of user data mathches with search and makes an array of the
      // matching data
    let filteredUsers = users.filter((user) => {
      const contactName = user.name.toLowerCase();
      const contactEmail = user.email.toLowerCase();
      let userType = '';
      if (user.isExpert && user.isTeacher) {
        userType = 'expertteacher';
      } else if (user.isTeacher) {
        userType = 'teacher';
      } else if (user.isExpert) {
        userType = 'expert';
      }
      const supportedLocationsList = user.area && user.area.toString().toLowerCase();
      const subjectsList = user.subjects && user.subjects.toString().toLowerCase();
          // const contactCity = contact.city.toLowerCase();
      const searchString = this.state.userSearch.toLowerCase();
      const stateValue = this.state.userValue;

      return (contactName.indexOf(searchString) !== -1 ||
          contactEmail.indexOf(searchString) !== -1 ||
          subjectsList.indexOf(searchString) !== -1 ||
          supportedLocationsList.indexOf(searchString) !== -1)
          && (userType.indexOf(stateValue) || stateValue === 'all');
          // ||contactCity.indexOf(searchString) !== -1
    });

    filteredUsers = filteredUsers.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }

      return 0;
    });

        // loops trough every user and prints all information of a lecture and returns an expandable
        // div
    filteredUsers = filteredUsers.map(user => (
      <div key={user.id}>
        <Card style={{ ...styles.colorIndicatorGreen, ...styles.cardMargin }}>
          <CardHeader actAsExpander showExpandableButton>


            <div style={styles.parent}>
              <div style={{ ...styles.left, ...styles.sameLine }}>
                <Avatar src={user.imageUrl} size={60} style={styles.avatarStyle} />
                <p style={styles.titleStyle}>{user.name}</p>
              </div>
              <div style={styles.middle}>

                <p>{user.email}</p>
              </div>
              <div style={styles.right}>

                <p>{user.phone}</p>
              </div>
            </div>

          </CardHeader>

          <CardText expandable>
            <div style={styles.parent}>
              <div style={styles.left}>
                <p>
                  <strong>Email:</strong><br />
                  {user.email}
                </p>
                <p>
                  <strong>Phone number:</strong><br />
                  {user.phone}
                </p>
                <p>
                  <strong>Location:</strong><br />
                  <List values={user.area} />
                </p>
                <p>
                  <strong>Company:</strong><br />
                  {user.company}
                </p>
              </div>
              <div style={styles.middle}>
                <p>
                  <strong>Job title:</strong><br />
                  {user.title}
                </p>
                {user.officeVisit &&
                <p>
                  <strong>Office address:</strong><br />
                  <OfficeVisit address={user.address} />
                </p>
                      }
                <p>
                  <strong>Introduction</strong><br />
                  {user.description}
                </p>
                <p>
                  <strong>Subjects:</strong><br />
                  <List values={user.subjects} />
                </p>
              </div>

              <div style={styles.right}>
                <EditModal onSubmit={this.handleEdit} open={editModalOpen} user={user} />
              </div>
            </div>
          </CardText>
        </Card>
      </div>
            ));

    return (
      <div style={styles.wrapper}>
        <div style={styles.landingWrapper}>
          <div style={styles.firstWrapper}>
            <div style={styles.rightSpace}><h1 style={styles.bigHeader}>Admin panel</h1></div>
          </div>

          <Tabs tabItemContainerStyle={{ ...styles.contentContainerStyle }}>
            <Tab label="USERS" style={styles.tabStyle} >
              <div>
                <br />
                <div style={styles.firstWrapper}>

                  <DropDownMenu
                    value={this.state.userValue}
                    onChange={this.userHandleChange}
                    openImmediately={false}
                    style={styles.DropDownMenu}
                  >
                    <MenuItem value={'all'} primaryText="ALL" />
                    <MenuItem value={'expert'} primaryText="EXPERTS" />
                    <MenuItem value={'teacher'} primaryText="TEACHERS" />
                  </DropDownMenu>
                  <div style={styles.leftSpace} />
                  <div style={styles.leftText}>
                    <TextField
                      onChange={this.updateUserSearch}
                      value={this.state.userSearch}
                      style={styles.fullSearchBar}
                      hintText="Search for experts and teachers"
                      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                      underlineFocusStyle={styles.underlineStyle}
                      floatingLabelFixed
                      className="formcontainer"
                      fullWidth
                    />
                  </div>
                </div>
                {filteredUsers}
              </div>
            </Tab>
            <Tab label="LECTURES" style={{ ...styles.tabStyle }} >
              <br />
              <div style={styles.firstWrapper}>

                <DropDownMenu
                  value={this.state.lectureValue}
                  onChange={this.lectureHandleChange}
                  openImmediately={false}
                  style={styles.DropDownMenu}
                >
                  <MenuItem value={'all'} primaryText="ALL" />
                  <MenuItem value={'pending'} primaryText="PENDING" />
                  <MenuItem value={'accepted'} primaryText="ACCEPTED" />
                  <MenuItem value={'rejected'} primaryText="DECLINED" />
                  <MenuItem value={'ignored'} primaryText="NOT ANSWERED" />
                </DropDownMenu>
                <div style={styles.leftSpace} />
                <div style={styles.leftText}>
                  <TextField
                    onChange={this.updateLectureSearch}
                    value={this.state.lectureSearch}
                    hintText="Search for lecture, location, school etc."
                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    underlineFocusStyle={styles.underlineStyle}
                    floatingLabelFixed
                    className="formcontainer"
                    fullWidth
                  />
                </div>
              </div>
              <div>
                {filteredLectures}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default AdminView;
