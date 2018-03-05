import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../../../components';

const ContentThread = props => (
	<View style={{ height: 190 }}>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Arti Tinggi Dan rendahnya kadar Gula Darah</Text>
			</View>
		</CardSection>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.contentText}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae arcu eu odio
					pharetra iaculis. Curabitur at consectetur felis, et rhoncus velit. Vestibulum commodo
					massa at lorem tempus euismod. Vestibulum mattis non velit in lobortis.
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

export { ContentThread };
