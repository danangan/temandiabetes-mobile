import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { Avatar } from '../../../../components';
import Style from '../../../../style/defaultStyle';
import color from '../../../../style/color';

const renderItem = ({ item }) => (
	<View style={styles.containerStyle}>
		<View style={styles.contentStyle}>
			<Avatar
				avatarSize="Small"
        userName={item.friend.nama}
				imageSource={item.friend.foto_profile}
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
	</View>
);

const TabPending = ({ innerCircle }) => (
	<FlatList data={innerCircle} renderItem={item => renderItem(item)} />
);

const styles = {
	containerStyle: {
		flexDirection: 'row',
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
	avatarStyle: {
		borderWidth: 1.5,
		borderColor: 'rgba(74,144,226,1)'
	}
};

export default TabPending;
