import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import { CardSection } from '../../../components';
import styles from './Styles';

class bloodPressure extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onModalInput('INPUT_TEKANAN_DARAH')}
      >
        <CardSection>
          <Image
            source={{
              uri:
                'https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/8b/3a/0a/8b3a0a25-603a-3374-90e9-067df014fd60/source/512x512bb.jpg'
            }}
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
