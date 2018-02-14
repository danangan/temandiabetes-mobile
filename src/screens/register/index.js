import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Input} from '../../components/input/Input';

import styles from './style';

export default class Register extends Component {

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.wrapTitle }>
					<Text style={ styles.titles }>Siapakan nama Anda?</Text>
				</View>
				<View style={ styles.wrapForm }>
					<View style={{ borderColor: '#000',
					borderWidth: 1.5, }}>
						<TextInput
								{...this.props}
							placeholder={'Your Fullname'}
							style={ [styles.textInputStyle, {marginBottom: 20}] } />
						<TouchableOpacity
							style={ styles.btnNext }
							onPress={() => this.props.navigator.push({
								screen: 'TemanDiabets.RegisterScreenSecond',
	  						title: 'Next Step 2'
							})}>
							<Text style={{ color: '#fff' }}>LANJUT</Text>
						</TouchableOpacity>
					</View>
					<View style={{
						borderColor: '#000',
						borderWidth: 1.5,
						marginVertical: 20,
						height: 20,
					  }}>
						<Text>Indicator</Text>
					</View>
				</View>
			</View>
		);
	}
}
