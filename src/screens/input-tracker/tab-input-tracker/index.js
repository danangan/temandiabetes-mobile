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
		this.getToken();
	}

	onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'notification') {
				alert('fdf')
				this.props.navigator.push({
					screen: 'TemanDiabets.Notification',
					title: 'NOTIFICATION',
					animationType: 'none'
				});
			}
			if (event.id === 'sideMenu') {
				this.props.navigator.showModal({
					screen: 'TemanDiabets.ProfileScreen',
					title: 'Modal',
					animationType: 'none'
				});
			}
		}
	}

	getToken = async () => {
		const token = await AsyncStorage.getItem(authToken);
		console.log('Token: ', token);
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
