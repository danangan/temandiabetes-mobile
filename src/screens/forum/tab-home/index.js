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
	Modal
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getCurrentUser } from '../../../actions/authAction';

import { Card, FooterThread, HeaderThread, Spinner } from '../../../components';
import { getThreads, makeBookmark } from '../../../actions/threadActions';

import ModalSearch from '../../modalSearch';

import ContentThread from './contentThread';
import searchIcon from '../../../assets/icons/close.png';
import Blood from '../../../assets/icons/explorer_icon.png';
import color from '../../../style/color';
import { authToken } from '../../../utils/constants';

class TabHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.getCurrentUser(),
			refreshing: false,
			isProses: false,
			modalVisible: false,
		};

		this.togleModal = this.togleModal.bind(this);
		this.onPostBookmark = this.onPostBookmark.bind(this);
		this.toThreadDetails = this.toThreadDetails.bind(this);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentDidMount() {
		this.getToken();
	}

	componentDidUpdate() {
		const { saveBookmark } = this.props.dataThreads;
		if (saveBookmark.status_code === 201 && this.state.isProses) {
			this.setState(
				{
					isProses: false
				},
				() => {
					Alert.alert('Success', 'Thread saved into your bookmark list!');
				}
			);
		}
	}

	onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'notification') {
				alert('NavBar', 'Edit button pressed');
			}
			if (event.id === 'sideMenu') {
				this.togleModal('TemanDiabets.ProfileScreen');
			}
		}
	}

	onPostBookmark = async thread => {
		const token = await AsyncStorage.getItem(authToken);
		this.setState(
			{
				isProses: true
			},
			() => {
				this.props.makeBookmark(thread._id, token);
			}
		);
	};

	getToken = async () => {
		const token = await AsyncStorage.getItem(authToken);
		this.props.getThreads(token);
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
				this.getToken();
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
				{this.renderButtonSearch()}
				{this.renderPostThread()}
			</View>
		);
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
						source="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
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
					/>
				</Card>
			</TouchableOpacity>
		);
	}

	renderButtonSearch() {
		return (
			<TouchableOpacity
				onPress={() => 
					this.props.navigator.push({
						screen: 'TemanDiabets.ModalSearch',
						navigatorStyle: {
							navBarHidden: true
						},
						// passProps: threads
					})
				}
				// onPress={() => this.setModalVisible(true)}
				style={styles.wrapButonSearch}
			>
				<View
					style={{
						flex: 0.2,
						alignItems: 'center',
						borderRightWidth: 0.7,
						borderRightColor: 'red',
						padding: 5
					}}
				>
					<Image source={Blood} style={{ width: 25, height: 25 }} />
				</View>
				<View style={{ flex: 2, alignItems: 'flex-start', paddingHorizontal: 5 }}>
					<Text>Cari post, pengguna</Text>
				</View>
				<View style={{ flex: 0.2, alignItems: 'center' }}>
					<Image source={searchIcon} style={{ width: 25, height: 25 }} />
				</View>
			</TouchableOpacity>
		);
	}

	setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

	renderModalSearch() {
		// return (
		// 	<Modal
		// 		animationType="slide"
    //     transparent={false}
		// 		visible={this.state.modalVisible}
		// 	>
		// 		<View>
		// 			<Text>Modal Search</Text>
		// 			<Text>Daniel Sidabutar</Text>
		// 			<TouchableOpacity
		// 				onPress={() => this.setModalVisible(false)}
		// 			>
		// 				<Text>Close</Text>
		// 			</TouchableOpacity>
		// 		</View>
		// 	</Modal>
		// );
		// return (
		// 	<ModalSearch 
		// 		// visible={this.state.modalVisible}
		// 		onClose={this.setModalVisible.bind(this)}
		// 	/>
		// );
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
				<FlatList
					ListHeaderComponent={() => this.renderHeader()}
					data={listThreads.item.data}
					renderItem={item => this.renderItem(item)}
					refreshing={this.state.refreshing}
					onRefresh={this.handleRefresh}
				/>
				{spinner}
			</View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: color.solitude
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
		paddingHorizontal: 30
	}
};

const mapStateToProps = state => ({
	dataRegister: state.registerReducer,
	dataThreads: state.threadsReducer
});

const mapDispatchToProps = dispatch => ({
	getThreads: token => dispatch(getThreads(token)),
	getCurrentUser: () => dispatch(getCurrentUser()),
	makeBookmark: (idThread, token) => dispatch(makeBookmark(idThread, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
