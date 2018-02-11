import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Button extends Component {
  render () {
    return (
      <TouchableOpacity onPress={() => alert('hELLO')}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: '#FFFFFF',   // White colored border
    paddingHorizontal: 50,    // Horizontal padding
    paddingVertical: 10,      // Vertical padding
  },
  // Button text
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
});
