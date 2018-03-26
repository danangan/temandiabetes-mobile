import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View,
	Platform, 
	TouchableOpacity, 
	FlatList, 
	TextInput, 
	Text, 
	Image, 
	AsyncStorage 
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { Card, FooterThread, HeaderThread } from '../../../components';
import { getThreads } from '../../../actions/threadActions';

import ContentThread from './contentThread';
import searchIcon from '../../../assets/icons/close.png';
import Blood from '../../../assets/icons/explorer_icon.png';
import color from '../../../style/color';
import { authToken } from '../../../utils/constants';

class TabHome extends Component {
	static navigatorStyle = {
		topBarCollapseOnScroll: true,
		navBarHideOnScroll: true
	};

	constructor(props) {
		super(props);
		this.state = {
			nums: [1, 2, 3, 4, 5],
			refreshing: false,
		};

		this.togleModal = this.togleModal.bind(this);
	}

	togleModal(params, threadItem) {
		const { _id } = threadItem;
		// console.log("APA INI THREAD IE ... ", threadItem._id);
		Navigation.showModal({
			screen: params,
			title: 'Modal',
			navigatorButtons: {
				leftButtons: [
					{}
				]
			},
			passProps: {
				idThread: _id
			},
			animationType: 'slide-up'
		});
	}

	renderPostThread() {
		return (
			<View style={styles.wrapPostThread}>
				<TextInput
					onFocus={() => this.togleModal('TemanDiabets.ModalPostThread')}
					style={{
						fontSize: 16,
						height: 70
					}}
					placeholder="Tanya atau bagikan disini"
					underlineColorAndroid="rgba(0,0,0,0)"
				/>
			</View>
		);
	}

	renderHeader() {
		return (
			<View>
				{
					this.renderButtonSearch()
				}
				{
					this.renderPostThread()
				}
			</View>
		);
	}
	
	renderItem(threads) {
		const { author } = threads.item;
		return (
			<TouchableOpacity
				key={threads.index}
				onPress={() =>
					this.props.navigator.push({
						screen: 'TemanDiabets.ThreadDetails',
						navigatorStyle: {
							navBarHidden: true,
						},
						passProps: threads
					})
				}
			>
				<Card containerStyle={styles.cardStyle}>
					<HeaderThread
						source="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
						name={author.nama}
						category={author.tipe_user.toUpperCase()}
					/>
					<ContentThread property={threads.item} />
					<FooterThread 
						numOfComments={17} 
						isOpen={this.togleModal}
						threadItem={threads.item}
					/>
				</Card>
			</TouchableOpacity>
		);
	}

	getToken = async () => {
		const token = await AsyncStorage.getItem(authToken);
		this.props.getThreads(token);
		// console.log('tokens.. ', token);
	}

	componentDidMount() {
		this.getToken();
	}

	handleRefresh = () => {
		this.setState({
      refreshing: true,
    }, () => {
      this.getToken();
    });
    this.setState({
			refreshing: false
		});
	}

	renderButtonSearch() {
		return (
			<TouchableOpacity 
				onPress={() => this.togleModal('TemanDiabets.ModalSearch')}
				style={styles.wrapButonSearch}
			>
				<View style={{ flex: 0.2, alignItems: 'center', borderRightWidth: 0.7, borderRightColor: 'red', padding: 5 }}>
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

	render() {
		const { listThreads } = this.props.dataThreads;
		return (
			<View style={styles.containerStyle}>
				<FlatList
					ListHeaderComponent={() => this.renderHeader()}
					data={listThreads.item.data}
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
		justifyContent: 'space-around', 
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
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		marginHorizontal: 5,
		elevation: 2.5,
		height: 70,
		marginVertical: 10,
		paddingHorizontal: 30,
	}
};

const mapStateToProps = state => ({
	dataRegister: state.registerReducer,
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
	getThreads: (token) => dispatch(getThreads(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabHome);
