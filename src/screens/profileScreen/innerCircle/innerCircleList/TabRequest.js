import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

import { Avatar } from '../../../../components';
import color from '../../../../style/color';
import Style from '../../../../style/defaultStyle';

const renderItem = ({ item }) => (
	<View style={styles.containerStyle}>
		<View style={styles.contentStyle}>
			<Avatar
				avatarSize="Small"
				imageSource="https://images-cdn.9gag.com/photo/aMjGOVM_700b.jpg"
				avatarStyle={[
					styles.avatarStyle,
					{
						borderColor:
							item.friend.tipe_user === 'non-diabetesi'
								? 'rgba(126,211,33,1)'
								: item.friend.tipe_user === 'diabetesi' ? color.red : 'rgba(74,144,226,1)'
					}
				]}
			/>
			<View style={{ margin: 10 }}>
				<Text style={styles.nameStyle}>{item.friend.nama}</Text>
				<Text style={styles.relationStyle}>{item.friend.tipe_user}</Text>
			</View>
		</View>
		<View style={styles.buttonContainerStyle}>
			<TouchableOpacity style={styles.closeButtonStyle}>
				<Image
					source={require('../../../../assets/icons/close.png')}
					tintColor={color.red}
					style={styles.iconStyle}
				/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.closeButtonStyle}>
				<Image
					source={require('../../../../assets/icons/check.png')}
					tintColor={'rgba(126,211,33,1)'}
					style={[styles.iconStyle, { width: 25, height: 25, marginTop: 7 }]}
				/>
			</TouchableOpacity>
		</View>
	</View>
);

const TabRequest = ({ innerCircle }) => (
	<FlatList data={innerCircle} renderItem={item => renderItem(item)} />
);

const styles = {
	containerStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 10
	},
	contentStyle: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	nameStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE,
		color: 'rgba(29,29,38,1)'
	},
	relationStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALLER
	},
	iconStyle: {
		height: 17,
		width: 17,
		marginTop: 13,
		alignSelf: 'center'
	},
	buttonContainerStyle: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	closeButtonStyle: {
		width: 50,
		height: 50
	},
	avatarStyle: {
		borderWidth: 1.5,
		borderColor: color.red
	}
};

export default TabRequest;
