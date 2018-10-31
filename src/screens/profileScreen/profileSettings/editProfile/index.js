import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  ActionSheetIOS,
  Platform,
  DatePickerAndroid,
  Keyboard,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { NavigationBar, Spinner, SnackBar } from '../../../../components';
import { updateProfile } from '../../../../actions/profileActions';
import ProfileCard from '../../../../components/card/profile';
import DatePickerDialog from '../../../../components/DatePickerIOSModal';
import color from '../../../../style/color';
import { API_CALL } from '../../../../utils/ajaxRequestHelper';
import InsuranceList from './InsuranceList';

const DEVICE_HEIGHT = Dimensions.get('window').height;

// constants for picker
const jenisKelamin = [
  {
    label: 'Laki-laki',
    value: 'L'
  },
  {
    label: 'Perempuan',
    value: 'P'
  }
]

const jenisDiabetes = [
  {
    label: 'Pre-diabetes',
    value: 'Pre-diabetes'
  },
  {
    label: 'Diabetes type1',
    value: 'Diabetes type1'
  },
  {
    label: 'Diabetes type2',
    value: 'Diabetes type2',
  },
  {
    label: 'Gestational',
    value: 'Gestational'
  }
]

const tipeDiabetesi = [
  {
    label: 'Diabetesi',
    value: 'diabetesi'
  },
  {
    label: 'Non Diabetesi',
    value: 'non-diabetesi'
  },
]


const getLabelByVal = (options, val) => {
  let result
  options.forEach((item) => {
    if (item.value === val) {
      result = item.label
    }
  })
  return result
}


import { fontMaker } from '../../../../utils/fontMaker';

