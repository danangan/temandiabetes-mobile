import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import Share from 'react-native-share';

import { Spinner, SearchButton } from '../../../components';
import { getThreads, makeBookmark } from '../../../actions/threadActions';

import ThreadItem from '../components/threadItem';
import color from '../../../style/color';
import landingPageURL from '../../../config/landingPageURL';

class TabHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isProses: false,
      isLoadMorePage: false
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEmptySection = this.renderEmptySection.bind(this);
    this.onPostBookmark = this.onPostBookmark.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.onShareThread = this.onShareThread.bind(this);
  }

  componentDidMount() {
    if (this.props.dataThreads.listThreads.initialLoading) {
      this.props.getThreads();
    }
  }

  componentWillReceiveProps({ dataThreads: { saveBookmark } }) {
    if (
      (saveBookmark.status_code === 201 || saveBookmark.status_code === 200) &&
      this.state.isProses
    ) {
      this.setState(
        {
          isProses: false
        },
        () => {
          Alert.alert('Success', saveBookmark.message);
        }
      );
    }
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

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.getThreads(1, true);
      }
    );
    this.setState({
      refreshing: false
    });
  };

  renderPostThread() {
    // ModalPostThread
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigator.push({
            screen: 'TemanDiabetes.ModalPostThread',
            navigatorStyle: {
              tabBarHidden: true
            }
          })
        }
        style={styles.wrapPostThread}
      >
        <Text
          style={{
            fontSize: 16
          }}
        >
          Tanya atau bagikan disini
        </Text>
      </TouchableOpacity>
    );
  }

  renderHeader() {
    return (
      <View>
        <SearchButton
          onPress={() => {
            this.props.navigator.push({
              screen: 'TemanDiabetes.ModalSearch',
              navigatorStyle: {
                tabBarHidden: true
              },
              passProps: {
                threadType: 'home'
              }
            });
          }}
        />
        {this.renderPostThread()}
      </View>
    );
  }

  renderFooter() {
    const { page, pages } = this.props.dataThreads.listThreads.item;

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

  onEndReached() {
    this.setState(
      {
        isLoadMorePage: true
      },
      () => {
        const { page, pages } = this.props.dataThreads.listThreads.item;
        if (page < pages) {
          this.props.getThreads(page + 1);
        }
      }
    );
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

  toThreadDetails(threads) {
    this.props.navigator.push({
      screen: 'TemanDiabetes.ThreadDetails',
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: threads
    });
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

  renderItem(threads) {
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
    const { listThreads } = this.props.dataThreads;
    const spinner = this.state.isProses ? (
      <Spinner color="#EF434F" text="Menyimpan" size="large" />
    ) : (
      <View />
    );

    return (
      <View style={styles.containerStyle}>
        {!listThreads.initialLoading && (
          <FlatList
            ListEmptyComponent={this.renderEmptySection}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            data={listThreads.item.data}
            renderItem={item => this.renderItem(item)}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
          />
        )}
        {listThreads.initialLoading && (
          <View style={styles.initialLoading}>
            <ActivityIndicator color="rgb(239, 67, 79)" size="large" />
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
    paddingHorizontal: 5
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
    marginVertical: 12,
    paddingHorizontal: 30
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
  dataRegister: state.registerReducer,
  dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
  getThreads: (page, isRefresh) => dispatch(getThreads(page, isRefresh)),
  makeBookmark: (thread, threadIndex) => dispatch(makeBookmark(thread, threadIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabHome);
