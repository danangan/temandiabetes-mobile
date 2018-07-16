/*
  @daniel
  List Thread by user's id
*/
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Platform, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';

import { getThreads, makeBookmark } from '../../actions/threadActions';

import ThreadItem from '../forum/components/threadItem';
import ContentThread from '../../components/thread/contentThread';
import Style from '../../style/defaultStyle';

class TabThreadByUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProses: false,
    };
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.onPostBookmark = this.onPostBookmark.bind(this);
  }
  
  toThreadDetails(threads) {
    this.props.navi.push({
      screen: 'TemanDiabetes.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: threads
    });
  }

  onPostBookmark = async (thread, threadIndex) => {
    this.setState(
      {
        isProses: true
      },
      () => {
        this.props.makeBookmark(thread, threadIndex);
      }
    );
  };

  renderItem(threads) {
    const { threadType } = threads.item;
    const { nama, foto_profile } = this.props.dataAuth;
    console.log('threadType ', threads.item);

    return (
      <View>
        <Text>Daniel</Text>
      </View>
    );
  }


  render() {
    console.log('THIS PROPS THREAD BY USER ', this.props);
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', marginBottom: 10, paddingBottom: 10 }}>
        {
          this.props.listThreads.length === 0 ?
          <View style={styles.messageEmpty}>
            <Text style={styles.textHistory}>Tidak ada riwayat threads Anda</Text>
          </View>
          :
          <FlatList 
            keyExtractor={this.props.listThreads._id} 
            data={this.props.listThreads} 
            renderItem={item => this.renderItem(item)} 
          />
        }
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
    })
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
