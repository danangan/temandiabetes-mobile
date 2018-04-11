import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TabVideo extends Component {
	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'notification') {
				alert('NavBar', 'Edit button pressed');
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
	
	render() {
		return (
			<View>
				<Text>VIDEO</Text>
			</View>
		);
	}
}

export default TabVideo;
