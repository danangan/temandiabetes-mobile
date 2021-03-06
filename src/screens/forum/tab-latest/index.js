import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Alert, Text } from 'react-native';

import Share from 'react-native-share';
import ThreadItem from '../components/threadItem';
import { Spinner, SearchButton } from '../../../components';
import { getLatestThreads, makeBookmarkLatestThreads } from '../../../actions/threadActions';
import landingPageURL from '../../../config/landingPageURL';
import color from '../../../style/color';

class TabLatest extends Component {
  static navigatorStyle = {
    topBarCollapseOnScroll: true,
    navBarHideOnScroll: true
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoadMorePage: false,
      isLoading: false
    };

    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.onPostBookmark = this.onPostBookmark.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderEmptySection = this.renderEmptySection.bind(this);
    this.onShareThread = this.onShareThread.bind(this);
  }

  componentDidMount() {
    this.props.getLatestThreads(1, true);
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

  toThreadDetails(threads) {
    this.props.navigator.push({
      screen: 'TemanDiabetes.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: threads
    });
  }

  onEndReached() {
    this.setState(
      {
        isLoadMorePage: true
      },
      () => {
        const { page, pages } = this.props.dataThreads.item;
        if (page < pages) {
          this.props.getLatestThreads(page + 1);
        }
      }
    );
  }

  renderFooter() {
    const { page, pages } = this.props.dataThreads.item;

    const Loader = (
      <View style={styles.loadMoreContent}>
        <Spinner color="#EF434F" size="large" />
      </View>
    );

    return (
      <View style={styles.loadMoreContainer}>
        {this.state.isLoadMorePage && page < pages ? Loader : <View />}
      </View>
    );
  }

  onPostBookmark = async (thread, threadIndex) => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.props.makeBookmark(thread, threadIndex);
      }
    );
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

  renderItem(threads) {
    return (
      <ThreadItem
        threads={threads}
        toThreadDetails={this.toThreadDetails}
        togleModal={this.togleModal}
        onPostBookmark={this.onPostBookmark}
        onShareThread={this.onShareThread}
      />
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
        Thread Terbaru Anda Kosong
      </Text>
    );
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
              threadType: 'latest'
            }
          });
        }}
      />
    );
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.getLatestThreads(1, true);
      }
    );
    this.setState({ refreshing: false });
  };

  render() {
    const { initialLoading } = this.props.dataThreads;
    const spinner = this.state.isLoading ? (
      <Spinner color="#EF434E" text="Menyimpan..." size="large" />
    ) : (
      <View />
    );

    return (
      <View style={styles.containerStyle} removeClippedSubviews>
        {!initialLoading && (
          <FlatList
            ListEmptyComponent={this.renderEmptySection}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            data={this.props.dataThreads.item.data}
            renderItem={item => this.renderItem(item)}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.3}
          />
        )}
        {initialLoading && (
          <View style={styles.initialLoading}>
            <Spinner color="#1a1a1a" size="large" />
          </View>
        )}
        {spinner}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude,
    paddingHorizontal: 5,
    overflow: 'hidden'
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
  dataThreads: state.threadsReducer.listLatestThreads,
  saveBookmark: state.threadsReducer.saveBookmark
});

const mapDispatchToProps = dispatch => ({
  getLatestThreads: (page, isRefresh) => dispatch(getLatestThreads(page, isRefresh)),
  makeBookmark: (thread, threadIndex) => dispatch(makeBookmarkLatestThreads(thread, threadIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabLatest);
