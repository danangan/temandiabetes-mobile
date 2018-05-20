import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Platform,
	TouchableOpacity,
	FlatList,
	Text,
	Image,
	AsyncStorage,
	Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getCurrentUser } from '../../../actions/authAction';

import { Card, FooterThread, HeaderThread, Spinner, SearchButton } from '../../../components';
import { getThreads, makeBookmark } from '../../../actions/threadActions';

import ContentThread from './contentThread';
import color from '../../../style/color';
import { authToken } from '../../../utils/constants';

class TabHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.getCurrentUser(),
			refreshing: false,
			isProses: false,
      isLoadMorePage: false
		};

    this.renderHeader = this.renderHeader.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
		this.togleModal = this.togleModal.bind(this)
    this.onPostBookmark = this.onPostBookmark.bind(this)
    this.onEndReached = this.onEndReached.bind(this)
		this.toThreadDetails = this.toThreadDetails.bind(this)
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}

	componentDidMount() {
    this.props.getThreads()
	}

	componentDidUpdate() {
		const { saveBookmark } = this.props.dataThreads;
		if ((saveBookmark.status_code === 201 || saveBookmark.status_code === 200) && this.state.isProses) {
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

	onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'notification') {
				this.props.navigator.push({
					screen: 'TemanDiabets.Notification',
					navigatorStyle: {
						navBarHidden: true
					},
				});
			}
			if (event.id === 'sideMenu') {
				this.togleModal('TemanDiabets.ProfileScreen');
			}
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

	togleModal(params, threadItem) {
		Navigation.showModal({
			screen: params,
			title: 'Modal',
			navigatorButtons: {
				leftButtons: [{}]
			},
			passProps: {
				idThread: threadItem === undefined ? null : threadItem._id
			},
			animationType: 'none'
		});
	}

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
	}

	renderPostThread() {
		// ModalPostThread
		return (
			<TouchableOpacity
				onPress={() => this.togleModal('TemanDiabets.ModalPostThread')}
				style={styles.wrapPostThread}
			>
				<Text
				style={{
					fontSize: 16,
				}}
				>
				Tanya atau bagikan disini</Text>
			</TouchableOpacity>
		);
	}

	renderHeader() {
		return (
      <View>
        <SearchButton
          onPress={() => {
              this.props.navigator.push({
                screen: 'TemanDiabets.ModalSearch',
                navigatorStyle: {
                  navBarHidden: true
                },
                passProps: {
                  threadType: 'home'
                }
              })
            }
          }
        />
				{this.renderPostThread()}
			</View>
		);
  }

  renderFooter() {
    const { page, pages } = this.props.dataThreads.listThreads.item

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

  onEndReached() {
    this.setState({
      isLoadMorePage: true
    }, () => {
      const { page, pages } = this.props.dataThreads.listThreads.item

      if (page < pages) {
        this.props.getThreads(page + 1);
      }
    })
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
					/>
				</Card>
			</TouchableOpacity>
		);
	}

	render() {
		const { listThreads } = this.props.dataThreads;
		const spinner = this.state.isProses ? (
			<Spinner color="#FFDE00" text="Saving..." size="large" />
		) : (
			<View />
		);

		return (
      <View style={styles.containerStyle}>
        {
          listThreads.item.data.length > 0 &&
          <FlatList
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            data={listThreads.item.data}
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
    flex: 1,
    backgroundColor: color.solitude,
    paddingHorizontal: 5,
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
    marginBottom: 70,
    marginTop: 10,
    justifyContent: 'center',
  },
  loadMoreContent: {
    height: 25
  }
};

const mapStateToProps = state => ({
	dataRegister: state.registerReducer,
	dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
	getThreads: (page) => dispatch(getThreads(page)),
	getCurrentUser: () => dispatch(getCurrentUser()),
	makeBookmark: (thread, threadIndex) => dispatch(makeBookmark(thread, threadIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
