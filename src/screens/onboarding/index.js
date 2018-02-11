import React, { Component } from 'react';
import {
	View,
	Text,
	StatusBar,
} from 'react-native';

import styles from './style';
import Screen1 from './Screen1';

export default class OnBoardingScreen extends Component {

	componentDidMount() {
		StatusBar.setHidden(true);
	}

	render() {
		return (
			<View style={styles.container}>
				<Screen1 />
			</View>
		);
	}
}
