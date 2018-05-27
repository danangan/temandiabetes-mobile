import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../../../components';
import { sliceString } from '../../../utils/helpers';

const ContentThread = ({property: { topic = '', description = '' }}) => (
	<View style={{ height: 190 }}>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{sliceString(topic, 35)}</Text>
			</View>
		</CardSection>
		<CardSection>
      <View style={styles.wrapper}>
        <Text style={{ marginBottom: 10 }}>{sliceString(description, 250)}</Text>
      </View>
		</CardSection>
	</View>
);

const styles = {
  container: {
    minHeight: 190
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
