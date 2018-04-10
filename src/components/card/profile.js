import React from 'react';

import { View, Text } from 'react-native';

import { Avatar } from '../avatar';

const ProfileCard = (containerStyle) => (
	<View style={[styles.containerStyle, containerStyle]}>
		<View style={styles.backButtonStyle}>
      <Avatar 
        avatarSize="Medium"
        imageSource='https://images-cdn.9gag.com/photo/aMjGOVM_700b.jpg'
      />
		</View>
		<View style={styles.titleContainerStyle}>
      <Text style={{ fontSize: 28, fontFamily: 'Monserrat-Regular', color: '#000' }}>Chealsea Islan</Text>
      <Text style={{ fontSize: 14, fontFamily: 'Monserrat-Regular', color: '#414141' }}>Diabetesi Type II</Text>
		</View>
	</View>
);

const styles = {
	containerStyle: {
    flexDirection: 'row',
	},
	backButtonStyle: {
		flex: 0.7,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	imageStyle: {
		width: 25,
		height: 25
	},
	titleContainerStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
};

export default ProfileCard;
