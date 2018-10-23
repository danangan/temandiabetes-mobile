import React from 'react';
import {
  View,
  ActionSheetIOS,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import { NavigationBar, Spinner } from '../../components';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import Style from '../../style/defaultStyle';

const DEVICE_HEIGHT = Dimensions.get('window').height;

const tipeAsuransi = [
  {
    label: 'Pribadi',
    value: 'pribadi'
  },
  {
    label: 'Perusahaan',
    value: 'perusahaan'
  }
];

class CreateAsuransi extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  constructor(props) {
    super(props);
    this.state = {
      keyboardActive: false,
      // set default value
      namaAsuransi: '',
      // set default value
      tipeAsuransi: '',
      insuranceNameList: [],
      nomorAsuransi: '',
      nomorPolis: '',
      _errors: null,
      errorMessage: '',
      isLoading: false, 
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true }, () => {
        setTimeout(() => {
          this.refs.formView.scrollToEnd();
        }, 600);
      });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });
  }

  async componentDidMount() {
    // get insurance data if edit
    if(this.props.fromFWD){
      this.setState({
        namaAsuransi: this.props.NamaAsuransi,
        tipeAsuransi: this.props.TipeAsuransi,
        nomorAsuransi: this.props.NoAsuransi,
        nomorPolis: this.props.NoPolis,
      });
    } else{
      if (this.props.insuranceId) {
        const option = {
          method: 'get',
          url: `/api/insurance/${this.props.insuranceId}`
        };
  
        try {
          const {
            data: { data }
          } = await API_CALL(option);
  
          const { name, type, insuranceNumber, policyNumber } = data[0].insurances[0];
  
          this.setState({
            namaAsuransi: name,
            tipeAsuransi: type,
            nomorAsuransi: insuranceNumber,
            nomorPolis: policyNumber
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    // get the insurance list data
    const option = {
      method: 'get',
      url: '/api/insurance/list'
    };

    try {
      const {
        data: {
          data: { docs }
        }
      } = await API_CALL(option);

      this.setState({
        insuranceNameList: docs
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  async onSubmitHandler() {
    const { namaAsuransi, tipeAsuransi, nomorAsuransi, nomorPolis } = this.state;
    const isComplete = this.formValidation();

    this.setState({ isLoading: true });

    if (Object.keys(isComplete).length === 0) {
      const option = {
        url: '/api/insurance',
        data: {
          name: namaAsuransi,
          type: tipeAsuransi,
          insuranceNumber: nomorAsuransi,
          policyNumber: nomorPolis
        }
      };

      // if props exist then it is an update action
      // if not it is a post
      if(this.props.fromFWD){
        option.method = 'post';

      } else{
        if (this.props.insuranceId) {
          option.method = 'put';
          option.data.insuranceId = this.props.insuranceId;
        } else {
          option.method = 'post';
        }
      }
      

      try {
        await API_CALL(option);

        if (this.props.onSuccessCallback) {
          this.props.onSuccessCallback();
        }
        await this.setState({ _errors: null, isLoading: false }, () => {
          Alert.alert(
            'Perhatian!',
            this.props.fromFWD 
              ? 'Asuransi berhasil di simpan.'
              : this.props.insuranceId
                ? 'Asuransi berhasil diperbarui'
                : 'Asuransi berhasil di simpan.',
            [
              {
                text: 'Tutup',
                onPress: () => {
                  this.props.navigator.pop();
                }
              }
            ]
          );
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({ isLoading: false });
    }
  }

  checkError(params) {
    if (this.state._errors !== null) {
      const isErrorExist = Object.keys(this.state._errors).filter(err => err === params).length > 0;
      if (isErrorExist) {
        return this.state._errors[`${params}`][0];
      }
    }
  }

  formValidation() {
    const errors = [];
    if (this.state.namaAsuransi === '') {
      errors.namaAsuransi = ['Nama asuransi tidak boleh kosong'];
    }

    if (this.state.tipeAsuransi === '') {
      errors.tipeAsuransi = ['Tipe asuransi tidak boleh kosong'];
    }

    if (this.state.nomorAsuransi === '' && this.state.tipeAsuransi == 'perusahaan') {

      errors.nomorAsuransi = ['Nomor asuransi tidak boleh kosong'];
    }

    if (this.state.nomorPolis === '' && this.state.tipeAsuransi == 'pribadi') {
      errors.nomorPolis = ['Nomor polis tidak boleh kosong'];
    }

    if (Object.keys(errors).length) {
      this.setState({
        _errors: errors
      });
    }
    return errors;
  }

  // format options = array of { label: 'Some label', value: 'Some value' }
  openIOSPicker(options = [], title, onSelect) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options.map(item => item.label), 'Batal'],
        title,
        destructiveButtonIndex: options.length
      },
      buttonIndex => {
        if (options[buttonIndex]) {
          onSelect(options[buttonIndex].value);
        }
      }
    );
  }

  getLabelByVal = (options, val) => {
    let result;
    options.forEach(item => {
      if (item.value === val) {
        result = item.label;
      }
    });
    if (result) {
      return result;
    }
    return val;
  };

  render() {
    const spinner = this.state.isLoading ? (
      <Spinner color="#EF434F" text="Loading..." size="large" />
    ) : (
      <View />
    );

    return (
      <View style={styles.container}>
        {spinner}
        <View
          style={{ flex: 0, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10 }}
        >
          <NavigationBar onPress={() => this.props.navigator.pop()} title="Data Asuransi" />
        </View>
        <View
          style={{
            flex: 4.5,
            backgroundColor: '#f3f5fe',
            paddingTop: 10,
            paddingBottom: this.state.keyboardActive ? DEVICE_HEIGHT * 0.42 : 10,
            paddingHorizontal: 10
          }}
        >
          {
            !this.state.keyboardActive &&
            <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', height: '20%' }}>
              <Text style={styles.titleForm}>{
                  this.props.fromFWD ? 'Lengkapi Data Asuransi' : this.props.insuranceId ? 'Ubah Data Asuransi' : 'Lengkapi Data Asuransi'
                }
              </Text>
            </View>
          }
          <ScrollView
            style={{ paddingBottom: 0 }}
            ref="formView"
          >
            <View style={styles.wrapperField}>
              <View
                style={{
                  ...styles.fieldItemWrap,
                  backgroundColor: this.props.insuranceId ? '#eee' : '#fff'
                }}
              >
                <Text style={styles.titleField}>Nama Asuransi</Text>
                <View style={styles.pickerWrapper}>
                  {Platform.OS === 'android' && (
                    <Picker
                      enabled={!this.props.insuranceId}
                      pickerStyleType={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
                      selectedValue={this.state.namaAsuransi}
                      style={{ height: 50, width: '100%', color: '#4a4a4a', bottom: 5 }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ namaAsuransi: itemValue })
                      }
                    >
                      <Picker.Item label="Pilih asuransi" value="" />
                      {this.state.insuranceNameList.map(item => (
                        <Picker.Item label={item.name} value={item.name} />
                      ))}
                    </Picker>
                  )}
                  {Platform.OS === 'ios' &&
                    !this.props.insuranceId && (
                      <TouchableOpacity
                        style={{ height: 35, marginLeft: 0 }}
                        onPress={() => {
                          const option = this.state.insuranceNameList.map(item => ({
                            value: item.name,
                            label: item.name
                          }));
                          const title = 'Nama asuransi';
                          const onSelect = val => this.setState({ namaAsuransi: val });
                          this.openIOSPicker(option, title, onSelect);
                        }}
                      >
                        <Text style={{ marginTop: 9, marginLeft: 5 }}>
                          {this.state.namaAsuransi === ''
                            ? 'Pilih asuransi'
                            : this.state.namaAsuransi}
                        </Text>
                      </TouchableOpacity>
                    )}
                  {Platform.OS === 'ios' &&
                    this.props.insuranceId && (
                      <Text style={{ marginLeft: 5, marginVertical: 8 }}>
                        {this.state.namaAsuransi}
                      </Text>
                    )}
                </View>
                <Text style={styles.errorMessage}>{this.checkError('namaAsuransi')}</Text>
              </View>
              <View
                style={{
                  ...styles.fieldItemWrap,
                  backgroundColor: this.props.insuranceId ? '#eee' : '#fff'
                }}
              >
                <Text style={styles.titleField}>Tipe Asuransi</Text>
                <View style={styles.pickerWrapper}>
                  {Platform.OS === 'android' && (
                    <Picker
                      enabled={!this.props.insuranceId}
                      pickerStyleType={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
                      selectedValue={this.state.tipeAsuransi}
                      style={{ height: 50, width: '100%', color: '#4a4a4a', bottom: 5 }}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({ tipeAsuransi: itemValue });
                      }}
                    >
                      <Picker.Item label="Pilih tipe asuransi" value="" />
                      <Picker.Item label="Perusahaan" value="perusahaan" />
                      <Picker.Item label="Pribadi" value="pribadi" />
                    </Picker>
                  )}
                  {Platform.OS === 'ios' &&
                    !this.props.insuranceId && (
                      <TouchableOpacity
                        style={{ height: 35, marginLeft: 0 }}
                        onPress={() => {
                          const option = tipeAsuransi;
                          const title = 'Nama asuransi';
                          const onSelect = val => this.setState({ tipeAsuransi: val });
                          this.openIOSPicker(option, title, onSelect);
                        }}
                      >
                        <Text style={{ marginTop: 9, marginLeft: 5 }}>
                          {this.getLabelByVal(tipeAsuransi, this.state.tipeAsuransi) === '' ? 'Pilih tipe asuransi' : this.getLabelByVal(tipeAsuransi, this.state.tipeAsuransi)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  {Platform.OS === 'ios' &&
                    this.props.insuranceId && (
                      <Text style={{ marginLeft: 5, marginVertical: 8 }}>
                        {this.state.tipeAsuransi}
                      </Text>
                    )}
                </View>
                <Text style={styles.errorMessage}>{this.checkError('tipeAsuransi')}</Text>
              </View>
              {this.state.tipeAsuransi === 'perusahaan' && (
                <View style={styles.fieldItemWrap}>
                  <Text style={styles.titleField}>Nomor Asuransi</Text>
                  <View style={styles.pickerWrapper}>
                    <TextInput
                      editable = {!this.props.fromFWD}
                      keyboardType="numeric"
                      style={{ height: 40 }}
                      value={this.state.nomorAsuransi}
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setState({ nomorAsuransi: text })}
                    />
                  </View>
                  <Text style={styles.errorMessage}>{this.checkError('nomorAsuransi')}</Text>
                </View>
              )}
              <View style={styles.fieldItemWrap}>
                <Text style={styles.titleField}>Nomor Polis</Text>
                <View style={styles.pickerWrapper}>
                  <TextInput
                    editable = {!this.props.fromFWD}
                    keyboardType="numeric"
                    style={{ height: 40 }}
                    underlineColorAndroid="transparent"
                    value={this.state.nomorPolis}
                    onChangeText={text => this.setState({ nomorPolis: text })}
                  />
                </View>
                <Text style={styles.errorMessage}>{this.checkError('nomorPolis')}</Text>
              </View>
              {
                !this.state.keyboardActive &&
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSubmitHandler();
                    }}
                    style={styles.buttonSubmit}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: Platform.OS === 'android' ? 'OpenSans-Regular' : 'OpenSans'
                      }}
                    >
                      SIMPAN
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleForm: {
    fontSize: 19,
    fontFamily: 'Montserrat-Bold',
    color: '#999'
  },
  titleField: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-Light',
    color: '#999',
    marginLeft: Style.PADDING - 5
  },
  errorMessage: {
    flex: 0,
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Montserrat-SemiBold',
    color: '#ef434e'
  },
  wrapperField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    elevation: 3
  },
  fieldItemWrap: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    margin: 10,
    paddingTop: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  pickerWrapper: {
    flex: 1.8,
    borderBottomColor: '#ef434e',
    borderBottomWidth: 1,
    marginRight: 5,
    marginLeft: 5
  },
  buttonWrapper: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  buttonSubmit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 34,
    backgroundColor: '#ef434e',
    borderRadius: 3
  },
  wrappErrorMessage: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f5fe'
  }
};

export default CreateAsuransi;
