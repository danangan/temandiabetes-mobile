/*
  @daniel
  List Thread by user's id
*/
import React from 'react';
import { connect } from 'react-redux';
import { result } from 'lodash';
import { View, Platform, FlatList } from 'react-native';
import Share from 'react-native-share';

import landingPageURL from '../../config/landingPageURL';
import { getThreads, makeBookmark } from '../../actions/threadActions';
import ThreadItem from '../forum/components/threadItem';
import Style from '../../style/defaultStyle';

class TabThreadByUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProses: false,
    };
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.onPostBookmark = this.onPostBookmark.bind(this);
    this.onShareThread = this.onShareThread.bind(this);
  }

  onShareThread(thread) {
    // console.log('onShareThread', thread);
    const options = {
      title: thread.topic,
      message: thread.topic,
      url: `${landingPageURL}/thread/${thread._id}`,
      subject: 'Article from Teman Diabetes' //  for email
    };
    Share.open(options).catch(err => {
      err && console.log(err);
    });
  }
  
  onPostBookmark = async (thread, threadIndex) => {
    console.log('thread thread ', thread);
    this.setState(
      {
        isProses: true
      },
      () => {
        this.props.makeBookmark(thread, threadIndex);
      }
    );
  };
  
  toThreadDetails(threads) {
    this.props.navi.push({
      screen: 'TemanDiabetes.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: threads
    });
  }

  renderItem(threads, index) {
    const { threadType } = threads.item;
    const { nama, foto_profile } = this.props.dataAuth;
    console.log('threadType ', threads.item);

    return (
      <ThreadItem
        threads={threads}
        toThreadDetails={this.toThreadDetails}
        onPostBookmark={this.onPostBookmark}
        onShareThread={this.onShareThread}
      />
    );
  }


  render() {
    const data = result(this.props.listThreads, 'thread.docs', []);
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList 
          keyExtractor={item => item._id} 
          data={data} 
          renderItem={(item, index) => this.renderItem(item, index)} 
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#ccc'
  },
  cardStyle: {
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.5
      }
    }),
    marginBottom: 15,
    marginTop: 5
  },
  wrapButonSearch: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    elevation: 2.5,
    height: 50
  },
  wrapPostThread: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
    elevation: 2.5,
    height: 70,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  messageEmpty: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHistory: { 
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: Style.FONT_SIZE
  }
};

const mapStateToProps = state => ({
  dataAuth: state.authReducer.currentUser,
  dataRegister: state.registerReducer,
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  getThreads: token => dispatch(getThreads(token)),
  makeBookmark: (thread, threadIndex) => dispatch(makeBookmark(thread, threadIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabThreadByUser);
