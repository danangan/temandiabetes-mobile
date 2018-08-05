import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { result } from 'lodash';
import { Navigation } from 'react-native-navigation';

import { ButtonFacebook, ButtonGoogle, Button, Spinner, SnackBar } from '../../components/';
import Form from './Form';
import BorderLine from './BorderLine';
import Style from '../../style/defaultStyle';
import color from '../../style/color';
import Images from '../../assets/images';

import {
  loginManual,
  setupGoogleSignIn,
  signWithGoogle,
  onSignOut,
  resetState,
  signWithFacebook
} from '../../actions/loginActions';

import { clearDataRegister } from '../../actions/registerActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      shouldRedirect: false,
      message: null,
      showSnackBar: false,
      errorMessage: ''
    };

    this.redirectByUrl = this.redirectByUrl.bind(this);
  }

  componentDidMount() {
    this.props.setupGoogleSignIn();
    Linking.addEventListener('url', this.redirectByUrl);
    // analyze the deeplink
    const { deepLink } = this.props;
    if (deepLink.currentDeepLink && deepLink.currentDeepLink !== '' && !deepLink.expired) {
      if (deepLink.currentDeepLink.includes('reset-password')) {
        this.redirectByUrl({ url: deepLink.currentDeepLink });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    // the inactive user goes here
    // here we check if the inactive user is a new user or not
    // if the user is existing user, the isnewuser value will be false, thus
    // we give them alert that the user account is inactive
    if (nextProps.loginReducer.isNewUser === true) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'TemanDiabetes.RegisterScreenFourth',
          navigatorStyle: {
            navBarHidden: true
          }
        },
        passProps: {
          email: nextProps.loginReducer.email,
          _id: nextProps.loginReducer.currentUser._id,
          nama: nextProps.loginReducer.nama,
          registerType: 'GoogleSignIn'
        }
      });
    } else if (result(nextProps.loginReducer, 'currentUser.is_active') === false) {
      Alert.alert(
        'Akun Anda sedang tidak aktif.',
        'Hubungi penyedia layanan untuk info lebih lanjut.'
      );
      this.props.resetState();
    }
  }

  componentDidUpdate() {
    const self = this;
    const { statusCode, message, is_active } = this.props.loginReducer;
    const errorMessage = this.errorMessage(message);

    if (statusCode === 200 && message === 'success login' && this.state.shouldRedirect) {
      self.setState({ shouldRedirect: false }, () => {
        if (!is_active) {
          Alert.alert(
            'Pemberitahuan',
            'Akun anda sedang tidak aktif.',
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.resetState();
                  self.props.onSignOut();
                }
              }
            ],
            { cancelable: false }
          );
        }
      });
    } else if (statusCode === 500 && this.state.shouldRedirect) {
      self.setState(
        {
          shouldRedirect: false
        },
        () => {
          if (errorMessage !== undefined) {
            this.showSnackBar(message);
          }
        }
      );
      this.props.resetState();
    }
  }

  onChangeTextHandlerEmail = e => this.setState({ email: e });
  onChangeTextHandlerPass = pass => this.setState({ password: pass });
  onGoogleSignIn = () => this.props.signWithGoogle();
  onFacebookSignIn = () => this.props.signWithFacebook();

  onLogin = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    Keyboard.dismiss();

    if (!this.state.email || !this.state.password) {
      this.setState(
        { shouldRedirect: false, message: 'Username dan Password tidak boleh kosong.' },
        () => {
          this.showSnackBar(this.state.message);
        }
      );
    } else {
      this.setState({ shouldRedirect: true }, () => {
        this.props.loginManual(user);
      });
    }
  };

  redirectByUrl({ url }) {
    if (url.includes('reset-password')) {
      const pathname = url.split('/reset-password/');
      this.props.navigator.push({
        screen: 'TemanDiabetes.ForgotPasswordInputNewPassword',
        navigatorStyle: {
          navBarHidden: true
        },
        animated: true,
        animationType: 'fade',
        passProps: {
          token: pathname[1]
        }
      });
    }
  }

  errorMessage = message => {
    switch (message) {
      case 'Kata sandi salah':
        return this.showSnackBar(message);
      case 'Data pengguna tidak ditemukan':
        return this.showSnackBar(message);
      case 'Format email salah':
        return this.showSnackBar(message);
      default:
        return message;
    }
  };

  createAccount = () => {
    this.props.clearDataRegister('CLEAR_DATA_REGISTER');
    this.props.navigator.push({
      screen: 'TemanDiabetes.RegisterScreen',
      animated: true,
      animationType: 'fade'
    });
  };

  forgotPassword = () => {
    this.props.navigator.push({
      screen: 'TemanDiabetes.ForgotPasswordInputEmail',
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  };

  showSnackBar = message => {
    this.setState({ showSnackBar: true, errorMessage: message }, () => this.hideSnackBar());
  };

  hideSnackBar = () => {
    setTimeout(() => {
      this.setState({ showSnackBar: false });
    }, 2000);
  };

  render() {
    const spinner =
      this.state.shouldRedirect || this.props.loginReducer.loading ? (
        <Spinner color="#EF434F" text="Logging In..." size="large" />
      ) : (
        <View />
      );

    return (
      <ImageBackground source={Images.backgroundLogin} style={styles.containerStyle}>
        <View style={styles.contentStyle}>
          <View style={styles.contentTopStyle}>
            <Image source={Images.logoApp} style={styles.logoStyle} />
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.contentCenterStyle}>
              <Form
                onValue={{ email: this.state.email, pass: this.state.password }}
                onChangeTextHandlerEmail={this.onChangeTextHandlerEmail}
                onChangeTextHandlerPass={this.onChangeTextHandlerPass}
              />
              <Button buttonStyle={styles.buttonStyle} onPress={this.onLogin}>
                MASUK
              </Button>
              <BorderLine />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.contentBottomStyle}>
            <ButtonFacebook
              onPress={this.onFacebookSignIn}
              text="Masuk dengan Facebook"
              containerStyle={styles.buttonSocialStyle}
              textStyle={styles.buttonSocialTextStyle}
            />
            <ButtonGoogle
              onPress={this.onGoogleSignIn}
              text="Masuk dengan Google"
              textStyle={styles.buttonSocialTextStyle}
            />
            <Text style={styles.forgotPasswordLink} onPress={this.forgotPassword}>
              Lupa password?
            </Text>
            <Text style={styles.textLink} onPress={this.createAccount}>
              BUAT AKUN
            </Text>
          </View>
        </View>
        {spinner}
        <SnackBar
          visible={this.state.showSnackBar}
          textMessage={this.state.errorMessage}
          position="top"
        />
      </ImageBackground>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  contentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  contentCenterStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  contentBottomStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  logoStyle: {
    width: Style.DEVICE_WIDTH - 80,
    height: Style.DEVICE_WIDTH / 8.5,
    alignSelf: 'center',
    marginTop: 40
  },
  forgotPasswordLink: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: color.gray,
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: 8
  },
  textLink: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE,
    color: color.gray,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30
  },
  buttonStyle: {
    height: 55,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 0
  },
  buttonSocialStyle: {
    margin: 10
  },
  buttonSocialTextStyle: {
    fontSize: Style.FONT_SIZE,
    paddingTop: 2
  }
};

const mapStateToProps = state => ({
  deepLink: state.appReducer.deepLink,
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  loginManual: user => dispatch(loginManual(user)),
  signWithGoogle: () => dispatch(signWithGoogle()),
  setupGoogleSignIn: () => dispatch(setupGoogleSignIn()),
  onSignOut: () => dispatch(onSignOut()),
  resetState: () => dispatch(resetState()),
  clearDataRegister: type => dispatch(clearDataRegister(type)),
  signWithFacebook: () => dispatch(signWithFacebook())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
