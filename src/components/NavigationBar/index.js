import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import Style from '../../style/defaultStyle';
import color from '../../style/color';

const NavigationBar = ({ onPress, title }) => (
	<View style={styles.containerStyle}>
		<TouchableOpacity style={styles.backButtonStyle} onPress={onPress}>
			<Image
				resizeMode={'contain'}
				style={styles.imageStyle}
				tintColor={color.red}
				source={require('../../assets/icons/back.png')}
			/>
		</TouchableOpacity>
		<View style={styles.titleContainerStyle}>
			<Text style={styles.titleStyle}>{title}</Text>
		</View>
	</View>
);

const styles = {
	containerStyle: {
    flexDirection: 'row'
	},
	backButtonStyle: {
    paddingLeft: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	imageStyle: {
		width: 25,
    height: 25,
    tintColor: color.red
	},
	titleContainerStyle: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	titleStyle: {
    flex: 1,
		fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    alignSelf: 'center',
    paddingRight: 25,
    color: color.red
	}
};

export { NavigationBar };
