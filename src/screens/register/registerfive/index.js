import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage,
  Alert,
  Keyboard
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import { Spinner, SnackBar } from '../../../components/';
import Style from '../../../style/defaultStyle';
import { registerAction, registerSip } from '../../../actions';
import { API_BASE } from '../../../utils/API';
import { startLoginPage } from '../../../../App';
import { authToken } from '../../../utils/constants';
import Images from '../../../assets/images';
import { guelogin } from '../../../utils/GueLogin';

class RegisterFive extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      sip: '',
      showSnackBar: false,
      errorMessage: '',
      keyboardActive: false
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardActive: true });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardActive: false });
    });
  }

  // componentDidUpdate() {
  //   const self = this;
  //   const { status_code, message } = this.props.dataRegister.dataUser;
  //   if (status_code === 200 && this.state.shouldRedirect) {
  //     self.setState(
  //       {
  //         shouldRedirect: false
  //       },
  //       () => {
  //         Alert.alert(
  //           'Informasi',
  //           'Data anda sedang kami validasi. Harap menghubungi customer service terkait.',
  //           [
  //             {
  //               text: 'OK',
  //               onPress: () => {
  //                 this.props.navigator.resetTo({
  //                   screen: 'TemanDiabetes.LoginScreen',
  //                   navigatorStyle: {
  //                     navBarHidden: true
  //                   }
  //                 });
  //               }
  //             }
  //           ]
  //         );
  //       }
  //     );
  //   }
  // }

  async updateUser() {
    const { sip } = this.props.dataRegister.dataUser;
    const TOKEN = await AsyncStorage.getItem(authToken);

    const API_CALL = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: TOKEN
      }
    });

    const userData = {
      email: this.props.email,
      tipe_user: this.props.tipeuser,
      registration_status: 'finished',
      is_active: false,
      sip
    };

    await API_CALL.put(`api/users/${this.props._id}`, userData);

    this.setState(
      {
        shouldRedirect: false
      },
      () => {
        Alert.alert(
          'Akun Anda sedang tidak aktif.',
          'Akun Anda sedang dalam konfirmasi, jika ada pertanyaan silakan email info@temandiabetes.com',
          [
            {
              text: 'OK',
              onPress: () => {
                // log out
                guelogin.auth().signOut();
                // move to login page
                startLoginPage();
              }
            }
          ],
          { cancelable: false }
        );
      }
    );
  }

  toHome() {
    const { nama, email, password, sip } = this.props.dataRegister.dataUser;
    if (sip !== '') {
      const dataUser = {
        nama,
        email,
        password,
        tipeuser: this.props.tipeuser,
        sip
      };
      this.setState(
        {
          shouldRedirect: true
        },
        () => {
          if (this.props.registerType === 'GoogleSignIn') {
            this.updateUser();
          } else {
            this.props.registerAction(dataUser);
          }
        }
      );
    } else {
      this.showSnackBar('Harap input nomor SIP Anda.');
    }
  }

  showSnackBar = message => {
    this.setState({ showSnackBar: true, errorMessage: message }, () => this.hideSnackBar());
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 2000);
  };

  render() {
    const { message, status_code, sip } = this.props.dataRegister.dataUser;
    if (this.state.shouldRedirect) {
      return (
        <View style={{ flex: 1, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color="#EF434F" text="Loading..." size="large" />
        </View>
      );
    } else if (message === 'registration data incomplete' && status_code === 400) {
      this.showSnackBar('Data Anda sudah terdaftar.');
    }
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={Images.backgroundSip}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 70 }}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'flex-start'
            }}
            onPress={() => this.props.navigator.pop()}
          >
            <Image
              resizeMode={'contain'}
              style={{ width: 30, height: 30, margin: 10 }}
              source={Images.backIcon}
            />
          </TouchableOpacity>
          <View style={[styles.wrapTitle, { flex: this.state.keyboardActive ? 1 : 2 }]}>
            <Text style={styles.titles}>Surat Izin Praktek (SIP)</Text>
          </View>
          <View style={styles.wrapForm}>
            <View
              style={[
                stylesLocal.containerForm,
                { flex: 2, justifyContent: this.state.keyboardActive ? 'flex-start' : 'flex-end' }
              ]}
            >
              <TextInput
                placeholder={'Surat Izin Praktek'}
                onChangeText={sip => this.props.registerSip(sip)}
                value={sip}
                underlineColorAndroid={'#fff'}
                style={[styles.textInputStyle, stylesLocal.inputStyle, {}]}
              />
              <TouchableOpacity style={styles.btnNext} onPress={() => this.toHome()}>
                <Text style={styles.buttonText}>SELESAI</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: 'red' }}>
                {this.state.message}
              </Text>
            </View>
            <View style={styles.indicatorWrapper}>
              <Indicator persentase={{ width: '100%' }} />
            </View>
          </View>
          <SnackBar
            visible={this.state.showSnackBar}
            textMessage={this.state.errorMessage}
            position="top"
          />
        </ImageBackground>
      </View>
    );
  }
}

const stylesLocal = {
  containerForm: {
    height: '70%'
  },
  inputStyle: {
    fontSize: Style.FONT_SIZE * 1.2,
    marginBottom: 15,
    paddingLeft: 20,
    fontFamily: 'Montserrat-Regular'
  }
};

const mapStateToProps = state => ({
  dataRegister: state.registerReducer
});

const mapDispatchToProps = dispatch => ({
  registerAction: dataUser => dispatch(registerAction(dataUser)),
  registerSip: sip => dispatch(registerSip(sip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFive);
