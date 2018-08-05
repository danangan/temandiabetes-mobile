import PropTypes from 'prop-types';
import React from 'react';
import { View, Platform } from 'react-native';

import color from '../../style/color';
import ViewPropTypes from '../../config/ViewPropTypes';

const Card = (props) => (
	<View style={[styles.containerStyle, props.containerStyle]}>
		{props.children}
	</View>
);

Card.propTypes = {
	children: PropTypes.any,
	containerStyle: ViewPropTypes.style,
};

const styles = {
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: color.gray1,
		backgroundColor: color.white,
		borderBottomWidth: 0,
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0,0,0, .2)',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 2,
			},
			android: {
				elevation: 1,
			}
		}),
		marginLeft: 5,
		marginRight: 5,
	}
};

export { Card };
