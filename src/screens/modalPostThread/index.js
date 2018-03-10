import React from 'react';
import { View, Text } from 'react-native';

import { TextField } from '../../components';
import searchIcon from '../../assets/icons/close.png';
import Blood from '../../assets/icons/explorer_icon.png';

class ModalPostThread extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-start', alignItems: 'center' }}>
        <TextField
          autoFocus={true}
          leftIcon={Blood}
          rightIcon={searchIcon}
          placeholder={'Cari post, pengguna'}
          underlineColorAndroid={'#fff'}
          sectionStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5
          }}
          inputStyle={{ color: '#b6b6b6', fontSize: 12, backgroundColor: '#fff' }}
				/>
      </View>
    );
  }
}

export default ModalPostThread;
