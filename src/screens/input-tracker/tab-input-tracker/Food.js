import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class Food extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonMenuStyle}
        onPress={() => this.props.onModalInput('INPUT_FOOD')}
      >
        <CardSection>
          <Image
            source={require('../../../assets/icons/food.png')}
            style={[styles.iconStyle, { width: 50 }]}
          />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>makanan</Text>
            <Text style={styles.valueStyle}>masukan makanan anda</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default Food;
