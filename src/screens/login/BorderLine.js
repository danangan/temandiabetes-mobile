import React from 'react';
import { View, Text } from 'react-native';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

const BorderLine = () => (
  <View style={styles.containerBorderLine}>
    <View style={styles.borderLine} />
    <Text style={styles.borderText}>ATAU MASUK MELALUI</Text>
    <View style={styles.borderLine} />
  </View>
);

const styles = {
  containerBorderLine: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingLeft: 30,
		paddingRight: 30
	},
	borderLine: {
		borderBottomColor: color.gray1,
		borderBottomWidth: 2,
		width: 75
	},
	borderText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALL,
		fontWeight: 'bold',
		alignItems: 'center',
		justifyContent: 'center',
		color: color.gray1
	},
};

export default BorderLine;
