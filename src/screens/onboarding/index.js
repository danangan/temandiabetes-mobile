import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';

import Screen from './Screen';
import { onBoarding } from '../../actions';

class OnBoardingScreen extends Component {
	componentDidMount() {
		StatusBar.setHidden(true);
		this.props.onBoarding();
	}

	render() {
		return <Screen navigation={this.props.navigator} />;
	}
}

const mapDispatchToProps = dispatch => ({
	onBoarding: () => dispatch(onBoarding())
});

export default connect(null, mapDispatchToProps)(OnBoardingScreen);
