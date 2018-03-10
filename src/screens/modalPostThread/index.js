import React from 'react';

import { View, Text, Image, TextInput } from 'react-native';
import { TextField, Avatar } from '../../components';
import Blood from '../../assets/icons/explorer_icon.png';
import Closed from '../../assets/icons/close.png';

class ModalPostThread extends React.Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={{ flex: 0.5 }}>
            <Image 
              source={Closed}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <View style={{ flex: 2, justifyContent: 'flex-start'}}>
            <Text>Tanyakan atau bagikan sesuatu</Text>
          </View>
        </View>
        <View style={{ flex: 0.5, marginVertical: 10 }}>
          <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'blue', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Avatar
              avatarSize="ExtraSmall"
              imageSource='http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg'
            />
            <Text>Elisabet Olsen</Text>
          </View>
          <View style={{ }}>
            <Text style={{ fontSize: 25 }}>Tanyakn sesuatu/Judul?</Text>
          </View>
        </View>
        <View 
          style={{ 
            flex: 2,
            width: '100%',
            height: 70,
            justifyContent: 'flex-start',
            alignItems: 'flex-start', 
            borderWidth: 1,
            borderColor: '#ccc',
            paddingHorizontal: 20,
            margin: 0
          }}
        >
          <TextField
            autoFocus
            placeholder={'Optional: masukkan link yang dapat mendukung konteks'}
            underlineColorAndroid={'#fff'}
            sectionStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 5,
              margin: 0
            }}
            inputStyle={{ color: '#ccc', fontSize: 12, backgroundColor: '#fff' }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 3, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 4,
    paddingHorizontal: 20
  },
}

export default ModalPostThread;
