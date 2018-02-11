import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import color from '../../style/color';
import ViewPropTypes from '../../config/ViewPropTypes';

const CardSection = (props) => (
	<View style={styles.containerStyle}>
		{props.children}
	</View>
);

CardSection.propTypes = {
	children: PropTypes.any,
	containerStyle: ViewPropTypes.style
};

const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: color.white,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: color.gray1,
		position: 'relative'
	}
};

export { CardSection };
