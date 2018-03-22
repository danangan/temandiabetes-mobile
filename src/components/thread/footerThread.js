import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { CardSection } from '../card/CardSection';
import ViewPropTypes from '../../config/ViewPropTypes';
import BookMark from '../../assets/icons/bookmark.png';
import Report from '../../assets/icons/flag.png';
import Comment from '../../assets/icons/comment.png';

const FooterThread = ({ containerStyle, numOfComments, isOpen, threadItem }) => (
	<CardSection>
		<View style={[styles.containerStyle, containerStyle]}>
			<TouchableOpacity style={styles.itemContainer}>
				<Image source={Comment} style={{ width: 20, height: 20 }} />
				<Text style={styles.titleItem}>{numOfComments} Balasan</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.itemContainer}>
				<Image source={BookMark} style={{ width: 20, height: 20 }} />
				<Text style={styles.titleItem}>Tandai</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.itemContainer} 
				onPress={() => isOpen('TemanDiabets.ModalReport', threadItem)}>
				<Image source={Report} style={{ width: 20, height: 20 }} />
				<Text style={styles.titleItem}>Laporkan</Text>
			</TouchableOpacity>
		</View>
	</CardSection>
);

FooterThread.propTypes = {
	containerStyle: ViewPropTypes.style,
	numOfComments: PropTypes.number,
	isOpen: PropTypes.func
};

const styles = {
	containerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		justifyContent: 'space-between',
	},
	itemContainer: {
		flex: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		alignItems: 'center'
	},
	titleItem: { fontSize: 12, fontFamily: 'Montserrat-Light' }
};

export { FooterThread };
