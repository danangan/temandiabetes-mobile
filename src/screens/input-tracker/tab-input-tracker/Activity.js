import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class activity extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.buttonMenuStyle}
        onPress={() => this.props.onModalInput('INPUT_ACTIVITY')}
      >
        <CardSection>
          <Image source={require('../../../assets/icons/activity.png')} style={styles.iconStyle} />
          <View style={styles.containerTextStyle}>
            <Text style={styles.titleStyle}>aktifitas</Text>
            <Text style={styles.valueStyle}>aktifitas yang anda lakukan</Text>
          </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default activity;
