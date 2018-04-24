import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

import { getThreads } from '../../../actions/threadActions';
import { getUserRecentThread, getUserRecentComment } from '../../../actions/recentActivityAction';
import { Avatar, Indicator, NavigationBar } from '../../../components';
import Event from './Event';
import TabComments from './Comments';
import TabInnerCircle from '../../tab-innerCircle';
import TabThreadByUser from '../../tab-threadByUser';
import Style from '../../../style/defaultStyle';
import { addInnerCircle, getOneUser } from '../../../actions';
import color from '../../../style/color';

const listTabs = ['THREAD', 'ANSWER', 'RESPONSE', 'EVENT'];

class ProfileDetails extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    };
  }

  componentDidMount() {
    const { _id } = this.props.dataAuth._id;
    const { id } = this.props;
    const userId = _id === id ? _id : id;

    this.props.getUserRecentThread(userId);
    this.props.getUserRecentComment(userId);
    // this.props.getOneUser(userId);
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

  notUserLoggedIn = userId => (
    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.addInnerCircle(userId)}>
      <Image source={require('../../../assets/icons/check.png')} style={styles.imageButtonStyle} />
      <Text style={styles.buttonTextStyle}>INNER CIRCLE</Text>
    </TouchableOpacity>
  );

  renderViewProfile = () => {
    const userId = this.props.dataAuth._id === this.props.id;

    if (userId === false && this.props.visitProfile === 'visited') {
      return this.notUserLoggedIn(this.props.id);
    } else if (userId === true) {
      return this.userIsLoggedIn();
    } else if (this.props.id === undefined) {
      return this.userIsLoggedIn();
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
    const { _id, nama, tipe_user, foto_profile } = this.props.dataAuth;
    const { id, name, typeOfUser, profilePicture } = this.props;
    const isCurrentUser = _id === id;
    const fullName = isCurrentUser || id === undefined ? nama : name;
    const profilePic = isCurrentUser || id === undefined ? foto_profile : profilePicture;
    const typeUser = isCurrentUser || id === undefined ? tipe_user : typeOfUser;

    return (
      <View style={styles.contentTopStyle}>
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
        <View style={styles.profileStyle}>
          <Avatar avatarSize="Medium" imageSource={profilePic} userName={fullName} />
          <View style={styles.attributeProfileStyle}>
            <Text style={styles.nameStyle}>{fullName}</Text>
            <Text style={styles.typeStyle}>{typeUser}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { recentThreads } = this.props.dataRecentActivity;
    return (
      <View style={styles.container}>
        {this.renderDetailProfile()}
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
    marginTop: 10,
    width: 30,
    height: 20
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser,
  dataRegister: state.registerReducer,
  dataThreads: state.threadsReducer,
  dataRecentActivity: state.recentActivityReducer,
  getOneUser: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getThreads: token => dispatch(getThreads(token)),
  getUserRecentThread: userId => dispatch(getUserRecentThread(userId)),
  getUserRecentComment: userId => dispatch(getUserRecentComment(userId)),
  addInnerCircle: userId => dispatch(addInnerCircle(userId)),
  getOneUser: userId => dispatch(getOneUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
