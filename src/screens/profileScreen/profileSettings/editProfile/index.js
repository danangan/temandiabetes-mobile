import React from 'react';
import { connect } from 'react-redux';
import moment, { now } from 'moment';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  DatePickerAndroid,
  Platform,
  Alert
} from 'react-native';
import { Avatar, NavigationBar } from '../../../../components';
import { updateProfile } from '../../../../actions/profileActions'
import ProfileCard from '../../../../components/card/profile';
import { Spinner } from '../../../../components';
import { dateFormatter } from '../../../../utils/helpers';

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
        tgl_lahir: '',
        alamat: '',
        jenis_kelamin: 'L',
        diabetesi_tipe: 'Pre-diabetes',
        no_telp: '',
      },
      errors: {
        nama: {
          label: 'Username tidak boleh kosong',
          isError: false
        }
      },
      submitted: false,
      isLoading: false
    };
  }

  submitValidation(cb) {
    if (this.state.userData.nama.trim() === '' && 
        this.state.userData.tgl_lahir === '' && 
        this.state.userData.alamat === '' &&
        this.state.userData.no_telp === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          nama: {
            ...this.state.errors.nama,
            isError: true
          }
        }
      }, cb)
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          nama: {
            ...this.state.errors.nama,
            isError: false
          }
        }
      }, cb)
    }
  }

  isValid() {
    return !this.state.errors.nama.isError
  }

  copyUserData(obj) {
    const currentUser = Object.create(obj);
    const userDataKeys = Object.keys(this.state.userData);

    const copiedData = {};
    userDataKeys.forEach((key) => {
      if (currentUser[key]) {
        copiedData[key] = currentUser[key];
      }
    });

    const newUserData = {
      ...this.state.userData,
      ...copiedData
    };

    this.setState({
      userData: newUserData
    });
  }

  componentDidMount(){
    this.copyUserData(this.props.currentUser);
  }

  updateProfileOnCLick = () => {
    this.submitValidation(() => {
      if (this.state.userData.nama.trim() !== '' && 
        this.state.userData.tgl_lahir !== '' && 
        this.state.userData.alamat !== '' &&
        this.state.userData.no_telp !== '') {
        this.setState({
          isLoading: true
        });
        this.props.updateProfile(this.state.userData).then(() => {
          this.setState({
            isLoading: false
          }, () => {
            Alert.alert(
              'Perhatian!',
              'Data telah berhasil disimpan.',
              [
                { text: 'OK', onPress: () => this.props.navigator.pop() }
              ]
            );
          });
        });
      } else {
        Alert.alert(
          'Perhatian!',
          'Data tidak boleh kosong.'
        );
      }
    });
  }

  setUserData(key, value) {
    this.setState({
      userData : {
        ...this.state.userData,
        [key]: value
      }
    });
  }

  async openDatePicker() {
    if (Platform.OS === 'android') {
      try {
        const result = await DatePickerAndroid.open({
          date: new Date(this.state.userData.tgl_lahir)
        });
        if (result.action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          // console.log('HASIL PICK DATE ', result);
          this.setUserData('tgl_lahir', `${result.year}-${result.month + 1}-${result.day}`);
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }
  }

  render() {
    const { userData, isLoading, errors } = this.state;
    const { currentUser } = this.props;
    const dateOfBirth = moment(this.state.userData.tgl_lahir).format('l') === 'Invalid date' ? moment().format('l') : moment(this.state.userData.tgl_lahir).format('l')
    // const completeTglLahir = `${lahir.year()}-${lahir.month()+1}-${lahir.date()}`;
    
    return (
      <View
        style={styles.container}
      >
        {
          isLoading &&
			    <Spinner color="#EF434F" text="Memperbarui profil..." size="large" />
        }
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFILE" />
        <ProfileCard updateLoadingState={(isLoading, cb) => {this.setState({isLoading}, cb)}} />
        <View style={{ flex: 3, marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
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
              {
                errors.nama.isError &&
                <Text style={styles.errorText}>{errors.nama.label}</Text>
              }
            </View>
            <View>
              <Text style={styles.titleTextInput}>Tanggal Lahir</Text>
              <TouchableOpacity
                style={[styles.pickerWrapper, { height:35, marginLeft: 5 }]}
                onPress={() => { this.openDatePicker() }}
              >
                <Text style={[styles.textInput, { marginTop:9 }]}>{dateOfBirth}</Text>
              </TouchableOpacity>
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
              <Text style={styles.titleTextInput}>Jenis Kelamin</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={userData.jenis_kelamin}
                  style={styles.picker}
                  onValueChange={(itemValue) => this.setUserData('jenis_kelamin', itemValue)}>
                  <Picker.Item label="Laki-laki" value="L" />
                  <Picker.Item label="Perempuan" value="P" />
                </Picker>
              </View>
            </View>
            {
              currentUser.tipe_user === 'diabetesi' &&
              <View>
                <Text style={styles.titleTextInput}>Jenis Diabetes</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    pickerStyle={{ fontSize: 25 }}
                    selectedValue={userData.diabetesi_tipe}
                    style={styles.picker}
                    onValueChange={(itemValue) => this.setUserData('diabetesi_tipe', itemValue)}>
                    <Picker.Item label="Pre-diabetes" value="Pre-diabetes" />
                    <Picker.Item label="Diabetes type1" value="Diabetes type1" />
                    <Picker.Item label="Diabetes type2" value="Diabetes type2" />
                    <Picker.Item label="Gestational" value="Gestational" />
                  </Picker>
                </View>
              </View>
            }
            <View>
              <Text style={styles.titleTextInput}>No Hp</Text>
              <TextInput
                value={userData.no_telp}
                style={styles.textInput}
                keyboardType="numeric"
                placeholderTextColor="#4a4a4a"
                onChangeText={(text) => this.setUserData('no_telp', text)}
                underlineColorAndroid="#ef434e"
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={ () => { this.updateProfileOnCLick() } }
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
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: '#878787'
  },
  picker: {
    color: '#4a4a4a',
  },
  pickerWrapper: {
    borderBottomColor: '#ef434e',
    borderBottomWidth: 1,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 8
  },
  textInput: {
    height: 45,
    color: '#4a4a4a',
    fontFamily: 'OpenSans-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 5,
  }
});

const mapDispatchToProps = dispatch => ({
	updateProfile: userData => dispatch(updateProfile(userData))
});

const mapStateToProps = state => ({
	currentUser: state.authReducer.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
