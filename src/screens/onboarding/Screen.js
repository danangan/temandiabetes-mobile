import React, { Component } from 'react';
import {
	StyleSheet, // CSS-like styles
	Text, // Renders text
	View,
	ImageBackground
	// Container component
} from 'react-native';

import Button from './Button';
import Swipper from './Swipper';
import backImage from '../../assets/images/first_onboarding.jpg';
import backImage2 from '../../assets/images/second_onboarding.jpg';
import backImage3 from '../../assets/images/siapakah_anda.jpg';

class Screen extends Component {
	render() {
		return (
			<Swipper navigation={this.props.navigation}>
				{/* First screen */}
				<ImageBackground
					style={{
						flex: 1,
						zIndex: 100,
						width: '100%',
						height: '100%',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start'
					}}
					source={backImage}
				>
					<Text style={styles.header}>Rekam Data Anda</Text>
					<Text style={styles.text}>
						Pantau gula darah secara instan menggunakan
						glukometer langsung dari gadget Anda.
					</Text>
				</ImageBackground>
				{/* First screen */}
				<ImageBackground
					style={{
						flex: 1,
						zIndex: 100,
						width: '100%',
						height: '100%',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start'
					}}
					source={backImage2}
				>
					<Text style={styles.header}>Forum</Text>
					<Text style={styles.text}>
						Konsultasikan kesehatan Anda dengan ahlinya	
					</Text>
				</ImageBackground>
				{/* Third screen */}
				<ImageBackground
					style={{
						flex: 1,
						zIndex: 100,
						width: '100%',
						height: '100%',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start'
					}}
					source={backImage3}
				>
					<Text style={styles.header}>Event</Text>
					<Text style={styles.text}>
						Dapatkan jadwal event menarik seputar kesehatan
						bersama Teman Diabetes
					</Text>
				</ImageBackground>
			</Swipper>
		);
	}
}

export default Screen;

const styles = StyleSheet.create({
	// Slide styles
	slide: {
		flex: 1, // Take up all screen
		justifyContent: 'center', // Center vertically
		alignItems: 'flex-start',
		marginHorizontal: 20
	},
	// Header styles
	header: {
		color: '#4A4A4A',
		fontFamily: 'Avenir',
		fontSize: 30,
		fontWeight: 'bold',
		paddingHorizontal: 20,
		marginTop: 200
	},
	// Text below header
	text: {
		color: '#4A4A4A',
		fontFamily: 'Avenir',
		fontSize: 18,
		textAlign: 'left',
		marginVertical: 10,
		paddingHorizontal: 20
	}
});
