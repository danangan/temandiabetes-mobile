import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import Style from '../../style/defaultStyle';

export default (props) => (
  <ImageBackground style={styles.imageBackgroundStyle} source={{ uri: props.imageURL}}>
    <Text style={styles.headerStyle}>{props.title}</Text>
    <Text style={styles.textStyle}>{props.article}</Text>
  </ImageBackground>
)

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
