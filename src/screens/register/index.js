import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Indicator } from '../../components/indicator/Indicator';
import styles from './style';

import { registerStepOne } from '../../actions';

class Register extends Component {
	static navigatorStyle = {
		navBarHidden: true
	};

	constructor(props) {
		super(props);
		this.state = {
			name: null,
			message: ''
		};
	}

	handleNavigation() {
		const { name } = this.state;
		if (name !== null) {
			this.props.navigator.push({
				screen: 'TemanDiabets.RegisterScreenSecond',
				title: 'Next Step 2',
				passProps: {
					name: this.state.name
				}
			});
			this.setState({
				message: '', name: null
			});
		} else {
			this.setState({
				message: 'Masukkan nama Anda'
			});
		}
	}

	render() {
		console.log('NAMA SEKARANG ', this.state.name);
		return (
			<View style={styles.container}>
				<View style={styles.wrapTitle}>
					<Text style={styles.titles}>Siapakan nama Anda?</Text>
				</View>
				<View style={styles.wrapForm}>
					<View style={stylesLocal.containerForm}>
						<TextInput
							placeholder={'Your Fullname'}
							underlineColorAndroid={'#fff'}
							onChangeText={name => this.setState({ name })}
							style={[styles.textInputStyle, stylesLocal.inputStyle]}
						/>
						<TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
						<Text style={{ fontSize: 20, color: 'red' }}>{this.state.message}</Text>
					</View>
					<View style={styles.indicatorWrapper}>
						<Indicator persentase={stylesLocal.indicatorStyle} />
					</View>
				</View>
			</View>
		);
	}
}

const stylesLocal = {
	containerForm: {
		height: '70%',
		justifyContent: 'flex-end'
	},
	inputStyle: {
		marginBottom: 15,
		paddingLeft: 20
	},
	indicatorStyle: { width: '20%' }
};

const mapStateToProps = state => {
	console.log('PROPS DI REGISTER ', state);
	return { registerReducer: state.registerReducer };
};

const mapDispatchToProps = dispatch => ({
	registerStepOne: name => dispatch(registerStepOne(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
