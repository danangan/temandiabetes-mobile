import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from './style';

export default class OnBoardingScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>ON BOARDING</Text>
			</View>
		);
	}
}
