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
		paddingLeft: 35,
		paddingRight: 35
	},
	borderLine: {
		borderBottomColor: '#9C9C9C',
    borderBottomWidth: 2,
    flex: 1,
	},
	borderText: {
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_SMALL,
		alignItems: 'center',
		justifyContent: 'center',
    color: '#9C9C9C',
    marginHorizontal: 10,
	},
};

export default BorderLine;
