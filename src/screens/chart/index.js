import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Chart extends Component {
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
				alert('NavBar', 'Add button pressed');
			}
		}
	}

	render() {
		return (
			<View>
				<Text>CHART</Text>
			</View>
		);
	}
}

export default Chart;
