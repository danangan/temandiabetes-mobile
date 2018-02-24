import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';

class RegisterScreenSecond extends React.Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			email: null,
			message: ''
		};
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
				<View style={styles.wrapTitle}>
					<Text style={styles.titles}>Silahkan masukkan email Anda</Text>
				</View>
				<View style={styles.wrapForm}>
					<View
						style={{
							height: '70%',
							justifyContent: 'flex-end'
						}}
					>
						<TextInput
							placeholder={'daniel@gmail.com'}
							onChangeText={email => this.setState({ email })}
							underlineColorAndroid={'#fff'}
							style={[styles.textInputStyle, { marginBottom: 15 }]}
						/>
						<TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
						<Text style={{ fontSize: 20, color: 'red' }}>{this.state.message}</Text>
					</View>
					<View style={styles.indicatorWrapper}>
						<Indicator persentase={{ width: '40%' }} />
					</View>
				</View>
			</View>
		);
	}
}

export default RegisterScreenSecond;
