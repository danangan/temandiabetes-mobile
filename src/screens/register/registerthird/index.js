import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ImageBackground,
	Image
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import Style from '../../../style/defaultStyle';

class RegisterScreenThird extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			password: null,
			confirmPassword: null,
			message: '',
			keyboardActive: false
		};
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
		const { password, confirmPassword } = this.state;
		if (password || confirmPassword !== null) {
			if (password !== confirmPassword) {
				this.setState({
					message: 'Kata sandi Anda tidak sesuai'
				});
			} else if (password === confirmPassword) {
				// detect length string 
				const passwordLength = password.length < 5;
				// detect 1 Uppercase
				const isOneUpperCase = /[A-Z]/.test(password);
				// detect 1 number
				const oneNumber = /\d+/.test(password);
				
				if (passwordLength || !isOneUpperCase || !oneNumber) {
					this.setState({
						message: 'Password minimal 5 karakter, 1 huruf kapital, dan 1 angka'
					});
				} else {
					this.props.navigator.push({
						screen: 'TemanDiabets.RegisterScreenFourth',
						title: 'Next Step 4',
						passProps: {
							name: this.props.name,
							email: this.props.email,
							password: this.state.password
						}
					});
					this.setState({
						message: ''
					});
				}
			}
		} else {
			this.setState({
				message: 'Silahkan lengkapi semua isian'
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style={styles.imageBackground}
					source={require('../../../assets/images/password.png')}
				>
					<TouchableOpacity
						style={{
							flex: 0,
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							alignSelf: 'flex-start',
							marginTop: this.state.keyboardActive ? 10 : 0
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
						<Text style={styles.titles}>Masukkan kata sandi Anda</Text>
					</View>
					<View style={styles.wrapForm}>
						<View
							style={[
								stylesLocal.containerForm,
								{ flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
							]}
						>
							<TextInput
								placeholder={'*********'}
								underlineColorAndroid={'#fff'}
								secureTextEntry
								onChangeText={password => this.setState({ password })}
								style={[styles.textInputStyle, stylesLocal.inputStyle]}
							/>
							<TextInput
								placeholder={'*********'}
								underlineColorAndroid={'#fff'}
								secureTextEntry
								onChangeText={confirmPassword => this.setState({ confirmPassword })}
								style={[styles.textInputStyle, stylesLocal.inputStyle]}
							/>
							<TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
								<Text style={styles.buttonText}>LANJUT</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 20, color: 'red' }}>{this.state.message}</Text>
						</View>
						<View style={styles.indicatorWrapper}>
							<Indicator persentase={{ width: '60%' }} />
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

export default RegisterScreenThird;
