import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardSection, Avatar } from '../../../components';

const HeaderThread = props => (
	<CardSection>
		<View style={styles.wrapper}>
			<Avatar
				avatarSize="Small"
				imageSource="http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg"
			/>

			<View style={{ margin: 5 }}>
				<Text style={styles.name}>Gloria James</Text>
				<Text style={styles.category}>Teman Diabetes</Text>
			</View>
		</View>
	</CardSection>
);

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 15
	},
	name: {
		color: '#b6b6b6',
		borderRadius: 10,
		paddingHorizontal: 5,
		fontSize: 15
	},
	category: {
		backgroundColor: '#68ba6e',
		color: '#fff',
		borderRadius: 10,
		paddingHorizontal: 5,
		fontSize: 13
	}
});

export { HeaderThread };
