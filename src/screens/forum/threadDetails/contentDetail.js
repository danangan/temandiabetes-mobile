import React from 'react';
import { View, Text } from 'react-native';

import { CardSection } from '../../../components';
import { CommentThread } from './commentThread';

const ContentDetail = (props) => (
	<View>
		<CardSection>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 15
				}}
			>
				<Text>
					{props.threadItem.description}
				</Text>
			</View>
		</CardSection>
    <CommentThread />
	</View>
);

export { ContentDetail };
