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
  AsyncStorage
} from 'react-native';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import { Spinner } from '../../../components/';
import Style from '../../../style/defaultStyle';
import { registerAction, registerSip } from '../../../actions';
import { API_BASE } from '../../../utils/API';
import { startLoginPage } from '../../../../App';
import { authToken } from '../../../utils/constants';

class RegisterFive extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      sip: ''
    };
  }

  componentDidUpdate() {
    const { status_code, message } = this.props.dataRegister.dataUser;
    if (status_code === 200 && this.state.shouldRedirect) {
      this.setState(
        {
          shouldRedirect: false
        },
        () => {
          this.props.navigator.resetTo({
            screen: 'TemanDiabets.LoginScreen',
            navigatorStyle: {
              navBarHidden: true
            }
          });
        }
      );
    } else if (
      status_code === 500 &&
      message === 'Email Sudah digunakan' &&
      this.state.shouldRedirect
    ) {
      alert('Maaf, email Anda sudah pernah digunakan.');
      this.setState(
        {
          shouldRedirect: false
        },
        () => {
          this.props.navigator.resetTo({
            screen: 'TemanDiabets.RegisterScreen',
            navigatorStyle: {
              navBarHidden: true
            }
          });
        }
      );
    }
  }

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
      sip: sip
    };

    await API_CALL.put(`api/users/${this.props._id}`, userData);

    this.setState(
      {
        shouldRedirect: false
      },
      () => {
        // redirect here
        AsyncStorage.removeItem('isNewUser');
        startLoginPage();
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
      alert('Harap input nomor SIP Anda.');
    }
  }

  render() {
    const { message, status_code, sip } = this.props.dataRegister.dataUser;
    if (this.state.shouldRedirect) {
      return (
        <View style={{ flex: 1, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color="#FFDE00" text="Loading..." size="large" />
        </View>
      );
    } else if (message === 'registration data incomplete' && status_code === 400) {
      alert('Data already exist!');
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={require('../../../assets/images/sip.png')}
        >
          <TouchableOpacity
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
              source={require('../../../assets/icons/back_white.png')}
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
                style={[styles.textInputStyle, stylesLocal.inputStyle]}
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
