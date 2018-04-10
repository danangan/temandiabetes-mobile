import React from 'react';

import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { Avatar, NavigationBar } from '../../../../components';

import ProfileCard from '../../../../components/card/profile';

class EditProfile extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      username: 'Chelsea Islan',
      email: 'chealse@gmail.com',
      alamat: 'Jalan Anda Puas Kami Senang, No. 2A',
      kota: 'Jakarta Selatan',
      provinsi: 'DKI Jakarta',
      kodepos: 12730,
      katasandi: 'terpass12'
    };
  }

  render() {
    return (
      <View 
        style={styles.container}
      >
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
        <ProfileCard />
        <View style={{ flex: 3, marginTop: 10 }}>
          <ScrollView>
            <View>
              <Text style={styles.titleTextInput}>Username</Text>
              <TextInput 
                value={this.state.username}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ username: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Email</Text>
              <TextInput 
                value={this.state.email}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ email: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Alamat</Text>
              <TextInput 
                value={this.state.alamat}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ alamat: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Kota</Text>
              <TextInput 
                value={this.state.kota}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ kota: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Provinsi</Text>
              <TextInput 
                value={this.state.provinsi}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ provinsi: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Kode Pos</Text>
              <TextInput 
                value={this.state.kodepos}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ kodepos: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Kata Sandi</Text>
              <TextInput 
                value={this.state.katasandi}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setState({ katasandi: text })}
                underlineColorAndroid="#ef434e"
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center', width: 104, height: 34, backgroundColor: '#ef434e', borderRadius: 3 }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>SIMPAN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 10, 
    paddingVertical: 15
  },
  titleTextInput: { 
    fontSize: 9, 
    fontFamily: 'OpenSans-Regular', 
    color: '#878787' 
  },
  textInput: {
    height: 40, color: '#4a4a4a', fontFamily: 'OpenSans-Regular'
  }
});

export default EditProfile;
