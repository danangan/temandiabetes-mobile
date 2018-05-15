import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class bloodPressure extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonMenuStyle}
        onPress={() => this.props.onModalInput('INPUT_TEKANAN_DARAH')}
      >
        <CardSection>
          <Image
            source={require('../../../assets/icons/blood_pressure.png')}
            style={styles.iconStyle}
          />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>tekanan darah</Text>
            <Text style={styles.valueStyle}>masukkan tekanan darah anda</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  } 
}

export default bloodPressure;