class EditProfile extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      keyboardActive: false,
      activeTab: 0,
      // state to store insuranceList
      insuranceList: [],
      userData: {
        _id: '',
        nama: '',
        tgl_lahir: '',
        alamat: '',
        jenis_kelamin: '',
        diabetesi_tipe: 'Pre-diabetes',
        no_telp: '',
        tipe_user: 'non-diabetesi'
      },
      errors: {
        nama: {
          label: 'Username tidak boleh kosong',
          isError: false
        }
      },
      submitted: false,
      isLoading: false,
      showSnackBar: false,
      message: ''
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });

    if(this.props.fromFWD){
      this.setState({
        activeTab: 1
      });
    }

  }

  componentDidMount() {
    this.copyUserData(this.props.currentUser);

    // FETCH INSURANCE DATA HERE
    this.getInsurance();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  getInsurance = async () => {
    // CALL API TO GET API LIST AND SET INSURANCE LIST
    const option = {
      method: 'get',
      url: '/api/insurance'
    };

    try {
      const {
        data: {
          data: { insurances }
        }
      } = await API_CALL(option);
      this.setState({ insuranceList: insurances });

    } catch (error) {
      console.log(error);
    }
  };

  copyUserData(obj) {
    const currentUser = Object.create(obj);
    const userDataKeys = Object.keys(this.state.userData);

    const copiedData = {};
    userDataKeys.forEach(key => {
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

  isValid() {
    return !this.state.errors.nama.isError;
  }

  updateProfileOnCLick = () => {
    this.submitValidation(() => {
      if (
        this.state.userData.nama.trim() !== '' &&
        this.state.userData.tgl_lahir !== '' &&
        this.state.userData.alamat !== '' &&
        this.state.userData.jenis_kelamin !== '' &&
        this.state.userData.no_telp !== ''
      ) {
        console.log('check user')
        console.log(this.state.userData)
        this.setState({
          isLoading: true
        });
        this.props.updateProfile(this.state.userData).then(() => {
          this.setState(
            {
              isLoading: false
            },
            () => {
              this.showSnackBar();
              setTimeout(() => {
                this.props.navigator.pop();
              }, 1000);
            }
          );
        });
      } else {
        Alert.alert('Perhatian!', 'Data tidak boleh kosong.');
      }
    });
  };

  setUserData(key, value) {
    this.setState({
      userData: {
        ...this.state.userData,
        [key]: value
      }
    });
  }

  submitValidation(cb) {
    if (
      this.state.userData.nama.trim() === '' &&
      this.state.userData.tgl_lahir === '' &&
      this.state.userData.alamat === '' &&
      this.state.userData.no_telp === ''
    ) {
      this.setState(
        {
          errors: {
            ...this.state.errors,
            nama: {
              ...this.state.errors.nama,
              isError: true
            }
          }
        },
        cb
      );
    } else {
      this.setState(
        {
          errors: {
            ...this.state.errors,
            nama: {
              ...this.state.errors.nama,
              isError: false
            }
          }
        },
        cb
      );
    }
  }

  async openDatePicker() {
    if (Platform.OS === 'android') {
      try {
        const result = await DatePickerAndroid.open({
          date: new Date(this.state.userData.tgl_lahir),
          mode: 'spinner'
        });
        if (result.action !== DatePickerAndroid.dismissedAction) {
          const { year, month, day } = result;
          // Selected year, month (0-11), day
          this.setUserData(
            'tgl_lahir',
            moment()
              .set('year', year)
              .set('month', month)
              .set('date', day)
          );
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    }
  }

  showSnackBar = (cb = () => { }) => {
    this.setState({ showSnackBar: true, message: 'Data telah berhasil diubah.' }, () => {
      this.hideSnackBar();
      cb();
    });
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 2000);
  };

  addInsurance = () => {
    this.props.navigator.push({
      screen: 'Temandiabetes.CreateAsuransi',
      navigatorStyle: {
        navBarHidden,
        tabBarHidden: true
      }
    });
  };

  onClickDeleteInsuranceItem = (id, index) => {
    this.props.navigator.showLightBox({
      screen: 'TemanDiabetes.LightBox',
      passProps: {
        title: 'Hapus Asuransi',
        content: 'Apakah Anda yakin akan menghapus asuransi?',
        confirmText: 'Hapus',
        prePurchase: (item, cb) => {
          this.deleteInsuranceItem(id, index, cb);
        }
      },
      style: {
        backgroundBlur: 'dark',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        tapBackgroundToDismiss: true
      }
    });
  };

  deleteInsuranceItem = async (id, index, cb) => {
    const option = {
      method: 'delete',
      url: '/api/insurance',
      data: {
        insuranceId: id
      }
    };

    try {
      if (cb) {
        cb();
      }

      this.setState({
        isLoading: true
      });

      await API_CALL(option);

      // delete the item
      this.setState({
        insuranceList: [
          ...this.state.insuranceList.slice(0, index),
          ...this.state.insuranceList.slice(index + 1)
        ],
        isLoading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateInsuranceItem = (id, verified) => {
    if(verified){
      this.props.navigator.showLightBox({
        screen: 'TemanDiabetes.LightBox',
        passProps: {
          title: 'Peringatan',
          content: 'Data asuransi anda sudah di verifikasi dan tidak dapat diubah.',
          fromFWD: true
        },
        style: {
          backgroundBlur: 'dark',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          tapBackgroundToDismiss: true
        }
      });
    } else{
      this.props.navigator.push({
        screen: 'TemanDiabetes.CreateAsuransi',
        navigatorStyle: {
          navBarHidden: true,
          tabBarHidden: true
        },
        passProps: {
          onSuccessCallback: () => {
            this.getInsurance();
          },
          insuranceId: id,
          method: 'edit'
        }
      });
    }
  };

  // format options = array of { label: 'Some label', value: 'Some value' }
  openIOSPicker(options = [], title, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [...options.map(item => item.label), 'Batal'],
      title,
      destructiveButtonIndex: options.length
    },
      (buttonIndex) => {
        if (options[buttonIndex]) {
          onSelect(options[buttonIndex].value)
        }
      });
  }

  render() {
    const { userData, isLoading, errors } = this.state;
    const { currentUser } = this.props;
    // const dateOfBirth = this.handleDisplayDate();
    return (
      <View style={styles.container}>
        <NavigationBar onPress={() => this.props.navigator.pop()} title="PROFIL" />
        {/*  Header Container */}
        {
          !this.state.keyboardActive &&
          <View
            style={{
              padding: 10
            }}
          >
            {isLoading && <Spinner color="#EF434F" text="Memperbarui profil..." size="large" />}
            <ProfileCard
              updateLoadingState={(isLoading, cb) => {
                this.setState({ isLoading }, cb);
              }}
            />
          </View>
        }

        {/*  TAB */}
        {
          !this.state.keyboardActive &&
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ef434e'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ activeTab: 0 });
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 104,
                height: 34,
                borderRadius: 3
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans' }}>
                PROFIL
              </Text>
              {this.state.activeTab === 0 && (
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: 3,
                    width: '10%',
                    borderBottomColor: '#fff'
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ activeTab: 1 });
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: 104,
                height: 34,
                backgroundColor: '#ef434e',
                borderRadius: 3
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans' }}>
                ASURANSI
              </Text>
              {this.state.activeTab === 1 && (
                <View
                  style={{
                    borderBottomWidth: 4,
                    marginTop: 3,
                    width: '10%',
                    borderBottomColor: '#fff'
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        }

        { /*  Content Container */}
        <View style={{
          flex: 1,
          backgroundColor: this.state.activeTab === 1 ? color.solitude : '#fff',
          paddingHorizontal: 10,
        }}>
          { /*  EDIT PROFILE TAB CONTENT */}
          {
            this.state.activeTab === 0 &&
            <ScrollView
              ref="editProfileScroll"
              contentContainerStyle={{
                backgroundColor: '#fff',
                paddingTop: 10,
                paddingBottom: this.state.keyboardActive ? (DEVICE_HEIGHT / 2) - 50 : 10,
              }}
            >
              <View style={styles.fieldWrapper}>
                <Text style={styles.titleTextInput}>Username</Text>
                <TextInput
                  value={userData.nama}
                  style={styles.textInput}
                  placeholderTextColor="#4a4a4a"
                  onChangeText={text => this.setUserData('nama', text)}
                  underlineColorAndroid="#ef434e"
                />
                {
                  Platform.OS === 'ios' &&
                  <View style={styles.underLine}></View>
                }
                {errors.nama.isError && <Text style={styles.errorText}>{errors.nama.label}</Text>}
              </View>
              <View style={styles.fieldWrapper}>
                <Text style={styles.titleTextInput}>Tanggal Lahir</Text>
                {
                  Platform.OS === 'android' &&
                  <TouchableOpacity
                    style={{ height: 40, marginLeft: 0 }}
                    onPress={() => {
                      this.openDatePicker();
                    }}
                  >
                    <Text style={[styles.textInput, { marginTop: 9 }]}>{
                      userData.tgl_lahir && userData.tgl_lahir !== '' ? moment(userData.tgl_lahir).format('YYYY-MM-DD') : ''
                    }</Text>
                  </TouchableOpacity>
                }
                {
                  Platform.OS === 'ios' &&
                  <TouchableOpacity
                    style={{ height: 40, marginLeft: 0 }}
                    onPress={() => {
                      this.refs.dobDialog.open({
                        date: new Date(),
                        maxDate: new Date() //To restirct past date
                      })
                    }}
                  >
                    <Text style={[styles.textInput, { marginTop: 9 }]}>{
                      userData.tgl_lahir && userData.tgl_lahir !== '' ? moment(userData.tgl_lahir).format('YYYY-MM-DD') : ''
                    }</Text>
                  </TouchableOpacity>
                }
                <View style={styles.underLine}></View>
                {
                  Platform.OS === 'ios' &&
                  <DatePickerDialog
                    ref="dobDialog"
                    okLabel="Pilih"
                    cancelLabel="Batal"
                    onDatePicked={(val) => { this.setUserData('tgl_lahir', val) }}
                  />
                }
              </View>
              <View style={styles.fieldWrapper}>
                <Text style={styles.titleTextInput}>Alamat</Text>
                <TextInput
                  value={userData.alamat}
                  style={styles.textInput}
                  placeholderTextColor="#4a4a4a"
                  onChangeText={text => this.setUserData('alamat', text)}
                  underlineColorAndroid="#ef434e"
                />
                {
                  Platform.OS === 'ios' &&
                  <View style={styles.underLine}></View>
                }
              </View>
              <View style={styles.fieldWrapper}>
                <Text style={styles.titleTextInput}>Jenis Kelamin</Text>
                {
                  Platform.OS === 'android' &&
                  <View>
                    <Picker
                      selectedValue={userData.jenis_kelamin}
                      style={styles.picker}
                      onValueChange={itemValue => this.setUserData('jenis_kelamin', itemValue)}
                    >
                      <Picker.Item label="Pilih jenis kelamin" value="" />
                      <Picker.Item label="Laki-laki" value="L" />
                      <Picker.Item label="Perempuan" value="P" />
                    </Picker>
                  </View>
                }
                {
                  Platform.OS === 'ios' &&
                  <TouchableOpacity
                    style={{ height: 35, marginLeft: 0 }}
                    onPress={() => {
                      const option = jenisKelamin;
                      const title = 'Jenis Kelamin';
                      const onSelect = val => this.setUserData('jenis_kelamin', val);
                      this.openIOSPicker(option, title, onSelect);
                    }}
                  >
                    <Text style={[styles.textInput, { marginTop: 9 }]}>{getLabelByVal(jenisKelamin, userData.jenis_kelamin)}</Text>
                  </TouchableOpacity>
                }
                <View style={styles.underLine}></View>
              </View>
              <View style={styles.fieldWrapper}>
                <Text style={styles.titleTextInput}>Tipe User</Text>
                {
                  Platform.OS === 'android' &&
                  <View>
                    <Picker
                      pickerStyle={{ fontSize: 25 }}
                      selectedValue={userData.tipe_user}
                      style={styles.picker}
                      // onValueChange={itemValue => this.setUserData('diabetesi_tipe', itemValue)}
                      onValueChange={itemValue => this.setUserData('tipe_user', itemValue)}
                    >
                      {/* <Picker.Item label="Pre-diabetes" value="Diabetes" />
                        <Picker.Item label="Diabetes type1" value="Diabetes type1" />
                        <Picker.Item label="Diabetes type2" value="Diabetes type2" />
                        <Picker.Item label="Gestational" value="Gestational" /> */}
                      <Picker.Item label="Diabetesi" value="diabetesi" />
                      <Picker.Item label="Non Diabetesi" value="non-diabetesi" />
                    </Picker>
                  </View>
                }
                {
                  Platform.OS === 'ios' &&
                  <TouchableOpacity
                    style={{ height: 40, marginLeft: 0 }}
                    onPress={() => {
                      const option = tipeDiabetesi
                      const title = 'Tipe Diabetes'
                      const onSelect = val => this.setUserData('tipe_user', val)
                      this.openIOSPicker(option, title, onSelect)
                    }}
                  >
                    <Text style={[styles.textInput, { marginTop: 9 }]}>{getLabelByVal(tipeDiabetesi, userData.tipe_user)}</Text>
                  </TouchableOpacity>
                }
                <View style={styles.underLine}></View>
              </View>
              {this.state.userData.tipe_user === 'diabetesi' && (
                <View style={styles.fieldWrapper}>
                  <Text style={styles.titleTextInput}>Jenis Diabetes</Text>
                  {
                    Platform.OS === 'android' &&
                    <View>
                      <Picker
                        pickerStyle={{ fontSize: 25 }}
                        selectedValue={userData.diabetesi_tipe}
                        style={styles.picker}
                        onValueChange={itemValue => this.setUserData('diabetesi_tipe', itemValue)}
                      >
                        <Picker.Item label="Pre-diabetes" value="Pre-diabetes" />
                        <Picker.Item label="Diabetes type1" value="Diabetes type1" />
                        <Picker.Item label="Diabetes type2" value="Diabetes type2" />
                        <Picker.Item label="Gestational" value="Gestational" />
                      </Picker>
                    </View>
                  }
                  {
                    Platform.OS === 'ios' &&
                    <TouchableOpacity
                      style={{ height: 40, marginLeft: 0 }}
                      onPress={() => {
                        const option = jenisDiabetes
                        const title = 'Jenis Diabetes'
                        const onSelect = val => this.setUserData('diabetesi_tipe', val)
                        this.openIOSPicker(option, title, onSelect)
                      }}
                    >
                      <Text style={[styles.textInput, { marginTop: 9 }]}>{getLabelByVal(jenisDiabetes, userData.diabetesi_tipe)}</Text>
                    </TouchableOpacity>
                  }
                  <View style={styles.underLine}></View>
                </View>
              )}
              <View style={styles.fieldWrapper}>
                <Text style={styles.titleTextInput}>No Hp</Text>
                <TextInput
                  value={userData.no_telp}
                  style={styles.textInput}
                  onFocus={() => {
                    setTimeout(() => {
                      this.refs.editProfileScroll.scrollToEnd();
                    }, 1000);
                  }}
                  keyboardType="numeric"
                  placeholderTextColor="#4a4a4a"
                  onChangeText={text => this.setUserData('no_telp', text)}
                  underlineColorAndroid="#ef434e"
                />
                {
                  Platform.OS === 'ios' &&
                  <View style={styles.underLine}></View>
                }
              </View>
              {
                !this.state.keyboardActive &&
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.updateProfileOnCLick();
                    }}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 104,
                      height: 34,
                      backgroundColor: '#ef434e',
                      borderRadius: 3
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 12, fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans' }}>
                      SIMPAN
                  </Text>
                  </TouchableOpacity>
                </View>
              }
            </ScrollView>
          }

          { /* EDIT INSURANCE TAB CONTENT*/}
          {
            this.state.activeTab === 1 &&
            <View style={{ flex: 1 }}>

              { /* INSURANCE LIST */}
              {
                this.state.insuranceList.length > 0 &&
                <InsuranceList
                  navigator={this.props.navigator}
                  getInsurance={this.getInsurance}
                  data={this.state.insuranceList}
                  onDeleteItem={this.onClickDeleteInsuranceItem}
                  onUpdateItem={this.updateInsuranceItem}
                />
              }

              {/* EMPTY INSURANCE LIST PLACEHOLDER */}
              {this.state.insuranceList.length === 0 && (
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1,
                    paddingTop: 70
                  }}
                >
                  <Image
                    source={require('../../../../assets/icons/insurance.png')}
                    style={{
                      height: 90,
                      width: 100,
                      marginBottom: 15
                    }}
                  />
                  <View
                    style={{
                      marginHorizontal: 25
                    }}
                  >
                    <Text style={{ textAlign: 'center' }}>Anda belum memiliki asuransi.</Text>
                    <Text style={{ textAlign: 'center' }}>
                      Silahkan tambahkan asuransi untuk menghubungkan ke aplikasi Teman Diabetes
                  </Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity
                      onPress={debounce(
                        () =>
                          this.props.navigator.push({
                            screen: 'TemanDiabetes.CreateAsuransi',
                            navigatorStyle: {
                              navBarHidden: true,
                              tabBarHidden: true
                            },
                            passProps: {
                              onSuccessCallback: () => {
                                this.getInsurance();
                              }
                            }
                          }),
                        500,
                        {
                          leading: true,
                          trailing: false
                        }
                      )}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 155,
                        height: 34,
                        backgroundColor: '#ef434e',
                        borderRadius: 3
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans',
                          textAlign: 'center'
                        }}
                      >
                        TAMBAH ASURANSI
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          }
        </View>
        <SnackBar
          visible={this.state.showSnackBar}
          textMessage={this.state.message}
          position="top"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15
  },
  fieldWrapper: {
    paddingHorizontal: 5,
    marginBottom: 8
  },
  titleTextInput: {
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans',
    color: '#878787'
  },
  picker: {
    color: '#4a4a4a'
  },
  underLine: {
    borderBottomColor: '#ef434e',
    borderBottomWidth: 1,
  },
  pickerWrapper: {
    borderBottomColor: '#ef434e',
    borderBottomWidth: 1,
  },
  textInput: {
    height: 45,
    color: '#4a4a4a',
    fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginHorizontal: 5
  }
});

const mapDispatchToProps = dispatch => ({
  updateProfile: userData => dispatch(updateProfile(userData))
});

const mapStateToProps = state => ({
  currentUser: state.authReducer.currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
