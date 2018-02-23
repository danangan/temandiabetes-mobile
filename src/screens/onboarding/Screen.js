import React, { Component } from 'react';
import {
  StyleSheet,   // CSS-like styles
  Text,         // Renders text
  View          // Container component
} from 'react-native';

import Button from './Button';
import Swipper from './Swipper';

class Screen extends Component {
  render () {
    return (
      <Swipper
        navigation={this.props.navigation}
      >
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: '#FFF' }]}>
          <Text style={styles.header}>Event</Text>
          <Text style={styles.text}>Good nutrition is an important part of leading a healthy lifestyle</Text>
        </View>
        {/* First screen */}
        <View style={[styles.slide, { backgroundColor: '#FFF' }]}>
           <Text style={styles.header}>Forum</Text>
           <Text style={styles.text}>Good nutrition is an important part of leading a healthy lifestyle</Text>
        </View>
        {/* Third screen */}
        <View style={[styles.slide, { backgroundColor: '#FFF' }]}>
          <Text style={styles.header}>LOVE</Text>
          <Text style={styles.text}>Where there is love there is life</Text>
        </View>
      </Swipper>
    )
  }
}

export default Screen;

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  // Header styles
  header: {
    color: '#4A4A4A',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  // Text below header
  text: {
    color: '#4A4A4A',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'left',
  },
});
