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
	textStyle: ViewPropTypes.style,
	onPress: PropTypes.func
};

const styles = {
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: color.white,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: color.blue,
		marginLeft: 5,
		marginRight: 5
	},
	textStyle: {
		alignSelf: 'center',
		color: color.blue,
		fontSize: Style.FONT_SIZE_SMALL,
		paddingTop: 10,
		paddingBottom: 10
	}
};

export { Button };
