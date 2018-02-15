import React, { Component } from 'react';
import { View, Image, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';

import { ButtonFacebook, ButtonGoogle, Button } from '../../components/';
import Form from './Form';
import BorderLine from './BorderLine';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import logo from '../../assets/icons/logo.png';

const source = 'http://www.dexa-medica.com/sites/default/files/DDC-banner.jpg';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			errorHandler: null
		};
	}

	onChangeTextHandlerEmail = (e) => this.setState({ email: e });
	onChangeTextHandlerPass = (pass) => this.setState({ password: pass })

	render() {
		return (
			<ImageBackground source={{ uri: source }} style={styles.containerStyle}>
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
						<ButtonGoogle
							onPress={() => null}
							text="Masuk dengan Google"
							textStyle={styles.buttonSocialTextStyle}
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

