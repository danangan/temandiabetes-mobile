import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TextInput } from 'react-native';

import ViewPropTypes from '../../config/ViewPropTypes';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

const Input = ({
  containerStyle,
  inputStyle,
  labelStyle,
  label,
  value,
  defaultValue,
  onChangeText,
  placeholder,
  autoCorrect,
  secureTextEntry
}) => (
  <View style={[styles.containerStyle, containerStyle]}>
    <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
    <TextInput
      value={value}
      secureTextEntry={secureTextEntry}
      autoCorrect={autoCorrect}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChangeText={onChangeText}
      style={[styles.inputStyle, inputStyle]}
    />
  </View>
);

Input.ViewPropTypes = {
  containerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  labelStyle: Text.propTypes.style,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool
};

const styles = {
  inputStyle: {
    color: color.black,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: Style.FONT_SIZE_SMALL,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: Style.FONT_SIZE,
    paddingLeft: 17,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
