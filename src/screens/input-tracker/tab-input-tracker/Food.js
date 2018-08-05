import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class Food extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonMenuStyle} onPress={() => this.props.toNavigate()}>
        <CardSection>
          <Image
            source={require('../../../assets/icons/food.png')}
            style={[styles.iconStyle, { width: 50 }]}
          />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>Menu Makanan</Text>
            <Text style={styles.valueStyle}>Masukkan makanan Anda</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default Food;
