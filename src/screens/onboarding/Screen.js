import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import Swipper from './Swipper';
import firstOnBoarding from '../../assets/images/onboarding_rekam.png';
import secondOnBoarding from '../../assets/images/onboarding_forum.png';
import thirdOnBoarding from '../../assets/images/onboarding_event.png';
import Style from '../../style/defaultStyle';

class Screen extends Component {
	render() {
		return (
			<Swipper navigation={this.props.navigation}>
				{/* First screen */}
				<ImageBackground style={styles.imageBackgroundStyle} source={firstOnBoarding}>
					<Text style={styles.headerStyle}>Rekam Data{'\n'}Anda</Text>
					<Text style={styles.textStyle}>
						Pantau gula darah secara instan menggunakan glukometer langsung dari gadget Anda.
					</Text>
				</ImageBackground>
				{/* First screen */}
				<ImageBackground style={styles.imageBackgroundStyle} source={secondOnBoarding}>
					<Text style={styles.headerStyle}>Forum</Text>
					<Text style={styles.textStyle}>Konsultasikan kesehatan Anda dengan ahlinya</Text>
				</ImageBackground>
				{/* Third screen */}
				<ImageBackground style={styles.imageBackgroundStyle} source={thirdOnBoarding}>
					<Text style={styles.headerStyle}>Event</Text>
					<Text style={styles.textStyle}>
						Dapatkan jadwal event menarik seputar kesehatan bersama Teman Diabetes
					</Text>
				</ImageBackground>
			</Swipper>
		);
	}
}

const mapStateToProps = state => ({
	onBoardingReducer: state.onBoardingReducer
});

export default connect(mapStateToProps, null)(Screen);

const styles = StyleSheet.create({
	headerStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE * 1.4,
		paddingHorizontal: 20,
		marginTop: 200
	},
	textStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE,
		textAlign: 'left',
		marginVertical: 10,
		paddingHorizontal: 20
	},
	imageBackgroundStyle: {
		flex: 1,
		zIndex: 100,
		width: Style.DEVICE_WIDTH,
		height: Style.DEVICE_HEIGHT,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	}
});
