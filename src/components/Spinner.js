import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Style from '../style/defaultStyle';

const Spinner = ({ containerStyle, textStyle, text, color, size }) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
		  <ActivityIndicator color={color} size={size} />
		  <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </View>
  )
};

const styles = {
	containerStyle: {
		position: 'absolute',
		flex: 1,
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: '#383838',
		width: Style.DEVICE_WIDTH,
		height: Style.DEVICE_HEIGHT,
		alignItems: 'center',
		borderRadius: 0,
    opacity: 0.7,
    zIndex: 9999999999
	},
	textStyle: {
		fontFamily: 'Montserrat-Regular',
		fontWeight: 'bold',
		fontSize: 16,
		color: '#FFFFFF'
	}
};

export { Spinner };
