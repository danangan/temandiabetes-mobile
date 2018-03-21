import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../../../components';

let statusPreview = false;

const handleContent = (content, open) => {
	const preview = content.substring(0, 150);
	if (open) {
		statusPreview = true;
		console.log("STATUS PREV ", statusPreview);
		return content;
	}
	statusPreview = false;
	return preview;
};

const ContentThread = (props) => {
	const { description, topic } = props.property;
	return (<View style={{ height: 190 }}>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{topic}</Text>
			</View>
		</CardSection>
		<CardSection>
			<View style={styles.wrapper}>
				<View style={styles.contentText}>
					<Text>{ handleContent(description)}...</Text>
						<TouchableOpacity onPress={() => handleContent(description, true)}>
							<Text>more</Text>
						</TouchableOpacity>
				</View>
			</View>
		</CardSection>
	</View>);
}

const styles = {
  container: {
    height: 190
  },
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: 15
	},
	title: { fontSize: 22, fontFamily: 'Montserrat-Light' },
	contentText: {
		fontSize: 14,
		fontFamily: 'Montserrat-Light'
  }
};

export default ContentThread;
