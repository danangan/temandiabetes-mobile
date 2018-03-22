import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { authToken } from '../../../utils/constants';

class TabInputTracker extends Component {
	componentDidMount() {
		// AsyncStorage.removeItem(authToken);
		// this.getToken();
	}

	getToken = async () => {
		const token = await AsyncStorage.getItem(authToken);
		// console.log('Token: ', token);
	}

	render() {
		return (
			<View>
				<Text>VIDEO</Text>
			</View>
		);
	}
}

export default TabInputTracker;
