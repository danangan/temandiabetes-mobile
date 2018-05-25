import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ImageBackground,
	Image,
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import Style from '../../../style/defaultStyle';

class RegisterScreenSecond extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			email: null,
			message: '',
			keyboardActive: false
		};
		this.handleNavigation = this.handleNavigation.bind(this);
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			this.setState({ keyboardActive: true });
		});
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			this.setState({ keyboardActive: false });
		});
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	handleNavigation() {
		const { email } = this.state;
		if (email !== null) {
			const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			const shouldTrue = emailRegex.test(email);
			if (!shouldTrue) {
				this.setState({
					message: 'Email yang Anda masukkan tidak valid!',
					keyboardActive: false
				});
			} else {
				this.props.navigator.push({
					screen: 'TemanDiabets.RegisterScreenThird',
					title: 'Next Step 3',
					passProps: {
						name: this.props.name,
						email: this.state.email
					}
				});
				this.setState({
					message: ''
				});
			}
		} else {
			this.setState({
				message: 'Masukan email Anda'
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.imageBackground}
					source={require('../../../assets/images/email.png')}
				>
					<TouchableOpacity
						style={{
							flex: 0,
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							alignSelf: 'flex-start'
						}}
						onPress={() => this.props.navigator.pop()}
					>
						<Image
							resizeMode={'contain'}
							style={{ width: 30, height: 30, margin: 10 }}
							source={require('../../../assets/icons/back_white.png')}
						/>
					</TouchableOpacity>
					<View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
						<Text style={styles.titles}>Silahkan masukkan email Anda</Text>
					</View>
					<View style={styles.wrapForm}>
						<View
							style={[
								stylesLocal.containerForm,
								{ flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
							]}
						>
							<TextInput
								placeholder={'example@email.com'}
								value={this.state.email}
								onChangeText={email => this.setState({ email })}
								underlineColorAndroid={'#fff'}
								style={[styles.textInputStyle, stylesLocal.inputStyle]}
							/>
							<TouchableOpacity style={styles.btnNext} onPress={this.handleNavigation}>
								<Text style={styles.buttonText}>LANJUT</Text>
							</TouchableOpacity>
							<Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: 'red' }}>{this.state.message}</Text>
						</View>
						<View style={styles.indicatorWrapper}>
							<Indicator persentase={{ width: '40%' }} />
						</View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const stylesLocal = {
	containerForm: {
		height: '70%'
	},
	inputStyle: {
		fontSize: Style.FONT_SIZE * 1.2,
		marginBottom: 15,
		paddingLeft: 20,
		fontFamily: 'Montserrat-Regular'
	}
};

export default RegisterScreenSecond;
