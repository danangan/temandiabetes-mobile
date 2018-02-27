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
import imageBackground from '../../../assets/images/massukkan_email_anda.jpg';

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
		} else {
			this.setState({
				message: 'Masukan email Anda'
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground style={styles.imageBackground} source={imageBackground}>
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
							source={{
								uri:
									'https://www.materialui.co/materialIcons/navigation/arrow_back_grey_192x192.png'
							}}
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
								onChangeText={email => this.setState({ email })}
								underlineColorAndroid={'#fff'}
								style={[styles.textInputStyle, { marginBottom: 15, paddingLeft: 15 }]}
							/>
							<TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
								<Text style={styles.buttonText}>LANJUT</Text>
							</TouchableOpacity>
							<Text style={{ fontSize: 20, color: 'red' }}>{this.state.message}</Text>
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
		marginBottom: 15,
		paddingLeft: 20,
		fontFamily: 'Montserrat-Bold'
	}
};

export default RegisterScreenSecond;
