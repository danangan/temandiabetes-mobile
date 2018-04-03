import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { authToken } from '../../../utils/constants';

class TabInputTracker extends Component {
	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentDidMount() {
		// AsyncStorage.removeItem(authToken);
		// this.getToken();
	}

	onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'notification') {
				alert('NavBar', 'Edit button pressed');
			}
			if (event.id === 'sideMenu') {
				alert('NavBar', 'Add button pressed');
			}
		}
	}

	getToken = async () => {
		const token = await AsyncStorage.getItem(authToken);
		// console.log('Token: ', token);
	};

	render() {
		return (
			<View>
				<Text>VIDEO</Text>
			</View>
		);
	}
}

export default TabInputTracker;
