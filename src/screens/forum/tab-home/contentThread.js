import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../../../components';

const ContentThread = props => {
	console.log("props. di CONTENT THREAD", props);
	const { description, topic } = props.property
	return (<View style={{ height: 190 }}>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{topic}</Text>
			</View>
		</CardSection>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.contentText}>
					{description}
				</Text>
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
