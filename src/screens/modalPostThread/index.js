import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import { TextField, HeaderThread } from '../../components';
import searchIcon from '../../assets/icons/close.png';
import Blood from '../../assets/icons/explorer_icon.png';
import BookMark from '../../assets/icons/bookmark_dark.png';


class ModalPostThread extends React.Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      nums: [1, 2, 3, 4, 5, 6]
    };
  }

  toRenderHeader() {
    return (
      <View>
        <View 
          style={{ 
            flex: 2, 
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center', 
            borderWidth: 1, 
            borderColor: 'red' 
          }}
        >
          <TextField
            autoFocus
            leftIcon={Blood}
            rightIcon={searchIcon}
            placeholder={'Cari post, pengguna'}
            underlineColorAndroid={'#fff'}
            sectionStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              margin: 0
            }}
            inputStyle={{ color: '#b6b6b6', fontSize: 12, backgroundColor: '#fff', marginVertical: 0 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text>Pencarian Terakhir</Text>
          <View>
            <Text>Diabetes</Text>
            <Text>Gula</Text>
            <Text>DNurse</Text>
          </View>
        </View>
      </View>
    );
  }

  toRenderItem(item) {
    return (
      <View style={{ flex: 2 }}>
        <Text>Rekomendasi Untuk Anda</Text>
        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#000' }}>
          <View style={{ height: 100, width: '20%' }}>
            <Image 
              resizeMode={'center'}
              style={{ width: '100%', height: '100%' }}
              source={{ uri: 'https://johnkoessler.files.wordpress.com/2014/04/blackbox2.jpg' }}
            />
          </View>
          <View style={{ width: '80%', padding: 20 }}>
            <View>
              <Text>Ternyata, Gula Batu tidak Lebih sehat dari Gula Pasir!</Text>
              <Text>Ternyata, Gula Batu tidak Lebih sehat dari Gula Pasir</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ height: 20, width: '20%', alignSelf: 'flex-start' }}>
                <Image 
                  resizeMode={'center'}
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: 'https://johnkoessler.files.wordpress.com/2014/04/blackbox2.jpg' }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <View style={{ height: 20, width: 20 }}>
                  <Image 
                    resizeMode={'center'}
                    style={{ width: '100%', height: '100%' }}
                    source={BookMark}
                  />
                </View>
                <View style={{ height: 20, width: 20 }}>
                  <Image 
                    resizeMode={'center'}
                    style={{ width: '100%', height: '100%' }}
                    source={BookMark}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  render() {   
    return (
      <View 
        style={{ 
          flex: 3, 
          backgroundColor: '#fff', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start' 
        }}
      >
        <FlatList 
          ListHeaderComponent={() => this.toRenderHeader()}
          data={this.state.nums}
          renderItem={(item) => this.toRenderItem(item)}
        />
      </View>
    );
  }
}

export default ModalPostThread;
