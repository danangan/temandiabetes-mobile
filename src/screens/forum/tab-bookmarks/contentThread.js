import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../../../components';

let statusPreview = false;

const handleContent = (content = '', open) => {
  const  preview = content.substring(0, 150);
	if (open) {
		statusPreview = true;
		return content;
	}
	statusPreview = false;
	return preview;
};

const ContentThread = props => (
	<View style={{ height: 190 }}>
		<CardSection>
			<View style={styles.wrapper}>
				<Text style={styles.title}>{props.property.topic}</Text>
			</View>
		</CardSection>
		<CardSection>
      <View style={styles.wrapper}>
        <View>
          <Text>{handleContent(props.property.description)}...</Text>
          <TouchableOpacity onPress={() => handleContent(props.property.description, true)}>
            <Text>more</Text>
          </TouchableOpacity>
        </View>
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
