import React from 'react';
import { View, Text } from 'react-native';
import { CardSection, TextWithClickableURL } from '../../../../components';
import { sliceString } from '../../../../utils/helpers';

const ContentThread = props => {
  const { description, topic } = props.property;

	return (
		<View style={styles.container}>
			<CardSection>
				<View style={styles.wrapper}>
					<Text style={styles.title}>{sliceString(topic || '', 35)}</Text>
				</View>
			</CardSection>
			<CardSection>
				<View style={styles.wrapper}>
          <Text style={{ marginBottom: 10 }}>
            <TextWithClickableURL inputText={sliceString(description || '', 250)}/>
          </Text>
				</View>
			</CardSection>
		</View>
	);
};

const styles = {
	container: {
    minHeight: 190
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	title: { fontSize: 22, fontFamily: 'Montserrat-Light' }
};

export default ContentThread;
