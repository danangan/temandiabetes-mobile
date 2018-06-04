import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class hba1c extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonMenuStyle}
        onPress={() => this.props.onModalInput('INPUT_HBA1C')}
      >
        <CardSection>
          <Image source={require('../../../assets/icons/hba1c.png')} style={styles.iconStyle} />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>HbA1c</Text>
            <Text style={styles.valueStyle}>masukkan HbA1c anda</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default hba1c;
