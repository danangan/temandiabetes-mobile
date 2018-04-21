/**
 * LIKE A drawer open 
 */
import React from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { onSignOut } from '../../actions/loginActions';
import { Avatar, Spinner } from '../../components';
import { authToken, DEFAULT_PROFILE_IMAGE } from '../../utils/constants';

class ProfileScreen extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	componentDidMount() {
		this.getToken();
	}

	componentDidUpdate() {
		const self = this;
		if (this.props.dataLogin.statusCode === 400 && this.state.isLoading) {
			setTimeout(() => {
				self.setState({ isLoading: false }, () => {
					this.props.navigator.resetTo({
						screen: 'TemanDiabets.OnBoardingScreen',
						animated: true,
						animationType: 'fade',
						navigatorStyle: {
							navBarHidden: true
						}
					});
				});
			}, 1000);
		}
	}

	onDismissModal = () => {
		this.props.navigator.dismissAllModals({
			animationType: 'none'
		});
	};

	onSignOut = () => this.setState({ isLoading: true }, () => this.props.onSignOut());

	onPushScreen(screen) {
		this.props.navigator.push(
			{
				screen,
				navigatorStyle: {
					navBarHidden: true
				}
			},
			() =>
				this.props.navigator.dismissAllModals({
					animationType: 'none'
				})
		);
	}

	getToken = async () => {
		const token = await AsyncStorage.getItem(authToken);
		console.log('TOKEN -> ', token);
	}

	handlePush(screen) {
		this.props.navigator.push(
			{
				screen,
				navigatorStyle: {
					navBarHidden: true
				}
			},
			() =>
				this.props.navigator.dismissAllModals({
					animationType: 'none'
				})
		);
	}

	render() {
		const { nama, tipe_user, foto_profile, diabetesi_tipe } = this.props.dataAuth;

		const spinner = this.state.isLoading ? (
			<Spinner color="#FFDE00" text="Logout..." size="large" />
		) : (
			<View />
		);

		return (
			<View style={styles.container}>
				<View style={styles.wrapperTopLeft}>
					<View style={styles.itemTopLeft}>
						<TouchableOpacity onPress={this.onDismissModal}>
							<Image source={require('../../assets/icons/close.png')} style={styles.itemImage} />
						</TouchableOpacity>
					</View>
					<View style={styles.itemTopRight}>
						<View style={{ marginRight: 10 }}>
							<Text style={styles.buttonText}>{ nama || 'John Doe' }</Text>
							<Text style={styles.userDesc}>{ tipe_user === 'diabetesi' ? diabetesi_tipe || tipe_user : tipe_user || 'Tipe User' }</Text>
						</View>
						<Avatar
							avatarSize="Small"
							imageSource={ foto_profile || DEFAULT_PROFILE_IMAGE }
						/>
					</View>
				</View>
				<View style={styles.wrappCenter}>
					<TouchableOpacity>
						<Text style={styles.buttonText}>HOME</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.onPushScreen('TemanDiabets.ProfileDetails')}>
						<Text style={styles.buttonText}>PROFIL</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.onPushScreen('TemanDiabets.AboutScreen')}>
						<Text style={styles.buttonText}>TENTANG</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.onPushScreen('TemanDiabets.FaqScreen')}>
						<Text style={styles.buttonText}>FAQ</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => null}
					>
						<Text style={styles.buttonText}>NOTIFIKASI</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text style={styles.buttonText}>AJAK TEMAN</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.wrappFooter}>
					<TouchableOpacity
						onPress={() => this.onPushScreen('TemanDiabets.ProfileSettings')}
					>
						<Image source={require('../../assets/icons/setting.png')} style={styles.itemImage} />
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onSignOut}>
						<Image source={require('../../assets/icons/logout.png')} style={styles.itemImage} />
					</TouchableOpacity>
				</View>
				{spinner}
			</View>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 30,
		paddingBottom: 15,
		paddingHorizontal: 25
	},
	wrapperTopLeft: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	itemTopLeft: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	itemTopRight: {
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-start'
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Montserrat-Light',
		color: '#000'
	},
	itemImage: { width: 25, height: 25 },
	userDesc: {
		fontSize: 10,
		alignSelf: 'flex-end'
	},
	wrappCenter: {
		flex: 5,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	wrappFooter: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'row',
		alignItems: 'center'
	}
};

const mapStateToProps = state => ({
	dataAuth: state.authReducer.currentUser,
	dataLogin: state.loginReducer,
	dataThreads: state.threadsReducer,
});

const mapDispatchToProps = dispatch => ({
	onSignOut: () => dispatch(onSignOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
