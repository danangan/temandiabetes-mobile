import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Style from '../../style/defaultStyle';
import color from '../../style/color';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.actionBtn()}>
        <View style={[styles.button, { backgroundColor: this.props.backGroundColor }]}>
          <Text style={[styles.text, { color: this.props.colorText }]}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 0,         // Rounded border
    borderWidth: 1,           // 2 point border widht
    borderColor: color.red,   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
  },
  // Button text
  text: {
    fontSize: Style.FONT_SIZE,
    fontFamily: 'Montserrat-Regular',
  },
});
