import React from 'react';
import { View, Text } from 'react-native';

import { CardSection } from '../../../components';
import { CommentThread } from './commentThread';

const ContentDetail = () => (
	<View>
		<CardSection>
			<View
				style={{
					flex: 1,
					paddingHorizontal: 15
				}}
			>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae arcu eu odio
					pharetra iaculis. Curabitur at consectetur felis, et rhoncus velit. Vestibulum commodo
					massa at lorem tempus euismod. Vestibulum mattis non velit in lobortis. Phasellus ultrices
					mollis maximus. Integer tristique massa leo, nec consequat dolor
				</Text>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae arcu eu odio
					pharetra iaculis. Curabitur at consectetur felis, et rhoncus velit. Vestibulum commodo
					massa at lorem tempus euismod. Vestibulum mattis non velit in lobortis. Phasellus ultrices
					mollis maximus. Integer tristique massa leo, nec consequat dolor
				</Text>
			</View>
		</CardSection>
    <CommentThread />
	</View>
);

export { ContentDetail };
