import React, { Component } from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';

import { ButtonFacebook, ButtonGoogle, Button } from '../../components/';
import Form from './Form';
import Style from '../../style/defaultStyle';
import color from '../../style/color';

const source = 'http://www.dexa-medica.com/sites/default/files/DDC-banner.jpg';
const sourceLogo = require('../../assets/icons/logo.png');

export default class Login extends Component {
	render() {
		return (
			<ImageBackground source={{ uri: source }} style={styles.containerStyle}>
				<View style={styles.contentStyle}>
					<View style={styles.contentTopStyle}>
						<Image source={sourceLogo} style={styles.logoStyle} />
					</View>
					<View style={styles.contentCenterStyle}>
						<Form />
						<Button buttonStyle={styles.buttonStyle}>MASUK</Button>
					</View>
					<View style={styles.contentBottomStyle}>
						<ButtonFacebook
							onPress={() => null} text="Masuk dengan Facebook"
							containerStyle={{ margin: 10 }}
						/>
						<ButtonGoogle onPress={() => null} text="Masuk dengan Google" />
						<Text style={styles.textLink}>BUAT AKUN</Text>
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
		width: Style.DEVICE_WIDTH,
		height: 70,
		backgroundColor: 'red'
	},
	textLink: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE,
		color: color.gray,
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	buttonStyle: {
		height: 60,
		marginLeft: 25,
		marginRight: 25
	}
};

