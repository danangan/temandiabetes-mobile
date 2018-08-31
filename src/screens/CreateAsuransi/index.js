import React from 'react';
import { View, Text, Picker, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NavigationBar } from '../../components';
import { API_CALL } from '../../utils/ajaxRequestHelper';
import Style from '../../style/defaultStyle';

class CreateAsuransi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set default value
      namaAsuransi: 'alianz',
      // set default value
      tipeAsuransi: 'corporate',
      nomorAsuransi: '',
      nomorPolis: '',
      _errors: null,
      errorMessage: ''
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async componentDidMount() {
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

  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  async onSubmitHandler() {
    const { namaAsuransi, tipeAsuransi, nomorAsuransi, nomorPolis } = this.state;
    const isComplete = this.formValidation();

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
      if (this.props.insuranceId) {
        option.method = 'put';
        option.data.insuranceId = this.props.insuranceId;
      } else {
        option.method = 'post';
      }

      try {
        await API_CALL(option);

        if (this.props.onSuccessCallback) {
          this.props.onSuccessCallback();
        }
        await this.setState({ _errors: null });
        Alert.alert('Perhatian!', 'Asuransi berhasil di simpan.');
        // close the modal
        this.props.navigator.pop();
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Perhatian!', 'Silahkan lengkapi data asuransi Anda');
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
    const errors = {};
    if (this.state.nomorAsuransi === '' && this.state.tipeAsuransi === 'corporate') {
      errors.nomorAsuransi = ['Silahkan isi nomor asuransi'];
    }
    if (this.state.nomorPolis === '') errors.nomorPolis = ['Silahkan isi nomor polis'];
    if (Object.keys(errors).length) {
      this.setState({
        _errors: errors
      });
    }
    return errors;
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 0, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10 }}
        >
          <NavigationBar onPress={() => this.props.navigator.pop()} title="Data Asuransi" />
        </View>
        <View
          style={{
            flex: 4.5,
            backgroundColor: '#f3f5fe',
            paddingVertical: 10,
            paddingHorizontal: 10
          }}
        >
          <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', height: '20%' }}>
            <Text style={styles.titleForm}>
              {this.props.insuranceId ? 'Ubah Data Asuransi' : 'Lengkapi Data Asuransi'}
            </Text>
          </View>
          <ScrollView>
            <View style={styles.wrapperField}>
              <View
                style={{
                  ...styles.fieldItemWrap,
                  backgroundColor: this.props.insuranceId ? '#eee' : '#fff'
                }}
              >
                <Text style={styles.titleField}>Nama Asuransi</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    enabled={!this.props.insuranceId}
                    pickerStyleType={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
                    selectedValue={this.state.namaAsuransi}
                    style={{ height: 50, width: '100%', color: '#4a4a4a', bottom: 5 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ namaAsuransi: itemValue })
                    }
                  >
                    <Picker.Item label="Alianz" value="alianz" />
                    <Picker.Item label="Axa Mandiri" value="axamandiri" />
                    <Picker.Item label="Sinarmas" value="sinarmas" />
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  ...styles.fieldItemWrap,
                  backgroundColor: this.props.insuranceId ? '#eee' : '#fff'
                }}
              >
                <Text style={styles.titleField}>Tipe Asuransi</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    enabled={!this.props.insuranceId}
                    pickerStyleType={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
                    selectedValue={this.state.tipeAsuransi}
                    style={{ height: 50, width: '100%', color: '#4a4a4a', bottom: 5 }}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ tipeAsuransi: itemValue });
                    }}
                  >
                    <Picker.Item label="Corporate" value="corporate" />
                    <Picker.Item label="Individu" value="individu" />
                  </Picker>
                </View>
              </View>
              {this.state.tipeAsuransi === 'corporate' && (
                <View style={styles.fieldItemWrap}>
                  <Text style={styles.titleField}>Nomor Asuransi</Text>
                  <View style={styles.pickerWrapper}>
                    <TextInput
                      style={{ height: 40 }}
                      value={this.state.nomorAsuransi}
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setState({ nomorAsuransi: text })}
                    />
                  </View>
                </View>
              )}
              <View style={styles.fieldItemWrap}>
                <Text style={styles.titleField}>Nomor Polis</Text>
                <View style={styles.pickerWrapper}>
                  <TextInput
                    style={{ height: 40 }}
                    underlineColorAndroid="transparent"
                    value={this.state.nomorPolis}
                    onChangeText={text => this.setState({ nomorPolis: text })}
                  />
                </View>
              </View>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    this.onSubmitHandler();
                  }}
                  style={styles.buttonSubmit}
                >
                  <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>
                    SIMPAN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.wrappErrorMessage}>
          <Text style={styles.errorMessage}>{this.checkError('nomorAsuransi')}</Text>
          <Text style={styles.errorMessage}>{this.checkError('nomorPolis')}</Text>
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
