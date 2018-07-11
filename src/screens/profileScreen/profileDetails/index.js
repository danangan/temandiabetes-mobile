import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  AsyncStorage,
  Alert
} from 'react-native';

import { getThreads } from '../../../actions/threadActions';
import { getUserRecentThread, getUserRecentComment } from '../../../actions/recentActivityAction';
import { Avatar, Indicator, NavigationBar, Spinner, SnackBar } from '../../../components';
import Event from './Event';
import TabComments from './Comments';
import TabInnerCircle from '../../tab-innerCircle';
import TabThreadByUser from '../../tab-threadByUser';
import TabRecentActivityResponse from '../../tab-recentActivityResponse';
import Style from '../../../style/defaultStyle';
import {
  addInnerCircle,
  getOneUser,
  getInnerCircle,
  acceptRequestToInnerCircle
} from '../../../actions';
import color from '../../../style/color';

//ICON
import { authToken } from '../../../utils/constants';
import Images from '../../../assets/images';

const listTabs = ['THREAD', 'ANSWER', 'ACTIVITY LOG', 'EVENT'];

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
      innerCircleStatus: null,
      loading: false,
      source: Images.plusIcon,
      status: 'TAMBAHKAN',
      completePercentase: '',
      showSnackBar: false,
      messages: '',
      innerCircleId: '',
      friendId: ''
    };
  }

  componentDidMount() {
    let userId;
    if (this.props.id) {
      userId = this.props.id;
    } else {
      userId = this.props.dataAuth._id;
    }

    this.props.dataAuth.innerCircles.forEach(item => {
      if (item.friend === userId) {
        this.setState({
          innerCircleId: item._id,
          friendId: item.friend
        });
      }
    });

    Promise.all([
      this.props.getOneUser(userId),
      this.props.getUserRecentThread(userId),
      this.props.getUserRecentComment(userId),
      this.counterProfileComplete()
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data.user !== null &&
      this.state.isProcess &&
      this.state.innerCircleStatus === null
    ) {
      this.setState({
        isProcess: false,
        innerCircleStatus: nextProps.data.user.innerCircleStatus
      });
    }
  }

  componentDidUpdate() {
    const self = this;
    const { status, message } = this.props.dataInnerCircle;
    const { _id } = this.props.dataAuth;
    const { loading } = this.state;
    const { user } = this.props.data;

    if (status === 201 && loading) {
      self.setState(
        { loading: false, source: Images.hourglassIcon, status: 'TERTUNDA', disabled: true },
        () => {
          AsyncStorage.getItem(authToken).then(idToken => {
            this.props.getInnerCircle(_id, idToken);
            this.showSnackBar(message);
          });
        }
      );
    }

    if (status === 400 && loading) {
      self.setState({ loading: false }, () => {
        this.showSnackBar(message);
      });
    }
  }

  showSnackBar = message => {
    this.setState({ showSnackBar: true, messages: message }, () => this.hideSnackBar());
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 2000);
  };

  isKeyExist(obj, key) {
    const keys = Object.keys(obj);
    return keys.includes(key);
  }

  counterProfileComplete() {
    const currentUser = this.props.dataAuth;
    let counter = 0;
    const arrayOfProps = [
      'nama',
      'tgl_lahir',
      'alamat',
      'no_telp',
      'jenis_kelamin',
      'foto_profile',
      'jenis_diabetes'
    ];

    arrayOfProps.forEach(item => {
      if (
        this.isKeyExist(currentUser, item) &&
        currentUser[item] !== '' &&
        currentUser[item] !== null
      ) {
        counter += 1;
      }
    });

    const persentase = (counter / arrayOfProps.length) * 100;

    this.setState({
      completePercentase: `${Math.round(persentase)}%`
    });
  }

  userIsLoggedIn = () => (
    <View style={styles.contentCenterStyle}>
      <View style={styles.indicatorStyle}>
        <Indicator persentase={{ width: this.state.completePercentase }} />
      </View>
      <View style={styles.indicatorDetailStyle}>
        <Text style={styles.textStyle}>
          Profile Anda baru komplit {this.state.completePercentase},
        </Text>
        <Text
          onPress={() => {
            this.props.navigator.push({
              screen: 'TemanDiabetes.EditProfile',
              navigatorStyle: {
                navBarHidden: true
              }
            });
          }}
          style={[styles.textStyle, { color: '#4644f0' }]}
        >
          {' '}
          lengkapi sekarang!
        </Text>
      </View>
    </View>
  );

  checkIcon = () => {
    const { source, innerCircleStatus } = this.state;
    switch (innerCircleStatus) {
      case 'open':
        return source;
      case undefined:
        return source;
      case 'requested':
        return Images.hourglassIcon;
      case 'accepted':
        return Images.checklistIcon;
      case 'pending':
        return '';
      default:
        return source;
    }
  };

  checkButtonTitle = () => {
    const { status, innerCircleStatus } = this.state;
    switch (innerCircleStatus) {
      case 'requested':
        return 'TERTUNDA';
      case 'accepted':
        return 'INNER CIRCLE';
      case 'pending':
        return 'TERIMA PERMINTAAN';
      default:
        return status;
    }
  };

  checkButtonDisabled = () => {
    const { disabled, innerCircleStatus } = this.state;
    switch (innerCircleStatus) {
      case 'requested':
        return !disabled;
      case 'accepted':
        return !disabled;
      default:
        return disabled;
    }
  };

  handleButtonPress = () => {
    const { innerCircleStatus, friendId, innerCircleId } = this.state;

    switch (innerCircleStatus) {
      case 'pending':
        return Alert.alert(
          'Terima Permintaan',
          'Apakah anda ingin menerima permintaan sebagai inner circle ?',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                this.props.accept(friendId, innerCircleId);
                this.props.navigator.pop();
              }
            }
          ],
          { cancelable: false }
        );
      case 'open':
        return this.props.addInnerCircle(this.props.id);
      case undefined:
        return this.props.addInnerCircle(this.props.id);
      default:
        break;
    }
  };

  notUserLoggedIn = () => {
    const icon = this.checkIcon();
    const buttonTitle = this.checkButtonTitle();
    const buttonDisabled = this.checkButtonDisabled();

    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        disabled={buttonDisabled}
        onPress={() => {
          this.setState(
            {
              loading: true
            },
            () => this.handleButtonPress()
          );
        }}
      >
        <Image
          source={icon}
          style={
            this.checkButtonTitle() === 'TERTUNDA'
              ? styles.imageButtonStyle
              : styles.imageButtonStyleII
          }
        />
        <Text style={styles.buttonTextStyle}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  renderViewProfile = () => {
    if (this.props.dataAuth._id === this.props.data.user._id) {
      return this.userIsLoggedIn();
    }
    return this.notUserLoggedIn();
  };

  renderTabContent() {
    const { listThreads } = this.props.dataThreads;
    const { recentThreads, recentComments, recentResponse } = this.props.dataRecentActivity;
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
      return (
        <TabRecentActivityResponse navi={this.props.navigator} listActivity={recentResponse.data} />
      );
    }
    if (this.state.tab === 3) {
      return <Event />;
    }
    if (this.state.tab === 4) {
      return <TabInnerCircle />;
    }
  }

  renderDetailProfile = () => {
    const { _id, nama, tipe_user, foto_profile } = this.props.data.user;

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
      return <Spinner color="red" text={'Loading...'} size="large" />;
    }

    const spinner =
      this.state.loading === true ? (
        <Spinner color="red" text={'Loading...'} size="large" />
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
                      fontSize:
                        this.state.tab === index ? Style.FONT_SIZE_SMALL : Style.FONT_SIZE_SMALLER
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
        <SnackBar
          visible={this.state.showSnackBar}
          textMessage={this.state.messages}
          position="top"
        />
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
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    marginVertical: 5
  },
  buttonTab: {
    flex: 0,
    width: Style.DEVICE_WIDTH / 4,
    height: '100%',
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTabText: {
    fontSize: Style.FONT_SIZE_SMALLER,
    color: '#ef434e',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular'
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
    marginTop: Style.UNIT / 2,
    width: Style.UNIT,
    height: Style.UNIT * 1.6
  },
  imageButtonStyleII: {
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
  getOneUser: userId => dispatch(getOneUser(userId)),
  getInnerCircle: (userId, idToken) => dispatch(getInnerCircle(userId, idToken)),
  accept: (friendId, innerCircleId) => dispatch(acceptRequestToInnerCircle(friendId, innerCircleId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetails);
