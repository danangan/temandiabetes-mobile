import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class weight extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonMenuStyle}
        onPress={() => this.props.onModalInput('INPUT_WEIGHT')}
      >
        <CardSection>
          <Image
            source={require('../../../assets/icons/weight.png')}
            style={styles.iconStyle}
          />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>berat badan</Text>
            <Text style={styles.valueStyle}>masukkan berat anda</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  } 
}

export default weight;
