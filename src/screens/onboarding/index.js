import React, { Component } from 'react';
import {
	View,
	Text,
	StatusBar,
} from 'react-native';

import styles from './style';
import Screen from './Screen';

export default class OnBoardingScreen extends Component {

	componentDidMount() {
		StatusBar.setHidden(true);
	}

	render() {
		console.log("ADA PROPS ", this.props);
		return (
			<Screen
				navigation={this.props.navigator}
			/>
		);
	}
}
