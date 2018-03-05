import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Avatar } from '../../../components';

const CommentThread = () => (
	<Card>
		<CardSection containerStyle={{ backgroundColor: '#f2f4fd', paddingVertical: 0 }}>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'flex-end',
					justifyContent: 'flex-end',
					paddingTop: 15,
					backgroundColor: '#fff',
					borderTopLeftRadius: 15,
					borderTopRightRadius: 15,
					paddingHorizontal: 15
				}}
			>
				<Avatar
					avatarSize="Small"
					imageSource="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
				/>
				<View style={{ flex: 1, margin: 5 }}>
					<Text style={{ fontSize: 12 }}>Gloria James</Text>
					<Text style={{ fontSize: 10 }}>a minutes ago</Text>
				</View>
			</View>
		</CardSection>
		<CardSection containerStyle={{ backgroundColor: '#f2f4fd', paddingVertical: 0 }}>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'flex-start',
					paddingHorizontal: 15,
					backgroundColor: '#fff'
				}}
			>
				<Text style={{ fontSize: 18 }}>
					Tips Merawat dan Menjaga Kesehatan Bagi Para Bagi Para Penderita Diabetes
				</Text>
			</View>
		</CardSection>
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
			</View>
		</CardSection>
	</Card>
);

export { CommentThread };
