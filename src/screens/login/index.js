import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

import { ButtonFacebook, ButtonGoogle, Button } from '../../components/';
import Form from './Form';
import BorderLine from './BorderLine';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import logo from '../../assets/icons/logo.png';
import image from '../../assets/images/background_login.jpg';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			errorHandler: null,
			user: null
		};
	}

	componentDidMount() {
		this._setupGoogleSignin();
	}

	onChangeTextHandlerEmail = (e) => this.setState({ email: e });
	onChangeTextHandlerPass = (pass) => this.setState({ password: pass })

	_signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

	async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
				webClientId: '879115918599-nucqun2ipaibofhht410rr0hke95go1o.apps.googleusercontent.com',
				iosClientId: '879115918599-mhl2nv9cbih5qnlql1lm62rmvv93oi94.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({ user });
    } catch (err) {
      console.log("Play services error", err.code, err.message);
    }
  }


	render() {
		return (
			<ImageBackground source={image} style={styles.containerStyle}>
				<View style={styles.contentStyle}>
					<View style={styles.contentTopStyle}>
						<Image source={logo} style={styles.logoStyle} />
					</View>
					<KeyboardAvoidingView behavior='padding'>
						<View style={styles.contentCenterStyle}>
							<Form
								onValue={{ email: this.state.email, pass: this.state.password }}
								onChangeTextHandlerEmail={this.onChangeTextHandlerEmail}
								onChangeTextHandlerPass={this.onChangeTextHandlerPass}
							/>
							<Button buttonStyle={styles.buttonStyle}>MASUK</Button>
							<BorderLine />
						</View>
					</KeyboardAvoidingView>
					<View style={styles.contentBottomStyle}>
						<ButtonFacebook
							onPress={() => null} text="Masuk dengan Facebook"
							containerStyle={styles.buttonSocialStyle}
							textStyle={styles.buttonSocialTextStyle}
						/>
						{/* <ButtonGoogle
							onPress={() => null}
							text="Masuk dengan Google"
							textStyle={styles.buttonSocialTextStyle}
						/> */}
						<GoogleSigninButton
							style={{ width: 200, height: 48 }}
							// size={GoogleSigninButton.Size.Icon}
							// color={GoogleSigninButton.Color.Dark}
							onPress={() => this._signIn()}
						/>
						<Text style={styles.textLink} onPress={() => null}>
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
		marginTop: 40,
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
		margin: 10,
	},
	buttonSocialTextStyle: {
		fontSize: Style.FONT_SIZE,
		paddingTop: 2
	}
};

