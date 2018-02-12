import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

import ViewPropTypes from '../../config/ViewPropTypes';
import color from '../../style/color';
import Style from '../../style//defaultStyle';

const source = require('../../assets/icons/google_icon.png');

const ButtonGoogle = ({ onPress, text, containerStyle, textStyle }) => (
  <TouchableOpacity
    style={[styles.containerStyle, containerStyle]}
    activeOpacity={0.5}
    onPress={onPress}
  >
    <View style={styles.sectionStyle}>
      <Image source={source} style={styles.ImageIconStyle} />
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </View>
  </TouchableOpacity>
);

ButtonGoogle.prototype = {
	onPress: PropTypes.func,
	containerStyle: ViewPropTypes.style,
	textStyle: ViewPropTypes.style,
	text: PropTypes.string
};

const styles = {
  containerStyle: {
    backgroundColor: '#4C8CF5',
    borderWidth: 0.5,
    borderColor: '#4C8CF5',
    height: 50,
    borderRadius: 25,
    marginLeft: 25,
    marginRight: 25
	},
	sectionStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 10
	},
  ImageIconStyle: {
    padding: 10,
    marginRight: 10,
    height: 30,
    width: 30,
    resizeMode: 'stretch'
  },
  textStyle: {
    color: color.white,
		marginLeft: 10,
		fontFamily: 'Montserrat-Regular',
		fontSize: Style.FONT_SIZE_TITLE
  }
};

export { ButtonGoogle };

