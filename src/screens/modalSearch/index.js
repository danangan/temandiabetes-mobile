import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { TextField, Avatar } from '../../components';
import searchIcon from '../../assets/icons/close.png';
import Blood from '../../assets/icons/explorer_icon.png';
import BookMark from '../../assets/icons/bookmark.png';
import ShareBtn from '../../assets/icons/share.png';


class ModalSearch extends React.Component {
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
            width: '100%',
            height: 70,
            justifyContent: 'flex-start',
            alignItems: 'center', 
            elevation: 4,
            borderWidth: 1,
            borderColor: '#ccc',
            paddingHorizontal: 20,
            margin: 0
          }}
        >
          <TextField
            autoFocus
            leftIcon={Blood}
            rightIcon={searchIcon}
            onPressRight={() => Navigation.dismissModal({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            })}
            placeholder={'Cari post, pengguna'}
            underlineColorAndroid={'#fff'}
            sectionStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 5,
              margin: 0
            }}
            inputStyle={{ color: '#b6b6b6', fontSize: 12, backgroundColor: '#fff' }}
          />
        </View>
        <View style={{ flex: 2, paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={styles.titleElement}>Pencarian Terakhir</Text>
          <View style={{ paddingVertical: 10, marginVertical: 0  }}>
            <Text style={styles.currentSearch}>Diabetes</Text>
            <Text style={[styles.currentSearch, { paddingVertical: 5 }]}>Gula</Text>
            <Text style={styles.currentSearch}>DNurse</Text>
          </View>
          <Text style={[styles.titleElement, { paddingVertical: 10 }]}>Rekomendasi Untuk Anda</Text>
        </View>
      </View>
    );
  }

  toRenderItem(item) {
    return (
      <View style={{ flex: 2, paddingHorizontal: 20, paddingTop: 20 }}>
        <View 
          style={{ 
            flex: 1, 
            flexDirection: 'row', 
            borderRadius: 5,
            elevation: 4,
            borderBottom: 0.5, 
            borderBottomColor: '#b6b6b6', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            marginVertical: 5,
            height: 120
          }}
        >
          <View style={{ height: 100, width: 100 }}>
            {/* <Image 
              resizeMode={'center'}
              style={{ width: '100%', height: '100%' }}
              source={{ uri: 'https://johnkoessler.files.wordpress.com/2014/04/blackbox2.jpg' }}
            /> */}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#000' }}/>
          </View>
          <View style={{ width: '75%', padding: 20 }}>
            <View>
              <Text style={styles.currentSearch}>Ternyata, Gula Batu tidak Lebih sehat dari Gula Pasir!</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                  avatarSize="ExtraSmall"
                  imageSource='http://s3.amazonaws.com/systemgravatars/avatar_6225.jpg'
                />
                <View style={{ margin: 5 }}>
                  <Text style={{ fontSize: 10 }}>Gloria James</Text>
                  <Text style={{ fontSize: 8 }}>12 January 2018</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ height: 20, width: 20 }}>
                  <Image 
                    resizeMode={'center'}
                    style={{ width: '100%', height: '100%' }}
                    source={ShareBtn}
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
        style={styles.container}
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

const styles = {
  container: {
    flex: 3, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start' 
  },
  titleElement: { 
    color: '#ccc', 
    fontSize: 16, 
    fontFamily: 'Montserrat-Light' 
  },
  currentSearch: {
    color: '#000', 
    fontSize: 16, 
    fontFamily: 'Montserrat-Light' 
  }
};

export default ModalSearch;
