import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../card/CardSection';

const ContentThread = props => (
	<View style={{ height: 190 }}>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{props.title}</Text>
			</View>
		</CardSection>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.contentText}>
					{props.content}
				</Text>
			</View>
		</CardSection>
	</View>
);

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
	title: { fontSize: 22 },
	contentText: {
    fontSize: 14
  }
};

export default ContentThread;
