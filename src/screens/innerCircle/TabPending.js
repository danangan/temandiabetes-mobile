import React from 'react';
import { View, Text } from 'react-native';

import { Avatar } from '../../components';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

const TabPending = ({ innerCircle }) => (
	<View>
		{innerCircle.map((item, index) => (
			<View style={styles.containerStyle} key={index}>
				<View style={styles.contentStyle}>
					<Avatar
						avatarSize="Small"
						imageSource="https://images-cdn.9gag.com/photo/aMjGOVM_700b.jpg"
						imageStyle={styles.avatarStyle}
					/>
					<View style={{ margin: 10 }}>
						<Text style={styles.nameStyle}>Adam</Text>
						<Text style={styles.relationStyle}>Kakak</Text>
					</View>
				</View>
			</View>
		))}
	</View>
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
		borderWidth: 1,
		borderColor: color.blue
	}
};

export default TabPending;
