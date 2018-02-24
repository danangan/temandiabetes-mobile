import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

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
			message: ''
		};
	}

	handleNavigation() {
		const { password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			this.setState({
				message: 'Kata sandi Anda tidak sesuai'
			});
		} else if (password || confirmPassword !== null) {
			this.setState({
				message: 'Silahkan lengkapi semua isian'
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

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapTitle}>
					<Text style={styles.titles}>Masukkan kata sandi Anda</Text>
				</View>
				<View style={styles.wrapForm}>
					<View
						style={{
							height: '70%',
							justifyContent: 'flex-end'
						}}
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

export default RegisterScreenThird;
