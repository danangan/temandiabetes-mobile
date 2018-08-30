import React from 'react';
import { View, Text, Picker, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationBar } from '../../components';
import color from '../../style/color';


class CreateAsuransi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      namaAsuransi: '',
      tipeAsuransi: '',
      nomorAsuransi: '',
      nomorPolis: ''
    };
  }

  static navigatorStyle = {
    navBarHidden: true,
    navBarBackgroundColor: 'white'
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 10 }}>
          <NavigationBar onPress={() => this.props.navigator.pop()} title="Data Asuransi" />
        </View>
        <View style={{ flex: 2, backgroundColor: '#f3f5fe', paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', height: '20%' }}>
            <Text style={styles.titleForm}>Lengkapi Data Asuransi</Text>
          </View>
          <View style={styles.wrapperField}>
            <View style={styles.fieldItemWrap}>
              <Text style={styles.titleField}>Nama Asuransi</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={this.state.namaAsuransi}
                  style={{ height: 50, width: '100%', color: '#4a4a4a' }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ namaAsuransi: itemValue })}>
                  <Picker.Item label="Alianz" value="alianz" />
                  <Picker.Item label="Axa Mandiri" value="axamandiri" />
                  <Picker.Item label="Sinarmas" value="sinarmas" />
                </Picker>
              </View>
            </View>
            <View style={styles.fieldItemWrap}>
              <Text style={styles.titleField}>Tipe Asuransi</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  pickerStyleType={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
                  selectedValue={this.state.tipeAsuransi}
                  style={{ height: 50, width: '100%', color: '#4a4a4a' }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ namaAsuransi: itemValue })}>
                  <Picker.Item label="Corporate" value="corporate" />
                  <Picker.Item label="Individu" value="individu" />
                </Picker>
              </View>
            </View>
            <View style={styles.fieldItemWrap}>
              <Text style={styles.titleField}>Nomor Asuransi</Text>
              <View style={styles.pickerWrapper}>
                <TextInput 
                  style={{ height: 40 }}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ nomorAsuransi: text })}
                />
              </View>
            </View>
            <View style={styles.fieldItemWrap}>
              <Text style={styles.titleField}>Nomor Polis</Text>
              <View style={styles.pickerWrapper}>
                <TextInput 
                  style={{ height: 40 }}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({ nomorPolis: text })}
                />
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // this.updateProfileOnCLick();
                }}
                style={styles.buttonSubmit}
              >
                <Text style={{ color: '#fff', fontSize: 12, fontFamily: 'OpenSans-Regular' }}>
                  SIMPAN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f5fe' }} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleForm: {
    fontSize: 19, fontFamily: 'Montserrat-Bold', color: '#999' 
  },
  titleField: {
    flex: 1, fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: '#999' 
  },
  wrapperField: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '40%', 
    elevation: 3,
  },
  fieldItemWrap: { 
    flex: 1, 
    backgroundColor: '#fff', 
    width: '100%', 
    padding: 10,
  },
  pickerWrapper: {
    flex: 1.8,
    borderBottomColor: '#ef434e',
    borderBottomWidth: 1,
    marginRight: 5,
    marginLeft: 5,
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
  }
};

export default CreateAsuransi;
