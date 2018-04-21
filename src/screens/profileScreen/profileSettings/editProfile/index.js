import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, NavigationBar } from '../../../../components';
import { updateProfile } from '../../../../actions/profileActions'
import ProfileCard from '../../../../components/card/profile';
import { Spinner } from '../../../../components';

class EditProfile extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      userData: {
        _id: '',
        nama: '',
        email: '',
        alamat: '',
        no_telp: '',
        tempat_lahir: '',
        tgl_lahir: ''
      },
      loading: false
    };
  }

  copyUserData(obj) {
    const currentUser = Object.create(obj);
    const userDataKeys = Object.keys(this.state.userData);

    const copiedData = {};
    userDataKeys.forEach((key) => {
      if (currentUser[key]) {
        copiedData[key] = currentUser[key]
      }
    })

    const newUserData = {
      ...this.state.userData,
      ...copiedData
    }

    this.setState({
      userData: newUserData
    })
  }

  componentDidMount(){
    this.copyUserData(this.props.currentUser);
  }

  updateProfile = () => {
    this.setState({
      loading: true
    })

    this.props.updateProfile(this.state.userData).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  setUserData(key, value) {
    this.setState({
      userData : {
        ...this.state.userData,
        [key]: value
      }
    })
  }

  render() {
    const { userData, loading } = this.state;
    return (
      <View
        style={styles.container}
      >
        {
          loading &&
			    <Spinner color="#FFDE00" text="Updating profile..." size="large" />
        }
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
        <ProfileCard />
        <View style={{ flex: 3, marginTop: 10 }}>
          <ScrollView>
            <View>
              <Text style={styles.titleTextInput}>Username</Text>
              <TextInput
                value={userData.nama}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('nama', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Email</Text>
              <TextInput
                value={userData.email}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('email', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Alamat</Text>
              <TextInput
                value={userData.alamat}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('alamat', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Nomor Handphone</Text>
              <TextInput
                value={userData.no_telp}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('no_telp', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Tempat Lahir</Text>
              <TextInput
                value={userData.tempat_lahir}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('tempat_lahir', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
            <View>
              <Text style={styles.titleTextInput}>Tanggal Lahir</Text>
              <TextInput
                value={userData.tgl_lahir}
                style={styles.textInput}
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('tgl_lahir', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={ this.updateProfile }
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

const mapDispatchToProps = dispatch => ({
	updateProfile: userData => dispatch(updateProfile(userData))
});

const mapStateToProps = state => ({
	currentUser: state.authReducer.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
