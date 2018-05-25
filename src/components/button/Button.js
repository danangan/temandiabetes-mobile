import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import ViewPropTypes from '../../config/ViewPropTypes';
import color from '../../style/color';
import Style from '../../style//defaultStyle';

const Button = ({ onPress, buttonStyle, textStyle, children }) => (
	<TouchableOpacity style={[styles.buttonStyle, buttonStyle]} onPress={onPress}>
		<Text style={[styles.textStyle, textStyle]}>
			{children}
		</Text>
	</TouchableOpacity>
);

Button.propTypes = {
	children: PropTypes.any,
	buttonStyles: ViewPropTypes.style,
	onPress: PropTypes.func
};

const styles = {
	buttonStyle: {
		alignSelf: 'stretch',
		backgroundColor: color.red,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: color.red,
		marginLeft: 5,
		marginRight: 5
	},
	textStyle: {
		alignSelf: 'center',
		fontFamily: 'Montserrat-Regular',
		color: color.white,
		fontSize: Style.FONT_SIZE_TITLE,
		paddingTop: 10,
		paddingBottom: 10
	}
};

export { Button };
