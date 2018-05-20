import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Platform, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Card, FooterThread, HeaderThread, SearchButton, Spinner } from '../../../components';
import { getBookmarkedThreads, makeBookmarkFeaturedThreads } from '../../../actions/threadActions';
import { result } from '../../../utils/helpers';
import ContentThread from './contentThread';
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
      isLoading: false
    };

		this.togleModal = this.togleModal.bind(this);
		this.onPostBookmark = this.onPostBookmark.bind(this);
    this.toThreadDetails = this.toThreadDetails.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    this.props.getBookmarkedThreads()
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
				isLoading: true
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

	toThreadDetails(threads) {
		this.props.navigator.push({
			screen: 'TemanDiabets.ThreadDetails',
			navigatorStyle: {
				navBarHidden: true
			},
			passProps: {
        item: threads
      }
		});
  }

	handleRefresh = () => {
		this.setState(
			{
				refreshing: true
			},
			() => {
        this.props.getBookmarkedThreads()
			}
		);
		this.setState({
			refreshing: false
		});
	}

	renderItem (threads) {
    const author = result(threads.item, 'author')
    const comments = result(threads.item, 'comments', [])
    let foto_profile = ''
    let nama = ''
    let tipe_user = ''
    if (author !== null && typeof author === 'object') {
      foto_profile = author.foto_profile;
      nama = author.nama
      tipe_user = author.tipe_user
    }
		return (
			<TouchableOpacity
				key={threads.index}
				onPress={() => this.toThreadDetails(threads.item)}
			>
				<Card containerStyle={styles.cardStyle}>
					<HeaderThread
						source={foto_profile}
						name={nama}
						category={tipe_user.toUpperCase()}
					/>
					<ContentThread property={threads.item} />
					<FooterThread
						leftAction={() => this.toThreadDetails(threads.item)}
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
                navBarHidden: true
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

	render() {
		return (
			<View style={styles.containerStyle}>
        <FlatList
					ListHeaderComponent={this.renderHeader}
          data={this.props.dataThreads.item.data}
          renderItem={item => this.renderItem(item)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
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
	}
};


const mapStateToProps = state => ({
  dataThreads: state.threadsReducer.listBookmarkedThreads,
  saveBookmark: state.threadsReducer.saveBookmark
});

const mapDispatchToProps = dispatch => ({
	getBookmarkedThreads: () => dispatch(getBookmarkedThreads()),
	makeBookmark: (thread, threadIndex) => dispatch(makeBookmarkFeaturedThreads(thread, threadIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabBookmark);
