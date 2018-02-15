import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import {Input} from '../../components/input/Input';

import { Indicator } from '../../components/indicator/Indicator';

import styles from './style';

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	static navigatorStyle = {
		navBarHidden: true
	}


	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Siapakan nama Anda?</Text>
				</View>
				<View style={ styles.wrapForm }>
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
							style={ [styles.textInputStyle, {marginBottom: 15, paddingLeft: 20}] } />
						<TouchableOpacity
							style={ styles.btnNext }
							onPress={() => this.props.navigator.push({
								screen: 'TemanDiabets.RegisterScreenSecond',
	  						title: 'Next Step 2'
							})}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View style={ styles.indicatorWrapper }>
						<Indicator
							persentase={{ width: '30%' }}
						/>
					</View>
				</View>

			</View>
		);
	}
}
