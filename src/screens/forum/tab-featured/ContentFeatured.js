import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import HTMLView from 'react-native-render-html';

import Style from '../../../style/defaultStyle';
import color from '../../../style/color';
import { CardSection } from '../../../components';

const ContentFeatured = ({ item }) => (
	<ScrollView style={styles.containerStyle}>
		<CardSection style={styles.cardSectionStyle}>
			<Text style={styles.titleStyle}>
				{item.topic}
			</Text>
		</CardSection>
		<View style={styles.borderLine} />
		<CardSection>
			<HTMLView html={item.description} />
		</CardSection>
	</ScrollView>
);

const styles = {
	containerStyle: {
		flex: 1
	},
	cardSectionStyle: {
		backgroundColor: color.solitude,
		margin: 0
	},
	titleStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE,
		fontStyle: 'normal',
		paddingLeft: 10,
		paddingRight: 5,
		textAlign: 'justify'
	},
	borderLine: {
		borderBottomColor: color.midGray,
		borderBottomWidth: 2,
		opacity: 0.2,
		width: '90%',
		alignSelf: 'center',
		marginTop: 10
	},
	textStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE * 1.1,
		fontStyle: 'normal',
		padding: 10,
		textAlign: 'justify'
	},
};

export default ContentFeatured;
