import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Closed from '../../assets/icons/close.png';

class ModalPostComponent extends Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerWrapper}>
          <View style={styles.wrapNav}>
            <TouchableOpacity 
              onPress={() => Navigation.dismissModal({
                animationType: 'slide-down' 
              })}
              style={{ flex: 0.5 }}
            >
                <Image 
                  source={Closed}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.titleForm}>Tambah Komentar</Text>
              </View>
          </View>
          <View style={styles.wrapTextInput}>
            <TextInput
              multiline
              style={styles.itemTextInput}
              placeholder="Tambahkan komen disini"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1, 
    backgroundColor: '#f3f5fe', 
    paddingHorizontal: 10, 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  innerWrapper: {
    flex: 1, 
    backgroundColor: '#fff', 
    width: '100%', 
    paddingHorizontal: 5, 
    alignItems: 'center'
  },
  wrapNav: { 
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    top: 0,
    borderBottomColor: '#000',
    backgroundColor: '#fff'
  },
  titleForm: {
    fontFamily: 'Montserrat-Bold', color: '#99a0c2', fontSize: 16 
  },
  wrapTextInput: { 
    flex: 2, 
    marginVertical: 40, 
    width: '100%', 
    height: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#f2f3f7'
  },
  itemTextInput: {
    flexWrap: 'wrap', 
    paddingHorizontal: 10, 
    fontFamily: 'Montserrat-ExtraLight', 
    color: '#b7bbd2', 
    fontSize: 14 
  }
};

export default ModalPostComponent;
