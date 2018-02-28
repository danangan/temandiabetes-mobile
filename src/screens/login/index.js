import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import Config from 'react-native-config';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import axios from 'axios';

import { ButtonFacebook, ButtonGoogle, Button } from '../../components/';
import Form from './Form';
import BorderLine from './BorderLine';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import logo from '../../assets/icons/logo.png';
import image from '../../assets/images/background_login.jpg';
import { loginManual } from '../../actions/loginActions';
import { API_SIGN_IN } from '../../utils/API';
import { mainApp } from '../../../App';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			idToken: null,
			currentUser: null,
			errorHandler: null
		};
	}

	componentDidMount() {
		this.setupGoogleSignIn();
	}

	onChangeTextHandlerEmail = e => this.setState({ email: e });
	onChangeTextHandlerPass = pass => this.setState({ password: pass });

	onLogin = async () => {
		const user = {
			email: this.state.email,
			password: this.state.password
		};

		try {
			const response = await axios.post(API_SIGN_IN, user);
			if (response.data.message === 'login success') {
				mainApp();
			}
		} catch (error) {
			console.log(error);
		}
		// loginManual(user);
	};

	onGoogleSignIn = async () => {
		try {
			const data = await GoogleSignin.signIn();
			const credential = firebase.auth.GoogleAuthProvider.credential(
				data.idToken,
				data.accessToken
			);

			const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
			const idToken = await firebase.auth().currentUser.getIdToken(true);

			this.setState({ currentUser: currentUser.user, idToken });

			if (!currentUser.additionalUserInfo.isNewUser) {
				mainApp();
			} else {
				this.props.navigator.push({
					screen: 'TemanDiabets.RegisterScreenFourth',
					passProps: {
						name: currentUser.user.displayName,
						email: currentUser.user.email
					}
				});
			}
		} catch (error) {
			if (error) throw error;
		}
	};

	onSignOut = () =>
		GoogleSignin.revokeAccess()
			.then(() => GoogleSignin.signOut())
			.then(() => this.setState({ user: null }))
			.done();

	setupGoogleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices({ autoResolve: true });
			await GoogleSignin.configure({
				webClientId: Config.ANDROID_GOOGLE_CLIENT_ID,
				iosClientId: Config.IOS_GOOGLE_CLIENT_ID,
				offlineAccess: false
			});
		} catch (err) {
			if (err) throw err.message;
		}
	};

	createAccount = () => {
		this.props.navigator.push({
			screen: 'TemanDiabets.RegisterScreen',
			animated: true,
			animationType: 'fade'
		});
	};

	handleNavigation = () => {
		this.props.navigator.push({
			screen: 'TemanDiabets.RegisterScreenFourth',
			passProps: {}
		});
	};

	render() {
		return (
			<ImageBackground source={image} style={styles.containerStyle}>
				<View style={styles.contentStyle}>
					<View style={styles.contentTopStyle}>
						<Image source={logo} style={styles.logoStyle} />
					</View>
					<KeyboardAvoidingView behavior="padding">
						<View style={styles.contentCenterStyle}>
							<Form
								onValue={{ email: this.state.email, pass: this.state.password }}
								onChangeTextHandlerEmail={this.onChangeTextHandlerEmail}
								onChangeTextHandlerPass={this.onChangeTextHandlerPass}
							/>
							<Button buttonStyle={styles.buttonStyle} onPress={() => this.onLogin()}>
								MASUK
							</Button>
							<BorderLine />
						</View>
					</KeyboardAvoidingView>
					<View style={styles.contentBottomStyle}>
						<ButtonFacebook
							onPress={() => null}
							text="Masuk dengan Facebook"
							containerStyle={styles.buttonSocialStyle}
							textStyle={styles.buttonSocialTextStyle}
						/>
						<ButtonGoogle
							onPress={() => this.onGoogleSignIn()}
							text="Masuk dengan Google"
							textStyle={styles.buttonSocialTextStyle}
						/>
						<Text style={styles.textLink} onPress={() => this.createAccount()}>
							BUAT AKUN
						</Text>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1
	},
	contentStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	contentCenterStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	contentBottomStyle: {
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	logoStyle: {
		width: Style.DEVICE_WIDTH - 80,
		height: Style.DEVICE_WIDTH / 8.5,
		alignSelf: 'center',
		marginTop: 40
	},
	textLink: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE,
		color: color.gray,
		fontWeight: 'bold',
		alignSelf: 'center',
		marginTop: 30
	},
	buttonStyle: {
		height: 55,
		marginLeft: 35,
		marginRight: 35
	},
	buttonSocialStyle: {
		margin: 10
	},
	buttonSocialTextStyle: {
		fontSize: Style.FONT_SIZE,
		paddingTop: 2
	}
};

const mapStateToProps = state => ({
	userLogin: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
	loginManual: user => dispatch(loginManual(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
