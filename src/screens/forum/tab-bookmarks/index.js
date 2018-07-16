import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import Share from 'react-native-share';


import ThreadItem from '../components/threadItem';
import StaticThreadItem from '../components/staticThreadItem';

import { SearchButton, Spinner } from '../../../components';
import { getBookmarkedThreads, deleteBookmarkedThread } from '../../../actions/threadActions';
import landingPageURL from '../../../config/landingPageURL';
import color from '../../../style/color';

class TabBookmark extends Component {
  static navigatorStyle = {
    topBarCollapseOnScroll: true,
    navBarHideOnScroll: true
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: false,
      isLoadMorePage: false
    };

    this.toStaticThreadDetail = this.toStaticThreadDetail.bind(this);
    this.deleteBookmarkedThread = this.deleteBookmarkedThread.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmptySection = this.renderEmptySection.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onShareThread = this.onShareThread.bind(this);
  }

  componentDidMount() {
    this.props.getBookmarkedThreads(1, true);
  }

  componentWillReceiveProps({ saveBookmark }) {
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

  deleteBookmarkedThread = async (thread, threadIndex) => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.props.makeBookmark(thread, threadIndex);
      }
    );
  };

  toThreadDetails(threads) {
    this.props.navigator.push({
      screen: 'TemanDiabetes.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        item: threads.item
      }
    });
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.getBookmarkedThreads(1, true);
      }
    );
    this.setState({
      refreshing: false
    });
  };

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

  toStaticThreadDetail = item => {
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

  renderItem(threads) {
    if (threads.item.threadType === 'static') {
      return <StaticThreadItem
        threads={threads}
        toStaticThreadDetail={this.toStaticThreadDetail}
        onPostBookmark={this.deleteBookmarkedThread}
        onShareThread={this.onShareThread}
      />
    } else {
      return (
        <ThreadItem
          threads={threads}
          toThreadDetails={this.toThreadDetails}
          onPostBookmark={this.deleteBookmarkedThread}
          onShareThread={this.onShareThread}
        />
      );
    }
  }

  renderHeader() {
    return (
      <SearchButton
        style={{
          marginBottom: 10
        }}
        onPress={() => {
          this.props.navigator.push({
            screen: 'TemanDiabetes.ModalSearch',
            navigatorStyle: {
              tabBarHidden: true
            },
            passProps: {
              threadType: 'bookmark'
            }
          });
        }}
      />
    );
  }

  renderFooter() {
    const { page, pages } = this.props.dataThreads.item;

    const Loader = (
      <View style={styles.loadMoreContent}>
        <ActivityIndicator color="#EF434F" size={25} />
      </View>
    );

    return (
      <View style={styles.loadMoreContainer}>
        {this.state.isLoadMorePage && page < pages ? Loader : <View />}
      </View>
    );
  }

  renderEmptySection() {
    return (
      <Text
        style={{
          textAlign: 'center',
          marginTop: 30,
          marginBottom: 10,
          color: '#afafaf'
        }}
      >
        Beranda Anda Kosong
      </Text>
    );
  }

  onEndReached() {
    this.setState(
      {
        isLoadMorePage: true
      },
      () => {
        let { page, pages } = this.props.dataThreads.item;
        // convert page and pages to number
        page = Number(page);
        pages = Number(pages);
        if (page < pages) {
          this.props.getBookmarkedThreads(page + 1);
        }
      }
    );
  }

  render() {
    const { initialLoading, item } = this.props.dataThreads;
    const spinner = this.state.isLoading ? (
      <Spinner color="#EF434F" text="Menyimpan..." size="large" />
    ) : (
      <View />
    );

    const content =
      this.props.dataThreads.item.data.length > 0 ? (
        <FlatList
          ListEmptyComponent={this.renderEmptySection}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          data={item.data}
          renderItem={item => this.renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignContent: 'center'
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 10,
              color: '#afafaf'
            }}
          >
            Daftar Bookmark Anda Kosong
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.getBookmarkedThreads();
            }}
            style={{
              alignSelf: 'center'
            }}
          >
            <View
              style={{
                margin: 10,
                elevation: 2,
                backgroundColor: '#fff',
                width: 100,
                borderRadius: 50
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 10,
                  color: '#afafaf'
                }}
              >
                Refresh
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    return (
      <View style={styles.containerStyle} removeClippedSubviews={true}>
        {!initialLoading && content}
        {initialLoading && (
          <View style={styles.initialLoading}>
            <ActivityIndicator color="#1a1a1a" size="large" />
          </View>
        )}
        {spinner}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: color.solitude,
    paddingHorizontal: 5,
    flex: 1,
    overflow: 'hidden'
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
    borderRadius: 5,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  loadMoreContainer: {
    justifyContent: 'center'
  },
  loadMoreContent: {
    marginVertical: 10,
    height: 25
  },
  initialLoading: {
    flex: 1,
    justifyContent: 'center'
  }
};

const mapStateToProps = state => ({
  dataThreads: state.threadsReducer.listBookmarkedThreads,
  saveBookmark: state.threadsReducer.saveBookmark
});

const mapDispatchToProps = dispatch => ({
  getBookmarkedThreads: (page, refresh) => dispatch(getBookmarkedThreads(page, refresh)),
  makeBookmark: (thread, threadIndex) => dispatch(deleteBookmarkedThread(thread, threadIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBookmark);
