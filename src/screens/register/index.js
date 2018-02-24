import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Input } from '../../components/input/TextField';

import { Indicator } from '../../components/indicator/Indicator';

import styles from './style';

import { registerStepOne } from '../../actions';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null
		};
	}

	static navigatorStyle = {
		navBarHidden: true
	};

	handleNavigation() {
		this.props.navigator.push({
			screen: 'TemanDiabets.RegisterScreenSecond',
			title: 'Next Step 2',
			passProps: {
				name: this.state.name
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.wrapTitle}>
					<Text style={styles.titles}>Siapakan nama Anda?</Text>
				</View>
				<View style={styles.wrapForm}>
					<View
						style={{
							height: '70%',
							// borderColor: 'green',
							// borderWidth: 3,
							justifyContent: 'flex-end'
						}}
					>
						<TextInput
							placeholder={'Your Fullname'}
							underlineColorAndroid={'#fff'}
							onChangeText={name => this.setState({ name })}
							style={[styles.textInputStyle, { marginBottom: 15, paddingLeft: 20 }]}
						/>
						<TouchableOpacity style={styles.btnNext} onPress={() => this.handleNavigation()}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.indicatorWrapper}>
						<Indicator persentase={{ width: '20%' }} />
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	console.log('PROPS DI REGISTER ', state);
	return { registerReducer: state.registerReducer };
};

const mapDispatchToProps = dispatch => ({
	registerStepOne: name => dispatch(registerStepOne(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
