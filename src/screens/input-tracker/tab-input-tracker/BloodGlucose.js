import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class bloodGlucose extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onModalInput('BLOOD_GLUCOSE')}
        style={styles.buttonMenuStyle} >
        <CardSection>
          <Image source={require('../../../assets/icons/dnurse.png')} style={styles.iconStyle} />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>Gula Darah</Text>
            <Text style={styles.valueStyle}>Masukkan gula darah Anda</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default bloodGlucose;
