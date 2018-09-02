import React from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import Style from '../style/defaultStyle';
import color from '../style/color';

const Spinner = ({ containerStyle, textStyle, text, color, size }) => {
  const checkPlatform = () => {
    switch (size) {
      case 'large':
        return Platform.OS === 'android' ? size : 0;
      case 'small':
        return Platform.OS === 'android' ? size : 1;
      default:
        return Platform.OS === 'android' ? size : 0;
    }
  };

  const indicatorSize = checkPlatform();

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <ActivityIndicator color={color} size={indicatorSize} />
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
    width: Style.DEVICE_WIDTH,
    height: Style.DEVICE_HEIGHT,
    alignItems: 'center',
    borderRadius: 0,
    opacity: 0.7,
    zIndex: 9999999999
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF'
  }
};

export { Spinner };
