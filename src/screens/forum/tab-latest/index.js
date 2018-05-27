import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';

import Share from 'react-native-share';
import { Card, FooterThread, HeaderThread, Spinner, SearchButton } from '../../../components';
import { getLatestThreads, makeBookmarkLatestThreads } from '../../../actions/threadActions';
import ContentThread from './contentThread';
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

    this.renderFooter = this.renderFooter.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
    this.toThreadDetails = this.toThreadDetails.bind(this)
    this.onPostBookmark = this.onPostBookmark.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.onShareThread = this.onShareThread.bind(this)
	}

  componentDidMount() {
    this.props.getLatestThreads()
  }

  componentDidUpdate() {
    const { saveBookmark } = this.props;
		if ((saveBookmark.status_code === 201 || saveBookmark.status_code === 200) && this.state.isLoading) {
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
			screen: 'TemanDiabets.ThreadDetails',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: threads
		});
	}

  onEndReached() {
    this.setState({
      isLoadMorePage: true
    }, () => {
      const { page, pages } = this.props.dataThreads.item

      if (page < pages) {
        this.props.getLatestThreads(page + 1);
      }
    })
  }

  renderFooter() {
    const { page, pages } = this.props.dataThreads.item

    const Loader = (
      <View style={styles.loadMoreContent}>
        <ActivityIndicator color='#EF434F' size={25} />
      </View>
    )

    return (
      <View style={styles.loadMoreContainer}>
       {this.state.isLoadMorePage && page < pages ?  Loader : <View/>}
      </View>
    )
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
    let options = {
      title: thread.topic,
      message: thread.topic,
      url: `https://temandiabetes.com/thread/${thread._id}`,
      subject: "Article from Teman Diabetes" //  for email
    };
    Share.open(options).catch((err) => { err && console.log(err); })
  }

	renderItem(threads) {
		const { author, comments } = threads.item;
		return (
			<TouchableOpacity
				key={threads.index}
				onPress={() => this.toThreadDetails(threads)}
			>
				<Card containerStyle={styles.cardStyle}>
					<HeaderThread
						source={author.foto_profile}
						name={author.nama}
						category={author.tipe_user.toUpperCase()}
					/>
					<ContentThread property={threads.item} />
					<FooterThread
						leftAction={() => this.toThreadDetails(threads)}
						numOfComments={comments.length === 0 ? '' : comments.length}
						isOpen={this.togleModal}
						saveBookmark={this.onPostBookmark}
						threadItem={threads.item}
            threadIndex={threads.index}
            shareThread={this.onShareThread}
					/>
				</Card>
			</TouchableOpacity>
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
              screen: 'TemanDiabets.ModalSearch',
              navigatorStyle: {
                tabBarHidden: true
              },
              passProps: {
                threadType: 'latest'
              }
            })
          }
        }
      />
    )
  }

	handleRefresh = () => {
		this.setState(
			{
				refreshing: true
			},
			() => {
        this.props.getLatestThreads(1, true)
				this.setState({ refreshing: false });
			}
		);
	};

	render() {
		const spinner = this.state.isLoading ? (
			<Spinner color="#FFDE00" text="Menyimpan..." size="large" />
		) : (
			<View />
		);
		return (
      <View style={styles.containerStyle}>
      {
        this.props.dataThreads.item.data.length > 0 &&
        <FlatList
					ListHeaderComponent={this.renderHeader}
					ListFooterComponent={this.renderFooter}
					data={this.props.dataThreads.item.data}
					renderItem={item => this.renderItem(item)}
					refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.3}
				/>
      }
			{spinner}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
    backgroundColor: color.solitude,
    paddingHorizontal: 5,
    flex: 1
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
    paddingHorizontal: 20,
  },
  loadMoreContainer: {
    marginBottom: 70,
    marginTop: 10,
    justifyContent: 'center',
  },
  loadMoreContent: {
    height: 25
  }
};

const mapStateToProps = state => ({
	dataThreads: state.threadsReducer.listLatestThreads,
	saveBookmark: state.threadsReducer.saveBookmark,
});

const mapDispatchToProps = dispatch => ({
	getLatestThreads: (page, isRefresh) => dispatch(getLatestThreads(page, isRefresh)),
	makeBookmark: (thread, threadIndex) => dispatch(makeBookmarkLatestThreads(thread, threadIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabLatest);
