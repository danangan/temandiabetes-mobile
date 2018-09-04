import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import Share from 'react-native-share';

import {
  searchThread,
  saveUserSearch,
  makeBookmarkSearhedThread
} from '../../actions/threadActions';

import ThreadItem from '../forum/components/threadItem';
import StaticThreadItem from '../forum/components/staticThreadItem';

import { TextField, Spinner } from '../../components';
import searchIcon from '../../assets/icons/close.png';
import searchIcon2 from '../../assets/icons/search.png';

import landingPageURL from '../../config/landingPageURL';
import { authToken, keywordRecent } from '../../utils/constants';
import color from '../../style/color';

class ModalSearch extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      nums: [1, 2, 3, 4, 5, 6],
      searchKeyword: '',
      isLoading: false,
      recentSearch: []
    };

    this.onShareThread = this.onShareThread.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.changesKeyword = this.changesKeyword.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.toStaticThreadDetail = this.toStaticThreadDetail.bind(this);
    this.onPressHistory = this.onPressHistory.bind(this);
  }

  onShareThread(thread) {
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

  componentWillReceiveProps({ dataThreads: { saveBookmark } }) {
    if (
      (saveBookmark.status_code === 201 || saveBookmark.status_code === 200) &&
      this.state.isLoading
    ) {
      this.setState(
        {
          isLoading: false
        },
        () => {
          Alert.alert('Success', saveBookmark.message);
        }
      );
    }
  }

  onBookmark(thread, threadIndex) {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.props.makeBookmarkSearhedThread(thread, threadIndex);
      }
    );
  }

  componentDidMount() {
    this.getSearchRecent();
  }

  onPressHistory = async keyword => {
    const token = await AsyncStorage.getItem(authToken);
    this.setState(
      {
        searchKeyword: keyword
      },
      () => {
        this.props.searchThread(keyword, token);
      }
    );
  };

  getSearchRecent = async () => {
    const keyword = await AsyncStorage.getItem(keywordRecent);
    if (keyword !== null) {
      const toArray = keyword.split(',');
      this.setState({
        recentSearch: toArray
      });
    }
  };

  changesKeyword = searchKeyword => {
    this.setState({ searchKeyword }, () => {
      this.props.searchThread(searchKeyword, this.props.threadType);
    });
  };

  toSaveUserSearch() {
    this.props.saveUserSearch(this.state.searchKeyword);
  }

  toRenderItem(threads) {
    if (threads.item.threadType === 'static') {
      return (
        <StaticThreadItem
          threads={threads}
          toStaticThreadDetail={this.toStaticThreadDetail}
          onPostBookmark={this.onBookmark}
          onShareThread={this.onShareThread}
        />
      );
    }
    return (
      <ThreadItem
        threads={threads}
        toThreadDetails={this.toThreadDetails}
        onPostBookmark={this.onBookmark}
        onShareThread={this.onShareThread}
      />
    );
  }

  handleExtraData() {
    const { searchResult } = this.props.dataThreads;
    if (searchResult.data.length === 0 && this.state.searchKeyword === '') {
      return this.state.nums;
    }
    return searchResult.data;
  }

  toThreadDetails(threads) {
    this.props.saveUserSearch(this.state.searchKeyword);
    this.props.navigator.push({
      screen: 'TemanDiabetes.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: threads
    });
  }

  toStaticThreadDetail = item => {
    this.props.saveUserSearch(this.state.searchKeyword);
    this.props.navigator.push({
      screen: 'TemanDiabetes.FeaturedDetail',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        item
      }
    });
  };

  renderSearch() {
    const { searchResult } = this.props.dataThreads;
    if (this.state.searchKeyword === '') {
      return (
        <View style={{ flex: 2, paddingHorizontal: 10, marginVertical: 10, paddingBottom: 20 }}>
          <Text style={styles.titleElement}>Pencarian Terakhir</Text>
          <View style={{ paddingVertical: 10, marginVertical: 0 }}>
            {this.state.recentSearch.length === 0 ? (
              <Text />
            ) : (
              this.state.recentSearch.map((recent, index) => (
                <TouchableOpacity onPress={() => this.onPressHistory(recent)}>
                  <Text
                    key={index}
                    style={[styles.currentSearch, index === 1 ? { paddingVertical: 5 } : '']}
                  >
                    {recent}
                  </Text>
                </TouchableOpacity>
              ))
            )}
            {/* <Text style={[styles.currentSearch, ]}>Gula</Text>
            <Text style={styles.currentSearch}>DNurse</Text> */}
          </View>
          <Text style={[styles.titleElement, { paddingVertical: 10 }]}>Rekomendasi Untuk Anda</Text>
        </View>
      );
    } else if (searchResult.data.length === 0) {
      if (searchResult.status_code === 200) {
        return (
          <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Light', fontSize: 14 }}>
              Opppss.. Pencarian Anda tidak ditemukan.
            </Text>
          </View>
        );
      }
      return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner size="large" color="rgb(239, 67, 79)" />
        </View>
      );
    }
    return (
      <View style={{ padding: 15, flex: 1, width: '100%' }}>
        <FlatList data={searchResult.data} renderItem={item => this.toRenderItem(item)} />
      </View>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading && <Spinner color="#EF434F" size="large" />}
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 10,
            paddingHorizontal: 15,
            elevation: 8
          }}
        >
          <TextField
            value={this.state.searchKeyword}
            onChangeText={this.changesKeyword}
            autoFocus
            tintColor={color.red}
            iconLefteStyle={{ width: 30, height: 30, resizeModa: 'contain' }}
            leftIcon={searchIcon2}
            rightIcon={searchIcon}
            onPressRight={() => this.props.navigator.pop()}
            placeholder={'Cari post, pengguna'}
            underlineColorAndroid={'#fff'}
            sectionStyle={{
              marginTop: 10,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 5,
              margin: 0
            }}
            iconLeftStyle={{
              height: 20,
              width: 25
            }}
            inputStyle={{
              fontFamily: 'OpenSans-Regular',
              color: '#b6b6b6',
              fontSize: 14,
              backgroundColor: '#fff'
            }}
          />
        </View>
        {this.renderSearch()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  titleElement: {
    color: '#ccc',
    fontSize: 16,
    fontFamily: 'Montserrat-Light'
  },
  currentSearch: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Light'
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  makeBookmarkSearhedThread: (thread, index) => dispatch(makeBookmarkSearhedThread(thread, index)),
  searchThread: (keyword, threadType) => dispatch(searchThread(keyword, threadType)),
  saveUserSearch: keyword => dispatch(saveUserSearch(keyword))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSearch);
