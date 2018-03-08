import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { CardSection } from '../card/CardSection';
import ViewPropTypes from '../../config/ViewPropTypes';

const FooterThread = ({ containerStyle, numOfComments }) => (
	<CardSection>
		<View style={[styles.containerStyle, containerStyle]}>
			<TouchableOpacity>
				<Text>{numOfComments} Balasan</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>Tandai</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text>Laporkan</Text>
			</TouchableOpacity>
		</View>
	</CardSection>
);

FooterThread.propTypes = {
	containerStyle: ViewPropTypes.style,
	numOfComments: PropTypes.number
};

const styles = {
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: 15,
		justifyContent: 'space-between'
	}
};

export { FooterThread };
