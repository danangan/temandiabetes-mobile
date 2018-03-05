import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TabLatest extends Component {
	static navigatorStyle = {
		drawUnderTabBar: true,
		topBarCollapseOnScroll: true,
		navBarHideOnScroll: true
	};
	
	render() {
		return (
			<View>
				<Text>TERBARU</Text>
			</View>
		);
	}
}

export default TabLatest;
