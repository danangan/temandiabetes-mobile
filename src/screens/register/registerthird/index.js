import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';

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
			keyboardActive: false,
		};
	}

	componentWillMount(){
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
		  this.setState({keyboardActive: true})
		});
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
		  this.setState({keyboardActive: false})
		});
	}

	componentWillUnmount () {
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
		} else {
			this.setState({
				message: 'Silahkan lengkapi semua isian'
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
					<Text style={styles.titles}>Masukkan kata sandi Anda</Text>
				</View>
				<View style={styles.wrapForm}>
					<View
						style={[stylesLocal.containerForm, 
							{flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end'}]}
					>
						<TextInput
							placeholder={'*********'}
							underlineColorAndroid={'#fff'}
							secureTextEntry
							onChangeText={password => this.setState({ password })}
							style={[styles.textInputStyle, { marginBottom: 15 }]}
						/>
						<TextInput
							placeholder={'*********'}
							underlineColorAndroid={'#fff'}
							secureTextEntry
							onChangeText={confirmPassword => this.setState({ confirmPassword })}
							style={[styles.textInputStyle, { marginBottom: 15 }]}
						/>
						<TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
						<Text style={{ fontSize: 20, color: 'red' }}>{this.state.message}</Text>
					</View>
					<View style={styles.indicatorWrapper}>
						<Indicator persentase={{ width: '60%' }} />
					</View>
				</View>
			</View>
		);
	}
}

const stylesLocal = {
	containerForm: {
		height: '70%',
	},
	inputStyle: {
		marginBottom: 15,
		paddingLeft: 20
	},
}

export default RegisterScreenThird;
