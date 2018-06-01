import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';

import { getThreads } from '../../../actions/threadActions';
import { getUserRecentThread, getUserRecentComment } from '../../../actions/recentActivityAction';
import { Avatar, Indicator, NavigationBar, Spinner } from '../../../components';
import Event from './Event';
import TabComments from './Comments';
import TabInnerCircle from '../../tab-innerCircle';
import TabThreadByUser from '../../tab-threadByUser';
import Style from '../../../style/defaultStyle';
import { addInnerCircle, getOneUser } from '../../../actions';
import color from '../../../style/color';

//ICON
import plus from '../../../assets/icons/plus.png';
import hourglass from '../../../assets/icons/hourglass.png';
import check from '../../../assets/icons/check.png';

const listTabs = ['THREAD', 'ANSWER', 'RESPONSE', 'EVENT'];

class ProfileDetails extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      disabled: false,
      isProcess: true,
      user: null,
      loading: false,
      source: plus,
      status: 'TAMBAHKAN'
    };
  }

  componentWillMount() {
    if (this.props.userIsLogging) {
      this.setState({
        isProcess: false
      });
    }
  }

  componentDidMount() {
    const { _id } = this.props.dataAuth;
    const { id } = this.props;
    const userId = _id === id ? _id : id;

    this.props.getOneUser(userId);
    this.props.getUserRecentThread(userId);
    this.props.getUserRecentComment(userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user !== null && this.state.isProcess && this.state.user === null) {
      this.setState({
        isProcess: false,
        // user: nextProps.data.user
      });
    }
  }

  componentDidUpdate() {
    const self = this;
    const { status, message } = this.props.dataInnerCircle;
    const { loading } = this.state;

    if ((status === 201 && loading) || (status === 400 && loading)) {
      self.setState(
        { loading: false, source: hourglass, status: 'TERTUNDA', disabled: true },
        () => {
          Alert.alert(message);
        }
      );
    }
  }

  userIsLoggedIn = () => (
    <View style={styles.contentCenterStyle}>
      <View style={styles.indicatorStyle}>
        <Indicator persentase={{ width: '75%' }} />
      </View>
      <View style={styles.indicatorDetailStyle}>
        <Text style={styles.textStyle}>Profile Anda baru komplit 75%,</Text>
        <Text style={[styles.textStyle, { color: '#4644f0' }]}> lengkapi sekarang!</Text>
      </View>
    </View>
  );

  notUserLoggedIn = () => {
    const { source, status, disabled } = this.state;
    const { innerCircleStatus } = this.props.data.user;
    const icon =
      innerCircleStatus === 'open' ? source : innerCircleStatus === 'requested' ? hourglass : check;
    const buttonTitle =
      innerCircleStatus === 'requested'
        ? 'TERTUNDA'
        : innerCircleStatus === 'accepted'
          ? 'INNER CIRCLE'
          : status;
    const buttonDisabled =
      innerCircleStatus === 'requested' || innerCircleStatus === 'accepted' ? !disabled : disabled;

    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        disabled={buttonDisabled}
        onPress={() => {
          this.setState(
            {
              loading: true
            },
            () => this.props.addInnerCircle(this.props.id)
          );
        }}
      >
        <Image source={icon} style={styles.imageButtonStyle} tintColor={color.white} />
        <Text style={styles.buttonTextStyle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  renderViewProfile = () => {
    console.log(this.props)
    if (this.props.dataAuth._id === this.props.id) {
      // console.log('this is current user')
      return this.userIsLoggedIn();
    } else {
      return this.notUserLoggedIn();
    }
  };

  renderTabContent() {
    const { listThreads } = this.props.dataThreads;
    const { recentThreads, recentComments } = this.props.dataRecentActivity;
    if (this.state.tab === 0) {
      return <TabThreadByUser navi={this.props.navigator} listThreads={recentThreads.data} />;
    }
    if (this.state.tab === 1) {
      if (recentComments.data.length === 0 && recentComments.status_code === 0) {
        return (
          <View>
            <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
          </View>
        );
      }
      return <TabComments navi={this.props.navigator} listThreads={recentComments.data} />;
    }
    if (this.state.tab === 2) {
      return <TabThreadByUser navi={this.props.navigator} listThreads={listThreads.item.data} />;
    }
    if (this.state.tab === 3) {
      return <Event />;
    }
    if (this.state.tab === 4) {
      return <TabInnerCircle />;
    }
  }

  renderDetailProfile = () => {
    // const { _id, nama, tipe_user, foto_profile } = this.props.dataAuth;
    const { _id, nama, tipe_user, foto_profile } = this.props.data.user;
    // const isCurrentUser = _id === id;
    // const fullName = isCurrentUser || id === undefined ? nama : name;
    // const profilePic = isCurrentUser || id === undefined ? foto_profile : profilePicture;
    // const typeUser = isCurrentUser || id === undefined ? tipe_user : typeOfUser;

    return (
      <View style={styles.contentTopStyle}>
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
        <View style={styles.profileStyle}>
          <Avatar avatarSize="Medium" imageSource={foto_profile} userName={nama} />
          <View style={styles.attributeProfileStyle}>
            <Text style={styles.nameStyle}>{nama}</Text>
            <Text style={styles.typeStyle}>{tipe_user}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { recentThreads } = this.props.dataRecentActivity;
    if (this.state.isProcess) {
      return (
        <Spinner
          containerStyle={{ backgroundColor: color.white }}
          color="#FFDE00"
          text={'Loading...'}
          size="large"
        />
      );
    }

    const spinner =
      this.state.loading === true ? (
        <Spinner color="##FFDE00" text={'Loading...'} size="large" />
      ) : (
        <View />
      );

    return (
      <View style={styles.container}>
        {this.renderDetailProfile()}
        {spinner}
        <View style={{ flex: 0.5 }}>
          {this.renderViewProfile()}
          <View style={styles.tabContainerStyle}>
            {listTabs.map((btn, index) => (
              <TouchableOpacity
                key={index}
                style={styles.buttonTab}
                onPress={() =>
                  this.setState({
                    tab: index
                  })
                }
              >
                <Text
                  style={[
                    styles.buttonTabText,
                    {
                      fontSize: this.state.tab === index ? 14 : 12
                    }
                  ]}
                >
                  {btn}
                </Text>
                <Text
                  style={{
                    width: '20%',
                    borderBottomWidth: this.state.tab === index ? 5 : 0,
                    borderBottomColor: this.state.tab === index ? '#ef434e' : '#fff'
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ flex: 2, marginHorizontal: 10 }}>
          {recentThreads.data.length === 0 && recentThreads.status_code === 0 ? (
            <View>
              <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
            </View>
          ) : (
            this.renderTabContent()
          )}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 5
  },
  contentTopStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10
  },
  contentCenterStyle: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  attributeProfileStyle: { justifyContent: 'center', alignItems: 'center' },
  itemImage: {
    width: 25,
    height: 25
  },
  nameStyle: { fontSize: 20, fontFamily: 'Montserrat-Regular', color: '#000' },
  typeStyle: { fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#414141' },
  indicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginVertical: 5
  },
  buttonTab: {
    flex: 0,
    flexWrap: 'wrap',
    width: '20%',
    height: '100%',
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTabText: {
    fontSize: 12,
    color: '#ef434e',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium'
  },
  indicatorDetailStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5
  },
  textStyle: { fontSize: 9, fontFamily: 'Montserrat-Regular', color: '#1d1e27' },
  tabContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 2
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Style.DEVICE_WIDTH / 2,
    alignSelf: 'center',
    backgroundColor: color.red,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.red,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: Style.PADDING,
    paddingRight: Style.PADDING
  },
  buttonTextStyle: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    color: color.white,
    fontSize: Style.FONT_SIZE_SMALL,
    paddingTop: 10,
    paddingBottom: 10
  },
  imageButtonStyle: {
    marginLeft: -10,
    marginTop: 5,
    width: 30,
    height: 30
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser,
  dataInnerCircle: state.innerCircleReducer,
  dataThreads: state.threadsReducer,
  dataRecentActivity: state.recentActivityReducer,
  data: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getThreads: token => dispatch(getThreads(token)),
  getUserRecentThread: userId => dispatch(getUserRecentThread(userId)),
  getUserRecentComment: userId => dispatch(getUserRecentComment(userId)),
  addInnerCircle: userId => dispatch(addInnerCircle(userId)),
  getOneUser: userId => dispatch(getOneUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
