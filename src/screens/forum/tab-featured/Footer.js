import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Style from '../../../style/defaultStyle';

const Footer = () => (
	<View style={styles.containerFooterStyle}>
		<View style={styles.footerLeftStyle}>
			<Image
				style={styles.avatarStyle}
				resizeMode={'cover'}
				source={{ uri: 'http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg' }}
			/>
			<View style={styles.nameAndMonthStyle}>
				<Text style={styles.nameStyle}>Gloria James</Text>
				<Text style={styles.monthStyle}>01 February 1991</Text>
			</View>
		</View>
		<View style={styles.footerRightStyle}>
			<TouchableOpacity onPress={() => null}>
				<Image
					source={require('../../../assets/icons/share.png')}
					style={styles.iconStyle}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => null}>
				<Image
					source={require('../../../assets/icons/bookmark.png')}
					style={styles.iconStyle}
					resizeMode={'contain'}
				/>
			</TouchableOpacity>
		</View>
	</View>
);

const styles = {
	containerFooterStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	footerLeftStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingLeft: 10,
		alignSelf: 'flex-start'
	},
	footerRightStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	avatarStyle: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	nameAndMonthStyle: {
		paddingLeft: 7,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	nameStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALL,
		fontStyle: 'normal',
		textAlign: 'left'
	},
	monthStyle: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALLER / 1.1,
		fontStyle: 'normal',
		textAlign: 'left',
		bottom: 3
	},
	iconStyle: {
		marginLeft: 5,
		height: 50,
		width: 25
	}
};

export default Footer;
