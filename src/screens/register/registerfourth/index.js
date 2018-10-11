import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  Alert
} from 'react-native';

import Style from '../../../style/defaultStyle';

import styles from '../style';
import { Indicator } from '../../../components/indicator/Indicator';
import { registerAction, loginManual, updateProfile } from '../../../actions';
import { Spinner } from '../../../components/';
import { buttonLabelDone, buttonLabelNext, typeOfUsers, authToken } from '../../../utils/constants';
import { API_BASE } from '../../../utils/API';
import { updateFCMToken } from '../../../actions/authAction';
import { mainApp } from '../../../../App';
import Images from '../../../assets/images';

class RegisterScreenFourth extends React.Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      persentase: '80%',
      btn_submit: buttonLabelNext,
      shouldRedirect: false,
      shouldUserLogin: false,
      updateFcm: false
    };
    this.handleFinalRegister = this.handleFinalRegister.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.dataRegister.dataUser.status_code === 200 &&
      nextProps.loginReducer.statusCode === 200 &&
      this.state.updateFcm &&
      nextProps.dataRegister.dataUser.email !== ''
    ) {
      this.setState(
        {
          updateFcm: false
        },
        () => {
          const params = {
            idUser: nextProps.dataRegister.dataUser.id,
            token: {
              messagingRegistrationToken: this.props.fcmToken
            }
          };
        }
      );
    }
  }

  componentDidUpdate() {
    const self = this;
    const { currentUser } = this.props.loginReducer;
    const {
      status_code,
      tipe_user,
      message,
      email,
      password
    } = this.props.dataRegister.dataUser;

    if (status_code === 200 && this.state.shouldRedirect) {
      this.setState(
        {
          shouldRedirect: false,
          shouldUserLogin: true
        },
        () => {
          if (tipe_user !== 'ahli') {
            // harus balik ke Home
            // Hit login first to get Firebase token (JWT)
            const user = {
              email,
              password
            };
            this.props.loginManual(user);
          }
        }
      );
    } else if (
      status_code === 500 &&
      message === 'Email Sudah digunakan' &&
      this.state.shouldRedirect
    ) {
      Alert.alert('Maaf, internal server sedang bermasalah');
      self.setState({
        shouldRedirect: false
      });
    } else if (
      this.props.loginReducer.statusCode === 200 &&
      this.props.loginReducer.message === 'success login' &&
      this.state.shouldRedirect
    ) {
      self.setState({ shouldRedirect: false }, () => {
        if (!currentUser.is_active && currentUser.tipe_user === 'ahli') {
          Alert.alert(
            'Pemberitahuan',
            'Akun anda sedang tidak aktif, masih dalam proses persetujuan. Silakan tunggu beberapa email konfirmasi.',
            [{ text: 'OK', onPress: () => self.props.onFirebaseSignOut() }],
            { cancelable: false }
          );
        }
      });
    }
  }

  async updateUser() {
    const TOKEN = await AsyncStorage.getItem(authToken);

    const API_CALL = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: TOKEN
      }
    });

    const userData = {
      is_active: true,
      tipe_user: this.state.selected
    };

    await API_CALL.put(`api/users/${this.props._id}`, userData);

    this.setState(
      {
        shouldRedirect: false
      },
      () => {
        // redirect here
        AsyncStorage.removeItem('isNewUser').then(() => {
          mainApp();
        });
      }
    );
  }

  handleFinalRegister() {
    const { selected } = this.state;
    const { nama, email, password } = this.props.dataRegister.dataUser;
    const dataUser = {
      nama,
      email,
      password,
      tipeuser: this.state.selected
    };
    this.setState(
      {
        shouldRedirect: selected !== 'ahli'
      },
      () => {
        if (selected !== 'ahli') {
          // check if it is coming from google / facebook sign in
          if (this.props.registerType === 'GoogleSignIn') {
            this.updateUser();
          } else {
            this.props.registerAction(dataUser);
          }
        } else {
          const passProps = {
            tipeuser: this.state.selected
          };

          if (this.props.registerType === 'GoogleSignIn') {
            passProps.registerType = 'GoogleSignIn';
            passProps._id = this.props._id;
          }

          this.props.navigator.push({
            screen: 'TemanDiabetes.RegisterFive',
            navigatorStyle: {
              navBarHidden: true
            },
            title: 'SIP Screen',
            passProps
          });
        }
      }
    );
  }

  handleUserDecision(item) {
    if (item !== 'ahli') {
      this.setState({ selected: item, persentase: '100%', btn_submit: buttonLabelDone });
    } else {
      this.setState({ selected: item, persentase: '80%', btn_submit: buttonLabelNext });
    }
  }

  handleSelectedUser() {
    return typeOfUsers.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={
          this.state.selected === item
            ? [stylesLocal.imagesWrapper, { borderColor: 'rgb(239, 67, 79)', borderWidth: 1.5 }]
            : stylesLocal.imagesWrapper
        }
        onPress={() => this.handleUserDecision(item)}
      >
        {index === 0 ? (
          <Image
            resizeMode={'contain'}
            style={stylesLocal.images}
            source={{ uri: Images.diabetesiIcon }}
          />
        ) : index === 1 ? (
          <Image
            resizeMode={'contain'}
            style={stylesLocal.images}
            source={{ uri: Images.innerCircleIcon }}
          />
        ) : index === 2 ? (
          <Image
            resizeMode={'contain'}
            style={stylesLocal.images}
            source={{ uri: Images.advisorIcon }}
          />
        ) : null}

        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
            color: '#000',
            textAlign: 'center'
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ));
  }

  handleNavigation() {
    const { selected } = this.state;
    if (selected !== '') {
      this.setState(
        {
          shouldRedirect: true,
          updateFcm: true
        },
        () => {
          this.handleFinalRegister();
        }
      );
    } else {
      alert('Silakan pilih jenis user Anda');
    }
  }

  render() {
    const { message, status_code } = this.props.dataRegister.dataUser;
    if (this.state.shouldRedirect || this.state.shouldUserLogin) {
      return (
        <View style={{ flex: 1, opacity: 0.7, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color="#EF434F" text="Loading..." size="large" />
        </View>
      );
    } else if (message === 'registration data incomplete' && status_code === 400) {
      alert('Data already exist!');
    }
    return (
      <View style={[styles.container, { paddingBottom: 0 }]}>
        <ImageBackground style={styles.imageBackground} source={Images.backgroundTypeUser}>
          {this.props.registerType !== 'GoogleSignIn' && (
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 50, right: 70 }}
              style={{
                flex: 0,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                marginTop: this.state.keyboardActive ? 10 : 0
              }}
              onPress={() => this.props.navigator.pop()}
            >
              <Image
                resizeMode={'contain'}
                style={{ width: 30, height: 30, margin: 10 }}
                source={Images.backIcon}
              />
            </TouchableOpacity>
          )}
          <View style={styles.wrapTitle}>
            <Text style={styles.titles}>Siapakah Anda?</Text>
          </View>
          <View style={styles.wrapForm}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 40
              }}
            >
              {this.handleSelectedUser()}
            </View>

            <TouchableOpacity
              style={[styles.btnNext, { marginBottom: 40, marginTop: 20 }]}
              onPress={() => this.handleNavigation()}
            >
              <Text style={styles.buttonText}>{this.state.btn_submit}</Text>
            </TouchableOpacity>
            <View style={styles.indicatorWrapper}>
              <Indicator persentase={{ width: this.state.persentase }} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const stylesLocal = StyleSheet.create({
  imagesWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    width: Style.DEVICE_WIDTH / 3.0,
    height: Style.DEVICE_WIDTH / 3.0,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10
  },
  wrapperScroll: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  images: { width: '100%', height: '80%' }
});

const mapStateToProps = state => ({
  dataRegister: state.registerReducer,
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  registerAction: dataUser => dispatch(registerAction(dataUser)),
  loginManual: user => dispatch(loginManual(user)),
  updateFCMToken: params => dispatch(updateFCMToken(params)),
  updateProfile: typeOfUser => dispatch(updateProfile(typeOfUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreenFourth);
