import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

import ViewPropTypes from '../../config/ViewPropTypes';
import color from '../../style/color';
import Style from '../../style/defaultStyle';

const TextField = ({
  containerStyle,
  inputStyle,
  value,
  defaultValue,
  onChangeText,
  placeholder,
  autoCorrect,
  secureTextEntry,
  leftIcon,
  rightIcon,
  placeholderTextColor,
  allowFontScaling,
  autoFocus,
  editable,
  keyboardType,
  maxHeight,
  maxLength,
  multiline,
  onBlur,
  onChange,
  onEndEditing,
  onFocus,
  onLayout,
  onScroll,
  onSubmitEditing,
  autoCapitalize,
  returnKeyType,
  selectTextOnFocus,
  autoGrow,
  numberOfLines,
  underlineColorAndroid,
  onKeyPress,
  sectionStyle,
  onPressRight,
  tintColor,
  iconLefteStyle,
  iconRightStyle
}) => (
  <View style={[styles.containerStyle, containerStyle]}>
    <View style={[styles.sectionStyle, sectionStyle]}>
      <Image source={leftIcon} tintColor={tintColor} style={[styles.iconLefteStyle, iconLefteStyle]} />
      <TextInput
        value={value}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        allowFontScaling={allowFontScaling}
        autoFocus={autoFocus}
        editable={editable}
        keyboardType={keyboardType}
        maxHeight={maxHeight}
        maxLength={maxLength}
        multiline={multiline}
        onBlur={onBlur}
        onChange={onChange}
        onEndEditing={onEndEditing}
        onFocus={onFocus}
        onLayout={onLayout}
        onScroll={onScroll}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        selectTextOnFocus={selectTextOnFocus}
        autoGrow={autoGrow}
        numberOfLines={numberOfLines}
        underlineColorAndroid={underlineColorAndroid}
        onKeyPress={onKeyPress}
        style={[styles.inputStyle, inputStyle]}
      />
      <TouchableOpacity onPress={onPressRight}>
        <Image source={rightIcon} style={[styles.iconRightStyle, iconRightStyle]} />
      </TouchableOpacity>
    </View>
  </View>
);

TextField.ViewPropTypes = {
  containerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  labelStyle: Text.propTypes.style,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  placeholderTextColor: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  keyboardType: PropTypes.any,
  maxHeight: PropTypes.number,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onLayout: PropTypes.func,
  onScroll: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  autoCapitalize: PropTypes.any,
  returnKeyType: PropTypes.any,
  selectTextOnFocus: PropTypes.bool,
  autoGrow: PropTypes.bool,
  numberOfLines: PropTypes.number,
  underlineColorAndroid: PropTypes.color,
  onKeyPress: PropTypes.func,
  onPressRight: PropTypes.func
};

const styles = {
  inputStyle: {
    color: color.black,
    paddingRight: 5,
    paddingLeft: 5,
    fontFamily: 'Montserrat-Regular',
    fontStyle: 'normal',
    fontSize: Style.FONT_SIZE,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    borderWidth: 0,
    borderColor: color.black,
    height: 40,
    borderRadius: 5,
  },
  iconLefteStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  }, 
  iconRightStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  }
};

export { TextField };
