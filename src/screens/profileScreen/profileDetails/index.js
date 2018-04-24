import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { getThreads } from '../../../actions/threadActions';
import { getUserRecentThread, getUserRecentComment } from '../../../actions/recentActivityAction';
import { Avatar, Indicator, NavigationBar } from '../../../components';
import Event from './Event';
import TabComments from './Comments';
import TabInnerCircle from '../../tab-innerCircle';
import TabThreadByUser from '../../tab-threadByUser';

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
    };
  }

  componentDidMount() {
    const { _id } = this.props.dataAuth;
    this.props.getUserRecentThread(_id);
    this.props.getUserRecentComment(_id);
  }

  renderTabContent() {
    const { listThreads } = this.props.dataThreads;
    const { recentThreads, recentComments } = this.props.dataRecentActivity;
    if (this.state.tab === 0) {
      return (
        <TabThreadByUser
          navi={this.props.navigator}
          listThreads={recentThreads.data}
        />
      );
    }
    if (this.state.tab === 1) {
      if (recentComments.data.length === 0 && recentComments.status_code === 0) {
        return (
          <View>
            <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
          </View>
        );
      }
      return (
        <TabComments
          navi={this.props.navigator}
          listThreads={recentComments.data}
        />
      );
    }
    if (this.state.tab === 2) {
      return (
        <TabThreadByUser
          navi={this.props.navigator}
          listThreads={listThreads.item.data}
        />
      );
    }
    if (this.state.tab === 3) {
      return (
        <Event />
      );
    }
    if (this.state.tab === 4) {
      return (
        <TabInnerCircle />
      );
    }
  }

  render() {
    const { nama, tipe_user, foto_profile } = this.props.dataAuth;
    const { recentThreads } = this.props.dataRecentActivity;
    console.log('PROPS PROFILE DETAILS ', this.props);
    return (
      <View style={styles.container}>
        {/* TOP */}
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
          <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
            <Avatar
              avatarSize="Medium"
              imageSource={foto_profile}
              userName={nama}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Monserrat-Regular', color: '#000' }}>{nama}</Text>
              <Text style={{ fontSize: 13, fontFamily: 'Monserrat-Regular', color: '#414141' }}>{tipe_user}</Text>
            </View>
          </View>
        </View>
        {/* CENTER */}
        <View style={{ flex: 0.5 }}>
          <View style={{ flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', marginVertical: 5 }}>
              <Indicator persentase={{ width: '75%' }} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 5 }}>
              <Text style={{ fontSize: 9, fontFamily: 'Monserrat-Regular', color: '#1d1e27' }}>Profile Anda baru komplit 75%,</Text>
              <Text style={{ fontSize: 9, fontFamily: 'Monserrat-Regular', color: '#4644f0' }}> lengkapi sekarang!</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 2 }}>
            {
              listTabs.map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.buttonTab}
                  onPress={() => this.setState({
                    tab: index
                  })}
                >
                  <Text
                    style={[styles.buttonTabText,
                      {
                        fontSize: this.state.tab === index ? 14 : 12,

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
              ))
            }
          </View>
        </View>
         {/* BOTTOM */}
        <View style={{ flex: 2, marginHorizontal: 10 }}>
          {
            recentThreads.data.length === 0 && recentThreads.status_code === 0 ?
            <View>
              <ActivityIndicator size="large" color="rgb(239, 67, 79)" />
            </View>
            :
            this.renderTabContent()
          }
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
    paddingBottom: 5,
    // paddingHorizontal: 5
  },
  itemImage: {
    width: 25,
    height: 25
  },
  buttonTab: {
    flex: 0,
    flexWrap: 'wrap',
    width: '20%',
    height: '100%',
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc'
  },
  buttonTabText: {
    fontSize: 12,
    color: '#ef434e',
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium'
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser,
	dataRegister: state.registerReducer,
  dataThreads: state.threadsReducer,
  dataRecentActivity: state.recentActivityReducer
});

const mapDispatchToProps = dispatch => ({
  getThreads: (token) => dispatch(getThreads(token)),
  getUserRecentThread: (userId) => dispatch(getUserRecentThread(userId)),
  getUserRecentComment: (userId) => dispatch(getUserRecentComment(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
