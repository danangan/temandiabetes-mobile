import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CardSection, Avatar } from '../index';
import ViewPropTypes from '../../config/ViewPropTypes';

const HeaderThread = ({ containerStyles, nameStyle, categoryStyle, name, category, source }) => (
	<CardSection>
		<View style={[styles.containerStyles, containerStyles]}>
			<Avatar
				avatarSize="Small"
				imageSource={source}
			/>
			<View style={{ margin: 5 }}>
				<Text style={[styles.nameStyle, nameStyle]}>{name}</Text>
				<Text style={[styles.categoryStyle, categoryStyle]}>{category}</Text>
			</View>
		</View>
	</CardSection>
);

HeaderThread.propTypes = {
	containerStyles: ViewPropTypes.style,
	nameStyle: ViewPropTypes.style,
	categoryStyle: ViewPropTypes.style,
	name: PropTypes.string,
	category: PropTypes.string,
	source: PropTypes.string
};

const styles = StyleSheet.create({
	containerStyles: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 15
	},
	nameStyle: {
		color: '#b6b6b6',
		borderRadius: 10,
		paddingHorizontal: 5,
		fontSize: 15
	},
	categoryStyle: {
		backgroundColor: '#68ba6e',
		color: '#fff',
		borderRadius: 10,
		paddingHorizontal: 5,
		fontSize: 13
	}
});

export { HeaderThread };
