import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {Input} from '../../components/input/Input';

export default class Register extends Component {
	static navigatorStyle = {
		navBarTranslucent: false
	};

	render() {
		return (
			<View style={{ 
				flex: 1, 
				backgroundColor: '#ccc',
				padding: 20,
				justifyContent: 'space-between',
			}}>
				<View style={{ flex: 2, justifyContent: 'center' }}>
					<Text style={{ color: '#fff', fontSize: 32, paddingRight: 50 }}>Siapakan nama anda?</Text>
				</View>
				<View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
					<TextInput 
							{...this.props}
						placeholder={'Your Fullname'}
						style={{ 
							backgroundColor: '#fff',
							color: '#ccc',
							borderColor: '#ccc', 
							marginVertical: 20,
							height: 50,
							borderWidth: 1,
							borderRadius: 5
						}} />
					<TouchableOpacity 
						style={{ 
							backgroundColor: '#ef434f', 
							alignItems: 'center',
							justifyContent: 'center',
							marginBottom: 30,
							height: 50, 
						}}
						onPress={() => alert('Jalan..')}>	
						<Text style={{ color: '#fff' }}>LANJUT</Text>
					</TouchableOpacity>
					<View style={{
						marginVertical: 30,
						height: 20, 
					  }}>
						<Text>Indicator</Text>
					</View>
				</View>
			</View>
		);
	}
}
