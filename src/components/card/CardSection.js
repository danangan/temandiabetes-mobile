import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import color from '../../style/color';
import ViewPropTypes from '../../config/ViewPropTypes';

const CardSection = (props) => (
	<View style={[styles.containerStyle, props.containerStyle]}>
		{props.children}
	</View>
);

CardSection.propTypes = {
	children: PropTypes.any,
	containerStyle: ViewPropTypes.style
};

const styles = {
	containerStyle: {
		borderBottomWidth: 0,
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: color.white,
		position: 'relative'
	}
};

export { CardSection };
